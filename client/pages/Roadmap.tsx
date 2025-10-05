import SEO from '@/components/SEO';
import React from 'react';

const CANONICAL = 'https://scriptlyfy.com/roadmap';
const UPDATED = new Date().toISOString().slice(0,10);
const SUPPORT_EMAIL = 'emma@scriptlyfy.com';

// Roadmap clusters (NOW / NEXT / EXPLORING) + recently shipped timeline
const ROADMAP = {
  now: [
    { title: 'Viral Hook Pattern Library', desc: 'Clustering + frequency surfacing of opening line archetypes.', tag: 'Pattern Intelligence' },
    { title: 'Repurposing Script Generator Enhancements', desc: 'Refined segmentation + pacing scaffolds for vertical variants.', tag: 'Repurposing' },
    { title: 'Hook Extraction Precision Pass', desc: 'Improved false‑positive filtering & boundary scoring.', tag: 'Extraction' }
  ],
  next: [
    { title: 'Timestamped Line Granularity', desc: 'Fine‑grained timestamps enabling pacing diagnostics & retention overlays.', tag: 'Telemetry' },
    { title: 'Speaker / Segment Role Labels', desc: 'Narrative role classification for long‑form segmentation.', tag: 'Structure' },
    { title: 'Cross‑Platform Content Diff', desc: 'Overlap vs unique thematic angle comparison across creators.', tag: 'Comparative' }
  ],
  exploring: [
    { title: 'Topic Evolution Mapping', desc: 'Temporal drift of hook style & topic frequency.', tag: 'Research' },
    { title: 'Competitor Gap Signals', desc: 'Surface underutilized hook archetypes in a niche.', tag: 'Strategy' },
    { title: 'Quality Scoring Models', desc: 'Heuristic + model blend for potential retention probability.', tag: 'Scoring' }
  ],
  shipped: [
    { date: '2025-09', title: 'Deterministic Ingestion Core', note: 'Stable IDs + dedupe hashing across platforms.' },
    { date: '2025-09', title: 'Bulk Template System', note: 'Unified landing + FAQ + stats schema.' },
    { date: '2025-09', title: 'Legal & Privacy Revamp', note: 'Professional policy pages with structured data.' },
    { date: '2025-09', title: 'About Page Redesign', note: 'Distinct narrative + operator loop.' }
  ]
} as const;

// Structured data: ItemList for discovery + WebPage + Breadcrumb
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [...['now','next','exploring'].flatMap((k, pIdx) => (ROADMAP as any)[k].map((it: any, idx: number) => ({
    '@type': 'ListItem', position: pIdx * 50 + idx + 1, name: it.title, description: it.desc
  }))), ...ROADMAP.shipped.map((s, i) => ({ '@type': 'ListItem', position: 300 + i + 1, name: s.title, description: s.note }))]
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Roadmap', item: CANONICAL }
  ]
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Scriptlyfy Roadmap',
  url: CANONICAL,
  dateModified: UPDATED,
  description: 'Scriptlyfy product roadmap: current, next and exploratory initiatives for social video intelligence.'
};

