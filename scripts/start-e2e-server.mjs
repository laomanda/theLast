import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const port = process.env.PLAYWRIGHT_PORT || "3026";
const distDir = process.env.NEXT_DIST_DIR || `.next-e2e-${port}`;
const child = spawn(process.execPath, [nextBin, "dev", "--turbopack", "-p", port], {
  cwd: process.cwd(),
  env: { ...process.env, NEXT_DIST_DIR: distDir },
  stdio: "inherit",
});

let childExited = false;
let stopping = false;
const ownerPid = process.ppid;

const stop = (signal) => {
  if (stopping || childExited) return;
  stopping = true;

  if (process.platform === "win32" && child.pid) {
    // This is the exact server process spawned above. /T limits cleanup to
    // that process tree; no image-name or broad process matching is used.
    try {
      execFileSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    } catch {
      // The process may have exited between the check and taskkill.
    }
  } else if (!child.killed) {
    child.kill(signal);
  }
};

const finishWhenOwnerEnds = () => {
  if (stopping || childExited) return;
  try {
    process.kill(ownerPid, 0);
  } catch {
    stop("SIGTERM");
    process.exit(143);
  }
};

const ownerWatch = setInterval(finishWhenOwnerEnds, 250);
ownerWatch.unref();
process.stdin.on("close", () => {
  if (!stopping && !childExited) {
    stop("SIGTERM");
    process.exit(143);
  }
});

process.once("SIGINT", () => {
  stop("SIGINT");
  process.exit(130);
});
process.once("SIGTERM", () => {
  stop("SIGTERM");
  process.exit(143);
});
process.once("exit", () => stop("SIGTERM"));
child.once("exit", (code, signal) => {
  childExited = true;
  process.exit(code ?? (signal ? 1 : 0));
});
