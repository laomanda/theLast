# THE LAST — FINAL DESIGN DIRECTION LOCK & PRODUCTION HANDOFF

## 1. Project Context

Kita melanjutkan pengembangan **theLast — Birthday Experience**, sebuah interactive birthday website dengan identitas:

- **Warm Kinetic Editorial Keepsake**
- **A Keepsake That Slowly Opens**
- **The Quiet Keepsake Vault**

Seluruh tahap project familiarization, pengembangan SVG REV5, pengembangan Vault V2, serta eksplorasi preview visual telah memberikan fondasi untuk memasuki tahap production coding.

Saya menetapkan keputusan desain terbaru berikut sebagai **PROJECT-OWNER APPROVED DESIGN DIRECTION**.

Keputusan ini harus diterapkan bersama seluruh dokumen LOCKED yang sudah tersedia, bukan menggantikannya secara sepihak.

## 2. FINAL LOCK — EDITORIAL SURFACE-FIRST BACKGROUND SYSTEM

**Keputusan final: website `theLast` menggunakan COLOR SURFACE + SVG REV5 + SUBTLE TEXTURE sebagai sistem background utama.**

Jangan menggunakan background fotografis atau AI-generated background image sebagai pendekatan default untuk setiap scene.

### A. Base Color Surface

Gunakan warna yang sudah ditetapkan dalam Design System dan Color Fragment.

Palet yang relevan meliputi:

- Warm Ivory — `#F6F1E8`
- Deep Ink — `#2C282A`
- Editorial Mist — `#D8D2C9`
- Muted Coral — `#E67A6B`
- Soft Apricot — `#ECA06E`
- Dusty Lavender — `#A79DCD`
- Confident Periwinkle — `#8794CC`

Warna tidak boleh digunakan secara acak. Setiap scene harus mengikuti hierarki, fungsi, dan pembatasan palet yang ditentukan dalam dokumen LOCKED.

Scene yang membutuhkan atmosfer lebih gelap harus mengikuti art direction aslinya.

### B. SVG-Driven Visual Composition

Gunakan aset produksi asli dari:

`BIRTHDAY_SVG_REV5/`

SVG menjadi bagian penting dari identitas visual, termasuk:

- Signature Offset Loop
- Editorial Shapes
- Celebration Accents
- Paper and Letter Elements
- Cake Components
- Secret and Vault-related Accents
- Motion-oriented SVG Elements

**Wajib menggunakan SVG asli, bukan membuat ulang bentuk yang terlihat mirip melalui AI, CSS improvisasi, atau aset eksternal.**

Gunakan `ASSET_MANIFEST.json`, registry, dan dokumentasi penggunaan untuk menentukan alokasi aset, dependensi, serta kesesuaian setiap scene.

Jangan menampilkan seluruh SVG sekaligus. Gunakan komposisi selektif berdasarkan kebutuhan naratif.

### C. Subtle Texture, Material & Depth

Background tidak boleh terasa seperti halaman kosong tanpa identitas.

Bangun kedalaman visual melalui:

- Warna dan surface hierarchy.
- Restrained SVG layering.
- Subtle paper-like texture sesuai Design System.
- Soft shadows dan depth tokens.
- Editorial whitespace.
- Controlled asymmetrical composition.
- Purposeful motion.

Hindari glassmorphism generik, gradient berlebihan, ornamental clutter, dan efek visual yang tidak memiliki fungsi.

Jangan membuat texture image baru jika material yang sama dapat diwujudkan secara efisien menggunakan CSS atau SVG yang telah disetujui.

### D. Photography Policy

**Photography is content, not the default background system.**

Fotografi tetap diperbolehkan apabila memiliki fungsi naratif yang jelas dan sesuai dokumen LOCKED.

Contohnya, Scene 04 menggunakan foto asli penerima sebagai konten utama.

Aturannya:

1. Jangan menggunakan AI-generated photography sebagai pengganti foto asli.
2. Jangan menciptakan background foto dekoratif hanya agar scene terlihat mewah.
3. Jangan membuat photorealistic scrapbook atau still-life scene sebagai default.
4. Jangan menghilangkan foto asli yang memang dibutuhkan oleh narrative flow.
5. Jangan menggunakan screenshot preview sebagai background bitmap website.
6. Optimalkan foto asli melalui responsive sizing, crop, dan image loading yang tepat.

