# BIRTHDAY EXPERIENCE — DESIGN DIRECTION BASELINE

> **Status:** DESIGN DIRECTION BASELINE v0.1  
> **Depends On:**  
> - `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — Flow Baseline v1.0  
> - `BIRTHDAY_EXPERIENCE_TECH_SPEC.md` — Tech Baseline v1.0  
> **Design System Status:** NOT YET DEFINED  
> **Purpose:** Menyimpan keputusan konsep visual awal yang sudah disepakati sebelum masuk ke `DESIGN_SYSTEM.md` final.

---

# 0. RELATION TO FLOW & TECH

Dokumen ini tidak mengganti flow maupun tech baseline.

Relasi dokumen:

```text
BIRTHDAY_EXPERIENCE_FINAL_FLOW.md
        │
        │ defines WHAT happens
        ↓
BIRTHDAY_EXPERIENCE_TECH_SPEC.md
        │
        │ defines HOW runtime supports it
        ↓
BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md
        │
        │ defines WHAT IT SHOULD FEEL LIKE
        ↓
Future: DESIGN_SYSTEM.md
        │
        │ defines HOW IT SHOULD LOOK CONSISTENTLY
        ↓
Future: IMPLEMENTATION_PLAN.md
```

Flow tetap terdiri dari 12 scene fullscreen, scene-based, mobile-first, tanpa conventional browser scrolling sebagai navigasi utama.

Birthday tetap menjadi fokus utama.

Confession tetap menjadi hidden optional layer di akhir experience.

Tech tetap menjadi infrastructure yang mendukung design, bukan sesuatu yang harus terlihat oleh user.

---

# 1. DESIGN THESIS — CURRENT LOCK

## Internal Direction Name

**Warm Kinetic Editorial Keepsake**

Nama ini digunakan sebagai istilah internal untuk menjaga konsistensi arah desain.

### Meaning

**Warm**
- Nyaman
- Hangat
- Tulus
- Personal
- Tidak terasa dingin atau terlalu showcase-oriented

**Kinetic**
- Experience hidup
- Motion menjadi bagian penting dari komunikasi
- Tidak terasa seperti halaman statis
- Tidak menggunakan motion berlebihan tanpa fungsi

**Editorial**
- Composition curated
- Typography dapat menjadi elemen visual utama
- Layout tidak harus selalu centered
- Foto diperlakukan sebagai bagian dari composition
- Hierarchy harus terasa deliberate

**Keepsake**
- Website diposisikan sebagai hadiah digital personal
- Bukan portfolio
- Bukan product landing page
- Bukan tech showcase
- Bukan romance-first experience

---

# 2. EMOTIONAL TARGET

Experience harus diarahkan untuk membangun perasaan berikut:

- Nyaman
- Hangat
- Merasa spesial
- Excited
- Mood naik
- Playful
- Ada rasa tulus
- Penasaran tinggi

### Emotional Priority

```text
Warmth
   >
Spectacle
```

```text
Personality
   >
Decoration
```

```text
Personal
   >
Romantic
```

```text
Birthday
   >
Confession
```

Confession tidak boleh mengubah birthday experience menjadi romantically demanding experience.

---

# 3. OVERALL ENERGY

## Locked Direction

**Medium Energy — hidup tetapi tetap elegan**

Target bukan:
- terlalu calm
- terlalu minimal kosong
- terlalu chaotic
- terlalu showcase-heavy

Target:
- aktif
- responsive
- berlapis
- punya momentum
- tetap nyaman dilihat
- punya ruang tenang pada scene emosional

### Principle

**Alive, not busy.**

---

# 4. COMPOSITION SYSTEM

## Locked Direction

**Dynamic Editorial**

### Ratio

```text
70% expressive / dynamic editorial composition
30% calm / centered composition
```

### Dynamic Composition Characteristics

Dapat menggunakan:
- oversized typography
- asymmetric placement
- overlapping layers
- elements partially outside viewport
- foreground / midground / background separation
- editorial framing
- controlled visual tension
- layered image treatment

### Calm Composition Characteristics

Digunakan untuk scene yang membutuhkan:
- emotional pause
- reading focus
- intimate moment
- narrative clarity
- confession focus

### Important Rule

Tidak semua scene menggunakan:

```text
Title
Text
Button
Centered
```

Setiap scene harus mempunyai composition purpose.

---

# 5. VISUAL DENSITY

## Locked Direction

**Controlled Medium-High Density**

Viewport tidak boleh terasa mati atau kosong tanpa tujuan.

Namun visual density tetap memiliki hierarchy.

### Recommended Hierarchy Per Scene

```text
1 Primary Focus
2–4 Secondary Elements
Ambient Details as Supporting Layer
```

### Rule

Avoid:
- random decoration spam
- unnecessary particle density
- icon overload
- filler objects
- motion everywhere

Negative space tetap digunakan jika deliberate.

### Principle

**Avoid dead space, not negative space.**

---

# 6. GRAPHIC LANGUAGE

## Locked Direction

**Hybrid Soft + Graphic**

Graphic language dibangun dari kombinasi:

```text
Soft / Organic Forms
        +
