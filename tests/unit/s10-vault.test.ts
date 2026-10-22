import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";
import { validateVaultPin } from "../../src/runtime/guards";
import { VAULT_V2_INTEGRATION_CANDIDATE } from "../../src/assets/authorization/vault-v2";

describe("S10 Quiet Keepsake Vault", () => {
  it("uses the production S10 presentation and preserves the unknown-scene boundary", () => {
    expect(scenePresentationKind("S10")).toBe("s10");
    expect(scenePresentationKind("S11")).toBe("s11");
    expect(scenePresentationKind("unexpected")).toBe("runtime-boundary");
  });

  it("keeps the narrative PIN as a leading-zero string", () => {
    expect(validateVaultPin("011007")).toBe(true);
    expect(validateVaultPin("11007")).toBe(false);
    expect(validateVaultPin("010107")).toBe(false);
  });

  it("keeps the deployed Vault byte-identical to the approved candidate", () => {
    const deployedPath = path.resolve("public/assets/vault/vault-final.glb");
    const deployedHash = createHash("sha256").update(readFileSync(deployedPath)).digest("hex");
    expect(VAULT_V2_INTEGRATION_CANDIDATE.publicPath).toBe("/assets/vault/vault-final.glb");
    expect(deployedHash).toBe(VAULT_V2_INTEGRATION_CANDIDATE.sha256);
  });

  it("keeps the approved hinge contract and a truthful fallback completion path", () => {
    const source = readFileSync(path.resolve("src/ui/s10/S10Vault.tsx"), "utf8");
    expect(source).toContain('getObjectByName("Door_Hinge_Pivot")');
    expect(source).toContain("setAngleDegrees(92)");
    expect(source).toContain('data-renderer-mode={fallback ? "fallback"');
    expect(source).toContain("if (fallback) setOpened(true)");
    expect(source).toContain("Representasi sederhana Vault");
    expect(source).toContain('type: "BACK_TO_S09"');
    expect(source).toContain('data-testid="s10-back"');
  });
});
