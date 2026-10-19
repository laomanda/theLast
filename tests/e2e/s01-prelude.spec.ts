import { test, expect, type Page } from "@playwright/test";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "narrow-mobile", width: 320, height: 568 },
  { name: "standard-mobile", width: 390, height: 844 },
  { name: "tall-mobile", width: 430, height: 932 },
  { name: "desktop", width: 1440, height: 900 },
];
const SCREENSHOT_DIR = path.resolve(process.cwd(), "planning/evidence/screenshots");

async function setReadinessFixture(page: Page, mode: "hold" | "fail" | "slow" | "degraded") {
  await page.addInitScript((fixture) => {
    window.__THE_LAST_S01_READINESS_FIXTURE__ = fixture;
  }, mode);
}

test.beforeAll(() => {
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
});

test.beforeEach(async ({ page }) => {
  page.on("console", (msg) => console.log("[BROWSER CONSOLE]", msg.type(), msg.text()));
  page.on("pageerror", (err) => console.log("[BROWSER ERROR]", err.message));
});

test.describe("S01 Prelude Visuals and Viewports", () => {
  for (const vp of VIEWPORTS) {
    test(`renders S01 Prelude correctly at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await setReadinessFixture(page, "hold");
      await page.goto("/");
      await expect(page.locator("main[role='main'] p", { hasText: "Ada sesuatu yang menunggu." })).toBeVisible({ timeout: 5000 });
      await expect(page.locator("#a02-root")).toBeVisible();
      expect(await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor)).toBe("rgb(246, 241, 232)");

      await page.waitForTimeout(1600);
      const screenshotPath = path.join(SCREENSHOT_DIR, `s01_${vp.name}_${vp.width}x${vp.height}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      expect(fs.existsSync(screenshotPath)).toBe(true);
    });
  }
});

test.describe("S01 Runtime Readiness and Handoff", () => {
  test("does not expose readiness fixtures through public URL query parameters", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?readiness=fail");
    await expect(page.getByRole("alert")).toHaveCount(0);
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  });

  test("transitions from S01 to the production S02 invitation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
    const handoffPath = path.join(SCREENSHOT_DIR, "s02_closed_390x844.png");
    await page.screenshot({ path: handoffPath, fullPage: true });
    expect(fs.existsSync(handoffPath)).toBe(true);
  });
});

test.describe("S01 Failure and Recovery", () => {
  test("retries a recoverable readiness failure and reaches the runtime handoff", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await setReadinessFixture(page, "fail");
    await page.goto("/");
    await expect(page.getByRole("alert").getByText("Ada kendala saat menyiapkan pengalaman.")).toBeVisible({ timeout: 5000 });
    const retryButton = page.getByRole("button", { name: "Coba lagi" });
    await expect(retryButton).toBeVisible();
    const failurePath = path.join(SCREENSHOT_DIR, "s01_failure_recovery_390x844.png");
    await page.screenshot({ path: failurePath, fullPage: true });
    expect(fs.existsSync(failurePath)).toBe(true);

    await retryButton.click();
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
    const recoveryPath = path.join(SCREENSHOT_DIR, "s01_retry_recovered_390x844.png");
    await page.screenshot({ path: recoveryPath, fullPage: true });
    expect(fs.existsSync(recoveryPath)).toBe(true);
  });
});

test.describe("S01 Static Fallback and Text Enlargement", () => {
  test("uses the actual static REV5 SVG fallback for the controlled degraded fixture", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await setReadinessFixture(page, "degraded");
    const fallbackResponse = page.waitForResponse((response) =>
      response.url().endsWith("/assets/svg/signature/offset-loop-open.svg") && response.status() === 200,
    );
    await page.goto("/");
    await fallbackResponse;
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  });

  test("keeps S01 readable without horizontal overflow at text enlargement", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await setReadinessFixture(page, "hold");
    await page.goto("/");
    await expect(page.locator("main[role='main'] p", { hasText: "Ada sesuatu yang menunggu." })).toBeVisible();
    await page.evaluate(() => { document.documentElement.style.fontSize = "150%"; });
    const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
  });
});

test.describe("S01 Reduced Motion", () => {
  test("renders static motif and microcopy immediately under prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await setReadinessFixture(page, "hold");
    await page.goto("/");
    await expect(page.locator("main[role='main'] p", { hasText: "Ada sesuatu yang menunggu." })).toBeVisible({ timeout: 3000 });
    const reducedPath = path.join(SCREENSHOT_DIR, "s01_reduced_motion_390x844.png");
    await page.screenshot({ path: reducedPath, fullPage: true });
    expect(fs.existsSync(reducedPath)).toBe(true);
  });
});
