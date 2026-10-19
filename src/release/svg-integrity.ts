import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { safeChildPath, isRegularFile } from "./filesystem.ts";
import type { ReleaseCheck } from "./types.ts";

interface ManifestAsset { id: string; relativePath: string; publicUrl: string; sha256: string; }
interface Manifest { assets?: ManifestAsset[]; }

const sha256 = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

/** Release-side pinned view of CP-01D.1's fixed, owner-approved SVG declarations.
 * It contains no issuer capability and is checked again against manifest bytes. */
const REQUIRED_APPROVED_SVGS = [
  { assetId: "design.svg.a02-offset-loop-open", manifestId: "A02", publicPath: "/assets/svg/signature/offset-loop-open.svg", sha256: "9817f8a81ba819cb97ba6a4cfa55aa18d9e45bd1410639fcf5f46b29e4bbd84b" },
  { assetId: "design.svg.e01-invitation-fold", manifestId: "E01", publicPath: "/assets/svg/paper/invitation-paper-fold.svg", sha256: "36db65e25b8ea23bf326ab9082ea8d89b39f0173450e93a00431cb740f559cfc" },
  { assetId: "design.svg.c01-celebration-arc", manifestId: "C01", publicPath: "/assets/svg/celebration/celebration-arc.svg", sha256: "a652d90982ab873ead34d961a018e086ee8b544f83ec3698a6584d82d486f097" },
  { assetId: "design.svg.c02-celebration-burst", manifestId: "C02", publicPath: "/assets/svg/celebration/celebration-burst.svg", sha256: "49856bac2d792d20bcf5435c0aee8a1cc9969f9b52219acf63bb0c1d53bcc42a" },
  { assetId: "design.svg.b02-editorial-frame-portrait", manifestId: "B02", publicPath: "/assets/svg/editorial/editorial-frame-portrait.svg", sha256: "4a520ac9e73bec6eac5097164bef13442ba49066c8f820cba93947c6f8e546b4" },
  { assetId: "design.svg.d01-cake-body-base", manifestId: "D01", publicPath: "/assets/svg/cake/cake-body-base.svg", sha256: "ad7ca0a004c47e3f022dcfede91fb62fc87a0c48632330b81d19237471470cd6" },
  { assetId: "design.svg.d02-cake-frosting-silhouette", manifestId: "D02", publicPath: "/assets/svg/cake/cake-frosting-silhouette.svg", sha256: "f0d163af0772c24bdbdd404d202f9d49dc7d05487d9b92d4dc75dbddf1a5d766" },
  { assetId: "design.svg.d03-cake-frosting-edge", manifestId: "D03", publicPath: "/assets/svg/cake/cake-frosting-edge.svg", sha256: "5f2291d09392a9d18ce66454f742f56f2ed9fd9b35afe044fea4f849d065a10c" },
  { assetId: "design.svg.d04-candle-body", manifestId: "D04", publicPath: "/assets/svg/cake/candle-body.svg", sha256: "020de9453e8222e2239a0adc6cb3133e573440256544f7a8fc8f4c4ded950f37" },
  { assetId: "design.svg.d05-candle-flame", manifestId: "D05", publicPath: "/assets/svg/cake/candle-flame.svg", sha256: "2c11025543a4870a845e492782e4f843db59272c64dbf8da253e6bb212df0c3d" },
  { assetId: "design.svg.d06-candle-wick", manifestId: "D06", publicPath: "/assets/svg/cake/candle-wick.svg", sha256: "e8eee65356392e98c2b74523153aac7a6c09900b31f22a1f5a6f25eeb858b68d" },
  { assetId: "design.svg.d07-flower-bloom", manifestId: "D07", publicPath: "/assets/svg/cake/flower-bloom.svg", sha256: "924c7ba698830c46a9ba44475e58d4d6f70c9909c720269c03515e444b9f490d" },
  { assetId: "design.svg.d08-flower-leaf", manifestId: "D08", publicPath: "/assets/svg/cake/flower-leaf.svg", sha256: "954b3f98983fbde4135b7b89b2a263c254de0f31a88edeaee3ce7888836e412f" },
  { assetId: "design.svg.d09-cake-topper", manifestId: "D09", publicPath: "/assets/svg/cake/cake-topper.svg", sha256: "eda9d9806019c47cf4c40fb6939e428114fbd5842a66cbb5702da0ca77f5fff6" },
  { assetId: "design.svg.d10-cake-accent-pearl", manifestId: "D10", publicPath: "/assets/svg/cake/cake-accent-pearl.svg", sha256: "11fa815c03f90daa85bd33baa8d6c2a8a67c431ea5c5a28e6620fbe2ec7fffe0" },
  { assetId: "design.svg.d11-cake-accent-ribbon", manifestId: "D11", publicPath: "/assets/svg/cake/cake-accent-ribbon.svg", sha256: "9cc9141e97114793b09233bde781812aea4a84fb336b96734b8dbc00f8ae1a07" },
  { assetId: "design.svg.d12-candle-smoke", manifestId: "D12", publicPath: "/assets/svg/cake/candle-smoke.svg", sha256: "0870ce17d33c9193f8ab83cd4267e894e606cb4f1d6d9bdf3f160d4b195aecf2" },
] as const;

