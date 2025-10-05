import React from 'react';
import SEO from '@/components/SEO';
import InlineHeroLeadCapture from '@/components/landing/InlineHeroLeadCapture';
import { LastUpdated } from '@/lib/contentMeta.tsx';

const canonical = 'https://scriptlyfy.com/turn-youtube-long-form-into-short-form-scripts';

const faqs = [
  { q: 'Why repurpose long-form into vertical scripts?', a: 'It compounds research effort: one deep piece yields many high-retention short clips when structured deliberately.' },
  { q: 'Is manual repurposing inefficient?', a: 'Yes—scrubbing timelines repeatedly wastes time. Structured transcripts + segmentation accelerate selection.' },
  { q: 'What should I extract first?', a: 'Look for hookable micro-moments: strong claims, emotional pivots, counter-intuitive transitions, statistics.' },
  { q: 'How does Scriptlyfy assist?', a: 'It bulk transcribes, infers segment boundaries, surfaces hook-worthy lines, and aligns with Shorts/Reels formatting.' }
];

const workflow = [
  { step: 1, title: 'Ingest & Transcribe', desc: 'Batch pull recent long-form videos and generate accurate timestamped transcripts.' },
  { step: 2, title: 'Segment Inference', desc: 'Detect conceptual boundaries (topic shifts, metric reveals, story turns).' },
  { step: 3, title: 'Hook Signal Mining', desc: 'Surface lines with claim / tension / contrast markers for opener potential.' },
  { step: 4, title: 'Compression Drafting', desc: 'Strip filler + compress narrative to <=55s while preserving payoff.' },
  { step: 5, title: 'Pattern Mapping', desc: 'Assign hook archetypes & generate variant intros for testing.' },
  { step: 6, title: 'Batch Output', desc: 'Export structured short-form script candidates with metadata.' }
];

const scoring = [
  { k: 'Clarity', d: 'Does the viewer instantly understand payoff direction?' },
  { k: 'Novelty', d: 'Is there contrast vs common advice / framing?' },
  { k: 'Emotional Energy', d: 'Trigger curiosity, tension, aspiration or relief.' },
  { k: 'Hook Fit', d: 'Maps cleanly to outcome / reversal / loop / contradiction pattern.' }
];

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
    { '@type': 'ListItem', position: 3, name: 'Turn YouTube Long-Form Into Short-Form Scripts', item: canonical }
  ] },
  { '@context': 'https://schema.org', '@type': 'HowTo', name: 'Turn YouTube Long-Form Into Short-Form Scripts', description: 'Repeatable workflow converting long-form videos into structured vertical script candidates.', step: workflow.map(w => ({ '@type': 'HowToStep', position: w.step, name: w.title, text: w.desc })) },
  { '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Turn YouTube Long-Form Into Short-Form Scripts',
    description: 'Process for converting long-form YouTube videos into a high-volume feed of data-backed vertical video scripts.',
    url: canonical,
    mainEntityOfPage: canonical,
    articleSection: 'Content Repurposing',
    about: ['YouTube repurposing','Short-form scripting','Content workflow'],
    author: { '@type': 'Organization', name: 'Scriptlyfy' },
    publisher: { '@type': 'Organization', name: 'Scriptlyfy', logo: { '@type': 'ImageObject', url: 'https://scriptlyfy.com/logo-scriptlyfy.png' } }
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
];

