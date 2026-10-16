# BIRTHDAY EXPERIENCE — PRODUCT REQUIREMENTS DOCUMENT

> **Document:** `PRD.md`  
> **Version:** 1.0 — FINAL PRODUCT REQUIREMENTS BASELINE (implementation-ready; not a claim of completed software)  
> **Decision recorded:** **Access Option A — unlisted direct URL, without login** (approved 2026-10-09).  
> **Relationship:** Read together with `DESIGN_SYSTEM.md` v1.0 and its 14 authoritative source documents.  
> **Status vocabulary:** **LOCKED** = existing approved source / user decision; **PRD REQUIRED** = testable product contract derived from them; **PROPOSED IMPLEMENTATION** = engineering recommendation to validate; **PENDING CONTENT** / **PENDING PROTOTYPE** = explicit unresolved inputs; **MUST PASS** = release gate, not a test result.  
> **Purpose:** Specify *what* the private birthday experience must do, for whom, under which constraints, and what evidence is required to accept the prototype. Visual/art-direction implementation belongs to the Design System; runtime details belong to the Tech Spec.

---

## 0. Executive decision / implementation brief

**Build one mobile-first, full-screen, scene-based interactive birthday gift for one recipient.** The birthday experience must be emotionally complete through Scene 08. Only if the recipient deliberately opts in does the experience lead to a hidden layer, a narrative PIN (`011007`), a mechanically opening 3D Vault, and a separately opened letter containing a calm, non-demanding confession.

**Product thesis (LOCKED):** *This is not a birthday website. It is a private interactive birthday experience.*  
**Experience/art identity (LOCKED):** *Warm Kinetic Editorial Keepsake* / *A Keepsake That Slowly Opens*.  
**Primary device:** mobile browser; desktop supported.  
**Navigation:** one runtime, twelve scenes, not twelve routes.  
**Distribution (NEW USER-APPROVED DECISION):** link supplied privately; no account creation, password gate, email verification, or login.  
**Privacy reality:** an unlisted URL is **not authenticated access**, `robots`/`noindex` are not security controls, and a client PIN is **not a secret or access-control system**. Users with the URL, browser tools, or static asset URLs may access content. Do not promise confidentiality. If stronger confidentiality becomes a requirement, stop and request a separate product decision rather than implementing an unapproved login/backend.

### 0.1 Success definition

A successful prototype is one where a real recipient can:

1. Open the link directly and experience a complete birthday gift through Scene 08.
2. See their genuine, approved photo(s) and confirmed name, not fabricated personal history.
3. Decorate one responsive cake, carry that exact result to Make a Wish, and extinguish its candles without a microphone.
4. Read the birthday letter at their own pace and stop there without being pressured toward the hidden story.
5. Optionally discover a second invitation, intentionally cross the hidden boundary, enter the narrative PIN, watch the Vault **physically open** on capable hardware (or use an equivalent accessible fallback), and separately choose to open the hidden letter.
6. Read the confession without any yes/no prompt, reply demand, timer, countdown, forced sharing or tracking, and end/close/replay safely.

A visually attractive demo that fails any mandatory journey or accessibility fallback is **not accepted**.

### 0.2 Document precedence

1. Locked Final Flow and consent/narrative boundaries.
2. Tech Spec's core runtime/fallback contracts (provisionally locked where marked).
3. Design Direction and the ten domain fragments (color through Vault).
4. Locked Scene-by-Scene art direction.
5. Consolidated `DESIGN_SYSTEM.md` for implementation vocabulary, integration and acceptance gates.
6. This PRD for product functionality, verified access decision, release gates, dependencies and backlog.

If the PRD appears to change a LOCKED creative or story rule, **escalate and document the conflict**; do not silently replace the source. For qualified names use `material.M1–M5`, `motion.M0–M5`, `texture.T0–T2`, `transition.T1–T4`, `shadow.S0–S3`, `photo.P1–P4`.

---

## 1. Product context, intended audience and goals

### 1.1 Audience and use context

**Primary audience:** a single known recipient accessing a birthday surprise through a personal link, primarily on a phone, possibly with audio muted, limited connectivity, reduced-motion enabled, or without WebGL/microphone permissions. **Creator/owner:** the person preparing and providing the gift content and approving its accuracy and presentation. **Implementer:** frontend, interaction, SVG and 3D producers using the document set. These are product roles, **not** account roles or auth identities.

### 1.2 Product objectives

| ID | Outcome | Evidence |
|---|---|---|
| OBJ-01 | Birthday-first completion independent of confession | S01→S08 complete, end/replay usable, no forced S09 |
| OBJ-02 | Genuine personalization | Confirmed recipient name, approved actual portrait(s), verified letter/captions |
| OBJ-03 | Responsive tactile interaction | Cake editing, wish interaction, keyboard alternatives and recovery |
| OBJ-04 | Earned optional revelation | Explicit discovery, PIN, articulated 3D door/fallback, separate letter action |
| OBJ-05 | Cohesive premium editorial identity | Conformance to approved Design System and scene allocation |
| OBJ-06 | Operability on mobile and constrained browsers | Full fallback/QA matrix passes |
| OBJ-07 | Respectful consent and privacy expectations | No automatic confession, unlisted-link risk honestly acknowledged, no invasive tracking |

### 1.3 Non-goals — out of scope for v1

