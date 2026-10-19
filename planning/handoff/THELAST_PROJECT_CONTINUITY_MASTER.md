# THE LAST — PROJECT CONTINUITY MASTER HANDOFF

**Repository:** `C:\Users\jakkob\Downloads\Mal this from Kob\theLast`  
**Prepared:** read-only continuity audit  
**Status:** `PROJECT HANDOFF PREPARED — READY FOR NEW CONVERSATION`

## 1. Executive project summary

theLast is a private, fullscreen, scene-based birthday keepsake titled **A Keepsake That Slowly Opens**. Its approved identity is **Warm Kinetic Editorial Keepsake** and its production art direction is **EDITORIAL_SURFACE_FIRST**. It is not a conventional landing page, dashboard, gallery, or public social product.

The primary birthday journey is S01→S08 and must be complete without requiring discovery of the hidden layer. S09→S12 is an optional, explicitly discovered Hidden World. Personal content, photography, confession text, and final release authorization remain separate governance gates. The repository contains implemented scene components and substantial focused evidence, but the complete experience is not release-ready.

Current high-confidence facts:

- All twelve scene component areas exist under `src/ui/s01/` through `src/ui/s12/`.
- Typed runtime, transition, replay, asset-authorization, evidence-packaging, and release-validator modules exist.
- The approved Vault candidate exists at `assets-final/vault/runtime/vault-final.glb` and currently hashes to `9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B`.
- S12 UI and neutral fixture reading behavior are implemented; final confession content remains `CONTENT_PENDING`.
- Focused evidence exists for every scene, with stronger visual refinement evidence for S09–S12 than for the Birthday World scenes.
- Full release remains `NOT_READY`; no owner approval should be inferred from implementation or focused tests.

## 2. Approved product identity and authority

The governing sources are the documents in `docs/`. The source hierarchy is domain-specific: Final Flow governs narrative order, consent, and hidden-path eligibility; Tech Spec governs runtime boundaries; PRD governs product requirements and acceptance; Design System consolidates visual contracts; fragments govern their approved disciplines; Implementation Plan governs phases and evidence gates; explicit owner decisions govern only their stated scope. No document universally overrides all others.

Locked product principles:

- Birthday remains the primary experience.
- Confession is optional, hidden, non-demanding, and only available after explicit discovery and letter-opening consent.
- The experience uses fullscreen scene composition and intentional controls rather than browser scrolling as navigation.
- Personal content must be owner-supplied or owner-approved; no invented memories, names, letters, or romantic copy.
- Reduced motion, keyboard access, non-drag alternatives, loading recovery, no-WebGL recovery, privacy, and replay are mandatory obligations.

The owner decision in `docs/OWNER_DECISIONS/FINAL_DESIGN_DIRECTION_LOCK.md` locks the editorial surface-first background system: warm base surfaces, authentic approved SVG support, restrained texture/depth, and no decorative full-scene photo background by default. It also records the source hierarchy, production standards, narrative architecture, and the one-scene-at-a-time execution protocol.

## 3. Authoritative document register

| Domain | Source | Use |
|---|---|---|
| Product | `docs/PRD.md` | Product thesis, requirements, priorities, AT-01..AT-18, NFRs, release blockers |
| Visual consolidation | `docs/DESIGN_SYSTEM.md` | Locked identity, palette, typography, materials, motion, scene contracts, QA gates |
| Execution | `docs/IMPLEMENTATION_PLAN.md` | P0–P6 phases, dependencies, definitions of done, evidence rules |
| Owner lock | `docs/OWNER_DECISIONS/FINAL_DESIGN_DIRECTION_LOCK.md` | Editorial surface-first decision and authorized production scope |
| Narrative | `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` | Canonical twelve-scene flow and consent boundaries |
| Technical | `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md` | Runtime/state/asset and capability boundaries |
| Design fragments | `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_*.md` | Color, type, icon/SVG, shape, material, depth, motion, photo, cake, Vault, scene-by-scene rules |
| Inventory | `docs/source-inventory.md`, `docs/MANIFEST.json` where present | Source and asset provenance |
| Project records | `docs/DECISION_LOG.md`, `docs/PENDING_REGISTER.md`, `docs/STACK_AUDIT.md` where present | Decisions, unresolved inputs, stack audit |

