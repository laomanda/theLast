# CP-00B — Asset Integration Plan

## SVG REV5

Source package: `BIRTHDAY_SVG_REV5/public/assets/svg/`

Use `ASSET_MANIFEST.json`, `_registry.json`, and `ASSET_USAGE_GUIDE.md` as the only runtime allocation sources. The package currently contains 41 SVGs with matching paths and SHA-256 values. Preserve the seven families and their scene allocations; do not recreate them with CSS or new artwork.

Rendering rules:

- Inline SVG only where the manifest says `inline-svg-required` or where animation requires internal targets.
- External SVG for static decorative assets where the manifest says `external-svg`.
- Treat decorative SVGs as non-interactive; interactive behavior belongs to semantic HTML controls.
- GSAP may animate documented targets only; do not invent target IDs.
- Keep SVGs selective and scene-owned to avoid loading the complete library at startup.

Status: **VERIFIED INTEGRITY / OWNER-LOCKED PRODUCTION BASELINE / RUNTIME UNVERIFIED**. Owner-approved identifier: `SVG_PRODUCTION_BASELINE_LOCKED`.

## Fonts

Source packages: `font/bricolage-main/`, `font/Newsreader-master/`, `font/shantell-sans-main/`.

Proposed role mapping from `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` and Design System `## 4`:

- Bricolage Grotesque: display, UI, controls, labels, scene headings.
- Newsreader: emotional reading surfaces, letters, long-form narrative.
- Shantell Sans: restrained personal mark/accent only, never the default body face.

Prefer the browser-usable WOFF2 files. Select and explicitly record exact weights after typography rendering checks. Preserve OFL files and license notices in the deployed font package and record chosen subsets/weights in the future source-freeze report.

Status: **VERIFIED binaries/licenses; UNVERIFIED browser loading and visual fit**.

## Photography and personal content

No personal content should be fabricated. Scene 04 may consume an approved authentic portrait through a content manifest, but the current workspace does not contain approved recipient-specific photos or final copy. Keep content interfaces typed and empty/HOLD until supplied.

Source: `docs/PRD.md`, `## 5.4`, `## 9`, `## 11.1`; photo fragment `## 2`, `## 10`.

## Vault V2

Source package: `assets-final/vault/`.

Use the existing `runtime/vault-final.glb`, `runtime/hinge.mjs`, `runtime/surface_finish.mjs`, `runtime/textures/micrograin.png`, and `runtime/material-overrides.json`. The package manifest hashes and byte sizes currently match all ten packaged files.

Integration boundary:

- `VaultAdapter` loads the GLB and validates required node/material IDs from `manifest.json`.
- Clone materials per instance before applying candidate overrides.
- Use the documented world-axis hinge adapter; do not assume local Euler rotation.
- Keep semantic state in Zustand; the adapter exposes visual operations only.
- Serve only runtime files under a future public asset path; never expose `.blend`.
- Retain the 2.5D/DOM fallback while keeping the same PIN, door, letter-availability, and letter-selection semantics.

Status: **VERIFIED package integrity; HOLD integration acceptance; do not claim visual final or performance pass**.

## Planned public asset layout

Only after CP-01 approval:

```text
public/assets/svg/       copied from BIRTHDAY_SVG_REV5/public/assets/svg/
public/assets/fonts/     selected WOFF2 files and license notices
public/assets/vault/     runtime/ contents only
public/assets/photos/    owner-approved, privacy-reviewed photos only
```

The copy step must be manifest-driven, hash-checked, and recorded. No relocation or mutation is authorized in CP-00B.

## Deployment verification contract

For every copied asset, record the exact source-to-public mapping, source byte count/hash, destination byte count/hash, and manifest entry. Asset integrity and deployed availability are separate gates.

- SVG: `BIRTHDAY_SVG_REV5/public/assets/svg/<path>` → `public/assets/svg/<path>`.
- Fonts: selected `font/<family>/.../*.woff2` → `public/assets/fonts/<family>/...`, with matching OFL/license notice.
- Vault: `assets-final/vault/runtime/<path>` → `public/assets/vault/<path>` only; leave `assets-final/vault/` and its `.blend` untouched.

After scaffolding, verify runtime manifest URL resolution, browser fetch success/HTTP status, content type, byte count, and destination hash for each required runtime asset. A source hash match alone cannot claim deployed availability. Vault must remain `VAULT_V2_INTEGRATION_CANDIDATE`; do not claim visual or performance approval from copy verification.

