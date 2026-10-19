import type { AssetAuthorizationDeclaration, AuthorizationOrigin } from "./types.ts";

/**
 * Fixed, build-time declarations for the only currently evidence-backed
 * production assets. This module declares facts; it cannot issue trust.
 */
const REV5_EVIDENCE = "CP01D audit: source/deployed SHA-256 match; SVG_PRODUCTION_BASELINE_LOCKED";
const APPROVAL = { decisionRef: "CP01C-S01-S03-APPROVED-ASSET-USE", authority: "owner-approved evidence", version: "CP-01D.1" } as const;
const S05_APPROVAL = { decisionRef: "S05-PRODUCTION-REV5-CAKE-USE-2026-10-18", authority: "project owner S05 production authorization", version: "S05-production-implementation" } as const;
const S06_APPROVAL = { decisionRef: "S06-PRODUCTION-REV5-CANDLE-USE-2026-10-18", authority: "project owner S06 production authorization", version: "S06-production-implementation" } as const;

function approvedSvg(
  assetId: string,
  scene: "S01" | "S02" | "S03" | "S04",
  publicPath: string,
  sha256: string,
): AssetAuthorizationDeclaration {
  return {
    assetId,
    category: "design-svg",
    lifecycle: "APPROVED",
    existence: "present",
    provenance: { kind: "rev5-verified", evidenceRef: REV5_EVIDENCE },
    integrity: { declaredSha256: sha256, verification: { state: "verified", sha256, evidenceRef: REV5_EVIDENCE } },
    sceneAllocations: [scene],
    publication: { status: "approved", origin: APPROVAL, publicPath },
  };
}

function approvedCakeSvg(assetId: string, publicPath: string, sha256: string, sceneAllocations: readonly ("S05" | "S06")[], approval: AuthorizationOrigin = S05_APPROVAL): AssetAuthorizationDeclaration {
  return {
    assetId,
    category: "design-svg",
    lifecycle: "APPROVED",
    existence: "present",
    provenance: { kind: "rev5-verified", evidenceRef: REV5_EVIDENCE },
    integrity: { declaredSha256: sha256, verification: { state: "verified", sha256, evidenceRef: REV5_EVIDENCE } },
    sceneAllocations,
    publication: { status: "approved", origin: approval, publicPath },
  };
}

