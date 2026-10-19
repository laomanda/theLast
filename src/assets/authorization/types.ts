import type { SceneId } from "../../runtime/contracts.ts";

export type AssetCategory = "design-svg" | "authentic-photo";
export type AssetLifecycle = "HOLD" | "APPROVED" | "MISSING" | "INVALID";
export type AssetExistence = "present" | "missing" | "unknown";

export interface AuthorizationOrigin {
  readonly decisionRef: string;
  readonly authority: string;
  readonly version: string;
}

export interface SourceProvenance {
  readonly kind: "rev5-verified" | "owner-authenticity-evidenced";
  readonly evidenceRef: string;
}

export interface IntegrityEvidence {
  readonly declaredSha256: string | null;
  readonly verification:
    | { readonly state: "verified"; readonly sha256: string; readonly evidenceRef: string }
    | { readonly state: "unverified"; readonly reason: string }
    | { readonly state: "mismatch"; readonly evidenceRef: string };
}

export interface PublicationAuthorization {
  readonly status: "approved" | "missing" | "revoked" | "superseded";
  readonly origin?: AuthorizationOrigin;
  readonly publicPath?: string;
}

export interface PhotoPresentationAuthorization {
  readonly width?: number;
  readonly height?: number;
  readonly approvedAspectRatio?: string;
  readonly cropPolicy?: string;
  readonly focalPoint?: { readonly x: number; readonly y: number };
  readonly responsivePublicPaths?: readonly string[];
  readonly altText?: string;
}

/** Raw declarations remain untrusted even when they claim APPROVED status. */
export interface AssetAuthorizationDeclaration {
  readonly assetId: string;
  readonly category: AssetCategory;
  readonly lifecycle: AssetLifecycle;
  readonly existence: AssetExistence;
  readonly provenance: SourceProvenance;
  readonly integrity: IntegrityEvidence;
  readonly sceneAllocations: readonly SceneId[];
  readonly publication: PublicationAuthorization;
  readonly photoPresentation?: PhotoPresentationAuthorization;
  /** Build-time only. It is never part of a public projection. */
  readonly privateSourceReference?: string;
}

declare const trustedAuthorizationBrand: unique symbol;

/**
 * Opaque, authority-issued record. The brand is necessary but not sufficient:
 * runtime policy also verifies internal provenance in a private WeakSet.
 */
export type TrustedAssetAuthorization = Readonly<AssetAuthorizationDeclaration> & {
  readonly [trustedAuthorizationBrand]: "trusted-asset-authorization";
};

export type AssetAuthorizationReason =
  | "AUTHORIZED"
  | "UNTRUSTED_RECORD"
  | "HOLD"
  | "MISSING"
  | "INVALID"
  | "ASSET_NOT_PRESENT"
  | "INTEGRITY_UNVERIFIED"
  | "INTEGRITY_MISMATCH"
  | "SCENE_NOT_ALLOCATED"
  | "PUBLICATION_NOT_APPROVED"
  | "PUBLICATION_EVIDENCE_INCOMPLETE"
  | "INVALID_PUBLIC_PATH"
  | "PHOTO_METADATA_INCOMPLETE";

export interface AssetAuthorizationDecision {
  readonly allowed: boolean;
  readonly reasonCode: AssetAuthorizationReason;
  readonly assetId: string;
  readonly sceneId: SceneId;
  readonly decisionEvidence: readonly string[];
}

export interface PublicAssetProjection {
  readonly assetId: string;
  readonly category: AssetCategory;
  readonly publicPath: string;
  readonly sceneId: SceneId;
  readonly integritySha256: string;
}

export type S04PhotoReadiness =
  | { readonly status: "HOLD"; readonly reasonCode: "S04_NO_APPROVED_PHOTO"; readonly approvedPhotoCount: 0 }
  | { readonly status: "READY"; readonly reasonCode: "S04_ONE_APPROVED_PHOTO"; readonly approvedPhotoCount: 1 }
  | {
      readonly status: "DENY";
      readonly reasonCode: "S04_MULTIPLE_APPROVED_PHOTOS" | "S04_ALLOCATION_INCOMPLETE" | "S04_UNTRUSTED_INPUT";
      readonly approvedPhotoCount: number;
    };
