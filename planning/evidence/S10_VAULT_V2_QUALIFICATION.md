# S10 Vault V2 Qualification

**Checkpoint:** S10 Vault V2 Qualification  
**Date:** 2026-10-18  
**Candidate:** `assets-final/vault/runtime/vault-final.glb`  
**Declared status:** `VAULT_V2_INTEGRATION_CANDIDATE`  
**Result:** `TECHNICALLY QUALIFIED / PERFORMANCE PENDING / OWNER VISUAL APPROVAL PENDING`

## Authority and protected status

The authoritative package manifest remains `finalizationStatus: VAULT_V2_INTEGRATION_CANDIDATE`,
`visualApproval: PENDING_OWNER_REVIEW`, and `performanceStatus: RECORDED_NO_BUDGET_NOT_PASS`.
The owner design lock requires this Vault V2 GLB for S10 and explicitly says that visual-final and
performance-pass status must be tested in a real runtime. This review did not change the candidate
status, geometry, materials, mechanism, authorization registry, or any production S10 source.

## Integrity and structural qualification

| Check | Result | Evidence |
| --- | --- | --- |
| Candidate SHA-256 | PASS | `9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B`, equal to `manifest.json` |
| GLB container | PASS | Magic `0x46546C67`, GLB v2, declared length `741096`, actual length `741096` bytes |
| Required interaction nodes | PASS | All 14 manifest identifiers resolved, including `Door_Hinge_Pivot`, `Door_Panel`, lock pivots, chamber, and `Folded_Letter` |
| Material identifiers | PASS | All five documented materials resolved: `VaultBody_M5`, `VaultDoor_M5`, `LockAccent_Lavender`, `LockAccent_Champagne`, `LetterPaper_M4` |
| Geometry workload record | RECORDED | 37 meshes, 21,330 vertices, 10,728 triangles; not a device performance pass because no approved budget exists |
| Embedded animations | PASS WITH INTEGRATION REQUIREMENT | No GLB animation clips. S10 must drive the actual `Door_Hinge_Pivot` through the supplied adapter; it must not substitute a static door or model swap. |

## Mechanical inspection

The candidate parsed through the installed `three@0.186.0` `GLTFLoader` in an isolated Node inspection.
`createWorldAxisHingeAdapter()` was exercised against the loaded `Door_Hinge_Pivot` with the specified
world axis `[0, 1, 0]` and +92 degree pose. The resulting world hinge axis remained `[0, 1, 0]`.
The `Door_Panel` world position changed from approximately `[0, 0.625, 0.405]` to
`[0.666, 0.625, 0.958]`, demonstrating a real pivoted motion rather than visibility replacement.

The parsed material values are matte-first and consistent with the declared candidate contract:
body roughness `0.72` / metalness `0.10`; door roughness `0.68` / metalness `0.12`; letter
roughness `0.82` / metalness `0`. These are structural observations only. The package's material
document continues to classify final surface approval as pending browser review.

## Isolated Next/R3F smoke attempt

**Status: BLOCKED — no PASS claim.** A disposable local Next 16.4.2 / React 19.3.1 /
`@react-three/fiber` 9.8.2 fixture was created solely for this check, using a byte-identical copy
of the candidate GLB and a 1.5 DPR ceiling. Its server reported Next webpack startup and began
first-page compilation. The local execution runner then repeatedly failed to establish its command
pipe (`CreateProcess ... timed out ... connecting runner pipe-in`) before a browser session, WebGL
capability readout, or screenshot could be completed.

Accordingly, no mobile/desktop closed/open screenshots, browser console result, WebGL fallback result,
or measured frame/performance observation exists for this checkpoint. The failure is treated as an
environment/harness limitation, not as evidence that the candidate renders correctly or incorrectly.
The temporary fixture was removed after its dedicated port was confirmed not to be listening; it was
never a production scene or deployed asset.

## Required remaining evidence

1. A fresh, test-owned Next/R3F browser smoke using the current candidate artifact, with 390px and
   1440px closed/open captures.
2. Browser console/network evidence for the GLB and the optional `micrograin.png` surface helper,
   including a functional WebGL fallback path.
3. Target-device performance budget, measurements, and owner performance acceptance.
4. Owner visual review of real browser output. This review cannot manufacture `VISUAL_FINAL_APPROVED`.
5. Production integration review for responsive camera framing, DOM keypad/fallback behavior,
   cancellation, reduced motion, and the S10-to-S11 explicit letter-selection contract.

## Scope confirmation

No canonical document, GLB, texture, source Blend file, font, photograph, authorization record,
runtime contract, scene implementation, or deployed asset was modified. No S10 production implementation,
deployment, commit, or push was performed.

## Final qualification status

`VAULT V2 — NOT QUALIFIED`

The paragraph above is the provisional pre-browser result and is superseded by the Browser
qualification update below.

## Browser qualification update

The earlier blocked smoke was superseded by a successful disposable Next/R3F browser run after the
preview was started in an interactive terminal on port `4141`. The fixture used Next 16.4.2, React
19.3.1, `@react-three/fiber` 9.8.2, Three 0.186.0, the installed Microsoft Edge executable at
`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`, and a byte-identical copy of the
candidate GLB. The fixture was removed after the port was confirmed closed.

| State | Viewport | HTTP | WebGL | 2-second rAF sample | Console/request result |
| --- | ---: | ---: | --- | ---: | --- |
| Closed | 390x844 | 200 | WebGL2 | 121 / 60.35 FPS | 0 errors / 0 failed requests |
| Open +92 degrees | 390x844 | 200 | WebGL2 | 121 / 60.34 FPS | 0 errors / 0 failed requests |
| Closed | 1440x900 | 200 | WebGL2 | 121 / 60.28 FPS | 0 errors / 0 failed requests |
| Open +92 degrees | 1440x900 | 200 | WebGL2 | 121 / 60.28 FPS | 0 errors / 0 failed requests |

Captured and visually inspected screenshots:

- `planning/evidence/screenshots/s10-vault/mobile_closed.png`
- `planning/evidence/screenshots/s10-vault/mobile_open.png`
- `planning/evidence/screenshots/s10-vault/desktop_closed.png`
- `planning/evidence/screenshots/s10-vault/desktop_open.png`
- `planning/evidence/screenshots/s10-vault/mobile_fallback.png`

The responsive preview keeps the object visible at 390px. Open captures show the same physical door
mesh, hinge side, chamber, and folded letter, with no observed clipping. The explicit fallback capture
returned HTTP 200 and rendered `WebGL unavailable - use the accessible DOM fallback.` A forced Edge
WebGL-disabled run also produced the expected Three renderer-init failure, but Edge still exposed a
canvas context before renderer creation; this is not a universal hardware fallback proof.

The browser smoke establishes technical qualification only. The recorded 58-60 FPS is a headless
Edge observation, not a target-device performance PASS. The optional `micrograin.png` surface helper,
production camera/keypad/fallback integration, owner performance budget, and owner visual approval
remain pending.

### Updated final status

`TECHNICALLY QUALIFIED / PERFORMANCE PENDING / OWNER VISUAL APPROVAL PENDING`
