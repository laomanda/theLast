# CP-01B Runtime Foundation Evidence

Date: 2026-10-16  
Status: **PASS** for the authoritative runtime foundation only.

## Source contracts used

Implemented against the PRD, Design System, Implementation Plan, Final Flow, Tech Spec, Scene-by-Scene fragment, owner direction lock, and all five approved CP-00B production reports. The canonical correction is preserved: S01→S02 uses `SHELL_READY` or `SHELL_DEGRADED_READY`; `OPEN_INVITATION` is valid only for S02→S03.

## Files created

- `src/runtime/contracts.ts` — exactly 12 scene IDs, lifecycle/status types, semantic events, error/result types, and future integration boundaries.
- `src/runtime/guards.ts` — canonical edge guards, PIN validator, cake continuity checks, and passive-event rejection.
- `src/runtime/transition-engine.ts` — single in-flight guarded engine with lifecycle phases, cancellation, stale-completion protection, idempotent commit boundary, and recoverable errors.
- `src/state/experience-store.ts` — single Zustand authoritative semantic store plus deterministic test store adapter.
- `tests/unit/runtime-foundation.test.ts` — focused semantic unit coverage.

## Implemented boundaries

- Canonical S01–S12 graph; no arbitrary skips, route navigation, or S13.
- S08 birthday completion is independent from the optional S09–S12 path.
- Hidden portal arm and commit are separate; passive scroll is rejected.
- S05 finalized cake configuration is carried into S06 and cannot finalize twice.
- Wish extinguish is semantic and idempotency-guarded.
- Vault PIN `011007` is a narrative validator only; PIN acceptance, door opening, letter visibility, letter selection, and confession visibility remain separate states.
- Replay resets narrative, cake, wish, Vault, letter, confession, and motion state while preserving mute preference.
- Reduced-motion preference remains compatible with the same semantic transitions.
- Asset, GSAP/Motion, cake, Vault, and motion interfaces are boundaries only; no visual or 3D implementation was added.

## Verification

| Command | Result | Exit |
|---|---|---:|
| `npm ls --depth=0` | dependency tree resolved; pre-existing extraneous Sharp/WASM packages reported | 0 |
| `npm run typecheck` | passed | 0 |
| `npm run lint` | passed | 0 |
| `npm run test:unit` | 1 file, 10 tests passed | 0 |
| `npm run build` | Next production build passed; `/` and `/_not-found` prerendered | 0 |

Browser E2E: **NOT RUN**. Full scene visuals and application-level 12-scene acceptance: **NOT RUN**.

## Integrity and protected content

- Four locked production font SHA-256 values: **PASS**.
- SVG REV5 manifest: 41/41 assets and hashes: **PASS**.
- Vault V2 manifest: 10/10 files and hashes: **PASS**.
- Canonical documentation manifest: 14/14 source hashes: **PASS**.
- No package versions, lockfile, canonical source, SVG, Vault, font, or application bootstrap files were changed.
- `assets/malica.webp` remains untouched as `OWNER-CONFIRMED PERSONAL ASSET / SCENE ALLOCATION PENDING / PUBLICATION HOLD`.

## Deviations and next checkpoint

No unresolved source conflict was introduced. Visual scene composition, personal content, photo publication, SVG/font deployment, Cake rendering, Vault GLB loading, audio, motion choreography, and browser acceptance remain pending and were not claimed complete. Recommended next checkpoint: owner review of the runtime contracts before Scene 01 integration.

## CP-01B.1 correction — 2026-10-16

Status: **PASS** for targeted runtime hardening.

### Files changed

- `src/runtime/contracts.ts`
- `src/runtime/guards.ts`
- `src/runtime/transition-engine.ts`
- `src/state/experience-store.ts`
- `tests/unit/runtime-foundation.test.ts`
- `planning/evidence/CP01B_RUNTIME_EVIDENCE.md`

### Defects corrected

