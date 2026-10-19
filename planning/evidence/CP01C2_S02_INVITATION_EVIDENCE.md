# CP-01C.2 — S02 Invitation Evidence

Status: **PASS — implementation complete; owner visual approval required**  
Scope: S02 only. S03 visual/content implementation remains deferred.

## 1. Repository baseline and source safety

- Workspace: `C:\Users\jakkob\Downloads\Mal this from Kob\theLast`
- Git HEAD before work and after verification: `d6503b9c244a59513a8c71a2801042c7fa044a9b`
- Initial working tree was already dirty from the approved S01 checkpoint:
  - Modified: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `next.config.ts`, `playwright.config.ts`, `vitest.config.mts`
  - Untracked: `planning/evidence/CP01C1_S01_PRELUDE_EVIDENCE.md`, `planning/evidence/screenshots/`, `public/`, `src/ui/`, `tests/e2e/`, `tests/unit/s01-prelude.test.ts`
- Existing changes were preserved. No reset, clean, commit, push, dependency installation, canonical document edit, personal photograph edit, Vault edit, or REV5 source edit occurred.

## 2. Sources actually inspected

**PASS**

- `docs/PRD.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/OWNER_DECISIONS/FINAL_DESIGN_DIRECTION_LOCK.md`
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md`
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md`
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md`
- All discipline fragments under `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_*.md`, with direct relevance from scene-by-scene, motion, icon/SVG, shape/pattern, material/texture, depth/shadow/surface, typography, and color.
- `planning/production/CP00B_SOURCE_AUTHORITY_MATRIX.md`
- `planning/production/CP00B_PRODUCTION_ARCHITECTURE.md`
- `planning/production/CP00B_ASSET_INTEGRATION_PLAN.md`
- `planning/production/CP00B_CP01_EXECUTION_PLAN.md`
- `planning/production/CP00B_OPEN_ISSUES_AND_GATES.md`
- Existing `planning/evidence/CP01B_RUNTIME_FOUNDATION_EVIDENCE.md` and `planning/evidence/CP01C1_S01_PRELUDE_EVIDENCE.md`

No substantive conflict blocked implementation. Final Flow owns scene order and consent; Tech Spec owns runtime boundaries; the Design System and approved fragments own the visual/motion contract; the owner lock preserves `EDITORIAL_SURFACE_FIRST`.

## 3. Runtime interfaces inspected

**PASS**

- `src/runtime/contracts.ts`
- `src/runtime/guards.ts`
- `src/runtime/transition-engine.ts`
- `src/state/experience-store.ts`
- Existing runtime and transition unit tests

The canonical executable edge remains `S02 + OPEN_INVITATION -> S03`. The UI does not change scenes directly.

## 4. Files changed or created for CP-01C.2

Application/runtime:

- `app/globals.css`
- `app/layout.tsx`
- `next.config.ts`
- `src/runtime/transition-coordinator.ts`
- `src/state/experience-store.ts`
- `src/ui/s01/S01Prelude.tsx`
- `src/ui/s02/FoldedEditorialKeepsake.tsx`
- `src/ui/s02/S02Invitation.tsx`
- `src/ui/shell/ExperienceShell.tsx`
- `src/ui/shell/S03DevelopmentBoundary.tsx`
- Removed obsolete `src/ui/shell/S02DevelopmentBoundary.tsx` after the real S02 renderer replaced it.

Assets:

- `public/assets/svg/paper/invitation-paper-fold.svg`

Tests/configuration:

- `playwright.config.ts`
- `playwright.production.config.ts`
- `tests/e2e/s01-prelude.spec.ts`
- `tests/e2e/s02-invitation.spec.ts`
- `tests/production-e2e/s02-production-smoke.spec.ts`
- `tests/unit/s01-prelude.test.ts`
- `tests/unit/s02-invitation.test.ts`

Evidence:

- `planning/evidence/CP01C2_S02_INVITATION_EVIDENCE.md`
- Current S02 and continuity PNGs under `planning/evidence/screenshots/`

`app/page.tsx`, `vitest.config.mts`, the deployed A02 signature asset, S01 evidence, and other dirty-tree entries were carried forward from CP-01C.1 and were not regenerated as S02 work.

## 5. REV5 assets and provenance

**PASS**

1. E01 invitation fold accent:
   - Source: `BIRTHDAY_SVG_REV5/public/assets/svg/paper/invitation-paper-fold.svg`
   - Runtime: `public/assets/svg/paper/invitation-paper-fold.svg`
   - SHA-256, both: `36DB65E25B8EA23BF326AB9082EA8D89B39F0173450E93A00431CB740F559CFC`
   - Used as a restrained external decorative crease/fold accent. It is not misrepresented as the complete articulated object.
2. A02 offset loop:
   - Source: `BIRTHDAY_SVG_REV5/public/assets/svg/signature/offset-loop-open.svg`
   - Runtime: `public/assets/svg/signature/offset-loop-open.svg`
   - SHA-256, both: `9817F8A81BA819CB97BA6A4CFA55AA18D9E45BD1410639FCF5F46B29E4BBD84B`
   - Its established `OffsetLoopOpen` component is reused; geometry was not redrawn.

Both deployed files are byte-identical to REV5. The REV5 source package was read only.

## 6. Visual composition and observed review

**PASS**

- Exact hero copy: `Ada sesuatu untukmu.`
- Exact action label: `Open`
- Closed state is a warm-ivory, physically layered tri-fold keepsake with restrained index/rule details and the A02 mark.
- Mobile uses a centered vertical composition with a viewport-bounded object. The fully opened three-panel width fits 320–430 px viewports.
- Desktop at 1440×900 uses deliberate asymmetry: the folded object occupies the left field and the invitation copy/action occupies the right field.
- The object is visually dominant without introducing stock birthday imagery, generic UI cards, personal content, or S03 artwork.
- An intermediate visual inspection found narrow-width open-panel clipping; the panel sizing was corrected before final evidence.
- A second inspection found that hidden horizontal overflow masked a real 150% text-enlargement defect. The fold grid and copy width were corrected, and the test now checks the title's actual bounding rectangle.

## 7. Genuine fold mechanics

**PASS**

- Three DOM paper panels form the keepsake: a fixed center and left/right hinged panels.
- Closed transforms are approximately `rotateY(170deg)` and `rotateY(-170deg)` around opposing crease origins.
- The accepted Open preparation animates tactile acknowledgement, left release, right release, inner-surface reveal, mark recession, and final physical settling.
- The captured frame sequence shows closed, release, mid-unfold, and open poses. This is an articulated transform, not an image swap.
- The CSS paper structure remains usable when E01 fails to load; only the decorative REV5 accent is hidden.

## 8. GSAP and runtime ownership

**PASS**

- GSAP owns visual timelines only.
- `runtimeTransitionCoordinator` bridges mounted scene preparation into the existing `TransitionEngine` preparation hook.
- The engine first validates eligibility and establishes the in-flight transition; only then does the scene animation run.
- The exact same engine commits S03 after preparation resolves. Components do not mutate `scene`.
- Abort kills the visual timeline, restores a stable closed pose, rejects preparation, and leaves S02 active.
- Rapid activation is blocked by both the local intent ref and the runtime's single in-flight transition rule.

## 9. Open dispatch and scene boundaries

**PASS**

- Waiting, page blur, query parameters, asset completion, and animation completion cannot originate `OPEN_INVITATION`.
- A native button supplies click, touch, Enter, and Space semantics through one `onClick` dispatch path.
- Valid result: `{ type: "OPEN_INVITATION" }` is accepted in S02, preparation unfolds the keepsake, and the engine commits S03 exactly once.
- The gesture records `userGestureObserved: true`; it does not claim that audio playback is unlocked.
- Development S03 renders only `S03DevelopmentBoundary`, with no birthday/personal content.
- Production S03 and all unexpected/unimplemented scene IDs render the neutral `RuntimeBoundary`. They cannot masquerade as S02 or as a production-complete S03.

## 10. S01 to S02 continuity

**PASS**

- S01 readiness semantics are unchanged: genuine ready/degraded readiness events remain the only S01→S02 triggers.
- During accepted readiness preparation, the completed A02 mark compresses/rotates and the S01 copy exits before the engine commits S02.
- S02 enters through a paper-mask reveal while reusing the same A02 visual language on the keepsake.
- This is a runtime preparation handoff, not an arbitrary loading delay or a mandatory visitor action.
- Sequential evidence is recorded in `s01_s02_continuity_00_s01_390x844.png`, `s01_s02_continuity_01_handoff_390x844.png`, and `s01_s02_continuity_02_s02_390x844.png`.

## 11. Accessibility, reduced motion, and fallback

**PASS**

- Native keyboard and touch semantics are preserved.
- Focus is visible with a coral outline and remains in the viewport.
- At 150% root text size, the full heading wraps legibly, the fold remains contained, and the focused action remains visible.
- No viewport zoom restriction is present.
- Reduced motion preserves explicit consent and semantic progression while applying the open pose immediately instead of playing the fold timeline.
- No audio is required.
- The live region reports closed/opening/open state without replacing the visible exact microcopy.
- E01 route failure leaves a usable CSS keepsake and Open action.

## 12. Error, retry, and cancellation handling

**PASS**

- A rejected/cancelled Open restores the closed pose and exposes a concise retryable action error.
- Engine cancellation during deferred preparation does not commit S03.
- Duplicate dispatch during preparation returns the typed in-flight rejection and produces one commit only.
- Existing S01 recoverable readiness retry and static fallback tests remain green.

## 13. Final verification

All results below are from final runs after the last code/CSS/test correction.

| Command | Result | Evidence |
|---|---:|---|
| `npm run typecheck` | PASS, exit 0 | TypeScript completed with no diagnostics |
| `npm run lint` | PASS, exit 0 | ESLint completed with no diagnostics |
| `npm run test:unit` | PASS, exit 0 | 3 files, 34/34 tests |
| `npm run test:e2e -- --reporter=line` | PASS, exit 0 | 24/24 Chromium tests, one deterministic worker, 1.0 min |
| `npm run build` | PASS, exit 0 | Next.js 16.4.2 optimized static build; `/` and `/_not-found` generated |
| `npx playwright test --config=playwright.production.config.ts --reporter=line` | PASS, exit 0 | 1/1 production smoke, 5.4 s |

Intermediate audit findings were not suppressed: an early two-worker browser run exposed readiness-timeout contention, so final E2E is intentionally serialized; the first production smoke exposed `/favicon.ico` as a console 404, so metadata now points to the approved A02 SVG and the smoke was rerun cleanly.

## 14. Browser/device coverage and visual artifacts

**PASS**

- Playwright 1.64.1, installed Google Chrome channel.
- Closed composition:
  - `planning/evidence/screenshots/s02_closed_narrow-mobile_320x568.png`
  - `planning/evidence/screenshots/s02_closed_standard-mobile_390x844.png`
  - `planning/evidence/screenshots/s02_closed_tall-mobile_430x932.png`
  - `planning/evidence/screenshots/s02_closed_desktop_1440x900.png`
- Text enlargement/focus:
  - `planning/evidence/screenshots/s02_keyboard_focus_text_150_390x844.png`
- Fold frame sequence:
  - `planning/evidence/screenshots/s02_fold_00_closed_390x844.png`
  - `planning/evidence/screenshots/s02_fold_01_release_390x844.png`
  - `planning/evidence/screenshots/s02_fold_02_mid_390x844.png`
  - `planning/evidence/screenshots/s02_fold_03_open_390x844.png`
- Reduced motion and boundary:
  - `planning/evidence/screenshots/s02_reduced_motion_handoff_390x844.png`
  - `planning/evidence/screenshots/s03_development_handoff_390x844.png`
- S01→S02 sequence:
  - `planning/evidence/screenshots/s01_s02_continuity_00_s01_390x844.png`
  - `planning/evidence/screenshots/s01_s02_continuity_01_handoff_390x844.png`
  - `planning/evidence/screenshots/s01_s02_continuity_02_s02_390x844.png`

All 23 PNG files currently in the evidence screenshot directory passed the PNG signature check. No video was fabricated; the required motion evidence is the real-browser frame sequence.

## 15. Production smoke

**PASS**

- Optimized build served through `next start` on local port 3002.
- `/?readiness=fail&open=true` could not activate test injection or auto-open S02.
- Initial response was HTTP 200; S02 remained closed until the native Open action.
- Runtime SVG and generated local-font requests loaded without failed HTTP responses.
- Open committed S03 and rendered the honest production runtime boundary, never the development-only S03 renderer.
- No page exceptions, console errors, failed asset responses, unexplained blank transition, or fabricated production-complete scene were observed.

## 16. Known limitations and owner review

- **DEFERRED:** final artistic approval of the S02→S03 visual handoff requires the real S03 implementation. No S03 art/content was created.
- **DEFERRED:** cross-browser visual QA beyond the installed Chrome channel.
- **NOT RUN:** deployment/public hosting; prohibited by checkpoint scope.
- **Owner review:** **REQUIRED**. CP-01C.2 must not be treated as owner-approved until the owner accepts the visual result.

Final checkpoint verdict: **PASS for CP-01C.2 implementation and evidence; STOP before S03.**
