# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: VAULT ART DIRECTION

> **Status:** VAULT ART DIRECTION FRAGMENT v0.1 — **LOCKED DIRECTION**  
> **Internal name:** **The Quiet Keepsake Vault**  
> **Core formula:** Sculptural Monolith + Quiet Mechanical Precision + Intimate Paper Reveal  
> **Primary scenes:** 09 Hidden Transition → 10 The Vault → 11 The Hidden Letter → 12 Confession Ending  
> **Purpose:** Define object form, GLB production, material/light/camera language, PIN interface, mechanical opening choreography, physical letter handoff, and mobile/accessibility fallbacks without replacing prior locked decisions.  
> **Destination:** Future `DESIGN_SYSTEM.md` and scene-by-scene art direction.

---

## 0. Document precedence and explicit dependencies

This is the **tenth design fragment**, following nine locked fragments. It **extends**, and never overrides:

1. `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — twelve-scene, fullscreen, birthday-first flow; optional Hidden World; user-initiated discovery; PIN **`011007`**; a letter explicitly selected/opened by the user; no forced confession or demand for reply.
2. `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — Next.js/React/TypeScript; GSAP, Motion, Zustand, Howler; Three.js + R3F + Drei; `.glb`/glTF; scene lifecycle, AssetManager, CapabilityManager; mobile-first 3D → 2.5D → DOM fallback. PIN is narrative, **not security**.
3. `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — **Warm Kinetic Editorial Keepsake**, warmth > spectacle, personal > romantic, Birthday > confession; **Premium Minimal 3D Vault**; Hidden World as deeper layer of the same visual identity; no horror, bank-safe spectacle, or cyberpunk.
4. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` — Warm Graphite **`#2E2A2C`**, Deep Plum **`#352B37`**, Dusty Lavender **`#A79DCD`**, Soft Champagne **`#E6D4AC`** as scarce highlight; Warm Ivory **`#F6F1E8`** for paper; no new colors silently introduced.
5. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` — Bricolage Grotesque for UI/prompt; Newsreader for calm personal-letter reading; Shantell Sans only as rare human accent.
6. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` — Phosphor for functional UI; *Offset Loop* as recognizable open-loop-with-deliberate-interruption motif. Decorative 70/30 stroke/fill direction **does not apply to opaque 3D meshes**.
7. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` — **Soft-Structured Kinetic Geometry**; organic-to-segmented mechanical derivation. No wallpaper, arbitrary sci-fi pattern, or fake dashboard overlays.
8. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` — **Tactile Editorial Surfaces**; **M5 Quiet Mechanical** for Vault, **M4 Keepsake Paper** for letter. *Material family M5* is distinct from *motion class M5*.
9. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE.md` — **Controlled Cinematic Depth**, shadow **S3** for cinematic Vault, Background/Midground/Foreground + separate unobstructed utility overlay, static depth must survive reduced motion.
10. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MOTION.md` — **Choreographed Playful Precision**; instant M0 state, M1 keypad response, M5 cinematic mechanical payoff; GSAP scene/3D choreography, Motion local UI; safe cancellation, replay consistency, reduced motion, no long forced waits.
11. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_PHOTO_TREATMENT.md` — Scene 04 owns portrait; Vault does not require photos or add a second gallery.
12. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_CAKE_ART_DIRECTION.md` — Cake is warm tactile DOM/SVG 2.5D Scene 05–06; Vault deliberately supplies a distinct yet related *true 3D* visual climax.

**Hierarchy:** Flow defines **WHAT** happens; Tech defines capabilities; Design Direction and locked fragments define visual DNA; this fragment defines **HOW THE VAULT FEELS, LOOKS, AND OPENS**. Conflict => preserve higher-priority locked baselines and resolve implementation here.

---

## 1. Input record — 30 approved answers

