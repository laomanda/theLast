"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import gsap from "gsap";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { S08_CONTENT } from "./s08-content";

type VisualPhase = "entering" | "resting" | "complete";

/** A complete birthday ending; optional hidden navigation remains unavailable until S09 exists. */
export function S08FinalBirthdayMoment() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const completionRef = useRef<HTMLButtonElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLButtonElement | null>(null);
  const pointerStartRef = useRef<number | null>(null);
  const pointerHandledRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const mountedRef = useRef(true);
  const pendingRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const birthdayComplete = useExperienceStore((state) => state.birthdayComplete);
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const portalArmed = useExperienceStore((state) => state.hiddenPortal === "armed");
  const [phase, setPhase] = useState<VisualPhase>(prefersReducedMotion ? "resting" : "entering");
  const [error, setError] = useState<string | null>(null);
  const visualPhase: VisualPhase = birthdayComplete ? "complete" : phase;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      timelineRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!sceneRef.current) return;
    if (prefersReducedMotion) {
      gsap.set([surfaceRef.current, completionRef.current, controlsRef.current].filter(Boolean), { clearProps: "all" });
      queueMicrotask(() => mountedRef.current && setPhase("resting"));
      return;
    }
    const context = gsap.context(() => {
      timelineRef.current = gsap.timeline({ defaults: { ease: "power2.out" } })
        .fromTo(surfaceRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.48, clearProps: "transform,opacity" })
        .fromTo(completionRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.28 }, 0.2)
        .call(() => mountedRef.current && setPhase("resting"));
    }, sceneRef);
    return () => context.revert();
  }, [prefersReducedMotion]);

  const completeBirthday = async () => {
    if (pendingRef.current || birthdayComplete || transitionActive) return;
    pendingRef.current = true;
    setError(null);
    const result = await experienceRuntime.dispatch({ type: "COMPLETE_BIRTHDAY" });
    if (result.status !== "applied" && mountedRef.current) {
      setError("Belum dapat menandai pengalaman selesai. Silakan coba lagi.");
      pendingRef.current = false;
    }
    if (result.status === "applied") pendingRef.current = false;
  };

  const replay = async () => {
    if (pendingRef.current || transitionActive) return;
    pendingRef.current = true;
    await experienceRuntime.dispatch({ type: "REPLAY" });
  };

  useEffect(() => runtimeTransitionCoordinator.register("COMMIT_HIDDEN_PORTAL", async (_event, target, signal) => {
    if (target !== "S09" || !sceneRef.current || prefersReducedMotion) return;
    await new Promise<void>((resolve, reject) => {
      const abort = () => { timelineRef.current?.kill(); reject(new Error("S08 portal transition cancelled.")); };
      signal.addEventListener("abort", abort, { once: true });
      timelineRef.current = gsap.timeline({ onComplete: () => { signal.removeEventListener("abort", abort); resolve(); } })
        .to(surfaceRef.current, { opacity: 0, y: -18, duration: .34, ease: "power2.inOut" });
    });
  }), [prefersReducedMotion]);

  const armPortal = async () => {
    if (!birthdayComplete || portalArmed || transitionActive) return;
    await experienceRuntime.dispatch({ type: "ARM_HIDDEN_PORTAL" });
  };
  const commitPortal = async () => {
    if (!portalArmed || transitionActive || pendingRef.current) return;
    pendingRef.current = true;
    await experienceRuntime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" });
  };
  const pointerDown = (event: PointerEvent<HTMLButtonElement>) => { pointerStartRef.current = event.clientY; pointerHandledRef.current = false; };
  const pointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const start = pointerStartRef.current; pointerStartRef.current = null;
    if (start === null) return;
    pointerHandledRef.current = true;
    if (start - event.clientY >= 56) void commitPortal();
  };
  const portalClick = () => { if (pointerHandledRef.current) { pointerHandledRef.current = false; return; } void commitPortal(); };

  return (
    <main ref={sceneRef} data-testid="s08-scene" data-visual-phase={visualPhase} data-complete={birthdayComplete ? "true" : "false"} data-reduced-motion={prefersReducedMotion ? "true" : "false"} className="s08-scene" aria-labelledby="s08-title">
      <p className="s08-kicker" aria-hidden="true">{S08_CONTENT.kicker}</p>
      <div className="s08-field s08-field--coral" aria-hidden="true" />
      <div className="s08-field s08-field--lavender" aria-hidden="true" />
      <section ref={surfaceRef} className="s08-surface">
        <span className="s08-rule" aria-hidden="true" />
        <p className="s08-overline">BIRTHDAY WORLD</p>
        <h1 id="s08-title">Hari ini telah selesai dengan hangat.</h1>
        <p className="s08-pending" data-testid="s08-content-status" data-content-status={S08_CONTENT.status}>{S08_CONTENT.pendingLabel}</p>
        {!birthdayComplete ? (
          <button ref={completionRef} type="button" data-testid="s08-complete" className="s08-primary" onClick={completeBirthday} disabled={transitionActive} aria-busy={transitionActive}>
            {S08_CONTENT.completeLabel}
          </button>
        ) : (
          <div ref={controlsRef} className="s08-ending-controls" data-testid="s08-ending-controls">
            <p className="s08-complete-note" role="status">Pengalaman ulang tahun telah selesai.</p>
            <button type="button" data-testid="s08-end" className="s08-end" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{S08_CONTENT.endLabel}</button>
            <button type="button" data-testid="s08-replay" className="s08-replay" onClick={replay}>{S08_CONTENT.replayLabel}</button>
            {!portalArmed ? <button type="button" data-testid="s08-discover" className="s08-discover" onClick={armPortal}>·</button> : <button ref={portalRef} type="button" data-testid="s08-portal" className="s08-portal" onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={() => { pointerStartRef.current = null; pointerHandledRef.current = true; }} onClick={portalClick} aria-label="Lanjutkan ke lapisan tambahan">Tarik ke atas</button>}
            <p className="s08-optional-note">Tidak ada langkah lain yang diperlukan.</p>
          </div>
        )}
        {error && <p className="s08-action-error" role="alert">{error}</p>}
      </section>
    </main>
  );
}
