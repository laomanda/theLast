import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export interface ArchiveEntry { readonly path: string; readonly bytes: number; readonly sha256: string; }

export function createArchive(bridgePath: string, stagingRoot: string, outputPath: string, orderedEntries: readonly string[]): void {
  execFileSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", bridgePath, "-Mode", "Create", "-ArchivePath", outputPath, "-Root", stagingRoot, "-Entries", orderedEntries.join("|")], { stdio: "pipe" });
}

export function inspectArchive(bridgePath: string, archivePath: string, extractRoot: string): ArchiveEntry[] {
  const json = execFileSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", bridgePath, "-Mode", "Inspect", "-ArchivePath", archivePath, "-ExtractRoot", extractRoot], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return JSON.parse(json) as ArchiveEntry[];
}

export const hashFile = (path: string): string => createHash("sha256").update(readFileSync(path)).digest("hex");
