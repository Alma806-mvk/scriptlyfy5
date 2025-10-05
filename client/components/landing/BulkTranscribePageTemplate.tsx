import React from 'react';
import SEO from '@/components/SEO';
import LeadForm from '@/components/landing/LeadForm';
import { LastUpdated } from '@/lib/contentMeta.tsx';
import { LogoStrip } from '@/components/landing/social/LogoStrip';
import { Testimonials } from '@/components/landing/social/Testimonials';

export interface BulkTranscribePageTemplateProps {
  slug: string;              // slug without leading slash used for last updated key
  path: string;              // full path starting with /
  canonical: string;
  title: string;             // H1 and meta title (will append | Scriptlyfy automatically if not present)
  heroDescription: string;   // primary hero description paragraph
  heroTagline?: string;       // small uppercase tagline above title
  heroBullets?: string[];     // key differentiators under description
  stats?: { label: string; value: string; hint?: string }[]; // small stat strip
  heroVariant?: 'gradient' | 'plain';
  primaryCtaText?: string;    // text for scroll link to CTA section
  whyHeading?: string;
  whyBody: string;
  benefitsHeading?: string;
  benefits: string[];
  workflowHeading?: string;
  workflowSteps: string[];
  faqs: { q: string; a: string; }[];
  og: {
    title: string;
    description: string;
    twitterTitle?: string;
    twitterDescription?: string;
  };
  related?: { slug: string; label: string; short?: string }[];
  includeSocialProof?: boolean; // show both strip + testimonials
  showLogoStrip?: boolean;      // override to just show logos
  showTestimonials?: boolean;   // override to just show testimonials
  faqHeading?: string;
  ctaHeading?: string;
  ctaSub?: string;
  howToEnabled?: boolean;       // generate HowTo schema from workflow
  childrenTopExtras?: React.ReactNode; // optional custom block after hero
  forceEmbedCta?: boolean;      // always embed CTA inside FAQ container (overrides social proof layout)
}

// Build JSON-LD blocks
function buildJsonLd(props: BulkTranscribePageTemplateProps) {
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
      { '@type': 'ListItem', position: 3, name: props.title.replace(/ \| Scriptlyfy$/, ''), item: props.canonical }
    ]
  };
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: props.title,
    url: props.canonical,
    description: props.og.description
  };
  const faqPage = props.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null;
  const howTo = props.howToEnabled && props.workflowSteps?.length ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: props.title + ' Workflow',
    step: props.workflowSteps.map((s, i) => ({ '@type': 'HowToStep', position: i+1, name: s, text: s }))
  } : null;
  return [breadcrumbs, webPage, faqPage, howTo].filter(Boolean);
}