The Final Flow currently contains a historical “not yet locked” design-status section that predates later owner decisions and implementation. Treat it as historical source evidence; do not silently use it to undo later explicit locks. Any substantive contradiction must be recorded and escalated.

## 4. PRD requirements summary

`docs/PRD.md` defines a private birthday experience for one recipient. Goals are emotional pacing, personal editorial storytelling, tactile interaction, a complete birthday ending, and an optional hidden layer. Non-goals include a conventional website structure, dashboard behavior, generic birthday decoration, public social interaction, forced romantic response, and security claims based only on an unlisted URL.

The canonical scene roles are:

1. **S01 Loading / Prelude** — honest readiness, short atmospheric preparation, recovery.
2. **S02 Invitation / Open** — explicit user opening of the keepsake.
3. **S03 Birthday Reveal** — name-led birthday reveal and transition.
4. **S04 Portrait / Memory Moment** — one hero portrait with adaptive supporting assets; no gallery requirement.
5. **S05 Birthday Cake Studio** — curated decoration interaction and persistent cake configuration.
6. **S06 Make a Wish** — completed cake, candle/wish pause, non-microphone fallback, extinguish action.
7. **S07 Personal Birthday Letter** — birthday letter and reading/continue; confession is not revealed here.
8. **S08 Final Birthday Moment** — complete standalone birthday ending with End and Replay.
9. **S09 Hidden Transition** — deliberate hidden-layer discovery; ordinary scroll cannot authorize it.
10. **S10 The Vault** — PIN `011007`, real hinged Vault where capable, fallback where needed.
11. **S11 The Hidden Letter** — letter remains visible until explicit Open Letter consent.
12. **S12 Confession Ending** — quiet, non-demanding reading, End/Replay; content pending until owner approval.

The PRD global requirements include one authoritative state owner, guarded/cancellable/idempotent transitions, privacy-safe asset handling, responsive re-composition, keyboard/focus support, reduced-motion support, no forced waiting, no confession reply demand, honest fallback behavior, and replay reset. The acceptance scenarios are AT-01 through AT-18; the implementation plan maps them to scene gates G01–G12 and cross-system gates A01–A12. Release blockers include any P0 failure, a broken birthday-only closure, unsafe hidden access, fake/static capable Vault door behavior, divergent cake state, confession before explicit letter action, missing accessibility/fallback paths, unverified personal assets, or silent violation of a LOCKED rule.

## 5. Design system summary

The design language is editorial, warm, restrained, tactile, and kinetic. Birthday World uses warm paper/cream/coral/lavender directions; Hidden World deepens contrast and intimacy without becoming a game UI. The owner decision is **EDITORIAL_SURFACE_FIRST**: visual hierarchy begins with an editorial surface, authentic SVG motifs, controlled texture, material depth, and meaningful motion.

Locked palette tokens are defined in `docs/DESIGN_SYSTEM.md` §3.1 and the Color fragment. Implementations must use the canonical values from those sources; this handoff intentionally does not duplicate a second token registry. Birthday and Hidden World may change semantic contrast, but may not introduce an unapproved palette.

Typography is locked to three families with distinct roles:

- **Bricolage Grotesque** — display, headings, UI, compact labels.
- **Newsreader** — editorial reading, birthday letter, confession surface.
- **Shantell Sans** — extremely restrained personal accents only.

The type fragment and Design System define weights, optical behavior, readable long-form use, and fallback obligations. Font source integrity, selected weights, licenses, and runtime loading must remain separately verified.

Graphic vocabulary includes the REV5 SVG system, Offset Loop, Phosphor functional icons, restrained geometric shapes, and an approximate 70/30 stroke-fill direction. Materials and depth use editorial paper, ink, warm surfaces, mechanical dark surfaces, controlled texture tiers, logical foreground/midground/background ownership, and explicit shadow classes. Motion uses the Choreographed Playful Precision personality, T1–T4 transition families, GSAP for scene choreography where assigned, Motion where assigned, cleanup/cancellation, skip-safe behavior, and reduced-motion equivalents. Exact curves/durations remain pending where the sources say they are pending.