export default function Roadmap() {
  const title = 'Scriptlyfy Roadmap – Now, Next & Exploring';
  const description = 'Transparent product roadmap: current execution focus, near-term priorities, exploratory research and recently shipped milestones.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={CANONICAL}
        jsonLd={[itemList, breadcrumb, pageSchema]}
        ogTitle="Scriptlyfy Roadmap"
        ogDescription="What we\'re building across ingestion, enrichment, repurposing & intelligence layers."
        twitterTitle="Scriptlyfy Roadmap"
        twitterDescription="Now, next & exploring initiatives for social video intelligence."
      />
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_70%_5%,rgba(59,130,246,0.22),transparent),linear-gradient(to_bottom,transparent,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 pt-20 pb-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Product Roadmap</h1>
            <p className="mt-5 text-slate-600 text-lg leading-relaxed">A living view of how we are sequencing capabilities: strengthening deterministic ingestion, deepening enrichment fidelity, surfacing actionable hook & structure intelligence, and accelerating repurposing loops.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-[11px] font-medium">
              {['Deterministic Core','Pattern Intelligence','Repurposing Acceleration','Operator Feedback'].map(t => (
                <span key={t} className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 backdrop-blur px-3 py-1 text-slate-700">{t}</span>
              ))}
            </div>
            <div className="mt-6 text-xs text-slate-500">Last updated: {UPDATED}</div>
          </div>
        </div>
      </div>
      {/* STATUS LEGEND */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mt-10">
        <div className="flex flex-wrap gap-4 text-[11px]">
          {[['NOW','bg-indigo-600'],['NEXT','bg-amber-500'],['EXPLORING','bg-slate-500'],['SHIPPED','bg-emerald-600']].map(([label,color]) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur px-3 py-1">
              <span className={`w-2 h-2 rounded-full ${color}`}></span>{label}
            </span>
          ))}
        </div>
      </div>
      {/* LANES */}
      <main className="mx-auto max-w-7xl px-6 sm:px-10 pt-14 pb-32">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          {([
            ['NOW', ROADMAP.now, 'Execution focus—actively being built / refined.'],
            ['NEXT', ROADMAP.next, 'Committed near horizon once NOW stabilizes.'],
            ['EXPLORING', ROADMAP.exploring, 'Research / validation phase; direction may evolve.']
          ] as const).map(([label, list, caption]) => (
            <div key={label} className="flex flex-col">
              <h2 className="text-sm font-semibold tracking-wide text-slate-500 mb-2 flex items-center gap-2"><span className="text-slate-900 text-base font-bold">{label}</span></h2>
              <p className="text-[12px] text-slate-500 mb-4 leading-relaxed">{caption}</p>
              <div className="space-y-4">
                {list.map(item => (
                  <div key={item.title} className="group rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-4 transition hover:shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-medium text-slate-900 text-sm leading-snug">{item.title}</h3>
                      <span className="text-[10px] uppercase tracking-wide font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-2 py-0.5">{item.tag}</span>
                    </div>
                    <p className="mt-1 text-[13px] text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* SHIPPED TIMELINE */}
        <section className="mt-28">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">Recently Shipped</h2>
          <ul className="relative space-y-6 pl-1 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-2.5 before:w-px before:bg-slate-200">
            {ROADMAP.shipped.map(s => (
              <li key={s.title} className="flex items-start gap-3 relative">
                <span className="mt-0.5 inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-semibold text-white shadow-sm ring-2 ring-white">✓</span>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">{s.date}</div>
                  <div className="font-medium text-slate-900 text-sm leading-snug">{s.title}</div>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{s.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* FEEDBACK CTA */}
        <section className="mt-32">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white/80 via-white to-indigo-50/70 backdrop-blur p-8 flex flex-col md:flex-row gap-8 md:items-center">
            <div className="flex-1 max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">Influence the Sequence</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Tell us which enrichment layer unlocks the most leverage for you. Clear operator feedback directly reshapes prioritization.</p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-900 underline">Email feedback →</a>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] w-full md:w-auto md:max-w-xs">
              {[
                ['Cycle Time','Reduce manual parsing'],
                ['Precision','Improve hook signal quality'],
                ['Coverage','Add more platforms'],
                ['Repurposing','Automate variant scripts']
              ].map(([k,v]) => (
                <div key={k} className="rounded-lg border border-slate-200 bg-white/70 backdrop-blur p-3">
                  <div className="font-semibold text-slate-900 text-xs">{k}</div>
                  <div className="text-slate-600">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* SECONDARY NAV */}
        <nav className="mt-28 text-xs flex flex-wrap gap-4">
          <a href="/about" className="underline">About</a>
          <a href="/compare" className="underline">Compare</a>
          <a href="/bulk-social-video-transcription" className="underline">Bulk Hub</a>
          <a href="/privacy" className="underline">Privacy</a>
          <a href="/terms" className="underline">Terms</a>
        </nav>
        <div className="mt-10 border-t pt-6 text-[11px] text-slate-500">© {new Date().getFullYear()} Scriptlyfy. All rights reserved.</div>
      </main>
    </>
  );
}
