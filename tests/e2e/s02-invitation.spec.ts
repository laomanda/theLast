import { expect, test, type Page } from "@playwright/test";
import fs from "fs";
import path from "path";

const SCREENSHOT_DIR = path.resolve(process.cwd(), "planning/evidence/screenshots");
const VIEWPORTS = [
  { name: "narrow-mobile", width: 320, height: 568 },
  { name: "standard-mobile", width: 390, height: 844 },
  { name: "tall-mobile", width: 430, height: 932 },
  { name: "desktop", width: 1440, height: 900 },
];

async function gotoS02(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  await expect(page.getByRole("heading", { name: /Silahkan dibuka|Ada sesuatu untukmu/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open", exact: true })).toBeVisible();
}

async function setReadinessFixture(page: Page, mode: "slow") {
  await page.addInitScript((fixture) => {
    window.__THE_LAST_S01_READINESS_FIXTURE__ = fixture;
  }, mode);
}

test.beforeAll(() => {
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
});

test.describe("S02 closed composition", () => {
  for (const viewport of VIEWPORTS) {
    test(`renders the folded keepsake at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoS02(page);
      await expect(page.getByTestId("s02-scene")).toHaveAttribute("data-visual-phase", "closed");
      await expect(page.getByTestId("s02-paper-rig")).toBeVisible();

      const target = path.join(SCREENSHOT_DIR, `s02_closed_${viewport.name}_${viewport.width}x${viewport.height}.png`);
      await page.screenshot({ path: target, fullPage: true });
      expect(fs.existsSync(target)).toBe(true);
    });
  }

  test("does not open through waiting, blur, or public URL parameters", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?open=true&scene=S03");
    await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
    await page.evaluate(() => window.dispatchEvent(new Event("blur")));
    await page.waitForTimeout(1100);
    await expect(page.getByTestId("s02-scene")).toHaveAttribute("data-visual-phase", "closed");
    await expect(page.getByTestId("s03-scene")).toHaveCount(0);
  });

  test("keeps Open focused, visible, and unoccluded under text enlargement", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS02(page);
    const open = page.getByRole("button", { name: "Open", exact: true });
    await open.focus();
    await page.evaluate(() => { document.documentElement.style.fontSize = "150%"; });
    await expect(open).toBeFocused();
    await expect(open).toBeInViewport();
    const metrics = await page.evaluate(() => {
      const titleElement = document.getElementById("s02-title")!;
      const copyElement = titleElement.parentElement!;
      const title = titleElement.getBoundingClientRect();
      const copy = copyElement.getBoundingClientRect();
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        titleLeft: title.left,
        titleRight: title.right,
        titleWidth: title.width,
        copyLeft: copy.left,
        copyRight: copy.right,
        copyWidth: copy.width,
      };
    });
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.titleLeft).toBeGreaterThanOrEqual(0);
    expect(metrics.titleRight, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.clientWidth);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_keyboard_focus_text_150_390x844.png"), fullPage: true });
  });
});

test.describe("S02 Open intent and fold choreography", () => {
  test("captures a real articulated fold sequence and commits S03 once", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS02(page);
    const open = page.getByRole("button", { name: "Open", exact: true });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_fold_00_closed_390x844.png"), fullPage: true });
    await open.click();
    await page.waitForTimeout(180);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_fold_01_release_390x844.png"), fullPage: true });
    await page.waitForTimeout(420);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_fold_02_mid_390x844.png"), fullPage: true });
    await expect(page.getByTestId("s02-scene")).toHaveAttribute("data-visual-phase", "open");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_fold_03_open_390x844.png"), fullPage: true });
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_development_handoff_390x844.png"), fullPage: true });
  });

  test("supports touch activation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS02(page);
    await page.getByRole("button", { name: "Open", exact: true }).tap();
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
  });

  test("supports keyboard Enter", async ({ page }) => {
    await gotoS02(page);
    const open = page.getByRole("button", { name: "Open", exact: true });
    await open.focus();
    await open.press("Enter");
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
  });

  test("supports keyboard Space", async ({ page }) => {
    await gotoS02(page);
    const open = page.getByRole("button", { name: "Open", exact: true });
    await open.focus();
    await open.press("Space");
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
  });

  test("coalesces rapid activation into one transition", async ({ page }) => {
    await gotoS02(page);
    await page.getByRole("button", { name: "Open", exact: true }).evaluate((button: HTMLButtonElement) => {
      button.click();
      button.click();
    });
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId("s03-scene")).toHaveCount(1);
  });

  test("preserves consent and progression with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS02(page);
    await expect(page.getByTestId("s03-scene")).toHaveCount(0);
    await page.getByRole("button", { name: "Open", exact: true }).click();
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 3000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s02_reduced_motion_handoff_390x844.png"), fullPage: true });
  });

  test("keeps a usable CSS fold and Open action when the REV5 accent fails", async ({ page }) => {
    await page.route("**/assets/svg/paper/invitation-paper-fold.svg", (route) => route.abort());
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS02(page);
    await expect(page.getByTestId("s02-paper-rig")).toBeVisible();
    await page.getByRole("button", { name: "Open", exact: true }).click();
    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
  });
});

test("captures S01 to S02 continuity frames", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await setReadinessFixture(page, "slow");
  await page.goto("/");
  await expect(page.getByTestId("s01-composition")).toBeVisible();
  await page.waitForTimeout(650);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s01_s02_continuity_00_s01_390x844.png"), fullPage: true });
  await page.waitForTimeout(480);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s01_s02_continuity_01_handoff_390x844.png"), fullPage: true });
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 5000 });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s01_s02_continuity_02_s02_390x844.png"), fullPage: true });
});
