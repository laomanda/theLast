import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { buildInventory, isStructurallyValidPng } from "../../src/evidence/packaging/inventory";
import { getApprovedScreenshotPaths, normalizeEntryPath, privacyDenial, validateProfileEntries } from "../../src/evidence/packaging/policy";
import { EVIDENCE_PROFILES, getRegisteredProfile } from "../../src/evidence/packaging/profiles";
import { generatePackagingReport, packageEvidence, verifyExtractedArchive } from "../../src/evidence/packaging/packager";
import type { ArchiveEntry } from "../../src/evidence/packaging/archive";
import type { EvidenceManifest, EvidenceProfile, InventoryEntry } from "../../src/evidence/packaging/types";

const roots: string[] = [];
const temp = () => { const root = mkdtempSync(join(tmpdir(), "thelast-packaging-test-")); roots.push(root); return root; };
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
const profile = (entries: EvidenceProfile["entries"]): EvidenceProfile => ({ id: "synthetic", version: "1", checkpointId: "TEST", purpose: "synthetic", outputFilename: "synthetic.zip", entries });
const required = (path: string, category: EvidenceProfile["entries"][number]["category"] = "source") => ({ path, requirement: "required" as const, category });

function makeMinimalValidPng(): Buffer {
  const chunk = (type: string, data: number[]) => {
    const bytes = Buffer.from(data);
    const typeBytes = Buffer.from(type, "ascii");
    let crc = 0xffffffff;
    for (const value of Buffer.concat([typeBytes, bytes])) {
      crc ^= value;
      for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
    const result = Buffer.alloc(12 + bytes.length);
    result.writeUInt32BE(bytes.length, 0);
    typeBytes.copy(result, 4);
    bytes.copy(result, 8);
    result.writeUInt32BE((crc ^ 0xffffffff) >>> 0, 8 + bytes.length);
    return result;
  };
  const buf = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", [0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0]),
    chunk("IDAT", [0]),
    chunk("IEND", []),
  ]);
  return buf;
/*
  // PNG signature
  buf.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
  // IHDR chunk: length 13
  buf.writeUInt32BE(13, 8);
  buf.set([0x49, 0x48, 0x44, 0x52], 12); // "IHDR"
  buf.writeUInt32BE(100, 16); // width
  buf.writeUInt32BE(100, 20); // height
  buf.set([8, 6, 0, 0, 0], 24); // depth, color, comp, filt, interl
  buf.writeUInt32BE(0, 29); // crc placeholder
  return buf; */
}

