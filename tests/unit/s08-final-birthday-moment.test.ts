import { describe, expect, it } from "vitest";
import { canHandleEvent } from "../../src/runtime/guards";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";
import { S08_CONTENT, S08_CONTENT_STATUS } from "../../src/ui/s08/s08-content";
import { applyCakeOption } from "../../src/cake/configuration";
import { readFileSync } from "node:fs";
import path from "node:path";

async function reachS08(runtime: ReturnType<typeof createExperienceRuntime>) {
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
  const cake = applyCakeOption(runtime.getState().cake.draft, "candles", "candles-five")!;
  await runtime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: cake });
  await runtime.dispatch({ type: "FINISH_CAKE", configuration: cake });
  await runtime.dispatch({ type: "EXTINGUISH_WISH" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
}

describe("S08 Final Birthday Moment", () => {
  it("presents S08 instead of an unimplemented runtime boundary", () => {
    expect(scenePresentationKind("S08")).toBe("s08");
    expect(scenePresentationKind("S09")).toBe("s09");
  });

  it("reaches the final birthday moment through the guarded S07 continuation", async () => {
    const runtime = createExperienceRuntime();
    await reachS08(runtime);
    expect(runtime.getState()).toMatchObject({ scene: "S08", birthdayComplete: false, hiddenPortal: "unavailable" });
  });

  it("completes the birthday exactly once and exposes the optional discovery state without navigation", async () => {
    const runtime = createExperienceRuntime();
    await reachS08(runtime);
    expect(canHandleEvent(runtime.getState(), { type: "COMPLETE_BIRTHDAY" })).toMatchObject({ accepted: true, target: null });
    expect(await runtime.dispatch({ type: "COMPLETE_BIRTHDAY" })).toMatchObject({ status: "applied" });
    expect(runtime.getState()).toMatchObject({ birthdayComplete: true, hiddenPortal: "discoverable" });
    expect(await runtime.dispatch({ type: "COMPLETE_BIRTHDAY" })).toMatchObject({ status: "rejected", reason: "EVENT_NOT_APPLICABLE" });
    expect(runtime.getState().scene).toBe("S08");
  });

  it("rejects passive and premature hidden events, preserving a complete S08 ending", async () => {
    const runtime = createExperienceRuntime();
    await reachS08(runtime);
    expect(await runtime.dispatch({ type: "PASSIVE_SCROLL" })).toMatchObject({ status: "rejected", reason: "PASSIVE_EVENT_REJECTED" });
    expect(await runtime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" })).toMatchObject({ status: "rejected", reason: "PORTAL_NOT_ARMED" });
    expect(runtime.getState().scene).toBe("S08");
  });

  it("keeps S08 personal closing text explicitly pending", () => {
    expect(S08_CONTENT_STATUS).toBe("CONTENT_PENDING");
    expect(S08_CONTENT.status).toBe("CONTENT_PENDING");
  });

  it("keeps the optional arm genuinely discoverable and gives End a real local state", () => {
    const source = readFileSync(path.resolve("src/ui/s08/S08FinalBirthdayMoment.tsx"), "utf8");
    expect(source).toContain("Temukan lapisan lain");
    expect(source).toContain('data-testid="s08-ended"');
    expect(source).not.toContain("window.scrollTo");
  });
});
