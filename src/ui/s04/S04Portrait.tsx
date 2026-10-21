"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { S04ReturningButterfly } from "./S04ReturningButterfly";

export const S04_RECIPIENT_NAME = "Malica Yohana Hutagaol";
export const S04_CTA_LABEL = "Lanjut";
export const S04_PHOTO_PATH = "/assets/photos/s04-portrait.webp";

type VisualPhase = "entering" | "stable" | "exiting";
type AccentId = "tape" | "star" | "flower" | null;

function S04PaperContinue({ disabled, onContinue }: { disabled: boolean; onContinue: () => void }) {
  return <button type="button" className="s04-paper-continue" onClick={onContinue} disabled={disabled} aria-busy={disabled} aria-label="Lanjut">
    <svg viewBox="0 0 250 78" aria-hidden="true" focusable="false"><defs><clipPath id="s04-cta-shape"><path d="M15 23 C26 12 53 10 86 13 L209 16 C229 17 240 29 237 43 C234 57 221 65 199 66 L52 70 C29 70 15 61 11 47 C8 36 9 28 15 23Z" /></clipPath></defs><path className="s04-cta-back" d="M17 28 C29 17 55 16 88 18 L215 21 C233 22 242 34 239 47 C236 60 223 69 201 70 L54 75 C31 75 17 66 13 52 C10 41 11 33 17 28Z" /><path className="s04-cta-base" d="M15 23 C26 12 53 10 86 13 L209 16 C229 17 240 29 237 43 C234 57 221 65 199 66 L52 70 C29 70 15 61 11 47 C8 36 9 28 15 23Z" /><g clipPath="url(#s04-cta-shape)"><rect className="s04-cta-fill" x="0" y="0" width="250" height="78" /></g><path className="s04-cta-outline" d="M15 23 C26 12 53 10 86 13 L209 16 C229 17 240 29 237 43 C234 57 221 65 199 66 L52 70 C29 70 15 61 11 47 C8 36 9 28 15 23Z" /><path className="s04-cta-wave" d="M22 58 C66 53 111 59 157 54" /><path className="s04-cta-badge" d="M201 23 L211 21 L219 27 L222 38 L217 49 L207 54 L197 50 L192 40 L195 29Z" /><path className="s04-cta-arrow" d="M199 38 H214 M208 32 L215 38 L208 44" /><text className="s04-cta-label" x="38" y="45">LANJUT</text></svg>
  </button>;
}

