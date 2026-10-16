# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: SHAPE & PATTERN SYSTEM

> **Status:** SHAPE & PATTERN FRAGMENT v0.1 — LOCKED DIRECTION  
> **Design thesis:** Warm Kinetic Editorial Keepsake  
> **Direction name:** **Soft-Structured Kinetic Geometry**  
> **Depends on:** `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md`, `BIRTHDAY_EXPERIENCE_TECH_SPEC.md`, `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md`, `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md`, `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md`, `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md`  
> **Future destination:** `DESIGN_SYSTEM.md`  
> **Boundary:** This fragment defines shape construction, pattern rhythm, composition and transformation rules; it does **not** finalize textures, materials, shadows, 3D vault modeling, SVG source assets or motion timings.

---

## 0. Purpose and inheritance

This experience is a **private interactive birthday experience**, not a landing page, a generic birthday template, a scrapbook, or a romance-first website. It has **12 fullscreen scenes**, mobile-first, no conventional browser scrolling as scene navigation. Scenes 01–08 are the **Birthday World**; scenes 09–12 form a deliberately optional **Hidden World**. The Hidden World must feel like a deeper layer of the same project, never like a second website.

Existing non-negotiable baselines:

- **Visual thesis:** warm, kinetic, editorial, personal keepsake; **medium energy**, *alive, not busy*.
- **Composition:** dynamic editorial (roughly 70% expressive / 30% calm across the experience); controlled medium-high density; negative space remains purposeful.
- **Color:** balanced dual-accent muted-but-confident palette. Warm Ivory `#F6F1E8`, Editorial Mist `#D8D2C9`, Deep Ink `#2C282A`, Muted Coral `#E67A6B`, Soft Apricot `#ECA06E`, Dusty Lavender `#A79DCD`, Confident Periwinkle `#8794CC`, Soft Champagne `#E6D4AC`, Deep Plum `#352B37`, Warm Graphite `#2E2A2C`.
- **Typography:** Bricolage Grotesque (identity/UI), Newsreader (emotional reading), Shantell Sans (rare human trace). Shapes must support legibility and reading comfort.
- **Icon & SVG:** Phosphor is the primary *functional* icon system; custom decorative SVG language uses **Offset Loop** as signature motif, ~**70% stroke / 30% fill** direction, no more than **two colors per decorative asset**, and generally **3–5 decorative elements per scene** as a guide, not a quota.
- **Motion:** GSAP / Motion are available within the single scene runtime; motion must serve narrative, hierarchy or interaction. SVG morph, masks and parallax are capabilities, not obligations.

**Hierarchy of authority:** Flow and accessibility → narrative subject / active interaction → typography & photography → structural shapes → patterns → ambient decoration. A signature motif may disappear whenever it competes with the actual emotional subject.

---

## 1. Locked design direction — Soft-Structured Kinetic Geometry

**Organic-led, geometrically disciplined, editorial, asymmetrical but balanced, slightly imperfect.**

1. **Soft:** dominant expressive curves, open loops, restrained soft masses.
2. **Structured:** incomplete frames, deliberate cropping, offset geometry, sharp interruptions that impose control.
3. **Kinetic:** forms can guide the eye, reveal, recompose or transform between scenes when useful.
4. **Geometry:** motifs share a recognizable construction language rather than becoming unrelated decorative blobs.

**Shape ratio is qualitative, not numerical:** organic shapes lead, geometric elements provide the counterweight; a deliberately sharp corner may coexist with a rounded loop. Neither extreme roundness nor rigid geometry may dominate every scene.

Shape asymmetry is usually **subtle and composed**; expressive asymmetry is reserved for a meaningful hero composition. Imperfection is **small, intentional and repeatable**, not sloppy hand drawing.

---

## 2. Signature motif — Offset Loop (inherit, do not reinvent)

The **Offset Loop** defined in `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` remains the sole primary signature motif: a continuous-feeling organic loop with an intentional geometric **gap / interruption / displacement**.

