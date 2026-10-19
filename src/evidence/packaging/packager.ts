import { execFileSync } from "node:child_process";
import { constants, copyFileSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { createArchive, hashFile, inspectArchive, type ArchiveEntry } from "./archive.ts";
import { buildInventory, hashBytes } from "./inventory.ts";
import { getRegisteredProfile } from "./profiles.ts";
import type { EvidenceManifest, EvidenceProfile, InventoryEntry, PackagingIssue, PackagingResult } from "./types.ts";

export const manifestName = "EVIDENCE_MANIFEST.json";
export const reportName = "PACKAGING_REPORT.md";
export const currentPolicyVersion = "CP-01D.3A-v1";

const revision = (root: string) => {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "unavailable";
  }
};

const stableJson = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;

export function generatePackagingReport(profile: EvidenceProfile, files: readonly InventoryEntry[]): string {
  return [
    "# theLast Evidence Package",
    "",
    `Profile: ${profile.id} v${profile.version}`,
    `Checkpoint: ${profile.checkpointId}`,
    `Purpose: ${profile.purpose}`,
    `Payload files: ${files.length}`,
    "",
    "This archive is audit evidence only. It does not grant publication or deployment authorization.",
    "",
  ].join("\n");
}

function outputRootIssue(projectRoot: string, outputRoot: string): PackagingIssue | null {
  if (!isAbsolute(outputRoot)) return { code: "OUTPUT_INSIDE_SOURCE", message: "Output directory must be absolute." };
  try {
    const stat = lstatSync(outputRoot);
    if (!stat.isDirectory() || stat.isSymbolicLink()) return { code: "OUTPUT_INSIDE_SOURCE", message: "Output directory must be a real directory." };
    const project = realpathSync(projectRoot);
    const output = realpathSync(outputRoot);
    const rel = relative(project, output);
    if (rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel))) {
      return { code: "OUTPUT_INSIDE_SOURCE", message: "Output directory cannot be inside the project source." };
    }
  } catch {
    return { code: "OUTPUT_INSIDE_SOURCE", message: "Output directory is unavailable." };
  }
  return null;
}

