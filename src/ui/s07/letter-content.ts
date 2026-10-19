/**
 * S07 Personal Birthday Letter — Content Schema & Candidate Presentation
 *
 * Authority:
 * - docs/PRD.md (§S07 — PRD-S07-01/02)
 * - docs/DESIGN_SYSTEM.md (§S07 — Personal Birthday Letter)
 * - docs/SOURCES/BIRTHDAY_EXPERIENCE_FINAL_FLOW.md (§07 — PERSONAL BIRTHDAY LETTER)
 * - docs/SOURCES/BIRTHDAY_EXPERIENCE_DESIGN_FRAGMENT_SCENE_BY_SCENE.md (§SCENE 07)
 * - docs/IMPLEMENTATION_PLAN.md (§S07, line 375)
 *
 * IMPORTANT:
 * Owner-locked personal text remains pending content verification (PRD.md:228,
 * DESIGN_SYSTEM.md:1284). The presentation here provides the supported editorial
 * letter presentation conforming to the locked 4-part flow direction:
 * (1) ucapan ulang tahun, (2) apresiasi, (3) pertemanan sejak 2022, (4) harapan.
 * Strictly birthday-first; NO confession language.
 */

export const S07_CONTENT_STATUS = "LETTER_CONTENT_PENDING" as const;
export type S07ContentStatus = typeof S07_CONTENT_STATUS;

export const S07_RECIPIENT_NAME = "Malica Yohana Hutagaol";
export const S07_CTA_LABEL = "Lanjut";

export interface BirthdayLetterSection {
  id: string;
  type: "greeting" | "appreciation" | "friendship" | "wishes";
  text: string;
}

export interface BirthdayLetter {
  status: S07ContentStatus;
  kicker: string;
  dateLabel: string;
  salutation: string;
  leadParagraph: string;
  sections: readonly BirthdayLetterSection[];
  signOff: string;
  senderLabel: string;
  ctaLabel: string;
  estimatedReadTime: string;
}

/**
 * Authoritative candidate letter conforming strictly to the locked Flow & Tech Spec:
 * - Birthday-first
 * - Respectful, warm, sincere
 * - Acknowledges friendship since 2022
 * - No romantic confession language or pressure
 */
const DEFAULT_SECTIONS: readonly BirthdayLetterSection[] = Object.freeze([
  {
    id: "appreciation",
    type: "appreciation" as const,
    text: "Terima kasih sudah menjadi pribadi yang hangat dan tulus dalam caramu sendiri. Kehadiranmu selalu membawa ketenangan dan warna tersendiri bagi orang-orang di sekitarmu, bahkan di hari-hari yang mungkin tidak terasa mudah bagimu.",
  },
  {
    id: "friendship",
    type: "friendship" as const,
    text: "Mengingat kembali perjalanan sejak 2022, ada banyak cerita kecil yang tumbuh tanpa disadari. Menjadi bagian dari lingkaran pertemanan ini adalah hal yang selalu aku syukuri—melihatmu melangkah, belajar, dan tetap setia pada kebaikan hatimu.",
  },
  {
    id: "wishes",
    type: "wishes" as const,
    text: "Di usiamu yang baru ini, semoga langkahmu selalu dipeluk rasa damai. Semoga segala hal yang kamu usahakan menemukan jalannya, kesehatan dan kebahagiaan selalu menyertaimu, dan kamu tidak pernah ragu bahwa ada banyak doa baik yang selalu mengiringimu.",
  },
]);

export const DEFAULT_BIRTHDAY_LETTER: BirthdayLetter = Object.freeze({
  status: S07_CONTENT_STATUS,
  kicker: "THE LAST / 07 · SURAT UNTUK MALICA",
  dateLabel: "18 Oktober",
  salutation: "Untuk Malica,",
  leadParagraph:
    "Selamat ulang tahun. Setelah semua tawa, lilin yang padam, dan harapan kecil yang tadi kamu panjatkan—semoga ada jeda yang cukup tenang di sini untuk mendengarkan doa-doa baik yang datang kepadamu.",
  sections: DEFAULT_SECTIONS,
  signOff: "Dengan rasa syukur dan doa terbaik,",
  senderLabel: "Sahabatmu",
  ctaLabel: S07_CTA_LABEL,
  estimatedReadTime: "1 menit membaca",
});

const EXTENDED_SECTIONS: readonly BirthdayLetterSection[] = Object.freeze([
  ...DEFAULT_SECTIONS,
  {
    id: "journey-extended",
    type: "friendship" as const,
    text: "Tahun-tahun yang berjalan memperlihatkan betapa kuatnya kamu menghadapi berbagai perubahan. Dalam setiap percakapan, tawa lepas, maupun keheningan yang nyaman, pertemanan ini selalu menjadi tempat yang jujur dan berharga.",
  },
  {
    id: "wishes-extended",
    type: "wishes" as const,
    text: "Semoga tahun ini memberimu lebih banyak ruang untuk bernapas lega, merayakan pencapaian-pencapaian kecil, dan dikelilingi oleh orang-orang yang tulus mendukungmu apa adanya. Tetaplah menjadi Malica yang penuh kehangatan.",
  },
]);

/**
 * Extended fixture to verify long-copy handling, local scroll boundaries,
 * reading accessibility at high text zoom, and non-obscured continuation.
 */
export const LONG_BIRTHDAY_LETTER: BirthdayLetter = Object.freeze({
  ...DEFAULT_BIRTHDAY_LETTER,
  sections: EXTENDED_SECTIONS,
  estimatedReadTime: "2 menit membaca",
});

/**
 * Guardian function verifying no confessional, romantic pressure,
 * or out-of-boundary language has intruded into the birthday letter.
 */
const FORBIDDEN_CONFESSION_PATTERNS = [
  /\bcinta\b/i,
  /\bconfess\b/i,
  /\bconfession\b/i,
  /\bperasaan terpendam\b/i,
  /\bjatuh cinta\b/i,
  /\bpacar\b/i,
  /\bjadian\b/i,
  /\bmenerimaku\b/i,
  /\bmenjawab perasaanku\b/i,
  /\bkekasih\b/i,
  /\blove you romantically\b/i,
];

export function validateBirthdayLetterIntegrity(letter: BirthdayLetter): { valid: boolean; violation?: string } {
  const fullText = [
    letter.salutation,
    letter.leadParagraph,
    ...letter.sections.map((s) => s.text),
    letter.signOff,
  ].join(" ");

  for (const pattern of FORBIDDEN_CONFESSION_PATTERNS) {
    if (pattern.test(fullText)) {
      return { valid: false, violation: `Forbidden confession pattern detected in S07: "${pattern.source}"` };
    }
  }

  if (letter.sections.length === 0) {
    return { valid: false, violation: "Birthday letter must contain reading sections." };
  }

  return { valid: true };
}

