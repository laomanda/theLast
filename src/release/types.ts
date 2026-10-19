export type ReleaseVerdict = "READY" | "NOT_READY" | "ERROR";
export type ReleaseCheckStatus = "PASS" | "FAIL" | "BLOCKED" | "NOT_RUN";

export type ReleaseReasonCode =
  | "CANONICAL_SCENE_RENDERER_MISSING"
  | "CANONICAL_SCENE_DEVELOPMENT_BOUNDARY"
  | "CANONICAL_SCENE_READINESS_EVIDENCE_MISSING"
  | "CANONICAL_SCENE_CONTENT_UNVERIFIED"
  | "S04_PHOTO_HOLD"
  | "S04_PHOTO_POLICY_DENY"
  | "RELEASE_OWNER_APPROVAL_UNVERIFIED"
  | "CANDIDATE_BUILD_OUTPUT_MISSING"
  | "CANDIDATE_OUTPUT_STRUCTURE_UNRECOGNIZED"
  | "REQUIRED_SVG_MANIFEST_ENTRY_MISSING"
  | "REQUIRED_SVG_SOURCE_MISSING"
  | "REQUIRED_SVG_DEPLOYED_MISSING"
  | "REQUIRED_SVG_HASH_MISMATCH"
  | "REV5_SOURCE_INVENTORY_INVALID"
  | "PUBLIC_PHOTO_UNAUTHORIZED"
  | "GENERATED_RASTER_UNAUTHORIZED"
  | "PUBLIC_ASSET_ROOT_UNSAFE"
  | "CANDIDATE_OUTPUT_INTEGRITY_UNVERIFIED"
  | "SCENE_IMPLEMENTATION_EVIDENCE_MISSING"
  | "SCENE_ASSET_AUTHORIZATION_UNVERIFIED"
  | "SCENE_ACCEPTANCE_EVIDENCE_MISSING"
  | "SCENE_PUBLICATION_AUTHORIZATION_UNVERIFIED"
  | "SCENE_EVIDENCE_MALFORMED"
  | "SCENE_EVIDENCE_CONFLICT"
  | "VALIDATOR_INPUT_ERROR";

export interface ReleaseCheck {
  readonly status: ReleaseCheckStatus;
  readonly reasonCode: ReleaseReasonCode | "OK";
  readonly safeDescription: string;
  readonly requiredAction: string;
  readonly affectedScene?: CanonicalSceneId;
  readonly affectedAssetId?: string;
}

export interface ReleaseValidationResult {
  readonly ready: boolean;
  readonly verdict: ReleaseVerdict;
  readonly candidateRevision: string;
  readonly validatedAt: string;
  readonly checks: readonly ReleaseCheck[];
  readonly inventory: {
    readonly publicFileCount: number;
    readonly candidateOutput: "next-public-and-static" | "unavailable";
    readonly manifestAssetCount: number | null;
    readonly candidateOutputAttestation: string | null;
  };
}

export const CANONICAL_SCENE_IDS = [
  "S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10", "S11", "S12",
] as const;

export type CanonicalSceneId = (typeof CANONICAL_SCENE_IDS)[number];
