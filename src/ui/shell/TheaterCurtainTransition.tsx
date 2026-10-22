"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { curtainTransitionController } from "../../runtime/curtain-transition-controller";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

type CurtainPhase = "idle" | "closing" | "covered" | "switching" | "opening" | "complete";

export function TheaterCurtainTransition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeResolveRef = useRef<(() => void) | null>(null);
  const closeRejectRef = useRef<((error: Error) => void) | null>(null);
  const phaseRef = useRef<CurtainPhase>("idle");
  const openingStartedRef = useRef(false);
  const [phase, setPhaseState] = useState<CurtainPhase>("idle");
  const scene = useExperienceStore((state) => state.scene);
  const reduced = usePrefersReducedMotion();
  const mounted = phase !== "idle";

  const setPhase = (next: CurtainPhase) => {
    phaseRef.current = next;
    setPhaseState(next);
  };

  useEffect(() => runtimeTransitionCoordinator.register("COMMIT_HIDDEN_PORTAL", async (_event, target, signal) => {
    if (target !== "S09") return;
    if (phaseRef.current !== "idle") throw new Error("Curtain transition is already active.");

    curtainTransitionController.begin("S09");
    openingStartedRef.current = false;
    setPhase("closing");

    await new Promise<void>((resolve, reject) => {
      closeResolveRef.current = resolve;
      closeRejectRef.current = reject;
      const abort = () => {
        timelineRef.current?.kill();
        closeResolveRef.current = null;
        closeRejectRef.current = null;
        curtainTransitionController.finish();
        setPhase("idle");
        reject(new Error("Curtain transition cancelled."));
      };
      signal.addEventListener("abort", abort, { once: true });
      closeResolveRef.current = () => {
        signal.removeEventListener("abort", abort);
        closeResolveRef.current = null;
        closeRejectRef.current = null;
        resolve();
      };
    });
  }), []);

  useLayoutEffect(() => {
    if (!mounted || phaseRef.current !== "closing" || !rootRef.current) return;

    const root = rootRef.current;
    const context = gsap.context(() => {
      const left = root.querySelector<HTMLElement>(".curtain-panel--left");
      const right = root.querySelector<HTMLElement>(".curtain-panel--right");
      const edges = gsap.utils.toArray<HTMLElement>(".curtain-edge", root);
      const folds = gsap.utils.toArray<HTMLElement>(".curtain-fold", root);
      const interlude = root.querySelector<HTMLElement>(".curtain-interlude");
      const glow = root.querySelector<HTMLElement>(".curtain-glow");
      const reducedVeil = root.querySelector<HTMLElement>(".curtain-reduced-veil");

      gsap.set(root, { opacity: 1 });
      gsap.set(interlude, { opacity: 0, y: 8 });
      gsap.set(glow, { opacity: 0 });

      if (reduced) {
        timelineRef.current = gsap.timeline({
          onComplete: () => {
            setPhase("switching");
            closeResolveRef.current?.();
          },
        })
          .set(reducedVeil, { opacity: 0 })
          .to(reducedVeil, { opacity: 1, duration: 0.16, ease: "none" })
          .call(() => setPhase("covered"))
          .to(interlude, { opacity: 1, y: 0, duration: 0.01 })
          .to(interlude, { opacity: 0, duration: 0.08 }, "+=0.18");
        return;
      }

      // CSS supplies these exact transforms before first paint. Animate the
      // transform string directly so GSAP does not add xPercent on top of the
      // authored percentage transform and accidentally keep panels offscreen.
      gsap.set(edges, { xPercent: (index) => index === 0 ? -24 : 24 });

      timelineRef.current = gsap.timeline({
        onComplete: () => {
          setPhase("switching");
          closeResolveRef.current?.();
        },
      })
        .to(left, { transform: "translate3d(0%, 0, 0)", duration: 1.05, ease: "power3.inOut" }, 0)
        .to(right, { transform: "translate3d(0%, 0, 0)", duration: 1.08, ease: "power3.inOut" }, 0)
        .to(edges[0], { xPercent: 0, duration: 0.82, ease: "sine.inOut" }, 0.16)
        .to(edges[1], { xPercent: 0, duration: 0.86, ease: "sine.inOut" }, 0.18)
        .to(folds, { scaleX: 0.82, stagger: { each: 0.025, from: "center" }, duration: 0.42, ease: "sine.inOut" }, 0.56)
        .call(() => setPhase("covered"), [], 1.08)
        .to(interlude, { opacity: 1, y: 0, duration: 0.34, ease: "power2.out" }, 1.08)
        .to(glow, { opacity: 0.7, duration: 0.3 }, 1.12)
        .to(interlude, { opacity: 0, y: -5, duration: 0.24 }, 1.58)
        .to(glow, { opacity: 0.25, duration: 0.2 }, 1.58);
    }, root);

    return () => context.revert();
  }, [mounted, reduced]);

  useLayoutEffect(() => {
    if (!mounted || scene !== "S09" || phaseRef.current !== "switching" || openingStartedRef.current || !rootRef.current) return;

    openingStartedRef.current = true;
    const readinessAbort = new AbortController();
    const root = rootRef.current;

    void curtainTransitionController.waitUntilReady("S09", readinessAbort.signal).then(() => {
      if (!rootRef.current || readinessAbort.signal.aborted) return;
      setPhase("opening");
      curtainTransitionController.reveal("S09");

      const finish = () => {
        setPhase("complete");
        curtainTransitionController.finish();
        setPhase("idle");
      };

      if (reduced) {
        timelineRef.current = gsap.timeline({ onComplete: finish })
          .to(root.querySelector(".curtain-reduced-veil"), { opacity: 0, duration: 0.2, ease: "none" })
          .to(root, { opacity: 0, duration: 0.01 });
        return;
      }

      const left = root.querySelector(".curtain-panel--left");
      const right = root.querySelector(".curtain-panel--right");
      const leftEdge = root.querySelector(".curtain-edge--left");
      const rightEdge = root.querySelector(".curtain-edge--right");
      const folds = gsap.utils.toArray<HTMLElement>(".curtain-fold", root);
      timelineRef.current = gsap.timeline({ onComplete: finish })
        .to(folds, { scaleX: 1, stagger: { each: 0.02, from: "edges" }, duration: 0.28, ease: "sine.out" }, 0)
        .to(leftEdge, { xPercent: -28, duration: 0.72, ease: "power2.in" }, 0.04)
        .to(rightEdge, { xPercent: 28, duration: 0.72, ease: "power2.in" }, 0.04)
        .to(left, { transform: "translate3d(-108%, 0, 0)", duration: 1.05, ease: "power3.inOut" }, 0.1)
        .to(right, { transform: "translate3d(108%, 0, 0)", duration: 1.08, ease: "power3.inOut" }, 0.1)
        .to(root, { opacity: 0, duration: 0.12 }, 1.05);
    }).catch(() => {
      if (!readinessAbort.signal.aborted) {
        curtainTransitionController.finish();
        setPhase("idle");
      }
    });

    return () => readinessAbort.abort();
  }, [mounted, reduced, scene]);

  useEffect(() => () => {
    timelineRef.current?.kill();
    closeRejectRef.current?.(new Error("Curtain transition unmounted."));
    curtainTransitionController.finish();
  }, []);

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="theater-curtain" data-testid="s08-s09-curtain" data-phase={phase} aria-hidden="true">
      <div className="curtain-reduced-veil" />
      <div className="curtain-glow" />
      <CurtainPanel side="left" />
      <CurtainPanel side="right" />
      <p className="curtain-interlude">One more act…</p>
    </div>
  );
}

function CurtainPanel({ side }: { side: "left" | "right" }) {
  const folds = Array.from({ length: 8 }, (_, index) => <span className="curtain-fold" key={index} />);
  return (
    <div className={`curtain-panel curtain-panel--${side}`}>
      <div className="curtain-valance" />
      <div className="curtain-fabric">{folds}</div>
      <div className={`curtain-edge curtain-edge--${side}`}><span /></div>
      <div className="curtain-trim" />
    </div>
  );
}
