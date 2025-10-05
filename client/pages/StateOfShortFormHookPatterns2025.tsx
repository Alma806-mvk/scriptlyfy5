import React from 'react';
import SEO from '@/components/SEO';
import { LastUpdated } from '@/lib/contentMeta.tsx';
import { Testimonials } from '@/components/landing/social/Testimonials';

const UPDATED = '2025-09-26';
const CANONICAL = 'https://scriptlyfy.com/state-of-short-form-hook-patterns-2025';

const metrics = [
  { label: 'Videos Analyzed', value: '12,450', note: 'Across TikTok, Reels & Shorts' },
  { label: 'Distinct Creators', value: '1,180', note: 'Min 5K view floor' },
  { label: 'Hook Clusters', value: '327', note: 'Density-based semantic groups' },
  { label: 'Emerging Families', value: '14', note: '>40% QoQ growth' }
];

const topPatterns = [
  { name: 'Nobody Is Talking About', uplift: '+18%', insight: 'Under-exploited in technical / B2B micro niches.' },
  { name: 'I Tried X So You Don\'t Have To', uplift: '+15%', insight: 'Personal risk transfer narrative keeps curiosity loop open.' },
  { name: 'Stop Doing X', uplift: '+12%', insight: 'Still strong in workflow / marketing niches; fatigue emerging elsewhere.' },
  { name: 'Micro Numbered List (3 / 5 / 7)', uplift: '+11%', insight: 'Short enumerations outperform long list intros.' }
];

const emerging = [
  { name: 'Comparative Disbelief', note: 'AI vs Human: claim contrast framing accelerating.' },
  { name: 'Reverse Chronology', note: 'Outcome first, then flashback process hook.' },
  { name: 'Ultra Compression', note: '<4 word spoken hook + on-screen text expansion.' }
];

const declining = [
  { name: 'Generic Fear Bait', note: '“You\'re doing X wrong” CTR -9% QoQ.' },
  { name: 'Vanilla Listicle', note: '“Here are 10…” unless hyper-specific context.' },
  { name: 'Unverified Income Claim', note: 'Platform scrutiny increasing suppression risk.' }
];

const recommendations = [
  'Map your last 30 published hooks to these clusters; quantify over-reliance.',
  'Pilot 2 emerging families per week; cap usage to avoid premature saturation.',
  'Instrument watch-through by pattern label to build internal weighting model.',
  'Bundle under-used micro list hooks with contrasting data shock follow-up.'
];

const faqs = [
  { q: 'How is a “hook cluster” defined?', a: 'Semantic + lexical similarity threshold grouping of opening line tokens; minimum 7 instances for stability.' },
  { q: 'Do results generalize across niches?', a: 'Macro structure trends generalize; absolute uplift varies. Always re-measure on your corpus.' },
  { q: 'Will these patterns saturate?', a: 'Yes. Monitoring quarterly growth + CTR deltas helps decide when to rotate or hybridize.' },
  { q: 'How often is the dataset refreshed?', a: 'Rolling 60‑day window recomputed weekly; emerging tag requires >40% QoQ growth & minimum cluster size.' }
];

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'State of Short-Form Hook Patterns 2025', item: CANONICAL }
  ] },
  { '@context': 'https://schema.org', '@type': 'Dataset', name: 'State of Short-Form Hook Patterns 2025', description: 'Analysis of short-form video hook archetypes across TikTok, Reels & Shorts.', url: CANONICAL, dateModified: UPDATED, creator: { '@type': 'Organization', name: 'Scriptlyfy' } },
  { '@context': 'https://schema.org', '@type': 'Article', headline: 'State of Short-Form Hook Patterns 2025', description: 'Data-backed breakdown of rising, stable and declining hook formulas.', dateModified: UPDATED, datePublished: UPDATED, mainEntityOfPage: CANONICAL }
];