- Accounts, authentication, sign-in, user profiles, roles, database or backend merely to serve a one-off gift.
- Payment, purchases, gifts marketplace, social feed, comments, likes, messaging, real-time chat, forced reply collection or analytics dashboards.
- Separate route per scene; generic landing-page scrolling; gallery/carousel; cake-building game, economy, achievements or leaderboards.
- AI-generated memories, invented photos, face redesign, fake shared events or automatically generated confession sent without creator approval.
- AR/VR, full WebGL cake, game-like Vault puzzle, hyper-realistic bank safe, mandatory microphone, mandatory audio, mandatory haptics.
- Unapproved libraries, brand themes, animations, decorative motifs, colors, fonts, or extra scenes.

---

## 2. Scope and prioritization

### 2.1 Priority legend

- **P0 / MUST:** without this, product/story, dignity or basic operability fails. All P0s block release.
- **P1 / SHOULD:** approved polish/supporting functionality necessary for the intended quality; required for visual final sign-off unless an explicit issue and alternative are approved.
- **P2 / MAY:** progressive enhancement only; never a prerequisite for completing story or user tasks.

### 2.2 Global product requirements

| ID | Priority | Functional requirement | Acceptance / test |
|---|---|---|---|
| PRD-G01 | P0 | Exactly twelve numbered logical scenes in one scene runtime, full-screen compositions | All twelve reachable through authorized events; no added scene/route |
| PRD-G02 | P0 | Birthday-first; S08 is a legitimate complete ending | From S08 user can end or replay; no hidden-entry requirement |
| PRD-G03 | P0 | Optional hidden content needs deliberate positive input and separate letter-opening permission | Passive waiting, ordinary scroll and PIN completion alone never reveal confession |
| PRD-G04 | P0 | Use real readiness and progressive loading; never fake load progress | Fast network does not suffer unjustified delay; slow failure has recovery |
| PRD-G05 | P0 | Persist one source of truth for scene, cake, letter, PIN status and audio preference | Rapid events, navigation and fallbacks cannot desynchronize visible state |
| PRD-G06 | P0 | All mandatory tasks usable by touch, pointer/mouse and keyboard/non-drag accessible controls | End-to-end flows completed with keyboard and without audio/mic/WebGL |
| PRD-G07 | P0 | Support reduced motion and low-capability fallback | Full tasks reachable under reduced motion / no WebGL |
| PRD-G08 | P0 | Personalized copy/media must be verified before final deployment | Content audit lists no invented details, placeholder copy or unapproved media |
| PRD-G09 | P0 | No capture of romantic answer, data analytics on PIN/text, tracking, or mandatory reply | Code/network inspection; no submission mechanisms |
| PRD-G10 | P0 | User can mute/unmute optional audio and complete experience entirely silent | Mute persists between scenes; blocked audio never blocks next action |
| PRD-G11 | P0 | Per-scene transitions are guardable, cancellable where safe and single-commit | Double tap/drag cannot skip scenes, duplicate actions or dead-end |
| PRD-G12 | P0 | Unlisted direct URL opens without registration or login | Fresh/incognito browser loads link without auth |
| PRD-G13 | P1 | Visuals follow master tokens, motif rules, material/depth/motion constraints | Design audit per scene against `DESIGN_SYSTEM.md` |
| PRD-G14 | P1 | Optional sound cues correspond to semantic events, not animation timers | Skipped/interrupted animations do not leave orphan audio |
| PRD-G15 | P1 | Allow coherent replay from the beginning with controlled reset | Replay clears scene/PIN/letter/wish and restores default cake on full replay |
| PRD-G16 | P1 | Maintain consistent affordances for utility controls and focus visibility | Visual and keyboard audit on mobile/desktop |

### 2.3 Confirmed access/distribution policy (Option A)

**P0: no login or password gate before S01.** Share a direct HTTPS URL privately with the recipient. Avoid public navigation links or intentional broad promotion. **Recommended operational configuration (not access protection):** search-engine `noindex, nofollow`, no public sitemap entry for this page, restrained social-preview metadata and no personal secrets in public metadata; review host deployment preview exposure and public file names. Final domain/slug/hosting account are **PENDING DEPLOYMENT**. If content is hosted client-side, assume a technically capable visitor with the URL can inspect assets and the PIN and can potentially access hidden-letter bytes; CSS concealment and dynamic imports only control presentation and loading, **not confidentiality**. Do not describe the site as access-restricted or encrypted. Obtain creator review for the privacy implications before publishing approved photographs and confession.

**No new auth feature may be inferred from the word “private.”** If creator later requests restricted viewing, change request required.

---

## 3. Canonical narrative map and state guard rules

```text
S01 Prelude
 -> S02 Invitation [shell ready]
 -> S03 Birthday Reveal [explicit Open]
 -> S04 Portrait [reveal completed + intentional Continue]
 -> S05 Cake Studio [Continue]
 -> S06 Make a Wish [Finish Cake]
 -> S07 Birthday Letter [candles extinguished + Continue]
 -> S08 Final Birthday Moment [user finished reading]
    ├─ End / Replay [birthday experience successfully complete]
    └─ Quiet Second Invitation [deliberate discovery]
          -> S09 Hidden Transition [gesture/accessible equivalent commits once]
          -> S10 Vault [transition prepared + 3D/fallback available]
          -> S11 Hidden Letter [valid PIN + mechanical opening reaches safe open state]
          -> S12 Confession [separate explicit user selection/open of paper letter]
                -> End / Replay [non-demanding, no forced response]
```

