# CP-01D.1 — Asset Authorization Contract Evidence

Final status: **CP-01D.1 — IMPLEMENTED / INDEPENDENT REVIEW PENDING**  
Date: 2026-10-17 (Asia/Bangkok)

## 1. Checkpoint scope and pre-flight

**PASS** — This checkpoint adds a small, pure TypeScript authorization contract under `src/assets/authorization/` and a focused unit suite. It does not implement S04, a photo loader, an image endpoint, a release validator, an evidence packager, an ingestion process, or any runtime/state integration.

- Git HEAD at pre-flight: `d6503b9c244a59513a8c71a2801042c7fa044a9b`.
- The working tree was already non-clean from prior CP-01 work. Those paths were retained untouched.
- TypeScript uses strict, no-emit, bundler-resolution configuration. The existing unit convention is Vitest under `tests/unit/`; browser tests use Playwright.
- The protected runtime core and Zustand scene ownership were inspected but not changed. The new module imports only the `SceneId` type/constant vocabulary; it creates neither a runtime manager nor application state.

## 2. Source authority and policy interpretation

**PASS** — Consulted: PRD, Design System, Implementation Plan, Final Design Direction Lock, Final Flow, Technical Specification, Photo Treatment/Scene-by-Scene/Icon-SVG fragments, CP-00B authority and asset plans, the REV5 manifest, and `CP01D_ASSET_PIPELINE_READINESS_AUDIT.md`.

**PASS — binding interpretation for this contract** — The global authentic-photo policy remains multi-photo: separately authorized photos can be allocated to distinct narrative scenes. S04 is a narrower scene rule: eventual S04 release readiness requires exactly one approved authentic photo.

**DOCUMENTED HISTORICAL DISCREPANCY** — Canonical sources retain adaptive 1–6-photo/two-photo-baseline language, while prior checkpoint direction used a single S04 photo. The new owner decision resolves the contract interpretation without rewriting canonical material: it is a scene-specific S04 allocation constraint, not a project-wide one-photo restriction.

## 3. Implementation architecture

**PASS** — New modules:

- `types.ts`: independent identity, lifecycle, existence, provenance, declared/verified integrity, allocation, publication, and photo-presentation types.
- `internal.ts`: build/server-side authority boundary. It validates baseline declaration shape, freezes copies, and records authority-issued records in a module-private `WeakSet`.
- `policy.ts`: pure fail-closed single-asset decisions, client-safe public projection, and the S04 cardinality decision.
- `registry.ts`: the constrained current registry for active, evidence-backed design assets only.
- `test-support.ts`: clearly synthetic, test-only authority fixtures; no personal asset or real private path is used.
- `index.ts`: public pure policy/type surface. It deliberately does not export the authority constructor, internal registry mechanism, or test fixtures.

No module is imported by a client component. Registry/internal modules are explicitly documented as server/build-time-only; no dependency was added to assert a stronger framework boundary.

## 4. Trust boundary, authorization, and projection rules

**PASS** — Raw declarations are untrusted. A plain object or JSON value that claims `APPROVED` cannot pass evaluation because the policy requires an internally authority-issued record registered in the module-private `WeakSet`.

**PASS** — The evaluator independently checks: lifecycle, physical existence, matching declared and verified SHA-256 evidence, explicit scene allocation, current publication status, complete auditable publication origin, valid client path, and (for photos) complete approved presentation metadata.

**PASS** — `projectAuthorizedPublicAsset` returns `null` for unknown, HOLD, wrong-scene, or otherwise denied records. Successful projections include only an ID, category, approved public path, scene, and verified hash; private source references and photo metadata are not returned.

**PASS** — Revoked and superseded approvals deny publication. An ordinary technical build is intentionally not considered authorization evidence.

## 5. Scene allocation and S04 state

**PASS** — Allocation is explicit per record and scene. An approved S05 asset does not authorize S04. The policy makes no invented cardinality limits for other scenes, so global multi-photo allocation remains representable.

**PASS** — S04 evaluates as `HOLD / S04_NO_APPROVED_PHOTO / 0` today. No photograph is registered, selected, allocated, published, or given fabricated metadata. A synthetic, fully evidenced record is policy-valid only in tests; two approved S04 test records deny release readiness.

## 6. Existing approved SVG registrations

**PASS** — Registered only currently deployed, evidence-backed assets, with scene scope limited to current observed use:

