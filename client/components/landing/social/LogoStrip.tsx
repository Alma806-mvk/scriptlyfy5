import React from 'react';
import { cn } from '@/lib/utils';

// Placeholder logos (could be replaced by real SVGs when available)
const LOGOS: { name: string; alt: string; label?: string }[] = [
  { name: 'logo-scriptlyfy.png', alt: 'Scriptlyfy Internal', label: 'Internal' },
  { name: 'logo.svg', alt: 'Sample Creator Partner' },
  { name: 'logo-new.svg', alt: 'Early Access Team' },
  { name: 'favicon.ico', alt: 'Research Cohort' }
];

interface LogoStripProps {
  heading?: string;
  className?: string;
  compact?: boolean;
}

export const LogoStrip: React.FC<LogoStripProps> = ({ heading = 'Trusted by early research & creator teams', className, compact }) => {
  return (
    <section aria-labelledby="logo-strip-heading" className={cn('w-full', className)}>
      <div className={cn('mx-auto', compact ? 'max-w-4xl' : 'max-w-5xl')}>        
        <div className="text-center mb-6">
          <h2 id="logo-strip-heading" className="text-sm font-medium tracking-wide text-slate-500 uppercase">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center opacity-80">
          {LOGOS.map(l => (
            <div key={l.alt} className="flex items-center justify-center">
              <div className="h-10 flex items-center">
                <img
                  src={`/${l.name}`}
                  alt={l.alt}
                  loading="lazy"
                  className="max-h-10 max-w-[120px] object-contain grayscale hover:grayscale-0 transition"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