export function verifyRequiredSvgs(workspaceRoot: string): { checks: ReleaseCheck[]; manifestAssetCount: number | null } {
  const checks: ReleaseCheck[] = [];
  const sourceRoot = join(workspaceRoot, "BIRTHDAY_SVG_REV5");
  const manifestPath = join(sourceRoot, "public", "assets", "svg", "ASSET_MANIFEST.json");
  let manifest: Manifest;
  try { manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest; }
  catch { return { checks: [{ status: "BLOCKED", reasonCode: "REV5_SOURCE_INVENTORY_INVALID", safeDescription: "The REV5 manifest cannot be read.", requiredAction: "Restore a valid authoritative REV5 manifest." }], manifestAssetCount: null }; }
  if (!Array.isArray(manifest.assets) || manifest.assets.length !== 41) checks.push({ status: "BLOCKED", reasonCode: "REV5_SOURCE_INVENTORY_INVALID", safeDescription: "The REV5 source inventory is absent or does not contain its declared 41 assets.", requiredAction: "Restore and verify the REV5 source inventory." });
  else {
    for (const asset of manifest.assets) {
      const source = safeChildPath(sourceRoot, asset.relativePath);
      if (!source || !isRegularFile(source) || sha256(source).toLowerCase() !== asset.sha256.toLowerCase()) {
        checks.push({ status: "FAIL", reasonCode: "REV5_SOURCE_INVENTORY_INVALID", affectedAssetId: asset.id, safeDescription: `REV5 source inventory integrity failed for ${asset.id}.`, requiredAction: "Restore the manifest-matching source SVG." });
      }
    }
  }
  for (const approved of REQUIRED_APPROVED_SVGS) {
    const manifestAsset = manifest.assets?.find((asset) => asset.id === approved.manifestId && asset.publicUrl === approved.publicPath);
    if (!manifestAsset) { checks.push({ status: "FAIL", reasonCode: "REQUIRED_SVG_MANIFEST_ENTRY_MISSING", affectedAssetId: approved.assetId, safeDescription: `Approved SVG ${approved.assetId} has no matching REV5 manifest entry.`, requiredAction: "Restore the authoritative manifest entry." }); continue; }
    const source = safeChildPath(sourceRoot, manifestAsset.relativePath);
    const deployed = safeChildPath(join(workspaceRoot, "public"), manifestAsset.publicUrl.replace(/^\//, ""));
    if (!source || !isRegularFile(source)) { checks.push({ status: "FAIL", reasonCode: "REQUIRED_SVG_SOURCE_MISSING", affectedAssetId: approved.assetId, safeDescription: `Approved SVG ${approved.assetId} source is unavailable.`, requiredAction: "Restore the approved source SVG." }); continue; }
    if (!deployed || !isRegularFile(deployed)) { checks.push({ status: "FAIL", reasonCode: "REQUIRED_SVG_DEPLOYED_MISSING", affectedAssetId: approved.assetId, safeDescription: `Approved SVG ${approved.assetId} is not in the public candidate output.`, requiredAction: "Deploy the approved matching SVG." }); continue; }
    const sourceHash = sha256(source); const deployedHash = sha256(deployed); const approvedHash = approved.sha256;
    if (sourceHash !== deployedHash || sourceHash !== manifestAsset.sha256 || sourceHash !== approvedHash) checks.push({ status: "FAIL", reasonCode: "REQUIRED_SVG_HASH_MISMATCH", affectedAssetId: approved.assetId, safeDescription: `Approved SVG ${approved.assetId} bytes do not match all authorized references.`, requiredAction: "Restore byte-identical approved source and deployment files." });
    else checks.push({ status: "PASS", reasonCode: "OK", affectedAssetId: approved.assetId, safeDescription: `Approved SVG ${approved.assetId} source and deployed bytes match.`, requiredAction: "None." });
  }
  return { checks, manifestAssetCount: Array.isArray(manifest.assets) ? manifest.assets.length : null };
}
