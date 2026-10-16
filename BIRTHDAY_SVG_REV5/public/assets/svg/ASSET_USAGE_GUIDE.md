# ASSET_USAGE_GUIDE.md — Birthday Experience SVG kit (REV 4)

> REV 4 changes: A01, A02, D01, D02, D03, D04, D07, D08, D11, E03, E04 (11 files). **D03 changed meaning and D11 changed viewBox: do not reuse REV 3 anchors.** Nothing here is an approval; all assets are NOT APPROVED pending owner review.

This guide covers how the kit is loaded, animated, and integrated. It does not implement the application. Animation is owned by GSAP (scene timelines) and Motion (local component feedback), per DESIGN_SYSTEM §7.5. Static SVG files carry no animation.

## 1. Folder structure

```text
public/assets/svg/
  signature/    A01–A05  Offset Loop family
  editorial/    B01–B07  editorial frames, soft masses, flowing forms, divider
  celebration/  C01–C04  restrained celebration fragments
  cake/         D01–D12  modular cake components (shared 400×300 cake space)
  paper/        E01–E05  keepsake paper and folds
  secret/       F01–F05  secret and Vault 2D marks (never a substitute for the GLB)
  motion/       G01–G03  gesture, transition and anchor support
  _registry.json, ASSET_MANIFEST.json, ASSET_AUDIT.md, ASSET_USAGE_GUIDE.md, ASSET_PREVIEW.html
```

## 2. What each family represents

- **Signature (A):** the Offset Loop, the sole primary motif. REV 4: stroke-only. A01: a coral run, then a periwinkle run that continues one lane inward across the break and laps the loop start (the lane step is the interruption). A02 (REV 5-correction-1): a lopsided organic contour, mostly coral (`a02-outer`, ~232°), an explicit 20° gap, then a short periwinkle accent (`a02-inner`, ~92°) that continues from the gap and ends in open space — a single interrupted gesture, not a second loop. A05 is the mechanical derivative used in the Hidden World.
- **Editorial (B):** frames, cuts and flowing forms that compose type and photographs. Use as framing, never as content.
- **Celebration (C):** small accents for Birthday World. Keep to one per scene.
- **Cake (D):** cake and candle components sharing one coordinate space. Compose them, do not paste one composed image.
- **Paper (E):** folds and sheet silhouettes for the invitation (S02), the birthday letter (S07), and the Hidden Letter (S11). E03 is a closed tri-fold made of separately transformable panels; E04 is a crease overlay for the opened sheet (section 8b).
- **Secret (F):** 2D marks for the quiet discovery cue (S08/S09) and Vault fallbacks. Not a keypad, not the 3D lock.
- **Motion (G):** a gesture track, a transition mask source and an interaction anchor. Each is support geometry, not an effect.

## 3. Scene use

Scene assignments are in `ASSET_MANIFEST.json` (`scenes`). In summary: S01–S03 use A01/A02/A03/C01/B05; S04 uses B02 and A03/A04; S05–S06 use the D family; S07 uses E02/E05/B03/B07; S08 uses A04/F01/C03; S09 uses F02/F03/G01/G02; S10 uses F03/F04/F05; S11 uses E03/E04; S12 uses B01/E05.

## 4. Load as a normal image vs inline

Use `<img src="…svg" alt="">` (empty alt, decorative) for SVGs whose renderMode is external-svg: A03, B01, B02, B03, B04, B07, C01, C03, C04, E01, E02, E05, F01, F04, F05, G01, G03. These have no internal animation targets.

Render **inline** (React component or sanitised inline markup with `aria-hidden="true"`) for SVGs whose renderMode is inline-svg-required: A01, A02, A04, A05, B05, B06, C02, D02, D05, D12, E03, E04, F02, F03, G02. Reason: their internal ids are animation targets, or they need CSS custom properties. An `<img>` cannot expose child paths to GSAP.

Parameterised cake and candle geometry (renderMode parameterized-svg-geometry): D01, D03, D04, D06, D07, D08, D09, D10, D11. Compose these in the shared cake coordinate space (section 5), either inline or as images in a layered container with the documented anchors.

## 5. Cake components, composition contract and presets (REV 4)

All cake assets share one coordinate space: **400×300**. Components are composed; never paste one baked image.

### 5.1 Geometry anchors

- Top plane: ellipse centre **(200,136)**, rx 128, ry 34. Candles and decorations lie on this plane.
- Sidewall: rim y 136 to base y 226 (slight convex wall); base ellipse centre (200,226), rx 125, ry 33. Plate centre (200,238), rx 172, ry 33.
- D01, D02, D03 and D11 are full-cake-space layers: place each at (0,0), 400×300.
- Frosting skirt hangs from the **front rim arc** with seven unequal soft lobes (deterministic; `geom.py`).

