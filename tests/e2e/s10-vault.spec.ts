import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s10-production");

async function gotoS10(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
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
  await page.getByTestId("s08-complete").click();
  await page.getByTestId("s08-discover").click();
  await page.getByTestId("s08-portal").focus();
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
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-mobile-locked-390x844.png"), fullPage: true, timeout: 15_000 });
    await page.getByTestId("s10-pin-input").fill("010107");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.locator(".s10-error")).toContainText("belum tepat");
    await page.getByTestId("s10-pin-input").fill("011007");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.getByTestId("s10-letter-action")).toBeVisible({ timeout: 8_000 });
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-vault-status", "doorOpening");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-mobile-opened-390x844.png"), fullPage: true, timeout: 15_000 });
    await page.getByTestId("s10-letter-action").click();
    await expect(page.getByTestId("runtime-boundary")).toContainText("S11");
  });

  test("keeps the PIN controls stable and the complete Vault visible on desktop", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS10(page);
    await expect(page.getByTestId("s10-vault-canvas")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-desktop-locked-1440x900.png"), fullPage: true, timeout: 15_000 });
    await page.getByTestId("s10-pin-input").fill("011007");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.getByTestId("s10-letter-action")).toBeVisible({ timeout: 8_000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-desktop-opened-1440x900.png"), fullPage: true, timeout: 15_000 });
  });

  test("preserves the S10 semantic path under reduced motion", async ({ page }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS10(page);
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-reduced-motion", "true");
    await page.getByTestId("s10-pin-input").fill("011007");
    await page.getByRole("button", { name: "Buka", exact: true }).click();
    await expect(page.getByTestId("s10-letter-action")).toBeVisible({ timeout: 8_000 });
    await expect(page.getByTestId("s10-scene")).toHaveAttribute("data-vault-status", "doorOpening");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s10-mobile-reduced-opened-390x844.png"), fullPage: true, timeout: 15_000 });
  });
});
