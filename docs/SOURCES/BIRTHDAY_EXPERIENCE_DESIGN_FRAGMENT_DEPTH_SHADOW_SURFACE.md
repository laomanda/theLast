# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: DEPTH / SHADOW / SURFACE

> **Status:** DEPTH / SHADOW / SURFACE FRAGMENT v0.1 — LOCKED  
> **Parent thesis:** Warm Kinetic Editorial Keepsake  
> **Direction:** **Controlled Cinematic Depth**  
> **Definition:** Layered Editorial Space + Tactile Contact + Selective Cinematic Depth  
> **Future destination:** `DESIGN_SYSTEM.md`

## 0. Document relationship and scope

This fragment extends, but does not override:

1. `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — the 12-scene narrative and birthday-first experience.
2. `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — mobile-first single-runtime scene architecture, GSAP/Motion, SVG, R3F Vault, capability fallbacks.
3. `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — Warm Kinetic Editorial Keepsake, editorial composition, Playful Precision, moderate contrast between worlds.
4. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` — Muted-but-confident warm/cool color system.
5. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` — Bricolage/Newsreader/Shantell roles and legibility.
6. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` — Phosphor, Offset Loop, 70% stroke / 30% fill direction.
7. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` — Soft-Structured Kinetic Geometry and pattern grammar.
8. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` — Tactile Editorial Surfaces and texture tiers.

**Scope:** spatial hierarchy, shadow functions, surface roles, overlap, spatial interactions, narrative depth, performance, and fallbacks. This file does **not** finalize exact lighting, color tokens, cake renderer, texture shaders, 3D model, or per-scene animation timing.

> **Depth should reveal importance, not demand attention.**

## 1. Core locked philosophy

- Depth is narrative and functional, never a blanket visual effect.
- **2.5D layered editorial** and **soft sculptural dimensionality** coexist selectively.
- Depth primarily comes from **scale, overlap, framing, position, perspective when meaningful, and spatial motion**; shadow supports these instead of substituting for composition.
- Maintain **medium energy — alive, not busy**.
- A scene may intentionally be nearly flat; flatness makes dimensional climaxes more significant.
- Birthday World and Hidden World retain related visual DNA. Hidden World changes spatial intensity, material, lighting, and rhythm without becoming a different website.
- All visual depth must respect content, interaction, device capability, and accessibility.

## 2. Logical spatial planes — LOCKED

Use **three logical decorative/spatial planes** and a separate functional utility layer.

### Background plane

Environment color, ambient graphics, sparse patterns, atmospheric marks, and long-range context. Must not overpower the focal subject.

### Midground plane

Primary scene objects, photography, cake, narrative compositions, editorial forms, and other meaningful story objects.

### Foreground plane

Selective occlusion, reveal layers, close-depth fragments, masks, and contextual interactions. Foreground decoration must not block critical controls or reading.

### Utility overlay (functional, not a fourth decorative plane)

Accessible, interactable controls such as sound, close, replay, PIN input, focus rings, essential hints, and fallback actions. Utility priority is **independent** of decorative depth. Its actual stacking values are not decided here.

**Exceptions:** Scene-specific sublayers are allowed only when they solve a defined visual, narrative, or interaction problem. Do not turn logical planes into an arbitrary proliferation of `z-index` values.

## 3. Editorial overlap rules — LOCKED

- Selected hero typography may overlap abstract graphics, photo framing, and shapes.
- Photography may sit between editorial planes when hierarchy remains clear.
- Some display-letter fragments may be intentionally occluded for editorial treatment, but the **essential message must still be readable**.
- Body copy, Newsreader letters, confession, CTA labels, PIN entry, hints, and accessible controls must never rely on partially obscured text.
- Offset Loop/shape motifs may disappear when they compete with portrait, cake, letter, or confession.
- Avoid repeated centered card + title + button compositions and avoid creating a dashboard aesthetic.

**Hierarchy order:** Narrative focus → readable typography / portrait / main object → structural shape → pattern → ambient decoration.

## 4. Shadow language — four functional classes (LOCKED)

