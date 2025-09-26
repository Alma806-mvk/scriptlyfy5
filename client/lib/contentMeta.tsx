// Centralized content freshness + metadata registry
// Add entries here when updating significant page content.
// Powers "Last updated" UI labels and structured data dateModified fields.

import React from 'react';

export interface ContentMetaEntry {
  slug: string;              // route path without leading slash ("" for home)
  title: string;             // human-friendly reference
  lastUpdated: string;       // ISO date (YYYY-MM-DD)
  changeNote?: string;       // optional short note about the update
}

// NOTE: Only bump dates when material content changes (not trivial meta tweaks)
export const CONTENT_META: ContentMetaEntry[] = [
  { slug: '', title: 'Home', lastUpdated: '2025-09-20', changeNote: 'Refined value prop & OG copy' },
  { slug: 'bulk-social-video-transcription', title: 'Bulk Social Video Transcription', lastUpdated: '2025-09-22', changeNote: 'Added internal platform links' },
  { slug: 'compare', title: 'Compare', lastUpdated: '2025-09-24', changeNote: 'Expanded feature table + FAQ' },
  { slug: 'reverse-engineer-viral-tiktok-hooks', title: 'TikTok Hook Framework Guide', lastUpdated: '2025-09-23' },
  // NOTE: slug updated to match actual route segment ("into-short-form")
  { slug: 'turn-youtube-long-form-into-short-form-scripts', title: 'Long → Short Script Guide', lastUpdated: '2025-09-23' },
  { slug: 'bulk-transcribe-tiktok-videos', title: 'Bulk Transcribe TikTok', lastUpdated: '2025-09-25' },
  { slug: 'bulk-transcribe-reels', title: 'Bulk Transcribe Reels', lastUpdated: '2025-09-25' },
  { slug: 'bulk-transcribe-youtube-shorts', title: 'Bulk Transcribe Shorts', lastUpdated: '2025-09-25' },
  { slug: 'bulk-transcribe-youtube-videos', title: 'Bulk Transcribe YouTube Videos', lastUpdated: '2025-09-25' },
  { slug: 'bulk-transcribe-instagram-posts', title: 'Bulk Transcribe Instagram Posts', lastUpdated: '2025-09-25' },
  { slug: 'state-of-short-form-hook-patterns-2025', title: 'Hook Patterns 2025 Dataset', lastUpdated: '2025-09-26', changeNote: 'Initial publication + meta' },
  { slug: 'roadmap', title: 'Roadmap', lastUpdated: '2025-09-25', changeNote: 'Added social meta' },
  { slug: 'about', title: 'About', lastUpdated: '2025-09-25', changeNote: 'Added social meta' },
  { slug: 'privacy', title: 'Privacy Policy', lastUpdated: '2025-09-25' },
  { slug: 'terms', title: 'Terms of Service', lastUpdated: '2025-09-25' },
];

export function getContentMeta(slug: string) {
  return CONTENT_META.find(e => e.slug === slug);
}

export function getIsoDateModified(slug: string) {
  return getContentMeta(slug)?.lastUpdated;
}

export const LastUpdated: React.FC<{ slug: string; className?: string }> = ({ slug, className }) => {
  const meta = getContentMeta(slug);
  if (!meta) return null;
  return (
    <span className={className || 'text-xs text-slate-500'}>
      Last updated: {meta.lastUpdated}{meta.changeNote ? ` – ${meta.changeNote}` : ''}
    </span>
  );
};