The portal can be visually prepared under S08 or S09 lifecycle, but **cannot create a thirteenth scene**. Each required input has a semantic action and clear result; incidental scroll is never a navigation intent.

**State invariants (P0):**

- `birthdayComplete` is true after successful S08 closure; this achievement cannot depend on `hiddenUnlocked`.
- `hiddenPortalArmed` ≠ `hiddenPortalCommitted` ≠ `vaultUnlocked` ≠ `letterSelected`; none implies a later user's consent.
- `cakeConfig@S06 === finalizedCakeConfig@S05`, including chosen styles and decoration locations.
- `wishExtinguished` is a semantic event at most once per wish cycle; visual smoke/glow alone cannot satisfy it.
- `vaultUnlocked` follows correct `011007` PIN and successful unlock state; model animation receives state, never implements PIN validation itself.
- `doorOpen` in capable rendering follows actual hinge rotation (with release sequence) and safe completed pose; lower-quality equivalence is visually distinct but functionally equivalent.
- `confessionVisible` can become true **only after** explicit letter selection/open event, not after the PIN or door animation.
- A full replay resets the narrative, finalized cake, wish, Vault, PIN and confession state consistently; user may choose mute persistently across replay (recommended behavior; confirm in prototype).

---

## 4. Scene-level functional requirements and acceptance contracts

**Common scene contract:** each scene defines a named entry gate, essential subject, user's available actions, valid exit, bounded/cancellable animation, adaptive mobile/desktop composition and at least one degraded-but-complete route. UX copy shown in examples is placeholder unless marked creator-approved.

### S01 — Loading / Prelude

**PRD-S01-01 [P0]** Initialize core app shell, minimal first two-scene assets, scene state and errors. Show purposeful branded prelude with accurate readiness behavior; avoid invented % progress and avoid artificial mandatory delay. Narrative target from art direction is a brief ~2–4s curiosity, **not** a mandatory wait or loading guarantee. **Exit:** critical shell ready → S02. **Failure:** display meaningful retry/recoverable state for critical failure; noncritical future assets can load lazily. **MUST PASS:** tests on fast and throttled networks; no endless loader.

### S02 — The Invitation / Open

**PRD-S02-01 [P0]** The recipient can activate a semantically accessible `Open` action (touch/click/Enter/Space). Interaction reveals the invitation and authorizes any initial optional sound in compliance with browser activation policies. Autoplay rejection leaves silent experience fully functional. **Exit:** explicit invitation activation → S03, one time. **MUST PASS:** no unsolicited audio; usable muted and keyboard-only.

### S03 — Birthday Reveal

**PRD-S03-01 [P0]** Display confirmed recipient name as central birthday reveal; handle long names/small viewports without clipping or covering text. Kinetic graphic treatment must be a visual enhancement, not an input gate. **Exit:** reveal reaches a readable settled state + accessible Continue action → S04. **Reduced-motion:** simple readable reveal; do not bypass birthday message. **MUST PASS:** confirmed name legible and accurate, default and reduced-motion.

### S04 — Portrait / Memory Moment

**PRD-S04-01 [P0]** Present one authentic, approved main portrait. Support **1–6 curated authentic images**, using a **two-photo layout baseline** and one-photo complete fallback; supporting photo slots are optional and never empty placeholders. No gallery/carousel requirement, fake image duplication, identity-distorting retouching or fabricated memories. **PRD-S04-02 [P1]** Preserve face-safe crop and accessible image description; optional extra photos must add actual narrative or compositional value. **Exit:** accessible Continue → S05. **MUST PASS:** one, two, four and six image fixture scenarios, including varying portrait aspect ratios; no distortion or empty scaffolds.

### S05 — Birthday Cake Studio

**PRD-S05-01 [P0]** Render **one single-tier Sculpted Celebration Cake**, lightweight DOM/SVG-first, tactile 2.5D; no mandated full WebGL cake. **PRD-S05-02 [P0]** Offer five curated customization families: frosting, candles, flowers, topper and accents. Exact SKU count and asset designs are PENDING; at least one functioning representative of each family is needed to verify the full interaction prototype. **PRD-S05-03 [P0]** Tap/select-and-place must work without dragging; optional drag uses valid snap zones, collisions, limits, and consistent hit targets. **PRD-S05-04 [P0]** Undo, remove and reset available, with confirmation for destructive reset; invalid placement gives understandable feedback and does not corrupt configuration. **PRD-S05-05 [P0]** Pressing Finish Cake commits exactly once and freezes editing for transit. **Layout:** mobile cake stage and non-occluding contextual bottom tray; desktop asymmetric cake + side controls. **MUST PASS:** no double decoration, overlap errors, hidden valid targets or unintentional resets. **Exit:** Finish Cake → S06.

### S06 — Make a Wish

**PRD-S06-01 [P0]** Receive exact finalized CakeConfiguration from S05, not an independently created default cake. **PRD-S06-02 [P0]** Candles ignite when scene transitions into wish state; provide understandable, accessible **tap/hold extinguish** regardless of microphone permission. **PRD-S06-03 [P2]** Microphone blowing may be offered as a clearly optional enhancement after permission; rejection/unavailability must not worsen touch completion. **PRD-S06-04 [P1]** Use restrained flame/smoke/emotional payoff without heavy obligatory effects; user can take as long as they want to wish. **Exit:** validated extinguish event + intentional continue → S07. **MUST PASS:** exact decoration parity, muted sound, no microphone and duplicate input scenarios.

