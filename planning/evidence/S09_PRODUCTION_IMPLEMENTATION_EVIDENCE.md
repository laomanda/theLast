# S09 Production Implementation Evidence

## Status

`S09 — IMPLEMENTED / INDEPENDENT EXPERIENCE REVIEW PENDING`

## Contract

The locked Scene-by-Scene and Design System sources require an optional two-stage route: complete S08, explicitly arm the quiet invitation, then deliberately commit a gesture or accessible equivalent. Passive scroll is rejected by the existing runtime. The exact clue wording and threshold remain pending content/prototype decisions; this candidate uses a 56px upward drag threshold and a keyboard/click equivalent without exposing Vault or confession content.

## Changed implementation

- Added `src/ui/s09/S09HiddenDiscovery.tsx` and mapped it in `ExperienceShell`.
- Added the minimum S08 arm/commit UI using existing `ARM_HIDDEN_PORTAL` and `COMMIT_HIDDEN_PORTAL` events.
- Below-threshold/cancelled pointer input does not commit; keyboard/click is the accessible equivalent.
- S09 only dispatches `HIDDEN_SPACE_READY` through the existing guard; S10 remains the honest runtime boundary.
- No Vault, PIN, private photo, letter, confession, SVG source, font, or canonical document was modified.

## Verified results

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `vitest ... s09-hidden-discovery.test.ts --pool=forks` | PASS, 2/2 |

The default Vitest worker run and project-wide browser harness were not used as PASS evidence because their existing lifecycle issue did not emit a final result. Full E2E, visual screenshots, build, release validation, and audit packaging remain outstanding verification work.

## Verification closure attempt — BLOCKED / NOT CLOSED

Focused Playwright used a dedicated Turbopack server on port `3072`, isolated output `.next-e2e-3072`, and `PLAYWRIGHT_NO_WEBSERVER=1`. The server returned `GET / 200`, but the runner did not reach its first S09 assertion or write a screenshot before the bounded command window elapsed. Test-owned `cmd` PID `21452` was stopped; no unrelated process was touched.

No browser test is counted as passing. Required screenshots, full E2E, remaining regression commands, and the verified audit ZIP remain outstanding. The next required action is a reliably terminating Playwright lifecycle, followed by the unchanged focused test and full-suite runs. No assertion, retry count, or S08→S09 interaction contract was weakened.
## Targeted Playwright unblock

The first original hang was `chromium.launch({ channel: "chrome" })`; it never resolved. Bundled Playwright Chromium is not installed, while `msedge` launched and closed successfully. The isolated and default Playwright configs now use the installed `msedge` channel.

The next exact block was in the application: S08 retained its local completion `pendingRef` after successful `COMPLETE_BIRTHDAY`, so `COMMIT_HIDDEN_PORTAL` returned before dispatch. The minimal adjacent integration fix clears that transient ref after the successful completion result. A direct Edge reproduction then reached S09 and closed cleanly.

Focused browser runs wrote all four required screenshots under `planning/evidence/screenshots/s09/`. However, the Playwright runner still did not return a conclusive final result after test execution, so focused/full E2E, remaining regression commands, and audit packaging remain BLOCKED rather than claimed PASS.

## Final lifecycle closure attempt — BLOCKED

A detached Edge/Playwright runner was started against a dedicated port `3074` server and bounded with an exact process wait. It did not emit a Playwright reporter result before the timeout. The known exact test-owned roots were `cmd` PID `17356` (runner) and `cmd` PID `4656` (server). Windows returned `Access denied` to exact-PID, tree-scoped `taskkill /PID <pid> /T /F` for both. No broad image-name termination was attempted.

The last successful browser diagnostic remains the direct Edge reproduction reaching S09 and closing cleanly. The first operation without a conclusive process result is the detached Playwright runner lifecycle/reporter stage; no focused or full suite exit code is available. Required next action: run the same isolated command from an elevated process context that owns and can terminate its child trees, then collect the actual reporter exit code before packaging.

## Execution recovery result

Recovered runner output records the focused S09 set as `2 passed (47.5s)`. This establishes successful browser assertions, but not a reportable Playwright process exit code. A subsequent direct foreground isolated run on port `3075` again yielded before reporter completion; its verified Next server PID `13844` was stopped successfully. Existing PID `4656` remains access-denied and was not modified.

Because the required clean reporter exit remains unavailable, full E2E, regression gates, fixed evidence profile, and audit archive are not claimed complete.

