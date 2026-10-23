import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("S09 Editorial Canvas", () => {
  const canvasSource = readFileSync(path.resolve("src/ui/s09/S09EditorialCanvas.tsx"), "utf8");

  it("provides an aria-hidden canvas containing shore, twilight, and deep artwork layers", () => {
    expect(canvasSource).toContain('className="s09-editorial-canvas"');
    expect(canvasSource).toContain('aria-hidden="true"');
    expect(canvasSource).toContain("s09-art-layer--shore");
    expect(canvasSource).toContain("s09-color-layer--twilight");
    expect(canvasSource).toContain("s09-color-layer--deep");
  });

  it("contains handcrafted editorial SVG motifs and star ornaments", () => {
    expect(canvasSource).toContain("s09-art-corner");
    expect(canvasSource).toContain("s09-art-star-shore");
    expect(canvasSource).toContain("s09-art-ribbon");
    expect(canvasSource).toContain("s09-art-star-deep");
    // Contains champagne-gold accent color in deep region
    expect(canvasSource).toContain("#e8d8b9");
  });

  it("does not contain ocean or underwater imagery", () => {
    const lower = canvasSource.toLowerCase();
    expect(lower).not.toContain("bubble");
    expect(lower).not.toContain("fish");
    expect(lower).not.toContain("ripple");
    expect(lower).not.toContain("portal");
    expect(lower).not.toContain("particle");
  });

  it("implements pointer-based displacement with reduced-motion bypass", () => {
    expect(canvasSource).toContain("usePrefersReducedMotion");
    expect(canvasSource).toContain("if (reduced) return;");
    expect(canvasSource).toContain("pointermove");
    expect(canvasSource).toContain("pointerleave");
    expect(canvasSource).toContain("gsap.killTweensOf");
  });
});

