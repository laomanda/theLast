# THE LAST — NEW CHAT BOOTSTRAP

Read `planning/handoff/THELAST_PROJECT_CONTINUITY_MASTER.md` before coding. Then read the relevant locked documents and current scene evidence. **Do not start coding, redesigning, or proposing architectural changes before reading the master handoff and relevant locked documents.**

## What this project is

theLast is a private, fullscreen interactive birthday keepsake: **A Keepsake That Slowly Opens**. Its identity is **Warm Kinetic Editorial Keepsake** and its production art direction is **EDITORIAL_SURFACE_FIRST**. It is a scene-based experience, not a landing page, dashboard, gallery, or public social product.

Birthday is the primary journey. The optional Hidden World is a deliberate final layer, not a surprise forced on every recipient. Personal photos, letters, and confession text require real owner authorization. S12 remains `CONTENT_PENDING`; the project is not release-ready.

## Authority and locked decisions

Read these first:

- `docs/PRD.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/OWNER_DECISIONS/FINAL_DESIGN_DIRECTION_LOCK.md`
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md`
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md`
- The relevant `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_*.md`

Final Flow owns narrative order and consent. Tech Spec owns runtime boundaries. PRD owns requirements and acceptance. Design System consolidates visual vocabulary. Fragments own their domains. Implementation Plan owns phases and evidence gates. Owner decisions govern their explicit scope only. Do not let an implementation note silently override a canonical source.

Locked principles include birthday-first storytelling, fullscreen scene composition, authentic approved assets, the three locked fonts, explicit consent, reduced motion, keyboard/fallback paths, replay, privacy, and no forced romantic reply. The Vault candidate is `assets-final/vault/runtime/vault-final.glb`; do not edit or copy it into packages.

## Two journeys

Birthday journey:

`S01 → S02 → S03 → S04 → S05 → S06 → S07 → S08 → End / Replay`

S08 is a genuine complete birthday ending. Hidden discovery is never required to finish the birthday.

Optional Hidden World:

`S08 → explicit discovery/arm → deliberate commit → S09 → S10 → PIN 011007 → S11 → explicit Open Letter → S12 → End / Replay`

Ordinary scroll cannot authorize S09. The Vault must not reveal confession automatically. S11 requires a separate letter-opening action. S12 must be quiet, user-paced, non-demanding, and must not request Yes/No or a romantic answer.

## Current implementation and evidence

Scene code exists in `src/ui/s01/` through `src/ui/s12/`. Runtime and state are in `src/runtime/` and `src/state/experience-store.ts`. Authorization is in `src/assets/authorization/`; release validation is in `src/release/`; evidence packaging is in `src/evidence/packaging/`.

Focused evidence exists for S01–S12. S09–S12 have the most recent refinement work. S12’s latest reading correction addresses desktop height allocation, final-line reachability, and clipped top glyphs; focused S12 browser verification recorded 7/7 passed, with typecheck, lint, unit, and build passing. That is not the same as final owner visual approval or release authorization.

Per-scene status is:

- S01–S08: implemented; refinement and visual approval are uneven and should be audited systematically.
- S09: implemented hidden transition; explicit intent and S10 boundary are preserved.
- S10: implemented Vault/PIN/fallback paths; technical and visual/performance approval remain separate.
- S11: implemented physical letter and explicit opening.
- S12: implemented reading surface and neutral fixtures; real confession content is `CONTENT_PENDING`.

The complete release validator remains `NOT_READY`. Never manufacture content approval, photo approval, performance certification, or owner sign-off.

## Required workflow

The owner requires:

**ONE SCENE → ONE FOCUSED PROMPT → REAL SCREENSHOTS → REVIEW → APPROVE OR TARGETED FIX → NEXT SCENE**

For every future task:

1. Read the locked scene specification.
2. Inspect current implementation and `git status`.
3. Identify the smallest scoped change.
4. Avoid unrelated runtime, design, asset, or architecture edits.
5. Run focused browser checks and capture real screenshots.
6. Separate technical test PASS from visual acceptance and owner approval.
7. Preserve accepted baselines and document unresolved issues.

Do not run heavy full-suite verification without a reason. Do not claim a full E2E PASS from discovered or started tests. Record exact exit codes and cleanup status.

## Next task: S01 refinement

The next authorized work is S01 visual refinement. Start with:

- `docs/PRD.md` S01 requirements
- `docs/DESIGN_SYSTEM.md` S01 section and accessibility/motion sections
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md` S01
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_TECH_SPEC.md` readiness rules
- `docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SCENE_BY_SCENE.md` S01
- `src/ui/s01/S01Prelude.tsx`
- `src/ui/s01/readiness.ts`
- `src/ui/s01/OffsetLoopOpen.tsx`
- `planning/evidence/CP01C1_S01_PRELUDE_EVIDENCE.md`

Do not start S02 or change the canonical documents during S01 refinement. The goal is a small, reviewable visual pass with actual mobile/desktop/reduced-motion screenshots and a precise report.

The comprehensive reference is `planning/handoff/THELAST_PROJECT_CONTINUITY_MASTER.md`. Use it as the continuity baseline for the new conversation.