export function verifyExtractedArchive(params: {
  inspectedEntries: readonly ArchiveEntry[];
  extractionRoot: string;
  expectedProfile: EvidenceProfile;
  expectedInventory: readonly InventoryEntry[];
  expectedManifest: EvidenceManifest;
  expectedReport: string;
}): { ok: true } | { ok: false; reason: string } {
  const { inspectedEntries, extractionRoot, expectedProfile, expectedInventory, expectedManifest, expectedReport } = params;

  // 1. Verify manifest existence on disk
  const manifestDiskPath = join(extractionRoot, manifestName);
  if (!existsSync(manifestDiskPath)) return { ok: false, reason: "Manifest file missing from extracted archive." };

  let extractedManifest: EvidenceManifest;
  try {
    extractedManifest = JSON.parse(readFileSync(manifestDiskPath, "utf8")) as EvidenceManifest;
  } catch {
    return { ok: false, reason: "Manifest JSON could not be parsed." };
  }

  const expectedManifestKeys = ["candidateGitRevision", "checkpointId", "files", "packagingPolicyVersion", "profileId", "profileVersion", "project", "schemaVersion"];
  if (JSON.stringify(Object.keys(extractedManifest).sort()) !== JSON.stringify(expectedManifestKeys)) {
    return { ok: false, reason: "Manifest schema keys do not match the expected schema." };
  }

  // 2. Validate exact schema and metadata
  if (extractedManifest.schemaVersion !== 1) return { ok: false, reason: `Invalid manifest schemaVersion: ${extractedManifest.schemaVersion}` };
  if (extractedManifest.packagingPolicyVersion !== expectedManifest.packagingPolicyVersion) {
    return { ok: false, reason: `Policy version mismatch: ${extractedManifest.packagingPolicyVersion} !== ${expectedManifest.packagingPolicyVersion}` };
  }
  if (extractedManifest.project !== "theLast") return { ok: false, reason: `Project name mismatch: ${extractedManifest.project}` };
  if (extractedManifest.profileId !== expectedProfile.id) return { ok: false, reason: `Profile ID mismatch: ${extractedManifest.profileId} !== ${expectedProfile.id}` };
  if (extractedManifest.profileVersion !== expectedProfile.version) return { ok: false, reason: `Profile version mismatch: ${extractedManifest.profileVersion} !== ${expectedProfile.version}` };
  if (extractedManifest.checkpointId !== expectedProfile.checkpointId) return { ok: false, reason: `Checkpoint ID mismatch: ${extractedManifest.checkpointId} !== ${expectedProfile.checkpointId}` };
  if (extractedManifest.candidateGitRevision !== expectedManifest.candidateGitRevision) {
    return { ok: false, reason: `Git revision mismatch: ${extractedManifest.candidateGitRevision} !== ${expectedManifest.candidateGitRevision}` };
  }

  // 3. Validate manifest file list integrity
  if (!Array.isArray(extractedManifest.files)) return { ok: false, reason: "Manifest files property is not an array." };
  if (extractedManifest.files.length !== expectedInventory.length) {
    return { ok: false, reason: `Manifest file count mismatch: ${extractedManifest.files.length} !== ${expectedInventory.length}` };
  }

  const expectedMap = new Map<string, InventoryEntry>(expectedInventory.map((item) => [item.path, item]));
  const manifestPaths = new Set<string>();

  for (const file of extractedManifest.files) {
    if (!file || typeof file.path !== "string") return { ok: false, reason: "Manifest contains invalid file entry structure." };
    const expectedFileKeys = ["bytes", "category", "path", "requirement", "sha256"];
    if (JSON.stringify(Object.keys(file).sort()) !== JSON.stringify(expectedFileKeys)) return { ok: false, reason: `Manifest file schema mismatch for ${file.path ?? "unknown"}` };
    if (manifestPaths.has(file.path)) return { ok: false, reason: `Duplicate file path in manifest: ${file.path}` };
    manifestPaths.add(file.path);

    const expected = expectedMap.get(file.path);
    if (!expected) return { ok: false, reason: `Unexpected file path in manifest: ${file.path}` };
    if (file.requirement !== expected.requirement) return { ok: false, reason: `Requirement classification mismatch for ${file.path}: ${file.requirement} !== ${expected.requirement}` };
    if (file.category !== expected.category) return { ok: false, reason: `Evidence category mismatch for ${file.path}: ${file.category} !== ${expected.category}` };
    if (file.bytes !== expected.bytes) return { ok: false, reason: `Byte count mismatch in manifest for ${file.path}: ${file.bytes} !== ${expected.bytes}` };
    if (file.sha256 !== expected.sha256) return { ok: false, reason: `SHA-256 hash mismatch in manifest for ${file.path}: ${file.sha256} !== ${expected.sha256}` };
  }

  if (manifestPaths.size !== expectedInventory.length) {
    return { ok: false, reason: `Manifest path set count mismatch: ${manifestPaths.size} !== ${expectedInventory.length}` };
  }

  // 4. Compare actual archive entries against extracted manifest and expected inventory
  const inspectedMap = new Map<string, ArchiveEntry>(inspectedEntries.map((entry) => [entry.path, entry]));
  const allowedArchiveEntries = new Set([...expectedInventory.map((e) => e.path), manifestName, reportName]);

  if (inspectedEntries.length !== allowedArchiveEntries.size) {
    return { ok: false, reason: `Total archive entry count mismatch: ${inspectedEntries.length} !== ${allowedArchiveEntries.size}` };
  }

  for (const inspected of inspectedEntries) {
    if (!allowedArchiveEntries.has(inspected.path)) {
      return { ok: false, reason: `Unexpected entry found in archive: ${inspected.path}` };
    }
  }

  const manifestEntry = inspectedMap.get(manifestName);
  const reportEntry = inspectedMap.get(reportName);
  if (!manifestEntry || !reportEntry) return { ok: false, reason: "Manifest or packaging report archive entry is missing." };
  const manifestDiskBytes = readFileSync(manifestDiskPath);
  if (manifestEntry.bytes !== manifestDiskBytes.byteLength || manifestEntry.sha256 !== hashBytes(manifestDiskBytes)) {
    return { ok: false, reason: "Archive manifest entry does not match extracted manifest bytes." };
  }

  for (const manifestFile of extractedManifest.files) {
    const archiveEntry = inspectedMap.get(manifestFile.path);
    if (!archiveEntry) return { ok: false, reason: `File declared in manifest missing from archive entries: ${manifestFile.path}` };
    if (archiveEntry.bytes !== manifestFile.bytes) return { ok: false, reason: `Archive entry bytes mismatch for ${manifestFile.path}: ${archiveEntry.bytes} !== ${manifestFile.bytes}` };
    if (archiveEntry.sha256 !== manifestFile.sha256) return { ok: false, reason: `Archive entry SHA-256 mismatch for ${manifestFile.path}: ${archiveEntry.sha256} !== ${manifestFile.sha256}` };

    const diskPath = join(extractionRoot, ...manifestFile.path.split("/"));
    if (!existsSync(diskPath)) return { ok: false, reason: `Extracted file missing on disk: ${manifestFile.path}` };
    const diskBytes = readFileSync(diskPath);
    if (diskBytes.byteLength !== manifestFile.bytes) return { ok: false, reason: `Extracted disk byte length mismatch for ${manifestFile.path}: ${diskBytes.byteLength} !== ${manifestFile.bytes}` };
    if (hashBytes(diskBytes) !== manifestFile.sha256) return { ok: false, reason: `Extracted disk SHA-256 mismatch for ${manifestFile.path}: ${hashBytes(diskBytes)} !== ${manifestFile.sha256}` };
  }

  // 5. Verify packaging report consistency
  const reportDiskPath = join(extractionRoot, reportName);
  if (!existsSync(reportDiskPath)) return { ok: false, reason: "Packaging report file missing from extracted archive." };
  const extractedReport = readFileSync(reportDiskPath, "utf8");
  if (extractedReport !== expectedReport) return { ok: false, reason: "Extracted packaging report content mismatch." };
  const reportDiskBytes = readFileSync(reportDiskPath);
  if (reportEntry.bytes !== reportDiskBytes.byteLength || reportEntry.sha256 !== hashBytes(reportDiskBytes)) {
    return { ok: false, reason: "Archive packaging report entry does not match extracted report bytes." };
  }

  return { ok: true };
}

