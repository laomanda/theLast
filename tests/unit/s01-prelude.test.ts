import { describe, expect, it } from "vitest";
import { evaluateCriticalReadiness, getControlledReadinessFixtureMode } from "../../src/ui/s01/readiness";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { canHandleEvent } from "../../src/runtime/guards";

describe("S01 Prelude and Readiness Contracts", () => {
  it("initializes runtime at scene S01 with active lifecycle", () => {
    const runtime = createExperienceRuntime();
    const state = runtime.getState();

    expect(state.scene).toBe("S01");
    expect(state.lifecycle).toBe("active");
    expect(state.birthdayComplete).toBe(false);
  });

  it("evaluates critical readiness as ready in standard environment", async () => {
    const report = await evaluateCriticalReadiness();

    expect(report.runtimeReady).toBe(true);
    expect(["ready", "degraded"]).toContain(report.overall);
    expect(report.errorDetail).toBeNull();
  });

  it("does not enable a browser fixture outside an injected browser context", () => {
    expect(getControlledReadinessFixtureMode()).toBeNull();
  });

  it("does not report degraded readiness when no static SVG fallback is mounted", async () => {
    const report = await evaluateCriticalReadiness({ fixtureOverride: "degraded" });

    expect(report.overall).toBe("failed");
    expect(report.motifFallbackUsed).toBe(false);
    expect(report.errorDetail).toContain("static fallback");
  });

  it("reports failed overall status when critical readiness fails", async () => {
    const report = await evaluateCriticalReadiness({ fixtureOverride: "fail" });

    expect(report.overall).toBe("failed");
    expect(report.errorDetail).toContain("Simulated critical readiness failure");
  });

  it("dispatches SHELL_READY and transitions from S01 to S02 exactly once", async () => {
    const runtime = createExperienceRuntime();

    expect(runtime.getState().scene).toBe("S01");

    const result = await runtime.dispatch({ type: "SHELL_READY" });
    expect(result.status).toBe("committed");
    expect(result.target).toBe("S02");
    expect(runtime.getState().scene).toBe("S02");

    // Second readiness dispatch should be rejected because state is now S02
    const secondResult = await runtime.dispatch({ type: "SHELL_READY" });
    expect(secondResult.status).toBe("rejected");
    expect(runtime.getState().scene).toBe("S02");
  });

  it("dispatches SHELL_DEGRADED_READY and transitions safely to S02", async () => {
    const runtime = createExperienceRuntime();

    expect(runtime.getState().scene).toBe("S01");

    const result = await runtime.dispatch({ type: "SHELL_DEGRADED_READY" });
    expect(result.status).toBe("committed");
    expect(result.target).toBe("S02");
    expect(runtime.getState().scene).toBe("S02");
  });

  it("strictly forbids OPEN_INVITATION while in S01", async () => {
    const runtime = createExperienceRuntime();
    expect(runtime.getState().scene).toBe("S01");

    const guard = canHandleEvent(runtime.getState(), { type: "OPEN_INVITATION" });
    expect(guard.accepted).toBe(false);
    if (!guard.accepted) {
      expect(guard.reason).toBe("EXPLICIT_INTENT_REQUIRED");
    }

    const result = await runtime.dispatch({ type: "OPEN_INVITATION" });
    expect(result.status).toBe("rejected");
    expect(runtime.getState().scene).toBe("S01");
  });

  it("strictly rejects passive scroll in S01", async () => {
    const runtime = createExperienceRuntime();

    const guard = canHandleEvent(runtime.getState(), { type: "PASSIVE_SCROLL" });
    expect(guard.accepted).toBe(false);
    if (!guard.accepted) {
      expect(guard.reason).toBe("PASSIVE_EVENT_REJECTED");
    }

    const result = await runtime.dispatch({ type: "PASSIVE_SCROLL" });
    expect(result.status).toBe("rejected");
    expect(runtime.getState().scene).toBe("S01");
  });

  it("allows recovering from failure and completing readiness on retry", async () => {
    const runtime = createExperienceRuntime();

    // 1. Initial simulated failure
    const failedReport = await evaluateCriticalReadiness({ fixtureOverride: "fail" });
    expect(failedReport.overall).toBe("failed");
    expect(runtime.getState().scene).toBe("S01");

    // 2. Recovery / retry without failure condition
    const recoveredReport = await evaluateCriticalReadiness({ fixtureOverride: null });
    expect(["ready", "degraded"]).toContain(recoveredReport.overall);

    const eventType = recoveredReport.overall === "ready" ? "SHELL_READY" : "SHELL_DEGRADED_READY";
    const result = await runtime.dispatch({ type: eventType });
    expect(result.status).toBe("committed");
    expect(runtime.getState().scene).toBe("S02");
  });

  it("supports reduced-motion preference without affecting narrative transition", async () => {
    const runtime = createExperienceRuntime();

    const motionResult = await runtime.dispatch({ type: "SET_MOTION_PREFERENCE", preference: "reduced" });
    expect(motionResult.status).toBe("applied");
    expect(runtime.getState().capability.motion).toBe("reduced");

    const result = await runtime.dispatch({ type: "SHELL_READY" });
    expect(result.status).toBe("committed");
    expect(runtime.getState().scene).toBe("S02");
    expect(runtime.getState().capability.motion).toBe("reduced");
  });
});
