"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

const COMMIT_DISTANCE = 148;
const COMMIT_PROGRESS = 0.62;

/** S09 is a local gesture gate and editorial-to-mechanical T3 handoff. */
export function S09HiddenDiscovery() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pointerStartRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const pendingRef = useRef(false);
  const progressRef = useRef(0);
  const reduced = usePrefersReducedMotion();
  const committed = useExperienceStore((state) => state.hiddenPortal === "committed");
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState(false);
  const [settled, setSettled] = useState(reduced);
  const [status, setStatus] = useState("Tarik permukaan ke atas, atau gunakan tombol.");

  const applyProgress = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(1, next));
    progressRef.current = bounded;
    setProgress(bounded);
    if (sceneRef.current) gsap.set(sceneRef.current, { "--s09-progress": bounded });
  }, []);

  const restore = useCallback((message = "Belum terbuka. Kamu bisa mencoba lagi.") => {
    draggingRef.current = false;
    pointerStartRef.current = null;
    setDragging(false);
    setPending(false);
    setStatus(message);
    if (!sceneRef.current || reduced) {
      applyProgress(0);
      return;
    }
    gsap.to(sceneRef.current, {
      "--s09-progress": 0,
      duration: 0.34,
      ease: "power2.out",
      onComplete: () => { progressRef.current = 0; setProgress(0); },
    });
  }, [applyProgress, reduced]);

  useEffect(() => {
    const onBlur = () => { if (draggingRef.current) restore("Gerakan dibatalkan dengan aman."); };
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
      timelineRef.current?.kill();
    };
  }, [restore]);

  useLayoutEffect(() => {
    if (!sceneRef.current) return;
    if (reduced) {
      gsap.set([layerRef.current, surfaceRef.current].filter(Boolean), { clearProps: "all" });
      return;
    }
    const context = gsap.context(() => {
      timelineRef.current = gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(layerRef.current, { opacity: 0, yPercent: 8, scale: 1.018 }, { opacity: 1, yPercent: 0, scale: 1, duration: 0.62, clearProps: "transform,opacity" })
        .fromTo(".s09-loop-art", { opacity: 0, rotate: -7, scale: 1.08 }, { opacity: 1, rotate: 0, scale: 1, duration: 0.7, clearProps: "transform,opacity" }, 0.08)
        .call(() => setSettled(true));
    }, sceneRef);
    return () => context.revert();
  }, [reduced]);

  useEffect(() => runtimeTransitionCoordinator.register("HIDDEN_SPACE_READY", async (_event, target, signal) => {
    if (target !== "S10" || reduced || !sceneRef.current) return;
    await new Promise<void>((resolve, reject) => {
      const abort = () => { timelineRef.current?.kill(); reject(new Error("S09 handoff cancelled.")); };
      signal.addEventListener("abort", abort, { once: true });
      timelineRef.current = gsap.timeline({ onComplete: () => { signal.removeEventListener("abort", abort); resolve(); } })
        .to(".s09-segment", { xPercent: (index) => (index - 2.5) * 24, duration: 0.36, ease: "power2.inOut" }, 0)
        .to(layerRef.current, { opacity: 0, y: -22, scale: 0.985, duration: 0.42, ease: "power2.inOut" }, 0.08);
    });
  }), [reduced]);

  const commitToVault = async () => {
    if (pendingRef.current || transitionActive || !committed) return;
    pendingRef.current = true;
    setPending(true);
    draggingRef.current = false;
    setDragging(false);
    applyProgress(1);
    setStatus("Lapisan terbuka. Menyiapkan Vault.");
    const result = await experienceRuntime.dispatch({ type: "HIDDEN_SPACE_READY" });
    if (result.status !== "committed") {
      pendingRef.current = false;
      restore("Lapisan belum dapat dibuka. Coba lagi.");
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (pendingRef.current || transitionActive || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStartRef.current = event.clientY;
    draggingRef.current = true;
    setDragging(true);
    setStatus("Terus tarik ke atas.");
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || pointerStartRef.current === null) return;
    applyProgress((pointerStartRef.current - event.clientY) / COMMIT_DISTANCE);
  };

  const finishPointer = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    if (!draggingRef.current) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const shouldCommit = !cancelled && progressRef.current >= COMMIT_PROGRESS;
    draggingRef.current = false;
    pointerStartRef.current = null;
    setDragging(false);
    if (shouldCommit) void commitToVault();
    else restore(cancelled ? "Gerakan dibatalkan dengan aman." : "Tarik sedikit lebih jauh untuk membuka.");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    void commitToVault();
  };

  const style = { "--s09-progress": 0 } as CSSProperties;
  return (
    <main ref={sceneRef} style={style} className="s09-scene" data-testid="s09-scene" data-settled={settled || reduced ? "true" : "false"} data-dragging={dragging ? "true" : "false"} data-progress={progress.toFixed(2)} data-reduced-motion={reduced ? "true" : "false"} aria-labelledby="s09-title">
      <div className="s09-depth-field" aria-hidden="true"><span /><span /><span /></div>
      <div ref={layerRef} className="s09-layer">
        <section className="s09-copy">
          <p className="s09-kicker">THE LAST / 09 · LAPISAN TAMBAHAN</p>
          <h1 id="s09-title">Masih ada ruang di balik permukaan ini.</h1>
          <p className="s09-pending">Arah dan pesan personal berikutnya menunggu persetujuan konten.</p>
        </section>

        <section className="s09-interaction" aria-label="Buka lapisan menuju Vault">
          <div className="s09-art-stage" aria-hidden="true">
            <span className="s09-loop-art" data-asset-path="/assets/svg/signature/offset-loop-open.svg" />
            <div className="s09-segments">
              {Array.from({ length: 6 }, (_, index) => <span className="s09-segment" key={index} />)}
            </div>
          </div>
          <div
            ref={surfaceRef}
            className="s09-gesture"
            data-testid="s09-gesture"
            role="button"
            tabIndex={0}
            aria-label="Tarik ke atas untuk membuka lapisan menuju Vault"
            aria-describedby="s09-instruction s09-status"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => finishPointer(event)}
            onPointerCancel={(event) => finishPointer(event, true)}
            onKeyDown={onKeyDown}
          >
            <span className="s09-gesture-handle" aria-hidden="true" />
            <span id="s09-instruction">Tarik ke atas untuk membuka lapisan berikutnya</span>
            <span className="s09-progress-track" aria-hidden="true"><span /></span>
          </div>
          <div className="s09-progress-sr" role="progressbar" aria-label="Kemajuan membuka lapisan" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} />
          <button type="button" data-testid="s09-continue" className="s09-continue" onClick={commitToVault} disabled={!committed || pending || transitionActive}>Buka dengan tombol</button>
          <p id="s09-status" className="s09-status" role="status" aria-live="polite">{status}</p>
        </section>
      </div>
    </main>
  );
}
