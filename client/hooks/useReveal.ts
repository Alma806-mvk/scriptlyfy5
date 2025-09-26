import { useEffect } from 'react';

/**
 * useReveal
 * Progressive enhancement hook: adds an IntersectionObserver that toggles
 * data-in="true" on elements marked with data-observe="reveal" once they
 * enter the viewport. Respects prefers-reduced-motion.
 */
export function useReveal(options?: { rootMargin?: string; threshold?: number }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-observe="reveal"]'));
    if (!elements.length) return;

    if (reduce) {
      // Instantly show without animation
      elements.forEach(el => el.setAttribute('data-in', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.setAttribute('data-in', 'true');
          } else {
            target.removeAttribute('data-in');
          }
        });
      },
      {
        root: null,
        rootMargin: options?.rootMargin || '0px 0px -10% 0px',
        threshold: options?.threshold ?? 0.2,
      }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [options?.rootMargin, options?.threshold]);
}

export default useReveal;