Clean Geometric Framing
        +
Editorial Graphic Fragments
        +
Small Amount of Human Imperfection
```

### Intended Character

- warm
- modern
- expressive
- curated
- tactile
- slightly imperfect
- not sterile
- not childish
- not generic

### Not Locked Yet

Bentuk final belum ditentukan.

Belum diputuskan:
- flower
- star
- ribbon
- heart
- botanical
- abstract shape
- handwritten mark
- geometric symbol
- line illustration

Semua bentuk tersebut akan diputuskan pada graphic asset / art direction phase.

---

# 7. TYPOGRAPHY DIRECTION

## Locked Personality

**Expressive Display + Calm Reading**

### Display Typography

Berfungsi sebagai:
- visual anchor
- scene composition element
- motion element
- reveal element
- emotional emphasis

Karakter:
- expressive
- bold enough to own the viewport
- editorial
- flexible for oversized composition

### Reading Typography

Berfungsi untuk:
- birthday letter
- personal text
- confession
- supporting copy
- UI clarity

Karakter:
- calm
- readable
- intimate
- unobtrusive

### Not Locked Yet

Belum memilih:
- font family
- font pairing
- variable font
- type scale
- letter spacing
- font weight system
- line-height system

---

# 8. PHOTOGRAPHY DIRECTION

## Locked Direction

**Editorial + Cinematic Treatment**

Foto tidak diperlakukan sebagai gallery biasa.

### Photo May Use

- editorial crop
- mask
- layered composition
- depth
- focus changes
- foreground/background relationship
- subtle parallax
- blur layering
- fragment treatment
- cinematic reveal
- framing
- oversized crop

### Rule

Jumlah foto tidak menentukan structure.

Jika hanya ada 1 foto:
- tetap cukup
- foto menjadi strong visual anchor

Jika foto bertambah:
- memperkaya composition
- bukan mengubah scene menjadi gallery/carousel

### Not Locked Yet

Belum diputuskan:
- color grading
- crop language
- mask geometry
- border treatment
- texture treatment
- final reveal choreography

---

# 9. CAKE VISUAL DIRECTION

## Locked Direction

**Lightweight Almost-3D / Tactile**

Cake harus terasa dimensional tanpa otomatis menjadi full 3D WebGL object.

### Intended Character

- tactile
- interactive
- visually dimensional
- lightweight
- responsive
- mobile-friendly

### Preferred Technical Relationship

Dapat dibangun dengan:
- DOM
- SVG
- layering
- transforms
- perspective
- gradients/shading
- SVG filters
- motion
- controlled depth illusion

### Reason

Cake adalah visual peak pertama dalam Birthday World.

Interaksi harus terasa satisfying tanpa membuat scene menjadi heavy 3D mini-game.

### Not Locked Yet

Belum diputuskan:
- cake art style
- realistic vs stylized ratio
- decoration form
- renderer final
- exact customization set

---

# 10. MOTION PERSONALITY

## Locked Direction

**Playful Precision**

Motion dibagi menjadi dua sifat utama.

### A. Playful Motion

Digunakan untuk:
- microinteraction
- button feedback
- cake interaction
- drag response
- small object reveal
- local state changes

Characteristics:
- responsive
- light
- slightly playful
- controlled
- no childish bounce spam

### B. Cinematic Motion

Digunakan untuk:
- major scene transition
- typography reveal
- portrait reveal
- immersive zoom
- hidden transition
- vault sequence

Characteristics:
- deliberate
- timed
- choreographed
- spatial
- controlled

### Principle

```text
UI feels responsive.
Major moments feel choreographed.
```

---

# 11. WORLD STRUCTURE

Experience memiliki dua visual worlds.

## A. Birthday World

Scene:
- 01 Loading / Prelude
- 02 Invitation / Open
- 03 Birthday Reveal
- 04 Portrait / Memory
- 05 Birthday Cake Studio
- 06 Make a Wish
- 07 Birthday Letter
- 08 Final Birthday Moment

Character:
- warm
- alive
- playful
- personal
- visually active
- emotionally open

## B. Hidden World

Scene:
- 09 Hidden Transition
- 10 Vault
- 11 Hidden Letter
- 12 Confession Ending

Character:
- quieter
- deeper
- more intimate
- more restrained
- more focused
- more spatial
- more serious without becoming dark/horror

---

# 12. BIRTHDAY WORLD → HIDDEN WORLD RELATIONSHIP

## Locked Direction

**Moderate Contrast**

Hidden World bukan visual universe yang sama sekali tidak berhubungan.

Sebaliknya:

> Hidden World terasa seperti layer yang selama ini berada di bawah Birthday World.

### What Can Change

- motion pace
- brightness
- depth
- visual density
- sound intensity
- spatial feeling
- material feeling

### What Should Remain Related

- visual DNA
- typography family/system
- composition discipline
- interaction quality
- overall craftsmanship

### Avoid

```text
Happy Birthday World
        ↓
