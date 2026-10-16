# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: MATERIAL & TEXTURE SYSTEM

> **Status:** MATERIAL & TEXTURE SYSTEM FRAGMENT v0.1 — **LOCKED**  
> **Parent direction:** Warm Kinetic Editorial Keepsake  
> **Internal material direction:** **Tactile Editorial Surfaces**  
> **Core formula:** **Warm Paper-Matte Foundation + Restrained Satin Accents + Selective Dimensional Materials**  
> **Future destination:** `DESIGN_SYSTEM.md`  
> **Scope:** Surface identity, material families, texture hierarchy, finish policies, material-based interaction feedback, scene mapping, world transformation, production guardrails.  
> **Boundary:** This fragment does **not** finalize shadow/elevation, light rigs, 3D Vault shader parameters, cake renderer, photography grading, or scene-specific art-direction compositions.

---

## 0. DOCUMENT RELATIONSHIP & PRECEDENCE

This fragment extends, but does not replace, these locked decisions:

1. `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — 12 fullscreen scenes, birthday-first, optional hidden confession, persistent decorated cake, Vault PIN `011007`.
2. `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — Next.js/React/TypeScript; GSAP, Motion, Zustand; SVG; optional dimensional DOM/SVG cake; R3F/Three.js Vault; progressive enhancement and mobile-first fallback.
3. `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — **Warm Kinetic Editorial Keepsake**; medium energy; Dynamic Editorial; warmth > spectacle; personal > romantic; Birthday World and Hidden World share a single design DNA.
4. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` — **Balanced Dual-Accent Warm Chromatic Editorial**, muted-but-confident palette.
5. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` — Bricolage Grotesque / Newsreader / limited Shantell Sans; expressive display + calm reading.
6. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` — Phosphor functional icons; custom decorative SVG; **Offset Loop**, 70% stroke / 30% fill as visual guideline for decorative SVG; selected interaction-dependent motion.
7. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` — **Soft-Structured Kinetic Geometry**, organic-led structural grammar, interrupted rhythm, contextual patterns, readable narrative hierarchy, shape simplification on mobile.

### Non-negotiable priorities

```text
Narrative clarity > material realism
Legibility > texture
Interaction clarity > surface effects
Consistency > spectacle
Mobile reliability > visual complexity
Birthday > hidden confession
```

A conflict is resolved in favor of the upstream narrative, visual, or accessibility requirement. Material effects never force changes to already locked flow or technology.

---

## 1. DESIGN THESIS — LOCKED

### Tactile Editorial Surfaces

Surfaces should **feel crafted, not rendered for spectacle**.

Birthday World feels like a carefully designed, tactile digital keepsake: bright, warm, lightly paper-like, and visually alive. Hidden World deepens the finish into restrained graphite/plum, with quieter satin-mechanical cues. The hidden letter reintroduces the tactile warmth of the birthday experience.

**Not the goal:** photorealistic material simulation everywhere, full-screen grain, generalized glassmorphism, fake gold, glossy plastic, or a second unrelated visual universe.

### Chosen answers translated into policy

- Paper-matte foundation combined with subtle digital satin (answers 1D, 2D, 11B).
- Selective semi-realistic tactile objects, not scene-wide photorealism (3C, 4D, 28D).
- Very subtle context-sensitive texture; luxury cotton-paper character on meaningful keepsakes (6B, 7D, 8C).
- Emboss/deboss on selected letters, seals, or story-important objects only (9C).
- Matte-first Birthday World, restrained transparent overlays and highlights (12B, 13B, 14D).
- Material-state feedback belongs to genuine interactive objects (15D).
- Cake almost-3D, natural restrained candle glow, clean reading letters (18C, 19D, 20D).
- Deep matte/satin Hidden World, understated matte-metal Vault, gentle highlights, keepsake letter (21D–25D).
- Texture yields to legibility and performance (26D, 27D).
- Small coherent set of material families (29C, 30E).

---

## 2. MATERIAL FAMILIES — LOCKED

These **five** material families form the shared vocabulary. They describe conceptual surfaces; they do not require five distinct shader implementations.

| Family | Character | Primary use | Avoid |
|---|---|---|---|
| **M1 — Editorial Matte** | Warm, clean, uncoated, low-reflection; mostly implied tactility | Birthday environment, large backgrounds, clear UI and reading fields | Heavy visible fiber, dirty ivory, heavy global noise |
| **M2 — Soft Satin** | Smooth, diffused selective sheen, neither plastic nor glossy | Chosen accent fills, invitation/reveal pieces, interaction highlights | Chrome, specular streak spam, glowing every SVG |
| **M3 — Tactile Sculpted** | Curated dimensional forms, soft shading and touchable appearance | Cake, frosting, candles, chosen cake decorations | Toy-plastic look, photoreal cake dependency, unnecessary WebGL |
| **M4 — Keepsake Paper** | Premium warm paper, refined edges, very subtle relief / seal | Personal Birthday Letter; folded/hidden letter; selected meaningful envelope/seal | Full stationery simulation on every scene, distressed scrapbook paper |
| **M5 — Quiet Mechanical** | Deep matte graphite/plum, controlled satin metal detail | Hidden environment, Vault object and selected mechanical cues | Mirror chrome, sci-fi HUD, industrial grime, horror or cyberpunk aesthetic |

### Family relationship

`M4 Keepsake Paper` is a more object-specific expression of `M1 Editorial Matte`; its difference is tactile edge and fold/relief detail, **not an unrelated palette or visual style**.

`M5 Quiet Mechanical` transforms the finish and structure while preserving the scene's color memory and Offset Loop geometry. It must not introduce a new brand identity.

### Material allocation principle

There is **no fixed global ratio** such as 70% matte / 20% satin / 10% metal. Allocate materials based on focal objects, scene narrative, reading demands, and interaction functions.

---

## 3. TEXTURE INTENSITY TIERS — LOCKED

| Tier | Name | Direction | Typical use |
|---|---|---|---|
| **T0** | **Clean Surface** | Visually texture-free, crisp and stable | UI, controls, keypad, dense copy, text reading field |
| **T1** | **Micro Texture** | Barely noticeable surface grain/fiber; cannot muddy palette | Selected editorial matte background zones and atmospheric surfaces |
| **T2** | **Local Tactile Detail** | Visible only on close attention, confined to a meaningful object | Letter fold, paper edges, seal relief, selected sculpted objects |

### Distribution

- **T0 is default** for information and interactions.
- **T1 is selective**, not a compulsory viewport-wide overlay.
- **T2 is localized** and never used as general page noise.
- No rough / high-contrast **T3** texture tier is required.
- Pattern geometry from Shape & Pattern System is **not** the same thing as material grain.
- Texture may follow certain filled SVG shapes, but it **cannot** compromise the 70/30 decorative-SVG direction or make default outline icons blurry.

### Reading-safe exclusion zones

No visibly textured overlay between glyphs and the underlying reading surface where it reduces contrast or edge clarity. Newsreader paragraphs and functional Bricolage copy take priority over surface tactility.

---

## 4. FINISH & LIGHT RESPONSE — LOCKED DIRECTION

**Primary:** matte / light-diffusing.  
**Secondary:** soft satin / understated specular cue.  
**Occasional:** slight translucency and restrained luminous highlights.  
**Not core identity:** glassmorphism, metallic gold, mirror finish, full gloss, neon bloom.

Rules:

1. Satin accent **serves hierarchy**; it is not default styling on every shape.
2. Translucency is limited to selected overlays, reveals, and story-related objects; avoid large perpetual backdrop blur.
3. Soft natural light and modest satin highlights are acceptable; exact light geometry belongs to later Depth / Shadow / Surface and Vault Art Direction phases.
4. Soft Champagne `#E6D4AC` is a **luminous accent**, not a command to add metallic gold.
5. Static graphic shapes should not impersonate buttons through gratuitous press/sheens.
6. Material state transitions communicate an actual state change, not an ornamental idle animation.

