import { isAbsolute, relative, resolve, sep } from "node:path";
import type { PackagingIssue, ProfileEntry } from "./types.ts";

const restrictedSegments = new Set([".git", ".next", "node_modules", "font", "assets-final", "vault"]);
const restrictedExtensions = new Set([".env", ".key", ".pem", ".p12", ".pfx", ".woff", ".woff2", ".ttf", ".otf", ".glb", ".gltf"]);
const permittedExtensions = new Set([".ts", ".tsx", ".mts", ".mjs", ".json", ".md", ".ps1", ".svg"]);

const approvedScreenshotPaths = [
  "planning/evidence/screenshots/cp01c3/s03_resting_narrow-mobile_320x568.png",
  "planning/evidence/screenshots/cp01c3/s03_resting_standard-mobile_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_resting_tall-mobile_430x932.png",
  "planning/evidence/screenshots/cp01c3/s03_resting_desktop_1440x900.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_00_s02-open_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_01_canvas_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_02_greeting_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_03_name_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_04_celebration_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_05_stable_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_06_cta-focused_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_07_reduced-motion_390x844.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_08_text-150-asset-fallback_320x568.png",
  "planning/evidence/screenshots/cp01c3/s03_sequence_09_s04-boundary_390x844.png",
  "planning/evidence/screenshots/s05/s05-mobile-default-390x844.png",
  "planning/evidence/screenshots/s05/s05-desktop-custom-1440x900.png",
  "planning/evidence/screenshots/s05/s05-reset-confirmation-390x844.png",
  "planning/evidence/screenshots/s05/s05-customized-confirm-ready-390x844.png",
  "planning/evidence/screenshots/s06/s06-mobile-initial-390x844.png",
  "planning/evidence/screenshots/s06/s06-mobile-extinguished-390x844.png",
  "planning/evidence/screenshots/s06/s06-desktop-initial-1440x900.png",
  "planning/evidence/screenshots/s06/s06-desktop-extinguished-1440x900.png",
  "planning/evidence/screenshots/s07/s07-mobile-initial-390x844.png",
  "planning/evidence/screenshots/s07/s07-mobile-opened-390x844.png",
  "planning/evidence/screenshots/s07/s07-desktop-initial-1440x900.png",
  "planning/evidence/screenshots/s07/s07-desktop-opened-1440x900.png",
  "planning/evidence/screenshots/s07/s07-mobile-long-content-390x844.png",
  "planning/evidence/screenshots/s08/s08-mobile-initial-390x844.png",
  "planning/evidence/screenshots/s08/s08-mobile-complete-390x844.png",
  "planning/evidence/screenshots/s08/s08-desktop-initial-1440x900.png",
  "planning/evidence/screenshots/s08/s08-desktop-complete-1440x900.png",
  "planning/evidence/screenshots/s10-production/s10-mobile-locked-390x844.png",
  "planning/evidence/screenshots/s10-production/s10-mobile-opened-390x844.png",
  "planning/evidence/screenshots/s10-production/s10-desktop-locked-1440x900.png",
  "planning/evidence/screenshots/s10-production/s10-desktop-opened-1440x900.png",
  "planning/evidence/screenshots/s10-production/s10-mobile-reduced-opened-390x844.png",
] as const;
const approvedScreenshotPathSet: ReadonlySet<string> = new Set(approvedScreenshotPaths);

export function isApprovedScreenshotPath(path: string): boolean {
  return approvedScreenshotPathSet.has(path);
}

/** Returns a defensive copy; callers cannot mutate the authoritative allowlist. */
export function getApprovedScreenshotPaths(): readonly string[] {
  return [...approvedScreenshotPaths];
}

export function normalizeEntryPath(value: string): string | null {
  if (!value || value.includes("\0") || /^[a-zA-Z]:[\\/]/.test(value) || value.startsWith("\\\\") || value.startsWith("//") || isAbsolute(value)) return null;
  const normalized = value.replaceAll("\\", "/");
  const segments = normalized.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) return null;
  return segments.join("/");
}

export function privacyDenial(path: string): PackagingIssue | null {
  const normalized = path.toLowerCase();
  const segments = normalized.split("/");
  if (segments[0] === "assets") return { code: "RESTRICTED_PATH", path, message: "Root assets directory is restricted." };
  if (segments.some((segment) => restrictedSegments.has(segment))) return { code: "RESTRICTED_PATH", path, message: "Path belongs to a restricted repository boundary." };
  if (segments.some((segment) => segment === ".env" || segment.startsWith(".env."))) return { code: "RESTRICTED_PATH", path, message: "Environment and secret files are forbidden." };
  if (normalized.includes("malica") || normalized.includes("confession") || normalized.includes("private-key") || normalized.includes("id_rsa")) return { code: "RESTRICTED_PATH", path, message: "Personal or credential material is forbidden." };
  const extension = normalized.includes(".") ? normalized.slice(normalized.lastIndexOf(".")) : "";
  if (normalized === "app/globals.css") return null;
  if (restrictedExtensions.has(extension)) return { code: "RESTRICTED_PATH", path, message: "Restricted binary or credential file type is forbidden." };
  if (extension === ".png") {
    if (!isApprovedScreenshotPath(normalized)) {
      return { code: "UNCLASSIFIED_FILE", path, message: "Screenshot path is not in the approved screenshot allowlist." };
    }
    return null;
  }
  if (!permittedExtensions.has(extension)) return { code: "UNCLASSIFIED_FILE", path, message: "File type is not classified for evidence packaging." };
  return null;
}

export function validateProfileEntries(entries: readonly ProfileEntry[]): PackagingIssue[] {
  const issues: PackagingIssue[] = [];
  const exact = new Set<string>();
  const folded = new Map<string, string>();
  for (const entry of entries) {
    const normalized = normalizeEntryPath(entry.path);
    if (!normalized) { issues.push({ code: "UNSAFE_RELATIVE_PATH", path: entry.path, message: "Archive path is absolute, empty, or contains traversal." }); continue; }
    const denial = privacyDenial(normalized); if (denial) issues.push(denial);
    if (exact.has(normalized)) issues.push({ code: "DUPLICATE_ENTRY", path: normalized, message: "Duplicate normalized archive path." });
    exact.add(normalized);
    const key = normalized.toLowerCase();
    const prior = folded.get(key);
    if (prior && prior !== normalized) issues.push({ code: "CASE_COLLISION", path: normalized, message: "Case-insensitive archive path collision." });
    folded.set(key, normalized);
  }
  return issues;
}

export function resolveContainedPath(root: string, entryPath: string): string | null {
  const normalized = normalizeEntryPath(entryPath); if (!normalized) return null;
  const candidate = resolve(root, ...normalized.split("/"));
  const rel = relative(resolve(root), candidate);
  return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel)) ? candidate : null;
}
