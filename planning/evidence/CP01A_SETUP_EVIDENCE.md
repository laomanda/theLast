# CP-01A Setup Evidence

**Checkpoint:** CP-01A — production bootstrap and dependency setup only  
**Date:** 2026-10-16 (Asia/Bangkok)  
**Verdict:** **PASS WITH DOCUMENTED DEV-TOOLING ADVISORY**  
**Next checkpoint:** Await explicit owner approval before any CP-01 runtime architecture or Birthday Experience implementation.

## 1. Workspace and environment

- Absolute workspace: `C:\Users\jakkob\Downloads\Mal this from Kob\theLast`
- Workspace-name check: path ends in `theLast` — PASS.
- Platform/shell: Windows / PowerShell.
- Node.js: `v22.18.0`.
- npm: `10.9.3`.
- Git: `2.50.1.windows.1`.
- npm registry connectivity: PASS (`npm ping`, 408 ms during discovery).
- Existing protected roots discovered before bootstrap: `assets-final/`, `BIRTHDAY_SVG_REV5/`, `docs/`, `font/`, and `planning/`.
- No pre-existing package manifest, lockfile, framework config, or application directory was present.

The required PRD, Design System, Implementation Plan, Tech Spec, owner design lock, and all five approved CP-00B production reports were read before bootstrap. Their implementation boundaries remain in force.

## 2. Git initialization and status

- The workspace was not initially a Git repository.
- A local repository was initialized on branch `main`; no remote was added and nothing was pushed.
- Recoverable pre-bootstrap baseline commit: `e80850f chore: preserve pre-CP01A workspace baseline`.
- The baseline intentionally captured the authoritative documents, production reports, SVG/Vault material, and packaged font binaries/licenses relevant to integrity checks.
- Existing additional font-source material remains untouched and untracked; it was not deleted, normalized, or absorbed into the bootstrap.
- CP-01A bootstrap files remain uncommitted for owner review.

## 3. Files and directories created or modified

Created for the runnable framework:

- `.gitignore`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `next-env.d.ts`
- `next.config.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `vitest.config.mts`
- `playwright.config.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `planning/evidence/CP01A_SETUP_EVIDENCE.md`

The only application output is the neutral technical placeholder `theLast — Environment Ready`. There is no `public/` directory, scene code, state store, transition engine, asset loader, design token set, or production interaction code. An empty `tests/e2e/` setup directory was removed rather than retained speculatively; Playwright can create it when real tests are authorized.

`next.config.ts` sets `agentRules: false` because Next.js 16.4.2 otherwise creates an unsolicited root `AGENTS.md` during `next dev`. The generated file was removed and did not return on the verified restart.

## 4. Runtime dependencies

All runtime versions are exact pins in `package.json` and the npm v3 lockfile:

| Package | Resolved version |
|---|---:|
| `next` | `16.4.2` |
| `react` | `19.3.1` |
| `react-dom` | `19.3.1` |
| `zustand` | `5.0.15` |
| `gsap` | `3.15.0` |
| `motion` | `14.3.0` |
| `three` | `0.186.0` |
| `@react-three/fiber` | `9.8.2` |
| `@react-three/drei` | `10.7.9` |
| `howler` | `2.2.4` |
| `@phosphor-icons/react` | `2.1.10` |

No dnd-kit, XState, Lenis, physics engine, component library, extra animation framework, or alternative package manager was added.

## 5. Development dependencies

| Package | Resolved version |
|---|---:|
| `typescript` | `6.0.3` |
| `eslint` | `9.39.5` |
| `eslint-config-next` | `16.4.2` |
| `postcss` | `8.5.30` |
| `@tailwindcss/postcss` | `4.3.3` |
| `tailwindcss` | `4.3.3` |
| `vitest` | `5.0.5` |
| `vite` | `8.3.4` |
| `@vitejs/plugin-react` | `6.1.2` |
| `@playwright/test` | `1.64.1` |
| `@types/node` | `22.20.5` |
| `@types/react` | `19.3.0` |
| `@types/react-dom` | `19.3.0` |
| `@types/three` | `0.186.0` |
| `@types/howler` | `2.2.13` |

## 6. Compatibility evidence

- npm package metadata and peer ranges were checked before finalizing versions.
- Next `16.4.2` accepts React/React DOM 19 and requires Node `>=20.9.0`; the installed Node version satisfies this.
- React Three Fiber `9.8.2` accepts React/React DOM `>=19 <19.4` and Three `>=0.156`; React `19.3.1` and Three `0.186.0` satisfy those ranges.
- Drei `10.7.9` accepts React 19, R3F 9, and Three `>=0.159`; the selected set satisfies those ranges.
- Three is deliberately pinned to `0.186.0`, matching the Vault V2 runtime reference without editing any Vault helper.
- Motion, Zustand, Phosphor, React, and React DOM peer ranges are mutually satisfied.
- TypeScript `7.0.2` and ESLint `10.12.0` were rejected during compatibility verification: the current TypeScript-ESLint chain caps TypeScript below `6.1`, and Next's bundled lint plugins cap ESLint at 9. Final pins are TypeScript `6.0.3` and ESLint `9.39.5`; no peer override remains.
- Tailwind `4.3.3` uses `@tailwindcss/postcss` and `@import "tailwindcss"`; no obsolete `tailwind.config.*` assumption was introduced.
- `npm ls --depth=0` exited `0`. npm displays six installed cross-platform Sharp/WASM optional artifacts as `extraneous`; they are lockfile-recorded optional packages, not undeclared application dependencies, and do not invalidate npm's dependency-tree exit status.
- No `--force` or `--legacy-peer-deps` option was used.
- `npm audit --omit=dev` reported 0 vulnerabilities. Full audit reports 5 high findings in the development-only Next ESLint glob chain (`braces`/`micromatch`/`fast-glob`). npm offers only a breaking downgrade to `eslint-config-next@14.2.35`, which would conflict with the selected Next 16 stack; no forced or stack-changing remediation was applied.
- npm currently marks ESLint 9 as unsupported, but ESLint 10 is not yet accepted by the lint plugins shipped through this selected Next config. Recheck this tooling edge before the next dependency upgrade.

