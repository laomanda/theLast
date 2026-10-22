import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s09-refinement");

async function gotoS09(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByTestId("s03-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
  await page.getByTestId("s06-wish-control").click();
  await expect(page.getByTestId("s06-continue")).toBeEnabled({ timeout: 8_000 });
  await page.getByTestId("s06-continue").click();
  await expect(page.getByTestId("s07-scene")).toBeVisible({ timeout: 8_000 });
  const openLetter = page.getByTestId("s07-open-letter");
  if (await openLetter.isVisible().catch(() => false)) await openLetter.click();
  await expect(page.getByTestId("s07-continue")).toBeEnabled({ timeout: 8_000 });
  await page.getByTestId("s07-continue").click();
  await page.getByTestId("s08-next").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("s09-scene")).toBeVisible({ timeout: 8_000 });
  await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-settled", "true", { timeout: 3_000 });
}

async function dragGesture(page: Page, distance: number, release = true) {
  const box = await page.getByTestId("s09-gesture").boundingBox();
  if (!box) throw new Error("S09 gesture surface has no layout box.");
  const x = box.x + box.width / 2;
  const y = box.y + box.height * 0.7;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x, y - distance, { steps: 8 });
  if (release) await page.mouse.up();
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S09 hidden discovery refinement", () => {
  test("shows responsive progress and safely restores a below-threshold mobile drag", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS09(page);
    await expect(page.locator(".s09-loop-art")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-mobile-initial-390x844.png"), fullPage: true });
    await dragGesture(page, 52);
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-progress", "0.00", { timeout: 2_000 });
    await expect(page.getByTestId("s10-scene")).toHaveCount(0);
    await page.setViewportSize({ width: 360, height: 800 });
    await expect(page.getByTestId("s09-gesture")).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test("commits one mobile gesture above threshold and hands off to S10", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS09(page);
    await dragGesture(page, 118, false);
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-progress", /0\.(7|8)/);
    await page.mouse.up();
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-progress", "1.00");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-mobile-committed-390x844.png"), fullPage: true });
    await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 8_000 });
  });

  test("uses intentional desktop asymmetry and keyboard-accessible commit", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS09(page);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-desktop-initial-1440x900.png"), fullPage: true });
    await page.getByTestId("s09-gesture").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-progress", "1.00");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-desktop-transition-1440x900.png"), fullPage: true });
    await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 8_000 });
  });

  test("keeps reduced motion complete and coalesces repeated activation", async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoS09(page);
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-reduced-motion", "true");
    await page.getByTestId("s09-continue").dblclick();
    await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 8_000 });
  });
});
