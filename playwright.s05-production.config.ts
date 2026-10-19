import { defineConfig } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT || "3060";
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/production-e2e",
  workers: 1,
  use: { baseURL, channel: "chrome", hasTouch: true },
});