Sudden Horror / Cyberpunk / Completely Different Website
```

---

# 13. VAULT VISUAL DIRECTION

## Locked Direction

**Premium Minimal 3D**

Vault harus menjadi true 3D climax.

### Intended Character

- premium
- minimal
- tactile
- believable
- controlled
- spatial
- mechanical
- not game-asset-like

### Principle

3D tidak digunakan sebagai decoration gimmick.

Vault menjadi signifikan karena true 3D ditahan sampai hidden layer.

### Not Locked Yet

Belum menentukan:
- model style
- exact material
- lighting
- environment
- keypad styling
- camera choreography
- surface finish
- animation timing

---

# 14. DIMENSIONAL PROGRESSION

Salah satu konsep utama yang disepakati:

> Semakin jauh user masuk ke experience, semakin dalam ruang digital terasa.

### Conceptual Progression

```text
Loading
2D Graphic
   ↓
Birthday Reveal
Layered Typography
   ↓
Portrait
2.5D Photographic Depth
   ↓
Cake
Tactile / Almost-3D
   ↓
Birthday Letter
Flat Intimate Editorial
   ↓
Final Birthday Moment
Controlled Closure
   ↓
Hidden Transition
Depth Increases
   ↓
Vault
TRUE 3D
```

Dimensional progression bukan berarti setiap scene harus lebih kompleks dari scene sebelumnya.

Progression digunakan untuk membangun narrative depth menuju Vault.

---

# 15. IMMERSIVE ZOOM — DESIGN POSITION

Tech baseline sudah mendukung immersive zoom.

Pada design direction:

**Approved as Signature Capability, not default transition.**

### Current Intent

Immersive zoom dapat digunakan pada beberapa major transition saja.

Target:
- rare
- memorable
- purposeful

Tidak digunakan di setiap scene.

### Candidate Moments

Belum locked, tetapi dapat dievaluasi pada:
- Birthday Reveal → Portrait
- Wish / Birthday Letter transition
- Final Birthday Moment → Hidden World

Exact usage diputuskan saat scene-by-scene art direction.

---

# 16. PARALLAX — DESIGN POSITION

Parallax tetap merupakan supporting depth tool.

### Rule

- selective
- subtle enough to preserve comfort
- performance-aware
- no constant mouse-following gimmick
- not mandatory on every scene

Parallax hanya dipakai jika memperkuat hierarchy atau spatial depth.

---

# 17. SVG / DECORATIVE ASSET PHILOSOPHY

## Separation Rule

**Functional icons ≠ Decorative graphics**

### Functional Icons

Contoh:
- sound
- replay
- close
- arrow
- drag hint
- controls

Boleh menggunakan icon library yang dipilih nanti.

### Decorative Graphics

Harus mempunyai custom visual language.

Tidak boleh hanya menjadi:

```text
random icon pack
+
flower icon
+
star icon
+
heart icon
+
cake icon
```

Decorative asset harus terasa bagian dari composition.

### Not Locked Yet

Belum memilih:
- icon library
- icon stroke
- icon weight
- custom SVG vocabulary
- decorative shape set

---

# 18. CURRENT DESIGN RULES

## DO

- use strong hierarchy
- use expressive composition
- allow visual layering
- make typography part of composition
- use motion with narrative purpose
- preserve warmth
- preserve personal feeling
- keep playful moments tactile
- create contrast between energetic and intimate scenes
- make every scene feel intentional

## DO NOT

- generic birthday template aesthetics
- random balloons/confetti everywhere
- generic pink-gold luxury formula
- empty minimalism
- visual clutter
- stock icon decoration
- generic cards everywhere
- SaaS dashboard patterns
- corporate landing-page structure
- neon cyberpunk vault
- overuse WebGL
- overuse parallax
- overuse immersive zoom
- overuse particle effects
- romance-first visual language

---

# 19. CURRENT LOCK STATUS

## LOCKED — DESIGN DIRECTION

- Design Thesis: **Warm Kinetic Editorial Keepsake**
- Emotional target
- Birthday-first visual hierarchy
- Medium energy
- Dynamic Editorial composition
- 70% expressive / 30% calm composition ratio
- Controlled Medium-High visual density
- Hybrid Soft + Graphic language
- Expressive Display + Calm Reading typography direction
- Editorial + Cinematic photo treatment
- Lightweight Almost-3D / Tactile cake direction
- Playful Precision motion personality
- Birthday World vs Hidden World structure
- Moderate contrast between both worlds
- Premium Minimal 3D vault direction
- Dimensional progression toward true 3D Vault
- Immersive zoom as signature, selective capability
- Parallax as selective supporting depth tool
- Functional icons separated from decorative graphics
- Custom decorative graphic language required

---

# 20. NOT YET LOCKED

Masih perlu dibahas sebelum membuat `DESIGN_SYSTEM.md` final:

- Color philosophy
- Final color palette
- Typography actual / font selection
- Type scale
- Icon library
- Icon style
- SVG decorative vocabulary
- Shape library
- Pattern system
- Material / texture system
- Surface treatment
- Shadow/depth language
- Border/radius language
- Photo grading
- Photo masks
- Final cake art style
- Final cake decoration language
- Final vault material
- Final vault lighting
- Final hidden-world visual treatment
- Motion duration system
- Easing system
- Scene-specific choreography
- Exact immersive zoom placement
- Exact parallax placement
- Scene-by-scene art direction
- Final responsive composition rules
- Sound/music visual relationship

---

# 21. NEXT DESIGN DISCUSSION ORDER

Recommended discussion sequence:

```text
1. Color Philosophy
        ↓
2. Typography Actual
        ↓
3. Icon & SVG Language
        ↓
4. Shape / Pattern System
        ↓
5. Material / Texture System
        ↓
6. Depth / Shadow / Surface Rules
        ↓
7. Motion Rules
        ↓
8. Photo Treatment System
        ↓
9. Cake Art Direction
        ↓
10. Vault Art Direction
        ↓
11. Scene-by-Scene Art Direction
        ↓
12. DESIGN_SYSTEM.md FINAL
```

---

# 22. FINAL DESIGN PRINCIPLE

> **The experience should feel crafted for one person, not generated for a category.**

Luxury tidak datang dari:
- banyak efek
- banyak glow
- banyak 3D
- banyak animation
- banyak decoration

Luxury datang dari:
- restraint
- choreography
- hierarchy
- detail
- consistency
- timing
- personalization
- intentionality

---

**Design Direction Baseline Version:** 0.1  
**Related Flow Baseline:** 1.0  
**Related Tech Baseline:** 1.0  
**Status:** DESIGN DIRECTION BASELINE LOCKED — READY FOR COLOR PHILOSOPHY DISCUSSION
