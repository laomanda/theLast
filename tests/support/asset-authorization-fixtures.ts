import { issueSyntheticAuthorizationForUnitTest } from "../../src/assets/authorization/internal";
import type { AssetAuthorizationDeclaration, PhotoPresentationAuthorization, TrustedAssetAuthorization } from "../../src/assets/authorization/types";

const hash = "a".repeat(64);
const origin = { decisionRef: "synthetic-owner-decision", authority: "synthetic-test", version: "test-v1" };
const photoPresentation: PhotoPresentationAuthorization = {
  width: 1200,
  height: 900,
  approvedAspectRatio: "owner-approved-test-ratio",
  cropPolicy: "owner-approved-test-crop",
  focalPoint: { x: 0.5, y: 0.5 },
  responsivePublicPaths: ["/assets/photos/synthetic-photo-1200.webp"],
  altText: "Synthetic test photo.",
};

/** Test-only synthetic records; this file must never be imported by production code. */
export function createSyntheticPhoto(overrides: Partial<AssetAuthorizationDeclaration> = {}): TrustedAssetAuthorization {
  return issueSyntheticAuthorizationForUnitTest({
    assetId: "synthetic.photo.one",
    category: "authentic-photo",
    lifecycle: "APPROVED",
    existence: "present",
    provenance: { kind: "owner-authenticity-evidenced", evidenceRef: "synthetic-authenticity-evidence" },
    integrity: { declaredSha256: hash, verification: { state: "verified", sha256: hash, evidenceRef: "synthetic-hash-verification" } },
    sceneAllocations: ["S04"],
    publication: { status: "approved", origin, publicPath: "/assets/photos/synthetic-photo.webp" },
    photoPresentation,
    privateSourceReference: "restricted://synthetic-photo-source",
    ...overrides,
  });
}

export function createSyntheticDesign(overrides: Partial<AssetAuthorizationDeclaration> = {}): TrustedAssetAuthorization {
  return issueSyntheticAuthorizationForUnitTest({
    assetId: "synthetic.design.one",
    category: "design-svg",
    lifecycle: "APPROVED",
    existence: "present",
    provenance: { kind: "rev5-verified", evidenceRef: "synthetic-rev5-evidence" },
    integrity: { declaredSha256: hash, verification: { state: "verified", sha256: hash, evidenceRef: "synthetic-hash-verification" } },
    sceneAllocations: ["S05"],
    publication: { status: "approved", origin, publicPath: "/assets/svg/synthetic.svg" },
    ...overrides,
  });
}
