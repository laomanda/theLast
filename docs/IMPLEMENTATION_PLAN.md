# BIRTHDAY EXPERIENCE — IMPLEMENTATION PLAN

> **File:** `IMPLEMENTATION_PLAN.md`  
> **Version:** **1.0 — FINAL / APPROVED EXECUTION BASELINE**  
> **Approved design direction:** *Warm Kinetic Editorial Keepsake* / *A Keepsake That Slowly Opens*  
> **Implementation approach:** **Narrative-First, Quality-Gated Vertical Slices**  
> **Prepared:** 2026-10-09  
> **Status:** **READY FOR IMPLEMENTATION — NOT A CLAIM THAT CODE OR TESTS HAVE BEEN COMPLETED**  
> **Owner approval:** Implementation Plan v0.2 approved, including stack conformity, P1 authoritative runtime, and evidence-backed gates.  
> **Governing documents:** `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md`, `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md`, `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md`, and eleven LOCKED design fragments in `docs/SOURCES/`.

---

## 0. EXECUTIVE IMPLEMENTATION CONTRACT

Build **one** mobile-first, twelve-scene, fullscreen, scene-based interactive birthday gift. The full birthday is complete at Scene 08. Scenes 09–12 are deliberately discovered, optional and must never be triggered by waiting, normal browser scroll, an animation finishing, or a forced prompt. The story's true-3D Vault is a cinematic **means** to an explicitly opened paper letter—not the primary emotional endpoint.

This plan schedules the work; it **does not change the approved product, stack, scene count, creative direction, PIN, or interaction/consent boundaries**.

### 0.1 Non-negotiable user journeys

- **JOURNEY-BIRTHDAY:** `S01 → S02 → S03 → S04 → S05 → S06 → S07 → S08 → End / Replay`, complete and satisfying **without Hidden World**.
- **JOURNEY-HIDDEN:** `S08 → explicit Quiet Second Invitation arm → intentional gesture / accessible confirmation → S09 → S10 [PIN 011007] → animated mechanical door → S11 [letter visible] → separate Open Letter → S12 → End / Replay`.
- **JOURNEY-FALLBACK:** both journeys complete silently, with keyboard or non-drag input, reduced motion and no WebGL or microphone; meaningful accessibility and interaction semantics survive.
- **JOURNEY-REPLAY:** replay safely restores canonical scene/cake/wish/portal/Vault/confession defaults without ghost audio, dangling listeners or stale timelines.

### 0.2 Terminology—avoid three frequent collisions

| Term | Meaning | Never confuse with |
|---|---|---|
| **Phase P0–P6** | Steps in this implementation roadmap | PRD requirement **Priority P0/P1/P2** |
| **PRD Priority P0/P1/P2** | MUST / SHOULD / MAY product requirements | Implementation phase numbers |
| `material.M1–M5` | Material families | `motion.M0–M5` motion classes |
| `texture.T0–T2` | Surface texture tiers | `transition.T1–T4` transition grammar |
| `shadow.S0–S3` | Depth/shadow classes | Scene IDs `S01–S12` |
| `photo.P1–P4` | Photography treatment families | Phase `P0–P6` |
| `G01–G12` | Canonical scene QA gates | `PRD-G01..G16` global product requirement IDs |
| `AT-01..AT-18` | Product acceptance scenarios in PRD | Runtime unit/integration test names |

Implementation examples here are **proposals**, not retroactive changes to LOCKED fragments. Numeric targets, package versions, exact dimensions, model geometry, personal texts/photos, final soundtrack and detailed easing are explicitly **PENDING** until appropriate validation/approval.

---

## 1. DOCUMENT AUTHORITY AND SOURCE-INTEGRITY AUDIT

### 1.1 Reading order and rule ownership

1. **Locked Final Flow:** narrative order, 12 scenes, birthday-first, hidden consent, PIN `011007`, distinct letter opening, no demanded response.
2. **Approved Tech Spec:** permitted application stack and runtime/fallback architecture; retains provisional/optional labels where original marks them.
3. **Design Direction + ten domain design fragments:** approved art identities and their constraints; no redesign by implementation AI.
4. **Locked Scene-by-Scene fragment:** per-scene composition, interaction, accessibility and transition intent.
5. **`DESIGN_SYSTEM.md` v1.0:** consolidated design vocabulary, namespace disambiguation, cross-scene integration and visual QA.
6. **`PRD.md` v1.0:** product scope, approved unlisted-URL choice, functional requirement IDs, acceptance, privacy expectation and release conditions.
7. **This implementation plan:** sequence, ownership, deliverables, testing evidence and change control only.

Rules are **domain-owned**: PRD governs *what and when accepted*; Design System governs *look, feel and choreography*; Tech Spec governs *approved technical capabilities*; Flow governs *narrative consent and order*. If statements differ, do not silently invent a single rule—record a **deviation/decision request**, prefer the governing source in its domain, and obtain explicit owner approval for any change to a LOCKED requirement.

### 1.2 Canonical source register

| ID | File | Ownership |
|---|---|---|
| F01 | `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` | 12-scene narrative and consent |
| F02 | `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` | Architecture, dependencies, lifecycle, fallbacks |
| F03 | `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` | Warm Kinetic Editorial Keepsake |
| D01 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` | Locked chromatic palette |
| D02 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` | Bricolage / Newsreader / rare Shantell |
| D03 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` | Phosphor / Offset Loop / SVG grammar |
| D04 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` | Soft-Structured Kinetic Geometry |
| D05 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` | Tactile Editorial Surfaces |
| D06 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE.md` | Controlled Cinematic Depth |
| D07 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MOTION.md` | Choreographed Playful Precision |
| D08 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_PHOTO_TREATMENT.md` | Authentic, adaptive 1–6 photos |
| D09 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_CAKE_ART_DIRECTION.md` | Sculpted Celebration Cake, S05–S06 |
| D10 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_VAULT_ART_DIRECTION.md` | Quiet Keepsake Vault / actual 3D door |
| D11 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SCENE_BY_SCENE.md` | 12-scene art & audit resolutions |
| Master | `DESIGN_SYSTEM.md` | Consolidation of F01–F03 and D01–D11 |
| Product | `PRD.md` | Requirements / acceptance / Option A privacy |

**Provenance note:** the original archive used to construct `DESIGN_SYSTEM.md` contained 13 of the intended 14 source documents; D11 was retrieved separately from the project conversation and included in the subsequent prototype handoff. **Verify all fourteen files in the current `docs/SOURCES/` before commencing P0**. Never overwrite a recovered D11 with an older or absent version. Preserve filenames and version metadata; record checksum/size for source freeze, not fabricated values.

### 1.3 Source-freeze deliverables (P0)

- `docs/source-inventory.md`: all 14 source files, exact filename, version/status, checksum, missing/duplicate flags, and date checked.
- `docs/DECISION_LOG.md`: baseline decisions, meaningful approved interpretation of ambiguities, and any owner-approved deltas.
- `docs/PENDING_REGISTER.md`: unresolved content, assets, metrics, calibration and approval owner.
- `docs/STACK_AUDIT.md`: actual installed dependencies, provenance, and approved classification.
- The original source files stay **read-only** during implementation unless owner approves a controlled versioned revision.

No source audit output should say “passed” unless source files were physically inspected and the inventory reconciles.

---

## 2. APPROVED TECH STACK — CONFORMITY REGISTER

| Capability | Decision | Implementation boundary | Source |
|---|---|---|---|
| Next.js | **LOCKED** | App shell/build/assets, single experience entry; do **not** route each scene separately | Tech §§2,30 |
| React | **LOCKED** | Scene lifecycle, component composition | Tech §2 |
| TypeScript | **LOCKED** | Typed events, scene/asset/cake/store contracts | Tech §2 |
| Tailwind CSS | **LOCKED infrastructure only** | Utility styling; no default SaaS components/theme leakage | Tech §3 |
| Zustand | **LOCKED** | Authoritative cross-scene state with domain slices; not a motion engine | Tech §7 |
| GSAP | **LOCKED** | Scene sequencing, complex SVG/mask/3D orchestration | Tech §4 |
| Motion | **LOCKED** | Button/local component motion, independent transform ownership | Tech §4 |
| Three.js | **LOCKED** | True 3D Vault and its physical mechanism | Tech §14 |
| React Three Fiber | **LOCKED** | React-integrated 3D canvas for S10 | Tech §14 |
| Drei | **LOCKED** | Targeted 3D utility components only | Tech §14 |
| Howler.js | **LOCKED** | Optional audio playback with user gesture gate | Tech §22 |
| GLB/glTF pipeline | **LOCKED** | Externally authored GLB preferred for production Vault; compression if useful | Tech §§15–16; Vault D10 |
| SVG + browser CSS | **LOCKED capability** | Offset Loop, masks, illustration and DOM/SVG-first Cake | Tech §§12,19 |
| Next/Image | **LOCKED** | Responsive real portraits and other eligible raster images | Tech §13 |
| Native Pointer Events | **LOCKED** | Cake drag, hidden gesture, hold, pointer cancellation | Tech §21 |
| Phosphor Icons | **LOCKED design choice** | Functional icon system; custom SVG reserved for decorations | Design D03 |
| Browser Web Audio API | **OPTIONAL** | Microphone blow only; never mandatory for S06 | Tech §23 |
| dnd-kit | **OPTIONAL CANDIDATE** | Install only if native pointer interaction demonstrably inadequate | Tech §20 |
| XState | **OPTIONAL / NOT REQUIRED** | Do not introduce without approved complexity justification | Tech §8 |
| Canvas2D cake | **PENDING ALTERNATIVE** | Try only if DOM/SVG measured limitations justify it | Tech §19; Cake D09 |
| Advanced shaders | **OPTIONAL** | Must justify quality and device cost | Tech §42 |

**Explicitly rejected / not needed for v1:** Anime.js, Lenis, third-party parallax/particles/physics engines, jQuery, per-scene SPA routing, heavy generic UI kits, unrequested backend/database/CMS/authentication. No new runtime library solely for visual spectacle. No unauthorized service, payment, analytics or user-tracking package.

### 2.1 Development tooling is not a new runtime stack

The project needs an **observable test harness**. At P0 select compatible maintained versions of a TypeScript checker, lint configuration, unit-test runner (e.g. Vitest), browser E2E tooling (e.g. Playwright), and optional accessibility tooling. They are **proposed development-only tooling**, not newly LOCKED application libraries. Record the choice, reason, exact resolved versions, lockfile and commands in `STACK_AUDIT.md`; if a tool conflicts with approved runtime, choose a compatible testing approach instead of upgrading/swapping the runtime stack silently.

Never invent fixed framework versions from the design document. Choose compatible versions at P0, lock dependencies reproducibly, and check package/API compatibility (especially Next.js/React, R3F/Three/Drei, GSAP/Motion and font delivery).

### 2.2 Dependency change protocol

Before installing **any new application dependency**: state required user-facing capability and PRD ID; determine why existing/native APIs cannot satisfy it; analyze browser/device size/performance, maintainability, licensing and lifecycle; propose alternatives; ask for approval if it changes baseline. A dev/test-only package must still be logged, versioned and supported by a clear test purpose. No runtime dependency is approved merely because a prototype generator suggests it.

---

## 3. DEFINITION OF READY AND IMPLEMENTATION STRATEGY

### 3.1 Source-ready criteria

- The developer/AI can read `PRD.md`, `DESIGN_SYSTEM.md`, `TECH_SPEC`, all 14 source docs, and this plan.
- Narrative choices, PIN `011007`, two-stage hidden portal, letter consent, cake continuity, and replay semantics have been restated accurately.
- Unconfirmed personal data is tracked as **PENDING CONTENT**, not created from guesses.
- Fonts are inspected for actual local `.woff2` availability, license, glyph coverage and correct family; GitHub source repositories are **not automatically production-ready font files**.
- Photos (1–6, design baseline 2) and final GLB may be pending without blocking a neutral, clearly labelled prototype scaffold.
- The owner has approved direct **unlisted HTTPS URL without login**. This is obscurity/distribution preference, **not confidentiality**; PIN is storytelling only.

### 3.2 Delivery model

Every work unit must be a **vertical slice** with an observable entry, a user action, a state change, a valid exit, error recovery and evidence. Feature boundaries and milestones remain linked by typed contracts. **No “all 12 scenes in one prompt” implementation pass** and no polish-first replacement of architecture.

Execution order for scene groups: **P2 editorial group → P3 cake group → P4 hidden/Vault group**, all using the **P1 runtime contract**. P2 and P3 are structurally parallel after P1, but executed sequentially by default to simplify AI coding and integration review. P4 must integrate against both Birthday and Cake completion paths.

### 3.3 Avoid build-success theater

A green build is only a compilation signal. Completion requires behavior observation and reproducible evidence (unit/Playwright tests, screenshots and recordings where appropriate, dependency/tool logs, defect list, owner visual/content approval).

---

## 4. PHASE DEPENDENCY GRAPH AND CRITICAL PATH

```text
FROZEN DOCS + APPROVED TECH + CONTENT SCHEMA
                    │
                    ▼
        P0: FOUNDATION / TOOLING
                    │  stable build + test runners
                    ▼
        P1: AUTHORITATIVE RUNTIME
          (typed events and guards,
           reset, accessibility, fallbacks)
                    │
             ┌──────┴──────┐
             ▼             ▼
       P2: EDITORIAL   P3: CAKE
       S01–04,07–08    S05–06
             └──────┬──────┘
                    │ both journeys integrated
                    ▼
        P4: HIDDEN WORLD / VAULT
             S09–12 + S08 portal
                    │
                    ▼
       P5: MOTION / AUDIO / POLISH
                    │
                    ▼
         P6: FULL QA / RELEASE
