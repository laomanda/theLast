# CP-01C.1 S01 Prelude Evidence Report

Date: 2026-10-17  
Checkpoint: **CP-01C.1**  
Scope: **S01 — Loading / Prelude (One Scene Only)**  
Status: **PASS** (Engineering, Readiness, Testing, and Browser Visual Implementation)  
Owner Visual Review: **PENDING OWNER REVIEW**

---

## 1. Repository State at Execution Start

- **Git HEAD:** `d6503b9c244a59513a8c71a2801042c7fa044a9b`
- **Initial Working Tree:** Clean on `main` (with automatic `next-env.d.ts` tracking).
- **Protected Photograph:** `assets/malica.webp` remains completely untouched under `OWNER-CONFIRMED PERSONAL ASSET / SCENE ALLOCATION PENDING / PUBLICATION HOLD`.
- **Runtime Foundation:** `src/runtime/contracts.ts`, `src/runtime/guards.ts`, `src/runtime/transition-engine.ts`, and `src/state/experience-store.ts` preserved byte-for-byte with zero modifications.
- **Baseline Unit Tests:** 19/19 existing tests passed at baseline.

---

## 2. Canonical Sources Consulted

1. `docs/PRD.md`
2. `docs/DESIGN_SYSTEM.md` (§717 S01 Loading / Prelude, §862 OffsetLoopMark)
3. `docs/IMPLEMENTATION_PLAN.md`
4. `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md`
5. `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md`
6. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md`
7. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SCENE_BY_SCENE.md` (Scene 01 Art Direction)
8. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_COLOR.md` (Warm Ivory `#F6F1E8`, Deep Ink `#2C282A`, Muted Coral `#E67A6B`)
9. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_TYPOGRAPHY.md` (Bricolage Grotesque)
10. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_ICON_SVG.md` (Signature Offset Loop)
11. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SHAPE_PATTERN.md` (Loop-derived forms, deliberate interruption)
12. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MATERIAL_TEXTURE.md` (M1 Editorial Matte, T0 Clean Surface)
13. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_DEPTH_SHADOW_SURFACE.md` (2D open canvas, S0)
14. `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_MOTION.md` (M3 Editorial Reveal, T2 mask handoff)
15. `docs/OWNER_DECISIONS/FINAL_DESIGN_DIRECTION_LOCK.md` (`EDITORIAL_SURFACE_FIRST`)
16. `BIRTHDAY_SVG_REV5/public/assets/svg/ASSET_MANIFEST.json` and `REV5_CORRECTION_CHANGE_LOG.md`
17. `font/PRODUCTION_FONT_PROVENANCE.txt`
18. `planning/evidence/CP01B_RUNTIME_EVIDENCE.md`

---

## 3. Production Assets Selected

### 3.1 SVG REV5 Signature Motif

- **Selected Asset:** `signature/offset-loop-open.svg` (`id="a02-root"`)
- **Canonical Source Path:** `BIRTHDAY_SVG_REV5/public/assets/svg/signature/offset-loop-open.svg`
- **Application Path:** `public/assets/svg/signature/offset-loop-open.svg` (copied byte-for-byte; SHA-256 verified)
- **SHA-256:** `9817f8a81ba819cb97ba6a4cfa55aa18d9e45bd1410639fcf5f46b29e4bbd84b`
- **Selection Rationale:**
  - Explicitly built in REV5-correction-1 to eliminate the generic "two concentric rings / spinner loader" defect.
  - Represents a single lopsided organic contour with a deliberate 20° geometric interruption.
  - Traced in Muted Coral `#E67A6B` (`a02-outer`, ~232°) followed by an explicit gap, then a subordinate Confident Periwinkle `#8794CC` accent (`a02-inner`, ~92°) ending in open space.
  - Contains calibrated `pathLength="100"` attributes, round caps, stroke-width 9, and viewBox `0 0 256 256`, ideal for GSAP stroke-dashoffset drawing and mobile legibility (validated from 48px to 256px).
  - Embodies the approved creative direction: **THE INTERRUPTED GESTURE** and the mood of **QUIET CURIOSITY**.

