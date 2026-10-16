# BIRTHDAY EXPERIENCE — DESIGN FRAGMENT: COLOR SYSTEM

> **Status:** COLOR SYSTEM FRAGMENT v0.1 — LOCKED  
> **Depends On:**  
> - `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — Flow Baseline v1.0  
> - `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — Tech Baseline v1.0  
> - `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` — Design Direction Baseline v0.1  
> **Future Destination:** `DESIGN_SYSTEM.md`  
> **Scope:** Color philosophy, palette architecture, token roles, world relationship, usage rules, and scene-level chromatic behavior.

---

# 0. DESIGN RELATION

Color system ini merupakan turunan langsung dari design thesis:

**Warm Kinetic Editorial Keepsake**

Color tidak berdiri sendiri.

Color harus mendukung:

- warmth
- personal feeling
- medium energy
- dynamic editorial composition
- controlled visual density
- birthday-first narrative
- moderate contrast antara Birthday World dan Hidden World
- playful but refined interaction
- non-romance-first visual language

---

# 1. COLOR PHILOSOPHY

## Locked Direction

**Balanced Dual-Accent Warm Chromatic Editorial**

Palette menggunakan warm-neutral foundation dengan dua accent family yang memiliki bobot visual setara secara keseluruhan:

```text
Warm Accent Family
Coral + Apricot

Cool Accent Family
Lavender + Periwinkle
```

Keduanya tidak digunakan dengan kekuatan yang sama dalam satu scene.

Satu scene harus mempunyai satu dominant chromatic voice.

---

# 2. COLOR CHARACTER

## Locked Character

**Muted-but-confident**

Artinya:

- bukan pastel lemah
- bukan vivid berlebihan
- bukan dusty yang mati
- bukan candy-color
- bukan luxury black-gold generic
- bukan pink-first feminine palette

Color harus tetap mempunyai:

- presence
- clarity
- warmth
- editorial character
- restrained energy
- visual confidence

---

# 3. FOUNDATION CHARACTERISTICS

## Main Foundation

Palette harus:

- mostly bright
- warm tetapi tetap clean/editorial
- mempunyai soft overall contrast
- cukup neutral untuk menerima photographic asset
- memungkinkan light grading terhadap foto
- terasa slightly feminine tanpa menjadi pink-girly

---

# 4. CORE PALETTE TOKENS

## Neutral System

### Warm Ivory
```text
#F6F1E8
```

Role:
- primary canvas
- main background
- breathing space
- reading surface
- light-world foundation

Character:
- warm
- soft
- luminous
- not pure white

---

### Editorial Mist
```text
#D8D2C9
```

Role:
- secondary neutral
- supporting surface
- divider/background layering
- visual depth without using dark contrast

Character:
- greyed
- editorial
- subdued
- warm-neutral

---

### Deep Ink
```text
#2C282A
```

Role:
- primary typography
- high-importance text
- visual grounding
- structural contrast

Character:
- deep
- warm
- readable
- softer than pure black

---

# 5. WARM ACCENT FAMILY

## Muted Coral
```text
#E67A6B
```

Role:
- warm hero accent
- celebratory moments
- interaction highlight
- expressive graphic field
- scene-level warm dominance

Character:
- warm
- human
- juicy but muted
- energetic without becoming loud

---

## Soft Apricot
```text
#ECA06E
```

Role:
- warm supporting accent
- tactile interaction
- secondary warm layer
- cake-related or playful visual moments
- balance for Coral

Character:
- friendly
- soft
- youthful
- warm
- tactile

---

# 6. COOL ACCENT FAMILY

## Dusty Lavender
```text
#A79DCD
```

Role:
- cool hero accent
- curiosity
- editorial depth
- soft dreamy tension
- chromatic counterbalance to Coral/Apricot

Character:
- refined
- slightly dreamy
- muted
- modern
- non-romantic

---

## Confident Periwinkle
```text
#8794CC
```

Role:
- cool supporting accent
- visual punctuation
- interaction focus
- editorial counter-accent
- depth cue

Character:
- clearer
- stronger
- cooler
- confident
- still restrained

---

# 7. LUMINOUS ACCENT

## Soft Champagne
```text
#E6D4AC
```

Role:
- restrained highlight
- shimmer
- tiny luminous detail
- selective emphasis
- refined feedback moment
- subtle sparkle

Character:
- pale
- warm
- luminous
- not metallic-gold dominant

### Usage Rule

Soft Champagne harus digunakan sangat terbatas.