### S07 — Personal Birthday Letter

**PRD-S07-01 [P0]** Display **approved birthday-only letter** with genuine friendship, wishes and appreciation. It must not reveal or imply mandatory confession in this section. **PRD-S07-02 [P0]** Calm editorial reading layout using the approved typographic roles; readable at mobile font zoom and with keyboard/screen reader. Scrolling text in a local reading region is permitted if necessary; it is not main scene navigation. **Exit:** user-initiated Continue after reading → S08. No auto-advance, forced reading speed, letter-by-letter gating or countdown. **MUST PASS:** long copy readable to end, navigation not obscured.

### S08 — Final Birthday Moment / genuine closure

**PRD-S08-01 [P0]** Offer a complete and emotionally satisfying birthday ending regardless of whether Hidden World is accessed. Include functional stop/close/replay choice appropriate to browser environment (do not pretend browser tab can be programmatically closed if blocked). **PRD-S08-02 [P0]** A subtle **Quiet Second Invitation** may be discoverable, but cannot automatically transition from passive waiting or merely seeing a clue. **PRD-S08-03 [P1]** Two-stage interaction: explicit clue activation arms a portal; the user then commits via purposeful gesture or equivalent. Do not add scene 08.5/13. **MUST PASS:** waiting, doing nothing, and clicking End never reveal hidden confession; discovery remains accessible to intentful user.

### S09 — Hidden Transition

**PRD-S09-01 [P0]** Intentional swipe/drag across a scene-specific portal surface or a clearly accessible alternative must commit exactly once; ordinary document scroll cannot trigger it. Below-threshold or cancelled gestures restore safe pre-commit state. **PRD-S09-02 [P1]** One primary `transition.T4` immersive zoom belongs to intentional S08→09 handoff, with reduced-motion replacement. Exact swipe direction, threshold, distance and camera timing are PENDING PROTOTYPE. **Exit:** commit and Vault preload/fallback readiness → S10. **MUST PASS:** keyboard alternative, interrupted drag, threshold and reduced-motion tests.

### S10 — The Vault

**PRD-S10-01 [P0]** Display The Quiet Keepsake Vault, preferably as **externally authored GLB** with independently rigged mechanical core/ring, door pivot and chamber. Valid 3D path must have an actual animated hinged door: lock release → coordinated mechanical movement → physical door rotation → stable open pose with visible folded letter. **Static door replacement is prohibited on capable main 3D mode.** **PRD-S10-02 [P0]** Visual-integrated but accessible DOM numeric keypad; exact narrative PIN is `011007`, not a security boundary. Accept touch, mouse, keyboard; incorrect code responds quietly in Indonesian/approved locale, is recoverable, and does not start opening. **PRD-S10-03 [P1]** Small camera dolly during introduction; camera settles before PIN interaction. No pointer-controlled camera circus or camera movement obscuring hit zones. **PRD-S10-04 [P0]** Full 3D → lighter rendering (reduce lighting/shadows first) → 2.5D → DOM fallback as capability requires. All variants support PIN, a legible opening state and letter access. **Exit:** correct PIN and safely completed opening → S11; confession not opened. **MUST PASS:** real pivot/rig animation on capable hardware, error retry, no WebGL case, no skipped mandatory consent.

### S11 — The Hidden Letter

**PRD-S11-01 [P0]** After Vault is open, folded *physical paper keepsake* is visible and selectable. This scene must remain in a stable letter-visible state indefinitely until the recipient elects to act. **PRD-S11-02 [P0]** A distinct explicit tap/click/keyboard **Open Letter** selection moves the paper into a readable editorial surface and only then authorizes S12. 3D mesh raycasting cannot be the sole accessible hit target. **MUST PASS:** valid PIN without letter selection never exposes confession; same in WebGL and DOM fallback.

### S12 — Confession Ending

**PRD-S12-01 [P0]** Reveal approved honest, calm, non-demanding confession, only after S11 letter opening. Maintain freely paced readable text; user may close/end/replay. **PRD-S12-02 [P0]** Absolutely no Yes/No, accept/reject, forced reply, romantic countdown, response collection, messaging action or “must answer” UI. **PRD-S12-03 [P1]** Calm emotional resolution and return to general birthday wishes are allowed; not a second pressure-filled finale. **MUST PASS:** voluntary reading, stable end with no reply, full replay or close behavior.

---

## 5. Cross-cutting interaction and data contracts

### 5.1 State authority and transition guards

**PRD-STATE-01 [P0]** Implement one typed state source (Zustand per Tech baseline) for current scene, portal stage, cake configuration, wish status, Vault state, letter selection and audio preference. GSAP/Motion may animate states but cannot become authoritative state storage. Require guards for all transitions; repeated actions should be ignored with coherent UI feedback, not re-executed. The app must not enter a state in which neither recovery nor navigation is available.

**PRD-STATE-02 [P0]** Control interruption: cancel/prevent stale scheduled events on scene exit and tab visibility change, clean up listeners/timelines, restore or finish safe physical states. Focus loss during drag must cancel or commit deterministically. This must not accidentally commit Hidden World or fire multiple candle/Vault completion events.