```

**Scheduling caveat:** P2 and P3 may be planned in separate branches after P1, but shared tokens/scene contracts must already be merged. An implementer working serially should finish P2 before P3. P4 may begin *asset modeling experiments* earlier, but its functional gate requires the integrated S08 → S09 and S05 → S06 pathways.

### 4.1 Definition of a dependency-ready milestone

A milestone can start when its predecessor's **contract and relevant gate evidence** are available; a cosmetic placeholder does not satisfy missing event/state guards. Critical guard failures block downstream merge. A documented low-impact visual PENDING item need not stop parallel implementation if it does not change the approved design direction.

---
## 5. P0 — PROJECT FOUNDATION, SOURCE FREEZE AND TEST HARNESS

**Goal:** reproducible environment, locked stack conformity and source-of-truth integrity. **Do not spend P0 on final cinematic visual effects.**

### 5.1 Build tasks

- Inspect `docs/` source inventory and reconcile the fourteen F01–D11 docs; preserve original files and archive provenance.
- Bootstrap **Next.js + React + TypeScript**; install approved runtime stack and Tailwind as infrastructure only. Maintain one experience page/shell rather than twelve page routes.
- Set up package scripts for `typecheck`, `lint`, `build`, `test:unit`, `test:e2e` and, if useful, `test:a11y`/`test:visual`. Record exact commands and generated artifacts; customize names if compatible with chosen environment.
- Select compatible dev-only testing tools (unit + browser E2E) and establish a clean `tests/` folder. Browser execution must be real, not asserted.
- Establish TypeScript strictness and explicit source-module boundaries; create stub entry points only where they are interfaces, not false production features.
- Inspect three local font families and usage licenses; map deployable files to `next/font/local` only when verified. Record unavailable weights and safe fallbacks. No fourth design font invented.
- Implement canonical palette/token registry and namespace comments (material vs motion; texture vs transition); configure Phosphor functional-icon boundary, SVG asset folder and privacy-conscious Next/Image pipeline.
- Create `src/content/` strongly typed configuration with **clearly labeled prototype placeholder** fields; avoid personal claims. Missing approved final content must be detectable before gift release.
- Establish no-login unlisted URL distribution policy and metadata/privacy review checklist. `noindex` may be used as discoverability mitigation but must not be represented as security.
- Establish evidence and issue folders, test fixtures for 1/2/4/6 images, missing assets, no-WebGL, silent and reduced-motion conditions.
- Resolve build infrastructure choices (static hosting/Next.js output) as **implementation proposal** consistent with single-runtime deployment; production domain/provider stays PENDING.

### 5.2 P0 artifacts

`package.json` and reproducible lockfile; working Next app; font audit; `docs/source-inventory.md`; `docs/STACK_AUDIT.md`; `docs/PENDING_REGISTER.md`; `docs/DECISION_LOG.md`; test runner configs; evidence directory template; initial content schema and fixture loader; `.gitignore`/no secrets or private raw metadata accidentally bundled.

### 5.3 P0 MUST-PASS evidence

- Actual `typecheck`, `lint`, `build` command output with **exit code 0**; if lint has warnings, list them rather than omitting them.
- Unit test runner executes a real smoke assertion and reports count/pass/fail; browser runner opens initial app in actual browser and captures one screenshot/log.
- Source inventory accounts for **14/14 F/D baseline docs**, with filenames and checksums from files actually present.
- Runtime dependencies align with §2; approved vs optional/rejected documented; no unauthorized runtime dependencies.
- Font audit states **available/unavailable**, not “font installed” simply because a source folder exists.
- No required personal information is falsely populated; blocked content items appear in PENDING register.

**P0 cannot PASS** while the toolchain has only been configured but never executed, or while the source register is incomplete.

---

## 6. P1 — AUTHORITATIVE SCENE RUNTIME AND GUARDED NARRATIVE SKELETON

**Goal:** fully functional narrative and state contracts using **temporary neutral presentation**. Scene visuals may be development scaffolds; **permissions, event semantics, lifecycle and resets may not be placeholders**.

### 6.1 Runtime subsystems

| Module / domain | P1 implementation obligation | Observable failure to prevent |
|---|---|---|
| `SceneManager` | Exactly twelve typed scene IDs, canonical edge graph, lifecycle, entry/exit guards | Unauthorized scene jumps, thirteenth scene/route |
| `TransitionEngine` | Single transition in flight, commit once, safe interrupt/cancel/cleanup and fast-forward semantics | Double-advance, dangling transition, dead-end |
| `ExperienceStore` (Zustand) | Authoritative scene and narrative state; domain-owned reducers/actions/selectors | Component-local state contradicting story |
| `GestureManager` | Pointer capture/release/cancel, drag threshold contract, keyboard equivalent, no page-scroll trigger | Accidental hidden reveal or gesture-only gate |
| `CakeStore` domain | Typed `CakeConfiguration`, edit vs finalized state, snapshot parity contract | Cake reset/replacement in S06 |
| `WishController` | Single extinguish event, any-length wait, tap/hold alternative | Mic-required flow, double completion |
| `HiddenPortalController` | Unavailable/discoverable/armed/committed phases; explicit arm then commit | S08 waiting or incidental scroll opening S09 |
| `VaultController` | PIN validator contract, wrong-code retry, accepted/releasing/opened/letter selected guards | PIN completion revealing S12 or false door status |
| `CapabilityManager` | Reduced-motion and full/lite/fallback state; module API for failure recovery | Hardware error blocks narrative |
| `AssetManager` | Readiness/late preload/failure/retry semantics; no fake percentage | Infinite loader, early GLB blocking S01 |
| `AudioManager` | Locked until valid user gesture, mute preserved, cancellation hooks | Surprise audio, phantom sound after scene exit |
| `ReplayController` | Atomic canonical reset across scene/cake/wish/portal/Vault/letter | Ghost state after replay |

Implement separate domains or slices as necessary. Avoid creating one giant untestable React component and avoid introducing XState unless formally justified.

### 6.2 State model—typed **design contract**, not an exact mandated file layout

```ts
// Illustration of the approved semantics; refine field names during P1 review.
type SceneId =
  | 'S01' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06'
  | 'S07' | 'S08' | 'S09' | 'S10' | 'S11' | 'S12';

type SceneLifecycle =
  | 'preloading' | 'preparing' | 'entering'
  | 'active' | 'exiting' | 'cleaned';

