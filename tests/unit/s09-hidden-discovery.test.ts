import { describe, expect, it } from "vitest";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";
import { applyCakeOption } from "../../src/cake/configuration";

async function reachS08(runtime: ReturnType<typeof createExperienceRuntime>) {
  await runtime.dispatch({ type: "SHELL_READY" }); await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" }); await runtime.dispatch({ type: "CONTINUE" });
  const cake = applyCakeOption(runtime.getState().cake.draft, "candles", "candles-five")!;
  await runtime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: cake }); await runtime.dispatch({ type: "FINISH_CAKE", configuration: cake });
  await runtime.dispatch({ type: "EXTINGUISH_WISH" }); await runtime.dispatch({ type: "CONTINUE" }); await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "COMPLETE_BIRTHDAY" });
}
describe("S09 Hidden Discovery", () => {
  it("maps S09 and S10 to production presentations while unknown scenes remain a boundary", () => { expect(scenePresentationKind("S09")).toBe("s09"); expect(scenePresentationKind("S10")).toBe("s10"); expect(scenePresentationKind("unexpected")).toBe("runtime-boundary"); });
  it("requires complete birthday then arm then commit, and reaches the honest S10 boundary", async () => {
    const runtime = createExperienceRuntime(); await reachS08(runtime);
    expect(await runtime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" })).toMatchObject({ status: "rejected", reason: "PORTAL_NOT_ARMED" });
    expect(await runtime.dispatch({ type: "ARM_HIDDEN_PORTAL" })).toMatchObject({ status: "applied" });
    expect(await runtime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" })).toMatchObject({ status: "committed", target: "S09" });
    expect(await runtime.dispatch({ type: "HIDDEN_SPACE_READY" })).toMatchObject({ status: "committed", target: "S10" });
  });
});