**PRD-STATE-03 [P0]** Full replay starts the gift over coherently: reset progression, hidden state, PIN status, camera/door, paper, cake, wish. Proposed preference: preserve user mute choice across replay unless usability testing suggests otherwise.

**PRD-STATE-04 [P1]** Component focus and aria announcements follow actual action completion rather than animations; ensure there are no invisible trapped elements after transitions.

### 5.2 Cake state contract (conceptual, non-binding exact fields)

Store base frosting selection, candle type/positions, flower instances, topper, accents, valid normalized anchors and state history. Editing operations (`apply`, `place`, `remove`, `undo`, `reset`) must be atomic; finishing commits a snapshot. Scene 06 renders from that snapshot. Decoration compatibility/spacing validation belongs to a dedicated validator, not the renderer. A simplified fallback renderer reads the same snapshot. Exact object types, layout coordinates, asset names and count limits remain PENDING PROTOTYPE.

### 5.3 Vault state contract

`loading → ready → pinEditing → invalidRetry | accepted → releasing → doorOpening → open → letterVisible → letterSelected`. Pin validation must be decoupled from GLB asset and camera logic. In primary mode `doorOpening` means actual hinge pivot rotation; the implementation must verify clearance against the body. Fast-forward may accelerate animation only after valid PIN and cannot trigger letter selection. Failure in GLB loading should switch to functional fallback rather than indefinite spinner.

### 5.4 Content and media configuration

**PRD-CONTENT-01 [P0]** Keep final strings and asset manifest separately reviewable from scene rendering code; do not bake assumptions about name length, age, date, relationship, or personal events into UI components. **PRD-CONTENT-02 [P0]** Creator approval required for real birthday message, closing message, confession, portrait captions, any remembered event and PIN hint. **PRD-CONTENT-03 [P0]** Photograph source permission/context must be checked; remove unnecessary EXIF and third-party personal data. **PRD-CONTENT-04 [P1]** Select a consistent recipient-facing language and review all CTA, hints, accessibility labels and error text. The existing Vault invalid-PIN feedback should be natural Indonesian unless the creator deliberately approves another locale. **PRD-CONTENT-05 [P1]** Audio/font/imagery rights and final media licensing reviewed before release.

**Not approved yet:** actual recipient name, birth date/age, the real-world significance of PIN `011007`, number/selection of usable photos, exact stories since 2022, final letter, confession, button copy, music, hostname and art asset exports. No developer/AI agent should fill these with invented personal facts.

### 5.5 Media and asset loading

- Phase-loading follows Tech Spec: shell/invitation first; portrait and cake when upcoming; Vault GLB/lighting/audio later, without blocking early birthday scenes.
- Font source archives in the creator's local folder do not by themselves establish correct WOFF2 deployment. Confirm actual build assets, glyph coverage and licensing; self-host font roles as defined in Design System.
- Use Next/Image for real responsive photo assets; preserve focal points and dimensions, support missing/low-res sources gracefully; do not ship blank frames.
- GLB asset should contain clear animation pivots and independently addressable sections; optimize in browser, not only in modeling tool.
- No hidden critical story dependency may silently remain unavailable while the app appears ready.

---

## 6. Nonfunctional requirements (NFRs)

| ID | Priority | Product requirement | Verification |
|---|---|---|---|
| NFR-01 | P0 | Mobile-first usable down to a compact 320px-class viewport and short height, with safe-area support | Manual/automated layout capture; no concealed cake, PIN, close or letter controls |
| NFR-02 | P0 | Keyboard completion and visible focus for all required actions; no gesture-only dead ends | Keyboard-only path S01→S08 and opt-in S09→S12 |
| NFR-03 | P0 | Reduced motion retains meaning and feedback while removing heavy zoom, camera, parallax and nonessential choreography | OS prefers-reduced-motion end-to-end test |
| NFR-04 | P0 | Sound off, audio autoplay denial and microphone refusal never interrupt core journey | Browser permission tests |
| NFR-05 | P0 | WebGL unavailable, context lost, GLB load failed or GPU downgrade never prevent PIN→letter→confession | Forced capability/failure fixture tests |
| NFR-06 | P0 | Accessible reading with zoomable text and local scrolling as necessary; no automatic advance | Long letters, zoom, screen reader and keyboard |
| NFR-07 | P0 | No scene completion depends on fixed wait for emotional content | User may pause indefinitely at wish, letter, ending or Vault |
| NFR-08 | P0 | No false assertion of secure access: private-share URL is unlisted, not authenticated | Deployment review, metadata and asset accessibility audit |
| NFR-09 | P1 | Aim for WCAG AA where applicable, contrast on actual composed surfaces, meaningful alt text | Accessibility audit; exceptions documented |
| NFR-10 | P1 | Avoid visible jank on representative mobile devices; prioritize stable responsiveness over high-fidelity lighting | Measured FPS/input latency/device profile; thresholds set after baseline prototype |
| NFR-11 | P1 | Avoid expensive early asset load; lazy load Vault and noncritical graphics | Network waterfall inspection, bundle/load profile |
| NFR-12 | P1 | One major T4 only; GSAP and Motion each own distinct properties/DOM boundaries | Motion and lifecycle audit; cleanup tests |
| NFR-13 | P1 | Appropriate alt/fallback when assets missing, no broken image and no dead-end | Missing portrait/font/audio/SVG tests |
| NFR-14 | P1 | Support current evergreen mobile and desktop browsers chosen for QA | Device/browser matrix before release |

