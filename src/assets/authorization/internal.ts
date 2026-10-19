import { SCENE_IDS, type SceneId } from "../../runtime/contracts.ts";
import { APPROVED_DESIGN_ASSET_DECLARATIONS, APPROVED_S04_PHOTO_DECLARATION } from "./registry-definitions.ts";
import type { AssetAuthorizationDeclaration, TrustedAssetAuthorization } from "./types.ts";

/** Server/build-time only. Do not import this internal authority boundary from client components. */
const trustedRecords = new WeakSet<object>();
const sceneIdSet = new Set<string>(SCENE_IDS);
const assetIdPattern = /^[a-z][a-z0-9.-]{2,127}$/;

function isSceneId(value: unknown): value is SceneId {
  return typeof value === "string" && sceneIdSet.has(value);
}

function isSha256(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/i.test(value);
}

function isDeclarationWellFormed(value: AssetAuthorizationDeclaration): boolean {
  const publication = value.publication;
  return (
    assetIdPattern.test(value.assetId) &&
    (value.category === "design-svg" || value.category === "authentic-photo") &&
    ["HOLD", "APPROVED", "MISSING", "INVALID"].includes(value.lifecycle) &&
    ["present", "missing", "unknown"].includes(value.existence) &&
    typeof value.provenance.evidenceRef === "string" &&
    value.provenance.evidenceRef.trim().length > 0 &&
    (value.provenance.kind === "rev5-verified" || value.provenance.kind === "owner-authenticity-evidenced") &&
    (value.integrity.declaredSha256 === null || isSha256(value.integrity.declaredSha256)) &&
    (value.integrity.verification.state !== "verified" || isSha256(value.integrity.verification.sha256)) &&
    Array.isArray(value.sceneAllocations) &&
    value.sceneAllocations.every(isSceneId) &&
    ["approved", "missing", "revoked", "superseded"].includes(publication.status)
  );
}

function immutableCopy(value: AssetAuthorizationDeclaration): TrustedAssetAuthorization {
  const copy = {
    ...value,
    sceneAllocations: Object.freeze([...value.sceneAllocations]),
    provenance: Object.freeze({ ...value.provenance }),
    integrity: Object.freeze({
      ...value.integrity,
      verification: Object.freeze({ ...value.integrity.verification }),
    }),
    publication: Object.freeze({
      ...value.publication,
      origin: value.publication.origin ? Object.freeze({ ...value.publication.origin }) : undefined,
    }),
    photoPresentation: value.photoPresentation
      ? Object.freeze({
          ...value.photoPresentation,
          focalPoint: value.photoPresentation.focalPoint ? Object.freeze({ ...value.photoPresentation.focalPoint }) : undefined,
          responsivePublicPaths: value.photoPresentation.responsivePublicPaths
            ? Object.freeze([...value.photoPresentation.responsivePublicPaths])
            : undefined,
        })
      : undefined,
  };
  return Object.freeze(copy) as TrustedAssetAuthorization;
}

/** This non-exported issuer is reachable only by the fixed production registry below. */
function issueFixedAuthorization(declaration: AssetAuthorizationDeclaration): TrustedAssetAuthorization {
  if (!isDeclarationWellFormed(declaration)) throw new TypeError("Malformed authoritative asset declaration.");
  const record = immutableCopy(declaration);
  trustedRecords.add(record);
  return record;
}

/**
 * The only production issuances are sealed during module initialization from
 * the fixed evidence-backed registry. There is intentionally no exported
 * token minting or generic production issuance API.
 */
const fixedApprovedDesignAssets = Object.freeze(APPROVED_DESIGN_ASSET_DECLARATIONS.map(issueFixedAuthorization));
const fixedApprovedS04Photo = issueFixedAuthorization(APPROVED_S04_PHOTO_DECLARATION);

export function getFixedApprovedDesignAssets(): readonly TrustedAssetAuthorization[] {
  return fixedApprovedDesignAssets;
}

export function getFixedApprovedS04Photo(): TrustedAssetAuthorization {
  return fixedApprovedS04Photo;
}

/**
 * Test-only fixture bridge. It is unavailable outside a Vitest NODE_ENV and
 * is deliberately not exported from the public authorization entrypoint.
 */
export function issueSyntheticAuthorizationForUnitTest(
  declaration: AssetAuthorizationDeclaration,
): TrustedAssetAuthorization {
  if (process.env.NODE_ENV !== "test") {
    throw new TypeError("Synthetic authorization issuance is restricted to the unit-test runtime.");
  }
  return issueFixedAuthorization(declaration);
}

export function isTrustedAuthorization(value: unknown): value is TrustedAssetAuthorization {
  return !!value && typeof value === "object" && trustedRecords.has(value);
}
