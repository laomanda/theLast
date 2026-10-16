# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: TYPOGRAPHY SYSTEM

> **Status:** TYPOGRAPHY SYSTEM FRAGMENT v0.1 — LOCKED  
> **Depends On:**  
> - `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — Flow Baseline v1.0  
> - `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — Tech Baseline v1.0  
> - `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — Design Direction Baseline v0.1  
> - `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` — Color System Fragment v0.1  
> **Future Destination:** `DESIGN_SYSTEM.md`  
> **Scope:** Font family, typography roles, hierarchy, responsive scale direction, motion behavior, world-specific usage, and implementation direction.

---

# 0. TYPOGRAPHY PRINCIPLE

## Locked Direction

**Expressive Display + Calm Reading**

Typography harus terasa:

- expressive
- editorial
- personal
- warm
- modern
- readable
- memorable
- not childish
- not wedding-like
- not overly experimental

### Core Principle

> **Bricolage membuat dia ingin melihat. Newsreader membuat dia ingin membaca. Shantell membuatnya terasa dibuat oleh seseorang.**

Confident feeling datang dari:

```text
Scale
+
Composition
+
Hierarchy
+
Motion
```

bukan dari penggunaan font-weight berat secara berlebihan.

---

# 1. FONT SYSTEM

## Primary Display / UI

**Bricolage Grotesque Variable**

Role:
- primary visual identity
- birthday reveal
- oversized typography
- editorial display
- scene titles
- CTA
- controls
- instructions
- microcopy
- vault keypad/interface
- functional UI

Character:
- expressive
- youthful but mature
- editorial
- energetic
- slightly imperfect
- contemporary
- not corporate
- not childish

## Emotional Reading

**Newsreader Variable**

Role:
- birthday letter
- personal message
- hidden letter
- confession
- intimate narrative
- selected emotional emphasis

Character:
- calm
- intimate
- literary without feeling old-fashioned
- readable
- emotionally controlled
- suitable for longer reading

## Human Accent

**Shantell Sans Variable**

Role:
- signature
- tiny handwritten note
- short personal annotation
- human trace
- small expressive accent

Usage:
```text
Maximum ±1–2% of total typography
```

Shantell tidak digunakan untuk:
- hero display
- long paragraph
- primary CTA
- confession body
- scene title
- major headline

---

# 2. FONT DOMINANCE

## Birthday World

Approximate visual direction:

```text
Bricolage Grotesque  ≈ 80%
Newsreader           ≈ 18%
Shantell Sans        ≈ 2%
```

## Hidden World

Approximate visual direction:

```text
Bricolage Grotesque  ≈ 65%
Newsreader           ≈ 34%
Shantell Sans        ≈ 1%
```

### Important Rule

Hidden World tidak memakai font family baru.

Typography berubah melalui:
- dominance
- scale
- pacing
- motion
- spacing
- contrast

bukan dengan mengganti identity.

---

# 3. TYPOGRAPHY ROLE SYSTEM

```text
Mega Display
Hero Display
Editorial Display
Scene Heading
Narrative Large
Body
UI Action
Instruction
Micro Label
Personal Mark
```

---

# 4. MEGA DISPLAY

Font: **Bricolage Grotesque**

Used for:
- major visual statement
- oversized scene composition
- selective climax typography

Initial responsive direction:

```css
font-size: clamp(4.5rem, 16vw, 12rem);
```

Weight:
```text
500–600
```

Line-height:
```text
0.85–0.95
```

Tracking:
```text
-0.03em to -0.04em
```

Rule:
- use selectively
- may partially leave viewport
- may behave as graphic composition
- not used for long copy

---

# 5. HERO DISPLAY

Font: **Bricolage Grotesque**

Used for:
- Happy Birthday
- recipient name
- emotional headline
- primary scene statement

Initial responsive direction:

```css
font-size: clamp(3.25rem, 11vw, 8rem);
```

Weight:
```text
500–650
```

Line-height:
```text
0.9–1.0
```

Tracking:
```text
-0.02em to -0.035em
```

---

# 6. EDITORIAL DISPLAY

Font: **Bricolage Grotesque**

Used for:
- decorative typography
- oversized words
- composition fragments
- secondary scene emphasis

Initial responsive direction:

```css
font-size: clamp(2.5rem, 8vw, 5.5rem);
```

Weight:
```text
450–600
```

Line-height:
```text
0.95–1.05
```

Tracking:
```text
around -0.02em
```

---

# 7. SCENE HEADING

Font: **Bricolage Grotesque**

Initial responsive direction:

```css
font-size: clamp(1.75rem, 5vw, 3rem);
```

Weight:
```text
500–600
```

Line-height:
```text
1.0–1.15
```

---

# 8. NARRATIVE LARGE

Font: **Newsreader**

Used for:
- emotional opening sentence
- birthday-letter opening
- confession emphasis
- selected intimate statement

Initial responsive direction:

```css
font-size: clamp(1.2rem, 2.8vw, 1.6rem);
```

Weight:
```text
400–500
```

Line-height:
```text
1.5–1.7
```

---

# 9. BODY / READING

## Emotional Narrative

Font: **Newsreader**

Used for:
- birthday letter
- personal letter
- hidden letter
- confession

Initial responsive direction:

```css
font-size: clamp(0.95rem, 1.5vw, 1.125rem);
```

Weight:
```text
400–500
```

Line-height:
```text
1.55–1.75
```

## Functional Body

Font: **Bricolage Grotesque**

Used for:
- instructions
- supporting UI copy
- short descriptions
- functional guidance

Initial responsive direction:

```css
font-size: clamp(0.95rem, 1.5vw, 1.125rem);
```

Weight:
```text
400–500
```

Line-height:
```text
1.4–1.6
```

---

# 10. UI ACTION

Font: **Bricolage Grotesque**

Used for:
- Open
- Continue
- Done
- Replay
- CTA
- Vault controls

Weight:
```text
550–650
```

Tracking:
```text
-0.01em to 0
```

---

# 11. INSTRUCTION

Font: **Bricolage Grotesque**

Used for:
- Drag up
- Make a wish
- Enter PIN
- Tap to open
- interaction hints

Weight:
```text
400–500
```

Tracking:
```text
0
```

---

# 12. MICRO LABEL

Font: **Bricolage Grotesque**

Used for:
- date
- metadata
- status
- hint
- scene microcopy

Weight:
```text
450–550
```

Tracking:
```text
0.04em–0.08em
```

---

# 13. PERSONAL MARK

Font: **Shantell Sans**

Used for:
- signature
- tiny annotation
- short human note
- small handwritten trace

Rule:
- max ±1–2%
- never becomes primary typography
- never dominates emotional scenes
- avoid exaggerated bounce/informality
- should feel human, not playful-cartoon

---

# 14. VARIABLE FONT PRINCIPLE

Variable font axes dapat digunakan secara selektif untuk:
- cinematic reveal
- width transformation
- optical-size transition
- subtle weight shift
- typography choreography

### Rule

> **Variable axes are a signature effect, not an idle animation.**

Typography tidak boleh terus bergerak tanpa narrative purpose.

---

# 15. TYPOGRAPHY MOTION SYSTEM

## A. Playful Motion

Used for:
- UI
- interaction feedback
- cake controls
- small labels
- button response

Characteristics:
- responsive
- quick
- light
- controlled
- no childish bounce spam

## B. Cinematic Motion

Used for:
- Birthday Reveal
- major headlines
- large editorial typography
- immersive transitions
- scene climax

May use:
- stagger
- mask reveal
- clip reveal
- scale
- position choreography
- tracking animation
- variable-axis shift

## C. Narrative Motion

Primarily for: **Newsreader**

Use:
- opacity reveal
- gentle mask
- line reveal
- controlled fade
- slow emphasis

Avoid:
- every-word animation
- aggressive stagger
- bounce
- constant movement
- dramatic italic overload

---

# 16. BIRTHDAY WORLD TYPOGRAPHY

Primary character:
- expressive
- kinetic
- editorial
- playful but controlled
- visually active

Default dominance:
```text
Bricolage
```

Newsreader appears selectively to:
- slow tempo
- introduce emotional pause
- create personal reading moments

Shantell appears as:
- tiny human trace only

---

# 17. HIDDEN WORLD TYPOGRAPHY

Primary character:
- restrained
- quieter
- intimate
- reading-focused
- emotionally controlled

Bricolage:
- remains present
- smaller dominance
- more restrained motion
- cleaner spacing

Newsreader:
- increased presence
- carries hidden letter
- carries confession
- used without theatrical serif treatment

Shantell:
- almost disappears
- may appear once as personal trace

---

# 18. CONFESSION TYPOGRAPHY RULE

Confession must remain:
- honest
- calm
- readable
- non-manipulative
- non-theatrical

Newsreader does **not** automatically dominate every element.

Bricolage remains present for:
- structure
- subtle UI
- scene framing
- completion/replay

Avoid:
- giant italic serif
- wedding-letter aesthetic
- overly dramatic quotations
- ornamental flourish overload
- script-font confession

---

# 19. COLOR RELATIONSHIP

Typography must work with the locked color system.

Recommended conceptual relationship:

```text
Warm Ivory + Deep Ink + Bricolage
→ primary editorial foundation

