import { existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { CURRENT_S04_PHOTO_AUTHORIZATIONS } from "../assets/authorization/registry.ts";
import { evaluateS04PhotoReadiness } from "../assets/authorization/policy.ts";
import { projectAuthorizedPublicAsset } from "../assets/authorization/policy.ts";
import { attestRegularFiles, listRegularFiles } from "./filesystem.ts";
import { evaluateOwnerReleaseAuthorization, evaluateSceneCompleteness } from "./policy.ts";
import { resolveTrustedOwnerReleaseAuthorization, resolveTrustedSceneReleaseEvidence } from "./trusted-readiness.ts";
import { verifyRequiredSvgs } from "./svg-integrity.ts";
import type { ReleaseCheck, ReleaseValidationResult } from "./types.ts";

const PHOTO_EXTENSIONS = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const revision = (root: string) => { try { return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { return "unavailable"; } };
const extension = (file: string) => file.slice(file.lastIndexOf(".")).toLowerCase();

export function validateCurrentRelease(workspaceRoot = process.cwd()): ReleaseValidationResult {
  const checks: ReleaseCheck[] = [];
  const publicRoot = join(workspaceRoot, "public");
  const publicInventory = listRegularFiles(publicRoot);
  if (publicInventory.missing || publicInventory.unsafe) checks.push({ status: "BLOCKED", reasonCode: "PUBLIC_ASSET_ROOT_UNSAFE", safeDescription: "The public asset root is unavailable or contains an unsafe link.", requiredAction: "Provide a regular, inspectable public asset root." });
  const authorizedPublicPhotos = new Set(
    CURRENT_S04_PHOTO_AUTHORIZATIONS
      .map((record) => projectAuthorizedPublicAsset(record, "S04")?.publicPath.replace(/^\//, ""))
      .filter((value): value is string => Boolean(value)),
  );
  publicInventory.files
    .filter((value) => !value.startsWith("!unsafe-") && PHOTO_EXTENSIONS.has(extension(value)))
    .filter((value) => !authorizedPublicPhotos.has(value.replaceAll("\\", "/")))
    .forEach(() => checks.push({ status: "FAIL", reasonCode: "PUBLIC_PHOTO_UNAUTHORIZED", safeDescription: "A client-accessible image artifact has no authorized photo publication record.", requiredAction: "Remove it from candidate output or authorize it through the photo workflow." }));
  const staticRoot = join(workspaceRoot, ".next", "static");
  const staticInventory = listRegularFiles(staticRoot);
  const staticAttestation = attestRegularFiles(staticRoot);
  const buildIdentity = join(workspaceRoot, ".next", "BUILD_ID");
  const buildManifest = join(workspaceRoot, ".next", "build-manifest.json");
  if (!existsSync(buildIdentity) || !existsSync(buildManifest) || staticInventory.missing || staticInventory.unsafe) checks.push({ status: "BLOCKED", reasonCode: "CANDIDATE_BUILD_OUTPUT_MISSING", safeDescription: "The supported Next candidate output (.next/BUILD_ID, .next/build-manifest.json, and .next/static) is unavailable or unsafe.", requiredAction: "Run a clean build in the validated candidate workspace." });
  const staticRaster = staticInventory.files.filter((value) => !value.startsWith("!unsafe-") && PHOTO_EXTENSIONS.has(extension(value)));
  for (const file of staticRaster) checks.push({ status: "FAIL", reasonCode: "GENERATED_RASTER_UNAUTHORIZED", safeDescription: `A generated candidate ${extension(file)} raster has no explicit release asset classification.`, requiredAction: "Classify the generated asset through the approved asset workflow or remove it from the candidate output." });
  if (staticAttestation.fingerprint === null && !staticInventory.missing) checks.push({ status: "BLOCKED", reasonCode: "CANDIDATE_OUTPUT_INTEGRITY_UNVERIFIED", safeDescription: "The generated candidate output could not receive a bounded integrity attestation.", requiredAction: "Validate a regular, unchanged candidate output before deployment." });
  const s04PhotoReadiness = evaluateS04PhotoReadiness(CURRENT_S04_PHOTO_AUTHORIZATIONS);
  if (s04PhotoReadiness.status === "HOLD") checks.push({ status: "BLOCKED", reasonCode: "S04_PHOTO_HOLD", affectedScene: "S04", safeDescription: "S04 has zero approved authentic photographs; no private source was inspected.", requiredAction: "Complete the authorized one-photo S04 publication workflow." });
  if (s04PhotoReadiness.status === "DENY") checks.push({ status: "FAIL", reasonCode: "S04_PHOTO_POLICY_DENY", affectedScene: "S04", safeDescription: "S04 photo readiness is denied by the fixed asset-authorization policy.", requiredAction: "Resolve the S04 photo authorization policy before release." });
  checks.push(...evaluateSceneCompleteness(resolveTrustedSceneReleaseEvidence()));
  checks.push(evaluateOwnerReleaseAuthorization(resolveTrustedOwnerReleaseAuthorization(revision(workspaceRoot))));
  const svg = verifyRequiredSvgs(workspaceRoot); checks.push(...svg.checks);
  const ordered = checks.sort((a, b) => `${a.affectedScene ?? ""}:${a.affectedAssetId ?? ""}:${a.reasonCode}`.localeCompare(`${b.affectedScene ?? ""}:${b.affectedAssetId ?? ""}:${b.reasonCode}`));
  const verdict = ordered.some((check) => check.status === "FAIL" || check.status === "BLOCKED") ? "NOT_READY" : "READY";
  return { ready: verdict === "READY", verdict, candidateRevision: revision(workspaceRoot), validatedAt: new Date().toISOString(), checks: ordered, inventory: { publicFileCount: publicInventory.files.filter((file) => !file.startsWith("!unsafe-")).length + staticInventory.files.filter((file) => !file.startsWith("!unsafe-")).length, candidateOutput: existsSync(buildIdentity) && !staticInventory.missing ? "next-public-and-static" : "unavailable", manifestAssetCount: svg.manifestAssetCount, candidateOutputAttestation: staticAttestation.fingerprint } };
}

export function formatReleaseResult(result: ReleaseValidationResult): string {
  const lines = [`Release verdict: ${result.verdict}`, `Candidate revision: ${result.candidateRevision}`, `Public/candidate files inspected: ${result.inventory.publicFileCount}`];
  for (const check of result.checks.filter((check) => check.status !== "PASS")) lines.push(`${check.status} ${check.reasonCode}${check.affectedScene ? ` [${check.affectedScene}]` : ""}${check.affectedAssetId ? ` [${check.affectedAssetId}]` : ""}: ${check.safeDescription}`);
  return lines.join("\n");
}
