# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: SCENE-BY-SCENE ART DIRECTION

> **Status:** SCENE-BY-SCENE ART DIRECTION v1.0 — **LOCKED (approved final scene audit)**  
> **Approval:** User approved the 12-scene concept and the six critical audit resolutions.  
> **Scope:** Scene composition, visual hierarchy, interaction intent, art-direction continuity, navigation, transition grammar, responsive adaptation, safeguards, and acceptance gates.  
> **Not in scope:** Final pixel coordinates, original photographic assets, final writing/copy, exact motion/audio timings, model geometry, shaders, or finalized production assets. Those remain **PENDING PROTOTYPE / CONTENT**.  
> **Design Thesis:** *Warm Kinetic Editorial Keepsake*.  
> **Core Product Principle:** *This is not a birthday website. It is a private interactive birthday experience.*

---

## 0. Authority, precedence, and compatibility contract

This document is the **eleventh design fragment**. It orchestrates existing locked decisions; it must **not silently amend** upstream documents. Conflicts are resolved in this order: (1) locked product narrative and user-consent behavior in Flow; (2) locked architecture, runtime and hard fallbacks in Tech; (3) global Design Direction; (4) domain-specific locked design fragments; (5) this scene-level allocation. Where a scene-level recommendation might alter an upstream lock, the upstream lock wins unless explicitly re-approved.

### Direct references — all previously locked

1. `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — canonical twelve scenes, birthday-first, optional hidden confession, PIN `011007`.
2. `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — single fullscreen scene runtime; Next.js, React, TypeScript, Tailwind as infrastructure, GSAP, Motion, Zustand, R3F/Three/Drei, Howler, SVG, Next/Image, native Pointer Events; progressive loading and accessible fallback.
3. `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — *Warm Kinetic Editorial Keepsake*, medium energy, dynamic editorial composition, warmth > spectacle, birthday > confession, expressive + calm rhythm.
4. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` — muted-but-confident balanced dual accents and same family across both worlds.
5. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` — Bricolage Grotesque, Newsreader, exceptional/rare Shantell Sans.
6. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` — functional Phosphor icons; custom decorative SVG; signature Offset Loop.
7. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` — Soft-Structured Kinetic Geometry; rhythm rather than pattern wallpaper.
8. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` — Tactile Editorial Surfaces; T0/T1/T2 texture budgeting.
9. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE.md` — controlled cinematic depth; spatial planes, functional utility overlays, S0–S3 shadow families.
10. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MOTION.md` — Choreographed Playful Precision, M0–M5, T1–T4, animation ownership, interruptions and reduced motion.
11. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_PHOTO_TREATMENT.md` — Intimate Cinematic Editorial Portraiture, P1–P4, 1–6 assets / 2-photo baseline, authentic identity.
12. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_CAKE_ART_DIRECTION.md` — Sculpted Celebration Cake, single-tier DOM/SVG-first, curated interactive decorations, same cake in Scenes 05 and 06.
13. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_VAULT_ART_DIRECTION.md` — The Quiet Keepsake Vault; external GLB, true 3D door animation, DOM PIN input, physical letter, fallback.

**No new colors, typography families, general icon packs, arbitrary shape systems, or mandatory dependencies are authorized by this document.** Any names for controls, user-facing copy examples, decorative arrangements, and timings are direction only until content and prototype passes.

---

## 1. Master experience identity and scene continuity

**Internal narrative:** *A Keepsake That Slowly Opens*. The user encounters a personal birthday gift which unfolds through curiosity, genuine recognition, playful creation, a wish, appreciation and complete closure. A deliberate *optional* second invitation reveals a quieter hidden layer, a personal keepsake Vault, and a letter. The existence of the hidden layer must not retroactively make the birthday celebration feel like a pretext.

**Four emotional acts** (grouping only; **not routes or added scenes**):

- **Act I / 01–03 — The Gift Opens:** curiosity → invitation → celebratory name reveal.
- **Act II / 04–06 — Connection & Play:** portrait → cake creation → make a wish.
- **Act III / 07–08 — Birthday Is Complete:** personal birthday letter → genuine final birthday moment / false ending.
- **Act IV / 09–12 — Optional Hidden Layer:** intentional discovery → true 3D keepsake Vault → explicit letter opening → low-pressure confession and release.

Narrative priorities, in order: **user intent and ethical optionality > emotional clarity > content readability and accessibility > visual hierarchy > cinematic spectacle.** One principal focus per scene, ordinarily 2–4 supporting elements at most, with ambient details budgeted rather than obligatory. The expressive:calm balance (~70:30) is an overall art-direction tendency, **not a fixed count of asymmetric versus centered scenes**. Negative space is intentional; avoid dead space, not all empty space.

### 1.1 Design invariants across twelve scenes

- Fullscreen, single-runtime scene orchestration: no conventional browser scroll as the main scene-navigation mechanism and no new route per scene.
- The experience is complete at Scene 08. Scene 09 cannot open automatically from normal completion, elapsed time, passive scroll, background audio, or accidental touch.
- The confession requires two separate intentional stages after discovery: PIN validation/open Vault, **then** user explicitly opens/selects the physical letter. No automatic confession on unlocking.
- Each scene has a stable, readable resting state. Ambient movement is optional, not perpetual. Input remains reliable during scene animations through explicit ownership/cancel rules.
- A scene can be dynamic **or** quiet. Never make all scenes equally theatrical; Scene 03, 06, 09 and 10 have different signature functions and must not duplicate the same effect.
- Functional controls remain on independent accessible utility surfaces above ornamental foreground, with clear focus and hit areas.
- Reduced-motion, no-audio, touch-only, keyboard, weak GPU, slow assets, and denied microphone paths retain the full story and all necessary decisions.

### 1.2 Color and graphic continuity

Locked tokens: Warm Ivory `#F6F1E8`, Editorial Mist `#D8D2C9`, Deep Ink `#2C282A`; Muted Coral `#E67A6B`, Soft Apricot `#ECA06E`; Dusty Lavender `#A79DCD`, Confident Periwinkle `#8794CC`; selectively Soft Champagne `#E6D4AC` (<5% as luminous highlight per color fragment); Hidden Deep Plum `#352B37`, Warm Graphite `#2E2A2C`. A **dominant accent family per scene**; not all hues in every viewport. Pink/gold wedding aesthetics, neon, strong glassmorphism, corporate cards, and generic celebration templates are forbidden.

