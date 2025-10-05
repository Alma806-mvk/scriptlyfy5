import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LastUpdated, getIsoDateModified } from "@/lib/contentMeta.tsx";
import InlineHeroLeadCapture from "@/components/landing/InlineHeroLeadCapture";
import { LogoStrip } from "@/components/landing/social/LogoStrip";
import { Testimonials } from "@/components/landing/social/Testimonials";
import HorizontalScrollShadow from "@/components/ui/HorizontalScrollShadow";

// NOTE: Keep content conversion-focused: pain points, differentiators, social proof placeholder.

const FEATURES = [
  {
    category: "Acquisition Scope",
    rows: [
      { feature: "Supports Reels", scriptlyfy: true, alt: "Varies" },
      { feature: "Supports TikTok", scriptlyfy: true, alt: "Limited" },
      { feature: "Supports YouTube Shorts", scriptlyfy: true, alt: "Limited" },
      { feature: "Supports YouTube Videos (Long-Form)", scriptlyfy: true, alt: "Rare" },
      { feature: "Supports Instagram Posts (Carousel Captions)", scriptlyfy: true, alt: "Rare" },
    ],
  },
  {
    category: "Workflow Speed",
    rows: [
      { feature: "Bulk URL Paste", scriptlyfy: true, alt: false },
      { feature: "Auto Deduplication", scriptlyfy: true, alt: false },
      { feature: "Single Click Transcribe All", scriptlyfy: true, alt: false },
      { feature: "Handles Mixed Platform Lists", scriptlyfy: true, alt: false },
      { feature: "Realtime Progress Feedback", scriptlyfy: true, alt: "Partial" },
    ],
  },
  {
    category: "Output Quality",
    rows: [
      { feature: "Speaker / Segment Structure", scriptlyfy: "Planned", alt: false },
      { feature: "Hook Extraction (TikTok / Shorts)", scriptlyfy: "Beta", alt: false },
      { feature: "Timestamped Lines", scriptlyfy: "Planned", alt: "Inconsistent" },
      { feature: "Language Detection", scriptlyfy: true, alt: "Varies" },
      { feature: "Emoji & Hashtag Preservation", scriptlyfy: true, alt: "Often Strips" },
    ],
  },
  {
    category: "Strategic Layer",
    rows: [
      { feature: "Viral Hook Pattern Library", scriptlyfy: "In Progress", alt: false },
      { feature: "Repurposing Script Generator", scriptlyfy: "Beta", alt: false },
      { feature: "Cross-Platform Content Diff", scriptlyfy: "Planned", alt: false },
      { feature: "Competitor Content Gap Signals", scriptlyfy: "Research", alt: false },
      { feature: "AI Insights at Bulk Scale", scriptlyfy: true, alt: false },
    ],
  },
  {
    category: "Data & Reliability",
    rows: [
      { feature: "Deterministic Storage (No Duplicates)", scriptlyfy: true, alt: false },
      { feature: "Bulk Failover / Retry Logic", scriptlyfy: true, alt: false },
      { feature: "Safe Rate Limiting", scriptlyfy: true, alt: "Unknown" },
      { feature: "Transparent Roadmap & Changelog", scriptlyfy: "Coming", alt: false },
      { feature: "Privacy-First (Email Only Beta)", scriptlyfy: true, alt: "Varies" },
    ],
  },
];

const FAQ = [
  {
    q: "Why build one tool for all short-form platforms?",
    a: "Teams waste time context-switching across fragmented single-platform scrapers. Consolidating Reels, TikTok, Shorts and long-form inputs lets you run one unified research + repurposing pass instead of four separate workflows.",
  },
  {
    q: "How accurate are transcripts?",
    a: "Early beta accuracy mirrors native platform captions quality; we focus on speed + breadth first, then layer refinement (timestamps, speaker tags, hook extraction, formatting polishing).",
  },
  {
    q: "Will pricing penalize volume?",
    a: "Goal: predictably priced bulk tiers with generous research allowance so strategy teams can explore freely without micro-billing anxiety.",
  },
  {
    q: "What about languages beyond English?",
    a: "Language detection already gates pipeline logic; expanded post-processing normalization and punctuation models will roll out after core cross-platform stability milestones.",
  },
];

function truthyLabel(v: boolean | string) {
  if (v === true) return "Yes";
  if (v === false) return "—";
  return v; // string status tags like Beta, Planned
}

