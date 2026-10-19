# CP-01D.3A — Packaging Integrity Closure

Status: **IMPLEMENTED / INDEPENDENT REVIEW PENDING**

This checkpoint hardens the CP-01D evidence packager only. Runtime, Zustand, S01–S03, the S04 HOLD boundary, authorization core, release validator, canonical documents, assets, fonts, deployment, and private photographs were not modified or processed.

## Scope and correction summary

- `src/evidence/packaging/profiles.ts`: registered profiles are deeply immutable; callers receive a defensive structured clone. The CP-01D.3A profile uses an explicit S03 PNG allowlist.
- `src/evidence/packaging/policy.ts`: restricted/private paths remain denied; PNG evidence is permitted only at explicitly registered paths.
- `src/evidence/packaging/inventory.ts`: PNG evidence is validated as a decodable PNG with valid signature, IHDR, dimensions, and size accounting.
- `src/evidence/packaging/packager.ts`: source bytes are rehashed after staging; extracted archive contents are checked against the exact expected manifest, profile metadata, path set, categories, requirements, byte counts, hashes, manifest bytes, report bytes, and payload bytes. Final output uses exclusive creation and never deletes an existing foreign archive.
- `tests/unit/evidence-packaging.test.ts`: regression coverage includes profile mutation, forged allowlist injection, collision ownership, concurrent output races, manifest/report/path/hash/category/requirement tampering, PNG allowlist and integrity checks, and a complete CP-01D.3A package smoke.

## Security and integrity findings

PASS — A caller cannot inject an allowlisted path by mutating a registered profile or a returned profile object. Deep freezing protects the registry and defensive cloning prevents returned-object mutation from reaching the registry.

PASS — Existing output ownership is preserved. A pre-existing destination remains byte-identical on collision; exclusive finalization is also covered by a race regression.

PASS — The archive is not accepted merely because a manifest parses. The extracted manifest and report must match the expected metadata and bytes, every payload path must be exact, and duplicate, omitted, extra, tampered, or mismatched entries are rejected.

PASS — PNG evidence is limited to explicitly authorized S03 screenshot paths. Recursive or arbitrary PNG files, personal-photo paths, private narrative paths, and credential-like paths remain rejected.

PASS — The package is evidence only. It does not grant release, publication, or deployment authorization.

## Verification results

| Check | Result | Actual result |
|---|---|---|
| `npm run typecheck` | PASS | exit 0 |
| `npm run lint` | PASS | exit 0 |
| focused packaging suite | PASS | 1 file, 40 tests passed, exit 0 |
| full unit suite | PASS | 7 files, 111 tests passed, exit 0 |
| `npm run build` | PASS | exit 0 |
| default development E2E | BLOCKED/FAIL | shared `.next` lock/server on PID 6636 prevented the default runner from launching its configured server; PID 6636 was not stopped |
| isolated development E2E | FAIL | 40 tests: 37 passed, 3 failed; failures were S03 tests 31, 33, and 35 |
| isolated development E2E diagnosis | FAIL (preserved) | the temporary Next dev server emitted `Unexpected end of JSON input` from `.next\\dev\\server\\vendor-chunks\\next.js`; browser contexts then lacked the expected S02 scene. This is not relabeled as a pass. |
| fresh isolated production build | PASS | Next 16.4.2 Webpack build exit 0 |
| fresh isolated production asset checks | PASS | main HTML 200; all 9 referenced CSS/JS chunks 200 |
| fresh isolated production browser smoke | PASS | 1 test passed, exit 0, port 3015; no page errors, console errors, or failed responses |
| `npm run validate:release` | NOT_READY (expected) | exit 1; explicit owner-approval, scene-evidence, S04 development-boundary/renderer, S04 photo-HOLD, and S05–S12 renderer reasons |

The fresh production server was started only from the matching isolated build artifact on port 3015. The pre-existing port-3002 process was not reused or interrupted. Temporary build/server workspaces were removed after verification.

## Release-validator closure

The current candidate revision was `d6503b9c244a59513a8c71a2801042c7fa044a9b`. The validator returned `NOT_READY` with exit 1. It retained the required honest S04 state: zero approved authentic photographs, no private source inspection, a development boundary, and no complete S04 renderer. No false READY result was produced.

## Protected-source confirmation

No private photograph was read, copied, inspected, or included. No canonical source, SVG, font, Vault, application/runtime file, or deployment configuration was modified by the packaging verification. The pre-existing CP-01D.3 archive was not overwritten.

## Remaining limitations

- The three isolated development-E2E failures remain recorded as a dev-server artifact/runtime failure and require independent review or a later environment-specific fix; they are not evidence of a packaging pass.
- Release remains intentionally `NOT_READY` until the outstanding scene, evidence, owner-approval, and S04 photo-HOLD conditions are resolved by their authorized checkpoints.