| Questions | Answers | Design interpretation |
|---|---|---|
| 01–05 | D D D D D | Hybrid keepsake/monolith; soft geometric signature cut; hero scale with space; believable stylized mechanics; selective Offset Loop derivative |
| 06–10 | D D D D D | Matte body, restrained satin moving components; graphite structure/plum atmosphere; exceptionally sparse champagne; fine seams and sparse T1 detail |
| 11–15 | D D D D D | Minimal spatial chamber; warm key and subtle plum/cool separation; accessible medium-dark readability; nearly static environment; grounded suspension |
| 16–20 | D D D D D | Visually integrated keypad with robust DOM interaction; responsive tactile input; quiet Indonesian errors; sequenced controlled unlocking |
| 21 | D | Editorial-to-spatial reveal; not a camera orbit performance |
| **22** | **B** | **Small cinematic dolly** specifically approved; no continuous orbit |
| 23–24 | D D | Safe-to-fast-forward mechanical sequence; exposed **but unopened** letter; explicit user action before confession |
| **25** | **B** | **Physical paper keepsake** inside the Vault, not hologram or digital panel |
| **26** | **B** | **Externally authored GLB** is the primary model pipeline |
| 27 | D | Full 3D → 2.5D → DOM functional fallback |
| **28** | **C** | **Simplify lighting and shadow first** for weak GPU, then further degradation if needed |
| 29–30 | D E | Optional audio/haptic enhancement; emotion + accessibility + performance are hard constraints |

Approval following the questionnaire also **explicitly locks animated door opening**. Do not treat it as an optional flourish.

---

## 2. Design thesis — LOCKED

### The Quiet Keepsake Vault

**Sculptural Monolith + Quiet Mechanical Precision + Intimate Paper Reveal.**

The Vault is a compact, specially crafted object for one personal message; **not** a bank vault, complex puzzle, game reward chest, thriller door, or security terminal. It produces curiosity and anticipation; the warm physical letter carries the emotional meaning.

> **The vault creates anticipation. The letter carries the emotion.**

Priority order:
1. User-controlled discovery and optionality.
2. Letter visibility and emotional authenticity.
3. Legible PIN interaction and complete fallback.
4. Convincing **physical, animated** mechanical opening.
5. Curated premium 3D lighting and material craftsmanship.
6. Spectacle or decorative effects — only if they support the above.

**Never:** turn the optional confession into a forced reveal, introduce yes/no pressure, or conceal essential interactions behind artistic obscurity.

---

## 3. Object form — LOCKED

### 3.1 Silhouette

- **Compact soft-geometric monolith**; primarily rounded-square / deliberately proportioned compact box, softened edges, clean structural cuts.
- A single **signature interrupted cut/seam** acts as a recognizable shape accent.
- Visually stable and strong at narrow mobile widths; hero-sized **without swallowing the viewport or PIN controls**.
- Surface weight is calm and purposeful; limited panel divisions, no random rivets and no industrial bulk.
- A physically readable **door/panel edge and hinge or joint** makes the possibility of opening immediately understandable.
- Main door has genuine thickness, an interior-facing surface, and a credible hinge/pivot — not just a frontal plane disappearing.

### 3.2 Four functional object layers

1. **Structural Body:** matte graphite, rounded precision edges, deep but comprehensible box volume.
2. **Mechanical Core:** understated segmented ring/release detail derived from Offset Loop. It should suggest a real lock without simulating a complex bank mechanism.
3. **Integrated Keypad Surface:** hardware-like backplate, but input is provided by accessible DOM controls (not tiny 3D raycast targets).
4. **Interior Letter Chamber:** real cavity with depth and adequate line of sight to one physical folded letter when the door opens.

### 3.3 Signature Offset Loop — inheritance rules

- Preserve the **recognizable open loop + deliberate interruption** from Icon/SVG and Shape/Pattern fragments.
- Translate it into a **segmented release ring, structural contour, or calibrated mechanical seam**, not a logo pasted on top.
- Favor one primary motif occurrence on the Vault, with subtle related geometry only where required.
- Avoid holographic circles, orbiting glyphs, concentric HUD rings, sci-fi indicators, and decorative spinning unrelated to the lock.

---

## 4. Material, color, and texture — LOCKED DIRECTION

