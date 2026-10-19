"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

/** S09 contains no Vault content; it is only the intentional hidden-space handoff. */
export function S09HiddenDiscovery() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const reduced = usePrefersReducedMotion();
  const committed = useExperienceStore((state) => state.hiddenPortal === "committed");
  const [pending, setPending] = useState(false);
  const [settled, setSettled] = useState(reduced);

  useEffect(() => () => { timelineRef.current?.kill(); }, []);
  useLayoutEffect(() => {
    if (!sceneRef.current) return;
    if (reduced) { gsap.set(layerRef.current, { clearProps: "all" }); return; }
    const context = gsap.context(() => {
      timelineRef.current = gsap.timeline({ defaults: { ease: "power2.out" } })
        .fromTo(layerRef.current, { opacity: 0, yPercent: 14, scale: 1.03 }, { opacity: 1, yPercent: 0, scale: 1, duration: 0.52, clearProps: "transform,opacity" })
        .call(() => setSettled(true));
    }, sceneRef);
    return () => context.revert();
  }, [reduced]);

  const continueToBoundary = async () => {
    if (pending || !committed) return;
    setPending(true);
    await experienceRuntime.dispatch({ type: "HIDDEN_SPACE_READY" });
  };

  return <main ref={sceneRef} className="s09-scene" data-testid="s09-scene" data-settled={settled || reduced ? "true" : "false"} data-reduced-motion={reduced ? "true" : "false"} aria-labelledby="s09-title">
    <div ref={layerRef} className="s09-layer">
      <p className="s09-kicker">THE LAST / 09 · LAPISAN TAMBAHAN</p>
      <div className="s09-seam" aria-hidden="true"><span /><span /><span /></div>
      <h1 id="s09-title">Masih ada ruang di balik permukaan ini.</h1>
      <p className="s09-pending">Arah dan pesan personal berikutnya menunggu persetujuan konten.</p>
      <button type="button" data-testid="s09-continue" className="s09-continue" onClick={continueToBoundary} disabled={!committed || pending}>Lanjut</button>
    </div>
  </main>;
}