Offset Loop is an organic open-loop with deliberate geometric interruption, adapted across birthday shapes and mechanical hidden forms. It may be absent when it would compete with story or faces. Decorative SVG's directional stroke/fill 70/30 preference applies to decorative assets, not solid material/object masks. Phosphor is strictly a functional icon language. Maintain shape family continuity (organic-led → increasingly segmented), material continuity (editorial matte → tactile cake → quiet mechanical → keepsake paper), and depth progression (2D → 2.5D → tactile → reading-flat → hidden depth → true 3D → flat/intimate).

---

## 2. Scene specification template and state requirements

Each scene specifies: **emotional job; primary visual hierarchy; composition (mobile/desktop); color/type/graphics/material/depth; user controls and persistent states; entrance/rest/exit choreography; fallback/accessibility; completion and next-scene handoff**. Content strings below are *creative examples*, not approved final user-facing copy. User-facing application microcopy and errors should be clear and consistent (Indonesian where configured); these internal English scene names are production terminology.

### SCENE 01 — Loading / Prelude

**Emotional job:** gentle curiosity, credibility, opening a small mystery. **Primary focus:** incomplete Offset Loop or a related hand-crafted editorial gesture; secondary short curiosity line. No photos, cake, or loud birthday reveal yet.

- **Composition:** 2D open warm canvas; deliberate asymmetry and spacing. Mobile prioritizes one centered-or-off-center motif and very short line; desktop may place type diagonally relative to motif but preserves quick legibility.
- **Visual:** Warm Ivory + restrained Coral, matte T0, S0 (or barely S1); Bricolage micro/medium display. Pattern optional and ultra-limited. Never present fake progress percentages or conventional spinning loader as the design feature.
- **Interaction:** passive boot; real asset readiness controls exit. Prelude's *target* is about 2–4 seconds, **not a forced delay and not a fixed loading deadline**. If loading exceeds visual target, provide honest stable loading state and recovery rather than blank screen.
- **Motion:** M3 editorial trace/reveal; no large camera movement. Idle animation either still or exceptionally restrained. **Exit:** T2 motif-to-invitation visual continuity, once shell is ready.
- **Fallback/QA:** reduced motion static motif with accessible loading status; avoid flashing. **Gate:** no artificial waiting when ready, no claim of progress without measured progress.

### SCENE 02 — The Invitation / Open

**Emotional job:** explicit consent to begin, tactile anticipation. **Primary focus:** a personalized invitation object; secondary legible open affordance; sound control.

- **Composition:** soft-structured folded/editorial invitation, neither ornate wedding envelope nor generic modal. On mobile, large central hit surface with spare room for copy and mute control; on desktop, off-center paper object balanced by a modest typographic anchor.
- **Visual:** warm matte paper with limited satin fold/seam, selected warm or cool accent, small Offset Loop detail when compositionally justified; Bricolage UI. The object resembles crafted editorial stationery without ornamental luxury codes.
- **Interaction:** tap/click/Enter/Space opens. **This gesture is the earliest legitimate user activation for audio**; start sound only if user preference and browser permit, and retain a consistent mute control. Opening does not require audio.
- **Motion:** M2 tactile open feedback, T2 editorial surface/mask to Scene 03, GSAP controls scene entry while Motion owns local button state on separate boundaries.
- **Fallback/QA:** keyboard operation and motion-reduced fold-to-crossfade; no auto-open, no sound surprise, no tiny hotspots.

### SCENE 03 — Birthday Reveal

**Emotional job:** the authentic celebratory peak: **“Happy Birthday, [Name]”**. **Primary focus:** recipient's name; secondary birthday line/date only if confirmed; decoration clearly subordinate.

- **Composition:** oversized kinetic Bricolage, intentionally asymmetric editorial rhythm, with responsive typography that reflows rather than clips the name on small screens. Desktop may use stronger overlapping layers; mobile prioritizes entire name and readable hierarchy.
- **Visual:** warm/cool dual-accent choreography with one dominant family, Celebration Fragments extremely curated (not confetti shower); matte open canvas; S0/S1. Shantell Sans, if ever used, only tiny meaningful human accent.
- **Interaction:** once reveal lands, a clear user-directed continuation; no prolonged forced spectacle. The actual name and date remain content PENDING; never invent personal details.
- **Motion:** M3 high-impact typography choreography; one controlled M5-like reveal payoff **does not consume T4 immersive zoom**. **Exit:** T3 typographic focus hands off to portrait instead of a second giant zoom.
- **Fallback/QA:** reduced motion sequential simple appearance; name readable in all layouts, all text available to assistive technology; no continuous bouncing or forced animation replay.

