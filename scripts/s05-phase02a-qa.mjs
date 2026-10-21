import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("planning/evidence/screenshots/s05-phase02a");
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });

async function reachS05(page) {
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.getByTestId("s02-scene").waitFor({ state: "visible", timeout: 12_000 });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await page.getByTestId("s03-scene").waitFor({ state: "visible", timeout: 8_000 });
  for (const name of [
    "Buka bintang kertas",
    "Buka bunga kertas",
    "Buka hati kertas",
    "Putar token ulang tahun",
    "Buka party popper",
    "Tarik pita kertas",
  ]) {
    const button = page.getByRole("button", { name, exact: true });
    if (await button.count()) await button.click();
  }
  const continueS03 = page.getByRole("button", { name: "Lanjut", exact: true });
  await continueS03.waitFor({ state: "visible", timeout: 8_000 });
  await continueS03.click();
  await page.getByTestId("s04-scene").waitFor({ state: "visible", timeout: 8_000 });
  await page.getByRole("button", { name: "Lanjut", exact: true }).click();
  await page.getByTestId("s05-scene").waitFor({ state: "visible", timeout: 8_000 });
  await page.getByTestId("s05-scene").waitFor({ state: "attached" });
  await page.waitForTimeout(1100);
}

const viewports = [
  [1440, 900],
  [1280, 800],
  [768, 1024],
  [390, 844],
  [320, 568],
];

const results = [];
for (const [width, height] of viewports) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await reachS05(page);
  const metrics = await page.getByTestId("s05-scene").evaluate((scene) => ({
    viewport: [window.innerWidth, window.innerHeight],
    documentWidth: document.documentElement.scrollWidth,
    sceneWidth: scene.scrollWidth,
    headlineVisible: !!document.querySelector("#s05-title")?.getBoundingClientRect().height,
    cakeVisible: !!document.querySelector('[data-testid="s05-cake-renderer"]')?.getBoundingClientRect().height,
    finishVisibleInDocument: !!document.querySelector(".s05-finish-action")?.getBoundingClientRect().height,
  }));
  results.push({ size: `${width}x${height}`, ...metrics });
  await page.screenshot({ path: path.join(outputDir, `s05-${width}x${height}.png`), fullPage: true });
  if (width === 1440) {
    await page.getByTestId("s05-cake-renderer").screenshot({ path: path.join(outputDir, "s05-cake-closeup.png") });
    await page.getByRole("tab", { name: "Frosting", exact: true }).click();
    await page.getByRole("button", { name: "Periwinkle lembut", exact: true }).click();
    await page.getByRole("tab", { name: "Lilin", exact: true }).click();
    await page.getByRole("button", { name: "Lima lilin", exact: true }).click();
    await page.getByRole("tab", { name: "Bunga", exact: true }).click();
    await page.getByRole("button", { name: "Tanpa bunga", exact: true }).click();
    await page.getByRole("tab", { name: "Topper", exact: true }).click();
    await page.getByRole("button", { name: "Loop topper", exact: true }).click();
    await page.getByRole("tab", { name: "Aksen", exact: true }).click();
    await page.getByRole("button", { name: "Pita", exact: true }).click();
    await page.getByRole("button", { name: "Urungkan", exact: true }).click();
    await page.getByRole("button", { name: "Atur ulang", exact: true }).click();
    await page.getByRole("button", { name: "Ya, atur ulang", exact: true }).click();
  }
  await context.close();
}

const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const reducedPage = await reducedContext.newPage();
await reachS05(reducedPage);
results.push({ reducedMotionPhase: await reducedPage.getByTestId("s05-scene").getAttribute("data-visual-phase") });
await reducedPage.getByRole("button", { name: "Selesaikan kue", exact: true }).click();
await reducedPage.getByTestId("s06-scene").waitFor({ state: "visible", timeout: 8_000 });
results.push({ completionReachedS06: true });
await reducedContext.close();

await browser.close();
console.log(JSON.stringify(results, null, 2));
