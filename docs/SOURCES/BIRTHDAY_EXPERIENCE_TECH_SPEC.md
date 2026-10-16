# BIRTHDAY EXPERIENCE — TECH SPECIFICATION

> **Status:** TECH BASELINE v1.0  
> **Depends On:** `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` — Flow Baseline v1.0  
> **Flow Status:** LOCKED  
> **Tech Status:** PROVISIONALLY LOCKED  
> **Primary Device:** Mobile-first browser experience  
> **Runtime Model:** Single fullscreen interactive experience, scene-based, no conventional page navigation  
> **Important Boundary:** Dokumen ini membahas teknologi, architecture, state, rendering, interaction, performance, fallback, dan deployment. **Dokumen ini tidak mengunci design system, visual language, warna, typography, icon style, decorative style, atau art direction.**

---

# 0. RELATION TO THE LOCKED FLOW

Dokumen ini **tidak mengganti** flow yang sudah dikunci pada:

`BIRTHDAY_EXPERIENCE_FINAL_FLOW.md`

Semua keputusan teknis di dokumen ini harus melayani 12 scene berikut:

```text
[01] Loading / Prelude
          ↓
[02] The Invitation / Open
          ↓
[03] Birthday Reveal
          ↓
[04] Portrait / Memory Moment
          ↓
[05] Birthday Cake Studio
          ↓
[06] Make a Wish
          ↓
[07] Personal Birthday Letter
          ↓
[08] Final Birthday Moment
          ↓
       FALSE ENDING
          ↓
[09] Hidden Transition
          ↓
[10] The Vault
          ↓
      PIN: 011007
          ↓
[11] The Hidden Letter
          ↓
[12] Confession Ending
          ↓
     Fade to Black
          ↓
   Replay Experience
```

### Engineering Rule

> Jika sebuah library, engine, effect, atau dependency tidak memiliki fungsi yang jelas terhadap flow di atas, library tersebut **tidak boleh ditambahkan hanya karena terlihat keren**.

---

# 1. TECH OBJECTIVES

Tech architecture harus mampu memenuhi kebutuhan berikut:

1. Menjalankan seluruh experience dalam satu runtime tanpa conventional route/page transition.
2. Mendukung fullscreen scene choreography.
3. Mendukung cinematic transition termasuk immersive zoom bila diperlukan.
4. Mendukung pointer, touch, drag, swipe, tap, hold, keypad, dan optional microphone interaction.
5. Mendukung raster image, inline SVG, animated SVG, audio, GLB/glTF, dan WebGL scene.
6. Mendukung cake customization yang persistent antar-scene.
7. Mendukung 3D vault dengan fallback jika WebGL/device capability tidak memadai.
8. Menjaga performa mobile sebagai prioritas.
9. Mendukung progressive asset loading.
10. Menjaga confession sebagai hidden optional layer sesuai locked flow.
11. Tidak bergantung pada backend untuk v1 jika tidak diperlukan.
12. Tidak mengunci visual design pada fase tech.

---

# 2. CORE STACK — LOCKED

## 2.1 Framework

### Next.js
**Status:** LOCKED

Fungsi:
- Application shell
- Build pipeline
- Asset optimization
- Static delivery
- Deployment compatibility
- Metadata / sharing setup

### React
**Status:** LOCKED

Fungsi:
- Scene composition
- Component lifecycle
- Interactive UI
- Integration layer dengan GSAP, Motion, Zustand, R3F, dan Howler

### TypeScript
**Status:** LOCKED

Fungsi:
- Typed scene states
- Typed transition contracts
- Typed cake configuration
- Typed asset registry
- Typed interaction events
- Mengurangi runtime bug pada sequence yang panjang

---

# 3. STYLING INFRASTRUCTURE

## Tailwind CSS
**Status:** LOCKED AS INFRASTRUCTURE ONLY

Digunakan untuk:
- Layout utilities
- Responsive rules
- Viewport management
- State-dependent classes
- Utility-level styling

### Important Boundary
Tailwind **tidak berarti** kita sudah menentukan:
- color palette
- spacing scale final
- border radius system
- typography system
- shadow language
- visual density
- icon style

Semua itu masuk fase design system nanti.

---

# 4. MOTION STACK

## 4.1 GSAP
**Status:** LOCKED