> **Material feedback must communicate a change, not merely decorate an interaction.**

---

## 5. COLOR INTEGRATION — LOCKED

Use **existing** palette only unless the final Design System explicitly approves a derived tonal value for optical calibration.

| Function | Locked colors | Material character |
|---|---|---|
| Primary light canvas | Warm Ivory `#F6F1E8` | Editorial Matte |
| Secondary neutral | Editorial Mist `#D8D2C9` | Matte support / low emphasis |
| Main reading ink | Deep Ink `#2C282A` | Crisp and legible |
| Warm accents | Muted Coral `#E67A6B`; Soft Apricot `#ECA06E` | Soft Satin only where warranted |
| Cool accents | Dusty Lavender `#A79DCD`; Confident Periwinkle `#8794CC` | Muted editorial surfaces |
| Luminous detail | Soft Champagne `#E6D4AC` | Restrained highlight, not gold treatment |
| Hidden environments | Deep Plum `#352B37`; Warm Graphite `#2E2A2C` | Quiet Mechanical; matte/satin |

### Color-preservation rule

Textures, roughness impressions, glows, and highlights must not shift coral into neon plastic, lavender into childish pastel, ivory into dirty paper, or plum into sci-fi violet. Use small memory accents in Hidden World; don't reproduce the Birthday palette at equal intensity there.