- Replaced the public unrestricted `applyEvent()` action with a frozen, read-only Zustand runtime surface exposing only `getState`, `subscribe`, guarded `dispatch`, cancellation, and in-flight inspection. Narrative commits now occur only through the transition engine's private store adapter.
- Moved Cake validity into the transition guard so blank frosting is rejected before preparation. The authorized reducer now receives the exact guarded target, finalizes once, and preserves the finalized S05 configuration in S06.
- Made Cake comparison structural and independent of placement-record insertion order.
- Replaced global Zustand swapping in tests with isolated vanilla Zustand stores. Each runtime has independent state and subscribers while the React hook retains a singleton Zustand integration.
- Added transition-identity checks to every asynchronous phase. Cancelled resolution/rejection callbacks cannot mutate a newer transition; repeated cancellation is idempotent; replay aborts and invalidates pending work before reset.
- Preparation failure now restores lifecycle `active`, clears the transition ID, exposes a typed recoverable error, and permits retry. Starting a successful retry clears the old error.
- Initial hidden-portal state is `unavailable`; successful S08 completion separately makes it `discoverable`, followed by explicit `armed` and `committed` intentions. Passive scroll remains rejected.
- Invitation intent records `userGestureObserved` but does not claim audio playback unlock; playback unlock has a separate semantic confirmation.
- Replaced duplicate letter booleans with one explicit `unavailable | visible | selected` state while preserving separate Vault PIN, door, letter, and confession permissions.

### Regression tests

The suite now contains 17 passing tests. Added coverage includes invalid Cake rejection before preparation, target/result agreement, public mutation boundaries, resolving and rejecting stale promises after newer work begins, replay during an in-flight transition, preparation failure followed by retry, repeated cancellation and duplicate requests, independent stores/subscribers, S08 optional consent, PIN/door/letter/confession separation, stable Cake comparison, and reduced-motion authorization parity.

### Verification

| Command | Result | Exit |
|---|---|---:|
| `npm ls --depth=0` | passed; pre-existing extraneous Sharp/WASM packages remain reported | 0 |
| `npm run typecheck` | passed | 0 |
| `npm run lint` | passed | 0 |
| `npm run test:unit` | 1 file, 17 tests passed | 0 |
| `npm run build` | production build passed; `/` and `/_not-found` prerendered | 0 |

Integrity: documentation manifest 15/15 entries, SVG REV5 41/41 assets, Vault V2 10/10 files, and production fonts 4/4 hashes verified. No canonical document, locked asset, package version, application visual, or personal photograph was changed.

Deviations: none. Browser animation, WebGL fallback, visual scene, asset integration, and E2E acceptance remain **NOT RUN** and outside CP-01B.1.

## CP-01B.1 final integrity patch — 2026-10-16

Status: **PASS** for the runtime integrity correction.

### Changed files

- `src/runtime/contracts.ts`
- `src/runtime/guards.ts`
- `src/runtime/transition-engine.ts`
- `src/state/experience-store.ts`
- `tests/unit/runtime-foundation.test.ts`
- `planning/evidence/CP01B_RUNTIME_EVIDENCE.md`

### Atomic event snapshot and graph integrity

- `TransitionEngine.request()` now snapshots and validates every runtime event before guard evaluation or asynchronous preparation. A `FINISH_CAKE` snapshot clones and freezes frosting data, nested arrays, and placement records; preparation and commit use that same immutable snapshot.
- Malformed runtime event payloads, including malformed Cake configurations, return the typed `MALFORMED_EVENT` rejection without entering preparation or throwing.
- The executable graph is now one exported `CANONICAL_TRANSITION_GRAPH`; guard targets resolve through that declaration while semantic prerequisites remain checked independently. It includes both S01 readiness routes to S02 and retains S02 explicit invitation to S03.
- Added regression coverage for caller-owned Cake mutation during a deferred preparation and malformed Cake payload rejection. The suite now has 19 passing tests.

### Replay eligibility review

The PRD explicitly requires replay at the complete S08 birthday ending and S12 ending, plus a coherent full reset. The Final Flow and Tech Spec do not define a narrower scene-eligibility matrix or forbid replay while cancellation/recovery work is in progress. CP-01B.1 therefore preserves the existing all-scene/in-flight replay behavior, which first invalidates pending transition work and then resets state. The exact UI exposure policy outside the documented S08/S12 endpoints remains **PENDING POLICY**, not an invented runtime restriction.

### Verification

| Command | Result | Exit |
|---|---|---:|
| `npm run typecheck` | passed | 0 |
| `npm run lint` | passed | 0 |
| `npm run test` | no `test` script exists in the approved package configuration | 1 |
| `npm run test:unit` | 1 file, 19 tests passed | 0 |
| `npm run build` | production build passed; `/` and `/_not-found` prerendered | 0 |

The package scripts were not changed to add a `test` alias. SVG REV5 integrity remains 41/41; Vault V2 integrity remains 10/10; all four production fonts and `assets/malica.webp` remain present and untouched. Browser/visual/WebGL acceptance remains **NOT RUN**.
