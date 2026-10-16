# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: CAKE ART DIRECTION

> **Status:** CAKE ART DIRECTION FRAGMENT v0.1 — **LOCKED DIRECTION**  
> **Identity:** **Sculpted Celebration Cake**  
> **Formula:** **Soft-Structured Form + Tactile Frosting + Curated Personalization**  
> **Parent thesis:** **Warm Kinetic Editorial Keepsake**  
> **Future destination:** `DESIGN_SYSTEM.md`  
> **Scope:** Scene 05–06 cake silhouette, finish, restrained decoration system, interaction grammar, visual constraints, lifecycle/state continuity, progressive rendering, accessibility, and design/engineering handoff.  
> **Boundary:** This document locks direction and non-negotiable behavior, **not** production SVG paths, final frosting geometry, precise anchor coordinates, option counts, collision thresholds, timing curves, or asset files.

---

## 0. Relationship to locked baselines

This fragment **extends, never replaces**, these authoritative decisions:

1. `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — Scene 05 **Birthday Cake Studio** → Scene 06 **Make a Wish** with the **same customized cake**; `Finish Cake → Cake Completed → Candles Ignite`; no complex cake-building game; optional mic with usable non-mic extinguish.
2. `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — mobile-first single-runtime scenes; Next.js, React, TS, Zustand, GSAP, Motion, SVG, native Pointer Events, Howler and progressive fallbacks; DOM/SVG is preferred for cake; the true 3D reveal remains reserved for Vault.
3. `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — **Warm Kinetic Editorial Keepsake**, medium energy, dynamic editorial art direction, **Lightweight Almost-3D / Tactile** cake and `Playful Precision`.
4. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` — locked warm ivory, coral, apricot, lavender/periwinkle chromatic system; warm birthday identity; no palette expansion for cake without separate approval.
5. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` — Bricolage Grotesque for interaction/UI; Newsreader only for restrained emotional content; Shantell Sans as rare human accent, not frosting-label spam.
6. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` — Phosphor for functional controls; custom SVG language and **Offset Loop** remain selective supporting motifs, not cake-covering ornament.
7. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` — **Soft-Structured Kinetic Geometry**, organic-led rounded construction with disciplined edges and small human imperfection.
8. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` — **Tactile Editorial Surfaces**, cake as **Tactile Sculpted** family; matte default, controlled satin and selective T1/T2 local object detail.
9. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE.md` — **Controlled Cinematic Depth**; believable S2 tactile contact; utility overlay never obstructed; dimensionality is earned rather than constant.
10. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MOTION.md` — **Choreographed Playful Precision**; immediate M0 state, crisp M1 controls, tactile M2 placement, selective M3 reveals/M4 spatial handoff; GSAP scene vs Motion component ownership; interruption, reduced motion, and performance guarantees.
11. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_PHOTO_TREATMENT.md` — **Intimate Cinematic Editorial Portraiture**; Scene 04 owns portrait emphasis, Scene 05–06 own cake emphasis; no photographic competition or unrelated background gallery.

**Precedence:** Flow governs what happens; Tech governs feasibility/runtime; locked Design Direction and fragments govern consistency; this fragment specifies the cake's application. If a proposal conflicts with any higher-level locked rule, revise the proposal rather than silently overriding the baseline.

---

## 1. Approved inputs — 30-answer decision record

Answers received: `1D 2D 3D 4A 5D | 6D 7D 8D 9D 10D | 11D 12D 13D 14D 15D | 16D 17D 18D 19D 20D | 21D 22D 23D 24D 25D | 26D 27D 28D 29D 30E`.

- **A — Identity:** playful + artisanal + editorial hybrid, semi-believable lightweight 2.5D, round-derived soft structure, **single tier explicitly selected**, deliberate human imperfection.
- **B — Material:** smooth base + controlled piping/sculptural icing, matte dominant with selective satin, curated warm/cool palette options, selective detail, physical minimal base/contact shadow.
- **C — Decoration:** curated frosting/candle/flower/topper/accent categories, styled botanical detail, candle choice and optional age numerals only when appropriate, limited personalized topper, valid zones + gentle drag/snap.
- **D — Studio:** contextual editorial control tray; tap-to-apply plus optional drag; undo/remove/reset (confirmation for destructive reset); limited perspective rather than 360° rotation; tactile contact feedback and optional non-intrusive sound/haptic.
- **E — Wish:** same cake, controlled spatial handoff, natural flame flicker + restrained warm lighting, tap/hold **always available** and mic optional, subtle smoke/ambience response, short emotional beat and personal message.
- **F — Engineering:** DOM/SVG-first; Canvas2D only if justified; progressive fallbacks; fully usable touch/mouse/keyboard and no mic/haptic requirement; responsiveness wins over realism; emotion, accessibility and performance remain hard constraints.

---

## 2. Locked identity and visual priority

### 2.1 Direction

**Sculpted Celebration Cake** = **Soft-Structured Form + Tactile Frosting + Curated Personalization**.

The cake should be:
- birthday-forward, warm, personal and a little playful;
- visually dimensional and evidently edible, without photorealistic shading demands;
- handmade-feeling but controlled, not sloppy;
- sophisticated in silhouette and materials, not luxury-coded by gold or excessive shine;
- a hero object that responds naturally, rather than a decorative sticker or a game asset.

**Guiding sentence:** *The cake should feel handcrafted, respond like a tactile object, and become personal through the user's choices.*

### 2.2 Priority order

1. Correctness of user-selected cake state and wish interaction.
2. Mobile usability, accessibility, responsiveness and narrative continuity.
3. Recognizable single-tier cake volume, contact and restrained tactility.
4. A beautiful default composition and harmony of every allowed combination.
5. Optional polish: small material accents, controlled depth, subtle effects and sound.

Never sacrifice items 1–2 for item 5.

---

## 3. Cake silhouette and spatial construction — LOCKED

- **Single-tier** is a hard art-direction choice (question 4A). Do **not** introduce double tier as a default or customization category.
- **Round-derived** primary outline: recognizable cake top/side profile with deliberate slight organic variations, not mathematically perfect, not amorphous.
- **Soft-structured** proportions: readable crown, side wall, frosting edge and base/stand. A soft elliptical projection, bounded side-wall shading, and controlled perspective may create almost-3D presence.
- Avoid novelty shapes that make decorations hard to place, excessive height, floating/unattached ornaments, dramatic forced perspective, or spin-to-edit 3D controls.
- Use one canonical cake geometry and cosmetic variations. Do not implement separate scene-specific cakes for Scene 05 and Scene 06.
- Mobile reframes and simplifies composition; it does not just downscale inaccessible editing handles.

### 3.1 Spatial planes

1. **Backdrop/editorial setting:** Warm Ivory or other approved supporting scene colors, very restrained custom graphics.
2. **Cake base/contact:** small physical plate or low stand with S2 contact shadow.
3. **Cake body:** continuous frosting/volume geometry, matte with selective form shading.
4. **Attached decoration:** stable anchored candles, flowers, topper and accents, with correct local occlusion and contact.
5. **Interactive overlays:** handles, valid placement hints and tray (accessible utility layer, not obstructed by cake).
6. **Wish effects:** candle flames, localized glow and subtle smoke only when appropriate to Scene 06.

The stack should convey hierarchy even with every animation disabled.

---

## 4. Material, finish and lighting — LOCKED

- **Main frosting:** smooth matte buttercream-like finish; lightweight local sculpted/piped details create tactile cues.
- **Satin:** selective, local accents (specific icing folds, small decorations), never full-gloss plastic.
- **Microtexture:** limited to appropriate local cake material regions; no blanket noise or heavy textured overlays; respect Material/Texture T0–T2 hierarchy.
- **Shadow:** S2 contact for cake-to-plate and decoration-to-frosting; ambient separation can be S1 where necessary. Avoid repeated enormous soft shadow stacks.
- **Stand:** minimal physical platform; no fake metallic pedestal or levitating cake by default.
- **Lighting:** warm, believable diffuse form shading. Candle glow gains significance only after completion and entry into Scene 06; avoid bright persistent bloom.
- **Technical interpretation:** gradient and layered SVG shapes may suggest volume; no dependency on costly realtime PBR rendering for cake.

**Do not:** frosting like vinyl, glass cake plate, gold-rimmed luxury wedding cake, incessant shimmer, dark cyberpunk cakes or material detail that reduces clarity.

---

## 5. Color and compatible cake presets — LOCKED DIRECTION

The cake uses **existing palette families only**, not an independent theme system.

Approved source palette reference:
- Warm Ivory `#F6F1E8`;
- Muted Coral `#E67A6B`;
- Soft Apricot `#ECA06E`;
- Dusty Lavender `#A79DCD`;
- Confident Periwinkle `#8794CC`;
- supporting Editorial Mist `#D8D2C9` and Deep Ink `#2C282A` when appropriate.