### Invariants (LOCKED)

- Perceived loop or open arc remains recognizable.
- At least one interruption or offset reads as **deliberate**, not a rendering error.
- Combination of organic motion and geometric editorial precision survives simplification.
- Versions remain clearly related in silhouette, negative space, rhythm or transformation logic.

### Allowed derivatives

- open framing arc around typography or portrait;
- partial or cropped loop, including an enlarged out-of-viewport version;
- reduced linework and nearly complete loop at the birthday closure;
- segmented / aligned / calibrated arcs in Hidden World;
- mechanical ring-related geometry around the Vault, if materially justified;
- restrained line fragment or quiet framing echo near the Hidden Letter.

### Not allowed

- unrelated blobs renamed “Offset Loop”;
- new competing signature shapes per scene;
- making the loop compulsory in every scene;
- hiding interaction instructions solely within its symbolic form.

**Production pending:** exact Bézier coordinates, proportions, endpoints, segmentation geometry, minimum sizes and SVG components. The above construction invariants are locked; the vector path itself is not.

---

## 3. Five structural shape families (LOCKED)

These describe **construction and layout functions**, not five new decorative SVG libraries. They map back onto the existing visual vocabulary as follows:

| Structural family | Construction and function | Relation to existing Icon & SVG vocabulary |
|---|---|---|
| **Loop-Derived Forms** | Open curves, arcs, offset loops, purposeful incomplete contours; main signature and transition geometry | Flowing Forms; Secret Marks in transformed state |
| **Soft Masses** | Restrained irregular filled surfaces, soft silhouettes and large backing shapes; hold spatial weight without becoming generic blobs | Organic visual support, **not** a new icon family |
| **Editorial Cuts** | Cropped rectangles, sliced ellipses, incomplete corners/frames, straight-edge interruptions and masks | Editorial Frames |
| **Rhythm Fragments** | Small arcs, marks, short dashes and selective fills, grouped as rhythmic units | Celebration Fragments; occasional Human Marks |
| **Mechanical Derivatives** | Segment rings, alignment marks, precise cuts and calibrated contours derived from softer motifs | Secret Marks in Hidden World |

**Human Marks** remain an inherited *decorative accent family*, not a sixth structural family. They should appear sparingly, analogous to Shantell in the typography system. Figurative flower/ribbon/candle/star-like accents, when used, must stay stylized and subordinate; no stock illustration library look.

---

## 4. Pattern grammar (LOCKED)

### Rhythmic interruption, not wallpaper

A pattern is a **composed relationship among repeated elements**, where at least one of spacing, length, rotation, crop, rhythm or accent differs intentionally. It may combine organic rhythm with fragmented editorial structure.

Supported pattern modes:

1. **Quiet field:** sparse linear rhythm or a barely present alignment trace, primarily atmospheric.
2. **Directed rhythm:** repeating arcs/marks lead attention toward a portrait, CTA, cake interaction or revealed object.
3. **Editorial fragments:** non-uniform cropped forms frame a hero typographic statement or photographic reveal.
4. **Transition grammar:** line segments, masks or interrupted paths carry a visible continuity across a scene boundary.
5. **Narrative echo:** a small Offset Loop derivative or rhythm makes a previous visual moment recognizable later.

Patterns **must earn their presence** by strengthening hierarchy, atmosphere, spatial depth or story transition. Do not add a pattern because a background feels empty. Periodic grids, generic dotted wallpaper, decorative wave backgrounds, random abstract shapes and all-over confetti are explicitly rejected.

**Pattern visibility is contextual:** usually subtle, but may become a temporary visual focus during a hero or transition. Avoid simultaneous competition between a full-scale pattern and a strong hero heading. Typographic fragments are allowed selectively as editorial composition, **not** as automatic repeating text wallpaper.

---

## 5. Composition and layering rules (LOCKED)

