"use client";

import gsap from "gsap";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { DEFAULT_BIRTHDAY_LETTER, LONG_BIRTHDAY_LETTER, S07_CONTENT_STATUS, type BirthdayLetter } from "./letter-content";

export type S07VisualPhase = "sealed" | "cutting" | "opened" | "pulling" | "unfolding" | "reading" | "release-ready" | "releasing" | "settled" | "exiting";

export interface S07BirthdayLetterProps {
  letterVariant?: "default" | "long";
  customLetter?: BirthdayLetter;
}

type DragState = { pointerId: number; startX: number; startY: number; progress: number; threshold?: number };

function StationeryDecor() {
  return <div className="s07-stationery-decor" aria-hidden="true">
    <svg className="s07-decor-stamp" viewBox="0 0 100 120"><path d="M16 14 H84 V106 H16Z" fill="#F6F1E8" stroke="#2C282A" strokeOpacity=".32" strokeWidth="1.4" /><path d="M24 22 H76 V98 H24Z" fill="none" stroke="#E67A6B" strokeWidth="2" strokeDasharray="5 4" /><path d="M50 37 C63 37 70 48 63 58 C72 52 81 58 81 68 C81 79 71 84 62 78 C68 88 61 96 50 96 C39 96 32 88 38 78 C29 84 19 79 19 68 C19 58 28 52 37 58 C30 48 37 37 50 37Z" fill="#A79DCD" fillOpacity=".5" stroke="#2C282A" strokeWidth="1.2" /></svg>
    <svg className="s07-decor-thread" viewBox="0 0 240 100"><path d="M3 68 C44 21 87 22 119 55 C143 79 178 77 207 42 C219 27 230 26 238 35" fill="none" stroke="#A79DCD" strokeWidth="3.5" strokeLinecap="round" /><circle cx="207" cy="42" r="4" fill="#E67A6B" /></svg>
    <svg className="s07-decor-star" viewBox="0 0 64 64"><path d="M32 5 L38 25 L57 22 L43 34 L53 51 L35 43 L29 59 L25 42 L8 48 L20 33 L8 20 L27 25Z" fill="#ECA06E" stroke="#2C282A" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  </div>;
}