**Policy:** User selects from limited **curated warm/cool presets**. Every preset includes verified compatible sets for frosting, piping, candle body, floral petals/topper and accent contrast. A contrasting color is an intentional subordinate, not an invitation to combine every available accent at maximum saturation.

Illustrative, **not production-locked**, starter families:
- Warm Ivory base + muted coral/apricot details;
- Coral/Apricot base + ivory/light lavender detail;
- Lavender Mist base + warm ivory/periwinkle detail.

These are candidate pairings; exact number, contrast, tint adjustments and state appearance remain prototype decisions. Avoid using only color to communicate active selection.

---

## 6. Decoration taxonomy — LOCKED

**Five categories**, all optional/curated within a coherent default design:

| Category | Job | Constraint |
|---|---|---|
| Frosting | Global base/color and a small number of edging styles | Changes the cake consistently, not a new shape system |
| Candles | Birthday focal point and wish prerequisite | Top-surface valid anchors, safe spacing, clear flame zone |
| Flowers | Small piped/edible-looking or subtle sculptural botanical detail | Limited scale/count and position; cannot overpower candle/topper |
| Topper | Restrained birthday/name/initial message | Personalization is bounded and layout-safe; avoid occluding flame or critical copy |
| Accents | Small finishing marks/piping/sculpted details | Strict density budget, never decoration spam |

