import type { RefObject, SVGProps } from "react";

export interface MalicaLoadingMarkProps extends SVGProps<SVGSVGElement> {
  svgRef?: RefObject<SVGSVGElement | null>;
  loopRingGroupRef?: RefObject<SVGGElement | null>;
  outerRingRef?: RefObject<SVGPathElement | null>;
  innerRingRef?: RefObject<SVGPathElement | null>;
  malicaGlyphRef?: RefObject<SVGPathElement | null>;
  malicaShadowRef?: RefObject<SVGPathElement | null>;
  malicaSparkRef?: RefObject<SVGCircleElement | null>;
  age19Ref?: RefObject<SVGGElement | null>;
  spark1Ref?: RefObject<SVGGElement | null>;
  spark2Ref?: RefObject<SVGGElement | null>;
  /**
   * If true, renders all paths and sparks fully drawn and visible
   * for immediate static rendering or reduced-motion.
   */
  staticMode?: boolean;
}

export function MalicaLoadingMark({
  svgRef,
  loopRingGroupRef,
  outerRingRef,
  innerRingRef,
  malicaGlyphRef,
  malicaShadowRef,
  malicaSparkRef,
  age19Ref,
  spark1Ref,
  spark2Ref,
  staticMode = false,
  className = "w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96",
  ...props
}: MalicaLoadingMarkProps) {
  const strokeStyle = staticMode
    ? { strokeDasharray: "none", strokeDashoffset: 0 }
    : { strokeDasharray: 100, strokeDashoffset: 100 };

  return (
    <svg
      id="a02-root"
      data-testid="loading-mark"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {/* Outer & Inner Delicate Rings */}
      <g
        id="loop-ring"
        ref={loopRingGroupRef}
        style={{ transformOrigin: "128px 128px" }}
      >
        <path
          id="a02-outer"
          data-id="loop-ring-outer"
          ref={outerRingRef}
          pathLength={100}
          d="M158,42 C206,60 224,108 216,148 C208,190 166,217 122,212 C80,207 46,176 44,134 C42,94 64,56 104,44 C118,40 132,39 146,40"
          stroke="#4A2E3B"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.92"
          style={strokeStyle}
        />
        <path
          id="a02-inner"
          data-id="loop-ring-inner"
          ref={innerRingRef}
          pathLength={100}
          d="M150,56 C190,72 204,112 198,146 C192,182 158,204 120,200 C84,196 58,170 56,136 C54,100 72,70 104,58 C116,54 128,53 138,55"
          stroke="#B9AFC9"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.5"
          style={strokeStyle}
        />
      </g>

      {/* Signature Malica 'M' Monogram */}
      <g id="malica-mark" style={{ transformOrigin: "128px 128px" }}>
        <path
          id="malica-glyph-shadow"
          ref={malicaShadowRef}
          d="M128,96 C150,108 160,130 150,156 C140,180 112,180 104,156 C96,130 106,108 128,96 Z"
          fill="#4A2E3B"
          opacity={staticMode ? 0.06 : 0}
        />
        <path
          id="malica-glyph"
          ref={malicaGlyphRef}
          pathLength={100}
          d="M92,168 C88,142 88,116 90,92 C104,110 117,126 126,144 C137,125 151,107 168,88 C170,114 171,142 166,168"
          stroke="#4A2E3B"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={strokeStyle}
        />
        <circle
          id="malica-spark"
          ref={malicaSparkRef}
          cx="126"
          cy="144"
          r="3.2"
          fill="#E8A598"
          opacity={staticMode ? 0.9 : 0}
          style={{ transformOrigin: "126px 144px" }}
        />
      </g>

      {/* Age '19' Keepsake Numeral */}
      <g
        id="age-19"
        ref={age19Ref}
        style={{
          transformOrigin: "128px 196px",
          opacity: staticMode ? 1 : 0,
        }}
      >
        <path
          d="M112,208 L112,178 M106,184 L112,178 M105,208 L119,208"
          stroke="#4A2E3B"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse
          cx="144"
          cy="186"
          rx="7"
          ry="8.5"
          stroke="#4A2E3B"
          strokeWidth="1.8"
        />
        <path
          d="M150,190 C152,200 146,210 136,210"
          stroke="#4A2E3B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* Celestial Accent Sparks */}
      <g
        id="accent-spark-1"
        ref={spark1Ref}
        style={{
          transformOrigin: "163px 42px",
          opacity: staticMode ? 1 : 0,
        }}
      >
        <circle cx="163" cy="42" r="2.6" fill="#E8A598" opacity="0.9" />
        <path
          d="M154,36 C158,34 161,36 163,40"
          stroke="#E8A598"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>

      <g
        id="accent-spark-2"
        ref={spark2Ref}
        style={{
          transformOrigin: "50px 118px",
          opacity: staticMode ? 1 : 0,
        }}
      >
        <circle cx="50" cy="118" r="2" fill="#B9AFC9" opacity="0.75" />
      </g>
    </svg>
  );
}
