import type { SceneId } from "./contracts";

type ReadyWaiter = {
  resolve: () => void;
  reject: (error: Error) => void;
  signal: AbortSignal;
  abort: () => void;
};

class CurtainTransitionController {
  private target: SceneId | null = null;
  private ready = false;
  private readonly readyWaiters = new Set<ReadyWaiter>();
  private readonly revealListeners = new Set<() => void>();

  begin(target: SceneId): void {
    this.finish();
    this.target = target;
  }

  isHolding(target: SceneId): boolean {
    return this.target === target;
  }

  markReady(target: SceneId): void {
    if (this.target !== target || this.ready) return;
    this.ready = true;
    for (const waiter of this.readyWaiters) {
      waiter.signal.removeEventListener("abort", waiter.abort);
      waiter.resolve();
    }
    this.readyWaiters.clear();
  }

  waitUntilReady(target: SceneId, signal: AbortSignal): Promise<void> {
    if (this.target !== target || this.ready) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      const waiter: ReadyWaiter = {
        resolve,
        reject,
        signal,
        abort: () => {
          this.readyWaiters.delete(waiter);
          reject(new Error("Curtain target readiness was cancelled."));
        },
      };
      this.readyWaiters.add(waiter);
      signal.addEventListener("abort", waiter.abort, { once: true });
    });
  }

  onReveal(target: SceneId, listener: () => void): () => void {
    if (this.target !== target) return () => undefined;
    this.revealListeners.add(listener);
    return () => this.revealListeners.delete(listener);
  }

  reveal(target: SceneId): void {
    if (this.target !== target) return;
    for (const listener of this.revealListeners) listener();
  }

  finish(): void {
    for (const waiter of this.readyWaiters) {
      waiter.signal.removeEventListener("abort", waiter.abort);
      waiter.reject(new Error("Curtain transition ended before the target was ready."));
    }
    this.readyWaiters.clear();
    this.revealListeners.clear();
    this.target = null;
    this.ready = false;
  }
}

export const curtainTransitionController = new CurtainTransitionController();
