"use client";

import gsap from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

export function S08FinalBirthdayMoment() {
  const sceneRef = useRef<HTMLElement>(null);
  const breakRef = useRef<HTMLButtonElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const breakTimeline = useRef<gsap.core.Timeline | null>(null);
  const busyRef = useRef(false);
  const brokenRef = useRef(false);
  const [broken, setBroken] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (prefersReducedMotion || !sceneRef.current) return;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".s08-unfinished-art", { opacity: 0, y: 18, duration: .75 })
        .from(".s08-unfinished-copy > *", { opacity: 0, y: 18, stagger: .1, duration: .6 }, .12)
        .from(".s08-unfinished-actions > *", { opacity: 0, y: 12, stagger: .08, duration: .48 }, .35);
    }, sceneRef);
    return () => context.revert();
  }, [prefersReducedMotion]);

  useEffect(() => () => { breakTimeline.current?.kill(); }, []);

  useEffect(() => {
    if (prefersReducedMotion || !sceneRef.current || !window.matchMedia("(pointer: fine)").matches) return;
    const scene = sceneRef.current;
    const art = scene.querySelector<HTMLElement>(".s08-unfinished-illustration");
    const paper = scene.querySelector<HTMLElement>(".s08-unfinished-paper");
    const glow = scene.querySelector<HTMLElement>(".s08-unfinished-art");
    if (!art || !paper || !glow) return;
    const moveArtX = gsap.quickTo(art, "x", { duration: .75, ease: "power3.out" });
    const moveArtY = gsap.quickTo(art, "y", { duration: .75, ease: "power3.out" });
    const movePaperX = gsap.quickTo(paper, "x", { duration: 1.1, ease: "power2.out" });
    const movePaperY = gsap.quickTo(paper, "y", { duration: 1.1, ease: "power2.out" });
    const moveGlowX = gsap.quickTo(glow, "x", { duration: 1.4, ease: "power2.out" });
    const moveGlowY = gsap.quickTo(glow, "y", { duration: 1.4, ease: "power2.out" });
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      moveArtX(x * 16); moveArtY(y * 12);
      movePaperX(x * -8); movePaperY(y * -6);
      moveGlowX(x * 3); moveGlowY(y * 3);
    };
    const reset = () => {
      moveArtX(0); moveArtY(0); movePaperX(0); movePaperY(0); moveGlowX(0); moveGlowY(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", reset, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerleave", reset); reset(); };
  }, [prefersReducedMotion]);

  const continueToS09 = useCallback(async () => {
    if (busyRef.current || transitionActive) return;
    busyRef.current = true;
    setError(null);
    try {
      if (!experienceRuntime.getState().birthdayComplete) {
        const result = await experienceRuntime.dispatch({ type: "COMPLETE_BIRTHDAY" });
        if (result.status !== "applied") throw new Error("complete");
      }
      if (experienceRuntime.getState().hiddenPortal === "discoverable") {
        const result = await experienceRuntime.dispatch({ type: "ARM_HIDDEN_PORTAL" });
        if (result.status !== "applied") throw new Error("arm");
      }
      const result = await experienceRuntime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" });
      if (result.status !== "applied") throw new Error("commit");
    } catch {
      setError("Belum bisa melanjutkan. Coba sekali lagi, ya.");
    } finally { busyRef.current = false; }
  }, [transitionActive]);

  const replay = useCallback(async () => {
    if (busyRef.current || transitionActive) return;
    busyRef.current = true;
    breakTimeline.current?.kill();
    try {
      const result = await experienceRuntime.dispatch({ type: "REPLAY" });
      if (result.status !== "applied") setError("Belum bisa memutar ulang. Coba sekali lagi, ya.");
    } finally { busyRef.current = false; }
  }, [transitionActive]);

  const breakButton = useCallback(() => {
    if (brokenRef.current || !breakRef.current || transitionActive) return;
    brokenRef.current = true;
    setBroken(true);
    const left = breakRef.current.querySelector(".s08-break-left");
    const right = breakRef.current.querySelector(".s08-break-right");
    const crack = breakRef.current.querySelector(".s08-break-crack");
    if (prefersReducedMotion) {
      gsap.set(left, { x: -5, y: 7, rotation: -4, transformOrigin: "70% 50%" });
      gsap.set(right, { x: 5, y: 9, rotation: 5, transformOrigin: "30% 50%" });
      gsap.set(crack, { opacity: 0 });
      setMessageVisible(true);
      return;
    }
    breakTimeline.current = gsap.timeline()
      .to(breakRef.current, { scaleY: .94, duration: .12, transformOrigin: "50% 100%", ease: "power2.in" })
      .to(breakRef.current, { scaleY: 1, duration: .12, ease: "power2.out" })
      .fromTo(crack, { opacity: 1, strokeDashoffset: 90 }, { strokeDashoffset: 0, duration: .3, ease: "power1.inOut" }, .12)
      .to(crack, { opacity: 0, duration: .08 }, .42)
      .to(left, { x: -8, y: 10, rotation: -5, transformOrigin: "70% 50%", duration: .55, ease: "bounce.out" }, .42)
      .to(right, { x: 8, y: 13, rotation: 6, transformOrigin: "30% 50%", duration: .6, ease: "bounce.out" }, .42)
      .call(() => setMessageVisible(true), [], .82)
      .to(primaryRef.current, { boxShadow: "0 0 0 7px rgba(230,122,107,.3), 4px 5px 0 #eca06e", duration: .28, yoyo: true, repeat: 1 }, 1.05);
  }, [prefersReducedMotion, transitionActive]);

  return (
    <main ref={sceneRef} className="s08-scene s08-unfinished" data-testid="s08-scene" data-broken={broken} aria-labelledby="s08-title">
      <div className="s08-unfinished-art" aria-hidden="true">
        <span className="s08-unfinished-paper" />
        <svg viewBox="0 0 700 760" className="s08-unfinished-illustration">
          <path className="s08-art-arc" d="M118 670C275 565 255 344 510 177" />
          <path className="s08-art-line" d="M76 635C272 529 335 341 564 198" />
          <g className="s08-art-flower" transform="translate(480 270) rotate(-12)">
            <path d="M0 -18 C-35 -65 -31 -115 0 -128 C31 -115 35 -65 0 -18Z" />
            <path d="M0 -18 C-35 -65 -31 -115 0 -128 C31 -115 35 -65 0 -18Z" transform="rotate(60)" />
            <path d="M0 -18 C-35 -65 -31 -115 0 -128 C31 -115 35 -65 0 -18Z" transform="rotate(120)" />
            <path d="M0 -18 C-35 -65 -31 -115 0 -128 C31 -115 35 -65 0 -18Z" transform="rotate(180)" />
            <path d="M0 -18 C-35 -65 -31 -115 0 -128 C31 -115 35 -65 0 -18Z" transform="rotate(240)" />
            <path d="M0 -18 C-35 -65 -31 -115 0 -128 C31 -115 35 -65 0 -18Z" transform="rotate(300)" />
            <circle r="34" /><circle className="s08-art-flower-core" r="12" />
          </g>
          <path className="s08-art-star" d="M196 194l9 22 24 2-18 16 5 23-20-12-20 12 5-23-18-16 24-2z" />
          <path className="s08-art-star s08-art-star-small" d="M397 536l5 13 14 1-11 9 3 14-11-7-12 7 3-14-11-9 14-1z" />
        </svg>
      </div>
      <div className="s08-unfinished-layout">
        <section className="s08-unfinished-copy">
          <span className="s08-unfinished-rule" aria-hidden="true" />
          <p className="s08-unfinished-eyebrow">UNTUK CERITA YANG BERLANJUT</p>
          <h1 id="s08-title">Setiap akhir,<br />menyimpan <em>kejutan lagi.</em></h1>
          <p className="s08-unfinished-description">Beberapa cerita memang terlalu indah untuk berhenti di sini.</p>
          <div className="s08-unfinished-actions" data-testid="s08-ending-controls">
            <button ref={primaryRef} type="button" className="s08-next" data-testid="s08-next" onClick={continueToS09} disabled={transitionActive}><span>Lanjut ke S09</span><span aria-hidden="true">↗</span></button>
            <div className="s08-unfinished-secondary">
              <button type="button" className="s08-restart" data-testid="s08-replay" onClick={replay} disabled={transitionActive}><span aria-hidden="true">↺</span> Putar ulang</button>
              <button ref={breakRef} type="button" className="s08-break-button" data-testid="s08-break" aria-label={broken ? "Tandai selesai, sudah pecah. Cerita masih berlanjut." : "Tandai selesai"} aria-disabled={broken || transitionActive} onClick={breakButton}>
                <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true">
                  <defs><clipPath id="s08-piece-left"><path d="M32 2H151L143 15 155 26 143 38 150 49 145 62H32C15 62 2 49 2 32S15 2 32 2Z"/></clipPath><clipPath id="s08-piece-right"><path d="M151 2H268C285 2 298 15 298 32S285 62 268 62H145L150 49 143 38 155 26 143 15Z"/></clipPath></defs>
                  <g className="s08-break-left" clipPath="url(#s08-piece-left)"><rect x="1" y="1" width="298" height="62" rx="31"/><text x="150" y="38" textAnchor="middle">Tandai selesai</text></g>
                  <g className="s08-break-right" clipPath="url(#s08-piece-right)"><rect x="1" y="1" width="298" height="62" rx="31"/><text x="150" y="38" textAnchor="middle">Tandai selesai</text></g>
                  <path className="s08-break-outline" d="M151 2H268C285 2 298 15 298 32S285 62 268 62H32C15 62 2 49 2 32S15 2 32 2Z" />
                  <path className="s08-break-crack" d="M151 2L143 15 155 26 143 38 150 49 145 62" />
                </svg>
              </button>
            </div>
            <p className="s08-break-message" data-visible={messageVisible} role="status" aria-live="polite">{messageVisible ? "Eh, belum selesai." : ""}</p>
            {error && <p className="s08-unfinished-error" role="alert">{error}</p>}
          </div>
        </section>
        <div className="s08-unfinished-aside" aria-hidden="true"><span>27</span><i>✳</i></div>
      </div>
    </main>
  );
}
