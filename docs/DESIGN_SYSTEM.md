# BIRTHDAY EXPERIENCE — DESIGN SYSTEM

> **Version:** 1.0 — CONSOLIDATED DESIGN SYSTEM / PROTOTYPE MASTER SPECIFICATION  
> **Status:** **Design specification consolidated** from approved baselines; **prototype, content, assets, and QA are not yet complete**.  
> **Product thesis:** **This is not a birthday website. It is a private interactive birthday experience.**  
> **Design identity:** **Warm Kinetic Editorial Keepsake**  
> **Narrative identity:** **A Keepsake That Slowly Opens**  
> **Primary target:** mobile-first, full-screen, single-runtime interactive birthday gift.  
> **Document language:** Indonesian operational specification, retaining approved English names for internal concepts, scene IDs, token names, and technical APIs. Final audience-facing wording is **PENDING CONTENT**.  
> **Authority:** the 14 canonical documents listed in §0.2. This master consolidates them; it **does not revoke or silently rewrite** their approved decisions.

---

## 0. Read this first — identity, provenance and authority

### 0.1 Intended use

This is the **single implementation entry point** for design, frontend, 3D production, content, motion, accessibility and prototype review. It is sufficiently prescriptive to start designing and coding a prototype, without pretending that untested pixel sizes, duration curves, lighting values, real copy, real photos or GLB assets have been approved.

- **LOCKED:** approved product structure, visual identity, behavioral invariants and agreed direction. Implement without reinterpretation.
- **PROPOSED IMPLEMENTATION:** actionable engineering and design defaults recommended here; verify in the prototype; not a newly approved creative lock.
- **PENDING CONTENT:** recipient details, personal writing and verified media.
- **PENDING PROTOTYPE:** exact coordinates, measurements, scene choreography, production art and tuning.
- **MUST PASS QA:** objective conditions that cannot be waived by a visually attractive demo.

Any clash with a LOCKED source is an **issue to surface and get approval for**, not a chance to select a more convenient alternative. Specific engineering examples below are illustrative contracts, not declarations that corresponding assets or code already exist.

### 0.2 Canonical source manifest — 14 documents

**Source-integrity finding:** the uploaded `BIRTHDAY_EXPERIENCE_ALL_LOCKED_DOCS.zip` contained **13 Markdown documents**. The approved `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SCENE_BY_SCENE.md` was absent from that ZIP; it was recovered from its previously generated, conversation-attached version. Thus all **14** intended sources were available for this synthesis, but their **provenance differs**. If a newer local Scene-by-Scene document exists, compare it and reconcile explicitly before implementation.

| Layer | Canonical filename | Authority in this system |
|---|---|---|
| F01 | `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` | Non-negotiable 12-scene flow, PIN, birthday-first optional confession, explicit letter opening |
| F02 | `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` | Approved technical architecture, capabilities, scene runtime and fallback; tech baseline is **provisionally locked**, not a blanket finalization of all choices |
| F03 | `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` | Emotional, editorial, visual and world-level identity |
| D01 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` | Palette and chromatic policy |
| D02 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` | Font families and typographic roles |
| D03 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` | Phosphor icon grammar, SVG vocabulary, Offset Loop |
| D04 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` | Structural shape and pattern grammar |
| D05 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` | Material families M1–M5, texture tiers T0–T2 |
| D06 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE.md` | Logical depth planes, surfaces, shadow classes S0–S3 |
| D07 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MOTION.md` | Motion classes M0–M5, transition families T1–T4 and interaction guarantees |
| D08 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_PHOTO_TREATMENT.md` | Authentic photo treatment P1–P4, adaptive 1–6 photo strategy |
| D09 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_CAKE_ART_DIRECTION.md` | Sculpted Celebration Cake, decoration and Scene 05→06 state continuity |
| D10 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_VAULT_ART_DIRECTION.md` | Quiet Keepsake Vault, physically animated hinged 3D door, letter ritual |
| D11 | `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SCENE_BY_SCENE.md` | Approved final audit and 12 scene allocations; **recovered from conversation, not ZIP** |

### 0.3 Precedence and conflict resolution

1. **Flow / consent / narrative ethics** outranks all styling and animation.
2. **Tech runtime and core fallbacks** define implementation feasibility; provisional choices remain labeled as such.
3. **Design Direction** defines what the whole experience must feel like.
4. **Domain-specific design fragment** owns its own system (Color for colors, Motion for motion, Cake for cake, Vault for vault, etc.).
5. **Scene-by-Scene** allocates those systems to scenes; it cannot invent a replacement global rule.
6. **This consolidated document** provides discoverable tokens, composition contracts, integration patterns and test gates. It may clarify ambiguity but may not change a LOCKED decision without a revision log and user approval.

**Namespace collision resolution — mandatory:** source fragments use some identical shorthand for different systems. In code, specs and tickets use qualified names:

- `material.M1`–`material.M5` = material families, **not** Motion classes.
- `motion.M0`–`motion.M5` = motion roles.
- `texture.T0`–`texture.T2` = texture intensity, **not** transitions.
- `transition.T1`–`transition.T4` = scene transition families.
- `shadow.S0`–`shadow.S3` = shadow classes.
- `photo.P1`–`photo.P4` = photography treatments.

Don't create unqualified identifiers such as `M2` or `T1` in implementation discussions or token files.

### 0.4 Resolution ledger: potentially misleading or competing statements

| Topic / apparent tension | Resolution for prototype |
|---|---|
| **13 Markdown inside ZIP vs claimed 14** | All 13 ZIP sources + recovered approved D11 constitute 14; provenance recorded; do not claim the ZIP held D11. |
| **Design Direction lists old “not yet locked” design aspects** | Its historical pending list predates subsequent approved fragments. D01–D11 resolve the applicable conceptual decisions; truly unfinished production values remain PENDING. |
| **T4 immersive zoom “candidate” vs Scene-by-Scene 08→09** | Approved art-direction **target is 08→09 after intentional discovery**; exact camera/crop/gesture tuning still PENDING PROTOTYPE. One primary T4 only. |
| **Darkening Make a Wish vs Hidden World's deep tones** | Scene 06 can dim locally but **remains unmistakably Birthday World** through warm cake/flame identity. Don't prematurely reveal deep-plum mechanical world. |
| **Physical letter vs readable confession** | Scene 11 shows a real-feeling folded paper in the Vault; **an explicit second user choice** transitions it into a legible 2D editorial reading surface for Scene 12. |
| **Mandatory 3D door animation vs weak hardware/reduced motion** | Primary full-3D path **must actually articulate lock and hinged door**. Reduced-motion and low-capability paths intentionally simplify visual movement but retain equivalent **state and access**; never substitute a static swap in capable primary path. |
| **Single-tier cake vs 5 decoration categories** | Limit valid locations and compatible combinations; preserve responsive interactivity rather than adding tiers or freeform physics. |
| **1–6 photos vs uncertainty of media availability** | Two photos are the design baseline, **one is valid**, extra photos are optional. No gallery, no fabricated copies, no vacant slots. |
| **Feature-rich Tech Spec vs product simplicity** | Only the approved core stack is required. Optional mic, drag enhancements, parallax, procedural pieces, sound cues and Canvas2D do **not** become mandatory merely because supported. |
| **“Private” experience vs publicly accessible URL / PIN** | Personal/intimate intent is not equivalent to security. Narrative PIN `011007` and obscurity do **not** protect content. Hosting privacy/access controls are a separate explicit deployment decision. |
| **UI language vs internal English labels** | English scene and art names are internal. Final recipient-facing prose, labels and instruction language require a **single approved copy/locale pass**; example text must not be mistaken for approved personal writing. |
| **Prototype suggested metrics vs locked tokens** | Any sizes, WCAG targets, media thresholds, contrast checks, budget tables and code shapes newly proposed below are implementation requirements/recommendations **to test**, not retroactive locks in the fragments. |

---

## 1. North star: creative, emotional and product constraints

### 1.1 The hierarchy of importance

**Warmth > spectacle. Personality > decoration. Personal > romantic. Birthday > confession.** These are not slogans for a slide: when a treatment competes with a reader, portrait, birthday moment or a voluntary choice, remove or simplify the treatment.

- **Warm:** familiar, human, caring, never cold luxury for its own sake.
- **Kinetic:** responsive interactions plus selective editorial reveal, not perpetual animation.
- **Editorial:** asymmetry, sophisticated composition, meaningful typography, controlled overlap and negative space.
- **Keepsake:** a digital gift for one person, not a product landing page, portfolio, fanpage, ecommerce customization tool or technical showcase.
- **Alive, not busy:** medium energy, controlled medium-high density only where a scene needs it.
- **Playful Precision:** responsive UI; major moments deliberately choreographed.

### 1.2 Product experience boundaries — LOCKED

- **12 scenes exactly**; no extra narrative scene or conventional page route masquerading as a scene.
- Birthday narrative can end independently at **Scene 08**. Discovering hidden content is optional and requires deliberate intent.
- Hidden confession is **not** a reward for passing a difficult puzzle. PIN is a narrative ritual, not a security measure.
- Unlocking Vault and opening the folded letter are **separate intentional steps**. Never autoplay confession after correct PIN.
- No Yes/No romantic challenge, countdown, demand for an answer, forced contact action or guilt-inducing language.
- Internal friendship/history reference since **2022** is contextual only; personalized recollections, messages, dates and names must be independently confirmed in content production.
- Primary medium is a **mobile browser**; desktop is a deliberate responsive re-composition, not the design source scaled down.
- Atmosphere may deepen in Hidden World, but typography, graphic language, craft and emotional warmth preserve one visual DNA.

### 1.3 Four narrative acts (grouping, not routes)

| Act | Scenes | Emotional rhythm | Distinct focus |
|---|---|---|---|
| I — The Gift Opens | 01–03 | Curiosity → invitation → celebration | Offset Loop and personalized name |
| II — Connection & Play | 04–06 | Recognition → active play → wish | Authentic portrait, cake, candle ritual |
| III — Birthday Is Complete | 07–08 | Appreciation → full birthday closure | Genuine birthday letter and closing |
| IV — Optional Hidden Layer | 09–12 | Discovery → anticipation → voluntary opening → honest release | Gesture, 3D Vault, paper keepsake, confession |

### 1.4 Global visual budgets (directions, not mathematical quotas)

- Target expressive/calm overall art direction approximately **70/30**; does **not** force a specific number of centered scenes.
- Normally **one primary subject** with **2–4 supporting elements**, but sparse emotional scenes may have fewer.
- Decorative SVG visual character approximately **70% stroke / 30% fill**; this is **not** the ratio for solid cake shapes, photo masks, 3D meshes or button icons.
- Usually **3–5 decorative compositional units at most** in lively scenes; zero is valid in letters/confession. A cluster of marks can be one unit.
- **One dominant accent family per scene**; warm/cool balance is achieved across the journey, not through equal amounts on one screen.
- **At most one primary ambient-motion system and one primary depth hero effect per scene**; disable them when interaction/reading requires focus.
- Soft Champagne `<5%` as restrained luminous highlight from the Color fragment; **never fake metallic luxury by saturating the page with it**.

### 1.5 Non-goals / visual rejection list

Reject: template birthday balloons/confetti everywhere; pink-and-gold wedding luxury; scrapbook/polaroid grid; SaaS dashboard/card boilerplate; scroll-driven landing page; neon cyberpunk safe; luxury chrome; glassmorphism as default; oversized particles; overly slow cinematic progress; randomly bouncing icons; forced music; AI-generated fake shared memories; photographic face modification; standard bank-vault game puzzle; full WebGL cake; unrelated dramatic typography in the Hidden World.

---

## 2. Experience and navigation contract

### 2.1 Canonical twelve-scene map

```text
S01 Loading / Prelude
  └─[critical shell ready]→ S02 The Invitation / Open
     └─[explicit OPEN gesture]→ S03 Birthday Reveal
        └─[continue after reveal]→ S04 Portrait / Memory Moment
           └─[continue]→ S05 Birthday Cake Studio
              └─[Finish Cake]→ S06 Make a Wish
                 └─[intentional extinguish + clear continuation]→ S07 Personal Birthday Letter
                    └─[after reading; user continue]→ S08 Final Birthday Moment
                       ├─[end / replay]→ Complete Birthday Experience
                       └─[deliberate Quiet Second Invitation]→ S09 Hidden Transition
                          └─[confirmed swipe/drag or accessible equivalent]→ S10 The Vault
                             └─[PIN 011007 + mechanical unlock]→ S11 The Hidden Letter
                                └─[separate explicit letter OPEN]→ S12 Confession Ending
                                   └─[close / fade / replay]→ End
```

**S08 optionality:** The quiet second invitation must be noticeable on discovery, unobtrusive during the genuine closing and never framed as necessary to finish the gift. The hidden gesture may form a two-stage discovery path; both intent confirmation and accessible equivalent must be defined in prototype. Standard document scrolling must not trigger S09.

**S10→S11:** The 3D mechanism opening, stable visible physical letter, and letter-opening action are three distinguishable states. The last is not a side effect of the first two.

### 2.2 Explicit state and intent rules