export const BulkTranscribePageTemplate: React.FC<BulkTranscribePageTemplateProps> = (props) => {
  const jsonLd = buildJsonLd(props);
  const seoTitle = props.title.includes('| Scriptlyfy') ? props.title : props.title + ' | Scriptlyfy';
  const showLogos = props.includeSocialProof || props.showLogoStrip;
  const showTestimonials = props.includeSocialProof || props.showTestimonials;
  const heroVariant = props.heroVariant || 'gradient';
  const scrollCta = props.primaryCtaText || 'Join early access';
  const hasSocialProofBlocks = showLogos || showTestimonials;
  return (
    <main className="relative">
      <SEO
        title={seoTitle}
        description={props.og.description}
        canonical={props.canonical}
        jsonLd={jsonLd}
        ogTitle={props.og.title}
        ogDescription={props.og.description}
        twitterTitle={props.og.twitterTitle || props.og.title}
        twitterDescription={props.og.twitterDescription || props.og.description}
      />
      <div className={heroVariant === 'gradient' ? 'relative overflow-hidden bg-gradient-to-b from-[hsl(var(--brand))]/15 via-white to-white' : ''}>
        {heroVariant === 'gradient' && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[hsl(var(--brand))]/20 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-[hsl(var(--brand))]/10 blur-3xl" />
          </div>
        )}
        <header className="relative container mx-auto px-4 pt-20 pb-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              {props.heroTagline && <div className="mb-4 inline-flex items-center rounded-full border border-[hsl(var(--brand))]/30 bg-[hsl(var(--brand))]/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-[hsl(var(--brand))] uppercase">{props.heroTagline}</div>}
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5 leading-tight">{props.title.replace(' | Scriptlyfy','')}</h1>
              <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">{props.heroDescription}</p>
              {props.heroBullets?.length ? (
                <ul className="mt-8 space-y-2">
                  {props.heroBullets.map(b => (
                    <li key={b} className="flex gap-2 text-sm text-slate-700"> 
                      <span className="mt-[2px] text-[hsl(var(--brand))]" aria-hidden>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
                <a href="#bulk-cta" className="inline-flex items-center rounded-md bg-[hsl(var(--brand))] px-5 py-3 text-white font-medium shadow hover:bg-[hsl(var(--brand))]/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand))]/40 transition">
                  {scrollCta}
                </a>
                <a href="/bulk-social-video-transcription" className="text-slate-500 hover:text-slate-700 underline underline-offset-2">Back to hub</a>
              </div>
              <div className="mt-4 text-xs text-slate-500"><LastUpdated slug={props.slug} /></div>
              {props.childrenTopExtras}
            </div>
            <div className="lg:col-span-5 xl:col-span-4 mt-10 lg:mt-2">
              {props.stats?.length ? (
                <div className="grid grid-cols-2 gap-4 bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-5 shadow-sm">
                  {props.stats.map(s => (
                    <div key={s.label} className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">{s.label}</span>
                      <span className="text-xl font-semibold text-slate-900 mt-1">{s.value}</span>
                      {s.hint && <span className="text-[11px] text-slate-500 mt-1 leading-snug">{s.hint}</span>}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </header>
      </div>

      {props.related?.length ? (
        <section className="relative max-w-6xl mx-auto px-4 mb-20" aria-labelledby="related-platforms-heading">
          <h2 id="related-platforms-heading" className="text-sm font-semibold tracking-wide text-slate-600 uppercase mb-4">Explore other platforms</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {props.related.map(r => (
              <a key={r.slug} href={r.slug} className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-[hsl(var(--brand))] transition focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]">
                <div className="font-medium text-slate-800 group-hover:text-[hsl(var(--brand))]">{r.label}</div>
                {r.short && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{r.short}</p>}
                <span className="text-[10px] font-semibold text-[hsl(var(--brand))] mt-2 inline-block">View →</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
      {/* WHY SECTION */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900 mb-5">{props.whyHeading || 'Why this matters'}</h2>
          <p className="text-slate-700 leading-relaxed text-lg">{props.whyBody}</p>
        </div>
      </section>

      {/* BENEFITS / FEATURE CARDS */}
      <section className="relative py-20 border-t border-slate-100">
        <div className="absolute inset-0 bg-white" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">{props.benefitsHeading || 'What you get'}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {props.benefits.map(b => (
              <div key={b} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent)]" aria-hidden />
                <div className="relative flex gap-3">
                  <span className="mt-1 text-[hsl(var(--brand))]">✦</span>
                  <p className="text-slate-700 text-sm leading-relaxed">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW TIMELINE */}
      <section className="relative py-24 bg-slate-50/60 border-t border-slate-100">
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent)] bg-gradient-to-b from-slate-50 via-white to-slate-50" aria-hidden />
        <div className="relative max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900 mb-12">{props.workflowHeading || 'Workflow'}</h2>
          <ol className="relative ml-2 pl-6 space-y-10 before:content-[''] before:absolute before:top-1 before:bottom-1 before:left-3 before:w-px before:bg-slate-200">
            {props.workflowSteps.map((s,i) => (
              <li key={s} className="relative">
                <span className="absolute -left-[38px] flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-semibold text-slate-700 shadow-sm">{i+1}</span>
                <div className="rounded-lg bg-white border border-slate-200 p-5 shadow-sm hover:shadow transition">
                  <p className="text-sm text-slate-700 leading-relaxed">{s}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-slate-100 pt-12 pb-6">
        <div className="absolute inset-0 bg-white" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">{props.faqHeading || 'FAQ'}</h2>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
            {props.faqs.map(f => (
              <details key={f.q} className="group" open={false}>
                <summary className="cursor-pointer list-none px-4 py-3 flex items-start justify-between gap-4 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]">
                  <span className="font-medium text-slate-800 text-sm leading-snug pr-4">{f.q}</span>
                  <span className="mt-1 text-slate-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4 -mt-2">
                  <p className="text-slate-600 text-xs leading-relaxed">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="bulk-cta" className="max-w-3xl mx-auto pt-8 pb-12 px-4">
        <div className="rounded-xl border border-slate-200 p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">{props.ctaHeading || 'Get early access'}</h2>
          <p className="text-slate-600 mb-4 text-sm leading-relaxed">{props.ctaSub || 'Join the waitlist and be first to use this capability.'}</p>
          <div className="[&>*]:mb-0">
            <LeadForm />
          </div>
        </div>
      </section>

      {showLogos && (
        <div className="max-w-4xl mx-auto mb-16" data-observe="reveal">
          <LogoStrip compact />
        </div>
      )}
      {showTestimonials && (
        <div className="max-w-4xl mx-auto mb-20" data-observe="reveal">
          <Testimonials heading="What creators say" compact limit={3} />
        </div>
      )}
    </main>
  );
};
