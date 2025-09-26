// Lazy Firebase loader to defer heavy SDK cost until user intent (focus/submit)
// Provides a cached promise so multiple calls do not trigger duplicate imports.

let firebasePromise: Promise<{
  db: import('firebase/firestore').Firestore;
  app: import('firebase/app').FirebaseApp;
}> | null = null;

export function loadFirebase() {
  if (!firebasePromise) {
    firebasePromise = import('./firebase').then(mod => ({ db: mod.db, app: mod.app }));
  }
  return firebasePromise;
}

// Optional convenience: prewarm on idle
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      // Do not prefetch immediately; comment out to enable speculative warm.
      // loadFirebase();
    }, { timeout: 3000 });
  }
}