Photography is authentic-only and privacy-sensitive. S04 adapts to one or multiple authorized photos without turning into a gallery. The Vault is GLB-first, mechanical, premium, intimate, and must preserve a real hinged door on capable rendering. The physical-to-editorial handoff is S10→S11→S12; confession never appears automatically from Vault opening.

## 6. Implementation plan and phase status

`docs/IMPLEMENTATION_PLAN.md` defines:

- **P0 Foundation:** source freeze, stack conformity, schemas, asset/provenance prerequisites, test harness.
- **P1 Runtime:** typed scene graph, guards, TransitionEngine/coordinator, cancellation, replay, readiness, fallback contracts.
- **P2 Editorial foundation:** S01–S04, visual system, responsive/accessibility foundation.
- **P3 Cake:** S05/S06 vertical slice, curated decoration, persistent CakeConfiguration, wish/candle fallback.
- **P4 Hidden World:** S08 armed/commit portal, S09–S12, Vault GLB, hinge, PIN, letter consent, fallback and performance paths.
- **P5 Polish:** motion, audio, performance, responsive calibration, device evidence, craft refinement.
- **P6 Release:** complete AT-01..AT-18, G01–G12, A01–A12, personal content approval, privacy/license review, release validator and owner sign-off.

P0/P1 are substantially represented by source, runtime, authorization and evidence records. P2/P3/P4 have implemented scene areas and focused evidence. P5 is uneven: S09–S12 have refinement reports, while S01–S08 still need the same systematic scene-by-scene visual calibration. P6 is **not passed**: focused tests and builds do not replace complete supported-device/browser QA, personal approval, measured performance, privacy review, or final release authorization. The release validator is intentionally expected to remain `NOT_READY` while required gates/content are incomplete.

## 7. Scene-by-scene implementation matrix

| Scene | Implementation / evidence | Current assessment | Next work |
|---|---|---|---|
| S01 | `src/ui/s01/S01Prelude.tsx`, `readiness.ts`, `OffsetLoopOpen.tsx`; `CP01C1_S01_PRELUDE_EVIDENCE.md` | Implemented; focused readiness/retry/reduced-motion evidence exists. Visual refinement is not yet at S09–S12 depth. | First refinement pass; honest readiness, desktop/mobile composition, font/SVG fallback review. |
| S02 | `src/ui/s02/S02Invitation.tsx`, `FoldedEditorialKeepsake.tsx`; CP01C2/CP01C2A/CP01C2B evidence | Implemented with explicit open/consent and reduced-motion correction. Visual baseline reported/conditionally reviewed, not full product approval. | Preserve accepted fold/geometry; include in continuity regression. |
| S03 | `src/ui/s03/S03BirthdayReveal.tsx`, `CelebrationBurst.tsx`; CP01C3 evidence | Implemented; browser/evidence sequences and fallback/reduced-motion captures exist. | Verify name/content fixtures and visual calibration with owner-approved content. |
| S04 | `src/ui/s04/S04Portrait.tsx`; `S04_PRODUCTION_IMPLEMENTATION_EVIDENCE.md` | Implemented with photo authorization boundary; zero-photo HOLD and one-photo release policy remain important. Private media is not part of handoff. | Owner-approved photo/content review and responsive crop audit. |
| S05 | `src/ui/s05/S05CakeStudio.tsx`, `CakeRenderer.tsx`; S05 evidence | Implemented curated cake interaction and state flow. | Validate all decoration families, keyboard/drag cancellation, persistence and visual polish. |
| S06 | `src/ui/s06/S06MakeAWish.tsx`; S06 evidence | Implemented wish/candle interaction with fallback and S05 continuity obligations. | Verify tactile timing, reduced motion, no-mic path and S05→S06 configuration parity. |
| S07 | `src/ui/s07/S07BirthdayLetter.tsx`, `letter-content.ts`; S07 evidence | Implemented birthday-letter surface; long reading and explicit Continue are separate from confession. | Content approval and visual/accessibility reading review. |
| S08 | `src/ui/s08/S08FinalBirthdayMoment.tsx`, `s08-content.ts`; S08 evidence | Complete standalone birthday ending with End/Replay; hidden portal requires arm then deliberate commit. Current portal also accepts a simple click; drag remains supported. | Preserve birthday closure; verify final owner copy and hidden invitation tone. |
| S09 | `src/ui/s09/S09HiddenDiscovery.tsx`; S09 implementation/refinement evidence | Implemented hidden transition and honest S10 boundary. Focused evidence exists; historical Playwright lifecycle debt is documented. | Visual review and fresh focused browser verification if needed; no automatic entry. |
| S10 | `src/ui/s10/S10Vault.tsx`; S10 production/refinement/qualification evidence | Implemented Vault V2 integration, PIN, door/fallback paths; GLB hash verified. Visual/performance/owner approval remain separate. | Final device/performance and owner visual review; do not alter GLB. |
| S11 | `src/ui/s11/S11PhysicalLetter.tsx`, `s11-content.ts`; S11 evidence/refinement | Implemented physical letter and explicit open action; visual review baseline reported accepted/conditional. | Owner review of latest visual baseline and content provenance. |
| S12 | `src/ui/s12/S12FinalLetter.tsx`, `s12-content.ts`; S12 evidence, refinement, overflow-fix report | UI and neutral fixture reading are implemented. Latest desktop/mobile overflow correction has focused 7/7 browser evidence; production confession remains `CONTENT_PENDING`. | Owner review of latest screenshots; provide approved content only through governed channel. |