### SCENE 04 — Portrait / Memory Moment

**Emotional job:** she feels *seen*, not redesigned. **Primary focus:** authentic hero face/photo; secondary supporting photo or optional memory detail, editorial supporting typography.

- **Photo contract:** P1 Editorial Hero Frame is default; P2 Soft Geometric Mask and/or P3 Layered Print Depth may support, but not simultaneously if they overwhelm. P4 Memory Echo elsewhere only if justified. **Adaptive 1–6 images, design baseline 2;** stable hero whether 1, 2, 4, or 6 are available. Supporting slots collapse/recompose; never create empty placeholders, clone one photo as multiple memories, or convert to a gallery/carousel.
- **Composition:** mobile hero image focal-point and face-safe crop first, text and supporting graphics reflow around face-safe exclusion zone; desktop may offset hero and incorporate one subordinate photo frame. No captions/graphics crossing face or essential details. Photo can be more legible and personal than high-fashion editorial.
- **Visual:** Warm Ivory plus selective Coral/Lavender accents, T0 reading and subtle P3 printed material impression where relevant, S1 layered depth; static 2.5D generally sufficient. Natural First, Editorial Second: preserve expression, skin tone and identity. No aggressive face retouching or invented scenes.
- **Interaction:** user-paced rest/continue, optional purposeful small detail reveal only if it conveys a real memory. **Motion:** M3 mask/layer entrance; M4/T3 spatial handoff to Cake Studio; no second signature immersive zoom or excessive face parallax.
- **Fallback/QA:** original photo may be low-resolution; adjust size and framing rather than hallucinate detail. Optimize Next/Image, protect face-safe focal region at all breakpoints, remove photo motion under reduced-motion. Images must be appropriate for a personal gift, without leaking unnecessary EXIF or sensitive context.

### SCENE 05 — Birthday Cake Studio

**Emotional job:** active play and ownership. **Primary focus:** the actual single-tier customized **Sculpted Celebration Cake**; controls support, never overtake the object.

- **Composition/mobile:** large cake stage in upper/central usable zone; contextual **bottom tray** for Frosting, Candles, Flowers, Topper, Accents, plus compact undo/remove/reset/finish. All placement targets lie outside tray occlusion. A mobile bottom tray is contextual, not a persistent e-commerce/dashboard tool bar. Support short-screen rearrangement and safe areas.
- **Composition/desktop:** asymmetric cake stage with contextual side tray, high visual priority on cake; controls remain clearly accessible. Visual density intentional; one dominant object with restrained graphic support, no extra portrait or unnecessary decorative viewport clutter.
- **Visual:** round-derived *single-tier*, organic irregularity, soft-sculpted matte buttercream, selective satin accents, minimal base, S2 contact shadow. DOM/SVG-first (Canvas2D only when justified; WebGL not required). Curated palette presets draw from existing locked colors, maintain color compatibility and top-surface collision/spacing constraints.
- **Interaction:** preset or variant selection via tap, tap-to-apply + optional drag/snap in valid zones, rollback invalid placement; undo/remove/reset (destructive reset with confirmation). Limit decoration count to preserve cake aesthetics; keyboard/non-drag equivalents mandatory. Every placement transaction is validated before committing to Zustand configuration; gesture cancel never duplicates a decoration. Finishing works even if user uses minimal décor.
- **Motion:** M0 state accuracy, M1/M2 tactile settle, no physics-game bounce; audio/haptic optional, never required. **Exit:** user explicitly chooses Finish Cake; serialize finalized same cake state, then T3/M4 handoff into Wish stage. Do not rebuild as a separate decorated preset.
- **Fallback/QA:** simplified SVG appearance may reduce shading but preserve all interactive options and saved placements; disabled drag still allows tap/select. Completion never dead-ends due to an unavailable effect.

### SCENE 06 — Make a Wish

**Emotional job:** transform the cake she customized into a personal ritual. **Primary focus:** **same cake instance/configuration** with luminous candle flame; supporting invitation to make a wish.

- **Composition:** cake stage gently recenters or recontextualizes within a quieter, intimate birthday environment. Mobile candle and extinguish affordance must remain reachable. Darker ambient treatment is allowed **but is still Birthday World**: warm cake/flame/color identity remains; do not use Hidden World thriller lighting.
- **Interaction:** successful Finish Cake → Scene 06, candle illumination → user-paced wish → tap or hold extinguish. Optional microphone may enhance *only after separate permission*, never required; denial yields fully functional touch route. Do not implement a wish countdown, microphone-only challenge or strict time limit.
- **Motion:** T3 handoff followed by natural flame flicker, restrained glow, smoke and ambient response; stateful `flameOn → extinguishCommitted → extinguished` with duplicate-input protection. Subtle M3 emotional beat and optional brief personal line after extinguish; continue to Scene 07 by user intent or an agreed clear affordance—never rush reading.
- **Visual/material:** same Tactile Sculpted object and decoration geometry, S2 grounded contact; candle illumination may influence environment without aggressive shaders or particles.
- **Fallback/QA:** no microphone, motion reduction, weak GPU, muted audio all preserve meaningful extinguish response; no asset/object reset, no different decoration colors, no unexplained change in candle count.

### SCENE 07 — Personal Birthday Letter

**Emotional job:** genuine appreciation and blessings, friendship since 2022 as appropriate to final content, **not confession**. **Primary focus:** legible personal writing; decoration deliberately recedes.