- Each scene gets its **own intentional composition**, but shares the same shape grammar, palette behavior, typographic hierarchy and motion philosophy; no 12 disconnected posters.
- Prefer **one major visual subject**, with supporting structural forms and a restrained pattern group where needed.
- A recurring layout template (centered heading + shape + button) is not the default. Composition may be asymmetrical, cropped and layered without losing navigation clarity.
- Shapes may serve as **frame**, **photo mask**, **foreground occlusion** or **background support**. Each role must be explicitly justified.
- Overlap with large *nonessential editorial display text* is allowed only when the typography still reads as intended. Never obscure names, important copy, actionable controls, hint text, keypad values, photo identity or confession content.
- **Negative space is a pacing tool**, especially for Make a Wish, letters and confession. *Avoid dead space, not negative space.*
- Do not force a decoration count. Inherited 3–5 element guidance counts **compositional groups**; a group of repeated marks is one visual unit, not a reason to add five separate ornaments. Emotional scenes may use zero decorative groups.
- For scene 04, photo remains the anchor even when only one image is available. Masking/framing must not obscure recognizable facial features or turn it into a gallery.
- For scene 05, cake and draggable controls take priority over shape spectacle. Any tactile illusion must support the CakeComposer interaction.

### Pattern / shape hierarchy

```text
Narrative focus / active object / readable content
                    ↓
Typography + portrait + cake + vault + letter
                    ↓
Structural shape or signature motif
                    ↓
Pattern rhythm
                    ↓
Ambient decoration (optional)
```

---

## 6. Relationship to color and decorative stroke/fill

- Keep the existing **70% stroke / 30% fill** as a *general decorative SVG treatment*, **not** a universal quota for photography masks, soft masses, functional controls or full 3D assets.
- Preserve **at most two colors per individual decorative SVG asset**; this is distinct from the overall scene palette and doesn't require only two colors in a whole scene.
- A single scene should ordinarily have **one dominant accent family** with a restrained counter-accent; warm and cool are balanced **across the experience**, not forced into 50/50 in each scene.
- Body text should remain clearly readable, generally Deep Ink over light foundation and suitably high-contrast light text over the Hidden World surfaces.
- A large Soft Mass is acceptable as a structural element, but do not cover most scenes with generic filled blobs. Stroke remains the recognizable decorative DNA.
- No new color tokens are created in this fragment.

---

## 7. Shape motion / gesture rules

**Allow, with narrative purpose:** light organic morph, rotation, scale, directional movement, clip-path / mask reveal, stroke draw, path following, shallow parallax and controlled foreground occlusion.

**Motion decision logic:**

1. If the purpose is feedback for an action: subtle and responsive.
2. If the purpose is cinematic progression: deliberate, temporally choreographed and used rarely.
3. If the purpose is atmosphere: low-intensity and easy to pause or remove.
4. If nothing improves: stay still.

- **Idle:** mostly still; at most selective ambient motion where it does not fatigue reading or distract from touch targets. Respect reduced-motion and performance tiers.
- **Gesture:** certain structural forms may respond to tap/drag or become interactive only where the user can understand the affordance; no invisible dependency on hover.
- **Signature transitions:** Offset Loop may occasionally morph or become a mask/occluding foreground layer between scenes, especially at narrative hinge points. Most transitions should be simpler.
- **Technical restraint:** use available GSAP, Motion, native SVG/CSS; no new animation/pattern library required. If path morphing is costly, approximate the continuity via dashoffset, masks, transform or precomposed shape variants.

This fragment specifies *behavioral permission*, not frame-level choreography, easing or duration tokens.

---

## 8. Birthday World → Hidden World transformation

The transition is **an evolution of shape grammar**, not a palette/asset swap.

