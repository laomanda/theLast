# CP-00B — Production Architecture

This is a proposed architecture derived from the verified source contracts. It is not an implementation or production-readiness claim.

## Proposed application shape

```text
app/
  layout.tsx                 global metadata, font variables, providers
  page.tsx                   single experience entry
  error.tsx / not-found.tsx  safe recovery surface
src/
  content/                   typed owner-supplied copy/media manifests
  scenes/                    Scene01–Scene12 and scene contracts
  runtime/                   scene engine, transition guards, lifecycle
  state/                     Zustand semantic store and typed events
  motion/                    GSAP scene timelines and Motion local feedback
  assets/                    manifest loader, preload policy, capability map
  vault/                     V2 adapter, loader, hinge, finish, fallback
  cake/                      shared CakeConfiguration and DOM/SVG renderer
  components/                SceneFrame, controls, letter, keypad, live regions
  styles/                    tokens, typography, responsive layers
  test-fixtures/             neutral non-release fixtures only
public/assets/               copied runtime assets only after CP-01 approval
tests/                       unit, integration, accessibility, browser evidence
```

This structure is **INFERRED/PROPOSED** from `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md`, `docs/DESIGN_SYSTEM.md`, and `docs/IMPLEMENTATION_PLAN.md`, especially Tech `#41`, Design System `## 14`, and Implementation Plan `## 16`.

## Runtime and navigation

- Use one Next.js route for the experience; do not create one route per scene. This follows Tech `#30` and Design System `## 2.1`.
- `SceneOrchestrator` owns `preload → prepare → enter → active → exit → cleanup`, with cancellation and transition tokens.
- Scene 08 commits the birthday completion before any hidden discovery can be armed.
- S09 requires deliberate portal intent and an accessible keyboard alternative; ordinary scroll and waiting cannot enter it.
- S10–S12 are mounted only after guarded hidden-path entry and are never exposed by generic navigation or progress indicators.

## Semantic state boundaries

Zustand is the semantic authority. It owns scene identity, transition tokens, consent/portal state, `CakeConfiguration`, vault semantic state, letter selection, reduced-motion preference, capability tier, and recovery status. Components may own ephemeral input state; GSAP and Motion may never commit semantic progression.

Required invariants:

- Scene changes are guarded and idempotent.
- Scene 05 and Scene 06 reference the same `CakeConfiguration` object/normalized value.
- Vault sequence remains `doorOpening → doorOpen → letterAvailable → letterSelected`.
- Scene 08 is a complete birthday ending even if the hidden path is never entered.

Sources: Tech `#6`–`#9`, `#16`, `#18`; Design System `## 9`, `## 10`, `## 13.3`–`## 13.5`; PRD `## 3`, `## 5.1`–`## 5.3`.

## Motion ownership

- GSAP: scene-level choreography, SVG draw/mask work, scene handoffs, Vault presentation orchestration.
- Motion: local control feedback, button states, focus/press feedback, small component transitions.
- Native Pointer Events: drag, swipe, hold, cancellation, and threshold logic.
- No shared DOM transform/opacity ownership between GSAP and Motion.
- `prefers-reduced-motion` replaces broad spatial movement with calm fades/local state confirmation while preserving semantic completion.

Sources: Tech `#4`, `#9`, `#21`, `#28`; Design System `## 7.5`–`## 7.6`; Motion fragment `## 11`–`## 15`.

## Asset and preload architecture

`AssetManager` should consume explicit typed manifests rather than scanning arbitrary files. Initial load contains only S01 essentials, fonts needed for the first readable surface, and required SVGs. Preload S02–S08 progressively. Begin Vault preparation before S10 without blocking S01, and abort/cleanup scene-scoped work on exit.

Each asset load needs a visible failure state, retry or fallback policy, cancellation, byte/path logging in test mode, and disposal ownership. Use Next/Image for approved authentic photography only; do not use preview screenshots or generated decorative photography.

Sources: Tech `#24`–`#27`, `#35`; Design System `## 8`, `## 14.6`, `## 16`; owner lock `## 2`–`## 3`.

## Responsive and accessibility architecture

Use mobile-first composition with recomposition, not simple shrinking. Provide semantic headings, labelled controls, keyboard operation for every interactive path, visible focus, live-region status for state changes, `alt` text for informative photos, hidden decorative SVGs, and no gesture-only requirements.

Required fallback chain:

1. Full true-3D Vault where capability and runtime tests permit.
2. Lite true-3D with reduced effects.
3. 2.5D/DOM fallback preserving the Vault interaction contract.
4. DOM-minimal path preserving PIN, letter selection, and narrative completion.

Sources: Tech `#17`, `#28`, `#29`; Design System `## 15`; Vault fragment `## 12`; PRD `## 6`–`## 7`.

## Testing and evidence

Planned test layers: typecheck/lint, Zustand transition unit tests, CakeConfiguration continuity tests, asset-manifest tests, component accessibility tests, reduced-motion tests, browser E2E journey tests, and device/browser visual/performance evidence. Every PASS must include command, environment, timestamp, fixture/content status, and artifact path. Until scaffolding exists, all runtime checks remain **UNVERIFIED**.