Status vocabulary in this matrix is deliberate: **implemented** means source exists; **verified** means the named evidence/run directly supports the claim; **reported** means an existing report claims it but this handoff did not rerun it; **pending** means owner/content/measurement gate remains; **blocked** means a prerequisite prevents closure.

## 8. Architecture and state contracts

The approved stack is Next.js `16.4.2`, React `19.3.1`, React DOM `19.3.1`, TypeScript `6.0.3`, Zustand `5.0.15`, GSAP `3.15.0`, Motion `14.3.0`, Three `0.186.0`, React Three Fiber `9.8.2`, Drei `10.7.9`, Howler `2.2.4`, Tailwind `4.3.3`, Vitest `5.0.5`, Playwright `1.64.1`, ESLint `9.39.5`, and Node engine `>=22.12.0` as declared in `package.json` (lockfile remains the exact install authority).

Key boundaries:

- `src/runtime/contracts.ts` defines typed scenes/events and transition results.
- `src/runtime/guards.ts` owns semantic eligibility and prerequisites.
- `src/runtime/transition-engine.ts` owns deterministic dispatch, preparation, commit, cancellation and duplicate protection.
- `src/runtime/transition-coordinator.ts` coordinates scene lifecycle and animation ownership.
- `src/state/experience-store.ts` is the Zustand authoritative state owner; scene components do not invent parallel narrative state.
- `src/assets/authorization/` separates trusted production registry declarations, public projections, fail-closed policy and synthetic test support.
- `src/evidence/packaging/` enforces archive profiles and restricted-content policy.
- `src/release/` performs deterministic release readiness validation, static-output checks, SVG/hash/privacy checks and incomplete-scene diagnostics.

Cake configuration must survive S05→S06 as one authoritative snapshot. S08 completion is independent of hidden discovery. S09 requires explicit hidden intent. S10 requires PIN `011007` as a narrative check, then a real/open equivalent Vault path. S11 requires a separate letter-open action. S12 is silent, user-paced, and offers End/Replay without collecting a romantic answer.

## 9. Canonical journeys and consent boundaries

**Birthday:** `S01 → S02 → S03 → S04 → S05 → S06 → S07 → S08 → End / Replay`.

**Optional Hidden World:** `S08 → explicit discovery/arm → deliberate commit → S09 → S10 → PIN 011007 → Vault open → S11 → explicit Open Letter → S12 → End / Replay`.

