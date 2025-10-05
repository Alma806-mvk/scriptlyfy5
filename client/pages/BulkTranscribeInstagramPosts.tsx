import React from "react";
import { BulkTranscribePageTemplate } from '@/components/landing/BulkTranscribePageTemplate';

const canonical = "https://scriptlyfy.com/bulk-transcribe-instagram-posts";

const faqs = [
  { q: "Do you extract captions and alt text?", a: "Yes—captions are normalized and alt text is incorporated where accessible for semantic analysis." },
  { q: "Is this only for video?", a: "No. Standard feed posts (including carousels) with textual + contextual signals are processed for topic mapping." },
  { q: "Can I analyze hook copy across formats?", a: "Yes—post captions and Reel openings appear side-by-side for stylistic comparison." },
  { q: "What export formats exist?", a: "CSV and JSON with transcript/caption, hook lines, topics, and engagement signals (when available)." }
];

export default function BulkTranscribeInstagramPostsPage() {
  return (
    <BulkTranscribePageTemplate
      slug="bulk-transcribe-instagram-posts"
      path="/bulk-transcribe-instagram-posts"
      canonical={canonical}
      title="Bulk Transcribe Instagram Posts"
      heroTagline="CAPTION INTELLIGENCE ENGINE"
      heroDescription="Mine large sets of Instagram captions & contextual post data to identify narrative angles, hook phrasing, and topical positioning across a niche."
      heroBullets={[
        'Caption & alt-text extraction at scale',
        'Hook phrasing & narrative angle mining',
        'Cross-format comparison (Reels vs Posts)',
        'Content angle library generation'
      ]}
      stats={[
        { label: 'Content Types', value: 'All Formats', hint: 'Posts • Carousels • Reels' },
        { label: 'Data Points', value: 'Multi-modal', hint: 'Captions • Alt-text • Context' },
        { label: 'Analysis', value: 'Cross-format', hint: 'Posts vs Reels comparison' },
        { label: 'Export', value: 'CSV / JSON', hint: 'Structured hook & topic data' }
      ]}
      whyHeading="Why caption intelligence matters"
      whyBody="Captions drive depth, saves, and share-worthy framing. Manual aggregation across competitors is error-prone. Scriptlyfy automates extraction, normalization, and topic surfacing so you can systematize content ideation."
      benefits={[
        'Batch caption ingestion & normalization',
        'Hook & opening phrase extraction',
        'Topic & semantic clustering',
        'Cross-format comparison (Reels vs Posts)',
        'Content angle library generation',
        'CSV / JSON export'
      ]}
      workflowSteps={[
        'Enter a public Instagram profile',
        'Post captions + related metadata ingested',
        'Hook & topic extraction',
        'Cross-format pattern comparison',
        'Export & feed future creative sprints'
      ]}
      faqs={faqs}
      og={{
        title: 'Bulk Extract Instagram Post Captions',
        description: 'Bulk extract Instagram post captions & contextual signals. Build topic & hook datasets across formats.',
        twitterTitle: 'Bulk Instagram Caption Intelligence',
        twitterDescription: 'Mine captions for hooks, topics & angles across competitors.'
      }}
      related={[
        { slug: '/bulk-transcribe-instagram-reels', label: 'Instagram Reels', short: 'Video hook patterns & engagement cues.' },
        { slug: '/bulk-transcribe-tiktok-videos', label: 'TikTok Videos', short: 'Viral pattern intelligence & hooks.' },
        { slug: '/bulk-transcribe-youtube-shorts', label: 'YouTube Shorts', short: 'Short-form hook & pacing analysis.' },
        { slug: '/bulk-transcribe-youtube-videos', label: 'YouTube Videos', short: 'Long-form narrative segmentation.' }
      ]}
      howToEnabled
      includeSocialProof
      ctaSub="Join the waitlist to unlock bulk Instagram caption intelligence."
    />
  );
}
