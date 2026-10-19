# CP-01D.2 — Production Smoke Verification Closure

## Scope

Read-only verification of the prior production-smoke failure. No application source, validator, runtime, authorization core, scene, asset, canonical document, shared `.next`, or existing process was modified or interrupted.

## Initial failure — FAIL (historical result preserved)

The configured production smoke test used `playwright.production.config.ts`, whose web server was `npm run start -- -p 3002` with `reuseExistingServer: true`. The failed run reused an already-running server and reported HTTP 500 for:

`/_next/static/css/3-twuugkhfefc.css`

The test failed its zero-console-error/zero-failed-response assertion. The original smoke result remains FAIL; it is not relabeled as PASS.

## Root-cause evidence — PASS for stale/mismatched-server diagnosis

The fresh verification used a temporary workspace, a fresh production build of the current source, and a new server on port 3012. Its generated HTML referenced a different CSS artifact:

`/_next/static/css/0615af9f1a181dbe.css`

The 3002 failure referenced an older/different CSS chunk while the fresh candidate generated and served its own matching chunk. The fresh artifact also generated a new set of JavaScript chunk hashes. This, combined with `reuseExistingServer: true`, is consistent with the 3002 process serving a stale or mismatched production build. The failure was not reproduced by the current artifact.

The prior process was not killed or interrupted. At the start of this closure check, port 3002 was no longer listening, so process identity could not be re-confirmed live; the configuration and captured failure output are the evidence boundary.

## Isolated build and server — PASS

- Temporary workspace: `%TEMP%\\thelast-cp01d2-prod` (removed after verification).
- Build source: current project working tree at Git revision `d6503b9c244a59513a8c71a2801042c7fa044a9b`.
- Build command: `npm run build -- --webpack`.
- Build result: PASS, exit 0.
- Server: new `next start` process from that temporary `.next` artifact.
- Isolated port: `3012`.
- Shared project `.next` was not used or modified by this verification.
- The temporary build used production webpack because Turbopack rejects a dependency junction outside its workspace; this was an isolated tooling adaptation, not a committed configuration change.

## HTTP artifact checks — PASS

The isolated server returned HTTP 200 for the main document. The CSS referenced by the returned HTML returned HTTP 200 with 26,456 bytes. All eight referenced JavaScript chunks returned HTTP 200:

- `polyfills-42372ed130431b0a.js`
- `webpack-e98312060495209e.js`
- `main-app-2deb9d57a9d646bf.js`
- `955b3819-26d8ff6bf76ced1e.js`
- `142-91ce5aaecb70eb3e.js`
- `965f74d4-98fdb7b0636ac7b9.js`
- `105-7426f5275619031c.js`
- `app/page-bd4667bcf3920ecc.js`

CSS: `0615af9f1a181dbe.css`, HTTP 200. No referenced CSS/JS request failed.

## Browser smoke — PASS

Temporary Playwright configuration targeted only `http://127.0.0.1:3012`. `npx playwright test --config=playwright.production.config.ts` completed **1 passed, 0 failed, exit 0**.

The test verified S03 rendering, honest S04 boundary behavior, production fixture inertness, and absence of browser/page errors. No CSS or JavaScript console/request errors were reported. Normal informational browser messages were not treated as failures.

## Privacy and security checks — PASS

No restricted photograph was read, hashed, decoded, copied, imported, or exposed. No public test authorization bypass was enabled. The fresh browser smoke did not change S04 HOLD behavior.

## Release validator reconfirmation — PASS (expected negative result)

`npm run validate:release` returned **exit 1**, verdict `NOT_READY`. Stable reasons included:

- `S04_PHOTO_HOLD`
- `CANONICAL_SCENE_DEVELOPMENT_BOUNDARY` for S04
- `CANONICAL_SCENE_RENDERER_MISSING` for S04–S12
- missing scene readiness/content evidence
- `RELEASE_OWNER_APPROVAL_UNVERIFIED`

No false READY result occurred.

## Remaining limitations — BLOCKED / NOT RUN

- The original 3002 server cannot be re-inspected after the fact because it was not running at closure time; its captured HTTP 500 and mismatched chunk reference remain the historical FAIL evidence.
- This check does not alter the default `reuseExistingServer` configuration; deployment environments should start and validate a candidate-bound server/artifact pair before release.
- No deployment enforcement or evidence packaging workflow was implemented.

## Final source-integrity statement

Only this evidence report and the requested audit ZIP are outputs of this closure task. No source, asset, validator, runtime, authorization, scene, or canonical document was modified.
