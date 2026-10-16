import { useStore } from "zustand";
import { createStore, type StoreApi } from "zustand/vanilla";
import {
  DEFAULT_CAKE_CONFIGURATION,
  cloneCakeConfiguration,
  type ExperienceState,
  type RuntimeEvent,
  type SceneId,
  type TransitionResult,
} from "../runtime/contracts";
import { TransitionEngine, type RuntimeStore, type TransitionHooks } from "../runtime/transition-engine";
import { validateVaultPin } from "../runtime/guards";

export interface ExperienceRuntime {
  getState(): ExperienceState;
  subscribe(listener: (state: ExperienceState, previous: ExperienceState) => void): () => void;
  dispatch(event: unknown): Promise<TransitionResult>;
  cancel(): boolean;
  isTransitionInFlight(): boolean;
}

export function createInitialExperienceState(): ExperienceState {
  return {
    scene: "S01",
    lifecycle: "active",
    transition: { status: "idle", activeId: null, error: null },
    birthdayComplete: false,
    hiddenPortal: "unavailable",
    cake: {
      lifecycle: "draft",
      draft: cloneCakeConfiguration(DEFAULT_CAKE_CONFIGURATION),
      finalized: null,
      finalizedVersion: 0,
    },
    wish: { status: "unready", cakeConfiguration: null, extinguishCount: 0 },
    vault: { status: "unloaded", pinAccepted: false, invalidAttempts: 0, letter: "unavailable" },
    confessionVisible: false,
    audio: { muted: false, userGestureObserved: false, playbackUnlocked: false },
    capability: { tier: "full", motion: "normal" },
    replayCount: 0,
  };
}

function freezeState(state: ExperienceState): ExperienceState {
  const freeze = (value: unknown): void => {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return;
    Object.freeze(value);
    for (const nested of Object.values(value as Record<string, unknown>)) freeze(nested);
  };
  freeze(state);
  return state;
}

function reduceAuthorizedEvent(
  state: ExperienceState,
  event: RuntimeEvent,
  target: SceneId | null,
): ExperienceState {
  if (event.type === "SET_AUDIO_MUTED") {
    return { ...state, audio: { ...state.audio, muted: event.muted } };
  }
  if (event.type === "AUDIO_UNLOCK_SUCCEEDED") {
    return { ...state, audio: { ...state.audio, playbackUnlocked: true } };
  }
  if (event.type === "SET_MOTION_PREFERENCE") {
    return { ...state, capability: { ...state.capability, motion: event.preference } };
  }
  if (event.type === "OPEN_INVITATION") {
    return { ...state, scene: target ?? state.scene, audio: { ...state.audio, userGestureObserved: true } };
  }
  if (event.type === "FINISH_CAKE") {
    const finalized = cloneCakeConfiguration(event.configuration);
    return {
      ...state,
      scene: target ?? state.scene,
      cake: {
        lifecycle: "finalized",
        draft: finalized,
        finalized,
        finalizedVersion: state.cake.finalizedVersion + 1,
      },
      wish: { ...state.wish, status: "flameOn", cakeConfiguration: finalized },
    };
  }
  if (event.type === "EXTINGUISH_WISH") {
    return {
      ...state,
      wish: { ...state.wish, status: "extinguished", extinguishCount: state.wish.extinguishCount + 1 },
    };
  }
  if (event.type === "COMPLETE_BIRTHDAY") {
    return { ...state, birthdayComplete: true, hiddenPortal: "discoverable" };
  }
  if (event.type === "ARM_HIDDEN_PORTAL") return { ...state, hiddenPortal: "armed" };
  if (event.type === "COMMIT_HIDDEN_PORTAL") {
    return { ...state, scene: target ?? state.scene, hiddenPortal: "committed" };
  }
  if (event.type === "HIDDEN_SPACE_READY") {
    return { ...state, scene: target ?? state.scene, vault: { ...state.vault, status: "loading" } };
  }
  if (event.type === "VAULT_READY") {
    return { ...state, vault: { ...state.vault, status: "ready" } };
  }
  if (event.type === "SUBMIT_VAULT_PIN") {
    const accepted = validateVaultPin(event.pin);
    return {
      ...state,
      vault: {
        ...state.vault,
        status: accepted ? "pinAccepted" : "pinRejected",
        pinAccepted: accepted,
        invalidAttempts: accepted ? state.vault.invalidAttempts : state.vault.invalidAttempts + 1,
      },
    };
  }
  if (event.type === "BEGIN_VAULT_OPENING") {
    return { ...state, vault: { ...state.vault, status: "doorOpening" } };
  }
  if (event.type === "COMPLETE_VAULT_OPENING") {
    return {
      ...state,
      scene: target ?? state.scene,
      vault: { ...state.vault, status: "letterVisible", letter: "visible" },
    };
  }
  if (event.type === "OPEN_LETTER") {
    return {
      ...state,
      scene: target ?? state.scene,
      vault: { ...state.vault, status: "letterSelected", letter: "selected" },
      confessionVisible: true,
    };
  }
  if (target) return { ...state, scene: target };
  return state;
}

