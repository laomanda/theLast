export const SCENE_IDS = [
  "S01",
  "S02",
  "S03",
  "S04",
  "S05",
  "S06",
  "S07",
  "S08",
  "S09",
  "S10",
  "S11",
  "S12",
] as const;

export type SceneId = (typeof SCENE_IDS)[number];
export type SceneLifecycle =
  | "preloading"
  | "preparing"
  | "entering"
  | "active"
  | "exiting"
  | "cleaned";
export type TransitionStatus = "idle" | "preparing" | "committing" | "cancelled" | "failed";
export type CapabilityTier = "full" | "lite" | "fallback";
export type MotionPreference = "normal" | "reduced";
export type HiddenPortalStatus = "unavailable" | "discoverable" | "armed" | "committed";
export type CakeLifecycle = "draft" | "finalized";
export type WishStatus = "unready" | "flameOn" | "extinguished";
export type VaultStatus =
  | "unloaded"
  | "loading"
  | "ready"
  | "pinEditing"
  | "pinRejected"
  | "pinAccepted"
  | "releasing"
  | "doorOpening"
  | "opened"
  | "letterVisible"
  | "letterSelected";

export interface CakeConfiguration {
  frosting: string;
  candles: readonly string[];
  flowers: readonly string[];
  topper: string | null;
  accents: readonly string[];
  placements: Readonly<Record<string, string>>;
}

export interface CakeState {
  lifecycle: CakeLifecycle;
  draft: CakeConfiguration;
  finalized: CakeConfiguration | null;
  finalizedVersion: number;
}

export interface WishState {
  status: WishStatus;
  cakeConfiguration: CakeConfiguration | null;
  extinguishCount: number;
}

export interface VaultState {
  status: VaultStatus;
  pinAccepted: boolean;
  invalidAttempts: number;
  letter: "unavailable" | "visible" | "selected";
}

export interface ExperienceState {
  scene: SceneId;
  lifecycle: SceneLifecycle;
  transition: {
    status: TransitionStatus;
    activeId: number | null;
    error: RuntimeError | null;
  };
  birthdayComplete: boolean;
  hiddenPortal: HiddenPortalStatus;
  cake: CakeState;
  wish: WishState;
  vault: VaultState;
  confessionVisible: boolean;
  audio: {
    muted: boolean;
    userGestureObserved: boolean;
    playbackUnlocked: boolean;
  };
  capability: { tier: CapabilityTier; motion: MotionPreference };
  replayCount: number;
}

export type RuntimeEvent =
  | { type: "SHELL_READY" }
  | { type: "SHELL_DEGRADED_READY" }
  | { type: "OPEN_INVITATION" }
  | { type: "CONTINUE" }
  | { type: "FINISH_CAKE"; configuration: CakeConfiguration }
  | { type: "EXTINGUISH_WISH" }
  | { type: "COMPLETE_BIRTHDAY" }
  | { type: "ARM_HIDDEN_PORTAL" }
  | { type: "COMMIT_HIDDEN_PORTAL" }
  | { type: "HIDDEN_SPACE_READY" }
  | { type: "VAULT_READY" }
  | { type: "SUBMIT_VAULT_PIN"; pin: string }
  | { type: "BEGIN_VAULT_OPENING" }
  | { type: "COMPLETE_VAULT_OPENING" }
  | { type: "OPEN_LETTER" }
  | { type: "REPLAY" }
  | { type: "SET_AUDIO_MUTED"; muted: boolean }
  | { type: "AUDIO_UNLOCK_SUCCEEDED" }
  | { type: "SET_MOTION_PREFERENCE"; preference: MotionPreference }
  | { type: "PASSIVE_SCROLL" };

export type GuardRejectionReason =
  | "MALFORMED_EVENT"
  | "SCENE_NOT_ACTIVE"
  | "ILLEGAL_SCENE_EDGE"
  | "READINESS_REQUIRED"
  | "EXPLICIT_INTENT_REQUIRED"
  | "CAKE_NOT_FINALIZED"
  | "INVALID_CAKE_CONFIGURATION"
  | "WISH_NOT_EXTINGUISHED"
  | "PORTAL_NOT_ARMED"
  | "HIDDEN_PORTAL_NOT_COMMITTED"
  | "VAULT_NOT_READY"
  | "INVALID_PIN"
  | "VAULT_NOT_UNLOCKED"
  | "DOOR_NOT_OPEN"
  | "LETTER_NOT_AVAILABLE"
  | "LETTER_NOT_SELECTED"
  | "TRANSITION_IN_FLIGHT"
  | "CANCELLED"
  | "REPLAY_NOT_AVAILABLE"
  | "PASSIVE_EVENT_REJECTED"
  | "EVENT_NOT_APPLICABLE";

export interface GuardRejection {
  accepted: false;
  reason: GuardRejectionReason;
}

export interface GuardAcceptance {
  accepted: true;
  target: SceneId | null;
}

export type GuardResult = GuardAcceptance | GuardRejection;

export type RuntimeError =
  | { code: "TRANSITION_PREPARATION_FAILED"; message: string; recoverable: true }
  | { code: "STALE_TRANSITION"; message: string; recoverable: true }
  | { code: "TRANSITION_COMMIT_MISMATCH"; message: string; recoverable: true }
  | { code: "CANCELLATION"; message: string; recoverable: true };

export interface TransitionResult {
  status: "committed" | "applied" | "rejected" | "cancelled" | "failed";
  event: DispatchEvent;
  target: SceneId | null;
  reason?: GuardRejectionReason;
  error?: RuntimeError;
}