type HiddenPortal = 'unavailable' | 'discoverable' | 'armed' | 'committed';
type WishStatus = 'unready' | 'ready' | 'flameOn' | 'extinguished';
type VaultStatus =
  | 'unloaded' | 'loading' | 'ready' | 'pinEditing' | 'pinRejected'
  | 'pinAccepted' | 'releasing' | 'doorOpening' | 'opened'
  | 'letterVisible' | 'letterSelected';

type CapabilityTier = 'full' | 'lite' | 'fallback';

interface ExperienceSnapshot {
  scene: SceneId;
  lifecycle: SceneLifecycle;
  transitionInFlight: boolean;
  birthdayComplete: boolean;
  hiddenPortal: HiddenPortal;
  cake: CakeConfiguration; // typed and owned by Cake domain
  wish: WishStatus;
  vault: VaultStatus;
  confessionOpened: boolean;
  audioUnlocked: boolean;
  audioMuted: boolean;
  capability: CapabilityTier;
}

// All events must route through validated actions, not arbitrary state writes.
type IntentEvent =
  | { type: 'INVITATION_OPEN' }
  | { type: 'SCENE_CONTINUE'; from: SceneId }
  | { type: 'CAKE_FINISH' }
  | { type: 'WISH_EXTINGUISH' }
  | { type: 'BIRTHDAY_COMPLETE' }
  | { type: 'HIDDEN_DISCOVERY_ARM' }
  | { type: 'HIDDEN_PORTAL_COMMIT' }
  | { type: 'VAULT_PIN_SUBMIT'; code: string }
  | { type: 'VAULT_OPEN_COMPLETE' }
  | { type: 'HIDDEN_LETTER_OPEN' }
  | { type: 'REPLAY_ALL' };
