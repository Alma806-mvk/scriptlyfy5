import React from 'react';
import SEO from '@/components/SEO';
import LeadForm from '@/components/landing/LeadForm';
import { LastUpdated, getIsoDateModified } from '@/lib/contentMeta.tsx';
import { Testimonials } from '@/components/landing/social/Testimonials';

const canonical = 'https://scriptlyfy.com/bulk-social-video-transcription';

const PLATFORMS = [
  { slug: '/bulk-transcribe-instagram-reels', label: 'Instagram Reels', desc: 'Batch ingest & transcribe Reels for hook + topic mining.' },
  { slug: '/bulk-transcribe-tiktok-videos', label: 'TikTok Videos', desc: 'Extract scripts & hook archetypes from TikTok profiles.' },
  { slug: '/bulk-transcribe-youtube-shorts', label: 'YouTube Shorts', desc: 'Cluster hook variants & pacing across Shorts libraries.' },
  { slug: '/bulk-transcribe-youtube-videos', label: 'YouTube Videos', desc: 'Long-form narrative segmentation & reusable script blocks.' },
  { slug: '/bulk-transcribe-instagram-posts', label: 'Instagram Posts', desc: 'Caption intelligence & cross-format hook comparison.' }
];

const WORKFLOW_STEPS = [
  'Paste or import multi-platform URLs (profiles, channels, video links)',
  'Deterministic ingestion + transcript normalization',
  'Hook + topic + structure enrichment & clustering',
  'Cross-platform overlap & angle differentiation analysis',
  'Export, repurpose, and feed into scripting / briefing loops'
];

const METRICS = [
  { label: 'Platforms Unified', value: '5+', sub: 'Short + long-form' },
  { label: 'Avg. Deduplication', value: '98%', sub: 'No wasted credits' },
  { label: 'Hook Patterns Tracked', value: '120+', sub: 'Archetype library' },
  { label: 'Pipeline Throughput', value: '100+ / run', sub: 'Batch oriented' }
];

const OUTPUTS = [
  'Normalized transcripts (short + long-form)',
  'Opening hook pattern clustering & frequency scoring',
  'Topic / semantic overlap surfacing',
  'Pacing & structure heuristics (intros, pivots, calls-to-action)',
  'Cross-platform angle overlap + uniqueness mapping',
  'CSV / JSON exports for downstream modeling'
];

const FAQ = [
  { q: 'Why a hub instead of separate tools?', a: 'Fragmented single-platform utilities create copy/paste friction and inconsistent field structures. Centralizing ingestion gives you one normalized layer for every downstream strategic question.' },
  { q: 'Does Scriptlyfy store duplicates?', a: 'We use deterministic keys so the same URL cannot inflate volume. That means stable referential data and cleaner longitudinal analysis.' },
  { q: 'How do you handle failed fetches or partial timeouts?', a: 'Retries with backoff + per-platform safety limits. Failed items are isolated so successful transcripts continue processing without a full batch restart.' },
  { q: 'Will you add more platforms?', a: 'Roadmap includes LinkedIn native video + X (Twitter) clips after core stability milestones and higher-fidelity hook labeling improvements.' },
  { q: 'Can I export enriched data?', a: 'Yes – bulk CSV / JSON exports for transcripts, hooks, and structural annotations to feed LLM fine-tuning or internal dashboards.' }
];

// Structured Data Objects
const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Bulk Social Video Transcription | Scriptlyfy',
  url: canonical,
  description: 'Central hub for multi-platform bulk transcription: Instagram Reels, TikTok, YouTube Shorts, YouTube videos, Instagram posts.',
  hasPart: PLATFORMS.map(p => ({
    '@type': 'WebPage',
    name: p.label + ' Bulk Transcription',
    url: 'https://scriptlyfy.com' + p.slug
  }))
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: PLATFORMS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: 'https://scriptlyfy.com' + p.slug,
    name: p.label
  }))
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription' }
  ]
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Unified Bulk Social Video Transcription Workflow',
  description: 'Steps to ingest and enrich multi-platform short and long-form video content in Scriptlyfy.',
  step: WORKFLOW_STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s }))
};

