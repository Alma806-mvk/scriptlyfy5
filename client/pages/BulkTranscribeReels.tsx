import React from 'react';
import { BulkTranscribePageTemplate } from '@/components/landing/BulkTranscribePageTemplate';

const canonical = 'https://scriptlyfy.com/bulk-transcribe-instagram-reels';

const faqs = [
  { q: 'Can I bulk transcribe Reels from any public Instagram profile?', a: 'Yes. Paste or select a profile and Scriptlyfy ingests recent Reels, extracting high-quality transcripts and metadata (captions, engagement signals where available).' },
  { q: 'How fast is the bulk transcription?', a: 'Most profiles process in minutes. A set of 100 short-form videos usually finishes under 3 minutes depending on concurrency and queue load.' },
  { q: 'Do you support TikTok and YouTube Shorts too?', a: 'Yes—TikTok, Shorts, and standard YouTube videos are supported, letting you compare cross-platform patterns.' },
  { q: 'What formats can I export?', a: 'You can export structured CSV/JSON of transcripts, script blocks, hook lines, and aggregated topic insights.' }
];

export default function BulkTranscribeReelsPage() {
  return (
    <BulkTranscribePageTemplate
      slug="bulk-transcribe-reels"
      path="/bulk-transcribe-instagram-reels"
      canonical={canonical}
      title="Bulk Transcribe Instagram Reels"
      heroTagline="CREATOR RESEARCH AUTOMATION"
      heroDescription="Instantly ingest and transcribe dozens (or hundreds) of Instagram Reels from any public profile. Scriptlyfy extracts clean, structured scripts and reveals repeatable hook patterns, topic frequency, and engagement signals—so you can shortcut weeks of manual research."
      heroBullets={[
        '100+ Reels processed in minutes',
        'Hook & topic clustering out-of-the-box',
        'Reusable script skeleton extraction',
        'Cross-platform parity (TikTok, Shorts, YouTube)'
      ]}
      stats={[
        { label: 'Avg Speed', value: '~3 min', hint: 'Per 100 recent Reels' },
        { label: 'Hook Variants', value: '50+', hint: 'Clustered automatically' },
        { label: 'Exports', value: 'CSV / JSON', hint: 'Structured datasets' },
        { label: 'Platforms', value: '4+', hint: 'Reels • TikTok • Shorts • YT' }
      ]}
      whyHeading="Why bulk transcription matters"
      whyBody="Short-form video is dense with positioning, hook styles, and audience language. Manually opening each Reel, copying captions, and retyping spoken lines is slow, inconsistent, and rarely systematic. Scriptlyfy automates ingestion, transcription, normalization, and enrichment so you focus on analysis and creation—not collection."
      benefits={[
        'Batch transcript extraction for recent public Reels',
        'Hook line isolation & variant clustering',
        'Topic & keyword frequency surfacing',
        'Reusable script skeletons from top-performing content',
        'Cross-platform parity (TikTok, Shorts, YouTube)',
        'CSV / JSON export for deeper modeling'
      ]}
      workflowSteps={[
        'Input or select a public Instagram profile',
        'Scriptlyfy ingests the latest Reels and queues transcription',
        'Transcripts + metadata (duration, caption, timing) populate',
        'Hooks, themes, and reusable script blocks surfaced automatically',
        'Export or repurpose into new creative concepts'
      ]}
      faqs={faqs}
      og={{
        title: 'Bulk Transcribe Instagram Reels',
        description: 'Bulk transcribe Instagram Reels from any profile. Turn 100+ Reels into searchable scripts, hooks, and competitive insights in minutes.',
        twitterTitle: 'Bulk Instagram Reels Transcription',
        twitterDescription: 'Mine 100+ Reels for scripts, hooks & topic insights fast.'
      }}
      related={[
        { slug: '/bulk-transcribe-tiktok-videos', label: 'TikTok Videos', short: 'Extract scripts & hook archetypes.' },
        { slug: '/bulk-transcribe-youtube-shorts', label: 'YouTube Shorts', short: 'Cluster hook variants & pacing.' },
        { slug: '/bulk-transcribe-youtube-videos', label: 'YouTube Videos', short: 'Long-form narrative segmentation.' },
        { slug: '/bulk-transcribe-instagram-posts', label: 'Instagram Posts', short: 'Caption intelligence & comparison.' }
      ]}
      howToEnabled
      ctaSub="Join the waitlist and be first to use automated Reel transcription & insight mining."
    />
  );
}