**Quantitative performance targets remain PENDING PROTOTYPE.** Do not fabricate LCP/FPS/memory/bundle claims before profiling a real build. Report actual device/browser/environment and measured results when QA is performed.

---

## 7. Error handling and recovery matrix

| Failure/edge case | Expected user-visible outcome | P0 acceptance |
|---|---|---|
| Critical shell cannot load | Retry/clear recovery message; no infinite pseudo-loader | Recover or surface honest failure |
| Supporting visual SVG/photo missing | Approved safe fallback or hide optional slot; image identity not fabricated | Flow stays usable |
| Only 1–2 real portraits available | Curated hero and optional support; no emptiness/gallery artifice | S04 complete |
| Font file missing/loading late | Legible fallback without irreversible clipping | Interactions and text remain readable |
| Optional music fails / autoplay blocked | Continue silently; mute remains coherent | No audio gate |
| Drag cancelled/touch interrupted | Snap back or valid commit, not stranded décor | Store remains valid |
| Decoration collision/invalid placement | Human-readable feedback; no broken cake | No invalid persisted state |
| User tries Continue twice | Single transaction; visible busy/completed state | No double transition |
| Microphone denied/unavailable | Tap/hold candle works identically | S06 completes |
| Idle time at Birthday finale | Stays a full ending; never auto-opens Hidden World | No unauthorized consent |
| Hidden gesture below threshold | Portal resets/returns to armed state safely | No accidental entry |
| Hidden gesture blocked by motor limitation | Accessible non-drag button/control path | Equivalent intent preserved |
| Vault GLB slow or fails | Quality tier or 2.5D/DOM, recoverable progression | PIN and letter reachable |
| WebGL context lost mid-open | Resolve to safe open/closed equivalent in fallback | No duplicate PIN/confession event |
| PIN incorrect | Discreet retry state, no unlock and no deceptive security messaging | User can re-enter PIN |
| PIN rapid submissions | At most one accepted unlock, no multiple door timelines | Stable state |
| Scene leaves during audio/motion | Cancel sound/timeline and clean up | No ghost effects |
| User does not select Vault letter | Letter stays available, confession remains hidden | Consent upheld |
| Extra-long letter/recipient name | Reflow + accessible local reading | No text clipped or covered |
| Complete replay | Reset progression, cake/wish/Vault/letter and timers coherently | Same experience can run again |

---

## 8. Product acceptance tests — executable manual scenarios

The canonical 12 Design System gates **G01–G12** are all mandatory. Each maps to concrete PRD tests; check PASS only after actual execution.

| Test ID | Steps / scenario | Expected result | Gate |
|---|---|---|---|
| AT-01 | Open unlisted URL in fresh private browser | S01 loads without login/password; no leaked sensitive metadata assumed | PRD-G12, G01 |
| AT-02 | Use slow then fast network, including noncritical asset delays | Real readiness; no forced fake loading or infinite dead-end | G01 |
| AT-03 | Before tapping invitation, attempt autoplay; then Open with keyboard | No surprise sound; valid Open enters Birthday Reveal | G02 |
| AT-04 | Test long confirmed display name, small viewport, reduced motion | Correct complete birthday name legible | G03 |
| AT-05 | Test manifests with 1/2/4/6 genuine images | One stable hero, no vacant slots/gallery, preserved face | G04 |
| AT-06 | Cake: apply five categories via touch/mouse/keyboard; drag cancel; undo/reset confirmation | Responsive valid model; consistent preview; no destructive surprise | G05 |
| AT-07 | Finish cake, compare S05 snapshot with S06; disable mic/audio | Identical model; touch/hold extinguish works once | G06 |
| AT-08 | Read long Birthday Letter without interaction for several minutes | Remains accessible and never auto-scrolls/auto-advances | G07 |
| AT-09 | Arrive S08, wait, choose End or Replay | Birthday closure succeeds; Hidden World remains optional | G08 |
| AT-10 | Arm hidden portal, cancel drag, scroll page, retry with keyboard equivalent | No accidental commit; one deliberate T4 to S09 | G09 |
| AT-11 | Vault incorrect PIN then `011007` on capable WebGL | Quiet retry; segmented release and actual articulated hinge door opens once | G10 |
| AT-12 | Repeat AT-11 with WebGL disabled/GLB failure and reduced motion | Equivalent PIN/open/letter state; no dead end | G10 |
| AT-13 | Wait in letter-visible state without tap; then explicitly Open Letter by keyboard | No confession before selection; S12 after selection | G11 |
| AT-14 | Read S12 silently, inspect interaction controls | No forced reply/yes-no; close/end/replay works | G12 |
| AT-15 | Replay after having completed Hidden World | Cake, wish, PIN, letter, portal and scene reset safely | G05/G06/G08/G10/G12 |
| AT-16 | Validate deployment metadata and assets | No login, no accidental public indexing promotion, no false confidentiality claim | NFR-08 |
| AT-17 | Run complete path at zoom/reduced motion, with muted audio and keyboard only | All narrative choices and required actions operable | NFR-02/03/04/06 |
| AT-18 | Run source and UI audit against `DESIGN_SYSTEM.md` | No forbidden new colors/fonts/UI motifs or extra story scenes | PRD-G13 |