export function S04Portrait() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const identityRef = useRef<HTMLDivElement | null>(null);
  const actionRef = useRef<HTMLDivElement | null>(null);
  const decorRef = useRef<HTMLDivElement | null>(null);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const activationPendingRef = useRef(false);
  const mountedRef = useRef(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const [visualPhase, setVisualPhase] = useState<VisualPhase>(prefersReducedMotion ? "stable" : "entering");
  const [photoState, setPhotoState] = useState<"loading" | "ready" | "unavailable">("loading");
  const [actionError, setActionError] = useState<string | null>(null);
  const [activeAccent, setActiveAccent] = useState<AccentId>(null);
  const [butterflyInteracted, setButterflyInteracted] = useState(false);
  const [butterflyPromptSignal, setButterflyPromptSignal] = useState(0);

  const settlePose = useCallback(() => {
    const offsetMat = sceneRef.current?.querySelector(".s04-offset-mat");
    const targets = [stackRef.current, frameRef.current, offsetMat, portraitRef.current, identityRef.current, actionRef.current, decorRef.current].filter(Boolean);
    gsap.set(targets, { clearProps: "transform,opacity,clipPath,visibility" });
    setVisualPhase("stable");
  }, []);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; entryTimelineRef.current?.kill(); exitTimelineRef.current?.kill(); }; }, []);

  useLayoutEffect(() => {
    if (!sceneRef.current) return;
    const offsetMat = sceneRef.current.querySelector<HTMLElement>(".s04-offset-mat");
    const targets = [stackRef.current, frameRef.current, offsetMat, portraitRef.current, identityRef.current, actionRef.current, decorRef.current].filter(Boolean);
    if (prefersReducedMotion) { gsap.set(targets, { clearProps: "transform,opacity,clipPath,visibility" }); queueMicrotask(() => mountedRef.current && setVisualPhase("stable")); return; }
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      const offsetMat = sceneRef.current?.querySelector<HTMLElement>(".s04-offset-mat") as HTMLElement;
      entryTimelineRef.current = timeline;
      // All structural paper layers are visible together inside the parent stack.
      // Do not stagger opacity on frame, mat, or portrait: that causes late paper pop-in.
      timeline
        .set([frameRef.current, offsetMat, portraitRef.current], {
          opacity: 1,
          visibility: "visible",
          clearProps: "transform,clipPath",
        })
        .set(stackRef.current, { opacity: 0, y: 28, rotation: -3 })
        .set(identityRef.current, { opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" })
        .set(decorRef.current, { opacity: 0, scale: 0.8 })
        .set(actionRef.current, { opacity: 0, y: 12 })
        .to(stackRef.current, { opacity: 1, y: 0, rotation: -1.8, duration: 0.64 }, 0)
        .to(decorRef.current, { opacity: 1, scale: 1, duration: 0.48, ease: "back.out(1.1)" }, 0.48)
        .to(identityRef.current, { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)", duration: 0.56 }, 0.55)
        .to(actionRef.current, { opacity: 1, y: 0, duration: 0.38 }, 0.78)
        .call(() => mountedRef.current && setVisualPhase("stable"), [], 1.12);
    }, sceneRef);
    return () => { entryTimelineRef.current = null; ctx.revert(); };
  }, [prefersReducedMotion]);

  useEffect(() => runtimeTransitionCoordinator.register("CONTINUE", async (_event, target, signal) => {
    if (target !== "S05" || !sceneRef.current) return;
    entryTimelineRef.current?.progress(1).kill(); setVisualPhase("exiting"); if (prefersReducedMotion) return;
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const finish = (complete: boolean) => { if (settled) return; settled = true; signal.removeEventListener("abort", onAbort); if (complete) resolve(); else reject(new Error("S04 to S05 handoff was cancelled.")); };
      const onAbort = () => { exitTimelineRef.current?.kill(); if (mountedRef.current) settlePose(); finish(false); };
      signal.addEventListener("abort", onAbort, { once: true });
      exitTimelineRef.current = gsap.timeline({ onComplete: () => finish(true) }).to(actionRef.current, { opacity: 0, y: 8, duration: 0.2, ease: "power2.in" }, 0).to(identityRef.current, { opacity: 0, y: -9, duration: 0.28, ease: "power2.in" }, 0.06).to([decorRef.current, stackRef.current], { opacity: 0, y: -14, duration: 0.44, ease: "power3.in" }, 0.14);
    });
  }), [prefersReducedMotion, settlePose]);

  const handleContinue = async () => { if (activationPendingRef.current || experienceRuntime.isTransitionInFlight()) return; if (!butterflyInteracted) { setButterflyPromptSignal((current) => current + 1); return; } activationPendingRef.current = true; setActionError(null); const result = await experienceRuntime.dispatch({ type: "CONTINUE" }); if (result.status !== "committed" && mountedRef.current) { settlePose(); setActionError("Belum dapat melanjutkan. Silakan coba lagi."); activationPendingRef.current = false; } };
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => { if (prefersReducedMotion || visualPhase !== "stable" || event.pointerType !== "mouse" || !sceneRef.current) return; const rect = sceneRef.current.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5; gsap.to(frameRef.current, { x: x * 7, y: y * 5, rotationY: x * 2.2, rotationX: -y * 1.6, duration: .55, ease: "power2.out", overwrite: "auto" }); gsap.to(decorRef.current, { x: x * 12, y: y * 8, duration: .7, ease: "power2.out", overwrite: "auto" }); };
  const resetPointer = () => { if (prefersReducedMotion || visualPhase !== "stable") return; gsap.to([frameRef.current, decorRef.current], { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: .8, ease: "power2.out", overwrite: "auto" }); };
  const activateAccent = (accent: Exclude<AccentId, null>) => setActiveAccent((current) => current === accent ? null : accent);

  return <main ref={sceneRef} data-testid="s04-scene" data-visual-phase={visualPhase} data-reduced-motion={prefersReducedMotion ? "true" : "false"} data-photo-state={photoState} aria-labelledby="s04-title" className="s04-scene" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
    <div className="s04-paper-grain" aria-hidden="true" /><svg className="s04-lavender-ribbon" viewBox="0 0 1440 900" aria-hidden="true"><path d="M-40 705 C180 610 250 808 470 734 C681 663 766 545 986 650 C1150 729 1237 685 1485 585" /></svg>
    <section className="s04-composition">
      <div ref={stackRef} className="s04-photo-stack" data-testid="s04-frame"><div className="s04-cardstock s04-cardstock--apricot" aria-hidden="true" /><div className="s04-cardstock s04-cardstock--lavender" aria-hidden="true" /><div ref={frameRef} className="s04-frame-stage"><div className="s04-offset-mat" aria-hidden="true" /><div ref={portraitRef} className="s04-portrait-shell">{photoState !== "unavailable" ? <Image data-testid="s04-portrait-image" data-photo-role="single-authorized-portrait" src={S04_PHOTO_PATH} alt="Portrait of Malica looking toward the camera." width={900} height={1200} sizes="(min-width: 900px) 38vw, 82vw" priority onLoad={() => setPhotoState("ready")} onError={() => setPhotoState("unavailable")} /> : <div className="s04-photo-fallback" role="status">Foto belum dapat dimuat.</div>}</div><div className="s04-corner-fold" aria-hidden="true" /><button type="button" className="s04-paper-note" data-active={activeAccent === "tape" || undefined} onClick={() => activateAccent("tape")} aria-label="Gerakkan catatan kertas kecil"><span>untukmu</span><i aria-hidden="true">✦</i></button></div><div ref={decorRef} className="s04-decorations"><button type="button" className="s04-tape" data-active={activeAccent === "tape" || undefined} onClick={() => activateAccent("tape")} aria-label="Angkat pita kertas" /><button type="button" className="s04-star" data-active={activeAccent === "star" || undefined} onClick={() => activateAccent("star")} aria-label="Lipat bintang kertas"><svg viewBox="0 0 80 80" aria-hidden="true"><path d="M40 8 L48 30 L72 30 L52 44 L60 68 L40 54 L20 68 L28 44 L8 30 L32 30Z" /></svg></button><button type="button" className="s04-flower" data-active={activeAccent === "flower" || undefined} onClick={() => activateAccent("flower")} aria-label="Gerakkan bunga anemone"><svg viewBox="0 0 96 96" aria-hidden="true" focusable="false"><g className="s04-flower-outer"><path d="M48 14 C61 14 68 25 60 36 C71 28 82 35 82 48 C82 61 71 68 60 60 C68 71 61 82 48 82 C35 82 28 71 36 60 C25 68 14 61 14 48 C14 35 25 28 36 36 C28 25 35 14 48 14Z" /></g><g className="s04-flower-inner"><line x1="48" y1="48" x2="48" y2="28" /><line x1="48" y1="48" x2="62" y2="34" /><line x1="48" y1="48" x2="68" y2="48" /><line x1="48" y1="48" x2="62" y2="62" /><line x1="48" y1="48" x2="48" y2="68" /><line x1="48" y1="48" x2="34" y2="62" /><line x1="48" y1="48" x2="28" y2="48" /><line x1="48" y1="48" x2="34" y2="34" /><circle cx="48" cy="27" r="2.6" /><circle cx="63" cy="33" r="2.6" /><circle cx="69" cy="48" r="2.6" /><circle cx="63" cy="63" r="2.6" /><circle cx="48" cy="69" r="2.6" /><circle cx="33" cy="63" r="2.6" /><circle cx="27" cy="48" r="2.6" /><circle cx="33" cy="33" r="2.6" /></g><g className="s04-flower-core"><circle cx="48" cy="48" r="7" /><circle cx="48" cy="48" r="3" /></g></svg></button></div></div>
      <div className="s04-copy-column"><div ref={identityRef} className="s04-identity"><p className="s04-kicker">sepotong kenangan</p><h1 id="s04-title"><span>Malica</span><span>Yohana</span><span>Hutagaol</span></h1><svg className="s04-identity-rule" viewBox="0 0 160 18" aria-hidden="true"><path d="M4 12 C42 3 78 17 112 9 C130 5 143 6 156 8" /></svg><p className="s04-handwritten">simpan yang hangat, ya.</p></div><div ref={actionRef} className="s04-action-area"><S04PaperContinue disabled={transitionActive} onContinue={handleContinue} />{actionError && <p role="alert" className="s04-action-error">{actionError}</p>}</div></div>
    </section><S04ReturningButterfly anchorRef={frameRef} sceneRef={sceneRef} reducedMotion={prefersReducedMotion} sceneSettled={visualPhase === "stable"} onInteract={() => setButterflyInteracted(true)} promptSignal={butterflyPromptSignal} /><div className="sr-only" aria-live="polite" aria-atomic="true">{visualPhase === "stable" ? butterflyInteracted ? `Portrait ${S04_RECIPIENT_NAME}. Tombol Lanjut tersedia.` : `Portrait ${S04_RECIPIENT_NAME}. Sentuh kupu-kupu untuk melanjutkan.` : "Portrait sedang ditampilkan."}</div>
  </main>;
}
