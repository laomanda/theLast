"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { CelebrationBurst } from "./CelebrationBurst";
import { S03Paperworld, S03_PAPER_EGG_COUNT } from "./S03Paperworld";

export const S03_RECIPIENT_NAME = "Malica Yohana Hutagaol";
export const S03_FULL_GREETING = `Happy Birthday, ${S03_RECIPIENT_NAME}.`;
export const S03_CTA_LABEL = "Lanjut";
const S03_BURST_PARTICLES = Array.from({ length: 140 }, (_, index) => index);
function S03LowerGraphics() {
  return (
    <>
      <svg className="s03-lavender-surface" viewBox="0 0 720 360" aria-hidden="true" focusable="false">
        <path d="M0 280C120 214 222 170 356 190c150 22 226 88 364 78v112H0Z" fill="#B8A8C6" fillOpacity=".34" />
      </svg>
      <svg className="s03-lavender-ribbon" viewBox="0 0 760 560" aria-hidden="true" focusable="false">
        <path
          d="M-38 156C74 58 215 70 242 190c27 121-105 245-169 173-52-59 43-137 153-133 157 6 257 100 322 278"
          fill="none"
          stroke="#A99BC6"
          strokeLinecap="round"
          strokeWidth="18"
          strokeOpacity=".66"
        />
      </svg>
    </>
  );
}

