import { defineConfig } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT || "3026";
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  globalSetup: "./scripts/playwright-e2e-global-setup.mjs",
  use: { baseURL, channel: "msedge", hasTouch: true, trace: "retain-on-failure" },
});