## 7. Executed verification

| Command/check | Result | Exit/status evidence |
|---|---|---:|
| `node --version` | `v22.18.0` | `0` |
| `npm --version` | `10.9.3` | `0` |
| `npm install` | lockfile and modules installed | `0` |
| `npm ls --depth=0` | selected direct versions present | `0` |
| `npm run typecheck` | strict TypeScript check passed | `0` |
| `npm run lint` | ESLint passed with no findings | `0` |
| `npm run test:unit` | Vitest runner launched; no test files; `--passWithNoTests` | `0` |
| `npm run build` | optimized Next build passed; `/` statically prerendered | `0` |
| `npm run dev -- --hostname 127.0.0.1 --port 3107` | Next dev server reached Ready | running until intentional `Ctrl+C`; interruption exit `1` |
| Local HTTP/browser smoke | `GET /` returned `200`; title and visible body matched the readiness indicator | PASS |
| Browser console | no error entries | PASS |

The smoke check launched a real Codex in-app browser against `http://127.0.0.1:3107/`. DOM inspection returned only the readiness paragraph plus Next's development-tool affordance. The server was stopped after verification.

## 8. Test tooling status

- Vitest: installed, configured with a Node environment, and runner startup verified. No fabricated feature tests were added.
- Playwright: package and future web-server configuration installed. No application tests exist, `npm run test:e2e` was not run, and Playwright-managed browser binaries were not installed because the localhost smoke test succeeded with the available browser.
- Browser smoke: actually launched and verified; not a simulated result.

## 9. TasteSkill review

- Evaluated skill manifest name: **`gpt-taste`** (repository folder `skills/gpt-tasteskill`).
- Source: <https://github.com/leonxlnx/taste-skill/blob/main/skills/gpt-tasteskill/SKILL.md>
- Official documentation: <https://www.tasteskill.dev/docs>
- Codex compatibility: **Yes**. The official documentation lists Codex support, and this variant is expressly GPT/Codex-oriented.
- Proposed scope if later authorized: install only this single skill at project scope, not the full bundle and not globally. Depending on the selected official CLI mode, TasteSkill can place skill files in a project-local agent-skill directory or a global agent directory; the broader stable workflow may also create project-local `.taste-skill/` working files when used.
- Conflicts requiring strict containment: its AIDA page-structure preference, editorial type/layout prescriptions, high layout variance, randomization guidance, and GSAP/scroll-motion preferences could contradict the locked 12-scene flow, consolidated Design System, motion ownership, and `EDITORIAL_SURFACE_FIRST` owner decisions.
- Recommendation: **DEFER**. If approved later, use it only as an advisory design-review checklist subordinate to PRD, Final Flow, Tech Spec, Design System, approved design fragments, asset contracts, and owner decisions.
- Installation status: **NOT INSTALLED**. No TasteSkill files or `.taste-skill/` workspace were created.

## 10. Remaining BLOCKED / NOT RUN / UNVERIFIED

- CP-01 runtime architecture, scenes, transition behavior, stores, and experience controls: **NOT RUN — outside CP-01A**.
- SVG/font/Vault deployment and browser URL checks: **NOT RUN — source packages intentionally remain in place and are not public**.
- Playwright E2E suite and Playwright-managed browser binaries: **NOT RUN — no authorized feature tests yet**.
- Visual, motion, accessibility, reduced-motion, fallback, and performance acceptance: **UNVERIFIED — no Birthday Experience UI exists**.
- Personal content: **HOLD preserved**.
- Vault remains `VAULT_V2_INTEGRATION_CANDIDATE`; no integration claim is made.
- TasteSkill installation: **DEFERRED pending owner decision**.
- Dev-only audit/deprecation advisory described above should be rechecked when the Next lint plugin chain supports ESLint 10 or ships a patched glob chain.

## 11. Source and asset integrity

- `git diff --name-only HEAD -- docs planning/production assets-final BIRTHDAY_SVG_REV5 font` returned no paths after setup.
- No canonical source, LOCKED document, CP-00B production report, SVG, manifest, font, Vault file, runtime helper, or production asset was edited, moved, deleted, normalized, or copied.
- No source assets were imported by the placeholder, and no production asset is exposed under a public URL.
- `SVG_PRODUCTION_BASELINE_LOCKED`, `VAULT_V2_INTEGRATION_CANDIDATE`, `EDITORIAL_SURFACE_FIRST`, personal-content HOLD, and all existing source freezes remain unchanged.

## 12. Recommended next checkpoint

Stop at CP-01A. After explicit owner acceptance of this dependency baseline and the documented dev-tooling advisory, authorize a separately bounded CP-01 runtime-architecture checkpoint. Do not begin scenes, design implementation, or asset deployment from this report alone.
