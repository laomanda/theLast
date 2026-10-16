# CP-01A.1 Repository Hygiene Evidence

**Checkpoint:** CP-01A.1 — safe repository hygiene and cleanup  
**Date:** 2026-10-16 (Asia/Bangkok)  
**Result:** **VERIFIED LOW-RISK CLEANUP / NO SOURCE DELETION**  
**Baseline preserved:** `e80850f chore: preserve pre-CP01A workspace baseline`

## Root cause of the large file count

The reported large count is not caused by Git tracking ten thousand application changes.

- Git tracks **443** intentional baseline files, primarily approved SVG evidence/assets and planning/documentation material.
- The working tree has **70,886 untracked files**, dominated by the protected `font/` source distributions. `font/` contains **71,226** files / approximately **243.14 MB**; these are source material, not disposable build output.
- Git ignores **39,686** generated/local files, principally `node_modules/` and `.next/`.
- The filesystem contains **111,015** files excluding `.git`; IDEs or file explorers that include dependencies and build output can therefore display a much larger number than Git's tracked count.

The hygiene conclusion is that the high visible count is a combination of intentionally preserved font source trees plus locally installed/generated tooling. It is not evidence that the canonical repository is accidentally tracking 10,000 generated files.

## Before / after counts

The pre-cleanup read-only inventory and post-cleanup verification produced the following counts. The only cleanup change was `.gitignore`; no file was staged, removed, or untracked.

| Measure | Before | After | Result |
|---|---:|---:|---|
| Tracked files | 443 | 443 | unchanged |
| Staged files | 0 | 0 | unchanged |
| Modified tracked files | 0 | 0 | unchanged |
| Untracked files | 70,886 | 70,886 | unchanged |
| Ignored files | 39,679 | 39,686 | generated build output increased during verification |
| Filesystem files excluding `.git` | 111,008 | 111,015 | generated build output increased during verification |
| `node_modules/` files | 39,345 | 39,345 | unchanged |
| `.next/` files | 330 | 337 | build-generated |
| `.git/` files | 1,242 | 1,242 | unchanged |
| Workspace bytes excluding `.git` | 1,080,786,185 | 1,082,694,715 | build output delta |
| `node_modules/` bytes | 712,299,564 | 712,299,564 | unchanged |
| `.next/` bytes | 111,057,790 | 112,966,230 | build output delta |
| `.git/` bytes | 104,477,025 | 104,477,025 | unchanged |

The ignored count and filesystem size changes are expected consequences of the required post-cleanup build. `.gitignore` does not shrink existing Git history or delete local files.

## Exact files modified or removed

Modified:

- `.gitignore`

Removed:

- None.

Paths removed from Git tracking:

- None. `git ls-files --cached --ignored --exclude-standard` returned **0**, so no targeted `git rm --cached` operation was justified.

The existing CP-01A bootstrap files, evidence report, protected source trees, and baseline commit remain as they were before this hygiene pass. No commit was created, amended, squashed, or pushed; no remote was added.

## Updated `.gitignore`

Existing rules were retained for:

- `node_modules/`
- `.next/`, `out/`
- `coverage/`, `playwright-report/`, `test-results/`
- `.env*` with `.env.example` allowed
- TypeScript build info, OS files, and npm debug logs

Added minimal project-local coverage for:

- Playwright `blob-report/`
- `.cache/`, `.turbo/`, `.vite/`, `.vitest/`
- `.eslintcache`
- `dist/`
- general transient `*.log`

Protected paths including `docs/`, `planning/`, `font/`, `BIRTHDAY_SVG_REV5/`, `assets-final/`, `app/`, and `public/` were not ignored.

## Duplicate / unneeded candidate review

No item met the evidence standard for automatic deletion. The following remain **HOLD / REVIEW REQUIRED**:

| Exact path | Files / size | Authority / tracking | Reproducible? | Proposed action | Removal risk |
|---|---:|---|---|---|---|
| `font/Newsreader-master/` | 40,168 / 68.46 MB | Protected source distribution; mostly untracked | Not safely reproducible from the app | Keep; owner review required before any tracking or pruning decision | Loss of master font sources, licenses, or future weights |
| `font/shantell-sans-main/` | 30,905 / 161.55 MB | Protected source distribution; mostly untracked | Not safely reproducible from the app | Keep; owner review required | Loss of source masters/specimens/licenses; includes local package material |
| `font/bricolage-main/` | 153 / 13.13 MB | Protected source distribution; mostly untracked | Not safely reproducible from the app | Keep; owner review required | Loss of source masters and future font variants |
| `font/shantell-sans-main/.vscode/` | 3 / 1.17 KB | Inside protected source tree; locally ignored | Reproducible editor metadata, but provenance is not established | Review only; do not delete in this pass | Could remove owner/package-local settings without approval |
| `assets-final/` | 11 / 0.93 MB | Protected production assets; untracked | Not assumed reproducible | Keep and preserve | Could remove approved future-phase assets |
| `BIRTHDAY_SVG_REV5/` | 56 / 0.45 MB | Authoritative SVG package; tracked | Reproducible only from its locked source package | Keep and preserve | Could break SVG baseline and evidence chain |
| `node_modules/` | 39,345 / 679.30 MB | Ignored generated dependency install | Yes, from `package-lock.json` | Keep locally; do not track | Deleting would require reinstall and was unnecessary |
| `.next/` | 337 / 107.73 MB after verification | Ignored generated Next output | Yes, from source/build | Keep locally; do not track | Deleting is unnecessary during an active setup review |

