"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { curtainTransitionController } from "../../runtime/curtain-transition-controller";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { S09EditorialCanvas } from "./S09EditorialCanvas";

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
    if (target !== "S10" || !sceneRef.current) return;
    const scene = sceneRef.current;
    const arrival = scene.querySelector<HTMLElement>(".s09-final-reveal");
    if (!arrival) return;
    await new Promise<void>((resolve, reject) => {
      const overlay = document.createElement("div");
      overlay.className = "s09-dissolution";
      overlay.setAttribute("aria-hidden", "true");
      const shade = document.createElement("div");
      shade.className = "s09-dissolution-shade";
      overlay.appendChild(shade);
      scene.appendChild(overlay);
      const pieces: HTMLElement[] = [];
      const cleanup = (keepFrame = false) => { window.removeEventListener("resize", finish); if (!keepFrame) { overlay.remove(); arrival.style.visibility = ""; arrival.style.opacity = "1"; } signal.removeEventListener("abort", abort); };
      const finish = () => handoffTimelineRef.current?.progress(1);
      const abort = () => { handoffTimelineRef.current?.kill(); cleanup(); reject(new Error("S09 handoff cancelled.")); };
      signal.addEventListener("abort", abort, { once: true });
      try {
        const bounds = scene.getBoundingClientRect();
        const targets = Array.from(arrival.querySelectorAll(".s09-arrival-eyebrow, h2, .s09-arrival-description, .s09-deep-action, .s09-arrival-art"), (element) => element.getBoundingClientRect());
        if (!reduced && bounds.width > 0 && bounds.height > 0) {
          const columns = bounds.width < 700 ? 12 : 20;
          const rows = bounds.width < 700 ? 16 : 14;
          for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
            const left = bounds.left + x * bounds.width / columns, top = bounds.top + y * bounds.height / rows;
            const right = bounds.left + (x + 1) * bounds.width / columns, bottom = bounds.top + (y + 1) * bounds.height / rows;
            if (!targets.some((rect) => left < rect.right && right > rect.left && top < rect.bottom && bottom > rect.top)) continue;
            const tile = document.createElement("div");
            tile.className = "s09-dissolution-tile";
            tile.style.clipPath = `inset(${y * 100 / rows}% ${(columns - x - 1) * 100 / columns}% ${(rows - y - 1) * 100 / rows}% ${x * 100 / columns}%)`;
            const clone = arrival.cloneNode(true) as HTMLElement;
            clone.style.opacity = "1";
            clone.style.pointerEvents = "none";
            clone.inert = true;
            clone.querySelectorAll("[id], [data-testid]").forEach((el) => { el.removeAttribute("id"); el.removeAttribute("data-testid"); });
            tile.appendChild(clone);
            overlay.appendChild(tile);
            pieces.push(tile);
          }
        }
        handoffTimelineRef.current = gsap.timeline({ onComplete: () => { cleanup(true); resolve(); } });
        if (pieces.length) {
          arrival.style.visibility = "hidden";
          handoffTimelineRef.current.to(pieces, { y: () => -bounds.height * (0.22 + Math.random() * 0.3), x: () => (Math.random() - 0.5) * 70, opacity: 0, duration: 2.15, stagger: { each: 0.003, from: "random" }, ease: "power2.in" }, 0.05);
          handoffTimelineRef.current.to(shade, { opacity: 1, duration: 1.9, ease: "sine.inOut" }, 0.5);
        } else {
          handoffTimelineRef.current.to(arrival, { opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0).to(shade, { opacity: 1, duration: 0.5 }, 0);
        }
        window.addEventListener("resize", finish, { once: true });
      } catch {
        cleanup();
        resolve();
      }
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
      sceneRef.current?.querySelector(".s09-dissolution")?.remove();
      const arrival = sceneRef.current?.querySelector<HTMLElement>(".s09-final-reveal");
      if (arrival) { arrival.style.visibility = ""; arrival.style.opacity = "1"; }
      pendingRef.current = false;
      setPhase("deep");
    }
  };

  return (
    <main ref={sceneRef} className="s09-scene s09-immersive s09-pure-color" data-testid="s09-scene" data-settled={settled || reduced ? "true" : "false"} data-phase={phase} data-reduced-motion={reduced ? "true" : "false"} aria-labelledby="s09-title">
      <S09EditorialCanvas phase={phase} />
      <div ref={introRef} className="s09-shore-editorial">
        <span className="s09-shore-rule s09-intro-piece" aria-hidden="true" />
        <h1 id="s09-title" className="s09-intro-piece">Di balik<br /><em>permukaan.</em></h1>
        <p className="s09-shore-copy s09-intro-piece">Ada cerita yang belum terlihat.</p>
        <button type="button" data-testid="s09-dive" className="s09-dive-action s09-intro-piece" onClick={beginDescent} disabled={!committed || transitionActive}>
          <span>Buka lapisan berikutnya</span><span aria-hidden="true">↓</span>
        </button>
      </div>
      <div className="s09-final-reveal">
        <div className="s09-arrival-copy">
        <h2>Ada yang<br /><em>sengaja disimpan.</em></h2>
        <p className="s09-arrival-description">Di sini, sebuah ruang kecil menunggumu.</p>
        <button type="button" data-testid="s09-continue" className="s09-deep-action" onClick={continueToVault} disabled={phase !== "deep" || transitionActive}>
           <svg className="s09-deep-action-art" viewBox="0 0 320 76" preserveAspectRatio="none" aria-hidden="true" focusable="false">
             <path className="s09-deep-action-paper" d="M8 7 Q8 4 12 4 H264 L312 18 V68 Q312 72 308 72 H12 Q8 72 8 68 Z" />
             <path className="s09-deep-action-fold" d="M264 4 V18 H312" />
             <path className="s09-deep-action-seam" d="M264 4 L264 18 L312 18" />
           </svg>
           <span className="s09-deep-action-label">Temukan yang tersimpan</span><span className="s09-deep-action-arrow" aria-hidden="true">↘</span>
        </button>
        </div>
        <svg className="s09-arrival-art" viewBox="0 0 460 500" fill="none" aria-hidden="true" focusable="false">
          <path d="M64 410V192C64 92 138 40 230 40S396 92 396 192v218" fill="#a78ca9" fillOpacity=".08" stroke="#d5c0d4" strokeOpacity=".32" />
          <path d="M90 410V198c0-83 62-132 140-132s140 49 140 132v212" fill="#efd9d3" fillOpacity=".055" stroke="#e7d5d2" strokeOpacity=".4" />
          <path d="M122 410V208c0-65 47-111 108-111s108 46 108 111v202" fill="#251e38" fillOpacity=".33" stroke="#c6abc7" strokeOpacity=".48" />
          <path d="M147 410V214c0-51 36-89 83-89s83 38 83 89v196" stroke="#e8d8b9" strokeOpacity=".36" />
          <path d="M40 410h380M109 432h242" stroke="#e8d8b9" strokeOpacity=".35" />
          <path d="M230 211v32m-16-16h32" stroke="#e8d8b9" strokeOpacity=".7" />
          <circle cx="230" cy="227" r="3" fill="#f6e5c5" />
        </svg>
      </div>
    </main>
  );
}
