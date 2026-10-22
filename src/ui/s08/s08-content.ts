/**
 * S08 closure content boundary.
 *
 * The locked sources establish S08's role, but retain the final personal
 * birthday statement and hidden-clue copy as pending owner content. This
 * module deliberately exposes that truth instead of treating candidate prose
 * as approved recipient-facing copy.
 */
export const S08_CONTENT_STATUS = "CONTENT_PENDING" as const;
export type S08ContentStatus = typeof S08_CONTENT_STATUS;

export const S08_CONTENT = Object.freeze({
  status: S08_CONTENT_STATUS,
  pendingLabel: "Pesan penutup personal menunggu persetujuan konten.",
  completeLabel: "Tandai selesai",
  replayLabel: "Putar ulang",
  endLabel: "Selesai",
});
