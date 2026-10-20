"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime } from "../../state/experience-store";
import { MalicaLoadingMark } from "./MalicaLoadingMark";
import { S01LoadingOrnaments } from "./S01LoadingOrnaments";
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
  const loopRingGroupRef = useRef<SVGGElement | null>(null);
  const outerRingRef = useRef<SVGPathElement | null>(null);
  const innerRingRef = useRef<SVGPathElement | null>(null);
  const malicaGlyphRef = useRef<SVGPathElement | null>(null);
  const malicaShadowRef = useRef<SVGPathElement | null>(null);
  const malicaSparkRef = useRef<SVGCircleElement | null>(null);
  const age19Ref = useRef<SVGGElement | null>(null);
  const spark1Ref = useRef<SVGGElement | null>(null);
  const spark2Ref = useRef<SVGGElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const hasDispatchedRef = useRef<boolean>(false);
  const hasConsumedFailureFixtureRef = useRef<boolean>(false);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const breathingTweenRef = useRef<gsap.core.Tween | null>(null);
  const sparkTweenRef = useRef<gsap.core.Tween | null>(null);
  const mountTimeRef = useRef<number>(0);
  const scheduledDispatchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userRequestedAccelerateRef = useRef<boolean>(false);

  useEffect(() => {
    if (mountTimeRef.current === 0) {
      mountTimeRef.current = Date.now();
    }
  }, []);

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

  // GSAP Choreography (Editorial Inking & Living Breathing Reveal)
  useEffect(() => {
    if (prefersReducedMotion || isFailed) return;
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          // Living ambient float: subtle rotation/breath on the rings and gentle glow on the spark
          if (loopRingGroupRef.current && !hasDispatchedRef.current) {
            breathingTweenRef.current = gsap.to(loopRingGroupRef.current, {
              rotation: 1.2,
              scale: 1.018,
              duration: 3.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
          if (malicaSparkRef.current && !hasDispatchedRef.current) {
            sparkTweenRef.current = gsap.to(malicaSparkRef.current, {
              scale: 1.2,
              opacity: 1,
              duration: 1.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        },
      });
      entryTimelineRef.current = tl;

      // 1. Soft inking of outer loop ring
      if (outerRingRef.current) {
        tl.to(
          outerRingRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.inOut",
          },
          0,
        );
      }

      // 2. Inner lavender ring traces with soft offset
      if (innerRingRef.current) {
        tl.to(
          innerRingRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.95,
            ease: "power2.out",
          },
          0.2,
        );
      }

      // 3. Signature Malica 'M' monogram inky draw
      if (malicaGlyphRef.current) {
        tl.to(
          malicaGlyphRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          0.35,
        );
      }

      // 4. Soft monogram shadow settles
      if (malicaShadowRef.current) {
        tl.to(
          malicaShadowRef.current,
          {
            opacity: 0.06,
            duration: 0.7,
            ease: "power1.out",
          },
          0.65,
        );
      }

      // 5. Central coral spark blooms at the apex of the 'M'
      if (malicaSparkRef.current) {
        tl.fromTo(
          malicaSparkRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.9,
            duration: 0.55,
            ease: "back.out(1.4)",
          },
          0.75,
        );
      }

      // 6. Age '19' numeral resolves softly
      if (age19Ref.current) {
        tl.fromTo(
          age19Ref.current,
          { opacity: 0, y: 5 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          0.85,
        );
      }

      // 7. Ambient sparks twinkle into presence
      const sparks = [spark1Ref.current, spark2Ref.current].filter(Boolean);
      if (sparks.length > 0) {
        tl.fromTo(
          sparks,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
          },
          0.9,
        );
      }

      // 8. Hero display typography gently reveals into place
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          0.85,
        );
      }
    }, containerRef);

    return () => {
      entryTimelineRef.current = null;
      breathingTweenRef.current?.kill();
      sparkTweenRef.current?.kill();
      ctx.revert();
    };
  }, [prefersReducedMotion, isFailed]);

  // Transition Coordinator Handoff to S02
  useEffect(() => {
    const prepareHandoff = async (_event: unknown, _target: unknown, signal: AbortSignal) => {
      if (prefersReducedMotion) return;

      // Stop inking and breathing safely
      entryTimelineRef.current?.kill();
      breathingTweenRef.current?.kill();
      sparkTweenRef.current?.kill();
      if (motifWrapRef.current) {
        gsap.killTweensOf(motifWrapRef.current);
      }

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
          if (textRef.current) gsap.set(textRef.current, { opacity: 1, x: 0, y: 0 });
          if (motifWrapRef.current) gsap.set(motifWrapRef.current, { opacity: 1, scale: 1, rotation: 0, x: 0, y: 0 });
          finish(false);
        };

        signal.addEventListener("abort", onAbort, { once: true });

        const tl = gsap.timeline({ onComplete: () => finish(true) });
        transitionTimelineRef.current = tl;

        // 1. Visually continuous stroke completion
        if (outerRingRef.current) {
          tl.to(outerRingRef.current, { strokeDashoffset: 0, duration: 0.22, ease: "power2.out" }, 0);
        }
        if (innerRingRef.current) {
          tl.to(innerRingRef.current, { strokeDashoffset: 0, duration: 0.2, ease: "power2.out" }, 0);
        }
        if (malicaGlyphRef.current) {
          tl.to(malicaGlyphRef.current, { strokeDashoffset: 0, duration: 0.2, ease: "power2.out" }, 0);
        }

        // 2. Microcopy softly resolves out with subtle upward drift
        if (textRef.current) {
          tl.to(textRef.current, { opacity: 0, y: -8, duration: 0.32, ease: "power2.in" }, 0);
        }

        // 3. Motif resolves toward S02 folded keepsake geometry (T2 spatial continuity)
        if (motifWrapRef.current) {
          tl.to(
            motifWrapRef.current,
            { scale: 0.84, rotation: -2, x: 0, y: 0, duration: 0.44, ease: "power2.inOut" },
            0,
          );
        }

        // 4. Subtle composition fade
        if (compositionRef.current) {
          tl.to(
            compositionRef.current,
            { opacity: 0.92, duration: 0.2, ease: "none" },
            0.24,
          );
        }
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

  const dispatchTransition = async (type: "SHELL_READY" | "SHELL_DEGRADED_READY") => {
    if (hasDispatchedRef.current) return;
    hasDispatchedRef.current = true;
    breathingTweenRef.current?.kill();
    sparkTweenRef.current?.kill();
    const currentScene = experienceRuntime.getState().scene;
    if (currentScene === "S01") {
      await experienceRuntime.dispatch({ type });
    }
  };

  // Critical Readiness Assessment & Narrative Pacing (~4s comfortable reading window)
  useEffect(() => {
    const MIN_NARRATIVE_DURATION_MS = 4000;
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
        if (isHold) return;

        const eventType: "SHELL_READY" | "SHELL_DEGRADED_READY" | null =
          report.overall === "ready"
            ? "SHELL_READY"
            : report.overall === "degraded"
            ? "SHELL_DEGRADED_READY"
            : null;

        if (eventType && !hasDispatchedRef.current) {
          const elapsed = Date.now() - mountTimeRef.current;
          const remaining = userRequestedAccelerateRef.current || prefersReducedMotion
            ? 0
            : Math.max(0, MIN_NARRATIVE_DURATION_MS - elapsed);

          if (remaining === 0) {
            void dispatchTransition(eventType);
          } else {
            scheduledDispatchTimerRef.current = setTimeout(() => {
              if (!cancelled && !hasDispatchedRef.current) {
                void dispatchTransition(eventType);
              }
            }, remaining);
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
      if (scheduledDispatchTimerRef.current) {
        clearTimeout(scheduledDispatchTimerRef.current);
      }
    };
  }, [retryCount, staticFallbackMounted, prefersReducedMotion]);

  // Click/Tap to Accelerate (Zero-friction skip for recipient)
  const handleUserAccelerate = () => {
    if (isFailed || hasDispatchedRef.current) return;

    userRequestedAccelerateRef.current = true;
    if (scheduledDispatchTimerRef.current) {
      clearTimeout(scheduledDispatchTimerRef.current);
      scheduledDispatchTimerRef.current = null;
    }

    if (readinessReport?.overall === "ready") {
      void dispatchTransition("SHELL_READY");
    } else if (readinessReport?.overall === "degraded") {
      void dispatchTransition("SHELL_DEGRADED_READY");
    }
  };

  // Subtle Mouse Parallax / Tactile Drift on Desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || isFailed || !motifWrapRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(motifWrapRef.current, {
      x: nx * 14,
      y: ny * 14,
      rotation: nx * 3,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || isFailed || !motifWrapRef.current) return;
    gsap.to(motifWrapRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const controlledFixture = getControlledReadinessFixtureMode();
  const useStaticMotifFallback = staticFallbackMounted && controlledFixture === "degraded";

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    hasDispatchedRef.current = false;
    userRequestedAccelerateRef.current = false;
    mountTimeRef.current = Date.now();
    setIsRetrying(true);
    setRetryCount((c) => c + 1);
  };

  return (
    <main
      role="main"
      aria-label="S01 — Prelude"
      ref={containerRef}
      onClick={handleUserAccelerate}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-x-hidden bg-[#F6F1E8] px-6 py-8 sm:px-10 sm:py-12 md:px-16 md:py-16 xl:px-[clamp(4rem,8vw,8rem)] xl:py-16 cursor-default select-none"
    >
      {/* Structural top line spacer */}
      <header className="w-full flex justify-between items-center opacity-0 pointer-events-none" aria-hidden="true">
        <span className="font-mono text-xs">theLast</span>
      </header>

      <S01LoadingOrnaments />

      {/* Main Composition: Centerpiece Motif + Hero Display Typography */}
      <section
        ref={compositionRef}
        data-testid="s01-composition"
        className="flex flex-1 flex-col items-center justify-center -translate-y-2 sm:-translate-y-3 md:translate-y-0 md:grid md:grid-cols-[auto_minmax(22rem,32rem)] md:items-center md:justify-center md:gap-x-16 lg:gap-x-20 xl:gap-x-28"
      >
        {/* Motif: Signature Offset Loop (A02 Open Variant) */}
        <div
          ref={motifWrapRef}
          className="flex items-center justify-center will-change-transform"
          aria-hidden="true"
        >
          {useStaticMotifFallback ? (
            // eslint-disable-next-line @next/next/no-img-element -- the fallback must load the exact byte-preserved REV5 SVG.
            <img
              id="a02-static-fallback"
              src="/assets/svg/signature/offset-loop-open.svg"
              alt=""
              className="h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
            />
          ) : (
            <MalicaLoadingMark
              loopRingGroupRef={loopRingGroupRef}
              outerRingRef={outerRingRef}
              innerRingRef={innerRingRef}
              malicaGlyphRef={malicaGlyphRef}
              malicaShadowRef={malicaShadowRef}
              malicaSparkRef={malicaSparkRef}
              age19Ref={age19Ref}
              spark1Ref={spark1Ref}
              spark2Ref={spark2Ref}
              staticMode={prefersReducedMotion || isFailed}
              className="h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
            />
          )}
        </div>

        {/* Hero Typography & Failure/Recovery Surface */}
        <div className="mt-8 flex max-w-sm flex-col items-center text-center sm:mt-10 md:mt-0 md:max-w-md md:items-start md:text-left lg:max-w-lg">
          <div
            ref={textRef}
            tabIndex={-1}
            style={{ opacity: prefersReducedMotion || isFailed ? 1 : 0 }}
          >
            <p className="font-display text-2xl font-normal leading-tight tracking-[-0.02em] text-[#2C282A] sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3rem]">
              Halo Malica YH.
            </p>
            <p
              className="mt-3 text-sm font-normal italic tracking-normal text-[#2C282A]/75 sm:text-base md:text-lg"
              style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
            >
              Ada sesuatu yang menunggu.
            </p>
          </div>

          {/* Genuine failure and recovery state */}
          {isFailed && (
            <div
              role="alert"
              className="mt-6 flex flex-col items-center md:items-start space-y-3 rounded-lg border border-[#E67A6B]/30 bg-[#F6F1E8] p-4 text-left shadow-sm"
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