- **Composition:** editorial reading surface; Newsreader main longform, Bricolage labels/actions. Desktop restrained measure and generous margins, not an empty generic centered card; mobile comfortable line length, safe area, local scroll *inside reading surface* for long text, no page-level scroll scene navigation.
- **Visual:** Warm Ivory / Keepsake Paper, T0 text field; microtexture only off the main reading surface, S0/S1. One delicate mark or line may support intimacy; no romantic visuals signaling confession ahead.
- **Interaction:** read at own pace, explicit continue and accessible controls; no automatic progression by scroll depth or time. Optional small P4 memory echo only if it improves writing, never obligatory.
- **Motion:** simple T1/calm reveal, minimal glyph motion; no full-letter typewriter, forced text animation, auto-scrolling or obstructive parallax.
- **Fallback/QA:** scalable text, selectable readable content, visible focus, logical keyboard reading order; no overlay covers the final paragraph or continuation control.

### SCENE 08 — Final Birthday Moment / True Birthday Closure

**Emotional job:** a satisfying *real ending* of Birthday World, with no requirement to enter hidden content. **Primary focus:** final birthday blessing and emotional resolution. **Secondary:** replay/close controls and a deliberately subtle optional discovery affordance.

- **Composition:** calm, authored editorial final frame, open negative space and coherent callback to scene motif/cake/photo only when justified. Avoid marketing CTA presentation; keep meaningful closure visually dominant.
- **Two-stage intent:** **Stage A — Birthday closure:** complete ending with final words/music resolution and independently accessible replay/finish. **Stage B — Quiet Second Invitation:** a discoverable secondary seam/Offset Loop/edge clue or similar affordance can be intentionally noticed/activated *after* or alongside the completed ending. Its visual presence stays subordinate and must not invalidate Stage A. These are states of Scene 08, **not new scenes or unapproved narrative branch**.
- **Hidden affordance:** a quiet pointer/touch reveal, with accessible visible-focus/selectable equivalent; avoid requiring precision swipe to discover entry. Exact hint location/content/trigger PENDING. Do **not** print obvious “confession unlocked” labels or force a hidden layer teaser. Users who stop at this scene have completed the birthday gift.
- **Motion:** mostly still, T1 tonal resolution; after user discovers and chooses, initialize Scene 09/T4, but never auto-transition simply because final birthday animation ended.
- **Fallback/QA:** full birthday experience can end/replay without Hidden; gesture and keyboard paths both valid, hidden cue neither invisible to every user nor disruptive to reading.

### SCENE 09 — Hidden Transition / Pull Beyond the Surface

**Emotional job:** deliberate discovery of a quieter underlying layer. **Primary focus:** user's confirmed uncover gesture and dimensional transformation of the familiar visual identity.

- **Composition:** one large interactive seam/layer derived from Scene 08; recognizable editorial surface and Offset Loop transform into segmented mechanical geometry. Deep Plum/Graphite grows from existing design's color memory, not an unrelated sci-fi environment.
- **Input contract:** gesture begins → immediate visual tracking; below threshold → safe spring/return; above threshold → single committed transition; cancelled pointer, blur, or interrupted drag → deterministic recovery. Ordinary browser scroll does not open Hidden World. Provide a **non-drag accessible activation** associated with the same discovery affordance, and support mouse/keyboard/touch.
- **Motion:** selected **single primary T4 immersive zoom** on committed entry only (target Scene 08→09). No continuous camera zoom during every partial swipe; progressive T2/T3 mechanical shape conversion leads to Scene 10. Reduced motion substitutes simpler fade/surface swap; no mandatory motion-induced disorientation.
- **Fallback/QA:** transition interruption safe; audio state preserved or crossfaded purposefully. Show a safe recovery if Vault model preload lags rather than white/black dead air.

### SCENE 10 — The Quiet Keepsake Vault

**Emotional job:** meaningful anticipation followed by the reward of physically revealing one keepsake. **Primary focus:** compact true-3D soft-geometric monolith, then legible PIN, then mechanically opening hinged door.

- **Composition:** object hero in modest, medium-dark spatial chamber; controls not lost in shadow. Mobile favors front-facing stable input composition with DOM keypad accessible at comfortable size; desktop may expose small extra physical depth, but not endless orbiting. Typography/UI Bricolage, meaningful short instructions, restrained Champagne detail.
- **Material/depth:** Warm Graphite matte body, Deep Plum environment, satin precision mechanical details and selectively integrated segmented Offset Loop; S3 cinematic lighting/shadow, no neon/chrome/bank-door clichés. Warm key with restrained plum/cool separation. External authored GLB/glTF preferred, named articulated subparts/pivots; R3F/Three/Drei implementation is confined to this 3D scene.
- **Camera contract:** initial **small cinematic dolly**, then camera stabilizes and remains still during PIN input; after valid PIN, one purposeful reframe may clarify interior. User interaction must not depend on inaccurate raycast presses of small 3D keypad meshes: **DOM-backed keypad**, visually attached to Vault, supports touch/mouse/keyboard.
- **PIN:** `011007` (narrative clue/interaction, **not real access control/security**). Input accepts corrections; wrong PIN returns quiet, visible, accessible Indonesian feedback and retry. Meaning of PIN and exact hint remain pending until confirmed. Idempotent submit prevents multiple simultaneous unlock sequences.
- **NON-NEGOTIABLE mechanical opening in primary true 3D:** PIN accepted → responsive recognition cue → segmented lock/core release → **hinged door rotates using a correctly authored real 3D pivot** with believable weight, ease and contact → Vault interior and **physical folded keepsake paper letter visibly revealed**. This is an animated physical opening, **never** an abrupt visibility toggle, static asset swap, or door that instantaneously vanishes. The unlock timeline is expressive but cancellable/fast-forward-safe after successful authorization and must not block accessibility.
- **Letter contract:** Vault opening stops with paper visibly selectable; it does **not** auto-open the letter or auto-transition into confession. Scene 11 must be reached only through intended user interaction with the letter.
- **Performance:** lazy preload GLB before 10 without delaying Scene 01; full → lite lighting/shadows first → 2.5D animated door → DOM accessible opening fallback. All tiers support PIN, door-opening semantics (simplified for reduced motion), letter selection and successful continuation. Sound/haptic optional; no dependency for meaning.
- **QA:** opening true mesh pivot works, camera never wobbles under PIN, keyboard control works, wrong PIN recoverable, no invisible hot zones or WebGL dead-end.