export default function BulkSocialVideoTranscriptionHub() {
  const dateModified = getIsoDateModified('bulk-social-video-transcription');
  const jsonLd = [collectionJsonLd, itemListJsonLd, faqJsonLd, breadcrumbJsonLd, howToJsonLd];
  return (
    <main className="relative overflow-hidden">
      {/* Decorative gradient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(99,102,241,0.15),transparent_60%)]" />
      <SEO
        title="Bulk Social Video Transcription Hub | Scriptlyfy"
        description="Bulk transcribe and analyze content across Reels, TikTok, Shorts, YouTube videos, and Instagram posts from one unified platform."
        canonical={canonical}
        jsonLd={jsonLd}
        ogTitle="Bulk Social Video Transcription Hub"
        ogDescription="Unified multi-platform transcription & hook intelligence (Reels, TikTok, Shorts, YouTube, Instagram)."
        twitterTitle="Bulk Social Video Transcription Intelligence"
        twitterDescription="Analyze hooks & topics across Reels, TikTok, Shorts & more — Scriptlyfy."
      />

      {/* Hero */}
      <header className="relative container mx-auto px-4 pt-20 pb-16 max-w-5xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/60 backdrop-blur px-4 py-1 text-xs font-medium text-slate-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--brand))] animate-pulse" /> Unified Research Layer
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
          Bulk Social Video <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Transcription & Intelligence</span>
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">
          One ingestion + enrichment pipeline for Reels, TikTok, Shorts, long-form YouTube and captions. Normalize structure, extract hook archetypes, map semantic overlap, and repurpose with confidence.
        </p>
        <div className="mt-4"><LastUpdated slug="bulk-social-video-transcription" /></div>
        {/* Metrics */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
          {METRICS.map(m => (
            <div key={m.label} className="rounded-xl border border-white/40 bg-white/60 backdrop-blur p-4 text-center shadow-sm">
              <div className="text-xl font-semibold text-slate-900">{m.value}</div>
              <div className="text-xs font-medium tracking-wide text-slate-600 mt-1">{m.label}</div>
              <div className="text-[10px] text-slate-500 mt-1">{m.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Platforms */}
      <section className="container mx-auto px-4 pb-20 max-w-6xl" aria-labelledby="platforms-heading">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 id="platforms-heading" className="text-2xl font-semibold tracking-tight mb-2">Supported Platforms</h2>
            <p className="text-sm text-slate-600 max-w-xl">Mix short & long-form sources in the same batch. Deduplication prevents wasted runs.</p>
          </div>
          <a href="/compare" className="inline-flex items-center rounded-md border border-[hsl(var(--brand))]/40 bg-[hsl(var(--brand))]/10 px-4 py-2 text-xs font-medium text-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/20 transition shadow-sm">Compare vs Alternatives →</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLATFORMS.map(p => (
            <a key={p.slug} href={p.slug} className="group relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-sm hover:shadow-md hover:border-[hsl(var(--brand))] transition">
              <h3 className="font-semibold text-slate-800 group-hover:text-[hsl(var(--brand))] mb-1">{p.label}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-medium text-[hsl(var(--brand))]">Explore <span aria-hidden>→</span></span>
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[hsl(var(--brand))]/5 to-transparent" />
            </a>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="container mx-auto px-4 pb-20 max-w-5xl" aria-labelledby="workflow-heading">
        <h2 id="workflow-heading" className="text-2xl font-semibold tracking-tight mb-6">Unified Pipeline Workflow</h2>
        <ol className="relative ml-2 border-l border-slate-200 pl-6 space-y-8">
          {WORKFLOW_STEPS.map((s, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[37px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--brand))]/15 text-[11px] font-semibold text-[hsl(var(--brand))] ring-2 ring-white shadow">{i + 1}</span>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Intelligence Outputs */}
      <section className="container mx-auto px-4 pb-20 max-w-5xl" aria-labelledby="outputs-heading">
        <h2 id="outputs-heading" className="text-2xl font-semibold tracking-tight mb-4">Core Intelligence Outputs</h2>
        <p className="text-sm text-slate-600 mb-4 max-w-2xl">Outputs are designed to shortcut manual pattern hunting and feed directly into ideation, scripting, repurposing, and growth experiments.</p>
        <ul className="grid sm:grid-cols-2 gap-3">
          {OUTPUTS.map(o => (
            <li key={o} className="rounded-lg border border-slate-200 bg-white/70 backdrop-blur px-4 py-3 text-sm text-slate-700 flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--brand))]" />{o}
            </li>
          ))}
        </ul>
      </section>

      {/* Guides */}
      <section className="container mx-auto px-4 pb-20 max-w-6xl" aria-labelledby="guides-heading">
        <h2 id="guides-heading" className="text-2xl font-semibold tracking-tight mb-6">Guides & Playbooks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <a href="/reverse-engineer-viral-tiktok-hooks" className="group block rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:border-[hsl(var(--brand))] hover:shadow-md transition">
            <h3 className="font-semibold text-slate-800 group-hover:text-[hsl(var(--brand))] mb-1">Reverse Engineer Viral TikTok Hooks</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Extract, cluster, and leverage opening line archetypes for retention lift.</p>
            <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-medium text-[hsl(var(--brand))]">Read Guide →</span>
          </a>
          <a href="/turn-youtube-long-form-into-short-form-scripts" className="group block rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:border-[hsl(var(--brand))] hover:shadow-md transition">
            <h3 className="font-semibold text-slate-800 group-hover:text-[hsl(var(--brand))] mb-1">Turn Long-Form Into Short Scripts</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Mine long-form narrative structure for vertical-ready micro-stories.</p>
            <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-medium text-[hsl(var(--brand))]">Read Guide →</span>
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 pb-24 max-w-5xl" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading" className="text-2xl font-semibold tracking-tight mb-8">Early User Feedback</h2>
        <Testimonials />
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-24 max-w-5xl" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight mb-8">FAQ</h2>
        <div className="space-y-8">
          {FAQ.map(item => (
            <div key={item.q} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-5 shadow-sm">
              <h3 className="font-medium text-slate-800 mb-2">{item.q}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-32 max-w-3xl" aria-labelledby="cta-heading">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur p-10 shadow-sm">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.15),transparent_60%)]" />
          <h2 id="cta-heading" className="relative text-2xl font-semibold tracking-tight mb-4">Unify your short‑form research & repurposing loop</h2>
          <p className="relative text-slate-600 mb-6 text-sm sm:text-base max-w-lg">Join early access – accelerate ideation, pattern discovery, and script generation while we expand structural intelligence depth.</p>
          <div className="relative"><LeadForm /></div>
          <p className="relative mt-4 text-[11px] text-slate-500">Deterministic storage prevents duplicate billing. Roadmap: deeper structural tagging, multi-lingual normalization, creator performance overlays.</p>
        </div>
      </section>
    </main>
  );
}
