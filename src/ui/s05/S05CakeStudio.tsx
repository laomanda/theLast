"use client";

import { ArrowCounterClockwise, Check, Trash, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  CAKE_ACCENT_OPTIONS,
  CAKE_CANDLE_OPTIONS,
  CAKE_FLOWER_OPTIONS,
  CAKE_FROSTING_OPTIONS,
  CAKE_TOPPER_OPTIONS,
  applyCakeOption,
  cakeOptionFor,
  type CakeOptionCategory,
} from "../../cake/configuration";
import { runtimeTransitionCoordinator } from "../../runtime/transition-coordinator";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { usePrefersReducedMotion } from "../s01/S01Prelude";
import { CakeRenderer } from "./CakeRenderer";

export const S05_FINISH_LABEL = "Selesaikan kue";

const categories: ReadonlyArray<{ id: CakeOptionCategory; label: string }> = [
  { id: "frosting", label: "Frosting" },
  { id: "candles", label: "Lilin" },
  { id: "flowers", label: "Bunga" },
  { id: "topper", label: "Topper" },
  { id: "accents", label: "Aksen" },
];

const optionLabels: Record<string, string> = {
  "cfg-A-coral-garden": "Coral hangat",
  "cfg-B-periwinkle-warm": "Periwinkle lembut",
  "candles-three": "Tiga lilin",
  "candles-five": "Lima lilin",
  "flowers-none": "Tanpa bunga",
  "flowers-garden": "Taman kecil",
  "topper-none": "Tanpa topper",
  "topper-loop": "Loop topper",
  "accent-none": "Tanpa aksen",
  "accent-pearls": "Mutiara",
  "accent-ribbon": "Pita",
};

const categoryOptions: Record<CakeOptionCategory, readonly string[]> = {
  frosting: CAKE_FROSTING_OPTIONS,
  candles: CAKE_CANDLE_OPTIONS,
  flowers: CAKE_FLOWER_OPTIONS,
  topper: CAKE_TOPPER_OPTIONS,
  accents: CAKE_ACCENT_OPTIONS,
};

type VisualPhase = "entering" | "active" | "exiting";