### SCENE 11 — The Hidden Letter

**Emotional job:** turn discovery into intentional vulnerability; the user chooses whether to read. **Primary focus:** the **physical folded paper letter** inside the open Vault, then calm keepsake-paper surface.

- **Composition:** initial stable visible folded letter in a clearly open Vault. A gentle selectable affordance (tap/click/focus/Enter) with no hidden precision requirement. After selection, letter receives spatial priority, bringing warm Ivory/Champagne paper light into cooler graphite/plum scene. This is **physical-to-editorial handoff**, not a hard cut into a generic article page.
- **Interaction:** two separate states: `vaultUnlocked/letterVisible` and `letterSelected/letterOpening`. Reaching the former never automatically triggers the latter. The act of selection opens/advances to confession Scene 12. Support reduced-motion transform replacement with readable fade.
- **Visual/type:** Keepsake Paper matte warm surface, restrained satin/mechanical elements recede; depth deliberately collapses toward intimate flat reading. Avoid glow-hologram notes or visual effects that make confession feel like game loot.
- **Motion:** M2 intentional selection and limited T3 handoff → T1 reading reveal; no typewriter, forced auto-open, or false interactive envelope that cannot be operated via keyboard.
- **Fallback/QA:** 3D, 2.5D, DOM paths preserve explicit paper selection and do not leak Scene 12 automatically.

### SCENE 12 — Confession Ending

**Emotional job:** calm and honest release. **Primary focus:** the message, **not** visual spectacle, not a response demand. The scene must respect friendship and recipient autonomy.

- **Composition:** warm paper-reading editorial environment growing from Scene 11, Newsreader dominates narrative text, Bricolage for quiet functional controls; suitable measure on desktop and local reading scroll on mobile, no forced viewport-sized walls of text. Avoid over-romantic color, hearts, intrusive portraits or huge dramatic italic effects.
- **Writing intent:** authentic and personal, non-manipulative, no binary answer, no countdown, no demand for immediate communication, no pressure or guilt. Exact confession words/content to be authored and verified separately, never invented by this design fragment.
- **Interaction:** user-paced, explicit letter close/continue; quiet final birthday sentiment, fade to black / replay as already in locked flow. Replay resets/retains per established state policy without accidentally skipping optionality on a new run.
- **Motion/audio:** largely static, T1/fade, avoid autoplay reveal line-by-line, excessive music crescendo, or artificial emotional suspense. Ambient can taper; audio remains controllable.
- **Fallback/QA:** entire message reachable, selectable and legible with assistive technology; user can close and leave without providing a response.

---

## 3. Transition choreography map — approved art-direction intentions

| From → To | Transition | Objective and hard condition |
|---|---|---|
| 01→02 | T2, light M3 | Offset Loop / prelude resolves as crafted invitation; asset-ready, no artificial hold |
| 02→03 | T2 + M3 | Explicit invitation opening unlocks celebratory name typography |
| 03→04 | T3 | Typographic energy passes focus to authentic portrait without a second signature zoom |
| 04→05 | T3 | Editorial portrait framing yields to interactive cake stage without duplicating visual peak |
| 05→06 | T3 / M4 | **Same persisted cake** spatially recontextualizes; candles become ritual focus |
| 06→07 | T1 | Glow/ambient fades into calm personal birthday reading surface |
| 07→08 | T1 | Content appreciation settles into genuinely complete birthday conclusion |
| 08→09 | T4 after intentional discovery | Single main immersive zoom; never accidental/passive/browser scroll |
| 09→10 | T3/M4 | Familiar graphic segments obtain 3D mechanical depth and Vault composition |
| 10→11 | M5 physical door + T3 | Real 3D door opens to show a physical letter; still not opened/read |
| 11→12 | T3 → T1 | **After deliberate letter selection**, physical paper becomes quiet reading surface |
| 12→ending/replay | T1 | Non-demanding closing/fade/replay; no required answer |

**T1** quiet editorial crossfade; **T2** deliberate mask/clip; **T3** layered spatial handoff; **T4** once-per-experience signature immersive zoom target. **M0–M5** remain role-based; these are labels from the existing Motion fragment, not new timings. A T3 handoff may include short local spatial shifts but is **not** permission for additional signature T4 transitions.

**The three differently motivated peaks:** (a) Scene 03 kinetic celebratory type; (b) Scene 06 warm wish ritual/payoff; (c) Scene 10 mechanically convincing real 3D unlock. Scene 09 delivers the single distinct transition signature. None should overrun calm reading and emotional autonomy.

---

## 4. Final six critical audit resolutions — LOCKED

