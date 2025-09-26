import React from 'react';
import SEO from '@/components/SEO';
import LeadForm from '@/components/landing/LeadForm';
import { LastUpdated, getIsoDateModified } from '@/lib/contentMeta.tsx';

const canonical = 'https://scriptlyfy.com/bulk-social-video-transcription';

const platforms = [
  { slug: '/bulk-transcribe-instagram-reels', label: 'Instagram Reels', desc: 'Batch ingest & transcribe Reels for hook + topic mining.' },
  { slug: '/bulk-transcribe-tiktok-videos', label: 'TikTok Videos', desc: 'Extract scripts & hook archetypes from TikTok profiles.' },
  { slug: '/bulk-transcribe-youtube-shorts', label: 'YouTube Shorts', desc: 'Cluster hook variants & pacing across Shorts libraries.' },
  { slug: '/bulk-transcribe-youtube-videos', label: 'YouTube Videos', desc: 'Long-form narrative segmentation & reusable script blocks.' },
  { slug: '/bulk-transcribe-instagram-posts', label: 'Instagram Posts', desc: 'Caption intelligence & cross-format hook comparison.' }
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bulk Social Video Transcription | Scriptlyfy',
    url: canonical,
    description: 'Central hub for multi-platform bulk transcription: Instagram Reels, TikTok, YouTube Shorts, YouTube videos, Instagram posts.',
    hasPart: platforms.map(p => ({
      '@type': 'WebPage',
      name: p.label + ' Bulk Transcription',
      url: 'https://scriptlyfy.com' + p.slug
    }))
  }
];

export default function BulkSocialVideoTranscriptionHub() {
  const dateModified = getIsoDateModified('bulk-social-video-transcription');
  return (
    <main className="container mx-auto px-4 py-16">
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
      <header className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">Bulk Social Video Transcription</h1>
        <p className="text-lg text-slate-700 leading-relaxed">A unified research layer for short-form and long-form social video. Scriptlyfy ingests multi-platform libraries, generates refined transcripts, clusters hook styles, and surfaces topic & structural insight—so you can produce data-driven content faster.</p>
        <div className="mt-2"><LastUpdated slug="bulk-social-video-transcription" /></div>
      </header>
      <section className="max-w-5xl mx-auto mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Supported Platforms</h2>
          <a
            href="/compare"
            className="inline-flex items-center justify-center rounded-md border border-[hsl(var(--brand))]/30 bg-[hsl(var(--brand))]/10 px-4 py-2 text-xs font-medium text-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/20 transition"
          >
            Compare vs Alternatives →
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map(p => (
            <a key={p.slug} href={p.slug} className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[hsl(var(--brand))] transition">
              <h3 className="font-semibold text-slate-800 group-hover:text-[hsl(var(--brand))] mb-1">{p.label}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              <span className="inline-block mt-2 text-xs text-[hsl(var(--brand))] font-medium">Explore →</span>
            </a>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Guides & Playbooks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <a href="/reverse-engineer-viral-tiktok-hooks" className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[hsl(var(--brand))] transition">
            <h3 className="font-semibold text-slate-800 group-hover:text-[hsl(var(--brand))] mb-1">Reverse Engineer Viral TikTok Hooks</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Framework for extracting & clustering opening line patterns.</p>
            <span className="inline-block mt-2 text-xs text-[hsl(var(--brand))] font-medium">Read Guide →</span>
          </a>
          <a href="/turn-youtube-long-form-into-short-form-scripts" className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[hsl(var(--brand))] transition">
            <h3 className="font-semibold text-slate-800 group-hover:text-[hsl(var(--brand))] mb-1">Turn Long-Form Into Short Scripts</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Process to mine long-form for vertical-ready segments.</p>
            <span className="inline-block mt-2 text-xs text-[hsl(var(--brand))] font-medium">Read Guide →</span>
          </a>
        </div>
      </section>
      <section className="max-w-4xl mx-auto mb-16 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Why unify platforms?</h2>
          <p className="text-slate-700 leading-relaxed">Single-platform tools miss cross-network repetition and evolving hook archetypes. Scriptlyfy aligns transcripts across sources so you can map what consistently generates retention, saves, and shares. The result: faster ideation, sharper positioning, and less guesswork.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Core Intelligence Outputs</h2>
          <ul className="list-disc ml-6 space-y-2 text-slate-700">
            <li>Normalized transcripts (short + long-form)</li>
            <li>Hook line clustering & recurrence scoring</li>
            <li>Topic & semantic frequency surfacing</li>
            <li>Pacing & structural pattern identification</li>
            <li>Cross-platform angle overlap mapping</li>
            <li>CSV / JSON exports for deeper modeling</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Workflow Snapshot</h2>
          <ol className="list-decimal ml-6 space-y-2 text-slate-700">
            <li>Select platforms & profiles / channels</li>
            <li>Parallel ingestion & transcript refinement</li>
            <li>Hook, topic, & structural enrichment</li>
            <li>Cross-platform synthesis</li>
            <li>Export & operationalize insights</li>
          </ol>
        </div>
      </section>
      <section className="max-w-3xl mx-auto mb-20">
        <div className="rounded-2xl border border-slate-200 p-8 bg-white shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Join the Early Access</h2>
          <p className="text-slate-600 mb-6">Be first to unify multi-platform transcript intelligence and accelerate content system building.</p>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