| Trait | Birthday World (01–08) | Hidden World (09–12) |
|---|---|---|
| Contours | soft, open, flowing | reduced, segmented, more geometrically precise |
| Rhythm | lively but balanced | quiet, measured, sparse |
| Composition | editorial overlaps and controlled asymmetry | stronger focal isolation and deliberate negative space |
| Motif | friendly Offset Loop / editorial framing | related offset / alignment / mechanical arc |
| Pattern | occasional celebratory / rhythmic grouping | rare integration into object or spatial clues |
| Tone | playful and warm | intimate, intentional, never horror/cyberpunk |

**Vault rule:** patterns should be minimal and integrated only when justified by the 3D object, mechanical alignment or interaction guidance. Do not project a sci-fi HUD over it. Final material and lighting remain under **Vault Art Direction**.

**Narrative clue rule:** recurring motifs may reward discovery, but an essential PIN hint or hidden gesture must have accessible, fair affordance and not depend solely on interpreting an abstract shape.

**Hidden Letter rule:** near-zero ornament where appropriate; soft editorial framing and generous reading space. **Confession rule:** no theatrical serif-and-heart page or visually coercive symbols.

---

## 9. Preliminary 12-scene distribution (design intent, NOT final artwork)

| # | Scene | Shape / pattern focus | Protect from interference |
|---|---|---|---|
| 01 | Loading / Prelude | Minimal interrupted line / partial loop; curiosity cue | Fast progression and loading clarity |
| 02 | Invitation / Open | Soft geometric framing around one clear invitation object | Primary tap/CTA |
| 03 | Birthday Reveal | Oversized loop derivative + editorial cuts in a choreographed hero | Name and Happy Birthday message |
| 04 | Portrait / Memory | Editorial cropping/framing; soft curves provide depth | Face, photo integrity, emotional focus |
| 05 | Birthday Cake Studio | Soft masses and tactile rhythm fragments, limited surrounding ornament | Decorating cake and controls |
| 06 | Make a Wish | Shapes recede; restrained glow-related framing and negative space | Decorated cake, candles, wish gesture |
| 07 | Personal Birthday Letter | Almost pattern-free; quiet text framing at most | Comfortable long-form reading |
| 08 | Final Birthday Moment | Near-complete / resolved loop, controlled closure | Authentic birthday ending |
| 09 | Hidden Transition | Organic arc segments align into geometric/mechanical derivative | Discoverable, intentional hidden gesture |
| 10 | Vault | Sparse mechanical cuts/arcs integrated into true 3D form | PIN entry and mechanical interaction |
| 11 | Hidden Letter | Minimal gentle framing with one restrained motif echo | Intentional letter-opening action |
| 12 | Confession Ending | Quiet geometry, nearly all focus on reading and release | Non-demanding personal message and ending |

Every row is a **compositional direction**, subject to later Scene-by-Scene Art Direction. The locked 12-scene flow and optional confession cannot be modified by shape design.

---

## 10. Responsive composition and accessibility

**Mobile-first rule: simplify + recompose; never merely scale desktop artwork down.**

- Large cropped shapes may move behind content, reduce detail or be removed entirely on smaller viewports.
- Keep touch targets unobstructed by decorative SVG layers; decorative overlays should not intercept gestures unless they are intentionally interactive.
- Primary meaning cannot rely only on color, subtle path motion, visual symbolism, hover or device orientation.
- If full animation is unavailable or reduced motion is requested, retain a comprehensible static arrangement and explicit controls.
- Prevent important words, letters, keypad numbers and faces from being clipped by responsive shape masks; verify narrow and short viewports and safe areas.
- Performance over ornament: limit simultaneously animated paths, heavy SVG filters, unnecessary masks and constantly moving patterns on mobile.

---

## 11. Critical exclusions

**Never use:**

- generic hero blobs / arbitrary wavy SaaS landing-page dividers;
- generic dotted grids or repeating wallpaper simply to fill space;
- kawaii/cute sticker-like ornaments or scrapbook clutter;
- heavy floral/wedding-like decorations;
- all-over confetti, balloon or sparkle spam;
- heart overload, especially as a romance-first visual identity;
- neon cyberpunk rings, circuit/HUD marks or game-like vault graphics;
- endlessly pulsating/morphing shapes, cluttered depth layers or patterns that reduce legibility;
- separate unrelated visual languages in each scene.

