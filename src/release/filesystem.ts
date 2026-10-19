import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";

export function safeChildPath(root: string, child: string): string | null {
  if (isAbsolute(child)) return null;
  const candidate = resolve(root, child);
  const contained = relative(root, candidate);
  return contained === "" || (!contained.startsWith(`..${sep}`) && contained !== ".." && !isAbsolute(contained)) ? candidate : null;
}

/** Lists only regular files below a real, non-linked root; links fail closed. */
export function listRegularFiles(root: string): { files: string[]; unsafe: boolean; missing: boolean } {
  try {
    const rootStat = lstatSync(root);
    if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) return { files: [], unsafe: true, missing: false };
    const realRoot = realpathSync(root);
    const files: string[] = [];
    const visit = (directory: string) => {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const candidate = resolve(directory, entry.name);
        const entryStat = lstatSync(candidate);
        if (entryStat.isSymbolicLink()) { files.push(`!unsafe-link:${relative(root, candidate)}`); continue; }
        if (entryStat.isDirectory()) visit(candidate);
        else if (entryStat.isFile()) {
          const realCandidate = realpathSync(candidate);
          if (realCandidate === realRoot || realCandidate.startsWith(`${realRoot}${sep}`)) files.push(relative(root, candidate));
          else files.push(`!unsafe-path:${relative(root, candidate)}`);
        }
      }
    };
    visit(root);
    return { files: files.sort(), unsafe: files.some((file) => file.startsWith("!unsafe-")), missing: false };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return { files: [], unsafe: false, missing: true };
    return { files: [], unsafe: true, missing: false };
  }
}

export function isRegularFile(path: string): boolean {
  try { return lstatSync(path).isFile() && !lstatSync(path).isSymbolicLink() && statSync(path).isFile(); } catch { return false; }
}

/** Deterministic integrity attestation for one bounded generated-output tree. */
export function attestRegularFiles(root: string): { fingerprint: string | null; unsafe: boolean; missing: boolean } {
  const inventory = listRegularFiles(root);
  if (inventory.missing || inventory.unsafe) return { fingerprint: null, unsafe: inventory.unsafe, missing: inventory.missing };
  const hash = createHash("sha256");
  for (const relativePath of inventory.files) {
    const absolute = safeChildPath(root, relativePath);
    if (!absolute || !isRegularFile(absolute)) return { fingerprint: null, unsafe: true, missing: false };
    hash.update(relativePath.replaceAll("\\", "/"));
    hash.update("\0");
    hash.update(createHash("sha256").update(readFileSync(absolute)).digest("hex"));
    hash.update("\n");
  }
  return { fingerprint: hash.digest("hex"), unsafe: false, missing: false };
}
