import React from 'react';
import LeadForm from '@/components/landing/LeadForm';
import SEO from '@/components/SEO';
import { LastUpdated } from '@/lib/contentMeta.tsx';

const canonical = 'https://scriptlyfy.com/bulk-transcribe-instagram-posts';

const faqs = [
  { q: 'Do you extract captions and alt text?', a: 'Yes—captions are normalized and alt text is incorporated where accessible for semantic analysis.' },
  { q: 'Is this only for video?', a: 'No. Standard feed posts (including carousels) with textual + contextual signals are processed for topic mapping.' },
  { q: 'Can I analyze hook copy across formats?', a: 'Yes—post captions and Reel openings appear side-by-side for stylistic comparison.' },
  { q: 'What export formats exist?', a: 'CSV and JSON with transcript/caption, hook lines, topics, and engagement signals (when available).' }
];

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
    { '@type': 'ListItem', position: 3, name: 'Bulk Transcribe Instagram Posts', item: canonical }
  ]},
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Bulk Transcribe Instagram Posts | Scriptlyfy', url: canonical, description: 'Bulk extract Instagram post captions & contextual signals. Build a topic & hook dataset from any public profile.' },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
];

export default function BulkTranscribeInstagramPostsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <SEO
        title="Bulk Transcribe Instagram Posts | Scriptlyfy"
        description="Bulk extract Instagram post captions & contextual signals. Build topic & hook datasets across formats."
        canonical={canonical}
        jsonLd={jsonLd}
        ogTitle="Bulk Extract Instagram Post Captions"
        ogDescription="Turn large Instagram caption sets into structured hook & topic intelligence."
        twitterTitle="Bulk Instagram Caption Intelligence"
        twitterDescription="Mine captions for hooks, topics & angles across competitors."
      />
      <header className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">Bulk Transcribe Instagram Posts</h1>
  <p className="text-lg text-slate-700 leading-relaxed">Mine large sets of Instagram captions & contextual post data to identify narrative angles, hook phrasing, and topical positioning across a niche.</p>
  <p className="mt-3 text-sm text-slate-500">← Back to the <a href="/bulk-social-video-transcription" className="underline">multi-platform transcription hub</a></p>
        <div className="mt-2"><LastUpdated slug="bulk-transcribe-instagram-posts" /></div>
      </header>
      <section className="max-w-4xl mx-auto mb-14 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Why caption intelligence matters</h2>
          <p className="text-slate-700 leading-relaxed">Captions drive depth, saves, and share-worthy framing. Manual aggregation across competitors is error-prone. Scriptlyfy automates extraction, normalization, and topic surfacing so you can systematize content ideation.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">What you get</h2>
          <ul className="list-disc ml-6 space-y-2 text-slate-700">
            <li>Batch caption ingestion & normalization</li>
            <li>Hook & opening phrase extraction</li>
            <li>Topic & semantic clustering</li>
            <li>Cross-format comparison (Reels vs Posts)</li>
            <li>Content angle library generation</li>
            <li>CSV / JSON export</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Workflow</h2>
          <ol className="list-decimal ml-6 space-y-2 text-slate-700">
            <li>Enter a public Instagram profile</li>
            <li>Post captions + related metadata ingested</li>
            <li>Hook & topic extraction</li>
            <li>Cross-format pattern comparison</li>
            <li>Export & feed future creative sprints</li>
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
          <p className="text-slate-600 mb-6">Join the waitlist to unlock bulk Instagram caption intelligence.</p>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
