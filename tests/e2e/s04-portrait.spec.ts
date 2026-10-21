import { expect, test, type Page } from "@playwright/test";

async function gotoS04(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 8000 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 6000 });
  for (const name of [
    "Buka bintang kertas",
    "Buka bunga kertas",
    "Buka hati kertas",
    "Putar token ulang tahun",
    "Buka party popper",
    "Tarik pita kertas",
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
  }
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 6000 });
  await expect(page.getByTestId("s04-scene")).toHaveAttribute("data-visual-phase", "stable", { timeout: 5000 });
}

test.describe("S04 single portrait editorial scene", () => {
  for (const viewport of [
    { name: "narrow-mobile", width: 320, height: 568 },
    { name: "standard-mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    test(`renders one intact authorized portrait at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoS04(page);
      const portrait = page.getByTestId("s04-portrait-image");
      await expect(portrait).toHaveCount(1);
      await expect(page.locator("[data-photo-role='single-authorized-portrait']")).toHaveCount(1);
      await expect(page.getByRole("heading", { name: "Malica Yohana Hutagaol" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Lanjut", exact: true })).toBeVisible();
      await expect(page.getByTestId("s04-scene")).toHaveAttribute("data-photo-state", "ready", { timeout: 5000 });
      const metrics = await portrait.evaluate((element: HTMLImageElement) => ({
        complete: element.complete,
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight,
        fit: getComputedStyle(element).objectFit,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));
      expect(metrics.complete).toBe(true);
      expect(metrics.fit).toBe("contain");
      expect(metrics.naturalWidth).toBeGreaterThan(0);
      expect(metrics.naturalHeight).toBeGreaterThan(0);
      expect(metrics.naturalWidth / metrics.naturalHeight).toBeCloseTo(0.75, 2);
      expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth);
    });
  }

  test("settles completely under reduced motion and reaches S05", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoS04(page);
    const scene = page.getByTestId("s04-scene");
    await expect(scene).toHaveAttribute("data-reduced-motion", "true");
    await expect(scene).toHaveAttribute("data-photo-state", "ready");
    const pose = await page.getByTestId("s04-frame").evaluate((element) => ({
      opacity: getComputedStyle(element).opacity,
      visibility: getComputedStyle(element).visibility,
    }));
    expect(pose).toEqual({ opacity: "1", visibility: "visible" });
    const butterfly = page.getByRole("button", { name: "Sentuh kupu-kupu untuk melihatnya terbang" });
    const hint = page.getByRole("button", { name: "Psst... sentuh aku!" });
    await expect(hint).toBeVisible();
    await butterfly.press("Enter");
    await expect(hint).toHaveCount(0);
    await page.getByRole("button", { name: "Lanjut", exact: true }).click();
    await expect(page.getByTestId("s05-scene")).toBeVisible({ timeout: 5000 });
  });

  test("requires an intentional butterfly interaction before continuing", async ({ page }) => {
    await gotoS04(page);
    const continueButton = page.getByRole("button", { name: "Lanjut", exact: true });
    const butterfly = page.getByRole("button", { name: "Sentuh kupu-kupu untuk melihatnya terbang" });
    await expect(continueButton).toBeEnabled();
    await continueButton.click();
    await expect(page.getByTestId("s04-scene")).toBeVisible();
    await expect(page.getByRole("button", { name: "Psst... sentuh aku!" })).toBeVisible();
    await butterfly.press("Enter");
    await expect(continueButton).toBeEnabled();
    await continueButton.click();
    await expect(page.getByTestId("s05-scene")).toBeVisible({ timeout: 5000 });
  });

  test("lets the paper butterfly fly and return to the portrait corner", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS04(page);
    const butterfly = page.getByRole("button", { name: "Sentuh kupu-kupu untuk melihatnya terbang" });
    await expect(butterfly).toHaveAttribute("data-phase", "resting");
    await butterfly.click();
    await expect(butterfly).not.toHaveAttribute("data-phase", "resting");
    await expect(butterfly).toHaveAttribute("data-phase", "resting", { timeout: 7000 });
  });

  test("shows the butterfly whisper once, then resets after reload", async ({ page }) => {
    test.setTimeout(45000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoS04(page);
    const butterfly = page.getByRole("button", { name: "Sentuh kupu-kupu untuk melihatnya terbang" });
    const hint = page.getByRole("button", { name: "Psst... sentuh aku!" });
    await expect(hint).toBeVisible({ timeout: 4000 });
    await butterfly.click();
    await expect(hint).toBeHidden();
    await expect(butterfly).toHaveAttribute("data-phase", "resting", { timeout: 12000 });
    await butterfly.click();
    await expect(hint).toHaveCount(0);
    await expect(butterfly).toHaveAttribute("data-phase", "resting", { timeout: 12000 });
    await page.reload();
    await expect.poll(() => page.evaluate(() => window.sessionStorage.getItem("the-last:s04-butterfly-hint-consumed"))).toBeNull();
  });

  test("consumes the whisper even when the butterfly is activated before its delay", async ({ page }) => {
    await gotoS04(page);
    const butterfly = page.getByRole("button", { name: "Sentuh kupu-kupu untuk melihatnya terbang" });
    await butterfly.press("Enter");
    await page.waitForTimeout(1800);
    await expect(page.getByRole("button", { name: "Psst... sentuh aku!" })).toHaveCount(0);
  });

  test("keeps the scene operable when the authorized derivative cannot load", async ({ page }) => {
    await page.route("**/assets/photos/s04-portrait.webp", (route) => route.abort());
    await page.route(/\/\_next\/image\?.*s04-portrait/i, (route) => route.abort());
    await gotoS04(page);
    await expect(page.getByTestId("s04-scene")).toHaveAttribute("data-photo-state", "unavailable");
    await expect(page.getByRole("status")).toHaveText("Foto belum dapat dimuat.");
    await page.getByRole("button", { name: "Sentuh kupu-kupu untuk melihatnya terbang" }).press("Enter");
    await page.getByRole("button", { name: "Lanjut", exact: true }).click();
    await expect(page.getByTestId("s05-scene")).toBeVisible({ timeout: 5000 });
  });

  test("coalesces rapid repeated continuation into one S05 scene", async ({ page }) => {
    await gotoS04(page);
    await page.getByRole("button", { name: "Sentuh kupu-kupu untuk melihatnya terbang" }).press("Enter");
    await page.getByRole("button", { name: "Lanjut", exact: true }).evaluate((button: HTMLButtonElement) => {
      button.click();
      button.click();
    });
    await expect(page.getByTestId("s05-scene")).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId("s05-scene")).toHaveCount(1);
  });
});
