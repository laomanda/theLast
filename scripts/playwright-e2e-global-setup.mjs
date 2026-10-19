import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const port = process.env.PLAYWRIGHT_PORT || "3026";
const distDir = process.env.NEXT_DIST_DIR || `.next-e2e-${port}`;
const baseURL = `http://127.0.0.1:${port}`;

const waitForServer = async (child) => {
  const deadline = Date.now() + 120_000;
  let lastError = "";
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`E2E server exited before readiness: ${child.exitCode}`);
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${baseURL}; last error: ${lastError}`);
};

export default async function globalSetup() {
  const child = spawn(process.execPath, [nextBin, "dev", "--turbopack", "-p", port], {
    cwd: process.cwd(),
    env: { ...process.env, NEXT_DIST_DIR: distDir },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  child.stdout.on("data", (chunk) => process.stderr.write(`[E2E server ${child.pid}] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[E2E server ${child.pid}] ${chunk}`));
  await waitForServer(child);

  return async function globalTeardown() {
    if (child.exitCode !== null) return;
    const exited = new Promise((resolve) => child.once("exit", resolve));
    child.kill("SIGTERM");
    await Promise.race([
      exited,
      new Promise((resolve) => setTimeout(resolve, 5_000)),
    ]);
    if (child.exitCode === null && process.platform === "win32" && child.pid) {
      // Fallback remains scoped to this exact direct child if graceful close fails.
      child.kill();
    }
  };
}
