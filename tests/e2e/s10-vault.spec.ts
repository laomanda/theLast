import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s10-refinement");

async function gotoS10(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: "Open", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("s03-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s05-scene")).toBeVisible();
  await page.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
  await expect(page.getByTestId("s06-scene")).toBeVisible({ timeout: 8_000 });
  await page.getByTestId("s06-wish-control").click();
  await expect(page.getByTestId("s06-continue")).toBeEnabled({ timeout: 8_000 });
  await page.getByTestId("s06-continue").click();
  await expect(page.getByTestId("s07-scene")).toBeVisible({ timeout: 8_000 });
  const openLetter = page.getByTestId("s07-open-letter");
  if (await openLetter.isVisible().catch(() => false)) await openLetter.click();
  await expect(page.getByTestId("s07-continue")).toBeEnabled({ timeout: 8_000 });
  await page.getByTestId("s07-continue").click();
  await expect(page.getByTestId("s08-scene")).toBeVisible({ timeout: 8_000 });
  await page.getByTestId("s08-next").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("s09-scene")).toBeVisible({ timeout: 8_000 });
  await page.getByTestId("s09-continue").click();
  await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 8_000 });
  await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-vault-status", /ready|pinRejected/, { timeout: 20_000 });
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S10 Quiet Keepsake Vault", () => {
  test("loads the authorized Vault, rejects a wrong PIN, and opens the physical door once", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS10(page);
    await expect(page.getByTestId("s10-pin-input")).toBeVisible();
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-renderer-mode", "webgl");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-mobile-closed-390x844.png"), timeout: 15_000 });
    await page.getByTestId("s10-pin-input").fill("011");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-mobile-pin-390x844.png"), timeout: 15_000 });
    await page.getByTestId("s10-pin-input").fill("010107");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.locator(".s10-error")).toContainText("belum tepat");
    await page.getByTestId("s10-pin-input").fill("011007");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.getByTestId("s10-letter-action")).toBeVisible({ timeout: 8_000 });
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-vault-status", "doorOpening");
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-door-state", "open");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-mobile-opened-390x844.png"), fullPage: true, timeout: 15_000 });
    await page.getByTestId("s10-letter-action").click();
    await expect(page.getByTestId("s11-scene")).toBeVisible();
  });

  test("keeps the PIN controls stable and the complete Vault visible on desktop", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS10(page);
    await expect(page.getByTestId("s10-vault-canvas")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-desktop-closed-1440x900.png"), timeout: 15_000 });
    await page.getByTestId("s10-pin-input").fill("011007");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.getByTestId("s10-letter-action")).toBeVisible({ timeout: 8_000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-desktop-opened-1440x900.png"), timeout: 15_000 });
  });

  test("preserves the S10 semantic path under reduced motion", async ({ page }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoS10(page);
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-reduced-motion", "true");
    await page.getByTestId("s10-pin-input").fill("011007");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.getByTestId("s10-letter-action")).toBeVisible({ timeout: 8_000 });
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-vault-status", "doorOpening");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-tablet-reduced-opened-768x1024.png"), fullPage: true, timeout: 15_000 });
  });

  test("keeps controls reachable without horizontal overflow at 360 by 800", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 360, height: 800 });
    await gotoS10(page);
    await expect(page.getByTestId("s10-pin-input")).toBeVisible();
    const dimensions = await page.evaluate(() => {
      const scene = document.querySelector<HTMLElement>("[data-testid='s10-scene']");
      return {
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
        sceneHeight: scene?.getBoundingClientRect().height ?? 0,
        sceneContentHeight: scene?.scrollHeight ?? 0,
      };
    });
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.sceneHeight).toBeGreaterThanOrEqual(dimensions.sceneContentHeight);
    const keypadButtons = page.locator(".s10-keypad button");
    await expect(keypadButtons).toHaveCount(12);
    for (let index = 0; index < 12; index += 1) {
      const box = await keypadButtons.nth(index).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y + box!.height).toBeLessThanOrEqual(800);
    }
  });

  test("keeps the complete PIN keypad inside the 320 by 700 viewport", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 320, height: 700 });
    await gotoS10(page);
    await expect(page.getByTestId("s10-pin-input")).toBeVisible();
    const keypadButtons = page.locator(".s10-keypad button");
    await expect(keypadButtons).toHaveCount(12);
    for (let index = 0; index < 12; index += 1) {
      const button = keypadButtons.nth(index);
      await expect(button).toBeVisible();
      const box = await button.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y + box!.height).toBeLessThanOrEqual(700);
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-mobile-pin-320x700.png"), timeout: 15_000 });
  });

  test("offers an honest, complete non-WebGL fallback", async ({ page }) => {
    test.setTimeout(90_000);
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
        if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
        return original.call(this, type, ...args as []);
      } as typeof HTMLCanvasElement.prototype.getContext;
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS10(page);
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-renderer-mode", "fallback");
    await expect(page.getByTestId("s10-vault-fallback")).toHaveAccessibleName("Representasi sederhana Vault dalam keadaan tertutup");
    await page.getByTestId("s10-pin-input").fill("011007");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.getByTestId("s10-letter-action")).toBeVisible();
    await expect(page.getByTestId("s10-vault-fallback")).toHaveAccessibleName("Representasi sederhana Vault dalam keadaan terbuka");
    await page.waitForTimeout(750);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-fallback-opened-390x844.png"), fullPage: true, timeout: 15_000 });
  });
});
