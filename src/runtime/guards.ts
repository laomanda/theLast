import {
  type ExperienceState,
  type GuardResult,
  type RuntimeEvent,
  type SceneId,
  sameCakeConfiguration,
} from "./contracts";
import { isSupportedCakeConfiguration } from "../cake/configuration";

export interface CanonicalSceneEdge {
  from: SceneId;
  to: SceneId;
  event: RuntimeEvent["type"];
}

/** The single executable declaration of all scene-to-scene narrative edges. */
export const CANONICAL_TRANSITION_GRAPH: readonly CanonicalSceneEdge[] = [
  { from: "S01", to: "S02", event: "SHELL_READY" },
  { from: "S01", to: "S02", event: "SHELL_DEGRADED_READY" },
  { from: "S02", to: "S03", event: "OPEN_INVITATION" },
  { from: "S03", to: "S04", event: "CONTINUE" },
  { from: "S04", to: "S05", event: "CONTINUE" },
  { from: "S05", to: "S06", event: "FINISH_CAKE" },
  { from: "S06", to: "S07", event: "CONTINUE" },
  { from: "S07", to: "S08", event: "CONTINUE" },
  { from: "S08", to: "S09", event: "COMMIT_HIDDEN_PORTAL" },
  { from: "S09", to: "S10", event: "HIDDEN_SPACE_READY" },
  { from: "S10", to: "S09", event: "BACK_TO_S09" },
  { from: "S10", to: "S11", event: "COMPLETE_VAULT_OPENING" },
  { from: "S11", to: "S12", event: "OPEN_LETTER" },
] as const;

export function canonicalTarget(scene: SceneId, eventType: RuntimeEvent["type"]): SceneId | null {
  return CANONICAL_TRANSITION_GRAPH.find((edge) => edge.from === scene && edge.event === eventType)?.to ?? null;
}

function reject(reason: Exclude<GuardResult, { accepted: true }>["reason"]): GuardResult {
  return { accepted: false, reason };
}