- Every narrative advance requires a documented event and eligibility guard; transitional visuals are not an alternative source of truth.
- Essential operations are **idempotent**: rapid double-tap must not duplicate scene transitions, decoration objects, wishes, audio cues, unlocks or confession reveals.
- Inputs during `entering`/`exiting` must have an explicit policy: safely ignore with feedback, queue at most one permitted action, or cancel a reversible visual. No arbitrary race.
- User intent outranks optional animation; mandatory interaction cannot be skipped by animation completion handlers.
- Focus loss/page hidden should suspend optional work, preserve semantic state, then resume/recover without committing an unrequested action.
- Full replay returns to the beginning; default reset includes cake configuration and wish state, Vault locked state, confession state, scene lifecycle and audio timeline. Never resume with Vault inadvertently open.
- User can read/write nothing personally sensitive into the app as a prerequisite; v1 does not require an account or backend.

### 2.3 Utility and consent

- After S02's deliberate gesture, audio **may** start according to explicit preference and browser rules; mute/unmute stays accessible. Silence cannot block progress.
- No required microphone. Blow detection is optional, separately permissioned and always replaceable by touch/hold.
- No navigation depends exclusively on hover, precise drag, 3D raycast, microphone, sound, haptic, animation or strong GPU.
- The long letters (S07, S12) have **user-controlled reading pace** and may allow **scrolling inside a reading region**. This does not turn browser scroll into scene navigation.
- Focus, control hit areas, content legibility and safety areas outrank ornamental overlap.

---
## 3. Color system — canonical palette and semantic roles

### 3.1 LOCKED foundational palette

| Canonical token | Value | Intended role |
|---|---|---|
| `color.warmIvory` | `#F6F1E8` | Birthday open canvas, warm paper and light reading surfaces |
| `color.editorialMist` | `#D8D2C9` | Neutral support, separation, framing and understated background |
| `color.deepInk` | `#2C282A` | Primary readable type and structural ink |
| `color.mutedCoral` | `#E67A6B` | Warm celebratory expressive accent |
| `color.softApricot` | `#ECA06E` | Warm complementary accent, crafted highlights |
| `color.dustyLavender` | `#A79DCD` | Muted cool editorial accent |
| `color.confidentPeriwinkle` | `#8794CC` | Stronger cool counter-accent |
| `color.softChampagne` | `#E6D4AC` | Rare luminous touch, not metallic gold |
| `color.deepPlum` | `#352B37` | Hidden World primary atmosphere |
| `color.warmGraphite` | `#2E2A2C` | Hidden structures, Vault matte material and dark layers |

**Philosophy:** **Balanced Dual-Accent Warm Chromatic Editorial**; personality **Muted-but-confident**. Birthday World is mostly warm bright and editorial; Hidden World becomes deeper, never horror/sci-fi. Pink is not the defining family. Avoid routine pure white or pure black when approved warm neutrals work. Derived tonal shades for hover/translucency or technical calibration must remain recognizably derived from the locked palette and be labeled implementation-derived rather than approved new identity tokens.

### 3.2 Proposed semantic token aliases — mapping, not new colors

```css
/* Exact palette values below are LOCKED. Semantic aliases are PROPOSED IMPLEMENTATION. */
:root {
  --color-warm-ivory: #F6F1E8;
  --color-editorial-mist: #D8D2C9;
  --color-deep-ink: #2C282A;
  --color-muted-coral: #E67A6B;
  --color-soft-apricot: #ECA06E;
  --color-dusty-lavender: #A79DCD;
  --color-confident-periwinkle: #8794CC;
  --color-soft-champagne: #E6D4AC;
  --color-deep-plum: #352B37;
  --color-warm-graphite: #2E2A2C;

  --scene-canvas: var(--color-warm-ivory);
  --scene-ink: var(--color-deep-ink);
  --scene-secondary-surface: var(--color-editorial-mist);
  --scene-accent: var(--color-muted-coral);
  --scene-accent-companion: var(--color-soft-apricot);
  --reading-surface: var(--color-warm-ivory);
  --reading-ink: var(--color-deep-ink);
}
[data-world="hidden"] {
  --scene-canvas: var(--color-deep-plum);
  --scene-ink: var(--color-warm-ivory);
  --scene-secondary-surface: var(--color-warm-graphite);
  --scene-accent: var(--color-dusty-lavender);
  --scene-accent-companion: var(--color-soft-champagne);
}
```

**Rules:** no component hardcodes decorative colors outside tokens; art-generated textures may need physically plausible derived shading, not new prominent UI colors; accessibility/focus/error treatments must be optically tested rather than forced into a low-contrast accent. The above mappings don't mean every hidden paper surface is dark; Scene 12 intentionally returns to warm paper.

### 3.3 Contrasts and interaction colors — checked implementation guidance

As an implementation audit, the source palette yields these approximate ordinary sRGB contrast ratios: Deep Ink on Ivory **12.93:1**, Ivory on Deep Plum **12.03:1**, Soft Champagne on Deep Plum **9.26:1**; Coral on Ivory **2.54:1**, Lavender on Ivory **2.24:1**, Periwinkle on Ivory **2.61:1**. **Therefore Coral/Lavender/Periwinkle must not be treated as ordinary small-text-on-Ivory colors just because they are approved accents.** Use Deep Ink or other verified foreground colors for text, with accent-colored shapes/backgrounds. This quantitative check is a **new implementation audit**, not an original fragment's locked contrast metric.

**Proposed QA target:** test WCAG AA contrast, including 4.5:1 ordinary text and 3:1 large text/UI indicators where applicable. Re-test every derived overlay, gradient, photo-text overlay, shadowed input and dark-scene hint in browser, not solely base token pairs. Never indicate errors or active state through color alone.

### 3.4 Scene-level palette contract

| Scene | Foundation / dominant voice | Accent discipline |
|---|---|---|
| 01 | Warm Ivory, very restrained warm family | Curiosity should be quiet |
| 02 | Warm paper/matte, chosen warm/cool family | Invitation remains one object |
| 03 | Selected warm or cool celebratory family | High-impact typography; one family owns composition |
| 04 | Warm Ivory / light neutral | Accent frames photography; do not recolor skin |
| 05 | Warm Ivory stage + user-selected compatible cake preset | Choice is curated, not unrestricted color mixing |
| 06 | Warm intimate dimming around existing cake | Flame illuminates; not Hidden World lighting |
| 07 | Warm Ivory / paper / Deep Ink | Reading contrast first |
| 08 | Warm resolved neutral with selective accent | Full birthday closure, no forced dark shift |
| 09 | Familiar warm/cool DNA morphs into Deep Plum / Graphite | Segmented mechanical identity appears progressively |
| 10 | Deep Plum environment, Graphite body | Satin details and rare Champagne highlights |
| 11 | Graphite/Plum → visible warm paper | Paper becomes emotional subject |
| 12 | Warm paper / Deep Ink, with memory of Hidden | Calm reading; no sudden romance-first colors |

---

## 4. Typography system

### 4.1 LOCKED font families and responsibilities

| Font | Role | Boundaries |
|---|---|---|
| **Bricolage Grotesque Variable** | Brand/display, name reveal, headers, navigation, action labels, instructions, control tray, PIN UI | Expressive, youthful and editorial; never generic corporate UI |
| **Newsreader Variable** | Birthday letter, emotional reading, optional message focus, hidden letter/confession | Calm and highly legible; no theatrical oversized italic confession |
| **Shantell Sans Variable** | Very rare personal handwriting accent or tiny signature/note | **Not** hero headline, long text, scene heading, primary CTA or confession body |

Directional dominance (not quota): Birthday roughly **80% Bricolage / 18% Newsreader / 2% Shantell**; Hidden roughly **65% / 34% / 1%**. Role and readability override any numerical target. Hidden World **does not introduce a fourth font**.

### 4.2 Canonical role taxonomy

| Role token | Default font | What it does | Constraints |
|---|---|---|---|
| `type.megaDisplay` | Bricolage | Highly selective giant editorial moment (e.g. name) | Must reflow long names without clipping |
| `type.heroDisplay` | Bricolage | Primary scene emotional/display anchor | May overlap decorative, never cover essential content |
| `type.editorialDisplay` | Bricolage | Composition-scale secondary typography | Layering intentional, accessible logical DOM order |
| `type.sceneHeading` | Bricolage | Scene orientation | Visible and not confused with decorative marks |
| `type.narrativeLarge` | Newsreader selectively | Short emotional statement | Avoid forced sentimental flourishes |
| `type.body` | Bricolage functional, Newsreader emotional | Readable supporting copy and letters | High contrast, readable line length and line-height |
| `type.uiAction` | Bricolage | Primary and secondary interactive labels | Action meaning, active/focus/disabled states |
| `type.instruction` | Bricolage | Tap/hold/drag/PIN instructions | Not hidden as low-contrast micro-label |
| `type.microLabel` | Bricolage | Nonessential index, metadata, scene labels | Must not carry exclusive critical instructions |
| `type.personalMark` | Shantell | Rare human trace | No scrapbook aesthetic proliferation |

### 4.3 Type scale and layout direction

Exact production values are **PENDING PROTOTYPE**. The typography fragment includes **initial responsive suggestions** (e.g. mega display roughly `clamp(4.5rem, 16vw, 12rem)`), which are **calibration examples**, not validated requirements for every phone. For prototype, expose **role tokens** for `font-size`, `line-height`, `font-weight`, `letter-spacing`, and `max-inline-size` rather than sprinkling raw values into scenes.

- Test long recipient names at narrow viewport widths; split at intentional words, not arbitrary character truncation.
- S07 and S12 use Newsreader for primary passages, no artificial minimum reading speed or forced scroll.
- Preserve paragraph rhythm and editorial negative space; do not justify long body paragraphs.
- Avoid all-uppercase blocks for reading and multiple overlay display headlines simultaneously.
- S10 PIN values and errors use legible Bricolage, **not** decorative numeric glyphs embedded in the GLB.
- Assistive technology receives semantically complete actual text regardless of visual glyph animation.

### 4.4 Font delivery contract

Self-host `.woff2` variable fonts using `next/font/local` where compatible; prefer Bricolage variable, Newsreader regular and italic variable where needed, Shantell variable only where needed. Do not load an entire GitHub source repository or all font masters as public assets. The user has downloaded source distributions, but **usable production WOFF2 paths/weights must be verified**, not invented. Subset/optimize cautiously and test multilingual glyph coverage.

**Font source references in the Typography fragment:** Bricolage `https://github.com/ateliertriay/bricolage`, Newsreader `https://github.com/productiontype/Newsreader`, Shantell Sans `https://github.com/arrowtype/shantell-sans`. Production font filenames and generated `@font-face` mapping are PENDING.

---

## 5. Graphic language: Phosphor, SVG, Offset Loop, shapes and patterns

### 5.1 Separate icon systems — LOCKED

**Functional icons:** Phosphor **Regular** by default; **Light** sparingly if readable; **Fill** to indicate applicable active/selected state; **Bold** for small-size clarity if needed; **Duotone not default**. Map icons to actual actions (mute, continue, close, undo, remove, reset, drag hint, microphone, replay, PIN utility), not to ornamental scene filling. Labels, visible focus and non-color feedback for important controls are mandatory.

**Decorative graphics:** bespoke SVG vocabulary. Do **not** decorate with a pile of random Phosphor, clip art or stock birthday icons. Decorative shapes may be stroke, filled support, photographic framing or masks with clear composition roles; they are not automatically interactive.

### 5.2 Offset Loop — signature grammar

A flowing **organic open loop with one deliberate geometric interruption/offset**, neither mathematically perfect nor rough sketch. Recognizable across entry, exit, masks and mechanical derivatives. It is a **visual memory**, not a compulsory logo in every scene.

- Birthday: open, friendly, expressive arc; editorial framing around invitation/portrait where appropriate.
- Finale: nearly resolved / calm gesture.
- Hidden Transition: gradual alignment, segmentation and depth.
- Vault: restrained mechanical arc / segmented ring integrated into actual object structure.
- Hidden Letter/Confession: almost absent; never impose ornament around personal reading.
- No claim that its Bézier path, break width, orientation or source SVG has already been finalized; all are PENDING ASSET PRODUCTION.

### 5.3 Five decorative SVG families

1. **Flowing Forms** — soft open arcs and flowing strokes (not literal wedding ribbons).
2. **Editorial Frames** — crop cuts, interrupted corner lines, offset framing and editorial geometry.
3. **Celebration Fragments** — short arcs, dashes, restrained bursts and small constructed accents (not a confetti shower).
4. **Human Marks** — short imperfect underline/circle/annotation, used as sparingly as Shantell.
5. **Secret Marks** — segmented alignment, concentric partial arcs, broken mechanical forms, not cyberpunk HUD.

Per individual decorative SVG asset: **maximum two distinct locked palette colors** (not a maximum of two colors per scene); target overall stroke/fill balance **70/30**, not a strict per-asset numeric ratio.

### 5.4 Five structural shape families

| Family | Function | Relationship to decorative vocabulary |
|---|---|---|
| Loop-Derived Forms | Open continuous-feeling arcs, interruptions and reveals | Flowing Forms / Secret Marks |
| Soft Masses | Limited filled organic backing surfaces | Structural support, not a stock blob library |
| Editorial Cuts | Cropped rectangle/ellipse, incomplete corners, clipping | Editorial Frames |
| Rhythm Fragments | Grouped dashes/arcs and controlled repetition | Celebration Fragments / Human Marks |
| Mechanical Derivatives | Segmented rings, calibrated cuts and alignment | Secret Marks, principally Hidden/Vault |