**Pass rule:** all P0 requirements and G01–G12 must pass on the chosen supported device/browser matrix, with evidence attached. Aesthetic review cannot replace functional QA. P1 gaps must be logged with impact, explicit approval and an actionable resolution before final gift release. Optional P2 omissions are not blockers.

---

## 9. Design and content acceptance policy

- `DESIGN_SYSTEM.md` and originating fragments determine color, type, shapes, material, texture, photo authenticity, cake sculpting, Vault art and scene-specific choreography. This PRD does **not** create new visual tokens.
- Each scene must have one primary focus, coherent light-to-deep narrative progression and no unnecessary visual systems. Avoid generic birthday-template visuals, card dashboards, scrapbook/polaroid tropes, pink-gold wedding aesthetics, cyberpunk Vault, expensive particles and gratuitous WebGL.
- The signature 3D door opening is **mandatory in capable primary mode**. Simplified alternative is **mandatory for limited hardware/reduced motion**. These are compatible conditions, not an exemption to skip engineering the primary rig.
- The recipients' emotional comfort outranks spectacle. User intent outranks decorative animation. Never force them to continue to confession or to respond to it.
- All user-facing copy requires a deliberate single-language editorial pass. Internal technical labels and working English concept names do not automatically become production UI text.

---

## 10. Deliverables, milestones and ownership

These are **recommended implementation milestones** aligned to Design System P0–P6. They describe delivery order, not a calendar commitment.

| Phase | Scope & deliverable | Exit condition |
|---|---|---|
| M0 — Source and content setup | Import 14 canonical files, `DESIGN_SYSTEM.md`, this PRD; confirm font assets, content/asset manifest, approved URL access policy | No untracked LOCKED rule; pending personal copy clearly tracked |
| M1 — Narrative skeleton | Next.js/React/TS, 12 states, typed guards, focus-safe transitions, replay, 2-stage hidden discovery | All scenes traversable with simple placeholders; S08 standalone |
| M2 — Visual foundation | Approved palette/type/Phosphor/Offset Loop, responsive composition, actual 1/2 photo handling | S03/S04/reading scenes coherent on mobile and desktop |
| M3 — Cake vertical slice | DOM/SVG single-tier render, five category samples, valid placement, undo/reset, identical S06 cake, touch extinguish | G05–G06 verified without mic/audio |
| M4 — Vault/Hidden vertical slice | Portal, T4 safe intent gate, DOM PIN, GLB rig with real door articulation, paper and explicit selection, 2.5D/DOM fallback | G08–G12 end-to-end, including no WebGL |
| M5 — Motion/audio/art polish | GSAP/Motion ownership, scene timing, cake/Vault material polish, sound, GLB optimization, adaptive tiers | All enhancements preserve interaction and narrative clarity |
| M6 — Content and release QA | Real approved copy/media, cross-browser tests, accessibility/contrast, licensing/privacy review and deployment check | All P0 and G01–G12 pass with evidence; owner signs off |

**Accountabilities (roles, not system logins):** creator/product owner approves personal writing, images, emotional boundaries and final sharing; frontend implementer owns scene/cake/portal/keypad state and accessibility; 3D artist/engineer owns GLB rig/door clearance/materials; design QA checks identity; QA verifies scenarios. One person or AI-assisted workflow may cover several roles, but approval and evidence responsibilities remain distinct.

### 10.1 Definition of Ready (implementation)

- This PRD + `DESIGN_SYSTEM.md` and the originating 14 docs accessible in project `docs/`.
- Twelve-scene map, narrative guards, PIN and user-approved unlisted URL scope unambiguous.
- Content schema exists; unapproved entries distinctly marked and not mistaken for real data.
- Valid temporary development visuals can demonstrate interaction without falsely representing recipient photos/letters.
- Component/state/module separation agreed before heavy art production.

### 10.2 Definition of Done (prototype)

- App runs and completes all core journeys, including optional hidden path, on agreed browser/device fixtures.
- Entire Birthday World works if Hidden World is never entered.
- Personal content is genuine and signed off for any final-share build; prototype demo may use clearly labeled neutral stand-ins not shipped as facts.
- All twelve scene gates G01–G12 plus access/security expectation and critical error fallback tests pass.
- Main capable 3D mode **actually** animates independently rigged Vault lock and hinged door; alternatives work without WebGL.
- Identical finalized cake data passes from Scene 05 to Scene 06; touch/hold extinguish never requires a microphone.
- No inaccessible interactions, forced time limits, forced romantic response or accidental Hidden World transition.
- Audio/motion are optional enhancements; resources/timelines clean up correctly.
- No unapproved color/font/icon/shape/scene redesign or unexplained dependencies.
- Creator reviews public link exposure, final photo/content provenance, license/metadata and final URL before sharing.

**Final gift-release approval** is a separate event from **prototype runnable**: a functioning prototype does not imply actual portraits, content, assets, licensing, deployment, accessibility or benchmarks are finalized.

---

## 11. Open issues / explicitly PENDING registers

### 11.1 PENDING CONTENT — owner must supply/approve