### 5.2 Layer order (back to front)

D01 body+plate → D11 ribbon (optional) → D02 frosting → D03 edge shading (ink only) → contact shadows → leaves → flower → pearls → candles sorted by base y ascending (each candle: D04 body, D06 wick, then D05 flame **or** D12 smoke).

### 5.3 Placement formulas (composer-owned, static)

| Part | Transform (applied to the asset's own viewBox coordinates) | Typical values |
|---|---|---|
| Candle group | `translate(bx by) rotate(lean)` (base point on the top plane) | lean -3 to +3.5 deg |
| D04 body | `scale(s) translate(-20 -120)` | s 0.54 to 0.60 |
| D06 wick | `translate(0 -100s) scale(0.62) translate(-20 -20)` | |
| D05 flame | `translate(0 wickTop+2.5) scale(0.50) translate(-20 -57)`, wickTop = -100s - 16·0.62 | |
| D12 smoke | `translate(0 wickTop+1) scale(0.30) translate(-40 -150)` | |
| D07 flower | `translate(x y) scale(1 0.70) rotate(r) scale(s) translate(-60 -60)` | s 0.50 to 0.64 |
| D08 leaf | `translate(x y) scale(1 0.70) rotate(r) scale(s) translate(-5 -38)` | s 0.43 to 0.50; tuck behind the flower |
| D10 pearl | `translate(x y) scale(s) translate(-30 -30)` | s 0.16 to 0.24 |

Contact shadows are **composer primitives, not asset files**: Deep Ink ellipses at fill-opacity 0.18 (candle, rx 8.2 ry 2.8), 0.16 (pearl, rx 30s ry 10s) and 0.12 (flower). A real implementation must recreate them.

### 5.4 Presets (recolouring is a composer input)

Standalone SVGs keep their default colours. The composer substitutes locked palette colours only:

| Asset | Default literal | Preset field |
|---|---|---|
| D02 `d02-frosting` | `#E67A6B` | `frosting` |
| D04 body | `#8794CC` | `candles.body` |
| D07 | `#A79DCD` (outer petals, centre), `#E6D4AC` (inner petals) | `flower.outer`, `flower.inner` |
| D08 | `#8794CC` | `leaves.colour` |
| D11 | `#A79DCD` | `ribbon.colour` |

In a real app expose these as props or CSS custom properties. Reference configurations: `cfg-A-coral-garden` (Coral frosting) and `cfg-B-periwinkle-warm` (Periwinkle frosting); JSON in `REV4_EVIDENCE/results/cakeConfiguration_A.json` and `_B.json`.

### 5.5 Frosting and decoration pairing rule (provisional)

Computed from the locked palette (`REV4_EVIDENCE/results/frosting_decor_matrix.json`, also in the manifest). Provisional QA heuristic, not a source-locked threshold:

- **WEAK** (CIE76 dE < 25): block, or auto-substitute and show a visible notice. Example: Lavender on Periwinkle (dE 9.8). Apricot on Coral (dE 22.1).
- **HUE-ONLY** (luminance contrast < 1.30 but dE ≥ 25): allowed only where the part has its own luminance cue (candle highlight stripe, flower inner petals, leaf rib). Coral/Periwinkle/Lavender combinations (about 1.03-1.17:1) fall here. Not tested for colour-vision deficiency.
- Otherwise **OK**.

Only the Coral and Periwinkle frosting presets exist in the kit; further presets are PENDING (CAKE section 15). The rule is **not implemented in any app**.

### 5.6 Scene 05 → Scene 06 continuity contract

Scene 06 renders the **identical CakeConfiguration** as Scene 05. Only candle state may change: flame groups removed, smoke groups added, plus wish-related effects. Never change frosting, decorations, candle colours or positions. The QA check `continuity_check.py` asserts: configuration diff is exactly `sceneState.candles`; DOM equal after removing flame/smoke groups; zero changed pixels outside candle-tip zones. **This is a static SVG demonstration, not an application state-persistence test (NOT RUN).**

### 5.7 Instance ids and handles

Standalone files keep stable ids (for example `d04-body`). Every inlined instance prefixes **all** ids with a unique key: `<prefix>-<part><i>-<original id>`. Each part is `<g id="<prefix>-<part>-place" transform="…">` (composer-owned, static; never animate) containing `<g id="<prefix>-<part>-root">` (transform-free; GSAP-owned). Check for duplicate ids across the whole document: the preview page holds 666 ids with 0 duplicates.

## 6. Secret and Vault SVGs: decorative only

F01–F05 are decorative. They must never replace the GLB (DESIGN_SYSTEM §10.2), the DOM PIN input (§10.3), or the physical letter. PIN `011007` is not shown in any SVG. F05 deliberately has no numerals or grid.

## 7. Future art direction constraints

- Maximum two locked palette colours per decorative asset; tonal variation through opacity of the same colour only.
- No gradients, filters, blur or SVG morph in continuously running loops (DESIGN_SYSTEM §5.6, MOTION §15).
- Keep the Offset Loop construction: one organic open loop, one deliberate offset, one tangent cut. Do not add a second signature shape.
- No new colours, text, numerals, or personal content inside any SVG.

## 8. Avoiding GSAP and Motion conflicts

Do not let GSAP and Motion animate `transform` or `opacity` on the same DOM node. Put SVG wrappers under separate nodes: GSAP drives the scene wrapper; Motion drives a child button or cue. Animated sub-paths (`a05-seg-*`, `e03-p1` / `e03-p3` panel groups) and instance handles (for example `scene05-flame0-root`, the per-instance group that the composer adds) are GSAP-owned only. Do not reference a standalone file root id inside an assembled cake: those are removed when inlined.

## 8a. GSAP targets (REV 4: verified in Chromium 141 with GSAP 3.13.0, test pages only)

- **Signature stroke draw (A01, A02):** A01 `a01-outer` then `a01-inner`; A02 (REV 5-correction-1) `a02-outer` (the coral run) then `a02-inner` (the periwinkle accent) — this order changed from REV 4's `a02-inner`-then-`a02-outer` because A02's geometry changed from two full runs to one dominant run plus a short accent. Each has `pathLength="100"`: set `strokeDasharray: "100 100"`, animate `strokeDashoffset` 100 → 0. Order not re-verified in a browser this session — see REV5_CORRECTION_CHANGE_LOG.
- **Flame sway (assembled cake):** target `<prefix>-flame<i>-root` with `transformOrigin: "50% 100%"`. Verified: rotation applies and the base point drifts 0 px; the `*-place` group is untouched.
- **Smoke draw (S06):** target `<prefix>-smoke<i>-d12-wisp-a`; no pathLength, so use `getTotalLength()` as the dash length. Verified at 50% (GSAP rounds offsets to whole px).
- Do not use clip-path reveal for A01 or A02: their visible contour is already a stroke.

## 8b. Letter opening (E03 + E04)

Closed state: static `e03-p2` (base), `e03-p3` (folded up, hinge = its bottom edge), `e03-p1` (6 units shorter, folded down, hinge = its top edge), `e03-p1-step` (shadow under the top flap's free edge), `e03-thickness`. Coordinates are in E03's own 244×124 space (panel x 10-230; hinges at y=10 and y=114).

```js
tl.to("#e03-p1-step", {opacity: 0, duration: 0.2}, 0)
  .to("#e03-p1", {scaleY: -1, svgOrigin: "120 10", duration: 1.0}, 0.1)           // top flap lifts and lays back
  .to("#e03-p1-shade", {fillOpacity: 0.35, duration: 0.5, yoyo: true, repeat: 1}, 0.1)
  .to("#e03-p3", {scaleY: -1, svgOrigin: "120 114", duration: 1.0}, 0.8)          // bottom flap unfolds downward
  .to("#e03-p3-shade", {fillOpacity: 0.35, duration: 0.5, yoyo: true, repeat: 1}, 0.8)
  .to("#e03-thickness", {opacity: 0, duration: 0.6}, 1.0);
// then fade in two E04 crease overlays on the hinge lines (y=10 and y=114)
```

If E03 is inlined into a larger scene, translate the whole scene with a parent `<g>`; keep `svgOrigin` in the scene's coordinates. The standalone E03 viewBox shows the closed state only; render the opened pose with `overflow: visible` or a taller scene viewBox. scaleY is a 2D emulation of a fold, not perspective. Letter text is **DOM text only**, never inside the SVG.

## 9. Reduced motion

With `prefers-reduced-motion`, do not run stroke-draw, dash-offset, sway, or segment reassembly. Show the static file. Keep the state change (for example the candle out state) through a visible non-motion change. This follows DESIGN_SYSTEM §7.6 and PRD NFR-03.

## 10. Known pending items

- Human Marks family (not produced; owner decision).
- Family-name reconciliation (owner decision).
- Final frosting presets, decoration counts and the pairing-rule thresholds (PENDING per CAKE §15; REV 4 values are provisional).
- B04: retire or justify (owner).
- Real stroke-width tokens and motion timings (PENDING per ICON_SVG §12).
- Visual approval of 41 assets (none currently APPROVED; see audit).
- Real-device and browser QA of composed scenes (NOT RUN). Real Next.js/Zustand integration (NOT RUN). Only a Chromium automation run of test pages exists.
- GLB Vault model (separate production pipeline).