export function S07BirthdayLetter({ letterVariant = "default", customLetter }: S07BirthdayLetterProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const envelopeRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const hiddenLetterRef = useRef<HTMLDivElement | null>(null);
  const paperRef = useRef<HTMLElement | null>(null);
  const readingEndRef = useRef<HTMLDivElement | null>(null);
  const continueButtonRef = useRef<HTMLButtonElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cutDragRef = useRef<DragState | null>(null);
  const pullDragRef = useRef<DragState | null>(null);
  const releaseDragRef = useRef<DragState | null>(null);
  const cutProgressRef = useRef(0);
  const releaseLockedRef = useRef(false);
  const mountedRef = useRef(true);
  const headingId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const letter = customLetter ?? (letterVariant === "long" ? LONG_BIRTHDAY_LETTER : DEFAULT_BIRTHDAY_LETTER);
  const [phase, setPhase] = useState<S07VisualPhase>("sealed");
  const [openedSettled, setOpenedSettled] = useState(false);
  const [announcement, setAnnouncement] = useState("Surat tersegel. Ikuti garis perforasi untuk membukanya.");
  const [actionError, setActionError] = useState<string | null>(null);

  const setCutProgress = useCallback((progress: number) => {
    const value = Math.max(0, Math.min(1, progress));
    cutProgressRef.current = value;
    envelopeRef.current?.style.setProperty("--s07-cut", `${value * 100}%`);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; timelineRef.current?.kill(); };
  }, []);

  useLayoutEffect(() => {
    if (!sceneRef.current || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".s07-environment", { opacity: 0, duration: .45 })
        .from(".s07-stationery-decor svg", { opacity: 0, y: 18, scale: .92, stagger: .08, duration: .45 }, .08)
        .from(envelopeRef.current, { opacity: 0, y: -28, rotationX: 9, rotationZ: -5, scale: .94, duration: .75 }, .08)
        .from(".s07-envelope-shadow", { opacity: 0, scaleX: .72, duration: .65 }, .28)
        .from(".s07-cut-dashes", { strokeDashoffset: 120, duration: .7 }, .55)
        .from(".s07-cut-instruction", { opacity: 0, y: 6, duration: .35 }, .68);
    }, sceneRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const completeCut = useCallback(() => {
    if (!envelopeRef.current || !["sealed", "cutting"].includes(phase)) return;
    setCutProgress(1);
    setPhase("opened");
    setAnnouncement("Garis selesai dipotong. Tarik surat perlahan.");
    timelineRef.current?.kill();
    if (prefersReducedMotion) {
      gsap.set(stripRef.current, { opacity: 0, y: 16, rotation: 5 });
      return;
    }
    timelineRef.current = gsap.timeline()
      .to(stripRef.current, { y: -18, x: 8, rotation: 3, duration: .38, ease: "power2.out" })
      .to(stripRef.current, { y: 8, x: 18, rotation: 7, duration: .42, ease: "power2.inOut" })
      .to(stripRef.current, { y: 24, x: 32, rotation: 11, opacity: 0, duration: .48, ease: "power2.in" })
      .fromTo(hiddenLetterRef.current, { y: 12 }, { y: -8, duration: .42, ease: "power2.out" }, .26);
  }, [phase, prefersReducedMotion, setCutProgress]);

  const handleCutDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!(phase === "sealed" || phase === "cutting") || transitionActive) return;
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (!rect) return;
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* synthetic or interrupted pointer */ }
    cutDragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, progress: cutProgressRef.current };
    setPhase("cutting");
  };
  const handleCutMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = cutDragRef.current;
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (!drag || drag.pointerId !== event.pointerId || !rect) return;
    const localX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const progress = Math.max(drag.progress, localX / rect.width);
    setCutProgress(progress);
    gsap.set(stripRef.current, { y: -Math.sin(progress * Math.PI) * 3, rotation: progress * 1.4 });
    if (progress >= .92) { cutDragRef.current = null; completeCut(); }
  };
  const endCut = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (cutDragRef.current?.pointerId !== event.pointerId) return;
    cutDragRef.current = null;
    if (cutProgressRef.current >= .92) completeCut(); else setAnnouncement("Potongan tersimpan. Lanjutkan mengikuti garisnya.");
  };

  const completePull = useCallback(() => {
    if (!(phase === "opened" || phase === "pulling") || !hiddenLetterRef.current) return;
    pullDragRef.current = null;
    setPhase("unfolding");
    setAnnouncement("Surat dikeluarkan dan sedang dibentangkan.");
    timelineRef.current?.kill();
    if (prefersReducedMotion) { setPhase("reading"); return; }
    timelineRef.current = gsap.timeline({ onComplete: () => { if (mountedRef.current) { setPhase("reading"); setAnnouncement("Surat terbuka. Bacalah dengan tenang."); } } })
      .to(hiddenLetterRef.current, { y: -190, rotation: -1.5, scale: 1.03, duration: .55, ease: "power3.out" })
      .to(envelopeRef.current, { y: 28, opacity: .42, scale: .96, duration: .4, ease: "power2.in" }, .3)
      .to(hiddenLetterRef.current, { rotationX: 0, scaleY: 1.18, duration: .42, ease: "power2.inOut" }, .45);
  }, [phase, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (phase !== "reading" || !paperRef.current) return;
    if (prefersReducedMotion) { gsap.set(paperRef.current, { opacity: 1, clearProps: "transform" }); queueMicrotask(() => mountedRef.current && setOpenedSettled(true)); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(paperRef.current,
        { opacity: 0, y: -72, rotateX: -16, scaleY: .72, transformOrigin: "50% 0%" },
        { opacity: 1, y: 0, rotateX: 0, scaleY: 1, duration: .72, ease: "power3.out", onComplete: () => mountedRef.current && setOpenedSettled(true) },
      );
    }, sceneRef);
    return () => ctx.revert();
  }, [phase, prefersReducedMotion]);

  const handlePullDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (phase !== "opened" || transitionActive) return;
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* synthetic or interrupted pointer */ }
    pullDragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, progress: 0 };
    setPhase("pulling");
  };
  const handlePullMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = pullDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = Math.max(0, drag.startY - event.clientY);
    const threshold = Math.max(105, Math.min(170, window.innerHeight * .2));
    drag.progress = Math.min(1, distance / threshold);
    gsap.set(hiddenLetterRef.current, { y: -8 - distance * .72, rotation: -drag.progress * 1.4, scale: 1 + drag.progress * .018 });
    if (drag.progress >= .94) completePull();
  };
  const endPull = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = pullDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    pullDragRef.current = null;
    if (drag.progress >= .72) completePull(); else { setPhase("opened"); gsap.to(hiddenLetterRef.current, { y: -8, rotation: 0, scale: 1, duration: .35, ease: "power2.out" }); }
  };

  useEffect(() => {
    if (phase !== "reading" || !openedSettled || !readingEndRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || releaseLockedRef.current) return;
      releaseLockedRef.current = true;
      setPhase("release-ready");
      setAnnouncement("Kamu telah sampai di akhir surat. Geser pegangan ke bawah untuk melepasnya.");
    }, { threshold: .65 });
    observer.observe(readingEndRef.current);
    return () => observer.disconnect();
  }, [phase, openedSettled]);

  const completeRelease = useCallback(() => {
    if (!(phase === "release-ready" || phase === "releasing") || !paperRef.current) return;
    releaseDragRef.current = null;
    setPhase("releasing");
    setAnnouncement("Surat dilepas dan sedang jatuh.");
    timelineRef.current?.kill();
    const settle = () => { if (mountedRef.current) { setPhase("settled"); setAnnouncement("Surat telah mendarat. Kamu dapat melanjutkan."); } };
    if (prefersReducedMotion) { gsap.set(paperRef.current, { y: 54, rotation: 1 }); settle(); return; }
    const drift = window.innerWidth < 768 ? 14 : 32;
    timelineRef.current = gsap.timeline({ onComplete: settle })
      .to(paperRef.current, { y: 55, x: drift * .25, rotation: 1.8, rotateX: -2, duration: .28, ease: "power1.in" })
      .to(paperRef.current, { y: Math.min(190, window.innerHeight * .24), x: drift, rotation: 3.2, rotateX: 4, duration: .58, ease: "power2.in" })
      .to(paperRef.current, { y: Math.min(155, window.innerHeight * .2), x: drift * .8, rotation: 2.2, rotateX: 0, duration: .28, ease: "power2.out" })
      .to(paperRef.current, { y: Math.min(164, window.innerHeight * .21), rotation: 2.45, duration: .18, ease: "sine.inOut" });
  }, [phase, prefersReducedMotion]);

  const handleReleaseDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (phase !== "release-ready" || transitionActive) return;
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* synthetic or interrupted pointer */ }
    const availableDistance = Math.max(72, window.innerHeight - event.clientY - 18);
    const threshold = Math.max(72, Math.min(190, window.innerHeight * .24, availableDistance * .86));
    releaseDragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, progress: 0, threshold };
  };
  const handleReleaseMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = releaseDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = Math.max(0, event.clientY - drag.startY);
    const threshold = drag.threshold ?? Math.max(72, Math.min(190, window.innerHeight * .24));
    drag.progress = Math.min(1, distance / threshold);
    gsap.set(paperRef.current, { y: distance * .72, rotation: drag.progress * 2.2, scale: 1 - drag.progress * .018 });
  };
  const endRelease = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = releaseDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    releaseDragRef.current = null;
    if (drag.progress >= .62) completeRelease(); else gsap.to(paperRef.current, { y: 0, rotation: 0, scale: 1, duration: .42, ease: "power3.out" });
  };

  useEffect(() => runtimeTransitionCoordinator.register("CONTINUE", async (_event, target, signal) => {
    if (target !== "S08" || !sceneRef.current || phase !== "settled") return;
    setPhase("exiting");
    if (prefersReducedMotion) return;
    await new Promise<void>((resolve, reject) => {
      const timeline = gsap.timeline({ onComplete: () => { signal.removeEventListener("abort", abort); resolve(); } });
      const abort = () => { timeline.kill(); setPhase("settled"); reject(new Error("S07 to S08 handoff cancelled")); };
      signal.addEventListener("abort", abort, { once: true });
      timeline.to(continueButtonRef.current, { opacity: 0, y: 8, duration: .18 })
        .to([paperRef.current, ".s07-stationery-decor svg"], { opacity: 0, y: "+=20", scale: .97, duration: .4, stagger: .05, ease: "power2.in" }, .08)
        .to(".s07-environment", { opacity: 0, duration: .25, ease: "power1.in" }, .25);
    });
  }), [phase, prefersReducedMotion]);

  const handleContinue = async () => {
    if (phase !== "settled" || transitionActive) return;
    setActionError(null);
    const result = await experienceRuntime.dispatch({ type: "CONTINUE" });
    if (result.status !== "committed" && mountedRef.current) setActionError("Tidak dapat melanjutkan saat ini. Silakan coba kembali.");
  };

  const reading = ["reading", "release-ready", "releasing", "settled", "exiting"].includes(phase);

  return <main ref={sceneRef} data-testid="s07-scene" data-visual-phase={phase} data-opened-settled={openedSettled ? "true" : "false"} data-reduced-motion={prefersReducedMotion ? "true" : "false"} className="s07-scene s07-sealed-letter" aria-labelledby={headingId}>
    <div className="s07-environment" aria-hidden="true" />
    <StationeryDecor />
    <div data-testid="s07-live-announcement" role="status" aria-live="polite" className="sr-only">{announcement}</div>
    {!reading && <div className="s07-object-stage"><div ref={envelopeRef} className="s07-envelope" style={{ "--s07-cut": "0%" } as React.CSSProperties}>
      <div className="s07-envelope-shadow" aria-hidden="true" /><div className="s07-envelope-rear" aria-hidden="true"><span>18 / 10</span></div>
      <div ref={hiddenLetterRef} className="s07-hidden-letter"><span className="s07-hidden-recipient">Untuk Malica Yohana Hutagaol</span><svg className="s07-letter-mini-decor" viewBox="0 0 150 42" aria-hidden="true"><g className="s07-letter-flower" transform="translate(75 20)"><ellipse cy="-8" rx="4" ry="7" /><ellipse cy="-8" rx="4" ry="7" transform="rotate(72)" /><ellipse cy="-8" rx="4" ry="7" transform="rotate(144)" /><ellipse cy="-8" rx="4" ry="7" transform="rotate(216)" /><ellipse cy="-8" rx="4" ry="7" transform="rotate(288)" /><circle r="3" /></g><path d="M22 13v10m-5-5h10M125 13v10m-5-5h10" /><circle className="s07-letter-dot" cx="42" cy="29" r="2" /><circle className="s07-letter-dot" cx="108" cy="29" r="2" /></svg>{(phase === "opened" || phase === "pulling") && <button type="button" className="s07-pull-handle" onPointerDown={handlePullDown} onPointerMove={handlePullMove} onPointerUp={endPull} onPointerCancel={endPull} onClick={(event) => { if (event.detail === 0) completePull(); }} aria-label="Tarik perlahan untuk mengeluarkan surat"><span>Tarik perlahan.</span><i aria-hidden="true">↑</i></button>}</div>
      <div className="s07-envelope-front" aria-hidden="true">{(phase === "sealed" || phase === "cutting") && <span className="s07-cut-instruction">Untuk membuka, ikuti garis <span className="s07-instruction-dashes" /></span>}<span className="s07-envelope-monogram">M</span></div><div ref={stripRef} className="s07-tear-strip" aria-hidden="true"><span className="s07-tear-fibers" /></div>
      {(phase === "sealed" || phase === "cutting") && <button type="button" data-testid="s07-open-letter" className="s07-cut-zone" onPointerDown={handleCutDown} onPointerMove={handleCutMove} onPointerUp={endCut} onPointerCancel={endCut} onClick={(event) => { if (event.detail === 0) completeCut(); }} aria-label="Ikuti garis perforasi untuk memotong amplop"><svg viewBox="0 0 600 44" preserveAspectRatio="none" aria-hidden="true"><path className="s07-cut-base" d="M10 22 C122 17 188 26 294 20 C398 14 474 26 590 19" /><path className="s07-cut-dashes" d="M10 22 C122 17 188 26 294 20 C398 14 474 26 590 19" /></svg></button>}
    </div></div>}
    {reading && <div className="s07-reading-stage"><article ref={paperRef} data-testid="s07-paper-card" className="s07-reading-paper"><div className="s07-paper-fold-line" aria-hidden="true" /><div data-testid="s07-reading-surface" role="region" aria-label="Isi surat ulang tahun" className="s07-letter-document"><header className="s07-letter-header"><div className="s07-meta-row"><span className="s07-meta-date">{letter.dateLabel}</span><span className="s07-dev-badge" data-content-status={S07_CONTENT_STATUS}>KEEPSAKE EDITORIAL</span></div><h1 id={headingId} className="s07-salutation">{letter.salutation}</h1></header><div className="s07-letter-body"><p className="s07-lead-paragraph">{letter.leadParagraph}</p><div className="s07-divider" aria-hidden="true"><span className="s07-divider-dot" /></div>{letter.sections.map((section) => <p key={section.id} className="s07-section-paragraph" data-section-type={section.type}>{section.text}</p>)}<div className="s07-letter-closing"><p className="s07-sign-off">{letter.signOff}</p><p className="s07-sender-mark">{letter.senderLabel}</p></div></div><div ref={readingEndRef} className="s07-reading-end" aria-hidden="true" />{(phase === "release-ready" || phase === "releasing") && <button type="button" data-testid="s07-release-handle" className="s07-release-handle" onPointerDown={handleReleaseDown} onPointerMove={handleReleaseMove} onPointerUp={endRelease} onPointerCancel={endRelease} onClick={(event) => { if (event.detail === 0) completeRelease(); }} aria-label="Geser ke bawah untuk melepas surat"><span>Geser untuk melepas.</span><i aria-hidden="true">↓</i></button>}</div></article>{phase === "settled" && <div className="s07-final-action">{actionError && <p role="alert" className="s07-action-error">{actionError}</p>}<button ref={continueButtonRef} type="button" data-testid="s07-continue" className="s07-continue" onClick={handleContinue} disabled={transitionActive}><span>{letter.ctaLabel}</span><span aria-hidden="true">→</span></button></div>}</div>}
  </main>;
}