No duplicate Markdown report set, old preview set, alternate SVG package, or Vault package was deleted. Matching names or hashes alone were not treated as proof of redundancy. No package dependency was removed and `package-lock.json` was not edited.

## Protected source and asset integrity

- `git diff --name-only HEAD -- docs planning/production planning/evidence BIRTHDAY_SVG_REV5 font assets-final` returned no paths.
- The baseline commit `e80850f` remains present and unchanged.
- `git ls-files --cached --ignored --exclude-standard` returned 0.
- No canonical document, manifest, SVG, font, Vault file, Blender source, texture, runtime helper, or owner decision was edited, moved, deleted, compressed, or optimized.
- The untracked font source distributions cannot all be cryptographically compared to the baseline because most were not part of the baseline commit; they were not targeted by any cleanup operation. Status: **HOLD / UNVERIFIED AGAINST GIT BASELINE**, not a deletion finding.

## Verification results

| Command | Result | Exit code |
|---|---|---:|
| `git status --short` | bootstrap and protected font material remain untracked; no staged/deleted paths | 0 |
| `git status --ignored --short` | generated directories/files shown as ignored; protected source remains visible | 0 |
| `git ls-files` | 443 tracked baseline files | 0 |
| `npm ls --depth=0` | approved dependency tree present; npm reports optional Sharp/WASM artifacts as extraneous; tree command exits successfully | 0 |
| `npm run typecheck` | strict TypeScript check passed | 0 |
| `npm run lint` | ESLint passed; traversal is slow because the protected source tree remains visible to the filesystem scan | 0 |
| `npm run build` | Next production build passed; `/` and `/_not-found` prerendered | 0 |

No `--force`, `--legacy-peer-deps`, history rewrite, remote, push, dependency upgrade, or application feature change was performed.

## Remaining risks and recommendations

- **HOLD:** Do not delete or untrack any font master/source distribution without owner approval and an explicit source-to-selected-font decision.
- **HOLD:** Do not change the approved application stack or lockfile as a file-count optimization.
- **REVIEW REQUIRED:** If IDE file counts remain distracting, configure the IDE’s excluded folders locally for `node_modules/`, `.next/`, and approved generated outputs; do not hide protected source folders in `.gitignore`.
- **VERIFIED:** Generated dependency/build output is ignored and not tracked.
- **CONFLICT:** None identified. Protected source visibility is intentional and cannot be safely “fixed” by ignoring or deleting it.
- **STOP:** CP-01B and any source cleanup beyond this report require explicit owner authorization.

## CP-01A.2 owner-authorized font source cleanup

On 2026-10-16, the three upstream font distributions were backed up before deletion to:

`C:\Users\jakkob\Downloads\Mal this from Kob\theLast-CP01A2-font-backup-2026-10-16`

The backup is outside the project root, outside Git, and outside `node_modules`. It was verified byte-for-byte before cleanup: 71,226 files and 254,947,597 bytes in both source and backup, with zero mismatches.

The following original directories were then removed, and only these directories were targeted:

- `font/bricolage-main/`
- `font/Newsreader-master/`
- `font/shantell-sans-main/`

The consolidated `font/` result contains 9 files totaling 752,646 bytes: four approved WOFF2 binaries, three byte-preserved OFL licenses, `licenses/newsreader-trademarks.md`, and `PRODUCTION_FONT_PROVENANCE.txt`. All four approved binary SHA-256 values match the locked values; each retained OFL hash matches its backed-up source.

Measured Git file counts changed from the CP-01A.2 preflight of 443 tracked, 70,887 untracked, and 39,686 ignored files to 443 tracked, 24 untracked, and 39,684 ignored files. The old font paths were tracked in the baseline and therefore appear as working-tree deletions; the baseline commit `e80850f` remains available and was not rewritten. No files outside `font/` were deleted. The only non-font edit in this pass is this evidence update.

CP-01A.2 verification: `npm ls --depth=0`, `npm run typecheck`, `npm run lint`, and `npm run build` all exited 0. No package installation, dependency change, staging, commit, push, or CP-01B work was performed.
