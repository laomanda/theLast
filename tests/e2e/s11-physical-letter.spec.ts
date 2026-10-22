import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s11");

async function gotoS11(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: "Open", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
  await expect(page.getByTestId("s06-scene")).toBeVisible({ timeout: 8_000 });
  await page.getByTestId("s06-wish-control").click();
  await expect(page.getByTestId("s06-continue")).toBeEnabled({ timeout: 8_000 });
  await page.getByTestId("s06-continue").click();
  await expect(page.getByTestId("s07-scene")).toBeVisible({ timeout: 8_000 });
  const birthdayLetter = page.getByTestId("s07-open-letter");
  if (await birthdayLetter.count()) await birthdayLetter.click();
  await expect(page.getByTestId("s07-continue")).toBeEnabled({ timeout: 8_000 });
  await page.getByTestId("s07-continue").click();
  await page.getByTestId("s08-next").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("s09-scene")).toBeVisible({ timeout: 8_000 });
  await page.getByTestId("s09-continue").click();
  await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-vault-status", /ready|pinRejected/, { timeout: 20_000 });
  await page.getByTestId("s10-pin-input").fill("011007");
  await page.getByRole("button", { name: "Buka", exact: true }).click();
  await expect(page.getByTestId("s10-letter-action")).toBeVisible({ timeout: 10_000 });
  await page.getByTestId("s10-letter-action").click();
  await expect(page.getByTestId("s11-scene")).toBeVisible({ timeout: 8_000 });
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S11 physical keepsake letter", () => {
  test("keeps the letter closed until an intentional action, unfolds it, and guards S12", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS11(page);
    await expect(page.getByTestId("s11-scene")).toHaveAttribute("data-letter-phase", "folded");
    await expect(page.getByTestId("runtime-boundary")).toHaveCount(0);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-mobile-initial-390x844.png"), fullPage: true });

    await page.getByTestId("s11-open-letter").click();
    await expect(page.getByTestId("s11-scene")).toHaveAttribute("data-letter-phase", "opening");
    await page.waitForTimeout(330);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-mobile-unfolding-390x844.png"), fullPage: true });
    await expect(page.getByTestId("s11-scene")).toHaveAttribute("data-letter-phase", "opened", { timeout: 3_000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-mobile-opened-390x844.png"), fullPage: true });
    await expect(page.getByTestId("s11-continue")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s12-scene")).toBeVisible();
  });

  test("keeps the compact mobile layout free of horizontal overflow", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 360, height: 800 });
    await gotoS11(page);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-mobile-folded-360x800.png"), fullPage: true });
  });

  test("keeps the short 320px composition readable and actionable", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 320, height: 700 });
    await gotoS11(page);
    await expect(page.getByTestId("s11-open-letter")).toBeVisible();
    await expect(page.getByTestId("s11-open-letter")).toBeEnabled();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-mobile-short-320x700.png"), fullPage: true });
  });

  test("keeps the composition usable with long neutral supporting copy", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS11(page);
    await page.evaluate(() => {
      const supporting = document.querySelector<HTMLElement>(".s11-copy > p:last-child");
      if (!supporting) throw new Error("S11 supporting copy not found");
      supporting.textContent = "Teks pendukung yang lebih panjang untuk menguji keterbacaan, ruang napas, dan akses ke kontrol tanpa mengubah konten produksi atau batas persetujuan surat.";
    });
    await expect(page.getByTestId("s11-scene")).toHaveAttribute("data-letter-phase", "folded");
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-mobile-long-content-390x844.png"), fullPage: true });
  });

  test("uses the desktop composition and supports repeated input safely", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS11(page);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-desktop-initial-1440x900.png"), fullPage: true });
    const open = page.getByTestId("s11-open-letter");
    await open.dblclick();
    await expect(page.getByTestId("s11-scene")).toHaveAttribute("data-letter-phase", "opened", { timeout: 3_000 });
    await expect(page.getByTestId("s11-continue")).toHaveCount(1);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-desktop-opened-1440x900.png"), fullPage: true });
  });

  test("preserves functionality and final geometry with reduced motion", async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoS11(page);
    await page.getByTestId("s11-open-letter").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s11-scene")).toHaveAttribute("data-letter-phase", "opened");
    await expect(page.getByTestId("s11-scene")).toHaveAttribute("data-reduced-motion", "true");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s11-reduced-motion-768x1024.png"), fullPage: true });
  });
});

