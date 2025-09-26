import React from 'react';
import LeadForm from '@/components/landing/LeadForm';
import SEO from '@/components/SEO';
import { LastUpdated, getIsoDateModified } from '@/lib/contentMeta.tsx';
import { LogoStrip } from '@/components/landing/social/LogoStrip';
import { Testimonials } from '@/components/landing/social/Testimonials';

const canonical = 'https://scriptlyfy.com/bulk-transcribe-tiktok-videos';

const faqs = [
  {
    q: 'Can I bulk transcribe TikTok videos from any public profile?',
    a: 'Yes. Provide a public username or profile URL and Scriptlyfy ingests recent TikToks, extracting transcripts, hook structures, and performance cues where available.'
  },
  {
    q: 'How many TikToks can I process at once?',
    a: 'Early access tiers target 100–300 recent posts per profile depending on duration distribution; batching is automatic.'
  },
  {
    q: 'Are TikTok captions enough for hooks?',
    a: 'We generate transcripts from audio, then isolate opening hook lines and cluster recurring framing patterns surpassing raw captions.'
  },
  {
    q: 'Do you support cross-platform comparison?',
    a: 'Yes. TikTok data aligns with Instagram Reels, YouTube Shorts, and long-form YouTube for pattern and topic analysis.'
  }
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
      { '@type': 'ListItem', position: 3, name: 'Bulk Transcribe TikTok Videos', item: canonical }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Bulk Transcribe TikTok Videos | Scriptlyfy',
    url: canonical,
    description: 'Bulk transcribe TikTok videos from any public profile. Turn 100+ short-form clips into searchable scripts, hook patterns, and topic intelligence.'
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

export default function BulkTranscribeTikTokPage() {
  const dateModified = getIsoDateModified('bulk-transcribe-tiktok-videos');
  return (
    <main className="container mx-auto px-4 py-16">
      <SEO
        title="Bulk Transcribe TikTok Videos | Scriptlyfy"
        description="Bulk transcribe TikTok videos from any public profile. Turn 100+ clips into searchable scripts, hooks, and topic insights in minutes."
        canonical={canonical}
        jsonLd={jsonLd}
        ogTitle="Bulk Transcribe TikTok Videos"
        ogDescription="Ingest 100+ TikToks to extract transcripts, hook patterns & topic intelligence."
        twitterTitle="Bulk TikTok Transcription"
        twitterDescription="Cluster hooks & topics from any public TikTok profile quickly."
      />
      <header className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">Bulk Transcribe TikTok Videos</h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          Rapidly ingest and transcribe TikTok content at scale. Surface hook archetypes, narrative pacing, and topic frequency so you can replicate what works—not guess.
        </p>
        <p className="mt-3 text-sm text-slate-500">← Back to the <a href="/bulk-social-video-transcription" className="underline">multi-platform transcription hub</a></p>
        <div className="mt-2"><LastUpdated slug="bulk-transcribe-tiktok-videos" /></div>
      </header>
      <section className="max-w-4xl mx-auto mb-14 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Why TikTok batch transcription?</h2>
          <p className="text-slate-700 leading-relaxed">
            Viral TikTok output depends on iterating proven hook and pacing templates. Manual viewing and note-taking across dozens of profiles is slow and lossy. Scriptlyfy automates transcript + metadata extraction, normalizes structure, and highlights repeatable creative levers.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">What you get</h2>
          <ul className="list-disc ml-6 space-y-2 text-slate-700">
            <li>Concurrent transcript generation for recent public posts</li>
            <li>Opening hook isolation & pattern clustering</li>
            <li>Topic & semantic frequency surfacing</li>
            <li>Script block extraction for reuse</li>
            <li>Cross-platform alignment (Reels, Shorts, YouTube)</li>
            <li>CSV / JSON export for deeper modeling</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Workflow</h2>
          <ol className="list-decimal ml-6 space-y-2 text-slate-700">
            <li>Enter a public TikTok profile</li>
            <li>Ingestion + queue allocation</li>
            <li>Transcript + metadata enrichment</li>
            <li>Hook & pattern clustering</li>
            <li>Export & apply to new creative angles</li>
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
      {/* Mid-page social proof: early ecosystem / user types */}
      <div className="max-w-4xl mx-auto mb-16" data-observe="reveal">
        <LogoStrip compact />
      </div>
      <div className="max-w-4xl mx-auto mb-20" data-observe="reveal">
        <Testimonials heading="What creators say" compact limit={2} />
      </div>
      <section className="max-w-3xl mx-auto mb-16">
        <div className="rounded-2xl border border-slate-200 p-8 bg-white shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Get early access</h2>
          <p className="text-slate-600 mb-6">Join the waitlist and be first to use automated TikTok transcription & pattern mining.</p>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
