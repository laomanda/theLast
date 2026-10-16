# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: MOTION SYSTEM

> **Status:** MOTION SYSTEM FRAGMENT v0.1 — **LOCKED DIRECTION**  
> **Design identity:** **Choreographed Playful Precision**  
> **Motion thesis:** **Responsive Interaction + Editorial Rhythm + Selective Cinematic Choreography**  
> **Parent direction:** Warm Kinetic Editorial Keepsake  
> **Future destination:** `DESIGN_SYSTEM.md`  
> **Scope:** motion personality, choreography grammar, motion classes, transition families, easing and timing direction, interaction guarantees, ownership, audio cues, interruption, accessibility, performance, and scene-level intent.

## 0. Document dependencies and boundaries

This fragment extends, not replaces:

1. `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — 12-scene, birthday-first narrative; hidden confession remains optional.
2. `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — Next.js/React/TypeScript, GSAP, Motion, Zustand, SceneManager/TransitionEngine, SVG, R3F/Three, Howler, native pointer events, progressive enhancement.
3. `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — *Warm Kinetic Editorial Keepsake*, medium energy, *Playful Precision*, major moments choreographed.
4. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` — muted-but-confident dual accents; no neon or new palette introduced by motion.
5. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` — Bricolage as energetic identity, Newsreader as calm intimate reading, Shantell as rare human trace.
6. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` — Phosphor functional icons; Offset Loop; 70% stroke / 30% fill as decorative SVG direction.
7. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` — *Soft-Structured Kinetic Geometry*; loop-derived shape continuity and organic-to-mechanical evolution.
8. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` — *Tactile Editorial Surfaces* and selective material-state feedback.
9. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE.md` — *Controlled Cinematic Depth*, three logical spatial planes plus utility overlay, selective depth, shadow classes S0–S3.

**Boundary:** This document locks motion *rules and intent*. Exact per-scene frame choreography, final curves, exact asset timings, and final audio cues remain production/art-direction work. The motion system must not introduce new scenes, navigation by browser scroll, compulsory confession, or new animation libraries.

## 1. Governing principle

> **The experience should feel alive because it responds and unfolds—not because everything moves.**

> **UI feels responsive. Major moments feel choreographed.**

Priority order:

1. User intent and completion of essential interaction.
2. Emotional clarity and narrative comprehension.
3. Accessible, readable visual hierarchy.
4. Smooth mobile performance.
5. Editorial rhythm and cinematic spectacle.

**Locked personality:** Birthday World: alive, warm, medium-energy, tactile, precise. Hidden World: quieter, slower, restrained, with occasional decisive mechanical motion. The latter belongs to the same motion language, not a separate cinematic genre.

## 2. Three complementary motion modes

### 2.1 Playful Response
Fast-to-understand response for button/toggle, cake item selection, drag/drop, placement, candle interaction, and local controls. Responsive and tactile, not bouncy or arcade-like.

### 2.2 Editorial Rhythm
Typography, photography, Offset Loop, editorial frames, and compositional layers enter/exit as coordinated visual groups. Motion reinforces hierarchy rather than assigning an arbitrary effect to every element.

### 2.3 Cinematic Restraint
Rare, deliberately timed moments: Birthday Reveal, the intentional Hidden Transition, and Vault unlock. Dramatic weight comes from timing, space, and meaningful consequence—not from constant movement or excessive length.

## 3. Locked motion classes M0–M5

| Class | Role | Examples | Direction |
|---|---|---|---|
| **M0 — Instant State** | Immediate functional state | PIN digit, selection confirmation, validation | State updates immediately; animation must not delay correctness |
| **M1 — Micro Response** | Tiny feedback | button press, icon state, sound toggle | crisp, tactile, short |
| **M2 — Interactive Motion** | User manipulation | cake drag, decoration snapping, seal manipulation | pointer-led, responsive, gentle settling |
| **M3 — Editorial Reveal** | Reveal composed content | typography, photograph, SVG mask | coordinated, hierarchy-led |
| **M4 — Scene Transition** | Handoff between scenes | crossfade, clip, layered movement | smooth, deterministic, purposeful |
| **M5 — Cinematic Payoff** | Rare story climax | main reveal, signature zoom, vault mechanism | deliberate, memorable, interrupt-safe |

**Rule:** Motion class indicates narrative/functional role, not required use. No automatic M5 for each scene. M0 should never wait for animation to complete before updating app state.

## 4. Duration tiers — provisional calibration, not production tokens

| Tier | Starting target |
|---|---:|
| M0 | synchronous/instant logical state |
| M1 | ~90–180 ms |
| M2 | ~160–350 ms for settle/feedback; continuous drag tracks pointer |
| M3 | ~350–800 ms |
| M4 | ~500–1100 ms |
| M5 | ~900–1800 ms for initial visual choreography only |

Ranges overlap intentionally and may change after mobile/device testing. They do **not** cap user-paced wishing, reading, cake customization, or the full vault interaction. No fixed timer should force progression during personal reading or interrupt required actions. Anticipatory holds are limited to meaningful reveals and must not feel like artificial waiting.

## 5. Easing families — locked personality, exact curves pending

1. **Responsive Ease:** immediate reaction, decisive arrival for functional UI.
2. **Tactile Settle:** soft placement/snap, optional small overshoot, never repeated childish bounce.
3. **Editorial Ease:** restrained acceleration/deceleration for masks, typography, and layered composition.
4. **Cinematic Ease:** weighted, choreographed space and pace for major transitions/mechanics.

Avoid one universal ease and avoid unrestricted per-element curves. Exact cubic-bezier/GSAP ease strings belong to the production token pass.

## 6. Transition grammar T1–T4

| Family | Function | Preferred contexts |
|---|---|---|
| **T1 — Editorial Crossfade** | Quiet continuity, reading-first transitions | letter scenes, calm closures |
| **T2 — Mask / Clip Reveal** | Reveal as discovery; shape-driven | type/photo, selected scene entry |
| **T3 — Layered Spatial Handoff** | Transfer visual focus across planes | portrait, cake, editorial object handoffs |
| **T4 — Signature Immersive Zoom** | Exceptional entry into deeper narrative layer | primary **candidate: Scene 08 → 09** |

**Signature zoom policy:** Target **one primary immersive zoom** for v1; do not proliferate zoom effects. Exact placement remains pending until scene choreography prototype. If Scene 08 → 09 is chosen, it must occur **after the user's deliberate hidden-layer gesture**, never open the confession route automatically.

**Offset Loop policy:** recurring continuity may use masking, path/reveal, and soft-to-mechanical transformation. The loop is a recognizable motif, not obligatory in every transition. Preserve loop-plus-deliberate-interruption geometry. Motion shall not introduce a competing recurring logo/motif.

## 7. Editorial choreography rules

- Establish one primary focus; secondary elements support, never compete.
- Compose typography, shapes, photographs, and effects as coordinated groups, not random per-element stagger.
- **Bricolage:** may use selective mask/clip, tracking, variable-axis adjustments, and layered scale in display moments.
- **Newsreader:** calm opacity/mask/line reveal, then static reading; no every-word bounce, auto-scroll, or continuous motion.
- **Shantell:** rare handwritten trace; no large kinetic handwritten headlines.
- Editorial occlusion may touch display typography, but **body text, interactive affordances, contrast, and focus indicators stay readable**.
- Ambient motion is not a substitute for compositional hierarchy.

## 8. Interaction guarantees

### 8.1 Pointer, touch, and gesture
- Dragged objects track the pointer/finger directly; visual inertia must never make the controlled object feel detached.
- Optional magnetic guidance and gentle snapping occur around placement, not as physics-heavy motion.
- Support tap/hold/swipe equivalents where appropriate; native Pointer Events remain the baseline.
- Detect cancellation and invalid placement; restore correct stable state.
- All important interactions need clear feedback for accepted/rejected/complete actions in natural language where visible.

### 8.2 Cake Studio — Scene 05
- M1 item selection; M2 direct drag/tap placement, soft settle, and contact response.
- User-configured cake remains the single source for Scene 06; neither transition nor animation may reset decorations.
- Duplicate touches/transitions cannot duplicate decorations or corrupt placement state.
- Controls remain contextual, not a persistent dashboard.

### 8.3 Make a Wish — Scene 06
- Continue with the **same completed cake**.
- Environment dims and candle light responds with restrained cinematic warmth.
- Extinguish creates readable payoff (light diminishes, modest smoke or equivalent); no heavy particle spectacle.
- Optional microphone blow detection **never replaces** tap/hold fallback.
- No automated timer that dismisses the user's wish.

### 8.4 Vault — Scene 10
- PIN `011007` is a narrative gate, not security protection.
- On correct PIN: clear M0 feedback, one controlled mechanical unlock sequence, synced with purposeful SFX.
- Unlock can feel weighty and decisive without excessive autoplay duration; make completion/recovery deterministic.
- If 3D fails, 2.5D/DOM fallback must still support PIN, unlock, and letter access.

### 8.5 Hidden Letter — Scenes 11–12
- The Vault may expose/present a **sealed letter** after unlock.
- **Do not automatically unfold/open confession.** User must explicitly tap/activate the letter again.
- Letter emergence may use a restrained floating/settling motion; reading is calm and user-paced.
- No acceptance/rejection CTA, coercive countdown, or pressured response.

## 9. Ambient motion budget

- Default: static or barely moving composition.
- **At most one dominant ambient motion system active per scene at a time.** Supporting incidental effects must not form competing visual loops.
- Avoid constant breathing typography, perpetual parallax, ceaseless decorative rotation, and animated noise.
- Fade/cancel idle motion when a major interaction or narrative reveal takes focus.
- Stop invisible/offscreen work during scene exit and cleanup.
- Where ambient motion adds no hierarchy, atmosphere, or narrative meaning, remove it.

## 10. Spatial motion and depth alignment

- Respect **Controlled Cinematic Depth**: motion should clarify the background/midground/foreground relationship, not maximize Z travel.
- Static composition must work without parallax.
- Prefer lightweight transform/opacity where possible; selective SVG masks/clips only where justified.
- Use parallax and perspective selectively for portrait, hero objects, and transitions; avoid several costly spatial systems simultaneously.
- One primary depth-hero effect at a time per scene.
- The 3D Vault remains the true-dimensional climax; do not escalate every previous scene into WebGL.
- Preserve utility controls above decorative occlusion and safe-area boundaries.

## 11. Motion ownership and implementation boundaries

**GSAP owns:** scene/master timelines, major composition sequences, SVG masks/reveals, spatial transitions, immersive zoom, cinematic object choreography.

**Motion owns:** component-local interaction, button/toggle, transient UI feedback, component-level presence.

**Zustand owns:** persistent application/experience state, never GSAP timelines.

**SceneManager / TransitionEngine own:** active scene status, transitions, lifecycle, cancellation, cleanup, and progression guarantees.

**Howler/AudioManager own:** sound state, user-gesture-gated playback, volume/fade, event-triggered SFX.

**Nonnegotiable ownership rule:** **One animation owner per property per DOM node at a time.** When both systems are necessary, separate transform domains with nested wrappers or delegate fully to one owner. Do not animate competing `transform` or `opacity` on the same node from GSAP and Motion.

Suggested conceptual scene states:

```text
preloading → preparing → entering → active → exiting → cleaned
                      ↘ interrupted / recovered ↗
