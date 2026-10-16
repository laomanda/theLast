# REV5-correction-1 — Metadata/Packaging Consistency Fix

**No SVG geometry, color, XML source, or bytes were touched in this pass.** Verified: all 41
files' SHA-256 (16-char prefix) match the previously delivered REV5-correction-1 package —
`REV5_METADATA_FIX_QA.json`, `allSvgBytesUnchangedVsPriorPackage: true`.

## Findings addressed

1. Top-level `revision` (was `rev4`) now reads `REV5-correction-1`, matching `libraryRevision`.
2. A02 `assetRevision`/`lastChangedIn` → `REV5-correction-1`. E03 → `REV5` (its last actual
   content change; it was not touched in the correction pass).
3. A02/E03 `sourceSha256` was stale (REV4-era). Replaced with `previousSha256_rev4` (preserved,
   not deleted — historical lineage) and a new authoritative `sha256` matching the delivered
   file. A02 additionally gets `previousSha256_rev5`, the intermediate pre-correction hash —
   reconstructed from this conversation's own prior output and verified against the 16-char
   prefix recorded last turn before being trusted.
4. One checksum policy now applies to all 41 assets: `sha256` = current full-64-hex digest,
   documented in the manifest's new `checksumPolicy` field. Checked against the actual delivered
   bytes for all 41 — 0 mismatches.
5. A02 `animationTargets` corrected to `a02-outer then a02-inner` in both `ASSET_MANIFEST.json`
   and `_registry.json`, matching `ASSET_USAGE_GUIDE.md`.
6. `root`, every `relativePath`, and `_registry.json` now say `public/assets/svg/...` (the actual
   package layout). Added `publicUrl` (`/assets/svg/...`) per asset for Next.js consumption,
   documented in the manifest's new `pathPolicy` field.

## Files touched this pass
`ASSET_MANIFEST.json`, `_registry.json`, `ASSET_AUDIT.md` (§K appended). `ASSET_USAGE_GUIDE.md`
was already correct on paths/animation order from the prior pass — left as-is.

## Machine-readable QA
See `REV5_METADATA_FIX_QA.json` in this package: per-file path/checksum/revision consistency,
byte-identity vs. the prior package, and a summary block. All checks PASS; 0 row failures.

## Still NOT RUN (unchanged from prior passes, honestly)
Browser rendering, GSAP stroke-draw behavior, and any Next.js/application runtime test — no
browser or app runtime is available in this environment.

Not FINAL, not LOCKED. Candidate for independent acceptance.
