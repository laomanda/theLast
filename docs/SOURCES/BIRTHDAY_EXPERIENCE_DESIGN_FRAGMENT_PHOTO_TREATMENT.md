# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: PHOTO TREATMENT SYSTEM

> **Status:** PHOTO TREATMENT SYSTEM FRAGMENT v0.1 — **LOCKED**  
> **Identity:** **Intimate Cinematic Editorial Portraiture**  
> **Formula:** **Authentic Portrait + Curated Editorial Framing + Restrained Cinematic Depth**  
> **Parent direction:** **Warm Kinetic Editorial Keepsake**  
> **Photo availability policy:** **1–6 assets supported; 2-photo design baseline; up to 6-photo planning capacity**  
> **Future destination:** `DESIGN_SYSTEM.md`  
> **Scope:** photographic authenticity, composition, crop/mask grammar, grading, material and depth relationship, motion, scene distribution, responsive behavior, adaptive asset strategy, privacy, image pipeline, quality gates.  
> **Boundary:** Locks the design language and interaction constraints, **not** actual image selection, focal coordinates, final mask geometry, grading parameters, exact photo choreography, or finished responsive layouts.

---

## 0. Precedence and relationships

This fragment **extends, never supersedes** these files:

1. `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — 12 fullscreen scenes; birthday-first narrative; hidden confession is optional and accessed deliberately; Scene 04 is the primary Portrait / Memory Moment.
2. `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — Next.js, React, TypeScript, native image handling/Next Image, CSS/SVG, GSAP/Motion, Zustand, mobile-first capability management, graceful fallbacks, no unnecessary new libraries.
3. `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — **Warm Kinetic Editorial Keepsake**, Dynamic Editorial, personal > romantic, warmth > spectacle, editorial + cinematic photography, 70% expressive / 30% calm as an overall directional principle.
4. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` — Warm Ivory `#F6F1E8`, Editorial Mist `#D8D2C9`, Deep Ink `#2C282A`, restrained Muted Coral `#E67A6B` / Soft Apricot `#ECA06E`, Dusty Lavender `#A79DCD` / Confident Periwinkle `#8794CC`; no new photographic palette that takes priority over these tokens.
5. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` — Bricolage Grotesque editorial display/UI, Newsreader intimate reading, Shantell Sans very rare human accent; photo composition must protect type readability.
6. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` — Soft-Mechanical Editorial Marks; Offset Loop is the custom signature motif, not a mandatory mask over the face; decorative assets do not become functional icons.
7. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` — Soft-Structured Kinetic Geometry; organic-led geometry + editorial cuts; no wallpaper, generic blob, or visual noise.
8. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` — Tactile Editorial Surfaces; photographic print impression stays restrained and never becomes an obligatory scrapbook/polaroid imitation.
9. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE.md` — Controlled Cinematic Depth; photo depth mainly from 2D/2.5D layered presentation, not face distortion or heavy WebGL.
10. `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MOTION.md` — Choreographed Playful Precision; M0–M5, T1–T4, selective parallax, deliberate input handling and reduced-motion fallbacks; protect the signature immersive zoom candidate at 08→09.

**Conflict resolution order:** human identity and dignity → narrative intent → readability/accessibility → frame integrity/mobile quality → locked visual language → decorative spectacle.

---

## 1. Design thesis — LOCKED

### Intimate Cinematic Editorial Portraiture

The photograph should feel like *her*, seen through a distinctive and crafted editorial composition, **not** like a new AI-generated person, a celebrity campaign, a gallery template or a romance-first montage.

Three coordinated facets:

- **Authentic Presence:** real face, expressions, skin tone, context and photo provenance are preserved; user recognizes the person immediately.
- **Curated Editorial Composition:** asymmetric framing, selective overlap, strong crop decisions, generous face-safe space, expressive typography and custom graphic fragments.
- **Restrained Cinematic Presence:** reveal, limited layers and subtle spatial transition enhance discovery; portrait is not a motion-tech demo.

**Signature principle:** *The photograph should make her feel seen, not redesigned.*

**Hierarchy:** Human subject > story/emotional moment > photographic framing > type/shape harmony > ornament and motion effects. Type can become compositional anchor, but must never occlude the face or sacrifice readability.

---

## 2. Source and availability strategy — LOCKED

### 2.1 Asset reality

- **Two photos are presently saved** according to the project brief; their suitability/quality has **not yet been assessed**.
- Up to **four additional photos** may be found in Instagram Highlights, but availability is **uncertain**.
- A six-photo target is **not** a dependency or requirement for implementation.
- A photo counts as *usable* only after quality, identity, contextual appropriateness, license/permission expectations and crop suitability are evaluated. Two saved images do **not** guarantee two usable images.

### 2.2 Adaptive Photo Availability Policy

**Design for two photos, gracefully support one, progressively enrich with three to six.**

| Number of *usable* original photos | Intended treatment | Guarantee |
|---|---|---|
| **1** | One intentional editorial hero portrait; expressive framing and visual language provide the structure. Optional detail crop only within same clearly unified composition. | Complete Scene 04; no empty placeholders, fake memories or perceived “lite” experience. |
| **2** | **Default baseline:** one hero + one supporting memory image, either integrated selectively in Scene 04 or used as a small callback when narratively justified. | Complete intended emotional experience. |
| **3–4** | One hero + carefully selected supporting editorial moments; maintain one clear visual protagonist. | No mandatory gallery, carousel, extra scene or automatic collage. |
| **5–6** | Curate at most the useful images into hero, contextual fragments and minimal callbacks; unused photos may be intentionally omitted. | Do not inflate density, weaken hierarchy or consume additional scenes merely to use everything. |

**Design-system invariant:** **Photo count never dictates narrative quality.** More available photos increase compositional options, not narrative length or prestige.

### 2.3 Curation algorithm (design logic, not fixed code)

1. Assess each image for *identity clarity, appropriate context, crop headroom, lighting, resolution and genuine emotional value*.
2. Pick **one hero** based on expressive quality and layout potential, not automatically the largest-resolution file.
3. Pick **zero or more supports** only if they contribute a different moment/angle/context or meaningful narrative emphasis.
4. Assign hero to Scene 04. Consider one support inside Scene 04 or one restrained callback elsewhere; do not force both.
5. Check desktop portrait/landscape, narrow mobile, face-safe crop and low-quality fallbacks.
6. Remove redundant assets: more photos should not lower compositional clarity.

### 2.4 Explicit anti-duplication rules

- One source photo cannot be portrayed as multiple different memories.
- Detail crops from one photo are permitted as **clearly related design fragments**, not standalone fabricated events.
- Do not add a carousel, photo gallery, grid of equal-sized pictures, fake contact sheet of “memories”, stock substitutes or generated friend portraits.
- If two photos have similar content, the second may be omitted instead of forcing both.
- No artificial scene expansion for an arbitrary photo target.

---

## 3. Photo composition grammar — LOCKED

Four photo treatment families, **P1–P4**. This family numbering is independent from Motion's M0–M5 and transitions T1–T4.

### P1 — Editorial Hero Frame (primary / Scene 04 default)

- Dominant real portrait, unambiguous focal hierarchy.
- Asymmetric placement, balanced with typography and carefully edited negative space.
- Rectangular editorial structure may use a restrained soft edge or deliberate cut; never default portrait-in-generic-card UI.
- Face and expression remain legible at mobile sizes.
- Full-bleed only if actual image quality, face safety and responsive behavior support it; not mandatory.

### P2 — Soft Geometric Mask (selective support)

- Hybrid of gentle organic curves and editorial geometric interruption.
- May echo Offset Loop geometry, but never requires forcing the face into a donut/loop or splitting identifiable facial features.
- Prefer a single meaningful reveal or framing move to complex multi-mask clipping.
- Design masks around the photo; do not degrade the face to fit the mask.

### P3 — Layered Print Depth (selective support)

- One portrait plane plus 1–2 restrained graphic/print-supporting planes at most as a starting target.
- Matte/satin relationships follow Material & Texture; believable separation follows Depth & Shadow.
- May imply a photographic print, **not** faux-polaroid stacks, scrapbook tape, torn-paper spam, faux journal stickers or generic vintage nostalgia.
- Use enough depth to anchor the portrait, never as proof of 3D capability.

### P4 — Memory Echo (rare narrative callback)

- Small photographic callback, detail trace or subtle cropped memory reference in another scene **only when it adds emotional continuity**.
- Cannot become recurring image wallpaper, distracting decorative stamp or picture-in-picture template.
- No requirement to put it in Scene 07, 08 or 12.

**Composition rule:** Prefer **P1 + up to one supporting treatment** for Scene 04. Never assume that combining all P1–P4 will yield a better design.

---

## 4. Crop and framing policy — LOCKED

### 4.1 Face-safe hierarchy

1. Recognizability: preserve sufficiently clear facial features and expression.
2. No accidental occlusion: graphic elements, masks, outlines or oversized type may overlap background/garments but must not cut across the face by default.
3. Avoid aggressive face-only crop, forced perspective deformation and awkward partial features unless the *original* image context strongly supports it and identity is still clear.
4. Preserve suitable space above, beside and around the subject; crop position responds to focal point rather than relying solely on `object-position: center`.
5. On constrained displays, simplify frame/shape before shrinking the face into irrelevance.

### 4.2 Typography interlock

- Bricolage may sit beside the subject, overlap photo **negative space**, or selectively tuck behind a clean subject silhouette when that separation is authentic and technically clean.
- Typography must not traverse eyes, nose, mouth or other emotionally meaningful regions.
- Newsreader reading passages receive stable solid/quiet surfaces and unaffected contrast; do not print long text onto photographic detail.
- Do not rely solely on text behind a subject cutout; subject extraction remains optional, not an architectural requirement.

### 4.3 Subject-background separation

- Default: preserve authentic original photographic background.
- Cutout/removal is **selective** only if a photo genuinely supports clean edges and retained likeness; avoid uncanny hair edges, invented anatomy and synthetic contexts.
- If a cutout is poor, prefer frame, mask, color surface, foreground graphic and intelligent crop.
- No false before/after or recreation of memories.

### 4.4 Face-safe responsive cropping

For each selected original image, maintain production metadata such as `focalPoint` and any manually approved safe region. Treat exact coordinates as **PENDING until actual assets are inspected**. Verify all relevant viewport shapes and ensure responsive fallbacks do not reveal unflattering or identity-breaking crops.

---

## 5. Color grading and photo integrity — LOCKED

### Natural First, Editorial Second

**Allowed corrective processing:** exposure, white balance, gentle contrast and tonal balancing, restrained color saturation, light noise reduction, modest sharpening, export color consistency.

**Not an art-direction requirement:** skin smoothing, body reshaping, facial reconstruction, altered eye/nose/mouth/jawline, artificial makeup, invented outfit/location or synthesized memories.

- **Natural skin tone is a hard constraint.** Muted Coral, Lavender, Apricot and Periwinkle are surrounding accent families, **not** global skin tint directives.
- If a source contains clashing hues, adapt the **frame and ambient color composition first**, then consider gentle, photo-appropriate grading.
- Do not make every source photo appear shot with the same camera/light; acceptable natural variation can add authenticity.
- Prefer clean contrast around subject and text to monochromatic/uniform filtering.
- A preserved bright/colored clothing item is acceptable even when outside the palette.
- **No aggressive AI upscaling** that invents facial detail. Any enhancement is limited to honest image correction, with a comparison to the original.

### Grain / texture budget

- Use photographic grain **only** when source/scene justifies it, at barely visible intensity.
- Respect Material & Texture's T0/T1/T2: photos are normally clean (T0), selective subtle detail T1 where warranted, not full T2 texture treatment.
- **Do not stack photographic grain with paper grain by default.** Noise, compression artifacts and additional overlays should not accumulate.
- No excessive sepia, oversharpening, high-contrast fake analog filters, lavender duotone skin, strong vignette or glow.

---

## 6. Depth / material / shadow — LOCKED

- **Static layered 2.5D** is the primary photo depth technique; photographic planes remain flat and undistorted while frames/shapes establish distance.
- Respect Background/Midground/Foreground planes and independent utility overlay from Depth System.
- Use Open Canvas or Editorial Surface appropriately; avoid default floating card and heavy-drop-shadow look.
- Keep Photo Surface matte and gently photographic, not reflective plastic, fake luxury gold, thick glassmorphism or oversaturated satin.
- Portrait can hold a limited tactile ambient shadow if separation requires it; heavy S3 cinematic depth is generally reserved for major objects/Vault.
- Parallax is optional, low-amplitude and compositional; never ongoing cursor-follow showmanship or oscillation that impairs face clarity.
- True 3D portrait mesh, animated depth reconstruction and heavy photo shaders are **not required and are not baseline-approved**.

---

## 7. Motion choreography integration — LOCKED

The photo system inherits **Choreographed Playful Precision**. It does not add a separate timing/easing system.

| Photo behavior | Existing class/family | Policy |
|---|---|---|
| Portrait entrance | **M3** Editorial Reveal; optional **T2** mask | Main reveal: composed, limited stagger; face recognition early. |
| Frame/shape depth settle | **M2/M3** when interactive/revealed | Small motion, no faux physics spectacle. |
| Photo exit / scene handoff | **M4**, possible **T3** spatial handoff | Movement supports transition, never disrupts image integrity. |
| Short callback | **M1–M3** context-dependent | Minimal; no unsolicited looping. |
| Portrait resting state | Static by default | Ambient movement only if demonstrably meaningful and within motion budget. |
| Reduced-motion / low-performance | Existing fallback policy | Static crop, opacity-based reveal, no parallax or spatial zoom. |

**Signature zoom preservation:** A single primary immersive zoom remains targeted for **Scene 08 → 09** pending final scene choreography. Scene 04 must not spend that dramatic vocabulary on another big zoom. A local gentle scale adjustment is not the signature immersive zoom.

**Ownership:** GSAP controls scene-level photo choreography; Motion controls bounded component microinteractions where applicable. Never animate the same element/property from both simultaneously. Cleanup, interruptibility, state integrity, and page visibility policies follow the Motion fragment. No animation should hold the user in order to showcase portrait effects.

---

## 8. Per-scene photographic distribution — LOCKED intent

| Scene | Treatment intent | Requirement |
|---|---|---|
| **01 — Loading / Prelude** | Graphic/typographic curiosity | No image necessary. |
| **02 — The Invitation / Open** | Opening gesture + audio unlocking | No photo necessary. |
| **03 — Birthday Reveal** | Name and kinetic typography own the moment | Photo optional only if art direction earns it; avoid pre-empting 04. |
| **04 — Portrait / Memory Moment** | **Primary hero portrait event: P1; selectively P2 or P3** | **One usable real photo required for portrait-led interpretation; fallback below if none**. |
| **05 — Birthday Cake Studio** | Interactive cake is foreground protagonist | Photo unnecessary. |
| **06 — Make a Wish** | Same customized cake and candles | Photo unnecessary. |
| **07 — Personal Birthday Letter** | Calm reading and genuine wishes | Optional P4 trace; do not force. |
| **08 — Final Birthday Moment** | False ending with purposeful closure | Optional subtle P4 callback, if composition benefits. |
| **09 — Hidden Transition** | Gesture-led spatial change | No photo dependency; preserve signature zoom budget. |
| **10 — The Vault** | Minimal mechanical true-3D narrative | No photo. |
| **11 — The Hidden Letter** | Explicit action to open hidden message | Photo not required, letter is focal. |
| **12 — Confession Ending** | Calm, optional, non-demanding reading and ending | Photo not required; no manipulative portrait enlargement. |

**Hard rule:** No photography plan may re-order the 12 scenes, dilute the birthday-first narrative, force Hidden World discovery or create new gesture requirements. Scene 04 remains strong at one or two images.

---

## 9. Responsive and technical implementation — LOCKED direction

### 9.1 Asset preparation

- Retain one high-quality original for each approved image; use derived, optimized exports in the site.
- Prefer modern browser-supported formats through Next/Image/asset pipeline, with proper responsive sizing and predictable aspect ratio.
- Store image content metadata **in application code/config**, not exposed via unnecessary original EXIF: image id, source file mapping, width/height, aspect ratio, accessible alt, optional focal metadata, scene role and quality notes.
- Avoid exposing GPS/EXIF information or identifiable third-party context that is unnecessary to the experience.
- Use `object-position`, art-direction crops and manual review for face-safe responsive views; `object-fit: cover` without inspection is insufficient.
- Where source resolution is limited, choose smaller print-like framing with supportive whitespace rather than full-bleed pixelation.
- Preload only immediate or soon-needed photo assets; do not preload six large photographs during opening by default.
- Prevent layout shifts and blank flashes with precomputed dimensions, placeholders or deterministic background surfaces.

### 9.2 Runtime photo configuration — conceptual contract

Define a small, deterministic photo manifest; avoid assumptions that six paths exist. Example **shape**, not a finalized implementation API:

```ts
interface PhotoAsset {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  role?: 'hero' | 'support' | 'callback';
  focalPoint?: { x: number; y: number }; // normalized, manually reviewed
  approvedForUse: boolean;
}

