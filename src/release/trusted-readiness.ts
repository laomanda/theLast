import { APPROVED_DESIGN_ASSETS, CURRENT_S04_PHOTO_AUTHORIZATIONS } from "../assets/authorization/registry.ts";
import { VAULT_V2_INTEGRATION_CANDIDATE } from "../assets/authorization/vault-v2.ts";
import { CANONICAL_SCENE_IDS } from "./types.ts";
import type { SceneReleaseEvidence } from "./policy.ts";

type TrustedImplementationRecord = Readonly<{
  sceneId: (typeof CANONICAL_SCENE_IDS)[number];
  rendererPresent: boolean;
  developmentBoundary: boolean;
}>;

/** Source-controlled implementation facts only; no caller data or JSON is accepted. */
const TRUSTED_IMPLEMENTATION_RECORDS: readonly TrustedImplementationRecord[] = Object.freeze([
  { sceneId: "S01", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S02", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S03", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S04", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S05", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S06", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S07", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S08", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S09", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S10", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S11", rendererPresent: true, developmentBoundary: false },
  { sceneId: "S12", rendererPresent: true, developmentBoundary: false },
]);

/** Empty until a real owner-approved acceptance record exists. */
const TRUSTED_SCENE_ACCEPTANCE_RECORDS: readonly string[] = Object.freeze([]);
const TRUSTED_SCENE_CONTENT_RECORDS: readonly string[] = Object.freeze([]);
const TRUSTED_SCENE_PUBLICATION_RECORDS: readonly string[] = Object.freeze([]);

export function resolveTrustedSceneReleaseEvidence(): readonly SceneReleaseEvidence[] {
  const implementation = new Map(TRUSTED_IMPLEMENTATION_RECORDS.map((record) => [record.sceneId, record]));
  const authorizedAssetScenes = new Set(
    APPROVED_DESIGN_ASSETS.flatMap((record) => record.sceneAllocations),
  );
  return CANONICAL_SCENE_IDS.map((sceneId) => {
    const implementationRecord = implementation.get(sceneId);
    return {
      sceneId,
      rendererPresent: implementationRecord?.rendererPresent ?? false,
      developmentBoundary: implementationRecord?.developmentBoundary ?? false,
      readinessEvidence: TRUSTED_SCENE_ACCEPTANCE_RECORDS.includes(sceneId) ? "verified" : "missing",
      contentEvidence: TRUSTED_SCENE_CONTENT_RECORDS.includes(sceneId) ? "verified" : "missing",
      implementationEvidence: implementationRecord ? "verified" : "missing",
      assetAuthorizationEvidence: authorizedAssetScenes.has(sceneId) || (sceneId === "S04" && CURRENT_S04_PHOTO_AUTHORIZATIONS.length === 1) || (sceneId === "S10" && VAULT_V2_INTEGRATION_CANDIDATE.status === "VAULT_V2_INTEGRATION_CANDIDATE") ? "verified" : "missing",
      sceneAcceptanceEvidence: TRUSTED_SCENE_ACCEPTANCE_RECORDS.includes(sceneId) ? "verified" : "missing",
      publicationAuthorizationEvidence: TRUSTED_SCENE_PUBLICATION_RECORDS.includes(sceneId) ? "verified" : "missing",
    } as const;
  });
}

export type TrustedOwnerReleaseAuthorization = Readonly<{ candidateRevision: string; authorizationId: string }>;

/** Candidate-bound source record. It is intentionally absent until real owner approval exists. */
const TRUSTED_OWNER_RELEASE_AUTHORIZATION: TrustedOwnerReleaseAuthorization | null = null;

export function resolveTrustedOwnerReleaseAuthorization(candidateRevision: string): TrustedOwnerReleaseAuthorization | null {
  if (!TRUSTED_OWNER_RELEASE_AUTHORIZATION) return null;
  return TRUSTED_OWNER_RELEASE_AUTHORIZATION.candidateRevision === candidateRevision ? TRUSTED_OWNER_RELEASE_AUTHORIZATION : null;
}