Ordinary scroll must never authorize S09. Failed/cancelled gestures must snap back. Hidden discovery must be voluntary. Vault opening must not reveal confession. S11 must not auto-open. S12 must not ask Yes/No, force a reply, open messaging, or imply that an unlisted URL is security. Replay must reset the canonical state.

## 10. Asset, privacy and content inventory

- Approved REV5 SVG assets live in the deployed/public and `BIRTHDAY_SVG_REV5/` source locations documented by the manifests. Do not edit geometry or copy private assets into handoff packages.
- Font source distributions and selected production WOFF2/licensing records are governed by the prior font cleanup/audit records. Do not assume every upstream source file is deployable.
- S04 portrait is private and authorization-controlled. No photograph is embedded in this handoff.
- Vault runtime asset: `assets-final/vault/runtime/vault-final.glb`; actual SHA-256 is `9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B`. The binary is not copied into this handoff.
- S12 content remains `CONTENT_PENDING`; `src/ui/s12/s12-content.ts` is a neutral/placeholder schema and must not be treated as owner-approved confession copy.
- Evidence packaging excludes private photos, personal writing, secrets, Vault binaries, and full font libraries by policy.

## 11. Evidence and verification register

| Area | Evidence | Assessment |
|---|---|---|
| Runtime foundation | `planning/evidence/CP01B_RUNTIME_EVIDENCE.md` | Reported/implemented; use direct rerun for current closure. |
| S01 | `CP01C1_S01_PRELUDE_EVIDENCE.md` | Focused evidence; broader visual refinement pending. |
| S02 | `CP01C2_S02_INVITATION_EVIDENCE.md`, `CP01C2A...`, `CP01C2B...` | Focused and visual evidence; full release not implied. |
| S03 | `CP01C3_S03_BIRTHDAY_REVEAL_EVIDENCE.md` | Focused sequence evidence; owner content/visual approval separate. |
| S04–S08 | `S04_...` through `S08_...` implementation reports | Implemented/report-based; systematic refinement and full QA remain. |
| S09 | `S09_PRODUCTION_IMPLEMENTATION_EVIDENCE.md`, `S09_REFINEMENT_REVIEW.md` | Focused evidence; historical runner issues must not be called full-suite PASS without current exit code. |
| S10 | `S10_VAULT_V2_QUALIFICATION.md`, `S10_REFINEMENT_REVIEW.md`, `S10_TARGETED_FIX_REVIEW.md` | Technical qualification and visual refinements reported; owner visual/performance approval pending. |
| S11 | `S11_PRODUCTION_IMPLEMENTATION_EVIDENCE.md`, `S11_REFINEMENT_REVIEW.md` | Focused evidence and review captures; owner approval/content gate remains distinct. |
| S12 | `S12_REFINEMENT_REVIEW.md`, `S12_READING_OVERFLOW_FIX.md` | Latest focused S12 run recorded 7/7, typecheck/lint/build passed; final owner visual approval pending. |
| Authorization | `CP01D1*` evidence and `src/assets/authorization/` | Trust boundary hardened; source/deployed hash verification remains a separate release responsibility. |
| Release | `CP01D2*`, `CP01D3*` evidence and `src/release/` | Validator intentionally remains `NOT_READY`; no fabricated owner approval. |
| Harness | `CP01E*` evidence | Isolated Edge/Turbopack/Webpack lifecycle work is documented; do not assume every historical run is a current full-suite result. |

The latest S12 targeted correction changed only S12 component/CSS/focused test/evidence files in the relevant pass. The current working tree also contains pre-existing changes from earlier project work; a new conversation must inspect `git status` before editing.

## 12. Historical defects and resolutions