interface PhotoPlan {
  hero?: PhotoAsset;
  supports: PhotoAsset[];
  callbacks: PhotoAsset[];
}
```

- **One hero** maximum per Scene 04 composition.
- Supporting/callback arrays can be empty, regardless of the total available source count.
- Do not bind scene progression to `photos.length >= 6`, `>= 4`, or `>= 2`.
- An image used as callback still refers to its source ID; never count a crop as a new memory asset.
- Deciding which photos are shown should be an explicit curation decision, not automatic use-all iteration.

### 9.3 Capability and accessibility

- Prefer CSS/SVG masking and transforms for mobile performance; avoid per-frame heavyweight canvas/photo shaders.
- Preserve clear semantics and accessible alt text where photos convey content, with decorative layers ignored by assistive technologies.
- With reduced motion: static frame and short non-spatial opacity reveal; no parallax, deep camera movement or moving face crop.
- On low FPS: disable nonessential depth first; do not sacrifice image resolution required for face identification.
- Pointer-only effects are never required to understand the moment; touch, keyboard and reduced-motion modes must still communicate equivalent content.
- Photos must not cover controls or interfere with letter readability and interaction hit areas.

---

## 10. Privacy, context and authenticity — LOCKED

- Treat Instagram Highlights as **possible source discovery**, not blanket authorization for public republishing. Consider account privacy, audience, context and recipient comfort; where appropriate, obtain consent or select photos already willingly shared for this use.
- Avoid images involving other people unless relevant and suitable; be especially careful with private/sensitive or intimate contexts.
- Prefer a private/unlisted deployment path; **an unlisted link is not an actual access-control boundary**. If exposure is a concern, use real access controls at deployment rather than relying on obscurity.
- Remove unnecessary EXIF/geolocation metadata from deployed assets.
- Do not claim a composite image captures a real historical moment that never happened.
- Do not alter physical attributes to suggest a changed identity; enhancement cannot outrank authenticity.
- Birthday portrait remains a gift about the person, not a device to pressure a response to the hidden confession.

---

## 11. QA and art-direction acceptance gates

Mark Photo Treatment implementation ready only when:

1. **One-photo test:** Scene 04 looks intentionally complete using just one approved image; no blank slots, fake gallery or cloned memory.
2. **Two-photo baseline test:** hero/support hierarchy is unmistakable on narrow mobile and desktop.
3. **Six-photo input test:** the same 12 scenes remain intact; extras can be ignored or displayed only where they genuinely add meaning.
4. **Face-safe test:** facial features and expression remain clear at relevant viewport dimensions and orientations.
5. **Grading test:** skin tone looks natural; accents live mostly outside the photo.
6. **Texture test:** photographic and surface grain are not redundantly stacked.
7. **Motion test:** Scene 04 is composed without a second signature immersive zoom, looping float or long unnecessary wait.
8. **Accessibility test:** informative image alt, strong text contrast, reduced-motion parity, controls not obscured.
9. **Performance test:** mobile render remains smooth; crop and visual identity survive low-capability fallback.
10. **Privacy test:** image sourcing is appropriate, sensitive EXIF removed, no unintended third-party exposure.

---

## 12. Anti-pattern blacklist

**Do not create:**

- Instagram profile page, masonry grid, auto-playing image gallery or carousel.
- Polaroid wall, scrapbook clichés, excessive tape/ribbon/sticker/photo scraps.
- Fanpage/celebrity poster identity or romance-first slideshow.
- AI-reconstructed face, body reshape, fabricated location/outfit/event, skin-color distortion.
- Frantic zooms, repeated Ken Burns movement, full-screen blur passages or lens-effects spectacle.
- Aggressive loop-shaped face crop, heavy image perspective tilt, hard-to-read text overlays.
- Excessive grain, fake vintage/sepia presets, neon, excessive glow, glossy faux luxury.
- Six-photo prerequisite or the implication that fewer photos yield an inferior gift.
- Additional dependencies or 3D frameworks just to display photographs.

---

## 13. LOCKED vs PENDING

### LOCKED — design principles / system contracts

- **Intimate Cinematic Editorial Portraiture** visual identity.
- **Authentic Portrait + Curated Editorial Framing + Restrained Cinematic Depth**.
- **Natural First, Editorial Second** grading; preserve recognizable identity and context.
- **P1–P4** photo treatment family grammar, with **P1 primary**.
- **Adaptive Photo Availability Policy:** **1–6 supported, 2-photo design baseline, 6-photo planning capacity**; one usable photo delivers full Scene 04.
- No forced gallery, carousel, extra scenes, photographic duplication or synthesized memory.
- Selective Offset Loop/typography overlay with face-safe readability.
- Static 2.5D priority; **M3/M4** inherited photo choreography; signature immersive zoom budget protected.
- Narrative/photo placement remains subordinate to 12-scene birthday-first Flow.
- Progressive asset optimization, mobile-first, reduced-motion and privacy/authenticity safeguards.

### PENDING — asset-specific or prototype-specific

- Which of the presently saved two photos are usable; whether 0–4 extra usable photos are obtained.
- Exact hero and supporting photo selections, per-photo provenance/context approval.
- Manual focal points, safe regions, scene-specific crop and mask geometry.
- Actual print frame proportion, photo-relative typography positions, layout coordinates.
- Final exposure/saturation/sharpening/grain values (if any) for each real photograph.
- Exact GSAP timelines, per-scene stagger, final direction of Scene 04 reveal.
- Production image format/size variants, network and device-specific performance results.
- Final deployment/privacy controls and real-world consent considerations.

---

## 14. Integration contract for future DESIGN_SYSTEM.md

Integrate **photo vocabulary** rather than inserting generic gallery components:

1. Declare P1–P4 roles and composition precedence.
2. Declare safe-crop and authenticity policies separate from layout tokens.
3. Define hero/support/callback manifest and 1/2/3–4/5–6 progressive rendering cases.
4. Reuse Color, Typography, Shape, Material, Depth and Motion tokens instead of inventing photo-only effects.
5. Reserve final crop/mask/timing parameters for asset audit and Scene-by-Scene Art Direction.
6. Treat the Photo System as a **constraint for Cake Art Direction and future scenes**, not a reason to change the overall structure.

**Final guiding statement:**

> **The photograph should make her feel seen, not redesigned.**  
> **Photo count must never dictate narrative quality.**

**Fragment Version:** v0.1  
**Approval Basis:** 28/28 Photo Treatment questionnaire answers + explicit approval of 2-photo baseline and adaptive 1–6-photo policy.  
**Status:** **PHOTO TREATMENT SYSTEM LOCKED — READY FOR CAKE ART DIRECTION**
