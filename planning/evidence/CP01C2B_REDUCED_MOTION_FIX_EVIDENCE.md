# CP-01C.2B — Reduced-Motion Visual Integrity Fix Evidence

Status: **IMPLEMENTED / INDEPENDENT OWNER REVIEW PENDING**

## 1. Scope and protected boundaries

This was a targeted S02 reduced-motion presentation fix. No runtime architecture, scene contract, guard, coordinator, Zustand ownership, input coalescing, cancellation/recovery behavior, copy, font, canonical document, REV5 source SVG, S03 implementation, dependency, commit, push, or deployment was changed.

## 2. Root cause

**PASS — diagnosed before editing.** The defect was not caused by SVG geometry, missing paths, opacity, or an interrupted interaction timeline.

In reduced-motion mode, the normal S02 entry GSAP timeline is intentionally skipped. That timeline normally leaves the paper rig in its final state with:

`clip-path: inset(0% 0% 0% 0% round 18px)`

The reduced-motion path restored the scale/rotation pose but did not establish this final clip-path. Chromium’s 3D compositing then clipped the nested A02 SVG to a partial arc in the resting screenshot. The rendered SVG paths themselves remained present and fully drawn.

The cause was confirmed by browser inspection and a controlled comparison: applying the normal final clip-path restored the complete loop without changing the approved panel geometry or SVG.

## 3. Smallest fix

`restoreClosedPose()` now applies the existing final rounded clip-path together with the closed scale, y-offset, and rotation. This is a presentation-only initialization correction. It does not add a delay, automatic Open action, new animation, or interaction behavior.

## 4. Files modified in CP-01C.2B

- `src/ui/s02/S02Invitation.tsx`
  - Set the existing final rig clip-path during closed-pose restoration.
  - Preserved explicit motif orientation and existing reduced-motion Open behavior.
- `tests/e2e/s02-visual-refinement.spec.ts`
  - Added the focused CP-01C.2B browser regression.
  - Verifies rendered SVG path bounds, dash state, opacity, visible intersection, and final rig clip-path.
  - Captures all requested reduced/normal-motion evidence.
- `planning/evidence/CP01C2B_REDUCED_MOTION_FIX_EVIDENCE.md`
- `planning/evidence/screenshots/cp01c2b/*`

No S01 source file was modified in this pass.

## 5. Before / after visual evidence

Before: `planning/evidence/screenshots/cp01c2a/revised/s02_reduced_motion_resting_390x844.png`

- **FAIL before:** the resting keepsake showed only a partial A02 loop.

After: `planning/evidence/screenshots/cp01c2b/s02_reduced-motion_resting_390x844.png`

- **PASS after:** the complete A02 Offset Loop is visible in the intended folded resting state.

Additional actual browser screenshots:

- `s01_reduced-motion_resting_390x844.png` — S01 reduced-motion resting state.
- `s02_reduced-motion_resting_390x844.png` — repaired S02 reduced-motion resting state.
- `s02_reduced-motion_open-interaction_390x844.png` — result of the reduced-motion Open action; reduced-motion commits immediately through the existing authorized boundary.
- `s03_reduced-motion_boundary_390x844.png` — full authorized S03 development boundary.
- `s02_normal-motion_resting_390x844.png` — normal-motion S02 resting state.

The repaired screenshot was visually inspected after the focused test and shows the full coral/periwinkle loop with no new decorative element.

## 6. Browser regression details

The focused browser test verifies, under `prefers-reduced-motion: reduce`:

- SVG and both A02 paths exist.
- SVG rendered width and height are non-zero.
- The SVG intersects the motif wrapper visibly.
- The outer and inner path `getBBox()` widths are non-zero and substantial.
- Both paths are fully drawn (`stroke-dasharray: none`, `stroke-dashoffset: 0`).
- Motif opacity is `1`.
- The final rig clip-path is `inset(0% round 18px)`.
- Open remains user initiated.
- The existing reduced-motion progression reaches the authorized S03 development boundary.

This is a rendered-browser assertion backed by screenshots, not a DOM-presence-only check.

## 7. Verification results

| Command | Result |
|---|---|
| `npm run typecheck` | PASS, exit 0 |
| `npm run lint` | PASS, exit 0 |
| `npm run test:unit` | PASS, 3 files / 34 tests |
| `npx playwright test tests/e2e/s02-visual-refinement.spec.ts --grep 'CP-01C.2B' --reporter=line` | PASS, 1 test |
| `npm run test:e2e -- --reporter=line` | PASS, 28 tests |
| `npm run build` | PASS, exit 0 |
| `npx playwright test --config=playwright.production.config.ts --reporter=line` | PASS, 1 production smoke test |
| `git diff --check` | PASS |

## 8. REV5 SVG integrity

**PASS** — Deployed and source hashes remain identical:

| Asset | Deployed SHA-256 | REV5 source SHA-256 |
|---|---|---|
| `public/assets/svg/paper/invitation-paper-fold.svg` | `36DB65E25B8EA23BF326AB9082EA8D89B39F0173450E93A00431CB740F559CFC` | `36DB65E25B8EA23BF326AB9082EA8D89B39F0173450E93A00431CB740F559CFC` |
| `public/assets/svg/signature/offset-loop-open.svg` | `9817F8A81BA819CB97BA6A4CFA55AA18D9E45BD1410639FCF5F46B29E4BBD84B` | `9817F8A81BA819CB97BA6A4CFA55AA18D9E45BD1410639FCF5F46B29E4BBD84B` |

## 9. Remaining defects

**PASS** — The CP-01C.2A reduced-motion A02 resting visual defect is resolved in the repaired screenshot.

**NOT RUN** — No new recording was produced; the requested motion evidence is represented by the browser screenshots and existing deterministic transition tests.

No other defect was identified in this targeted pass.

## 10. Stop gate

`CP-01C.2B — IMPLEMENTED / INDEPENDENT OWNER REVIEW PENDING`

Stopped after the targeted fix and verification. No S03 work was started.
