import type { RuntimeEvent, SceneId } from "./contracts";

export type TransitionPreparationHandler = (
  event: RuntimeEvent,
  target: SceneId | null,
  signal: AbortSignal,
) => Promise<void>;

/**
 * Connects the authoritative TransitionEngine preparation phase to the
 * currently mounted scene's visual handoff. Narrative authorization remains
 * in the engine; components can only prepare an already accepted transition.
 */
class RuntimeTransitionCoordinator {
  private readonly handlers = new Map<RuntimeEvent["type"], TransitionPreparationHandler>();

  register(eventType: RuntimeEvent["type"], handler: TransitionPreparationHandler): () => void {
    this.handlers.set(eventType, handler);
    return () => {
      if (this.handlers.get(eventType) === handler) this.handlers.delete(eventType);
    };
  }

  async prepare(event: RuntimeEvent, target: SceneId | null, signal: AbortSignal): Promise<void> {
    const handler = this.handlers.get(event.type);
    if (handler) await handler(event, target, signal);
  }
}

export const runtimeTransitionCoordinator = new RuntimeTransitionCoordinator();
