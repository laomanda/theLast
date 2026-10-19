"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { S11_CONTENT } from "./s11-content";

type LetterPhase = "folded" | "opening" | "opened";

/** S11 is the physical consent boundary. It intentionally contains no S12 copy. */
export function S11PhysicalLetter() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);
  const leftFoldRef = useRef<HTMLDivElement | null>(null);
  const rightFoldRef = useRef<HTMLDivElement | null>(null);
  const sealRef = useRef<HTMLSpanElement | null>(null);
  const continueRef = useRef<HTMLButtonElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const actionPendingRef = useRef(false);
  const mountedRef = useRef(true);
  const reducedMotion = usePrefersReducedMotion();
  const letterAvailable = useExperienceStore(
    (state) => state.scene === "S11" && state.vault.status === "letterVisible" && state.vault.letter === "visible",
  );
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const [phase, setPhase] = useState<LetterPhase>("folded");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      actionPendingRef.current = false;
      timelineRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!sceneRef.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        paperRef.current,
        { opacity: 0, y: 26, rotateX: -5, scale: 0.96 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.72, ease: "power3.out", clearProps: "opacity,transform" },
      );
    }, sceneRef);
    return () => context.revert();
  }, [reducedMotion]);

  const finishOpening = () => {
    if (!mountedRef.current) return;
    actionPendingRef.current = false;
    setPhase("opened");
    window.requestAnimationFrame(() => continueRef.current?.focus({ preventScroll: true }));
  };

  const openLetter = () => {
    if (!letterAvailable || transitionActive || actionPendingRef.current || phase !== "folded") return;
    actionPendingRef.current = true;
    setError(null);
    setPhase("opening");

    if (reducedMotion) {
      // Reduced motion still resolves every visual property to the same stable
      // opened pose; clearing transforms could leave a browser-specific partial
      // fold when the CSS phase attribute has not painted yet.
      gsap.set([leftFoldRef.current, rightFoldRef.current].filter(Boolean), { rotateY: 0 });
      gsap.set(sealRef.current, { opacity: 0, scale: 0.84 });
      gsap.set(paperRef.current, { opacity: 1, y: 0, rotateX: 0, scale: 1 });
      finishOpening();
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = gsap.timeline({ onComplete: finishOpening })
      .to(sealRef.current, { opacity: 0, scale: 0.84, duration: 0.18, ease: "power1.out" })
      .to(leftFoldRef.current, { rotateY: 0, duration: 0.72, ease: "power2.inOut" }, 0.12)
      .to(rightFoldRef.current, { rotateY: 0, duration: 0.72, ease: "power2.inOut" }, 0.22)
      .to(paperRef.current, { y: -6, scale: 1.025, duration: 0.34, ease: "power2.out" }, 0.56)
      .to(paperRef.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.inOut", clearProps: "transform" });
  };

  const continueToS12 = async () => {
    if (!letterAvailable || phase !== "opened" || transitionActive || actionPendingRef.current) return;
    actionPendingRef.current = true;
    setError(null);
    const result = await experienceRuntime.dispatch({ type: "OPEN_LETTER" });
    if (result.status !== "committed") {
      actionPendingRef.current = false;
      if (mountedRef.current) setError("Surat belum dapat dilanjutkan. Silakan coba lagi.");
    }
  };

  return (
    <main
      ref={sceneRef}
      className="s11-scene"
      data-testid="s11-scene"
      data-letter-phase={phase}
      data-content-status={S11_CONTENT.status}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      aria-labelledby="s11-title"
    >
      <p className="s11-kicker" aria-hidden="true">{S11_CONTENT.kicker}</p>
      <div className="s11-vault-memory" aria-hidden="true"><span /><span /><span /></div>
      <div className="s11-layout">
        <section className="s11-copy">
          <p className="s11-overline">{S11_CONTENT.overline}</p>
          <h1 id="s11-title">{S11_CONTENT.title}</h1>
          <p>{S11_CONTENT.supporting}</p>
        </section>

        <section className="s11-object-stage" aria-label="Surat fisik terlipat dari dalam Vault">
          <div ref={paperRef} className="s11-paper" data-testid="s11-paper" aria-hidden="true">
            <div className="s11-paper-panel s11-paper-center">
              <span className="s11-paper-mark">THE LAST</span>
              <span className="s11-paper-rule" />
              <span className="s11-paper-rule s11-paper-rule--short" />
            </div>
            <div ref={leftFoldRef} className="s11-paper-panel s11-paper-fold s11-paper-fold--left">
              <span className="s11-fold-edge" />
            </div>
            <div ref={rightFoldRef} className="s11-paper-panel s11-paper-fold s11-paper-fold--right">
              <span className="s11-fold-edge" />
            </div>
            <span ref={sealRef} className="s11-seal">11</span>
          </div>

          <div className="s11-actions">
            {phase === "folded" ? (
              <button type="button" className="s11-primary" data-testid="s11-open-letter" onClick={openLetter} disabled={!letterAvailable || transitionActive}>
                {S11_CONTENT.openLabel}
              </button>
            ) : phase === "opening" ? (
              <p className="s11-action-status" role="status">Surat sedang dibuka...</p>
            ) : (
              <button ref={continueRef} type="button" className="s11-primary" data-testid="s11-continue" onClick={continueToS12} disabled={transitionActive}>
                {S11_CONTENT.continueLabel}
              </button>
            )}
            <p className="s11-live-status" aria-live="polite" data-testid="s11-status">
              {phase === "opened" ? S11_CONTENT.openedStatus : "Surat tetap tertutup sampai kamu memilih membukanya."}
            </p>
            {error ? <p className="s11-error" role="alert">{error}</p> : null}
          </div>
        </section>
      </div>
    </main>
  );
}