| Asset | Scene | Public path | Verified SHA-256 |
| --- | --- | --- | --- |
| A02 Offset Loop Open | S01 | `/assets/svg/signature/offset-loop-open.svg` | `9817F8A81BA819CB97BA6A4CFA55AA18D9E45BD1410639FCF5F46B29E4BBD84B` |
| E01 Invitation Fold | S02 | `/assets/svg/paper/invitation-paper-fold.svg` | `36DB65E25B8EA23BF326AB9082EA8D89B39F0173450E93A00431CB740F559CFC` |
| C01 Celebration Arc | S03 | `/assets/svg/celebration/celebration-arc.svg` | `A652D90982AB873EAD34D961A018E086EE8B544F83EC3698A6584D82D486F097` |
| C02 Celebration Burst | S03 | `/assets/svg/celebration/celebration-burst.svg` | `49856BAC2D792D20BCF5435C0AEE8A1CC9969F9B52219ACF63BB0C1D53BCC42A` |

Evidence source: CP-01D audit’s source/deployed comparisons and the owner-locked identifier `SVG_PRODUCTION_BASELINE_LOCKED`. The full 41-item REV5 library was not duplicated into application code, and no SVG was copied or modified.

## 7. Tests and security negatives

**PASS** — `tests/unit/asset-authorization.test.ts` contains 20 focused cases spanning all required behaviors: known SVG, unknown/untrusted declarations, HOLD/MISSING/INVALID/existence states, publication/origin/revocation/supersession, allocation isolation, declared versus verified integrity, invalid public paths, photo metadata completeness, public-projection privacy, zero/one/two S04 policies, and global multi-scene representation.

**PASS** — Deliberately hostile synthetic cases deny with explicit reason codes, including a forged `APPROVED` JSON-shaped object, a HOLD photo with a publication flag, SVG metadata recast as a photo, unrelated-scene allocation, missing authority origin, path-like non-public strings, declared-only integrity, untrusted input in a purported S04 release set, duplicate S04 authorization, incomplete photo metadata, and attempted private-source projection.

No test accessed, named, imported, hashed, decoded, or otherwise processed the restricted personal photograph.

## 8. Verification results

| Command | Result | Detail |
| --- | --- | --- |
| `npm run typecheck` | **PASS (exit 0)** | Completed successfully. |
| `npm run lint` | **PASS (exit 0)** | Completed successfully. |
| `npm run test:unit -- --reporter=dot` | **PASS (exit 0)** | 5 files, 59 tests passed. |
| `npm run build` | **PASS (exit 0)** | Next.js production build completed successfully. |
| `npx playwright test -c playwright.production.config.ts` | **PASS (exit 0)** | 1 production smoke test passed. |
| `npm run test:e2e` | **FAIL (exit 1)** | 0 configured tests ran: Playwright could not start its server because an existing Next development server was already running in this workspace (reported PID 6636). It was not stopped or altered. |

**PASS** — S01–S03 application source, runtime contracts/guards/coordinator, Zustand state, canonical documents, source/deployed SVGs, fonts, Vault material, and restricted photo material were not modified by this checkpoint.

## 9. Files added or modified by this checkpoint

Added:

- `src/assets/authorization/types.ts`
- `src/assets/authorization/internal.ts`
- `src/assets/authorization/policy.ts`
- `src/assets/authorization/registry.ts`
- `src/assets/authorization/test-support.ts`
- `src/assets/authorization/index.ts`
- `tests/unit/asset-authorization.test.ts`
- `planning/evidence/CP01D1_ASSET_AUTHORIZATION_CONTRACT_EVIDENCE.md`

**PASS** — No existing tracked production/source file was modified by this checkpoint.

## 10. Known enforcement gaps and deferred work

**BLOCKED / DEFERRED TO CP-01D.2** — This pure authorization foundation is not yet invoked by a complete-release validator or every copy/deployment path. It does not inspect a build artifact, prevent arbitrary future imports by itself, perform network/path availability checks, or authorize a release.

**NOT IMPLEMENTED / DEFERRED TO CP-01D.3** — No evidence ZIP allowlist/rejection utility was created.

**NOT AUTHORIZED** — PhotoPlan ingestion, owner photo selection, integrity capture, dimensions, crop, focal point, responsive variants, alt text, public destination, publication permission, S03→S04 presentation handoff, and S04 implementation remain outstanding.

## 11. STOP statement

**PASS** — The contract provides tested authorization semantics only. It does not make the experience production-release-ready. Public deployment remains blocked pending later checkpoints and owner-held decisions.

**STOP — CP-01D.1 — IMPLEMENTED / INDEPENDENT REVIEW PENDING**
