# Vault final integration candidate

**Candidate:** V2 accepted geometry derivative + isolated surface/performance finish. **State:** `VAULT_V2_INTEGRATION_CANDIDATE`; ready for integration evaluation, not visual-final-approved and not a performance PASS.

The authoritative runtime asset is `runtime/vault-final.glb`. Editable geometry source is `source/vault-v2-geometry-derivative.blend`. The runtime GLB is a byte-identical copy of the V2 derivative from `deliverables/VAULT_V2_SURFACE_PERFORMANCE_FINAL_REVIEW`; no re-export was performed. The derivative remains a distinct version from immutable V1.

For a Next.js deployment, stage this directory's `runtime/` contents under `public/assets/vault/` (or an explicitly versioned public path), then load `/assets/vault/vault-final.glb`. Do not point browser URLs at repository filesystem paths and do not place the editable `.blend` under `public/`. This is a documented future copy strategy, not an edit to application code.

The GLB contains its geometry, hierarchy, five PBR material slots, and embedded GLB payload. The final micro-roughness PNG is an external dependency loaded by `runtime/surface_finish.mjs`, which resolves it relative to its own served module URL by default. `runtime/hinge.mjs` is a Three.js helper for the measured world-space +Y physical hinge axis; it does not own semantic state. `runtime/material-overrides.json` records isolated-review scalar values and rendering assumptions; these are proposed runtime overrides, not edits to GLB material identities.

Dependencies for these helpers: host-provided Three.js 0.186.0 (including `GLTFLoader` where used by the application). Do not install or change root application dependencies as part of asset consolidation. Runtime URL loading and production app lockfile compatibility remain pending Scene 10 integration evaluation.

Read `docs/ASSET_SPEC.md`, `docs/MATERIAL_SPEC.md`, and `docs/INTEGRATION_NOTES.md`. Check each file against `manifest.json`. Frozen V1 originals remain at `exports/frozen/vault_v1/`; their canonical SHA-256 hashes are recorded in that manifest and the root freeze manifest.