**Shapes are structural; icons are functional; decoration is atmospheric.** These taxonomies overlap in origin without becoming synonymous or authorizing new decoration libraries.

### 5.5 Pattern grammar and composition

Pattern means **interrupted rhythm**, never wallpaper. Use when guiding attention, framing a hero, echoing a narrative motif or bridging a transition. Allowed modes: Quiet Field, Directed Rhythm, Editorial Fragments, Transition Grammar and Narrative Echo. A strong birthday hero and a full-surface pattern must not compete simultaneously.

**Hierarchy:** narrative / active object / readable content → display type & portrait / cake / vault / letter → structural shape → pattern → optional atmosphere. Essential text, face, placement zones, PIN and controls always win. Remove or simplify shape groups on mobile instead of merely scaling desktop compositions.

### 5.6 SVG production rules

- Produce source in accessible vector sizes/viewBoxes; optimize carefully without deforming signature interruptions.
- Separate decoratively repeated shapes from semantic DOM; decorative SVG `aria-hidden` and `pointer-events: none` unless the shape truly is a control.
- Keep SVG masks, morphs, clips and giant blurs out of continuously updating low-end GPU loops.
- Reuse symbolic forms strategically but vary composition. A loop seen in S02 should feel related to S10, not copied as a decorative sticker.
- Save a visual-asset manifest: ID, source SVG, semantic/decoration role, scenes, colors, animation owner, motion fallback and approval status.

---

## 6. Materials, textures, shadows, planes and surfaces

### 6.1 Material families (namespaced to avoid motion collision)

| Token | Locked name | Use | Avoid |
|---|---|---|---|
| `material.M1` | Editorial Matte | Warm canvas, most interfaces, open composition | Dirty full-screen paper overlays |
| `material.M2` | Soft Satin | Occasional diffuse sheen / emphasized accents | Glossy plastic or perpetual streak |
| `material.M3` | Tactile Sculpted | Cake, buttercream, candle and cake details | Mandatory photorealism / WebGL cake |
| `material.M4` | Keepsake Paper | Invitation details, S07 letter, folded hidden letter | Scrapbook/polaroid stationery spam |
| `material.M5` | Quiet Mechanical | Deep graphite/plum Vault and hidden mechanics | Chrome, bank grime, sci-fi ornament |

Material progression: **editorial matte → tactile cake → reading paper → controlled deep mechanical → intimate paper again**. Materials express narrative function; no fixed global distribution.

### 6.2 Texture tiers

| Token | Meaning | Appropriate use |
|---|---|---|
| `texture.T0` | Clean, visually texture-free | Default UI, keypad, reading field, functional glyphs |
| `texture.T1` | Selective micro texture, barely perceptible | Chosen matte atmospheric field / photo-print suggestion |
| `texture.T2` | Local tactile close detail | Fold/seal/cake detail; never a global overlay |

No `texture.T3`. Avoid stacking photo grain with surface grain. Texture never becomes an opacity layer over reading glyphs or a substitute for natural material shaping. Blur/texture amplitude remains PENDING.

### 6.3 Logical depth planes

