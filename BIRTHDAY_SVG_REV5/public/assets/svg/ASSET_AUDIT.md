# ASSET_AUDIT.md — Birthday Experience SVG kit (REV 4)

Status: **REV 5-correction-1, submitted for independent review. Technical validation run; design approval NOT granted for any asset. This document does not approve or lock anything.**

## J. REV 5 / REV 5-correction-1

- REV 5 (first pass): changed A02 (offset-loop-open.svg, full geometry rebuild from two
  concentric circles to a single continuous bezier gesture) and E03 (letter-folded.svg,
  progressively-inset panels replacing three identical stacked rectangles). 39/41 files
  preserved byte-for-byte. Technical checks only (XML, namespace, viewBox, duplicate-IDs,
  palette-vs-locked-tokens): 41/41 PASS. No rendering tool was available in that session, so
  neither change was visually verified before delivery.
- REV 5-correction-1 (this pass): owner feedback was that REV 5's A02 still read as a generic
  two-color loading ring. Reworked again — this session did have `cairosvg` available, so three
  constructions were actually rendered at 48/128/256px before one was chosen:
  1. Parametric-ellipse + off-center inward lane — rendered as two nested/concentric loops. Rejected.
  2. Same-ellipse-family inward lane (uniform radial scale) — still rendered as a ring-in-ring
     at the same three sizes. Rejected.
  3. Single lopsided organic contour (asymmetric outward bump + opposing inward pinch, not an
     ellipse), coral run ~232°, explicit 20° gap, short periwinkle accent (~92°) ending in open
     space rather than re-tracing the remaining perimeter. Rendered and visually confirmed to
     read as one interrupted gesture, not a spinner, at all three sizes. **Shipped as A02.**
  Only A02 changed in this pass; E03, the Cake family, the Vault family, and all other REV 5
  files remain byte-for-byte as delivered in REV 5. "Visually confirmed" above means this
  session's own cairosvg render was inspected — it is not an independent or owner review.

## K. REV 5-correction-1 metadata/packaging fix (no SVG bytes touched)

An independent audit found the manifest's provenance fields had not kept pace with the two prior
content passes. Corrected, with **zero changes to any of the 41 SVG files' geometry, color, or
bytes**:

- `revision` (top-level) was stuck at `rev4` while `libraryRevision` already said
  `REV5-correction-1`. Now both agree.
- A02 and E03's `assetRevision`/`lastChangedIn` said `rev4`; they now correctly say
  `REV5-correction-1` (A02, last actually changed in that pass) and `REV5` (E03, last actually
  changed one pass earlier and not touched since).
- A02 and E03's `sourceSha256` was the stale REV4 hash, which no longer matches the delivered
  file now that each has been through further revisions. Resolved by introducing one
  authoritative `sha256` field on **all 41 assets** (recomputed from the files actually in this
  package) and demoting `sourceSha256` to explicit historical lineage: renamed
  `previousSha256_rev4` on both assets, with A02 additionally carrying
  `previousSha256_rev5` (the intermediate, pre-correction hash, independently reconstructed and
  verified against the 16-char prefix recorded last turn — see QA results). `previousSha256_rev3`
  on both is untouched. For all 39 other assets, the pre-existing `sourceSha256` was checked
  against the actual delivered bytes and matched in every case (0 silent mismatches) before the
  new `sha256` field was added alongside it.
- Only A02 had carried a current `sha256` field before this pass. The policy is now explicit
  (`checksumPolicy` in the manifest) and applied uniformly to all 41 assets.
- `root`, every asset's `relativePath`, and `_registry.json`'s paths said `assets/svg/...`; the
  actual package root is `public/assets/svg/...`. Both `ASSET_MANIFEST.json` and
  `_registry.json` now carry the correct filesystem `relativePath`
  (`public/assets/svg/<family>/<file>`) plus a new `publicUrl` field
  (`/assets/svg/<family>/<file>`, the Next.js-served path once the `public/` prefix is stripped
  by static serving) — see `pathPolicy` in the manifest.
- A02's `animationTargets` said `a02-inner then a02-outer`, contradicting the usage guide's
  already-corrected order. Manifest and `_registry.json` now both say `a02-outer then
  a02-inner`, matching `ASSET_USAGE_GUIDE.md`.

This pass changed metadata files only: `ASSET_MANIFEST.json`, `_registry.json`, this document,
and `ASSET_USAGE_GUIDE.md`. Verified by hash: all 41 SVG files are byte-identical to the
REV5-correction-1 package delivered last turn.