export function packageEvidence(options: { projectRoot: string; profileId: string; outputRoot?: string }): PackagingResult {
  const profile = getRegisteredProfile(options.profileId);
  if (!profile) return { ok: false, issues: [{ code: "UNKNOWN_PROFILE", message: "Only registered, versioned profiles may be packaged." }] };

  const projectRoot = resolve(options.projectRoot);
  const outputRoot = resolve(options.outputRoot ?? join(homedir(), "Downloads"));
  const outputIssue = outputRootIssue(projectRoot, outputRoot);
  if (outputIssue) return { ok: false, issues: [outputIssue] };

  const outputPath = join(outputRoot, profile.outputFilename);
  if (existsSync(outputPath)) {
    return { ok: false, issues: [{ code: "OUTPUT_COLLISION", path: profile.outputFilename, message: "Output archive already exists and will not be overwritten." }] };
  }

  const prepared = buildInventory(projectRoot, profile);
  if (prepared.issues.length) return { ok: false, issues: prepared.issues };

  const manifest: EvidenceManifest = {
    schemaVersion: 1,
    packagingPolicyVersion: currentPolicyVersion,
    project: "theLast",
    profileId: profile.id,
    profileVersion: profile.version,
    checkpointId: profile.checkpointId,
    candidateGitRevision: revision(projectRoot),
    files: prepared.inventory,
  };

  const report = generatePackagingReport(profile, prepared.inventory);
  const staging = mkdtempSync(join(tmpdir(), "thelast-evidence-stage-"));
  const extraction = mkdtempSync(join(tmpdir(), "thelast-evidence-verify-"));
  let exclusivelyCreatedOutput = false;

  try {
    for (const entry of prepared.inventory) {
      const source = join(projectRoot, ...entry.path.split("/"));
      const target = join(staging, ...entry.path.split("/"));
      mkdirSync(dirname(target), { recursive: true });
      copyFileSync(source, target);
      const copied = readFileSync(target);
      if (copied.byteLength !== entry.bytes || hashBytes(copied) !== entry.sha256) {
        return { ok: false, issues: [{ code: "SOURCE_CHANGED_DURING_PACKAGING", path: entry.path, message: "Source bytes changed during packaging." }] };
      }
    }

    writeFileSync(join(staging, manifestName), stableJson(manifest), { encoding: "utf8", flag: "wx" });
    writeFileSync(join(staging, reportName), report, { encoding: "utf8", flag: "wx" });

    const temporaryArchive = join(staging, "temporary_package.zip");
    const archiveEntries = [...prepared.inventory.map((entry) => entry.path), manifestName, reportName].sort();
    const bridge = join(projectRoot, "src", "evidence", "packaging", "zip-bridge.ps1");

    try {
      createArchive(bridge, staging, temporaryArchive, archiveEntries);
    } catch {
      return { ok: false, issues: [{ code: "ARCHIVE_CREATION_FAILED", message: "ZIP creation failed safely." }] };
    }

    try {
      const inspected = inspectArchive(bridge, temporaryArchive, extraction);
      const verification = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: extraction,
        expectedProfile: profile,
        expectedInventory: prepared.inventory,
        expectedManifest: manifest,
        expectedReport: report,
      });

      if (!verification.ok) {
        return { ok: false, issues: [{ code: "ARCHIVE_VERIFICATION_FAILED", message: `ZIP post-creation verification failed: ${verification.reason}` }] };
      }
    } catch (error) {
      return { ok: false, issues: [{ code: "ARCHIVE_VERIFICATION_FAILED", message: `ZIP post-creation verification failed: ${(error as Error).message}` }] };
    }

    // Controlled finalization with exclusive creation semantics
    if (existsSync(outputPath)) {
      return { ok: false, issues: [{ code: "OUTPUT_COLLISION", path: profile.outputFilename, message: "Output archive already exists and will not be overwritten." }] };
    }

    try {
      copyFileSync(temporaryArchive, outputPath, constants.COPYFILE_EXCL);
      exclusivelyCreatedOutput = true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "EEXIST") {
        return { ok: false, issues: [{ code: "OUTPUT_COLLISION", path: profile.outputFilename, message: "Output archive already exists and will not be overwritten." }] };
      }
      return { ok: false, issues: [{ code: "ARCHIVE_CREATION_FAILED", message: "Failed to finalize archive to destination output path." }] };
    }

    const finalSha256 = hashFile(outputPath);
    const tempSha256 = hashFile(temporaryArchive);
    if (finalSha256 !== tempSha256) {
      if (exclusivelyCreatedOutput && existsSync(outputPath)) rmSync(outputPath, { force: true });
      return { ok: false, issues: [{ code: "ARCHIVE_VERIFICATION_FAILED", message: "Finalized archive SHA-256 does not match verified archive." }] };
    }

    return {
      ok: true,
      outputPath,
      archiveSha256: finalSha256,
      includedFileCount: prepared.inventory.length,
      includedPayloadBytes: prepared.inventory.reduce((sum, entry) => sum + entry.bytes, 0),
      manifestVerified: true,
      warnings: prepared.warnings,
    };
  } finally {
    rmSync(staging, { recursive: true, force: true });
    rmSync(extraction, { recursive: true, force: true });
  }
}
