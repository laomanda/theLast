# S04 Production Implementation Evidence

Status: **S04 — IMPLEMENTED / INDEPENDENT DESIGN & ENGINEERING REVIEW PENDING**

## Authority and scope

S04 implements the locked **Single Portrait Editorial × Offset Gallery Frame** direction. It uses one owner-authorized authentic portrait as content, never as the page background. No S05 scene UI, narrative, deployment, dependency change, commit, or push was performed. Scene acceptance, scene publication authorization, and complete-release owner approval remain independent and absent.

## Photo provenance and privacy

- Protected source: `assets/malica.webp`; unchanged; 960×1280 WebP; 155,906 bytes.
- Source SHA-256: `A70EE21B50E291B1F30A4618951C13F0645D654C8AEF95C77493CC9DAAFCEA0F`.
- Production derivative: `public/assets/photos/s04-portrait.webp`; 900×1200 WebP; 89,812 bytes.
- Derivative SHA-256: `8E6DED047C168EB56F4B4D2B3EF7A15EAA12D4C68F28045D5418200573544B1B`.
- Derivative method: local Sharp resize to 900×1200, WebP quality 82/effort 6, full-frame 3:4 presentation, no crop.
- Metadata result: source and derivative contain no EXIF, ICC, or XMP payloads. No external service received photo bytes.
- The trusted record exposes only the public derivative path and digest. Its private source reference is not part of the public projection.
- No photo binary, photo-revealing screenshot, private path, or image metadata payload is included in the audit package.

## Design and interaction

- One portrait only; no gallery, slideshow, collage, or background photograph.
- Warm Ivory surface, Graphite type/action, Champagne offset mat, Coral rule, and restrained REV5 B02 editorial frame.
- The portrait uses `object-fit: contain`, preserving the complete authorized frame and face-safe composition.
- Visible personal copy is limited to the already established recipient name, `Malica Yohana Hutagaol`, plus the existing `Lanjut` control label. No new personal narrative was invented.
- Entry choreography is restrained and cancellable. Reduced motion resolves directly to the stable state.
- S04 requires intentional `CONTINUE`; duplicate activation is coalesced. S05 remains an honest unimplemented runtime boundary.
- Photo-load failure shows an accessible status while preserving the essential continuation control.

## Authentic REV5 asset

- Source and deployed path: `editorial/editorial-frame-portrait.svg` (B02).
- Source SHA-256: `4A520AC9E73BEC6EAC5097164BEF13442BA49066C8F820CBA93947C6F8E546B4`.
- Deployed SHA-256: `4A520AC9E73BEC6EAC5097164BEF13442BA49066C8F820CBA93947C6F8E546B4`.
- Result: **PASS**, byte-identical; source geometry and manifest were not modified.

## Files changed for S04

- `app/globals.css`
- `src/ui/s04/S04Portrait.tsx`
- `src/ui/shell/ExperienceShell.tsx`
- `src/assets/authorization/registry-definitions.ts`
- `src/assets/authorization/internal.ts`
- `src/assets/authorization/registry.ts`
- `src/release/trusted-readiness.ts`
- `src/release/svg-integrity.ts`
- `src/release/validator.ts`
- `tests/unit/s04-portrait.test.ts`
- `tests/unit/s02-invitation.test.ts`
- `tests/unit/s03-birthday-reveal.test.ts`
- `tests/unit/asset-authorization.test.ts`
- `tests/unit/release-validator.test.ts`
- `tests/e2e/s04-portrait.spec.ts`
- `tests/e2e/s03-birthday-reveal.spec.ts`
- `tests/production-e2e/s02-production-smoke.spec.ts`
- `src/evidence/packaging/profiles.ts`
- `src/evidence/packaging/policy.ts` (narrow allowlist for the selected visual source stylesheet)
- `public/assets/photos/s04-portrait.webp` (new authorized derivative)
- `public/assets/svg/editorial/editorial-frame-portrait.svg` (new byte-identical deployment copy)
- `planning/evidence/S04_PRODUCTION_IMPLEMENTATION_EVIDENCE.md`

## Visual QA

| Check | Result | Evidence |
| --- | --- | --- |
| Mobile 390×844 | PASS | Local-only rendered inspection; portrait intact, name and CTA visible, no overflow. |
| Desktop 1440×900 | PASS | Local-only rendered inspection; asymmetric balance, negative space, and B02 hierarchy verified. |
| Narrow mobile 320×568 | PASS | Browser metric regression; one portrait, 3:4 source ratio, `contain`, no horizontal overflow. |
| Reduced motion | PASS | Stable opacity/visibility and valid S04→S05 progression. |
| Photo failure | PASS | Accessible fallback status and usable continuation control. |

The two inspection screenshots were temporary local files, inspected directly, then deleted. They were not stored in the repository or selected for packaging.

## Verification

| Command/check | Status | Actual result |
| --- | --- | --- |
| `npm run typecheck` | PASS | Exit 0. |
| `npm run lint` | PASS | Exit 0; no warnings. |
| `npm run test:unit` | PASS | Exit 0; 8 files, 119 passed, 0 failed. |
| `npm run build` | PASS | Exit 0; Next.js 16.4.2 production build completed. |
| Focused isolated S04 E2E, port 3041 | PASS | Exit 0; 6 passed, 0 failed, 0 skipped; port released. |
| Full isolated development E2E, port 3042 | PASS | Exit 0; 46 passed, 0 failed, 0 skipped; port released. |
| Fresh production smoke, port 3044 | PASS | Exit 0; 1 passed, 0 failed; explicit test-owned server stopped and port released. |
| `npm run validate:release` | PASS (expected negative verdict) | Exit 1; `NOT_READY`. S04 photo HOLD and S04 renderer-missing reasons are absent; S04 acceptance/content/publication gates remain missing; S05–S12 remain incomplete. |

An initial development E2E attempt returned 42 passed / 4 failed because the new test incorrectly expected `next/image` responsive output to retain the derivative's natural dimensions and blocked the source URL rather than the optimizer URL. The assertions were corrected to validate the 3:4 ratio and actual optimizer route; no application behavior was weakened. A first temporary production run passed its browser assertion but its Playwright-managed server teardown hung; it was interrupted and not counted as the final PASS. The final explicit test-owned server run exited cleanly and released port 3044.

## Remaining gates and limitations

- Independent owner design/engineering review: **PENDING**.
- Trusted S04 scene acceptance: **MISSING**.
- Trusted S04 content/readiness evidence: **MISSING**.
- S04 publication authorization gate at scene/release level: **MISSING** (independent of asset publication authorization).
- Candidate-bound complete-release owner approval: **MISSING**.
- S05–S12 production implementation: **INCOMPLETE**.
- Whole-project release verdict: **NOT_READY**.

No canonical document, REV5 source SVG, font, Vault asset, runtime contract/guard, Zustand store, private source photo, or S05+ scene implementation was modified.
