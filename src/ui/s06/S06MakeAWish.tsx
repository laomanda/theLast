"use client";

import { Check, HandTap, Sparkle } from "@phosphor-icons/react";
import gsap from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { isSupportedCakeConfiguration } from "../../cake/configuration";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { CAKE_CANDLE_POSITIONS, CakeRenderer } from "../s05/CakeRenderer";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

type WishPhase = "arrival" | "ready" | "pressing" | "extinguished" | "exiting" | "recovery";

const CANDLE_ASSET_ROOT = "/assets/svg/cake";

function CandleStateOverlay({ candleIds, extinguished }: { candleIds: readonly string[]; extinguished: boolean }) {
  return (
    <svg className="s06-candle-overlay" viewBox="0 0 400 300" aria-hidden="true">
      {candleIds.map((id) => {
        const position = CAKE_CANDLE_POSITIONS[id];
        if (!position) return null;
        const x = position.x - 5;
        const y = position.y - 20;
        return (
          <g key={id} data-testid={`s06-candle-${id}`} transform={`translate(${x} ${y}) rotate(${position.rotation} 15 42)`}>
            <image href={`${CANDLE_ASSET_ROOT}/candle-wick.svg`} x="0" y="31" width="30" height="18" />
            {extinguished ? (
              <image className="s06-smoke" href={`${CANDLE_ASSET_ROOT}/candle-smoke.svg`} x="-16" y="-48" width="62" height="104" />
            ) : (
              <image className="s06-flame" href={`${CANDLE_ASSET_ROOT}/candle-flame.svg`} x="2" y="-5" width="26" height="39" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function S06MakeAWish() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const cakeRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const pointerActiveRef = useRef<number | null>(null);
  const ignoreClickRef = useRef(false);
  const extinguishingRef = useRef(false);
  const mountedRef = useRef(true);

  const configuration = useExperienceStore((state) => state.wish.cakeConfiguration);
  const wishStatus = useExperienceStore((state) => state.wish.status);
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<WishPhase>(configuration && isSupportedCakeConfiguration(configuration) ? "arrival" : "recovery");
  const [announcement, setAnnouncement] = useState("Lilin menyala. Ambil waktumu untuk membuat harapan.");
  const validConfiguration = configuration !== null && isSupportedCakeConfiguration(configuration);
  const extinguished = wishStatus === "extinguished";

  const settle = useCallback(() => {
    gsap.set([cakeRef.current, headingRef.current, ctaRef.current], { clearProps: "transform,opacity,visibility" });
    if (mountedRef.current && validConfiguration) setPhase(extinguished ? "extinguished" : "ready");
  }, [extinguished, validConfiguration]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      entryTimelineRef.current?.kill();
      exitTimelineRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!validConfiguration || !sceneRef.current) return;
    if (reducedMotion || extinguished) {
      gsap.set([cakeRef.current, headingRef.current, ctaRef.current], { clearProps: "transform,opacity,visibility" });
      const frame = requestAnimationFrame(() => mountedRef.current && setPhase(extinguished ? "extinguished" : "ready"));
      return () => cancelAnimationFrame(frame);
    }
    const context = gsap.context(() => {
      entryTimelineRef.current = gsap.timeline({ defaults: { ease: "power3.out" } })
        .set(headingRef.current, { opacity: 0, y: 12 })
        .set(cakeRef.current, { opacity: 0, y: 18, scale: 0.985 })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.42 }, 0)
        .to(cakeRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.64 }, 0.12)
        .call(() => mountedRef.current && setPhase("ready"), [], 0.7);
    }, sceneRef);
    return () => context.revert();
  }, [extinguished, reducedMotion, validConfiguration]);

  useEffect(() => runtimeTransitionCoordinator.register("CONTINUE", async (_event, target, signal) => {
    if (target !== "S07" || !sceneRef.current) return;
    setPhase("exiting");
    if (reducedMotion) return;
    await new Promise<void>((resolve, reject) => {
      const onAbort = () => {
        exitTimelineRef.current?.kill();
        settle();
        reject(new Error("S06 to S07 handoff was cancelled."));
      };
      signal.addEventListener("abort", onAbort, { once: true });
      exitTimelineRef.current = gsap.timeline({ onComplete: () => {
        signal.removeEventListener("abort", onAbort);
        resolve();
      } })
        .to(ctaRef.current, { opacity: 0, y: 8, duration: 0.18 }, 0)
        .to(cakeRef.current, { opacity: 0, y: -8, scale: 0.99, duration: 0.38, ease: "power2.inOut" }, 0.04)
        .to(headingRef.current, { opacity: 0, duration: 0.18 }, 0.16);
    });
  }), [reducedMotion, settle]);

  const extinguish = async () => {
    if (!validConfiguration || extinguished || transitionActive || extinguishingRef.current) return;
    extinguishingRef.current = true;
    setPhase("pressing");
    const result = await experienceRuntime.dispatch({ type: "EXTINGUISH_WISH" });
    if (result.status === "applied") {
      setPhase("extinguished");
      setAnnouncement("Lilin padam. Harapanmu tersimpan. Kamu dapat melanjutkan saat siap.");
      if (!reducedMotion) {
        gsap.fromTo(cakeRef.current, { scale: 1 }, { scale: 0.992, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut", clearProps: "transform" });
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.14, ease: "power2.out" });
      }
    } else if (mountedRef.current) {
      extinguishingRef.current = false;
      setPhase("ready");
      setAnnouncement("Lilin belum dapat dipadamkan. Coba lagi.");
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (extinguished || transitionActive) return;
    pointerActiveRef.current = event.pointerId;
    try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch { /* Synthetic/test pointer events may not be capturable. */ }
    setPhase("pressing");
  };
  const onPointerCancel = () => {
    pointerActiveRef.current = null;
    if (!extinguished) setPhase("ready");
    setAnnouncement("Sentuhan dibatalkan. Lilin masih menyala.");
  };
  const onPointerUp = async (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerActiveRef.current !== event.pointerId) return;
    pointerActiveRef.current = null;
    ignoreClickRef.current = true;
    await extinguish();
  };
  const onClick = async () => {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false;
      return;
    }
    await extinguish();
  };
  const continueToLetter = async () => {
    const result = await experienceRuntime.dispatch({ type: "CONTINUE" });
    if (result.status !== "committed") setAnnouncement("Lanjutkan tersedia setelah lilin padam.");
  };

  if (!validConfiguration) {
    return (
      <main data-testid="s06-recovery" className="s06-scene s06-recovery" aria-labelledby="s06-recovery-title">
        <div>
          <p className="s06-kicker">THE LAST / 06</p>
          <h1 id="s06-recovery-title">Kue belum siap.</h1>
          <p>Susunan kue yang selesai tidak tersedia. Mulai kembali untuk membuat kue dengan utuh.</p>
          <button type="button" onClick={() => experienceRuntime.dispatch({ type: "REPLAY" })}>Mulai lagi</button>
        </div>
      </main>
    );
  }

  return (
    <main ref={sceneRef} data-testid="s06-scene" data-wish-phase={phase} data-reduced-motion={reducedMotion ? "true" : "false"} className="s06-scene" aria-labelledby="s06-title">
      <p className="s06-kicker" aria-hidden="true">THE LAST / 06</p>
      <div className="s06-layout">
        <div ref={headingRef} className="s06-heading">
          <p>MAKE A WISH</p>
          <h1 id="s06-title">Buat harapanmu.</h1>
          <span>{extinguished ? "Lilin sudah padam." : "Sentuh atau tahan kuenya saat kamu siap."}</span>
        </div>
        <div ref={cakeRef} className="s06-cake-stage">
          <CakeRenderer configuration={configuration} testId="s06-cake-renderer" />
          <CandleStateOverlay candleIds={configuration.candles} extinguished={extinguished} />
          <button
            type="button"
            data-testid="s06-wish-control"
            className="s06-wish-control"
            disabled={extinguished || transitionActive}
            aria-label={extinguished ? "Lilin sudah padam" : "Sentuh atau tahan untuk memadamkan lilin"}
            aria-describedby="s06-instruction"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onClick={onClick}
          ><HandTap size={28} weight="regular" aria-hidden="true" /></button>
        </div>
        <div className="s06-actions">
          <p id="s06-instruction" className="s06-instruction"><Sparkle size={17} aria-hidden="true" /> {extinguished ? "Harapan selesai dibuat." : "Tidak perlu terburu-buru."}</p>
          <button ref={ctaRef} type="button" data-testid="s06-continue" className="s06-continue" disabled={!extinguished || transitionActive} onClick={continueToLetter}>
            Lanjut <Check size={19} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
    </main>
  );
}