| Class | Name | Function | Typical applications |
|---|---|---|---|
| **S0** | No Shadow | Default planar clarity | Reading surfaces, typography, UI icons, background forms |
| **S1** | Ambient Soft Shadow | Gentle separation between surfaces | Selected layered editorial surfaces and framing |
| **S2** | Contact Shadow | Explains object contact, lift, placement, and tactility | Cake decoration, candles, folded paper, seal, selected controls |
| **S3** | Cinematic Object Shadow | Communicates the mass/volume of a major narrative object | Vault and rare dimensional focal objects |

### Shadow character

- Default is **S0**, not universal elevation.
- Birthday World uses subtle, soft, **warm-neutral tinted** shadows.
- Hidden World may use deeper, restrained **plum/graphite-tinted** shadows, aligned to its material and illumination.
- Shadow tone must derive from the locked palette/material context, never introduce arbitrary identity colors.
- A shadow can change during press/lift/drag only when that change communicates physical or interactive state.
- S3 is rare; do not apply cinematic shadow to every surface.
- Shadow belongs to an object's spatial behavior, not decorative styling.

**Pending:** exact `blur`, `spread`, `offset`, `opacity`, shadow layering, and scene-specific calibrated color values.

## 5. Surface hierarchy — four types (LOCKED)

| Type | Role | Default treatment |
|---|---|---|
| **Open Canvas** | The main scene environment | Open composition, matte, no card/box styling by default |
| **Editorial Surface** | Framing photographs, letters, graphical compositions | Mostly matte, visually clean, restrained edges and shadows |
| **Contextual Control Surface** | Interactive tools that appear when needed | Compact, responsive, tactile only where appropriate |
| **Narrative Object Surface** | Cake, folded letter, seals, Vault | Dimensional finish follows narrative role/material family |

### Surface rules

- Do not create a permanent navigation bar or stack of generic glass cards.
- Persistent utility controls are minimal and context-dependent.
- Cake controls are contextual, compact, and preferably composed around the object, not presented as a SaaS-like dashboard.
- Matte is the default. Translucency is selective and must not introduce heavy blur by habit.
- Border shape/corner character follows **Soft-Structured Kinetic Geometry**, with both gentle and precise edges depending on object role; no single global radius for everything.
- Functional surfaces must respect touch targets, safe areas, and clear focus states.

## 6. Spatial motion and perspective — LOCKED

- **Static-first:** the scene must communicate depth through its still composition even when all nonessential motion is disabled.
- Parallax is **selective, adaptive, and performance-aware**, especially in portrait and key hero moments.
- Motion along the perceived Z axis, cinematic camera-like zoom, and perspective are signature tools, not defaults.
- Use perspective only when it clarifies the spatial relationship, reveal, or manipulation of an object.
- Gesture-linked displacement is allowed for targeted interactions (e.g. drag/swipe and select objects), with restrained amplitude.
- Prioritize one **dominant depth effect at a time per scene**; minor microfeedback may coexist if it does not distract or overload the device.
- Do not stack continuous parallax, blur animation, shader effects, SVG morph, and large-scale perspective merely because the runtime supports them.
- A major immersive zoom is a **candidate** for Scene 08 → 09, not a final choreography lock. Other locations require scene-level justification.

### Motion division

**GSAP:** narrative timelines, choreographed layer transitions, spatial reveals, camera-like moves, selective parallax coordination.

**Motion:** local UI, presence, tactile response, small control feedback.

**R3F / Three.js:** primarily the true-3D Vault; not required to make other scenes feel dimensional.

No new depth/parallax library is required.

## 7. Narrative depth progression — LOCKED DIRECTION

The following levels are **relative editorial descriptors**, not pixel depth, 3D coordinates, or mandated animation effect counts.

