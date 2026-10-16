# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: ICON & SVG LANGUAGE

> **Status:** ICON & SVG LANGUAGE FRAGMENT v0.1 — LOCKED  
> **Parent Direction:** Warm Kinetic Editorial Keepsake  
> **Related Fragments:** Color System v0.1; Typography System v0.1  
> **Depends On:** 12-scene Flow Baseline v1.0; Tech Baseline v1.0; Design Direction Baseline v0.1  
> **Future Destination:** `DESIGN_SYSTEM.md`  
> **Scope:** Functional icons, custom decorative SVG vocabulary, signature motif, compositional rules, state treatments, motion behavior, and scene distribution.  
> **Boundary:** This fragment locks art direction and design rules, **not** the final paths, actual SVG files, full per-scene asset inventory, or production motion tokens.

---

## 1. Design thesis

**Soft-Mechanical Editorial Marks**

The icon and SVG system must feel **warm, tactile, graphic, expressive, curated, and slightly human**—without becoming cute, ornamental, wedding-like, or technologically cold. It combines soft organic flow with disciplined editorial geometry and subtle imperfections.

One coherent language evolves through both worlds: **Birthday World is loose, soft, playful and editorial; Hidden World is sparse, aligned, symbolic and subtly mechanical.** The shift is an evolution of the same shapes, not a second visual identity.

**Non-negotiable filter:** If a graphic contributes nothing to hierarchy, narrative, interaction, or atmosphere, remove it.

---

## 2. Separate two graphic systems

### A. Functional Icon System

Used for interactions and legible signals: sound/mute, next/continue, replay, close, microphone, cake editing/removing/undo, gestures, confirmation, and basic vault controls.

- **Primary library:** Phosphor Icons.
- **Default weight:** Regular / outline.
- **Secondary weight:** Light for low-emphasis use only when legible.
- **Active / selected:** prefer the matching Fill variant, with color/shape feedback when appropriate.
- **Bold:** only when small size or contrast requires it; not a decorative default.
- **Duotone:** not part of the primary language.
- **State rule:** inactive/default outline → active/selected fill **where a filled variant conveys state clearly**. Not all icons need toggled variants (e.g. close and arrow).
- **Customization:** small stylistic adjustments permitted; preserve identifiable icon meaning. Narrative-specific controls can use custom SVG.
- **Accessibility:** do not rely on fill or color alone for critical state; provide visible label and/or accessible state description, target sizing and focus treatments at implementation.

**Initial icon-size reference (not locked production tokens):** 16px micro utility, 20px common UI, 24px primary controls, 28–32px interaction emphasis. Icon weight is responsive to optical size/state; verify at actual mobile sizes.

### B. Decorative SVG System

Used for expressive composition, personal atmosphere, photo framing, selected celebratory accents, transitional masks, and meaningful narrative symbols. Decorative SVG is **custom vocabulary**, not a collection of random icon-pack ornaments.

It may overlap typography and photography as an intentional editorial layer, but must protect text readability, faces, focal content, and interactive hit targets.

---

## 3. Signature motif — Offset Loop (LOCKED)

**Offset Loop** is the recurring project-specific mark: a continuous-feeling organic loop interrupted by a deliberate, slight geometric displacement/gap. It combines **softness** with **editorial intention**.

### Essential construction traits

- Feels drawn as one flowing gesture rather than a mathematically perfect circle.
- One noticeable but restrained break, offset, or alignment interruption.
- Organic curvature balances a clean geometric intervention.
- Slight imperfection is intentional; avoid messy sketchiness.
- Recognizable across scaling, cropping, and motion without requiring a literal logo.

**Not locked:** exact Bézier coordinates, aspect ratio, orientation, aperture size, SVG viewBox, or number of derivatives. These will be resolved during actual asset design and visual testing. Avoid claiming an exact geometry already exists.

### Narrative transformation

| Scene / world | Intended motif behavior |
| --- | --- |
| Invitation / Birthday Reveal | Soft, loose, playful, with motion-led entry |
| Portrait / Memory | Editorial framing arc near the image, never obstructing the subject |
| Cake / Wish | Supporting path or interaction accent, not a substitute for tactile cake visuals |
| Final Birthday Moment | Calmer, nearly completed gesture or softened closure |
| Hidden Transition | Forms begin to align, segment, or become more rigid |
| Vault | Motif echoes as a restrained mechanical arc / ring / alignment cue |
| Hidden Letter / Confession | Becomes thin, sparse, intimate; never decorative pressure around the message |

The motif is **a recognizable visual memory**, not an obligation to place a full loop in every scene. Use fragments or absence when composition calls for restraint.

---

## 4. Locked decorative vocabulary — five families