Peran utama:
- Cinematic scene choreography
- Timeline-based sequencing
- Complex enter/exit animation
- Mask / clip-path transition
- SVG path animation
- Transform orchestration
- Immersive zoom transition
- High-control scene transition
- Parallax runtime via `quickTo()` / equivalent optimized update

GSAP **tidak digunakan sebagai state manager**.

GSAP hanya menjawab:

> Bagaimana transisi atau choreography berlangsung?

Bukan:

> Scene mana yang sedang aktif?

---

## 4.2 Motion
**Status:** LOCKED

Peran utama:
- Component-level animation
- Microinteraction
- Presence animation
- Small UI state transitions
- Button/tap feedback
- Lightweight local motion

### Motion Responsibility Rule

```text
GSAP     → cinematic / timeline / scene orchestration
Motion   → component / microinteraction / local UI motion
```

---

## 4.3 Anime.js
**Status:** REJECTED FOR v1

Alasan:
- Functional overlap dengan GSAP + Motion
- Menambah animation engine ketiga
- Meningkatkan maintenance complexity
- Tidak ada requirement flow yang memerlukan Anime.js secara spesifik

Anime.js hanya boleh dievaluasi ulang jika nanti ditemukan use-case teknis spesifik yang tidak layak ditangani stack existing.

---

# 5. SCENE ARCHITECTURE

Experience tidak dibangun seperti website multipage.

Tidak menggunakan pola:

```text
/birthday
/photo
/cake
/message
/vault
```

Sebaliknya, seluruh flow berjalan dalam satu runtime:

```text
<App>
  └── ExperienceEngine
       ├── SceneManager
       ├── TransitionEngine
       ├── AssetManager
       ├── AudioManager
       ├── GestureManager
       ├── ParallaxEngine
       ├── CapabilityManager
       ├── ExperienceStore
       └── Scene Layer
            ├── LoadingScene
            ├── OpenScene
            ├── BirthdayScene
            ├── PortraitScene
            ├── CakeScene
            ├── WishScene
            ├── MessageScene
            ├── FinalScene
            ├── HiddenTransitionScene
            ├── VaultScene
            ├── HiddenLetterScene
            ├── ConfessionScene
            └── EndState
```

---

# 6. SCENE STATE MODEL

## 6.1 Typed Scene State

Baseline:

```ts
type Scene =
  | "loading"
  | "open"
  | "birthday"
  | "portrait"
  | "cake"
  | "wish"
  | "message"
  | "final"
  | "hidden-transition"
  | "vault"
  | "hidden-letter"
  | "confession"
  | "end";
```

## 6.2 Transition Rule

Scene transition hanya boleh terjadi melalui `SceneManager` / `TransitionEngine`, bukan dari komponen random yang langsung mengganti UI.

Contoh conceptual API:

```ts
transitionTo("portrait", {
  type: "immersiveZoom"
});
```

atau:

```ts
transitionTo("message", {
  type: "fade"
});
```

### Benefit
- Transition konsisten
- Scene lifecycle dapat dikontrol
- Asset preloading dapat dipicu sebelum scene aktif
- Audio cue dapat disinkronkan
- Fallback dapat diterapkan per-device

---

# 7. STATE MANAGEMENT

## Zustand
**Status:** LOCKED

Digunakan untuk data experience yang perlu bertahan antar-scene.

Contoh state:

```ts
interface ExperienceState {
  currentScene: Scene;
  audioEnabled: boolean;
  cakeConfig: CakeConfig;
  candlesLit: boolean;
  candlesExtinguished: boolean;
  vaultUnlocked: boolean;
  confessionOpened: boolean;
  reducedEffects: boolean;
}
```

### Zustand digunakan untuk:
- Current scene metadata
- Cake configuration
- Audio state
- Vault state
- PIN status
- Confession state
- Capability/fallback state

### React local state tetap digunakan untuk:
- State kecil yang tidak perlu lintas-scene
- Temporary hover/tap state
- Local animation helper state

---

# 8. XSTATE

## XState
**Status:** OPTIONAL / NOT REQUIRED FOR v1

Alasan belum dipakai:
- Flow baseline relatif linear
- Zustand + typed SceneManager sudah cukup
- Menghindari overengineering

XState baru dipertimbangkan jika flow berkembang menjadi:
- Banyak branching
- Conditional scene paths
- Parallel state machines
- Complex reversible transitions
- Banyak guarded state

---

# 9. TRANSITION ENGINE