| Feature | Design treatment | Exclude |
|---|---|---|
| Outer body | Warm Graphite `#2E2A2C`, matte, controlled soft gradients from physical light | Wet plastic, polished black glass, industrial rust |
| Chamber/environment | Deep Plum `#352B37`, readable dark atmosphere, restrained tonal depth | Black-hole lighting, horror darkness, neon glow |
| Moving mechanism | Satin metal only on ring, seam, selected edge/bevel | Mirror chrome and constant reflective sweep |
| Color memory | Dusty Lavender `#A79DCD` selective mechanical/ambient relationship | New purple-blue sci-fi palette |
| Tiny luminous accent | Soft Champagne `#E6D4AC`, extremely scarce (globally below locked accent constraints) | Gold-luxury plating, decorative metallic excess |
| Physical letter | Warm Ivory `#F6F1E8`, **M4 Keepsake Paper**: subtle fold and edge relief | Hologram, torn antique parchment, scrapbook clutter |

- **M5 Quiet Mechanical** (material family) is matte-first; low-key highlights reveal edges and motion.
- **T0** clean functional type/controls; **T1** sparse object microtexture if warranted; never noisy fullscreen grain or compulsory heavy procedural noise.
- Material parameters (`roughness`, `metalness`, normals, texture sizes) remain **PENDING** for browser-based GLB validation.
- Champagne is an accent color and **not an instruction to simulate gold**.
- Do not add a new color palette or typography family to make the Vault feel “premium.”

---

## 5. Environment, lighting, and depth — LOCKED DIRECTION

### 5.1 Environment

- **Minimal spatial chamber**, not an explorable bank room. Negative space intentionally isolates the hero object.
- Darker and quieter than Birthday World while preserving the same editorial hierarchy and visual DNA.
- **Controlled suspension** is allowed, but a grounded contact/readability cue (soft contact or grounding shadow) is required; object must not look arbitrarily weightless.
- Atmosphere mostly still. At most one low-cost ambient treatment if it adds spatial meaning; no dust storms or perpetual particles.

### 5.2 Lighting

- One **soft warm key light** that describes primary geometry.
- Subtle cool/plum separation/fill only as required to maintain silhouette/readability.
- Restrained interior warmth provides a subtle visual shift when letter becomes visible. Not a beam of magical light.
- Bevel highlights and satin moving parts make the mechanism legible when the lock releases.
- Ensure usable contrast of PIN digits, status, hint and physical letter against darker surroundings.
- **S3 cinematic shadow** reserved for object scale and reveal; costly real-time shadows are expendable before usability is.

### 5.3 Depth hierarchy

- **Background:** chamber atmosphere/negative space.
- **Midground:** primary Vault body, door, and mechanism.
- **Foreground:** carefully limited depth cue and then exposed letter.
- **Independent utility overlay:** PIN, hint, error, skip/fast-forward, sound and accessible control layer; must remain readable, tappable and above 3D occlusion.

No camera trick should require inaccessible, rotating, or tiny UI targets.

---

## 6. Camera contract — LOCKED

### State A — Introduction Dolly

- **Small cinematic dolly** (question 22B); a short intentional reveal of depth and side geometry.
- Avoid free orbit, constant mouse-following, unbounded perspective shift, or camera circus.
- Dolly should not delay availability of essential interaction needlessly.

### State B — Stable PIN Composition

- Camera settles in a predictable front/three-quarter angle **before PIN entry becomes active**.
- **No camera movement during entry, error display or editing the PIN.**
- Preserve visual match between integrated-looking DOM keypad and 3D object on desktop and mobile; when difficult, prioritize independent accessible DOM input over perspective illusion.

### State C — Unlock Reframe

- After accepted PIN, permit **one small purposeful reframe** coordinated with mechanical opening, only if the door/chamber would otherwise be poorly visible.
- Camera motion is not a second immersive zoom. Motion fragment targets **one primary signature zoom** elsewhere (candidate Scene 08→09 after explicit gesture).
- Reduced-motion version uses a stable camera and clear state transition.

**PENDING:** camera exact coordinates, field of view, dolly distance, lens/projection choice, precise safe framing on phones.

---

## 7. PIN and keypad experience — LOCKED

### 7.1 Narrative input

- Correct PIN: **`011007`**, inherited from locked Flow. Preserve leading zero(s).
- It is a **story mechanism**, not secure storage; do not advertise it as cryptographic protection or assume public frontend PIN prevents source inspection.
- Hint is **personal and approachable**, not a hard mathematical puzzle. Exact hint text remains **PENDING** until its true significance is confirmed; do **not invent its meaning**.

### 7.2 Interaction implementation