```

The example is **not** complete production code: validate edge-specific intent; distinguish camera/door effects from business state; prevent duplicate commits; model async preload, error and abort; do not store private PIN analytics or send it to a backend. Choose pure guard functions with unit tests.

### 6.3 Canonical scene guards—required invariants

| Edge | Permission / completion contract |
|---|---|
| S01 → S02 | App shell/critical introduction readiness; recoverable load error |
| S02 → S03 | Explicit Invitation Open event; audio unlock may be attempted but cannot be required |
| S03 → S04 | Birthday reveal readable; user invokes Continue, not autoplay |
| S04 → S05 | Portrait shown safely or recoverable media fallback; Continue |
| S05 → S06 | `CAKE_FINISH` validates and freezes **the same** configuration, commits once |
| S06 → S07 | Explicit semantic extinguish **and** Continue; microphone optional |
| S07 → S08 | User proceeds after a freely paced birthday-only letter |
| S08 → End/Replay | Birthday considered complete; hidden content not needed |
| S08 → S09 | Quiet Second Invitation **armed** then separate intentional portal **committed** via gesture/accessible equivalent; one `transition.T4` candidate and reduced-motion replacement |
| S09 → S10 | Portal already committed; Vault asset ready **or** usable fallback ready |
| S10 → S11 | PIN `011007` accepted; lock release and door opening reached safe `letterVisible` pose in active tier |
| S11 → S12 | Separate deliberate **Open Letter** event; PIN/door animation alone insufficient |
| S12 → End/Replay | User finishes voluntarily; no answer/reply collection |

**Portal implementation nuance:** S08 hosts discovery and armed confirmation; S09 is a **logical scene** entered after valid portal commitment. The T4 spatial handoff can straddle the boundary, but there is no hidden `S08.5` and S09 cannot be entered through ordinary scroll. On cancellation or sub-threshold input before commit, restore armed S08 safely. The same explicit two-step decision must remain usable with keyboard and reduced motion.

**Vault implementation nuance:** “PIN correct” marks validation acceptance, **not** an unconditional grant to S12. S10 may advance to S11 only when the active tier reports a stable open/letter-visible state. S11 remains indefinitely until a separate user letter action. A reduced-motion or fallback opening may settle immediately into an equivalent **visible** open state, but cannot skip the consent gate.

### 6.4 Transition lifecycle / cancellation contract

- Only one authoritative transition transaction may be active. A second event is ignored **with feedback**, safely queued if genuinely appropriate, or rejected with a typed reason—never permitted to spawn a parallel conflicting timeline.
- Use an operation token/sequence ID or comparable abortable scope. Async asset resolution, GSAP completion, input repeat and delayed audio must verify active transaction ownership before committing.
- `preload → prepare → enter → active → exit → cleanup`; dispose unneeded R3F resources, release pointer captures, kill scene-owned GSAP contexts and stop orphan audio on exit.
- If the user switches browser tab / loses visibility: pause or reconcile visual timeline as appropriate without invalidating semantic state. Re-entry must settle into a correct scene, not restart a completed action.
- Reduced-motion shortcut or safe skip **settles visual effects**; it never manufactures missing user consent, PIN validation, extinguish, or letter-open events.
- Record transition errors and recoverable reasons **without logging romantic content or sensitive user activity**.

### 6.5 Replay policy

Full replay: return to S01 (or defined beginning after loading readiness), clear scene progress and birthday/hidden permissions, restore initial cake, clear wish completion, reset PIN/door/letter/confession, abort active animation/audio effects. The user's mute preference **may persist** (Design System/PRD recommendation; decide explicitly in P1 and test) so replay does not surprise with audio. If a later product decision enables backward navigation, a return from S06 to S05 should preserve configured cake; **do not add that navigation without approval**.

### 6.6 P1 must-pass automated tests

- Legal edges succeed; all illegal scene jumps fail.
- `INVITATION_OPEN` requires activation; autoplay rejection leaves S03 reachable silently.
- Two-stage discovery: passive S08 wait, regular scroll, below-threshold drag, blur/cancel and single arm **do not** enter S09; valid second-stage intent enters it once.
- Cake finish applied twice yields a single immutable/finalized configuration; S06 renders the corresponding snapshot, not a new default.
- Repeated extinguish does not increment completion; progression requires confirmed wish interaction.
- Wrong PIN stays locked; `011007` leads to unlocking; rapid submissions do not start multiple door sequences.
- `PIN_ACCEPTED` or `DOOR_OPEN_COMPLETE` alone never causes confession to render.
- Letter selection without opened Vault is rejected; separate letter selection after stable open authorizes S12 once.
- Full replay clears domain state and repeated replay is safe.
- Asset error/no WebGL routes to fallback; keyboard-only and muted tests complete the whole story skeleton.
- Abort/blur/rerender and repeated pointer input leave no in-flight stale transaction that prevents future actions.

### 6.7 P1 deliverables and exit gate

- Functional **12-scene narrative skeleton** (neutral labels/scaffolds allowed), two full journeys, replay and negative/illegal journey tests.
- Shared typed contracts, documented state graph and event/action boundary, guard test suite, E2E smoke fixtures, error boundary and mocked fallback.
- Browser recording/screenshot for S01→S08 stop/replay; S08→S09 voluntary discovery; S10 valid/invalid PIN; S11 explicit letter-open → S12; keyboard-only fallback.
- Unit and browser tests recorded **PASS**; normal `typecheck`, lint and build also pass.

**P1 fails** if any core guard is merely a TODO, unverified “simulate success” button, or an animation completion handler that bypasses the store. A 3D model is **not** required at P1, but the *semantic vault status* must be implemented and testable with a mock adapter; such mocks must be removed or separated from production behavior by P4.

---

## 7. P2 — EDITORIAL VISUAL FOUNDATION AND BIRTHDAY STRUCTURE

**Scope:** Scene **S01–S04 and S07–S08** implemented to approved art direction using P1 runtime. Do **not** bypass S05/S06: while the Cake slice is under construction, P1's temporary interaction shell remains responsible for valid progression. Integration occurs in P3.

### 7.1 Tasks

1. Implement authoritative semantic aliases for locked colors and contrast-safe text pairing, self-host font roles, Phosphor controls, Offset Loop signature, SVG decorative families and background/midground/foreground plus separate utility overlay.
2. S01: real readiness with meaningful initial graphic and recoverable errors; no fake progress or artificial mandatory timeout.
3. S02: tactile invitation object, explicit accessible Open, audio permission after user interaction only.
4. S03: Bricolage birthday/name reveal with readability-first settled state and reduced-motion path; long-name layouts.
5. S04: P1 hero photo treatment; **one-photo complete**; 2-photo default layout; up to 6 curated genuine assets; no galleries, forced duplicates, invented context. Face-safe crop and fallback.
6. S07: calm Newsreader reading surface; approved birthday-only content loaded via schema or clearly marked development text; no auto-scroll, forced reading speed or confession.
7. S08: genuine complete birthday ending with End/Replay, optional quiet discovery *entry affordance* reusing P1 two-stage guard; the affordance must not dominate.
8. Responsive desktop compositions are **recomposed**, not merely scale-down. Ensure safe areas, short phone / small viewport, wide desktop and local reading scroll if needed.
9. No repetitive generic cards, no default SaaS-style dashboard and no inflated decorative SVG count; enforce previously LOCKED graphic/material rules.

### 7.2 Deliverables

- S01–S04/S07–S08 reviewed visual states at mobile and desktop widths, plus key short-height fixture.
- Photo fixture manifest coverage for 1, 2, 4 and 6 sources; original person's photo is not required for preliminary test fixtures. **Never depict placeholders as approved real portrait content.**
- Visual token examples and screenshot comparison against Design System; reading QA for long/short texts.
- S08 ending can be observed without hidden promotion, and discovery remains discoverable for an intentional user.

### 7.3 P2 exit evidence

Screenshots (mobile short/tall, desktop) for all six scenes, visual review notes identifying intentional deviations, keyboard focus screen/video, no-content-overflow output, photo fixture tests, and automated continuation to S08 using P1 mock Cake until P3 is integrated. Typecheck/lint/build/guard regression rerun. **P2 may not claim complete Birthday World until the real P3 Cake slice replaces its placeholder.**

---

## 8. P3 — SCULPTED CELEBRATION CAKE VERTICAL SLICE

**Scope:** Scene **S05 Cake Studio** and **S06 Make a Wish**; this is an interaction module, not a static illustration review.

### 8.1 Implementation sequence

1. Establish normalized `CakeConfiguration` schema and defaults: single-tier silhouette, restrained matte/satin treatment, five curated families (**frosting, candles, flowers, topper, accents**); initial sample of each category is enough to validate breadth, exact variant counts remain PENDING.
2. Implement DOM/SVG-first `CakeRenderer`, decoration layers, valid anchor/slot geometry, collision/limit checks, and source-of-truth configuration in Zustand. Avoid full WebGL cake.
3. Add contextual editorial controls: mobile cake stage + unobstructed bottom tray; desktop asymmetric stage + side controls. Use accessible labels, visible focus, and predictable keyboard navigation.
4. Support tap-to-select/placement without drag; optional native Pointer Events drag/snap (pointer capture, cancellation, invalid drop rollback). Do not introduce dnd-kit by default.
5. Implement undo, remove, reset (confirmation for destructive reset). Each action is transactional—invalid move must not commit, repeated action must not duplicate decoration.
6. `Finish Cake`: validate/commit once, freeze editing for transition, snapshot configuration and hand off to S06.
7. S06 renders **the same CakeConfiguration**, with new light/atmosphere and candles. Wish state uses one semantic extinguish; tap/hold works without mic; the mic is optional P2 enhancement. No forced countdown.
8. Add restrained smoke/glow and safe cleanup only after interaction stability. Keep illustration and motion in locked material.M3 / shadow.S2 / motion.M2 and suitable M3/M4 transitions; heavy shader or real 3D is not a feature requirement.

### 8.2 Identity and state invariants

- Config equality means style choices, candle type/count where supported, decorations, positions/anchor IDs, topper and accents agree; comparing a CSS screenshot alone is insufficient.
- Responsive recomposition may adjust rendered placement geometry, **not silently mutate user decoration choices**.
- Finishing S05 disallows later decoration writes unless a separately approved edit/revisit flow is added.
- `wishExtinguished` represents committed user interaction (not smoke ending); may be true only once in a wish cycle.
- Candle glow, audio and smoke can fail or be skipped without blocking advancement after valid extinguish.
- Replay returns cake to approved initial defaults; do not persist intimate gifts or input history to third-party systems.

### 8.3 P3 exit gate

Unit tests for invalid drop, collision/slot allocation, undo/remove/reset and single finish commit; snapshots/serialization equality from S05 to S06; browser tests by touch, mouse and keyboard; drag-cancel, rapid double taps, mute and no-mic tests; visual screenshot of short-phone tray and cake-stage visibility. AT-06/AT-07 and G05/G06 pass with evidence. P1 guards and P2 visual tests remain green after integration.

---

## 9. P4 — OPTIONAL HIDDEN WORLD AND THE TRUE-3D VAULT

**Scope:** S08 two-stage Quiet Second Invitation integration, **S09–S12**, PIN/keypad, GLB, mechanical door choreography, paper-letter handoff, reduced-motion and no-WebGL path. This is the highest-risk production phase; split it into independent, testable batches.

### 9.1 P4-A — portal and controlled environment shift

- Finish S08's quiet affordance and explicit **arm → commit** guard. The main birthday ending remains complete independently.
- Implement S09 *Pull Beyond the Surface* with normal Pointer Events, safe snapping-back below threshold, focus/blur cancellation, accessible non-drag equivalent; **ordinary scroll never triggers entry**.
- One principal `transition.T4` immersive zoom is reserved for the intentional S08→S09 handoff; reduced motion uses simple safe spatial/fade replacement. Actual direction, distance and threshold remain PENDING measurement.
- Preserve visual family continuity: warm editorial motif → mechanical segmented Offset Loop; Deep Plum/Warm Graphite become dominant **without** cyberpunk/horror/fake game UI.
- Implement staged asset preloading and a visible/recoverable readiness path for next scene; no Vault GLB load blocking S01–S02.

### 9.2 P4-B — primary Vault art asset and mechanical rig

- Production model from **externally authored `.glb`**; build separated body, rotating `Door_Pivot`/hinge and Door Mesh, moving lock core/segmented mechanism, interior and paper letter prop. Exact bone/mesh names remain authoring choices; functional rig capability is mandatory.
- Use Three.js/R3F/Drei with appropriate low-cost materials and lighting: matte Warm Graphite structural body, restrained satin movement surfaces, Deep Plum chamber, soft warm highlights.
- INTRO: short cinematic camera dolly shows dimensionality; STOP before PIN is interactive; do not move camera during input.
- PIN: integrated-looking **semantic DOM keypad** independent of 3D mesh hit tests. Correct `011007` is a narrative check, **not** authentication. Wrong PIN responds quietly in approved Indonesian copy, clears/permits retry and never starts animation.
- OPEN: after validated PIN, coordinated `LockRelease → SegmentedMechanism → HingedDoorRotation → StableOpenPose → LetterVisible`. In the **capable primary 3D path**, the hinge rotates physically via rig pivot; **never** fake opening by swapping a closed and open object or toggling visibility.
- The user's earlier approved motion intention targets a visually legible sequence around a couple of seconds, but **no exact duration is LOCKED**; calibrate P4/P5 with UX/performance evidence. No forced multi-second waiting beyond purposeful choreography and safe fast-forward capability.
- Letter remains a **physical folded Keepsake Paper object** in the chamber, visible but unopened. Do not show confession after PIN or just when the door opens.

### 9.3 P4-C — letter selection and reading continuity

- S10→S11 requires stable `letterVisible` state, not `PIN_ACCEPTED` alone.
- S11 may wait as long as the user chooses with paper visible. Provide a large enough DOM-accessible letter selection target; 3D raycast may enhance pointer interaction but must not be the sole route.
- Explicit tap/click/keyboard **Open Letter** action commits `letterSelected` and starts physical-to-editorial handoff; the paper becomes a legible, calm Newsreader reading surface in S12.
- S12 confession remains user-paced, does not ask for Yes/No, send an answer, open a messaging app, or force response. Provide close/end/replay without browser-close false promise.
- Do not add portrait galleries or surprise extraneous content to the hidden layer; copy must be owner-approved.

### 9.4 P4-D — performance and recovery paths

| Capability case | Implementation plan | Must remain functional |
|---|---|---|
| Full 3D | GLB/PBR, restrained S3 lighting, genuine hinge, coordinated camera/sound | PIN, open animation, letter selection |
| Limited GPU | Reduce realtime lights/shadows and other expensive effects first; lower render activity, if needed simplify geometry/textures | Same narrative semantics; still 3D where viable |
| No WebGL / GLB fails | 2.5D Vault with visible door movement; then functional DOM fallback | PIN, open equivalent, selectable letter, S12 |
| Reduced motion | Stable framing, safe shortened mechanical settle / non-spatial state representation | No inaccessible wait or forced camera travel |
| Context loss during open | Abort old render transaction; settle or recover safe open/closed semantic pose; fallback if needed | No duplicate unlock or auto-letter-open |
| No sound/haptic | Silent operation | All functionality and feedback |

**Do not equate fallback with removing core experience.** A lower tier can be visually simpler, but must retain intentional interaction and a convincing state transition. For the main capable path, the articulated GLB door is an acceptance requirement, not an enhancement.

### 9.5 P4 exit gate

- AT-09..AT-14 and relevant G08–G12 pass, including accessible entry without pointer dragging.
- E2E wrong PIN → retry → `011007` → release → door actually opens → letter visible → **wait without confession** → Open Letter → S12.
- **Recorded proof of a real GLB hinge/pivot animation in the capable 3D path**, preferably screen recording plus object hierarchy inspection/animation assertions; a single “open Vault” screenshot cannot establish physical door movement.
- Browser reproduction of lite and no-WebGL fallback; proof of reduced-motion/keyboard navigation and explicit consent; no blocked S01 initial load due to GLB.
- All modules clean up on interruption; no orphan camera/audio timeline or stale scene commit.

**If the final external GLB is unavailable:** document the P4 blocker. A temporary procedural rig may prove contracts during development, but **cannot be called the final approved Vault asset or pass final model quality sign-off**.

---

## 10. P5 — MOTION, AUDIO, PERFORMANCE AND CRAFT POLISH

This phase makes an already-operable story feel *crafted*. Do not use motion to conceal broken layout, unavailable assets or missing state contracts.

### 10.1 Workstream

- Calibrate `motion.M0–M5` and `transition.T1–T4` per approved Motion and Scene Art Direction; use GSAP for scene/mask/camera/lock choreography and Motion for local UI; where both are needed, divide nested element ownership.
- Preserve one primary T4 handoff (S08→S09 after positive intent); avoid repeated immersive zoom or excess parallax.
- Calibrate startup waiting, UI feedback, cake settle, candle response, vault release/hinge timing, letter handoff and reduced-motion equivalents using observed usability.
- Apply T0 clean reading surfaces, T1 selective microtexture, T2 local tactile detail, S0–S3 shadow policy, and graphic hierarchy; prevent low contrast, decorative spam, typography-over-face/controls and the generic centered-card look.
- Add Howler.js after legitimate invitation interaction; global mute available and maintained across scenes; synchronize SFX with **semantic state events** and transition lifecycle, never with timers that can fire after cancellation.
- Apply lazy loading, optimized Next/Image variants, font subsets as licensed/compatible, optimized GLB and textures, measured tier downgrade, and proper GPU resource disposal.
- Use optional mic/haptic only if verified worthwhile and explicitly permissioned; failure always leaves touch/keyboard completion intact.
- Re-run visual comparisons on phone short/tall and desktop; fix key accessibility and focus issues before polishing secondary SVG/motion.

### 10.2 Evidence and exit gate

Before/after viewport recordings and screenshot comparison; automated checks for engine ownership/repeated interactions; actual device/browser performance traces and optimization log; audio lifecycle/mute tests; reduced-motion path recordings; font loading/contrast checks; no new unapproved palette or dependency. P0 requirements and P1 critical UX continue to pass. **Report measured values without claiming universal performance from a single device.**

---

## 11. P6 — END-TO-END QA, PERSONAL CONTENT APPROVAL AND RELEASE READINESS

**Goal:** demonstrate correctness across journeys and supported conditions, then obtain owner approval for the gift release. **A runnable prototype is not equivalent to an approved personalized release.**

### 11.1 Tasks

- Supply and review confirmed recipient display name, approved real portrait(s), true memories, birthday letter, S08 closing text, hidden clue, confession, final interface language, sound rights if used, and final hosting/share URL. No fabricated personal data or implied memories.
- Validate single birthday closure at S08 without hidden content; independently test voluntary Hidden World path and every required action.
- Run complete PRD AT-01..AT-18 with selected supported devices/browsers and capability tiers; execute twelve G01–G12 gates and additional A01–A12 regression audits.
- Accessibility review: touch/mouse/keyboard, focus ordering/trapping, hit areas, high text zoom, reduced motion, no-mic/no-WebGL, reading scroll contained and discoverable non-drag portal.
- Verify photo origin/cropping/no sensitive EXIF, display rights, font/music/model licenses, social preview metadata, direct unlisted URL without login, no privacy/security overclaim.
- Check deployment build and caching/asset URLs do not imply confidentiality. Unlisted/noindex is not a security mechanism; if genuine access restriction is required, stop and seek new product approval.
- Inspect source/network for unapproved analytics, answer collection, leaked personal information, insecure third-party requests or test fixtures in release output.
- Run final regression after integrating personalized content, not only on placeholder fixtures.

### 11.2 P6 exit gate / release blockers

**RELEASE BLOCKED** if: any PRD Priority P0 fails; any G01–G12 fails; capable Vault uses static door swapping; S05→S06 cake data diverges; hidden confession opens without separate letter action; birthday closure cannot finish without hidden; core user lacks keyboard/non-drag/reduced-motion/no-WebGL path; a personal fact/photo is unverified; placeholder remains in release; or a LOCKED rule is silently violated.

P1 requirements require tracked quality review; unresolved P1 deviation must be explicitly approved with mitigation/owner decision before gift release. P2 enhancements are optional and cannot become dependency gates. Confirm actual device/browser support matrix and production metrics before promising them.

### 11.3 Two separate end states

- **PROTOTYPE FUNCTIONALLY READY:** critical journeys work with clearly marked stand-in assets, tests and evidence; any pending personal content/release approval remains blocked.
- **GIFT RELEASE APPROVED:** all required tests pass with real, verified content/rights and deployment/privacy reviewed; creator has explicitly signed off final build and link.

---
## 12. QUALITY ENGINEERING — TESTS AND VERIFIABLE EVIDENCE

### 12.1 Required gate status vocabulary

- **PASS:** test actually executed on identified build/device and observed result meets expected criterion; evidence attached.
- **FAIL:** executed and requirement not met; log defect and affected milestone.
- **BLOCKED:** prerequisite absent (e.g. production GLB not delivered, personal copy not approved, test device unavailable); name blocker, owner and next action.
- **NOT RUN:** test was not executed; cannot count as PASS. A build log cannot substitute for browser interaction/visual inspection.

Record test stage separately from source design status: a LOCKED specification is **not** proof of implemented behavior.

### 12.2 Mandatory technical evidence classes

| Class | Procedure | Minimum recorded proof | Pass criteria |
|---|---|---|---|
| Typecheck | Run project TypeScript check (`tsc --noEmit` or approved equivalent) | Command, stdout/stderr, exit code, build revision | Exit code 0; no unresolved TS errors |
| Lint | Run configured lint command | Tool/version, command, output, warnings count, exit code | Exit 0; warnings inventoried/justified, no blocking lint failure |
| Production build | `next build` through defined script | Log, resulting output, exit code, environment | Exit 0; app can start in production-like mode |
| Unit | Unit runner on guards, reducers, cake/portal/PIN and replay | Test summary, pass/fail/skip, coverage for critical modules, artifact path | Required behavioral assertions pass; skipped critical cases block |
| Browser E2E | Actual browser automation (Playwright recommended), not mock-only | Browser name/version, viewport, trace/screenshots/video, report | Required flows + negative edges pass under defined fixture |
| Visual review | Capture actual rendered phone/desktop screenshots and compare against approved D11/Design System | Before/after images, reviewer observations, unresolved difference list | Hierarchy, crop, palette, material and responsive behavior conform; owner acknowledges pending pixels |
| Accessibility | Keyboard-only and non-drag journeys, focus, zoom, reduced motion, mute, supported screen reader review where available | Test notes/video, focus sequence, failure reproduction | Every mandatory interaction reachable; no inaccessible dead end |
| Lifecycle/recovery | Tab blur, interruption, rapid taps, asset/network errors, fallback and replay | Logs, trace or recording; comparison expected/observed | No incorrect state, duplicate actions, ghost effects, endless loader |
| 3D mechanical inspection | Capable browser with actual GLB, inspect door rig and observe opening timeline | GLB hierarchy/pivot proof + screen recording frames showing continuous door rotation | Lock releases then **physical hinge rotation**, not swap/visibility toggle |
| Privacy/content review | Inspect outgoing requests, metadata/assets, approved content manifest | Review record, content approvals, network summary | No unapproved collection, fabricated personal data or misleading access protection claim |

The test suite may choose implementation-specific filenames and CI services at P0. Do **not** mark a class as passed when its runner was only installed. For automation, preserve raw artifacts and readable summarized verdicts. For visual and human review, a screenshot without an observation/decision is incomplete evidence.

### 12.3 Recommended scripts (configure and verify at P0)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "lint": "<approved linter command>",
    "test:unit": "<approved unit runner command>",
    "test:e2e": "<approved browser runner command>"
  }
}
```