TransitionEngine harus modular dan **design-agnostic**.

Supported technical capabilities:

```text
fade
crossfade
mask
clip-path
scale
camera-like zoom
immersive zoom
SVG reveal
WebGL transition (optional)
custom GSAP timeline
```

### Important
Dokumen tech hanya mengunci bahwa capability tersedia.

Dokumen ini **tidak mengunci** scene mana harus memakai transition visual tertentu, kecuali memang dibutuhkan oleh flow.

---

# 10. IMMERSIVE ZOOM

## Status
**SUPPORTED / APPROVED CAPABILITY**

Immersive zoom disediakan sebagai salah satu transition primitive.

### Possible Implementation

```text
Scene A
  ↓
Target Element Bounding Box
  ↓
GSAP transform / scale / translate
  ↓
Optional mask / clip path
  ↓
Scene B mount / reveal
```

Alternative advanced path:

```text
Scene A
  ↓
DOM snapshot / WebGL plane
  ↓
WebGL scale / distortion / shader transition
  ↓
Scene B
```

### Rule
- Tidak digunakan di setiap transisi
- Harus punya fallback sederhana
- Harus mempertahankan frame-rate mobile
- Tidak boleh menjadi dependency terhadap WebGL

---

# 11. PARALLAX ENGINE

## Status
**SUPPORTED / INTERNAL ENGINE**

Tidak menggunakan dedicated parallax library.

Pipeline:

```text
Pointer / Touch / Device Input
        ↓
Normalized Coordinates
        ↓
ParallaxEngine
        ↓
GSAP optimized transform update
        ↓
Scene Layers
```

### Requirements
- Desktop pointer support
- Mobile-safe behavior
- Reduced effects fallback
- Optional device orientation support jika permission dan UX layak

### Rule
Parallax adalah capability, bukan design requirement.

---

# 12. GRAPHICS & SVG PIPELINE

## SVG
**Status:** LOCKED AS REQUIRED CAPABILITY

Pipeline harus mendukung:

```text
SVG
├── Static asset
├── Inline SVG
├── React component
├── Path animation
├── Stroke animation
├── Mask
├── Clip-path
├── Transform
└── Morphing (optional)
```

### Important Boundary
Tech spec **tidak menentukan bentuk SVG**.

Belum ada keputusan mengenai:
- flower
- star
- ribbon
- heart
- abstract geometry
- birthday icon
- decorative language

Itu masuk design/art direction.

---

# 13. IMAGE PIPELINE

## Next/Image
**Status:** LOCKED

Digunakan untuk:
- Portrait asset
- Supporting photo asset
- Raster image optimization
- Responsive image loading
- Modern image format delivery

### Rules
- Jangan preload semua foto sekaligus jika tidak diperlukan
- Hero/next-scene photo dapat di-prioritize
- Supporting asset lazy-loaded
- Original aspect ratio tetap dijaga

---

# 14. 3D STACK

## Three.js
**Status:** LOCKED

## React Three Fiber
**Status:** LOCKED

## Drei
**Status:** LOCKED

### Primary Use
Locked flow Scene 10 — **The Vault**.

### Secondary Use
Hanya jika ada justifikasi teknis yang jelas pada scene lain.

Three.js **tidak boleh** digunakan untuk dekorasi random hanya karena tersedia.

---

# 15. 3D ASSET FORMAT

## GLB / glTF
**Status:** LOCKED

Preferred:
- `.glb`
- PBR-compatible materials
- Embedded/managed textures

### Compression
Preferred support:
- Meshopt
- Draco jika diperlukan
- Texture compression jika pipeline mendukung

### Rule
3D asset harus lazy-loaded dan tidak boleh memblokir initial birthday experience.

---

# 16. VAULT ENGINE

Vault dibuat sebagai modul terisolasi.

```text
VaultScene
├── Canvas
├── CameraController
├── ModelLoader
├── LightingRuntime
├── InteractionController
├── KeypadController
├── PinValidator
├── LockController
├── VaultAnimationController
└── VaultAudioController
```

### Important Separation

PIN logic tidak boleh tertanam di 3D model.

```text
Keypad Input
   ↓
PinValidator
   ↓
Vault Store State
   ↓
Unlock Event
   ↓
3D Animation + Audio
```

### Locked PIN

```text
011007
```

PIN berasal dari locked flow dan bukan keputusan tech baru.

---

# 17. VAULT FALLBACK