History sections A-I below are the REV 3 text, retained for traceability, except that the Section C rows of the 11 assets changed in REV 4 were replaced (self-scores for unchanged assets are the authoring model's own REV 3 scores, not independent scores). Section J is new in REV 4.

## A. Completeness audit

- Expected file count: **41**
- Actual generated file count: **41**
- Missing files: **none** (all 41 manifest filenames exist at `public/assets/svg/<family>/`)
- Extra files: **none** in the asset folders (`_registry.json` and the four deliverable documents are the only non-SVG files at root)
- Duplicate geometry suspects: **none flagged by path comparison**; A01/A02 share one construction with different parameters (gap, offset, phase) and were checked to differ visually. A04 and A01 echo are different radii and widths.
- Blocking source conflicts: none that block production. See section F (documented reconciliations).

## B. Syntax and structural audit

Commands executed in this environment (real runs, exit status recorded in the session):

- `python3 xml.etree.ElementTree` parse of every file — **41/41 PASS**
- `validate_svgs.py` (structural scan, palette, IDs, geometry, rasterisation via librsvg / node-sharp at 48 px and 240 px at true viewBox aspect) — **41/41 PASS, 0 warnings, 0 fails, 0 cross-file ID collisions**

| ID | File | XML | viewBox | Namespace | Non-empty | Palette ⊆ locked | Colours ≤2 | Forbidden scan | Raster 48/240 | Transparent corners | Edge clipping | IDs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A01 | offset-loop-primary.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| A02 | offset-loop-open.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| A03 | offset-loop-fragment.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| A04 | offset-loop-echo.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| A05 | offset-loop-segmented.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| B01 | editorial-frame-open.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| B02 | editorial-frame-portrait.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| B03 | editorial-cut-soft.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| B04 | soft-mass-asymmetric.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| B05 | flowing-form-01.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| B06 | flowing-form-02.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| B07 | rhythm-divider.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| C01 | celebration-arc.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| C02 | celebration-burst.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| C03 | celebration-dashes.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| C04 | celebration-spark.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D01 | cake-body-base.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D02 | cake-frosting-silhouette.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D03 | cake-frosting-edge.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D04 | candle-body.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D05 | candle-flame.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D06 | candle-wick.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D07 | flower-bloom.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D08 | flower-leaf.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D09 | cake-topper.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D10 | cake-accent-pearl.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D11 | cake-accent-ribbon.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| D12 | candle-smoke.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| E01 | invitation-paper-fold.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| E02 | letter-sheet-edge.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| E03 | letter-folded.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| E04 | letter-crease.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| E05 | paper-corner-detail.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| F01 | secret-alignment-mark.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| F02 | secret-partial-ring.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| F03 | vault-segmented-ring.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| F04 | vault-alignment-ticks.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| F05 | vault-keypad-accent.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| G01 | gesture-direction-cue.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| G02 | transition-mask-loop.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| G03 | interaction-anchor.svg | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

Not run: browser (Chromium) rendering of each individual file. Chromium is present in this environment; the preview page was intended to be rendered through it. See section E.

## C. Visual audit

Weighting: art direction consistency 25 %, geometry and silhouette 25 %, appropriate function 20 %, technical SVG quality 20 %, restraint and integration 10 %. Scores were assigned after viewing the rendered 240 px and 48 px contact sheets and the per-family sheets. APPROVED requires a weighted score of at least 90 and no critical violation.

| ID | Art dir. (25) | Geometry (25) | Function (20) | Tech (20) | Restraint (10) | Weighted | Verdict | Inspection note |
|---|---|---|---|---|---|---|---|---|
| A01 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Stroke-only, butt caps, pathLength=100, ids a01-outer then a01-inner. Radius carries a 4 percent organic modulation shared by both lanes. Stroke widths 12 and 9 for 48 px legibility. Self-score withheld in REV 4. |
| A02 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 5-correction-1. Rebuilt as a single lopsided organic contour (asymmetric bump+pinch) with a 232° coral run, explicit 20° gap, and a 92° periwinkle accent ending in open space. Rendered and checked by the authoring session at 48/128/256px; no longer the REV 4 nested-arcs construction. Self-score withheld; owner art review required. |
| A03 | 88 | 89 | 88 | 90 | 88 | 88.6 | NOT APPROVED - revise | Unchanged. Clean fragment with open ends. |
| A04 | 86 | 85 | 84 | 90 | 88 | 86.3 | NOT APPROVED - revise | Revision 2: hairline taper on a smaller radius. Intentionally faint on Ivory (2.24:1); intended for Plum/mid-tone. |
| A05 | 88 | 90 | 88 | 88 | 88 | 88.5 | NOT APPROVED - revise | Revision 2: Dusty Lavender segments (5.38:1 on Plum) with a champagne segment beside the cut. Shares the primary's interruption angle. |
| B01 | 88 | 88 | 88 | 90 | 90 | 88.6 | NOT APPROVED - revise | Unchanged. |
| B02 | 90 | 90 | 90 | 88 | 90 | 89.6 | NOT APPROVED - revise | Unchanged. Frame keeps window clear. |
| B03 | 88 | 88 | 86 | 90 | 90 | 88.2 | NOT APPROVED - revise | Unchanged. |
| B04 | 84 | 84 | 82 | 86 | 86 | 84.2 | NOT APPROVED - revise | REV 3: asymmetric waisted mass (broad lower-left lobe, smaller upper-right lobe). Still reads somewhat like a bean; owner review needed. |
| B05 | 88 | 88 | 86 | 88 | 88 | 87.6 | NOT APPROVED - revise | Unchanged. |
| B06 | 86 | 86 | 84 | 88 | 88 | 86.2 | NOT APPROVED - revise | Unchanged. Low contrast on Ivory by design (2.24:1). |
| B07 | 88 | 88 | 88 | 90 | 92 | 88.8 | NOT APPROVED - revise | Unchanged. |
| C01 | 86 | 86 | 84 | 88 | 90 | 86.4 | NOT APPROVED - revise | Unchanged. |
| C02 | 88 | 88 | 88 | 90 | 90 | 88.6 | NOT APPROVED - revise | Unchanged. |
| C03 | 86 | 84 | 84 | 88 | 90 | 85.9 | NOT APPROVED - revise | Unchanged. |
| C04 | 84 | 84 | 82 | 86 | 88 | 84.4 | NOT APPROVED - revise | Unchanged. |
| D01 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Cylinder sidewall with a slight convex wall, plate with visible edge thickness, base contact crescent, right-hand shade and base occlusion (Mist + Deep Ink only). Ids: d01-body, d01-shade, d01-base-occlusion, d01-plate, d01-cast, d01-contact. Self-score withheld in REV 4. |
| D02 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Full top-plane ellipse (rx128, ry34, centre 200,136). Skirt hangs from the FRONT RIM arc with seven unequal soft lobes (REV 3 hung periodic lobes from a straight line). Ivory lip highlights (broken) and a soft sheen at 24-40 percent. Frosting colour is the preset. Self-score withheld in REV 4. |
| D03 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Replaces the REV 3 piped apricot rope (which read as a garland). Colour-neutral so it stays correct for every frosting preset. Built from the same boundary function as D02 (geom.py). Self-score withheld in REV 4. |
| D04 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Curved (elliptical) base so the candle sits on the top plane; highlight stripe and wax cap kept. Body colour is a preset (default Periwinkle). Intended composed scale 0.54-0.60 (REV 3 composed at 1.0, far too large). Self-score withheld in REV 4. |
| D05 | 88 | 88 | 88 | 88 | 90 | 88.2 | NOT APPROVED - revise | Unchanged. |
| D06 | 88 | 88 | 88 | 90 | 90 | 88.6 | NOT APPROVED - revise | Unchanged. |
| D07 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Five irregular rounded outer petals plus five smaller inner petals and a centre. Two colours (outer, inner) are presets. Composed at scale 0.5-0.64 with 0.70 vertical foreshortening so it lies on the top plane. Self-score withheld in REV 4. |
| D08 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Asymmetric curved leaf with a curved rib. Composed at about 0.45-0.5, foreshortened, tucked behind the flower so it reads as attached. Self-score withheld in REV 4. |
| D09 | 84 | 84 | 82 | 86 | 88 | 84.4 | NOT APPROVED - revise | Unchanged. |
| D10 | 86 | 86 | 86 | 88 | 90 | 86.8 | NOT APPROVED - revise | Unchanged geometry; placed on the frosting edge in composition. Low contrast against the coral frosting. |
| D11 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. REV 3 was a free curved stripe at (100,196) 200x80. Now full cake space: place at 0,0. Band lavender (preset), ink shade 14 percent. Self-score withheld in REV 4. |
| D12 | 86 | 86 | 86 | 88 | 90 | 86.8 | NOT APPROVED - revise | Unchanged. |
| E01 | 86 | 86 | 86 | 88 | 90 | 86.8 | NOT APPROVED - revise | Unchanged. |
| E02 | 87 | 86 | 86 | 88 | 90 | 87.1 | NOT APPROVED - revise | Revision 2: tonal back-sheet adds separation without a shadow filter. |
| E03 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Replaces the REV 3 flat tri-panel diagram. Opening order: top flap, then bottom flap; crease overlays (E04) fade in at y=10 and y=114. Opened reading surface remains E02 or the unfolded panels; text stays in the DOM. Self-score withheld in REV 4. |
| E04 | — | — | — | — | — | — | NOT APPROVED - owner review pending | REV 4. Straight crease (REV 3 was a curved lens). Editorial Mist only. Self-score withheld in REV 4. |
| E05 | 86 | 86 | 86 | 88 | 90 | 86.8 | NOT APPROVED - revise | Unchanged. |
| F01 | 88 | 88 | 88 | 90 | 92 | 88.8 | NOT APPROVED - revise | Unchanged. |
| F02 | 88 | 88 | 88 | 88 | 90 | 88.2 | NOT APPROVED - revise | Revision 2: Dusty Lavender on Plum (5.38:1) instead of Warm Graphite (1.05:1). |
| F03 | 89 | 89 | 88 | 88 | 90 | 88.7 | NOT APPROVED - revise | Revision 2: nine Lavender segments with a champagne highlight, legible on Plum. 2D reference only, never the GLB lock. |
| F04 | 88 | 88 | 88 | 90 | 92 | 88.8 | NOT APPROVED - revise | Revision 2: Lavender ticks at 75 percent opacity with a champagne centre tick, legible on Plum. |
| F05 | 85 | 85 | 84 | 86 | 88 | 85.3 | NOT APPROVED - revise | Revision 2: redesigned as three partial rings with offset gaps (calibration). No numerals, grid or dots. |
| G01 | 88 | 88 | 88 | 90 | 90 | 88.6 | NOT APPROVED - revise | Unchanged. |
| G02 | 88 | 90 | 90 | 88 | 88 | 88.9 | NOT APPROVED - revise | Unchanged. |
| G03 | 86 | 86 | 86 | 88 | 90 | 86.8 | NOT APPROVED - revise | Unchanged. |

**Summary:** APPROVED = 0; NOT APPROVED (revise) = 41. No asset reaches the 90 threshold on the current inspection. The kit is technically valid but visually competent rather than distinctive. This is the honest verdict; scores were not inflated to meet the bar.

Critical violations found: **none**. No raster images, no gradients, no filters, no text, no scripts, no unlisted colours.

## D. Family consistency audit

- **Shared language:** all families use round caps or deliberate butt caps, one or two locked colours, and open or interrupted contours. The signature loop construction is reused across A, F and G.
- **Birthday vs Hidden:** Birthday families use Coral, Apricot, Lavender and Periwinkle. Hidden families (A05, F-series, G02) use Warm Graphite with rare Champagne. The Hidden family is related but more mechanical, as the scene allocation requires.
- **Editorial vs photo and type:** editorial forms are light strokes or unfilled corners; none is a large filled panel that competes with type or a face. B04 and B03 are the largest filled shapes and are intended for backing use only.
- **Cake composition:** D01 to D11 share one 400×300 coordinate space and were assembled in the preview (section 7 of the preview). Components sit at documented anchors and do not overlap in the default composition.
- **New aesthetic:** none introduced. No neon, chrome, glassmorphism, stock confetti, hearts, or wedding ornament.

## E. Evidence

| Check | Command / method | Exit / outcome |
|---|---|---|
| XML parse 41 files | python3 ElementTree | PASS 41/41 |
| Structural and palette validation | `validate_svgs.py` | PASS 41/41, 0 warn |
| Rasterisation 48 px and 240 px | node-sharp (librsvg) | PASS 41/41 |
| Preview rendering | Chromium headless | see preview section below |
| GSAP / Motion runtime | not applicable (static SVG) | NOT RUN |
| Screen-reader behaviour | not applicable to decorative SVG; verified via aria-hidden attribute only | PASS (attribute present) |
| Reduced-motion behaviour | not applicable to static SVG | NOT RUN |
| Contrast of assets on real composed surfaces | not run (no composed scenes exist) | NOT RUN |

Known limitations: no true-device testing; no measured file-size or render-time budget (none exist in the sources, so none was invented); the cake is a shape-level assembly test, not an interactive renderer test.

## F. Source reconciliation (documented, not silently resolved)

1. **Family count.** The production brief lists seven families (signature, editorial, celebration, cake, paper, secret, motion). LOCKED ICON_SVG §4 and SHAPE_PATTERN §3 define five decorative families (Flowing Forms, Editorial Frames, Celebration Fragments, Human Marks, Secret Marks) and five structural families. Mapping used: B to Editorial Frames / Flowing Forms / Soft Masses; C to Celebration Fragments; F to Secret Marks; A to Offset Loop; D to CAKE_ART_DIRECTION §6 (component decoration); E to Material M4 Keepsake Paper; G to MOTION §6 and §11 (interaction support). No asset was dropped. **Owner decision requested:** accept this mapping or rename families.
2. **Human Marks not produced.** LOCKED ICON_SVG §4 lists Human Marks as a decorative family; the brief's 41-file list does not include it. Not created. **Owner decision requested:** whether to add a Human Marks set (for example one underline and one imperfect circle) using Shantell-like restraint.
3. **Gradients.** The brief forbids gradients. CAKE and MATERIAL fragments allow soft shading. Resolution: solid fills and same-colour opacity only, which both sources accept.
4. **Numeric candles.** CAKE §6 forbids numerals without reliable age data. None produced.
5. **Provenance of D11 (Scene-by-Scene).** Recovered from a prior conversation, not the ZIP. Hash in MANIFEST.json matches the file present. Recorded, not reinterpreted.
6. **Missing budgets.** No source specifies SVG file size, stroke tokens, or render budgets. Not invented. Stroke widths in this kit are provisional (documented per asset).

## G. Revision priorities (to reach APPROVED)

- Cake: give D01 a sculpted edge and D02 deeper drips; add a stronger top-face highlight in the palette.
- Signature: give A02 and A04 more expressive proportions; keep A01 as the anchor.
- Paper: strengthen E03 and E04 with a subtle deepening of the fold, still without gradients.
- Editorial: give B04 a more designed silhouette (not generic blob).
- Secret: give F05 a more clearly non-keypad character, or retire it.

## H. Revision 3 — response to the REV 2 independent audit

Scope: targeted revision of the REV 2 kit. Files changed in REV 3: **8** (A01, A02, B04, D01, D02, D03, E03, E04). The other **33** files are byte-identical to REV 2, including the Vault (F-family), the candles, flames, wicks, flowers, pearls, ribbon, smoke, and the editorial and celebration families. Inventory is the same 41 filenames.

| REV 2 finding | REV 3 status | Evidence / honest note |
|---|---|---|
| R2-01 Signature motif and animation contract | PARTLY FIXED | A01 and A02 are now stroke-only. The visible contour is a stroke, so GSAP stroke-dash drawing works without a clip-path workaround. Both paths use pathLength=100. The interruption is a designed stagger: the outer run ends in a crisp butt cut, and the inner run starts a few degrees further round on a smaller radius. A02's interruption sits on the opposite side. A04 is unchanged and remains faint on Ivory (2.24:1); it is pending. The signature is still awaiting owner art review. |
| R2-02 Cake art direction | PARTLY FIXED | Drips are now cubic U-lobes with vertical tangents (no cusp spikes). The body has a barrel sidewall with a matched crescent shade. The piped beads became one continuous rope on the same outline, so the edge is a sculpted border. Scene 05 and Scene 06 are both assembled from the same components (see below). It is still stylised: no tactile texture, and the two-colour rule limits shading. Not approved. |
| R2-03 Paper physical cues | PARTLY FIXED | letter-folded (E03) is now a closed tri-fold with solid folds, a stacked edge and a lifted corner, with no dashed diagram. Two composable states are defined: **folded and closed = E03**, **unfolded and visible = E02** (the sheet silhouette, unchanged in REV 3). letter-crease (E04) is a tapered valley-fold band. No text is embedded in any asset. |
| R2-04 Supporting geometry | PARTLY FIXED | B04 is now a waisted two-lobe form, not a rounded rectangle, but still reads somewhat like a bean. F05 is unchanged in REV 3 (it was redesigned in REV 2) and is not re-reviewed here. |
| R2-05 Approval and runtime QA | PARTLY FIXED | Browser tests were executed in this revision (see Validation). GSAP 3.15.0 was installed and run. No asset is approved. |

### Scene 05 / Scene 06 compatibility (new in REV 3)

Configuration A (Scene 05 Cake Studio default) and configuration B (Scene 06, candles out) use the same components at the same anchors. Configuration B changes only three things: the frosting preset (Confident Periwinkle, a locked palette colour), the flame groups (removed rather than hidden), and smoke (D12) over each candle. Nothing is redrawn. Both configurations are in the preview (sections 2 and 3). The browser check confirms zero duplicate DOM ids across both on the same page.

### Known limitation found in the Scene 06 review

In configuration B (periwinkle frosting), the periwinkle candle bodies lose contrast where they meet the frosting, and the lavender flower nearly disappears on it. Both colours are locked and both pairings are valid palette combinations, so no colour was changed. Constraint for the Scene 06 decor: do not combine a periwinkle frosting preset with the periwinkle candle body or the lavender flower without a contrast check. The alternative is a different frosting preset (coral keeps all three distinct). Not fixed in REV 3; recorded for owner decision.

### Important correction to the REV 2 usage guide

REV 2 documented `d05-root` as the flame GSAP target. In the assembled cake that id was not present: the standalone file carries it on the svg root, which the composer removed when inlining. REV 3 wraps each inlined instance in a group with its own prefixed id (for example `scene05-flame0-root`). That group is the animation handle in the assembled cake.

### Validation performed in REV 3

| Check | Method | Result |
|---|---|---|
| XML parse, root namespace, viewBox, forbidden content, locked palette, at most two colours, transparent corners, edge clipping, nonblank render (41 files) | validate_svgs.py with librsvg rasterisation at 48 and 240 px | PASS 41/41, 0 warnings |
| Render at 48, 128 and 256 px (A01, A02, before and after) | librsvg via node-sharp | executed; evidence in revision bundle (r3_sizes.png). Legible at 128 and 256; the 48 px inner run is small |
| Duplicate DOM ids in the assembled page, two cake configurations, 360 and 1280 px | Chromium 131 headless, puppeteer-core | PASS: 0 duplicates in 133 ids, 0 broken images, 0 console errors, no horizontal overflow |
| GSAP 3.15.0 compatibility: stroke-dash draw on A01 (outer then inner) and A02, flame group transform, smoke wisp draw | Real GSAP library in Chromium, timelines run to mid state and final state | PASS: all timelines ran, mid-state partial, final-state stroke offsets 0px, no page or console errors (evidence gsap_mid_final.png) |
| Cross-family visual consistency | Visual review of contact sheets (all 41 files) | executed; judged on individual scores, see section C |
| Real-device touch, reduced motion, screen reader, scene integration | Not run in this environment | NOT RUN |

No asset is approved in REV 3. Scores for changed assets are re-inspected and remain below the 90 threshold. Ready for independent re-audit, not final approval.

## I. Deliverables

- `public/assets/svg/` (41 SVGs, `_registry.json`)
- `ASSET_MANIFEST.json`, `ASSET_AUDIT.md`, `ASSET_USAGE_GUIDE.md`, `ASSET_PREVIEW.html`

## J. Revision 4 — response to SVG_REV3_INDEPENDENT_AUDIT.md

Scope: surgical correction. **11 of 41 SVGs changed** (A01, A02, D01, D02, D03, D04, D07, D08, D11, E03, E04); **30 are byte-identical to REV 3**, including every Vault (F) asset, all flames, wicks, smoke, pearls, topper, editorial and celebration assets, B04, E01, E02, E05. Inventory, filenames, folder structure and palette are unchanged. Nothing was added to the 41. Hashes: `REV4_EVIDENCE/results/changed_files_sha256.txt`.

### J.1 Findings and dispositions

| Finding | REV 4 action | Evidence | Status |
|---|---|---|---|
| **C-01 BLOCKER** S05→S06 cake re-skinned in preview | Two independent configurations (A Coral, B Periwinkle). Each S06 uses the identical `CakeConfiguration` as its S05; only `sceneState.candles` differs. Flames removed, smoke added. | `continuity_report.json`: config diff = 1 path per pair; DOM identical after removing flame/smoke groups (A True, B True); pixels changed outside candle-tip zones A 0, B 0; negative controls (frosting swap, moved flower) correctly FAIL | **Addressed for the static preview only.** Application-level Zustand/React persistence: **NOT RUN** |
| **V-01 HIGH** cake not sculpted | Rebuilt D01/D02/D03 as one coordinated system: true top-plane ellipse, skirt hung from the front-rim arc with seven unequal soft lobes, broken satin lip highlights, ink-only cast/under-lip shading, base occlusion and contact crescent. D04 curved base and composed at 0.54-0.60 (REV 3: 1.0). D07 five irregular outer petals + five inner; D08 asymmetric curved leaf; D11 band wraps the sidewall. Decorations foreshortened 0.70 onto the top plane, with contact shadows. | `before_after_cake.png`, `before_after_changed_svgs.png`, mobile/desktop previews | **Improved, not approved.** Still flat-colour stylised (the two-colour rule forbids richer shading); no tactile texture; flower, leaf and ribbon knot remain simple. Owner review required |
| **V-02 HIGH** Periwinkle-on-Periwinkle | Pairing matrix computed from the locked palette (luminance contrast and CIE76 dE). Rule: WEAK pairs (dE<25) blocked or auto-substituted; HUE-ONLY pairs (luminance <1.30) allowed only with a luminance cue on the part. Config B uses Coral candles, Ivory/Apricot flower, Champagne leaves. | `frosting_decor_matrix.json`; manifest `cakeConfigurationPresets` | **Partly resolved.** Only Coral and Periwinkle frostings are exercised (the only presets in the kit). Thresholds are provisional, not source-locked. The rule exists as documentation and a QA matrix, **not implemented in any app**. Both configurations still contain HUE-ONLY pairings (A: Periwinkle candles/leaves and Lavender flower on Coral; B: Coral candles on Periwinkle): distinguishable by hue, near-identical luminance (about 1.03-1.17:1). Colour-vision accessibility not tested |
| **V-03 HIGH** signature | A01: coral run then a periwinkle run that continues one lane inward across the break and laps the loop start; the lane step is the interruption. A02: inner run, air gap, outward-stepped second run, single colour. Radius has 4% organic modulation; widths raised for 48 px. Stroke geometry, `pathLength=100`, ids and draw order kept. | `before_after_signature.png`; Chromium frames `sig_a0x_draw_strip.png`; 48 px DPR 1/2 renders | **Improved, not approved.** A01 is the stronger. **A02 still reads partly as nested arcs.** No S02 framing mockup was produced (not in the REV 4 brief); owner approval of the master is still needed. Spinner / letter-C / logo resemblance is a judgement I cannot settle |
| **V-04 HIGH** folded letter | E03 rebuilt as a closed tri-fold stack: static base `e03-p2`, bottom panel `e03-p3` folded up (hinge bottom edge), 6-unit-shorter top flap `e03-p1` folded down (hinge top edge) giving a stepped lower edge, thickness stack. Separate transformable groups with documented `svgOrigin`. E04 is now a straight crease overlay for the opened sheet. No text, no raster. | Chromium+GSAP frames `letter_open_*.png`; numeric panel geometry checks | **Improved, not approved.** The opening is a 2D scaleY emulation of a fold, not perspective 3D. Ivory-on-ivory contrast is low by palette. Relationship to E02 as the reading surface needs an art decision. Scene S07/S11 integration: **NOT RUN** |
| **V-05 MEDIUM** B04 | Not changed. Recommendation unchanged: retire unless a composed scene proves a need. | — | **Open (owner)** |
| **T-01 MEDIUM** revision provenance | Manifest schema 2: `assetRevision`, `lastChangedIn`, `sourceSha256` (real bytes), `previousSha256_rev3`, `technicalStatus` vs `artApproval`, `revisionHistory`. | `ASSET_MANIFEST.json` | **Fixed for rev3→rev4 (hash-verified).** rev0/rev2 attribution for unchanged files is taken from earlier audit text and is **not hash-verifiable** here (those bytes are not in the package) |
| **E-01 MEDIUM** evidence not packaged | `REV4_EVIDENCE/` contains the validator, generators, composer, test pages, runner, raw results, screenshots and REV 3 originals of changed files. GSAP is NOT bundled (`npm install gsap@3.13.0`). | `REV4_EVIDENCE/README.md` | **Fixed** |

### J.2 Additional findings from this pass

1. **REV 3 self-validation was more lenient than an independent check.** Run unchanged on the REV 3 tree, `validate_svgs.py` reports **39/41 pass**: `cake/cake-accent-ribbon.svg` fails edge clipping and `paper/letter-folded.svg` fails transparent corners and edge clipping (content touching the viewBox edge). REV 3 reported 41/41. Both files were rebuilt in REV 4 and pass. This is this validator's definition (alpha above 8 on the outermost pixel row at 48 or 240 px), not a source-locked rule.
2. **Composer design note (not a REV 3 defect).** REV 3 placed parts with nested `<svg viewBox>` boxes; the REV 4 composer places them with transforms. To keep the GSAP handles safe it separates a static composer-owned placement group (`*-place`, carries the transform) from a transform-free handle (`*-root`, GSAP-owned), because animating a node that also carries a placement matrix makes GSAP absorb or override that matrix. Handle names (`<prefix>-flame<i>-root`, `<prefix>-smoke<i>-...`) keep the REV 3 convention.
3. **D03 changed meaning** (piped rope, now ink-only edge shading) and **D11 changed viewBox** (200x80 to the 400x300 cake space, placed at 0,0). Both are documented in the usage guide and manifest; an integrator using REV 3 anchors will place them wrongly.
4. **Two assertions were tuned after seeing results, in the open:** the DOM-equality check initially failed on the root `aria-label` text ("lit" vs "extinguished"), a legitimate state label, so the root label is excluded and stated; the smoke dash-offset tolerance was widened from 0.5 to 1.0 because GSAP rounds to whole px (74 vs exact 73.37). Both are recorded in the scripts.

### J.3 Validation performed in REV 4 (what was and was not run)

**Category 1 — XML / render validity**

| Check | Command | Result |
|---|---|---|
| 41 SVGs: XML, namespace, viewBox, a11y attrs, non-empty, forbidden content, locked palette, at most 2 colours, unique ids, CairoSVG 48/240 px non-blank, transparent corners, no edge clipping | `python3 REV4_EVIDENCE/scripts/validate_svgs.py public/assets/svg --json out.json` | **REV 4: 41/41 pass, 0 cross-file id collisions.** REV 3 baseline same script: 39/41 |

**Category 2 — Static SVG composition (no JavaScript, rasterised or parsed)**

| Check | Command | Result |
|---|---|---|
| S05/S06 continuity, configs A and B, with negative controls | `python3 REV4_EVIDENCE/scripts/continuity_check.py REV4_EVIDENCE` | overall True (static demonstration only) |
| Preview page: references, duplicate ids, broken images, overflow, console errors, 360 and 1280 px | `python3 REV4_EVIDENCE/scripts/check_preview.py <package root>` | see `results/preview_checks.json` (pass recorded there) |

**Category 3 — Browser animation (Chromium 141.0.7390.37, GSAP 3.13.0; real playback of shapes in test pages, not the product)**

| Check | Result |
|---|---|
| A01 and A02 stroke draw (dashoffset 100 to 0 in order; zero drawn at 0%, fully drawn at 100%, partial between) | PASS |
| Letter opening (top flap and bottom flap pass edge-on, finish above/below hinges, base panel never moves, creases fade in) | PASS |
| Cake handles (flame rotation about its base with 0 px drift, placement group untouched, smoke dash draw, 0 duplicate ids over 412 ids with four cakes on one page) | PASS |

**Category 4 — Real Next.js / React / Zustand integration: NOT RUN** (no application was provided).

**Other NOT RUN:** touch, keyboard, screen reader, real devices and low-end mobile performance, `prefers-reduced-motion` behaviour of a real scene, contrast on real composed scenes, colour-vision simulation, GSAP/Motion coexistence in the app, performance budgets (none specified).

### J.4 Remaining blockers (not resolved in REV 4)

1. **Art approval is outstanding for all 41 assets.** Nothing is approved or locked.
2. **Application-level S05→S06 persistence** is untested (**NOT RUN**); only a static SVG demonstration exists.
3. **Cake**: still flat-colour and stylised; flower, leaf and ribbon knot are simple; owner must judge whether "tactile buttercream" is reachable under the two-colour rule.
4. **Pairing rule** is documentation only; thresholds provisional; HUE-ONLY pairs remain in both reference configurations; more frosting presets are undefined (CAKE section 15 PENDING).
5. **A02** reads partly as nested arcs; **no S02 framing mockup** exists for A01; signature master unapproved.
6. **Letter**: 2D scaleY fold emulation; ivory-on-ivory contrast; E02/E03 reading-surface decision; S07/S11 integration not run.
7. **B04** retire-or-justify decision open; Human Marks family and family-name reconciliation (Section F) still need owner decisions.
8. **Provenance** of rev0/rev2 for unchanged files is not hash-verifiable from this package.
9. Browser results come from one Chromium build in an automation container; no Safari/WebKit or Firefox runs.