export function canHandleEvent(state: ExperienceState, event: RuntimeEvent): GuardResult {
  if (event.type === "REPLAY") return { accepted: true, target: "S01" };
  if (event.type === "PASSIVE_SCROLL") return reject("PASSIVE_EVENT_REJECTED");
  if (event.type === "SET_AUDIO_MUTED" || event.type === "SET_MOTION_PREFERENCE") {
    return { accepted: true, target: null };
  }
  if (event.type === "AUDIO_UNLOCK_SUCCEEDED") {
    return state.audio.userGestureObserved && !state.audio.playbackUnlocked
      ? { accepted: true, target: null }
      : reject("EVENT_NOT_APPLICABLE");
  }
  if (state.lifecycle !== "active") return reject("SCENE_NOT_ACTIVE");

  if (event.type === "SHELL_READY" || event.type === "SHELL_DEGRADED_READY") {
    const target = canonicalTarget(state.scene, event.type);
    return target
      ? { accepted: true, target }
      : reject("READINESS_REQUIRED");
  }

  if (event.type === "OPEN_INVITATION") {
    const target = canonicalTarget(state.scene, event.type);
    return target
      ? { accepted: true, target }
      : reject("EXPLICIT_INTENT_REQUIRED");
  }

  if (event.type === "CONTINUE") {
    const target = canonicalTarget(state.scene, event.type);
    if (state.scene === "S03" || state.scene === "S04") {
      return target ? { accepted: true, target } : reject("ILLEGAL_SCENE_EDGE");
    }
    if (state.scene === "S06") {
      return state.wish.status === "extinguished"
        ? target ? { accepted: true, target } : reject("ILLEGAL_SCENE_EDGE")
        : reject("WISH_NOT_EXTINGUISHED");
    }
    if (state.scene === "S07") return target ? { accepted: true, target } : reject("ILLEGAL_SCENE_EDGE");
    return reject("ILLEGAL_SCENE_EDGE");
  }

  if (event.type === "FINISH_CAKE") {
    if (state.scene !== "S05" || state.cake.lifecycle !== "draft") return reject("CAKE_NOT_FINALIZED");
    const target = canonicalTarget(state.scene, event.type);
    return validateCakeFinish(state, event.configuration) && target
      ? { accepted: true, target }
      : reject("INVALID_CAKE_CONFIGURATION");
  }

  if (event.type === "UPDATE_CAKE_DRAFT") {
    return state.scene === "S05" && state.cake.lifecycle === "draft" && isSupportedCakeConfiguration(event.configuration)
      ? { accepted: true, target: null }
      : reject("INVALID_CAKE_CONFIGURATION");
  }

  if (event.type === "UNDO_CAKE_DRAFT") {
    return state.scene === "S05" && state.cake.lifecycle === "draft" && state.cake.history.length > 0
      ? { accepted: true, target: null }
      : reject("EVENT_NOT_APPLICABLE");
  }

  if (event.type === "RESET_CAKE_DRAFT") {
    return state.scene === "S05" && state.cake.lifecycle === "draft"
      ? { accepted: true, target: null }
      : reject("EVENT_NOT_APPLICABLE");
  }

  if (event.type === "EXTINGUISH_WISH") {
    return state.scene === "S06" && state.wish.status === "flameOn"
      ? { accepted: true, target: null }
      : reject("WISH_NOT_EXTINGUISHED");
  }

  if (event.type === "COMPLETE_BIRTHDAY") {
    return state.scene === "S08" && !state.birthdayComplete
      ? { accepted: true, target: null }
      : reject("EVENT_NOT_APPLICABLE");
  }

  if (event.type === "ARM_HIDDEN_PORTAL") {
    return state.scene === "S08" && state.birthdayComplete && state.hiddenPortal === "discoverable"
      ? { accepted: true, target: null }
      : reject("EXPLICIT_INTENT_REQUIRED");
  }

  if (event.type === "COMMIT_HIDDEN_PORTAL") {
    const target = canonicalTarget(state.scene, event.type);
    return state.scene === "S08" && state.hiddenPortal === "armed"
      ? target ? { accepted: true, target } : reject("ILLEGAL_SCENE_EDGE")
      : reject("PORTAL_NOT_ARMED");
  }

  if (event.type === "HIDDEN_SPACE_READY") {
    const target = canonicalTarget(state.scene, event.type);
    return state.scene === "S09" && state.hiddenPortal === "committed"
      ? target ? { accepted: true, target } : reject("ILLEGAL_SCENE_EDGE")
      : reject("HIDDEN_PORTAL_NOT_COMMITTED");
  }

  if (event.type === "BACK_TO_S09") {
    const target = canonicalTarget(state.scene, event.type);
    return state.scene === "S10" && state.hiddenPortal === "committed"
      ? target ? { accepted: true, target } : reject("ILLEGAL_SCENE_EDGE")
      : reject("ILLEGAL_SCENE_EDGE");
  }

  if (event.type === "VAULT_READY") {
    return state.scene === "S10" && state.vault.status === "loading"
      ? { accepted: true, target: null }
      : reject("VAULT_NOT_READY");
  }

  if (event.type === "SUBMIT_VAULT_PIN") {
    return state.scene === "S10" && ["ready", "pinEditing", "pinRejected"].includes(state.vault.status)
      ? { accepted: true, target: null }
      : reject("VAULT_NOT_READY");
  }

  if (event.type === "BEGIN_VAULT_OPENING") {
    return state.scene === "S10" && state.vault.status === "pinAccepted"
      ? { accepted: true, target: null }
      : reject("VAULT_NOT_UNLOCKED");
  }

  if (event.type === "COMPLETE_VAULT_OPENING") {
    const target = canonicalTarget(state.scene, event.type);
    return state.scene === "S10" && state.vault.status === "doorOpening"
      ? target ? { accepted: true, target } : reject("ILLEGAL_SCENE_EDGE")
      : reject("DOOR_NOT_OPEN");
  }

  if (event.type === "OPEN_LETTER") {
    const target = canonicalTarget(state.scene, event.type);
    return state.scene === "S11" && state.vault.status === "letterVisible" && state.vault.letter === "visible"
      ? target ? { accepted: true, target } : reject("ILLEGAL_SCENE_EDGE")
      : reject("LETTER_NOT_AVAILABLE");
  }

  return reject("EVENT_NOT_APPLICABLE");
}

export function validateVaultPin(pin: string): boolean {
  return pin === "011007";
}

export function validateCakeFinish(state: ExperienceState, configuration: Extract<RuntimeEvent, { type: "FINISH_CAKE" }>["configuration"]): boolean {
  return state.scene === "S05" && state.cake.lifecycle === "draft" && isSupportedCakeConfiguration(configuration);
}

export function hasS05S06CakeContinuity(state: ExperienceState): boolean {
  return state.scene === "S06" && sameCakeConfiguration(state.cake.finalized, state.wish.cakeConfiguration);
}

