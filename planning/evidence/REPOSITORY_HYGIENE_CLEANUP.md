# Repository Hygiene Cleanup

Status: `PARTIAL — generated output retained because process ownership could not be verified`

## Inventory

| Measure | Earlier cleanup baseline | Final pass before | Final pass after |
| --- | ---: | ---: | ---: |
| Tracked files in index | 123 | 123 | 123 |
| Tracked modified files | 14 | 14 | 14 |
| Staged files | 0 | 0 | 0 |
| Untracked files (`git ls-files --others --exclude-standard`) | 555 | 216 | 216 |
| Ignored files (`git ls-files --others --ignored --exclude-standard`) | 40,169 | 40,157 | 40,157 |
| Porcelain entries with all untracked files | 569 | 230 | 230 |

The reported thousands of changes did not represent tracked modifications. They were principally generated Next.js build outputs and ignored dependency/tool files. Initially, 14 tracked files were already modified and none were staged; this cleanup preserved those edits. Final untracked files comprise 215 existing project entries plus this report.

## Cleanup performed

- Added `.next-e2e/`, `.next-e2e-*/`, and `.next-dev-*/` to `.gitignore`.
- Added `.next-dev-*/**` to ESLint global ignores, alongside existing isolated Next output ignores.
- A prior cleanup pass removed generated output; subsequent builds and test infrastructure recreated several root-level output directories. No source-controlled files were removed or untracked.
- No debug scripts or scratch fixtures were found. `planning/evidence/screenshots/cp01c2b/debug-rotation-0.png` is referenced by S02 evidence/test coverage and was retained.
- SHA-256 comparison of 24 canonical and production-planning Markdown files found no exact duplicate groups. No duplicate assets were removed or consolidated.
- Canonical documentation, production/evidence Markdown, Vault material, photos, letters, fonts, SVGs, and application assets were retained. No private photo or narrative file was opened, hashed, moved, or deleted.

## Remaining generated output and review items

- Current generated directories retained: `.next/` (49.86 MiB), `.next-dev-diagnostic/` (97.00 MiB), `.next-e2e-3069/`, `.next-e2e-3070/`, `.next-e2e-3071/`, `.next-e2e-3072/`, `.next-e2e-3074/`, and `.next-e2e-s10/` (each about 0.01 MiB). Total: about 146.93 MiB. They contain no tracked files and match generated output conventions.
- No TCP listeners were found on the checked development/test ports. Windows denied `Get-CimInstance Win32_Process` command-line/ancestry inspection (`Access denied`), while 40 `node.exe` processes were visible through `Get-Process`. Their relationship to these output directories could not be established, so no directories were deleted in this final pass. No process was stopped.
- Disk recovered in this final pass: 0 bytes; deletion was withheld pending reliable process ownership inspection. Earlier generated-output deletion was followed by regeneration/reappearance, so it does not provide a stable net-recovered figure for this final pass.
- Historical evidence reports and the extensive source/design Markdown were retained. No deletion candidate was sufficiently proven redundant and unreferenced to justify removal.
- The `assets/`, `assets-final/`, `font/`, and `BIRTHDAY_SVG_REV5/` trees remain protected and were not deduplicated.

## Verification

- `npm run typecheck`: PASS, exit 0.
- `npm run lint`: PASS, exit 0; one existing `@next/next/no-img-element` warning in S10.
- `npm run test:unit`: PASS, 14 files and 146 tests.
- `npm run build`: PASS, exit 0.
- `npm run validate:release`: expected `NOT_READY`, exit 1; release owner approval and multiple scene readiness/acceptance records are absent, and S11/S12 renderers remain incomplete.
- Full Playwright E2E was not run as requested to avoid generating more temporary directories; a focused S10 run is tracked in the S10 evidence and did not produce a conclusive reporter exit.
- Git index: 123 stage entries, one worktree, no nested `.git` directories detected. VS Code settings exposed no Git/SCM overrides; GitLens is installed. If VS Code still shows about 10K changes while Git reports 230 entries, reload the VS Code window and refresh Source Control.

No commits, pushes, history rewrites, or broad Git cleanup commands were used. S01–S10 work remains intact. Release readiness remains `NOT_READY`.