| ID | Input | Blocking when? |
|---|---|---|
| PC-01 | Recipient confirmed display name / spelling | Final Birthday Reveal/share |
| PC-02 | Birth date / age, if used; meaning of `011007` | Only if referenced in copy/PIN hint |
| PC-03 | Selected approved portrait(s), quality, crop and captions | Final personalized portrait scene |
| PC-04 | True friendship memories and safe description of relationship | Personal letter/copy |
| PC-05 | Birthday letter and S08 closure | Final birthday delivery |
| PC-06 | Hidden clue and non-coercive confession | Final hidden delivery |
| PC-07 | Complete recipient-facing language, labels and error strings | Final content QA |
| PC-08 | Audio soundtrack and sound-effects rights, if included | Audio-enabled release |
| PC-09 | Final hosting link, recipient-sharing intent, privacy review | Publication |

### 11.2 PENDING PROTOTYPE — do not silently hardcode as LOCKED

| ID | Calibration item | Decision method |
|---|---|---|
| PP-01 | Breakpoints, stage dimensions, typography sizes, safe areas | Mobile/desktop responsive review |
| PP-02 | Per-scene exact timing/easing and gesture threshold | Usability + reduced-motion test |
| PP-03 | Portrait masks, focal points, crop/asset export sizes | Actual photos and viewport QA |
| PP-04 | Cake detail, exact decoration variants/counts and anchor/collision map | Renderer/UX iteration |
| PP-05 | S06 microphone enhancement design, optional | Permission/reliability test; no dependency |
| PP-06 | Final GLB rig/geometry/material, shadows, camera and letter placement | Real R3F/WebGL production review |
| PP-07 | GPU tier thresholds, downgrade and load budgets | Profiling on test devices |
| PP-08 | Actual music cues, animation synchronization, attenuation | Hearing/UX review |
| PP-09 | Final copy length and local scrolling treatment | Content/reading QA |
| PP-10 | Production deployment provider, hostname and slug | Owner + hosting review |
| PP-11 | Browser support/device fixture and measured metrics | QA planning |

### 11.3 Changes requiring explicit approval

New user accounts/auth, moving/revealing the confession in S07/S08, altering PIN `011007`, adding a thirteenth scene, treating a carousel as Portrait, replacing cake with generic preset at wish, static swapping the capable 3D Vault door, forcing mic, inventing recipient memories/portraits, or adding a demand for romantic response all contradict the agreed product. File a change record first with source rule, rationale, impact, proposed replacement and approval status.

---

## 12. Traceability index (PRD → approved design sources)

| Requirement family | Authoritative source / section |
|---|---|
| Product vision, 12 scenes, birthday-first, consent and PIN | `BIRTHDAY_EXPERIENCE_FINAL_FLOW.md`; `DESIGN_SYSTEM.md` §§1–2, 11–12 |
| Runtime architecture, scene/store/asset lifecycle, sound/fallback | `BIRTHDAY_EXPERIENCE_TECH_SPEC.md`; `DESIGN_SYSTEM.md` §§14–15 |
| Emotion/visual direction and rejection list | `BIRTHDAY_EXPERIENCE_DESIGN_DIRECTION.md`; `DESIGN_SYSTEM.md` §1 |
| Palette/type/icon/shape/material/shadow | Approved D01–D06 fragments; `DESIGN_SYSTEM.md` §§3–6 |
| Motion ownership and portal T4 | Motion D07; Scene D11; `DESIGN_SYSTEM.md` §§7, 12–13 |
| Authentic adaptive 1–6 photo (2 baseline) | Photo D08; `DESIGN_SYSTEM.md` §8 |
| Cake design, persistence, touch wish | Cake D09; `DESIGN_SYSTEM.md` §9 |
| GLB-first Vault, genuine articulated door, letter | Vault D10; `DESIGN_SYSTEM.md` §10 |
| Scene roles, responsive and canonical twelve gates | Scene D11; `DESIGN_SYSTEM.md` §§11–12, 15, 18 |
| Unlisted URL, no login/password | **New explicit owner choice in this PRD (2026-10-09)**, compatible with source privacy caveat |

**Naming:** `D01–D11` refer to the same eleven `BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_*.md` files documented by basename in `DESIGN_SYSTEM.md` §0.2. D11 was recovered from the previously generated conversation file for design-system synthesis; the older ZIP originally contained 13 of 14 intended inputs. This provenance is preserved rather than silently rewritten.

---

## 13. Recommended project handoff and implementation instruction

Place this document beside the design master:

```text
theLast/
  docs/
    PRD.md                         # requirements, scope, scenarios and release gates
    DESIGN_SYSTEM.md               # design/integration source of truth
    SOURCES/                       # 14 source documents with their original names
    README.md
    MANIFEST.json
  font/                            # actual deployable files still require verification
  [Next.js source later]
```

**Instruction to implementation AI/developer:** Read `PRD.md` for **what, gates and acceptance**; read `DESIGN_SYSTEM.md` for **how it must look/feel/behave**; consult owning source fragments for details; use Tech Spec for approved stack. Build one end-to-end functioning narrative skeleton, then each vertical slice, and verify each gate before polish. Never treat PENDING content/art/performance values as confirmed. If a requirement conflicts with a LOCKED source, raise an issue rather than changing it in code. Do not introduce features or dependencies for their own sake.

> **Product decision:** deliver a complete personal birthday first; leave the more vulnerable layer accessible only through independent, freely chosen actions. Its power comes from the recipient being free to stop, continue, read or leave.

**END — PRD v1.0**