export default function TurnYouTubeLongFormToShortScriptsPage() {
  return (
    <>
      <SEO
        title="Turn YouTube Long-Form Into Short-Form Scripts | Scriptlyfy"
        description="Framework for converting long-form YouTube videos into repeatable, high-performing short-form scripts using transcript segmentation."
        canonical={canonical}
        jsonLd={jsonLd}
        ogTitle="Turn YouTube Long-Form Into Short Scripts"
        ogDescription="Systematically convert long-form videos into vertical script candidates using segmentation & hook mapping."
        twitterTitle="Repurpose YouTube to Short-Form"
        twitterDescription="Framework: segment, map hooks, compress – build dozens of Shorts drafts fast."
      />
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_70%_5%,rgba(239,68,68,0.18),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-10 pt-20 pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Turn YouTube Long-Form Into Short Scripts</h1>
            <div className="mt-3 text-sm text-slate-500"><LastUpdated slug="turn-youtube-long-form-into-short-form-scripts" /></div>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Mine a single deep video for dozens of vertical-ready script candidates using structured segmentation, hook signal detection & compression heuristics.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-medium">
              {['Repurposing Velocity','Segmentation Intelligence','Hook Mapping'].map(t => (
                <span key={t} className="inline-flex items-center rounded-full border border-rose-200 bg-white/70 backdrop-blur px-3 py-1 text-rose-700">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-5xl px-6 sm:px-10 pb-32">
        {/* WORKFLOW */}
        <section className="pt-10">
          <h2 className="text-sm font-semibold tracking-wide text-rose-600 mb-3">Operational Workflow</h2>
          <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6 md:p-8">
            <ol className="space-y-5">
              {workflow.map(w => (
                <li key={w.step} className="flex gap-4">
                  <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-rose-600 text-white text-xs font-semibold flex items-center justify-center shadow">{w.step}</span>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{w.title}</div>
                    <p className="text-slate-600 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        {/* CORE PRINCIPLES */}
        <section className="mt-20">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Core Repurposing Principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ['Segment First','Identify conceptual beats & structural pivots early.'],
              ['Hook Mapping','Attach archetype labels to candidate moments.'],
              ['Compression','Strip filler; retain payoff + tension arc.'],
              ['Batch Refinement','Draft wide then polish the top cohort.']
            ].map(([t,d]) => (
              <div key={t} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-4">
                <div className="text-[11px] uppercase tracking-wide font-semibold text-rose-600 mb-1">{t}</div>
                <p className="text-slate-700 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>
        {/* MANUAL VS AUTOMATED */}
        <section className="mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Manual vs Automated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white/60 backdrop-blur p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">Manual Baseline</div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                <li>Scrub timeline & rough timestamping</li>
                <li>Copy/paste lines into doc</li>
                <li>Manually label potential hook frames</li>
                <li>Rewrite full drafts one by one</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">High cognitive load / low throughput.</p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 backdrop-blur p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-rose-700 mb-2">Accelerated (Scriptlyfy)</div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Automated ingestion & transcripts</li>
                <li>Segment boundary inference</li>
                <li>Hook signal highlighting</li>
                <li>Variant intro generation</li>
                <li>Export script candidates</li>
              </ul>
              <p className="mt-3 text-xs text-rose-700">Minutes. More balanced + objective selection.</p>
            </div>
          </div>
        </section>
        {/* SEGMENT SCORING */}
        <section className="mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Segment Scoring Framework</h2>
          <p className="text-slate-600 text-sm max-w-2xl mb-6">Prioritize segments that achieve consistent 3–4/4 across the following attributes to elevate baseline retention probability.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {scoring.map(s => (
              <div key={s.k} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-4">
                <div className="text-[11px] uppercase tracking-wide font-semibold text-rose-600 mb-1">{s.k}</div>
                <p className="text-slate-700 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
        {/* CTA + FAQ */}
        <section className="mt-28">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white/80 via-white to-rose-50/60 backdrop-blur p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1 max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">Scale Repurposing Throughput</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Join early access and use automated segmentation, hook mining & variant generation to convert deep content into a sustained short-form pipeline.</p>
              <InlineHeroLeadCapture />
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] w-full lg:w-auto lg:max-w-xs">
              {[['Throughput','More scripts per hour'],['Objectivity','Reduced selection bias'],['Consistency','Standardized structure'],['Leverage','Cross-platform ready']].map(([k,v]) => (
                <div key={k} className="rounded-lg border border-slate-200 bg-white/70 backdrop-blur p-3">
                  <div className="font-semibold text-slate-900 text-xs">{k}</div>
                  <div className="text-slate-600">{v}</div>
                </div>
              ))}
            </div>
          </div>
          {/* FAQ */}
          <div className="mt-20">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">FAQ</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map(f => (
                <div key={f.q} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-5">
                  <h3 className="font-semibold text-slate-800 text-sm mb-2">{f.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs text-slate-500">Explore more: <a href="/bulk-social-video-transcription" className="underline">Hub</a> · <a href="/bulk-transcribe-youtube-videos" className="underline">YouTube transcription</a> · <a href="/bulk-transcribe-youtube-shorts" className="underline">Shorts analysis</a></p>
          </div>
        </section>
      </main>
    </>
  );
}
