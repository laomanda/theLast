# S11 Refinement Review

Status: `S11 — REFINED / OWNER VISUAL REVIEW PENDING`

## Scope

Focused polish of the existing S11 Physical Letter only. S10, S12 content, runtime contracts, canonical documents, approved assets, fonts, photographs, and deployment configuration were not changed.

The existing `CONTENT_PENDING` boundary remains intact. The scene still exposes only functional interface copy; no personal letter or confession text was added.

## Refinement changes

- `src/ui/s11/S11PhysicalLetter.tsx`: reduced-motion opening now assigns explicit final transforms, opacity, and scale before committing the local opened phase. This prevents a browser-dependent partial fold caused by clearing transforms while the phase attribute was still between paints.
- `app/globals.css`: S11 now allows contained vertical scrolling while preserving horizontal clipping protection and overscroll containment. This keeps controls reachable for short viewports and long supporting copy. The compact-height layout also uses a smaller intentional gap and bounded vertical padding. Paper transform origin is explicit for stable fold choreography.
- `tests/e2e/s11-physical-letter.spec.ts`: added real-browser coverage for 320×700 and a neutral long-supporting-copy stress fixture; required refinement screenshot names were added for initial, opened, desktop, reduced-motion, short-mobile, and long-content states.

## Visual evidence

Real Edge browser screenshots were captured and inspected under `planning/evidence/screenshots/s11/`:

- `s11-mobile-initial-390x844.png` — folded paper, CTA, and status visible.
- `s11-mobile-opened-390x844.png` — all three panels opened without clipping or intersection.
- `s11-mobile-long-content-390x844.png` — neutral test-only longer supporting copy remains readable and the CTA/status remain reachable.
- `s11-desktop-initial-1440x900.png` — editorial two-column composition with a clear physical-paper focal object.
- `s11-desktop-opened-1440x900.png` — full paper spread, fold seams, seal transition, and continuation control remain coherent.
- `s11-reduced-motion-768x1024.png` — static final opened geometry and visible focus ring.
- `s11-mobile-short-320x700.png` — compact viewport retains visible, enabled `Buka surat` and no horizontal overflow.

The existing 360×800 and unfolding captures remain available as additional regression evidence.

## Interaction and boundary checks

- S10 → S11 path remains exercised by the browser helper and reaches the letter-visible state.
- `Buka surat` remains a local visual action and does not dispatch `OPEN_LETTER`.
- Duplicate desktop activation is covered with `dblclick`; only one continuation control is present.
- The continuation action is separately exercised through `Enter` and reaches S12 only through the existing guarded runtime event.
- Reduced motion preserves the explicit action and resolves to the same stable opened pose.
- No S12 personal content is introduced or exposed by this refinement.

## Verification

| Check | Result | Actual result |
|---|---|---|
| Typecheck | PASS | `npm run typecheck`, exit 0 |
| Lint | PASS | `npm run lint`, exit 0 |
| Focused S11 unit | PASS | 1 file, 3 passed, 0 failed, 0 skipped, exit 0 |
| Production build | PASS | `npm run build`, exit 0; static `/` generated |
| Focused S11 browser | PASS | 6 passed, 0 failed, 0 skipped, exit 0; Edge, isolated port 3163, one worker |
| Browser server cleanup | PASS | test-owned server PID 29592 exited; port 3163 had no remaining listener |
| Full E2E suite | NOT RUN | outside this focused S11 refinement gate |
| Release validator | NOT RUN | outside this focused S11 refinement gate; existing release remains owner-gated |

The isolated Next run temporarily rewrote generated TypeScript references in `next-env.d.ts` and `tsconfig.json`; both were restored to their pre-run contents. No other scene or canonical source was modified.

## Remaining gates

- Owner visual review remains pending.
- S11 personal content remains `CONTENT_PENDING`.
- S12 content and complete-release authorization remain separate owner/release gates.
- Existing broader-suite limitations documented in `S11_PRODUCTION_IMPLEMENTATION_EVIDENCE.md` were not reopened or silently reclassified by this focused pass.

Final status: `S11 — REFINED / OWNER VISUAL REVIEW PENDING`
