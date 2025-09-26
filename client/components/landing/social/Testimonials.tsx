import React from 'react';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'We manually scraped 300+ hooks before Scriptlyfy—now pattern harvesting is minutes, not weekends.',
    author: 'Early Beta User',
    role: 'Growth Strategist'
  },
  {
    quote: 'Having cross-platform transcripts normalized unlocked angles we kept missing in channel silos.',
    author: 'Content Ops Lead'
  },
  {
    quote: 'The clustering of opening lines gave us a repeatable copy generation starting point.',
    author: 'Short-Form Producer'
  }
];

interface TestimonialsProps {
  heading?: string;
  className?: string;
  limit?: number;
  compact?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ heading = 'What early users say', className, limit, compact }) => {
  const items = typeof limit === 'number' ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;
  return (
    <section aria-labelledby="testimonials-heading" className={cn('w-full', className)}>
      <div className={cn('mx-auto', compact ? 'max-w-3xl' : 'max-w-5xl')}>
        <div className="text-center mb-8">
          <h2 id="testimonials-heading" className="text-lg font-semibold tracking-tight text-slate-900">
            {heading}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(t => (
            <figure key={t.quote} className="relative rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm p-5 shadow-sm">
              <blockquote className="text-sm leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-xs font-medium text-slate-600">
                {t.author}{t.role && <span className="text-slate-400 font-normal"> – {t.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
