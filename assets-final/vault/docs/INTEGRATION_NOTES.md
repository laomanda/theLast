# Vault integration notes

## Browser URL and deployment

`assets-final/vault/` is the repository-authoritative package, not a browser-served directory. When an authorized Scene 10 batch begins, copy only `runtime/` under `public/assets/vault/` (or use the agreed static asset deployment) and reference `/assets/vault/vault-final.glb`; for hashed/CDN deployments use the app's asset URL builder. Serve `surface_finish.mjs` as a module beside its `textures/` child so its `import.meta.url`-relative map URL resolves. Do not expose the `.blend` or review evidence publicly. Confirm HTTP 200 and GLB/PNG MIME/byte hashes at the actual deployed URL.

The GLB is self-contained for geometry, transforms, material slots, and its internal glTF payload; it has no separately required external GLB sidecar texture. The surface finish intentionally adds one external file, `textures/micrograin.png`. The helper module and the host's Three.js build are code/dependency inputs, not files imported by the GLB. `GLTFLoader` is part of the Three.js addons distribution.

## Runtime binding

Look up the exact node/material identifiers in `manifest.json`; fail visibly if contracts are missing. Keep the original material IDs and clone per Vault instance before scalar overrides or shader hooks. Use `createFinish(THREE, renderer, { textureUrl })`; dispose the one shared finish texture once per owning finish instance, remove material bindings, and dispose only materials/geometries owned by that instance. Do not dispose loader-cache/shared resources from another scene. Use `createWorldAxisHingeAdapter(THREE, Door_Hinge_Pivot, new THREE.Vector3(0,1,0), 1)` after hierarchy/world matrices are current. Confirm the host parent is uniformly scaled.

Semantic control stays outside this asset package: Zustand validates the current scene/state/transition token before committing guarded completion events; GSAP may animate presentation but cannot commit semantic progression by itself. Preserve `doorOpening → doorOpen → letterAvailable → letterSelected`; availability follows stable open pose automatically and letter selection remains explicit. GLB/hinge helper do not own PIN, selection, confession, or scene transition.

## Renderer and responsive policy

Isolated surface study used Three.js r186, sRGB output, exposure 1, NeutralToneMapping, Gentle light rig and max DPR 1.5. Reconcile Three/R3F versions with the actual application lockfile before integration; app versions were not established in this repository. The 1.5 DPR ceiling is a proposed workload policy, not an approved universal target. Apply responsive sizing in the application canvas and test the locked camera/framing at required mobile/desktop viewports. No post-processing is required by this package.

## Current verification limits

The source review reports geometry/mechanics/material identity and prepared-workspace browser regression passes; see `../manifest.json` and the referenced review package. Its final clean-extraction npm install was blocked by DNS (`ENOTFOUND registry.npmjs.org`), and GPU timer queries were not sampled despite extension availability. There is no owner-approved target-device performance budget, no actual Next/R3F integration smoke test, and no final owner visual approval. Re-run package tests once dependencies/network are available; record physical mobile/browser targets and pre-agreed performance budgets before claiming performance acceptance.
