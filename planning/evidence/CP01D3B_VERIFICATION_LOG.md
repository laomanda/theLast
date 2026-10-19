# CP-01D.3B — Redacted Verification Log

All commands were run against the project candidate at Git revision `d6503b9c244a59513a8c71a2801042c7fa044a9b`. No credentials, environment values, private paths, or personal content are recorded here.

| Command/configuration | Result |
|---|---|
| `npx vitest run tests/unit/evidence-packaging.test.ts` | PASS — 41 tests |
| `npm run typecheck` | PASS — exit 0 |
| `npm run lint` | PASS — exit 0 |
| `npm run test:unit` | PASS — 7 files / 112 tests |
| `npm run build` | PASS — exit 0 |
| `PORT=3016 npm run test:e2e` in fresh temporary clone | BLOCKED — temporary Next webServer reported missing `.next/dev/server/pages/_app/build-manifest.json` before test execution |
| Fresh `next build --webpack` + `next start -p 3017` | PASS — build exit 0; HTML 200; 9/9 referenced CSS/JS assets HTTP 200 |
| `npx playwright test --config=playwright.production.config.ts` against port 3017 | PASS — 1/1 |
| `npm run validate:release` | NOT_READY — exit 1; release denial preserved |

Historical CP-01D.3A development E2E remains separately recorded as 37 passed / 3 failed. The prior CP-01D.3A production smoke remains separately recorded as 1/1 passed on port 3015.