1. **Background:** primary scene environment, sparse rhythms, distant atmospheric marks.
2. **Midground:** main subject—portrait, cake, letter, 3D Vault (or the Vault scene's main canvas).
3. **Foreground:** selective near-framing, masks, reveal occlusion; never block controls or important text.
4. **Utility overlay:** **functionally independent**, always above ornamental layers for actionable controls, hints, focus indicators and safe-area UI. **Not** a fourth decorative depth plane.

Actual z-index numbers/layer isolation and clip boundaries are **PENDING PROTOTYPE**; establish named stacking contexts to avoid uncontrolled `z-index` escalation.

### 6.4 Shadows and surfaces

| Shadow | Meaning | Main allocation |
|---|---|---|
| `shadow.S0` | None / open planar clarity | Default type, body reading, decorative SVG |
| `shadow.S1` | Soft ambient surface separation | Portrait print/frame, selected paper/editorial layers |
| `shadow.S2` | Contact/tactile shadow | Cake, decoration, candle, small physical keepsake action |
| `shadow.S3` | Cinematic mass / object shadow | True 3D Vault, rare other justified focal objects |

Four surface classes: **Open Canvas** (not a card), **Editorial Surface** (framing/letters), **Contextual Control Surface** (only when needed), **Narrative Object Surface** (cake, invitation, seal, Vault, folded letter). The default is **S0 and matte**, not a global elevated-card system. Birthday shadows are warm-neutral; Hidden shadows graphite/plum. Shadows explain contact/depth or state, not decoration. Exact blur/offset/opacities pending.

### 6.5 Dimensional dramaturgy

| Scene range | Dimensional intent | Guardrail |
|---|---|---|
| 01–03 | Graphic 2D; subtle editorial layering | Don't consume 3D climax early |
| 04 | Face-safe photo 2.5D | Preserve natural identity, no aggressive tilt |
| 05–06 | Almost-3D tactile cake | Same cake instance/configuration; S2 contact |
| 07–08 | Flattened emotional reading and complete closure | Restraint is intentional |
| 09 | Controlled spatial deepening | One T4 signature target after explicit intent |
| 10 | **True 3D peak** | Mechanical articulated door + robust fallback |
| 11 | Physical paper moves from 3D to editorial plane | No surprise automatic opening |
| 12 | Quiet, nearly flat intimate letter | No decorative depth competing with words |

---
## 7. Motion and scene-transition system

### 7.1 LOCKED personality: Choreographed Playful Precision

**Playful Response** (immediate tactile interaction), **Editorial Rhythm** (coordinated typography, photo and shape composition), **Cinematic Restraint** (rare narratively earned payoff). Feel alive **because the experience responds**, not because everything moves.

### 7.2 Motion class taxonomy

| Qualified class | Primary intent | Good uses | Wrong uses |
|---|---|---|---|
| `motion.M0` Instant State | Correctness/semantic state immediately | PIN digit, validation, item selection, wish committed | Delaying real state until a timeline ends |
| `motion.M1` Micro Response | Crisp localized touch feedback | Button press, control toggle | Bounce repeated indefinitely |
| `motion.M2` Interactive Motion | Finger/pointer-led tactile feedback | Cake placement, snapping, invitation gesture | Physics-heavy arcade inertia |
| `motion.M3` Editorial Reveal | Compose text/image/SVG as one rhythm | Birthday typography, photo mask | Every child gets a different arbitrary animation |
| `motion.M4` Scene Transition | Coherent handoff between narrative stages | Portrait → Cake, Cake → Wish | Taking user control away for unnecessary pauses |
| `motion.M5` Cinematic Payoff | Rare visual/emotional climax | Birthday reveal, Vault opening, approved zoom | Default modal transition or every CTA |

**Calibration-only starting ranges:** M1 approximately **90–180 ms**; M2 **160–350 ms** for placement settle (continuous drag tracks pointer); M3 **350–800 ms**; M4 **500–1100 ms**; M5 **900–1800 ms** for *initial visual choreography*. They overlap deliberately, and **none is a locked production duration** or a timer for reading, wishing, cake editing or the entire Vault interaction. M0 is synchronous in logic.

### 7.3 Easing families (characters LOCKED; curves PENDING)

- `ease.responsive`: fast feedback with decisive resting state.
- `ease.tactileSettle`: delicate snap/contact, limited or no overshoot.
- `ease.editorial`: restrained reveal acceleration and landing.
- `ease.cinematic`: weight and deliberate progression without exhausting hold.

No universal `ease-in-out` everywhere, no dozens of arbitrary easing curves. Export actual GSAP/Motion easing tokens only after prototype testing.

### 7.4 Transition families

| Transition token | Name | Meaning | Scene usage |
|---|---|---|---|
| `transition.T1` | Editorial Crossfade | Quiet continuity, reading and closure | 06→07, 07→08, 12→end |
| `transition.T2` | Mask/Clip Reveal | Discovery via a deliberate shape/edge | 01→02, 02→03 |
| `transition.T3` | Layered Spatial Handoff | Focus passed between planes/objects | 03→04, 04→05, 05→06, 09→10, 10→11, 11→12 |
| `transition.T4` | Signature Immersive Zoom | One exceptional transition into hidden layer | **Target 08→09**, after confirmed discovery |

The 3D opening of the Vault uses articulated object movement and `motion.M5`; **it is not a second `transition.T4`**. An editorial crossfade inside a T3 handoff may be acceptable but must preserve the chosen primary grammar.

### 7.5 Animation ownership (HARD)

- **GSAP:** scene timelines, mask/clip path, layered spatial transitions, signature zoom, cinematic camera/rig/door choreography.
- **Motion:** component-level button, selection, presence and localized touch feedback.
- **Zustand:** authoritative semantic state, not animated values as product truth.
- **SceneManager/TransitionEngine:** scene lifecycle, guards, interruption/cleanup and transition commits.
- **R3F/Three:** 3D rendering and physical object transforms for Vault; GSAP can choreograph Three object transforms with clear owners.
- **AudioManager/Howler:** sound playback/fade and event-to-cue mapping.

**No GSAP and Motion simultaneously own the same property (`transform`, `opacity`, etc.) on the same DOM node.** Use named wrapper boundaries if both are needed. Do not let an animation callback independently decide to unlock the Vault or reveal confession.

### 7.6 Interruptions, skips and ambience

- Reversible nonessential animations may be cancelled or fast-forwarded; essential authorizations (invitation open, cake finish, wish extinguish, hidden intent, valid PIN and separate letter opening) may not be skipped or forged.
- Duplicate completion events do nothing after the first accepted transition. Invalid placement returns the object to a safe source/anchor.
- On `visibilitychange`, pause unnecessary timelines, video/audio where appropriate; resume from authoritative state, not from stale callbacks.
- One dominant ambient system maximum per scene, often zero. No looping text breathing, incessant parallax, global SVG morph or animated fullscreen film grain.
- Sound/haptic reinforces physical action; visual/DOM status always communicates the event without audio.
- For reduced motion, preserve state and content with simple fade/reframe/static layouts; disable T4 spatial zoom, dramatic dolly, parallax and nonessential camera motion as appropriate.

---

## 8. Photography: authentic presence and adaptive assets

### 8.1 LOCKED identity

**Intimate Cinematic Editorial Portraiture** = **Authentic Portrait + Curated Editorial Framing + Restrained Cinematic Depth**. **The photograph should make her feel seen, not redesigned.** Facial identity, expression, recognizable features and natural skin tones outrank masks, color matching and cinematics.

### 8.2 Photo treatment families

| Token | Treatment | Application |
|---|---|---|
| `photo.P1` Editorial Hero Frame | Default **one strong hero** photograph in S04 |
| `photo.P2` Soft Geometric Mask | Optional crop/mask; protect face and silhouette |
| `photo.P3` Layered Print Depth | Optional support with subtle photographic/print separation, **not** polaroid scrapbook |
| `photo.P4` Memory Echo | Very restrained real-photo callback in S07/S08 if story warrants |

S04 uses **P1 + at most a controlled additional treatment** if worthwhile. P2 and P3 need not stack. Do not show all photos at once, repeat a single photo as multiple claimed memories, or create a gallery.

### 8.3 Availability policy — 1–6 images; 2-photo design baseline

| Approved photos | Composition plan | UX quality guarantee |
|---|---|---|
| 1 | One P1 hero; type/frame/SVG support | Complete photo scene, no fake empty slot |
| 2 | One P1 hero + one genuine supporting moment | **Baseline design** |
| 3–4 | One hero; curate support and optional scene callback | Not a small photo grid |
| 5–6 | One hero; selectively use extras, ignore weak/redundant ones | No obligation to use all six |
| 0 / missing asset | **Failure handling only:** hold a truthful non-photo composition/retry or approved alternative; do not synthesize a person's face | This is **not** a newly approved 0-photo art direction; one usable real photo remains the intended minimum |

Six photographs are planning capacity, not a content quota, and their presence cannot alter scene count. New crops do not become new source memories.

### 8.4 Color, integrity, privacy and technical plan

- **Natural first, editorial second.** Exposure, white balance, gentle contrast and modest color adjustments allowed; no changing facial features, body, outfit or creating counterfeit historical moments.
- Build the surrounding composition around the photo if its clothing/background clashes with the palette. Do not recolor skin to match Coral/Lavender.
- Retouching: minimal corrections only. Low-resolution photo: show smaller in curated paper-like frame with whitespace instead of severe AI-detail hallucination.
- Manual `focalPoint`/face-safe areas for important responsive crops; test small phones and tall screens. Typography/decor may not overlap facial landmarks.
- `Next/Image` for optimized variants, dimensions/fill planned to avoid CLS, progressive preloading, meaningful alt on informative images and decorative images ignored by screen readers.
- Instagram Highlights are **possible discovery sources**, not automatic publishing permission. Review audience context/third parties, avoid sensitive locations/EXIF, and use private deployment controls if real confidentiality matters. An unlisted path is not access protection.

**Conceptual photo manifest — illustrative API, not actual assets:**

```ts
type PhotoRole = 'hero' | 'support' | 'callback';
interface PhotoAsset {
  id: string;
  src: string;                    // confirmed optimized file, not assumed filename
  width: number;
  height: number;
  alt: string;
  approvedForUse: boolean;
  role: PhotoRole;
  focalPoint?: { x: number; y: number }; // normalized, manually tested
  sourceId: string;               // same source ID if cropped for a callback
}
interface PhotoPlan {
  hero: PhotoAsset | null;
  supporting: PhotoAsset[];
  callbacks: PhotoAsset[];
}
```

No auto-population based on `photos.length === 6`; use curated scene allocations. If hero is null due to failure, report/recover gracefully without inventing an image.

---

## 9. Cake Studio and Make a Wish — one persistent narrative object

### 9.1 LOCKED identity and form

**Sculpted Celebration Cake** = **Soft-Structured Form + Tactile Frosting + Curated Personalization**. **Single tier**, round-derived and slightly imperfect; believable tactile 2.5D without heavy photorealism or compulsory WebGL. Matte buttercream base, controlled sculpted/piped detail, occasional soft satin accents, minimal physical stand and `shadow.S2` contact cues. Cake—not portrait or decorative patterns—is the hero in S05–06.

### 9.2 Decoration categories and constraint policy

Five LOCKED categories: **Frosting, Candles, Flowers, Topper, Accents**. Offer curated choices and compatible combinations, not freeform uncontrolled layer creation. Exact number of alternatives, final frosting presets, candle models, flower meshes, topper text and decoration anchors are **PENDING PROTOTYPE/ASSET**.

**Compatibility/quality constraints:**

- Frosting color presets come **only from the locked palette** and support appropriate contrasting decorations.
- Cake top has mapped **normalized valid placement zones** (implementation details pending); decoration must be grounded, not floating at an unsupported edge.
- Candle flame needs unobstructed visibility and touch interaction; topper and candle require separation/collision checks.
- Limits prevent an overcrowded cake; user can finish with minimal décor and no specific aesthetic combination is compulsory.
- Placement is validated **before store commit**, with a safe return on invalid/cancelled gestures.
- Reset is destructive: require confirmation. Undo/remove/adjust remain discoverable. New active selection and pending dragged decoration are distinct states.

### 9.3 Cake Studio composition contract

- **Mobile:** large, clear cake stage in upper/central safe region + **contextual bottom tray**, not a shopping toolbar; decoration hotspots never hidden by tray, browser chrome, safe-area insets or sticky controls. Short phones get reorganized tray content/controls.
- **Desktop:** asymmetric cake stage with contextual **side tray** and deliberate editorial negative space. No product-customizer dashboard.
- Touch select → tap valid location is a complete alternative to drag. Drag uses native Pointer Events, direct tracking and optional soft snap on release; keyboard can select item and use an accessible placement/slot interaction.
- Press feedback uses `motion.M1`, placement `motion.M2`, final handoff `transition.T3` / `motion.M4`; no physics engine and no animation-mediated data correctness.

### 9.4 State model — conceptual TypeScript contract

```ts
type CakeCategory = 'frosting' | 'candles' | 'flowers' | 'topper' | 'accents';
type CakeStage = 'editing' | 'finalized' | 'wish-ready' | 'wish-completed';
interface CakePlacement {
  id: string;
  category: Exclude<CakeCategory, 'frosting'>;
  variantId: string;
  anchorId: string;        // approved placement anchor; geometry defined in prototype
  orientation?: number;    // validated/sanitized, not free rotation by default
}
interface CakeConfiguration {
  schemaVersion: 1;
  baseStyleId: string;
  frostingPresetId: string;
  placements: CakePlacement[];
  stage: CakeStage;
}
interface CakeGestureDraft {
  selectedCategory: CakeCategory | null;
  selectedVariantId: string | null;
  transientAnchorId?: string;
  pointerId?: number;
}
```

**Implementation proposal:** authoritative configuration lives in Zustand; animation and drag preview are transient UI state. Renderer (DOM/SVG or justified Canvas2D) reads the same immutable logical configuration. A valid gesture causes exactly one placement transaction; repeated taps cannot duplicate it. An undo history can be capped. Canonical placement anchors and coordinate math are still pending, not fixed by this interface.

### 9.5 Scene 05 → Scene 06 state guarantee

```text
Editing cake (S05)
  ├─ choose color / decoration
  ├─ valid placement / undo / remove / confirmed reset
  └─ explicit Finish Cake
        ↓  single authoritative finalized configuration
Spatial handoff (same object / representation)
        ↓
Wish ready (S06) — SAME frosting, candles, topper, flowers, accents and anchors
        ↓  touch/hold (always) OR separately permitted optional mic
Flame extinguished, optional restrained smoke, atmosphere settles
        ↓  intentional/clear continue
Birthday Letter (S07)
```

**Do not** construct a second scene-specific default cake. The rendering scene may recompose visually, but `CakeConfiguration` remains identical. Wish output depends on actual candles in the approved configuration; do not auto-replace their style/count at the handoff.

### 9.6 Make a Wish behavior

- After Finish Cake, controls transition from editing to wish ritual. Keep the actual cake, subtly dim Birthday surroundings without making the scene look like the Hidden World.
- Flames have natural restrained flicker; optional glow/smoke and audio synchronized to semantic candle events, not required for correctness.
- Wish moment is user-paced; no countdown. **Tap/hold always works**; optional mic separately permissioned and denial-safe. No haptic/audio requirement.
- `flameOn → extinguishCommitted → extinguished` events are idempotent. If 3D/shaders/smoke are unavailable, visible candles still change state and reading progression remains possible.
- Replay default: new cake start, new wish state; an explicitly supported back-navigation within the same playthrough may preserve decoration but is not a new required flow.

### 9.7 Renderer decision and fallback

**Default DOM + SVG** with layered vector forms and soft shading, not physically rendered cake. Canvas2D is a candidate only if performance/visual tests establish a genuine advantage; Three.js cake is unnecessary for v1. Keep the whole interaction functioning even if depth, texture, smoke or secondary effects are disabled. Do not add `dnd-kit` unless testing proves native Pointer Events insufficient; existing Tech baseline treats it as optional.

---

## 10. The Quiet Keepsake Vault — true 3D with an earned opening

### 10.1 LOCKED identity

**Sculptural Monolith + Quiet Mechanical Precision + Intimate Paper Reveal.** Compact soft-geometric monolithic keepsake object, meaningful seam and understated segmented Offset Loop mechanical detail. Not an industrial safe, puzzle game, anonymous cube, fantasy treasure box or neon cyberpunk prop.

Materials: Warm Graphite matte body; Deep Plum spatial atmosphere/interior; restrained satin finish on operative edges/rings; minimal Soft Champagne high-points (not gold plating); authentic warm Keepsake Paper visible inside. Use `material.M5`, `shadow.S3`, deep but legible lighting, and return to `material.M4` at the letter.

### 10.2 GLB-first asset construction — modeling contract

Prefer external authored `.glb`/glTF with separately articulated nodes and physically credible hinge pivot(s). Example grouping (production names **PENDING**, not existing asset paths):

```text
VaultAsset.glb
├── Body_Static
├── Door_Pivot                <-- physically rotating hinged door in 3D
│   └── Door_Mesh
├── Lock_Core
├── Segmented_Ring
├── Locking_Bolts_or_Seams    <-- only if justified by actual visual mechanism
├── Keypad_Backplate         <-- cosmetic visual alignment, not the input logic
├── Interior_Chamber
├── Letter_Prop               <-- physical folded keepsake paper
└── Mechanical_Details
```

Model authoring must pre-plan pivot origin, local axes, open-angle clearance, material separation and animation test poses. Actual mesh topology, animation names, polygon count, textures, roughness, metalness and light numeric values are **PENDING PROTOTYPE / 3D PRODUCTION**. Optimize WebGL assets through justified Meshopt/Draco/textures; verify browser visual parity before approving exports.

### 10.3 Keypad: physical appearance, reliable DOM interaction

- PIN is **exactly `011007`** as locked. It is a story gate, **not secret storage or real security**; don't claim otherwise.
- Show an apparently integrated panel, but use **semantic DOM input and buttons** with accessible labels, physical-keyboard and pointer operation. No tiny 3D mesh raycast as the only way to type.
- Keypress provides `motion.M0` correct logical state and restrained `motion.M1` physical feedback. Invalid PIN gives a clear **Indonesian** error and retry route; no alarm, huge shake, neon red flash or humiliation.
- Small cinematic dolly **stops before the keypad becomes active**; stable camera during PIN editing. A tiny purposeful reframe after correct PIN is allowed.
- The meaning of `011007` and PIN hint must not be invented; **PENDING CONTENT**. User should be able to find a fair accessible clue without solving unrelated puzzles.

### 10.4 NON-NEGOTIABLE 3D door animation

**The capable primary WebGL path MUST physically animate the Vault opening.** Do not do `display:none`, instantaneous mesh replacement, scene swap or static before/after image masquerading as a door-open animation.

```text
PIN accepted (commit once)
  ↓
Lock acknowledgement / feedback
  ↓
Segmented mechanism releases / rotates / slides in a believable order
  ↓
Hinged Door_Pivot **rotates physically in 3D** to a clear open position
  ↓
Warm interior and an actual folded paper prop become visible
  ↓
Open pose settles; wait for recipient to select the paper (different event)
```

Mechanical movement has **purposeful weight**, paced choreography and restrained sound. It may be cinematic but not painfully slow. Provisional reference beats from the approved conversation included roughly `0–0.2s` acknowledgement, `0.2–0.7s` release, `0.7–1.7s` door motion and `1.5–2.1s` letter reveal; these are **unlocked illustrative targets only**, and timing/easing/mesh clearance must be tuned on the actual GLB.

### 10.5 Physical-to-editorial letter handoff

The Vault unlock is **not** confession consent. Opening yields a stable S11 state with physical folded paper clearly located inside the open chamber. Only **separate explicit select/open** transfers the paper from its 3D position toward an unobstructed warm editorial reading surface. After user selection, mechanical ambience recedes; S12 displays legible Newsreader text with controls. No sudden hard cut into a generic article and no text plane unreadably angled in 3D.

- Required distinctions: `pinAccepted` ≠ `vaultUnlocked` ≠ `letterVisible` ≠ `letterSelected` ≠ `confessionReadable`.
- Do not use the letter as a forced “answer to romantic question”. It is voluntarily opened and freely closed.
- Preserve one conceptual physical object through 3D appearance and 2D reading; a clean composited handoff is acceptable, auto-opening is not.

### 10.6 Camera, lighting and capable/limited rendering

**Full:** GLB + PBR, selective real shadows and small purposeful dolly (intro only), stable PIN, mechanism + physical door open, warm interior and readable paper.  
**Lite:** same story and articulated primary geometry if feasible; **first reduce lighting/shadow cost** (the user's approved preference), then secondary effects, geometry/texture load and render cadence as needed.  
**Fallback 2.5D:** mechanically legible DOM/SVG layers, a visibly opening door with plausible movement, working DOM PIN and letter.  
**Fallback DOM/static:** stable graphic representation and controlled open-state transition; complete PIN/letter/confession.  
**Reduced motion:** heavy camera movement and detailed door choreography may be simplified to a low-motion state-revealing transition; all user decisions, focus and letter access remain intact.

3D is loaded **late**, after Birthday essentials, never stalls S01 or S02. Dispose geometry/textures, cancel GSAP rigs and audio on cleanup. Don't burn GPU in hidden background while recipient reads S12.

### 10.7 Security, consent and error conditions

Never encode an assumption that frontend PIN obscures deployed assets from a motivated visitor. If sensitive access matters, plan actual authorization separately—outside this visual-design lock. Invalid PIN is retryable; WebGL failure shows a usable 2.5D/DOM route; loading failures cannot force an abandoned story. Incorrect taps during opening do not duplicate lock events. The actual camera, animation curves, acoustic mix, hint and artwork remain pending.

---
## 11. Scene-by-scene art direction — master implementation specification

**Reading guide:** Every scene follows the LOCKED Flow and approved D11 scene allocation. Proposed visual sequencing below is the **primary design interpretation**, not final pixel-perfect art. The scene's **state and accessibility rules are hard**. Exact timings, artwork, copy, coordinates, zoom target shape and responsive breakpoint numbers are **PENDING**.

### S01 — Loading / Prelude

- **Narrative role:** curiosity without a full birthday reveal. **Subject:** partial Offset Loop / a crafted unfinished graphic gesture.
- **Visual composition:** mostly 2D Open Canvas (`material.M1`, `texture.T0`, `shadow.S0`), Warm Ivory, restrained Coral. Brief Bricolage line. Deliberately asymmetrical on desktop; mobile isolates one motif and a short readable phrase. No portrait, cake or preview of confession.
- **State:** `booting → ready → transitionToInvitation`. Asset readiness dictates exit; approximately 2–4s is narrative target only. No false progress %, fake loader or blocking time delay.
- **Motion:** `motion.M3` restrained stroke/mask formation; `transition.T2` shape resolves toward invitation. Reduced-motion uses static silhouette and immediate legible status.
- **Failure:** if critical assets are delayed, show accurate loading status and a recovery path, not blank canvas; noncritical audio/3D cannot block readiness.
- **QA gate:** a fast device is never artificially delayed; a slow device does not get fake completion; initial page remains legible with JS/image recovery strategies as feasible.

### S02 — The Invitation / Open

- **Narrative role:** the user's first intentional action. **Subject:** tactile, folded editorial invitation—not a wedding envelope and not a modal on a blank website.
- **Mobile:** generous invitation hit region with accessible Open action and visible mute control; enough breathing room for short setup copy. **Desktop:** intentionally offset paper object balanced with restrained typography and selective cut/loop.
- **Visual:** Warm Ivory/paper with `material.M4` only on narrative object, soft structural folds; one accent family and minimal satin. Bricolage for controls.
- **State:** `invitationReady → openingCommitted → nextScene`; open by touch, mouse, Enter and Space. Audio unlock may be attempted *after* gesture; it must not determine success.
- **Motion:** local `motion.M2` tactile open, GSAP-scoped `transition.T2` invitation mask toward S03. Motion-reduced static/fade alternative.
- **QA gate:** no automatic open/audio, no tiny decorative-only hit target, input cannot double-open or leak two audio instances.

### S03 — Birthday Reveal

- **Narrative role:** first celebratory peak. **Subject:** **“Happy Birthday, [confirmed name]”** with recipient name primary, not confetti.
- **Mobile:** name wraps to fit and keeps hierarchy if long; text does not vanish behind mask or cropped viewport. **Desktop:** larger Bricolage composition, editorial overlaps and controlled supporting curves/short celebration fragments.
- **Visual:** one stronger accent family (warm or cool), controlled dual-accent memory and matte 2D layered type. Shantell, if present, only one tiny justified trace.
- **State:** `revealActive → revealStable → userContinue`; the scene has a readable settled frame; continuation never depends on a slow fixed timer.
- **Motion:** `motion.M3` typographic group choreography, rare `motion.M5` moment without consuming `transition.T4`; exit `transition.T3` hands focus to portrait.
- **QA gate:** confirmed name is correct/fully legible in actual fonts, reduced motion and a narrow phone; every accessible text string exists independent of kinetic letter splitting.

### S04 — Portrait / Memory Moment

- **Narrative role:** her authentic presence; photo beats stylistic spectacle. **Subject:** one real hero portrait, P1 default.
- **Mobile:** face-safe crop and P1 frame dominate; supporting element collapses/relocates based on actual available photos. **Desktop:** asymmetric hero + optional secondary real photo or offset Editorial Frame. Do not occupy slots for photos that do not exist.
- **Visual:** editorial warm foundation, natural skin/photo grading, one contextual accent, `shadow.S1`, restrained P2 mask or P3 print depth; `photo.P4` only if a real narrative callback is identified.
- **State:** one stable chosen hero manifest; user-controlled continuation, no automatic carousel. Optional tap detail must have a genuine reason and accessible alternative.
- **Motion:** `motion.M3` portrait reveal; optional selective `motion.M4` / `transition.T3` exit to cake, mostly static at rest. No deep face tilt or second signature zoom.
- **QA gate:** 1-photo, 2-photo and 6-photo candidate sets have intentional layout; natural identity survives all crops; EXIF and sensitive context removed; no fake memory duplication.

### S05 — Birthday Cake Studio

- **Narrative role:** playful personalization and direct agency. **Subject:** one edible-feeling Sculpted Celebration Cake, not a cake-building application.
- **Mobile:** single-tier cake stage occupies the usable focal region; a contextual bottom tray offers five categories and undo/remove/reset/Finish without obscuring valid cake anchors. **Desktop:** cake to one side, editorial controls to another, no SaaS-style cards or stacked forms.
- **Visual:** 2.5D DOM/SVG `material.M3` sculpted frosting; matte base, selective satin, valid normalized anchors, tactile `shadow.S2`. Accent preset chosen from locked colors with compatibility rules.
- **State:** `editing`, object selection, placement drafts, commit/rollback, undo/remove/confirmed reset, `finalized`; every action transactional and idempotent. Decor may be minimal; finish does not demand all categories be used.
- **Motion:** `motion.M1` selection, `motion.M2` pointer tracking / gentle settle; Finish triggers `transition.T3` / `motion.M4` with configuration unchanged.
- **Fallback:** tap-to-apply, slot chooser, keyboard and lower-fidelity renderer retain full customization; optional drag/audio/haptic may disappear without breaking the scene.
- **QA gate:** changing styles never duplicates decorations, controls and anchors are visible on short phones, same authoritative cake survives exit.

### S06 — Make a Wish

- **Narrative role:** transform prior personal creative action into a meaningful birthday ritual. **Subject:** **the same configured cake**, now illuminated by candles.
- **Composition:** cake gently recenters or gains intimacy; camera stage can darken carefully, **but warm Birthday identity remains**. Candle action affordance is obvious and reachable on mobile; desktop preserves coherent space and calm negative area.
- **Visual:** same frosting, color, topology, decorations and candle placements as S05; restrained natural flame, limited glow, optional slight smoke; no particles spectacle.
- **State:** `wish-ready → flameOn → extinguishCommitted → extinguished → continue`. User can take as long as desired; no countdown or background auto-progress. Touch/hold is always present; optional microphone is separately requested and rejection-safe.
- **Motion:** `transition.T3` same-object handoff, local flame response, brief restrained emotional beat, then `transition.T1` to reading when user clearly advances.
- **QA gate:** every cake setting matches S05, candle-out is visible with no audio/mic/animation, repeated blows/taps cannot create duplicate completion.

### S07 — Personal Birthday Letter

- **Narrative role:** friendship, appreciation, genuine birthday wishes, **no confession**. **Subject:** the actual personal letter content, which remains PENDING CONTENT until written/approved.
- **Mobile:** calm Newsreader reading field with natural wrapping and local scrolling where letter length requires; persistent controls outside text occlusion. **Desktop:** controlled line length, purposeful paper margins, restrained editorial frame.
- **Visual:** `material.M4` Keepsake Paper and `texture.T0` for text field, Warm Ivory/Deep Ink, `shadow.S0` or soft S1 only when it defines paper. Decoration can be zero. Bricolage for controls.
- **State:** user-paced reading; no timer, typewriter overload, animated lines looping or automatic next scene. Continue available in accessible DOM.
- **Motion:** almost still; gentle `transition.T1` to complete birthday ending.
- **QA gate:** long and short messages are fully reachable at text zoom, copy/select and keyboard navigation work; no confession language intrudes into S07.

### S08 — Final Birthday Moment / genuine closure

- **Narrative role:** birthday gift is **complete**, even if Hidden never gets opened. **Subject:** final birthday statement with subtle optional real-photo/cake visual echo if justified.
- **Composition:** resolved warm/cool editorial closure, intentionally calm. On mobile, closing action/replay remains easy to understand; desktop may frame closing type with a softened Offset Loop hint but not a prominent vault CTA.
- **Two-stage discovery direction:** (a) full birthday closure at rest, with ordinary end/replay affordance; (b) a subtle **Quiet Second Invitation** may be discovered without making completion conditional. No automatic fade into Hidden World.
- **State:** `birthdayComplete` independently true; `hiddenDiscoveryAvailable` is optional; only explicit accepted discovery begins S09.
- **Motion:** quiet `transition.T1` from birthday letter; `transition.T4` may be committed toward S09 **only after explicit intent** and confirmed gesture/accessible action.
- **QA gate:** leaving here is valid; hidden affordance can be discovered without trick mechanics or romantic pressure; normal scrolling or idle time never activates S09.

### S09 — Hidden Transition

- **Narrative role:** voluntarily explore a second layer of the same gift. **Subject:** editable/dragged editorial surface, familiar Offset Loop becoming segmented/mechanical.
- **Mobile:** safe deliberate swipe/drag area, discoverable instructional affordance after quiet invitation, non-drag accessible activation. **Desktop:** deliberate pointer drag or equivalent explicit button/keyboard action, no reliance on scrolling.
- **Visual:** Warm Ivory/coral/lavender memory moves toward Deep Plum/Graphite; morphology organic → aligned fragments → mechanical derivatives. Not a dramatic horror portal or abrupt independent website.
- **State:** `undiscovered → initiated → tracking → belowThresholdRevert | thresholdCommit → transitioning → vaultReady`. Direction, exact distance and threshold PENDING. Cancel/blur restores safe state; commit one time only.
- **Motion:** signature `transition.T4` immersive zoom **after** commit, with `motion.M4` guided spatial handoff. Reduced-motion uses non-spatial, clear replacement.
- **QA gate:** no accidental scroll navigation, no swipe-only dead end, no double zoom and no hidden automatic confession.

### S10 — The Vault

- **Narrative role:** restrained true-3D mechanical anticipation. **Subject:** The Quiet Keepsake Vault, compact graphite/plum monolith with physical opening mechanism.
- **Mobile:** Vault hero and PIN both fully visible and usable without keypad occlusion or camera drift; responsive DOM keypad feels visually connected. **Desktop:** controlled 3D perspective and clean negative space for one clear interaction.
- **Visual:** `material.M5`, `shadow.S3`, external GLB PBR, soft warm key plus restrained separation, satin moving mechanism, select Champagne high points; no neon bank/HUD props.
- **State:** `loading → ready → pinEditing → invalidRetry | accepted → releasing → doorOpening → open/letterVisible`. PIN remains `011007`. DOM keypad validation is separate from GLB mesh.
- **Motion:** small cinematic intro dolly then camera **stops for PIN**, `motion.M0/M1` input feedback, **mandatory `motion.M5` segmented lock + hinged real 3D door rotation**, optional subtle camera reframe to reveal chamber. Same object, no static door swap in primary capability mode.
- **Fallback:** full → light simplification (shadows/lights first) → 2.5D → DOM; PIN, opening, letter discovery accessible throughout.
- **QA gate:** mechanical action physically visible on tested WebGL capable devices; invalid PIN quietly retryable; no audio requirement; no surprise confession; no GLB loading dead end.

### S11 — The Hidden Letter

- **Narrative role:** consent boundary and handoff from engineered object to human writing. **Subject:** a **physical folded paper keepsake** in an already-open chamber.
- **Mobile:** the paper must be conspicuous/selectable with a generous accessible hit zone. **Desktop:** Vault may remain background but becomes secondary to paper; no excessive 3D text perspective.
- **Visual:** graphite/plum falls back; Warm Ivory/Champagne light returns to selected paper, `material.M4` replaces `material.M5` as primary. The paper's origin in Vault remains visually understandable.
- **State:** `letterVisible` persists without opening; explicit tap/click/keyboard `letterSelected → letterOpening` hands to S12. Opening Vault alone never makes confession readable.
- **Motion:** restrained `transition.T3` physical paper-to-editorial handoff followed by `transition.T1` calm reading reveal, reduced-motion fade alternative.
- **QA gate:** a separate explicit user event demonstrably gates S12 in full 3D and fallback; paper can be accessed with keyboard; no autoplay copy.

### S12 — Confession Ending

- **Narrative role:** voluntary, honest, undemanding expression with emotional release. **Subject:** readable personal writing, not a grand visual finale or pressure to reciprocate.
- **Mobile:** Newsreader text in clean readable region, local scroll if needed, with accessible close/replay. **Desktop:** editorial paper composition, restrained scale, thoughtful line length. Shantell/heart decoration is not automatically required.
- **Visual:** regained warm paper with Deep Ink, `material.M4`, `texture.T0`, `shadow.S0`; Bricolage for small functional controls. A thin memory of hidden shapes may remain, but words dominate.
- **State:** readable only following S11 explicit selection; user controls their pace, may close/end/replay; no input field or yes/no acceptance required.
- **Motion:** barely moving, `transition.T1` quiet enter/closure; no letter-by-letter suspense or timed dismissal.
- **QA gate:** complete writing is legible, screen-reader navigable, respects non-coercion; close/fade/replay truly work; end remains valid without sending any reply.

---

## 12. Canonical transition/event handoff matrix

| Boundary | Event prerequisite | Visual family | Persistence / prohibition |
|---|---|---|---|
| 01→02 | Critical shell ready | `transition.T2` | No forced loading delay |
| 02→03 | Explicit invitation open | `transition.T2` + `motion.M3` | Audio activation after gesture only |
| 03→04 | Reveal settled and user continue | `transition.T3` | Preserve name / focus; no added T4 |
| 04→05 | User continue | `transition.T3` | Portrait assets may unload when safe |
| 05→06 | **Finish Cake** | `transition.T3` / `motion.M4` | **Same complete CakeConfiguration** |
| 06→07 | Valid candle-out + clear user continuation | `transition.T1` | No mic dependency |
| 07→08 | User finished reading | `transition.T1` | S07 contains no confession |
| 08→09 | Explicit discovery + hidden gesture/equivalent | **`transition.T4` target** | S08 remains independently completed |
| 09→10 | Hidden transition commit & Vault ready | `transition.T3` / `motion.M4` | Preload/fallback before exposing dead end |
| 10→11 | Valid PIN + physically animated door open | `motion.M5` then `transition.T3` | **Letter only revealed**, not automatically read |
| 11→12 | **Different explicit letter-select/open event** | `transition.T3` then `transition.T1` | Confession consent boundary |
| 12→end/replay | User closes/completes | `transition.T1` | No forced reply, reset safely on full replay |

This matrix is the **sole authoritative boundary mapping in this master**. Sections 11 and 13 describe local state and UI ownership without authorizing additional scene edges.

---
## 13. Components, states and composition primitives

These are **implementation contracts**, not a proposal to install a generic component library. Build only necessary components in React, using existing approved motion/icon libraries. Avoid wrapping every component in identical cards. Functional primitives inherit the design system; narrative objects have deliberately distinct geometries.

### 13.1 Cross-scene component registry

| Component | Purpose / scenes | Appearance and behavior | Accessibility / fallback contract |
|---|---|---|---|
| `ExperienceShell` | All | One fullscreen runtime, world attributes, dynamic safe viewport handling | Logical DOM order, route-less scene navigation |
| `SceneFrame` | All | Open Canvas with background/mid/foreground + separate utility layer | No ornamental occlusion of controls |
| `SceneTransitionBoundary` | All boundaries | GSAP-owned enter/exit choreography; typed transition ID | Cancel/cleanup and reduced-motion equivalent |
| `UtilityControls` | Sound, close, replay, skip etc. | Sparse Bricolage + Phosphor, no nav bar clutter | Visible focus, touch size, semantics, safe-area |
| `PrimarySceneAction` | Open, Continue, Finish, Read, Replay | Text-first contextual CTA, not generic uniform SaaS button styling | Valid action guard, disabled/feedback state, no duplicate commit |
| `OffsetLoopMark` | S01/02/03/04/08/09/10 derivative | Signature custom SVG, 0–2 palette hues per asset | Decorative unless an explicit alternative-labeled control exists |
| `EditorialFrame` | S02/04/07/08/11/12 | Crop/offset/fold framing; matte surfaces | No clipping core names, faces, reading text |
| `PhotoHero` | S04 | P1 hero with optional P2/P3 | Focal-point reviewed; actual alt; one-photo complete |
| `PhotoSupport` | S04 + optional P4 | Curated real asset, never empty slot | Can be removed with no narrative loss |
| `CakeStage` | S05–06 | One authoritative CakeRenderer presentation | Same configuration; low-fidelity renderer parity |
| `CakeControlTray` | S05 | Contextual categories/actions; mobile bottom/desktop side | Tap and keyboard alternatives; no occluded cake anchors |
| `CakeDecorationPreview` | S05 | Direct touch-follow and snap-before-commit | Undo/cancel/non-drag completion |
| `WishInteraction` | S06 | Flame state plus touch/hold/mic option | Touch/hold always; mic denied and sound off still work |
| `KeepsakeReadingSurface` | S07/S12 | T0 paper / Newsreader text, calm layout | User-paced, local scroll, zoom/focus safe |
| `QuietSecondInvitation` | S08 | Small discovery affordance subordinate to birthday ending | Explicit intent and keyboard-equivalent gesture access |
| `HiddenSurfaceGesture` | S09 | Drag threshold visual coupled to confirmed intent | Cancel/blur revert, no browser-scroll trigger |
| `VaultStage` | S10/S11 | Late-loaded 3D with deliberate camera and fallback | Stable DOM keypad, 3D fallback paths |
| `VaultKeypad` | S10 | DOM numbers/input visually integrated in object | Touch/keyboard, validation feedback, PIN not security |
| `VaultHingedDoor` | S10 | Actual 3D pivot + segmented lock release | Primary 3D physical animation mandatory, reduced-motion simplified |
| `FoldedLetterProp` | S11 | Physical keepsake paper inside opened Vault | Separate explicit tap/click/Enter to read |
| `EndingControls` | S08/S12 | Complete birthday exit/replay vs confession close/replay | Never demand an answer |

### 13.2 Required component-state behavior

**Primary action states:** `idle → pressed → committing → completed`, optionally `disabled/error/recoverable`. React buttons use semantic roles; appearance changes do not substitute for action success. All action labels describe a real effect. Examples (unapproved content): *Buka*, *Lanjutkan*, *Selesai menghias*, *Buat harapan*, *Buka surat*, *Putar ulang*. Final exact copy must pass content approval.

**Utility icon states:** default Phosphor Regular; Fill where active/selected makes sense; accessible title/label and visible active status. Mute toggle must persist through scenes rather than unexpectedly resetting. If unsupported mic/haptics are absent, remove those affordances or mark them clearly optional; never disable the core scene.

**Microfeedback states:** accepted, busy, error, recoverable, completed. Pair visible state with text/ARIA where meaningful; do not rely on pink/red/green symbolic meaning that introduces unapproved dominant palette colors.

**Interactive surface hierarchy:** actual buttons/inputs use semantic DOM above decorative planes. Decorative SVG or 3D mesh may visually supply the face of the control but cannot be the only hit target when accessibility or performance would suffer.

### 13.3 The S08→S09 armed-state ambiguity — explicit implementation resolution

The final art direction describes a quiet cue at S08 and the signature gesture in S09, while targeting the **08→09** immersive zoom. Do **not** implement this as an accidental double navigation or automatic zoom when the cue is merely noticed.

**Recommended two-phase portal state inside the existing Scene 08/09 boundary (NO NEW SCENE):**

```text
S08 birthdayComplete, quiet clue visible or discoverable
   ↓ deliberate discovery affordance activation
hiddenPortal = armed     // show a safe interactive surface; S08 remains a valid completed ending
   ↓ user performs swipe/drag beyond threshold OR invokes explicit accessible equivalent
hiddenPortal = committed // at most once, with semantic intent
   ↓ one T4 transition presents the Hidden Transition composition (S09)
   ↓ after scene transition/preload/fallback S10 becomes active
```

In alternative code organization, the `armed` surface can belong to S09's **prepare** lifecycle instead of S08's local UI. **What is locked is user intent, one T4, no accidental browser scroll, no new scene, cancellation safety and optional birthday closure**; internal component ownership is a prototype architecture choice. Do not claim the exact gesture threshold/direction or clue copy is already final.

### 13.4 Content and personalized-data contracts

The recipient's actual **name, birthday/date/age, relationship-specific memories, acceptable photo captions, complete birthday letter, hidden clue meaning, confession letter and concluding message** are **PENDING CONTENT**, and should be supplied/approved explicitly. Never manufacture shared memories or treat placeholder text in wireframes as fact.

**Recommended content object shape (conceptual):**

```ts
interface ExperienceContent {
  recipientName: string;                 // explicitly confirmed
  birthdayLine?: string;                 // confirmed, not inferred
  invitation?: { shortIntro: string; openLabel: string };
  portrait?: { supportingText?: string; realMemoryNote?: string };
  birthdayLetter: string;                // friendship and wishes; NO confession
  birthdayClosure: string;               // genuine complete ending
  hiddenDiscoveryHint?: string;          // discovery affordance, not forced answer
  pinHint?: string;                      // only after meaning is verified
  hiddenLetterIntro?: string;
  confession: string;                    // honest, non-demanding
  farewell?: string;
}
```

Avoid mixing personalized writing with JSX layout logic. Content must be independently reviewable and should support punctuation, variable-length names and multiple paragraphs. Translation/localization is a content approval task: pick one primary reader-facing language; don't accidentally mix Indonesian UI validation with unrelated English boilerplate if that language is not deliberately chosen.

---

## 14. Prototype engineering architecture and typed runtime contracts

### 14.1 Approved stack and boundaries

| Concern | Approved solution | Why / restrictions |
|---|---|---|
| Framework | **Next.js + React + TypeScript** | Single interactive shell, typed state, asset delivery |
| Styling | **Tailwind CSS** as infrastructure | Not an invitation to Tailwind default palette/cards |
| Cinematic timelines | **GSAP** | Scene choreography, masks, 3D animation orchestration |
| Microinteraction | **Motion** | Local button/selection feedback; separate DOM ownership |
| Persistent state | **Zustand** | One story state, CakeConfiguration, consent and Vault states |
| Functional icons | **Phosphor** | Defined weight/state grammar |
| Vector/masks | **SVG + browser CSS** | Offset Loop, editorial frames, cake renderer |
| Photos | **Next/Image** | Responsive optimized genuine photos |
| 3D | **Three.js + React Three Fiber + Drei** | S10 Vault, external `.glb`, fallback |
| Audio | **Howler.js** | Music/SFX, gesture-gated playback |
| Gestures | **Native Pointer Events** | Touch/drag/swipe/hold, no compulsory gesture dependency |
| Mic enhancement | **Web Audio API** optional | Never core to wish completion |
| Quality/asset/runtime | **SceneManager, TransitionEngine, AssetManager, CapabilityManager** | Application modules, not extra UI frameworks |

**Explicitly non-core:** Anime.js (rejected), third animation engine, Lenis or scroll-navigation dependency, mandatory physics engine, unnecessary backend, dnd-kit unless justified by interaction testing, XState unless a demonstrable state-machine complexity requires reconsideration. Don't add a generic heavy UI kit.

### 14.2 Proposed runtime module boundaries

```text
BirthdayExperienceApp
├── ExperienceShell / SceneFrame
│   ├── SceneManager (routing within single runtime)
│   ├── TransitionEngine (GSAP timeline ownership / cancellation)
│   ├── ExperienceStore (Zustand: authoritative state)
│   ├── CapabilityManager (reduced-motion, device/performance tiers)
│   ├── AssetManager (preload, retries, disposal)
│   ├── AudioManager (Howler, gesture consent, mute state)
│   └── UtilityControls (semantic DOM)
├── S01Prelude
├── S02Invitation
├── S03BirthdayReveal
├── S04Portrait (PhotoPlan)
├── S05CakeStudio
│   ├── CakeStage / CakeRenderer (DOM/SVG)
│   ├── ContextualControlTray / PlacementValidator
│   └── CakeStore slice
├── S06MakeAWish (same CakeConfiguration + CandleWishController)
├── S07BirthdayLetter (KeepsakeReadingSurface)
├── S08BirthdayFinale (QuietSecondInvitation)
├── S09HiddenTransition (HiddenSurfaceGesture)
├── S10Vault
│   ├── 3D Vault GLB / Camera Rig / Lighting
│   ├── VaultKeypad (DOM) / PIN Validator
│   ├── Vault Lock + HingedDoor Animator
│   └── Tiered Vault Fallback
├── S11HiddenLetter (FoldedLetterProp)
└── S12Confession (KeepsakeReadingSurface)
```

This is a **responsibility decomposition**, not a mandated source-tree snapshot. Exact module/file names can change without modifying design intent. Source architecture should prefer scene-local assets/logic with shared systems to prevent dependency entanglement.

### 14.3 Proposed typed state/events

```ts
type SceneId =
  | 'S01' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06'
  | 'S07' | 'S08' | 'S09' | 'S10' | 'S11' | 'S12';
type SceneLifecycle = 'preloading' | 'preparing' | 'entering' | 'active' | 'exiting' | 'cleaned';
type HiddenPortal = 'unavailable' | 'discoverable' | 'armed' | 'committed';
type VaultStatus =
  | 'unloaded' | 'loading' | 'ready' | 'pinEditing' | 'pinRejected'
  | 'pinAccepted' | 'releasing' | 'doorOpening' | 'opened'
  | 'letterVisible' | 'letterSelected';
type WishStatus = 'unready' | 'ready' | 'flameOn' | 'committed' | 'extinguished';
interface ExperienceStoreShape {
  activeScene: SceneId;
  lifecycle: SceneLifecycle;
  birthdayComplete: boolean;
  hiddenPortal: HiddenPortal;
  audioUnlocked: boolean;
  audioMuted: boolean;
  photoPlan: PhotoPlan;
  cake: CakeConfiguration;
  wish: WishStatus;
  vault: VaultStatus;
  confessionOpened: boolean;
  capabilityTier: 'full' | 'lite' | 'fallback';
}
```

**Implementation caveat:** this is one conceptual interface, not a reason to persist passwords or sensitive recipient data in a store. A stringly state-machine *proposal* does not replace tested guards and proper state transitions. Final snapshot/error recovery design remains to be implemented.

### 14.4 Transition guard pseudocode

```ts
// Illustrative algorithm, not production code.
function canEnter(target: SceneId, state: ExperienceStoreShape): boolean {
  // Never bypass canonical ordering or scene-lifecycle safeguards.
  if (state.lifecycle !== 'active') return false;
  if (!isAllowedCanonicalEdge(state.activeScene, target, state)) return false;
  if (target === 'S06') return state.cake.stage === 'finalized';
  if (target === 'S07') return state.wish === 'extinguished';
  if (target === 'S09') return state.birthdayComplete && state.hiddenPortal === 'committed';
  if (target === 'S11') return state.vault === 'letterVisible';
  if (target === 'S12') return state.vault === 'letterSelected';
  return true;
}
// Real system additionally checks explicit event authorization (S02 open,
// hidden intent, PIN, separate letter selection), transitions in flight,
// safe replay/reset and recovery after interruption.
```

**Do not use this illustrative snippet as complete production authorization.** Guards must validate every canonical scene edge and lifecycle phase. The invariant is that **visual end-of-animation callbacks cannot manufacture a permission that the store has not committed**. PIN `011007` validation happens on the client as a narrative gate, not security authentication.

### 14.5 Scene lifecycle and cleanup

`preload → prepare → enter → active → exit → cleanup` with interruption/recovery policy. Scene-scoped GSAP contexts killed on cleanup; gesture listeners unregister; invisible audio/animation work stops; WebGL GLB/geometry/textures dispose after safe handoff. React components must not assume a scene remains mounted while transition effects execute. Establish stable commit operations that can complete despite a reduced-motion shortcut.

### 14.6 Asset loading and performance tiers

- **Phase 1:** shell, Prelude and Invitation critical assets; small typography and essential SVG only.
- **Phase 2:** Birthday Reveal, approved hero portrait, cake base and necessary audio.
- **Phase 3:** birthday letter and final birthday assets; optional photo callbacks.
- **Phase 4:** late preload hidden GLB, mechanic texture/audio and letter assets *before S10 where helpful*, never blocking initial Birthday World.
- **Full/Lite/Fallback:** first drop expensive lighting/shadows for Vault in weak GPU conditions; then nonessential effects/render cost; finally 2.5D/DOM. For non-3D scenes, reduce parallax, filter and decorative morph before interaction quality.
- Dynamic device/orientation changes cannot invalidate touch targets or lose state; don’t unmount CakeStore merely because responsive layout changes.

**Targets for bundle size, memory, FPS, GPU/poly count, LCP, CLS and bandwidth are PENDING measured budgets.** Use measurable baselines in the prototype, not guessed performance claims in the design file. Provide failure recovery and asset retry for important content.

---

## 15. Responsive design, accessibility and human control

### 15.1 Re-composition over shrinking

- **Mobile:** respect `svh/dvh` and safe-area insets; handle very short/tall viewports, notch, browser chrome and display zoom; content/action never trapped underneath a fixed decorative surface.
- **Desktop:** stronger editorial asymmetry/overlap, but safe zones around faces, readable paragraphs, cake anchors and keypad remain.
- **No arbitrary fixed center-card template.** Responsive adaptation can change position, group count, crop, tray side and decorative density, but not remove an essential action.
- Define explicit layout **modes** rather than pretending one numerical breakpoint solves all designs: `compact`, `short-height`, `regular`, `wide`, `reduced-motion` and `vault-fallback`. Actual media thresholds are PENDING PROTOTYPE.
- Portrait: manually tuned face-safe focal position per asset. Cake: stage above contextual tray in compact layouts, no occluded anchors. Vault: stable DOM keypad position when active. Letters: local scroll and reading measure when necessary.

### 15.2 Accessibility specification

**Implementation requirements:**

1. Semantic DOM for name, buttons, PIN, long letter copy and all important status messages; correct reading order even if visually layered.
2. Visible focus indicators and logical focus restoration on scene entry, overlay opening, PIN error, letter selection and replay.
3. Controls sized for touch usability; actual touch-area minimum and font-scale limits must be determined/tested, not merely assumed from appearance.
4. Keyboard alternatives for invitation, Cake placement, Hidden gesture, PIN and physical letter opening.
5. Reduced motion: media preference respected; spatial camera/zoom/parallax removed/simplified while maintaining semantic state change.
6. Nonvisual status after important actions: cake placement accepted/rejected, candle extinguished, PIN invalid, Vault opened, letter ready.
7. No audio-only, color-only, mouse-hover-only, mic-only, haptic-only or WebGL-only essential information.
8. Page/scoped reading region can be navigated without trapping focus or triggering another scene via ordinary scroll.
9. Meaningful alternative text for informative genuine photography; decoration deliberately hidden from assistive technology.
10. Contrast audited at **actual composed states**, including font rendering over gradients, secondary surfaces, disabled controls, projected/warm-lit text and focus indicators.
11. Any major optional cinematic scene has a safe fast-forward/reduce pathway that does not auto-authorize essential interactions.
12. User has no time limit to make a wish, read a letter or decide whether to enter Hidden World.

Recommended external QA target is WCAG AA where applicable; specific numeric thresholds are **implementation targets** rather than claims from the source fragments. Test with browser zoom, larger fonts and reduced-motion OS settings.

### 15.3 Audio and haptics

- Gate first playback after S02 activation per browser rules; persist mute control through journey; never surprise-raise volume at Hidden World.
- Audio cues tie to *semantic* events (`invitationOpened`, `decorationPlaced`, `wishExtinguished`, `lockReleased`, `doorOpened`, `letterSelected`), not to arbitrary timestamps if an animation can be skipped.
- Multiple rapid events coalesce; cancel scheduled or active cues when timeline is aborted. Ambient music does not determine scene completion.
- Microphone may be requested during S06 only as optional enhancement, with explicit permission and an equally satisfying touch route.
- Haptics are optional and device-dependent. No essential information should be unavailable if neither sound nor vibration exists.
- Actual soundtrack, cue lengths, mix balance and copyright/license clearance are PENDING CONTENT/PRODUCTION.

### 15.4 Privacy and consent

The experience is personal and should not surprise the recipient with exposed private media or obligatory romantic interactions. Strip unnecessary EXIF, avoid sensitive third-party photographs, review deployment visibility/access. If the URL is public, assume static assets can be inspected. The frontend PIN is not authorization. Avoid analytics capturing PIN entries, letter interactions or personal content; v1 does not require analytics/backend.

---
## 16. Asset and content production register

**Important distinction:** the ZIP contains Markdown specifications, not the finished GLB model, portrait exports, cake SVG layers, audio tracks or deployable font WOFF2s. No section in this design system claims those assets are already produced.

### 16.1 Required and optional asset inventory

| Asset family | Minimum needed for functional prototype | Art production direction | Availability / decision |
|---|---|---|---|
| Bricolage Grotesque | Valid self-hosted WOFF2 / tested fallback during setup | Primary display/UI | **PENDING production file verification** |
| Newsreader | Valid self-hosted WOFF2 | Emotional reading | **PENDING production file verification** |
| Shantell Sans | Optional, very limited | Tiny human accent | Optional loading, **PENDING** |
| Offset Loop | One approved scalable SVG + select variants | Organic loop with purposeful offset / mechanical derivative | **PENDING artwork** |
| Editorial Frame primitives | Selective SVG/CSS masks/frames | Under Icon & SVG / Shape system | **PENDING artwork** |
| Birthday decoration fragments | Few scene-specific groups | Not stock confetti | **PENDING artwork** |
| Recipient portrait | At least one genuine approved image | Two-photo layout baseline, capacity six | **PENDING selection/rights/crops** |
| Invitation object | DOM/SVG shape with fold/open states | Matte paper, contextual accent | **PENDING artwork** |
| Cake base/vector components | One single-tier DOM/SVG renderer | Tactile sculpted matte icing | **PENDING artwork/prototype** |
| Cake decoration variants | Curated frosting, candles, flower, topper, accent variants | Compatible presets / placement zones | **PENDING exact counts/assets** |
| Candle flame/smoke | Lightweight state animation, static fallback | Natural restraint | **PENDING calibration** |
| Vault 3D | Externally modeled optimized GLB with articulated door | Monolithic keepsake, separate hinge/core/ring/letter | **PENDING actual model** |
| Vault fallback | 2.5D and DOM viable states | Keeps object narrative intact | **PENDING actual implementation** |
| Folded letter paper | 3D/2D visual handoff system | Warm M4 Keepsake Paper | **PENDING artwork** |
| Soundtrack/SFX | Sound optional, complete silent mode | Events, no forced drama | **PENDING selection/license** |
| Recipient-facing text | Personal approved copy across all scenes | Birthday first, ethical optional confession | **PENDING CONTENT** |
| PIN personal hint | Meaningful, accessible clue for `011007` | Neither absurdly cryptic nor revealing unapproved lore | **PENDING confirmation** |

### 16.2 Suggested reusable asset format and naming policy

A `visualAssetId` references an approved asset manifest entry, not arbitrary filenames guessed from scene IDs. Track: asset ID, owner scene(s), source/provenance, whether decorative/semantic, format, base palette colors, physical size/ratio, aspect/crop, focal points, animation owner, fallback, estimated cost, QA status. Maintain render consistency through review snapshots on real target browsers.

**Privacy/rights:** only approved personal images, no unnecessary EXIF, source/context audit, license record for fonts/audio/third-party materials. Initial deployment should avoid search-engine indexing if intimacy is desired, while making clear that noindex/unlisted links are not security.

### 16.3 Scene dependency and resource delivery

- Early path S01–03 should not preload all six possible photographs or the Vault GLB.
- S04 should resolve a curated `PhotoPlan` with **one real hero** before entering its stable state (or show explicit graceful asset failure handling).
- S05 requires base cake/decoration symbols, valid anchors and persistent store. S06 reuses cake assets and adds glow/flame.
- S07 and S12 rely on actual user-approved text and accessible reading styles, not empty placeholder content at launch.
- S09/S10 prepare the GLB/fallback progressively without jank or hidden-content load dead ends.
- S11 requires a physical folded letter in the open chamber; S12 requires corresponding readable content.

---

## 17. Prototype execution plan — evidence before polishing

This document is a **master blueprint for the first faithful prototype**, not a claim that a working site has been created. Build a **vertical slice of the full narrative** before polishing dozens of asset variants.

### Phase P0 — Source freeze and content prerequisites

**Deliverables:** this `DESIGN_SYSTEM.md`, canonical 14-file source manifest, decision/issue ledger, initial content data placeholders clearly flagged as placeholders, confirmed recipient details request, font conversion/validation plan.  
**Exit gate:** no ambiguity about Flow, PIN, separate letter selection, family roles or source ownership. Missing 14th ZIP item provenance documented. Unconfirmed dates/names never fabricated.

### Phase P1 — Minimum complete narrative skeleton

**Build:** Next/React/TS shell, 12 typed scene IDs, scene lifecycle, TransitionEngine, Zustand slices, keyboard semantic navigation, small placeholder-free-but-intentional visual scaffolds, replay reset; light `transition.T1` before complex motion.  
**Exit gate:** a user can intentionally traverse S01→S08, voluntarily stop, and optionally traverse S09→S12 without any dead end. No required interaction is triggered by incidental scroll.

### Phase P2 — Visual system and responsive foundation

**Build:** palette aliases, font roles, icon rule implementation, Offset Loop v1, open-canvas/plane layering, responsive safe zones, reading surface, one real P1 photo with one/two image scenarios.  
**Exit gate:** visual coherence, photo identity and birthday display remain legible on narrow mobile/desktop; no default SaaS-card template creep.

### Phase P3 — Cake interaction vertical slice

**Build:** single tier DOM/SVG CakeRenderer, one viable option in each of five categories, valid anchor placement, undo/remove/reset, safe keyboard/touch path, same-store S05→S06, touch/hold extinguish.  
**Exit gate:** QA gates 5–6 pass with no mic, no audio, interrupted drag, rapidly repeated input and mobile tray visible.

### Phase P4 — Hidden discovery and Vault vertical slice

**Build:** complete birthday S08, Quiet Second Invitation, guarded S09 portal with one T4 candidate, external articulated GLB or temporary articulated geometry **only during development** (not substitution for external GLB production goal), stable DOM PIN, mechanical door rig, paper prop, explicit selection, fallback.  
**Exit gate:** capable path visibly articulates a 3D hinged door after valid PIN; fallback allows identical narrative decisions; explicit paper selection needed before S12.

### Phase P5 — Choreography, assets and sound calibration

**Build:** approved decorative SVG derivatives, photo masks, cake styling, material polish, controlled GSAP timelines, sound events, GLB optimization, proper reduced-motion.  
**Exit gate:** chosen signature effects increase emotional/narrative quality, not latency or confusion; GSAP and Motion ownership verified; audio and motion off still support every action.

### Phase P6 — Content approval and QA sign-off

**Build:** verified recipient copy/photo selections, complete letter and confession, contact/privacy review, full device/performance/accessibility matrix, actual performance budgets, final design adjustments **with explicit approval for any LOCKED direction changes**.  
**Exit gate:** all gates below pass; no example text or placeholders are accidentally shipped.

**Production prioritization:** make the whole story reliably traversable first, then make the signature moments beautiful; avoid investing in over-detailed metal shaders while the letter cannot be opened reliably on a phone.

---

## 18. QA: twelve canonical must-pass scene gates

These are the **approved Scene-by-Scene acceptance conditions**, not test results. The prototype is **not** marked passed merely because this file exists.

| ID | MUST PASS | Key tests |
|---|---|---|
| **G01** | S01 loading follows real readiness; no false progress or forced wait | Slow/fast network, assets unavailable |
| **G02** | S02 invitation requires explicit touch/mouse/keyboard activation; audio can be muted and begins only after valid gesture | Autoplay blocked, focus traversal |
| **G03** | S03 verified recipient name is complete and primary, not obscured by typography effects | Long/short names, 320px-like compact viewport, reduced motion |
| **G04** | S04 intentional with **one or two** genuine photos; no vacant slots, distortion or fake gallery | 1/2/4/6 image manifest, face-safe crops |
| **G05** | S05 cake fully decoratable by touch, mouse and keyboard/non-drag; valid placement, undo/remove/reset | Interrupted drag, invalid zones, tap spam, short phone |
| **G06** | S06 exactly preserves finalized cake; candle can be extinguished without mic; no duplicate completion | Mic denied, no sound, comparison snapshot of placements |
| **G07** | S07 birthday letter readable fully and voluntarily, no auto-scroll or forced time | Long text, zoom/keyboard, word wrapping |
| **G08** | S08 standalone full birthday ending; hidden layer not required or forced | Exit/replay path, passive wait |
| **G09** | S09 hidden access requires positive intent, does not depend on ordinary scrolling, includes non-drag alternative | Below/above threshold, cancel, keyboard/reduced motion |
| **G10** | S10 correct PIN works in all capability tiers; primary 3D physically animates hinged door after mechanical release | GLB pivot inspection, GPU tier, invalid retry, tap spam |
| **G11** | S11 reveals physical folded letter; **separate user selection** is necessary to enter confession | 3D and fallback, keyboard, no autoplay |
| **G12** | S12 fully readable, non-demanding, close/fade/replay works, no pressured response control | Copy audit, long text, assistive technology |

### 18.1 Additional cross-system regression gates

- **A01 — Token fidelity:** all ten approved color hexes exact; no arbitrary dominant outside palette.
- **A02 — Type fidelity:** Bricolage/Newsreader roles and Shantell scarcity preserved, no unintended fourth font.
- **A03 — Offset Loop:** loop with deliberate gap remains recognizable across warm/editorial and mechanical derivatives; no compulsory placement in reading scenes.
- **A04 — Texture safety:** paper grain not overlaid across reading type; photo grain not stacked unnecessarily.
- **A05 — Visual layering:** foreground cannot cover face, critical letter copy, cake interaction, focus indicators or PIN controls.
- **A06 — Engine ownership:** no GSAP/Motion property collision; scene enter/exit cleanup complete.
- **A07 — Asset economy:** no early Vault GLB blocking loading, no six-image forced preload, optimized image dimensions.
- **A08 — State integrity:** one `CakeConfiguration`, unique placement commits, consistent wish state, repeatable clean replay.
- **A09 — Privacy integrity:** no sensitive EXIF, no implied security from PIN/unlisted URL, no unapproved third-party photos.
- **A10 — Ethical narrative:** birthday actually completes at S08; confession always voluntary, no forced reply.
- **A11 — Copy integrity:** every personal fact, photo caption, PIN clue and memory supported/approved, not fabricated.
- **A12 — Fallthrough guard:** no scene advances simply because an animation ended, a sound played or an overlay was mounted.

### 18.2 Mandatory cross-device/behavior test matrix

| Dimension | Cases to test | Pass requirement |
|---|---|---|
| Viewport | Short phone, tall phone, tablet-like, wide desktop, browser UI expanded | No clipped primary actions, responsive re-composition |
| Orientation | Portrait; supported landscape | Cake, keypad and reading remain functional |
| Input | Touch, mouse, keyboard, limited precise dragging | Full path, no gesture-only dead ends |
| Settings | Reduced motion, sound muted, high text zoom, contrast/user font adjustments | Equivalent story and controls |
| Media | One/two/four/six real photos; blurry source; failed load | Face-safe intent or honest recovery, no fake duplication |
| Cake | Fast double tap, invalid anchor, cancel drag, reset confirmation, replay | No duplicate objects, correct state persistence |
| Wish | Mic denied, mic unavailable, touch/hold, background tab, repeated touch | Visible extinguish and one completion |
| Hidden | Below-threshold drag, above-threshold drag, cancel/blur, equivalent accessible button | No passive or duplicate entry |
| Vault | Full GPU, weak GPU, WebGL unavailable, GLB failure, wrong PIN, correct PIN | Articulated door where capable; otherwise complete fallback |
| Letter | Empty/long content prototypes, delayed asset, focus during handoff | Explicit selection and fully legible final text |
| Lifecycle | Repeated entry/exit, visibility changes, full replay, asset retries | No leaks, stale timelines or incorrect scene advancement |
| Privacy | Share/deploy exposure, EXIF, screenshot preview, cache behavior | No mistaken security/privacy claims |

### 18.3 Evidence format for a QA review

For each gate, capture: tested build revision, device/browser, capability tier, steps, expected behavior, observed behavior, screenshots or short recording where relevant, perf/focus observations, defect severity, proposed mitigation and whether the mitigation touches a LOCKED decision. **Do not mark any gate passed without running it.**

---

## 19. Risk register and tradeoff ownership

| Risk | Severity to the experience | Primary owner | Resolution / stop condition |
|---|---|---|---|
| Hidden affordance too subtle or coercive | **Critical narrative** | Scene art direction + UX | Two-stage Quiet Second Invitation, exit remains valid; test discovery |
| Auto-confession due to state bug | **Critical narrative** | Store / SceneManager | Separate `letterSelected` event required for S12; automated guard test |
| Vault static door swap or cartoon motion | **Critical visual** | GLB model + GSAP owner | Physically rigged hinged door, release beat and credible stop pose; inspect primary path |
| Main scene jank because GLB loaded early | High | AssetManager | Phase preload; GPU tiering, retry/fallback |
| Cake duplication or re-skin on S06 | **Critical interaction** | CakeStore | One persistent configuration, render parity and equality checks |
| Cake tray covers valid targets | High | Responsive interaction | Test short phone, move/recompose tray or stage, not hidden hit zones |
| Portrait looks distorted/fake | High | Photo art direction | Face-safe crop, natural grade and real assets only |
| Low contrast accent text | High | Token/typography | Use deep ink/high-contrast pair, test rendered contrast |
| Random 12 unrelated visual treatments | High | Design system review | Enforce palette, motif, shape, material, motion and scene allocation |
| Long animations feel compulsory | Medium/high | Motion / UX | Safe skip, readable rest state, user intent priority |
| Font bundles oversized/missing glyphs | Medium | Frontend build | Self-host/subset validation, fallback and load tests |
| Sensitive photo or unintended public link | High | Content/deployment | Rights/context audit, EXIF removal and real access controls if required |

---

## 20. Final LOCKED vs PENDING register

### 20.1 Decisions consolidated as LOCKED (not newly invented)

- Exactly twelve fullscreen scenes; four emotional acts are grouping only, not route/page additions.
- Primary Birthday experience; full satisfactory ending at S08; optional Hidden route with user consent and no demanded romantic reply.
- `011007` narrative PIN; unlocking Vault not the same as selecting/opening the physical hidden letter.
- Visual and emotional thesis **Warm Kinetic Editorial Keepsake**, **A Keepsake That Slowly Opens**, and responsive **Playful Precision**.
- Ten-color palette; muted-but-confident warm/cool dual-accent behavior; Hidden plum/graphite, one accent family per scene.
- Bricolage Grotesque + Newsreader + rare Shantell Sans typography; Phosphor functional icons; custom decorative Offset Loop and five SVG/shape languages.
- Tactile Editorial Surfaces five material families; texture `T0–T2`; shadow `S0–S3`; three decorative depth planes plus functional utility overlay.
- `motion.M0–M5`, `transition.T1–T4`, one primary T4 candidate/target at intentional S08→09, distinct GSAP/Motion ownership and cancellation/fallback rules.
- Authentic Portrait P1–P4 system, supports 1–6 source images, baseline two, does not invent memories or become gallery.
- Sculpted Celebration Cake: single-tier DOM/SVG-first, five curated decoration categories, direct/tap controls, identical cake state in S05 and S06, touch/hold wish regardless of mic.
- The Quiet Keepsake Vault: external GLB production preference, matte mechanical monolith, small intro dolly with stable keypad, accessible DOM PIN, **genuine mechanically sequenced 3D hinged door opening** in capable main mode, folded paper, 2.5D/DOM fallback.
- Twelve approved scene-level roles, six final audit resolutions, responsive re-composition, 12 narrative QA gates.

### 20.2 PENDING CONTENT — cannot be filled from these source files

Recipient's confirmed public/private name, birth date and any intended age; whether `011007` has a verified personal meaning; wording for PIN hint and hidden discovery; actual authentic moments since 2022; approved birthday letter; approved confession; validated ending copy; photo selection and sharing comfort; chosen soundtrack/SFX and their licenses; final recipient-facing language register and exact button microcopy. **Do not guess.**

### 20.3 PENDING PROTOTYPE / DESIGN CALIBRATION

- Exact breakpoints, safe-area measurements, viewport composition coordinates, font sizes/weights, line measures, image crops/focal points and text wrapping behavior.
- Offset Loop SVG paths and derivatives; actual decorative assets; silhouette vectors, masks and clipping shape details; pattern placements.
- Shadow blur/offset/opacity; surface texture scale/opacity, frosting detail, color preset list, decoration counts, placement anchor map and collision constraints.
- Actual easing curves, stagger/timing, exit interruption thresholds, letter handoff interpolation, hide/reveal cue and exact hidden gesture direction/threshold.
- CakeRenderer implementation performance versus possible Canvas2D, optional mic/audio interaction behavior and fallback presentation.
- Vault GLB geometry/rig/pivots/door clearance, camera coordinate and dolly distance, key/fill lights, PBR roughness/metalness, baked-vs-real shadow choices, GLB compression, final poly/texture/performance budget.
- Actual WebGL capability thresholds, measured initial bundle/memory/FPS and device-specific downgrade policy.
- Deployment URL/security/privacy/access policy and any optional analytics approach (no backend needed by default).
- Real accessibility, performance, responsive and narrative QA outcomes.

### 20.4 Explicit change-control protocol

For any change to a LOCKED direction: create an issue record with `(source reference, exact current rule, proposed change, reason/evidence, affected scenes/components, accessibility/narrative consequence, approval status)`. Keep an approved change log; do not slip a new palette color, animation engine, extra scene, optionality change, Cake state reset or alternate Vault opening mechanism into the build without review.

---

## 21. Source traceability: where the implementation rules came from

| System requirement | Canonical source(s) | Primary implementation section here |
|---|---|---|
| 12 stages, birthday-first, PIN and ethics | `FINAL_FLOW` | §1–2, §11–12, §18 |
| Core runtime, fallback, no route-based scene UX | `TECH_SPEC` | §2, §14–15, §17 |
| Overall emotional/editorial identity | `DESIGN_DIRECTION` | §1, §3–6, §11 |
| Ten palette tokens and warm/cool world rules | `DESIGN_FRAGMENT_COLOR` | §3 |
| Bricolage/Newsreader/Shantell hierarchy | `DESIGN_FRAGMENT_TYPOGRAPHY` | §4 |
| Phosphor, Offset Loop and 5 SVG decorative families | `DESIGN_FRAGMENT_ICON_SVG` | §5 |
| Five structural families / patterned interrupted rhythm | `DESIGN_FRAGMENT_SHAPE_PATTERN` | §5 |
| Materials M1–M5 and T0–T2 | `DESIGN_FRAGMENT_MATERIAL_TEXTURE` | §6 |
| S0–S3, spatial planes/surfaces/depth | `DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE` | §6 |
| M0–M5, T1–T4, 4 easing roles and engine ownership | `DESIGN_FRAGMENT_MOTION` | §7 |
| P1–P4, authentic photos, 1–6 capacity / 2 baseline | `DESIGN_FRAGMENT_PHOTO_TREATMENT` | §8 |
| Single-tier Cake, 5 categories, S05→S06 parity | `DESIGN_FRAGMENT_CAKE_ART_DIRECTION` | §9 |
| Vault GLB, real articulated door, physical letter | `DESIGN_FRAGMENT_VAULT_ART_DIRECTION` | §10 |
| Full scene layouts, transition map, 6 audit resolutions, 12 gates | `DESIGN_FRAGMENT_SCENE_BY_SCENE` | §11–13, §18 |

**Traceability rule:** references above are abbreviated canonical basenames from the manifest in §0.2; they do **not** supersede the complete original files. For detailed decisions, review both this integrated contract and the owning approved fragment rather than selecting an isolated line from an old baseline status list.

---

## 22. Prototype approval checklist / handoff instruction

A prototype built against this system should be reviewed in the following order, not simply judged by screenshots:

1. **Does the birthday stand alone?** One can end after S08 and still receive a complete heartfelt gift.
2. **Does everything respond?** Open, cake, wish, hidden gesture, PIN and physical letter work in all required input/fallback modes.
3. **Does the recipient actually feel present?** Confirmed name, authentic photos, copy, natural skin and accurate memories—not an anonymous luxury template.
4. **Does scene choreography remain one story?** Warm-to-deep shape/color/material continuity, rare T4 and distinct peaks.
5. **Does the cake keep its identity?** User-built cake in S05 is visibly the exact same cake in S06.
6. **Does the 3D Vault earn its climax?** The capable main path releases locks and genuinely opens a hinged door. Camera stabilizes before DOM PIN; weak devices still see and open letter.
7. **Is confession voluntary at every boundary?** Quiet second invitation, deliberate Hidden route, PIN and separate letter selection; no forced answer.
8. **Can a person complete it without ideal hardware?** Reduced motion, poor network, mute, no microphone, no WebGL, keyboard and short-phone constraints.
9. **Is the aesthetic coherent but not templated?** One palette/font/graphic DNA with scene-specific composition, no generic SaaS cards or romance/wedding visual clichés.
10. **Are data, source and QA claims true?** No invented portrait, letter, personal date, GLB file, benchmark or “tested” stamp.

### Final handoff definition

**`DESIGN_SYSTEM.md` is the consolidated, approved-direction design specification and primary design/technical source for the upcoming prototype.** It is **not itself a running prototype** and does not replace the individual source fragments or actual device testing. A faithful implementation should use this as the entry point, refer back to owning fragments for unresolved details, and put every PENDING item into a tracked production backlog.

> **The result should feel crafted for one person: responsive enough to be alive, disciplined enough to be elegant, personal enough to be remembered, and free enough to let the recipient choose how far to open it.**

**END OF MASTER DESIGN SYSTEM v1.0**
