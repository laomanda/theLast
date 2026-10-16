# Vault material specification

## Material identity and palette

The five required GLB material IDs and Candidate C sRGB identities are unchanged:

| Material | sRGB base | Isolated review metalness | Isolated review roughness |
|---|---|---:|---:|
| `VaultBody_M5` | `#2E2A2C` | 0.02 | 0.78 |
| `VaultDoor_M5` | `#352B37` | 0.025 | 0.70 |
| `LockAccent_Lavender` | `#A79DCD` | 0.14 | 0.60 |
| `LockAccent_Champagne` | `#E6D4AC` | 0.12 | 0.62 |
| `LetterPaper_M4` | `#F6F1E8` | 0 | 0.88 |

The GLB's embedded PBR values remain the authored derivative values; the listed scalar tuning is applied only by runtime material clones in the isolated candidate. It must not mutate shared loader-cache materials or be saved back to the GLB.

## Surface texture

`../runtime/textures/micrograin.png` is one deterministic 256×256 single-channel grayscale micro-roughness tile (28,062 bytes in the source candidate). `../runtime/surface_finish.mjs` uses linear R8, repeat wrapping, mipmapped linear filtering, anisotropy ≤2, one dominant-axis texture sample, and no normal/bump/displacement map or UV dependency. Per-material modulation amplitudes are Body 0.150, Door 0.120, Lavender 0.075, Champagne 0.075, Paper 0.055; object-space tile scale is 0.024 m. Surface tuning remains a review proposal, not owner-final approval.

## Rendering assumptions and boundaries

Candidate comparisons used sRGB output, color management enabled, exposure 1, NeutralToneMapping, and Gentle lighting. Preserve the warm graphite/plum/ivory restrained finish. Do not add chrome, glow, plastic gloss, grunge, heavy bump, or new material IDs. The runtime's test harness does not constitute an approved final production lighting implementation. Texture/material instance cloning and disposal are integration obligations; see `INTEGRATION_NOTES.md`.
