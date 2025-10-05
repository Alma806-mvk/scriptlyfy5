import React, { useEffect, useRef, useState, useId } from 'react';
import { cn } from '@/lib/utils';

interface HorizontalScrollShadowProps {
  children: React.ReactNode;
  /** Accessible label for the scroll region (else rely on surrounding heading association) */
  label?: string;
  /** Optional instructions announced to screen readers (e.g. "Scroll horizontally to see all columns") */
  instructions?: string;
  className?: string;
  /** If true, adds a subtle auto-scroll nudge on mount (once) to hint scrollability */
  nudge?: boolean;
}

/**
 * Wrapper that adds horizontal overflow handling with fading gradient shadows on the left & right
 * edges when more content is off‑screen. Hides native scrollbar while preserving accessibility.
 */
export function HorizontalScrollShadow({
  children,
  label,
  instructions = 'Scroll horizontally to view all columns',
  className,
  nudge = true,
}: HorizontalScrollShadowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(false);
  const [nudged, setNudged] = useState(false);
  const instructionsId = useId();

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setHasLeft(scrollLeft > 0);
    setHasRight(scrollLeft + clientWidth < scrollWidth - 1); // allow for floating point
  };

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    const handle = () => update();
    el.addEventListener('scroll', handle, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    // Optional subtle nudge to hint scrollability (mobile only)
    if (nudge && !nudged) {
      // Only nudge if overflow exists after first paint
      requestAnimationFrame(() => {
        update();
        if (el.scrollWidth > el.clientWidth * 1.05) {
          const original = el.scrollLeft;
            // Smooth micro nudge
          el.scrollTo({ left: Math.min(original + 32, el.scrollWidth), behavior: 'smooth' });
          setTimeout(() => {
            el.scrollTo({ left: original, behavior: 'smooth' });
            setNudged(true);
          }, 300);
        }
      });
    }

    return () => {
      el.removeEventListener('scroll', handle);
      ro.disconnect();
    };
  }, [nudge, nudged]);

  const regionClass = cn(
    'relative group rounded-md border bg-background',
    hasLeft && 'scrollable-has-left',
    hasRight && 'scrollable-has-right',
    className,
  );

  return (
    <div className={regionClass} aria-label={label}>
      {/* Gradient left */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent transition-opacity duration-200',
          hasLeft ? 'opacity-100' : 'opacity-0'
        )}
      />
      {/* Gradient right */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent transition-opacity duration-200',
          hasRight ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div
        ref={scrollRef}
        role="region"
        aria-describedby={instructions ? instructionsId : undefined}
        tabIndex={0}
        className={cn(
          'overflow-x-auto overflow-y-hidden scroll-smooth relative',
          // Hide scrollbar
          '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
        )}
      >
        {children}
      </div>
      {instructions && (
        <div id={instructionsId} className="sr-only">
          {instructions}
        </div>
      )}
    </div>
  );
}

export default HorizontalScrollShadow;