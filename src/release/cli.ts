import { formatReleaseResult, validateCurrentRelease } from "./validator.ts";

try {
  const result = validateCurrentRelease();
  console.log(formatReleaseResult(result));
  process.exitCode = result.ready ? 0 : 1;
} catch {
  console.error("Release verdict: ERROR\nBLOCKED VALIDATOR_INPUT_ERROR: Candidate validation could not complete safely.");
  process.exitCode = 2;
}