### 3.2 Production Typography

- **Selected Font:** Bricolage Grotesque Variable
- **Source Path:** `font/BricolageGrotesque[opsz,wdth,wght].woff2`
- **SHA-256:** `B51A8EBD169637E47CB7DB430431AB3E122D2F09B03EE2A03EA06F4CB46F1A8E`
- **Integration:** Configured via `next/font/local` in `src/ui/fonts.ts` and attached to `html` / `body` with `display: 'swap'` and a stable fallback font stack.
- **Microcopy:** Exactly **"Ada sesuatu yang menunggu."** (Indonesian wording, punctuation, and capitalization strictly preserved).
- **Non-critical Fonts:** Newsreader and Shantell Sans are excluded from S01 to avoid unnecessary bundle bloat or network blocking.

---

## 4. Files Created and Modified

### Created Files
- `src/ui/fonts.ts` — `next/font/local` integration for Bricolage Grotesque variable font.
- `src/ui/s01/OffsetLoopOpen.tsx` — Inline SVG component matching REV5 `A02` geometry with GSAP path refs and static mode.
- `src/ui/s01/readiness.ts` — Inspectable minimal critical-readiness evaluator supporting standard, degraded, hold, slow, and simulated failure recovery modes.
- `src/ui/s01/S01Prelude.tsx` — S01 visual scene component with GSAP M3 Editorial Reveal, `useSyncExternalStore` for `prefers-reduced-motion`, honest readiness dispatch, and retry surface.
- `src/ui/shell/ExperienceShell.tsx` — Single-route container hosting active scene state and transitions.
- `src/ui/shell/S02DevelopmentBoundary.tsx` — Minimal honest observation boundary displaying S02 runtime handoff without rendering invitation artwork or Open action.
- `public/assets/svg/signature/offset-loop-open.svg` — Exact byte-preserved REV5 asset.
- `tests/unit/s01-prelude.test.ts` — Vitest unit suite covering readiness contracts, edge guards, degraded fallback, failure recovery, idempotency, and reduced motion.
- `tests/e2e/s01-prelude.spec.ts` — Playwright E2E suite covering 4 viewports, transition handoff, failure recovery, and reduced motion.
- `planning/evidence/CP01C1_S01_PRELUDE_EVIDENCE.md` — This evidence document.
- `planning/evidence/screenshots/` — 7 browser screenshots.

### Modified Files
- `app/globals.css` — Configured Tailwind theme tokens (`--color-warm-ivory`, `--color-deep-ink`, `--color-muted-coral`, etc.) and immediate Warm Ivory `#F6F1E8` canvas background.
- `app/layout.tsx` — Attached font variable, language (`lang="id"`), metadata, and mobile viewport configuration.
- `app/page.tsx` — Mounted single-route `ExperienceShell`.
- `playwright.config.ts` — Configured system Chrome browser and port 3001 server binding.
- `vitest.config.mts` — Scoped Vitest test discovery to `tests/unit/**` to keep E2E tests cleanly isolated.

---

## 5. Critical Readiness and Fallback Architecture

### Critical vs. Non-Critical Resource Classification
- **Critical Resources (Evaluated for S01):**
  1. `DOM_ENVIRONMENT`: Window, document body, and viewport present and measurable.
  2. `RUNTIME_STORE`: Experience runtime in active S01 state.
  3. `CRITICAL_FONT`: Bricolage Grotesque loaded via `document.fonts`. If unavailable or timed out, system fallback font is used (classified as `degraded`).
  4. `S01_MOTIF`: SVG `#a02-root` and paths mounted. If unavailable, static silhouette fallback is used (classified as `degraded`).
- **Non-Critical Resources (Explicitly Held / Not Loaded):**
  - Personal photos (`assets/malica.webp` strictly held).
  - 3D models (`vault.glb`).
  - Audio tracks / Howler initialization.
  - Secondary scene fonts (Newsreader, Shantell Sans).
  - S05 Cake decorations / 3D shaders.