- A visually physical keypad **with reliable DOM-based input**. Mesh appearance and input architecture are separate concerns.
- Touch, mouse, physical keyboard, and accessible button focus supported; semantic names and sufficient target sizes.
- Immediate M0 state update; brief M1 tactile press/highlight. Soft click sound optional and mute-respecting.
- Error feedback quiet, clear and in natural Bahasa Indonesia, e.g., **“Kodenya belum tepat. Coba lagi, ya.”** No shaking entire room, red flash, punishment timer, or dead end.
- Incomplete input should remain editable; digits are masked or displayed with an accessible clear state according to usability testing; no forced hidden guessing.
- Exact length and confirmation action should be obvious. Avoid repeated submits and duplicate unlock triggers.
- The keypad is not moving while the user types; if visual alignment cannot be reliable at mobile sizes, decouple the DOM controls from the mesh surface while preserving visual relationship.

### 7.3 State behavior

Suggested illustrative states (naming non-binding):

`idle → introducing → pin_ready → validating → rejected / unlocking → unlocked → letter_available → letter_selected → letter_opened`.

- Transitions are state-driven, idempotent and robust against repeated taps and interrupted scene animations.
- Wrong PIN returns to `pin_ready` with understandable feedback.
- Correct PIN triggers **one** unlock transaction; never one sequence per key repeat.
- `unlocked` is **not** the same as `letter_opened`.

---

## 8. NON-NEGOTIABLE mechanical door-opening animation — LOCKED

> **The Vault must physically open through a choreographed 3D mechanical sequence. A static door replacement, instant visibility toggle, or abrupt object swap is unacceptable in the primary 3D experience.**

This is an **explicit additional approval following the 30-answer audit**. The finished Vault MUST NOT behave like a static modal with an image replacement.

### Four-beat opening choreography

1. **PIN Recognition** — valid PIN commits immediately, final key receives brief tactile/visual acknowledgment; optional precise click. Avoid celebratory color explosions.
2. **Mechanical Release** — segmented Offset Loop / lock core makes a short calibrated rotation or indexed movement; compatible locking components retract/shift in meaningful order. Components **must not all animate simultaneously for show**.
3. **Door Opening** — the **same physical 3D door mesh rotates around its authored hinge/pivot**, gradually exposing interior thickness and chamber. Movement starts with perceived weight, then eases into a controlled stop. **This rotation is mandatory for the primary 3D implementation**. Optional short dolly/reframe is subordinate to the opening.
4. **Letter Reveal** — warm interior light cues the single folded paper letter, now clearly visible and selectable. Door reaches a stable open state, audio resolves, the user regains complete control. **No automatic opening of the letter.**

### Choreography timing (PENDING — reference calibration only)

- PIN acknowledgment: ~0–0.2 s
- Mechanical release: ~0.2–0.7 s
- Door rotation: ~0.7–1.7 s
- Letter revelation: ~1.5–2.1 s (overlaps with end of door motion)
- **~2 seconds is an early prototype target, not a hard production token**. Final timings/eases require testing on real phones; sequence may be sped up without losing narrative meaning.
- Match Motion class **M5** (cinematic payoff), but preserve M0 action certainty and interruption/fast-forward rules. No needlessly long cinematic hold.

### Animation geometry and realism contract

- Door has a **real 3D hinge pivot**; hinge side is consistent with seam/door cut and allows believable clearance.
- Unlock precedes physical opening; visually implied latch engagement must not contradict door rotation.
- Real door and chamber remain present before, during, and after animation: **no mesh swap posing as opening**.
- Door-open end angle must reveal paper from the intended camera framing without covering key utility controls.
- No penetration of adjacent structural geometry; approximate mechanical plausibility is enough, not engineering-grade safe design.
- Shadow/highlight respond consistently to moving parts where affordable; baked/cheap cues allowed in Lite tier.
- Door remains open in stable `unlocked` state until next deliberate action; do not silently close on a timer.
- Audio cues follow animation/state milestones but are **not required for completion**.

### Input and interruption contract