**Hard rejection test:** if a form or pattern adds no meaningful hierarchy, narrative, interaction, atmosphere or useful spatial composition, **remove it**.

---

## 12. Build and asset production handoff (NOT executed yet)

Expected production outputs after the wider system is finalized:

1. **Offset Loop master construction spec**: invariants, reference geometry, allowed derivatives, responsive variants.
2. **Family specimens**: small set of master forms covering the five structural families, referencing existing decorative SVG families.
3. **Pattern recipes**: quiet, directed, fragmented, transition, narrative echo—with explicit spacing/crop/irregularity rules.
4. **Scene asset matrix**: which visual units are needed, which can be reused, and where a motif must be absent.
5. **Interaction-safe variants**: static/reduced-motion/performance tier fallbacks, touch-safe bounding boxes.
6. **Color bindings** referencing the existing palette, without duplicate color tokens.
7. **Motion handoff** for GSAP/SVG effects where materially justified, not arbitrary animations.

No SVG asset generation or project implementation is implied by the present lock.

---

## 13. Lock ledger

### LOCKED — conceptual system

- **Direction:** Soft-Structured Kinetic Geometry.
- Organic-led with measured geometric control, balanced asymmetry and slight intentional imperfection.
- **Offset Loop** remains the single recognizable signature motif; derivatives retain loop + deliberate interruption.
- **Five structural families:** Loop-Derived Forms, Soft Masses, Editorial Cuts, Rhythm Fragments, Mechanical Derivatives.
- Pattern language: organic rhythm + editorial interruption; never generic wallpaper.
- Contextual pattern visibility: quiet default, occasional hero emphasis.
- Composition-first, shape-second; personal content and interactions always win.
- Unique per-scene composition within shared grammar.
- Restrained motion and selective gesture-responsive shapes.
- Birthday → Hidden evolves from soft editorial into sparse mechanical derivatives.
- Strong negative space for letter and confession.
- Responsive: simplify and recompose on mobile.
- Reuse the inherited palette, typography, icon/SVG vocabulary and motion system.
- Decorative SVG **70/30 stroke-fill** remains directional; no more than two colors per decorative asset.
- No redundant visual motifs, forced decoration quota or inaccessible narrative puzzle.

### PENDING — production and future design phases

- Exact Offset Loop path geometry and proportions.
- Actual SVG masters, paths, component library and asset file names.
- Final pattern spacing, rhythm dimensions, line/stroke widths, shape scaling tokens.
- Exact per-scene artwork, crops, z-index layering and responsive composition.
- Motion easing/duration and detailed choreography.
- Material, grain, surface texture, shadow, lighting and depth treatment.
- Cake styling and Vault 3D material/style.
- Final accessibility testing, performance validation and browser calibration.

**Pending production tokens do not reopen the locked conceptual direction.**

---

## 14. Relationship to future fragments

```text
FINAL_FLOW.md + TECH_SPEC.md
             ↓
DESIGN_DIRECTION.md
             ↓
COLOR.md + TYPOGRAPHY.md + ICON_SVG.md
             ↓
SHAPE_PATTERN.md  ← YOU ARE HERE
             ↓
MATERIAL_TEXTURE.md
             ↓
DEPTH / SURFACE → MOTION → PHOTO
             ↓
CAKE ART → VAULT ART → SCENE ART
             ↓
DESIGN_SYSTEM.md (consolidated)
```

**Final rule:** *A shape is part of the gift only when it serves the experience; it must never become more important than the person receiving it.*

**Fragment Version:** 0.1  
**Fragment Status:** LOCKED  
**Compatible with:** Warm Kinetic Editorial Keepsake · Balanced Dual-Accent Warm Chromatic Editorial · Expressive Display + Calm Reading · Offset Loop Icon & SVG Language