function S03PhysicsBurst() {
  const particleRefs = useRef<(HTMLElement | null)[]>([]);
  const burstRef = useRef<HTMLDivElement | null>(null);
  const [particleCount, setParticleCount] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const compact = window.innerWidth < 600;
    const tablet = window.innerWidth < 1024;
    const dprPenalty = window.devicePixelRatio > 1.5;
    const count = compact ? (dprPenalty ? 110 : 150) : tablet ? (dprPenalty ? 170 : 220) : (dprPenalty ? 250 : 320);
    const frame = requestAnimationFrame(() => setParticleCount(count));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!particleCount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pointerX = -1000;
    let pointerY = -1000;
    let pointerActive = false;
    const particles = Array.from({ length: particleCount }, (_, index) => ({
      x: window.innerWidth * ((index * 0.618033) % 1), y: -20 - (index % 8) * 18,
      vx: ((index * 37) % 180) - 90, vy: 28 + (index % 9) * 10,
      gravity: 115 + (index % 5) * 24, drag: 0.989 + (index % 4) * 0.002,
      rotation: index * 19, spin: ((index % 7) - 3) * 2.5,
      settled: false,
      delay: (index / particleCount) * 2600,
    }));
    let frame = 0;
    let last = performance.now();
    const startedAt = performance.now();
    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = true;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const handlePointerLeave = () => { pointerX = -1000; pointerY = -1000; pointerActive = false; };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      const elapsed = now - startedAt;
      particles.forEach((particle, index) => {
        if (elapsed < particle.delay) return;
        if (pointerActive) {
          const dx = particle.x - pointerX;
          const dy = particle.y - pointerY;
          const distanceSquared = dx * dx + dy * dy;
          if (!particle.settled || distanceSquared < 8464) {
            const distance = Math.sqrt(distanceSquared);
            if (distance < 92) {
              const force = (92 - distance) / 92;
              particle.vx += (dx / Math.max(distance, 1)) * force * 420 * dt;
              particle.vy -= force * 180 * dt;
              particle.settled = false;
            }
          }
        }
        particle.vy += particle.gravity * dt;
        particle.vx *= Math.pow(particle.drag, dt * 60);
        particle.vy *= Math.pow(particle.drag, dt * 24);
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.rotation += particle.spin;
        if (particle.y >= window.innerHeight - 10) {
          particle.y = window.innerHeight - 10;
          particle.vy = 0;
          particle.vx *= 0.82;
          particle.spin *= 0.92;
          if (Math.abs(particle.vx) < 2) particle.settled = true;
        }
        const node = particleRefs.current[index];
        if (node) node.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) rotate(${particle.rotation}deg)`;
      });
      const active = particles.some((particle) => !particle.settled);
      if (active) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [particleCount]);
  const colors = ["#E67A6B", "#ECA06E", "#A79DCD", "#8794CC", "#F6F1E8"];
  const shapes = ["bead", "paper", "star", "ribbon"];
  return <div ref={burstRef} className="s03-physics-burst" aria-hidden="true">
    {Array.from({ length: particleCount }, (_, index) => (
      <i key={index} ref={(node) => { particleRefs.current[index] = node; }} className={`s03-physics-particle s03-physics-particle--${shapes[index % shapes.length]}`} style={{ "--particle-color": colors[index % colors.length] } as CSSProperties} />
    ))}
  </div>;
}

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
  const arcXToRef = useRef<((value: number) => void) | null>(null);
  const arcYToRef = useRef<((value: number) => void) | null>(null);
  const burstXToRef = useRef<((value: number) => void) | null>(null);
  const burstYToRef = useRef<((value: number) => void) | null>(null);
  const activationPendingRef = useRef(false);
  const mountedRef = useRef(true);

  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const [visualPhase, setVisualPhase] = useState<VisualPhase>(prefersReducedMotion ? "stable" : "canvas");
  const [arcAvailable, setArcAvailable] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);
  const [discoveredEggCount, setDiscoveredEggCount] = useState(0);
  const [reminderKey, setReminderKey] = useState(0);

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

    arcXToRef.current = gsap.quickTo(arcRef.current, "x", { duration: 0.55, ease: "power3.out" });
    arcYToRef.current = gsap.quickTo(arcRef.current, "y", { duration: 0.65, ease: "power3.out" });
    burstXToRef.current = gsap.quickTo(burstRef.current, "x", { duration: 0.38, ease: "power3.out" });
    burstYToRef.current = gsap.quickTo(burstRef.current, "y", { duration: 0.45, ease: "power3.out" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      entryTimelineRef.current = tl;

      tl.set(canvasRef.current, { visibility: "visible", opacity: 0, clipPath: "inset(42% 12% 42% 12% round 20px)" })
        .set(greetingRef.current, { yPercent: 112, opacity: 0 })
        .set(nameRef.current, { yPercent: 112, opacity: 0 })
        .set(arcRef.current, { opacity: 0, scale: 0.82, rotation: -5 })
        .set(burstRef.current, { opacity: 0, scale: 0.72, rotation: -4 })
        .set(actionRef.current, { opacity: 0, y: 10 })
        .to(canvasRef.current, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          opacity: 1,
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
      arcXToRef.current = null;
      arcYToRef.current = null;
      burstXToRef.current = null;
      burstYToRef.current = null;
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
    if (discoveredEggCount < S03_PAPER_EGG_COUNT) {
      setReminderKey((current) => current + 1);
      return;
    }
    activationPendingRef.current = true;
    setActionError(null);

    const result = await experienceRuntime.dispatch({ type: "CONTINUE" });
    if (result.status !== "committed" && mountedRef.current) {
      settlePose();
      setActionError("Belum dapat melanjutkan. Silakan coba lagi.");
      activationPendingRef.current = false;
    }
  };

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || visualPhase === "exiting") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--s03-pointer-x", `${x * 10}px`);
    event.currentTarget.style.setProperty("--s03-pointer-y", `${y * 8}px`);
    arcXToRef.current?.(x * 14);
    arcYToRef.current?.(y * 8);
    burstXToRef.current?.(x * -18);
    burstYToRef.current?.(y * -12);
  }, [prefersReducedMotion, visualPhase]);

  const handlePointerLeave = useCallback(() => {
    canvasRef.current?.style.setProperty("--s03-pointer-x", "0px");
    canvasRef.current?.style.setProperty("--s03-pointer-y", "0px");
    arcXToRef.current?.(0);
    arcYToRef.current?.(0);
    burstXToRef.current?.(0);
    burstYToRef.current?.(0);
  }, []);

  const handleActionPresence = useCallback((active: boolean) => {
    if (prefersReducedMotion || !burstRef.current) return;
    gsap.to(burstRef.current, {
      scale: active ? 1.12 : 1,
      rotation: active ? 6 : 0,
      duration: active ? 0.24 : 0.42,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [prefersReducedMotion]);

  return (
    <main
      ref={sceneRef}
      data-testid="s03-scene"
      data-visual-phase={visualPhase}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      aria-labelledby="s03-title"
      className="s03-scene"
    >
      <div
        ref={canvasRef}
        className="s03-canvas"
        data-testid="s03-canvas"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >

        <S03LowerGraphics />
        <S03Paperworld onDiscoveryChange={setDiscoveredEggCount} reminderKey={reminderKey} />
        <div
          ref={arcRef}
          className="s03-celebration-arc"
          aria-hidden="true"
          data-testid="s03-celebration-arc"
          style={{
            top: "clamp(4.5rem, 11vh, 7rem)",
            right: "clamp(-5rem, -4vw, -1rem)",
            width: "clamp(20rem, calc(50vw + max(0px, (100vw - 768px) * 0.18)), 52rem)",
          }}
        >
          {arcAvailable && (
            // eslint-disable-next-line @next/next/no-img-element -- exact byte-preserved REV5 SVG.
            <img
              src="/assets/svg/celebration/celebration-arc.svg"
              alt=""
              onError={() => setArcAvailable(false)}
            />
          )}
        </div>

        <div
          ref={burstRef}
          className="s03-celebration-burst"
          aria-hidden="true"
          data-testid="s03-celebration-burst"
          style={{
            right: "clamp(1rem, 12vw, 11rem)",
            bottom: "clamp(4rem, calc(10vh + max(0px, (100vw - 390px) * 0.16)), 14rem)",
            width: "clamp(4.8rem, 7vw, 7rem)",
          }}
        >
          <CelebrationBurst />
        </div>

        <section
          className="s03-composition"
          style={{
            transform: "translateY(clamp(0px, min(calc((768px - 100vw) * 1.2), calc((100dvh - 400px) * .5)), 8rem))",
          }}
        >
          <h1 id="s03-title" className="s03-title">
            <span className="s03-line-mask s03-greeting-mask">
              <span
                ref={greetingRef}
                className="s03-greeting"
                data-testid="s03-greeting"
                style={{ fontSize: "clamp(1.85rem, calc(6.5vw + max(0px, (100vw - 768px) * 0.008)), 4.4rem)" }}
              >Happy Birthday, </span>
            </span>
            <span className="s03-line-mask s03-name-mask">
              <span
                ref={nameRef}
                className="s03-name"
                data-testid="s03-recipient-name"
                style={{ fontSize: "clamp(3.25rem, calc(11vw + max(0px, (100vw - 768px) * 0.02)), 7.4rem)" }}
              >{S03_RECIPIENT_NAME}.</span>
            </span>
          </h1>

          <button
            ref={actionRef}
            type="button"
            onClick={handleContinue}
            disabled={transitionActive}
            aria-busy={transitionActive}
            data-complete={discoveredEggCount === S03_PAPER_EGG_COUNT || undefined}
            className={`s03-continue-action${discoveredEggCount > 0 ? " s03-continue-action--armed" : ""}`}
            style={{
              ...({
                "--s03-progress": `${(discoveredEggCount / S03_PAPER_EGG_COUNT) * 100}%`,
              } as CSSProperties),
              minWidth: "clamp(10.2rem, 13vw, 12rem)",
              minHeight: "clamp(3.15rem, 4.2vw, 3.8rem)",
            }}
            onPointerEnter={() => handleActionPresence(true)}
            onPointerLeave={() => handleActionPresence(false)}
            onFocus={() => handleActionPresence(true)}
            onBlur={() => handleActionPresence(false)}
          >
            <svg className="s03-organic-button-art" viewBox="0 0 320 96" aria-hidden="true" focusable="false">
              <defs><clipPath id="s03-organic-clip"><path d="M20 20C56 7 116 13 170 17c57 5 108-7 130 13 20 18 7 48-17 55-42 12-89-2-139-2-55 1-113 10-132-14C0 54 4 29 20 20Z" /></clipPath></defs>
              <path className="s03-organic-back" d="M22 24C58 11 119 17 173 21c57 5 108-7 130 13 20 18 7 48-17 55-42 12-89-2-139-2-55 1-113 10-132-14C3 58 6 33 22 24Z" />
              <path className="s03-organic-base" d="M20 20C56 7 116 13 170 17c57 5 108-7 130 13 20 18 7 48-17 55-42 12-89-2-139-2-55 1-113 10-132-14C0 54 4 29 20 20Z" />
              <g clipPath="url(#s03-organic-clip)"><rect className="s03-organic-fill" x="0" y="0" width="340" height="100" /><path className="s03-organic-gloss" d="M8 31C80 11 171 28 307 23v17C196 38 90 26 9 48Z" /></g>
              <path className="s03-organic-outline" d="M20 20C56 7 116 13 170 17c57 5 108-7 130 13 20 18 7 48-17 55-42 12-89-2-139-2-55 1-113 10-132-14C0 54 4 29 20 20Z" />
            </svg>
            <span className="s03-organic-label">{S03_CTA_LABEL}</span>
            {discoveredEggCount === S03_PAPER_EGG_COUNT && <span className="s03-cta-celebration" aria-hidden="true"><i /><i /><i /><i /><i /></span>}
            <span
              className="s03-action-mark"
              aria-hidden="true"
              style={{ width: "clamp(1.25rem, 2.2vw, 1.45rem)", height: "clamp(1.25rem, 2.2vw, 1.45rem)", fontSize: "0.78rem" }}
            >→</span>
          </button>
          {actionError && <p role="alert" className="s03-action-error">{actionError}</p>}
        </section>
      </div>

      <div className="s03-three-d-surprise" aria-hidden="true">
        {S03_BURST_PARTICLES.map((index) => {
          const angle = (index / S03_BURST_PARTICLES.length) * Math.PI * 2;
          const distance = 18 + ((index * 17) % 34);
          const colors = ["#E67A6B", "#ECA06E", "#A79DCD", "#8794CC", "#F6F1E8"];
          const shapes = ["bead", "paper", "star", "ribbon"];
          const style = {
            "--particle-x": `${Math.cos(angle) * distance}vw`,
            "--particle-y": `${92 + Math.abs(Math.sin(angle)) * 34}vh`,
            "--particle-start-x": `${Math.cos(angle) * distance * 0.72}vw`,
            "--particle-z": `${((index * 23) % 42) - 12}rem`,
            "--particle-delay": `${(index % 18) * 18}ms`,
            "--particle-color": colors[index % colors.length],
          } as CSSProperties;
          return <i key={index} className={`s03-burst-particle s03-burst-particle--${shapes[index % shapes.length]}`} style={style} />;
        })}
      </div>
      <S03PhysicsBurst />

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {visualPhase === "stable" ? `${S03_FULL_GREETING} Tombol Lanjut tersedia.` : "Ucapan ulang tahun sedang ditampilkan."}
      </div>
    </main>
  );
}
