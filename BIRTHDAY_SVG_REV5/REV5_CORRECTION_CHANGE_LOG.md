# REV 5-correction-1 — Change Log

Scope: A02 (`signature/offset-loop-open.svg`) only, plus synced metadata. Nothing else touched.

## 1. What was wrong

- **REV 4 baseline** (`a02_REV4_before_*.png` in this evidence folder): two near-full concentric
  circles. Also both paths were stroked `#E67A6B` — REV 4 wasn't even using the second locked
  color on this asset.
- **REV 5 (previous pass)**: fixed the single-color bug and reduced point count, but the overall
  construction was still two nearly-closed loops at different radii — i.e. still read as a
  generic two-color loading ring, which is the defect you flagged.

## 2. What changed in this pass

Three constructions were actually built and rendered with `cairosvg` (installed this session)
before one was chosen — rejects are recorded, not hidden:

1. Off-center elliptical lane (different center/rotation for the periwinkle run) → rendered as
   two nested loops. **Rejected.**
2. Same ellipse family, uniform inward radial scale for the periwinkle lane → still rendered as
   a ring-in-ring at 48/128/256px. **Rejected.**
3. **Shipped:** one lopsided organic contour — not an ellipse — built from an asymmetric outward
   bump centered at 70° and an opposing inward pinch centered at 250°, so the silhouette itself
   is uneven rather than round. Coral (`a02-outer`) traces ~232° of this contour. An explicit 20°
   gap follows. Periwinkle (`a02-inner`) picks up after the gap and runs only ~92° — a short
   accent, not a second near-full loop — ending in open space well short of closing the shape.

Preserved: viewBox `0 0 256 256`, IDs (`a02-root`, `a02-outer`, `a02-inner`), `pathLength="100"`
on both paths, locked colors only (`#E67A6B`, `#8794CC`), no gradients/shadows/dots/ornament.

**Animation order changed**, documented in `ASSET_USAGE_GUIDE.md`: REV 4/5 drew `a02-inner` then
`a02-outer`; this geometry reads correctly only as `a02-outer` (the coral run) then `a02-inner`
(the periwinkle accent), since the roles are no longer two symmetric full runs.

## 3. Changed-file list and hashes

| File | Status | REV 5 SHA-256 (16) | REV 5-correction-1 SHA-256 (16) |
|---|---|---|---|
| signature/offset-loop-open.svg | **changed** | REV4: `aa48...` → REV5: `3e3f7dd04d8e3622` | REV5-correction-1: `9817f8a81ba819cb97ba6a4cfa55aa18d9e45bd1410639fcf5f46b29e4bbd84b` (full SHA-256) |

All other 40 files: byte-for-byte identical to the REV 5 package delivered last turn (verified
by recomputing SHA-256 over the full 41-file set and diffing — only the one path above differs).
Docs updated: `ASSET_MANIFEST.json` (revision bump + A02 entry + full sha256 field + revision
history entry), `ASSET_AUDIT.md` (§J appended, A02 verdict row updated), `ASSET_USAGE_GUIDE.md`
(A02 description + animation order corrected).

## 4. Evidence actually produced

`cairosvg` was installed and used in this session — these are real renders, not placeholders:
- `a02_REV4_before_{48,128,256}.png` — the original REV4 file, for a true before comparison.
- `a02_after_{48,128,256}.png` — the shipped REV5-correction-1 geometry.
- `offset-loop-open.svg` — the actual source, included in the package.

## 5. Honest validation status

| Check | Status |
|---|---|
| XML well-formed (all 41 files) | **PASS** |
| Only locked palette tokens in use (all 41 files) | **PASS** |
| viewBox present (all 41) | **PASS** |
| No cross-file duplicate IDs | **PASS** |
| A02 viewBox unchanged (`0 0 256 256`) | **PASS** |
| A02 IDs unchanged (`a02-root`/`a02-outer`/`a02-inner`) | **PASS** |
| A02 colors restricted to `#E67A6B`/`#8794CC` | **PASS** |
| Exactly 1 file changed vs. prior REV5 package | **PASS** (verified by hash diff over all 41) |
| Raster rendering at 48/128/256px | **PASS** — actually rendered this session via cairosvg (static raster check only, not a browser) |
| Visual read as "not a loading ring" | Subjectively judged by this session against its own render; **not an independent/owner review** |
| GSAP stroke-dashoffset draw behavior in a real browser | **NOT RUN** — no browser/JS runtime in this container |
| Any application/runtime integration test | **NOT RUN** — no application source available |

## 6. Exclusions honored

Cake, Letter (`letter-folded.svg`, `letter-crease.svg`), Vault/Secret family, all editorial,
celebration, and motion assets, `A01`/`A03`/`A04`/`A05`, and all LOCKED project documents were
not modified. Verified by the full-library hash diff in §3.

Not FINAL, not LOCKED. This is a candidate for the next independent/owner review pass.
