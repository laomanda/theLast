# S10 3D Vault Refinement Review

Date: 2026-10-19  
Status: **S10 — REFINED / OWNER VISUAL REVIEW PENDING**

## Scope and result

Focused refinement only. The approved Vault V2 GLB, `Door_Hinge_Pivot`, narrative PIN `011007`, +92-degree opening, runtime/Zustand contracts, authorization policy, and S10→S11 transition were preserved.

The Vault now occupies the stage more confidently across mobile, tablet, and desktop. Camera framing, exposure, key/fill/rim light balance, and contact shadow were recalibrated without modifying model geometry or materials. Mobile content now flows through a complete scrollable document with no horizontal overflow at 360×800.

The non-WebGL path was repaired. It now reaches readiness, accepts the same guarded PIN flow, exposes the S11 action, and labels itself as a simple visual representation rather than claiming that the physical 3D door opened. The transient Drei `Html` loading portal was removed after browser verification demonstrated a React portal unmount race.

## Files changed

- `src/ui/s10/S10Vault.tsx`
- `app/globals.css`
- `tests/unit/s10-vault.test.ts`
- `tests/e2e/s10-vault.spec.ts`
- `planning/evidence/screenshots/s10-refinement/` (7 PNG files)
- `planning/evidence/S10_REFINEMENT_REVIEW.md`

No GLB, REV5 SVG, font, photo, canonical document, runtime, Zustand, authorization, S11, or S12 source was modified by this refinement.

The required full E2E command also refreshed pre-existing screenshot outputs owned by older S01–S09 tests. Those incidental evidence writes are not S10 deliverables; no non-S10 application source was changed in this pass. Automatic `next-env.d.ts` and `tsconfig.json` edits made by isolated Next.js development servers were restored after verification.

## Functional and lifecycle corrections

- PASS — Camera responds at mobile, tablet, and desktop breakpoints while preserving the GLB.
- PASS — Physical WebGL door completion remains tied to the approved +92-degree hinge callback.
- PASS — PIN submission has a synchronous duplicate-input guard.
- PASS — WebGL probing uses a disposable canvas/context instead of constructing a second Three renderer.
- PASS — Fallback readiness and post-PIN completion no longer dead-end.
- PASS — Reduced motion applies the complete final hinge pose without a mandatory animation.
- PASS — Demand rendering remains active outside the physical opening interval.
- PASS — S10→S11 remains an intentional action after opening.

## Visual evidence

All 7 PNG files decoded successfully and were visually inspected:

- `s10-mobile-pin-entry-390x844.png`
- `s10-mobile-closed-390x844.png`
- `s10-mobile-opened-390x844.png`
- `s10-desktop-closed-1440x900.png`
- `s10-desktop-opened-1440x900.png`
- `s10-fallback-opened-390x844.png`
- `s10-tablet-reduced-opened-768x1024.png`

Visual inspection result: PASS for model readability, closed/open distinction, hinge presentation, fallback honesty, reduced-motion final pose, control reachability, and stage balance. Final owner aesthetic acceptance remains pending.

## Asset integrity

- Source: `assets-final/vault/runtime/vault-final.glb`
- Deployed: `public/assets/vault/vault-final.glb`
- Source SHA-256: `9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B`
- Deployed SHA-256: `9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B`
- Result: PASS — byte-identical; candidate status remains `VAULT_V2_INTEGRATION_CANDIDATE`.

## Verification

| Gate | Result | Actual outcome |
| --- | --- | --- |
| Typecheck | PASS | exit 0 |
| ESLint | PASS | exit 0 |
| Focused S10 unit | PASS | 4/4, exit 0 |
| Full unit suite | PASS | 155/155 across 16 files, exit 0 |
| Production build | PASS | exit 0; static `/` and `/_not-found` generated |
| Focused S10 browser | PASS | 5/5, 0 failed, 0 skipped, exit 0 |
| Full development browser | FAIL | 78/83 passed, 5 failed, 0 skipped, exit 1 |
| Release validator | PASS (expected policy result) | `NOT_READY`, exit 1 |

The five full-suite failures are outside S10:

1. S02 evidence screenshot write returned Windows `UNKNOWN: unknown error, open` after the S03 transition assertion passed.
2. S06 test still expects an S07 runtime boundary although S07 is implemented.
3. S08 desktop evidence screenshot write returned Windows `UNKNOWN: unknown error, open`.
4. S08 reduced-motion setup waits for an S07 open control that is absent in that state.
5. S09 reduced-motion test timed out at 120 seconds.

All five S10 tests passed again inside the full 83-test run. The full-suite result is intentionally not reported as PASS.

## Remaining items

- OWNER VISUAL APPROVAL PENDING — screenshots require owner review.
- PERFORMANCE MEASUREMENT NOT RUN — this pass made bounded lifecycle/rendering improvements but did not claim a new FPS measurement.
- Full cross-scene E2E remains FAIL because of the five pre-existing/out-of-scope failures listed above.
- Development browser logs retain upstream Three/R3F deprecation warnings for `THREE.Clock` and `PCFSoftShadowMap`; no S10 runtime exception occurred in the repaired runs.
- Complete release remains `NOT_READY`; no readiness or owner approval was fabricated.
