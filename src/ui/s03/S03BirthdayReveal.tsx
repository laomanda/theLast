"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { CelebrationBurst } from "./CelebrationBurst";

export const S03_RECIPIENT_NAME = "Malica Yohana Hutagaol";
export const S03_FULL_GREETING = `Happy Birthday, ${S03_RECIPIENT_NAME}.`;
export const S03_CTA_LABEL = "Lanjut";

type VisualPhase = "canvas" | "greeting" | "name" | "celebration" | "stable" | "exiting";

export function S03BirthdayReveal() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const greetingRef = useRef<HTMLSpanElement | null>(null);
  const nameRef = useRef<HTMLSpanElement | null>(null);
  const arcRef = useRef<HTMLDivElement | null>(null);
  const burstRef = useRef<HTMLDivElement | null>(null);
  const actionRef = useRef<HTMLButtonElement | null>(null);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const activationPendingRef = useRef(false);
  const mountedRef = useRef(true);

  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const [visualPhase, setVisualPhase] = useState<VisualPhase>(prefersReducedMotion ? "stable" : "canvas");
  const [arcAvailable, setArcAvailable] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  const settlePose = useCallback(() => {
    const targets = [canvasRef.current, greetingRef.current, nameRef.current, arcRef.current, burstRef.current, actionRef.current].filter(Boolean);
    gsap.set(targets, { clearProps: "transform,opacity,clipPath,visibility" });
    setVisualPhase("stable");
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      entryTimelineRef.current?.kill();
      exitTimelineRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!sceneRef.current) return;
    if (prefersReducedMotion) {
      const targets = [canvasRef.current, greetingRef.current, nameRef.current, arcRef.current, burstRef.current, actionRef.current].filter(Boolean);
      gsap.set(targets, { clearProps: "transform,opacity,clipPath,visibility" });
      queueMicrotask(() => {
        if (mountedRef.current) setVisualPhase("stable");
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      entryTimelineRef.current = tl;

      tl.set(canvasRef.current, { clipPath: "inset(42% 12% 42% 12% round 20px)" })
        .set(greetingRef.current, { yPercent: 112, opacity: 0 })
        .set(nameRef.current, { yPercent: 112, opacity: 0 })
        .set(arcRef.current, { opacity: 0, scale: 0.82, rotation: -5 })
        .set(burstRef.current, { opacity: 0, scale: 0.72, rotation: -4 })
        .set(actionRef.current, { opacity: 0, y: 10 })
        .to(canvasRef.current, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 0.52,
          ease: "power3.inOut",
        })
        .call(() => mountedRef.current && setVisualPhase("greeting"), [], 0.18)
        .to(greetingRef.current, { yPercent: 0, opacity: 1, duration: 0.5 }, 0.24)
        .call(() => mountedRef.current && setVisualPhase("name"), [], 0.62)
        .to(nameRef.current, { yPercent: 0, opacity: 1, duration: 0.68, ease: "power4.out" }, 0.64)
        .call(() => mountedRef.current && setVisualPhase("celebration"), [], 0.94)
        .to(arcRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 0.5 }, 0.96)
        .to(burstRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 0.42 }, 1.08)
        .to(actionRef.current, { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" }, 1.2)
        .call(() => mountedRef.current && setVisualPhase("stable"), [], 1.56);
    }, sceneRef);

    return () => {
      entryTimelineRef.current = null;
      ctx.revert();
    };
  }, [prefersReducedMotion, settlePose]);

  useEffect(() => {
    const unregister = runtimeTransitionCoordinator.register("CONTINUE", async (_event, target, signal) => {
      if (target !== "S04" || !sceneRef.current) return;
      entryTimelineRef.current?.progress(1).kill();
      setVisualPhase("exiting");

      if (prefersReducedMotion) return;

      await new Promise<void>((resolve, reject) => {
        let settled = false;
        const finish = (complete: boolean) => {
          if (settled) return;
          settled = true;
          signal.removeEventListener("abort", onAbort);
          if (complete) resolve();
          else reject(new Error("S03 to S04 handoff was cancelled."));
        };
        const onAbort = () => {
          exitTimelineRef.current?.kill();
          if (mountedRef.current) settlePose();
          finish(false);
        };

        signal.addEventListener("abort", onAbort, { once: true });
        exitTimelineRef.current = gsap
          .timeline({ onComplete: () => finish(true) })
          .to([arcRef.current, burstRef.current], { opacity: 0, scale: 0.92, duration: 0.24, ease: "power2.in" }, 0)
          .to(actionRef.current, { opacity: 0, y: 8, duration: 0.22, ease: "power2.in" }, 0)
          .to(greetingRef.current, { opacity: 0.55, y: -6, duration: 0.32, ease: "power2.inOut" }, 0.12)
          .to(nameRef.current, { opacity: 0, y: -12, duration: 0.42, ease: "power3.in" }, 0.16)
          .to(canvasRef.current, { opacity: 0.96, duration: 0.08 }, 0.48);
      });
    });
    return unregister;
  }, [prefersReducedMotion, settlePose]);

  const handleContinue = async () => {
    if (activationPendingRef.current || experienceRuntime.isTransitionInFlight()) return;
    activationPendingRef.current = true;
    setActionError(null);

    const result = await experienceRuntime.dispatch({ type: "CONTINUE" });
    if (result.status !== "committed" && mountedRef.current) {
      settlePose();
      setActionError("Belum dapat melanjutkan. Silakan coba lagi.");
      activationPendingRef.current = false;
    }
  };

  return (
    <main
      ref={sceneRef}
      data-testid="s03-scene"
      data-visual-phase={visualPhase}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      aria-labelledby="s03-title"
      className="s03-scene"
    >
      <div ref={canvasRef} className="s03-canvas" data-testid="s03-canvas">
        <div className="s03-scene-index" aria-hidden="true">THE LAST / 03</div>

        <div ref={arcRef} className="s03-celebration-arc" aria-hidden="true" data-testid="s03-celebration-arc">
          {arcAvailable && (
            // eslint-disable-next-line @next/next/no-img-element -- exact byte-preserved REV5 SVG.
            <img
              src="/assets/svg/celebration/celebration-arc.svg"
              alt=""
              onError={() => setArcAvailable(false)}
            />
          )}
        </div>

        <div ref={burstRef} className="s03-celebration-burst" aria-hidden="true" data-testid="s03-celebration-burst">
          <CelebrationBurst />
        </div>

        <section className="s03-composition">
          <h1 id="s03-title" className="s03-title">
            <span className="s03-line-mask s03-greeting-mask">
              <span ref={greetingRef} className="s03-greeting" data-testid="s03-greeting">Happy Birthday, </span>
            </span>
            <span className="s03-line-mask s03-name-mask">
              <span ref={nameRef} className="s03-name" data-testid="s03-recipient-name">{S03_RECIPIENT_NAME}.</span>
            </span>
          </h1>

          <button
            ref={actionRef}
            type="button"
            onClick={handleContinue}
            disabled={transitionActive}
            aria-busy={transitionActive}
            className="s03-continue-action"
          >
            <span>{S03_CTA_LABEL}</span>
            <span className="s03-action-mark" aria-hidden="true">→</span>
          </button>
          {actionError && <p role="alert" className="s03-action-error">{actionError}</p>}
        </section>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {visualPhase === "stable" ? `${S03_FULL_GREETING} Tombol Lanjut tersedia.` : "Ucapan ulang tahun sedang ditampilkan."}
      </div>
    </main>
  );
}
