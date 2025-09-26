// Deferred analytics loader. Import only after a meaningful user action (e.g. successful lead submission)
// so that analytics SDK does not inflate early interaction bundles.

import { bindFirebaseAnalytics } from '@/lib/events';

export async function loadAnalytics(app: import('firebase/app').FirebaseApp) {
  if (typeof window === 'undefined') return null;
  try {
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    const ok = await isSupported();
    if (ok) {
      const analytics = getAnalytics(app);
      // Bind queue -> Firebase logEvent function
      bindFirebaseAnalytics(() => {
        try {
          const { logEvent } = require('firebase/analytics');
          return (type: string, params?: any) => logEvent(analytics, type, params);
        } catch {
          return undefined;
        }
      });
      return analytics;
    }
  } catch (e) {
    // Non-fatal; swallow to avoid blocking UX
    console.warn('Analytics load failed', e);
  }
  return null;
}