describe("CP-01D.3A evidence packaging security and integrity closure", () => {
  it("denies unknown profiles and does not accept caller-defined approval", () => {
    expect(getRegisteredProfile("forged")).toBeNull();
    expect(getRegisteredProfile(JSON.stringify({ approved: true }))).toBeNull();
  });

  it.each(["../secret.md", "C:\\secret.md", "\\\\server\\share\\secret.md", "safe\\..\\secret.md", "/absolute.md"])(
    "rejects unsafe path %s",
    (path) => expect(normalizeEntryPath(path)).toBeNull()
  );

  it.each([
    ".env",
    ".env.local",
    "assets/malica.webp",
    "node_modules/pkg/a.ts",
    ".next/static/a.js",
    "font/a.woff2",
    "keys/private.pem",
    "vault/model.glb",
  ])("hard-denies restricted path %s", (path) => expect(privacyDenial(path)?.code).toBe("RESTRICTED_PATH"));

  it("denies unknown extensions instead of treating them as evidence", () => {
    expect(privacyDenial("evidence/unknown.bin")?.code).toBe("UNCLASSIFIED_FILE");
  });

  it("detects duplicate normalized entries", () => {
    expect(validateProfileEntries([required("a/file.ts"), required("a/file.ts")])).toContainEqual(
      expect.objectContaining({ code: "DUPLICATE_ENTRY" })
    );
  });

  it("detects Windows case-insensitive collisions", () => {
    expect(validateProfileEntries([required("A/file.ts"), required("a/file.ts")])).toContainEqual(
      expect.objectContaining({ code: "CASE_COLLISION" })
    );
  });

  it("fails closed for a missing required file", () => {
    const root = temp();
    expect(buildInventory(root, profile([required("missing.md")])).issues).toContainEqual(
      expect.objectContaining({ code: "MISSING_REQUIRED_FILE" })
    );
  });

  it("warns for a missing optional file", () => {
    const root = temp();
    const result = buildInventory(root, profile([{ path: "missing.md", requirement: "optional", category: "evidence" }]));
    expect(result.issues).toEqual([]);
    expect(result.warnings).toContainEqual(expect.objectContaining({ code: "OPTIONAL_FILE_MISSING" }));
  });

  it("hashes an exact approved fictional fixture", () => {
    const root = temp();
    mkdirSync(join(root, "safe"));
    writeFileSync(join(root, "safe", "file.md"), "fictional evidence\n");
    const result = buildInventory(root, profile([required("safe/file.md")]));
    expect(result.issues).toEqual([]);
    expect(result.inventory[0]).toMatchObject({ path: "safe/file.md", bytes: 19, sha256: expect.stringMatching(/^[a-f0-9]{64}$/) });
  });

  it("rejects a symlink input where supported", () => {
    const root = temp();
    writeFileSync(join(root, "target.md"), "safe");
    try {
      symlinkSync(join(root, "target.md"), join(root, "link.md"), "file");
    } catch {
      return;
    }
    expect(buildInventory(root, profile([required("link.md")])).issues).toContainEqual(
      expect.objectContaining({ code: "LINK_NOT_ALLOWED" })
    );
  });

  it("registers explicit, versioned project profiles including CP-01D.3A", () => {
    expect(getRegisteredProfile("checkpoint-cp01d3a")).toMatchObject({ version: "1.0.0", checkpointId: "CP-01D.3A" });
    expect(getRegisteredProfile("checkpoint-cp01d3")).toMatchObject({ version: "1.0.0", checkpointId: "CP-01D.3" });
    expect(getRegisteredProfile("governance-cp01d2")).not.toBeNull();
    expect(getRegisteredProfile("scene-s03-audit")).not.toBeNull();
  });

  describe("Deep profile immutability and anti-tampering (Section 2)", () => {
    it("ensures EVIDENCE_PROFILES and all nested profiles, entries, and objects are deeply frozen", () => {
      expect(Object.isFrozen(EVIDENCE_PROFILES)).toBe(true);
      const s03 = EVIDENCE_PROFILES["scene-s03-audit"];
      expect(Object.isFrozen(s03)).toBe(true);
      expect(Object.isFrozen(s03.entries)).toBe(true);
      expect(s03.entries.length).toBeGreaterThan(0);
      for (const entry of s03.entries) {
        expect(Object.isFrozen(entry)).toBe(true);
      }
    });

    it("rejects attempts to inject new files or mutate profile entries", () => {
      const p = getRegisteredProfile("scene-s03-audit");
      expect(p).not.toBeNull();
      expect(Object.isFrozen(p)).toBe(true);
      expect(Object.isFrozen(p!.entries)).toBe(true);

      expect(() => {
        (p!.entries as unknown as unknown[]).push({ path: "injected.ts", requirement: "required", category: "source" });
      }).toThrow();

      expect(() => {
        (EVIDENCE_PROFILES["scene-s03-audit"].entries as unknown as unknown[]).push({
          path: "injected.ts",
          requirement: "required",
          category: "source",
        });
      }).toThrow();

      // Verify that after failed mutation attempts, the registry remains unpolluted
      const fresh = getRegisteredProfile("scene-s03-audit");
      expect(fresh!.entries.some((entry) => entry.path === "injected.ts")).toBe(false);
    });

    it("rejects adding arbitrary new profiles to the fixed registry", () => {
      expect(() => {
        (EVIDENCE_PROFILES as Record<string, unknown>)["dynamic-fake"] = { id: "dynamic-fake" };
      }).toThrow();
      expect(getRegisteredProfile("dynamic-fake")).toBeNull();
    });
  });

  describe("Output collision ownership and non-destructive cleanup (Section 3)", () => {
    it("refuses to overwrite and NEVER deletes an existing pre-owned archive", () => {
      const root = temp();
      const output = temp();
      const preExistingArchive = join(output, "THELAST_CP01D3A_EVIDENCE_AUDIT.zip");
      const foreignData = "PRE_EXISTING_OWNED_ARCHIVE_DATA_DO_NOT_DELETE";
      writeFileSync(preExistingArchive, foreignData, "utf8");

      const result = packageEvidence({ projectRoot: root, profileId: "checkpoint-cp01d3a", outputRoot: output });
      expect(result).toMatchObject({ ok: false, issues: [expect.objectContaining({ code: "OUTPUT_COLLISION" })] });

      // Crucial ownership test: Verify file was NOT deleted or overwritten
      expect(readFileSync(preExistingArchive, "utf8")).toBe(foreignData);
    });
  });

  describe("Approved browser screenshots and PNG integrity (Section 5)", () => {
    it("permits approved S03 screenshots and public SVGs", () => {
      for (const approvedPath of getApprovedScreenshotPaths()) {
        expect(privacyDenial(approvedPath)).toBeNull();
      }
      expect(privacyDenial("public/assets/svg/celebration/celebration-arc.svg")).toBeNull();
      expect(privacyDenial("public/assets/svg/celebration/celebration-burst.svg")).toBeNull();
    });

    it("strictly denies unapproved screenshot paths and arbitrary PNGs", () => {
      expect(privacyDenial("planning/evidence/screenshots/unapproved.png")?.code).toBe("UNCLASSIFIED_FILE");
      expect(privacyDenial("planning/evidence/screenshots/cp01c3/unapproved_shot.png")?.code).toBe("UNCLASSIFIED_FILE");
      expect(privacyDenial("src/ui/screenshot.png")?.code).toBe("UNCLASSIFIED_FILE");
      expect(privacyDenial("assets/malica.webp")?.code).toBe("RESTRICTED_PATH");
      expect(privacyDenial("assets/photo.png")?.code).toBe("RESTRICTED_PATH");
    });

    it("verifies PNG container structure with CRC and terminal-chunk checks", () => {
      const valid = makeMinimalValidPng();
      expect(isStructurallyValidPng(valid)).toBe(true);

      const invalidMagic = Buffer.from(valid);
      invalidMagic[0] = 0x00;
      expect(isStructurallyValidPng(invalidMagic)).toBe(false);

      const invalidIhdr = Buffer.from(valid);
      invalidIhdr[12] = 0x58; // 'X' instead of 'I'
      expect(isStructurallyValidPng(invalidIhdr)).toBe(false);

      const zeroDimension = Buffer.from(valid);
      zeroDimension.writeUInt32BE(0, 16); // zero width
      expect(isStructurallyValidPng(zeroDimension)).toBe(false);

      const tooShort = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
      expect(isStructurallyValidPng(tooShort)).toBe(false);

      const badCrc = Buffer.from(valid);
      badCrc[badCrc.length - 1] ^= 0xff;
      expect(isStructurallyValidPng(badCrc)).toBe(false);

      const truncated = valid.subarray(0, valid.length - 1);
      expect(isStructurallyValidPng(truncated)).toBe(false);
    });

    it("cannot be widened by mutating a defensive allowlist copy", () => {
      const copy = [...getApprovedScreenshotPaths()];
      copy.push("planning/evidence/screenshots/cp01c3/forged.png");
      expect(privacyDenial("planning/evidence/screenshots/cp01c3/forged.png")?.code).toBe("UNCLASSIFIED_FILE");
    });

    it("fails closed in buildInventory when screenshot file fails PNG decode integrity", () => {
      const root = temp();
      const approvedPath = "planning/evidence/screenshots/cp01c3/s03_resting_desktop_1440x900.png";
      const fullPath = join(root, ...approvedPath.split("/"));
      mkdirSync(join(fullPath, ".."), { recursive: true });
      writeFileSync(fullPath, "NOT_A_PNG_FILE");

      const inv = buildInventory(root, profile([required(approvedPath, "evidence")]));
      expect(inv.issues).toContainEqual(
        expect.objectContaining({
          code: "UNCLASSIFIED_FILE",
          path: approvedPath,
          message: expect.stringContaining("fails PNG structural integrity check"),
        })
      );
    });
  });

  describe("Manifest post-verification and tampering detection (Section 4)", () => {
    const dummyProfile: EvidenceProfile = {
      id: "test-profile",
      version: "1.0.0",
      checkpointId: "CP-TEST",
      purpose: "test",
      outputFilename: "test.zip",
      entries: [required("safe/file.ts", "source")],
    };

    const dummyFileBytes = Buffer.from("console.log('hello');\n");
    const dummyFileSha = createHash("sha256").update(dummyFileBytes).digest("hex");
    const dummyInventory: InventoryEntry[] = [
      { path: "safe/file.ts", bytes: dummyFileBytes.byteLength, sha256: dummyFileSha, requirement: "required", category: "source" },
    ];

    const dummyReport = generatePackagingReport(dummyProfile, dummyInventory);

    function setupExtractionDir(
      manifestMutator?: (m: Record<string, unknown>) => void,
      fileMutator?: (dir: string) => void
    ): { root: string; inspected: ArchiveEntry[]; manifest: EvidenceManifest } {
      const root = temp();
      const filePath = join(root, "safe", "file.ts");
      mkdirSync(join(root, "safe"), { recursive: true });
      writeFileSync(filePath, dummyFileBytes);
      writeFileSync(join(root, "PACKAGING_REPORT.md"), dummyReport);

      const manifestObj: Record<string, unknown> = {
        schemaVersion: 1,
        packagingPolicyVersion: "CP-01D.3A-v1",
        project: "theLast",
        profileId: dummyProfile.id,
        profileVersion: dummyProfile.version,
        checkpointId: dummyProfile.checkpointId,
        candidateGitRevision: "test-rev-1234",
        files: JSON.parse(JSON.stringify(dummyInventory)),
      };

      const expectedManifest = JSON.parse(JSON.stringify(manifestObj)) as EvidenceManifest;

      if (manifestMutator) manifestMutator(manifestObj);
      const manifestBytes = Buffer.from(JSON.stringify(manifestObj, null, 2));
      writeFileSync(join(root, "EVIDENCE_MANIFEST.json"), manifestBytes);
      const reportBytes = Buffer.from(dummyReport);

      if (fileMutator) fileMutator(root);

      const inspected: ArchiveEntry[] = [
        { path: "safe/file.ts", bytes: dummyFileBytes.byteLength, sha256: dummyFileSha },
        { path: "EVIDENCE_MANIFEST.json", bytes: manifestBytes.byteLength, sha256: createHash("sha256").update(manifestBytes).digest("hex") },
        { path: "PACKAGING_REPORT.md", bytes: reportBytes.byteLength, sha256: createHash("sha256").update(reportBytes).digest("hex") },
      ];

      return { root, inspected, manifest: expectedManifest };
    }

    it("passes verification for an untampered archive", () => {
      const { root, inspected, manifest } = setupExtractionDir();
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res).toEqual({ ok: true });
    });

    it("fails when manifest hash is tampered with", () => {
      const { root, inspected, manifest } = setupExtractionDir((m) => {
        const files = m.files as Array<{ sha256: string }>;
        files[0].sha256 = "0000000000000000000000000000000000000000000000000000000000000000";
      });
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res.ok).toBe(false);
      expect((res as { reason: string }).reason).toContain("hash mismatch");
    });

    it("fails when manifest file path is tampered with", () => {
      const { root, inspected, manifest } = setupExtractionDir((m) => {
        const files = m.files as Array<{ path: string }>;
        files[0].path = "safe/other.ts";
      });
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res.ok).toBe(false);
      expect((res as { reason: string }).reason).toContain("Unexpected file path");
    });

    it("fails when manifest file count is tampered with", () => {
      const { root, inspected, manifest } = setupExtractionDir((m) => {
        const files = m.files as unknown[];
        files.push({ path: "extra.ts", bytes: 10, sha256: "abc", requirement: "required", category: "source" });
      });
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res.ok).toBe(false);
      expect((res as { reason: string }).reason).toContain("count mismatch");
    });

    it("fails when manifest requirement classification is tampered with", () => {
      const { root, inspected, manifest } = setupExtractionDir((m) => {
        const files = m.files as Array<{ requirement: string }>;
        files[0].requirement = "optional"; // was "required"
      });
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res.ok).toBe(false);
      expect((res as { reason: string }).reason).toContain("Requirement classification mismatch");
    });

    it("fails when manifest evidence category is tampered with", () => {
      const { root, inspected, manifest } = setupExtractionDir((m) => {
        const files = m.files as Array<{ category: string }>;
        files[0].category = "test"; // was "source"
      });
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res.ok).toBe(false);
      expect((res as { reason: string }).reason).toContain("Evidence category mismatch");
    });

    it("fails when packaging policy version in manifest is tampered with", () => {
      const { root, inspected, manifest } = setupExtractionDir((m) => {
        m.packagingPolicyVersion = "CP-TAMPERED-v9";
      });
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res.ok).toBe(false);
      expect((res as { reason: string }).reason).toContain("Policy version mismatch");
    });

    it("fails when packaging report on disk is tampered with", () => {
      const { root, inspected, manifest } = setupExtractionDir(undefined, (dir) => {
        writeFileSync(join(dir, "PACKAGING_REPORT.md"), "TAMPERED REPORT CONTENT");
      });
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res.ok).toBe(false);
      expect((res as { reason: string }).reason).toContain("packaging report content mismatch");
    });

    it("fails when payload file bytes on disk are tampered with post-extraction", () => {
      const { root, inspected, manifest } = setupExtractionDir(undefined, (dir) => {
        writeFileSync(join(dir, "safe", "file.ts"), Buffer.from("TAMPERED BYTES"));
      });
      const res = verifyExtractedArchive({
        inspectedEntries: inspected,
        extractionRoot: root,
        expectedProfile: dummyProfile,
        expectedInventory: dummyInventory,
        expectedManifest: manifest,
        expectedReport: dummyReport,
      });
      expect(res.ok).toBe(false);
      expect((res as { reason: string }).reason).toContain("Extracted disk byte length mismatch");
    });
  });

  describe("End-to-end packaging with CP-01D.3A profile", () => {
    it("creates, extracts, verifies, and byte-reproduces CP-01D.3A package fixture", () => {
      const root = temp();
      const outputA = temp();
      const outputB = temp();
      const registered = getRegisteredProfile("checkpoint-cp01d3a");
      expect(registered).not.toBeNull();

      for (const entry of registered!.entries.filter((item) => item.requirement === "required")) {
        const target = join(root, ...entry.path.split("/"));
        mkdirSync(join(target, ".."), { recursive: true });
        const content = entry.path.endsWith("zip-bridge.ps1")
          ? readFileSync(join(process.cwd(), "src/evidence/packaging/zip-bridge.ps1"))
          : Buffer.from(`fictional:${entry.path}\n`);
        writeFileSync(target, content);
      }

      const first = packageEvidence({ projectRoot: root, profileId: "checkpoint-cp01d3a", outputRoot: outputA });
      const second = packageEvidence({ projectRoot: root, profileId: "checkpoint-cp01d3a", outputRoot: outputB });

      if (!first.ok) throw new Error(JSON.stringify(first));
      if (!second.ok) throw new Error(JSON.stringify(second));

      expect(first).toMatchObject({ ok: true, manifestVerified: true });
      expect(second).toMatchObject({ ok: true, manifestVerified: true });
      expect(first.archiveSha256).toBe(second.archiveSha256);
    }, 30_000);
  });
});