**Template only.** Placeholder commands in angle brackets **must be replaced by real commands at P0**; do not commit a package manifest containing fake executable scripts or claim these commands ran as part of creating this document. Prefer command exit codes captured by CI or the actual execution shell; a manually typed “PASS” is not proof.

### 12.4 Evidence archive layout (proposed)

```text
reports/
  milestones/
    P0-foundation.md
    P1-runtime.md
    P2-editorial.md
    P3-cake.md
    P4-vault.md
    P5-polish.md
    P6-release.md
  qa/
    gates/G01.md ... G12.md
    acceptance/AT-01.md ... AT-18.md
    regression/A01.md ... A12.md
  logs/
    typecheck/ lint/ build/ unit/ e2e/
  screenshots/
    phone-short/ phone-tall/ desktop/
  recordings/
    cake/ hidden-portal/ vault-primary-hinge/ vault-fallback/
  traces/
  metrics/
  defects/
```

Paths are suggestions; actual files should be produced by real execution and retained with revision labels. Avoid recording actual intimate confession content in publicly distributed QA artifacts; use neutral fixtures or access-controlled review materials where needed.

### 12.5 Milestone evidence report—mandatory fields

```md
# Phase P<phase> Evidence Report
Build revision / commit:
Date and test executor:
Environment / browser / device / viewport / capability tier:
Applicable PRD requirements and canonical gates:
Changes delivered (paths/modules):

| Check | Exact command / manual scenario | Expected | Observed | Status | Artifact |
|---|---|---|---|---|---|
| Typecheck | ... | exit 0 | ... | NOT RUN | ... |
| Lint | ... | exit 0 | ... | NOT RUN | ... |
| Build | ... | exit 0 | ... | NOT RUN | ... |
| Unit | ... | guards pass | ... | NOT RUN | ... |
| E2E | ... | journey completes | ... | NOT RUN | ... |
| Visual | ... | source fidelity | ... | NOT RUN | ... |

Defects (severity, reproduction, owner):
PENDING / BLOCKED items:
LOCKED-source deviation requests (if any):
Performance notes and measured evidence:
Decision: PASS / FAIL / BLOCKED / NOT RUN
Owner approval / reviewer:
Next phase entry conditions:
```

The report should be generated/updated **after actual tests**, not prepopulated with optimistic PASSED labels. When a test is not applicable, record its justification and preserve accountability for the relevant later phase.

---

## 13. TRACEABILITY — ALL 12 CANONICAL SCENE GATES

The names G01–G12 and their must-pass meaning originate in `DESIGN_SYSTEM.md` §18 and D11. The implementation plan does not redefine those gates.

| Gate | Main implementation phase | Linked PRD | Required observable evidence |
|---|---|---|---|
| **G01** Prelude/loading | P1/P2; P6 regression | `PRD-S01-01`, `PRD-G04` | Slow/fast load; no bogus %, no endless loader; retry recording |
| **G02** Invitation | P1/P2; P6 | `PRD-S02-01`, `PRD-G10` | Open by keyboard/touch; audio only post gesture, silent route |
| **G03** Birthday Reveal | P2; P6 | `PRD-S03-01` | Verified long-name fixture, compact viewport, reduced-motion screenshot |
| **G04** Portrait | P2; P6 | `PRD-S04-01/02` | 1/2/4/6 fixture screens, face-safe crop, no gallery/empty slot |
| **G05** Cake Studio | P3; P6 | `PRD-S05-01..05` | Five-family interaction, keyboard, invalid zone, undo/remove/reset, no duplicates |
| **G06** Wish | P3; P6 | `PRD-S06-01..04` | Config snapshot parity, no-mic extinguish, one semantic completion |
| **G07** Birthday Letter | P2; P6 | `PRD-S07-01/02` | Longform zoom/keyboard reading without forced scroll/advance |
| **G08** Birthday Ending | P1/P2; P6 | `PRD-S08-01..03`, `PRD-G02/03` | S08 can truly End/Replay; waiting does not open hidden |
| **G09** Hidden Transition | P1/P4; P6 | `PRD-S09-01/02` | Armed vs committed proof; cancel/scroll/keyboard/reduced-motion tests |
| **G10** Vault | P1/P4; P6 | `PRD-S10-01..04` | Wrong/correct PIN; **GLB physical door hinge recording**; no-WebGL equivalence |
| **G11** Hidden Letter | P1/P4; P6 | `PRD-S11-01/02` | Hold letter-visible state; deliberate Open Letter separately; fallback |
| **G12** Confession | P1/P4; P6 | `PRD-S12-01..03` | Full readable letter, no reply demand, safe end/replay |

**Go/no-go rule:** A later phase may use a *temporary neutral fixture* for a scene it does not yet own, but P6 **must not** carry any unimplemented mandatory G01–G12 interaction or unreviewed personal content into the release build.