- Repeated correct-PIN submissions never restart or duplicate lock, door, or letter effects.
- **Skip / fast-forward** may drive animation to its canonical fully-open resting state; it **cannot** bypass PIN validation or select/open the letter.
- Background/tab pause must reconcile actual state on return without replaying a destructive sequence or leaving a half-open broken door.
- On interruption, settle deterministically to the nearest valid scene state or canonical completed-open pose when appropriate.
- `prefers-reduced-motion`: show a simplified **perceivable opening state transition** (e.g., direct end-pose or short non-spatial reveal) with clear success feedback. Do **not** force sweeping camera or prolonged door rotation.
- Low-performance 2.5D fallback should **animate an opening panel/hinge impression** when motion is allowed; bare DOM fallback may use simple accessible disclosure/reveal rather than a fake 3D effect.

---

## 9. Physical keepsake letter — LOCKED

- **Physical paper keepsake** (answer **25B**) is visibly inside the Vault. One folded note/envelope; no hologram, glowing chat window, generic dashboard card, or confetti reward.
- Warm paper texture/fold/edge relief inherits material family **M4 Keepsake Paper**, preserving editorial simplicity.
- Door opening makes the letter discoverable, **not readable automatically**. It is an *invitation* to open, not consent to show confession.
- User **explicitly taps/clicks/selects the letter** before Scene 11/12 letter-opening transition. Keyboard equivalent required.
- On selection, the physical prop hands off to a comfortable, calm, high-contrast **2D editorial reading surface**; do not render long text directly on an angled 3D sheet.
- Use **Newsreader** for personal reading, Bricolage only for supportive UI; typography remains part of the same system.
- Do not add an immediate yes/no question, timer, required response, or autoplay confession. Users can pause/close without coercion.
- Keep reveal choreography calmer than Vault door mechanics: the letter, not the model, is the ultimate focus.

### Scene interface contract

`Scene 09 user-driven Hidden Transition → Scene 10 PIN + mechanical 3D door open → stable exposed physical letter → Scene 11 explicitly chosen physical letter → Scene 12 user-paced confession text/ending`.

The exact boundary between selecting, unfolding and transitioning Scenes 11–12 follows the locked Flow and later scene-by-scene choreography; never collapse explicit selection into PIN success.

---

## 10. GLB production pipeline — LOCKED DIRECTION

### Preferred approach

**Externally authored GLB** (answer **26B**) is primary; avoid replacing it with a giant runtime procedural safe. Runtime procedural meshes or local UI layers may supplement where materially useful.

### Recommended authored hierarchy (illustrative; exact node names pending)

```text
VaultAsset.glb
├── Body_Static
├── Door_Pivot                 # animated hinge transform
│   ├── Door_Mesh              # visible thickness + front/back
│   └── Door_MechanicalDetail
├── Lock_Core                  # independent release pivot
├── Segmented_Ring             # Offset Loop mechanical derivative
├── Locking_Bolts              # optional, only if visually motivated
├── Keypad_Backplate           # visual mesh; DOM handles accessible input
├── Interior_Chamber
├── Letter_Prop                # folded physical paper
└── Detail_Meshes              # sparse only
```

- Author hinge origins, parent transforms, orientation, rotation limits and opening clearance **before export**.
- No “single mesh for entire box” if it prevents physically animated opening.
- Use glTF-compatible PBR materials and reasonable baked support; avoid large costly custom shaders unless prototype demonstrates a need.
- Optimize meshes/textures; Meshopt/Draco/texture compression only as fits existing tech pipeline.
- Validate animated nodes and lighting **in browser**, on target mobile hardware, not solely in modeling software.
- Model assets are lazy loaded/prefetched in hidden phase, **not blocking initial birthday load**.
- Exact polygon, atlas, texture memory and draw-call budgets remain **PENDING** for device profiling.

---

## 11. Runtime ownership, state, and audio — LOCKED

- **Zustand / experience state** is source of truth for PIN, lock, door, letter selection and scene progression. A particular door angle is visual representation of committed state, not the authoritative state itself.
- **R3F/Three.js** owns 3D rendering, scene graph transforms and lighting.
- **GSAP** orchestrates named 3D object and camera transforms and state-driven scene timeline; **Motion** handles isolated DOM microfeedback. Never let both mutate the same transform/opacity owner.
- **Howler/AudioManager** coordinates optional low-key mechanical cues respecting mute, consent/gesture policies and tab visibility. No dependence on sound for understanding.
- Optional haptic only where supported and appropriate; lack of haptic/audio cannot reduce core functionality.
- AssetManager loads/disposes model resources according to SceneManager lifecycle; no memory leaks across Replay.
- Enter/exit/cancel/focus-loss must be reconciled with the transition state machine; no duplicate triggers.

