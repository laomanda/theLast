export type EvidenceCategory = "source" | "test" | "configuration" | "evidence" | "public-design-asset";
export type EntryRequirement = "required" | "optional";

export interface ProfileEntry {
  readonly path: string;
  readonly requirement: EntryRequirement;
  readonly category: EvidenceCategory;
}

export interface EvidenceProfile {
  readonly id: string;
  readonly version: string;
  readonly checkpointId: string;
  readonly purpose: string;
  readonly outputFilename: string;
  readonly entries: readonly ProfileEntry[];
}

export type PackagingReasonCode =
  | "UNKNOWN_PROFILE"
  | "UNSAFE_RELATIVE_PATH"
  | "PATH_OUTSIDE_ROOT"
  | "LINK_NOT_ALLOWED"
  | "RESTRICTED_PATH"
  | "UNCLASSIFIED_FILE"
  | "MISSING_REQUIRED_FILE"
  | "OPTIONAL_FILE_MISSING"
  | "DUPLICATE_ENTRY"
  | "CASE_COLLISION"
  | "OUTPUT_COLLISION"
  | "OUTPUT_INSIDE_SOURCE"
  | "SOURCE_CHANGED_DURING_PACKAGING"
  | "ARCHIVE_CREATION_FAILED"
  | "ARCHIVE_VERIFICATION_FAILED";

export interface PackagingIssue {
  readonly code: PackagingReasonCode;
  readonly path?: string;
  readonly message: string;
}

export interface InventoryEntry extends ProfileEntry {
  readonly sha256: string;
  readonly bytes: number;
}

export interface EvidenceManifest {
  readonly schemaVersion: 1;
  readonly packagingPolicyVersion: "CP-01D.3A-v1" | "CP-01D.3-v1";
  readonly project: "theLast";
  readonly profileId: string;
  readonly profileVersion: string;
  readonly checkpointId: string;
  readonly candidateGitRevision: string;
  readonly files: readonly InventoryEntry[];
}

export interface PackagingSuccess {
  readonly ok: true;
  readonly outputPath: string;
  readonly archiveSha256: string;
  readonly includedFileCount: number;
  readonly includedPayloadBytes: number;
  readonly manifestVerified: true;
  readonly warnings: readonly PackagingIssue[];
}

export interface PackagingFailure {
  readonly ok: false;
  readonly issues: readonly PackagingIssue[];
}

export type PackagingResult = PackagingSuccess | PackagingFailure;
