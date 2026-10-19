"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

export const S04_RECIPIENT_NAME = "Malica Yohana Hutagaol";
export const S04_CTA_LABEL = "Lanjut";
export const S04_PHOTO_PATH = "/assets/photos/s04-portrait.webp";

type VisualPhase = "entering" | "stable" | "exiting";

export function S04Portrait() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const identityRef = useRef<HTMLDivElement | null>(null);
  const actionRef = useRef<HTMLButtonElement | null>(null);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const activationPendingRef = useRef(false);
  const mountedRef = useRef(true);

  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const [visualPhase, setVisualPhase] = useState<VisualPhase>(prefersReducedMotion ? "stable" : "entering");
  const [photoState, setPhotoState] = useState<"loading" | "ready" | "unavailable">("loading");
  const [frameAvailable, setFrameAvailable] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  const settlePose = useCallback(() => {
    const targets = [frameRef.current, portraitRef.current, identityRef.current, actionRef.current].filter(Boolean);
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
    const targets = [frameRef.current, portraitRef.current, identityRef.current, actionRef.current].filter(Boolean);
    if (prefersReducedMotion) {
      gsap.set(targets, { clearProps: "transform,opacity,clipPath,visibility" });
      queueMicrotask(() => mountedRef.current && setVisualPhase("stable"));
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      entryTimelineRef.current = timeline;
      timeline
        .set(frameRef.current, { opacity: 0, y: 18, rotation: -1.2 })
        .set(portraitRef.current, { opacity: 0, scale: 1.025, clipPath: "inset(8% 7% 8% 7% round 2px)" })
        .set(identityRef.current, { opacity: 0, y: 14 })
        .set(actionRef.current, { opacity: 0, y: 10 })
        .to(frameRef.current, { opacity: 1, y: 0, rotation: 0, duration: 0.58 }, 0)
        .to(portraitRef.current, { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.72 }, 0.16)
        .to(identityRef.current, { opacity: 1, y: 0, duration: 0.48 }, 0.48)
        .to(actionRef.current, { opacity: 1, y: 0, duration: 0.36 }, 0.68)
        .call(() => mountedRef.current && setVisualPhase("stable"), [], 1.06);
    }, sceneRef);

    return () => {
      entryTimelineRef.current = null;
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  useEffect(() => runtimeTransitionCoordinator.register("CONTINUE", async (_event, target, signal) => {
    if (target !== "S05" || !sceneRef.current) return;
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
        else reject(new Error("S04 to S05 handoff was cancelled."));
      };
      const onAbort = () => {
        exitTimelineRef.current?.kill();
        if (mountedRef.current) settlePose();
        finish(false);
      };
      signal.addEventListener("abort", onAbort, { once: true });
      exitTimelineRef.current = gsap.timeline({ onComplete: () => finish(true) })
        .to(actionRef.current, { opacity: 0, y: 8, duration: 0.2, ease: "power2.in" }, 0)
        .to(identityRef.current, { opacity: 0, y: -7, duration: 0.28, ease: "power2.in" }, 0.08)
        .to(frameRef.current, { opacity: 0, y: -10, duration: 0.42, ease: "power3.in" }, 0.14);
    });
  }), [prefersReducedMotion, settlePose]);

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
      data-testid="s04-scene"
      data-visual-phase={visualPhase}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      data-photo-state={photoState}
      aria-labelledby="s04-title"
      className="s04-scene"
    >
      <div className="s04-scene-index" aria-hidden="true">THE LAST / 04</div>
      <section className="s04-composition">
        <div ref={frameRef} className="s04-frame-stage" data-testid="s04-frame">
          <div className="s04-offset-mat" aria-hidden="true" />
          {frameAvailable && (
            // eslint-disable-next-line @next/next/no-img-element -- exact byte-preserved REV5 SVG.
            <img
              className="s04-rev5-frame"
              src="/assets/svg/editorial/editorial-frame-portrait.svg"
              alt=""
              aria-hidden="true"
              onError={() => setFrameAvailable(false)}
            />
          )}
          <div ref={portraitRef} className="s04-portrait-shell">
            {photoState !== "unavailable" ? (
              <Image
                data-testid="s04-portrait-image"
                data-photo-role="single-authorized-portrait"
                src={S04_PHOTO_PATH}
                alt="Portrait of Malica looking toward the camera."
                width={900}
                height={1200}
                sizes="(min-width: 900px) 38vw, 82vw"
                priority
                onLoad={() => setPhotoState("ready")}
                onError={() => setPhotoState("unavailable")}
              />
            ) : (
              <div className="s04-photo-fallback" role="status">Foto belum dapat dimuat.</div>
            )}
          </div>
        </div>

        <div ref={identityRef} className="s04-identity">
          <h1 id="s04-title">{S04_RECIPIENT_NAME}</h1>
          <span className="s04-identity-rule" aria-hidden="true" />
        </div>

        <div className="s04-action-area">
          <button
            ref={actionRef}
            type="button"
            onClick={handleContinue}
            disabled={transitionActive}
            aria-busy={transitionActive}
            className="s04-continue-action"
          >
            <span>{S04_CTA_LABEL}</span>
            <span className="s04-action-mark" aria-hidden="true">→</span>
          </button>
          {actionError && <p role="alert" className="s04-action-error">{actionError}</p>}
        </div>
      </section>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {visualPhase === "stable" ? `Portrait ${S04_RECIPIENT_NAME}. Tombol Lanjut tersedia.` : "Portrait sedang ditampilkan."}
      </div>
    </main>
  );
}
