import { defineConfig } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT || process.env.PORT || "3001";
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: {
    baseURL,
    channel: "msedge",
    hasTouch: true,
  },
  webServer: process.env.PLAYWRIGHT_NO_WEBSERVER ? undefined : {
    command: `npm run dev -- -p ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