export function S05CakeStudio() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cakeFeedbackRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef<HTMLDivElement | null>(null);
  const trayRef = useRef<HTMLElement | null>(null);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const finishingRef = useRef(false);
  const mountedRef = useRef(true);

  const draft = useExperienceStore((state) => state.cake.draft);
  const historyLength = useExperienceStore((state) => state.cake.history.length);
  const transitionActive = useExperienceStore((state) => state.transition.activeId !== null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeCategory, setActiveCategory] = useState<CakeOptionCategory>("frosting");
  const [visualPhase, setVisualPhase] = useState<VisualPhase>(prefersReducedMotion ? "active" : "entering");
  const [announcement, setAnnouncement] = useState("Kue siap dihias.");
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const settlePose = useCallback(() => {
    gsap.set([stageRef.current, headingRef.current, cakeFeedbackRef.current, propsRef.current, trayRef.current], { clearProps: "transform,opacity,visibility" });
    setVisualPhase("active");
  }, []);

  useEffect(() => {
    const cakeFeedbackNode = cakeFeedbackRef.current;
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      entryTimelineRef.current?.kill();
      exitTimelineRef.current?.kill();
      gsap.killTweensOf(cakeFeedbackNode);
    };
  }, []);

  useLayoutEffect(() => {
    if (!sceneRef.current) return;
    if (prefersReducedMotion) {
      gsap.set([headingRef.current, cakeFeedbackRef.current, propsRef.current, trayRef.current], { clearProps: "transform,opacity,visibility" });
      return;
    }
    const ctx = gsap.context(() => {
      entryTimelineRef.current = gsap.timeline({ defaults: { ease: "power3.out" } })
        .set(headingRef.current, { opacity: 0, y: 16 })
        .set(cakeFeedbackRef.current, { opacity: 0, y: 28, rotation: -1.4, scale: 0.965 })
        .set(propsRef.current, { opacity: 0, y: 10 })
        .set(trayRef.current, { opacity: 0, x: 20, y: 10 })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(cakeFeedbackRef.current, { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 0.72, ease: "back.out(1.18)" }, 0.12)
        .to(propsRef.current, { opacity: 1, y: 0, duration: 0.42 }, 0.42)
        .to(trayRef.current, { opacity: 1, x: 0, y: 0, duration: 0.55 }, 0.36)
        .call(() => mountedRef.current && setVisualPhase("active"), [], 0.94);
    }, sceneRef);
    return () => ctx.revert();
  }, [prefersReducedMotion, settlePose]);

  useEffect(() => runtimeTransitionCoordinator.register("FINISH_CAKE", async (_event, target, signal) => {
    if (target !== "S06" || !sceneRef.current) return;
    entryTimelineRef.current?.progress(1).kill();
    setVisualPhase("exiting");
    if (prefersReducedMotion) return;
    await new Promise<void>((resolve, reject) => {
      let complete = false;
      const onAbort = () => {
        exitTimelineRef.current?.kill();
        settlePose();
        if (!complete) reject(new Error("S05 to S06 handoff was cancelled."));
      };
      signal.addEventListener("abort", onAbort, { once: true });
      exitTimelineRef.current = gsap.timeline({ onComplete: () => {
        complete = true;
        signal.removeEventListener("abort", onAbort);
        resolve();
      } })
        .to(trayRef.current, { opacity: 0, y: 12, duration: 0.24, ease: "power2.in" }, 0)
        .to(stageRef.current, { y: -8, scale: 0.99, duration: 0.42, ease: "power2.inOut" }, 0.08);
    });
  }), [prefersReducedMotion, settlePose]);

  const animateCakeFeedback = () => {
    if (prefersReducedMotion || !cakeFeedbackRef.current) return;
    gsap.killTweensOf(cakeFeedbackRef.current);
    gsap.fromTo(cakeFeedbackRef.current, { scale: 0.992, y: 2 }, { scale: 1, y: 0, duration: 0.28, ease: "back.out(1.35)", clearProps: "transform" });
  };

  const chooseOption = async (category: CakeOptionCategory, option: string) => {
    if (transitionActive || finishingRef.current) return;
    const next = applyCakeOption(draft, category, option);
    if (!next) {
      setAnnouncement("Pilihan itu tidak valid dan tidak diterapkan.");
      return;
    }
    const result = await experienceRuntime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: next });
    if (result.status === "applied") {
      setAnnouncement(`${categories.find((item) => item.id === category)?.label}: ${optionLabels[option]} dipilih.`);
      animateCakeFeedback();
    } else setAnnouncement("Perubahan belum dapat diterapkan.");
  };

  const undo = async () => {
    const result = await experienceRuntime.dispatch({ type: "UNDO_CAKE_DRAFT" });
    if (result.status === "applied") {
      setAnnouncement("Perubahan terakhir dibatalkan.");
      animateCakeFeedback();
    }
  };

  const reset = async () => {
    const result = await experienceRuntime.dispatch({ type: "RESET_CAKE_DRAFT" });
    if (result.status === "applied") {
      setAnnouncement("Kue dikembalikan ke susunan awal.");
      animateCakeFeedback();
    }
    setResetConfirmOpen(false);
  };

  const finishCake = async () => {
    if (finishingRef.current || experienceRuntime.isTransitionInFlight()) return;
    finishingRef.current = true;
    setActionError(null);
    const result = await experienceRuntime.dispatch({ type: "FINISH_CAKE", configuration: draft });
    if (result.status !== "committed" && mountedRef.current) {
      finishingRef.current = false;
      settlePose();
      setActionError("Kue belum dapat diselesaikan. Periksa pilihanmu dan coba lagi.");
    }
  };

  return (
    <main
      ref={sceneRef}
      data-testid="s05-scene"
      data-visual-phase={visualPhase}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      aria-labelledby="s05-title"
      className="s05-scene"
    >
      <section className="s05-layout">
        <div ref={stageRef} className="s05-stage">
          <div ref={headingRef} className="s05-heading-block">
            <p className="s05-kicker">The little cake atelier</p>
            <h1 id="s05-title">Hias kuemu.</h1>
            <p className="s05-supporting-copy">Pilih sesuatu yang manis, lalu buat jadi milikmu.</p>
          </div>
          <div ref={cakeFeedbackRef} className="s05-cake-object">
            <CakeRenderer configuration={draft} />
          </div>
          <div ref={propsRef} className="s05-stage-props" aria-hidden="true">
            <svg className="s05-prop s05-prop--whisk" viewBox="0 0 110 180">
              <path d="M56 111 25 169" /><path d="m49 108-31 56" /><path d="M51 108c-34-25-38-65-18-79 20-14 35 20 23 79Z" /><path d="M58 109c35-24 42-63 23-79-19-16-36 18-23 79Z" /><path d="M55 108c-4-39 1-79 20-84" />
            </svg>
            <svg className="s05-prop s05-prop--ribbon" viewBox="0 0 220 76">
              <path d="M7 47c37-45 63 21 101-12s61 18 105-17" /><path d="m192 12 22 6-13 19" />
            </svg>
            <span className="s05-paper-scrap">made with care <b>✦</b></span>
          </div>
        </div>

        <aside ref={trayRef} className="s05-tray" aria-label="Pilihan dekorasi kue">
          <div className="s05-tray-heading">
            <span>Decoration tray</span>
            <i aria-hidden="true" />
          </div>
          <div className="s05-category-tabs" role="tablist" aria-label="Kategori dekorasi">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls={`s05-options-${category.id}`}
                onClick={() => setActiveCategory(category.id)}
                className="s05-category-tab"
              >{category.label}</button>
            ))}
          </div>

          <div id={`s05-options-${activeCategory}`} role="tabpanel" className="s05-options">
            {categoryOptions[activeCategory].map((option) => {
              const selected = cakeOptionFor(draft, activeCategory) === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => chooseOption(activeCategory, option)}
                  className="s05-option"
                >
                  <span className={`s05-option-swatch s05-option-swatch--${option}`} aria-hidden="true" />
                  <span>{optionLabels[option]}</span>
                  {selected && <Check size={17} weight="bold" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div className="s05-edit-actions">
            <button type="button" onClick={undo} disabled={historyLength === 0 || transitionActive} className="s05-utility-action">
              <ArrowCounterClockwise size={18} aria-hidden="true" /> Urungkan
            </button>
            <button type="button" onClick={() => setResetConfirmOpen(true)} disabled={transitionActive} className="s05-utility-action">
              <Trash size={18} aria-hidden="true" /> Atur ulang
            </button>
          </div>

          {resetConfirmOpen && (
            <div className="s05-reset-confirm" role="alertdialog" aria-labelledby="s05-reset-title" aria-modal="false">
              <p id="s05-reset-title">Kembalikan kue ke susunan awal?</p>
              <div>
                <button type="button" onClick={() => setResetConfirmOpen(false)}><X size={16} aria-hidden="true" /> Batalkan</button>
                <button type="button" onClick={reset}><Check size={16} aria-hidden="true" /> Ya, atur ulang</button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={finishCake}
            disabled={transitionActive}
            aria-busy={transitionActive}
            className="s05-finish-action"
          >
            <span>{S05_FINISH_LABEL}</span><Check size={20} weight="bold" aria-hidden="true" />
          </button>
          {actionError && <p role="alert" className="s05-action-error">{actionError}</p>}
        </aside>
      </section>
      <div className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>
    </main>
  );
}
