import { describe, expect, it } from "vitest";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { evaluateS04PhotoReadiness } from "../../src/assets/authorization/policy";
import { createSyntheticPhoto } from "../support/asset-authorization-fixtures";
import { attestRegularFiles, listRegularFiles, safeChildPath } from "../../src/release/filesystem";
import { evaluateOwnerReleaseAuthorization, evaluateSceneCompleteness } from "../../src/release/policy";
import { verifyRequiredSvgs } from "../../src/release/svg-integrity";
import { validateCurrentRelease } from "../../src/release/validator";
import { CANONICAL_SCENE_IDS, type CanonicalSceneId } from "../../src/release/types";
import { resolveTrustedOwnerReleaseAuthorization, resolveTrustedSceneReleaseEvidence } from "../../src/release/trusted-readiness";

const root = process.cwd();
const completeRecord = (sceneId: CanonicalSceneId) => ({ sceneId, rendererPresent: true, developmentBoundary: false, readinessEvidence: "verified" as const, contentEvidence: "verified" as const, implementationEvidence: "verified" as const, assetAuthorizationEvidence: "verified" as const, sceneAcceptanceEvidence: "verified" as const, publicationAuthorizationEvidence: "verified" as const });

describe("CP-01D.2 complete release validator", () => {
  it("keeps the complete canonical scene set independent of a supplied inventory", () => {
    const checks = evaluateSceneCompleteness(CANONICAL_SCENE_IDS.filter((id) => id !== "S12").map(completeRecord));
    expect(checks).toContainEqual(expect.objectContaining({ reasonCode: "CANONICAL_SCENE_RENDERER_MISSING", affectedScene: "S12" }));
  });

  it("recognizes only a fully evidenced synthetic scene set as scene-complete", () => {
    expect(evaluateSceneCompleteness(CANONICAL_SCENE_IDS.map(completeRecord))).toEqual([]);
  });

  it("resolves production readiness only from fixed source records", () => {
    const resolved = resolveTrustedSceneReleaseEvidence();
    expect(resolved).toHaveLength(12);
    expect(resolved.find((record) => record.sceneId === "S04")).toMatchObject({ rendererPresent: true, developmentBoundary: false, assetAuthorizationEvidence: "verified", sceneAcceptanceEvidence: "missing" });
    expect(resolved.every((record) => record.publicationAuthorizationEvidence === "missing")).toBe(true);
    expect(resolveTrustedOwnerReleaseAuthorization("forged-candidate")).toBeNull();
  });

  it("rejects a development boundary even when a renderer declaration exists", () => {
    const checks = evaluateSceneCompleteness([{ ...completeRecord("S04"), developmentBoundary: true }]);
    expect(checks).toContainEqual(expect.objectContaining({ reasonCode: "CANONICAL_SCENE_DEVELOPMENT_BOUNDARY", affectedScene: "S04" }));
  });

  it("does not turn a forged releaseReady-like value into owner authorization", () => {
    expect(evaluateOwnerReleaseAuthorization(null)).toMatchObject({ status: "BLOCKED", reasonCode: "RELEASE_OWNER_APPROVAL_UNVERIFIED" });
  });

  it("rejects duplicate and malformed scene declarations", () => {
    expect(evaluateSceneCompleteness([completeRecord("S01"), completeRecord("S01")])).toContainEqual(expect.objectContaining({ reasonCode: "SCENE_EVIDENCE_CONFLICT" }));
    expect(evaluateSceneCompleteness([{ ...completeRecord("S01"), sceneId: "S99" } as never])).toContainEqual(expect.objectContaining({ reasonCode: "SCENE_EVIDENCE_MALFORMED" }));
  });

  it("requires independent implementation, asset, acceptance, and publication evidence", () => {
    const checks = evaluateSceneCompleteness([{ ...completeRecord("S01"), implementationEvidence: "missing", assetAuthorizationEvidence: "missing", sceneAcceptanceEvidence: "missing", publicationAuthorizationEvidence: "missing" }]);
    expect(checks.map((check) => check.reasonCode)).toEqual(expect.arrayContaining([
      "SCENE_IMPLEMENTATION_EVIDENCE_MISSING",
      "SCENE_ASSET_AUTHORIZATION_UNVERIFIED",
      "SCENE_ACCEPTANCE_EVIDENCE_MISSING",
      "SCENE_PUBLICATION_AUTHORIZATION_UNVERIFIED",
    ]));
  });

  it("uses the existing S04 policy for zero, one, and two approved photographs", () => {
    expect(evaluateS04PhotoReadiness([])).toMatchObject({ status: "HOLD", reasonCode: "S04_NO_APPROVED_PHOTO" });
    expect(evaluateS04PhotoReadiness([createSyntheticPhoto()])).toMatchObject({ status: "READY", approvedPhotoCount: 1 });
    expect(evaluateS04PhotoReadiness([createSyntheticPhoto(), createSyntheticPhoto({ assetId: "synthetic.photo.two" })])).toMatchObject({ status: "DENY", reasonCode: "S04_MULTIPLE_APPROVED_PHOTOS" });
  });

  it("preserves global multi-photo allocation outside the S04-specific rule", () => {
    const s05Photo = createSyntheticPhoto({ assetId: "synthetic.photo.s05", sceneAllocations: ["S05"] });
    expect(evaluateS04PhotoReadiness([createSyntheticPhoto(), s05Photo])).toMatchObject({ status: "READY", approvedPhotoCount: 1 });
  });

  it("rejects traversal and absolute child paths before filesystem inspection", () => {
    expect(safeChildPath(root, "../outside")).toBeNull();
    expect(safeChildPath(root, "C:\\outside")).toBeNull();
    expect(safeChildPath(root, "public/assets/svg")).toContain("public");
  });

  it("fails closed for symlink escape and detects generated-output mutation", () => {
    const fixtureRoot = mkdtempSync(join(tmpdir(), "release-validator-test-"));
    try {
      const output = join(fixtureRoot, "synthetic-output");
      const outside = join(fixtureRoot, "outside.js");
      mkdirSync(output);
      writeFileSync(join(output, "chunk.js"), "stable");
      writeFileSync(outside, "private-source");
      const before = attestRegularFiles(output);
      expect(before.fingerprint).toMatch(/^[a-f0-9]{64}$/);
      writeFileSync(join(output, "chunk.js"), "mutated");
      const after = attestRegularFiles(output);
      expect(after.fingerprint).not.toBe(before.fingerprint);
      try {
        symlinkSync(outside, join(output, "escape.js"), "file");
      } catch {
        return;
      }
      expect(listRegularFiles(output).unsafe).toBe(true);
      expect(attestRegularFiles(output).fingerprint).toBeNull();
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("verifies the actual fourteen approved deployed SVGs against REV5 source bytes", () => {
    const result = verifyRequiredSvgs(root);
    expect(result.manifestAssetCount).toBe(41);
    expect(result.checks.filter((check) => check.affectedAssetId?.startsWith("design.svg"))).toHaveLength(17);
    expect(result.checks.filter((check) => check.status === "FAIL")).toEqual([]);
  });

  it("returns a deterministic NOT_READY result for the real incomplete project", () => {
    const result = validateCurrentRelease(root);
    expect(result).toMatchObject({ ready: false, verdict: "NOT_READY" });
    expect(result.checks).not.toContainEqual(expect.objectContaining({ reasonCode: "S04_PHOTO_HOLD", affectedScene: "S04" }));
    expect(result.checks).toContainEqual(expect.objectContaining({ reasonCode: "SCENE_ACCEPTANCE_EVIDENCE_MISSING", affectedScene: "S04" }));
    expect(result.checks).toContainEqual(expect.objectContaining({ reasonCode: "SCENE_ACCEPTANCE_EVIDENCE_MISSING", affectedScene: "S05" }));
    expect(result.checks).toContainEqual(expect.objectContaining({ reasonCode: "SCENE_ACCEPTANCE_EVIDENCE_MISSING", affectedScene: "S07" }));
    expect(result.checks).toContainEqual(expect.objectContaining({ reasonCode: "SCENE_ACCEPTANCE_EVIDENCE_MISSING", affectedScene: "S08" }));
    expect(result.checks).toContainEqual(expect.objectContaining({ reasonCode: "SCENE_ACCEPTANCE_EVIDENCE_MISSING", affectedScene: "S09" }));
    expect(result.checks).not.toContainEqual(expect.objectContaining({ reasonCode: "CANONICAL_SCENE_RENDERER_MISSING", affectedScene: "S12" }));
    expect(result.checks).toContainEqual(expect.objectContaining({ reasonCode: "CANONICAL_SCENE_CONTENT_UNVERIFIED", affectedScene: "S12" }));
    expect(result.checks).not.toContainEqual(expect.objectContaining({ reasonCode: "CANONICAL_SCENE_RENDERER_MISSING", affectedScene: "S11" }));
    expect(result.checks).not.toContainEqual(expect.objectContaining({ reasonCode: "CANONICAL_SCENE_RENDERER_MISSING", affectedScene: "S10" }));
  });

  it("does not report the private source location in user-facing diagnostics", () => {
    const serialized = JSON.stringify(validateCurrentRelease(root));
    expect(serialized).not.toContain("malica");
    expect(serialized).not.toContain("assets\\");
  });
});