---

## 12. Performance, fallback, and accessibility — LOCKED

### Tier 1 — Full true 3D

- Authored GLB, PBR, restrained real-time lighting/shadow, small dolly, actual hinge rotation and sequential release.
- Device capability, thermal behavior and battery/performance constraints apply.

### Tier 2 — Lite true 3D

- **First simplify lighting/shadow** (answer **28C**) and excessive postprocessing, preserving door movement and visual legibility.
- Substitute baked cues where appropriate; also reduce resolution/effects or geometry if profiling shows it necessary.
- Same committed unlock state and letter-selection rules as Tier 1.

### Tier 3 — 2.5D Vault

- Layered image/SVG/DOM objects emulate **opening door/panel** with a short, meaningful reveal when motion is allowed.
- DOM PIN and letter selection remain complete. No dependency on GLB or WebGL.

### Tier 4 — DOM minimal

- High-contrast, semantic keypad/status and accessible disclosure of letter. Graceful, simple transition; story remains finishable.

### Hard guarantees

1. No WebGL support, muted audio, device throttling, reduced motion, focus changes and asset failures must **never** block PIN → unlocked → user-selected letter → ending.
2. Use keyboard semantics, visible focus, readable prompt/errors and suitable touch targets.
3. Avoid scroll trapping, unreliable 3D raycasting, excessive contrast loss, forced hover or precise dragging.
4. Use stable camera during input; accessible DOM utility layer has independent z-order and cannot be covered by the moving door.
5. No compulsory microphone, motion, audio or haptic for Vault.
6. Do not equate disabling expensive visual effects with disabling the animated opening in normal full 3D capability. Only explicit reduced-motion and fallbacks appropriately simplify choreography.

---

## 13. Scene separation and narrative relationship — LOCKED

| Scene | Vault-related visual intent | Forbidden regression |
|---|---|---|
| 08 Final Birthday Moment | Birthday closure / false ending | Pre-reveal confession or mandatory hidden link |
| 09 Hidden Transition | Explicit deliberate user gesture opens the deeper layer, signature zoom candidate | Browser-scroll accident or automatic hidden progression |
| **10 The Vault** | Premium minimal true-3D hero; stable PIN; **real mechanized door opening** and exposed paper | Instant panel swap, static model, inaccessible keypad, automatic letter open |
| **11 The Hidden Letter** | Physical paper selected intentionally; gentle handoff to readable 2D letter | Autoplay confession triggered by unlock |
| 12 Confession Ending | Calm message, no pressure/required answer; warm closure/replay | Romance-first conversion funnel, forced accept/reject |

**Narrative material contrast:** Birthday cake = warm and soft 2.5D tactile; Vault = quiet/precise true 3D mechanical; letter = warm matte tactile editorial. They are **three expressions of the same visual language**, not separate design systems.

---

## 14. Anti-patterns — explicitly forbidden

- Generic giant circular bank safe with heavy bolts, fake cyber-security interface, sci-fi HUD or neon ring spam.
- Static image change or display toggle **instead of actual 3D hinged door opening** in the primary tier.
- Camera orbit spinning around the object, constant camera-follow, extreme dolly, motion-sickness-inducing zoom.
- Tiny 3D-mesh keypad requiring precise raycasts; unreadable dark labels.
- Unclear PIN meaning invented by the designer; misleading claim that PIN protects secret data.
- Long unskippable cinematic wait, UI becoming unusable during focus loss, repeat tap causing duplicated timelines.
- Full 3D letter with microscopic/moving readable text, or letter opening without the user choosing it.
- Metallic-gold wedding aesthetics, mirror chrome, industrial grime, haunted-bank mood, glassmorphism, unrelated visual brand.
- Heavy postprocessing, noisy fullscreen texture, persistent particles, gratuitous shaders and audio-dependent success.
- Adding a new scene, new UI framework or new color/font family just for Vault.

---

## 15. Acceptance criteria — implementation review checklist