### 6.1 Quality guardrails

- A well-composed default should exist before user edits.
- Every combination allowed by the UI must pass aesthetic and readability constraints.
- No arbitrary placement on the entire canvas; use **valid placement zones** mapped to cake anatomy.
- Slots are not necessarily visible. They may use normalized coordinates and adjust to responsive cake projection.
- Validate **overlap, spacing, edge contact, candle flame clearance, topper legibility and clipping** before committing placements.
- Decorative category budgets must prevent clutter; control density based on viewport and chosen objects, not only a fixed item count.
- Invalid placements return accessible guidance and a predictable visual recovery, not an orphaned object.
- If custom topper text/initial is eventually enabled, sanitize input and constrain length, line wrapping, and language so it cannot break the rendering or obscure the cake.
- Numeric birthday candles are only appropriate when reliable age data is available; never infer age or invent a number.

**Not locked:** exact quantity/variants per category, flower species, exact candle silhouettes, final topper copy or alphabet constraints, precise placement grid/collision parameters.

---

## 7. Cake Studio interaction contract — LOCKED

### 7.1 Controls and interaction model

- Use a **contextual editorial control tray**; avoid SaaS dashboards, dropdown-heavy configuration or complex freeform decorating UI.
- Main behavior: **tap-to-select + tap-to-apply/choose placement**, with **optional direct drag-to-snap** to a valid zone.
- The control tray must be screen-edge/mobile safe, preserve a visible cake hero, and respect focus/touch targets.
- Provide a visible alternative to drag, including mouse/keyboard-operable category selection and placement controls.
- Optional gentle perspective response may reinforce depth; **no full 360° manipulation requirement**.
- Feedback is tactile contact + short settle, not arcade bounce; optional tiny audio/haptic may reinforce placement only if device/user settings allow.