### Readiness Handoff Semantics
- When all critical assets are ready: Dispatches canonical `SHELL_READY` -> runtime transitions S01 -> S02.
- When fallback font or motif is used: Dispatches canonical `SHELL_DEGRADED_READY` -> runtime transitions S01 -> S02 safely.
- No artificial timer, fake progress bar, or arbitrary percentage delays the handoff.
- If readiness fails without recovery:
  - Screen stays stable and readable (motif silhouette and microcopy remain visible).
  - Displays clear Indonesian error: *"Ada kendala saat menyiapkan pengalaman."*
  - Provides keyboard-accessible *"Coba lagi"* retry button with visible focus ring.
- Idempotency: `hasDispatchedRef` prevents duplicate dispatch under React 19 Strict Mode remounts or async completion races.
- Deterministic QA Fixtures: `?readiness=hold` holds transition for inspection/screenshot; `?readiness=fail` tests recovery; `?readiness=degraded` tests degraded path.

---

## 6. S01 Motion and Animation Ownership

- **Motion Class:** M3 — Editorial Reveal.
- **GSAP Scoped Context:** Managed with `gsap.context(..., containerRef)` and completely reverted on unmount or re-render (`ctx.revert()`).
- **Choreography Sequence:**
  1. Instant Warm Ivory canvas (zero dark/blank flash).
  2. Outer Coral path (`#a02-outer`) traces ~232° over 1.0s (`power2.inOut`).
  3. Inner Periwinkle accent (`#a02-inner`) traces ~92° over 0.6s (`power2.out`, 0.25s overlap), ending in open space across the 20° gap.
  4. Microcopy *"Ada sesuatu yang menunggu."* enters smoothly with restrained opacity and 8px vertical settle over 0.8s (`power2.out`).
  5. Resting state is completely static. No ceaseless rotation, bouncing, spinning, or shimmering.
- **Reduced Motion:** Subscribed via `useSyncExternalStore`. Under `prefers-reduced-motion: reduce`, GSAP animation is bypassed; motif and microcopy render instantly in their resting state.

---

## 7. Responsive Observations and Screenshots

All screenshots were captured directly in Google Chrome (Version 155.0.8059.80) via automated Playwright test execution into `planning/evidence/screenshots/`:

| Viewport / Scenario | Dimensions | Exact File Path | Status |
|---|---|---|:---:|
| Narrow Mobile (iPhone SE) | 320 × 568 | `planning/evidence/screenshots/s01_narrow-mobile_320x568.png` | **PASS** |
| Standard Mobile (iPhone 14) | 390 × 844 | `planning/evidence/screenshots/s01_standard-mobile_390x844.png` | **PASS** |
| Tall Mobile (iPhone Pro Max) | 430 × 932 | `planning/evidence/screenshots/s01_tall-mobile_430x932.png` | **PASS** |
| Desktop Editorial | 1440 × 900 | `planning/evidence/screenshots/s01_desktop_1440x900.png` | **PASS** |
| Reduced Motion Resting | 390 × 844 | `planning/evidence/screenshots/s01_reduced_motion_390x844.png` | **PASS** |
| Failure & Recovery Surface | 390 × 844 | `planning/evidence/screenshots/s01_failure_recovery_390x844.png` | **PASS** |
| S02 Runtime Handoff Boundary | 390 × 844 | `planning/evidence/screenshots/s02_runtime_handoff_390x844.png` | **PASS** |

### Visual Review Highlights
- **Narrow Mobile (320x568):** Motif scales cleanly to 144px; text remains legible without clipping or viewport overflow.
- **Standard Mobile (390x844):** Perfect vertical rhythm with generous breathing room and warm editorial intimacy.
- **Tall Mobile (430x932):** Safe-area aware, stable centering, no floating distortion.
- **Desktop (1440x900):** Asymmetric composition with motif placed in dialogue with typography and extensive negative space.
- **Reduced Motion:** Fully drawn static silhouette and legible copy render instantly.
- **Failure State:** Preserves the resting motif, microcopy, and accessible retry button.

---

## 8. Verification Results

