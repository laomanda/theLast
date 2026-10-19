import { describe, expect, it } from "vitest";
import {
  CAKE_ACCENT_OPTIONS,
  CAKE_CANDLE_OPTIONS,
  CAKE_FLOWER_OPTIONS,
  CAKE_FROSTING_OPTIONS,
  CAKE_TOPPER_OPTIONS,
  S05_DEFAULT_CAKE_CONFIGURATION,
  applyCakeOption,
  isSupportedCakeConfiguration,
} from "../../src/cake/configuration";
import { sameCakeConfiguration } from "../../src/runtime/contracts";
import { hasS05S06CakeContinuity } from "../../src/runtime/guards";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";

async function reachS05(runtime: ReturnType<typeof createExperienceRuntime>) {
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
}

describe("S05 Cake Studio", () => {
  it("renders S05 and hands the finalized cake to the S06 renderer", () => {
    expect(scenePresentationKind("S05")).toBe("s05");
    expect(scenePresentationKind("S06")).toBe("s06");
  });

  it("defines a valid curated default and deliberate choices for every locked family", () => {
    expect(isSupportedCakeConfiguration(S05_DEFAULT_CAKE_CONFIGURATION)).toBe(true);
    expect([CAKE_FROSTING_OPTIONS, CAKE_CANDLE_OPTIONS, CAKE_FLOWER_OPTIONS, CAKE_TOPPER_OPTIONS, CAKE_ACCENT_OPTIONS].map((values) => values.length)).toEqual([2, 2, 2, 2, 3]);
  });

  it("applies every supported category and rejects unknown values", () => {
    let configuration = S05_DEFAULT_CAKE_CONFIGURATION;
    for (const [category, option] of [
      ["frosting", "cfg-B-periwinkle-warm"],
      ["candles", "candles-five"],
      ["flowers", "flowers-none"],
      ["topper", "topper-loop"],
      ["accents", "accent-ribbon"],
    ] as const) {
      const next = applyCakeOption(configuration, category, option);
      expect(next).not.toBeNull();
      configuration = next!;
    }
    expect(configuration).toMatchObject({
      frosting: "cfg-B-periwinkle-warm",
      candles: expect.arrayContaining(["candle-outer-left", "candle-outer-right"]),
      flowers: [],
      topper: "topper-loop",
      accents: ["accent-ribbon"],
    });
    expect(isSupportedCakeConfiguration(configuration)).toBe(true);
    expect(applyCakeOption(configuration, "frosting", "unauthorized")).toBeNull();
  });

  it("stores edits in authoritative state, supports undo, and resets with history", async () => {
    const runtime = createExperienceRuntime();
    await reachS05(runtime);
    const cool = applyCakeOption(runtime.getState().cake.draft, "frosting", "cfg-B-periwinkle-warm")!;
    expect(await runtime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: cool })).toMatchObject({ status: "applied" });
    expect(runtime.getState().cake).toMatchObject({ draft: { frosting: "cfg-B-periwinkle-warm" } });
    expect(runtime.getState().cake.history).toHaveLength(1);
    expect(await runtime.dispatch({ type: "UNDO_CAKE_DRAFT" })).toMatchObject({ status: "applied" });
    expect(sameCakeConfiguration(runtime.getState().cake.draft, S05_DEFAULT_CAKE_CONFIGURATION)).toBe(true);

    await runtime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: cool });
    expect(await runtime.dispatch({ type: "RESET_CAKE_DRAFT" })).toMatchObject({ status: "applied" });
    expect(sameCakeConfiguration(runtime.getState().cake.draft, S05_DEFAULT_CAKE_CONFIGURATION)).toBe(true);
    expect(runtime.getState().cake.history.length).toBeGreaterThan(0);
  });

  it("rejects forged values without mutating draft", async () => {
    const runtime = createExperienceRuntime();
    await reachS05(runtime);
    const before = runtime.getState().cake.draft;
    const forged = { ...before, frosting: "neon-unauthorized" };
    expect(await runtime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: forged })).toMatchObject({ status: "rejected", reason: "INVALID_CAKE_CONFIGURATION" });
    expect(runtime.getState().cake.draft).toBe(before);
  });

  it("freezes exactly one validated snapshot for S06 continuity", async () => {
    const runtime = createExperienceRuntime();
    await reachS05(runtime);
    const customized = applyCakeOption(
      applyCakeOption(runtime.getState().cake.draft, "candles", "candles-five")!,
      "topper",
      "topper-loop",
    )!;
    await runtime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: customized });
    const result = await runtime.dispatch({ type: "FINISH_CAKE", configuration: runtime.getState().cake.draft });
    expect(result).toMatchObject({ status: "committed", target: "S06" });
    expect(hasS05S06CakeContinuity(runtime.getState())).toBe(true);
    expect(runtime.getState().cake.finalizedVersion).toBe(1);
    expect((await runtime.dispatch({ type: "FINISH_CAKE", configuration: customized })).status).toBe("rejected");
  });
});
