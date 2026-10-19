# CP-01D.1A — Authority Boundary Hardening Evidence

Final status: **CP-01D.1A — IMPLEMENTED / INDEPENDENT REVIEW PENDING**  
Date: 2026-10-17 (Asia/Bangkok)

## 1. Scope and root cause

**PASS** — This was a targeted authorization-boundary hardening patch. No runtime, Zustand, scene UI, canonical source, REV5 asset, font, Vault, private asset, S04 implementation, release validator, or packager was changed.

**ROOT CAUSE CONFIRMED** — The prior internal module exported both `createAuthorityToken()` and `authorizeDeclaration()`. Although absent from the public barrel, any project module could directly import them, mint a locally accepted token, and register an otherwise well-formed declaration as trusted. The `WeakSet` correctly tracked object provenance, but its issuer gate was not meaningful while arbitrary code could create a recognized token.

## 2. Updated construction model

**PASS** — Removed exported authority-token creation and generic production issuance.

- `registry-definitions.ts` now contains only the fixed, evidence-backed declarations for the four active production SVGs. It declares facts but cannot issue trust.
- `internal.ts` owns the non-exported `issueFixedAuthorization` function and seals the fixed declarations during module initialization. The only production issuance path is this fixed registry initialization.
- `registry.ts` reads the resulting immutable records via `getFixedApprovedDesignAssets()`; it cannot mint a token or issue an arbitrary record.
- The `WeakSet` remains as an object-provenance check, but is no longer the only authority boundary.
- Synthetic constructors moved from `src/assets/authorization/` to `tests/support/asset-authorization-fixtures.ts`.
- The narrow synthetic fixture bridge is restricted to `NODE_ENV === "test"`, is not exported by the public barrel, and throws when called in a production runtime.

## 3. Import inspection

**PASS** — Before the patch, only `registry.ts` and `src/assets/authorization/test-support.ts` imported the generic internal issuance exports. After the patch:

- No production module imports test-only fixture support.
- `tests/unit/asset-authorization.test.ts` imports `tests/support/asset-authorization-fixtures.ts`.
- No exported internal authority-token or generic issuance API remains.
- The public `src/assets/authorization/index.ts` continues to export only policy functions and public types.

## 4. Policy compatibility

**PASS** — Preserved without change:

- Existing four production asset IDs, public paths, hashes, and S01/S02/S03 allocations.
- Current zero-photo S04 `HOLD` state.
- Exactly-one-photo S04 readiness rule and duplicate/untrusted input denial.
- Global multi-photo allocation outside S04.
- Existing policy reason codes and client-safe public-projection fields.
- Restricted/private-asset behavior.

**PASS** — HOLD, unknown, and wrong-scene records still return `null` from public projection. Private-source metadata remains absent from a successful projection.

## 5. Security regression coverage

**PASS** — Added focused negative tests that verify:

1. `internal.ts` no longer exposes `createAuthorityToken` or `authorizeDeclaration`.
2. A direct synthetic issuance attempt under `NODE_ENV=production` throws, even with a structurally valid `APPROVED` declaration.
3. Existing forged JSON approval, HOLD-publication, integrity, scene-allocation, projection-privacy, S04 cardinality, and multi-scene tests remain green.

## 6. Integrity responsibility boundary

**DOCUMENTED LIMITATION** — Trusted authorization metadata and a stored SHA-256 declaration are not proof that current source/deployed bytes still match. This patch preserves the required distinction between declared and verified integrity within the policy, but actual source/deployed hash collection and release-time verification remain the responsibility of CP-01D.2.

## 7. Files changed

Added:

- `src/assets/authorization/registry-definitions.ts`
- `tests/support/asset-authorization-fixtures.ts`
- `planning/evidence/CP01D1A_AUTHORITY_BOUNDARY_HARDENING_EVIDENCE.md`

Modified:

- `src/assets/authorization/internal.ts`
- `src/assets/authorization/registry.ts`
- `tests/unit/asset-authorization.test.ts`

Removed:

- `src/assets/authorization/test-support.ts`

## 8. Verification results

| Command | Result | Actual result |
| --- | --- | --- |
| `npm run typecheck` | **PASS / exit 0** | Completed successfully. |
| `npm run lint` | **PASS / exit 0** | Completed successfully. |
| `npm run test:unit -- --reporter=dot` | **PASS / exit 0** | 5 files, 61 tests passed. |
| `npm run build` | **PASS / exit 0** | Next.js production build completed successfully. |
| Isolated `npm run test:e2e` | **PASS / exit 0** | 40 passed, 0 failed, 0 retried, 0 skipped; 3.6 minutes. |
| `npx playwright test -c playwright.production.config.ts` | **PASS / exit 0** | 1 passed, 0 failed, 0 retried, 0 skipped. |

**PASS** — The complete development E2E suite used a disposable isolated webpack server at `http://127.0.0.1:3001` because the existing repository development lock remained occupied. PID `6636` and other pre-existing processes were not stopped. Only the temporary server launched for this verification was terminated after Playwright completed all tests.

## 9. Privacy and stop statement

**PASS** — No private photograph was opened, read, hashed, inspected, moved, copied, imported, or exposed. No photo authorization was created.

**STOP — CP-01D.1A — IMPLEMENTED / INDEPENDENT REVIEW PENDING**

No CP-01D.2 work has begun.
