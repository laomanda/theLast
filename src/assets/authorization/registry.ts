import { getFixedApprovedDesignAssets, getFixedApprovedS04Photo } from "./internal.ts";
import type { TrustedAssetAuthorization } from "./types.ts";

/** Server/build-time registry. Its records are not a client import surface. */
export const APPROVED_DESIGN_ASSETS = getFixedApprovedDesignAssets();

/** The single fixed, owner-authorized S04 production derivative. */
export const CURRENT_S04_PHOTO_AUTHORIZATIONS: readonly TrustedAssetAuthorization[] = Object.freeze([
  getFixedApprovedS04Photo(),
]);

export function findApprovedDesignAsset(assetId: string): TrustedAssetAuthorization | undefined {
  return APPROVED_DESIGN_ASSETS.find((record) => record.assetId === assetId);
}
