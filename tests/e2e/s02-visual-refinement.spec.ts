import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/cp01c2a/revised");
const CP01C2B_SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/cp01c2b");

async function gotoS02(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  await page.waitForTimeout(850);
}

async function measureKeepsake(page: Page) {
  return page.evaluate(() => {
    const rig = document.querySelector<HTMLElement>("[data-testid='s02-paper-rig']")?.getBoundingClientRect();
    const stage = document.querySelector<HTMLElement>(".s02-keepsake-stage")?.getBoundingClientRect();
    const copy = document.querySelector<HTMLElement>(".s02-copy-column")?.getBoundingClientRect();
    return {
      rig: rig && { left: rig.left, right: rig.right, width: rig.width, height: rig.height },
      stage: stage && { left: stage.left, right: stage.right, width: stage.width, height: stage.height },
      copy: copy && { top: copy.top, bottom: copy.bottom },
      viewport: { width: window.innerWidth, height: window.innerHeight },
    };
  });
}

test.describe("CP-01C.2A S02 visual refinement evidence", () => {
  test("captures comparable closed compositions and verifies responsive presence", async ({ page }) => {
    const viewports = [
      { name: "mobile-320x568", width: 320, height: 568, minimumHeight: 150 },
      { name: "mobile-390x844", width: 390, height: 844, minimumHeight: 200 },
      { name: "mobile-430x932", width: 430, height: 932, minimumHeight: 220 },
      { name: "desktop-1440x900", width: 1440, height: 900, minimumHeight: 250 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoS02(page);
      const metrics = await measureKeepsake(page);
      expect(metrics.rig, JSON.stringify(metrics)).toBeTruthy();
      expect(metrics.rig!.height, JSON.stringify(metrics)).toBeGreaterThan(viewport.minimumHeight);
      expect(metrics.rig!.left, JSON.stringify(metrics)).toBeGreaterThanOrEqual(0);
      expect(metrics.rig!.right, JSON.stringify(metrics)).toBeLessThanOrEqual(viewport.width);
      expect(metrics.copy!.bottom, JSON.stringify(metrics)).toBeLessThanOrEqual(viewport.height);
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `s02_closed_${viewport.name}.png`),
        fullPage: true,
      });
    }
  });

  test("captures the physical fold sequence and stable open pose", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS02(page);
    const open = page.getByRole("button", { name: "Open", exact: true });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_fold_00_closed_390x844.png"), fullPage: true });
    await open.click();
    await page.waitForTimeout(180);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_fold_01_acknowledgment_390x844.png"), fullPage: true });
    await page.waitForTimeout(420);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_fold_02_mid_390x844.png"), fullPage: true });
    await expect(page.getByTestId("s02-scene")).toHaveAttribute("data-visual-phase", "open");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_fold_03_open_390x844.png"), fullPage: true });
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
  });

  test("captures S01 to S02 arrival and reduced-motion resting state", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s01_s02_arrival_390x844.png"), fullPage: true });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole("button", { name: "Open", exact: true })).toBeVisible();
    await page.waitForTimeout(850);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_reduced_motion_resting_390x844.png"), fullPage: true });
  });

  test("CP-01C.2B verifies reduced-motion motif integrity and progression", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const s01Page = await page.context().newPage();
    await s01Page.setViewportSize({ width: 390, height: 844 });
    await s01Page.emulateMedia({ reducedMotion: "reduce" });
    await s01Page.addInitScript(() => {
      window.__THE_LAST_S01_READINESS_FIXTURE__ = "hold";
    });
    await s01Page.goto("/");
    await expect(s01Page.getByRole("main", { name: "S01 — Prelude" })).toBeVisible();
    await s01Page.screenshot({ path: path.join(CP01C2B_SCREENSHOT_DIR, "s01_reduced-motion_resting_390x844.png"), fullPage: true });
    await s01Page.close();

    await page.goto("/");
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole("button", { name: "Open", exact: true })).toBeVisible();
    await page.waitForTimeout(850);

    const motifState = await page.locator(".s02-object-mark").evaluate((motif) => {
      const svg = motif.querySelector("svg");
      const outer = svg?.querySelector<SVGPathElement>("#a02-outer");
      const inner = svg?.querySelector<SVGPathElement>("#a02-inner");
      const motifRect = motif.getBoundingClientRect();
      const svgRect = svg?.getBoundingClientRect();
      const style = getComputedStyle(motif);
      const visibleIntersection = svgRect
        ? Math.max(0, Math.min(svgRect.right, motifRect.right) - Math.max(svgRect.left, motifRect.left)) *
          Math.max(0, Math.min(svgRect.bottom, motifRect.bottom) - Math.max(svgRect.top, motifRect.top))
        : 0;
      return {
        transform: style.transform,
        opacity: style.opacity,
        overflow: style.overflow,
        rigClipPath: getComputedStyle(motif.closest(".s02-paper-rig")!).clipPath,
        svgWidth: svgRect?.width ?? 0,
        svgHeight: svgRect?.height ?? 0,
        visibleIntersection,
        outerBox: outer && (() => { const box = outer.getBBox(); return { width: box.width, height: box.height }; })(),
        innerBox: inner && (() => { const box = inner.getBBox(); return { width: box.width, height: box.height }; })(),
        outerDasharray: outer?.getAttribute("style") ?? "",
        innerDasharray: inner?.getAttribute("style") ?? "",
      };
    });
    expect(motifState.opacity).toBe("1");
    expect(motifState.rigClipPath).toBe("inset(0% round 18px)");
    expect(motifState.svgWidth).toBeGreaterThan(0);
    expect(motifState.svgHeight).toBeGreaterThan(0);
    expect(motifState.visibleIntersection).toBeGreaterThan(0);
    expect(motifState.outerBox).toBeTruthy();
    expect(motifState.innerBox).toBeTruthy();
    expect(motifState.outerBox?.width).toBeGreaterThan(100);
    expect(motifState.innerBox?.width).toBeGreaterThan(80);
    expect(motifState.outerDasharray).toContain("stroke-dasharray: none");
    expect(motifState.innerDasharray).toContain("stroke-dasharray: none");
    await page.screenshot({ path: path.join(CP01C2B_SCREENSHOT_DIR, "s02_reduced-motion_resting_390x844.png"), fullPage: true });

    await page.getByRole("button", { name: "Open", exact: true }).click();
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: path.join(CP01C2B_SCREENSHOT_DIR, "s02_reduced-motion_open-interaction_390x844.png"), fullPage: true });
    await page.screenshot({ path: path.join(CP01C2B_SCREENSHOT_DIR, "s03_reduced-motion_boundary_390x844.png"), fullPage: true });

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(850);
    await page.screenshot({ path: path.join(CP01C2B_SCREENSHOT_DIR, "s02_normal-motion_resting_390x844.png"), fullPage: true });
  });
});
