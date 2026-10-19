import { describe, expect, it } from "vitest";
import { canHandleEvent } from "../../src/runtime/guards";
import { createExperienceRuntime } from "../../src/state/experience-store";
import { scenePresentationKind } from "../../src/ui/shell/ExperienceShell";
import {
  DEFAULT_BIRTHDAY_LETTER,
  LONG_BIRTHDAY_LETTER,
  S07_CONTENT_STATUS,
  S07_CTA_LABEL,
  S07_RECIPIENT_NAME,
  validateBirthdayLetterIntegrity,
} from "../../src/ui/s07/letter-content";
import { applyCakeOption } from "../../src/cake/configuration";

async function reachS07(runtime: ReturnType<typeof createExperienceRuntime>) {
  await runtime.dispatch({ type: "SHELL_READY" });
  await runtime.dispatch({ type: "OPEN_INVITATION" });
  await runtime.dispatch({ type: "CONTINUE" });
  await runtime.dispatch({ type: "CONTINUE" });
  const custom = applyCakeOption(runtime.getState().cake.draft, "candles", "candles-five")!;
  await runtime.dispatch({ type: "UPDATE_CAKE_DRAFT", configuration: custom });
  await runtime.dispatch({ type: "FINISH_CAKE", configuration: custom });
  await runtime.dispatch({ type: "EXTINGUISH_WISH" });
  await runtime.dispatch({ type: "CONTINUE" });
}

describe("S07 Personal Birthday Letter", () => {
  it("renders the implemented S07 and S08 production presentations", () => {
    expect(scenePresentationKind("S07")).toBe("s07");
    expect(scenePresentationKind("S08")).toBe("s08");
  });

  it("follows the canonical guarded navigation path from S06 to S07", async () => {
    const runtime = createExperienceRuntime();
    await reachS07(runtime);
    const state = runtime.getState();
    expect(state.scene).toBe("S07");
    expect(state.wish.status).toBe("extinguished");
  });

  it("rejects passive scrolling and unauthenticated scene navigation", async () => {
    const runtime = createExperienceRuntime();
    await reachS07(runtime);
    expect(runtime.getState().scene).toBe("S07");
    expect(await runtime.dispatch({ type: "PASSIVE_SCROLL" })).toMatchObject({
      status: "rejected",
      reason: "PASSIVE_EVENT_REJECTED",
    });
    expect(runtime.getState().scene).toBe("S07");
  });

  it("advances from S07 to S08 via guarded CONTINUE event", async () => {
    const runtime = createExperienceRuntime();
    await reachS07(runtime);
    expect(canHandleEvent(runtime.getState(), { type: "CONTINUE" })).toMatchObject({
      accepted: true,
      target: "S08",
    });
    const result = await runtime.dispatch({ type: "CONTINUE" });
    expect(result).toMatchObject({ status: "committed", target: "S08" });
    expect(runtime.getState().scene).toBe("S08");
    expect(scenePresentationKind(runtime.getState().scene)).toBe("s08");
  });

  it("honestly declares LETTER_CONTENT_PENDING and provides complete flow-aligned candidate", () => {
    expect(DEFAULT_BIRTHDAY_LETTER.status).toBe("LETTER_CONTENT_PENDING");
    expect(S07_CONTENT_STATUS).toBe("LETTER_CONTENT_PENDING");
    expect(DEFAULT_BIRTHDAY_LETTER.salutation).toContain(S07_RECIPIENT_NAME.split(" ")[0]);
    expect(DEFAULT_BIRTHDAY_LETTER.ctaLabel).toBe(S07_CTA_LABEL);

    // Verify the 4 mandatory narrative sections from locked flow
    const sectionTypes = DEFAULT_BIRTHDAY_LETTER.sections.map((s) => s.type);
    expect(sectionTypes).toContain("appreciation");
    expect(sectionTypes).toContain("friendship");
    expect(sectionTypes).toContain("wishes");

    // Must mention 2022 friendship milestone
    const friendshipSection = DEFAULT_BIRTHDAY_LETTER.sections.find((s) => s.type === "friendship");
    expect(friendshipSection?.text).toContain("2022");
  });

  it("strictly validates that no romantic confession language intrudes into S07", () => {
    const validation = validateBirthdayLetterIntegrity(DEFAULT_BIRTHDAY_LETTER);
    expect(validation.valid).toBe(true);

    const longValidation = validateBirthdayLetterIntegrity(LONG_BIRTHDAY_LETTER);
    expect(longValidation.valid).toBe(true);

    // Confession token injection should be rejected
    const taintedLetter = {
      ...DEFAULT_BIRTHDAY_LETTER,
      leadParagraph: "Sebenarnya aku memendam perasaan cinta ini sejak lama.",
    };
    const taintedValidation = validateBirthdayLetterIntegrity(taintedLetter);
    expect(taintedValidation.valid).toBe(false);
    expect(taintedValidation.violation).toContain("cinta");
  });

  it("supports the long-copy fixture with additional reading paragraphs", () => {
    expect(LONG_BIRTHDAY_LETTER.sections.length).toBeGreaterThan(DEFAULT_BIRTHDAY_LETTER.sections.length);
    expect(LONG_BIRTHDAY_LETTER.sections.some((s) => s.id === "journey-extended")).toBe(true);
    expect(LONG_BIRTHDAY_LETTER.sections.some((s) => s.id === "wishes-extended")).toBe(true);
  });
});