Coral / Apricot + Bricolage
→ birthday energy

Lavender / Periwinkle + Bricolage
→ editorial contrast

Warm Ivory + Newsreader
→ birthday letter / keepsake feeling

Deep Plum + Newsreader
→ intimate hidden layer

Soft Champagne + Shantell
→ tiny human accent
```

Long-form text should prioritize:
```text
Deep Ink
or
high-contrast light text on Hidden World surfaces
```

---

# 20. FONT SOURCE

## Bricolage Grotesque
```text
https://github.com/ateliertriay/bricolage
```

## Newsreader
```text
https://github.com/productiontype/Newsreader
```

## Shantell Sans
```text
https://github.com/arrowtype/shantell-sans
```

---

# 21. FILE FORMAT DIRECTION

Preferred:

```text
Bricolage Grotesque Variable .woff2
Newsreader Variable .woff2
Newsreader Italic Variable .woff2
Shantell Sans Variable .woff2
```

Static font weights should not be included unless technically required.

---

# 22. IMPLEMENTATION DIRECTION

Implementation happens later during project setup.

Preferred approach:

```text
self-hosted
+
next/font/local
+
variable font support
+
selective preload
```

Do not use runtime third-party font CDN if self-hosted files are available.

---

# 23. TYPOGRAPHY DO

- use Bricolage as primary visual identity
- use Newsreader for emotional reading
- use Shantell only as human trace
- use oversized typography as composition
- use responsive `clamp()`
- maintain mobile readability
- use moderate weight
- use motion with purpose
- preserve hierarchy
- keep Hidden World related to Birthday World

---

# 24. TYPOGRAPHY DO NOT

- do not use all headlines at weight 800+
- do not make serif dominate all scenes
- do not overuse handwritten typography
- do not introduce additional font families randomly
- do not use Shantell for long copy
- do not make confession look like a wedding invitation
- do not animate every word
- do not use typography motion as decoration only
- do not create a separate typography identity for Hidden World

---

# 25. LOCK STATUS

## LOCKED

- Bricolage Grotesque as Primary Display/UI
- Newsreader as Emotional Reading
- Shantell Sans as Human Accent
- Expressive Display + Calm Reading direction
- Birthday World font dominance direction
- Hidden World font dominance direction
- Bricolage ≈80% / Newsreader ≈18% / Shantell ≈2% in Birthday World
- Bricolage ≈65% / Newsreader ≈34% / Shantell ≈1% in Hidden World
- role-based typography system
- responsive fluid sizing direction
- restrained font-weight usage
- editorial tracking direction
- calm reading leading
- variable-axis motion selectively
- no new font family without strong requirement
- self-hosted variable `.woff2` direction
- `next/font/local` implementation direction

---

# 26. PENDING PRODUCTION TOKENS

Not fully locked yet:
- exact final CSS variable names
- exact production font-size tokens
- exact production weight tokens
- exact line-height tokens
- exact tracking tokens
- breakpoint tuning
- accessibility validation
- actual variable-axis ranges per scene
- animation durations
- animation easing
- preload priority
- final font fallback stack
- browser rendering calibration

These items are production tuning, not a change to the typography direction.

---

# 27. FUTURE MERGE TARGET

This fragment will later merge into:

```text
COLOR SYSTEM
        +
TYPOGRAPHY SYSTEM
        +
ICON / SVG SYSTEM
        +
SHAPE / PATTERN SYSTEM
        +
MATERIAL / TEXTURE SYSTEM
        +
DEPTH / SURFACE SYSTEM
        +
MOTION SYSTEM
        +
PHOTO SYSTEM
        +
CAKE ART DIRECTION
        +
VAULT ART DIRECTION
        +
SCENE ART DIRECTION
        ↓
FINAL DESIGN_SYSTEM.md
```

---

# 28. FINAL TYPOGRAPHY PRINCIPLE

> **Bricolage makes her want to look. Newsreader makes her want to read. Shantell makes it feel made by someone.**

> **Typography must carry the emotional shift without breaking the identity of the experience.**

---

**Fragment Version:** 0.1  
**Fragment Status:** LOCKED  
**Parent Design Direction:** Warm Kinetic Editorial Keepsake  
**Related Color Direction:** Balanced Dual-Accent Warm Chromatic Editorial  
**Future Destination:** `DESIGN_SYSTEM.md`