Jika WebGL gagal / device lemah:

```text
Full 3D Vault
      ↓ fallback
2.5D layered vault
      ↓ fallback
Static vault composition + controlled DOM animation
```

### Non-Negotiable
User tetap harus dapat:
- membuka vault
- memasukkan PIN
- membuka hidden letter
- membaca confession

Tidak boleh ada dead-end karena 3D gagal.

---

# 18. CAKE COMPOSER

Cake Studio berasal langsung dari locked flow Scene 05.

Architecture:

```text
CakeComposer
├── CakeRenderer
├── DecorationRegistry
├── PlacementEngine
├── InteractionController
├── CakeState
└── CompletionController
```

## State Example

```ts
interface CakeConfig {
  base?: string;
  frosting?: string;
  candles: DecorationItem[];
  accessories: DecorationItem[];
  placements: Placement[];
}
```

### Core Requirement
Cake state harus persistent sehingga Scene 06 — Make a Wish dapat menggunakan hasil cake yang sama.

---

# 19. CAKE RENDERING APPROACH

## Current Status
**NOT FULLY LOCKED**

Candidate approaches:

### Option A — DOM + SVG
Strength:
- Lightweight
- Responsive
- Easy hit-testing
- Easy GSAP integration
- Good mobile support

### Option B — Canvas 2D
Strength:
- More rendering control
- Efficient for many objects

Weakness:
- More custom interaction logic
- Accessibility/debugging lebih sulit

### Option C — WebGL/R3F
Strength:
- High visual capability

Weakness:
- Overkill untuk v1
- Performance cost lebih tinggi

### Current Recommendation
**DOM + SVG as default candidate.**

Final lock dilakukan setelah interaction prototype.

---

# 20. DRAG / DROP

## dnd-kit
**Status:** OPTIONAL CANDIDATE

Digunakan hanya jika cocok untuk Cake Composer.

Alternative:
- Native Pointer Events
- Custom drag controller

### Decision Rule
Gunakan pendekatan dengan:
- touch reliability terbaik
- lowest dependency cost
- predictable placement
- mobile-first performance

---

# 21. GESTURE ENGINE

## Native Pointer Events
**Status:** LOCKED

Harus mendukung:
- tap
- click
- pointer down/up
- drag
- swipe
- hold
- mobile touch

### GestureManager Responsibilities

```text
GestureManager
├── Tap
├── Hold
├── Drag
├── Swipe
├── Cancel
└── Pointer normalization
```

GestureManager digunakan terutama untuk:
- invitation open
- cake interaction
- make-a-wish fallback
- hidden transition
- vault interaction
- hidden letter interaction

---

# 22. AUDIO STACK

## Howler.js
**Status:** LOCKED

Digunakan untuk:
- Background music
- SFX
- Fade in/out
- Volume state
- Mechanical sound
- Scene cue
- Replay-safe audio handling

### AudioManager

```text
AudioManager
├── Music Channel
├── SFX Channel
├── Volume State
├── Fade Controller
├── Scene Cue Controller
└── Mute/Unmute
```

### Browser Rule
Audio dimulai setelah user interaction yang valid sesuai browser autoplay policy.

Scene 02 — Open adalah trigger ideal berdasarkan locked flow.

---

# 23. MICROPHONE / BLOW DETECTION

## Web Audio API
**Status:** OPTIONAL PROGRESSIVE ENHANCEMENT

Digunakan khusus jika blow detection pada Scene 06 diaktifkan.

Pipeline:

```text
Microphone Permission
      ↓
MediaStream
      ↓
AudioContext
      ↓
AnalyserNode
      ↓
Amplitude / Frequency Analysis
      ↓
Blow Threshold
      ↓
Extinguish Event
```

### Mandatory Fallback
Jika:
- microphone unsupported
- permission ditolak
- threshold unreliable

maka fallback:

```text
Tap / Hold
    ↓
Extinguish Candles
```

User tidak boleh stuck.

---

# 24. ASSET MANAGER / PRELOADER

## Status
**LOCKED AS INTERNAL SYSTEM**

Asset categories:

```text
Images
SVG
Fonts
Audio
GLB / glTF
Textures
Optional shader assets
```

### Loading Strategy