1. **Flowing Forms** — soft arcs, continuous curves, understated loops, ribbon-like paths *without literal gift-ribbon imitation*. Primary emotional and kinetic vocabulary; predominantly stroke-based.
2. **Editorial Frames** — incomplete frames, offsets, corner marks, brackets, cropped geometry, purposeful framing of photo/type. Precise geometric counterweight; predominantly stroke-based.
3. **Celebration Fragments** — small abstract dashes, arcs, bursts, tiny lozenges, restrained stylized spark shapes. Brings excitement without stock confetti/balloons; mixed stroke and fills.
4. **Human Marks** — lightly uneven underline, short hand-drawn stroke, imperfect circle, tiny personal annotation. Used sparingly, like the typographic role of Shantell Sans; predominantly stroke-based.
5. **Secret Marks** — segmented lines, broken circles, calibration/alignment marks, concentric arcs, symbolic mechanical geometry derived from the same motif. For Hidden World; selective stroke and fills, **never a sci-fi HUD**.

### Figurative allowance

Flowers, ribbons, candles, stars and similar familiar forms may appear **only when stylized/abstracted and narrative-relevant**. Literal decorative birthday clip art is not the visual vocabulary. The cake itself may still have recognizable decorative objects needed by its interaction design.

### Hearts & sparkles

- **Heart:** exceptionally rare, reserved for a justified Hidden/Confession moment; favor a subtle, non-literal interpretation. A heart is **not mandatory**.
- **Sparkle:** restrained supporting accent, not a recurring dominant motif.

---

## 5. Stroke / fill composition (LOCKED)

**Target direction: approximately 70% stroke-based / 30% filled decorative treatment.**

This is an **overall aesthetic guardrail**, not a required per-asset pixel ratio or mathematical scene quota.

- Flowing Forms → predominantly stroke.
- Editorial Frames → predominantly stroke.
- Human Marks → predominantly stroke.
- Celebration Fragments → controlled stroke/fill mix.
- Secret / mechanical Marks → stroke plus occasional purposeful fill.
- Active UI icon state → Fill, as defined separately in Functional Icon System.

Too many fills feel visually heavy; all-stroke treatment risks feeling empty, diagrammatic or overly technical. Preserve contrast and hierarchy.

---

## 6. Shape, imperfection, and color

### Shape character

- **Hybrid organic + editorial geometric + slight human imperfection.**
- Organic elements should have a clear visual rhythm, not arbitrary squiggles.
- Geometric shapes can be cropped, offset and incomplete rather than repetitive perfect outlines.
- Imperfection is subtle and intentional—not an excuse for inconsistent icon geometry.

### Decorative color constraints

- **Maximum two distinct palette colors per individual decorative SVG asset**, excluding transparency/tonal variations derived from the same color.
- Birthday World: overall **warm/cool balance across scenes**, but **one accent family should dominate an individual scene**, aligned to the locked Color System. Do not force equal coral/lavender usage within each shape.
- Light scenes can use Warm Ivory `#F6F1E8`, Editorial Mist `#D8D2C9`, Deep Ink `#2C282A`, Muted Coral `#E67A6B`, Soft Apricot `#ECA06E`, Dusty Lavender `#A79DCD`, Confident Periwinkle `#8794CC` according to scene hierarchy.
- Hidden World: Deep Plum `#352B37` and Warm Graphite `#2E2A2C` lead; small recalled accents from the Birthday World may remain. Soft Champagne `#E6D4AC` is a **rare luminous highlight**, not hard-gold luxury decoration.
- Ensure body text and interactive labels remain sufficiently contrasted. SVG colors must not overwrite functional state conventions.

### Composition density

- **Usually 3–5 decorative elements per scene**, adjusted for actual composition; not a mandate to populate empty space.
- One primary focus; secondary graphics support that focus.
- Meaningful negative space is valuable.
- Overlap with photography or oversized typography is allowed when it improves framing and depth.
- Do not obscure faces, key lines of text, candle interaction areas, PIN entry, or other controls.

---

## 7. Motion and interaction behavior

**Default intensity: moderate, purposeful, scene-dependent.** The experience follows the existing **Playful Precision** motion direction: UI responds quickly; major moments are choreographed.

### Functional icon motion

- Small scale/position adjustments, pressed feedback, outline/fill transitions, brief rotations only when semantically helpful.
- Fast, readable feedback; no constant spinning, bouncing, or decorative idle movement.
- Controls should remain understandable with reduced motion enabled.

### Decorative SVG motion

Permitted *when motivated*: stroke-draw, path following, morphing, mask/clip reveals, scale/rotation, restrained parallax, foreground occlusion, framing transitions.

- Signature Offset Loop can animate as a reveal or transition device, not perpetual wallpaper.
- Scene transitions may use SVG as **mask, framing layer, foreground occlusion, or decoration**; choose based on purpose.
- SVG animation should never compete with major typographic motion, photo reveal, cake manipulation, or intimate reading.
- Preserve reduced-motion fallback and mobile performance; use fewer and simpler paths when possible.
- Do not require every scene to animate all graphic elements.

---

## 8. World-specific distribution

### Birthday World — scenes 01–08

