# S12 Reading Overflow Fix

Status: `S12 — READING FIX COMPLETE / OWNER APPROVAL PENDING`

## Diagnosis

The previous implementation had a genuine accessibility risk, not merely a visual crop. The paragraph region used `overflow-y: auto`, but it had no bottom scroll breathing room and no state-aware overflow affordance. At the end of a long fixture, the final paragraph could sit directly against the scroll boundary while the separate closing and End area visually blended into the paper. The content was technically scrollable, but the layout did not provide enough evidence or clearance that the final line had been reached.

## Targeted correction

- Added bottom padding and `scroll-padding-block` to `.s12-reading-body` so the final line has a readable buffer at the end of keyboard, wheel, touch, or programmatic scrolling.
- Added a subtle inset edge affordance only while the region has remaining overflow. It disappears when the actual scroll position reaches the end. When scrolled, a solid sticky top buffer prevents partially clipped glyphs from appearing at the reading boundary.
- Added a separator and spacing before the closing text to distinguish reading content from the closing/action area.
- Preserved local scrolling inside the paper; page-level scrolling remains contained.
- Added a `ResizeObserver` and scroll listener so overflow state stays accurate after text zoom or content resize.
- Added browser assertions that move to the actual final scroll position, verify the last paragraph’s bounding box, confirm the closing and End controls remain visible, and check 200% text zoom.

## Changed files

- `src/ui/s12/S12FinalLetter.tsx`
- `app/globals.css`
- `tests/e2e/s12-final-letter.spec.ts`
- `tests/unit/s12-final-letter.test.ts`
- this evidence report

S01–S11, runtime contracts, Zustand, canonical documents, assets, fonts, photos, Vault, and S12 content authorization were not changed. Production content remains `CONTENT_PENDING`.

## Browser evidence

Captured and inspected with Edge using the isolated harness:

- `planning/evidence/screenshots/s12/s12-mobile-long-content-390x844.png` — initial scroll position with overflow affordance.
- `planning/evidence/screenshots/s12/s12-mobile-long-content-final-390x844.png` — final scroll position; last paragraph region reached, closing separator visible, End action available.
- `planning/evidence/screenshots/s12/s12-desktop-long-content-final-1440x900.png` — desktop final scroll position with the long fixture and closing/action separation.
- `planning/evidence/screenshots/s12/s12-desktop-reading-1440x900.png` — desktop initial scroll position.
- `planning/evidence/screenshots/s12/s12-mobile-long-content-final-390x844.png` — mobile final scroll position with no stray top fragments.

The captures use only the existing neutral development fixture. No personal confession text is present.

## Verification

| Check | Result | Actual result |
|---|---|---|
| Typecheck | PASS | `npm run typecheck`, exit 0 |
| Lint | PASS | `npm run lint`, exit 0 |
| Unit suite | PASS | 16 files, 155 passed, 0 failed, 0 skipped, exit 0 |
| Focused S12 browser | PASS | 7 passed, 0 failed, 0 skipped, exit 0; Edge, isolated port 3172, one worker |
| Long-content final-line assertion | PASS | `scrollTop = scrollHeight`; final paragraph bottom verified within the reading region |
| Closing/action occlusion | PASS | closing and End controls visible after final scroll |
| Keyboard/wheel scroll | PASS | PageDown and mouse wheel exercised before final-position verification |
| 200% text zoom | PASS | End control visible and no horizontal overflow |
| 1280×720 desktop regression | PASS | End control and final paragraph remained reachable after responsive viewport change |
| Reduced motion | PASS | existing reduced-motion + keyboard End/Replay test passed |
| S11 → S12 boundary | PASS | explicit `OPEN_LETTER` path exercised by every browser flow |
| Production build | PASS | `npm run build`, exit 0; static `/` generated |
| Browser server cleanup | PASS | test-owned server PID 24700 exited; port 3172 had no remaining listener |
| Full E2E suite | NOT RUN | unrelated full-suite verification was intentionally not rerun |

The isolated Next run temporarily rewrote generated references in `next-env.d.ts` and `tsconfig.json`; those references were restored to their pre-run contents.

## Remaining issues

- Final confession copy remains owner-gated and unapproved.
- Complete release remains `NOT_READY`.
- Owner approval of the corrected S12 reading presentation remains pending.

Final status: `S12 — READING FIX COMPLETE / OWNER APPROVAL PENDING`
