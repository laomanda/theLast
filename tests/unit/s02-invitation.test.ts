import { describe, expect, it } from "vitest";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => { resolve = done; });
  return { promise, resolve };
}

describe("S02 invitation semantic contract", () => {
  it("requires readiness before explicit Open and records the user gesture", async () => {
    const runtime = createExperienceRuntime();
    expect((await runtime.dispatch({ type: "OPEN_INVITATION" })).status).toBe("rejected");
    await runtime.dispatch({ type: "SHELL_READY" });

    const result = await runtime.dispatch({ type: "OPEN_INVITATION" });
    expect(result).toMatchObject({ status: "committed", target: "S03" });
    expect(runtime.getState()).toMatchObject({ scene: "S03", audio: { userGestureObserved: true, playbackUnlocked: false } });
  });

  it("rejects rapid duplicate Open while the accepted preparation is in flight", async () => {
    const held = deferred();
    const runtime = createExperienceRuntime({ prepare: async (event) => {
      if (event.type === "OPEN_INVITATION") await held.promise;
    } });
    await runtime.dispatch({ type: "SHELL_READY" });

    const first = runtime.dispatch({ type: "OPEN_INVITATION" });
    const duplicate = await runtime.dispatch({ type: "OPEN_INVITATION" });
    expect(duplicate).toMatchObject({ status: "rejected", reason: "TRANSITION_IN_FLIGHT" });
    expect(runtime.getState().scene).toBe("S02");

    held.resolve();
    expect((await first).status).toBe("committed");
    expect(runtime.getState().scene).toBe("S03");
  });

  it("cancels an interrupted Open without committing S03", async () => {
    const held = deferred();
    const runtime = createExperienceRuntime({ prepare: async (event) => {
      if (event.type === "OPEN_INVITATION") await held.promise;
    } });
    await runtime.dispatch({ type: "SHELL_READY" });
    const pending = runtime.dispatch({ type: "OPEN_INVITATION" });

    expect(runtime.cancel()).toBe(true);
    held.resolve();
    expect((await pending).status).toBe("cancelled");
    expect(runtime.getState()).toMatchObject({ scene: "S02", lifecycle: "active", transition: { activeId: null } });
  });

  it("maps implemented scenes but keeps unexpected scenes behind honest boundaries", () => {
    expect(scenePresentationKind("S03")).toBe("s03");
    expect(scenePresentationKind("S04")).toBe("s04");
    expect(scenePresentationKind("unexpected")).toBe("runtime-boundary");
  });
});
