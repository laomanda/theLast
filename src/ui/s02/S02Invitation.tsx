"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { FoldedEditorialKeepsake } from "./FoldedEditorialKeepsake";

type VisualPhase = "closed" | "opening" | "open";

export function S02Invitation() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);
  const leftFoldRef = useRef<HTMLDivElement | null>(null);
  const rightFoldRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const motifRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const activationPendingRef = useRef(false);
  const mountedRef = useRef(true);

  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const [assetAvailable, setAssetAvailable] = useState(true);
  const [visualPhase, setVisualPhase] = useState<VisualPhase>("closed");
  const [actionError, setActionError] = useState<string | null>(null);

  const restoreClosedPose = useCallback(() => {
    if (!leftFoldRef.current || !rightFoldRef.current || !rigRef.current) return;
    gsap.set(leftFoldRef.current, { rotationY: 170 });
    gsap.set(rightFoldRef.current, { rotationY: -170 });
    gsap.set(rigRef.current, {
      clipPath: "inset(0% 0% 0% 0% round 18px)",
      scale: 1,
      y: 0,
      rotation: -1.25,
      rotationX: 0,
      rotationY: 0,
    });
    if (innerRef.current) gsap.set(innerRef.current, { opacity: 0.78 });
    if (motifRef.current) {
      gsap.set(motifRef.current, {
        xPercent: -50,
        yPercent: -50,
        rotationY: 180,
        scale: 1,
        opacity: 1,
      });
    }
    if (shadowRef.current) gsap.set(shadowRef.current, { scale: 1, opacity: 0.76 });
    setVisualPhase("closed");
  }, []);

  const handleHoverStateChange = useCallback((hovered: boolean) => {
    if (prefersReducedMotion || visualPhase !== "closed" || !leftFoldRef.current) return;
    gsap.to(leftFoldRef.current, {
      rotationY: hovered ? 160 : 170,
      duration: hovered ? 0.35 : 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [prefersReducedMotion, visualPhase]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || visualPhase !== "closed" || !rigRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(rigRef.current, {
      rotationY: x * 8,
      rotationX: -y * 6,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [prefersReducedMotion, visualPhase]);

  const handlePointerLeave = useCallback(() => {
    if (prefersReducedMotion || visualPhase !== "closed" || !rigRef.current) return;
    gsap.to(rigRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [prefersReducedMotion, visualPhase]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      openTimelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    restoreClosedPose();
  }, [prefersReducedMotion, restoreClosedPose]);

  useEffect(() => {
    if (prefersReducedMotion || !sceneRef.current || !rigRef.current || !copyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rigRef.current,
        { clipPath: "inset(42% 35% 42% 35% round 28px)", scale: 0.84, opacity: 0.72 },
        { clipPath: "inset(0% 0% 0% 0% round 18px)", scale: 1, opacity: 1, duration: 0.68, ease: "power3.out" },
      );
      gsap.fromTo(copyRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.52, delay: 0.22, ease: "power2.out" });
      if (motifRef.current) {
        gsap.fromTo(motifRef.current, { opacity: 0.4, scale: 1.55 }, { opacity: 1, scale: 1, duration: 0.68, ease: "power3.out" });
      }
      if (shadowRef.current) {
        gsap.fromTo(shadowRef.current, { opacity: 0, scale: 0.68 }, { opacity: 0.76, scale: 1, duration: 0.68, ease: "power2.out" });
      }
    }, sceneRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const unregister = runtimeTransitionCoordinator.register(
      "OPEN_INVITATION",
      async (_event, _target, signal) => {
        if (!rigRef.current || !leftFoldRef.current || !rightFoldRef.current) return;
        setVisualPhase("opening");

        if (prefersReducedMotion) {
          gsap.set(leftFoldRef.current, { rotationY: 0 });
          gsap.set(rightFoldRef.current, { rotationY: 0 });
          gsap.set(rigRef.current, { rotation: 0, rotationX: 0, rotationY: 0, scale: 1 });
          if (innerRef.current) gsap.set(innerRef.current, { opacity: 1 });
          if (motifRef.current) {
            gsap.set(motifRef.current, {
              xPercent: -50,
              yPercent: -50,
              rotationY: 180,
              opacity: 0.72,
              scale: 0.86,
            });
          }
          if (shadowRef.current) gsap.set(shadowRef.current, { opacity: 0.76, scale: 1 });
          setVisualPhase("open");
          return;
        }

        await new Promise<void>((resolve, reject) => {
          let settled = false;
          const finish = (complete: boolean) => {
            if (settled) return;
            settled = true;
            signal.removeEventListener("abort", onAbort);
            if (complete) resolve();
            else reject(new Error("Invitation opening was cancelled."));
          };
          const onAbort = () => {
            openTimelineRef.current?.kill();
            if (mountedRef.current) restoreClosedPose();
            finish(false);
          };

          signal.addEventListener("abort", onAbort, { once: true });
          openTimelineRef.current = gsap
            .timeline({ onComplete: () => finish(true) })
            .to(rigRef.current, { scale: 0.985, y: 3, rotationX: 0, rotationY: 0, duration: 0.12, ease: "power1.out" })
            .to(leftFoldRef.current, { rotationY: 4, duration: 0.64, ease: "power3.inOut" }, 0.12)
            .to(rightFoldRef.current, { rotationY: -4, duration: 0.72, ease: "power3.inOut" }, 0.34)
            .to(innerRef.current, { opacity: 1, duration: 0.38, ease: "power2.out" }, 0.55)
            .to(motifRef.current, { opacity: 0.72, scale: 0.86, duration: 0.36, ease: "power2.out" }, 0.64)
            .to(shadowRef.current, { opacity: 0.52, scale: 0.82, duration: 0.3, ease: "power2.out" }, 0.64)
            .to(rigRef.current, { scale: 1, y: 0, rotation: 0, duration: 0.3, ease: "power2.out" }, 0.92)
            .to(shadowRef.current, { opacity: 0.76, scale: 1, duration: 0.28, ease: "power2.out" }, 0.92)
            .call(() => {
              if (mountedRef.current) setVisualPhase("open");
            }, [], 1.16)
            // Let the settled open pose register before the guarded commit.
            .to({}, { duration: 0.52 });
        });
      },
    );
    return unregister;
  }, [prefersReducedMotion, restoreClosedPose]);

  const handleOpen = async () => {
    if (activationPendingRef.current || experienceRuntime.isTransitionInFlight()) return;
    activationPendingRef.current = true;
    setActionError(null);

    const result = await experienceRuntime.dispatch({ type: "OPEN_INVITATION" });
    if (result.status !== "committed" && mountedRef.current) {
      restoreClosedPose();
      setActionError("Undangan belum dapat dibuka. Silakan coba lagi.");
      activationPendingRef.current = false;
    }
  };

  return (
    <main
      ref={sceneRef}
      data-testid="s02-scene"
      data-visual-phase={visualPhase}
      aria-labelledby="s02-title"
      className="s02-scene"
    >
      <section className="s02-composition">
        <div className="s02-object-column">
          <FoldedEditorialKeepsake
            rigRef={rigRef}
            leftFoldRef={leftFoldRef}
            rightFoldRef={rightFoldRef}
            innerRef={innerRef}
            motifRef={motifRef}
            shadowRef={shadowRef}
            assetAvailable={assetAvailable}
            onAssetError={() => setAssetAvailable(false)}
            onOpen={handleOpen}
            onHoverStateChange={handleHoverStateChange}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          />
        </div>

        <div ref={copyRef} className="s02-copy-column">
          <h1 id="s02-title" className="s02-title">Silahkan dibuka yaa 🎂.</h1>
          <p className="s02-subtitle">Sebuah lipatan kecil, disiapkan khusus untuk orang spesial.</p>
          <button
            type="button"
            onClick={handleOpen}
            onMouseEnter={() => handleHoverStateChange(true)}
            onMouseLeave={() => handleHoverStateChange(false)}
            disabled={transitionActive}
            aria-busy={transitionActive}
            className="s02-open-action"
          >
            <span className="s02-open-label">Open</span>
            <span aria-hidden="true" className="s02-open-arrow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          {actionError && <p role="alert" className="s02-action-error">{actionError}</p>}
        </div>
      </section>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {visualPhase === "opening" ? "Undangan sedang dibuka." : visualPhase === "open" ? "Undangan telah terbuka." : "Undangan tertutup. Tombol Open tersedia."}
      </div>
    </main>
  );
}