```

State transitions must be defined and idempotent; lifecycle labels are guidance, not a mandate for a new state-management library.

## 12. Interruption, repeated input, and fast-forward policy

- **User intent outranks nonessential animation.** Essential state commits must not depend on uninterrupted visual timelines.
- Double-tap on Continue/Done or repeated PIN validation must not start duplicate transitions or sound effects.
- During exiting/entering, queue, ignore with explicit feedback, or cancel input according to an intentional interaction policy—never leave it ambiguous.
- Drag cancel/scene interruption restores stable object placement and store state.
- Reversible editorial animations may be cut short; completed essential actions cannot be undone accidentally by cleanup.
- Consider skip/fast-forward for major passive reveals while preserving mandatory gestures, PIN, and intentional opening of the letter.
- Replay must restart scene animation state cleanly without stale timeline callbacks.
- On browser visibility loss, pause/suspend appropriate visual loops and synchronize safely on resume; no blind replay of old transitions.

## 13. Audio synchronization

- Audio starts only after the required valid user gesture; autoplay rules are respected.
- SFX tie to semantic moments: accepted placement, candle extinction, lock engagement/unlock, folded letter action.
- Sound enhances tactile weight and anticipation but never replaces visual/accessible feedback.
- Cancelled/interrupted timelines must not leave hanging sound or unintended repeats.
- Missing/muted sound must never block completion.
- Final cue placement, audio assets, mix, and exact timeline synchronization remain pending.

## 14. Accessibility and reduced-motion policy

- Honor `prefers-reduced-motion` and relevant device capability tiers.
- Retain essential state-change feedback; replace intense zoom/camera travel/parallax with clear low-motion fade or static reveals.
- Reduced motion does **not** remove static hierarchy, spatial composition, or meaningful controls.
- Avoid strobing, flashing, repetitive oscillation, and forced reading pace.
- Buttons, keypad, letter, and cake interactions remain usable via relevant input alternatives and clear focus feedback.
- User must not be forced to use a microphone to extinguish candles.
- Provide interruptible/skip policy for passive cinematic moments as appropriate.

## 15. Progressive performance rules

- Mobile-first; prefer compositor-friendly transforms and opacity for frequent UI motion.
- Avoid heavy blur, continuous SVG morph, multi-layer parallax, unbounded per-letter animation, full-screen shader effects, or 3D scene overlap unless validated.
- AssetManager phases loading; Vault 3D must not delay the beginning of Birthday World.
- Stop/cancel offscreen animations on scene exit and release listeners/timelines.
- Degrade decorative effects before interaction clarity and scene completion.
- Never introduce Anime.js, Lenis, physics engines, dedicated parallax engines, or additional particle libraries merely for effect diversity.

## 16. Scene-by-scene motion intent (not final choreography)

| Scene | Primary motion role | Guardrail |
|---|---|---|
| **01 Prelude** | concise editorial curiosity, restrained progress | no long generic loading animation |
| **02 Invitation / Open** | tactile user-initiated opening | audio begins only after gesture; input responsive |
| **03 Birthday Reveal** | major type-led reveal (M3/M5) | no uncontrolled confetti/kinetic overload |
| **04 Portrait / Memory** | layered photo reveal, gentle spatial handoff | portrait remains focal; parallax optional |
| **05 Cake Studio** | direct manipulation and tactile settling (M1/M2) | no physics-heavy game or state duplication |
| **06 Make a Wish** | dimmed ambience, candle/glow response, extinction payoff | preserve decorated cake and non-mic fallback |
| **07 Personal Birthday Letter** | quiet reading reveal | no word-by-word dramatic kinetic text |
| **08 Final Birthday Moment** | closure and deliberate stillness | false ending must feel sincere, not bait |
| **09 Hidden Transition** | explicit gesture → gradual depth, T4 zoom candidate | never reveal hidden content automatically |
| **10 Vault** | controlled mechanical choreography, synced audio | 3D fallback; PIN and interaction always functional |
| **11 Hidden Letter** | sealed letter comes forward and settles | user must intentionally open it |
| **12 Confession Ending** | still, readable narrative; quiet closure/replay | no response pressure or cinematic manipulation |

## 17. Specific compatibility constraints

### Flow
No automatic entry to Hidden World; no forced confession. Scene 05 cake and Scene 06 wish share the same state. Vault and letter each require the expected user action.

### Design Direction
Preserve *Playful Precision*, medium energy, warm/personal priority, and editorial compositional confidence. Spectacle is secondary to warmth.

### Color
Animation does not create new neon gradients, sharp gold glints, or palette-breaking effects. Warm and cool accents follow scene ownership. Hidden retains restrained chromatic memory.

### Typography
Bricolage may act as kinetic composition; Newsreader must prioritize reading comfort; Shantell remains a tiny personal mark. No auto-typing coercive confession.

### Icon & SVG / Shape & Pattern
Offset Loop can animate as an occasional signature mask/reveal; its silhouette/offset logic must remain recognizable. Avoid icon wiggle spam and motion-based decorative duplication.

### Material & Texture
Interactive finish transitions reflect actual state changes; static matte/satin surfaces need not shimmer. Grain texture is not a continuous animation.

### Depth / Shadow / Surface
Motion reflects three logical planes and S0–S3 shadow function. Contact response is for tactile objects; cinematic depth is selective. True 3D is reserved primarily for Vault.

### Technical architecture
Maintain GSAP/Motion ownership, scoped timeline cleanup, layered fallbacks, store-driven state, and mobile performance protections.

## 18. Anti-patterns / hard prohibitions

- Every element perpetually moving.
- Long cinematic waiting after ordinary UI action.
- Bounce spam, random easing, decorative particle storms.
- The same zoom or mask transition repeated in every scene.
- Heavy background animations behind long-form letters.
- Auto-opening the confession after Vault unlock.
- Animation-gated essential state or unrecoverable gesture dead ends.
- Mixed GSAP and Motion ownership of the same property/node.
- Ambient audio/SFX firing repeatedly when a timeline is restarted.
- Performance-intensive tricks that undermine mobile completion.
- Introducing new libraries merely to diversify motion.

## 19. Locked versus pending

### LOCKED — direction and constraints

- **Choreographed Playful Precision** motion identity.
- Three modes: Playful Response, Editorial Rhythm, Cinematic Restraint.
- Functional/narrative motion classes **M0–M5**.
- Four easing **families** (not exact bezier values).
- Four transition families **T1–T4**.
- One **primary** immersive zoom target for v1; strongest candidate Scene 08 → 09, subject to choreography validation.
- Offset Loop as selective continuity, not constant spectacle.
- User-controlled Cake, Wish, PIN, and Hidden Letter interactions.
- GSAP = scene choreography; Motion = local component motion; Zustand = state.
- One owner per animated property on a given DOM node at a time.
- Interrupt/cancel/restart handling, duplicate-input safety, and state-driven transition completion.
- Ambient motion budget; narrative clarity and mobile usability outrank effects.
- Audio follows valid user action and semantic animation state; muted/no-audio mode must work.
- Reduced-motion and progressive fallback guarantees.
- Scene-specific motion intent across all 12 locked scenes.

### PENDING — prototype / implementation calibration

- Exact easing strings and curve values.
- Final duration and stagger tokens; provisional ranges are **not** final measurements.
- Exact frame-by-frame timeline/choreography for each scene.
- Final placement and path of primary immersive zoom.
- Exact shape morphing/path/keyframes and mask geometry.
- Final audio assets, cue points, mixing, and fades.
- Precise interruption/skip affordances for each scene.
- Real-device capability thresholds and measured performance budgets.
- Reduced-motion alternative implementations and QA validation.
- Final React DOM wrapper ownership and GSAP cleanup code.

## 20. Final principle and merge destination

> **Motion makes interactions feel immediate, compositions feel alive, and important moments feel earned.**

> **The experience should feel alive because it responds and unfolds—not because everything moves.**

This fragment is intended to merge with Color, Typography, Icon & SVG, Shape & Pattern, Material & Texture, Depth / Shadow / Surface, and the forthcoming Photo, Cake, Vault, and Scene Art Direction fragments into `DESIGN_SYSTEM.md`.

**Fragment version:** v0.1  
**Fragment status:** LOCKED DIRECTION  
**Next planned design phase:** Photo Treatment System