### 13.1 Additional A01–A12 cross-system regression gates

| Gate | Source requirement | Principal proof |
|---|---|---|
| A01 | Ten exact LOCKED palette hexes and suitable functional text contrast | Token registry audit + rendered contrast samples |
| A02 | Bricolage/Newsreader/Shantell roles, no unapproved fourth font | Computed font/render review and font file audit |
| A03 | Offset Loop recognizability and deliberate interruption, sparse placement | SVG snapshots warm-to-mechanical; no reading overload |
| A04 | No excessive photo+paper grain or grain over text | Rendering screenshots at phone scale |
| A05 | Foreground doesn't cover face, cake actions, PIN or reading/focus | Overlay/occlusion screenshots and hit-target tests |
| A06 | GSAP/Motion property ownership and cleanup | Component ownership map + lifecycle tests |
| A07 | Asset economy, no Vault GLB in initial critical load | Network waterfall + bundler/load evidence |
| A08 | Cake, wish, replay, portal/Vault store integrity | Guard/reducer tests and replay E2E |
| A09 | Privacy expectations, EXIF, unapproved images, PIN not security | Asset/deployment audit |
| A10 | Birthday S08 standalone; confession voluntary, no reply | Birthday-only and Hidden E2E + content review |
| A11 | Every personal name/fact/clue/caption vetted | Content manifest with owner approval |
| A12 | No animation/audio callback manufactures transition permission | Negative event/abort tests |

### 13.2 Global PRD-G01–G16 requirements—phase allocation

Global PRD IDs are **distinct from** scene gates `G01–G12`; preserve both sets in milestone evidence.

| Product requirement | Owning implementation phase(s) | Evidence destination |
|---|---|---|
| PRD-G01 — twelve scene runtime | P1, P6 | Scene-graph unit tests, end-to-end narrative trace |
| PRD-G02 — birthday complete at S08 | P1/P2, P6 | Birthday-only E2E |
| PRD-G03 — voluntary hidden and letter | P1/P4, P6 | Negative arm/gesture/PIN/letter tests |
| PRD-G04 — honest asset readiness | P1/P2, P6 | Fast/slow network and failure trace |
| PRD-G05 — one authoritative state | P1/P3/P4, P6 | Reducer, parity, replay tests |
| PRD-G06 — all required input modes | All implementation phases, P6 | Keyboard/touch/mouse journey evidence |
| PRD-G07 — reduced motion and fallback | P1/P4/P5, P6 | Forced accessibility/capability route |
| PRD-G08 — approved genuine content | P0 schema, P6 release | Signed content provenance register |
| PRD-G09 — no romantic-answer tracking | P0 policy, P6 | UI/source/network review |
| PRD-G10 — mute and silence | P1/P5, P6 | Autoplay denial + mute E2E |
| PRD-G11 — guard/interrupt/single commit | P1 and regressions | State/transition stress assertions |
| PRD-G12 — unlisted no-login entry | P0/P6 | Incognito deployment check + risk acknowledgement |
| PRD-G13 — visual fidelity | P2/P3/P4/P5/P6 | Source-to-render review and screenshots |
| PRD-G14 — semantic audio sync | P5/P6 | Interrupted/skipped scene audio test |
| PRD-G15 — replay reset | P1/P3/P4/P6 | Canonical reset unit and E2E tests |
| PRD-G16 — controls and focus | P1/P2/P3/P4/P6 | Focus order, visible focus and hit-target QA |

### 13.3 PRD NFR-01–NFR-14 coverage

| NFR | Owner | Verification emphasis |
|---|---|---|
| NFR-01 / mobile reflow | P2/P3/P4/P6 | Compact 320px-class + short-height stage/pin/reading checks |
| NFR-02 / keyboard and focus | P1–P6 | Full keyboard-only story and alternate controls |
| NFR-03 / reduced motion | P1/P4/P5/P6 | All intents preserved with simplified choreography |
| NFR-04 / silent and mic refusal | P1/P3/P5/P6 | Mute, denied autoplay, denied mic |
| NFR-05 / no WebGL or context loss | P1/P4/P6 | PIN to letter to confession through DOM/2.5D |
| NFR-06 / readable text | P2/P4/P6 | Zoom, local scroll, semantic focus |
| NFR-07 / no fixed emotional wait | P1/P3/P4/P6 | Pause at wish, S07, S08, S11, S12 indefinitely |
| NFR-08 / unlisted not secure | P0/P6 | Metadata/asset/public-URL privacy review |
| NFR-09 / AA ambition and alt | P2/P5/P6 | Accessibility and contrast audit, exceptions recorded |
| NFR-10 / mobile smoothness | P4/P5/P6 | Actual device profiling; thresholds still pending |
| NFR-11 / delayed heavy assets | P0/P4/P5/P6 | Network waterfall showing Vault deferred |
| NFR-12 / motion ownership | P1/P5/P6 | Distinct DOM owners, one primary T4, cleanup tests |
| NFR-13 / missing asset recovery | P1/P2/P4/P6 | Forced image/font/audio/SVG/GLB failure fixtures |
| NFR-14 / evergreen browsers | P0/P6 | Supported browser matrix approved and executed |

---

## 14. PRODUCT ACCEPTANCE SCENARIOS — PRD AT-01 THROUGH AT-18

These IDs and semantics must remain traceable to `PRD.md` §8. Do not shrink the plan to only the “happy path”.

| AT | Scenario | Primary phase where exercised | Expected behavior / artifact |
|---|---|---|---|
| AT-01 | Open unlisted URL in fresh private session | P0/P6 | No login; S01 ready; deployment review |
| AT-02 | Slow/fast network + noncritical asset delay | P1/P2/P6 | No fake wait/dead end; network trace |
| AT-03 | No pregesture autoplay; Open via keyboard | P1/P2/P6 | Audio gated, valid scene advancement |
| AT-04 | Long confirmed name at narrow viewport/reduced motion | P2/P6 | Birthday typography remains legible |
| AT-05 | 1/2/4/6 photo manifests with distinct proportions | P2/P6 | Stable hero, authentic crop, no fake gallery |
| AT-06 | Cake five families, drag cancel, undo/reset, input modalities | P3/P6 | Coherent placement and state |
| AT-07 | Finish S05 → S06; mic/audio disabled | P3/P6 | Same cake, one touch/hold extinguish |
| AT-08 | Idle on long S07 letter | P2/P6 | No auto-advance; readable to end |
| AT-09 | S08 wait then End/Replay | P1/P2/P6 | Birthday complete, no coerced hidden |
| AT-10 | Arm/cancel/scroll/keyboard hidden portal | P1/P4/P6 | No accidental commit, single intentional entry |
| AT-11 | Vault wrong PIN then `011007`, WebGL capable | P4/P6 | Real segmented release and hinged door |
| AT-12 | WebGL disabled/GLB fails/reduced motion | P4/P6 | Equivalent narrative open/letter access |
| AT-13 | Wait S11 unopened; then explicitly select by keyboard | P1/P4/P6 | Confession hidden until selection |
| AT-14 | S12 silent, reading and close/replay | P4/P6 | No forced romantic answer |
| AT-15 | Full replay after Hidden World | P1/P4/P6 | Cake/wish/portal/PIN/letter reset |
| AT-16 | Deployment metadata and asset exposure | P0/P6 | No auth illusion / unapproved indexing exposure |
| AT-17 | Keyboard + text zoom + reduced motion + mute | P1/P6 | Mandatory interactions remain accessible |
| AT-18 | Source/UI integrity against Design System | Every phase/P6 | No unauthorized palette/stack/scene changes |

**AT-11 must be observed on a genuinely capable full-3D route**; an abstract mock or frame swap can validate P1 state contracts but cannot satisfy final AT-11. **AT-12 must truly exercise fallback or simulate its specific capability failure in browser with visible behavior**, not merely add a conditional branch to code.

---

## 15. DEVICE, BROWSER, RESPONSIVE AND PERFORMANCE QA

### 15.1 Test fixtures (selection to be frozen at P0/P6)

- **Viewport:** short phone, tall phone, tablet-like, desktop; portrait and supported landscape/orientation change.
- **Input:** touch, mouse, keyboard only; non-drag alternatives and focus visibility.
- **Motion and audio:** `prefers-reduced-motion`, sound muted/unavailable, browser blocks autoplay; return after tab visibility change.
- **Capability:** true 3D, lower GPU tier, WebGL unavailable, GLB failed or context loss, slow network.
- **Data:** 1/2/4/6 photos; low-quality photo; long name; long letter; intentionally missing media; empty optional assets.
- **Interaction stress:** rapid repeated tap, interrupted drag, wrong PIN, repeated correct PIN, immediate replay, long idle, reload under various loading states.

Actual supported browser/device models, minimum viewport and performance thresholds are **PENDING PROTOTYPE** until testing fixtures are selected. Do not invent unmeasured 60 FPS coverage, loading-budget guarantees or WCAG certification. Basic semantic accessibility and completion requirements remain mandatory even before formal scoring.

### 15.2 Visual-review rubric

For each key scene screenshot/review check: dominant focal subject; typography hierarchy; real negative space vs dead space; warm/hidden palette and contrast; Phosphor vs decorative SVG separation; Offset Loop sparse correct grammar; paper/cake/Vault material fidelity; correct shadow plane S0–S3; no face occlusion; mobile-safe CTA/tray/PIN; reading legibility; editorial composition rather than centered SaaS card; entry/settle/end composition; reduced-motion still frames; consistency with neighboring scene.

P2/P5/P6 reports should contain a **difference log** rather than declaring subjective “looks premium.” If the output violates a LOCKED system, record defect/source section and repair it. If complying would require changing approved direction, request a deviation approval instead.

### 15.3 Performance policy

- Profile actual JS, images, fonts, SVG, GLB, GPU and memory on chosen browsers; report metrics with device and build context. Budgets are not fixed by this document.
- Load early scenes first; defer Vault GLB until later; no six-photo upfront preload or mandatory large audio.
- Reduce nonessential shader/lighting/shadows and ambient animation *before* removing interaction feedback; lower-power tier retains event semantics.
- Use real device traces/long tasks and memory observations for optimisation choices. Make measurable before/after comparisons.
- Clean up timelines, observers, pointer captures, audio and GPU buffers on exit; do not rely on a one-time successful demo.

