"use client";

import gsap from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { isSupportedCakeConfiguration } from "../../cake/configuration";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { CAKE_CANDLE_POSITIONS, CakeRenderer } from "../s05/CakeRenderer";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

type WishPhase = "arrival" | "ready" | "pressing" | "extinguishing" | "extinguished" | "exiting" | "recovery";
const HOLD_SECONDS = 2;

function CandleOverlay({ candleIds }: { candleIds: readonly string[] }) {
  return <svg className="s06-candle-overlay" viewBox="0 0 400 300" aria-hidden="true">
    <defs><linearGradient id="s06-flame-gradient" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#E67A6B"/><stop offset=".52" stopColor="#ECA06E"/><stop offset="1" stopColor="#FFF3C7"/></linearGradient></defs>
    {candleIds.map((id, index) => {
      const position = CAKE_CANDLE_POSITIONS[id];
      if (!position) return null;
      return <g key={id} data-testid={`s06-candle-${id}`} transform={`translate(${position.x} ${position.y}) rotate(${position.rotation})`}>
        <g transform="translate(10 20)">
          <g className="s06-flame" style={{ animationDelay: `${index * -.31}s` }}>
            <path d="M0 0 C-7 -3 -6 -10 -1 -18 C0 -14 6 -10 5 -5 C5 -2 3 0 0 0Z" fill="url(#s06-flame-gradient)" />
            <path d="M0 -1 C-3 -2 -2 -6 0 -9 C1 -6 3 -4 2 -2Z" fill="#FFF8DE" />
          </g>
          <circle className="s06-ember" r="1.5" fill="#E67A6B" opacity="0" />
          <path className="s06-smoke" d={index % 3 === 0 ? "M0 0 C-3 -7 5 -9 2 -16 C0 -22 -6 -21 -3 -28" : index % 3 === 1 ? "M0 0 C4 -7 -4 -11 1 -17 C5 -22 3 -26 0 -30" : "M0 0 C-4 -6 3 -10 4 -15 C5 -19 -1 -22 -2 -28"} fill="none" stroke="#8A8180" strokeWidth="1.3" strokeLinecap="round" opacity="0" />
        </g>
      </g>;
    })}
  </svg>;
}

function WishGardenDecor() {
  return <div className="s06-garden" aria-hidden="true">
    <svg className="s06-garden-star" viewBox="0 0 64 64" focusable="false"><path d="M32 5 L37 25 L57 20 L42 33 L54 48 L35 42 L30 59 L26 42 L8 48 L21 33 L8 20 L27 25Z" fill="#E67A6B" fillOpacity=".78" stroke="#2C282A" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    <svg className="s06-garden-ribbon" viewBox="0 0 220 120" focusable="false"><path className="s06-ribbon-curl" d="M12 86 C39 43 76 25 107 49 C130 67 154 70 176 50 C190 37 201 37 208 47" fill="none" stroke="#A79DCD" strokeWidth="5" strokeLinecap="round" /><path d="M11 86 C39 48 75 32 103 54" fill="none" stroke="#E67A6B" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" /></svg>
    <svg className="s06-garden-thread" viewBox="0 0 220 120" focusable="false"><path d="M-10 24 C42 4 74 8 101 28 C128 48 153 51 177 31 C195 16 211 18 231 31" fill="none" stroke="#ECA06E" strokeOpacity=".62" strokeWidth="2.2" strokeLinecap="round" /><path d="M178 31 L189 22 L194 35 L184 42Z" fill="#F6F1E8" stroke="#2C282A" strokeWidth="1.2" strokeLinejoin="round" /></svg>
  </div>;
}

