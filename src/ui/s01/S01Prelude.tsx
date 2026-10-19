"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime } from "../../state/experience-store";
import { OffsetLoopOpen } from "./OffsetLoopOpen";
import {
  evaluateCriticalReadiness,
  getControlledReadinessFixtureMode,
  type CriticalReadinessReport,
} from "./readiness";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function subscribeStaticFallback() {
  return () => {};
}

function getStaticFallbackSnapshot() {
  return getControlledReadinessFixtureMode() === "degraded";
}

function getStaticFallbackServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function S01Prelude() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const compositionRef = useRef<HTMLElement | null>(null);
  const motifWrapRef = useRef<HTMLDivElement | null>(null);
  const outerPathRef = useRef<SVGPathElement | null>(null);
  const innerPathRef = useRef<SVGPathElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const hasDispatchedRef = useRef<boolean>(false);
  const hasConsumedFailureFixtureRef = useRef<boolean>(false);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [readinessReport, setReadinessReport] = useState<CriticalReadinessReport | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const staticFallbackMounted = useSyncExternalStore(
    subscribeStaticFallback,
    getStaticFallbackSnapshot,
    getStaticFallbackServerSnapshot,
  );
  const isFailed = readinessReport?.overall === "failed";

  // GSAP Choreography (Editorial Reveal M3)
  useEffect(() => {
    if (prefersReducedMotion || isFailed) return;
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      entryTimelineRef.current = tl;

      // Step 1: Coral outer run traces (~232 deg)
      if (outerPathRef.current) {
        tl.to(outerPathRef.current, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: "power2.inOut",
        });
      }

      // Step 2: Periwinkle inner accent traces (~92 deg) after gap
      if (innerPathRef.current) {
        tl.to(
          innerPathRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.25",
        );
      }

      // Step 3: Hero microcopy gently settles
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }
    }, containerRef);

    return () => {
      entryTimelineRef.current = null;
      ctx.revert();
    };
  }, [prefersReducedMotion, isFailed]);

  useEffect(() => {
    const prepareHandoff = async (_event: unknown, _target: unknown, signal: AbortSignal) => {
      if (prefersReducedMotion) return;
      entryTimelineRef.current?.kill();
      if (outerPathRef.current) gsap.set(outerPathRef.current, { strokeDashoffset: 0 });
      if (innerPathRef.current) gsap.set(innerPathRef.current, { strokeDashoffset: 0 });
      if (textRef.current) gsap.set(textRef.current, { opacity: 1, y: 0 });

      await new Promise<void>((resolve, reject) => {
        let settled = false;
        const finish = (complete: boolean) => {
          if (settled) return;
          settled = true;
          signal.removeEventListener("abort", onAbort);
          if (complete) resolve();
          else reject(new Error("S01 to S02 handoff was cancelled."));
        };
        const onAbort = () => {
          transitionTimelineRef.current?.kill();
          if (textRef.current) gsap.set(textRef.current, { opacity: 1, x: 0 });
          if (motifWrapRef.current) gsap.set(motifWrapRef.current, { opacity: 1, scale: 1, rotation: 0 });
          finish(false);
        };

        signal.addEventListener("abort", onAbort, { once: true });
        transitionTimelineRef.current = gsap
          .timeline({ onComplete: () => finish(true) })
          .to(textRef.current, { opacity: 0, x: 14, duration: 0.32, ease: "power2.in" }, 0)
          .to(motifWrapRef.current, { scale: 0.76, rotation: -3, duration: 0.5, ease: "power3.inOut" }, 0)
          .to(compositionRef.current, { opacity: 0.9, duration: 0.18, ease: "none" }, 0.34);
      });
    };

    const unregisterReady = runtimeTransitionCoordinator.register("SHELL_READY", prepareHandoff);
    const unregisterDegraded = runtimeTransitionCoordinator.register("SHELL_DEGRADED_READY", prepareHandoff);
    return () => {
      transitionTimelineRef.current?.kill();
      unregisterReady();
      unregisterDegraded();
    };
  }, [prefersReducedMotion]);

  // Critical Readiness Assessment & Handoff
  useEffect(() => {
    let cancelled = false;

    async function evaluate() {
      if (hasDispatchedRef.current) return;

      try {
        const controlledFixture = getControlledReadinessFixtureMode();
        if (controlledFixture === "degraded" && !staticFallbackMounted) return;
        const fixtureOverride =
          controlledFixture === "fail" && hasConsumedFailureFixtureRef.current
            ? null
            : controlledFixture;
        const report = await evaluateCriticalReadiness({ fixtureOverride });

        if (cancelled) return;
        setReadinessReport(report);
        if (report.fixtureMode === "fail") hasConsumedFailureFixtureRef.current = true;

        const isHold = report.fixtureMode === "hold";

        if (report.overall === "ready" && !isHold && !hasDispatchedRef.current) {
          hasDispatchedRef.current = true;
          const currentScene = experienceRuntime.getState().scene;
          if (currentScene === "S01") {
            await experienceRuntime.dispatch({ type: "SHELL_READY" });
          }
        } else if (report.overall === "degraded" && !isHold && !hasDispatchedRef.current) {
          hasDispatchedRef.current = true;
          const currentScene = experienceRuntime.getState().scene;
          if (currentScene === "S01") {
            await experienceRuntime.dispatch({ type: "SHELL_DEGRADED_READY" });
          }
        }
      } catch {
        if (cancelled) return;
        setReadinessReport({
          overall: "failed",
          runtimeReady: false,
          fontReady: false,
          fontFallbackUsed: false,
          motifReady: false,
          motifFallbackUsed: false,
          errorDetail: "Unexpected readiness failure.",
        });
      } finally {
        if (!cancelled) {
          setIsRetrying(false);
        }
      }
    }

    void evaluate();

    return () => {
      cancelled = true;
    };
  }, [retryCount, staticFallbackMounted]);

  const controlledFixture = getControlledReadinessFixtureMode();
  const useStaticMotifFallback = staticFallbackMounted && controlledFixture === "degraded";

  const handleRetry = () => {
    hasDispatchedRef.current = false;
    setIsRetrying(true);
    setRetryCount((c) => c + 1);
  };

  return (
    <main
      role="main"
      aria-label="S01 — Prelude"
      ref={containerRef}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-x-hidden bg-[#F6F1E8] px-6 py-8 sm:px-10 sm:py-12 md:px-16 md:py-16 xl:px-[clamp(5rem,10vw,10rem)] xl:py-20"
    >
      {/* Top spacing / subtle editorial breathing room */}
      <header className="w-full flex justify-between items-center opacity-0 pointer-events-none" aria-hidden="true">
        <span className="font-mono text-xs text-[#2C282A]/40">theLast</span>
      </header>

      {/* Main Composition: Motif + Hero Microcopy */}
      <section ref={compositionRef} data-testid="s01-composition" className="flex flex-1 flex-col items-center justify-center md:grid md:grid-cols-[minmax(16rem,22rem)_minmax(19rem,28rem)] md:justify-center md:gap-x-24 xl:gap-x-32">
        {/* Motif: Signature Offset Loop (A02 Open Variant) */}
        <div
          ref={motifWrapRef}
          className="flex items-center justify-center"
          aria-hidden="true"
        >
          {useStaticMotifFallback ? (
            // eslint-disable-next-line @next/next/no-img-element -- the fallback must load the exact byte-preserved REV5 SVG.
            <img
              id="a02-static-fallback"
              src="/assets/svg/signature/offset-loop-open.svg"
              alt=""
              className="h-36 w-36 sm:h-44 sm:w-44 md:h-64 md:w-64 xl:h-72 xl:w-72"
            />
          ) : (
            <OffsetLoopOpen
              outerRef={outerPathRef}
              innerRef={innerPathRef}
              staticMode={prefersReducedMotion || isFailed}
              className="h-36 w-36 sm:h-44 sm:w-44 md:h-64 md:w-64 xl:h-72 xl:w-72"
            />
          )}
        </div>

        {/* Hero Microcopy & Failure/Recovery Surface */}
        <div className="mt-8 flex max-w-md flex-col items-center text-center md:mt-0 md:items-start md:text-left xl:max-w-lg">
          <p
            ref={textRef}
            tabIndex={-1}
            className={`font-display max-w-sm text-lg font-normal tracking-[-0.01em] text-[#2C282A] sm:max-w-md sm:text-xl md:max-w-none md:text-2xl xl:text-[2rem] ${
              prefersReducedMotion || isFailed ? "opacity-100" : "opacity-0"
            }`}
          >
            Ada sesuatu yang menunggu.
          </p>

          {/* Genuine failure and recovery state */}
          {isFailed && (
            <div
              role="alert"
              className="mt-6 flex flex-col items-center md:items-start space-y-3 rounded-lg border border-[#E67A6B]/30 bg-[#F6F1E8] p-4 text-left"
            >
              <p className="text-xs text-[#2C282A]/80">
                Ada kendala saat menyiapkan pengalaman.
              </p>
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="inline-flex items-center justify-center rounded-md border border-[#2C282A] px-4 py-2 font-display text-xs font-medium text-[#2C282A] transition-colors hover:bg-[#2C282A] hover:text-[#F6F1E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E67A6B] focus-visible:ring-offset-2 disabled:opacity-50"
              >
                {isRetrying ? "Memeriksa..." : "Coba lagi"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer spacer */}
      <footer className="w-full text-center opacity-0 pointer-events-none" aria-hidden="true">
        <span className="font-mono text-xs">S01</span>
      </footer>

      {/* Accessible live status for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isFailed
          ? "Ada kendala saat menyiapkan pengalaman. Tombol coba lagi tersedia."
          : "Memuat pengalaman, ada sesuatu yang menunggu."}
      </div>
    </main>
  );
}