function createInternalStore(): { api: StoreApi<ExperienceState>; runtimeStore: RuntimeStore } {
  const api = createStore<ExperienceState>()(() => freezeState(createInitialExperienceState()));
  const replace = (next: ExperienceState) => api.setState(freezeState(next), true);

  const runtimeStore: RuntimeStore = {
    getState: api.getState,
    beginTransition(id) {
      const state = api.getState();
      if (state.transition.activeId !== null) return false;
      replace({
        ...state,
        lifecycle: "preparing",
        transition: { status: "preparing", activeId: id, error: null },
      });
      return true;
    },
    setTransitionPhase(id, lifecycle, status) {
      const state = api.getState();
      if (state.transition.activeId !== id) return false;
      replace({ ...state, lifecycle, transition: { ...state.transition, status } });
      return true;
    },
    commitTransition(id, event, target) {
      const state = api.getState();
      if (state.transition.activeId !== id) return false;
      const committed = reduceAuthorizedEvent(state, event, target);
      replace({ ...committed, lifecycle: "active", transition: { status: "idle", activeId: null, error: null } });
      return true;
    },
    applyAuthorizedEvent(event, target) {
      replace(reduceAuthorizedEvent(api.getState(), event, target));
    },
    cancelTransition(id) {
      const state = api.getState();
      if (state.transition.activeId !== id) return false;
      replace({ ...state, lifecycle: "active", transition: { status: "cancelled", activeId: null, error: null } });
      return true;
    },
    failTransition(id, error) {
      const state = api.getState();
      if (state.transition.activeId !== id) return false;
      replace({ ...state, lifecycle: "active", transition: { status: "failed", activeId: null, error } });
      return true;
    },
    replay() {
      const previous = api.getState();
      const reset = createInitialExperienceState();
      replace({
        ...reset,
        audio: { ...reset.audio, muted: previous.audio.muted },
        replayCount: previous.replayCount + 1,
      });
    },
  };
  return { api, runtimeStore };
}

function createRuntimeBundle(hooks: TransitionHooks = {}) {
  const { api, runtimeStore } = createInternalStore();
  const engine = new TransitionEngine(runtimeStore, hooks);
  const runtime: ExperienceRuntime = Object.freeze({
    getState: api.getState,
    subscribe: api.subscribe,
    dispatch: (event: unknown) => engine.request(event),
    cancel: () => engine.cancel(),
    isTransitionInFlight: () => engine.inFlight,
  });
  return { api, runtime };
}

export function createExperienceRuntime(hooks: TransitionHooks = {}): ExperienceRuntime {
  return createRuntimeBundle(hooks).runtime;
}

const singleton = createRuntimeBundle();
export const experienceRuntime = singleton.runtime;

export function useExperienceStore<T>(selector: (state: ExperienceState) => T): T {
  return useStore(singleton.api, selector);
}
