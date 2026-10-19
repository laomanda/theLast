import { CANONICAL_SCENE_IDS, type CanonicalSceneId, type ReleaseCheck } from "./types.ts";

export interface SceneReleaseEvidence {
  readonly sceneId: CanonicalSceneId;
  readonly rendererPresent: boolean;
  readonly developmentBoundary: boolean;
  readonly readinessEvidence: "verified" | "missing";
  readonly contentEvidence: "verified" | "missing";
  readonly implementationEvidence: "verified" | "missing";
  readonly assetAuthorizationEvidence: "verified" | "missing";
  readonly sceneAcceptanceEvidence: "verified" | "missing";
  readonly publicationAuthorizationEvidence: "verified" | "missing";
}

/** Pure policy: the canonical sequence is fixed here, not supplied by a caller. */
export function evaluateSceneCompleteness(records: readonly SceneReleaseEvidence[]): ReleaseCheck[] {
  const invalid = records.filter((record) => !CANONICAL_SCENE_IDS.includes(record.sceneId));
  if (invalid.length) return [{ status: "BLOCKED", reasonCode: "SCENE_EVIDENCE_MALFORMED", safeDescription: "Scene release evidence contains an unknown scene identifier.", requiredAction: "Provide only typed evidence for the canonical scene set." }];
  const duplicateIds = new Set(records.map((record) => record.sceneId));
  if (duplicateIds.size !== records.length) return [{ status: "BLOCKED", reasonCode: "SCENE_EVIDENCE_CONFLICT", safeDescription: "Scene release evidence contains conflicting duplicate scene records.", requiredAction: "Provide exactly one authoritative declaration per canonical scene." }];
  const byScene = new Map(records.map((record) => [record.sceneId, record]));
  const checks: ReleaseCheck[] = [];
  for (const sceneId of CANONICAL_SCENE_IDS) {
    const record = byScene.get(sceneId);
    if (!record || !record.rendererPresent) {
      checks.push({ status: "FAIL", reasonCode: "CANONICAL_SCENE_RENDERER_MISSING", affectedScene: sceneId,
        safeDescription: `${sceneId} has no complete production renderer.`, requiredAction: "Implement and verify the scene renderer." });
    }
    if (record?.developmentBoundary) checks.push({ status: "FAIL", reasonCode: "CANONICAL_SCENE_DEVELOPMENT_BOUNDARY", affectedScene: sceneId,
      safeDescription: `${sceneId} is represented by a development boundary.`, requiredAction: "Replace the boundary with the approved production scene." });
    if (!record) {
      checks.push({ status: "BLOCKED", reasonCode: "SCENE_IMPLEMENTATION_EVIDENCE_MISSING", affectedScene: sceneId, safeDescription: `${sceneId} has no typed release declaration.`, requiredAction: "Provide one authoritative declaration for the canonical scene." });
      checks.push({ status: "BLOCKED", reasonCode: "SCENE_ASSET_AUTHORIZATION_UNVERIFIED", affectedScene: sceneId, safeDescription: `${sceneId} has no typed asset-authorization declaration.`, requiredAction: "Provide fixed-registry asset authorization evidence." });
      checks.push({ status: "BLOCKED", reasonCode: "SCENE_ACCEPTANCE_EVIDENCE_MISSING", affectedScene: sceneId, safeDescription: `${sceneId} has no typed scene-acceptance declaration.`, requiredAction: "Provide current owner-approved scene acceptance evidence." });
      checks.push({ status: "BLOCKED", reasonCode: "SCENE_PUBLICATION_AUTHORIZATION_UNVERIFIED", affectedScene: sceneId, safeDescription: `${sceneId} has no typed publication-authorization declaration.`, requiredAction: "Provide candidate-bound publication authorization." });
      continue;
    }
    if (record && record.readinessEvidence !== "verified") checks.push({ status: "BLOCKED", reasonCode: "CANONICAL_SCENE_READINESS_EVIDENCE_MISSING", affectedScene: sceneId,
      safeDescription: `${sceneId} has no trusted release-readiness evidence.`, requiredAction: "Provide current, authorized scene-release evidence." });
    if (record && record.contentEvidence !== "verified") checks.push({ status: "BLOCKED", reasonCode: "CANONICAL_SCENE_CONTENT_UNVERIFIED", affectedScene: sceneId,
      safeDescription: `${sceneId} has no trusted complete-content evidence.`, requiredAction: "Provide current, authorized narrative/content evidence." });
    if (record && record.implementationEvidence !== "verified") checks.push({ status: "BLOCKED", reasonCode: "SCENE_IMPLEMENTATION_EVIDENCE_MISSING", affectedScene: sceneId,
      safeDescription: `${sceneId} has no trusted implementation-completeness evidence.`, requiredAction: "Provide evidence-backed implementation completeness." });
    if (record && record.assetAuthorizationEvidence !== "verified") checks.push({ status: "BLOCKED", reasonCode: "SCENE_ASSET_AUTHORIZATION_UNVERIFIED", affectedScene: sceneId,
      safeDescription: `${sceneId} has no trusted asset-authorization evidence.`, requiredAction: "Provide fixed-registry asset authorization evidence." });
    if (record && record.sceneAcceptanceEvidence !== "verified") checks.push({ status: "BLOCKED", reasonCode: "SCENE_ACCEPTANCE_EVIDENCE_MISSING", affectedScene: sceneId,
      safeDescription: `${sceneId} has no trusted scene-acceptance evidence.`, requiredAction: "Provide current owner-approved scene acceptance evidence." });
    if (record && record.publicationAuthorizationEvidence !== "verified") checks.push({ status: "BLOCKED", reasonCode: "SCENE_PUBLICATION_AUTHORIZATION_UNVERIFIED", affectedScene: sceneId,
      safeDescription: `${sceneId} has no trusted publication-authorization evidence.`, requiredAction: "Provide candidate-bound publication authorization." });
  }
  return checks;
}

export function evaluateOwnerReleaseAuthorization(present: { readonly candidateRevision: string; readonly authorizationId: string } | null): ReleaseCheck {
  return present
    ? { status: "PASS", reasonCode: "OK", safeDescription: "A current trusted release authorization is present.", requiredAction: "None." }
    : { status: "BLOCKED", reasonCode: "RELEASE_OWNER_APPROVAL_UNVERIFIED", safeDescription: "No trusted, candidate-bound complete-release authorization mechanism is available.", requiredAction: "Obtain a current owner release authorization through the designated future channel." };
}