1. Model reads visually as a personal premium keepsake Vault at mobile size, not bank vault or game item.
2. Outer object maintains recognizable **soft-geometric monolith**, minimal mechanical cuts, Offset Loop derivative.
3. Surface uses graphite/plum matte-first finish; satin is localized; champagne remains sparse and non-gold.
4. Camera gives a **small purposeful dolly** on entry and becomes fully stable before keypad use.
5. Keypad is accessible on touch, mouse and keyboard; wrong PIN feedback is clear and in Bahasa Indonesia.
6. Input `011007` validates exactly, retaining zeros; repeat completion triggers only one unlock.
7. In main 3D tier, **core release animates first and the door physically rotates on its authored hinge/pivot**, revealing genuine interior geometry. No model swap or abrupt visibility replacement.
8. Animation feels mechanical and choreographed rather than stiff; movement is not unnecessarily long; sound is optional.
9. After door opens, a **physical folded paper letter remains visibly present** in the chamber.
10. Confession does **not** appear until the user explicitly selects/opens the letter; the user can stop.
11. 3D→2.5D→DOM fallback retains correct PIN, opening state, letter access and full story progression.
12. Lite tier prioritizes **shadow/lighting reductions**, then other necessary optimizations while maintaining legibility.
13. Reduced-motion version retains state clarity without required camera movement or long hinged rotation.
14. High-frequency taps, skip, focus-loss and replay cannot break door/letter state or leak resources.
15. Letter text transitions to a comfortable 2D reading surface with correct font and contrast.
16. No new visual DNA, no photo dependency and no precedence conflicts with existing fragments.

---

## 16. LOCKED vs PENDING register

### LOCKED — decision authority

- **The Quiet Keepsake Vault** — sculptural monolith + quiet mechanical precision + intimate paper reveal.
- Compact soft geometric monolith; one controlled signature interruption; believable seam/door and internal chamber.
- Mechanical Offset Loop derivative, subtle rather than branded glowing ring.
- Warm Graphite/Deep Plum base, restrained satin metal and extremely limited Champagne detail.
- Minimal spatial chamber, warm key with subtle separation, readable dark UI and purposeful negative space.
- **Small cinematic camera dolly**, static during PIN and optional small unlock reframe.
- Reliable accessible **DOM-backed visually integrated keypad**; PIN `011007` and quiet Indonesian error state.
- **Mandatory true-3D animated hinge door opening**, preceded by mechanical release and followed by physical paper reveal; no image swap in primary tier.
- Physical keepsake letter, visible on opening, **not automatically opened**; explicit user selection required.
- **Externally authored GLB preferred**, authored motion pivots and browser-validated scene graph.
- Lighting/shadow reduction prioritized on weak GPUs; 3D→2.5D→DOM fallback; reduced-motion and sound-independent completion.
- Narrative optionality and design consistency with all previous baselines.

### PENDING — prototype / scene-specific art direction

- Exact monolith proportions, dimensions, seam profile, hinge placement and final letter-chamber geometry.
- Exact GLB node/material names, model topology, texture atlas and asset export tooling.
- Specific lock mechanism kinematics, rotation angles, pivots, clearances, stop position and any auxiliary bolt count.
- Precise PBR roughness/metalness, light intensity/position, baked cues and shadow implementation.
- Camera coordinates, field of view, small dolly distance, framing breakpoints and reframe amount.
- Exact keypad layout, confirm control and valid context-grounded PIN hint wording.
- Exact opening duration/easing/audio sync; the ~2s reference is **not** a hard token.
- Exact 3D letter form, fold/unfold choreography, focus and reading-surface handoff specifics.
- Per-device polygon/texture/draw-call budgets, quality-tier thresholds, render pause strategy.
- Final 3D asset, scene composition, animation prototype and acceptance testing.

PENDING items may be tuned without violating LOCKED identity or the mandatory physically animated 3D door contract.

---

## 17. Final direction and next phase

> **The Vault must earn the opening through real, restrained mechanical motion. The letter earns its meaning through the recipient's deliberate choice to read it.**

**Status:** **VAULT ART DIRECTION v0.1 — LOCKED.**  
**Fragment count:** **10 design fragments LOCKED.**  
**Next:** Scene-by-Scene Art Direction → then integrate into `DESIGN_SYSTEM.md`, honoring the individual locked fragments and their precedence.
