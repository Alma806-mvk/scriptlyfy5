// Lightweight client-side event queue that buffers events until analytics loads.
// No external dependencies. Designed to work with deferred Firebase analytics.

export interface AppEvent<TMeta = Record<string, any>> {
  type: string;            // e.g. 'lead_form_submit'
  ts: number;              // epoch ms
  meta?: TMeta;            // arbitrary metadata (avoid PII)
  source?: string;         // pathname or contextual slug
  id?: string;             // optional id for dedupe
}

type Subscriber = (e: AppEvent) => void;

class EventBus {
  private queue: AppEvent[] = [];
  private flushed = false;
  private subs: Subscriber[] = [];
  private max = 100;

  track(event: Omit<AppEvent, 'ts'>) {
    const evt: AppEvent = { ts: Date.now(), ...event };
    if (this.flushed) {
      this.dispatch(evt);
    } else {
      if (this.queue.length < this.max) this.queue.push(evt);
    }
  }

  flushWith(subscriber: Subscriber) {
    if (this.flushed) return; // already flushed
    this.subs.push(subscriber);
    // Drain queue
    for (const evt of this.queue) {
      this.dispatch(evt);
    }
    this.queue = [];
    this.flushed = true;
  }

  addSubscriber(sub: Subscriber) {
    if (!this.subs.includes(sub)) this.subs.push(sub);
  }

  private dispatch(evt: AppEvent) {
    for (const s of this.subs) {
      try { s(evt); } catch (_) { /* swallow */ }
    }
  }
}

export const events = new EventBus();

// Public API
export function track(type: string, meta?: Record<string, any>, source?: string) {
  events.track({ type, meta, source });
}

// Hook for analytics readiness (called after deferred import resolves)
export function bindFirebaseAnalytics(getLogEvent: () => ((type: string, params?: any) => void) | undefined) {
  events.flushWith((evt) => {
    const logEvent = getLogEvent();
    if (!logEvent) return;
    logEvent(evt.type, { ...evt.meta, ts: evt.ts, source: evt.source });
  });
}
