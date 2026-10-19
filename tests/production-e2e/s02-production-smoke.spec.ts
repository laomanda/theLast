import { expect, test } from "@playwright/test";

test("production keeps fixtures inert, renders through the S06 wish ritual, then routes unavailable S07 honestly", async ({ page }) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      const location = message.location();
      consoleErrors.push(`${message.text()} ${location.url || "unknown-url"}`);
    }
  });
  page.on("response", (received) => {
    if (received.status() >= 400) failedResponses.push(`${received.status()} ${received.url()}`);
  });

  const response = await page.goto("/?readiness=fail&open=true", { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);

  await expect(page.getByTestId("s02-scene")).toBeVisible({ timeout: 5000 });
  await expect(page.getByTestId("s02-scene")).toHaveAttribute("data-visual-phase", "closed");
  await expect(page.getByRole("button", { name: "Open", exact: true })).toBeEnabled();
  await expect(page.locator("body")).not.toBeEmpty();

  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByTestId("s03-scene")).toBeVisible({ timeout: 5000 });
  await expect(page.getByRole("heading", { name: "Happy Birthday, Malica Yohana Hutagaol." })).toBeVisible();
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s04-scene")).toBeVisible({ timeout: 5000 });
  await expect(page.getByTestId("s04-portrait-image")).toHaveAttribute("src", /s04-portrait\.webp/);
  await expect(page.getByTestId("s04-development-boundary")).toHaveCount(0);
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await expect(page.getByTestId("s05-scene")).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
  await expect(page.getByTestId("s06-scene")).toBeVisible({ timeout: 5000 });
  await page.getByTestId("s06-wish-control").click();
  await page.getByTestId("s06-continue").click();
  await expect(page.getByTestId("runtime-boundary")).toContainText("S07", { timeout: 5000 });

  expect(pageErrors).toEqual([]);
  expect({ consoleErrors, failedResponses }).toEqual({ consoleErrors: [], failedResponses: [] });
});
