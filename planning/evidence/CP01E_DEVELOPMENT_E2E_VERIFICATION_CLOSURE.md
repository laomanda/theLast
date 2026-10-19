# CP-01E — Development E2E Verification Closure

Status: **VERIFIED / INDEPENDENT REVIEW PENDING**

## Environment diagnosis

Candidate revision: `d6503b9c244a59513a8c71a2801042c7fa044a9b`.

Environment: Windows, project working directory `C:\Users\jakkob\Downloads\Mal this from Kob\theLast`, Node `v22.18.0`, npm `10.9.3`, Next `16.4.2`, Playwright `1.64.1`.

The initial working tree was already dirty from earlier approved checkpoints. This checkpoint did not modify protected application, scene, runtime, authorization, release, asset, font, photo, Vault, or canonical files. The committed Playwright configuration received only test-harness isolation changes:

- test directory: `./tests/e2e`
- default port: `3001` unless `PORT` is supplied
- webServer: `npm run dev -- -p <port>`
- URL: `http://127.0.0.1:<port>`
- `reuseExistingServer: false`
- optional `PLAYWRIGHT_PORT`
- 120-second web-server startup timeout
- one worker, Chrome channel, touch enabled

No secret-valued environment variable was recorded. At diagnosis time there were no active listeners on the inspected ports 3000, 3002, 3015, 3017, or 3018. A prior default-run collision reported a Next server on port 3000 owned by PID 20604; it was not stopped. The configured default and the observed stale server therefore did not describe one clean, test-owned lifecycle.

The project `.next` tree contained both development and production/build artifacts, including `dev`, `build`, `server`, `static`, `BUILD_ID`, and build manifests. Earlier logs recorded both `Unexpected end of JSON input` in Next dev vendor output and missing `dev/server/pages/_app/build-manifest.json`.

## Root-cause classification

Initial failures were **ENVIRONMENT / TEST_HARNESS**.

Evidence:

1. The default command failed before test execution because another Next dev server was already running.
2. A corrected isolated clone using a junctioned `node_modules` used a dedicated port `3020`, `reuseExistingServer: false`, explicit temporary working directory, and a supported Next `distDir: ".next-e2e"`. It failed before test discovery with Turbopack’s `Could not find the Next.js package (next/package.json)` followed by repeated:

   `ENOENT: no such file or directory, open '<temporary>\\.next-e2e\\dev\\server\\pages\\_app\\build-manifest.json'`

3. Repeating the comparison with real copied `node_modules` removed the package-resolution failure. Both Turbopack and Webpack then served the same application and completed all 40 tests. The App Router does not generate the Pages Router `_app/build-manifest.json`; route readiness and the full browser suite are the valid checks here.

The first isolated attempt had a temporary wrapper syntax error while creating the clone configuration; it was corrected and rerun. The corrected run is the one classified above.

## Remediation attempted

The minimal committed test-harness remediation is:

- `playwright.config.ts` refuses stale-server reuse, accepts `PLAYWRIGHT_PORT`, and has a bounded startup timeout;
- `next.config.ts` supports the explicit `NEXT_DIST_DIR` override while retaining `.next` by default;
- `playwright.e2e-isolated.config.ts` and `scripts/start-e2e-server.mjs` provide a dedicated test-owned server path.

The controlled comparison used temporary clones with:

- added supported Next `distDir: ".next-e2e"`;
- used port `3020`;
- set `reuseExistingServer: false`;
- started a new server through Playwright from the clone’s working directory;
- tied browser execution to that server’s URL.

The junctioned dependency workspace was the first failure source. Real copied dependencies removed it. No process outside the test-owned attempts was terminated.

## E2E outcomes

| Run | Result |
|---|---|
| Default `npm run test:e2e` before remediation | BLOCKED, exit 1; webServer reported another Next dev server already running; no test execution claimed |
| Experiment A — Turbopack, real copied dependencies, port 3023 | PASS, exit 0; 40 discovered, 40 passed, 0 failed, 0 skipped |
| Experiment B — Webpack, real copied dependencies, port 3024 | PASS, exit 0; 40 discovered, 40 passed, 0 failed, 0 skipped |
| Committed isolated harness, port 3026 | All 40 reached PASS, but wrapper teardown did not return an exit within observation; retained as a lifecycle residual, not used to replace the two clean exit-0 experiments |
| Historical CP-01D.3A isolated development run | FAIL, 40 discovered; 37 passed / 3 failed; `Unexpected end of JSON input` during S03 cases. This remains historical and is not relabeled. |
| Fresh isolated production smoke, port 3021 | PASS, 1/1; build exit 0, HTML 200, 9/9 referenced CSS/JS assets HTTP 200 |

The required 40/40 development acceptance gate was met by both controlled comparison runs. No assertions were changed, skipped, retried to manufacture success, or weakened.

## Other verification

| Command | Result |
|---|---|
| `npm run typecheck` | PASS, exit 0 |
| `npm run lint` | PASS, exit 0 |
| `npm run test:unit` | PASS, 7 files / 116 tests, exit 0 |
| `npm run build` | PASS, exit 0 |
| `npm run validate:release` | NOT_READY, exit 1; S04 HOLD and S05–S12 incomplete |

## Protected-source confirmation

No S01–S03 implementation, S04 boundary, runtime contract, TransitionEngine, Zustand state, authorization issuer boundary, release-validator logic, SVG, font, photo, Vault, canonical document, deployment configuration, or private content was modified. No private photograph was read. No commit, push, or deployment occurred.

## Remaining limitation and next action

The committed wrapper’s Windows teardown behavior should be independently reviewed before making it the only CI entrypoint. The two clean, test-owned comparison runs are independently reproducible and exit 0. Do not begin S04 or deployment work.