```text
PHASE 1 — BOOT
Critical shell assets
Loading scene essentials
Invitation essentials

PHASE 2 — EARLY EXPERIENCE
Birthday reveal assets
Portrait assets
Cake essentials
Audio essentials

PHASE 3 — MID EXPERIENCE
Message assets
Final scene assets

PHASE 4 — HIDDEN LAYER PRELOAD
Vault GLB
Vault textures
Vault audio
Hidden letter assets
```

### Principle
Vault preload dimulai sebelum Scene 10, tetapi **tidak menghambat initial page load**.

---

# 25. SCENE LIFECYCLE

Setiap scene idealnya mengikuti lifecycle:

```text
preload()
  ↓
prepare()
  ↓
enter()
  ↓
active()
  ↓
exit()
  ↓
cleanup()
```

### Benefits
- GSAP timeline dapat di-kill saat scene selesai
- Event listener tidak bocor
- Audio dapat dihentikan dengan benar
- WebGL scene dapat dispose resource
- Memory leak dapat dikontrol

---

# 26. CAPABILITY MANAGER

## Status
**LOCKED AS INTERNAL SYSTEM**

Mendeteksi:
- WebGL support
- reduced motion preference
- coarse pointer / touch device
- viewport size
- performance class heuristic
- microphone availability
- optional orientation capability

Conceptual output:

```ts
interface DeviceCapabilities {
  webgl: boolean;
  reducedMotion: boolean;
  touch: boolean;
  microphone: boolean;
  performanceTier: "low" | "mid" | "high";
}
```

---

# 27. PERFORMANCE STRATEGY

## Primary Target
Mobile browser first.

### Performance Goals
- Smooth interaction
- Avoid layout thrashing
- Avoid large initial JS payload
- Defer 3D
- Compress large media
- Dispose WebGL resources
- Prefer GPU-friendly transforms
- Avoid unnecessary re-render

### Quality Tier Example

```text
HIGH
├── full transitions
├── full 3D vault
└── higher-quality textures

MID
├── simplified effects
├── full vault with reduced quality
└── compressed textures

LOW
├── reduced motion
├── simplified transition
└── 2.5D/static vault fallback
```

### Target
60 FPS where reasonably possible.

But correctness and interaction reliability take priority over visual complexity.

---

# 28. REDUCED MOTION

`prefers-reduced-motion` wajib dihormati.

Jika aktif:
- immersive zoom disederhanakan
- aggressive parallax dimatikan
- long camera movement dikurangi
- decorative motion dikurangi
- core flow tetap utuh

---

# 29. RESPONSIVE / VIEWPORT ENGINEERING

Experience bersifat fullscreen tetapi harus aman terhadap mobile browser UI.

Requirements:
- gunakan modern viewport units seperti `dvh` bila sesuai
- safe area support
- handle orientation change
- avoid fixed-height bug pada mobile browser
- touch target aman
- scene tetap usable di portrait mobile

### Orientation
Primary assumption:
**Portrait mobile**.

Landscape tetap harus usable tetapi bukan primary composition target pada fase tech.

---

# 30. ROUTING STRATEGY

## v1
Single experience route.

Contoh:

```text
/
```

atau satu dedicated route:

```text
/birthday
```

Internal scene transition **tidak menggunakan URL navigation**.

### Optional
Query string hanya digunakan jika nanti memang diperlukan untuk debug/development, bukan UX utama.

---

# 31. BACKEND

## Status
**NOT REQUIRED FOR v1**

Experience dapat sepenuhnya static/client-side.

Tidak perlu:
- database
- authentication
- API server
- CMS

selama kebutuhan tetap:
- single recipient
- static content
- no response collection
- no analytics requirement khusus

---

# 32. PRIVACY / CONFESSION LAYER

Confession adalah hidden optional layer secara UX, tetapi secara deployment perlu dipahami:

> Konten client-side yang dikirim ke browser bukan security boundary absolut.

Jika confession text dibundle langsung di JS/static asset, technically masih dapat ditemukan melalui source/network inspection.

### v1 Recommendation
Untuk use-case personal biasa, static client-side masih acceptable.

### If stronger concealment is required later
Bisa dievaluasi:
- encrypted payload unlocked client-side
- server function gated by PIN-derived key
- ephemeral signed resource

Namun ini **belum diperlukan** dan berpotensi overengineering.

---

# 33. PIN VALIDATION

Locked PIN:

```text
011007
```

Untuk v1:
- client-side validation cukup
- no account lockout
- no destructive penalty
- subtle invalid feedback

