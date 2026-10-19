import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s08");
const S09_SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s09");

async function gotoS08(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByTestId("s03-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s05-scene")).toBeVisible();
  await page.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
  await expect(page.getByTestId("s06-scene")).toBeVisible({ timeout: 6000 });
  await page.getByTestId("s06-wish-control").click();
  await expect(page.getByTestId("s06-continue")).toBeEnabled();
  await page.getByTestId("s06-continue").click();
  await expect(page.getByTestId("s07-scene")).toBeVisible({ timeout: 6000 });
  await page.getByTestId("s07-open-letter").click();
  await expect(page.getByTestId("s07-continue")).toBeVisible({ timeout: 6000 });
  await page.getByTestId("s07-continue").click();
  await expect(page.getByTestId("s08-scene")).toBeVisible({ timeout: 6000 });
}

test.beforeAll(() => { fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }); fs.mkdirSync(S09_SCREENSHOT_DIR, { recursive: true }); });

test.describe("S08 Final Birthday Moment", () => {
  test("renders a complete, pending-content closure on mobile and completes by keyboard", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS08(page);
    await expect(page.getByTestId("s08-content-status")).toHaveAttribute("data-content-status", "CONTENT_PENDING");
    await expect(page.getByTestId("s08-scene")).toHaveAttribute("data-complete", "false");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-mobile-initial-390x844.png"), fullPage: true });
    await page.getByTestId("s08-complete").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s08-scene")).toHaveAttribute("data-complete", "true");
    await expect(page.getByTestId("s08-ending-controls")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-mobile-complete-390x844.png"), fullPage: true });
  });

  test("has a balanced desktop closure and an idempotent completion action", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS08(page);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-desktop-initial-1440x900.png"), fullPage: true });
    await page.getByTestId("s08-complete").dblclick();
    await expect(page.getByTestId("s08-ending-controls")).toBeVisible();
    await expect(page.getByTestId("s08-complete")).toHaveCount(0);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s08-desktop-complete-1440x900.png"), fullPage: true });
  });

  test("settles under reduced motion and never exposes an unimplemented hidden route", async ({ page }) => {
    test.setTimeout(45_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS08(page);
    await expect(page.getByTestId("s08-scene")).toHaveAttribute("data-reduced-motion", "true");
    await page.getByTestId("s08-complete").click();
    await expect(page.getByTestId("runtime-boundary")).toHaveCount(0);
    await expect(page.getByTestId("s08-ending-controls")).toBeVisible();
    await page.getByTestId("s08-replay").click();
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 6000 });
  });

  test("keeps S08 complete until an explicit arm and intentional hidden commit", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS08(page);
    await page.getByTestId("s08-complete").click();
    await expect(page.getByTestId("s08-ending-controls")).toBeVisible();
    await page.screenshot({ path: path.join(S09_SCREENSHOT_DIR, "s09-mobile-s08-complete-390x844.png"), fullPage: true });
    await page.mouse.wheel(0, 240);
    await expect(page.getByTestId("s09-scene")).toHaveCount(0);
    await page.getByTestId("s08-discover").click();
    await expect(page.getByTestId("s08-portal")).toBeVisible();
    await page.getByTestId("s08-portal").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s09-scene")).toBeVisible({ timeout: 6000 });
    await page.screenshot({ path: path.join(S09_SCREENSHOT_DIR, "s09-mobile-entered-390x844.png"), fullPage: true });
    await page.getByTestId("s09-continue").click();
    await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 15_000 });
  });

  test("renders the S09 handoff on desktop", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS08(page);
    await page.getByTestId("s08-complete").click();
    await page.getByTestId("s08-discover").click();
    await page.getByTestId("s08-portal").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s09-scene")).toBeVisible({ timeout: 6000 });
    await page.screenshot({ path: path.join(S09_SCREENSHOT_DIR, "s09-desktop-entered-1440x900.png"), fullPage: true });
    await page.getByTestId("s09-continue").click();
    await expect(page.getByTestId("s10-scene")).toBeVisible({ timeout: 15_000 });
    await page.screenshot({ path: path.join(S09_SCREENSHOT_DIR, "s09-desktop-s10-boundary-1440x900.png"), fullPage: true });
  });
});