### R1. Portrait availability and composition
One stable hero portrait is always the anchor. Support zero-to-many optional secondary placement slots **only in proportion to verified available photos**; policy supports 1–6 images, two as normal layout design baseline. Recompose mobile layout rather than insert blanks. Photo count does not dictate scene count, narrative quality, or gallery mechanics.

### R2. Cake layout zoning and continuity
Mobile uses unobstructed cake stage + contextual bottom tray, desktop cake stage + asymmetrically placed side controls. Decoration/placement zones do not sit under overlay. Touch, mouse and keyboard/non-drag alternatives. Single Zustand cake configuration survives Scene 05→06; no replacement with default cake. Undo/remove/reset and state-valid finishing remain available.

### R3. Longform reading readability
Scene 07 and Scene 12 are user-paced. Newsreader text, accessible length/contrast/focus, local scrolling where content requires it, no automatic letter advancement, typewriter overload, input obstruction or time limits. Scene 11 provides letter handoff, not separate forced reading movement.

### R4. False ending and optional discovery
Scene 08 finishes the birthday, with genuine end/replay affordance. The quiet optional discovery cue is subordinate and not a disguised mandatory continue button; intentional action and accessible non-gesture alternative lead toward Scene 09. Discovery does not require the user to accept a romantic question.

### R5. Hidden gesture contract
Direct track within a safe interaction region; below-threshold revert, above-threshold single commit, cancellation/blur safe, ordinary scroll not navigation. T4 immersive zoom plays only upon confirmed intent; simplified non-spatial fallback avoids motion discomfort. Gesture mechanism does not create an accessibility dead-end.

### R6. Vault-to-letter physical continuity
Valid PIN unlocks mechanisms, actual 3D hinge animates open; physical paper remains in revealed chamber; *different explicit user action* selects/opens it; selected paper enlarges/becomes editorial reading surface. No abrupt switch from bank-game aesthetics to generic article; no auto-confession, no lock-door static swap in primary true 3D.

---

## 5. Scene-by-scene allocation matrix

The entries here allocate previously locked systems rather than create new tokens.

| Scene | World / atmosphere | Type and image | Material / depth | Interaction priority | Energy intent |
|---|---|---|---|---|---|
| 01 | Warm Ivory, warm selected accent | Brief Bricolage, Offset Loop | Editorial Matte T0, 2D S0 | Safe load | Low-medium |
| 02 | Warm crafted editorial | Bricolage + invitation object | Keepsake/Editorial Matte, tactile S1/S2 as justified | Explicit Open | Medium |
| 03 | Warm accent-forward | Oversized Bricolage + small SVG fragments | Open canvas S0/S1, layered type | Clear continue | High selected peak |
| 04 | Warm Ivory with restrained accent | P1 portrait, supporting P2/P3 selectively | Editorial photographic surface S1, 2.5D | Face-safe reading | Medium |
| 05 | Warm / chosen cake palette | Cake hero, Bricolage tray | Tactile Sculpted T2 on cake only, S2 | Personalize | Medium-high interactive |
| 06 | Warm intimate dimming, not Hidden | Same cake + candle | Cake S2 + controlled glow | Wish extinguish | Medium emotive |
| 07 | Warm Ivory / paper | Newsreader letter | Keepsake Paper T0 reading, S0/S1 | Read at own pace | Quiet |
| 08 | Warm neutral/cool accent selected | Bricolage closing, optional callback | Matte S0/S1 | Complete birthday; optional discover | Low |
| 09 | Morph warm identity → Deep Plum | Offset Loop → segmented shapes | Depth increases, transition layers | Intentional gesture | Brief transition peak |
| 10 | Deep Plum / Graphite | Vault object, Bricolage keypad | Quiet Mechanical 3D, S3 | PIN; door opening | Focused mechanical peak |
| 11 | Graphite → warm paper | Folded paper, restrained type | Mechanical → Keepsake Paper, 3D→2D | Explicit letter selection | Calming |
| 12 | Warm paper after hidden | Newsreader confession | T0/S0 reading surface | Voluntary read/close | Quietest |

Energy numbers, if used in presentation, are **illustrative dramaturgical markers** only, not measured metrics or mandatory animation intensity. Scene 06 may transiently darken while remaining part of warm Birthday World. Scene 12 may restore light without undoing Hidden World's narrative continuity.

---

## 6. Responsive composition policy — LOCKED

**Mobile-first is a recomposition requirement.** Do not take a desktop editorial poster and apply proportional shrink. A scene may change the order, grouping, crop, tray placement, and amount of auxiliary decoration, but cannot drop essential content/interaction.

- **Mobile layout:** prioritize safe viewport bounds including notches and dynamic browser UI, avoid full-screen fixed heights that hide actions. Reflow long recipient names and letters without clipping. Minimum comfortable control hit areas; no critical affordance reachable solely by hover. Preserve visible UI focus and keyboard equivalents.
- **Desktop layout:** dynamic editorial asymmetry with deliberate overlap, but never cover reading text, face, cake hot zones, PIN input, or utility controls. Negative space useful for depth and narrative contrast.
- **Portrait:** focal coordinates responsive/asset-specific and not globally guessed; supporting photos optional/collapsible.
- **Cake:** large interactive stage and contextual controls remain spatially separate; tray doesn't cover the cake; limited valid zones responsive to object projection.
- **Reading:** scene navigation remains scene-based, but **internal/local content scrolling is allowed** in Scenes 07 and 12 and elsewhere when legally/accessibly necessary; never hijack local text scroll as next-scene trigger.
- **Vault:** stable camera/input, DOM numeric keypad and hint readable in portrait orientation; optionally widen/reflow on landscape/desktop; quality downgrade must preserve functional keypad and letter visibility.
- **Scene 08 discovery/09 gesture:** accessible alternative to drag. Lower motion/capability must not hide entry altogether once intentionally discovered.