---
## 16. PROPOSED REPOSITORY STRUCTURE AND MODULE OWNERSHIP

Do not turn the folder proposal into a new dependency or architectural mandate. Ownership, testability and separation matter more than folder names.

```text
theLast/
├── docs/
│   ├── PRD.md
│   ├── DESIGN_SYSTEM.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── SOURCES/                       # 14 LOCKED foundation/fragment files
│   ├── source-inventory.md
│   ├── STACK_AUDIT.md
│   ├── DECISION_LOG.md
│   └── PENDING_REGISTER.md
├── font/                              # downloaded originals; verify before deploy
├── public/
│   └── assets/
│       ├── images/                    # curated, rights-reviewed, responsive exports
│       ├── svg/                       # signature and editorial graphics
│       ├── audio/                     # optional music and cues
│       ├── models/                    # authored optimized .glb and fallback art
│       └── textures/                  # only if justified and optimized
├── src/
│   ├── app/                            # Next.js entry/shell + metadata
│   ├── scenes/
│   │   ├── S01Prelude/
│   │   ├── S02Invitation/
│   │   ├── S03BirthdayReveal/
│   │   ├── S04Portrait/
│   │   ├── S05CakeStudio/
│   │   ├── S06MakeAWish/
│   │   ├── S07BirthdayLetter/
│   │   ├── S08BirthdayFinale/
│   │   ├── S09HiddenTransition/
│   │   ├── S10Vault/
│   │   ├── S11HiddenLetter/
│   │   └── S12Confession/
│   ├── engine/
│   │   ├── SceneManager/
│   │   ├── TransitionEngine/
│   │   ├── GestureManager/
│   │   ├── AssetManager/
│   │   ├── AudioManager/
│   │   └── CapabilityManager/
│   ├── components/
│   │   ├── editorial/
│   │   ├── controls/
│   │   ├── cake/
│   │   └── vault/
│   ├── store/                          # scene, cake, hidden, vault, settings slices
│   ├── design/                         # approved tokens, no new theme
│   ├── content/                        # typed, reviewed personal-content schema
│   ├── hooks/
│   ├── lib/
│   └── types/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── fixtures/
│   └── visual/
├── reports/                            # actual milestone/test artifacts
├── package.json
└── [lockfile + build/test configs]
```

### 16.1 Ownership table

| Domain | Sole authoritative owner | Dependent consumers |
|---|---|---|
| Scene identity / commit | SceneManager + ExperienceStore | All scenes and transitions |
| Visual scene enter/exit | TransitionEngine / GSAP-scoped contexts | Scenes, animated objects |
| Local UI micro animation | Motion within its owned DOM nodes | Buttons, trays, controls |
| Cake configuration / valid placements | Cake domain in Zustand | S05 renderer, S06 Wish |
| Wish semantic extinguish | Wish domain | Candles, environment/audio cues |
| Hidden portal arm/commit | Hidden domain and gesture adapter | S08/S09 |
| PIN and Vault open state | Vault domain (DOM validator) | GLB animator, S11 permission |
| Letter selection / confession grant | Distinct letter intent event guard | S11/S12 |
| Adaptive tier / reduced motion | CapabilityManager | 2D, 3D, motion and asset adapters |
| Optional audio / mute | AudioManager + settings state | All cue requests |
| Genuine content records | Approved content configuration | Portrait, birthday/hidden copy |

### 16.2 Engineering rules

- Cross-scene components receive domain state and events; they do not infer permission by querying DOM transforms, canvas mesh visibility or animation frame position.
- A GSAP-owned element must not concurrently have Motion animate the same transform/opacity. Split wrapper and child ownership as necessary.
- A fallback renderer reads the **same authoritative state** and emits equivalent semantic events, not a separate narrative script.
- Durable content configuration stays separate from UI composition; placeholder fixture use must be explicit and easy to disable for gift release.
- Where skeleton/fixtures need to bypass actual physical interaction for *tests*, use a dedicated clearly labelled test adapter and preserve production guards. Do not ship an unnoticed `debugSkipToConfession` action.

---

## 17. IMPLEMENTATION BATCHES — SMALL, REVIEWABLE AI CODING TASKS

Each batch should have one owner, concrete PRD acceptance IDs, a narrowly scoped file change, a test harness and a report. This is a **recommended working breakdown**, not a deadline promise.

| Batch | Parent phase | Purpose | Completion proof |
|---|---|---|---|
| **B00** | P0 | Verify docs, source hash, stack policy, font assets, content registry | Source audit + stack report |
| **B01** | P0 | Bootstrap shell, style token seed, test harness | Typecheck/lint/build + browser smoke |
| **B02** | P1 | Canonical SceneManager/TransitionEngine and typed graph | Legal/illegal edge unit tests |
| **B03** | P1 | Zustand domains, replay, asynchronous abort/reconciliation | State/interrupt tests |
| **B04** | P1 | Hidden two-stage intent and accessible gesture adapter | Passive/cancel/commit E2E |
| **B05** | P1 | Cake/Wish/Vault semantic contracts with temporary adapters | End-to-end neutral skeleton, no logic TODO |
| **B06** | P2 | Design tokens, fonts, icons/SVG and responsive planes | UI snapshot/computed-style audit |
| **B07** | P2 | S01–S03 Prelude/Invitation/Birthday reveal | Keyboard, audio, name tests |
| **B08** | P2 | S04 adaptive portrait; S07 reading; S08 ending | 1/2/4/6 photo, long text, closure |
| **B09** | P3 | Cake geometry/config model, placement/undo logic | Pure placement/rollback tests |
| **B10** | P3 | S05 Cake Studio and accessible controls | Input/short-phone browser tests |
| **B11** | P3 | S06 persistent cake, candles, touch extinguish | Equality + no-mic/duplicate tests |
| **B12** | P4 | S08/S09 discovery and committed spatial handoff | Gesture + accessible alternative tests |
| **B13** | P4 | External GLB rig + DOM PIN + real hinged opening | GLB animation proof, PIN tests |
| **B14** | P4 | S11 paper and S12 reading; lite/DOM fallbacks | Consent/fallback E2E |
| **B15** | P5 | Motion/visual/audio/performance craft pass | Before/after evidence, fallback retest |
| **B16** | P6 | Full regression, content audit, rights, deployment | AT-01..18, G01..12, release sign-off |

Do not close a batch if its tests have not run or if it silently changes already delivered guard behavior. B13 can be split into separate GLB modeling and browser integration tasks if asset-production time demands it, but the P4 exit gate is unchanged.

### 17.1 Standard coding handoff for each batch

```md
TASK: Implement Batch B## only, using docs/PRD.md + docs/DESIGN_SYSTEM.md
+ docs/IMPLEMENTATION_PLAN.md; consult the owning LOCKED SOURCE docs.

MUST READ: PRD requirement IDs and phase exit gate.
MUST PRESERVE: canonical scenes, no new stack, birthday-first consent,
S05/S06 cake continuity, real Vault hinge, explicit letter opening.

BEFORE EDITING:
1. Report what already exists and what the batch actually needs.
2. List affected files/modules, dependency changes, and PENDING inputs.
3. Raise contradictions requiring approval; do not improvise baseline changes.

IMPLEMENT:
- One bounded functionality slice.
- Semantic accessible controls and error/fallback behavior.
- Typed state/events and cleanup.
- Honest neutral fixture for missing personal content only.

VERIFY:
- Run actual typecheck, lint, production build, relevant unit/E2E tests.
- Inspect in browser and attach screenshot/video when applicable.
- Map checks to PRD IDs / G gates and report PASS/FAIL/BLOCKED/NOT RUN.
- Summarize changed files, known issues, artifacts and next batch entry gate.

DO NOT CLAIM COMPLETION if any mandatory check has not run.
```

---

## 18. RISK REGISTER, OWNERS AND STOP CONDITIONS

| ID | Risk | Severity | Mitigation / verification | Stop condition |
|---|---|---|---|---|
| R-01 | Invalid hidden auto-reveal / unconsented confession | **Critical** | P1 two-stage guards + S11 explicit open negative tests | Any code path reaches S12 without explicit letter event |
| R-02 | Birthday ending feels incomplete without Vault | **Critical** | S08 independent completion and stop/replay E2E | S08 requires hidden to finish |
| R-03 | “3D opening” faked by static swap | **Critical** | Rigged GLB, pivot motion capture and visual QA | Capable path lacks real articulated door |
| R-04 | Cake config drifts S05→S06 | **Critical** | One store and structural equality test | Renderer rebuilds default cake |
| R-05 | Source documents drift or wrong fragments versioned | High | Checksum inventory, precedence, deviation log | Cannot reconcile F01–D11 |
| R-06 | Next/React/Three versions incompatible | High | P0 compatibility smoke build and 3D isolated test | Dependency swap without approval |
| R-07 | SVG cake looks flat/cheap or becomes too complex | High visual | Early DOM/SVG prototype and responsive checks | Necessitates unapproved full-WebGL cake |
| R-08 | Mobile tray hides placement/pin targets | High UX | Short phone hit-area/focus tests | Mandatory action unreachable |
| R-09 | Hidden portal too obscure or coercive | High narrative | Intentional discoverability review, two-stage keyboard route | Accidental or forced entry |
| R-10 | External GLB late or unoptimized | High delivery | Early authoring requirements, lazy asset budget/tier tests | P4 incorrectly claims final hinge gate with mock |
| R-11 | Audio auto-play or persists after leaving scene | High UX | Gesture-gated Howler, cancel on exit; silent run | Ghost sound or blocked progression |
| R-12 | Portraits, birthday facts or PIN clue invented | High content/ethical | Approval registry; no raw EXIF; human review | Release uses unapproved text/photo |
| R-13 | Poor contrast/readability for soft accents | High accessibility | Contrast and font/zoom review | Essential text unreadable |
| R-14 | Camera dolly makes keypad unusable | High interaction | Camera settle before PIN; accessible DOM hitboxes | Input shifts while pressing |
| R-15 | Reduced motion, GPU or WebGL fallback dead-end | **Critical** | Tier E2E, context-loss tests, fallback adapter | User cannot finish hidden path without WebGL |
| R-16 | Huge handoff task creates unreviewable code | Medium/high | B00–B16 and per-batch evidence | Batch lacks bounded scope/evidence |
| R-17 | Unlisted URL mistaken for true privacy | High expectation | Metadata review, owner disclosure, no security claims | Release promises authentication/confidentiality |
| R-18 | Third-party runtime packages added for convenience | Medium/high | Stack audit and dependency decision record | Unapproved rejected/optional library introduced |

