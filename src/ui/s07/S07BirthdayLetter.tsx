"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import {
  DEFAULT_BIRTHDAY_LETTER,
  LONG_BIRTHDAY_LETTER,
  S07_CONTENT_STATUS,
  type BirthdayLetter,
} from "./letter-content";

export type S07VisualPhase = "folded" | "opened" | "exiting";

export interface S07BirthdayLetterProps {
  /** Fixture override for testing long-copy handling and scroll boundaries */
  letterVariant?: "default" | "long";
  /** Optional custom letter fixture for tests */
  customLetter?: BirthdayLetter;
}

export function S07BirthdayLetter({
  letterVariant = "default",
  customLetter,
}: S07BirthdayLetterProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);
  const flapRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const continueButtonRef = useRef<HTMLButtonElement | null>(null);

  const unfoldTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasOpenedRef = useRef(false);
  const activationPendingRef = useRef(false);
  const mountedRef = useRef(true);

  const headingId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);

  const letter = customLetter ?? (letterVariant === "long" ? LONG_BIRTHDAY_LETTER : DEFAULT_BIRTHDAY_LETTER);

  const [phase, setPhase] = useState<S07VisualPhase>(
    prefersReducedMotion ? "opened" : "folded",
  );
  const [openedSettled, setOpenedSettled] = useState<boolean>(prefersReducedMotion);
  const [announcement, setAnnouncement] = useState<string>(
    prefersReducedMotion
      ? "Surat ulang tahun terbuka. Kamu dapat membaca dengan tenang."
      : "Surat ulang tahun siap dibuka.",
  );
  const [actionError, setActionError] = useState<string | null>(null);

  const settleToOpened = useCallback(() => {
    const targets = [
      stageRef.current,
      paperRef.current,
      flapRef.current,
      headerRef.current,
      bodyRef.current,
      footerRef.current,
      continueButtonRef.current,
    ].filter(Boolean);
    gsap.set(targets, { clearProps: "all" });
    setPhase("opened");
    setOpenedSettled(true);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      unfoldTimelineRef.current?.kill();
      exitTimelineRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!sceneRef.current) return;

    if (prefersReducedMotion) {
      const targets = [
        stageRef.current,
        paperRef.current,
        flapRef.current,
        headerRef.current,
        bodyRef.current,
        footerRef.current,
        continueButtonRef.current,
      ].filter(Boolean);
      gsap.set(targets, { clearProps: "all" });
      queueMicrotask(() => {
        if (mountedRef.current) {
          setPhase("opened");
          setOpenedSettled(true);
        }
      });
      return;
    }

    if (phase === "folded") {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          paperRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 0.98,
            duration: 0.54,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
        );
      }, sceneRef);
      return () => ctx.revert();
    }

    if (phase === "opened" && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      const targets = [headerRef.current, bodyRef.current, footerRef.current].filter(Boolean);
      const ctx = gsap.context(() => {
        unfoldTimelineRef.current = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            if (mountedRef.current) {
              setOpenedSettled(true);
              gsap.set([paperRef.current, ...targets].filter(Boolean), { clearProps: "transform,opacity" });
              scrollAreaRef.current?.focus({ preventScroll: true });
            }
          },
        })
          .fromTo(
            paperRef.current,
            { scale: 0.98, y: 8 },
            { scale: 1, y: 0, duration: 0.32 },
          )
          .fromTo(
            targets,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.28, stagger: 0.06 },
            0.08,
          );
      }, sceneRef);
      return () => ctx.revert();
    }
  }, [phase, prefersReducedMotion]);

  // Register exit transition for S07 -> S08 handoff
  useEffect(() => {
    return runtimeTransitionCoordinator.register(
      "CONTINUE",
      async (_event, target, signal) => {
        if (target !== "S08" || !sceneRef.current) return;
        setPhase("exiting");

        if (prefersReducedMotion) return;

        await new Promise<void>((resolve, reject) => {
          const onAbort = () => {
            exitTimelineRef.current?.kill();
            settleToOpened();
            reject(new Error("S07 to S08 handoff was cancelled."));
          };
          signal.addEventListener("abort", onAbort, { once: true });

          exitTimelineRef.current = gsap
            .timeline({
              onComplete: () => {
                signal.removeEventListener("abort", onAbort);
                resolve();
              },
            })
            .to(continueButtonRef.current, { opacity: 0, y: 6, duration: 0.16 }, 0)
            .to(
              paperRef.current,
              {
                opacity: 0,
                y: -10,
                scale: 0.99,
                duration: 0.38,
                ease: "power2.inOut",
              },
              0.04,
            );
        });
      },
    );
  }, [prefersReducedMotion, settleToOpened]);

  const openLetter = () => {
    if (phase !== "folded" || transitionActive) return;

    if (prefersReducedMotion) {
      settleToOpened();
      setAnnouncement("Surat ulang tahun terbuka. Selamat membaca.");
      return;
    }

    setPhase("opened");
    setAnnouncement("Surat ulang tahun telah terbuka. Selamat membaca.");
  };

  const handleContinue = async () => {
    if (phase !== "opened" || transitionActive || activationPendingRef.current) return;
    activationPendingRef.current = true;
    setActionError(null);

    try {
      const result = await experienceRuntime.dispatch({ type: "CONTINUE" });
      if (result.status !== "committed") {
        activationPendingRef.current = false;
        setActionError("Tidak dapat melanjutkan saat ini. Silakan coba kembali.");
        setAnnouncement("Lanjutkan belum berhasil diproses.");
      }
    } catch {
      activationPendingRef.current = false;
      setActionError("Terjadi kendala saat melanjutkan. Silakan coba kembali.");
    }
  };

  return (
    <main
      ref={sceneRef}
      data-testid="s07-scene"
      data-visual-phase={phase}
      data-opened-settled={openedSettled ? "true" : "false"}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      className="s07-scene"
      aria-labelledby={headingId}
    >
      {/* Live announcement region for screen readers */}
      <div
        data-testid="s07-live-announcement"
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {announcement}
      </div>

      <p className="s07-kicker" aria-hidden="true">
        {letter.kicker}
      </p>

      <div ref={stageRef} className="s07-stage">
        {/* Keepsake Reading Surface */}
        <article
          ref={paperRef}
          data-testid="s07-paper-card"
          className={`s07-paper-card ${phase === "folded" ? "s07-paper-card--folded" : "s07-paper-card--opened"}`}
        >
          {/* Subtle paper fold seam / flap indicator */}
          <div
            ref={flapRef}
            aria-hidden="true"
            className="s07-paper-crease"
          >
            <div className="s07-crease-line" />
          </div>

          {phase === "folded" ? (
            /* Unopened Keepsake Presentation */
            <div className="s07-folded-envelope" data-testid="s07-folded-view">
              <div className="s07-seal-badge" aria-hidden="true">
                <span className="s07-seal-ring" />
                <span className="s07-seal-letter">M</span>
              </div>

              <div className="s07-folded-copy">
                <p className="s07-folded-date">{letter.dateLabel}</p>
                <h1 id={headingId} className="s07-folded-salutation">
                  {letter.salutation}
                </h1>
                <p className="s07-folded-sub">
                  Sebuah pesan personal untuk merayakan hari kelahiranmu.
                </p>
                <span className="s07-read-time">{letter.estimatedReadTime}</span>
              </div>

              <button
                type="button"
                data-testid="s07-open-letter"
                className="s07-open-button"
                onClick={openLetter}
                autoFocus
              >
                <span>Buka Surat</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            /* Unfolded Editorial Letter Flow */
            <div
              ref={scrollAreaRef}
              data-testid="s07-reading-surface"
              role="region"
              tabIndex={0}
              aria-label="Isi surat ulang tahun"
              className="s07-letter-scroll"
            >
              <header ref={headerRef} className="s07-letter-header">
                <div className="s07-meta-row">
                  <span className="s07-meta-date">{letter.dateLabel}</span>
                  <span className="s07-dev-badge" data-content-status={S07_CONTENT_STATUS}>
                    KEEPSAKE EDITORIAL
                  </span>
                </div>
                <h1 id={headingId} className="s07-salutation">
                  {letter.salutation}
                </h1>
              </header>

              <div ref={bodyRef} className="s07-letter-body">
                <p className="s07-lead-paragraph">{letter.leadParagraph}</p>

                <div className="s07-divider" aria-hidden="true">
                  <span className="s07-divider-dot" />
                </div>

                {letter.sections.map((section) => (
                  <p key={section.id} className="s07-section-paragraph" data-section-type={section.type}>
                    {section.text}
                  </p>
                ))}

                <div className="s07-letter-closing">
                  <p className="s07-sign-off">{letter.signOff}</p>
                  <p className="s07-sender-mark">{letter.senderLabel}</p>
                </div>
              </div>

              <footer ref={footerRef} className="s07-letter-footer">
                {actionError && (
                  <p role="alert" className="s07-action-error">
                    {actionError}
                  </p>
                )}
                <button
                  ref={continueButtonRef}
                  type="button"
                  data-testid="s07-continue"
                  className="s07-continue"
                  onClick={handleContinue}
                  disabled={transitionActive}
                >
                  <span>{letter.ctaLabel}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </footer>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