No exact breakpoints, font sizes, paddings, safe area heights or focal coordinates are locked here; establish after device review.

---

## 7. Interactivity and state ownership

**Global:** SceneManager advances only via allowed state/intent; TransitionEngine owns entry/exit and cancellation, Zustand persists domain data. GSAP owns scene timelines, Motion owns local component feedback on non-competing DOM boundaries; Howler/AudioManager obeys valid user activation and mute setting. Do not run GSAP and Motion against the same `transform`/`opacity` on the same DOM node at once.

### 7.1 Suggested state graph (conceptual, not code)

```text
BOOT_READY
 → INVITATION_AWAIT_OPEN
 → BIRTHDAY_REVEAL
 → PORTRAIT_READY
 → CAKE_EDITING
 → CAKE_FINALIZED
 → WISH_FLAME_ON
 → WISH_EXTINGUISHED
 → BIRTHDAY_LETTER_READING
 → BIRTHDAY_END_COMPLETE
     ├─ exit/replay [birthday complete]
     └─ DISCOVERY_INTENT_CONFIRMED [optional]
         → HIDDEN_TRANSITION
         → VAULT_AWAIT_PIN
         → VAULT_UNLOCKING
         → VAULT_OPEN_LETTER_VISIBLE
         → LETTER_EXPLICITLY_SELECTED
         → CONFESSION_READING
         → QUIET_CLOSE / REPLAY
```

Two-phase Scene 08 and multiple Vault states **do not add scenes**, and the completed birthday path is independent. State transition events must be idempotent; cancellation reverts to valid state or deliberately completes a committed critical visual sequence; failures show recoverable controls. PIN is a narrative lock, not a confidentiality barrier. Public frontend assets and strings should not be represented as cryptographically protected by that PIN.

### 7.2 Input controls and interruptions

- Track drag with native Pointer Events, pointer capture/cleanup and touch behavior appropriate to selected gesture zones.
- Controls remain responsive; nonessential animation may cancel. Mandatory **intent** cannot be simulated by skipped animation.
- Avoid duplicate decoration on double placement, duplicate wish event, duplicate unlock, or multiple scene advances on tap spam.
- Blur/visibility changes pause or resolve animation at safe state, without losing finished cake or triggering next scene automatically.
- Safely allow fast-forward of purely cinematic beats after the underlying user action is authorized. Do not auto-complete required PIN, wish interaction or letter-opening action.
- Muting only changes audio output; it cannot remove information needed to understand the scene.

### 7.3 Replay and persistence

Carry full cake decoration between Scenes 05 and 06. For a **full replay**, default is to restore the intended beginning state including a fresh Cake Studio run and reset Vault/confession/audio timelines, consistent with the Cake Art Direction fragment; if later product testing recommends a replay variation, that requires explicit approval. Avoid accidentally carrying 'Vault already open' into new birthday playthrough.

---

## 8. Motion, accessibility, and performance production guardrails

- **Motion:** M0 immediate state; M1 local button; M2 tactile placement; M3 editorial entrance; M4 scene handoff; M5 limited cinematic payoff. **No new duration tokens locked.** Animation timings/easings are prototype calibration only. One primary T4 immersive zoom; scene 10 mechanical open is a separate articulated 3D object animation, not a second T4 zoom.
- **Reduced motion:** remove/par down parallax and camera dolly, replace broad spatial transforms with calmer reveal/fade, preserve meaningful visual result and state. In reduced-motion primary rendering, a simplified door movement or visible open-state handoff can replace heavy mechanical choreography without eliminating letter selection.
- **Keyboard and screen readers:** semantic buttons, name and visible instructions in DOM, visible focus, focus restoration when scenes/overlays change, reading text in accessible DOM, non-gesture route to Hidden, non-drag cake decoration, DOM PIN field/keypad, explicit letter selection.
- **Color/contrast:** exact color values stay inside color baseline. No decorative warm grey text over low-contrast mist, no tiny graphite-on-plum PIN error, no color-only feedback.
- **Audio:** never before intentional activation in Scene 02; optional sounds synchronize with physical events, stop on cancelled sequences; no reliance on sound/haptic to indicate candle out or door unlocked.
- **Assets:** preload scenes progressively, not full site upfront; Vault GLB late preload and isolated cleanup/disposal. Portrait variants responsive and optimized; avoid huge layered bitmap duplication. 3D quality degrades first by lighting/shadows per Vault locked priority, then other features/2.5D/DOM where necessary.
- **Fallback completeness:** every required story beat remains achievable at reduced capability; even if WebGL, mic, animation, haptic or sound fails, birthday experience, PIN, letter opening and closing still work.
- **Privacy:** photos are curated and authentic; do not expose unnecessary EXIF/geolocation or sensitive visual context, and do not claim frontend PIN provides real protection.

---

## 9. Anti-pattern rejection register

**Do not ship:** generic landing-page sections/cards; romance-first pink/gold embellishment; constant confetti/balloons; oversized decoration packs; mandatory looping movement; redundant immersive zooms; text masked behind foreground ornaments; inaccessible hidden swipe-only route; selfie/portrait face covered by SVG masks; a six-photo gallery built from two images; cake rebuilt as a different object in Scene 06; candle requiring microphone; fake cinematic pause before every scene; autoplay confession when PIN succeeds; static door mesh swapped for an open mesh without real opening in primary 3D; cyberpunk neon safe; camera wobble during PIN; tiny 3D raycast keypad as only input; confession Yes/No, deadline, required response; text auto-scrolling; forced musical crescendo; any asset/library added only to look impressive.

