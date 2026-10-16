import { canHandleEvent } from "./guards";
import { snapshotRuntimeEvent } from "./contracts";
import type {
  ExperienceState,
  RuntimeError,
  RuntimeEvent,
  InvalidRuntimeEvent,
  SceneId,
  SceneLifecycle,
  TransitionResult,
  TransitionStatus,
} from "./contracts";

export interface RuntimeStore {
  getState(): ExperienceState;
  beginTransition(id: number): boolean;
  setTransitionPhase(id: number, lifecycle: SceneLifecycle, status: TransitionStatus): boolean;
  commitTransition(id: number, event: RuntimeEvent, target: SceneId): boolean;
  applyAuthorizedEvent(event: RuntimeEvent, target: SceneId | null): void;
  cancelTransition(id: number): boolean;
  failTransition(id: number, error: RuntimeError): boolean;
  replay(): void;
}

export interface TransitionHooks {
  prepare?(event: RuntimeEvent, target: SceneId | null, signal: AbortSignal): Promise<void>;
}

export class TransitionEngine {
  private nextId = 0;
  private active: { id: number; controller: AbortController } | null = null;

  public constructor(private readonly store: RuntimeStore, private readonly hooks: TransitionHooks = {}) {}

  public async request(input: unknown): Promise<TransitionResult> {
    const event = snapshotRuntimeEvent(input);
    if (!event) {
      const invalid: InvalidRuntimeEvent = { type: "INVALID_EVENT" };
      return { status: "rejected", event: invalid, target: null, reason: "MALFORMED_EVENT" };
    }
    if (event.type === "REPLAY") {
      this.invalidateActiveTransition();
      this.store.replay();
      return { status: "applied", event, target: "S01" };
    }

    if (this.active) {
      return { status: "rejected", event, target: null, reason: "TRANSITION_IN_FLIGHT" };
    }

    const guard = canHandleEvent(this.store.getState(), event);
    if (!guard.accepted) {
      return { status: "rejected", event, target: null, reason: guard.reason };
    }

    if (guard.target === null) {
      this.store.applyAuthorizedEvent(event, null);
      return { status: "applied", event, target: null };
    }

    const id = ++this.nextId;
    const controller = new AbortController();
    this.active = { id, controller };
    if (!this.store.beginTransition(id)) {
      this.active = null;
      return { status: "rejected", event, target: null, reason: "TRANSITION_IN_FLIGHT" };
    }

    try {
      await this.hooks.prepare?.(event, guard.target, controller.signal);
      if (!this.isCurrent(id)) return this.cancelledResult(event, guard.target);

      if (!this.store.setTransitionPhase(id, "exiting", "committing")) {
        return this.cancelledResult(event, guard.target);
      }
      if (!this.isCurrent(id)) return this.cancelledResult(event, guard.target);
      if (!this.store.setTransitionPhase(id, "cleaned", "committing")) {
        return this.cancelledResult(event, guard.target);
      }
      if (!this.isCurrent(id)) return this.cancelledResult(event, guard.target);
      if (!this.store.setTransitionPhase(id, "entering", "committing")) {
        return this.cancelledResult(event, guard.target);
      }
      if (!this.isCurrent(id)) return this.cancelledResult(event, guard.target);

      if (!this.store.commitTransition(id, event, guard.target)) {
        return this.cancelledResult(event, guard.target);
      }
      this.active = null;

      if (this.store.getState().scene !== guard.target) {
        const error: RuntimeError = {
          code: "TRANSITION_COMMIT_MISMATCH",
          message: `Committed scene did not match requested target ${guard.target}`,
          recoverable: true,
        };
        return { status: "failed", event, target: guard.target, error };
      }
      return { status: "committed", event, target: guard.target };
    } catch (cause) {
      if (!this.isCurrent(id)) return this.cancelledResult(event, guard.target);
      const error: RuntimeError = {
        code: "TRANSITION_PREPARATION_FAILED",
        message: cause instanceof Error ? cause.message : "Transition preparation failed",
        recoverable: true,
      };
      this.store.failTransition(id, error);
      this.active = null;
      return { status: "failed", event, target: guard.target, error };
    } finally {
      if (this.active?.id === id && this.store.getState().transition.activeId !== id) {
        this.active = null;
      }
    }
  }

  public cancel(): boolean {
    if (!this.active) return false;
    const { id, controller } = this.active;
    this.active = null;
    controller.abort();
    this.store.cancelTransition(id);
    return true;
  }

  public get inFlight(): boolean {
    return this.active !== null;
  }

  private isCurrent(id: number): boolean {
    return this.active?.id === id && this.store.getState().transition.activeId === id;
  }

  private invalidateActiveTransition(): void {
    if (!this.active) return;
    const { id, controller } = this.active;
    this.active = null;
    controller.abort();
    this.store.cancelTransition(id);
  }

  private cancelledResult(event: RuntimeEvent, target: SceneId): TransitionResult {
    return { status: "cancelled", event, target, reason: "CANCELLED" };
  }
}