Target:
```text
< 5% visual presence
```

Champagne adalah highlight, bukan theme color.

---

# 8. HIDDEN WORLD DEEP SYSTEM

## Deep Plum
```text
#352B37
```

Role:
- Hidden World chromatic dark
- emotional depth
- vault environment base
- intimate dark canvas

Character:
- warm-deep
- intimate
- restrained
- not horror
- not cyberpunk

---

## Warm Graphite
```text
#2E2A2C
```

Role:
- structural dark
- vault support
- deep background layer
- metallic/dark grounding
- high-contrast support

Character:
- neutral-warm
- stable
- mechanical
- non-pure-black

---

# 9. PINK POLICY

## Locked Rule

**Pink is NOT part of the core palette.**

Tidak ada dedicated pink token dalam design system.

Jika rose/pink tone muncul:

- berasal natural dari photography
- berasal dari temporary lighting
- berasal dari color blending
- bersifat incidental

Pink tidak boleh menjadi:

- hero color
- background identity
- primary accent
- romance signal
- birthday theme shortcut

---

# 10. PURE WHITE / PURE BLACK POLICY

## Locked Rule

Visual system tidak menggunakan pure:

```text
#FFFFFF
#000000
```

sebagai primary visual environment.

Alasan:
- terlalu dingin
- terlalu keras
- mengurangi warmth
- dapat membuat design terasa generic digital

Pure white/black tetap dapat digunakan secara teknis jika diperlukan, tetapi bukan identity color.

---

# 11. DUAL-ACCENT BEHAVIOR

## Locked Principle

**One scene, one dominant accent family.**

Contoh warm-led scene:

```text
Warm Ivory
+
Coral / Apricot dominant
+
Periwinkle as counter-accent
```

Contoh cool-led scene:

```text
Warm Ivory
+
Lavender / Periwinkle dominant
+
Apricot as counter-accent
```

### Avoid

```text
Coral 50%
Periwinkle 50%
```

secara terus-menerus.

Balanced dual-accent berlaku pada keseluruhan experience, bukan berarti setiap scene harus 50:50.

---

# 12. GENERAL COLOR DISTRIBUTION

## Guardrail

Approximate overall visual ratio:

```text
60–70% Neutral Foundation
20–25% Dominant Accent
5–10% Counter Accent
<5% Luminous Accent
```

Angka ini bukan layout formula absolut.

Fungsi utamanya sebagai guardrail agar palette tetap curated.

---

# 13. COLOR MEMORY PRINCIPLE

## Locked Concept

**Color Memory**

Important colors tidak hilang saat story berkembang.

Mereka berubah karakter.

Contoh conceptual transformation:

```text
Coral
   ↓
Burnt / deeper warm memory accent
```

```text
Lavender / Periwinkle
   ↓
Plum / deeper cool-warm chromatic space
```

```text
Warm Ivory
   ↓
Smoky / muted warm-neutral
```

```text
Deep Ink
   ↓
Warm Graphite
```

Tujuannya:

Hidden World terasa seperti lapisan yang lebih dalam dari Birthday World, bukan website baru.

---

# 14. BIRTHDAY WORLD COLOR BEHAVIOR

Scene 01–08 menggunakan palette dalam mode:

- brighter
- warmer
- more luminous
- more chromatic
- playful but restrained

Birthday World tidak harus menggunakan satu background yang sama.

Color dapat memiliki rhythm.

Conceptual pacing:

```text
quiet
  ↓
warm lift
  ↓
chromatic peak
  ↓
cool editorial contrast
  ↓
playful interaction
  ↓
calm neutral
  ↓
soft closure
```

Color berfungsi seperti tempo.

---

# 15. HIDDEN WORLD COLOR BEHAVIOR

Scene 09–12 menggunakan palette yang sama tetapi dalam mode:

- deeper
- warmer-dark
- more restrained
- lower visual density
- more intimate
- more spatial

Primary dark foundation:

```text
Deep Plum
+
Warm Graphite
```

Supporting chromatic memory dapat berasal dari:

- muted Coral
- restrained Lavender
- Periwinkle reflection
- Champagne micro-highlight

### Avoid

- pure black void
- neon violet
- cyberpunk blue
- hard metallic gold
- horror red
- sci-fi RGB lighting

---

# 16. COLOR CONTRAST

## Locked Direction

**Soft overall contrast**

Namun:

Soft contrast tidak berarti low readability.

### Text Rule

