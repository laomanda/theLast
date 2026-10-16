# Vault asset specification

## Selected geometry

The sole integration candidate is V2 static-frame-return geometry derivative, source package `deliverables/VAULT_V2_SURFACE_PERFORMANCE_FINAL_REVIEW`. Runtime asset `../runtime/vault-final.glb` is a byte-preserving copy of `source/VAULT_V2_STATIC_FRAME_RETURN_CANDIDATE.glb` (SHA-256 `9bc128a9c020aa2604f5e9b6aa7a72534adae300506c37255196a47227dc2a2b`). Editable source `../source/vault-v2-geometry-derivative.blend` is copied byte-for-byte from the matching derivative Blender source (SHA-256 `5ea426b71c07583de6a768363d1a13fa74e82b6425c1e927e72ce54014cab282`). No geometry was changed or re-exported during consolidation.

## Preserved runtime contract

Required nodes include `Vault_Root`, `Vault_Body`, `Door_Hinge_Pivot`, `Door_Panel`, `Hinge_Leaf_Door`, stationary `Hinge_Leaf_Body_Top`, `Hinge_Leaf_Body_Bottom`, `Hinge_Pin_Top`, `Hinge_Pin_Bottom`, `Lock_Assembly`, `Lock_Core_Pivot`, `Lock_Handle_Pivot`, `Letter_Compartment`, and `Folded_Letter`. Body leaves/pins stay under the stationary body; door leaf, panel, and lock assembly move under `Door_Hinge_Pivot`; letter stays stationary in the compartment. Exact parent map and geometric identity are preserved from derivative validation evidence.

Blender authoring is Z-up; the GLB/Three.js runtime is Y-up. The physical hinge is runtime world +Y, positive 0°→+92° opens toward runtime +Z/front. Use the world-axis quaternion adapter in `../runtime/hinge.mjs`; never assume local Euler `rotation.z` is the hinge. Adapter motion is visual-only; React/Zustand own `doorOpening → doorOpen → letterAvailable → letterSelected` and guards.

## Bounds and clearance limitations

Frozen V1 bounds were measured as 1.218 × 0.707 × 1.250 m (W × D × H). The integration derivative's accepted Blender/GLB validation and candidate reports preserve geometry identity relative to its source. Do not transfer V1 bounds as exact derivative bounds without remeasurement. The reviewed mechanical sweep includes sampled BVH/collision and hinge proximity evidence, but the reported 0.7113 mm minimum is sampled/scoped, not a certified continuous clearance or manufacturing tolerance. Re-run application-side collision and visual checks if any transforms, scaling, pivots, or host-parent transforms differ.

## Preservation

Do not rescale, reparent, rename, re-export, or replace the candidate geometry without a separately authorized derivative and full regression. Frozen V1 `.blend` and `.glb` remain immutable at `exports/frozen/vault_v1/` with hashes in `manifest.json`.
