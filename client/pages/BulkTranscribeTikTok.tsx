import React from 'react';
import { BulkTranscribePageTemplate } from '@/components/landing/BulkTranscribePageTemplate';

const canonical = 'https://scriptlyfy.com/bulk-transcribe-tiktok-videos';

const faqs = [
  { q: 'Can I bulk transcribe TikTok videos from any public profile?', a: 'Yes. Provide a public username or profile URL and Scriptlyfy ingests recent TikToks, extracting transcripts, hook structures, and performance cues where available.' },
  { q: 'How many TikToks can I process at once?', a: 'Early access tiers target 100–300 recent posts per profile depending on duration distribution; batching is automatic.' },
  { q: 'Are TikTok captions enough for hooks?', a: 'We generate transcripts from audio, then isolate opening hook lines and cluster recurring framing patterns surpassing raw captions.' },
  { q: 'Do you support cross-platform comparison?', a: 'Yes. TikTok data aligns with Instagram Reels, YouTube Shorts, and long-form YouTube for pattern and topic analysis.' }
];

export default function BulkTranscribeTikTokPage() {
  return (
    <BulkTranscribePageTemplate
      slug="bulk-transcribe-tiktok-videos"
      path="/bulk-transcribe-tiktok-videos"
      canonical={canonical}
      title="Bulk Transcribe TikTok Videos"
      heroTagline="VIRAL CONTENT INTELLIGENCE"
      heroDescription="Rapidly ingest and transcribe TikTok content at scale. Surface hook archetypes, narrative pacing, and topic frequency so you can replicate what works—not guess."
      heroBullets={[
        '100+ TikToks processed in minutes',
        'Hook archetype clustering built-in',
        'Viral narrative pattern extraction',
        'Cross-platform template analysis'
      ]}
      stats={[
        { label: 'Batch Size', value: '100-300', hint: 'Recent posts per profile' },
        { label: 'Hook Types', value: '25+', hint: 'Pattern archetypes identified' },
        { label: 'Export', value: 'CSV / JSON', hint: 'Structured data formats' },
        { label: 'Platforms', value: '4+', hint: 'TikTok • Reels • Shorts • YT' }
      ]}
      whyHeading="Why TikTok batch transcription?"
      whyBody="Viral TikTok output depends on iterating proven hook and pacing templates. Manual viewing and note-taking across dozens of profiles is slow and lossy. Scriptlyfy automates transcript + metadata extraction, normalizes structure, and highlights repeatable creative levers."
      benefits={[
        'Concurrent transcript generation for recent public posts',
        'Opening hook isolation & pattern clustering',
        'Topic & semantic frequency surfacing', 
        'Script block extraction for reuse',
        'Cross-platform alignment (Reels, Shorts, YouTube)',
        'CSV / JSON export for deeper modeling'
      ]}
      workflowSteps={[
        'Enter a public TikTok profile',
        'Ingestion + queue allocation',
        'Transcript + metadata enrichment',
        'Hook & pattern clustering',
        'Export & apply to new creative angles'
      ]}
      faqs={faqs}
      og={{
        title: 'Bulk Transcribe TikTok Videos',
        description: 'Bulk transcribe TikTok videos from any public profile. Turn 100+ clips into searchable scripts, hooks, and topic insights in minutes.',
        twitterTitle: 'Bulk TikTok Transcription',
        twitterDescription: 'Cluster hooks & topics from any public TikTok profile quickly.'
      }}
      related={[
        { slug: '/bulk-transcribe-instagram-reels', label: 'Instagram Reels', short: 'Hook patterns & engagement cues.' },
        { slug: '/bulk-transcribe-youtube-shorts', label: 'YouTube Shorts', short: 'Pacing analysis & viral templates.' },
        { slug: '/bulk-transcribe-youtube-videos', label: 'YouTube Videos', short: 'Long-form narrative segmentation.' },
        { slug: '/bulk-transcribe-instagram-posts', label: 'Instagram Posts', short: 'Caption intelligence & comparison.' }
      ]}
      howToEnabled
      ctaSub="Join the waitlist and be first to use automated TikTok transcription & pattern mining."
    />
  );
}