### E. Scene-Specific Application

Gunakan pendekatan surface-first sesuai kebutuhan naratif masing-masing scene.

- **S01:** Warm Ivory, signature Offset Loop, restrained prelude motion.
- **S02:** Editorial paper surface, invitation geometry, controlled SVG accents.
- **S03:** Name-first birthday reveal, typography dan celebration SVG sebagai fokus.
- **S04:** Authentic portrait hero, clean editorial framing, restrained background.
- **S05:** Cake Studio menggunakan SVG production components sebagai objek interaktif utama.
- **S06:** Make a Wish mempertahankan CakeConfiguration S05 dan animasi lilin.
- **S07:** Birthday Letter dengan paper/letter material system.
- **S08:** Birthday-first false ending yang tenang dan tidak membocorkan hidden path.
- **S09–S12:** Ikuti Hidden World, Vault, Confession, dan Closing art direction sesuai dokumen LOCKED.

Khusus Scene 10, **Vault V2 GLB tetap menjadi aset 3D utama**. Jangan menggantinya dengan ilustrasi atau SVG dekoratif.

Daftar ini adalah panduan penerapan strategi background, bukan perubahan terhadap spesifikasi rinci setiap scene.

## 3. Preview Image Policy

Tahap eksplorasi preview full-page dihentikan.

Preview yang sebelumnya dibuat merupakan **visual composition references**, bukan spesifikasi pixel-perfect yang harus direproduksi secara literal.

Gunakan preview untuk memahami:

- Layout hierarchy.
- Emotional tone.
- Relative spacing.
- Visual focal point.
- Desktop/mobile composition.
- Content positioning.

Jangan meniru elemen preview yang bertentangan dengan source of truth, termasuk:

- Photorealistic decorative backgrounds.
- Unsupported flowers, props, ribbons, dan scrapbook objects.
- Fabricated scene counters.
- Nonfunctional menus.
- Cake yang muncul sebelum waktunya.
- Unapproved personal copy.
- Invented SVG geometry.

Dokumen scene-specific `.md` yang telah dibuat tetap digunakan sebagai referensi pendamping, dengan kewajiban menyelesaikan konflik terhadap dokumen LOCKED dan keputusan background terbaru.

Jangan menganggap semua preview atau `.md` sebelumnya otomatis telah lulus audit final.

## 4. Authoritative Source Hierarchy

Project root:

`theLast/`

Material utama:

- `docs/`
- `docs/SOURCES/`
- `BIRTHDAY_SVG_REV5/`
- `font/`
- `assets-final/vault/`

Seluruh PRD, Design System, Implementation Plan, Tech Spec, Final Flow, serta design fragments LOCKED harus dipelajari dan dipatuhi.

Font production:

- Bricolage Grotesque
- Newsreader
- Shantell Sans

Gunakan keluarga font sesuai peran yang ditetapkan Typography Fragment. Verifikasi file font aktual, weight, format, dan loading sebelum implementasi.

**Jangan mengarang isi dokumen, status aset, atau spesifikasi yang belum diperiksa.**

Jika terdapat konflik antara preview, scene `.md`, dan dokumen LOCKED, laporkan secara eksplisit dan ikuti hierarki otoritas yang berlaku. Jangan membuat keputusan desain baru secara diam-diam.

## 5. Production Engineering Standards

Gunakan technology stack yang sudah disepakati:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- GSAP
- Motion sesuai pembagian tanggung jawab
- Three.js / React Three Fiber untuk kebutuhan 3D yang memang diperlukan

Implementasi harus:

- Mobile-first dan responsive.
- Accessible dan keyboard-friendly.
- Mendukung `prefers-reduced-motion`.
- Menggunakan semantic HTML.
- Memiliki state management yang deterministik.
- Menghindari memory leak dan animation conflicts.
- Memiliki asset-loading strategy.
- Mengoptimalkan bundle dan runtime performance.
- Menggunakan komponen reusable tanpa mengorbankan karakter visual.
- Mempertahankan continuity antarscene.
- Memiliki fallback untuk kemampuan perangkat yang berbeda.

Zustand mengelola semantic application state; GSAP menangani scene choreography; Motion hanya digunakan untuk local UI feedback sesuai kontrak yang disetujui.

Jangan menambahkan dependensi baru tanpa alasan teknis yang jelas.

