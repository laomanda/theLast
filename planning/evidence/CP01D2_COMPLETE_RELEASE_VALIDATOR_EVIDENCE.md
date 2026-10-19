# CP-01D.2 — Complete Experience Release Validator

## Scope and preflight — PASS

This checkpoint adds a separate, Node-only release gate. It does not publish, deploy, or alter the normal development/build flow. The inspected candidate began at Git HEAD `d6503b9c244a59513a8c71a2801042c7fa044a9b` with an already-dirty working tree; that pre-existing work was preserved.

Inspected authority and implementation sources included PRD, Design System, Implementation Plan, Final Flow, Tech Spec, scene-by-scene and photo fragments, the final design-direction lock, CP-00B plans, CP-01D/D.1/D.1A evidence, asset authorization modules, runtime/state, the shell, implemented scenes, REV5 manifest/source assets, public SVGs, package/build configuration, and test configuration.

The candidate is a Next.js build with `public/` source assets and `.next/` build output. Supported validator inventory is the regular `public/` tree plus `.next/static` and `.next/BUILD_ID`; unsafe links, absent output, and unrecognized roots fail closed. Private source directories are never recursively inspected.

## Architecture — PASS

- `src/release/types.ts`: stable verdicts, check states, reason codes, and fixed S01–S12 canonical IDs.
- `policy.ts`: pure scene and owner-release policy; caller inventories cannot shorten the canonical sequence.
- `scene-registry.ts`: fixed current source evidence, deliberately incomplete rather than self-authorizing.
- `filesystem.ts`: guarded child-path resolution and regular-file-only traversal without following links.
- `svg-integrity.ts`: actual SHA-256 inspection of the full 41-entry REV5 source inventory and the four current approved/deployed SVGs.
- `validator.ts`: candidate public/build inventory, public-photo detection, S04 HOLD integration, scene evaluation, and deterministic diagnostics.
- `cli.ts` and `npm run validate:release`: release-only, non-publishing command. Exit 0 is reserved for `READY`; `NOT_READY` and errors are nonzero.

The release-side SVG reference list is deliberately pinned to CP-01D.1's fixed approved declarations and is corroborated by the authoritative manifest plus live source/deployed bytes. It has no authority-issuer capability. The existing authorization policy is separately exercised for S04 zero/one/two and global multi-photo synthetic records; the actual candidate has the fixed zero-photo S04 registry state.

## Validation behavior — PASS / BLOCKED

Live SVG verification checks the 41 declared REV5 source files and checks A02, E01, C01, and C02 source/deployed SHA-256 values. All four current deployed SVG byte checks passed.

Public-output inspection treats client-accessible raster image files as unauthorized unless a future authorized publication workflow verifies them. It does not open, hash, decode, copy, log, or otherwise process the restricted private photograph.

S04 uses the approved cardinality policy: zero is HOLD, exactly one is future READY, and multiple S04 photos deny. Multi-photo allocation remains valid for separately approved non-S04 scenes. Development boundaries and missing renderers cannot satisfy complete release.

No trusted candidate-bound complete-release owner authorization channel currently exists; this is a distinct BLOCKED gate, not a JSON flag.

## Tests — PASS

`tests/unit/release-validator.test.ts` adds 10 focused checks covering canonical omission, positive synthetic scene policy, development boundary rejection, forged-ready resistance, S04 cardinality, global multi-photo behavior, traversal/absolute path rejection, live SVG checks, current-project rejection, and diagnostic redaction.

The synthetic matrix does not claim a real-project approval. External-link/junction and post-validation mutation checks are implemented through fail-closed traversal and the report records the operational requirement to revalidate immediately before deployment; no deployment enforcement exists in this checkpoint.

## Commands and results

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS, exit 0 |
| `npm run lint` | PASS, exit 0 |
| `npm run test:unit` | PASS, 6 files / 71 tests, exit 0 |
| `npm run build` | PASS, exit 0 |
| isolated `npm run test:e2e` | PASS, 40 passed in 3.1m, temporary workspace and port 3001 |
| `npx playwright test --config=playwright.production.config.ts` | FAIL, 1 failed: reused port-3002 server returned HTTP 500 for a hashed CSS chunk |
| `npm run validate:release` | EXPECTED NEGATIVE, exit 1 / `NOT_READY` |

The default E2E command initially could not launch because existing Next dev PID 6636 owned the original workspace lock. It was not stopped. The complete suite then ran from a temporary clone, with only its own temporary port-3001 server stopped afterward.

## Current release verdict — NOT READY

Observed deterministic blockers include `S04_PHOTO_HOLD`, `CANONICAL_SCENE_DEVELOPMENT_BOUNDARY` and `CANONICAL_SCENE_RENDERER_MISSING` for S04, `CANONICAL_SCENE_RENDERER_MISSING` for S05–S12, missing readiness/content evidence, and `RELEASE_OWNER_APPROVAL_UNVERIFIED`.

The nonzero validator exit is expected for this incomplete candidate and is not a validator test failure. Subsequent candidate changes invalidate this result; run the validator again immediately before any later authorized deployment.

## Changed files

Created `src/release/`, `tests/unit/release-validator.test.ts`, and this evidence file. Modified `package.json` only to add `validate:release`, and `tsconfig.json` only to permit Node-native TypeScript import extensions used by that command. No runtime, state, UI, authorization-core, canonical document, REV5 asset, font, private-photo, or deployment file was changed.

## Limitations and deferrals — BLOCKED

CP-01D.2 cannot itself prevent a manual or external deployment path. Candidate-bound owner authorization and deployment enforcement remain future authorized work. CP-01D.3 evidence packaging is deferred. The current production-smoke failure requires separate investigation; it was not changed or hidden here.

STOP: no S04 implementation, photo ingestion, deployment, commit, or push was performed.
