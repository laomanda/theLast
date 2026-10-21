import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s07");

async function gotoS07(page: Page) {
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
  await expect(page.getByTestId("s06-continue")).toBeEnabled({ timeout: 6000 });
  await page.getByTestId("s06-continue").click();
  await expect(page.getByTestId("s07-scene")).toBeVisible({ timeout: 8000 });
}

async function openForReading(page: Page) {
  await page.getByTestId("s07-open-letter").press("Enter");
  await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "opened");
  await page.getByRole("button", { name: "Tarik perlahan untuk mengeluarkan surat" }).press("Enter");
  await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", /reading|release-ready/, { timeout: 6000 });
  await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-opened-settled", "true", { timeout: 6000 });
}

async function releaseLetter(page: Page) {
  await page.getByTestId("s07-reading-surface").evaluate((element) => element.scrollIntoView({ block: "end" }));
  await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "release-ready", { timeout: 6000 });
  await page.getByTestId("s07-release-handle").press("Enter");
  await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "settled", { timeout: 6000 });
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S07 The Sealed Letter", () => {
  test("renders the physical sealed envelope on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS07(page);
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "sealed");
    await expect(page.getByTestId("s07-open-letter")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s07-mobile-sealed-390x844.png"), fullPage: true });
  });

  test("supports keyboard cut, pull, unfold, release, and S08 handoff", async ({ page }) => {
    test.setTimeout(55_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS07(page);
    await openForReading(page);
    await expect(page.locator(".s07-salutation")).toContainText("Untuk Malica");
    await expect(page.locator(".s07-letter-closing")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s07-mobile-reading-390x844.png"), fullPage: true });
    await releaseLetter(page);
    await expect(page.getByTestId("s07-continue")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s07-mobile-settled-390x844.png"), fullPage: true });
    await page.getByTestId("s07-continue").click();
    await expect(page.getByTestId("s08-scene")).toBeVisible({ timeout: 6000 });
  });

  test("maps mouse gestures directly to cut, pull, and release progress", async ({ page }) => {
    test.setTimeout(55_000);
    await page.setViewportSize({ width: 430, height: 932 });
    await gotoS07(page);
    const cut = await page.getByTestId("s07-open-letter").boundingBox();
    if (!cut) throw new Error("Cut path was not measurable");
    const cutZone = page.getByTestId("s07-open-letter");
    await cutZone.dispatchEvent("pointerdown", { pointerId: 31, pointerType: "mouse", clientX: cut.x + cut.width * .2, clientY: cut.y + cut.height * .5 });
    await cutZone.dispatchEvent("pointermove", { pointerId: 31, pointerType: "mouse", clientX: cut.x + cut.width * .99, clientY: cut.y + cut.height * .5 });
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "opened", { timeout: 4000 });

    const pull = await page.getByRole("button", { name: "Tarik perlahan untuk mengeluarkan surat" }).boundingBox();
    if (!pull) throw new Error("Pull handle was not measurable");
    const pullHandle = page.getByRole("button", { name: "Tarik perlahan untuk mengeluarkan surat" });
    await pullHandle.dispatchEvent("pointerdown", { pointerId: 32, pointerType: "mouse", clientX: pull.x + pull.width / 2, clientY: 520 });
    await pullHandle.dispatchEvent("pointermove", { pointerId: 32, pointerType: "mouse", clientX: pull.x + pull.width / 2, clientY: 335 });
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-opened-settled", "true", { timeout: 6000 });

    await page.getByTestId("s07-reading-surface").evaluate((element) => element.scrollIntoView({ block: "end" }));
    await expect(page.getByTestId("s07-release-handle")).toBeVisible({ timeout: 6000 });
    await page.evaluate(() => window.scrollBy({ top: 150, behavior: "instant" }));
    const release = await page.getByTestId("s07-release-handle").boundingBox();
    if (!release) throw new Error("Release handle was not measurable");
    const releaseHandle = page.getByTestId("s07-release-handle");
    await releaseHandle.dispatchEvent("pointerdown", { pointerId: 33, pointerType: "mouse", clientX: release.x + release.width / 2, clientY: 410 });
    await releaseHandle.dispatchEvent("pointermove", { pointerId: 33, pointerType: "mouse", clientX: release.x + release.width / 2 + 8, clientY: 570 });
    await releaseHandle.dispatchEvent("pointerup", { pointerId: 33, pointerType: "mouse", clientX: release.x + release.width / 2 + 8, clientY: 570 });
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "settled", { timeout: 6000 });
  });

  test("renders and settles the complete ritual at desktop size", async ({ page }) => {
    test.setTimeout(55_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS07(page);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s07-desktop-sealed-1440x900.png"), fullPage: true });
    await openForReading(page);
    await releaseLetter(page);
    await expect(page.getByTestId("s07-continue")).toBeEnabled();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s07-desktop-settled-1440x900.png"), fullPage: true });
  });

  test("preserves all interaction states under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS07(page);
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-reduced-motion", "true");
    await openForReading(page);
    await releaseLetter(page);
    await expect(page.getByTestId("s07-continue")).toBeVisible();
  });
});