---

## 10. Acceptance gates: 12 must-pass criteria

> Gates are **QA requirements**, not claims of completed user testing. A static style guide alone does not satisfy them; verify with implemented mobile and desktop prototypes.

1. Prelude respects real load readiness; no deceptive progress or forced waiting when ready.
2. Invitation explicitly opens, accessible by touch/mouse/keyboard; sound only after lawful activation and mute is available.
3. Birthday Reveal makes confirmed recipient name central; no decorative effects dominate or clip it.
4. Portrait is intentional and complete with **one or two** genuine photographs; no empty slots, facial distortion or duplicate-memory illusion.
5. Cake Studio fully usable through touch, mouse, non-drag/keyboard path with clear validation and undo/remove/reset.
6. Wish displays the **same finalized cake configuration**; candles can always be extinguished without microphone, and state is consistent.
7. Birthday Letter fully readable without autoplay scrolling, forced timing or obstructed text/action.
8. Birthday finale stands independently; hidden content is not required or forced.
9. Hidden discovery requires positive user intent; no scroll-based accidental trigger; accessible equivalent available.
10. Vault PIN works in full and fallback modes; in **primary true 3D** the door **physically animates open on a 3D hinge/pivot** after a believable lock-release sequence.
11. Vault reveals a physical folded letter; confession never opens automatically without a distinct user selection.
12. Confession is fully legible and non-demanding with proper close/fade/replay controls; no response coercion.

### Cross-device test matrix (recommended, not completed)

- Short phone and tall phone; mobile portrait and landscape where supported; reduced motion; text zoom/accessibility font scaling; touch only; keyboard only; muted sound; mic denied; slow connection; low GPU / WebGL unavailable; interrupted drag; repeated taps; page background/foreground; asset load failure; photos 1/2/4/6; both short and long letter copy.
- Verify face-safe crop, cake control overlap, keypad visibility, focus restoration, memory disposal, scene idempotency, and unclipped long names.

---

## 11. Approved decisions versus explicitly pending production work

### LOCKED by user approval of Final Scene Audit

- 12-scene structure and four-act reading, without adding pages/routes.
- Per-scene emotional job, primary focus, scene-level material/typography/color/depth allocation.
- Transition intent map T1–T4 with **one signature immersive zoom** targeted to 08→09 after explicit confirmation.
- Responsive recomposition model; face-safe P1 photo composition supporting 1–6 photos (2 baseline).
- Cake mobile stage/bottom tray, desktop stage/side tray and stable same-cake Scene 05→06 state.
- User-paced, readable birthday and confession letters with local reading scroll when needed.
- A complete Birthday Ending and unobtrusive **Quiet Second Invitation** into optional Hidden World.
- Hidden drag threshold semantics with explicit non-drag accessibility route.
- Vault small dolly → stable DOM keypad → PIN `011007` → mechanical hinged animated 3D door → physical letter; letter-opening separately user-driven.
- Focus/keyboard/reduced-motion/fallback guarantees and twelve acceptance gates.
- No revised color, typography, SVG/shape, material, photo, cake or vault identities; no additional core libraries.

### PENDING — do not fabricate or silently lock

- Recipient final name, age/date, authenticated memories, birthday letter, ending and confession copy; significance and clue of PIN `011007`.
- Final composition measurements, font scales, button labels, breakpoints, layout coordinates, safe zone mapping and mobile frame behavior.
- Photos sourced, cleared, processed and face-safe focal positions; choice of actual P1/P2/P3/P4 variants per available photograph.
- Custom SVG assets, paper texture implementation, cake art, frosting details, decoration counts, placement anchors/collision map and final UI copy.
- Exact scene timelines, stagger, cubic-bezier curves, per-scene sound/music selection and synchronization details, wish flame/smoke calibration.
- Final hidden cue visibility/hint wording, gesture direction/distance/threshold and accessible-reveal pattern.
- Vault GLB geometry, rig/pivot naming, pivot orientation, precise movement/stop/collision, camera coordinates, lighting/PBR numeric parameters, PIN hint, letter mesh/projection, fallback rendering visuals, GPU/poly budgets.
- Full QA/prototype test evidence and any product changes after usability testing. **Prototype findings cannot quietly override locked design decisions; request explicit revision approval when needed.**

---

## 12. Integration handoff to consolidated `DESIGN_SYSTEM.md`

The final design system should **reference/import these eleven fragments** or merge them with a consistent precedence ledger, not rewrite each one from memory. Deduplicate definitions while preserving locked invariants; maintain canonical token tables for palette, fonts, materials and motion; link each scene to shared components and per-scene deviations; preserve incomplete production tokens as `PENDING`. Maintain one source of truth for transitions, cake state, vault letter consent, and fallback behavior.

Suggested next artifacts after consolidation (not created by this file): (1) final content/copy script; (2) scene wireframes/mobile+desktop; (3) component/asset inventory; (4) sequence prototype; (5) performance/accessibility QA plan; (6) implementation plan. None of these is a prerequisite to marking this **art-direction specification** LOCKED.

**Final principle:** *The experience feels made for one person because its details, pauses, interactions and choices all belong to the same story—not because every scene tries to impress.*

**Final status:** **SCENE-BY-SCENE ART DIRECTION v1.0 — LOCKED.**
