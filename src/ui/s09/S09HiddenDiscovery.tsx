"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { curtainTransitionController } from "../../runtime/curtain-transition-controller";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

type DepthPhase = "shore" | "descending" | "deep" | "handoff";

export function S09HiddenDiscovery() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const descentTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const handoffTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const startedRef = useRef(false);
  const pendingRef = useRef(false);
  const reduced = usePrefersReducedMotion();
  const committed = useExperienceStore((state) => state.hiddenPortal === "committed");
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const [settled, setSettled] = useState(reduced);
  const [phase, setPhase] = useState<DepthPhase>("shore");

  useLayoutEffect(() => {
    if (!sceneRef.current || !introRef.current) return;
    const heldByCurtain = curtainTransitionController.isHolding("S09");
    let stopWaiting: () => void = () => undefined;
    const context = gsap.context(() => {
      const pieces = gsap.utils.toArray<HTMLElement>(".s09-intro-piece", sceneRef.current);
      if (reduced) {
        setSettled(true);
        return;
      }
      gsap.set(pieces, { opacity: 0, y: 18 });
      const playEntrance = () => {
        gsap.timeline({ onComplete: () => setSettled(true) })
          .to(pieces, { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: "power3.out" });
      };
      if (heldByCurtain) stopWaiting = curtainTransitionController.onReveal("S09", playEntrance);
      else playEntrance();
    }, sceneRef);
    curtainTransitionController.markReady("S09");
    return () => { stopWaiting(); context.revert(); };
  }, [reduced]);

  useEffect(() => runtimeTransitionCoordinator.register("HIDDEN_SPACE_READY", async (_event, target, signal) => {
    if (target !== "S10" || reduced || !sceneRef.current) return;
    await new Promise<void>((resolve, reject) => {
      const abort = () => { handoffTimelineRef.current?.kill(); reject(new Error("S09 handoff cancelled.")); };
      signal.addEventListener("abort", abort, { once: true });
      handoffTimelineRef.current = gsap.timeline({
        onComplete: () => { signal.removeEventListener("abort", abort); resolve(); },
      }).to(sceneRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
    });
  }), [reduced]);

  useEffect(() => () => {
    descentTimelineRef.current?.kill();
    handoffTimelineRef.current?.kill();
  }, []);

  const beginDescent = () => {
    if (startedRef.current || transitionActive || !committed || !sceneRef.current) return;
    startedRef.current = true;
    setPhase("descending");
    if (reduced) {
      gsap.set(".s09-color-layer--twilight", { opacity: 1 });
      gsap.set(".s09-color-layer--deep", { opacity: 1 });
      gsap.set(".s09-final-reveal", { opacity: 1, pointerEvents: "auto" });
      setPhase("deep");
      return;
    }
    const pieces = gsap.utils.toArray<HTMLElement>(".s09-intro-piece", sceneRef.current);
    descentTimelineRef.current = gsap.timeline({
      onComplete: () => setPhase("deep"),
    })
      .to(pieces, { opacity: 0, y: -18, duration: 0.55, stagger: 0.03, ease: "power2.in" }, 0)
      .to(".s09-color-layer--twilight", { opacity: 1, duration: 2.1, ease: "sine.inOut" }, 0.25)
      .to(".s09-color-layer--deep", { opacity: 1, duration: 2.5, ease: "sine.inOut" }, 2.05)
      .to(".s09-final-reveal", { opacity: 1, pointerEvents: "auto", duration: 0.75, ease: "power3.out" }, 4.1);
  };

  const continueToVault = async () => {
    if (phase !== "deep" || pendingRef.current || transitionActive) return;
    pendingRef.current = true;
    setPhase("handoff");
    const result = await experienceRuntime.dispatch({ type: "HIDDEN_SPACE_READY" });
    if (result.status !== "committed") {
      pendingRef.current = false;
      setPhase("deep");
    }
  };

  return (
    <main ref={sceneRef} className="s09-scene s09-immersive s09-pure-color" data-testid="s09-scene" data-settled={settled || reduced ? "true" : "false"} data-phase={phase} data-reduced-motion={reduced ? "true" : "false"} aria-labelledby="s09-title">
      <div className="s09-color-layer s09-color-layer--twilight" aria-hidden="true" />
      <div className="s09-color-layer s09-color-layer--deep" aria-hidden="true" />
      <div ref={introRef} className="s09-shore-editorial">
        <span className="s09-shore-rule s09-intro-piece" aria-hidden="true" />
        <h1 id="s09-title" className="s09-intro-piece">Di balik<br /><em>permukaan.</em></h1>
        <p className="s09-shore-copy s09-intro-piece">Ada cerita yang belum terlihat.</p>
        <button type="button" data-testid="s09-dive" className="s09-dive-action s09-intro-piece" onClick={beginDescent} disabled={!committed || transitionActive}>
          <span>Buka lapisan berikutnya</span><span aria-hidden="true">↓</span>
        </button>
      </div>
      <div className="s09-final-reveal">
        <span className="s09-final-mark" aria-hidden="true">✦</span>
        <p>THE HIDDEN LAYER</p>
        <h2>Ternyata, kedalaman ini<br />menyimpan sebuah ruang.</h2>
        <button type="button" data-testid="s09-continue" className="s09-deep-action" onClick={continueToVault} disabled={phase !== "deep" || transitionActive}>
          <span>Temukan lapisan berikutnya</span><span aria-hidden="true">↘</span>
        </button>
      </div>
    </main>
  );
}
