# CP-01D.3 — Evidence Packaging Guard

## 1. Checkpoint scope — PASS

Implemented a Node/build-tool evidence packager only. No scene, runtime, state, authorization, release-validator, asset, font, canonical document, hosting, or deployment source was changed. Git HEAD at preflight was `d6503b9c244a59513a8c71a2801042c7fa044a9b`; the existing dirty working tree was preserved.

## 2. Sources inspected — PASS

Inspected PRD, Design System, Implementation Plan, Final Flow, Tech Spec, final design-direction lock, photo/Icon-SVG/scene fragments, CP-00B architecture and asset plans, CP-01D through CP-01D.2 evidence, authorization source, release-validator source, package/test configuration, evidence layout, runtime/scene boundaries, Node/npm versions, and available Windows archive tools.

Preflight versions: Node `v22.18.0`, npm `10.9.3`. Available dependency-free archive facilities: PowerShell `Compress-Archive`, .NET `System.IO.Compression`, and bsdtar 3.8.9. The implementation uses a bundled PowerShell/.NET bridge so ZIP entry order and timestamps can be controlled explicitly.

## 3. Architecture — PASS

- `types.ts`: readonly profile, inventory, manifest, result, and stable reason-code contracts.
- `profiles.ts`: controlled versioned profiles; no runtime JSON profiles.
- `policy.ts`: canonical path normalization, privacy denylist, type classification, duplicate/case-collision checks.
- `inventory.ts`: lstat/realpath containment, regular-file enforcement, byte hashing, required/optional handling.
- `archive.ts`: narrow process bridge and archive SHA-256.
- `packager.ts`: trusted profile selection, output policy, staging, TOCTOU copy verification, manifest/report creation, archive reopening, safe extraction, hash/count verification, and cleanup.
- `zip-bridge.ps1`: sorted ZIP entries, fixed `2000-01-01T00:00:00Z` metadata, unsafe-member rejection, duplicate rejection, SHA-256 inspection, and safe isolated extraction.
- `cli.ts`: constrained `--profile` plus validated optional `--output-dir`; no include/private/force/profile-definition bypass.

## 4. Registered profiles — PASS

1. `scene-s03-audit` v1.0.0: explicit S03 source, runtime contracts, focused tests/evidence, and two approved public celebration SVGs.
2. `governance-cp01d2` v1.0.0: explicit release-validator, authorization, tests, configuration, and CP-01D.2 evidence.
3. `checkpoint-cp01d3` v1.0.0: packaging implementation, packaging tests, configuration, and this checkpoint evidence.

There are no S04–S12 speculative profiles and no recursive repository-wide include rule.

## 5. Allowlist, trust, and privacy — PASS

Every payload member originates from a registered source-controlled profile. Arbitrary file lists, caller JSON, `approved: true`, environment claims, and arbitrary directories are not accepted. Profile selection grants audit-package membership only; it does not grant asset publication permission.

Hard denial covers `.env*`, credentials/private keys, `.git`, `.next`, `node_modules`, font trees and font binaries, `assets/`, `assets-final/`, Vault/GLB, the restricted photograph identifier, confession content, unknown extensions, and unclassified files. No synthetic authorization constructor is imported by production packaging code.

No restricted photograph, photo bytes, private metadata, letter, confession, font binary, or Vault asset was read or packaged.

## 6. Filesystem and ZIP safety — PASS

Windows drive paths, UNC paths, absolute paths, `..`, mixed-separator traversal, duplicate paths, case-insensitive collisions, links/junction-like entries, root escapes, output-inside-source, and output collisions fail closed. Archive names use forward slashes. ZIP inspection rejects absolute, backslash, drive-letter, traversal, and duplicate members before extraction.

The source copy is rehashed after staging, and archived bytes are independently hashed after reopening. This narrows but cannot eliminate filesystem TOCTOU; re-run packaging immediately before handoff if source files change.

## 7. Manifest and determinism — PASS

`EVIDENCE_MANIFEST.json` schema v1 records profile/checkpoint/version, Git revision, canonical path, required/optional class, evidence category, byte size, and SHA-256 for every source payload. It does not self-hash. `PACKAGING_REPORT.md` is deterministic and states that packaging is not publication authorization.

