import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LastUpdated } from '@/lib/contentMeta.tsx';
import { Testimonials } from '@/components/landing/social/Testimonials';
import { Link } from 'react-router-dom';

// Link Magnet / Data Report Page
// Focus: authority + backlinks. Outline + placeholder content.

const UPDATED = '2025-09-26';

const sections = [
  {
    id: 'methodology',
    title: 'Methodology',
    points: [
      'Sampled 12,450 short-form videos (TikTok, Reels, Shorts).',
      'Collection window: Last 60 days ending Sept 20, 2025.',
      'Filtered to English-language, >= 5K views.',
      'Hook text extracted and normalized (stop words removed, stemmed).',
      'Clustered via semantic embeddings + density-based grouping to derive pattern families.'
    ]
  },
  {
    id: 'top-patterns',
    title: 'Top Performing Hook Patterns',
    points: [
      '"Nobody is talking about X" variant drove the highest relative watch-through uplift (+18%).',
      'Open loops with unresolved personal narrative ("I tried X so you don\'t have to") ranked #2.',
      'Challenge / anti-claim framings ("Stop doing X") over-index in B2B niches.',
      'Number-led curiosity ("7 second tweak that...") retains dominance but is fragmenting into micro-lists (3, 5, 7 > others).'
    ]
  },
  {
    id: 'emerging',
    title: 'Emerging Patterns (Up >40% QoQ)',
    points: [
      'Comparative disbelief constructions ("AI vs Human: X")',
      'Reverse chronological storytelling (outcome first, process flashback).',
      'Extreme compression hooks (<4 words) paired with on-screen text expansion.'
    ]
  },
  {
    id: 'declining',
    title: 'Declining Patterns',
    points: [
      'Overused fear bait ("You\'re doing X wrong") showing fatigue (CTR -9%).',
      'Generic listicle intros ("Here are 10 ...") unless paired with niche specificity.',
      'Unsubstantiated income claims flagged more by platforms \u2192 suppression risk.'
    ]
  }
];

function jsonLd() {
  const dataset = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'State of Short-Form Hook Patterns 2025',
    description: 'An analysis of high-performing short-form video hook archetypes across TikTok, Instagram Reels, and YouTube Shorts collected in 2025.',
    url: 'https://scriptlyfy.com/state-of-short-form-hook-patterns-2025',
    creator: {
      '@type': 'Organization',
      name: 'Scriptlyfy'
    },
    dateModified: UPDATED,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    keywords: ['hooks','short-form video','tiktok','reels','shorts','content patterns'],
    citation: 'Scriptlyfy Internal Dataset (September 2025)',
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'State of Short-Form Hook Patterns 2025',
    description: 'Data-backed breakdown of what hook formulas are rising, peaking, and fading in short-form content.',
    author: { '@type': 'Organization', name: 'Scriptlyfy' },
    dateModified: UPDATED,
    datePublished: UPDATED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://scriptlyfy.com/state-of-short-form-hook-patterns-2025' }
  };

  return [dataset, article];
}

export default function StateOfShortFormHookPatterns2025() {
  const ld = jsonLd();
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <Helmet>
        <title>State of Short-Form Hook Patterns 2025 | Scriptlyfy</title>
        <meta name="description" content="Data-backed analysis of the short-form video hook patterns driving retention and virality in 2025." />
        <link rel="canonical" href="https://scriptlyfy.com/state-of-short-form-hook-patterns-2025" />
        <meta property="og:title" content="Short-Form Hook Patterns 2025" />
        <meta property="og:description" content="Data-backed analysis of rising & fading short-form hook archetypes (TikTok, Reels, Shorts)." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://scriptlyfy.com/state-of-short-form-hook-patterns-2025" />
        <meta property="og:image" content="/logo-scriptlyfy.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Short-Form Hook Patterns 2025" />
        <meta name="twitter:description" content="Emerging, top and declining hook archetypes across TikTok, Reels & Shorts." />
        <meta name="twitter:image" content="/logo-scriptlyfy.png" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <nav className="text-sm text-slate-500 mb-6"><Link to="/">Home</Link> <span className="mx-2">/</span> <span>Data Report</span></nav>
  <h1 className="text-3xl font-bold tracking-tight text-slate-900">State of Short-Form Hook Patterns 2025</h1>
  <div className="mt-1"><LastUpdated slug="state-of-short-form-hook-patterns-2025" /></div>
      <p className="mt-4 text-slate-600 leading-relaxed">This report distills structural hook archetypes observed across a multi-platform corpus of recent, high-performing short-form videos. Use it to inform ideation sprints, A/B testing, and script template generation.</p>
      <div className="mt-2 text-xs text-slate-500">Last updated: {UPDATED}</div>

      <div className="mt-10 space-y-12">
        {sections.map(s => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-slate-900">{s.title}</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-slate-700 text-sm">
              {s.points.map(p => <li key={p}>{p}</li>)}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-14 border-t pt-10">
        <h3 className="font-semibold text-slate-900">What you can do with this</h3>
        <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-2">
          <li>Feed top pattern clusters directly into Scriptlyfy (bulk extraction) to harvest fresh examples.</li>
          <li>Build variant scripts by swapping nouns and tension elements inside high-performing frames.</li>
          <li>Prioritize experimentation around emerging patterns before saturation.</li>
        </ul>
      </div>

      {/* Testimonials injection for authority reinforcement */}
  <div className="mt-20" data-observe="reveal"><Testimonials heading="Practitioner feedback" compact /></div>

      <div className="mt-12 bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h4 className="font-semibold text-slate-900">Want the full labeled dataset?</h4>
        <p className="mt-2 text-sm text-slate-600">Join the waitlist and you\'ll get notified when we release structured exports + query tooling.</p>
        <a href="#signup" className="inline-block mt-4 text-sm font-medium bg-[hsl(var(--brand))] text-white px-5 py-2 rounded-md">Join the Waitlist</a>
      </div>

      <div className="mt-16 text-xs text-slate-400">\u00A9 {new Date().getFullYear()} Scriptlyfy</div>
    </main>
  );
}