| Scene | Spatial direction | Relative intensity |
|---|---|---|
| **01 Loading / Prelude** | Mostly flat editorial, small spatial suggestion | 1/5 |
| **02 Invitation / Open** | One tactile/foreground focal surface | 2/5 |
| **03 Birthday Reveal** | Layered expressive type and graphic forms; mostly planar | 2/5 |
| **04 Portrait / Memory** | Editorial photo cutouts/masks, selective 2.5D separation/parallax | 3/5 |
| **05 Cake Studio** | Tactile almost-3D cake, clear contact relations | 4/5 |
| **06 Make a Wish** | **Same decorated cake**; subtle environmental depth/light change | 4/5 |
| **07 Personal Birthday Letter** | Flat, intimate editorial reading plane | 1/5 |
| **08 Final Birthday Moment** | Shallow, resolved composition; controlled closure | 2/5 |
| **09 Hidden Transition** | Gradual spatial deepening; selective signature reveal/zoom if justified | 4/5 |
| **10 Vault** | **True 3D climax**, mechanical space, credible mass and contact | 5/5 |
| **11 Hidden Letter** | Letter may float briefly, then settles to a restrained reading space | 3/5 |
| **12 Confession Ending** | Calm near-flat focus on the words and release | 1/5 |

### Non-negotiable scene dependencies

- Scene 05 → 06: cake identity, placements, and material continuity are preserved; do not swap the object to exaggerate depth.
- Scene 07: readability takes priority over depth spectacle.
- Scene 08 → 09: hidden layer is optional and reached by deliberate interaction; no conventional browser scroll navigation.
- Scene 10: the mechanical climax must remain believable, tactile, premium, and restrained rather than cyberpunk or game-like.
- Scene 10 → 11 → 12: dimensional complexity decreases so attention can return to letter content; confession cannot become theatrically coercive.

## 8. Material and graphic coherence — LOCKED

### With Color

Use existing Warm Ivory / Editorial Mist / Deep Ink, Coral / Apricot, Lavender / Periwinkle, Soft Champagne, and Deep Plum / Warm Graphite; depth must not create an unapproved bright neon, generic black, or metallic-gold identity.

### With Typography

Bricolage may take an editorial place within layered composition; Newsreader requires calm and legible reading surfaces. Shantell remains a minimal human accent. Depth cannot justify obscuring letter text.

### With Icon & SVG

Phosphor icons stay functional and readable; custom SVGs carry decorative narrative. The **70% stroke / 30% fill** direction applies to decorative SVG language, not to the total area of layered surfaces, masks, solids, or 3D objects.

### With Shape & Pattern

The Offset Loop and five shape families may define masks, foreground contours, and transitions, but their recognizable shape grammar persists. Shape is not forced into a scene if it harms the main subject.

### With Material & Texture

- **Editorial Matte:** frequently S0, sometimes restrained S1.
- **Soft Satin:** selective graphic / interactive finish, not automatic floating elevation.
- **Tactile Sculpted:** S2 contacts where the cake/decorations visually touch.
- **Keepsake Paper:** subtle edge/contact cues, clean text area.
- **Quiet Mechanical:** deep form cues and limited S3 as appropriate for the Vault.
- Texture tiers T0/T1/T2 remain unchanged; elevation is not a reason to increase grain/noise.

## 9. Mobile, responsive, accessibility, fallback — LOCKED

- Composition should **recompose** for mobile, not simply shrink the desktop arrangement.
- Keep important controls unobstructed and inside safe-area boundaries; ensure usable touch targets.
- Protect readable text from overlapping decorative planes.
- Prefer inexpensive transforms and opacity changes; avoid continuous expensive filters and animated fullscreen blur.
- Respect `prefers-reduced-motion`: preserve meaningful static layering while reducing/removing nonessential parallax, camera motion, and spatial zoom; use simpler fades/reveals if appropriate.
- Respect capability/performance tiers rather than assuming high-end GPU.
- All scenes remain usable without parallax, advanced shaders, or immersive zoom.
- **Vault fallbacks remain mandatory:** Full 3D → 2.5D → static/DOM composition, with working PIN entry, vault opening, letter access, and confession flow.
- Do not sacrifice interactivity, readable hierarchy, or frame stability for visual depth.

## 10. Critical guardrails / conflict resolutions — LOCKED

