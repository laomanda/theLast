# S10 Targeted Visual Fix Review

Date: 2026-10-19  
Status: **S10 — TARGETED FIX COMPLETE / OWNER VISUAL APPROVAL PENDING**

## Scope

Focused corrective pass for the S10 mobile PIN composition, Vault hero framing, and opened-state interior paper readability. No S01–S09, S11, S12, GLB, pivot contract, PIN, runtime guards, authorization, canonical document, font, SVG, photo, or release-validator source was changed.

## Before / after

### Mobile PIN keypad

- Before: the 390×844 screenshot showed only the upper keypad rows in the viewport; the remaining controls depended on page overflow.
- After: when `.s10-pin-panel` is present, S10 switches to a compact mobile composition: the stage height, title scale, gaps, and control spacing are reduced while button targets remain at least 2.35rem. All 12 keypad buttons are bounded inside 320×700 and 360×800, and the complete 390×844 keypad is visually present.
- The incorrect PIN path and corrected `011007` path were exercised in-browser.

### Vault framing

- Before: the Vault occupied too little of the stage, especially on desktop.
- After: responsive camera positions move closer for closed and open states at mobile, tablet, and desktop breakpoints. The Vault reads as the physical hero with more useful negative-space balance; the +92° hinged door remains inside the stage in both mobile and desktop open captures.

### Interior letter

- Before: the paper was visible but visually weak against the dark chamber.
- After: a restrained warm interior fill light improves separation from the chamber without changing GLB geometry, materials, or letter placement. The paper is identifiable in both mobile and desktop open screenshots. S11 remains a separate explicit action.

## Changed files

- `app/globals.css`
- `src/ui/s10/S10Vault.tsx` (existing S10 camera and interior-light refinement retained)
- `tests/e2e/s10-vault.spec.ts`
- `planning/evidence/S10_TARGETED_FIX_REVIEW.md`
- `planning/evidence/screenshots/s10-refinement/` — required target captures plus existing S10 regression captures

No dependency, asset, GLB, canonical source, runtime contract, or protected scene file was modified.

## Required screenshots visually inspected

- `s10-mobile-pin-320x700.png` — complete numeric keypad, Hapus, and Buka visible.
- `s10-mobile-pin-390x844.png` — complete keypad and focused PIN field visible.
- `s10-mobile-opened-390x844.png` — physical door open; paper visible inside.
- `s10-desktop-closed-1440x900.png` — Vault enlarged and centered within stage.
- `s10-desktop-opened-1440x900.png` — door remains clear of stage bounds; paper readable.

Additional reduced-motion and fallback captures remain in the same directory.

## Verification

| Check | Result | Actual outcome |
| --- | --- | --- |
| Typecheck | PASS | exit 0 |
| ESLint | PASS | exit 0 |
| S10 unit | PASS | 4/4, exit 0 |
| Production build | PASS | exit 0; Next.js 16.4.2 Turbopack |
| Focused S10 browser | PASS | 6/6, 0 failed, 0 skipped, exit 0 |
| Mobile keypad bounds | PASS | all 12 buttons inside 320×700 and 360×800 bounding checks |
| Incorrect PIN | PASS | wrong code rejected in browser |
| Correct PIN | PASS | `011007` opens the physical hinge path and exposes S11 action |
| Reduced motion | PASS | focused browser scenario passed |
| Fallback | PASS | focused browser scenario passed; honest DOM representation retained |
| Browser teardown | PASS | focused Playwright reporter exited 0; no test port remained open |

Browser logs contained only existing upstream Three/R3F deprecation warnings (`THREE.Clock` and `PCFSoftShadowMap`); no S10 exception occurred.

Vault source and deployed GLB remain byte-identical at SHA-256:

`9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B`

## Remaining defects / gates

- Owner visual approval remains pending.
- Vault manifest status remains `VAULT_V2_INTEGRATION_CANDIDATE`; no visual-final or performance approval was inferred.
- A fresh FPS measurement was not claimed in this targeted pass.
- Existing unrelated full-suite S02/S06/S08/S09 failures were not rerun, per scope.