**Risk owners:** implementer owns code, state and test evidence; 3D author owns model rig and export integrity; designer/reviewer owns design fidelity; creator/owner owns content truth, emotional boundaries and deployment approval. An AI may execute tasks but **cannot self-authorize a deviation** or claim owner sign-off.

---

## 19. CHANGE CONTROL — LOCKED, PENDING AND DEVIATION REQUESTS

### 19.1 Three classes of engineering decisions

**CLASS A — LOCKED:** Cannot be changed without explicit approval. Includes 12 scenes, birthday-first false ending, optional hidden discovery, PIN `011007`, physical 3D hinged door in capable path, five cake families, persistent cake, independent letter action, approved palette/type/graphic vocabulary, approved runtime stack and user-selected unlisted access.

**CLASS B — PENDING CALIBRATION:** Developer may propose and test variants inside approved boundaries (exact spacing, breakpoints, easing values, cake anchor coordinates, GLB lighting/material roughness, preload timing, quality tiers, UI copy where not approved). Record in Pending/Decision Log; do not re-label unreviewed proposals as LOCKED.

**CLASS C — IMPLEMENTATION DETAIL:** Internal file names, hooks, reducers, unit-test framework, build scripting and component refactors that do not alter approved behavior or introduce unapproved runtime dependencies. Record significant architecture/maintenance decisions.

### 19.2 Required deviation request template

```md
# Deviation Request DR-###
Date / owner:
Affected source file and section (LOCKED/PENDING):
Current rule (accurate excerpt/summary):
Technical or user-experience issue, with reproducible evidence:
Option 1 — preserve rule with revised implementation:
Option 2 — proposed exception and why needed:
Impact: narrative, user consent, accessibility, visual DNA, performance, stack, schedule:
Risk and fallback:
Recommendation:
Decision: PENDING OWNER APPROVAL / APPROVED / REJECTED
Approval date and resulting versioned artifact:
Required regression gates:
```

**No retroactive permission:** a chat agent's claim “this would look better” or a CI green build cannot override a locked decision. Escalate rather than silently redesigning Cake, adding routes, installing Anime.js, implementing mandatory mic, removing 3D hinge or making Hidden World compulsory.

### 19.3 Source versioning after approval

If a change is approved: amend the owning source and corresponding master/PRD only as needed, increment version with changelog, update source-inventory/decision log and retest all affected gates. Keep the original snapshot available for audit. Do **not** continuously edit all 14 sources for routine code refactors.

---

## 20. PENDING REGISTERS — ACTUAL UNRESOLVED INPUTS

### 20.1 Personal content (owner approval required for final gift)

| Ref | Item | Needed by |
|---|---|---|
| PC-01 | Confirmed recipient display name/spelling | Final S03 and release |
| PC-02 | Date/age and meaning of `011007` **only if referenced** | PIN hint/copy review |
| PC-03 | Curated actual 1–6 photos; baseline two; permissions, crop/focal point | Final S04 |
| PC-04 | Real friendship memories, relationship context and photo captions | S04/S07 editorial copy |
| PC-05 | Birthday letter and S08 closing | Final Birthday World |
| PC-06 | Hidden clue and calm, non-demanding confession | Hidden World final delivery |
| PC-07 | Complete final recipient-facing language and errors | Content QA |
| PC-08 | Licensed music/SFX if used | Audio release |
| PC-09 | Final HTTPS URL, deployment destination, distribution consent | Publication |

No AI should fabricate shared events or generate fake photographic memory when items are pending. A clearly labeled neutral content fixture permits development, but is a **release blocker** until approved real content replaces it.

### 20.2 Prototype/engineering calibration (must be measured)

| Ref | Item | Method / owner |
|---|---|---|
| PP-01 | Actual responsive breakpoints, safe areas and type sizes | P2 device/layout QA |
| PP-02 | Gesture threshold, scene timing/easing and safe skip | P1/P4/P5 usability |
| PP-03 | Portrait masks, crops and optimized output sizes | P2 real-photo test |
| PP-04 | Cake variants/counts, anchors, collision geometry | P3 interaction tests |
| PP-05 | Optional mic blowing implementation | Optional feature validation |
| PP-06 | External GLB geometry/pivots, materials, camera/letter position | P4 3D asset QA |
| PP-07 | Frame/GPU/load/memory budgets and quality tier triggers | P4/P5 measured profiling |
| PP-08 | Audio track/SFX selection and cue levels/timing | P5 content/UX approval |
| PP-09 | Actual reading lengths, local scroll treatment | P2/P6 content test |
| PP-10 | Hosting provider/domain/slug and deployment output mode | P0/P6 owner review |
| PP-11 | Supported browser/device fixture and benchmarks | P0/P6 QA planning |
| PP-12 | Replay mute persistence exact behavior (recommended persistent) | P1 owner/product review |
| PP-13 | Unit/E2E/lint tool choice and coverage goals | P0 dev-only tooling decision |
| PP-14 | Exact GLB model package/production rights and compression pipeline | P4 authoring/profiling |

This document does **not** fabricate performance claims, package-version numbers, font files, personal names, birth date, memory details or PIN backstory.

---

## 21. FINAL DEFINITION OF DONE AND SIGN-OFF

### 21.1 Phase exit checklist

- [ ] Source inventory and stack conform to approved baselines (P0).
- [ ] All twelve typed narrative states/events/guards and full replay are real/tested (P1).
- [ ] Editorial scenes, readings, true birthday closure and adaptive portraits are visually reviewed (P2).
- [ ] Cake Studio + same S06 cake + non-mic wish are fully functional (P3).
- [ ] S08/S09 portal intentional; capable 3D Vault animates its actual hinge; explicit paper selection and tiered fallbacks work (P4).
- [ ] GSAP/Motion ownership, asset economy, audio optionality, reduced motion and polish are tested (P5).
- [ ] All PRD Priority P0 and canonical G01–G12 gates PASS; A01–A12 regression and AT-01–AT-18 are executed with documented outcomes (P6).
- [ ] All actual tests have reproducible log/trace/screenshot/video evidence and defects are triaged.
- [ ] No unapproved source deviation, extra scene, fabricated media/facts, tracked romantic reply or runtime package is shipped.
- [ ] The creator approves personal content, final visuals, asset rights, privacy expectation and actual gift URL.

### 21.2 Acceptance decision format

| Outcome | Required condition | Release implication |
|---|---|---|
| **NOT READY** | Critical requirement or gate not implemented/tested | Cannot present as completed prototype |
| **PROTOTYPE READY WITH CONTENT BLOCKERS** | Core tested interactions pass using neutral approved fixtures; personal content pending | Internal demo only; not recipient gift |
| **GIFT RELEASE APPROVED** | All P0/G01–G12 PASS, final content/licensing/privacy reviewed, P1 exceptions approved, creator sign-off | Recipient-sharing allowed |

Any `NOT RUN`, `BLOCKED` or `FAIL` on release-blocking tests prevents **GIFT RELEASE APPROVED**. A screenshot, video or CI badge alone cannot replace required observed functionality.

### 21.3 Handoff message for next AI coding session

> You are implementing the Birthday Experience, **not redesigning it**. Read `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/IMPLEMENTATION_PLAN.md` and the fourteen LOCKED source Markdown files. Work on **one named batch** at a time, beginning with B00/P0. Verify the approved Tech Spec before installing application dependencies. Preserve the twelve-scene birthday-first story, S05→S06 CakeConfiguration, two-stage S08/S09 consent, PIN `011007`, independently animated real 3D Vault hinge in the capable path, physical folded letter requiring a separate explicit selection, and full reduced-motion/no-WebGL/non-mic alternatives. Treat PENDING content as pending. Run real tests and produce evidence; never call a gate PASS if not executed. Report any deviation and wait for approval before changing a LOCKED decision.

---

## 22. SOURCE TRACEABILITY AND DOCUMENT CLOSE

| Plan area | Primary existing authority |
|---|---|
| Story graph, S08 valid ending, PIN and explicit letter selection | Final Flow; PRD §§0,3–4 |
| Next.js/React/TS/Tailwind, GSAP/Motion, Zustand, R3F/Three/Drei, Howler, Pointer Events, fallbacks | Tech Spec §§2–4, 5–9, 14–26, 38–42 |
| Color/type/icon/SVG/shape/pattern/material/depth | Design System §§3–6; D01–D06 |
| Motion classes/transition ownership/interrupt policy | Design System §7; D07 |
| Photo availability/identity | Design System §8; D08 |
| Cake geometry, editing, persistence, touch wish | Design System §9; D09 |
| Vault external GLB, real door, paper handoff | Design System §10; D10 |
| Each scene, transition map and 6 final audit resolutions | Design System §§11–13; D11 |
| Runtime store/scene lifecycle, preload/capability | Design System §§14–15; Tech Spec |
| Acceptance G01–G12, A01–A12, cross-device matrix | Design System §18; D11 |
| Product AT-01–AT-18, functional requirement IDs, unlisted URL and owner scope | PRD §§2–11 |
| Source integrity and previously recovered D11 provenance | Design System §0; PRD §12 |
| Quality gate evidence / milestone implementation order / change control | **This plan**, derived from approved pre-lock audit |

**Final rule:** Build to the documented source of truth, prove behavior before cosmetic polish, and never confuse an approved design document with tested software. The desired deliverable is a polished **private interactive birthday experience** that remains emotionally complete without Hidden World, and only then allows an intentionally discovered, meaningful second layer.

**END — IMPLEMENTATION_PLAN.md v1.0 / APPROVED EXECUTION BASELINE**
