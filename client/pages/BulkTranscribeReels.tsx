import React from 'react';
import LeadForm from '@/components/landing/LeadForm';
import SEO from '@/components/SEO';
import { LastUpdated } from '@/lib/contentMeta.tsx';

const canonical = 'https://scriptlyfy.com/bulk-transcribe-instagram-reels';

const faqs = [
  {
    q: 'Can I bulk transcribe Reels from any public Instagram profile?',
    a: 'Yes. Paste or select a profile and Scriptlyfy ingests recent Reels, extracting high-quality transcripts and metadata (captions, engagement signals where available).',
  },
  {
    q: 'How fast is the bulk transcription?',
    a: 'Most profiles process in minutes. A set of 100 short-form videos usually finishes under 3 minutes depending on concurrency and queue load.',
  },
  {
    q: 'Do you support TikTok and YouTube Shorts too?',
    a: 'Yes—TikTok, Shorts, and standard YouTube videos are supported, letting you compare cross-platform patterns.',
  },
  {
    q: 'What formats can I export?',
    a: 'You can export structured CSV/JSON of transcripts, script blocks, hook lines, and aggregated topic insights.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
      { '@type': 'ListItem', position: 3, name: 'Bulk Transcribe Instagram Reels', item: canonical }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Bulk Transcribe Instagram Reels | Scriptlyfy',
    url: canonical,
    description: 'Bulk transcribe Instagram Reels from any profile. Turn 100+ videos into searchable scripts and insight-rich datasets in minutes.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }
];

export default function BulkTranscribeReelsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <SEO
        title="Bulk Transcribe Instagram Reels | Scriptlyfy"
        description="Bulk transcribe Instagram Reels from any profile. Turn 100+ Reels into searchable scripts, hooks, and competitive insights in minutes."
        canonical={canonical}
        jsonLd={jsonLd}
        ogTitle="Bulk Transcribe Instagram Reels"
        ogDescription="Extract transcripts, hook patterns & topic signals from public Reels at scale."
        twitterTitle="Bulk Instagram Reels Transcription"
        twitterDescription="Mine 100+ Reels for scripts, hooks & topic insights fast."
      />
      <header className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          Bulk Transcribe Instagram Reels
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          Instantly ingest and transcribe dozens (or hundreds) of Instagram Reels from any public profile. Scriptlyfy extracts clean, structured scripts and reveals repeatable hook patterns, topic frequency, and engagement signals—so you can shortcut weeks of manual research.
        </p>
        <p className="mt-3 text-sm text-slate-500">← Back to the <a href="/bulk-social-video-transcription" className="underline">multi-platform transcription hub</a></p>
        <div className="mt-2"><LastUpdated slug="bulk-transcribe-reels" /></div>
      </header>

      <section className="max-w-4xl mx-auto mb-14 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Why bulk transcription matters</h2>
          <p className="text-slate-700 leading-relaxed">
            Short-form video is dense with positioning, hook styles, and audience language. Manually opening each Reel, copying captions, and retyping spoken lines is slow, inconsistent, and rarely systematic. Scriptlyfy automates ingestion, transcription, normalization, and enrichment so you focus on analysis and creation—not collection.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">What you get</h2>
          <ul className="list-disc ml-6 space-y-2 text-slate-700">
            <li>Batch transcript extraction for recent public Reels</li>
            <li>Hook line isolation & variant clustering</li>
            <li>Topic & keyword frequency surfacing</li>
            <li>Reusable script skeletons from top-performing content</li>
            <li>Cross-platform parity (TikTok, Shorts, YouTube)</li>
            <li>Export to CSV / JSON for deeper modeling</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Workflow</h2>
          <ol className="list-decimal ml-6 space-y-2 text-slate-700">
            <li>Input or select a public Instagram profile</li>
            <li>Scriptlyfy ingests the latest Reels and queues transcription</li>
            <li>Transcripts + metadata (duration, caption, timing) populate</li>
            <li>Hooks, themes, and reusable script blocks surfaced automatically</li>
            <li>Export or repurpose into new creative concepts</li>
          </ol>
        </div>
        <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">FAQ</h2>
            <div className="space-y-6">
              {faqs.map(f => (
                <div key={f.q}>
                  <h3 className="font-medium text-slate-800">{f.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto mb-16">
        <div className="rounded-2xl border border-slate-200 p-8 bg-white shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Get early access</h2>
          <p className="text-slate-600 mb-6">Join the waitlist and be first to use automated Reel transcription & insight mining.</p>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
