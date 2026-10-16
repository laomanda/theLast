# CP-00B — Source Authority Matrix

Status: architecture/documentation checkpoint only. No application implementation or locked-source edits were performed.

## Domain authority and conflict handling

These sources are authoritative within their stated domains; the list is not a universal override order. Where a source explicitly establishes precedence, preserve that precedence. Where substantive contradictions remain, escalate them as **CONFLICT** rather than silently selecting a winner.

- **Final Flow** — narrative order, consent, scene order, Scene 08 completion, and hidden-path eligibility. `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md`.
- **Tech Spec** — approved runtime capabilities, implementation boundaries, lifecycle, state, loading, fallback, and deployment constraints. `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md`.
- **PRD** — product requirements, content/privacy obligations, acceptance scenarios, and release acceptance. `docs/PRD.md`.
- **Design System** — consolidated design, visual, accessibility, component, asset, and QA contracts; it does not silently rewrite its sources. `docs/DESIGN_SYSTEM.md`.
- **Design fragments** — discipline-specific requirements within each fragment's approved scope and lock register. `docs/SOURCES/`.
- **Implementation Plan** — implementation phases, evidence, change control, execution gates, and stop conditions. `docs/IMPLEMENTATION_PLAN.md`.
- **Latest Owner Decision** — `EDITORIAL_SURFACE_FIRST`, `COLOR SURFACE + SVG REV5 + SUBTLE TEXTURE`, photography policy, preview policy, and Vault candidate direction only as explicitly governed. `docs/OWNER_DECISIONS/FINAL_DESIGN_DIRECTION_LOCK.md`.
- **Asset manifests and integration notes** — actual production asset paths, hashes, runtime contracts, and deployment constraints for SVG, fonts, and Vault packages.

## Matrix

| Source/package | Status | Authority and scope | Evidence / relevant sections |
|---|---|---|---|
| `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` | VERIFIED / LOCKED | Canonical 12-scene flow; birthday-first Scenes 01–08; optional hidden Scenes 09–12; Scene 08 is complete before discovery. | Header; `## 01`–`## 12`; `CURRENT LOCK STATUS`. |
| `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md` | VERIFIED / PROVISIONALLY LOCKED | Next.js, React, TypeScript, Tailwind infrastructure, Zustand, GSAP, Motion, Three/R3F for Vault, asset manager, capability/fallback and lifecycle boundaries. | `## 2.1`–`## 2.4`; `#5`–`#9`; `#14`–`#18`; `#24`–`#30`; `#35`; `#40`–`#43`. |
| `docs/DESIGN_SYSTEM.md` | VERIFIED / MASTER CONSOLIDATION | Consolidated visual and implementation contract; does not silently revoke source decisions. | `## 0.1`–`## 0.4`; `## 2`; `## 4`–`## 18`; `## 20`–`## 22`. |
| `docs/PRD.md` | VERIFIED / FINAL BASELINE | Product behavior, content/privacy boundaries, acceptance tests, NFRs, and release blockers. | Header; `## 3`–`## 8`; `## 11`; `## 13`. |
| `docs/IMPLEMENTATION_PLAN.md` | VERIFIED / APPROVED EXECUTION BASELINE | Phase gates, source freeze, stack conformity, proposed repository structure, evidence and stop conditions. | Header; `## 1`–`## 6`; `## 12`; `## 16`–`## 22`. |
| 14 files in `docs/SOURCES/` | VERIFIED | Domain-specific source fragments. Scene-by-scene is explicitly locked; each fragment retains its own locked/pending boundary. | `docs/MANIFEST.json`; each fragment header and lock register. |
| `docs/OWNER_DECISIONS/FINAL_DESIGN_DIRECTION_LOCK.md` | VERIFIED / OWNER-APPROVED | Latest owner decision: `EDITORIAL_SURFACE_FIRST`; `COLOR SURFACE + SVG REV5 + SUBTLE TEXTURE`; photography is narrative content, not default background; previews are composition references; Vault V2 remains the 3D candidate. | `## 2`, `## 3`, `## 6`, `## 9`. |
| `BIRTHDAY_SVG_REV5/public/assets/svg/ASSET_MANIFEST.json` and `_registry.json` | VERIFIED INTEGRITY / OWNER-LOCKED PRODUCTION BASELINE / RUNTIME UNVERIFIED | Owner-approved identifier: `SVG_PRODUCTION_BASELINE_LOCKED`. 41 SVG files, paths, hashes, families, scene allocations, render modes, and usage contracts. | Manifest and registry; `ASSET_USAGE_GUIDE.md`; actual check: 41/41 paths and hashes matched. |
| `assets-final/vault/manifest.json` and `docs/INTEGRATION_NOTES.md` | VERIFIED / HOLD | V2 runtime package is `VAULT_V2_INTEGRATION_CANDIDATE`; geometry is not to be remodeled; visual approval and performance acceptance remain pending. | Manifest fields `finalizationStatus`, `visualApproval`, `performanceStatus`, `limitations`. |
| `font/` packages | VERIFIED / UNVERIFIED runtime compatibility | Bricolage Grotesque, Newsreader, and Shantell Sans binaries and OFL files are present. Browser loading/rendering is not yet tested. | Each font README/OFL; actual WOFF2 files present. |

## Historical discrepancy and owner resolution

`docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md` still carries `Design System Status: NOT YET DEFINED` in its header. The later `docs/DESIGN_SYSTEM.md` is a consolidated master, and the owner lock now explicitly establishes the surface-first background decision. This is a historical version discrepancy, not permission to rewrite the older source. Record it as **CONFLICT** and use the authority order above.

The owner lock's `EDITORIAL_SURFACE_FIRST` decision is **VERIFIED** in the owner file and applies to background strategy. It does not override Final Flow, Tech Spec, or discipline-specific contracts.

## HOLD boundaries

- Personal name, birthday message, confession, portrait captions, memories, final photos, audio, and any recipient-specific copy remain **HOLD** until supplied and approved. See `docs/PRD.md`, `## 5.4`, `## 9`, `## 11.1`, and `docs/IMPLEMENTATION_PLAN.md`, `## 20.1`.
- Vault remains **VAULT_V2_INTEGRATION_CANDIDATE**; do not claim `VISUAL_FINAL_APPROVED` or `PERFORMANCE_PASS`.
- No runtime PASS is claimed because no application exists yet.
- Frozen V1 paths referenced by the Vault manifest are not present in the current workspace inventory: **UNVERIFIED**.

