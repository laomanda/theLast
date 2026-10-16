# CP-00B — Open Issues and Gates

## Current gates

| ID | Finding | Classification | Gate |
|---|---|---|---|
| OI-01 | Owner lock is present and contains all five required decisions. | VERIFIED | Source authority may proceed. |
| OI-02 | 14 source documents are present and their manifest hashes match actual files. | VERIFIED | Source freeze candidate. |
| OI-03 | SVG package has 41/41 matching files, hashes, and registry entries. | VERIFIED | Asset package usable for controlled integration. |
| OI-04 | Vault package has 10/10 matching files, sizes, and hashes. | VERIFIED | Integration candidate only. |
| OI-05 | No Next.js app, package manifest, lockfile, or test harness exists. | VERIFIED | CP-01 foundation required. |
| OI-06 | Historical Design Direction says Design System is not yet defined, while consolidated Design System exists. | CONFLICT | Record precedence; do not rewrite historical source. |
| OI-07 | `EDITORIAL_SURFACE_FIRST` is authoritative only in the owner lock, not older design-direction text. | VERIFIED / CONFLICT | Use owner lock for background strategy. |
| OI-08 | Personal copy, photos, audio, and recipient facts are absent or unapproved. | HOLD | No fabricated content; release blocker until approved. |
| OI-09 | Vault visual approval and target-device performance budget are pending. | HOLD | No `VISUAL_FINAL_APPROVED` or `PERFORMANCE_PASS`. |
| OI-10 | Browser loading, Next/R3F integration, accessibility, and performance tests have not run. | UNVERIFIED | Must execute after scaffolding. |
| OI-11 | Manifest references frozen V1 Vault paths not found in the current workspace inventory. | UNVERIFIED | Resolve before any V1 comparison is claimed. |
| OI-12 | Exact dependency versions and compatibility are not established because no application lockfile exists. | UNVERIFIED | Select and record during CP-01. |

## Production gates

### Source gate

Must pass before coding:

- Owner lock retained unchanged.
- Authority matrix reviewed.
- Historical discrepancy recorded.
- Personal-content HOLD list acknowledged.

### CP-01 foundation gate

- Typecheck, lint, unit tests, browser foundation test, and production build executed.
- Evidence includes environment, command, result, and artifact path.
- No scene beyond the bounded foundation slice is implemented.

### P1/P2 gates

- Twelve-scene state graph is guarded.
- Birthday completion at S08 works without the hidden path.
- Surface-first background uses real SVG REV5 assets and approved tokens.
- Responsive and keyboard paths are demonstrated.

### P3 gate

- One shared `CakeConfiguration` survives S05→S06.
- Native input and non-mic extinguish path work.

### P4 gate

- S08→S09 deliberate intent and accessible alternative work.
- S10 uses the existing Vault V2 GLB and documented adapter boundary.
- 2.5D/DOM fallback preserves semantic completion.
- No Vault visual/performance approval is inferred from asset integrity.

### P6 release gate

- Owner approves personal content and final media/privacy handling.
- All release-blocking PRD and Implementation Plan gates are PASS.
- No `NOT RUN`, `BLOCKED`, or `FAIL` remains on a release-blocking test.

## Planned next decision

CP-00B is complete as a planning checkpoint. CP-01 requires explicit owner approval before creating the planned application files or installing dependencies.

