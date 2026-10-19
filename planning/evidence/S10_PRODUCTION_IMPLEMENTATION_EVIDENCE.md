# S10 Production Implementation Evidence

Status: `S10 — IMPLEMENTED / VERIFICATION OPEN`

This checkpoint implements the authorized Vault V2 integration base as an S10 production candidate. S11 and S12 remain honest runtime boundaries; complete release remains `NOT_READY`.

## Asset integrity

The original candidate was not modified. The deployed copy is byte-preserving:

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `assets-final/vault/runtime/vault-final.glb` | 741,096 | `9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B` |
| `public/assets/vault/vault-final.glb` | 741,096 | `9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B` |

The asset remains `VAULT_V2_INTEGRATION_CANDIDATE`; this is not publication authorization or owner visual acceptance.

## Implementation

- `ExperienceShell` now renders S10 through `S10Vault`; unexpected scenes remain at the runtime boundary.
- The S10 DOM control plane preserves the exact string PIN `011007`, leading zeros, invalid feedback, idempotent opening, keyboard/touch input, and guarded S10→S11 continuation.
- The real `Door_Hinge_Pivot` is driven through the approved hinge adapter at +92°. Reduced motion commits the final hinge angle without an animation timeline.
- Presentation tuning is limited to responsive camera framing, editorial background treatment, studio lighting, tone mapping, contact shadows, DPR ceiling, and cloned runtime materials. The GLB hierarchy and binary are unchanged.
- WebGL readiness now probes actual `THREE.WebGLRenderer` construction. If renderer creation or asset loading fails, the DOM fallback remains available with the same PIN and guarded continuation.
- The render loop changes to demand mode after the opening settles; GSAP invalidates during camera/door motion.

## Evidence captured

Current production-app screenshots present in `planning/evidence/screenshots/s10-production/`:

- `s10-mobile-locked-390x844.png`
- `s10-mobile-opened-390x844.png`
- `s10-desktop-locked-1440x900.png`
- `s10-desktop-opened-1440x900.png`

The reduced-motion production screenshot and a forced browser-level WebGL-failure screenshot were not obtained in the conclusive run and are therefore `NOT RUN`. Earlier disposable Vault qualification captures are retained separately under `s10-vault/` and are not treated as production S10 acceptance.

## Verification

| Check | Result | Actual result |
| --- | --- | --- |
| Typecheck | PASS | `npm run typecheck`, exit 0 |
| Lint | PASS with warning | `npm run lint`, exit 0; one existing Next `<img>` performance warning in `S10Vault.tsx` |
| Unit tests | PASS | 14 files, 146 tests passed |
| Production build | PASS | `npm run build`, exit 0; Next 16.4.2 Turbopack build completed |
| Focused browser E2E | BLOCKED | Isolated development server did not reach reliable readiness; production smoke reached the S10 page, but the Playwright reporter did not return a conclusive exit code before the test-owned session was stopped |
| Full browser E2E | NOT RUN | Not rerun after the focused lifecycle block |
| Release validator | PASS as expected incomplete result | `npm run validate:release`, exit 1; verdict `NOT_READY` with missing owner/scene evidence and S11/S12 renderer failures |

Observed browser-only issues fixed in the focused test setup were strict locator ambiguity (the Next route announcer also uses `role=alert`) and a reduced-motion S07 helper assumption. No scene contract or protected content was changed for those corrections. The remaining blocker is runner/reporting completion, not evidence of a successful E2E suite.

## Remaining limitations

- Independent production browser acceptance is still open because the focused Playwright reporter did not complete with exit 0.
- Target-device performance is not claimed; earlier headless Edge qualification remains reference-only.
- Owner visual approval, complete-release authorization, S11/S12 implementation, and final publication remain pending.
- No private photo, letter, confession content, Vault source package, SVG source geometry, font, or canonical document was modified.