export default function Compare() {
  const pageUrl = "https://scriptlyfy.com/compare";
  const title = "Scriptlyfy vs Alternatives – Unified Bulk Social Video Transcription";
  const description = "Compare Scriptlyfy to single‑platform scrapers and generic AI transcription tools. Unified bulk ingestion across Reels, TikTok, Shorts, YouTube & more with strategy layers.";

  const itemListElements = FEATURES.flatMap((block, blockIndex) =>
    block.rows.map((r, rowIndex) => ({
      '@type': 'ListItem',
      position: blockIndex * 10 + rowIndex + 1,
      name: r.feature,
    }))
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
      { '@type': 'ListItem', position: 3, name: 'Compare' },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: itemListElements,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const dateModified = getIsoDateModified('compare');

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Scriptlyfy vs Alternatives" />
        <meta property="og:description" content="Unified multi-platform transcription & hook intelligence vs fragmented single-platform tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="/logo-scriptlyfy.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scriptlyfy vs Alternatives" />
        <meta name="twitter:description" content="Reels, TikTok, Shorts, YouTube transcription + strategy layer in one pipeline." />
        <meta name="twitter:image" content="/logo-scriptlyfy.png" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        {dateModified && (
          <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            url: pageUrl,
            dateModified: dateModified,
          })}</script>
        )}
      </Helmet>

      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Scriptlyfy vs Alternatives</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Most tools force you into narrow, single-platform scraping. Scriptlyfy ingests and structures
          short and long-form video sources <span className="font-semibold">in one bulk pipeline</span> then layers
          strategic transformation (hooks, repurposing scripts, content gap sensing) on top.
        </p>
        <div className="mt-3"><LastUpdated slug="compare" /></div>
      </header>

      <section className="mb-12">
        <InlineHeroLeadCapture />
      </section>

      <section className="space-y-12">
        {FEATURES.map(block => (
          <div key={block.category}>
            <h2 className="text-2xl font-semibold mb-4">{block.category}</h2>
            <HorizontalScrollShadow instructions="Scroll horizontally to compare all columns" className="mt-2">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2 text-left w-1/2">Feature</th>
                    <th className="px-4 py-2 text-left">Scriptlyfy</th>
                    <th className="px-4 py-2 text-left">Typical Alternative</th>
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map(r => (
                    <tr key={r.feature} className="border-t">
                      <td className="px-4 py-2 font-medium">{r.feature}</td>
                      <td className="px-4 py-2">
                        {(() => {
                          const value = r.scriptlyfy;
                          const label = truthyLabel(value);
                          const anchorMap: Record<string, string> = {
                            'Beta': '#beta',
                            'Planned': '#planned',
                            'In Progress': '#in-progress',
                            'Research': '#research',
                            'Coming': '#planned'
                          };
                          const href = typeof value === 'string' && anchorMap[value];
                          const baseClass = cn(
                            "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium",
                            typeof value === 'string'
                              ? 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition'
                              : value
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : 'bg-muted text-muted-foreground'
                          );
                          return href ? (
                            <a href={"/roadmap" + href} className={baseClass} title="View roadmap context">{label}</a>
                          ) : (
                            <span className={baseClass}>{label}</span>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-2">
                        <span className={cn(
                          "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium",
                          typeof r.alt === 'string'
                            ? 'bg-amber-500/10 text-amber-600'
                            : r.alt
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-muted text-muted-foreground'
                        )}>{truthyLabel(r.alt)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </HorizontalScrollShadow>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Why consolidation matters</h2>
        <p className="mb-4 text-muted-foreground max-w-3xl">
          Fragmented tooling creates copy/paste overhead, brittle spreadsheets, and inconsistent data fields. A unified transcript & insight layer lets strategy, scripting and iteration teams move in lock‑step.
        </p>
        <ul className="list-disc ml-6 space-y-2 text-muted-foreground max-w-2xl">
          <li>Eliminate duplicate ingestion logic across platforms.</li>
          <li>Normalize structure once (hooks, captions, context) and reuse downstream.</li>
          <li>Batch repurposing experiments instead of serial single-video flows.</li>
          <li>Faster content gap identification via aggregated multi-platform surface area.</li>
        </ul>
      </section>

      {/* Social proof logos before FAQ / final CTA */}
  <div className="mt-20" data-observe="reveal"><LogoStrip /></div>

      <section className="mt-16" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold mb-6">FAQ</h2>
        <div className="space-y-6 max-w-3xl">
          {FAQ.map(item => (
            <div key={item.q}>
              <h3 className="font-medium mb-2">{item.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials reinforcement before conversion CTA */}
  <div className="mt-24" data-observe="reveal"><Testimonials heading="Early user feedback" /></div>

      <section className="mt-20">
        <div className="rounded-lg border p-6 text-center bg-muted/40">
          <h2 className="text-xl font-semibold mb-2">Ready to unify your short-form research workflow?</h2>
            <p className="text-muted-foreground mb-4">Join early access – ship strategy faster while we expand the feature surface.</p>
            <div className="max-w-md mx-auto"><InlineHeroLeadCapture /></div>
            <p className="text-xs text-muted-foreground mt-4">Roadmap markers: Beta = usable today but evolving, Planned = committed upcoming, In Progress = actively building.</p>
        </div>
      </section>

      <nav className="mt-16 flex flex-wrap gap-4 text-sm justify-center">
        <Link to="/bulk-social-video-transcription" className="underline">Bulk Transcription Hub</Link>
        <Link to="/reverse-engineer-viral-tiktok-hooks" className="underline">TikTok Hooks Guide</Link>
        <Link to="/turn-youtube-long-form-into-short-form-scripts" className="underline">YouTube Repurposing Guide</Link>
      </nav>
    </div>
  );
}
