import type { SceneId } from "../../runtime/contracts.ts";
import { isTrustedAuthorization } from "./internal.ts";
import type {
  AssetAuthorizationDecision,
  AssetAuthorizationReason,
  PhotoPresentationAuthorization,
  PublicAssetProjection,
  S04PhotoReadiness,
  TrustedAssetAuthorization,
} from "./types.ts";

function deny(sceneId: SceneId, reasonCode: Exclude<AssetAuthorizationReason, "AUTHORIZED">, evidence: readonly string[]): AssetAuthorizationDecision {
  return { allowed: false, reasonCode, assetId: "untrusted-or-unavailable", sceneId, decisionEvidence: evidence };
}

function decision(record: TrustedAssetAuthorization, sceneId: SceneId, reasonCode: AssetAuthorizationReason, evidence: readonly string[]): AssetAuthorizationDecision {
  return { allowed: reasonCode === "AUTHORIZED", reasonCode, assetId: record.assetId, sceneId, decisionEvidence: evidence };
}

function isValidPublicPath(value: unknown): value is string {
  return typeof value === "string" && /^\/assets\/[a-zA-Z0-9._/-]+$/.test(value) && !value.includes("//") && !value.includes("..");
}

function hasOrigin(record: TrustedAssetAuthorization): boolean {
  const origin = record.publication.origin;
  return !!origin && [origin.decisionRef, origin.authority, origin.version].every((value) => value.trim().length > 0);
}

function hasCompletePhotoPresentation(photo: PhotoPresentationAuthorization | undefined): boolean {
  return !!photo &&
    Number.isInteger(photo.width) && (photo.width ?? 0) > 0 &&
    Number.isInteger(photo.height) && (photo.height ?? 0) > 0 &&
    typeof photo.approvedAspectRatio === "string" && photo.approvedAspectRatio.trim().length > 0 &&
    typeof photo.cropPolicy === "string" && photo.cropPolicy.trim().length > 0 &&
    !!photo.focalPoint && Number.isFinite(photo.focalPoint.x) && Number.isFinite(photo.focalPoint.y) &&
    photo.focalPoint.x >= 0 && photo.focalPoint.x <= 1 && photo.focalPoint.y >= 0 && photo.focalPoint.y <= 1 &&
    Array.isArray(photo.responsivePublicPaths) && photo.responsivePublicPaths.length > 0 && photo.responsivePublicPaths.every(isValidPublicPath) &&
    typeof photo.altText === "string" && photo.altText.trim().length > 0;
}

/** Pure, fail-closed authorization for one asset in one scene. */
export function evaluateAssetAuthorization(record: unknown, sceneId: SceneId): AssetAuthorizationDecision {
  if (!isTrustedAuthorization(record)) return deny(sceneId, "UNTRUSTED_RECORD", ["Record was not issued by the authority boundary."]);
  if (record.lifecycle === "HOLD") return decision(record, sceneId, "HOLD", ["Lifecycle is HOLD."]);
  if (record.lifecycle === "MISSING") return decision(record, sceneId, "MISSING", ["Lifecycle is MISSING."]);
  if (record.lifecycle === "INVALID") return decision(record, sceneId, "INVALID", ["Lifecycle is INVALID."]);
  if (record.existence !== "present") return decision(record, sceneId, "ASSET_NOT_PRESENT", ["Physical existence is not present."]);
  if (record.integrity.verification.state === "mismatch") return decision(record, sceneId, "INTEGRITY_MISMATCH", ["Integrity verification reported a mismatch."]);
  if (
    record.integrity.verification.state !== "verified" ||
    record.integrity.declaredSha256 === null ||
    record.integrity.declaredSha256.toLowerCase() !== record.integrity.verification.sha256.toLowerCase()
  ) return decision(record, sceneId, "INTEGRITY_UNVERIFIED", ["Declared integrity lacks matching verified evidence."]);
  if (!record.sceneAllocations.includes(sceneId)) return decision(record, sceneId, "SCENE_NOT_ALLOCATED", ["Scene allocation is absent."]);
  if (record.publication.status !== "approved") return decision(record, sceneId, "PUBLICATION_NOT_APPROVED", ["Publication is not currently approved."]);
  if (!hasOrigin(record)) return decision(record, sceneId, "PUBLICATION_EVIDENCE_INCOMPLETE", ["Publication origin is incomplete."]);
  if (!isValidPublicPath(record.publication.publicPath)) return decision(record, sceneId, "INVALID_PUBLIC_PATH", ["Approved public path is invalid."]);
  if (record.category === "authentic-photo" && !hasCompletePhotoPresentation(record.photoPresentation)) {
    return decision(record, sceneId, "PHOTO_METADATA_INCOMPLETE", ["Required approved photo presentation metadata is incomplete."]);
  }
  return decision(record, sceneId, "AUTHORIZED", ["Trusted record, verified integrity, explicit allocation, and current publication approval."]);
}

/** A client-safe view is issued only after the same fail-closed decision passes. */
export function projectAuthorizedPublicAsset(record: unknown, sceneId: SceneId): PublicAssetProjection | null {
  const result = evaluateAssetAuthorization(record, sceneId);
  if (!result.allowed || !isTrustedAuthorization(record)) return null;
  return {
    assetId: record.assetId,
    category: record.category,
    publicPath: record.publication.publicPath as string,
    sceneId,
    integritySha256: record.integrity.verification.state === "verified" ? record.integrity.verification.sha256 : "",
  };
}

/** S04 is a scene-specific constraint; other scenes can independently hold multiple photos. */
export function evaluateS04PhotoReadiness(records: readonly unknown[]): S04PhotoReadiness {
  if (records.some((record) => !isTrustedAuthorization(record))) {
    return { status: "DENY", reasonCode: "S04_UNTRUSTED_INPUT", approvedPhotoCount: 0 };
  }
  const s04Photos = records.filter(
    (record): record is TrustedAssetAuthorization =>
      isTrustedAuthorization(record) && record.category === "authentic-photo" && record.sceneAllocations.includes("S04"),
  );
  const approved = s04Photos.filter((record) => evaluateAssetAuthorization(record, "S04").allowed);
  if (approved.length === 0) return { status: "HOLD", reasonCode: "S04_NO_APPROVED_PHOTO", approvedPhotoCount: 0 };
  if (approved.length > 1) return { status: "DENY", reasonCode: "S04_MULTIPLE_APPROVED_PHOTOS", approvedPhotoCount: approved.length };
  if (s04Photos.length !== 1) return { status: "DENY", reasonCode: "S04_ALLOCATION_INCOMPLETE", approvedPhotoCount: approved.length };
  return { status: "READY", reasonCode: "S04_ONE_APPROVED_PHOTO", approvedPhotoCount: 1 };
}