export function S06MakeAWish() {
  const sceneRef = useRef<HTMLElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const entryRef = useRef<gsap.core.Timeline | null>(null);
  const ritualRef = useRef<gsap.core.Timeline | null>(null);
  const holdRef = useRef<gsap.core.Tween | null>(null);
  const pointerRef = useRef<number | null>(null);
  const completingRef = useRef(false);
  const mountedRef = useRef(true);
  const configuration = useExperienceStore((state) => state.wish.cakeConfiguration);
  const wishStatus = useExperienceStore((state) => state.wish.status);
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const reducedMotion = usePrefersReducedMotion();
  const valid = configuration !== null && isSupportedCakeConfiguration(configuration);
  const extinguished = wishStatus === "extinguished";
  const [phase, setPhase] = useState<WishPhase>(valid ? (extinguished ? "extinguished" : "arrival") : "recovery");
  const [announcement, setAnnouncement] = useState("Lilin menyala. Tahan kue untuk membuat harapan, atau tekan Enter atau Spasi.");

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; entryRef.current?.kill(); ritualRef.current?.kill(); holdRef.current?.kill(); }; }, []);

  useLayoutEffect(() => {
    if (!valid || !sceneRef.current) return;
    const context = gsap.context(() => {
      const flames = gsap.utils.toArray<SVGElement>(".s06-flame");
      if (reducedMotion || extinguished) {
        if (extinguished) gsap.set(flames, { opacity: 0 });
        requestAnimationFrame(() => mountedRef.current && setPhase(extinguished ? "extinguished" : "ready"));
        return;
      }
      entryRef.current = gsap.timeline({ defaults: { ease: "power3.out" } })
        .set(flames, { scaleY: 0, scaleX: .55, opacity: 0, transformOrigin: "50% 100%" })
        .set(".s06-garden", { opacity: 0, scale: 1.06, rotation: -1.5, transformOrigin: "50% 50%" })
        .from(".s06-garden > svg", { opacity: 0, y: 10, duration: .55, stagger: .08 }, 0)
        .from(".s06-garden-star", { rotation: -18, scale: .82, transformOrigin: "50% 50%", duration: .7, ease: "back.out(1.4)" }, .18)
        .from(headingRef.current, { opacity: 0, y: 12, duration: .5 }, 0)
        .from(cakeRef.current, { opacity: 0, y: 20, rotation: -1, duration: .65 }, .1)
        .to(".s06-garden", { opacity: 1, scale: 1, rotation: 0, duration: .7, ease: "power2.out" }, .08)
        .to(flames, { scaleY: 1, scaleX: 1, opacity: 1, duration: .38, ease: "back.out(1.5)", stagger: .09 }, .52)
        .call(() => mountedRef.current && setPhase("ready"));
      gsap.to(".s06-ribbon-curl", { x: 3, duration: 4.6, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, sceneRef);
    return () => context.revert();
  // Wish completion is choreographed separately; do not replay the entrance on state change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid, reducedMotion]);

  const cancelHold = useCallback(() => {
    if (pointerRef.current === null) return;
    pointerRef.current = null;
    holdRef.current?.kill();
    holdRef.current = null;
    if (!completingRef.current && mountedRef.current) {
      setPhase("ready");
      gsap.to(cakeRef.current, { scale: 1, duration: .3, overwrite: true });
      gsap.to(sceneRef.current?.querySelectorAll(".s06-flame") ?? [], { opacity: 1, scale: 1, duration: .3, stagger: .025, overwrite: true });
      setAnnouncement("Sentuhan dibatalkan. Lilin masih menyala.");
    }
  }, []);

  useEffect(() => { window.addEventListener("blur", cancelHold); return () => window.removeEventListener("blur", cancelHold); }, [cancelHold]);

  const completeWish = useCallback(async () => {
    if (!valid || extinguished || transitionActive || completingRef.current) return;
    completingRef.current = true;
    pointerRef.current = null;
    holdRef.current?.kill();
    setPhase("extinguishing");
    const result = await experienceRuntime.dispatch({ type: "EXTINGUISH_WISH" });
    if (!mountedRef.current) return;
    if (result.status !== "applied") { completingRef.current = false; setPhase("ready"); setAnnouncement("Lilin belum dapat dipadamkan. Coba lagi."); return; }
    setAnnouncement("Lilin padam. Harapanmu tersimpan.");
    const flames = sceneRef.current?.querySelectorAll(".s06-flame") ?? [];
    const smoke = sceneRef.current?.querySelectorAll(".s06-smoke") ?? [];
    const embers = sceneRef.current?.querySelectorAll(".s06-ember") ?? [];
    if (reducedMotion) { gsap.set(flames, { opacity: 0 }); setPhase("extinguished"); return; }
    ritualRef.current = gsap.timeline({ onComplete: () => mountedRef.current && setPhase("extinguished") })
      .to(flames, { rotation: 22, scaleX: .65, scaleY: 1.2, duration: .18, stagger: .075, transformOrigin: "50% 100%" }, 0)
      .to(flames, { scaleY: 0, opacity: 0, duration: .18, stagger: .075, transformOrigin: "50% 100%" }, .18)
      .to(embers, { opacity: .9, duration: .12, stagger: .075 }, .3)
      .to(smoke, { opacity: .5, y: -3, duration: .25, stagger: .075 }, .36)
      .to(smoke, { opacity: 0, y: -18, duration: 1.25, stagger: .075, ease: "power1.out" }, .61)
      .to(embers, { opacity: 0, duration: .7 }, .7)
      .to(cakeRef.current, { scale: 1, duration: .5 }, .2)
      .to({}, { duration: .25 });
  }, [valid, extinguished, transitionActive, reducedMotion]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(sceneRef.current, {
      "--s06-light-x": `${68 + x * 5}%`,
      "--s06-light-y": `${46 + y * 5}%`,
      duration: .7,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(".s06-garden-star", { x: x * 14, y: y * 10, z: x * 10, rotation: x * 3, duration: .8, ease: "power2.out", overwrite: "auto" });
    gsap.to(".s06-garden-thread", { x: x * -8, y: y * -5, z: y * -5, duration: 1, ease: "power2.out", overwrite: "auto" });
    gsap.to(".s06-garden-ribbon", { x: x * 6, y: y * 4, z: y * 7, duration: 1.15, ease: "power2.out", overwrite: "auto" });
  }, [reducedMotion]);

  const resetPointer = useCallback(() => {
    if (reducedMotion || !sceneRef.current) return;
    gsap.to(sceneRef.current, { "--s06-light-x": "68%", "--s06-light-y": "46%", duration: 1, ease: "power2.out", overwrite: "auto" });
    gsap.to([".s06-garden-star", ".s06-garden-thread", ".s06-garden-ribbon"], { x: 0, y: 0, z: 0, rotation: 0, duration: 1, ease: "power2.out", overwrite: "auto" });
  }, [reducedMotion]);

  useEffect(() => runtimeTransitionCoordinator.register("CONTINUE", async (_event, target, signal) => {
    if (target !== "S07" || !sceneRef.current) return;
    cancelHold();
    setPhase("exiting");
    if (reducedMotion) return;
    await new Promise<void>((resolve, reject) => {
      const timeline = gsap.timeline({ onComplete: () => { signal.removeEventListener("abort", abort); resolve(); } });
      const abort = () => { timeline.kill(); gsap.set([cakeRef.current, headingRef.current, ctaRef.current, sceneRef.current?.querySelector(".s06-actions"), sceneRef.current?.querySelector(".s06-garden")], { clearProps: "transform,opacity" }); setPhase("extinguished"); reject(new Error("S06 handoff cancelled")); };
      signal.addEventListener("abort", abort, { once: true });
      const actions = sceneRef.current?.querySelector<HTMLElement>(".s06-actions");
      const garden = sceneRef.current?.querySelector<HTMLElement>(".s06-garden");
      timeline
        .to(actions ?? [], { opacity: 0, y: 10, duration: .22, ease: "power2.in" }, 0)
        .to([cakeRef.current, headingRef.current], { opacity: 0, y: -14, duration: .36, stagger: .05, ease: "power2.in" }, .06)
        .to(garden ?? [], { opacity: 0, scale: 1.08, rotation: 1.5, duration: .42, ease: "power2.in" }, .1);
    });
  }), [cancelHold, reducedMotion]);

  const pointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || phase !== "ready" || transitionActive) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current = event.pointerId;
    setPhase("pressing");
    setAnnouncement("Tahan untuk membuat harapan.");
    if (!reducedMotion) gsap.to(cakeRef.current, { scale: .985, duration: .4, overwrite: true });
    const flames = Array.from(sceneRef.current?.querySelectorAll(".s06-flame") ?? []);
    const progress = { value: 0 };
    holdRef.current = gsap.to(progress, { value: 1, duration: HOLD_SECONDS, ease: "none", onUpdate: () => {
      flames.forEach((flame, index) => { const amount = Math.max(0, Math.min(1, progress.value * 3 - index * 3 / flames.length)); gsap.set(flame, { opacity: 1 - amount * .3, scale: 1 - amount * .22 }); });
    }, onComplete: () => { void completeWish(); } });
  };

  if (!valid) return <main data-testid="s06-recovery" className="s06-scene s06-recovery"><div><h1>Kue belum siap.</h1><p>Susunan kue yang selesai tidak tersedia. Mulai kembali untuk membuat kue dengan utuh.</p><button type="button" onClick={() => experienceRuntime.dispatch({ type: "REPLAY" })}>Mulai lagi</button></div></main>;

  return <main ref={sceneRef} data-testid="s06-scene" data-wish-phase={phase} data-reduced-motion={reducedMotion ? "true" : "false"} className="s06-scene s06-ritual" aria-labelledby="s06-title" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
    <WishGardenDecor />
    <div className="s06-layout">
      <div ref={headingRef} className="s06-heading"><p>MAKE A WISH</p><h1 id="s06-title">Buat harapanmu.</h1><span>Sentuh atau tahan kuenya saat kamu siap.</span><small>Tidak perlu terburu-buru.</small></div>
      <div ref={cakeRef} className="s06-cake-stage">
        <CakeRenderer configuration={configuration} testId="s06-cake-renderer" />
        <CandleOverlay candleIds={configuration.candles} />
        <button type="button" data-testid="s06-wish-control" className="s06-wish-control" disabled={phase === "extinguished" || phase === "extinguishing" || transitionActive} aria-label="Tahan kue untuk membuat harapan, atau tekan Enter atau Spasi" onPointerDown={pointerDown} onPointerUp={cancelHold} onPointerCancel={cancelHold} onLostPointerCapture={cancelHold} onClick={(event) => { if (event.detail === 0 && phase === "ready") void completeWish(); }} />
        <span className="s06-touch-note" aria-hidden="true">tahan di sini ✦</span>
      </div>
      <div className="s06-actions">{phase === "extinguished" && <><div className="s06-signature"><p className="s06-semoga">semoga.</p><svg className="s06-signature-flourish" viewBox="0 0 120 14" aria-hidden="true"><path d="M4 8 C27 2 46 12 67 7 C85 3 99 4 116 6" fill="none" stroke="#E67A6B" strokeWidth="2" strokeLinecap="round" /></svg></div><button ref={ctaRef} type="button" data-testid="s06-continue" className="s06-continue" disabled={transitionActive} onClick={() => void experienceRuntime.dispatch({ type: "CONTINUE" })}><svg viewBox="0 0 230 64" preserveAspectRatio="none" aria-hidden="true"><path className="s06-ticket-body" d="M8 13 Q10 7 20 8 L194 9 L216 26 L222 28 L220 50 Q219 57 210 57 L17 56 Q8 56 7 48Z" fill="#FFF8ED" stroke="#2C282A" strokeWidth="1.5" strokeLinejoin="round"/><path className="s06-ticket-fold" d="M194 9 L194 26 L216 26Z" fill="#E67A6B" stroke="none"/></svg><span>Simpan harapan <b aria-hidden="true">↗</b></span></button></>}</div>
    </div><p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
  </main>;
}