- S01 readiness test modes were isolated from public production query parameters; retry/readiness and fallback evidence exists.
- S02 reduced-motion Offset Loop visibility was corrected and verified with browser screenshots.
- TransitionEngine event payload snapshotting and malformed payload rejection were hardened in CP-01B.1.
- Asset authorization was split from synthetic test construction; forged/untrusted records fail closed.
- Release validator readiness and evidence-backed approval boundaries were hardened; real project remains NOT_READY.
- Playwright diagnostic work identified Windows/Next build-directory, browser-channel and lifecycle concerns; Edge and isolated output were used in later focused runs.
- S09 hidden journey was recovered with explicit arm/commit semantics; the current implementation also permits direct click on the armed “Tarik ke atas” control as an accessible equivalent.
- S10 keypad/framing/interior paper visibility received targeted fixes; Vault geometry and source asset remain unchanged.
- S12 reading overflow received bottom breathing room, state-aware affordance, desktop height allocation, and top-boundary clipping protection.

## 13. Open issues and blockers

1. Full release is `NOT_READY`.
2. S12 confession copy and any final personal writing remain `CONTENT_PENDING`.
3. Final owner visual approval of the latest S12 desktop correction is pending unless a newer explicit owner record exists.
4. S04 private photo authorization/release evidence must remain governed and must not be copied into handoff archives.
5. P5/P6 still require systematic visual calibration of S01–S08, full responsive/device/browser coverage, measured performance, accessibility review, privacy/license review, and complete AT/G/A gate closure.
6. Historical Playwright runner/process issues are evidence debt until a current full run has a conclusive exit code and clean teardown.
7. The source set includes historical status discrepancies; resolve only through explicit owner/source decisions.

## 14. Current visual approval status

| Scope | Status |
|---|---|
| Product identity and editorial surface-first direction | LOCKED by owner decision |
| Birthday World flow S01–S08 | Implemented; refinement/owner review uneven |
| Hidden World flow S09–S12 | Implemented boundaries; visual/technical evidence exists, release approval absent |
| S09–S12 refinement baselines | Reported/conditionally accepted in their reports; latest owner visual approval must be checked directly |
| S12 latest reading correction | Focused verification PASS; owner approval pending |
| Personal portrait, letters, confession | Authorization/content gates pending as applicable |
| Complete release | NOT_READY |

## 15. Recommended remaining work

Follow the owner’s required workflow: **one scene → one focused prompt → real screenshots → review → approve or targeted fix → next scene**.

The next task is **S01 refinement**. It should begin only after the new AI reads this handoff and the relevant locked S01 sections. It should inspect the existing S01 implementation, create a narrow refinement plan, capture a small set of real screenshots, and report visual findings without touching S02+ or canonical documents. Then continue scene by scene, preserving accepted baselines and escalating contradictions.

Cross-scene continuity, final personal-content approval, full P5/P6 QA, and release-validator closure remain later work. Do not start S02 refinement or a broad architecture rewrite as a side effect of S01 work.

## 16. Instructions for the new AI conversation

1. Read this file first.
2. Read the relevant locked source sections before proposing code.
3. Inspect `git status`, existing evidence, and actual implementation before editing.
4. Treat `LOCKED`, `PENDING`, `REPORTED`, `VERIFIED`, and `BLOCKED` as different statuses.
5. Do not infer owner approval from screenshots, passing unit tests, or an existing component.
6. Do not copy private photos, personal writing, Vault binaries, secrets, or full font libraries into packages.
7. Preserve source authority and escalate substantive conflicts.
8. Use one scene per prompt and one focused verification loop.
9. Report actual commands, exit codes, counts, screenshots, and remaining limitations.
10. Never declare the project release-ready while the release validator or owner/content gates say otherwise.

## 17. Source references and evidence locations

Primary sources are under `docs/`; implementation is under `app/`, `src/`, and `tests/`; evidence is under `planning/evidence/`; scene screenshots are under `planning/evidence/screenshots/`. The next focused work should begin with:

- `docs/PRD.md` §4.1 / S01 and §6, §8, §11
- `docs/DESIGN_SYSTEM.md` §§2, 4, 7, 15, 18, 20
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` S01 and master flow
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md` readiness/runtime boundaries
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SCENE_BY_SCENE.md` S01
- `src/ui/s01/S01Prelude.tsx`, `src/ui/s01/readiness.ts`, `src/ui/s01/OffsetLoopOpen.tsx`
- `planning/evidence/CP01C1_S01_PRELUDE_EVIDENCE.md`

No canonical source document or application source was modified to create this handoff.
