import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s12");

const NEUTRAL_SENTENCE = "Ruang ini memberi waktu untuk membaca perlahan, menyimpan jeda, dan memilih kapan ingin berhenti.";

function neutralFixture(paragraphCount: number) {
  return {
    opening: "Sebuah pembuka netral untuk uji kepadatan bacaan.",
    paragraphs: Array.from({ length: paragraphCount }, () => Array.from({ length: 5 }, () => NEUTRAL_SENTENCE).join(" ")),
    closing: "Terima kasih sudah memberi ruang untuk membaca sampai selesai.",
    signature: "Dengan hangat",
  };
}

async function installFixture(page: Page, paragraphCount: number) {
  await page.addInitScript((fixture) => {
    window.__THELAST_S12_DEV_FIXTURE__ = fixture;
  }, neutralFixture(paragraphCount));
}

async function gotoS12(page: Page) {
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
  await page.getByTestId("s08-complete").click();
  await page.getByTestId("s08-discover").click();
  await page.getByTestId("s08-portal").focus();
  await page.keyboard.press("Enter");
  await page.getByTestId("s09-continue").click();
  await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-vault-status", /ready|pinRejected/, { timeout: 20_000 });
  await page.getByTestId("s10-pin-input").fill("011007");
  await page.getByRole("button", { name: "Buka", exact: true }).click();
  await expect(page.getByTestId("s10-letter-action")).toBeVisible({ timeout: 10_000 });
  await page.getByTestId("s10-letter-action").click();
  await page.getByTestId("s11-open-letter").click();
  await expect(page.getByTestId("s11-continue")).toBeVisible({ timeout: 4_000 });
  await page.getByTestId("s11-continue").click();
  await expect(page.getByTestId("s12-scene")).toBeVisible({ timeout: 8_000 });
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S12 final optional scene", () => {
  test("keeps content owner-gated and completes calmly on mobile", async ({ page }) => {
    test.setTimeout(140_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS12(page);
    await expect(page.getByTestId("s12-scene")).toHaveAttribute("data-content-status", "CONTENT_PENDING");
    await expect(page.getByTestId("s12-scene")).toHaveAttribute("data-authorized-entry", "true");
    await expect(page.getByTestId("s12-paper")).toBeVisible();
    await expect(page.locator(".s12-reading")).toBeFocused();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-mobile-initial-390x844.png"), fullPage: true });
    await page.getByTestId("s12-end").click();
    await expect(page.getByTestId("s12-ended")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-mobile-final-390x844.png"), fullPage: true });
  });

  test("keeps the pending reading surface usable at 320px", async ({ page }) => {
    test.setTimeout(140_000);
    await page.setViewportSize({ width: 320, height: 700 });
    await gotoS12(page);
    await expect(page.getByTestId("s12-end")).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test("renders medium neutral reading content with a local reading region", async ({ page }) => {
    test.setTimeout(140_000);
    await installFixture(page, 4);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS12(page);
    await expect(page.getByTestId("s12-reading-body")).toBeVisible();
    await expect(page.getByTestId("s12-reading-body")).toHaveCSS("overflow-y", "auto");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-mobile-reading-390x844.png"), fullPage: true });
  });

  test("keeps long neutral content readable without horizontal overflow", async ({ page }) => {
    test.setTimeout(140_000);
    await installFixture(page, 8);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS12(page);
    await expect(page.getByTestId("s12-reading-body")).toBeVisible();
    await expect.poll(() => page.getByTestId("s12-reading-body").evaluate((node) => node.scrollHeight > node.clientHeight)).toBe(true);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-mobile-long-content-390x844.png"), fullPage: true });
    const body = page.getByTestId("s12-reading-body");
    await body.focus();
    await page.keyboard.press("PageDown");
    await page.mouse.wheel(0, 420);
    await body.evaluate((node) => { node.scrollTop = node.scrollHeight; });
    await expect.poll(() => body.getAttribute("data-scrollable")).toBe("false");
    await expect.poll(() => body.getAttribute("data-scrolled")).toBe("true");
    const finalLine = await body.locator("p").last().evaluate((node) => {
      const bodyRect = node.parentElement!.getBoundingClientRect();
      const lineRect = node.getBoundingClientRect();
      return { lineBottom: lineRect.bottom, bodyBottom: bodyRect.bottom };
    });
    expect(finalLine.lineBottom).toBeLessThanOrEqual(finalLine.bodyBottom + 1);
    await expect(page.locator(".s12-reading-closing")).toBeVisible();
    await expect(page.getByTestId("s12-end")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-mobile-long-content-final-390x844.png"), fullPage: true });
  });

  test("renders the restrained desktop composition and never creates S13", async ({ page }) => {
    test.setTimeout(140_000);
    await installFixture(page, 8);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS12(page);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-desktop-reading-1440x900.png"), fullPage: true });
    const body = page.getByTestId("s12-reading-body");
    await body.evaluate((node) => { node.scrollTop = node.scrollHeight; });
    await expect.poll(() => body.getAttribute("data-scrollable")).toBe("false");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-desktop-long-content-final-1440x900.png"), fullPage: true });
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByTestId("s12-end")).toBeVisible();
    await expect(body.locator("p").last()).toBeVisible();
    await page.getByTestId("s12-end").click();
    await expect(page.getByTestId("s12-scene")).toHaveAttribute("data-final-phase", "ended");
    await expect(page.getByTestId("runtime-boundary")).toHaveCount(0);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-desktop-ending-1440x900.png"), fullPage: true });
  });

  test("keeps controls usable at 200 percent text zoom", async ({ page }) => {
    test.setTimeout(140_000);
    await installFixture(page, 4);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS12(page);
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await expect(page.getByTestId("s12-end")).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test("supports reduced motion, keyboard closure, and canonical replay", async ({ page }) => {
    test.setTimeout(140_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoS12(page);
    await expect(page.getByTestId("s12-scene")).toHaveAttribute("data-reduced-motion", "true");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s12-reduced-motion.png"), fullPage: true });
    await page.getByTestId("s12-end").focus();
    await page.keyboard.press("Enter");
    await page.getByTestId("s12-replay").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 15_000 });
  });
});
