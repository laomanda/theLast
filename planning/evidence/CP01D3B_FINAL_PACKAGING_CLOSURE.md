# CP-01D.3B — Final Packaging Policy & Evidence Closure

Status: **IMPLEMENTED / INDEPENDENT REVIEW PENDING**

## Exact changes

- `src/evidence/packaging/policy.ts`: removed the exported mutable screenshot `Set`; the authoritative paths are private module data, with a query function and defensive-copy accessor. The exact S03 path list is unchanged.
- `src/evidence/packaging/inventory.ts`: replaced header-only PNG acceptance with structural PNG validation: signature, bounded chunks, IHDR dimensions, CRC-32, at least one IDAT, terminal IEND, and no trailing bytes. This is explicitly container validation, not full pixel decoding.
- `src/evidence/packaging/profiles.ts`: added the fixed CP-01D.3B audit profile and included both Playwright configurations for inspection.
- `tests/unit/evidence-packaging.test.ts`: added allowlist mutation, CRC, truncation, and structural PNG regression cases.
- `planning/evidence/CP01D3B_VERIFICATION_LOG.md`: redacted command/result log for this closure.

No runtime, state, UI, authorization, release-validator, canonical document, REV5 asset, font, Vault, private photograph, or deployment file was modified.

## Screenshot allowlist security

The allowlist is no longer externally mutable. `privacyDenial()` consults a private `ReadonlySet`; external callers can receive only a defensive array copy. Mutating that copy does not change classification. Unregistered PNG paths remain `UNCLASSIFIED_FILE`.

## PNG validation scope

The validator now checks PNG container structure and CRCs, including required IHDR, IDAT, and IEND sequencing, chunk boundaries, positive dimensions, valid termination, and absence of trailing bytes. It does not decode compressed scanlines or prove visual/pixel correctness; the error message and function naming state this boundary. Synthetic PNG fixtures only were used. No private photograph was inspected.

## E2E chronology and evidence reconciliation

- Earlier CP-01D.3A isolated development run: 40 tests, 37 passed and 3 failed. The failures were S03 cases 31, 33, and 35 after the temporary Next dev server emitted `Unexpected end of JSON input`. This remains a recorded FAIL.
- CP-01D.3A fresh production run: isolated Webpack build, port 3015, 1/1 production smoke passed; HTML and 9 referenced CSS/JS chunks returned HTTP 200.
- This CP-01D.3B isolated development attempt used the current `playwright.config.ts`, `PORT=3016`, and a fresh temporary clone. It was BLOCKED before test execution because the temporary webServer repeatedly reported `ENOENT` for `.next/dev/server/pages/_app/build-manifest.json`. No successful 40/40 development run was found or substituted.
- This CP-01D.3B fresh production run used a new Webpack build, port 3017, and the copied `playwright.production.config.ts` pointed only at that server. HTML returned 200, all 9 referenced chunks returned 200, and the production smoke passed 1/1 with no reported browser failure.
- Neither Playwright configuration changed during CP-01D.3B. Both are included in the new audit package for inspection.

The older CP-01D report’s “8 payload files” described the earlier `checkpoint-cp01d3` profile. The CP-01D.3A archive used the later `checkpoint-cp01d3a` profile and contained 15 payload files plus manifest/report. The CP-01D.3B profile contains 16 required/optional payload entries as available at packaging time; the final manifest is authoritative for actual included count.

## Verification

| Check | Result | Actual result |
|---|---|---|
| `npm run typecheck` | PASS | exit 0 |
| `npm run lint` | PASS | exit 0 |
| `npm run test:unit` | PASS | 7 files, 112 tests passed, exit 0 |
| focused packaging suite | PASS | 1 file, 41 tests passed, exit 0 |
| `npm run build` | PASS | exit 0 |
| isolated development E2E | BLOCKED | webServer `ENOENT` before tests; no pass count claimed |
| fresh isolated production smoke | PASS | 1/1, port 3017, exit 0 |
| `npm run validate:release` | NOT_READY | exit 1; S04 HOLD/development boundary and incomplete-scene reasons retained |

## Preserved protections

Deep-frozen profiles, fixed registered profiles, exact S03 screenshot paths, owned temporary staging, exclusive destination creation, no-overwrite behavior, full manifest/report/member/hash checks, archive SHA-256 verification, safe extraction, and CP-01D.2 release denial remain in force. S04 remains DESIGN LOCKED / PRODUCTION HOLD.

## Privacy and limitations

No private photograph, personal narrative, credential, font binary, Vault asset, or restricted source was read or packaged. Structural PNG validation is not full image decoding. Development E2E remains blocked in the current isolated environment; the prior 37/3 result remains a failure and is not replaced by the production smoke result.