### Contrast

Design for readable contrast, including on semi-transparent layers and in low-light scenes. Body copy uses appropriate high-contrast text. Color-only state changes must not be the sole indicator of interactive selection.

---

## 6. TYPOGRAPHY & ICON PROTECTION — LOCKED

### Bricolage Grotesque

Keep expressive display contours crisp. Don't distort letter edges with texture maps, noisy alpha masks, fake emboss, or shadows that defeat editorial hierarchy.

### Newsreader

Narrative paragraphs and confession use calm, clean, readable surfaces. The material should support intimacy through restraint—not make the text appear like a dramatic historic manuscript.

### Shantell Sans

Limited human annotation remains limited. Paper treatment must not trigger a broader handwritten/scrapbook aesthetic.

### Functional Phosphor icons

Default outline remains sharp; fill is reserved for active/selected states as already locked. Avoid adding material effects to all icons. Small icons require stable contrast and clean strokes.

### Decorative SVG

- Keep **Offset Loop** and the existing five decorative families; no unrelated replacement motifs.
- Preserve **70% stroke / 30% fill** as an overall *decorative SVG* visual direction, not a material distribution mandate.
- Texture/soft satin may be applied selectively to filled shapes or meaningful fragments, not across the entire stroke library.
- Maximum two colors per decorative SVG asset remains valid.
- Shape construction and pattern rhythm remain owned by Shape & Pattern System.

---

## 7. SHAPE & PATTERN RELATIONSHIP — LOCKED

Material modifies the **perceived finish** of existing geometry; it does **not** redefine structural grammar.

- Loop-derived curves typically stay visually clean.
- Soft masses may carry restrained satin or matte tonal treatment when composition needs depth.
- Editorial cuts and photographic frames prioritize clear edges.
- Celebration fragments may show occasional tactile fill, not noisy confetti textures.
- Mechanical derivatives translate the **same Offset Loop DNA** into matte segmented form, alignment detail, and selective sheen.
- Pattern repeats are contextual and purposeful; do not convert them into a background-material wallpaper.

### Hierarchy

```text
Narrative focus / interactive object
    > essential typography or portrait
    > structural shape
    > contextual pattern
    > material and texture atmosphere
```

If the material hides the subject, it loses.

---

## 8. WORLD TRANSFORMATION — LOCKED

### Birthday World: scenes 01–08

- Warm, bright, paper-matte digital foundation.
- Soft-satin cues selectively emphasize graphic/interactive moments.
- Sculpted tactile quality peaks at the cake; keepsake paper emerges at the letter.
- Don't turn every scene into a literal paper object or stationery mockup.

### Hidden World: scenes 09–12

- Transition to plum/graphite dark matte, slightly mechanical and quieter.
- Satin metal detail is understated and chiefly reserved for Vault-related objects.
- Keep a trace of Birthday World's chromatic memory.
- Keepsake paper returns inside the Vault: warmth survives the mechanical environment.
- Confession prioritizes clean reading and emotional restraint.

> **World contrast is moderate: material maturity, not a completely new visual universe.**

---

## 9. 12-SCENE MATERIAL ALLOCATION — DESIGN DIRECTION (LOCKED, NOT FINAL ART DIRECTION)

| Scene | Primary family | Texture tier | Direction / restriction |
|---|---|---|---|
| **01 Loading / Prelude** | M1 Editorial Matte | T0 | Minimal, restrained, fast first paint; no animated noise loader |
| **02 Invitation / Open** | M1 + selective M2 | T0–T1 | One purposeful focal object/finish to invite interaction |
| **03 Birthday Reveal** | M1 + subtle M2 | T0–T1 | Typography owns the scene; accents are supportive |
| **04 Portrait / Memory** | M1 + selected M4-like print impression | T0–T1 | Photo must remain natural and primary; no heavy texture overlay over the face |
| **05 Birthday Cake Studio** | M3 Tactile Sculpted | T0 interface; localized T2 object | First tactile peak; cake/decorations readable and easy to manipulate |
| **06 Make a Wish** | **Same M3 cake and same decorated state** | Same as 05 | Environmental lighting changes; cake/frosting material identity and user choices persist |
| **07 Personal Birthday Letter** | M1 + restrained M4 | T0 reading field; T1/T2 peripheral object only | Warm and intimate, never distressed scrapbook |
| **08 Final Birthday Moment** | M1 | T0–T1 | Calming material simplification supports false ending |
| **09 Hidden Transition** | M1 gradually → M5 | Contextual | Gradual material evolution, still tied to Offset Loop transformation |
| **10 Vault** | M5 Quiet Mechanical | T0 UI; selective local T2 | Genuine 3D climax: matte metal + soft satin accents; not industrial/cyberpunk |
| **11 Hidden Letter** | M4 Keepsake Paper | T0 content + local T2 folds/seal | Restores warm tactile continuity inside Hidden World |
| **12 Confession Ending** | M1/M4 reading surface + restrained M5 environment | T0 reading field | Calm and unforced; no overly dramatic material flourish |

