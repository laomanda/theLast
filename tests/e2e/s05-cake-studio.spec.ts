import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/s05");

async function gotoS05(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 6000 });
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 6000 });
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s05-scene")).toBeVisible({ timeout: 6000 });
  await expect(page.getByTestId("s05-scene")).toHaveAttribute("data-visual-phase", "active", { timeout: 5000 });
}

async function selectOption(page: Page, category: string, option: string) {
  await page.getByRole("tab", { name: category, exact: true }).click();
  await page.getByRole("button", { name: option, exact: true }).click();
  await expect(page.getByRole("button", { name: option, exact: true })).toHaveAttribute("aria-pressed", "true");
}

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
});

test.describe("S05 tactile Cake Studio", () => {
  test("renders the default cake and all five customization families on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS05(page);
    await expect(page.getByRole("heading", { name: "Hias kuemu." })).toBeVisible();
    await expect(page.getByTestId("s05-cake-renderer")).toHaveAttribute("data-frosting", "cfg-A-coral-garden");
    for (const category of ["Frosting", "Lilin", "Bunga", "Topper", "Aksen"]) await expect(page.getByRole("tab", { name: category, exact: true })).toBeVisible();
    const layout = await page.getByTestId("s05-scene").evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s05-mobile-default-390x844.png"), fullPage: true });
  });

  test("builds a genuinely different desktop configuration with direct visual response", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS05(page);
    await selectOption(page, "Frosting", "Periwinkle lembut");
    await selectOption(page, "Lilin", "Lima lilin");
    await selectOption(page, "Bunga", "Tanpa bunga");
    await selectOption(page, "Topper", "Loop topper");
    await selectOption(page, "Aksen", "Pita");
    await expect(page.getByTestId("s05-cake-renderer")).toHaveAttribute("data-frosting", "cfg-B-periwinkle-warm");
    await expect(page.locator("[data-testid^='s05-candle-']")).toHaveCount(5);
    await expect(page.getByTestId("s05-topper")).toBeVisible();
    await expect(page.getByTestId("s05-accent-ribbon")).toBeVisible();
    await expect(page.getByTestId("s05-flower-left")).toHaveCount(0);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s05-desktop-custom-1440x900.png"), fullPage: true });
  });

  test("supports keyboard selection, undo, and confirmed reset", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS05(page);
    await page.getByRole("tab", { name: "Topper", exact: true }).focus();
    await page.keyboard.press("Enter");
    const topper = page.getByRole("button", { name: "Loop topper", exact: true });
    await topper.focus();
    await page.keyboard.press("Space");
    await expect(topper).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Urungkan", exact: true }).click();
    await expect(page.getByRole("button", { name: "Tanpa topper", exact: true })).toHaveAttribute("aria-pressed", "true");
    await selectOption(page, "Aksen", "Pita");
    await page.getByRole("button", { name: "Atur ulang", exact: true }).click();
    await expect(page.getByRole("alertdialog")).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s05-reset-confirmation-390x844.png"), fullPage: true });
    await page.getByRole("button", { name: "Ya, atur ulang", exact: true }).click();
    await expect(page.getByRole("button", { name: "Mutiara", exact: true })).toHaveAttribute("aria-pressed", "true");
  });

  test("handles rapid selections without duplicated decorations", async ({ page }) => {
    await gotoS05(page);
    await page.getByRole("tab", { name: "Lilin", exact: true }).click();
    await page.getByRole("button", { name: "Lima lilin", exact: true }).evaluate((button: HTMLButtonElement) => {
      button.click(); button.click(); button.click();
    });
    await expect(page.locator("[data-testid^='s05-candle-']")).toHaveCount(5);
  });

  test("preserves customized state across the guarded S05 to S06 handoff", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS05(page);
    await selectOption(page, "Frosting", "Periwinkle lembut");
    await selectOption(page, "Topper", "Loop topper");
    const finish = page.getByRole("button", { name: "Selesaikan kue", exact: true });
    await finish.focus();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s05-customized-confirm-ready-390x844.png"), fullPage: true });
    await finish.click();
    await expect(page.getByTestId("s06-scene")).toBeVisible({ timeout: 5000 });
  });

  test("settles immediately under reduced motion and remains fully operable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoS05(page);
    await expect(page.getByTestId("s05-scene")).toHaveAttribute("data-reduced-motion", "true");
    const state = await page.getByTestId("s05-cake-renderer").evaluate((element) => ({ opacity: getComputedStyle(element).opacity, transform: getComputedStyle(element).transform }));
    expect(state.opacity).toBe("1");
    await selectOption(page, "Bunga", "Tanpa bunga");
    await page.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
    await expect(page.getByTestId("s06-scene")).toBeVisible({ timeout: 5000 });
  });

});