export interface InvalidRuntimeEvent {
  type: "INVALID_EVENT";
}

export type DispatchEvent = RuntimeEvent | InvalidRuntimeEvent;

export interface AssetManagerBoundary {
  preload(ids: readonly string[], signal: AbortSignal): Promise<void>;
}

export interface SceneTimelineBoundary {
  prepare(scene: SceneId, signal: AbortSignal): Promise<void>;
  cleanup(scene: SceneId): void;
}

export interface MotionAdapterBoundary {
  readonly reducedMotion: boolean;
  cancel(): void;
}

export interface CakeInteractionBoundary {
  validate(configuration: CakeConfiguration): boolean;
}

export interface Vault3DAdapterBoundary {
  open(signal: AbortSignal): Promise<void>;
}

export const DEFAULT_CAKE_CONFIGURATION: CakeConfiguration = {
  frosting: "default",
  candles: [],
  flowers: [],
  topper: null,
  accents: [],
  placements: {},
};

export function cloneCakeConfiguration(configuration: CakeConfiguration): CakeConfiguration {
  return {
    frosting: configuration.frosting,
    candles: [...configuration.candles],
    flowers: [...configuration.flowers],
    topper: configuration.topper,
    accents: [...configuration.accents],
    placements: { ...configuration.placements },
  };
}

function isStringList(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCakeConfiguration(value: unknown): value is CakeConfiguration {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.frosting === "string" &&
    isStringList(candidate.candles) &&
    isStringList(candidate.flowers) &&
    (typeof candidate.topper === "string" || candidate.topper === null) &&
    isStringList(candidate.accents) &&
    !!candidate.placements &&
    typeof candidate.placements === "object" &&
    !Array.isArray(candidate.placements) &&
    Object.values(candidate.placements as Record<string, unknown>).every((placement) => typeof placement === "string")
  );
}

function freezeSnapshot<T extends object>(value: T): T {
  for (const nested of Object.values(value)) {
    if (nested && typeof nested === "object" && !Object.isFrozen(nested)) Object.freeze(nested);
  }
  return Object.freeze(value);
}

/**
 * Captures a validated, immutable semantic event at the runtime boundary.
 * This prevents caller-owned payload mutation from changing async preparation
 * or the later authoritative commit.
 */
export function snapshotRuntimeEvent(input: unknown): RuntimeEvent | null {
  try {
    return snapshotRuntimeEventUnsafe(input);
  } catch {
    return null;
  }
}

function snapshotRuntimeEventUnsafe(input: unknown): RuntimeEvent | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const candidate = input as Record<string, unknown>;
  if (typeof candidate.type !== "string") return null;

  switch (candidate.type) {
    case "FINISH_CAKE": {
      if (!isCakeConfiguration(candidate.configuration)) return null;
      const configuration = cloneCakeConfiguration(candidate.configuration);
      Object.freeze(configuration.candles);
      Object.freeze(configuration.flowers);
      Object.freeze(configuration.accents);
      Object.freeze(configuration.placements);
      Object.freeze(configuration);
      return freezeSnapshot({ type: "FINISH_CAKE" as const, configuration });
    }
    case "SUBMIT_VAULT_PIN":
      return typeof candidate.pin === "string" ? freezeSnapshot({ type: "SUBMIT_VAULT_PIN" as const, pin: candidate.pin }) : null;
    case "SET_AUDIO_MUTED":
      return typeof candidate.muted === "boolean" ? freezeSnapshot({ type: "SET_AUDIO_MUTED" as const, muted: candidate.muted }) : null;
    case "SET_MOTION_PREFERENCE":
      return candidate.preference === "normal" || candidate.preference === "reduced"
        ? freezeSnapshot({ type: "SET_MOTION_PREFERENCE" as const, preference: candidate.preference as MotionPreference })
        : null;
    case "SHELL_READY":
    case "SHELL_DEGRADED_READY":
    case "OPEN_INVITATION":
    case "CONTINUE":
    case "EXTINGUISH_WISH":
    case "COMPLETE_BIRTHDAY":
    case "ARM_HIDDEN_PORTAL":
    case "COMMIT_HIDDEN_PORTAL":
    case "HIDDEN_SPACE_READY":
    case "VAULT_READY":
    case "BEGIN_VAULT_OPENING":
    case "COMPLETE_VAULT_OPENING":
    case "OPEN_LETTER":
    case "REPLAY":
    case "AUDIO_UNLOCK_SUCCEEDED":
    case "PASSIVE_SCROLL":
      return freezeSnapshot({ type: candidate.type } as RuntimeEvent);
    default:
      return null;
  }
}

export function sameCakeConfiguration(a: CakeConfiguration | null, b: CakeConfiguration | null): boolean {
  if (a === null || b === null) return a === b;
  const sameList = (left: readonly string[], right: readonly string[]) =>
    left.length === right.length && left.every((value, index) => value === right[index]);
  const aPlacements = Object.entries(a.placements).sort(([aKey], [bKey]) => aKey.localeCompare(bKey));
  const bPlacements = Object.entries(b.placements).sort(([aKey], [bKey]) => aKey.localeCompare(bKey));
  return (
    a.frosting === b.frosting &&
    a.topper === b.topper &&
    sameList(a.candles, b.candles) &&
    sameList(a.flowers, b.flowers) &&
    sameList(a.accents, b.accents) &&
    aPlacements.length === bPlacements.length &&
    aPlacements.every(([key, value], index) => key === bPlacements[index]?.[0] && value === bPlacements[index]?.[1])
  );
}
