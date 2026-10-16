import { describe, expect, it } from "vitest";
import {
  SCENE_IDS,
  sameCakeConfiguration,
  type CakeConfiguration,
  type RuntimeEvent,
  type SceneId,
} from "../../src/runtime/contracts";
import {
  CANONICAL_TRANSITION_GRAPH,
  canHandleEvent,
  canonicalTarget,
  hasS05S06CakeContinuity,
  validateVaultPin,
} from "../../src/runtime/guards";
import {
  createExperienceRuntime,
  type ExperienceRuntime,
} from "../../src/state/experience-store";

const cake: CakeConfiguration = {
  frosting: "ivory",
  candles: ["tall"],
  flowers: ["small-flower"],
  topper: "star",
  accents: ["pearl"],
  placements: { flower: "left", topper: "center" },
};

function deferred<T = void>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function makeRuntime(
  prepare?: (event: RuntimeEvent, target: SceneId | null, signal: AbortSignal) => Promise<void>,
) {
  return createExperienceRuntime({ prepare });
}

async function reachScene05(runtime: ExperienceRuntime) {
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
}

async function reachScene08(runtime: ExperienceRuntime) {
  await reachScene05(runtime);
  await runtime.dispatch({ type: "FINISH_CAKE", configuration: cake });
  await runtime.dispatch({ type: "EXTINGUISH_WISH" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
  expect(runtime.getState().scene).toBe("S08");
}

async function reachScene10(runtime: ExperienceRuntime) {
  await reachScene08(runtime);
  await runtime.dispatch({ type: "COMPLETE_BIRTHDAY" });
  await runtime.dispatch({ type: "ARM_HIDDEN_PORTAL" });
  await runtime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" });
  await runtime.dispatch({ type: "HIDDEN_SPACE_READY" });
  await runtime.dispatch({ type: "VAULT_READY" });
}

describe("authoritative runtime foundation", () => {
  it("defines exactly twelve canonical scenes and a non-discoverable initial portal", () => {
    const runtime = makeRuntime();
    expect(SCENE_IDS).toEqual(["S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10", "S11", "S12"]);
    expect(runtime.getState()).toMatchObject({ scene: "S01", lifecycle: "active", hiddenPortal: "unavailable" });
  });

  it("uses readiness for S01 to S02 and explicit invitation intent for S02 to S03", async () => {
    const runtime = makeRuntime();
    expect((await runtime.dispatch({ type: "OPEN_INVITATION" })).status).toBe("rejected");
    const ready = await runtime.dispatch({ type: "SHELL_DEGRADED_READY" });
    expect(ready).toMatchObject({ status: "committed", target: "S02" });
    expect(runtime.getState().scene).toBe("S02");
    const opened = await runtime.dispatch({ type: "OPEN_INVITATION" });
    expect(opened).toMatchObject({ status: "committed", target: "S03" });
    expect(runtime.getState().scene).toBe("S03");
    expect(runtime.getState().audio).toMatchObject({ userGestureObserved: true, playbackUnlocked: false });
  });

  it("does not expose mutation APIs or permit direct confession mutation", async () => {
    const runtime = makeRuntime();
    expect("applyEvent" in runtime).toBe(false);
    expect("setState" in runtime).toBe(false);
    expect("commitTransition" in runtime).toBe(false);
    expect(Reflect.set(runtime.getState(), "confessionVisible", true)).toBe(false);
    expect(runtime.getState().confessionVisible).toBe(false);
    expect((await runtime.dispatch({ type: "OPEN_LETTER" })).status).toBe("rejected");
    expect(runtime.getState().scene).toBe("S01");
  });

  it("rejects an invalid Cake before transition preparation", async () => {
    let prepareCalls = 0;
    const runtime = makeRuntime(async () => { prepareCalls += 1; });
    await reachScene05(runtime);
    const beforeCalls = prepareCalls;
    const result = await runtime.dispatch({ type: "FINISH_CAKE", configuration: { ...cake, frosting: "  " } });
    expect(result).toMatchObject({ status: "rejected", reason: "INVALID_CAKE_CONFIGURATION" });
    expect(prepareCalls).toBe(beforeCalls);
    expect(runtime.getState()).toMatchObject({ scene: "S05", cake: { lifecycle: "draft", finalized: null } });
  });

  it("commits Cake once, matches the requested target, and preserves S05 to S06 continuity", async () => {
    const runtime = makeRuntime();
    await reachScene05(runtime);
    const result = await runtime.dispatch({ type: "FINISH_CAKE", configuration: cake });
    expect(result).toMatchObject({ status: "committed", target: "S06" });
    expect(runtime.getState().scene).toBe(result.target);
    expect(runtime.getState().cake.finalizedVersion).toBe(1);
    expect(hasS05S06CakeContinuity(runtime.getState())).toBe(true);
    expect((await runtime.dispatch({ type: "FINISH_CAKE", configuration: cake })).status).toBe("rejected");
    expect(runtime.getState().cake.finalizedVersion).toBe(1);
  });

  it("commits the immutable Cake snapshot captured before async preparation", async () => {
    const held = deferred();
    const runtime = makeRuntime((event) => event.type === "FINISH_CAKE" ? held.promise : Promise.resolve());
    await reachScene05(runtime);
    const callerOwnedCake = {
      frosting: "ivory",
      candles: ["tall"],
      flowers: ["small-flower"],
      topper: "star",
      accents: ["pearl"],
      placements: { flower: "left", topper: "center" },
    };
    const transition = runtime.dispatch({ type: "FINISH_CAKE", configuration: callerOwnedCake });
    callerOwnedCake.frosting = "mutated-after-dispatch";
    callerOwnedCake.candles.push("extra");
    callerOwnedCake.placements.flower = "right";
    held.resolve();
    expect((await transition).status).toBe("committed");
    expect(runtime.getState().cake.finalized).toEqual(cake);
    expect(runtime.getState().wish.cakeConfiguration).toEqual(cake);
  });

  it("rejects malformed runtime Cake payloads without throwing", async () => {
    const runtime = makeRuntime();
    await reachScene05(runtime);
    const result = await runtime.dispatch({ type: "FINISH_CAKE", configuration: { frosting: null } });
    expect(result).toMatchObject({ status: "rejected", event: { type: "INVALID_EVENT" }, reason: "MALFORMED_EVENT" });
    expect(runtime.getState()).toMatchObject({ scene: "S05", cake: { lifecycle: "draft", finalized: null } });
  });

  it("compares Cake placement records independently of property insertion order", () => {
    const reordered: CakeConfiguration = {
      ...cake,
      placements: { topper: "center", flower: "left" },
    };
    expect(sameCakeConfiguration(cake, reordered)).toBe(true);
  });

  it("rejects duplicate requests and repeated cancellation", async () => {
    const held = deferred();
    const runtime = makeRuntime(() => held.promise);
    const first = runtime.dispatch({ type: "SHELL_READY" });
    expect((await runtime.dispatch({ type: "SHELL_READY" })).reason).toBe("TRANSITION_IN_FLIGHT");
    expect(runtime.cancel()).toBe(true);
    expect(runtime.cancel()).toBe(false);
    held.resolve();
    expect((await first).status).toBe("cancelled");
    expect(runtime.getState()).toMatchObject({ scene: "S01", lifecycle: "active", transition: { activeId: null } });
  });

  it("prevents a cancelled resolving promise from affecting a newer transition", async () => {
    const old = deferred();
    let call = 0;
    const runtime = makeRuntime(() => (++call === 1 ? old.promise : Promise.resolve()));
    const first = runtime.dispatch({ type: "SHELL_READY" });
    runtime.cancel();
    const newer = await runtime.dispatch({ type: "SHELL_READY" });
    expect(newer.status).toBe("committed");
    old.resolve();
    expect((await first).status).toBe("cancelled");
    expect(runtime.getState()).toMatchObject({ scene: "S02", lifecycle: "active", transition: { status: "idle", activeId: null } });
  });

  it("prevents a cancelled rejecting promise from corrupting a newer transition", async () => {
    const old = deferred();
    let call = 0;
    const runtime = makeRuntime(() => (++call === 1 ? old.promise : Promise.resolve()));
    const first = runtime.dispatch({ type: "SHELL_READY" });
    runtime.cancel();
    await runtime.dispatch({ type: "SHELL_READY" });
    old.reject(new Error("late failure"));
    expect((await first).status).toBe("cancelled");
    expect(runtime.getState()).toMatchObject({ scene: "S02", lifecycle: "active", transition: { status: "idle", error: null } });
  });

  it("invalidates pending work when replay occurs", async () => {
    const old = deferred();
    const runtime = makeRuntime(() => old.promise);
    const pending = runtime.dispatch({ type: "SHELL_READY" });
    const replay = await runtime.dispatch({ type: "REPLAY" });
    expect(replay).toMatchObject({ status: "applied", target: "S01" });
    old.resolve();
    expect((await pending).status).toBe("cancelled");
    expect(runtime.getState()).toMatchObject({ scene: "S01", replayCount: 1, transition: { status: "idle", activeId: null } });
  });

  it("recovers from preparation failure and clears the old error on retry", async () => {
    let call = 0;
    const runtime = makeRuntime(async () => {
      if (++call === 1) throw new Error("preload unavailable");
    });
    const failed = await runtime.dispatch({ type: "SHELL_READY" });
    expect(failed).toMatchObject({ status: "failed", error: { code: "TRANSITION_PREPARATION_FAILED", recoverable: true } });
    expect(runtime.getState()).toMatchObject({ scene: "S01", lifecycle: "active", transition: { status: "failed", activeId: null } });
    const retry = await runtime.dispatch({ type: "SHELL_READY" });
    expect(retry.status).toBe("committed");
    expect(runtime.getState()).toMatchObject({ scene: "S02", transition: { status: "idle", activeId: null, error: null } });
  });

  it("creates independent stores with independent subscribers", async () => {
    const first = makeRuntime();
    const second = makeRuntime();
    let firstUpdates = 0;
    let secondUpdates = 0;
    const stopFirst = first.subscribe(() => { firstUpdates += 1; });
    const stopSecond = second.subscribe(() => { secondUpdates += 1; });
    await first.dispatch({ type: "SHELL_READY" });
    expect(first.getState().scene).toBe("S02");
    expect(second.getState().scene).toBe("S01");
    expect(firstUpdates).toBeGreaterThan(0);
    expect(secondUpdates).toBe(0);
    stopFirst();
    stopSecond();
  });

  it("keeps S08 birthday completion independent and requires separate portal consent", async () => {
    const runtime = makeRuntime();
    await reachScene08(runtime);
    expect(runtime.getState()).toMatchObject({ birthdayComplete: false, hiddenPortal: "unavailable", scene: "S08" });
    expect((await runtime.dispatch({ type: "ARM_HIDDEN_PORTAL" })).status).toBe("rejected");
    await runtime.dispatch({ type: "COMPLETE_BIRTHDAY" });
    expect(runtime.getState()).toMatchObject({ birthdayComplete: true, hiddenPortal: "discoverable", scene: "S08" });
    expect((await runtime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" })).reason).toBe("PORTAL_NOT_ARMED");
    await runtime.dispatch({ type: "ARM_HIDDEN_PORTAL" });
    expect((await runtime.dispatch({ type: "PASSIVE_SCROLL" })).reason).toBe("PASSIVE_EVENT_REJECTED");
    await runtime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" });
    expect(runtime.getState()).toMatchObject({ scene: "S09", hiddenPortal: "committed", birthdayComplete: true });
  });

  it("keeps PIN, door, letter visibility, selection, and confession separate", async () => {
    const runtime = makeRuntime();
    await reachScene10(runtime);
    expect(validateVaultPin("010107")).toBe(false);
    await runtime.dispatch({ type: "SUBMIT_VAULT_PIN", pin: "010107" });
    expect(runtime.getState()).toMatchObject({ scene: "S10", vault: { status: "pinRejected", letter: "unavailable" }, confessionVisible: false });
    await runtime.dispatch({ type: "SUBMIT_VAULT_PIN", pin: "011007" });
    expect(runtime.getState()).toMatchObject({ scene: "S10", vault: { status: "pinAccepted", letter: "unavailable" }, confessionVisible: false });
    await runtime.dispatch({ type: "BEGIN_VAULT_OPENING" });
    expect(runtime.getState()).toMatchObject({ scene: "S10", vault: { status: "doorOpening", letter: "unavailable" } });
    await runtime.dispatch({ type: "COMPLETE_VAULT_OPENING" });
    expect(runtime.getState()).toMatchObject({ scene: "S11", vault: { status: "letterVisible", letter: "visible" }, confessionVisible: false });
    await runtime.dispatch({ type: "OPEN_LETTER" });
    expect(runtime.getState()).toMatchObject({ scene: "S12", vault: { status: "letterSelected", letter: "selected" }, confessionVisible: true });
  });

  it("does not let reduced motion alter narrative authorization", async () => {
    const normal = makeRuntime();
    const reduced = makeRuntime();
    await reduced.dispatch({ type: "SET_MOTION_PREFERENCE", preference: "reduced" });
    const normalRejected = await normal.dispatch({ type: "OPEN_INVITATION" });
    const reducedRejected = await reduced.dispatch({ type: "OPEN_INVITATION" });
    expect(reducedRejected).toEqual(normalRejected);
    await normal.dispatch({ type: "SHELL_READY" });
    await reduced.dispatch({ type: "SHELL_READY" });
    expect((await normal.dispatch({ type: "OPEN_INVITATION" })).status).toBe("committed");
    expect((await reduced.dispatch({ type: "OPEN_INVITATION" })).status).toBe("committed");
    expect(reduced.getState().capability.motion).toBe("reduced");
  });

  it("requires a semantic wish completion before leaving S06", async () => {
    const runtime = makeRuntime();
    await reachScene05(runtime);
    await runtime.dispatch({ type: "FINISH_CAKE", configuration: cake });
    expect((await runtime.dispatch({ type: "CONTINUE" })).reason).toBe("WISH_NOT_EXTINGUISHED");
    await runtime.dispatch({ type: "EXTINGUISH_WISH" });
    expect((await runtime.dispatch({ type: "EXTINGUISH_WISH" })).status).toBe("rejected");
    expect(runtime.getState().wish.extinguishCount).toBe(1);
  });

  it("keeps guard behavior independently testable", () => {
    const runtime = makeRuntime();
    expect(canHandleEvent(runtime.getState(), { type: "PASSIVE_SCROLL" })).toEqual({ accepted: false, reason: "PASSIVE_EVENT_REJECTED" });
    expect(canonicalTarget("S01", "SHELL_READY")).toBe("S02");
    expect(canonicalTarget("S01", "SHELL_DEGRADED_READY")).toBe("S02");
    expect(canonicalTarget("S02", "OPEN_INVITATION")).toBe("S03");
    expect(CANONICAL_TRANSITION_GRAPH).toHaveLength(12);
  });
});