PIN ini adalah narrative gate, bukan security credential.

---

# 34. REPLAY ENGINE

Flow locked memiliki `Replay Experience`.

Replay harus melakukan reset state terkontrol:

```text
resetSceneState()
resetCakeIfRequired()
resetVaultState()
resetConfessionState()
resetAudioTimeline()
```

### Open Question
Apakah hasil cake dipertahankan saat replay atau di-reset akan ditentukan pada interaction/product phase, bukan tech baseline.

---

# 35. ERROR & FALLBACK PHILOSOPHY

User **tidak boleh menemukan dead-end**.

Fallback matrix:

```text
WebGL gagal        → 2.5D / DOM vault
Mic ditolak        → tap/hold candle
Heavy transition   → simplified transition
Reduced motion     → reduced choreography
Asset gagal load   → safe placeholder / retry / graceful skip
Touch issue        → alternate button interaction
```

Core story harus tetap bisa diselesaikan sampai Scene 12.

---

# 36. DEPLOYMENT

## Vercel
**Status:** RECOMMENDED / NOT HARD-LOCKED

Alasan:
- Native Next.js workflow
- Easy preview deploy
- CDN delivery
- HTTPS default
- Simple custom domain support

Alternative hosting tetap memungkinkan jika nanti diperlukan.

---

# 37. ANALYTICS

## Status
**NOT REQUIRED FOR v1**

Tidak perlu tracking berlebihan untuk hadiah personal.

Jika analytics nanti diperlukan, hanya gunakan minimal event seperti:
- experience opened
- cake completed
- vault reached
- confession opened

Tetapi privacy harus dipertimbangkan dan analytics bukan requirement baseline.

---

# 38. DEPENDENCY POLICY

Sebelum menambah library baru, cek:

1. Apakah capability sudah tersedia dari existing stack?
2. Apakah library digunakan oleh minimal satu locked-flow requirement?
3. Apakah benefit lebih besar daripada bundle/runtime cost?
4. Apakah mobile performance tetap aman?
5. Apakah library bisa digantikan native browser API?
6. Apakah library memperumit lifecycle?

Jika jawaban tidak kuat, dependency ditolak.

---

# 39. REJECTED / NOT NEEDED FOR v1

```text
Anime.js
Lenis
Dedicated parallax library
Particle library
Physics engine
jQuery
Separate SPA router for scenes
Heavy UI component kit
Database
CMS
Authentication system
```

### Note
`Lenis` tidak diperlukan karena locked flow secara eksplisit tidak menggunakan conventional browser scrolling sebagai navigasi utama.

---

# 40. SCENE ↔ TECH MODULE MAPPING

| Flow Scene | Main Technical Modules | Notes |
|---|---|---|
| 01 Loading / Prelude | AssetManager, SceneManager, GSAP | Critical asset bootstrap |
| 02 Invitation / Open | GestureManager, AudioManager, Motion/GSAP | User gesture unlocks audio |
| 03 Birthday Reveal | GSAP, Motion, SVG pipeline, TransitionEngine | Motion-heavy reveal capability |
| 04 Portrait / Memory | Next/Image, AssetManager, GSAP, optional ParallaxEngine | Supports 1 or multiple photos without changing flow |
| 05 Cake Studio | CakeComposer, Zustand, Pointer Events, optional dnd-kit | Persistent cake state |
| 06 Make a Wish | CakeComposer, AudioManager, optional Web Audio API | Mic is progressive enhancement only |
| 07 Birthday Letter | SceneManager, Motion/GSAP, AudioManager | No confession logic yet |
| 08 Final Birthday Moment | TransitionEngine, AudioManager | False ending state |
| 09 Hidden Transition | GestureManager, GSAP, immersive zoom capability | No browser scroll |
| 10 Vault | R3F, Three.js, Drei, VaultEngine, Howler | GLB lazy-loaded, fallback required |
| 11 Hidden Letter | VaultEngine, GestureManager, Motion/GSAP | Confession not auto-opened |
| 12 Confession Ending | SceneManager, Motion/GSAP, AudioManager, ReplayController | No forced response interaction |

---

# 41. PROPOSED SOURCE STRUCTURE

