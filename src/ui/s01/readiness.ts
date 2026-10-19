import { experienceRuntime } from "../../state/experience-store";

export type CriticalReadinessTier = "ready" | "degraded" | "failed";
export type ReadinessFixtureMode = "hold" | "fail" | "slow" | "degraded";

export interface CriticalReadinessReport {
  overall: CriticalReadinessTier;
  runtimeReady: boolean;
  fontReady: boolean;
  fontFallbackUsed: boolean;
  motifReady: boolean;
  motifFallbackUsed: boolean;
  errorDetail: string | null;
  fixtureMode?: string | null;
}

export interface EvaluateReadinessOptions {
  timeoutMs?: number;
  fixtureOverride?: ReadinessFixtureMode | null;
  signal?: AbortSignal;
}

/**
 * Browser fixtures are accepted only in a non-production build and only from
 * an explicit Playwright-injected window value. They are never sourced from
 * URLs, so a production visitor cannot activate readiness bypasses or failure
 * modes.
 */
declare global {
  interface Window {
    __THE_LAST_S01_READINESS_FIXTURE__?: unknown;
  }
}

const readinessFixtureModes = new Set<ReadinessFixtureMode>([
  "hold",
  "fail",
  "slow",
  "degraded",
]);

export function getControlledReadinessFixtureMode(): ReadinessFixtureMode | null {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") return null;
  const candidate = window.__THE_LAST_S01_READINESS_FIXTURE__;
  return typeof candidate === "string" && readinessFixtureModes.has(candidate as ReadinessFixtureMode)
    ? (candidate as ReadinessFixtureMode)
    : null;
}

function waitForDelay(delayMs: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, delayMs);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new Error("Readiness evaluation was aborted."));
      },
      { once: true },
    );
  });
}

function isLoadedStaticMotifFallback(element: Element | null): boolean {
  const image = element as HTMLImageElement | null;
  return image?.tagName === "IMG" && image.complete === true && image.naturalWidth > 0;
}

async function waitForStaticMotifFallback(timeoutMs: number, signal?: AbortSignal): Promise<boolean> {
  if (typeof document === "undefined") return false;
  const image = document.getElementById("a02-static-fallback") as HTMLImageElement | null;
  if (!image) return false;
  if (isLoadedStaticMotifFallback(image)) return true;

  return new Promise((resolve) => {
    const finish = (loaded: boolean) => {
      clearTimeout(timeout);
      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);
      signal?.removeEventListener("abort", onAbort);
      resolve(loaded);
    };
    const onLoad = () => finish(isLoadedStaticMotifFallback(image));
    const onError = () => finish(false);
    const onAbort = () => finish(false);
    const timeout = setTimeout(() => finish(false), timeoutMs);
    image.addEventListener("load", onLoad, { once: true });
    image.addEventListener("error", onError, { once: true });
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Assesses genuine critical readiness for Scene 01 -> Scene 02 transition.
 * Only validates assets/infrastructure strictly required by the initial interactive shell.
 * Does NOT preload non-critical assets (personal photos, 3D vault, audio, future scene fonts).
 */
export async function evaluateCriticalReadiness(
  options: EvaluateReadinessOptions = {},
): Promise<CriticalReadinessReport> {
  const { timeoutMs = 2000, fixtureOverride, signal } = options;
  // `null` deliberately clears a one-shot test fixture during retry; only an
  // omitted override may read the controlled browser-test injection.
  const fixture = fixtureOverride === undefined ? getControlledReadinessFixtureMode() : fixtureOverride;

  // Test fixture: simulated failure
  if (fixture === "fail") {
    return {
      overall: "failed",
      runtimeReady: true,
      fontReady: false,
      fontFallbackUsed: false,
      motifReady: false,
      motifFallbackUsed: false,
      errorDetail: "Simulated critical readiness failure for recovery QA.",
      fixtureMode: "fail",
    };
  }

  // Test fixture: simulated slower network/asset resolution
  if (fixture === "slow") {
    await waitForDelay(1000, signal);
  }

  // 1. Runtime store readiness
  let runtimeReady = false;
  try {
    const state = experienceRuntime.getState();
    runtimeReady = state.scene === "S01" && state.lifecycle === "active";
  } catch {
    runtimeReady = false;
  }

  if (!runtimeReady) {
    return {
      overall: "failed",
      runtimeReady: false,
      fontReady: false,
      fontFallbackUsed: false,
      motifReady: false,
      motifFallbackUsed: false,
      errorDetail: "Runtime store is not in active S01 state.",
      fixtureMode: fixture,
    };
  }

  // 2. Critical font readiness. The family name is emitted by next/font/local;
  // checking it prevents a system fallback from being falsely classified as loaded.
  let fontReady = true;
  let fontFallbackUsed = false;

  if (fixture === "degraded") {
    fontReady = false;
    fontFallbackUsed = true;
  } else if (typeof document !== "undefined" && "fonts" in document) {
    try {
      const fontFamily = document.documentElement.dataset.s01FontFamily;
      if (!fontFamily) throw new Error("next/font/local family metadata is unavailable");
      const fontCheckPromise = document.fonts.load(`16px ${fontFamily}`);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Font load timeout")), timeoutMs),
      );
      await Promise.race([fontCheckPromise, timeoutPromise]);
      fontReady = document.fonts.check(`16px ${fontFamily}`);
      fontFallbackUsed = !fontReady;
    } catch {
      // Fallback to system sans-serif font stack is safe and functional
      fontReady = false;
      fontFallbackUsed = true;
    }
  }

  if (signal?.aborted) {
    return {
      overall: "failed",
      runtimeReady,
      fontReady,
      fontFallbackUsed,
      motifReady: false,
      motifFallbackUsed: false,
      errorDetail: "Readiness evaluation was aborted.",
      fixtureMode: fixture,
    };
  }

  // 3. SVG motif readiness
  let motifReady = true;
  let motifFallbackUsed = false;

  if (fixture === "degraded") {
    motifReady = false;
    motifFallbackUsed = await waitForStaticMotifFallback(timeoutMs, signal);
  } else if (typeof document !== "undefined") {
    const rootEl = document.getElementById("a02-root");
    const outerEl = document.getElementById("a02-outer");
    const innerEl = document.getElementById("a02-inner");
    if (rootEl && outerEl && innerEl) {
      motifReady = true;
      motifFallbackUsed = false;
    } else {
      const fallback = document.getElementById("a02-static-fallback");
      motifReady = false;
      motifFallbackUsed = isLoadedStaticMotifFallback(fallback) || await waitForStaticMotifFallback(timeoutMs, signal);
    }
  }

  if (!motifReady && !motifFallbackUsed) {
    return {
      overall: "failed",
      runtimeReady,
      fontReady,
      fontFallbackUsed,
      motifReady,
      motifFallbackUsed,
      errorDetail: "The S01 motif and its static fallback are unavailable.",
      fixtureMode: fixture,
    };
  }

  // Determine overall tier
  let overall: CriticalReadinessTier = "ready";
  if (fontFallbackUsed || motifFallbackUsed) {
    overall = "degraded";
  }

  return {
    overall,
    runtimeReady,
    fontReady,
    fontFallbackUsed,
    motifReady,
    motifFallbackUsed,
    errorDetail: null,
    fixtureMode: fixture,
  };
}