### 7.2 Transactional placement

**Event protocol:** `select → preview → validate → commit OR reject/cancel → consistent final state`.

- During drag, follow direct pointer input; only apply snap/settle at valid release.
- Invalid or canceled gestures revert predictably without changing committed cake configuration.
- Repeated tap, pointercancel, blur, scene exit, and interrupted transitions must not create duplicate ornaments or corrupt state.
- Undo/remove/reset operate on committed state. Undo has bounded history; reset is destructive and needs confirmation.
- All functional icons/buttons use the project's Phosphor icon policy and Indonesian copy, with readable feedback and non-color cues.
- No mandatory precise long-press, microphone, haptic vibration, or motion-sensitive tilt for essential functionality.

### 7.3 Completion

`editing → finish requested → validated complete configuration → editing closed → Scene 06 handoff`

The cake may require a valid candle configuration for Make a Wish; if default candles are already present or can be restored automatically, this must be clear and must not trap the user. The final candle requirement/automatic repair copy belongs to the interaction prototype, not to an invented locked validation rule.

---

## 8. Motion semantics and ownership — LOCKED

Use the existing motion grammar only:

- **M0:** immediate correct selection/configuration state.
- **M1:** buttons, selection/focus, remove/undo controls.
- **M2:** direct drag, gentle snap, contact, tactile decoration settling.
- **M3:** selective cake introduction, candle-flame reveal and visual emphasis.
- **M4:** Scene 05 → 06 cake spatial handoff while retaining configuration.
- **M5:** reserved for meaningful cinematic payoffs elsewhere; no extra spectacle imposed on every cake action.

**Ownership:** GSAP controls scene-level choreography and handoff; Motion controls local component feedback. Do not assign the same DOM transform/opacity to both engines simultaneously; isolate wrappers where necessary. Zustand holds canonical state, not GSAP timeline progress.

No new immersive zoom signature is added to the cake sequence. Idle cake is primarily still. Animations must be cancellable or resumable according to the existing Motion System, without undoing the user's committed choices. Reduced-motion substitutes short fades/state changes for spatial camera/parallax tricks while keeping feedback understandable.

---

## 9. Scene 05 → Scene 06 continuity — NON-NEGOTIABLE

Scene 05 (Birthday Cake Studio):

1. Show the incomplete but attractive editable single-tier cake.
2. Let user curate frosting, candles, flowers, topper and accents through direct input.
3. Give immediate, valid feedback; allow undo/remove/reset.
4. On **Finish Cake**, freeze editing and commit one stable `CakeConfiguration`.

Transition:

5. Hand off the **same cake configuration**, with spatial layout/motion adjustment as needed. No replacement with a visually unrelated pre-rendered cake.

Scene 06 (Make a Wish):

6. Gently reduce environment brightness/visual density; ignite selected candles with natural, restrained flicker and localized warm illumination.
7. Offer **tap/hold as always-available primary extinguish actions**; microphone blowing is **optional enhancement** with permission-gated detection and equally complete fallback.
8. One valid extinguish event updates candle/wish state once. Flicker ceases; subtle smoke/ambience response may play. Repeated input is deduplicated.
9. Allow a short unforced emotional beat and brief personal message; then continue toward Scene 07 Birthday Letter.

**Separation:** Extinguish is a **state event**, not mere completion of an animation. Visual and sound effects respond to the state; they do not define whether the wish succeeded.

**Safety:** Mic denial, muted audio, weak device, reduced motion or interruption must not strand the user or reset decoration.

---

## 10. Runtime architecture — LOCKED RESPONSIBILITIES

