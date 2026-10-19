import { packageEvidence } from "./packager.ts";

function option(name: string): string | undefined { const index = process.argv.indexOf(name); return index >= 0 ? process.argv[index + 1] : undefined; }
const unknown = process.argv.slice(2).filter((value, index, values) => !["--profile", "--output-dir"].includes(value) && ![values[index - 1]].some((prior) => prior === "--profile" || prior === "--output-dir"));
if (unknown.length || !option("--profile")) {
  console.error("DENY INVALID_CLI: gunakan --profile <profil-terdaftar> dan opsional --output-dir <direktori-absolut>.");
  process.exitCode = 2;
} else {
  const result = packageEvidence({ projectRoot: process.cwd(), profileId: option("--profile") as string, outputRoot: option("--output-dir") });
  if (!result.ok) {
    for (const issue of result.issues) console.error(`DENY ${issue.code}${issue.path ? ` [${issue.path}]` : ""}: ${issue.message}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS evidence package verified\nProfile: ${option("--profile")}\nOutput: ${result.outputPath}\nPayload files: ${result.includedFileCount}\nPayload bytes: ${result.includedPayloadBytes}\nArchive SHA-256: ${result.archiveSha256}\nManifest: VERIFIED`);
    for (const warning of result.warnings) console.warn(`WARNING ${warning.code}${warning.path ? ` [${warning.path}]` : ""}: ${warning.message}`);
  }
}
