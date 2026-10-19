import { describe, expect, it } from "vitest";
import { createExperienceRuntime } from "../../src/state/experience-store";
import {
  S03_CTA_LABEL,
  S03_FULL_GREETING,
  S03_RECIPIENT_NAME,
} from "../../src/ui/s03/S03BirthdayReveal";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => { resolve = done; });
  return { promise, resolve };
}

async function reachS03(runtime: ReturnType<typeof createExperienceRuntime>) {
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
}

describe("S03 birthday reveal contract", () => {
  it("locks the approved recipient, greeting, and CTA copy", () => {
    expect(S03_RECIPIENT_NAME).toBe("Malica Yohana Hutagaol");
    expect(S03_FULL_GREETING).toBe("Happy Birthday, Malica Yohana Hutagaol.");
    expect(S03_CTA_LABEL).toBe("Lanjut");
  });

  it("renders S03 and S04 in every environment", () => {
    expect(scenePresentationKind("S03")).toBe("s03");
    expect(scenePresentationKind("S04")).toBe("s04");
  });

  it("does not advance from S03 without the canonical CONTINUE event", async () => {
    const runtime = createExperienceRuntime();
    await reachS03(runtime);
    expect(runtime.getState().scene).toBe("S03");
    await Promise.resolve();
    expect(runtime.getState().scene).toBe("S03");
    expect(await runtime.dispatch({ type: "PASSIVE_SCROLL" })).toMatchObject({ status: "rejected" });
    expect(runtime.getState().scene).toBe("S03");
  });

  it("uses CONTINUE once and rejects a rapid duplicate while preparation is in flight", async () => {
    const held = deferred();
    const runtime = createExperienceRuntime({
      prepare: async (event) => {
        if (event.type === "CONTINUE") await held.promise;
      },
    });
    await reachS03(runtime);

    const first = runtime.dispatch({ type: "CONTINUE" });
    const duplicate = await runtime.dispatch({ type: "CONTINUE" });
    expect(duplicate).toMatchObject({ status: "rejected", reason: "TRANSITION_IN_FLIGHT" });
    expect(runtime.getState().scene).toBe("S03");

    held.resolve();
    expect(await first).toMatchObject({ status: "committed", target: "S04" });
    expect(runtime.getState().scene).toBe("S04");
  });

  it("recovers at S03 when CONTINUE preparation fails", async () => {
    const runtime = createExperienceRuntime({
      prepare: async (event) => {
        if (event.type === "CONTINUE") throw new Error("handoff unavailable");
      },
    });
    await reachS03(runtime);
    const result = await runtime.dispatch({ type: "CONTINUE" });
    expect(result).toMatchObject({ status: "failed", target: "S04" });
    expect(runtime.getState()).toMatchObject({ scene: "S03", lifecycle: "active", transition: { activeId: null } });
  });
});
