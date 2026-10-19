# CP-01E.1C — Playwright Hang & Lint Closure

Status: VERIFIED / INDEPENDENT REVIEW PENDING

## Diagnosis

The bounded final S03 probe showed that the hang was not in application assertions or the final screenshot:

1. Asset route interception completed.
2. Navigation to S03 completed.
3. Font enlargement completed.
4. DOM assertions completed.
5. Layout metrics completed.
6. Screenshot completed.
7. Page close completed.
8. The prior harness then hung before the Playwright result, during webServer shell/reporter teardown.

The prior shell-based `webServer` launched an intermediate Windows command process. Its cleanup depended on terminating that process tree; CP-01E.1B recorded Windows `Access denied` for exact-PID termination. This left the webServer teardown promise unresolved even though the test body had completed.

## Correction

- Added `scripts/playwright-e2e-global-setup.mjs`.
- `playwright.e2e-isolated.config.ts` now uses Playwright global setup/teardown and a direct Next child process instead of shell-based `webServer` teardown.
- Direct child PID 14620 exited after the focused run; direct child PID 12996 exited after the full run.
- The isolated output directory remains port-scoped as `.next-e2e-<port>`.
- Added `trace: "retain-on-failure"` for bounded diagnostics.
- Added narrow ESLint ignores for `.next-e2e-*/**` and the legacy isolated `.next-e2e/**` directory. Source, tests, scripts, and configuration remain linted.
- Added diagnostic logging and bounded stage timeouts to the final S03 test without changing its assertions.

## Verification

| Check | Result |
|---|---|
| Focused final S03 E2E | PASS — 1 passed, exit 0, 13.2s; all diagnostic stages completed |
| Full isolated E2E | PASS — 40 passed / 0 failed / 0 skipped, exit 0, 2.6m |
| Server cleanup | PASS — direct server PID 12996 exited; port 3042 had no listener after completion |
| Typecheck | PASS — exit 0 |
| Lint | PASS — exit 0 |
| Unit tests | PASS — 7 files / 116 tests, exit 0 |
| Production build | PASS — exit 0 |
| Release validator | PASS as expected incomplete result — `NOT_READY`, exit 1 |

## Commands

Focused:

```text
$env:PLAYWRIGHT_PORT='3041'; npm exec playwright test -- --config=playwright.e2e-isolated.config.ts --grep "keeps content usable under text enlargement" --reporter=line
```

Full suite:

```text
$env:PLAYWRIGHT_PORT='3042'; npm exec playwright test -- --config=playwright.e2e-isolated.config.ts --reporter=line
```

Regression checks:

```text
npm run typecheck
npm run lint
npm run test:unit
npm run build
npm run validate:release
```

## Boundaries

No scenes, runtime, Zustand, authorization, release policy, REV5 SVGs, fonts, photographs, Vault assets, canonical documents, dependencies, deployment, commit, or push were changed. S04 remains DESIGN LOCKED / PRODUCTION HOLD. The real release validator remains `NOT_READY`.

Final status: **CP-01E.1C — VERIFIED / INDEPENDENT REVIEW PENDING**
