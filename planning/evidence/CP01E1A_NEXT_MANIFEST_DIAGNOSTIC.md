# CP-01E.1A — Next.js Development Manifest Diagnostic

Status: **VERIFIED / INDEPENDENT REVIEW PENDING**

## Finding

The failure had two environment causes. First, isolated clones using a junctioned `node_modules` directory caused Turbopack to report `Could not find the Next.js package (next/package.json)`; the missing `_app/build-manifest.json` errors were a secondary symptom. Second, the probe treated the Pages Router `_app/build-manifest.json` as mandatory even though this project uses the App Router and does not emit that file.

With real copied dependencies, isolated output directories, dedicated ports, no server reuse, and the same 40 browser tests:

- Experiment A — default Turbopack, port 3023: 40 passed / 0 failed / 0 skipped, exit 0.
- Experiment B — Webpack, port 3024: 40 passed / 0 failed / 0 skipped, exit 0.

Fresh production smoke also passed 1/1 on port 3021 with HTML 200 and 9/9 referenced CSS/JS assets returning HTTP 200.

## Minimal harness remediation

- `playwright.config.ts`: `reuseExistingServer: false`, optional `PLAYWRIGHT_PORT`, bounded startup timeout.
- `next.config.ts`: `NEXT_DIST_DIR` override, default remains `.next`.
- `playwright.e2e-isolated.config.ts`: dedicated isolated E2E configuration.
- `scripts/start-e2e-server.mjs`: test-owned Next server launcher.

No scene, runtime, authorization, release, design, asset, font, photograph, Vault, canonical, or deployment source was changed. The full chronology and environment logs are in `CP01E_DEVELOPMENT_E2E_VERIFICATION_CLOSURE.md`.