## 6. Narrative Architecture — Non-Negotiable

Pertahankan 12-scene narrative architecture.

**Scene 01–08:** Birthday-first experience.

**Scene 08:** False ending.

**Scene 09–12:** Optional hidden confession path.

Hidden path tidak boleh dibocorkan melalui progress indicators, scene numbering, navigasi generik, atau copywriting yang terlalu eksplisit.

Personal content yang masih HOLD tidak boleh diisi dengan karangan AI.

Scene 05 dan Scene 06 wajib mempertahankan konfigurasi Cake yang sama.

Scene 10 wajib menggunakan Vault V2 berstatus:

`VAULT_V2_INTEGRATION_CANDIDATE`

Jangan melakukan redesign geometri, material, atau mekanisme Vault tanpa bukti masalah integrasi.

Status `VISUAL_FINAL_APPROVED` dan `PERFORMANCE_PASS` untuk Vault belum diberikan dan harus diuji dalam runtime sebenarnya.

## 7. Professional Execution Protocol

Saya ingin AI bekerja sebagai **senior production engineer dan technical architect**, bukan sekadar generator kode atau desain.

Terapkan prinsip berikut:

**Evidence before assumptions.** Baca file sebenarnya sebelum menyimpulkan.

**Source-of-truth discipline.** Jangan mengganti keputusan LOCKED.

**Implementation fidelity.** Implementasikan visual berdasarkan aset produksi dan kontrak yang benar-benar tersedia.

**Engineering accountability.** Setiap klaim PASS harus memiliki bukti pengujian.

**No fabricated completion.** Jangan menyatakan fitur selesai apabila belum berfungsi.

**No speculative redesign.** Jangan menciptakan konsep, animasi, atau komponen baru yang tidak diperlukan.

**Incremental delivery.** Kerjakan secara bertahap dengan checkpoint dan acceptance criteria.

**Visual consistency.** Semua scene harus terasa berasal dari satu Design System.

**Production realism.** Prioritaskan implementasi yang benar-benar bisa berjalan di browser, bukan sekadar screenshot yang indah.

**Maintainability.** Gunakan struktur kode yang mudah diperiksa, diperbaiki, dan dikembangkan.

Setiap tahap harus membedakan:

- VERIFIED
- INFERRED
- UNVERIFIED
- CONFLICT
- HOLD

Jangan mengubah status menjadi PASS tanpa pengujian nyata.

## 8. Next Phase — Production Coding

Kita sekarang mengakhiri fase eksplorasi preview visual dan bersiap memasuki **PURE PRODUCTION CODING**.

Sebelum menulis kode:

1. Periksa struktur aktual workspace `theLast`.
2. Baca dokumen otoritatif dan scene-specific references yang tersedia.
3. Verifikasi SVG, font, dan Vault asset paths.
4. Identifikasi konflik yang masih relevan.
5. Tetapkan architecture dan implementation sequence berdasarkan Implementation Plan.
6. Tentukan acceptance criteria untuk tahap pertama.
7. Jelaskan perubahan file yang akan dilakukan.

Setelah pemeriksaan selesai, mulailah implementasi secara bertahap sesuai checkpoint yang disepakati.

Jangan membuat ulang seluruh preview, tidak perlu kembali ke fase asset development, dan jangan langsung membangun seluruh 12 scene tanpa validasi tahap awal.

## 9. Final Project-Owner Decision

**LOCKED DESIGN DIRECTION:**

`EDITORIAL_SURFACE_FIRST`

**Primary background system:**

`COLOR SURFACE + SVG REV5 + SUBTLE TEXTURE`

**Photography policy:**

`NARRATIVE CONTENT ONLY — NOT DEFAULT BACKGROUND`

**Visual references:**

`COMPOSITION GUIDANCE — NOT PIXEL-PERFECT AUTHORITY`

**Vault:**

`V2 INTEGRATION CANDIDATE — GEOMETRY LOCKED`

**Next phase:**

`SOURCE VERIFICATION → PRODUCTION ARCHITECTURE → INCREMENTAL CODING → RUNTIME QA`

Jangan membuka ulang keputusan background ini tanpa konflik source-of-truth yang terbukti atau instruksi eksplisit dari saya.

**Mulai dengan melakukan workspace readiness review dan menyusun checkpoint implementasi pertama. Jangan langsung membuat seluruh website dalam satu langkah.**