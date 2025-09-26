import React from 'react';
import LeadForm from '@/components/landing/LeadForm';
import SEO from '@/components/SEO';
import { LastUpdated } from '@/lib/contentMeta.tsx';

const canonical = 'https://scriptlyfy.com/bulk-transcribe-youtube-videos';

const faqs = [
  { q: 'Do you support long-form YouTube videos in bulk?', a: 'Yes. Provide a channel or playlist and Scriptlyfy queues recent videos for transcription & structural extraction.' },
  { q: 'How is this different from standard caption downloads?', a: 'We unify audio-derived transcripts, refine noise, segment narrative blocks, and surface hook & retention mechanics not obvious in raw captions.' },
  { q: 'Can I filter by duration or topic?', a: 'Filtering + semantic tagging features are planned—early access focuses on batch processing & structural enrichment first.' },
  { q: 'Can I compare long-form and short-form?', a: 'Yes. Contrast long-form narrative arcs with Shorts / Reels hook density to refine cross-format strategy.' }
];

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
    { '@type': 'ListItem', position: 3, name: 'Bulk Transcribe YouTube Videos', item: canonical }
  ]},
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Bulk Transcribe YouTube Videos | Scriptlyfy', url: canonical, description: 'Bulk transcribe YouTube videos at scale. Extract structured scripts, hook sections, and reusable narrative segments.' },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
];

export default function BulkTranscribeYouTubeVideosPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <SEO
        title="Bulk Transcribe YouTube Videos | Scriptlyfy"
        description="Bulk transcribe YouTube videos at scale. Extract structured scripts, hooks, and reusable segments for research & repurposing."
        canonical={canonical}
        jsonLd={jsonLd}
        ogTitle="Bulk Transcribe YouTube Videos"
        ogDescription="Turn long-form libraries into structured transcripts, hooks & segment insights."
        twitterTitle="Bulk YouTube Transcription"
        twitterDescription="Extract segments, hooks & reusable script blocks from channel archives."
      />
      <header className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">Bulk Transcribe YouTube Videos</h1>
  <p className="text-lg text-slate-700 leading-relaxed">Convert long-form video libraries into structured, searchable script datasets. Identify hook positioning, narrative transitions, and retention scaffolds.</p>
  <p className="mt-3 text-sm text-slate-500">← Back to the <a href="/bulk-social-video-transcription" className="underline">multi-platform transcription hub</a></p>
        <div className="mt-2"><LastUpdated slug="bulk-transcribe-youtube-videos" /></div>
      </header>
      <section className="max-w-4xl mx-auto mb-14 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Why bulk long-form transcription?</h2>
          <p className="text-slate-700 leading-relaxed">Researching dozens of videos manually wastes strategic cycles. Scriptlyfy automates ingestion, segment detection, and extraction so you can repurpose, summarize, and systematize topics faster.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">What you get</h2>
          <ul className="list-disc ml-6 space-y-2 text-slate-700">
            <li>Batch transcription of recent channel or playlist videos</li>
            <li>Narrative segment & chapter inference</li>
            <li>Hook & open-rate pattern surfaces</li>
            <li>Semantic topic aggregation</li>
            <li>Cross-format comparison (Shorts vs long-form)</li>
            <li>CSV / JSON export</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Workflow</h2>
          <ol className="list-decimal ml-6 space-y-2 text-slate-700">
            <li>Provide a channel or playlist</li>
            <li>Videos queued & processed concurrently</li>
            <li>Transcripts normalized & segmented</li>
            <li>Patterns & topic clusters surfaced</li>
            <li>Export & repurpose into guides, Shorts, or scripts</li>
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
          <p className="text-slate-600 mb-6">Join the waitlist for multi-source YouTube transcription & structural insight.</p>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
