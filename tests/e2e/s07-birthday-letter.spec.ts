import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s07");

async function gotoS07(page: Page) {
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
  await expect(page.getByTestId("s06-scene")).toHaveAttribute("data-wish-phase", "ready", { timeout: 5000 });
  await page.getByTestId("s06-wish-control").click();
  await expect(page.getByTestId("s06-continue")).toBeEnabled();
  await page.getByTestId("s06-continue").click();
  await expect(page.getByTestId("s07-scene")).toBeVisible({ timeout: 6000 });
}

test.beforeAll(() => fs.mkdirSync(SCREENSHOT_DIR, { recursive: true }));

test.describe("S07 Personal Birthday Letter", () => {
  test("renders the initial folded keepsake state on mobile and captures evidence", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS07(page);

    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "folded");
    await expect(page.getByTestId("s07-folded-view")).toBeVisible();
    await expect(page.getByTestId("s07-open-letter")).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "s07-mobile-initial-390x844.png"),
      fullPage: true,
    });
  });

  test("opens letter, displays editorial reading surface, and captures opened mobile state", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS07(page);

    // Open the letter
    const openButton = page.getByTestId("s07-open-letter");
    await openButton.click();

    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "opened", { timeout: 5000 });
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-opened-settled", "true", { timeout: 5000 });
    await expect(page.getByTestId("s07-reading-surface")).toBeVisible();
    await expect(page.locator(".s07-salutation")).toContainText("Untuk Malica");
    await expect(page.locator(".s07-lead-paragraph")).toBeVisible();
    await expect(page.locator(".s07-letter-closing")).toBeVisible();
    await expect(page.getByTestId("s07-continue")).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "s07-mobile-opened-390x844.png"),
      fullPage: true,
    });
  });

  test("renders initial and opened letter states on desktop 1440px", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS07(page);

    // Initial desktop state
    await expect(page.getByTestId("s07-folded-view")).toBeVisible();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "s07-desktop-initial-1440x900.png"),
      fullPage: true,
    });

    // Open desktop letter
    await page.getByTestId("s07-open-letter").click();
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "opened", { timeout: 5000 });
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-opened-settled", "true", { timeout: 5000 });
    await expect(page.getByTestId("s07-reading-surface")).toBeVisible();
    await expect(page.locator(".s07-lead-paragraph")).toBeVisible();
    await expect(page.getByTestId("s07-continue")).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "s07-desktop-opened-1440x900.png"),
      fullPage: true,
    });
  });

  test("supports local scrolling for long copy and captures scrolled reading state", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS07(page);

    await page.getByTestId("s07-open-letter").click();
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "opened", { timeout: 5000 });
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-opened-settled", "true", { timeout: 5000 });

    const scrollArea = page.getByTestId("s07-reading-surface");
    await expect(scrollArea).toBeVisible();

    // Scroll partially down inside the reading surface
    await scrollArea.evaluate((el) => {
      el.scrollTop = 160;
    });

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "s07-mobile-long-content-390x844.png"),
      fullPage: true,
    });

    // Continue button must remain reachable and operable
    const continueBtn = page.getByTestId("s07-continue");
    await expect(continueBtn).toBeVisible();
    await expect(continueBtn).toBeEnabled();
  });

  test("advances to the implemented S08 final birthday moment when continue is clicked", async ({ page }) => {
    test.setTimeout(45_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS07(page);

    await page.getByTestId("s07-open-letter").click();
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "opened", { timeout: 5000 });
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-opened-settled", "true", { timeout: 5000 });

    const continueBtn = page.getByTestId("s07-continue");
    await continueBtn.click();

    await expect(page.getByTestId("s08-scene")).toBeVisible({ timeout: 6000 });
  });

  test("settles immediately under reduced motion and supports keyboard operability", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS07(page);

    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-reduced-motion", "true");
    await expect(page.getByTestId("s07-scene")).toHaveAttribute("data-visual-phase", "opened");
    await expect(page.getByTestId("s07-reading-surface")).toBeVisible();
    await expect(page.getByTestId("s07-continue")).toBeVisible();

    // Keyboard navigation: focus continue and press Enter
    await page.getByTestId("s07-continue").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("s08-scene")).toBeVisible();
  });
});
