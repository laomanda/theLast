"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { S12_CONTENT } from "./s12-content";
import type { S12ReadingContent } from "./s12-content";

type FinalPhase = "reading" | "ended";

declare global {
  interface Window {
    __THELAST_S12_DEV_FIXTURE__?: S12ReadingContent;
  }
}

/** Final optional surface. Personal copy remains absent until owner approval. */
export function S12FinalLetter() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const readingRef = useRef<HTMLElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);
  const readingBodyRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pendingRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const eligible = useExperienceStore(
    (state) => state.scene === "S12" && state.confessionVisible && state.vault.letter === "selected",
  );
  const [phase, setPhase] = useState<FinalPhase>("reading");
  const [readingOverflow, setReadingOverflow] = useState(false);
  const [readingScrolled, setReadingScrolled] = useState(false);
  const [previewContent] = useState<S12ReadingContent | null>(() => {
    if (process.env.NODE_ENV === "production" || typeof window === "undefined") return null;
    const candidate = window.__THELAST_S12_DEV_FIXTURE__;
    if (!candidate || !Array.isArray(candidate.paragraphs)) return null;
    return candidate;
  });
  const readingContent = previewContent ?? S12_CONTENT;
  const hasReadingContent = Boolean(
    readingContent.opening || readingContent.paragraphs.length || readingContent.closing || readingContent.signature,
  );

  useEffect(() => {
    const node = readingBodyRef.current;
    if (!node || !hasReadingContent) {
      setReadingOverflow(false);
      return;
    }
    const updateOverflow = () => {
      const remaining = node.scrollHeight - node.clientHeight - node.scrollTop;
      setReadingOverflow(remaining > 2);
      setReadingScrolled(node.scrollTop > 2);
    };
    updateOverflow();
    node.addEventListener("scroll", updateOverflow, { passive: true });
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(node);
    return () => {
      node.removeEventListener("scroll", updateOverflow);
      observer.disconnect();
    };
  }, [hasReadingContent, previewContent]);

  useEffect(() => {
    readingRef.current?.focus({ preventScroll: true });
    return () => {
      pendingRef.current = false;
      timelineRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!sceneRef.current || !paperRef.current || reducedMotion) return;
    const context = gsap.context(() => {
      timelineRef.current = gsap.timeline({ defaults: { ease: "power2.out" } })
        .fromTo(paperRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, clearProps: "opacity,transform" });
    }, sceneRef);
    return () => context.revert();
  }, [reducedMotion]);

  const endExperience = () => {
    if (phase === "ended" || pendingRef.current) return;
    timelineRef.current?.kill();
    if (reducedMotion || !paperRef.current) {
      setPhase("ended");
      return;
    }
    pendingRef.current = true;
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        pendingRef.current = false;
        setPhase("ended");
      },
    }).to(paperRef.current, { y: -8, opacity: 0, duration: 0.28, ease: "power1.in" });
  };

  const replay = async () => {
    if (transitionActive || pendingRef.current) return;
    pendingRef.current = true;
    const result = await experienceRuntime.dispatch({ type: "REPLAY" });
    if (result.status === "rejected") pendingRef.current = false;
  };

  return (
    <main
      ref={sceneRef}
      className="s12-scene"
      data-testid="s12-scene"
      data-content-status={S12_CONTENT.status}
      data-final-phase={phase}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      data-authorized-entry={eligible ? "true" : "false"}
      aria-labelledby="s12-title"
    >
      <p className="s12-kicker" aria-hidden="true">{S12_CONTENT.kicker}</p>
      <span className="s12-memory-line" aria-hidden="true" />

      {phase === "reading" ? (
        <section ref={readingRef} className="s12-reading" tabIndex={-1} aria-label="Ruang baca terakhir">
          <div ref={paperRef} className="s12-paper" data-testid="s12-paper">
            <header className="s12-paper-header">
              <span aria-hidden="true">12</span>
              <span aria-hidden="true">THE LAST</span>
            </header>
            <div className={`s12-editorial-space${hasReadingContent ? " s12-editorial-space--content" : ""}`}>
              {hasReadingContent ? (
                <article className="s12-reading-copy" aria-label="Isi surat pribadi">
                  {readingContent.opening ? <p className="s12-reading-opening">{readingContent.opening}</p> : null}
                  <div ref={readingBodyRef} className="s12-reading-body" data-testid="s12-reading-body" data-scrollable={readingOverflow ? "true" : "false"} data-scrolled={readingScrolled ? "true" : "false"} tabIndex={0}>
                    {readingContent.paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>)}
                  </div>
                  {readingContent.closing ? <p className="s12-reading-closing">{readingContent.closing}</p> : null}
                  {readingContent.signature ? <p className="s12-reading-signature">{readingContent.signature}</p> : null}
                </article>
              ) : (
                <div aria-hidden="true">
                  <span className="s12-rule s12-rule--long" />
                  <span className="s12-rule" />
                  <span className="s12-rule s12-rule--short" />
                </div>
              )}
            </div>
            <footer className="s12-paper-footer">
              <h1 id="s12-title">{S12_CONTENT.title}</h1>
              <button type="button" className="s12-primary" data-testid="s12-end" onClick={endExperience}>
                {S12_CONTENT.endLabel}
              </button>
            </footer>
          </div>
        </section>
      ) : (
        <section className="s12-ended" data-testid="s12-ended" aria-labelledby="s12-ended-title">
          <span className="s12-ended-mark" aria-hidden="true">12</span>
          <h1 id="s12-ended-title">{S12_CONTENT.endedLabel}</h1>
          <button type="button" className="s12-replay" data-testid="s12-replay" onClick={replay} disabled={transitionActive}>
            {S12_CONTENT.replayLabel}
          </button>
        </section>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        {phase === "ended" ? S12_CONTENT.endedLabel : "Adegan terakhir terbuka."}
      </p>
    </main>
  );
}
