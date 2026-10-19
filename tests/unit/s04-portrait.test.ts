import { describe, expect, it } from "vitest";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";
import { S04_CTA_LABEL, S04_PHOTO_PATH, S04_RECIPIENT_NAME } from "../../src/ui/s04/S04Portrait";

async function reachS04(runtime: ReturnType<typeof createExperienceRuntime>) {
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" });
}

describe("S04 single portrait contract", () => {
  it("locks the authorized public presentation constants", () => {
    expect(S04_RECIPIENT_NAME).toBe("Malica Yohana Hutagaol");
    expect(S04_CTA_LABEL).toBe("Lanjut");
    expect(S04_PHOTO_PATH).toBe("/assets/photos/s04-portrait.webp");
    expect(scenePresentationKind("S04")).toBe("s04");
  });

  it("does not leave S04 without an intentional CONTINUE event", async () => {
    const runtime = createExperienceRuntime();
    await reachS04(runtime);
    expect(runtime.getState().scene).toBe("S04");
    expect(await runtime.dispatch({ type: "PASSIVE_SCROLL" })).toMatchObject({ status: "rejected" });
    expect(runtime.getState().scene).toBe("S04");
  });

  it("uses the canonical guarded edge from S04 to S05", async () => {
    const runtime = createExperienceRuntime();
    await reachS04(runtime);
    expect(await runtime.dispatch({ type: "CONTINUE" })).toMatchObject({ status: "committed", target: "S05" });
    expect(runtime.getState().scene).toBe("S05");
  });
});
