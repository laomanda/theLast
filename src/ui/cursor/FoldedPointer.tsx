"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorState = "idle" | "interactive" | "press" | "drag" | "disabled" | "busy";

function isTextContext(target: Element) {
  return target.matches("input, textarea, select, [contenteditable='true'], [contenteditable='']") || Boolean(target.closest("input, textarea, select, [contenteditable='true'], [contenteditable='']"));
}

function getInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>("button, a[href], [role='button'], [role='link'], [data-cursor]");
}

function resolveState(target: EventTarget | null): CursorState {
  const element = getInteractiveTarget(target);
  if (!element) return "idle";
  if (element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") return "disabled";
  const intent = element.dataset.cursor;
  if (intent === "drag" || element.matches("[draggable='true'], [data-cursor='drag']")) return "drag";
  if (intent === "busy" || element.getAttribute("aria-busy") === "true") return "busy";
  return "interactive";
}

export function FoldedPointer() {
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const flapRef = useRef<SVGPathElement | null>(null);
  const creaseRef = useRef<SVGPathElement | null>(null);
  const quickX = useRef<((value: number) => void) | null>(null);
  const quickY = useRef<((value: number) => void) | null>(null);
  const stateRef = useRef<CursorState>("idle");
  const [state, setState] = useState<CursorState>("idle");

  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;
    root.dataset.foldedCursorReady = "true";
    const pointer = pointerRef.current;
    if (!pointer) return () => { delete root.dataset.foldedCursorReady; };

    quickX.current = gsap.quickTo(pointer, "x", { duration: 0.08, ease: "power3.out" });
    quickY.current = gsap.quickTo(pointer, "y", { duration: 0.08, ease: "power3.out" });

    const setStateSafe = (next: CursorState) => {
      if (stateRef.current === next) return;
      stateRef.current = next;
      setState(next);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      quickX.current?.(event.clientX - 2);
      quickY.current?.(event.clientY - 2);
      pointer.dataset.visible = "true";
      if (!isTextContext(event.target as Element)) setStateSafe(stateRef.current === "press" ? "press" : resolveState(event.target));
    };
    const onEnter = (event: PointerEvent) => { if (event.pointerType === "mouse") pointer.dataset.visible = "true"; };
    const onLeave = () => { pointer.dataset.visible = "false"; setStateSafe("idle"); };
    const onDown = (event: PointerEvent) => { if (event.pointerType === "mouse") setStateSafe(resolveState(event.target) === "disabled" ? "disabled" : "press"); };
    const onUp = () => setStateSafe("idle");
    const onOver = (event: PointerEvent) => { if (event.pointerType === "mouse" && stateRef.current !== "press") setStateSafe(resolveState(event.target)); };
    const onVisibility = () => { if (document.hidden) pointer.dataset.visible = "false"; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerenter", onEnter, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("visibilitychange", onVisibility);
      delete root.dataset.foldedCursorReady;
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const flap = flapRef.current;
    const crease = creaseRef.current;
    if (!flap || !crease) return;
    const hover = state === "interactive" || state === "drag";
    gsap.to(flap, { attr: { d: hover ? "M8 7 L29 16 L18 20 L11 15Z" : "M8 7 L25 16 L17 19 L11 14Z" }, duration: .16, ease: "power2.out", overwrite: true });
    gsap.to(crease, { opacity: hover ? .95 : .56, duration: .16, overwrite: true });
  }, [state]);

  return <div ref={pointerRef} className="folded-pointer" data-state={state} data-visible="false" aria-hidden="true">
    <svg viewBox="0 0 32 32" width="32" height="32" focusable="false">
      <path className="folded-pointer__edge" d="M3 3 L29 15 L19 19 L14 28 L9 15Z" />
      <path className="folded-pointer__face" d="M5 4 L27 15 L17 18 L11 26 L10 14Z" />
      <path ref={flapRef} className="folded-pointer__flap" d="M8 7 L25 16 L17 19 L11 14Z" />
      <path ref={creaseRef} className="folded-pointer__crease" d="M10 14 L17 18" />
      <path className="folded-pointer__accent" d="M7 5 L10 7" />
    </svg>
  </div>;
}