export const APPROVED_DESIGN_ASSET_DECLARATIONS = Object.freeze([
  approvedSvg("design.svg.a02-offset-loop-open", "S01", "/assets/svg/signature/offset-loop-open.svg", "9817f8a81ba819cb97ba6a4cfa55aa18d9e45bd1410639fcf5f46b29e4bbd84b"),
  approvedSvg("design.svg.e01-invitation-fold", "S02", "/assets/svg/paper/invitation-paper-fold.svg", "36db65e25b8ea23bf326ab9082ea8d89b39f0173450e93a00431cb740f559cfc"),
  approvedSvg("design.svg.c01-celebration-arc", "S03", "/assets/svg/celebration/celebration-arc.svg", "a652d90982ab873ead34d961a018e086ee8b544f83ec3698a6584d82d486f097"),
  approvedSvg("design.svg.c02-celebration-burst", "S03", "/assets/svg/celebration/celebration-burst.svg", "49856bac2d792d20bcf5435c0aee8a1cc9969f9b52219acf63bb0c1d53bcc42a"),
  approvedSvg("design.svg.b02-editorial-frame-portrait", "S04", "/assets/svg/editorial/editorial-frame-portrait.svg", "4a520ac9e73bec6eac5097164bef13442ba49066c8f820cba93947c6f8e546b4"),
  approvedCakeSvg("design.svg.d01-cake-body-base", "/assets/svg/cake/cake-body-base.svg", "ad7ca0a004c47e3f022dcfede91fb62fc87a0c48632330b81d19237471470cd6", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d02-cake-frosting-silhouette", "/assets/svg/cake/cake-frosting-silhouette.svg", "f0d163af0772c24bdbdd404d202f9d49dc7d05487d9b92d4dc75dbddf1a5d766", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d03-cake-frosting-edge", "/assets/svg/cake/cake-frosting-edge.svg", "5f2291d09392a9d18ce66454f742f56f2ed9fd9b35afe044fea4f849d065a10c", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d04-candle-body", "/assets/svg/cake/candle-body.svg", "020de9453e8222e2239a0adc6cb3133e573440256544f7a8fc8f4c4ded950f37", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d05-candle-flame", "/assets/svg/cake/candle-flame.svg", "2c11025543a4870a845e492782e4f843db59272c64dbf8da253e6bb212df0c3d", ["S06"], S06_APPROVAL),
  approvedCakeSvg("design.svg.d06-candle-wick", "/assets/svg/cake/candle-wick.svg", "e8eee65356392e98c2b74523153aac7a6c09900b31f22a1f5a6f25eeb858b68d", ["S06"], S06_APPROVAL),
  approvedCakeSvg("design.svg.d07-flower-bloom", "/assets/svg/cake/flower-bloom.svg", "924c7ba698830c46a9ba44475e58d4d6f70c9909c720269c03515e444b9f490d", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d08-flower-leaf", "/assets/svg/cake/flower-leaf.svg", "954b3f98983fbde4135b7b89b2a263c254de0f31a88edeaee3ce7888836e412f", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d09-cake-topper", "/assets/svg/cake/cake-topper.svg", "eda9d9806019c47cf4c40fb6939e428114fbd5842a66cbb5702da0ca77f5fff6", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d10-cake-accent-pearl", "/assets/svg/cake/cake-accent-pearl.svg", "11fa815c03f90daa85bd33baa8d6c2a8a67c431ea5c5a28e6620fbe2ec7fffe0", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d11-cake-accent-ribbon", "/assets/svg/cake/cake-accent-ribbon.svg", "9cc9141e97114793b09233bde781812aea4a84fb336b96734b8dbc00f8ae1a07", ["S05", "S06"]),
  approvedCakeSvg("design.svg.d12-candle-smoke", "/assets/svg/cake/candle-smoke.svg", "0870ce17d33c9193f8ab83cd4267e894e606cb4f1d6d9bdf3f160d4b195aecf2", ["S06"], S06_APPROVAL),
]);

const S04_PHOTO_EVIDENCE =
  "Owner-authorized S04 portrait; source SHA-256 a70ee21b50e291b1f30a4618951c13f0645d654c8aef95c77493cc9daafcea0f; metadata-free derivative SHA-256 8e6ded047c168eb56f4b4d2b3ef7a15eaa12d4c68f28045d5418200573544b1b";

/** Fixed declaration for the single owner-authorized S04 production derivative. */
export const APPROVED_S04_PHOTO_DECLARATION: AssetAuthorizationDeclaration = Object.freeze({
  assetId: "photo.s04.owner-authorized-portrait",
  category: "authentic-photo",
  lifecycle: "APPROVED",
  existence: "present",
  provenance: { kind: "owner-authenticity-evidenced", evidenceRef: S04_PHOTO_EVIDENCE },
  integrity: {
    declaredSha256: "8e6ded047c168eb56f4b4d2b3ef7a15eaa12d4c68f28045d5418200573544b1b",
    verification: {
      state: "verified",
      sha256: "8e6ded047c168eb56f4b4d2b3ef7a15eaa12d4c68f28045d5418200573544b1b",
      evidenceRef: S04_PHOTO_EVIDENCE,
    },
  },
  sceneAllocations: ["S04"],
  publication: {
    status: "approved",
    origin: {
      decisionRef: "S04-PRODUCTION-PHOTO-AUTHORIZATION-2026-10-18",
      authority: "project owner explicit S04 production-use approval",
      version: "S04-production-implementation",
    },
    publicPath: "/assets/photos/s04-portrait.webp",
  },
  photoPresentation: {
    width: 900,
    height: 1200,
    approvedAspectRatio: "3:4",
    cropPolicy: "full-frame contain; no face crop",
    focalPoint: { x: 0.5, y: 0.34 },
    responsivePublicPaths: ["/assets/photos/s04-portrait.webp"],
    altText: "Portrait of Malica looking toward the camera.",
  },
  privateSourceReference: "restricted://owner-authorized-s04-source",
} satisfies AssetAuthorizationDeclaration);
