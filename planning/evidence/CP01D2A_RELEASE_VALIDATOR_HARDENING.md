# CP-01D.2A — Release Validator Hardening

Status: **IMPLEMENTED / INDEPENDENT REVIEW PENDING**

## Authority sources inspected

Inspected the PRD, Design System, Implementation Plan, Final Flow, Technical Spec, final design-direction lock, relevant locked scene/asset fragments, CP-01D through CP-01D.3B evidence, current authorization modules, release validator, tests, scripts, and build configuration. The existing technology stack and `EDITORIAL_SURFACE_FIRST` decision were preserved.

Initial candidate revision: `d6503b9c244a59513a8c71a2801042c7fa044a9b`. Existing dirty-worktree changes were preserved. No private photograph was accessed.

## Changed-file inventory

- `src/release/types.ts`
- `src/release/policy.ts`
- `src/release/scene-registry.ts`
- `src/release/filesystem.ts`
- `src/release/validator.ts`
- `tests/unit/release-validator.test.ts`
- `src/evidence/packaging/profiles.ts`
- this report

No runtime, Zustand, UI, authorization issuer boundary, SVG, font, Vault, private photograph, canonical document, or deployment file was modified.

## Trusted readiness architecture

Each canonical scene remains independently checked. Scene declarations now distinguish implementation completeness, asset authorization, scene acceptance, and publication authorization in addition to the existing readiness/content evidence. Missing, duplicate, unknown, or incomplete declarations fail closed with deterministic reason codes.

The current scene registry is a fixed source-controlled declaration. The owner-release boundary is a typed fixed source boundary whose current value is `null`; the validator does not accept owner approval from arbitrary JSON, CLI flags, environment variables, or caller booleans. No synthetic approval was created. Future authorization must be added through the designated trusted source and remain candidate-bound.

S04 remains a development boundary with zero approved authentic photos and therefore remains `DESIGN LOCKED / PRODUCTION HOLD`. S05–S12 remain incomplete.

## Static-output and integrity coverage

- `public/` and `.next/static/` are recursively inspected through regular-file, link, and realpath containment checks.
- Public raster files remain unauthorized unless an explicit future policy exists; generated raster files in `.next/static/` receive a separate `GENERATED_RASTER_UNAUTHORIZED` denial rather than treating all generated JS/CSS artifacts as unauthorized.
- Missing/unsafe build output is blocked.
- The generated static tree receives a deterministic SHA-256 attestation over sorted relative paths and per-file hashes. This is a bounded integrity attestation for the validation snapshot, not deployment enforcement; a later mutation or unbound deployment can still invalidate it.
- REV5 source inventory and the four approved deployed SVGs continue to require byte-identical source, manifest, and deployed hashes.

## Negative security coverage

Focused release tests cover:

- traversal, absolute, symlink, and supported junction/escape boundaries;
- duplicate and malformed scene declarations;
- independent missing implementation/asset/acceptance/publication evidence;
- forged owner-approval-like input remaining blocked;
- S04 zero/one/multiple-photo policy and global multi-photo allocation;
- actual four-SVG integrity verification;
- generated-output mutation producing a different attestation;
- privacy-safe diagnostics without private-photo paths.

The current packager profile is fixed and includes only explicit release, authorization, test, configuration, and evidence paths. No arbitrary-file packaging mode was added.

## Verification results

| Check | Result | Actual result |
|---|---|---|
| focused release validator tests | PASS | 13 tests passed, exit 0 |
| `npm run typecheck` | PASS | exit 0 |
| `npm run lint` | PASS | exit 0 |
| `npm run test:unit` | PASS | 7 files, 115 tests passed, exit 0 |
| `npm run build` | PASS | exit 0 |
| `npm run test:e2e` | BLOCKED | exit 1; configured webServer could not start because another Next dev server was already running on port 3000 (PID 20604); process was not stopped |
| isolated development E2E | BLOCKED | fresh temporary runner reproduced missing `.next/dev/server/pages/_app/build-manifest.json` before test execution |
| fresh isolated production smoke | PASS | fresh Webpack build, isolated port 3018, HTML 200, all referenced CSS/JS assets HTTP 200, production smoke 1/1 passed |
| `npm run validate:release` | PASS as denial behavior | exit 1, verdict `NOT_READY` |

The release validator output remains deterministic in ordering and privacy-safe. It does not claim READY.

## Deferred deployment enforcement

The candidate-output attestation is not a deployment lock. A deployment system must bind the validated artifact digest to the deployed artifact and reverify at the deployment boundary. This checkpoint does not implement deployment, signing, or hosting enforcement.

## Audit package

The fixed `checkpoint-cp01d2a` profile produced `THELAST_CP01D2A_RELEASE_VALIDATOR_AUDIT.zip` with 24 payload files and 26 total ZIP entries. The archive was extracted and independently checked against its manifest; no forbidden entries were present. The final archive SHA-256 is reported in the handoff because embedding a ZIP’s own hash would be self-referential.

## Residual limitations

- The current project has no authentic complete-release owner authorization, so READY is intentionally unreachable.
- Full development E2E has a known isolated Next webServer/build-manifest failure; it must remain reported as BLOCKED or FAIL if reproduced.
- Generated static raster policy is explicit and fail-closed; future authorized generated raster classes require a reviewed policy update.

