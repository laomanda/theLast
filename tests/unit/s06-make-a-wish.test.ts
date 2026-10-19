import { describe, expect, it } from "vitest";
import { applyCakeOption } from "../../src/cake/configuration";
import { sameCakeConfiguration } from "../../src/runtime/contracts";
import { canHandleEvent } from "../../src/runtime/guards";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";

async function reachS06(runtime: ReturnType<typeof createExperienceRuntime>) {
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
  const custom = applyCakeOption(runtime.getState().cake.draft, "candles", "candles-five")!;
  await runtime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: custom });
  await runtime.dispatch({ type: "FINISH_CAKE", configuration: custom });
  return custom;
}

describe("S06 Make a Wish", () => {
  it("renders S06 and hands off to the S07 letter renderer", () => {
    expect(scenePresentationKind("S06")).toBe("s06");
    expect(scenePresentationKind("S07")).toBe("s07");
  });

  it("consumes the exact finalized S05 cake without mutation", async () => {
    const runtime = createExperienceRuntime();
    const customized = await reachS06(runtime);
    const state = runtime.getState();
    expect(state.scene).toBe("S06");
    expect(state.wish.status).toBe("flameOn");
    expect(sameCakeConfiguration(state.cake.finalized, customized)).toBe(true);
    expect(sameCakeConfiguration(state.wish.cakeConfiguration, customized)).toBe(true);
  });

  it("commits extinguishing once and only enables the S07 edge afterward", async () => {
    const runtime = createExperienceRuntime();
    await reachS06(runtime);
    expect(canHandleEvent(runtime.getState(), { type: "CONTINUE" })).toMatchObject({ accepted: false, reason: "WISH_NOT_EXTINGUISHED" });
    expect(await runtime.dispatch({ type: "EXTINGUISH_WISH" })).toMatchObject({ status: "applied" });
    expect(runtime.getState().wish.extinguishCount).toBe(1);
    expect(await runtime.dispatch({ type: "EXTINGUISH_WISH" })).toMatchObject({ status: "rejected", reason: "WISH_NOT_EXTINGUISHED" });
    expect(runtime.getState().wish.extinguishCount).toBe(1);
    expect(await runtime.dispatch({ type: "CONTINUE" })).toMatchObject({ status: "committed", target: "S07" });
  });

  it("cannot enter a wish from an invalid or missing finalized configuration", async () => {
    const runtime = createExperienceRuntime();
    await runtime.dispatch({ type: "SHELL_READY" });
    await runtime.dispatch({ type: "OPEN_INVITATION" });
    await runtime.dispatch({ type: "CONTINUE" });
    await runtime.dispatch({ type: "CONTINUE" });
    const forged = { ...runtime.getState().cake.draft, candles: ["unsupported"] };
    expect(await runtime.dispatch({ type: "FINISH_CAKE", configuration: forged })).toMatchObject({ status: "rejected", reason: "INVALID_CAKE_CONFIGURATION" });
    expect(runtime.getState().scene).toBe("S05");
  });
});
