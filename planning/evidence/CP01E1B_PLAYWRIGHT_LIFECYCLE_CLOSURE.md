# CP-01E.1B — Playwright Harness Lifecycle Closure

Status: BLOCKED / NOT CLOSED

## Scope

This checkpoint changed only the isolated Playwright harness and its evidence profile. Scene, design, asset, runtime, authorization, release-policy, and canonical source files were not intentionally changed.

## Root-cause findings

- CP-01E.1A established that isolated copied dependencies and separate Next output directories are required; the permanent harness now derives its default output directory from the isolated port (`.next-e2e-<port>`).
- The server wrapper now records the exact spawned Next PID and uses targeted Windows process-tree cleanup (`taskkill /PID <captured-pid> /T /F`) without image-name matching.
- The wrapper also watches its launcher parent and standard-input closure, and exits when the captured child exits.
- The actual final runs reached test 40/40 but did not emit a Playwright result or exit code. A focused run of the final S03 test reproduced the hang before a result. This means the 40/40 acceptance gate is not proven.
- The test-owned Node/cmd trees could not be terminated from this session: `taskkill /PID <exact-test-pid> /F` returned `ERROR: Access denied`. No unrelated process was terminated.

## Exact changes

- `scripts/start-e2e-server.mjs`: exact PID capture, port-scoped output directory, parent/stdio shutdown detection, and targeted process-tree cleanup.
- `playwright.e2e-isolated.config.ts`: explicit Windows shutdown configuration.
- `src/evidence/packaging/profiles.ts`: registered the CP-01E.1B inspection profile.
- This evidence report.

## Verification ledger

| Check | Result | Details |
|---|---|---|
| Permanent isolated E2E | BLOCKED | Runs on ports 3026–3030 reached `[40/40]` but produced no final summary/exit; focused last-test run also hung. |
| Test count | NOT RUN as accepted result | 40 discovered in each full run; 0 pass/fail/skip cannot be asserted without Playwright completion. |
| Typecheck | PASS | `npm run typecheck`, exit 0. |
| Unit tests | PASS | `npm run test:unit`, 7 files / 116 tests passed, exit 0. |
| Lint | FAIL / ENVIRONMENTAL | `npm run lint`, exit 1; generated isolated `.next-e2e-*` output was scanned and reported. Protected old writers recreated output after cleanup. |
| Production build | PASS | `npm run build`, Next 16.4.2 Turbopack, exit 0. |
| Release validator | PASS (expected nonzero) | `npm run validate:release`, exit 1; verdict `NOT_READY`, with S04 photo HOLD and S05–S12 incomplete. |
| Post-run port check | PASS for tested ports | Ports 3026–3031 had no listener at inspection time. |
| Process cleanup | BLOCKED | Exact test-owned PIDs were identified, but this session received Access Denied from Windows when attempting termination. |
| Shared process safety | PASS | No broad image-name termination was used; unrelated long-lived processes were left untouched. |

## Audit package

The registered `checkpoint-cp01e1b` evidence packager completed verification:

- Output: `C:\Users\jakkob\Downloads\THELAST_CP01E1B_PLAYWRIGHT_LIFECYCLE_AUDIT.zip`
- Payload files: 13
- Payload bytes: 46,837
- Archive SHA-256: `b2ae57002cfd97774e0133500be5a97b6bcd92bf3414b1d12da3a3f54780f9e6`
- Packager manifest: VERIFIED

## Commands

Permanent command attempted:

```text
$env:PLAYWRIGHT_PORT='3029'; npm exec playwright test -- --config=playwright.e2e-isolated.config.ts --reporter=line
```

Diagnostic focused command:

```text
$env:PLAYWRIGHT_PORT='3031'; npm exec playwright test -- --config=playwright.e2e-isolated.config.ts --grep "keeps content usable under text enlargement" --reporter=line --timeout=30000
```

## Remaining limitations

The harness is not closed until the exact Windows launcher ownership is run in a context permitted to terminate the spawned process tree, and the complete suite returns `40 passed / 0 failed / 0 skipped / exit 0`. Lint must also be rerun after all test-generated output is absent. S04 remains DESIGN LOCKED / PRODUCTION HOLD.

Final status: **CP-01E.1B — BLOCKED / NOT CLOSED**