**Important:** This mapping does not fix final composition, camera, precise roughness, shadow, lighting, or texture asset selection. Those belong to downstream phases.

---

## 10. INTERACTIVE MATERIAL STATES — LOCKED DIRECTION

Interactive finishes only change when the user can understand the state:

- **Cake decoration selected:** controlled brightness/satin/edge cue, plus a clear non-color state signal.
- **Cake decoration dragged/placed:** restrained lift/tactile feedback; final scale/shadow belongs to Depth / Motion specifications.
- **Candle ignition/extinguish:** gentle light response; do not treat the entire environment as neon bloom.
- **Letter folded/opened:** subtle paper edge, crease/seal response; focus remains on reading.
- **Vault input/lock/unlock:** restrained material feedback and mechanical clarity; keypad readability and accessibility remain intact.
- **Static ornament:** no artificial hover affordance unless actually interactive.

No persistent looping sheen simply to make a screen feel expensive.

---

## 11. SIX CROSS-FRAGMENT CONFLICT GUARDRAILS — LOCKED

### G1 — Paper vs Color

Paper character must **not** muddy Warm Ivory or mute the chromatic editorial palette. Default to color/shading first; add subtle grain only if it improves tactility.

### G2 — Texture vs Typography

Readable text wins. Restrict fiber, emboss, overlays, and noisy finish around Newsreader body and functional Bricolage.

### G3 — Satin vs SVG 70/30

Do not make all strokes reflective or luminous. Satin is an accent on selective surfaces, independent from the 70/30 stroke–fill policy.

### G4 — Cake vs Tech

Do not require 3D/WebGL to achieve tactile cake. DOM + SVG remains preferred candidate pending interaction prototyping; maintain cake-state continuity into Scene 06.

### G5 — Vault Realism vs Narrative

Avoid industrial heaviness and sci-fi chrome. Vault is believable, spatial, mechanically precise, and restrained—not an asset-showcase game object.

### G6 — Texture vs Mobile

Avoid full-screen animated grain, large perpetual blur, excessive shaders/reflection passes, and heavy texture maps. Degrade gracefully while preserving interaction and story.

---

## 12. TECHNICAL DELIVERY RULES — LOCKED DIRECTION

### 2D / UI

- Start with solid-color CSS, gradients and minimal SVG where they materially improve the surface.
- Add compressed, reusable small texture assets only after visual validation; avoid oversized opaque bitmaps.
- Keep the type layer visually separate from textured areas when required.
- Avoid full-screen `backdrop-filter` as a default styling technique.
- Prefer static textures over perpetual animated noise.
- Motion of surface layers must obey the existing GSAP/Motion ownership rules; no new animation library is authorized.

### Cake

- Build a tactile appearance through curated layering, vector shading, SVG/DOM transforms, perspective, and responsive interaction.
- Don't finalize renderer from this fragment; the interaction prototype resolves it.
- Cake remains recognizable and continuous between Scenes 05 and 06.

### Vault

- R3F/Three.js with PBR-compatible GLB/glTF pipeline from the locked Tech Spec.
- Approximate material intent: deep matte finish, subtle brushed/satin elements, soft highlights.
- Exact metalness/roughness, textures, normal maps, environment maps, and reflection budget remain pending model/lighting tests.
- Load late, after initial birthday experience; preserve **full 3D → 2.5D → DOM/static interactive fallback**.

### Capability / accessibility

- Progressive enhancement according to actual device capability, not an assumption that desktop effects should all appear on mobile.
- Prefer mobile simplification and recomposition over scaled-down heavy effects.
- Respect `prefers-reduced-motion` and preserve fully accessible controls and path completion.
- Don't let visible texture simulate false click targets or obscure gesture hints.

---

## 13. DO / DO NOT

### DO