1. **Flexible layers vs arbitrary layering:** three logical planes are the default grammar; add sublayers only with a justified role.
2. **Expressive overlap vs legibility:** selected hero compositions may overlap; essential copy and controls must not.
3. **Adaptive shadows vs inconsistency:** every shadow belongs to S0–S3 according to function/material.
4. **Contextual surfaces vs dashboards:** preserve open canvas; surface panels exist only for an interaction or composition purpose.
5. **Adaptive perspective vs performance:** one dominant spatial effect at a time, static-first, progressive capability scaling.
6. **Cinematic zoom vs gimmick:** reserve for major narrative transitions, and do not lock precise placement until scene art direction.

## 11. Do / do not

### DO

- Build depth through hierarchy, scale, layering, and selective spatial behavior.
- Use contact shadows to clarify touch/placement.
- Let emotional pacing increase and decrease spatial complexity.
- Keep interaction controls discoverable above ornamental layers.
- Maintain Birthday–Hidden visual continuity.
- Use true 3D selectively for the Vault, with resilient fallbacks.
- Recompose editorial layers for mobile.

### DO NOT

- Add shadow to every item or treat shadows as visual decoration.
- Build a generic floating card/glassmorphism interface.
- Let foreground ornaments cover copy or interaction affordances.
- Use constant parallax or camera sway in all scenes.
- Apply aggressive blur, glow, pseudo-Z transforms, or immersive zoom everywhere.
- Make the Vault look like a cyberpunk HUD or separate game UI.
- Force 3D continuity through the intimate final letter/confession.
- Add new dependencies just to achieve depth tricks.

## 12. Lock status

### LOCKED — v0.1

- Direction name: **Controlled Cinematic Depth**.
- Principle: **Depth should reveal importance, not demand attention.**
- Three logical planes + separate utility overlay.
- Editorial overlap with strict legibility and focus priority.
- Four shadow classes S0–S3.
- Four surface types and open-canvas-first hierarchy.
- Contextual controls, no persistent dashboard UI.
- Narrative-adaptive depth progression across all 12 scenes.
- Static-first, selective parallax/perspective/zoom, one dominant depth effect at a time.
- Material/color/type/SVG/shape compatibility rules.
- Mobile re-composition, reduced-motion, progressive enhancement, and working Vault fallback.

### PENDING — production and scene art direction

- Exact `z-index` values, DOM stacking-context mapping, and layering implementation.
- Exact shadow blur/opacity/spread/offset/color tokens.
- Perspective depths, transforms, parallax strengths, camera and motion timing.
- Real asset size, CSS vs SVG decisions, compositing tests.
- Scene-by-scene exact foreground/midground/background placements.
- Final choice and choreography of immersive zoom moments.
- Vault GLB model, PBR parameters, environment lighting, camera angles, and 3D shadows.
- Final Cake Studio renderer and contact-shading details.
- Performance budgets and accessibility testing on target devices.

**Important:** Pending implementation tokens may be tuned without changing the locked direction. They should be tested within the scene designs before entering final `DESIGN_SYSTEM.md` and `IMPLEMENTATION_PLAN.md`.

## 13. Future merge sequence

```text
FLOW + TECH + DESIGN DIRECTION
             ↓
COLOR
             ↓
TYPOGRAPHY
             ↓
ICON & SVG
             ↓
SHAPE & PATTERN
             ↓
MATERIAL & TEXTURE
             ↓
DEPTH / SHADOW / SURFACE  ← THIS FRAGMENT
             ↓
MOTION SYSTEM
             ↓
PHOTO TREATMENT
             ↓
CAKE ART DIRECTION
             ↓
VAULT ART DIRECTION
             ↓
SCENE-BY-SCENE ART DIRECTION
             ↓
FINAL DESIGN_SYSTEM.md
```

---

**Fragment Version:** 0.1  
**Fragment Status:** LOCKED  
**Parent Design Direction:** Warm Kinetic Editorial Keepsake  
**Future Destination:** `DESIGN_SYSTEM.md`
