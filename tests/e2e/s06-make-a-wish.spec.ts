import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s06");

async function gotoS06(page: Page, customized = false) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByTestId("s03-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s05-scene")).toBeVisible();
  if (customized) {
    await page.getByRole("tab", { name: "Frosting", exact: true }).click();
    await page.getByRole("button", { name: "Periwinkle lembut", exact: true }).click();
    await page.getByRole("tab", { name: "Lilin", exact: true }).click();
    await page.getByRole("button", { name: "Lima lilin", exact: true }).click();
    await page.getByRole("tab", { name: "Topper", exact: true }).click();
    await page.getByRole("button", { name: "Loop topper", exact: true }).click();
  }
  await page.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
  await expect(page.getByTestId("s06-scene")).toBeVisible({ timeout: 6000 });
  await expect(page.getByTestId("s06-scene")).toHaveAttribute("data-wish-phase", "ready", { timeout: 5000 });
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S06 Make a Wish", () => {
  test("preserves the customized S05 cake at the mobile initial wish state", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS06(page, true);
    await expect(page.getByTestId("s06-cake-renderer")).toHaveAttribute("data-frosting", "cfg-B-periwinkle-warm");
    await expect(page.locator("[data-testid^='s06-candle-']")).toHaveCount(5);
    await expect(page.getByTestId("s05-topper")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s06-mobile-initial-390x844.png"), fullPage: true });
  });

  test("supports pointer cancellation, keyboard activation, idempotent completion, and S07 boundary", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS06(page);
    const control = page.getByTestId("s06-wish-control");
    await control.dispatchEvent("pointerdown", { pointerId: 19, pointerType: "touch" });
    await control.dispatchEvent("pointercancel", { pointerId: 19, pointerType: "touch" });
    await expect(page.getByTestId("s06-scene")).toHaveAttribute("data-wish-phase", "ready");
    await control.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s06-scene")).toHaveAttribute("data-wish-phase", "extinguished");
    await control.click({ force: true });
    await expect(page.getByTestId("s06-continue")).toBeEnabled();
    await expect(page.getByTestId("s06-continue")).toHaveCSS("opacity", "1");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s06-mobile-extinguished-390x844.png"), fullPage: true });
    await page.getByTestId("s06-continue").click();
    await expect(page.getByTestId("runtime-boundary")).toContainText("S07");
  });

  test("renders a balanced desktop completion state", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS06(page, true);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s06-desktop-initial-1440x900.png"), fullPage: true });
    await page.getByTestId("s06-wish-control").click();
    await expect(page.getByTestId("s06-continue")).toBeEnabled();
    await expect(page.getByTestId("s06-continue")).toHaveCSS("opacity", "1");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s06-desktop-extinguished-1440x900.png"), fullPage: true });
  });

  test("settles under reduced motion and remains operable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoS06(page);
    await expect(page.getByTestId("s06-scene")).toHaveAttribute("data-reduced-motion", "true");
    await page.getByTestId("s06-wish-control").click();
    await expect(page.getByTestId("s06-continue")).toBeEnabled();
  });
});
