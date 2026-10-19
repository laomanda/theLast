import { resolveTrustedOwnerReleaseAuthorization, resolveTrustedSceneReleaseEvidence } from "./trusted-readiness.ts";

export const CURRENT_SCENE_RELEASE_EVIDENCE = resolveTrustedSceneReleaseEvidence();
export const getCurrentOwnerReleaseAuthorization = resolveTrustedOwnerReleaseAuthorization;