Synthetic identical-input packaging generated two byte-identical archive SHA-256 values. Stable source bytes, profile version, bridge version, and Git revision therefore produced byte-for-byte identical ZIPs in the tested Windows environment. Cross-platform ZIP implementation identity is not claimed.

## 8. CLI — PASS

Command: `npm run package:evidence -- --profile <registered-profile> [--output-dir <absolute-directory>]`.

Exit 0 requires archive creation plus manifest/hash/count/member/extraction verification. Missing required evidence, denied input, collision, filesystem error, ZIP failure, or verification failure returns nonzero. Existing archives are never overwritten.

## 9. Changed files

Created `src/evidence/packaging/` (eight files), `tests/unit/evidence-packaging.test.ts`, and this evidence report. Modified `package.json` only to add `package:evidence`. No files were removed.

## 10. Positive and negative tests — PASS with explicit limitations

Focused command: `npx vitest run tests/unit/evidence-packaging.test.ts`.

Result: PASS, 24 tests. Coverage includes 20 denial/security cases and 4 grouped positive behaviors, including registered profiles, exact SHA-256 inventory, optional missing warnings, full create/reopen/extract/verify, byte reproducibility, and output collision denial.

Explicitly covered: unknown/forged profile, traversal, Windows absolute, UNC, mixed traversal, hard-denied photo/env/key/node_modules/.next/font/Vault paths, unknown extension, duplicate and case collision, missing required, optional missing, symlink, safe synthetic hashing, full manifest/archive verification, reproducibility, and no-overwrite.

NOT RUN as independently injected malformed-ZIP unit fixtures: external junction escape, duplicate-member third-party ZIP, corrupted central directory, and post-inventory mutation race. The production bridge contains fail-closed checks for these categories, but dedicated hostile archive fixture generation would require additional test harness work. This limitation does not relax real-package verification.

## 11. Project verification

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS, exit 0 |
| `npm run lint` | PASS, exit 0 |
| `npm run test:unit` | PASS, 7 files / 95 tests, exit 0 |
| `npm run build` | PASS, exit 0 |
| default `npm run test:e2e` | BLOCKED, exit 1: pre-existing PID 6636 owns shared `.next` dev lock; process untouched |
| isolated full E2E, port 3013 | FAIL, 37 passed / 3 failed; temporary dev server raised `Unexpected end of JSON input` during three S03 cases |
| configured production smoke | FAIL, 1 failed: reused port-3002 server returned the previously documented stale CSS 500 |
| `npm run validate:release` | EXPECTED NOT READY, exit 1 |

The E2E and configured production-smoke failures are recorded honestly and were not changed in this infrastructure checkpoint. CP-01D.2's separate fresh-artifact production closure remains the relevant production-artifact diagnosis, but its historical count is not substituted for these current commands.

## 12. Real package smoke — PASS

Profile `checkpoint-cp01d3` resolved only its explicit source, test, configuration, and evidence entries. The produced ZIP was reopened, member-checked, safely extracted to a tool-owned temporary directory, and every payload size/SHA-256 was compared with the manifest. Restricted categories were absent. Exact archive path, size, count, and SHA-256 are reported by the CLI/final delivery.

Successful packaging validates the packaging workflow only; it is not a website, content, release, or deployment approval.

## 13. Complete-release status — NOT READY

`npm run validate:release` remained unchanged and returned `NOT_READY`, exit 1, including S04 photo HOLD, S04 development/missing renderer, S05–S12 missing renderers, missing scene evidence, and unverified owner release authorization.

## 14. Limitations and deferred work

- Filename/profile provenance cannot prove that arbitrary screenshot pixels contain no sensitive content. Only explicitly checkpoint-authorized artifacts may be profiled.
- CP-01D.2A release-validator hardening remains deferred and must not be inferred from this package guard.
- Deployment enforcement remains deferred.
- S04 photo authorization and PhotoPlan remain HOLD.
- S04–S12 implementation remains future authorized work.

## 15. STOP

No deployment, commit, push, photo processing, scene implementation, release-validator modification, or next checkpoint was performed.
