import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("planning/evidence/screenshots/cp01c3");

async function gotoS02(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
}

async function gotoS03(page: Page, settle = true) {
  await gotoS02(page);
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 6000 });
  if (settle) {
    await expect(page.getByTestId("s03-scene")).toHaveAttribute("data-visual-phase", "stable", { timeout: 5000 });
  }
}

async function presentationMetrics(page: Page) {
  return page.evaluate(() => {
    const heading = document.getElementById("s03-title")!.getBoundingClientRect();
    const name = document.querySelector<HTMLElement>("[data-testid='s03-recipient-name']")!.getBoundingClientRect();
    const action = document.querySelector<HTMLButtonElement>(".s03-continue-action")!.getBoundingClientRect();
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      document: { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth },
      heading: { left: heading.left, right: heading.right, top: heading.top, bottom: heading.bottom, width: heading.width, height: heading.height },
      name: { left: name.left, right: name.right, top: name.top, bottom: name.bottom, width: name.width, height: name.height },
      action: { left: action.left, right: action.right, top: action.top, bottom: action.bottom },
      nameText: document.querySelector<HTMLElement>("[data-testid='s03-recipient-name']")!.innerText,
    };
  });
}

async function diagnosticStep<T>(label: string, operation: () => Promise<T>, timeoutMs = 15_000): Promise<T> {
  console.log(`[CP01E1C] ${label}:start`);
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      operation(),
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`[CP01E1C] ${label}:timeout after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
    console.log(`[CP01E1C] ${label}:done`);
    return result;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
});

test.describe("S03 Birthday Reveal production scene", () => {
  const viewports = [
    { name: "narrow-mobile", width: 320, height: 568 },
    { name: "standard-mobile", width: 390, height: 844 },
    { name: "tall-mobile", width: 430, height: 932 },
    { name: "desktop", width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    test(`renders exact, unclipped content at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoS03(page);

      await expect(page.getByRole("heading", { name: "Happy Birthday, Malica Yohana Hutagaol." })).toBeVisible();
      await expect(page.getByTestId("s03-recipient-name")).toHaveText("Malica Yohana Hutagaol.");
      await expect(page.getByRole("button", { name: "Lanjut", exact: true })).toBeVisible();
      const metrics = await presentationMetrics(page);
      expect(metrics.document.scrollWidth).toBeLessThanOrEqual(metrics.document.clientWidth);
      expect(metrics.heading.left).toBeGreaterThanOrEqual(0);
      expect(metrics.heading.right).toBeLessThanOrEqual(viewport.width);
      expect(metrics.name.left).toBeGreaterThanOrEqual(0);
      expect(metrics.name.right).toBeLessThanOrEqual(viewport.width);
      expect(metrics.action.bottom).toBeLessThanOrEqual(viewport.height);
      expect(metrics.nameText).toBe("Malica Yohana Hutagaol.");

      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `s03_resting_${viewport.name}_${viewport.width}x${viewport.height}.png`),
        fullPage: true,
      });
    });
  }

  test("keeps paperworld discoveries keyboard-accessible with exactly two-word reveals", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS03(page);

    const discoveries = [
      ["Buka bintang kertas", "Nineteen Cheers"],
      ["Buka bunga kertas", "Bloom Bright"],
      ["Buka hati kertas", "Stay Golden"],
      ["Putar token ulang tahun", "Lucky You"],
      ["Buka party popper", "Make Wishes"],
      ["Tarik pita kertas", "Keep Shining"],
    ] as const;

    await page.getByRole("button", { name: "Lanjut", exact: true }).click();
    await expect(page.getByText("Malica, buka enam kejutan dulu ya!", { exact: true })).toBeVisible();
    await expect(page.getByTestId("s03-scene")).toBeVisible();

    for (const [label, surprise] of discoveries) {
      const ornament = page.getByRole("button", { name: label, exact: true });
      await ornament.focus();
      await ornament.press("Enter");
      await expect(page.getByText(surprise, { exact: true })).toBeVisible();
      expect(surprise.trim().split(/\s+/)).toHaveLength(2);
    }

    await page.getByRole("button", { name: "Lanjut", exact: true }).click();
    await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 5000 });
  });

  test("captures the S02 to S03 kinetic frame sequence and focused CTA", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS02(page);
    const open = page.getByRole("button", { name: "Open", exact: true });
    await open.click();
    await expect(page.getByTestId("s02-scene")).toHaveAttribute("data-visual-phase", "open");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_00_s02-open_390x844.png"), fullPage: true });

    await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_01_canvas_390x844.png"), fullPage: true });
    await page.waitForTimeout(260);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_02_greeting_390x844.png"), fullPage: true });
    await page.waitForTimeout(420);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_03_name_390x844.png"), fullPage: true });
    await page.waitForTimeout(380);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_04_celebration_390x844.png"), fullPage: true });
    await expect(page.getByTestId("s03-scene")).toHaveAttribute("data-visual-phase", "stable", { timeout: 3000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_05_stable_390x844.png"), fullPage: true });

    const lanjut = page.getByRole("button", { name: "Lanjut", exact: true });
    await lanjut.focus();
    await expect(lanjut).toBeFocused();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_06_cta-focused_390x844.png"), fullPage: true });
  });

  test("never auto-advances and reaches the S04 portrait on mouse activation", async ({ page }) => {
    await gotoS03(page);
    await page.waitForTimeout(1800);
    await expect(page.getByTestId("s03-scene")).toBeVisible();
    await expect(page.getByTestId("s04-scene")).toHaveCount(0);
    await page.getByRole("button", { name: "Lanjut", exact: true }).click();
    await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_09_s04-boundary_390x844.png"), fullPage: true });
  });

  test("supports touch activation", async ({ page }) => {
    await gotoS03(page);
    await page.getByRole("button", { name: "Lanjut", exact: true }).tap();
    await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 5000 });
  });

  for (const key of ["Enter", "Space"] as const) {
    test(`supports keyboard ${key}`, async ({ page }) => {
      await gotoS03(page);
      const lanjut = page.getByRole("button", { name: "Lanjut", exact: true });
      await lanjut.focus();
      await lanjut.press(key);
      await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 5000 });
    });
  }

  test("coalesces rapid repeated activation into one S04 transition", async ({ page }) => {
    await gotoS03(page);
    await page.getByRole("button", { name: "Lanjut", exact: true }).evaluate((button: HTMLButtonElement) => {
      button.click();
      button.click();
    });
    await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId("s04-scene")).toHaveCount(1);
  });

  test("provides a complete reduced-motion state and valid progression", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoS03(page);
    await expect(page.getByTestId("s03-scene")).toHaveAttribute("data-reduced-motion", "true");
    await expect(page.getByRole("heading", { name: "Happy Birthday, Malica Yohana Hutagaol." })).toBeVisible();
    await expect(page.getByRole("button", { name: "Lanjut", exact: true })).toBeVisible();
    const opacity = await page.getByTestId("s03-recipient-name").evaluate((element) => getComputedStyle(element).opacity);
    expect(opacity).toBe("1");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_07_reduced-motion_390x844.png"), fullPage: true });
    await page.getByRole("button", { name: "Lanjut", exact: true }).click();
    await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 3000 });
  });

  test("keeps content usable under text enlargement and Arc asset failure", async ({ page }) => {
    page.on("close", () => console.log("[CP01E1C] page:close"));
    page.on("crash", () => console.log("[CP01E1C] page:crash"));
    page.on("requestfailed", (request) => console.log(`[CP01E1C] requestfailed:${request.url()}:${request.failure()?.errorText ?? "unknown"}`));
    console.log("[CP01E1C] final-test:start");
    await diagnosticStep("route-arc", () => page.route("**/assets/svg/celebration/celebration-arc.svg", (route) => route.abort()));
    await diagnosticStep("viewport", () => page.setViewportSize({ width: 320, height: 568 }));
    await diagnosticStep("goto-s03", () => gotoS03(page));
    await diagnosticStep("font-enlarge", () => page.evaluate(() => { document.documentElement.style.fontSize = "150%"; }));
    console.log("[CP01E1C] assertions:start");
    await expect(page.getByRole("heading", { name: "Happy Birthday, Malica Yohana Hutagaol." })).toBeVisible();
    await expect(page.getByRole("button", { name: "Lanjut", exact: true })).toBeVisible();
    await expect(page.getByTestId("s03-celebration-arc").locator("img")).toHaveCount(0);
    console.log("[CP01E1C] assertions:dom-done");
    const metrics = await diagnosticStep("layout-metrics", () => presentationMetrics(page));
    expect(metrics.document.scrollWidth).toBeLessThanOrEqual(metrics.document.clientWidth);
    expect(metrics.name.right).toBeLessThanOrEqual(metrics.viewport.width);
    await diagnosticStep("screenshot", () => page.screenshot({ path: path.join(SCREENSHOT_DIR, "s03_sequence_08_text-150-asset-fallback_320x568.png"), fullPage: true }));
    console.log("[CP01E1C] final-test:assertions-done");
  });
});