Illustrative logical decomposition, not compulsory final filenames:

```text
CakeExperience
├── CakeRenderer             # DOM/SVG-first projection of canonical state
├── CakeDecorationLayer      # layered ornaments + overlap/occlusion
├── CakeInteractionController# pointer/touch/mouse/keyboard actions
├── CakePlacementValidator   # valid zones, collisions, edge clearance
├── CakeConfigurationStore   # Zustand, state + bounded undo history
├── CakeAnimationController  # M1–M4 ownership, cancel/cleanup
└── CandleWishController     # ignition/extinguish state + mic fallback
```

**Single source of truth:** Cake selection, positions, completion, candle state and wish state must be represented independently of rendered DOM node positions. A renderer receives a configuration and produces the visual result; a fallback renderer consumes the same configuration.

**Logical state outline — illustrative, not final TypeScript schema:**

```text
CakeConfiguration
  baseStyle / colorPreset / frostingDetail
  candles[]   { id, style, normalizedAnchor, state }
  flowers[]   { id, style, normalizedAnchor }
  topper?      { id, style, content?, normalizedAnchor }
  accents[]   { id, style, normalizedAnchor }
  completionStatus
  wishStatus
```

Do not equate a state object with actual vector drawing primitives. State remains deterministic across viewport reflow, scene transition, device downgrade and retry.

### 10.1 Rendering strategy

- **Default:** DOM + optimized inline SVG layers, CSS transforms/shadows/gradients as appropriate.
- **Alternative:** Canvas2D only if profiling demonstrates a real benefit or a specific visual need; not default out of novelty.
- **Not justified for Cake v1:** new Three.js/R3F cake pipeline, dedicated physics engine, advanced custom shaders, high-frequency particle engine, or additional general animation libraries.
- Do not introduce an artificial discrepancy where editor shows one cake but Make a Wish shows a different image. Renderer parity is required.

---

## 11. Performance, input and accessibility — HARD CONSTRAINTS

- Mobile-first composition with generous tap targets, unobstructed flame/cake focal area and responsive control tray.
- Cake remains interactive without microphone, haptics, audio playback, pointer precision, WebGL or full motion.
- Provide keyboard-accessible selection/placement alternatives and visible focus states; functional actions have labels/instructions in Bahasa Indonesia.
- Ensure screen-reader text represents decoration state, actionable controls, placement success/failure and completion; do not rely solely on color, drag location or decorative animation.
- Honor reduced-motion by dropping parallax/perspective travel and substituting essential state feedback.
- Respect visibility/pause semantics and clean up effects/pointer capture after interruption or scene changes.
- Apply progressive degradation in order: diminish ambient effects → simplify shadows/textures → simplify depth/animation → use lightweight static-projection fallback while retaining decoration/wish logic.
- Avoid layout shift, very large SVG filter regions, unnecessary repainting and continuously active timers in idle views.
- Test narrow mobile screens, touch drag failure/cancel, repeated finish presses, low frame rate, permission-denied mic and muted audio.

---

## 12. Replay and persistence recommendation — LOCKED AS PRODUCT DEFAULT

- During Scene 05 → 06, state **must persist**.
- Returning from Scene 06 to Scene 05, **if backward navigation is implemented**, should preserve the last committed editable cake; re-entry must not silently discard choices.
- **Full Replay Experience** resets cake selection/decoration and wish state to the known original default, rather than implicitly reusing the prior finished cake.
- This replay recommendation resolves an open Tech Baseline question **for this design fragment**, without requiring a separate persistence/backend feature. Implementation may later offer explicit replay choices only through a reviewed design change.

---

## 13. Scene separation and narrative ethics

- Cake is the hero for Scenes 05 and 06, not a visual filler reused throughout all twelve scenes.
- Portrait scene retains personal photographic focus; birthday letter stays calm/readable; Vault remains premium minimal **true 3D** climax.
- The candle ritual should feel warm and optional in pace; do not create a time limit, scoring, performance judgment, demand for camera access, or mandatory spoken wish.
- Do not force the hidden confession into cake customization or birthday wish copy. Birthday remains primary; confession stays in its separate optional hidden layer.

