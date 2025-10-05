import React from 'react';
import { BulkTranscribePageTemplate } from '@/components/landing/BulkTranscribePageTemplate';

const canonical = 'https://scriptlyfy.com/bulk-transcribe-youtube-shorts';

const faqs = [
  { q: 'Can I bulk transcribe Shorts from any public YouTube channel?', a: 'Yes. Provide a channel handle or URL—Scriptlyfy ingests recent Shorts and extracts transcripts + structural hooks.' },
  { q: 'How accurate are the transcripts?', a: 'We refine raw ASR output with normalization passes tuned for short-form pacing and rapid hook shifts.' },
  { q: 'Do you identify repeatable hooks?', a: 'Yes. We cluster opening lines and framing devices across Shorts for replicable scripting models.' },
  { q: 'Can I compare Shorts to long-form videos?', a: 'Yes. Short-form insight sits alongside long-form transcripts for narrative contrast.' }
];

export default function BulkTranscribeYouTubeShortsPage() {
  return (
    <BulkTranscribePageTemplate
      slug="bulk-transcribe-youtube-shorts"
      path="/bulk-transcribe-youtube-shorts"
      canonical={canonical}
      title="Bulk Transcribe YouTube Shorts"
      heroTagline="SHORT-FORM MASTERY ENGINE"
      heroDescription="Turn large sets of YouTube Shorts into structured scripts, hook archetypes, and topic intelligence—ready for replication across vertical video platforms."
      heroBullets={[
        'Channel-wide Shorts ingestion in minutes',
        'Advanced ASR refinement for rapid-fire content',
        'Hook archetype clustering & pattern mining',
        'Cross-platform template compatibility'
      ]}
      stats={[
        { label: 'Processing', value: 'Real-time', hint: 'High-throughput transcript generation' },
        { label: 'Hook Types', value: '20+', hint: 'Clustered framing devices' },
        { label: 'Platforms', value: '3+', hint: 'Shorts • Reels • TikTok parity' },
        { label: 'Export', value: 'CSV / JSON', hint: 'Structured data output' }
      ]}
      whyHeading="Why automate Shorts analysis?"
      whyBody="Shorts iterate framing and pacing faster than long-form. Manual review underestimates emergent hook variants and retention techniques. Scriptlyfy centralizes transcript + metadata extraction and surfaces repeatable creative mechanics."
      benefits={[
        'High-throughput transcript generation',
        'Hook line isolation & similarity clustering',
        'Semantic & topic frequency analysis',
        'Reusable script segment extraction',
        'Cross-platform parity (Reels, TikTok)',
        'CSV / JSON export'
      ]}
      workflowSteps={[
        'Input a channel handle or Shorts feed',
        'Automated ingestion & queue distribution',
        'Transcript + enrichment passes',
        'Hook & structural clustering',
        'Export or adapt for new production cycles'
      ]}
      faqs={faqs}
      og={{
        title: 'Bulk Transcribe YouTube Shorts',
        description: 'Bulk transcribe YouTube Shorts at scale. Extract hook patterns, scripts, and topic frequency in minutes.',
        twitterTitle: 'Bulk YouTube Shorts Transcription',
        twitterDescription: 'Extract hooks & topics from large Shorts sets for faster ideation.'
      }}
      related={[
        { slug: '/bulk-transcribe-tiktok-videos', label: 'TikTok Videos', short: 'Viral pattern intelligence & hooks.' },
        { slug: '/bulk-transcribe-instagram-reels', label: 'Instagram Reels', short: 'Hook patterns & engagement cues.' },
        { slug: '/bulk-transcribe-youtube-videos', label: 'YouTube Videos', short: 'Long-form narrative segmentation.' },
        { slug: '/bulk-transcribe-instagram-posts', label: 'Instagram Posts', short: 'Caption intelligence & comparison.' }
      ]}
      howToEnabled
      ctaSub="Join the waitlist and be first to automate Shorts transcription & insight extraction."
    />
  );
}
