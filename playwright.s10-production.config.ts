import { defineConfig } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT || "4144";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  timeout: 120_000,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    channel: "msedge",
    hasTouch: true,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run start -- -p ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
