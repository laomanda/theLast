import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/production-e2e",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:3002",
    channel: "chrome",
    hasTouch: true,
  },
  webServer: {
    command: "npm run start -- -p 3002",
    url: "http://127.0.0.1:3002",
    reuseExistingServer: true,
  },
});