```text
src/
├── app/
│   └── page.tsx
│
├── experience/
│   ├── ExperienceEngine.tsx
│   ├── SceneManager.ts
│   ├── TransitionEngine.ts
│   ├── AssetManager.ts
│   ├── AudioManager.ts
│   ├── GestureManager.ts
│   ├── ParallaxEngine.ts
│   ├── CapabilityManager.ts
│   └── types.ts
│
├── scenes/
│   ├── LoadingScene/
│   ├── OpenScene/
│   ├── BirthdayScene/
│   ├── PortraitScene/
│   ├── CakeScene/
│   ├── WishScene/
│   ├── MessageScene/
│   ├── FinalScene/
│   ├── HiddenTransitionScene/
│   ├── VaultScene/
│   ├── HiddenLetterScene/
│   └── ConfessionScene/
│
├── features/
│   ├── cake/
│   │   ├── CakeComposer.tsx
│   │   ├── PlacementEngine.ts
│   │   ├── DecorationRegistry.ts
│   │   └── types.ts
│   │
│   ├── vault/
│   │   ├── VaultCanvas.tsx
│   │   ├── VaultController.ts
│   │   ├── KeypadController.ts
│   │   ├── PinValidator.ts
│   │   └── types.ts
│   │
│   └── audio/
│
├── store/
│   └── experienceStore.ts
│
├── assets/
│   ├── images/
│   ├── svg/
│   ├── audio/
│   ├── models/
│   └── textures/
│
└── lib/
    ├── gsap/
    ├── three/
    └── performance/
```

Folder detail dapat berubah saat implementation, tetapi separation of concerns harus dipertahankan.

---

# 42. TECH LOCK STATUS

## LOCKED

- Next.js
- React
- TypeScript
- Tailwind CSS as styling infrastructure
- GSAP
- Motion
- Zustand
- Three.js
- React Three Fiber
- Drei
- Howler.js
- GLB/glTF pipeline
- SVG capability
- Next/Image
- Native Pointer Events
- Single runtime scene architecture
- SceneManager
- TransitionEngine
- AssetManager / preload strategy
- AudioManager
- CapabilityManager
- Progressive enhancement philosophy
- Mobile-first performance priority
- 3D vault fallback requirement
- No conventional browser scrolling for navigation

## SUPPORTED BUT NOT MANDATORY PER SCENE

- Immersive zoom
- Parallax
- SVG morphing
- WebGL transitions
- Device orientation input

## OPTIONAL / PENDING PROTOTYPE

- dnd-kit
- Web Audio API blow detection
- XState
- Advanced shader pipeline
- Cake renderer final approach

## REJECTED FOR v1

- Anime.js
- Lenis
- Dedicated parallax library
- Particle library
- Physics engine
- Heavy generic UI kit
- Backend/database without real requirement

---

# 43. STILL NOT LOCKED — OUTSIDE TECH BASELINE

Dokumen ini **sengaja tidak menentukan**:

- Visual direction
- Design system
- Color palette
- Typography
- Icon library/style
- Decorative SVG language
- Layout composition
- UI density
- Final asset style
- Photo treatment
- Music style
- Exact transition choreography per scene
- Final immersive zoom usage per scene
- Final parallax usage per scene
- Cake visual form
- Vault visual design
- Confession letter visual design

Semua item di atas dibahas setelah tech baseline selesai.

---

# 44. FINAL ENGINEERING PRINCIPLE

> **The technology must disappear behind the experience.**

User tidak perlu merasa sedang melihat GSAP, Three.js, React, atau WebGL.

Tech dianggap berhasil jika:
- flow terasa mulus,
- interaction responsif,
- scene tidak patah,
- asset siap saat dibutuhkan,
- mobile tetap lancar,
- hidden confession tetap optional,
- dan seluruh 12-scene flow dapat diselesaikan tanpa dead-end.

---

## BASELINE RELATIONSHIP

```text
BIRTHDAY_EXPERIENCE_FINAL_FLOW.md
           │
           │ defines WHAT happens
           ↓
BIRTHDAY_EXPERIENCE_TECH_SPEC.md
           │
           │ defines HOW the runtime can support it
           ↓
Future: DESIGN_SYSTEM.md
           │
           │ defines HOW it should look and feel
           ↓
Future: IMPLEMENTATION_PLAN.md
           │
           │ defines HOW it gets built
           ↓
        Production
```

---

**Tech Baseline Version:** 1.0  
**Related Flow Baseline:** 1.0  
**Status:** TECH BASELINE READY — DESIGN SYSTEM NOT YET DEFINED
