# CP-00B — CP-01 Foundation Execution Plan

CP-01 is a bounded foundation slice. It must not attempt all 12 scenes.

## Scope

Implement only:

- application shell and one-route entry
- typed scene/state contracts
- guarded transition engine
- neutral Scene 01–02 shell fixtures
- asset-manifest loader and failure reporting
- font-loading wiring
- test harness and evidence format

Do not implement Cake, Vault, confession, personal copy, or final visual polish in CP-01.

## Planned additions

```text
package.json
tsconfig.json
next.config.*
tailwind.config.*
app/layout.tsx
app/page.tsx
app/error.tsx
src/runtime/scene-types.ts
src/runtime/scene-orchestrator.ts
src/state/useExperienceStore.ts
src/state/events.ts
src/content/content-contract.ts
src/assets/asset-manifest.ts
src/assets/asset-manager.ts
src/components/SceneFrame.tsx
src/scenes/Scene01Prelude.tsx
src/scenes/Scene02Invitation.tsx
src/styles/tokens.css
tests/unit/scene-guards.test.ts
tests/unit/asset-manifest.test.ts
tests/e2e/foundation.spec.ts
planning/evidence/CP01_FOUNDATION_EVIDENCE.md
```

These are planned additions only; none were created by CP-00B.

## Dependencies and compatibility selection

The approved application stack must not change without owner approval. Next.js, React, Tailwind CSS, and the selected test runner require explicit compatibility verification before installation. Configuration files must match the selected versions; do not generate `tailwind.config.*` solely from an outdated assumption.

Confirmed by source contracts, but not installed or version-validated in this workspace:

- Next.js / React / TypeScript
- Tailwind CSS as infrastructure only
- Zustand
- GSAP
- Motion

Later phases may require Three.js, React Three Fiber, Drei, Howler.js, and a test runner/browser harness. Exact versions must be selected during CP-01 from the current supported environment, checked for mutual compatibility, and recorded in the lockfile. Vault documentation references Three.js `0.186.0`, but application compatibility is **UNVERIFIED** until a real lockfile exists. Development-only testing packages must be recorded separately from runtime dependencies.

## Order of work

1. Freeze source references and record the owner lock hash.
2. Create package/config files and install dependencies only after approval.
3. Add typed scene/event contracts and Zustand semantic boundaries.
4. Add guarded transition lifecycle and cleanup behavior.
5. Add the one-route shell and neutral S01/S02 fixtures.
6. Add manifest-driven asset loading and font wiring.
7. Add unit, accessibility, and browser foundation tests.
8. Run evidence commands and stop for review.

## S01 readiness and S01→S02 transition contract

Final Flow `## 01` defines `Website Open → Loading Animation → Ready` and Final Flow `## 02` defines `Invitation Object → User Interaction → Open`. Therefore CP-01 must model two distinct concerns:

- Internal readiness: a cancellable, idempotent `S01_READY` event emitted only when the short prelude/readiness work has completed or has safely degraded. It is not a user button, arbitrary delay, or generic loading screen.
- Intentional action: a separate valid `OPEN_INVITATION` event from the invitation object/accessible equivalent. Only this user intent commits S01→S02. Readiness alone must never open the invitation.

Both events go through the guarded TransitionEngine/SceneManager described by Tech Spec `## 6.2`. Duplicate events are ignored after commit, cancellation returns to the safe pre-commit state, and interrupted transitions cannot commit stale completion callbacks. The exact readiness duration remains a source-defined short prelude, not a new timing lock.

## Acceptance criteria

- One route renders without scene-per-route navigation.
- S01 readiness is deterministic, cancellable, and idempotent; it does not force a user-facing button or artificial waiting screen.
- S01→S02 requires the separate valid `OPEN_INVITATION` intent after readiness and cannot double-commit.
- Cancellation restores a safe state.
- No ordinary scroll advances the narrative.
- Asset paths are manifest-derived and failures are visible.
- Asset acceptance records exact source-to-public mappings, source/destination byte counts and hashes, runtime manifest URL resolution, and browser fetch/HTTP status checks. Source integrity and deployed availability are reported separately.
- Fonts load from selected local WOFF2 files in a browser test.
- Selected font weights and preserved OFL/license notices are recorded.
- Keyboard focus and activation work for the foundation controls.
- Reduced motion preserves state completion.
- No personal content is embedded.
- Evidence distinguishes PASS, FAIL, BLOCKED, and NOT RUN.

## Validation commands

To be executed only after scaffolding and dependency installation:

```text
npm run typecheck
npm run lint
npm test -- --run
npm run test:e2e
npm run build
```

The exact scripts and runner are proposals until actual scripts and runners exist in `package.json`. Test-runner versions require compatibility verification with the selected Next.js/React/TypeScript toolchain. Development-only test packages must remain separate from runtime dependencies.

## Recovery and STOP conditions

Use a separate branch or recoverable checkpoint before implementation. Revert only CP-01 files if a gate fails; never reset unrelated user work or modify locked source packages.

Stop and request owner review if:

- the owner lock conflicts with a higher-order locked narrative or technical rule;
- a dependency requires changing the approved runtime stack;
- a personal-content placeholder would be treated as release content;
- a test requires unavailable network, device, GPU, or browser capability;
- S01/S02 cannot complete without ordinary scroll or hidden-path leakage;
- any asset hash/path contract fails;
- the proposed structure requires changing SVG, font, or Vault packages.

## Updated CP-01 readiness verdict

**CONDITIONAL READY FOR OWNER-AUTHORIZED EXECUTION.** The foundation scope, S01 readiness/intent split, compatibility checks, deployment verification requirements, and stop conditions are defined. Execution remains blocked until explicit owner authorization; no dependencies may be installed and no planned application files may be created before that authorization.