- Aim for warm, premium editorial tactility through careful restraint.
- Keep M1 as the foundational visual behavior.
- Use M2 only as selective visual emphasis.
- Reserve M3 for tactile story objects, especially cake.
- Reserve M4 for meaningful reading/keepsake moments.
- Reserve M5 for the hidden transformation and Vault.
- Keep text crisp and surfaces clean where reading matters.
- Let the hidden letter restore warmth and continuity.
- Design for mobile first and gracefully degrade.

### DO NOT

- Don't use fake luxury gold, wedding stationery extravagance, faux marble everywhere, or chrome marketing renders.
- Don't build SaaS glassmorphic cards or blur-heavy panels.
- Don't use glossy toy-plastic cake styling.
- Don't spray grain or procedural noise over every viewport.
- Don't emboss entire paragraphs or build a distressed paper scrapbook.
- Don't give every SVG/material a reflective specular accent.
- Don't turn the Vault into industrial horror, high-tech HUD, or cyberpunk neon.
- Don't add 3D complexity without narrative/interaction need.
- Don't let textures, finish, or shaders break core interactions on low-end devices.

---

## 14. BOUNDARIES WITH FUTURE DESIGN PHASES

The following subjects are intentionally **not** finalized here:

- **Depth / Shadow / Surface Rules:** elevation levels, optical shadow recipes, overlap/depth ordering, border/radius system, lighting relationship.
- **Motion Rules:** exact surface transition durations, easing, sheen timing, physics and gesture choreography.
- **Photo Treatment:** grading, crop language, photographic texture/mask treatment; this fragment only prevents photo-degrading effects.
- **Cake Art Direction:** frosting model, decoration assets, material shaders and precise customization look.
- **Vault Art Direction:** mesh, actual material maps, roughness/metalness, camera, light rig, interaction geometry.
- **Scene Art Direction:** specific visual arrangement and material placement per scene.

These later documents must remain consistent with this direction; refinement is allowed, replacement of its underlying identity is not automatic.

---

## 15. LOCK STATUS

### LOCKED — MATERIAL & TEXTURE v0.1

- Internal direction: **Tactile Editorial Surfaces**.
- Formula: **Warm Paper-Matte Foundation + Restrained Satin Accents + Selective Dimensional Materials**.
- Five material families: Editorial Matte, Soft Satin, Tactile Sculpted, Keepsake Paper, Quiet Mechanical.
- Three texture tiers: T0 clean, T1 micro, T2 local detail.
- Default T0 for information/interaction; selective T1; T2 only on meaningful objects.
- Matte-first, satin as restrained accent, non-essential gloss/glass avoided.
- True interactive objects may exhibit material-state feedback; static decoration does not fake interactivity.
- Material evolution across Birthday/Hidden Worlds preserves the same visual DNA and color memory.
- Same cake state and visual material continuity between Scenes 05 and 06.
- Hidden letter reintroduces tactile warmth after the Vault.
- Existing Color, Typography, Icon/SVG, Shape/Pattern decisions are protected.
- Mobile-first, performance-aware, accessible progressive enhancement.
- Six explicit conflict guardrails G1–G6.

### PENDING — PRODUCTION TUNING / LATER ART DIRECTION

- Exact opacity/intensity of grain and fibers.
- Compression, format, resolution, and asset budgets for textures.
- Actual satin highlight curves and reflection sampling.
- Shadow/elevation and layer depth rules.
- Emboss/deboss physical specifications and scale.
- Final cake material rendering and decoration designs.
- Final 3D Vault mesh, PBR parameters, shader, lighting, reflection budget.
- Exact scene-specific material placement and animation timings.
- Device acceptance tests, readability calibration, and final accessibility verification.

> **LOCKED DIRECTION is not the same as finalized production tokens.** Numbers must be tested on actual compositions, assets, devices, and type sizes.

---

## 16. FUTURE MERGE

```text
FLOW.md + TECH_SPEC.md
        ↓
DESIGN_DIRECTION.md
        ↓
COLOR + TYPOGRAPHY + ICON_SVG + SHAPE_PATTERN
        ↓
MATERIAL_TEXTURE  ← THIS FRAGMENT (LOCKED)
        ↓
DEPTH_SHADOW_SURFACE
        ↓
MOTION + PHOTO + CAKE + VAULT + SCENE ART DIRECTION
        ↓
DESIGN_SYSTEM.md
        ↓
IMPLEMENTATION PLAN
```

**Final principle:** *Surfaces should feel crafted, not rendered for spectacle.*

**Fragment version:** v0.1  
**Fragment status:** **LOCKED**  
**Implementation status:** **NOT STARTED — PLANNING ONLY**
