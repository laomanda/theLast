# Hidden Journey Flow Recovery

Status: `BLOCKED / NOT CLOSED`

## Summary

The repository contains guarded runtime edges for S08 → S09 → S10 → S11 → S12, but the full live journey could not be certified in this pass because the existing browser harness did not produce a conclusive reporter exit and some production E2E helpers stalled before the hidden journey assertions. The release remains `NOT_READY`.

## Root cause found and corrected

S08's optional arm affordance was rendered as an almost invisible `·` control. This made the hidden journey practically undiscoverable even though the runtime guard existed. The S08 End button only called `window.scrollTo`, so it did not represent a meaningful local end state.

The correction keeps the two-stage contract intact:

`S08 complete → explicit arm → intentional portal commit → S09`

The arm control is now a restrained, keyboard-focusable labelled button: `Temukan lapisan lain`. End now sets an explicit local `ended` state and exposes a status message. No idle time, ordinary scrolling, or automatic transition can enter S09.

## Exact changed files

- `src/ui/s08/S08FinalBirthdayMoment.tsx`
- `app/globals.css`
- `tests/unit/s08-final-birthday-moment.test.ts`

No runtime contract, TransitionEngine, Zustand state model, Vault GLB, SVG, font, private photo, or canonical source document was modified for this recovery patch.

## Before / after

| Area | Before | After |
|---|---|---|
| S08 discovery | Nearly invisible `·` control | Quiet labelled affordance with visible focus/hover state |
| S08 End | Scroll-to-top side effect | Explicit local `ended` state and accessible status |
| Hidden transition | Existing arm → commit guard | Preserved unchanged |
| S12 copy | `CONTENT_PENDING`, `body: null` | Preserved; no personal copy invented |
| Release | `NOT_READY` | `NOT_READY` |

## Verification

### Static and unit gates

- Typecheck: PASS, exit 0.
- Production build: PASS, exit 0.
- Focused unit command was started for S08/S09/S10/S11/S12, but the Vitest process did not return a conclusive exit during the bounded run; this is recorded as BLOCKED rather than PASS.
- Existing full unit result before this recovery patch: 16 files, 152 tests passed.

### Browser checks

- Production S08 suite: 5 tests discovered. It reached the S08 completion test, but the suite reported failures in pre-existing helper assumptions and did not return cleanly.
- Targeted S08 completion smoke: 1 test discovered and reached the final test stage, but Playwright did not emit a reporter summary or exit code before the bounded run was stopped.
- Existing focused S12 run: five screenshots were captured and visually inspected; reporter teardown remained blocked.
- Full hidden journey S08 → S12: BLOCKED. No claim is made that the complete browser journey passed.

Observed browser/harness issues:

1. A production E2E helper timed out waiting for `s07-open-letter` during a reduced-motion S08 test.
2. Older tests still expect former runtime-boundary behavior for later scenes.
3. Playwright's owned production server stopped, but the runner did not return a conclusive reporter result.

### Negative and safety conditions

- Runtime unit contracts still require explicit arm and commit for S08 → S09.
- PIN `011007`, Vault opening, S11 selection, and S12 entry remain distinct runtime steps.
- S12 remains owner-gated with `CONTENT_PENDING` and no body text.
- No private photo bytes or personal confession text were read or added.
- Reduced-motion and DOM fallback behavior remain part of the existing S10/S11/S12 implementation; full browser closure remains pending.

## Evidence

The S12 visual captures remain under `planning/evidence/screenshots/s12/`. They show the S12 paper surface, final state, desktop composition, and reduced-motion state. No real confession text is included.

## Remaining gates

1. Repair or replace the stale production E2E navigation helpers so they reflect the current S07–S12 contracts.
2. Resolve the Playwright/Vitest reporter lifecycle hang and obtain real exit codes.
3. Run and inspect a bounded browser walkthrough of S08 completion, arm/commit, S09, PIN, physical Vault opening, S11 Open Letter, and S12.
4. Obtain owner-approved S12 confession copy and acceptance/publication evidence.
5. Keep complete release `NOT_READY` until all independent gates pass.
