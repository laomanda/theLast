import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";
import { S11_CONTENT } from "../../src/ui/s11/s11-content";

async function reachS11() {
  const runtime = createExperienceRuntime();
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
  const configuration = runtime.getState().cake.draft;
  await runtime.dispatch({ type: "FINISH_CAKE", configuration });
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
  return runtime;
}

describe("S11 physical keepsake letter", () => {
  it("uses the production S11 and S12 renderers while unexpected IDs remain honest boundaries", () => {
    expect(scenePresentationKind("S11")).toBe("s11");
    expect(scenePresentationKind("S12")).toBe("s12");
    expect(scenePresentationKind("unexpected")).toBe("runtime-boundary");
  });

  it("arrives only after the Vault reaches its safe open state and still requires OPEN_LETTER", async () => {
    const runtime = await reachS11();
    expect(runtime.getState()).toMatchObject({
      scene: "S11",
      vault: { status: "letterVisible", letter: "visible" },
      confessionVisible: false,
    });

    const result = await runtime.dispatch({ type: "OPEN_LETTER" });
    expect(result).toMatchObject({ status: "committed", target: "S12" });
    expect(runtime.getState()).toMatchObject({
      scene: "S12",
      vault: { status: "letterSelected", letter: "selected" },
      confessionVisible: true,
    });
    expect(await runtime.dispatch({ type: "OPEN_LETTER" })).toMatchObject({ status: "rejected" });
  });

  it("keeps personal content pending and out of the S11 implementation", () => {
    expect(S11_CONTENT.status).toBe("CONTENT_PENDING");
    expect(Object.keys(S11_CONTENT)).not.toContain("letterBody");
    expect(Object.keys(S11_CONTENT)).not.toContain("confession");
    const source = readFileSync(path.resolve("src/ui/s11/S11PhysicalLetter.tsx"), "utf8");
    expect(source).not.toContain("assets/malica.webp");
    expect(source).not.toContain("letter-content");
  });
});

