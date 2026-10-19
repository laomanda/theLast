/**
 * S12 content authority boundary.
 *
 * The locked sources define the scene's purpose and interaction contract, but
 * the personal confession itself still requires explicit owner approval.
 * Keeping `body` null prevents candidate prose from becoming production copy.
 */
export type S12ReadingContent = {
  opening: string | null;
  paragraphs: readonly string[];
  closing: string | null;
  signature: string | null;
};

export const S12_CONTENT: S12ReadingContent & { status: "CONTENT_PENDING"; body: null; kicker: string; title: string; endLabel: string; replayLabel: string; endedLabel: string } = Object.freeze({
  status: "CONTENT_PENDING" as const,
  body: null,
  opening: null,
  paragraphs: Object.freeze([]) as readonly string[],
  closing: null,
  signature: null,
  kicker: "THE LAST / 12",
  title: "Sampai di sini.",
  endLabel: "Akhiri di sini",
  replayLabel: "Ulangi dari awal",
  endedLabel: "Pengalaman selesai.",
});

export type S12ContentStatus = typeof S12_CONTENT.status;