Primary reading text menggunakan:

```text
Deep Ink
```

pada light foundation.

Hero accent tidak digunakan sebagai long-form body text jika contrast/readability tidak cukup.

Coral, Lavender, Apricot, dan Periwinkle lebih cocok untuk:

- display moments
- large typography
- shapes
- graphic fields
- controls
- highlight
- active states
- decorative layers

---

# 17. PHOTO RELATIONSHIP

## Locked Direction

Palette harus cukup neutral untuk menerima foto dengan:

**light grading allowed**

Photo tidak harus dipaksa mengikuti palette secara ekstrem.

Treatment dapat melakukan:

- subtle warmth correction
- tone balancing
- controlled contrast
- gentle tint alignment

Avoid:
- aggressive recoloring
- monochrome forced palette
- heavy filter that damages identity

---

# 18. SCENE COLOR PRINCIPLE

Setiap scene harus menentukan:

```text
Foundation
Dominant Accent
Counter Accent
Luminous Detail
Dark/Ink Support
```

Tetapi tidak semua token harus terlihat.

### Rule

**Accent colors should arrive as moments, not wallpaper.**

Accent harus memiliki timing dan narrative function.

---

# 19. INITIAL SCENE DISTRIBUTION — NON-FINAL

Belum dikunci sebagai final art direction.

Candidate color rhythm:

```text
01 Loading
Neutral-led

02 Invitation
Warm-neutral led

03 Birthday Reveal
Warm or cool hero peak

04 Portrait
Neutral-led with selected accent

05 Cake Studio
Most playful dual-accent environment

06 Make a Wish
Warm low-light transition

07 Birthday Letter
Neutral + restrained accent

08 Final Birthday Moment
Soft neutral closure

09 Hidden Transition
Palette deepening

10 Vault
Deep Plum + Warm Graphite

11 Hidden Letter
Deep neutral + small chromatic memory

12 Confession
Intimate neutral / deep chromatic balance
```

Exact assignment ditentukan pada Scene-by-Scene Art Direction phase.

---

# 20. FINAL COLOR ARCHITECTURE

```text
LIGHT FOUNDATION
├── Warm Ivory       #F6F1E8
├── Editorial Mist   #D8D2C9
└── Deep Ink         #2C282A

WARM ACCENT FAMILY
├── Muted Coral      #E67A6B
└── Soft Apricot     #ECA06E

COOL ACCENT FAMILY
├── Dusty Lavender   #A79DCD
└── Confident Periwinkle #8794CC

LUMINOUS ACCENT
└── Soft Champagne   #E6D4AC

HIDDEN WORLD
├── Deep Plum        #352B37
└── Warm Graphite    #2E2A2C
```

---

# 21. LOCK STATUS

## LOCKED

- Color Philosophy: **Balanced Dual-Accent Warm Chromatic Editorial**
- Character: **Muted-but-confident**
- Mostly bright foundation
- Warm clean/editorial temperature
- Soft overall contrast
- Warm dual-accent: Coral + Apricot
- Cool dual-accent: Lavender + Periwinkle
- Balanced dual-accent across the full experience
- One dominant chromatic voice per scene
- Soft Champagne as restrained luminous accent
- Hidden World remains warm-deep
- Deep Plum + Warm Graphite hidden foundation
- Pink excluded from core palette
- Pure white/pure black excluded as main identity colors
- Color Memory principle
- Accent colors arrive as moments, not wallpaper
- Light photo grading permitted
- Neutral majority guardrail
- Core palette hex values v0.1

---

# 22. NOT YET LOCKED

Still pending:

- semantic CSS variable naming final
- Tailwind token integration
- accessibility contrast validation
- exact scene-by-scene color assignment
- state colors
- hover/pressed/focus colors
- success/error feedback colors
- vault material color mapping
- photo grading presets
- gradient policy
- transparency/alpha scale
- overlay color system
- final production color calibration

---

# 23. FUTURE MERGE TARGET

Fragment ini nantinya digabung bersama fragment:

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

# 24. FINAL COLOR PRINCIPLE

> **Color supports emotion, not decoration.**

> **Birthday is luminous. Hidden is deep. Both belong to the same chromatic world.**

> **Muted does not mean weak. Confident does not mean loud.**

---

**Fragment Version:** 0.1  
**Fragment Status:** LOCKED  
**Parent Design Direction:** Warm Kinetic Editorial Keepsake  
**Future Destination:** `DESIGN_SYSTEM.md`
