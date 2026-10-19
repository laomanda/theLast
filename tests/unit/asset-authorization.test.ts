import { describe, expect, it } from "vitest";
import { evaluateAssetAuthorization, evaluateS04PhotoReadiness, projectAuthorizedPublicAsset } from "../../src/assets/authorization";
import * as internalAuthorization from "../../src/assets/authorization/internal";
import { APPROVED_DESIGN_ASSETS, CURRENT_S04_PHOTO_AUTHORIZATIONS, findApprovedDesignAsset } from "../../src/assets/authorization/registry";
import { issueSyntheticAuthorizationForUnitTest } from "../../src/assets/authorization/internal";
import { createSyntheticDesign, createSyntheticPhoto } from "../support/asset-authorization-fixtures";

describe("CP-01D.1 asset authorization contract", () => {
  it("does not expose a production authority-token or generic issuance API", () => {
    expect(internalAuthorization).not.toHaveProperty("createAuthorityToken");
    expect(internalAuthorization).not.toHaveProperty("authorizeDeclaration");
  });

  it("rejects direct synthetic issuance when the runtime is not a unit-test runtime", () => {
    const originalNodeEnv = process.env.NODE_ENV;
    Reflect.set(process.env, "NODE_ENV", "production");
    try {
      expect(() => issueSyntheticAuthorizationForUnitTest({
        assetId: "synthetic.photo.forged-issuer",
        category: "authentic-photo",
        lifecycle: "APPROVED",
        existence: "present",
        provenance: { kind: "owner-authenticity-evidenced", evidenceRef: "forged" },
        integrity: { declaredSha256: "a".repeat(64), verification: { state: "verified", sha256: "a".repeat(64), evidenceRef: "forged" } },
        sceneAllocations: ["S04"],
        publication: { status: "approved", origin: { decisionRef: "forged", authority: "forged", version: "forged" }, publicPath: "/assets/photos/forged.webp" },
      })).toThrow("restricted to the unit-test runtime");
    } finally {
      Reflect.set(process.env, "NODE_ENV", originalNodeEnv);
    }
  });

  it("authorizes only the known approved SVG in its evidence-backed scene", () => {
    const a02 = findApprovedDesignAsset("design.svg.a02-offset-loop-open");
    expect(evaluateAssetAuthorization(a02, "S01")).toMatchObject({ allowed: true, reasonCode: "AUTHORIZED" });
    expect(APPROVED_DESIGN_ASSETS).toHaveLength(17);
  });

  it("denies unknown IDs and hostile untrusted APPROVED declarations", () => {
    const hostile = { assetId: "unknown.approved", lifecycle: "APPROVED", publication: { status: "approved" } };
    expect(evaluateAssetAuthorization(undefined, "S01").reasonCode).toBe("UNTRUSTED_RECORD");
    expect(evaluateAssetAuthorization(hostile, "S01").reasonCode).toBe("UNTRUSTED_RECORD");
  });

  it("denies HOLD, missing, invalid, and absent assets", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ lifecycle: "HOLD" }), "S04").reasonCode).toBe("HOLD");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ lifecycle: "MISSING" }), "S04").reasonCode).toBe("MISSING");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ lifecycle: "INVALID" }), "S04").reasonCode).toBe("INVALID");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ existence: "missing" }), "S04").reasonCode).toBe("ASSET_NOT_PRESENT");
  });

  it("denies missing, revoked, or origin-less publication approval", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ publication: { status: "missing" } }), "S04").reasonCode).toBe("PUBLICATION_NOT_APPROVED");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ publication: { status: "revoked" } }), "S04").reasonCode).toBe("PUBLICATION_NOT_APPROVED");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ publication: { status: "approved", publicPath: "/assets/photos/synthetic.webp" } }), "S04").reasonCode).toBe("PUBLICATION_EVIDENCE_INCOMPLETE");
  });

  it("denies superseded publication approval", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ publication: { status: "superseded" } }), "S04").reasonCode).toBe("PUBLICATION_NOT_APPROVED");
  });

  it("denies absent or wrong scene allocations", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ sceneAllocations: [] }), "S04").reasonCode).toBe("SCENE_NOT_ALLOCATED");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ sceneAllocations: ["S05"] }), "S04").reasonCode).toBe("SCENE_NOT_ALLOCATED");
  });

  it("does not allow a S05-approved photo to satisfy S04", () => {
    const otherScenePhoto = createSyntheticPhoto({ sceneAllocations: ["S05"] });
    expect(evaluateAssetAuthorization(otherScenePhoto, "S04").allowed).toBe(false);
    expect(evaluateS04PhotoReadiness([otherScenePhoto])).toMatchObject({ status: "HOLD", reasonCode: "S04_NO_APPROVED_PHOTO" });
  });

  it("denies mismatched, unverified, and merely declared integrity", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ integrity: { declaredSha256: "a".repeat(64), verification: { state: "mismatch", evidenceRef: "test" } } }), "S04").reasonCode).toBe("INTEGRITY_MISMATCH");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ integrity: { declaredSha256: "a".repeat(64), verification: { state: "unverified", reason: "pending" } } }), "S04").reasonCode).toBe("INTEGRITY_UNVERIFIED");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ integrity: { declaredSha256: "a".repeat(64), verification: { state: "verified", sha256: "b".repeat(64), evidenceRef: "test" } } }), "S04").reasonCode).toBe("INTEGRITY_UNVERIFIED");
  });

  it("does not let a HOLD photo publish when it carries a forged approved flag", () => {
    const heldWithForgedApproval = createSyntheticPhoto({ lifecycle: "HOLD" });
    expect(evaluateAssetAuthorization(heldWithForgedApproval, "S04")).toMatchObject({ allowed: false, reasonCode: "HOLD" });
  });

  it("rejects invalid public paths and SVG metadata reused as a photo", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ publication: { status: "approved", origin: { decisionRef: "x", authority: "x", version: "x" }, publicPath: "C:\\restricted\\photo.webp" } }), "S04").reasonCode).toBe("INVALID_PUBLIC_PATH");
    const svgAsPhoto = createSyntheticDesign({ category: "authentic-photo", sceneAllocations: ["S04"] });
    expect(evaluateAssetAuthorization(svgAsPhoto, "S04").reasonCode).toBe("PHOTO_METADATA_INCOMPLETE");
  });

  it("accepts a fully evidenced synthetic S04 authorization record", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto(), "S04")).toMatchObject({ allowed: true, reasonCode: "AUTHORIZED" });
  });

  it("never creates a public projection for HOLD, unknown, or wrong-scene records", () => {
    expect(projectAuthorizedPublicAsset(createSyntheticPhoto({ lifecycle: "HOLD" }), "S04")).toBeNull();
    expect(projectAuthorizedPublicAsset({ lifecycle: "APPROVED" }, "S04")).toBeNull();
    expect(projectAuthorizedPublicAsset(createSyntheticPhoto(), "S05")).toBeNull();
  });

  it("strips private source metadata from an authorized public projection", () => {
    const projection = projectAuthorizedPublicAsset(createSyntheticPhoto(), "S04");
    expect(projection).toMatchObject({ publicPath: "/assets/photos/synthetic-photo.webp", sceneId: "S04" });
    expect(projection).not.toHaveProperty("privateSourceReference");
    expect(JSON.stringify(projection)).not.toContain("restricted://");
  });

  it("keeps the current S04 registry at exactly one authorized production photo", () => {
    expect(evaluateS04PhotoReadiness(CURRENT_S04_PHOTO_AUTHORIZATIONS)).toEqual({ status: "READY", reasonCode: "S04_ONE_APPROVED_PHOTO", approvedPhotoCount: 1 });
    const projection = projectAuthorizedPublicAsset(CURRENT_S04_PHOTO_AUTHORIZATIONS[0], "S04");
    expect(projection).toMatchObject({ publicPath: "/assets/photos/s04-portrait.webp", sceneId: "S04" });
    expect(JSON.stringify(projection)).not.toContain("restricted://");
  });

  it("denies untrusted input in a purported S04 release set", () => {
    expect(evaluateS04PhotoReadiness([{ assetId: "synthetic.photo.forged", category: "authentic-photo" }])).toMatchObject({ status: "DENY", reasonCode: "S04_UNTRUSTED_INPUT" });
  });

  it("denies S04 when one approved allocation is accompanied by an incomplete S04 allocation", () => {
    const approved = createSyntheticPhoto({ assetId: "synthetic.photo.ready" });
    const incomplete = createSyntheticPhoto({ assetId: "synthetic.photo.hold", lifecycle: "HOLD" });
    expect(evaluateS04PhotoReadiness([approved, incomplete])).toMatchObject({ status: "DENY", reasonCode: "S04_ALLOCATION_INCOMPLETE" });
  });

  it("accepts exactly one valid S04 photo and denies two", () => {
    const first = createSyntheticPhoto({ assetId: "synthetic.photo.first" });
    const second = createSyntheticPhoto({ assetId: "synthetic.photo.second" });
    expect(evaluateS04PhotoReadiness([first])).toMatchObject({ status: "READY", approvedPhotoCount: 1 });
    expect(evaluateS04PhotoReadiness([first, second])).toMatchObject({ status: "DENY", reasonCode: "S04_MULTIPLE_APPROVED_PHOTOS", approvedPhotoCount: 2 });
  });

  it("allows multiple independently allocated photos outside S04", () => {
    const s05 = createSyntheticPhoto({ assetId: "synthetic.photo.s05", sceneAllocations: ["S05"] });
    const s07 = createSyntheticPhoto({ assetId: "synthetic.photo.s07", sceneAllocations: ["S07"] });
    expect(evaluateAssetAuthorization(s05, "S05").allowed).toBe(true);
    expect(evaluateAssetAuthorization(s07, "S07").allowed).toBe(true);
  });

  it("denies incomplete photo presentation metadata, including blank alt and missing crop", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ photoPresentation: { width: 1200, height: 900, approvedAspectRatio: "test", cropPolicy: "crop", focalPoint: { x: 0.5, y: 0.5 }, responsivePublicPaths: ["/assets/photos/test.webp"], altText: "  " } }), "S04").reasonCode).toBe("PHOTO_METADATA_INCOMPLETE");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ photoPresentation: { width: 1200, height: 900, approvedAspectRatio: "test", focalPoint: { x: 0.5, y: 0.5 }, responsivePublicPaths: ["/assets/photos/test.webp"], altText: "Synthetic." } }), "S04").reasonCode).toBe("PHOTO_METADATA_INCOMPLETE");
  });

  it("denies missing dimensions, focal point, and responsive public paths for a photo", () => {
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ photoPresentation: { approvedAspectRatio: "test", cropPolicy: "crop", altText: "Synthetic." } }), "S04").reasonCode).toBe("PHOTO_METADATA_INCOMPLETE");
    expect(evaluateAssetAuthorization(createSyntheticPhoto({ photoPresentation: { width: 1200, height: 900, approvedAspectRatio: "test", cropPolicy: "crop", focalPoint: { x: 2, y: 0.5 }, responsivePublicPaths: [], altText: "Synthetic." } }), "S04").reasonCode).toBe("PHOTO_METADATA_INCOMPLETE");
  });
});
