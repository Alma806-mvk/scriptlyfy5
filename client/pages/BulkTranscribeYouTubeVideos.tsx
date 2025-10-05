import React from "react";
import { BulkTranscribePageTemplate } from '@/components/landing/BulkTranscribePageTemplate';

const canonical = "https://scriptlyfy.com/bulk-transcribe-youtube-videos";

const faqs = [
  { q: "Do you support long-form YouTube videos in bulk?", a: "Yes. Provide a channel or playlist and Scriptlyfy queues recent videos for transcription & structural extraction." },
  { q: "How is this different from standard caption downloads?", a: "We unify audio-derived transcripts, refine noise, segment narrative blocks, and surface hook & retention mechanics not obvious in raw captions." },
  { q: "Can I filter by duration or topic?", a: "Filtering + semantic tagging features are planned—early access focuses on batch processing & structural enrichment first." },
  { q: "Can I compare long-form and short-form?", a: "Yes. Contrast long-form narrative arcs with Shorts / Reels hook density to refine cross-format strategy." }
];

export default function BulkTranscribeYouTubeVideosPage() {
  return (
    <BulkTranscribePageTemplate
      slug="bulk-transcribe-youtube-videos"
      path="/bulk-transcribe-youtube-videos"
      canonical={canonical}
      title="Bulk Transcribe YouTube Videos"
      heroTagline="LONG-FORM NARRATIVE INTELLIGENCE"
      heroDescription="Convert long-form video libraries into structured, searchable script datasets. Identify hook positioning, narrative transitions, and retention scaffolds."
      heroBullets={[
        'Channel & playlist-wide processing',
        'Narrative segment detection & inference',
        'Hook positioning & retention analysis',
        'Cross-format comparison (long-form vs Shorts)'
      ]}
      stats={[
        { label: 'Format', value: 'Long-form', hint: 'Full YouTube videos & playlists' },
        { label: 'Segments', value: 'Auto-detected', hint: 'Narrative blocks & chapters' },
        { label: 'Comparison', value: 'Cross-format', hint: 'Long-form vs short-form analysis' },
        { label: 'Export', value: 'CSV / JSON', hint: 'Structured data output' }
      ]}
      whyHeading="Why bulk long-form transcription?"
      whyBody="Researching dozens of videos manually wastes strategic cycles. Scriptlyfy automates ingestion, segment detection, and extraction so you can repurpose, summarize, and systematize topics faster."
      benefits={[
        'Batch transcription of recent channel or playlist videos',
        'Narrative segment & chapter inference',
        'Hook & open-rate pattern surfaces',
        'Semantic topic aggregation',
        'Cross-format comparison (Shorts vs long-form)',
        'CSV / JSON export'
      ]}
      workflowSteps={[
        'Provide a channel or playlist',
        'Videos queued & processed concurrently',
        'Transcripts normalized & segmented',
        'Patterns & topic clusters surfaced',
        'Export & repurpose into guides, Shorts, or scripts'
      ]}
      faqs={faqs}
      og={{
        title: 'Bulk Transcribe YouTube Videos',
        description: 'Bulk transcribe YouTube videos at scale. Extract structured scripts, hooks, and reusable segments for research & repurposing.',
        twitterTitle: 'Bulk YouTube Transcription',
        twitterDescription: 'Extract segments, hooks & reusable script blocks from channel archives.'
      }}
      related={[
        { slug: '/bulk-transcribe-youtube-shorts', label: 'YouTube Shorts', short: 'Short-form hook & pacing analysis.' },
        { slug: '/bulk-transcribe-tiktok-videos', label: 'TikTok Videos', short: 'Viral pattern intelligence & hooks.' },
        { slug: '/bulk-transcribe-instagram-reels', label: 'Instagram Reels', short: 'Hook patterns & engagement cues.' },
        { slug: '/bulk-transcribe-instagram-posts', label: 'Instagram Posts', short: 'Caption intelligence & comparison.' }
      ]}
      howToEnabled
      includeSocialProof
      ctaSub="Join the waitlist for multi-source YouTube transcription & structural insight."
    />
  );
}
