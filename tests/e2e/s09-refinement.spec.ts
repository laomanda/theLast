import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s09-refinement");

async function gotoS09(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByTestId("s03-scene")).toBeVisible();
  for (const name of ["Buka bintang kertas", "Buka bunga kertas", "Buka hati kertas", "Putar token ulang tahun", "Buka party popper", "Tarik pita kertas"]) await page.getByRole("button", { name, exact: true }).click();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toHaveAttribute("data-visual-phase", "stable", { timeout: 6000 });
  await page.getByRole("button", { name: "Sentuh kupu-kupu untuk melihatnya terbang" }).press("Enter");
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s05-scene")).toBeVisible();
  await page.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
  await expect(page.getByTestId("s06-scene")).toHaveAttribute("data-wish-phase", "ready", { timeout: 6000 });
  await page.getByTestId("s06-wish-control").press("Enter");
  await page.getByTestId("s06-continue").click();
  await expect(page.getByTestId("s07-scene")).toBeVisible({ timeout: 8000 });
  await page.getByTestId("s07-open-letter").press("Enter");
  await page.getByRole("button", { name: "Tarik perlahan untuk mengeluarkan surat" }).press("Enter");
  await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-opened-settled", "true", { timeout: 6000 });
  await page.getByTestId("s07-reading-surface").evaluate((element) => element.scrollIntoView({ block: "end" }));
  await page.getByTestId("s07-release-handle").press("Enter");
  await expect(page.getByTestId("s07-continue")).toBeVisible({ timeout: 6000 });
  await page.getByTestId("s07-continue").click();
  await expect(page.getByTestId("s08-scene")).toBeVisible({ timeout: 8000 });
  await page.getByTestId("s08-next").click();
  await expect(page.getByTestId("s09-scene")).toBeVisible({ timeout: 8000 });
  await expect(page.getByTestId("s08-s09-curtain")).toHaveCount(0, { timeout: 5000 });
  await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-settled", "true", { timeout: 3000 });
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S09 beneath the surface", () => {
  test("moves from the mobile editorial shore through twilight to the deep reveal", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS09(page);
    await expect(page.getByRole("heading", { name: "Di balik permukaan." })).toBeVisible();
    await expect(page.getByTestId("s09-dive")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-mobile-shallow-390x844.png") });

    await page.getByTestId("s09-dive").click();
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-phase", "descending");
    await page.waitForTimeout(2200);
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-phase", "descending");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-mobile-twilight-390x844.png") });
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-phase", "deep", { timeout: 6000 });
    await expect(page.getByTestId("s09-continue")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-mobile-deep-390x844.png") });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByTestId("s09-continue").click();
    await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 8000 });
  });

  test("renders the desktop split composition and supports keyboard activation", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS09(page);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-desktop-shallow-1440x900.png") });
    await page.getByTestId("s09-dive").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-phase", "deep", { timeout: 8000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-desktop-deep-1440x900.png") });
    await page.getByTestId("s09-continue").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 8000 });
  });

  test("offers an immediate non-animated route through the depth in reduced motion", async ({ page }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoS09(page);
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-reduced-motion", "true");
    await page.getByTestId("s09-dive").click();
    await expect(page.getByTestId("s09-scene")).toHaveAttribute("data-phase", "deep");
    await page.getByTestId("s09-continue").dblclick();
    await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 8000 });
  });

  test("responds to cursor movement with subtle displacement and settles when stationary", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS09(page);

    const star = page.locator(".s09-art-star-shore");
    await expect(star).toBeVisible();

    await page.mouse.move(1200, 200);
    await page.waitForTimeout(800);

    const transformMoved = await star.evaluate((el) => window.getComputedStyle(el).transform);
    expect(transformMoved).not.toBe("none");

    // When mouse is stationary, artwork settles and remains still
    await page.waitForTimeout(1600);
    const settled1 = await star.evaluate((el) => window.getComputedStyle(el).transform);
    await page.waitForTimeout(500);
    const settled2 = await star.evaluate((el) => window.getComputedStyle(el).transform);
    expect(settled1).toBe(settled2);
  });
});
