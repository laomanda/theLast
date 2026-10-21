"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";

type ButterflyPhase = "resting" | "anticipating" | "takingOff" | "flying" | "returning" | "landing";
type HintState = "available" | "exiting" | "consumed";

type Point = { x: number; y: number };

function cubicPoint(start: Point, controlA: Point, controlB: Point, end: Point, t: number): Point {
  const inverse = 1 - t;
  return {
    x: inverse ** 3 * start.x + 3 * inverse ** 2 * t * controlA.x + 3 * inverse * t ** 2 * controlB.x + t ** 3 * end.x,
    y: inverse ** 3 * start.y + 3 * inverse ** 2 * t * controlA.y + 3 * inverse * t ** 2 * controlB.y + t ** 3 * end.y,
  };
}

export function S04ReturningButterfly({
  anchorRef,
  sceneRef,
  reducedMotion,
  sceneSettled,
  onInteract,
  promptSignal,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  sceneRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  sceneSettled: boolean;
  onInteract: () => void;
  promptSignal: number;
}) {
  const flightRootRef = useRef<HTMLDivElement | null>(null);
  const butterflyRef = useRef<HTMLButtonElement | null>(null);
  const bubbleRef = useRef<HTMLButtonElement | null>(null);
  const flightTweenRef = useRef<gsap.core.Tween | null>(null);
  const flightTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hintTweenRef = useRef<gsap.core.Tween | null>(null);
  const promptTweenRef = useRef<gsap.core.Timeline | null>(null);
  const sceneTweenRef = useRef<gsap.core.Tween | null>(null);
  const hintTimerRef = useRef<number | null>(null);
  const hintConsumedRef = useRef(false);
  const homeModeRef = useRef<"primary" | "secondary" | null>(null);
  const phaseRef = useRef<ButterflyPhase>("resting");
  const [phase, setPhase] = useState<ButterflyPhase>("resting");
  const [hintState, setHintState] = useState<HintState>("available");
  const [hintVisible, setHintVisible] = useState(false);

  const restingAnchor = useCallback((): Point | null => {
    const anchor = anchorRef.current?.getBoundingClientRect();
    if (!anchor) return null;
    return { x: anchor.left - 13, y: anchor.top - 16 };
  }, [anchorRef]);

  const secondaryAnchor = useCallback((): Point | null => {
    const frame = anchorRef.current?.getBoundingClientRect();
    const scene = sceneRef.current?.getBoundingClientRect();
    if (!frame || !scene) return null;
    const mobile = scene.width < 768;
    const size = mobile ? 26 : 34;
    // The mobile portrait is taller and narrower; keep the secondary rest point
    // on the upper hair area instead of letting it drift over the face.
    const targetX = mobile ? .63 : .59;
    const targetY = mobile ? .115 : .17;
    return { x: frame.left + frame.width * targetX - size, y: frame.top + frame.height * targetY - size };
  }, [anchorRef, sceneRef]);

  const homeAnchor = useCallback((): Point | null => {
    if (!homeModeRef.current) homeModeRef.current = Math.random() > .5 ? "secondary" : "primary";
    return homeModeRef.current === "secondary" ? secondaryAnchor() ?? restingAnchor() : restingAnchor();
  }, [restingAnchor, secondaryAnchor]);

  const placeAtRest = useCallback(() => {
    const point = homeAnchor();
    if (!point || !flightRootRef.current) return;
    gsap.set(flightRootRef.current, { x: point.x, y: point.y, rotation: -9, scale: 1 });
  }, [homeAnchor]);

  const setFlightPhase = (next: ButterflyPhase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(placeAtRest);
    const observer = new ResizeObserver(() => {
      if (phaseRef.current === "resting") placeAtRest();
    });
    if (anchorRef.current) observer.observe(anchorRef.current);
    window.addEventListener("resize", placeAtRest);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", placeAtRest);
    };
  }, [anchorRef, placeAtRest]);

  useEffect(() => () => {
    flightTweenRef.current?.kill();
    flightTimelineRef.current?.kill();
    hintTweenRef.current?.kill();
    promptTweenRef.current?.kill();
    sceneTweenRef.current?.kill();
    if (hintTimerRef.current !== null) window.clearTimeout(hintTimerRef.current);
  }, []);

  useEffect(() => {
    if (!flightRootRef.current) return;
    sceneTweenRef.current?.kill();
    if (reducedMotion) {
      gsap.set(flightRootRef.current, { opacity: sceneSettled ? 1 : 0, scale: sceneSettled ? 1 : .78 });
      return;
    }
    if (sceneSettled) {
      sceneTweenRef.current = gsap.fromTo(flightRootRef.current,
        { opacity: 0, scale: .68 },
        { opacity: 1, scale: 1, duration: .52, delay: .16, ease: "back.out(1.35)", overwrite: "auto" },
      );
    } else {
      sceneTweenRef.current = gsap.to(flightRootRef.current, {
        opacity: 0,
        scale: .76,
        duration: .24,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  }, [reducedMotion, sceneSettled]);

  useEffect(() => {
    if (hintState !== "available" || !sceneSettled || hintConsumedRef.current) return;
    hintTimerRef.current = window.setTimeout(() => {
      hintTimerRef.current = null;
      if (!hintConsumedRef.current) setHintVisible(true);
    }, reducedMotion ? 0 : 1350);
    return () => {
      if (hintTimerRef.current !== null) window.clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    };
  }, [hintState, reducedMotion, sceneSettled]);

  useEffect(() => {
    if (promptSignal === 0 || !sceneSettled || hintConsumedRef.current) return;
    setHintState("available");
    setHintVisible(true);
  }, [promptSignal, sceneSettled]);

  useEffect(() => {
    if (!hintVisible || !bubbleRef.current) return;
    if (reducedMotion) return;
    hintTweenRef.current?.kill();
    hintTweenRef.current = gsap.fromTo(bubbleRef.current, { opacity: 0, y: "+=7", scale: .9 }, { opacity: 1, y: "-=7", scale: 1, duration: .34, ease: "back.out(1.45)", clearProps: "opacity" });
  }, [hintVisible, reducedMotion]);

  useEffect(() => {
    if (promptSignal === 0 || reducedMotion || !bubbleRef.current) return;
    promptTweenRef.current?.kill();
    promptTweenRef.current = gsap.timeline({ defaults: { overwrite: "auto" } })
      .set(bubbleRef.current, { x: 0 })
      .to(bubbleRef.current, { x: -4, duration: .06, ease: "power1.out" })
      .to(bubbleRef.current, { x: 4, duration: .08, ease: "power1.inOut" })
      .to(bubbleRef.current, { x: -3, duration: .07, ease: "power1.inOut" })
      .to(bubbleRef.current, { x: 3, duration: .07, ease: "power1.inOut" })
      .to(bubbleRef.current, { x: 0, duration: .1, ease: "power2.out" });
  }, [promptSignal, reducedMotion]);

  const consumeHint = () => {
    if (hintConsumedRef.current) return;
    hintConsumedRef.current = true;
    if (hintTimerRef.current !== null) window.clearTimeout(hintTimerRef.current);
    hintTimerRef.current = null;
    if (!hintVisible || !bubbleRef.current || reducedMotion) {
      setHintVisible(false);
      setHintState("consumed");
      return;
    }
    setHintState("exiting");
    hintTweenRef.current?.kill();
    hintTweenRef.current = gsap.to(bubbleRef.current, { opacity: 0, y: "-=6", scale: .94, duration: .19, ease: "power2.out", onComplete: () => { setHintVisible(false); setHintState("consumed"); } });
  };

  const animateCurve = (from: Point, controlA: Point, controlB: Point, to: Point, duration: number, next: () => void) => {
    const progress = { value: 0 };
    flightTweenRef.current = gsap.to(progress, {
      value: 1,
      duration,
      ease: "sine.inOut",
      onUpdate: () => {
        if (!flightRootRef.current) return;
        const point = cubicPoint(from, controlA, controlB, to, progress.value);
        const previous = cubicPoint(from, controlA, controlB, to, Math.max(0, progress.value - 0.012));
        const angle = Math.max(-24, Math.min(24, (point.y - previous.y) * 1.2 + (point.x - previous.x) * 0.16));
        gsap.set(flightRootRef.current, { x: point.x, y: point.y, rotation: angle, scale: 1 + Math.sin(progress.value * Math.PI) * 0.09 });
      },
      onComplete: () => {
        flightTweenRef.current = null;
        next();
      },
    });
  };

  const handleFlight = () => {
    if (phaseRef.current !== "resting" || !flightRootRef.current) return;
    onInteract();
    consumeHint();
    if (reducedMotion) {
      setFlightPhase("landing");
      gsap.fromTo(flightRootRef.current, { scale: 1 }, { scale: 1.12, duration: 0.16, yoyo: true, repeat: 1, onComplete: () => setFlightPhase("resting") });
      return;
    }
    const scene = sceneRef.current?.getBoundingClientRect();
    const start = homeAnchor();
    if (!scene || !start) return;
    const mobile = scene.width < 768;
    const rangeX = scene.width * (mobile ? .58 + Math.random() * .16 : .68 + Math.random() * .17);
    const rangeY = scene.height * (mobile ? .22 + Math.random() * .12 : .26 + Math.random() * .2);
    const direction = Math.random() > .5 ? 1 : -1;
    const margin = mobile ? 18 : 38;
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const end = {
      x: clamp(start.x + direction * rangeX, scene.left + margin, scene.right - 68 - margin),
      y: clamp(start.y + (Math.random() > .5 ? 1 : -1) * rangeY, scene.top + margin, scene.bottom - 92),
    };
    const controlA = { x: start.x + direction * rangeX * .22, y: start.y - rangeY * (.22 + Math.random() * .18) };
    const controlB = { x: end.x - direction * rangeX * .3, y: end.y + rangeY * (.3 + Math.random() * .18) };
    const turn = {
      x: clamp(end.x - direction * scene.width * (.18 + Math.random() * .13), scene.left + margin, scene.right - 68 - margin),
      y: clamp(end.y + (Math.random() > .5 ? 1 : -1) * scene.height * (.11 + Math.random() * .12), scene.top + margin, scene.bottom - 92),
    };

    setFlightPhase("anticipating");
    const timeline = gsap.timeline({
      onComplete: () => { flightTweenRef.current = null; },
    });
    flightTimelineRef.current = timeline;
    timeline.to(flightRootRef.current, { scaleX: .84, scaleY: 1.06, duration: .13, ease: "power2.in" })
      .call(() => setFlightPhase("takingOff"))
      .to(flightRootRef.current, { y: start.y - 10, scaleX: 1.02, scaleY: .98, duration: .16, ease: "power2.out" })
      .call(() => {
        setFlightPhase("flying");
        animateCurve(start, controlA, controlB, end, 1.55 + Math.random() * .55, () => {
          const driftA = { x: end.x - direction * scene.width * .09, y: end.y - rangeY * .28 };
          const driftB = { x: turn.x + direction * scene.width * .1, y: turn.y + rangeY * .2 };
          animateCurve(end, driftA, driftB, turn, .85 + Math.random() * .35, () => {
            const secondary = secondaryAnchor();
            const primary = restingAnchor();
            if (!primary) return;
            const stopAtSecondary = Boolean(secondary) && Math.random() > .42;
            const stopTarget = stopAtSecondary ? secondary! : primary;
            const stopA = { x: turn.x - direction * scene.width * .13, y: turn.y + rangeY * .32 };
            const stopB = { x: stopTarget.x + direction * scene.width * .16, y: stopTarget.y - rangeY * .18 };
            animateCurve(turn, stopA, stopB, stopTarget, 1.15 + Math.random() * .35, () => {
              homeModeRef.current = stopAtSecondary ? "secondary" : "primary";
              setFlightPhase("landing");
              gsap.to(flightRootRef.current, { rotation: stopAtSecondary ? 5 : -9, scale: 1, duration: .22, ease: "power2.out", onComplete: () => { placeAtRest(); setFlightPhase("resting"); } });
            });
          });
        });
      });
  };

  return (
    <>
    <div ref={flightRootRef} className="s04-butterfly-root" data-phase={phase}>
    <button
      ref={butterflyRef}
      type="button"
      className="s04-returning-butterfly"
      data-phase={phase}
      onClick={handleFlight}
      aria-label="Sentuh kupu-kupu untuk melihatnya terbang"
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <g className="s04-butterfly-wing s04-butterfly-wing--left-fore"><path d="M48 48 C35 42 17 15 13 31 C8 51 22 63 43 58Z" /></g>
        <g className="s04-butterfly-wing s04-butterfly-wing--left-hind"><path d="M47 54 C30 55 19 68 29 81 C39 91 51 75 52 57Z" /></g>
        <g className="s04-butterfly-wing s04-butterfly-wing--right-fore"><path d="M52 48 C65 42 83 15 87 31 C92 51 78 63 57 58Z" /></g>
        <g className="s04-butterfly-wing s04-butterfly-wing--right-hind"><path d="M53 54 C70 55 81 68 71 81 C61 91 49 75 48 57Z" /></g>
        <path className="s04-butterfly-body" d="M47 37 C44 47 45 63 50 69 C55 63 56 47 53 37 C51 33 49 33 47 37Z" />
        <path className="s04-butterfly-antennae" d="M48 38 C43 27 36 28 34 23 M52 38 C57 27 64 28 66 23" />
        <path className="s04-butterfly-mark" d="M21 38 C28 35 34 40 38 47 M79 38 C72 35 66 40 62 47" />
      </svg>
    </button>
    {(hintVisible || hintState === "exiting") && <button ref={bubbleRef} type="button" className="s04-butterfly-hint" data-prompted={promptSignal > 0 ? promptSignal : undefined} onClick={handleFlight} aria-label="Psst... sentuh aku!"><span>Psst... sentuh aku!</span></button>}
    </div>
    </>
  );
}