---

## 14. Design QA / acceptance gates

Before final art direction is declared implementation-ready, verify:

1. Cake reads clearly as a **single-tier**, round-derived soft-structured celebration cake, not an emoji or 3D game asset.
2. Visual is tactile without glossy plastic; cake sits believably on its plate/stand.
3. Every visible selection is supported by the allowed color family and maintains sufficient contrast.
4. Every permitted ornament arrangement respects bounded slots, clipping, overlap and candle flame clearance.
5. Touch, mouse and keyboard alternatives can all complete decoration.
6. Undo/remove/reset produce correct state; reset asks confirmation.
7. Rapid taps, pointercancel and interrupted transitions never duplicate elements.
8. Scene 06 accurately reproduces every committed Scene 05 choice.
9. Candle extinguish succeeds with mic denied and with no audio/haptic; repeated action is idempotent.
10. Reduced motion, narrow viewport and low capability preserve complete core progression.
11. Birthday-first emotional tone is preserved; the cake does not compete with portrait or Vault signature moments.
12. Every option group and the overall composition has passed a curated compatibility test on mobile and desktop.

---

## 15. LOCKED vs PENDING register

### LOCKED — do not reinterpret casually

- **Sculpted Celebration Cake** identity and formula.
- Hybrid playful/artisanal/editorial personality.
- **Single-tier** round-derived soft-structured cake; stylized semi-believable **lightweight 2.5D**.
- Smooth matte buttercream with selective piped/sculpted details and restrained satin.
- Minimal physical base + tactile contact shadow.
- Curated preset colors tied to the existing palette.
- Five decoration categories: frosting, candles, flowers, topper, accents.
- Placement validity, compatible combinations, limited density and collision/occlusion policy.
- Editorial contextual tray with tap-to-apply and optional drag/snap, undo/remove/reset.
- Direct interaction with transactional commits; controlled perspective only.
- Same-cake state continuity and one-time extinguish semantics for Scene 05–06.
- Touch/hold always available; mic/haptic optional; keyboard/mouse alternatives.
- DOM/SVG-first architecture, Zustand source of truth, GSAP/Motion division, progressive degradation.
- Full replay resets cake state to initial curated default; local back navigation, if supported, preserves configuration.
- No new library, no cake-only immersive zoom, no WebGL-first cake renderer.

### PENDING — deliberate prototype/art-production decisions

- Exact vector geometry, frosting drips/piping profiles and final asset silhouettes.
- Exact default cake appearance, curated preset list/count and option labels.
- Number/style/count limits for individual decoration families.
- SVG normalized anchor coordinates and collision/spacing thresholds.
- Final font sizes/positions inside Scene 05 control tray.
- Concrete shader/filter/shadow values, local texture assets and lighting intensities.
- Final scene choreography timeline, easing curves, durations, flame/smoke effects, audio cues and haptic policy.
- Accessibility copy and feedback strings, keyboard slot navigation details.
- Exact candle style, optional birthday number treatment and final topper text.
- Whether backward navigation from Scene 06 is enabled at all.
- Measured mobile performance budget and render profiling results.

**Pending is not permission to replace a locked direction.** Production decisions must conform to the policy above and be reviewed against all upstream fragments.

---

## 16. Handoff and next stage

This is the **ninth** locked design fragment following Color, Typography, Icon & SVG, Shape & Pattern, Material & Texture, Depth / Shadow / Surface, Motion, and Photo Treatment.

**Next:** `Vault Art Direction` — a carefully restrained premium minimal **true 3D** climax with visual continuity from Birthday World, without imitating cake materials or sacrificing the birthday-first narrative.

**Final status:** **CAKE ART DIRECTION v0.1 — LOCKED; READY FOR VAULT ART DIRECTION.**