- Character: warm, playful-editorial, soft organic flow, controlled composition.
- More Flowing Forms, Editorial Frames, restrained Celebration Fragments; Human Marks appear as small personal detail.
- Richest graphic play around the Birthday Reveal and Cake, while Portrait and Letter allow more breathing room.
- Cake Scene may use tactile/dimensional visual pieces; do **not** flatten all cake assets to outline symbols. Interactive affordances come before decoration.
- Make a Wish uses restraint to preserve the candle glow and cake as focus.

### Hidden World — scenes 09–12

- Character: sparse, subtle mechanical alignment, intimate, symbolic.
- Secret Marks take on greater importance; familiar Flowing Forms become quieter/segmented or disappear.
- Vault may contain custom meaningful symbols but should remain visually minimal and believable as a premium 3D object, not a control dashboard.
- Hidden Letter and Confession must prioritize reading comfort. Most decoration can fall away.
- Retain color memory and Offset Loop derivatives to make the world transition coherent.

---

## 9. Library vs. custom decision rule

**Use Phosphor** when the element has a familiar UI meaning: mute, close, replay, microphone, undo, common navigation cues, and similar controls.

**Use custom SVG** when the element has unique scene identity or narrative significance: Offset Loop variants, special reveal/transition masks, sealed letter symbol, distinct cake affordance if necessary, and vault unlocking cues that cannot be conveyed well by an ordinary icon.

Do **not** redraw every functional icon, and do **not** use stock library icons as the main decorative illustration system.

---

## 10. Hard exclusions

- No kawaii/cute iconography.
- No wedding-style swirls, ornamental floral frames, or sentimental overload.
- No neon sci-fi HUD, hacker interface, cyberpunk lines, or vault gaming aesthetics.
- No arbitrary stock balloon/confetti/heart/star icon spam.
- No decorative SVGs added merely to fill every corner.
- No gratuitous duotone functional icon style.
- No unrelated vector art styles between scenes.
- No dense ornaments around long-form letter/confession text.
- No animation for animation's sake.

---

## 11. Design-to-engineering guidance (implementation later)

- Functional icons: use the React-compatible Phosphor package selected at implementation; import only necessary icons and weights.
- Decorative SVG: custom, componentized assets where necessary; SVG path/stroke/mask/clip capabilities already covered by the tech baseline.
- Use GSAP for orchestrated SVG narratives/transitions; component-level Motion for microinteractions as appropriate. Avoid running competing animations on the same property simultaneously.
- Asset structure, path coordinates, naming convention, icon size tokens, stroke widths, and motion timing will be determined during production.
- Prefer viewBox-based scaling, explicit semantic control labels, `aria-hidden` for purely decorative vectors, and accessible focus/touch behavior.
- Progressive enhancement: if masks/morph/WebGL features fail, preserve functional content and a clean static motif.
- No need to generate all SVG assets during this design-direction phase.

### Optional reference

Phosphor Icons official project: https://phosphoricons.com/  
Phosphor GitHub: https://github.com/phosphor-icons

---

## 12. Lock status

### LOCKED — design direction

- Name: **Soft-Mechanical Editorial Marks**.
- Two layers: **Functional Icons** versus **Custom Decorative SVGs**.
- **Phosphor** as primary icon library.
- **Regular outline** default; active/selected may use **Fill**; Light and Bold only as justified; no Duotone as house style.
- **Offset Loop** as signature motif: organic loop with deliberate geometric interruption.
- **70% stroke / 30% fill** target for decorative visual language.
- Five families: **Flowing Forms, Editorial Frames, Celebration Fragments, Human Marks, Secret Marks**.
- Slight imperfection; hybrid soft organic + graphic editorial form.
- Two palette colors maximum per decorative asset.
- Generally 3–5 compositional decorative elements per scene, never as a filler quota.
- Moderate, purposeful animated SVG treatment.
- Birthday World = playful/soft/editorial; Hidden World = sparse/symbolic/mechanical while keeping same visual DNA.
- Custom SVGs for selective signature and narrative moments; library icons for ordinary functions.
- Strict restraint around hearts, sparkles, ornaments, and Confession typography.
- Removal rule for purposeless decoration.

### PENDING — asset production and refinement

- Actual Offset Loop geometry / Bézier paths and SVG derivatives.
- Precise icon sizing and responsive stroke-width tokens.
- Full per-scene inventory and individual asset briefs.
- Detailed icon states, semantic names, hit areas, and accessibility validation.
- Actual SVG files, vector quality checks, and color/contrast tests.
- Asset export pipeline, optimization rules, filenames, and component APIs.
- Exact timeline duration, easing, and motion-reduction behavior.
- Final shape/pattern, material/texture, depth/surface and per-scene art-direction integration.

> **Locked design direction does not mean assets have been generated.** The next production path is: `Icon & SVG fragment → scene-by-scene asset inventory → prototype signature motif → create selective SVG assets → test visual coherence → integrate with later design-system fragments`.

---

**Fragment Version:** v0.1  
**Status:** LOCKED  
**Next Design Phase:** Shape / Pattern System  
**Final Merge Target:** `DESIGN_SYSTEM.md`
