import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";
import { S12_CONTENT } from "../../src/ui/s12/s12-content";

async function reachS12() {
  const runtime = createExperienceRuntime();
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "FINISH_CAKE", configuration: runtime.getState().cake.draft });
  await runtime.dispatch({ type: "EXTINGUISH_WISH" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "COMPLETE_BIRTHDAY" });
  await runtime.dispatch({ type: "ARM_HIDDEN_PORTAL" });
  await runtime.dispatch({ type: "COMMIT_HIDDEN_PORTAL" });
  await runtime.dispatch({ type: "HIDDEN_SPACE_READY" });
  await runtime.dispatch({ type: "VAULT_READY" });
  await runtime.dispatch({ type: "SUBMIT_VAULT_PIN", pin: "011007" });
  await runtime.dispatch({ type: "BEGIN_VAULT_OPENING" });
  await runtime.dispatch({ type: "COMPLETE_VAULT_OPENING" });
  await runtime.dispatch({ type: "OPEN_LETTER" });
  return runtime;
}

describe("S12 final optional scene", () => {
  it("maps S12 to its renderer without turning unknown IDs into S12", () => {
    expect(scenePresentationKind("S12")).toBe("s12");
    expect(scenePresentationKind("S13")).toBe("runtime-boundary");
    expect(scenePresentationKind("unexpected")).toBe("runtime-boundary");
  });

  it("is reachable only through OPEN_LETTER and replay returns to the canonical start", async () => {
    const runtime = await reachS12();
    expect(runtime.getState()).toMatchObject({
      scene: "S12",
      confessionVisible: true,
      vault: { status: "letterSelected", letter: "selected" },
    });
    expect(await runtime.dispatch({ type: "CONTINUE" })).toMatchObject({ status: "rejected" });
    expect(await runtime.dispatch({ type: "REPLAY" })).toMatchObject({ status: "applied", target: "S01" });
    expect(runtime.getState()).toMatchObject({ scene: "S01", confessionVisible: false, replayCount: 1 });
  });

  it("keeps unapproved personal content absent and explicitly pending", () => {
    expect(S12_CONTENT.status).toBe("CONTENT_PENDING");
    expect(S12_CONTENT.body).toBeNull();
    expect(S12_CONTENT).toMatchObject({ opening: null, paragraphs: [], closing: null, signature: null });
    const source = readFileSync(path.resolve("src/ui/s12/S12FinalLetter.tsx"), "utf8");
    expect(source).not.toContain("assets/malica.webp");
    expect(source).not.toContain("S13");
    expect(source).not.toContain('type="radio"');
    expect(source).not.toContain("setInterval");
  });
});