| Command | Scope | Result | Exit Code |
|---|---|---|:---:|
| `npm run typecheck` | TypeScript compilation (`tsc --noEmit`) | **PASS** (zero errors) | 0 |
| `npm run lint` | ESLint rules across workspace (`eslint .`) | **PASS** (zero errors) | 0 |
| `npm run test:unit` | Vitest unit test suite (2 test files, 29 tests) | **PASS** (29/29 passed) | 0 |
| `npm run build` | Next.js Turbopack production build | **PASS** (prerendered `/` and `/_not-found`) | 0 |
| `npm run test:e2e` | Playwright E2E suite in Google Chrome (7 tests) | **PASS** (7/7 passed) | 0 |

---

## 9. S02 Handoff Status and Known Limitations

1. **S02 Invitation Artwork:** Unbuilt (pending CP-02).
2. **`OPEN_INVITATION` Event:** Strictly held; never dispatched from S01 or the development boundary.
3. **Soundtrack / Audio:** Not initialized; audio unlock deferred to S02 user gesture per locked flow.
4. **Scene T2 Visual Mask Handoff:** The semantic handoff S01 -> S02 is verified. The continuous visual zoom/fold into the tactile invitation object requires the S02 canvas in CP-02.
5. **Personal Photograph (`malica.webp`):** Remains held and unreferenced.

---

## 10. Final Assessment

CP-01C.1 delivers an authentic, restrained, beautifully crafted S01 Prelude adhering strictly to the **EDITORIAL_SURFACE_FIRST** and **QUIET CURIOSITY** design directions.

**FINAL STATUS:** **PASS** for CP-01C.1 implementation and technical verification.  
**AWAITING:** Owner visual review and explicit approval before starting CP-02.

---

## CP-01C.1A Targeted Audit Correction (2026-10-17)

Status: **PASS**

- Removed public URL-query readiness fixtures. Browser fixtures are accepted only in a non-production build from a Playwright-injected window value; production builds reject the mechanism entirely.
- Replaced the guessed `"Bricolage Grotesque"` font probe with the exact generated `next/font/local` family value.
- Corrected SVG fallback handling: degraded readiness is now emitted only when the actual static REV5 SVG image is mounted and loaded. Missing inline SVG with no loaded fallback is a typed readiness failure.
- Retry consumes the controlled one-time failure fixture and re-runs genuine readiness. Browser E2E now clicks **Coba lagi** and verifies the handoff.
- Removed viewport zoom restrictions and added browser coverage for enlarged text with no horizontal overflow.
- The S02 observation surface is now development-only. Production and unexpected scene IDs resolve to an explicit runtime integration boundary, never a visual S02 impersonation.
- Desktop composition was recalibrated at the 1440×900 target with a larger motif, constrained editorial text column, wider grid rhythm, and retained negative space.
- Limitation retained: local readiness can complete before the M3 microcopy is perceptible. No artificial dwell was added. A future T2 contract must let an implemented S02 renderer accept the handoff while preserving S01’s final visual frame; that renderer is outside CP-01C.1A scope.

### Verification

| Command | Result | Exit code |
|---|:---:|:---:|
| `npm run typecheck` | PASS | 0 |
| `npm run lint` | PASS | 0 |
| `npm run test:unit` | PASS — 30/30 | 0 |
| `npm run build` | PASS | 0 |
| `npm run test:e2e` | PASS — 10/10 Chrome tests | 0 |

Updated browser evidence: `s01_desktop_1440x900.png`, `s01_standard-mobile_390x844.png`, `s01_retry_recovered_390x844.png`, and `s01_reduced_motion_390x844.png` under `planning/evidence/screenshots/`. The E2E run also verifies the actual static SVG response, public-query isolation, and text enlargement without horizontal overflow.

### Unresolved / Deferred

- **T2 visual handoff:** BLOCKED by the explicitly deferred S02 renderer. The future S02 implementation must consume S01’s completed visual frame rather than imposing a timer or a loading screen.
- **Owner visual approval:** PENDING. No CP-02 work has begun.
