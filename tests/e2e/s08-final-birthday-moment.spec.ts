import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s08");

async function gotoS08(page: Page) {
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
  await expect(page.getByTestId("s07-release-handle")).toBeVisible({ timeout: 6000 });
  await page.getByTestId("s07-release-handle").press("Enter");
  await expect(page.getByTestId("s07-continue")).toBeVisible({ timeout: 6000 });
  await page.getByTestId("s07-continue").click();
  await expect(page.getByTestId("s08-scene")).toBeVisible({ timeout: 8000 });
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S08 The Unfinished Ending", () => {
  test("breaks once on mobile, stays on S08, and continues to S09", async ({ page }) => {
    test.setTimeout(70_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS08(page);
    await expect(page.getByTestId("s08-ending-controls").getByRole("button")).toHaveCount(3);
    await page.getByTestId("s08-break").press("Enter");
    await expect(page.getByText("Eh, belum selesai.")).toBeVisible();
    await expect(page.getByTestId("s08-break")).toHaveAttribute("aria-disabled", "true");
    await expect(page.getByTestId("s08-scene")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-mobile-broken.png") });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByTestId("s08-next").click();
    const curtain = page.getByTestId("s08-s09-curtain");
    await expect(curtain).toBeVisible();
    await expect(curtain).toHaveAttribute("data-phase", "closing");
    await expect(curtain).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(page.getByTestId("s08-scene")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-curtain-first-frame.png") });
    await page.waitForTimeout(100);
    await expect(page.getByTestId("s08-scene")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-curtain-100ms.png") });
    await page.waitForTimeout(200);
    await expect(page.getByTestId("s08-scene")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-curtain-300ms.png") });
    await page.waitForTimeout(300);
    await expect(page.getByTestId("s08-scene")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-curtain-600ms.png") });
    await expect(curtain).toHaveAttribute("data-phase", "covered", { timeout: 2000 });
    await expect(page.getByTestId("s08-scene")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-curtain-mobile.png") });
    await expect(page.getByTestId("s09-scene")).toBeVisible({ timeout: 8000 });
    await expect(curtain).toHaveAttribute("data-phase", "opening");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-curtain-opening.png") });
    await page.waitForTimeout(300);
    await expect(page.getByTestId("s09-scene")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-curtain-mid-opening.png") });
    await expect(curtain).toHaveCount(0, { timeout: 4000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s09-curtain-revealed.png") });
  });

  test("renders the desktop ending and supports replay", async ({ page }) => {
    test.setTimeout(70_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS08(page);
    await expect(page.getByRole("heading", { name: /Setiap akhir/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Setiap akhir/ })).toHaveCSS("opacity", "1");
    await expect(page.getByTestId("s08-next")).toHaveCSS("opacity", "1");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-desktop-unfinished.png") });
    await page.getByTestId("s08-replay").click();
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 10000 });
  });

  test("supports reduced motion and keyboard continuation", async ({ page }) => {
    test.setTimeout(70_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 320, height: 568 });
    await gotoS08(page);
    await page.getByTestId("s08-break").press("Space");
    await expect(page.getByText("Eh, belum selesai.")).toBeVisible();
    await expect(page.getByTestId("s08-break")).toBeFocused();
    await page.getByTestId("s08-break").press("Enter");
    await expect(page.getByTestId("s08-scene")).toHaveAttribute("data-broken", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByTestId("s08-next").press("Enter");
    await expect(page.getByTestId("s09-scene")).toBeVisible({ timeout: 8000 });
    await expect(page.getByTestId("s08-s09-curtain")).toHaveCount(0, { timeout: 3000 });
  });

});
