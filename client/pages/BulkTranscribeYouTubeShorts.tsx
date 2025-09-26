import React from 'react';
import LeadForm from '@/components/landing/LeadForm';
import SEO from '@/components/SEO';
import { LastUpdated } from '@/lib/contentMeta.tsx';

const canonical = 'https://scriptlyfy.com/bulk-transcribe-youtube-shorts';

const faqs = [
  { q: 'Can I bulk transcribe Shorts from any public YouTube channel?', a: 'Yes. Provide a channel handle or URL—Scriptlyfy ingests recent Shorts and extracts transcripts + structural hooks.' },
  { q: 'How accurate are the transcripts?', a: 'We refine raw ASR output with normalization passes tuned for short-form pacing and rapid hook shifts.' },
  { q: 'Do you identify repeatable hooks?', a: 'Yes. We cluster opening lines and framing devices across Shorts for replicable scripting models.' },
  { q: 'Can I compare Shorts to long-form videos?', a: 'Yes. Short-form insight sits alongside long-form transcripts for narrative contrast.' }
];

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
    { '@type': 'ListItem', position: 3, name: 'Bulk Transcribe YouTube Shorts', item: canonical }
  ]},
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Bulk Transcribe YouTube Shorts | Scriptlyfy', url: canonical, description: 'Bulk transcribe YouTube Shorts at scale. Extract hook patterns, scripts, and topic frequency in minutes.' },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
];

export default function BulkTranscribeYouTubeShortsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <SEO
        title="Bulk Transcribe YouTube Shorts | Scriptlyfy"
        description="Bulk transcribe YouTube Shorts at scale. Extract hook patterns, scripts, and topic frequency in minutes."
        canonical={canonical}
        jsonLd={jsonLd}
        ogTitle="Bulk Transcribe YouTube Shorts"
        ogDescription="Mine Shorts libraries for hook archetypes, scripts & topic signals fast."
        twitterTitle="Bulk YouTube Shorts Transcription"
        twitterDescription="Extract hooks & topics from large Shorts sets for faster ideation."
      />
      <header className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">Bulk Transcribe YouTube Shorts</h1>
  <p className="text-lg text-slate-700 leading-relaxed">Turn large sets of YouTube Shorts into structured scripts, hook archetypes, and topic intelligence—ready for replication across vertical video platforms.</p>
  <p className="mt-3 text-sm text-slate-500">← Back to the <a href="/bulk-social-video-transcription" className="underline">multi-platform transcription hub</a></p>
        <div className="mt-2"><LastUpdated slug="bulk-transcribe-youtube-shorts" /></div>
      </header>
      <section className="max-w-4xl mx-auto mb-14 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Why automate Shorts analysis?</h2>
          <p className="text-slate-700 leading-relaxed">Shorts iterate framing and pacing faster than long-form. Manual review underestimates emergent hook variants and retention techniques. Scriptlyfy centralizes transcript + metadata extraction and surfaces repeatable creative mechanics.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">What you get</h2>
          <ul className="list-disc ml-6 space-y-2 text-slate-700">
            <li>High-throughput transcript generation</li>
            <li>Hook line isolation & similarity clustering</li>
            <li>Semantic & topic frequency analysis</li>
            <li>Reusable script segment extraction</li>
            <li>Cross-platform parity (Reels, TikTok)</li>
            <li>CSV / JSON export</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Workflow</h2>
          <ol className="list-decimal ml-6 space-y-2 text-slate-700">
            <li>Input a channel handle or Shorts feed</li>
            <li>Automated ingestion & queue distribution</li>
            <li>Transcript + enrichment passes</li>
            <li>Hook & structural clustering</li>
            <li>Export or adapt for new production cycles</li>
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
          <p className="text-slate-600 mb-6">Join the waitlist and be first to automate Shorts transcription & insight extraction.</p>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