export default function StateOfShortFormHookPatterns2025() {
  return (
    <>
      <SEO
        title="State of Short-Form Hook Patterns 2025 | Scriptlyfy"
        description="Data-backed analysis of the short-form video hook patterns driving retention and virality in 2025."
        canonical={CANONICAL}
        jsonLd={jsonLd}
        ogTitle="Short-Form Hook Patterns 2025"
        ogDescription="Rising, stable & declining hook archetypes across TikTok, Reels & Shorts."
        twitterTitle="Short-Form Hook Patterns Report"
        twitterDescription="Emerging + declining hook archetypes backed by multi-platform data."
      />
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_70%_5%,rgba(99,102,241,0.18),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-10 pt-20 pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">State of Short-Form Hook Patterns 2025</h1>
            <div className="mt-3 text-sm text-slate-500"><LastUpdated slug="state-of-short-form-hook-patterns-2025" /></div>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Multi-platform pattern intelligence: which opening line archetypes are accelerating, plateauing or fading—and how to exploit the curve before saturation.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-medium">
              {['Pattern Intelligence','Content Research','Retention Optimization'].map(t => (
                <span key={t} className="inline-flex items-center rounded-full border border-indigo-200 bg-white/70 backdrop-blur px-3 py-1 text-indigo-700">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-6 sm:px-10 pb-32">
        {/* METRICS */}
        <section className="-mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map(m => (
            <div key={m.label} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-5">
              <div className="text-[11px] uppercase tracking-wide font-semibold text-indigo-600 mb-1">{m.label}</div>
              <div className="text-2xl font-bold text-slate-900">{m.value}</div>
              <div className="text-[12px] text-slate-500 mt-1">{m.note}</div>
            </div>
          ))}
        </section>
        {/* TOP PATTERNS */}
        <section className="mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Top Performing Patterns</h2>
          <p className="text-slate-600 text-sm max-w-3xl mb-6">Relative uplift compares median watch-through vs overall baseline after controlling for length and platform mix.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topPatterns.map(p => (
              <div key={p.name} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-4 hover:shadow-sm transition">
                <div className="text-[11px] uppercase tracking-wide font-semibold text-indigo-600 mb-1">{p.name}</div>
                <div className="text-slate-900 font-semibold text-sm">Uplift {p.uplift}</div>
                <p className="text-slate-600 text-[13px] leading-relaxed mt-1">{p.insight}</p>
              </div>
            ))}
          </div>
        </section>
        {/* EMERGING & DECLINING */}
        <section className="mt-24 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Emerging Families</h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {emerging.map(e => (
                <li key={e.name} className="flex gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />
                  <div><span className="font-semibold text-slate-900">{e.name}</span> – {e.note}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Declining / Fatigued</h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {declining.map(d => (
                <li key={d.name} className="flex gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-rose-500" />
                  <div><span className="font-semibold text-slate-900">{d.name}</span> – {d.note}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* RECOMMENDATIONS */}
        <section className="mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Recommendations</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            {recommendations.map(r => <li key={r}>{r}</li>)}
          </ul>
        </section>
        {/* METHODOLOGY */}
        <section className="mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Methodology</h2>
          <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-6">
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
              <li>Sample: 12,450 short-form videos (rolling 60‑day window ending Sept 20, 2025).</li>
              <li>Filters: English, &gt;=5K views, excluding music-only / meme remixes.</li>
              <li>Extraction: Auto transcript → heuristic opener boundary + normalization.</li>
              <li>Clustering: Sentence embeddings + HDBSCAN; min cluster size 7.</li>
              <li>Uplift: Median watch-through delta vs global baseline adjusted by duration decile.</li>
            </ul>
          </div>
        </section>
        {/* TESTIMONIALS */}
        <section className="mt-28" data-observe="reveal">
          <Testimonials heading="Practitioner Feedback" compact />
        </section>
        {/* FAQ */}
        <section className="mt-28">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">FAQ</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map(f => (
              <div key={f.q} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-5">
                <h3 className="font-semibold text-slate-800 text-sm mb-2">{f.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
        {/* CTA */}
        <section className="mt-32">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white/80 via-white to-indigo-50/60 backdrop-blur p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1 max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">Get The Full Labeled Dataset</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Join early access and receive structured hook exports, frequency deltas and emerging alerts straight to your workspace.</p>
              <a href="#signup" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-900 underline">Join the waitlist →</a>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] w-full lg:w-auto lg:max-w-xs">
              {[['Freshness','Rolling 60‑day window'],['Granularity','Cluster & variant level'],['Benchmarking','Uplift deltas'],['Alerts','Emerging flags weekly']].map(([k,v]) => (
                <div key={k} className="rounded-lg border border-slate-200 bg-white/70 backdrop-blur p-3">
                  <div className="font-semibold text-slate-900 text-xs">{k}</div>
                  <div className="text-slate-600">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 text-xs text-slate-500">© {new Date().getFullYear()} Scriptlyfy</div>
        </section>
      </main>
    </>
  );
}
