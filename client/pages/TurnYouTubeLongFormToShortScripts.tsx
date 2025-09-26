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

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
    { '@type': 'ListItem', position: 3, name: 'Turn YouTube Long-Form Into Short-Form Scripts', item: canonical }
  ] },
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
    <main className="container mx-auto px-4 py-14">
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
      <article className="prose prose-slate max-w-3xl">
  <h1>Turn YouTube Long-Form Into Short-Form Scripts</h1>
  <div className="mt-1"><LastUpdated slug="turn-youtube-long-form-into-short-form-scripts" /></div>
        <p className="lead">A structured approach to mining long-form content for dozens of vertically-optimized script candidates—without drowning in timelines.</p>
        <p>Long-form videos are dense with teachable moments, contrarian pivots, and narrative tension points. Instead of guessing which 60-second slices might work, you can systematically surface segments that map to strong short-form hook structures.</p>
        <h2>Core Repurposing Principles</h2>
        <ul>
          <li><strong>Segment First:</strong> Identify conceptual breaks (story beats, metric reveals, framework pivots).</li>
          <li><strong>Hook Mapping:</strong> Attach a hook archetype (outcome, reversal, loop, contradiction) to each candidate moment.</li>
          <li><strong>Compression:</strong> Collapse internal filler while preserving narrative payoff.</li>
          <li><strong>Batch Refinement:</strong> Generate many first drafts; refine only the top 10%.</li>
        </ul>
        <h2>Manual Flow (Baseline)</h2>
        <ol>
          <li>Open video + scrub timeline while taking rough timestamps.</li>
          <li>Type raw lines into a doc; label potential hook framing.</li>
          <li>Rewrite into vertical-first script drafts.</li>
          <li>Discard low-energy candidates; polish remaining.</li>
        </ol>
        <p className="text-sm text-slate-500">This is workable for 1–2 videos, but brittle at scale.</p>
        <h2>Accelerated With Scriptlyfy</h2>
        <ol>
          <li>Bulk transcribe recent channel videos.</li>
          <li>Automatic segment inference + structural markers.</li>
          <li>Highlight hook-primed lines & tension pivots.</li>
          <li>Export candidate segments → map to Shorts/Reels format.</li>
        </ol>
        <h2>Evaluating Segment Potential</h2>
        <p>Use a simple scoring: <code>Clarity + Novelty + Emotional Energy + Hook Fit</code>. Focus on segments scoring 3–4/4 across attributes.</p>
        <h2>Cross-Format Leverage</h2>
        <p>After building short-form variants, reinforce internal linking by referencing original long-form in pinned comments or CTAs to lift watch depth + session time.</p>
        <h2>FAQ</h2>
        <div className="not-prose space-y-5 mt-4">
          {faqs.map(f => (
            <div key={f.q}>
              <h3 className="font-semibold text-slate-800">{f.q}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-10">From Timeline Scrubbing to System</h2>
        <p>Once transcripts + structural inference are automated, repurposing becomes a filtering and shaping exercise instead of raw extraction. That reduces cognitive load and increases publishing velocity.</p>
        <div className="mt-10 border-t border-slate-200 pt-8">
          <h3 className="text-slate-900 font-semibold mb-2">Join Early Access</h3>
          <p className="text-sm text-slate-600 mb-4">Be first to use automated long-form segmentation + short-form script extraction.</p>
          <InlineHeroLeadCapture />
        </div>
        <p className="mt-8 text-xs text-slate-500">Explore more: <a href="/bulk-social-video-transcription" className="underline">Hub</a> · <a href="/bulk-transcribe-youtube-videos" className="underline">YouTube transcription</a> · <a href="/bulk-transcribe-youtube-shorts" className="underline">Shorts analysis</a></p>
      </article>
    </main>
  );
}
