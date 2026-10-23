"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

export type DepthPhase = "shore" | "descending" | "deep" | "handoff";

interface S09EditorialCanvasProps {
  phase: DepthPhase;
}

export function S09EditorialCanvas({ phase }: S09EditorialCanvasProps) {
  const reduced = usePrefersReducedMotion();

  // Shore parallax refs
  const shorePaperRef = useRef<HTMLDivElement>(null);
  const shoreLineRef = useRef<HTMLDivElement>(null);
  const shoreStarRef = useRef<HTMLDivElement>(null);

  // Twilight parallax refs
  const twilightPaperRef = useRef<HTMLDivElement>(null);
  const twilightLineRef = useRef<HTMLDivElement>(null);
  const twilightAccentsRef = useRef<HTMLDivElement>(null);

  // Deep parallax refs
  const deepPaperRef = useRef<HTMLDivElement>(null);
  const deepFramesRef = useRef<HTMLDivElement>(null);
  const deepStarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const shorePaper = shorePaperRef.current;
    const shoreLine = shoreLineRef.current;
    const shoreStar = shoreStarRef.current;
    const twilightPaper = twilightPaperRef.current;
    const twilightLine = twilightLineRef.current;
    const twilightAccents = twilightAccentsRef.current;
    const deepPaper = deepPaperRef.current;
    const deepFrames = deepFramesRef.current;
    const deepStar = deepStarRef.current;
    const allTargets = [
      shorePaper,
      shoreLine,
      shoreStar,
      twilightPaper,
      twilightLine,
      twilightAccents,
      deepPaper,
      deepFrames,
      deepStar,
    ].filter(Boolean);

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      if ("pointerType" in e && e.pointerType === "touch") return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;

      // Small positional displacement (approx 4–10 px)
      // Shore elements
      if (shorePaper) {
        gsap.to(shorePaper, {
          x: nx * 5,
          y: ny * 5,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (shoreLine) {
        gsap.to(shoreLine, {
          x: nx * -7,
          y: ny * -7,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (shoreStar) {
        gsap.to(shoreStar, {
          x: nx * 9,
          y: ny * 9,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Twilight elements
      if (twilightPaper) {
        gsap.to(twilightPaper, {
          x: nx * 4,
          y: ny * 4,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (twilightLine) {
        gsap.to(twilightLine, {
          x: nx * -6,
          y: ny * -6,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (twilightAccents) {
        gsap.to(twilightAccents, {
          x: nx * 8,
          y: ny * 8,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Deep elements
      if (deepPaper) {
        gsap.to(deepPaper, {
          x: nx * 5,
          y: ny * 5,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (deepFrames) {
        gsap.to(deepFrames, {
          x: nx * -7,
          y: ny * -7,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (deepStar) {
        gsap.to(deepStar, {
          x: nx * 10,
          y: ny * 10,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handlePointerLeave = () => {
      if (allTargets.length > 0) {
        gsap.to(allTargets, {
          x: 0,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      gsap.killTweensOf(allTargets);
    };
  }, [reduced]);

  return (
    <div className="s09-editorial-canvas" data-canvas-phase={phase} aria-hidden="true">
      {/* 1. UPPER REGION: SHORE / WARM IVORY */}
      <div className="s09-art-layer s09-art-layer--shore">
        {/* Layered paper impression in top-right */}
        <div ref={shorePaperRef} className="s09-art-wrapper s09-art-corner">
          <svg
            className="s09-art-svg"
            viewBox="0 0 600 500"
            fill="none"
            preserveAspectRatio="xMaxYMin meet"
          >
            {/* Soft translucent vellum patch */}
            <path
              d="M260 0 C300 135, 410 250, 600 275 L600 0 Z"
              fill="rgba(244, 235, 224, 0.45)"
              stroke="rgba(123, 82, 98, 0.08)"
              strokeWidth="1"
            />
            {/* Concentric editorial contour arcs */}
            <path
              d="M110 0 C155 190, 310 345, 600 380"
              stroke="rgba(123, 82, 98, 0.17)"
              strokeWidth="1.25"
              strokeDasharray="140 16"
            />
            <path
              d="M190 0 C230 155, 365 285, 600 315"
              stroke="rgba(123, 82, 98, 0.12)"
              strokeWidth="1"
            />
            <path
              d="M330 0 C355 110, 440 200, 600 220"
              stroke="rgba(175, 140, 150, 0.2)"
              strokeWidth="0.9"
              strokeDasharray="6 8"
            />
          </svg>
        </div>

        {/* Graceful ribbon linework descending along right flank */}
        <div ref={shoreLineRef} className="s09-art-wrapper s09-art-ribbon">
          <svg
            className="s09-art-svg"
            viewBox="0 0 300 800"
            fill="none"
            preserveAspectRatio="xMaxYMid meet"
          >
            <path
              d="M280 40 C190 210, 240 390, 170 550 C110 690, 160 760, 230 800"
              stroke="rgba(123, 82, 98, 0.14)"
              strokeWidth="1.2"
            />
            <path
              d="M295 70 C210 235, 260 410, 195 565 C140 700, 185 770, 250 800"
              stroke="rgba(180, 150, 160, 0.16)"
              strokeWidth="0.85"
              strokeDasharray="14 10"
            />
          </svg>
        </div>

        {/* Bespoke 4-pointed diamond star motif */}
        <div ref={shoreStarRef} className="s09-art-wrapper s09-art-star-shore">
          <svg className="s09-art-svg" viewBox="-30 -30 60 60" fill="none">
            <circle
              cx="0"
              cy="0"
              r="22"
              stroke="rgba(123, 82, 98, 0.15)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
            <path
              d="M0 -15 C0.8 -4, 4 -0.8, 15 0 C4 0.8, 0.8 4, 0 15 C-0.8 4, -4 0.8, -15 0 C-4 -0.8, -0.8 -4, 0 -15 Z"
              fill="rgba(123, 82, 98, 0.18)"
              stroke="rgba(123, 82, 98, 0.32)"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="1.5" fill="#df776e" opacity="0.85" />
          </svg>
        </div>

        {/* Bottom-left subtle editorial registration mark */}
        <div className="s09-art-wrapper s09-art-registration">
          <svg className="s09-art-svg" viewBox="0 0 60 30" fill="none">
            <line x1="0" y1="15" x2="30" y2="15" stroke="rgba(123, 82, 98, 0.16)" strokeWidth="0.8" />
            <line x1="15" y1="0" x2="15" y2="30" stroke="rgba(123, 82, 98, 0.16)" strokeWidth="0.8" />
            <circle cx="15" cy="15" r="3.5" stroke="rgba(123, 82, 98, 0.16)" strokeWidth="0.8" />
          </svg>
        </div>
      </div>

      {/* 2. TRANSITIONAL REGION: TWILIGHT */}
      <div className="s09-color-layer s09-color-layer--twilight">
        <div className="s09-art-layer s09-art-layer--twilight">
          {/* Layered translucent paper waves */}
          <div ref={twilightPaperRef} className="s09-art-wrapper">
            <svg
              className="s09-art-svg"
              viewBox="0 0 1440 900"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Wave 1 - blush/rose vellum */}
              <path
                d="M-60 200 C240 140, 480 300, 780 220 C1060 150, 1280 290, 1500 230 L1500 960 L-60 960 Z"
                fill="rgba(255, 244, 242, 0.12)"
                stroke="rgba(180, 155, 182, 0.16)"
                strokeWidth="1"
              />
              {/* Wave 2 - lavender vellum */}
              <path
                d="M-60 390 C200 320, 420 480, 720 400 C1020 320, 1220 460, 1500 380 L1500 960 L-60 960 Z"
                fill="rgba(199, 177, 196, 0.14)"
                stroke="rgba(121, 98, 127, 0.15)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Vertical undulating editorial contours */}
          <div ref={twilightLineRef} className="s09-art-wrapper">
            <svg
              className="s09-art-svg"
              viewBox="0 0 1440 900"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M180 -40 C280 230, 140 470, 360 730 C520 910, 420 1090, 560 1270"
                stroke="rgba(104, 78, 112, 0.22)"
                strokeWidth="1.5"
                strokeDasharray="120 20"
              />
              <path
                d="M210 -20 C310 250, 170 490, 390 750 C550 930, 450 1110, 590 1290"
                stroke="rgba(255, 235, 242, 0.22)"
                strokeWidth="0.9"
              />
              <path
                d="M1320 60 C1180 260, 1260 500, 1120 740 C1000 940, 1080 1100, 980 1260"
                stroke="rgba(155, 130, 158, 0.18)"
                strokeWidth="1.2"
                strokeDasharray="80 16"
              />
            </svg>
          </div>

          {/* Bespoke astral & grid accents */}
          <div ref={twilightAccentsRef} className="s09-art-wrapper">
            <svg
              className="s09-art-svg"
              viewBox="0 0 1440 900"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Refined crosshair in upper right */}
              <g transform="translate(1140, 270)">
                <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(245, 230, 240, 0.26)" strokeWidth="0.8" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(245, 230, 240, 0.26)" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="rgba(255, 235, 245, 0.55)" />
              </g>
              {/* 4-point star accent in lower-left transitional flank */}
              <g transform="translate(320, 600)">
                <path
                  d="M0 -9 C0.5 -2.5, 2.5 -0.5, 9 0 C2.5 0.5, 0.5 2.5, 0 9 C-0.5 2.5, -2.5 0.5, -9 0 C-2.5 -0.5, -0.5 -2.5, 0 -9 Z"
                  fill="rgba(235, 215, 230, 0.25)"
                  stroke="rgba(155, 130, 158, 0.3)"
                  strokeWidth="0.75"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* 3. LOWER REGION: DEEP PLUM */}
      <div className="s09-color-layer s09-color-layer--deep">
        <div className="s09-art-layer s09-art-layer--deep">
          {/* Deep sculpted translucent vellum planes */}
          <div ref={deepPaperRef} className="s09-art-wrapper">
            <svg
              className="s09-art-svg"
              viewBox="0 0 1440 900"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M-40 460 C180 410, 340 540, 520 490 C620 460, 680 480, 720 510 L720 950 L-40 950 Z"
                fill="rgba(20, 17, 36, 0.4)"
                stroke="rgba(167, 145, 188, 0.16)"
                strokeWidth="1"
              />
              <path
                d="M820 440 C980 390, 1160 510, 1340 460 C1410 440, 1460 460, 1500 480 L1500 950 L820 950 Z"
                fill="rgba(24, 21, 43, 0.34)"
                stroke="rgba(201, 178, 207, 0.13)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Intricate concentric framing contours */}
          <div ref={deepFramesRef} className="s09-art-wrapper">
            <svg
              className="s09-art-svg"
              viewBox="0 0 1440 900"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Upper-Left Celestial Arc Cluster */}
              <g transform="translate(160, 150)">
                <path
                  d="M-120 -80 C40 -90, 180 30, 190 190"
                  stroke="rgba(167, 145, 188, 0.22)"
                  strokeWidth="1.3"
                  strokeDasharray="90 18"
                />
                <path
                  d="M-80 -60 C60 -70, 160 20, 170 160"
                  stroke="rgba(201, 178, 207, 0.15)"
                  strokeWidth="1"
                />
                <path
                  d="M-40 -40 C75 -48, 140 15, 150 130"
                  stroke="rgba(232, 216, 185, 0.22)"
                  strokeWidth="0.8"
                  strokeDasharray="4 8"
                />
                <circle cx="190" cy="190" r="2" fill="#e8d8b9" opacity="0.65" />
              </g>

              {/* Lower-Right Framing Cluster */}
              <g transform="translate(1260, 730)">
                <path
                  d="M80 120 C-60 130, -200 10, -210 -150"
                  stroke="rgba(167, 145, 188, 0.2)"
                  strokeWidth="1.4"
                  strokeDasharray="100 20"
                />
                <path
                  d="M50 90 C-70 100, -170 0, -180 -120"
                  stroke="rgba(140, 120, 165, 0.16)"
                  strokeWidth="1"
                  strokeDasharray="12 12"
                />
                <path
                  d="M20 60 C-80 70, -145 -10, -155 -90"
                  stroke="rgba(232, 216, 185, 0.2)"
                  strokeWidth="0.8"
                />
                <circle cx="-210" cy="-150" r="2" fill="#e8d8b9" opacity="0.65" />
              </g>

              {/* Thin dashed champagne hairline guide */}
              <line
                x1="80"
                y1="450"
                x2="1360"
                y2="450"
                stroke="rgba(232, 216, 185, 0.11)"
                strokeWidth="0.8"
                strokeDasharray="3 14"
              />

              {/* Corner brackets */}
              <path
                d="M36 50 L36 36 L50 36"
                stroke="rgba(232, 216, 185, 0.3)"
                strokeWidth="1"
              />
              <path
                d="M1404 850 L1404 864 L1390 864"
                stroke="rgba(232, 216, 185, 0.3)"
                strokeWidth="1"
              />

              {/* Additional quiet editorial traces for the final depth */}
              <path d="M240 70 C420 10, 610 55, 760 145" stroke="rgba(201,178,207,0.13)" strokeWidth="1" />
              <path d="M280 96 C430 48, 584 80, 710 158" stroke="rgba(232,216,185,0.16)" strokeWidth="0.8" strokeDasharray="5 14" />
              <path d="M1180 120 C1050 180, 1010 300, 1065 418" stroke="rgba(167,145,188,0.15)" strokeWidth="1.1" />
              <path d="M1160 142 C1055 202, 1030 300, 1080 390" stroke="rgba(232,216,185,0.12)" strokeWidth="0.8" strokeDasharray="3 12" />
              <path d="M90 690 C230 620, 360 650, 470 735" stroke="rgba(201,178,207,0.12)" strokeWidth="1" strokeDasharray="72 16" />
              <path d="M920 650 C1040 590, 1190 620, 1360 730" stroke="rgba(232,216,185,0.13)" strokeWidth="0.8" />
              <circle cx="315" cy="245" r="2.4" fill="#e8d8b9" opacity=".35" />
              <circle cx="1110" cy="300" r="1.8" fill="#e8d8b9" opacity=".32" />
              <circle cx="760" cy="735" r="2" fill="#c9b2cf" opacity=".36" />
            </svg>
          </div>

          {/* Bespoke champagne-gold 8-point faceted star motif */}
          <div ref={deepStarRef} className="s09-art-wrapper s09-art-star-deep">
            <svg className="s09-art-svg" viewBox="-24 -24 48 48" fill="none">
              <circle
                cx="0"
                cy="0"
                r="18"
                stroke="rgba(232, 216, 185, 0.32)"
                strokeWidth="0.8"
                strokeDasharray="2 4"
              />
              <path
                d="M0 -14 L2 -4 L10 -10 L4 -2 L14 0 L4 2 L10 10 L2 4 L0 14 L-2 4 L-10 10 L-4 2 L-14 0 L-4 -2 L-10 -10 L-2 -4 Z"
                fill="rgba(232, 216, 185, 0.26)"
                stroke="#e8d8b9"
                strokeWidth="0.9"
              />
              <circle cx="0" cy="0" r="1.5" fill="#fcf8ed" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

