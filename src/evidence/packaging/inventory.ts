import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, relative, sep } from "node:path";
import { privacyDenial, resolveContainedPath, validateProfileEntries } from "./policy.ts";
import type { EvidenceProfile, InventoryEntry, PackagingIssue } from "./types.ts";

export const hashBytes = (bytes: Uint8Array): string => createHash("sha256").update(bytes).digest("hex");

function crc32(bytes: Uint8Array, start: number, end: number): number {
  let crc = 0xffffffff;
  for (let index = start; index < end; index += 1) {
    crc ^= bytes[index];
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Validates PNG container structure, not full pixel decoding.
 * It requires IHDR, at least one IDAT, a terminal IEND, bounded chunks, and valid CRCs.
 */
export function isStructurallyValidPng(bytes: Uint8Array): boolean {
  if (bytes.byteLength < 33) return false;
  if (
    bytes[0] !== 0x89 ||
    bytes[1] !== 0x50 ||
    bytes[2] !== 0x4e ||
    bytes[3] !== 0x47 ||
    bytes[4] !== 0x0d ||
    bytes[5] !== 0x0a ||
    bytes[6] !== 0x1a ||
    bytes[7] !== 0x0a
  ) {
    return false;
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 8;
  let sawIhdr = false;
  let sawIdat = false;
  let sawIend = false;
  while (offset + 12 <= bytes.byteLength) {
    const length = view.getUint32(offset, false);
    const typeOffset = offset + 4;
    const dataOffset = offset + 8;
    const crcOffset = dataOffset + length;
    const nextOffset = crcOffset + 4;
    if (nextOffset > bytes.byteLength || crcOffset < dataOffset) return false;
    const type = String.fromCharCode(...bytes.slice(typeOffset, dataOffset));
    const actualCrc = view.getUint32(crcOffset, false);
    if (crc32(bytes, typeOffset, crcOffset) !== actualCrc) return false;

    if (type === "IHDR") {
      if (sawIhdr || length !== 13) return false;
      const width = view.getUint32(dataOffset, false);
      const height = view.getUint32(dataOffset + 4, false);
      if (width <= 0 || height <= 0) return false;
      sawIhdr = true;
    } else if (type === "IDAT") {
      if (!sawIhdr || sawIend) return false;
      sawIdat = true;
    } else if (type === "IEND") {
      if (!sawIhdr || !sawIdat || length !== 0 || sawIend) return false;
      sawIend = true;
      offset = nextOffset;
      break;
    }
    offset = nextOffset;
  }
  return sawIhdr && sawIdat && sawIend && offset === bytes.byteLength;
}

/** Backward-compatible name for callers; this is structural validation, not pixel decoding. */
export const isValidPng = isStructurallyValidPng;

export function buildInventory(projectRoot: string, profile: EvidenceProfile): { inventory: InventoryEntry[]; issues: PackagingIssue[]; warnings: PackagingIssue[] } {
  const issues = validateProfileEntries(profile.entries);
  const warnings: PackagingIssue[] = [];
  const inventory: InventoryEntry[] = [];
  const realRoot = realpathSync(projectRoot);
  for (const entry of [...profile.entries].sort((a, b) => a.path.localeCompare(b.path))) {
    const denial = privacyDenial(entry.path); if (denial) continue;
    const absolute = resolveContainedPath(projectRoot, entry.path);
    if (!absolute) { issues.push({ code: "PATH_OUTSIDE_ROOT", path: entry.path, message: "Path is outside the trusted project root." }); continue; }
    try {
      const stat = lstatSync(absolute);
      if (stat.isSymbolicLink() || !stat.isFile()) { issues.push({ code: "LINK_NOT_ALLOWED", path: entry.path, message: "Links, junctions, and non-files are not package inputs." }); continue; }
      const real = realpathSync(absolute);
      const rel = relative(realRoot, real);
      if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) { issues.push({ code: "PATH_OUTSIDE_ROOT", path: entry.path, message: "Resolved file escapes the trusted project root." }); continue; }
      const bytes = readFileSync(real);
      if (entry.path.endsWith(".png") && !isStructurallyValidPng(bytes)) {
        issues.push({ code: "UNCLASSIFIED_FILE", path: entry.path, message: "Screenshot file fails PNG structural integrity check." });
        continue;
      }
      inventory.push({ ...entry, path: entry.path.replaceAll("\\", "/"), sha256: hashBytes(bytes), bytes: bytes.byteLength });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT" && entry.requirement === "optional") warnings.push({ code: "OPTIONAL_FILE_MISSING", path: entry.path, message: "Optional evidence is absent." });
      else issues.push({ code: "MISSING_REQUIRED_FILE", path: entry.path, message: "Required evidence is absent or unreadable." });
    }
  }
  return { inventory, issues, warnings };
}
