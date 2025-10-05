import SEO from '@/components/SEO';
import InlineHeroLeadCapture from '@/components/landing/InlineHeroLeadCapture';
import React from 'react';

const CANONICAL = 'https://scriptlyfy.com/about';
const UPDATED = new Date().toISOString().slice(0,10);
const SUPPORT_EMAIL = 'emma@scriptlyfy.com';

// Lightweight in‑page nav (horizontal pills instead of sidebar TOC)
const nav: { id: string; label: string; }[] = [
  { id: 'mission', label: 'Mission' },
  { id: 'approach', label: 'Approach' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'loop', label: 'Operator Loop' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'trust', label: 'Trust' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'access', label: 'Early Access' }
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: CANONICAL }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'About Scriptlyfy',
    url: CANONICAL,
    dateModified: UPDATED,
    description: 'About Scriptlyfy – unified social video intelligence & enrichment platform.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Scriptlyfy',
    url: 'https://scriptlyfy.com/',
    logo: 'https://scriptlyfy.com/logo-scriptlyfy.png'
  }
];

export default function About() {
  return (
    <>
      <SEO
        title="About Scriptlyfy – Why We Are Building Unified Social Video Intelligence"
        description="Learn why Scriptlyfy exists: eliminating fragmented scraping workflows and turning multi-platform video libraries into actionable creative intelligence."
        canonical={CANONICAL}
        jsonLd={jsonLd}
        ogTitle="About Scriptlyfy"
        ogDescription="Unified multi-platform transcription & hook intelligence to compress weeks of research into minutes."
        twitterTitle="About Scriptlyfy"
        twitterDescription="Mission: compress weeks of social video research into minutes."
      />
      {/* Distinct ABOUT layout (no legal-style sidebar) */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_10%,rgba(99,102,241,0.2),transparent),radial-gradient(45%_55%_at_10%_85%,rgba(15,23,42,0.06),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-10 pt-20 pb-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Why Scriptlyfy Exists</h1>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed">We are building an operator‑grade layer for creative intelligence: unify ingestion, preserve structure, derive patterns, accelerate repurposing. Faster loops, higher confidence, less manual glue work.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-medium">
              {['Deterministic Enrichment','Multi‑Platform Normalization','Operator Velocity','Privacy‑Respectful'].map(tag => (
                <span key={tag} className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 backdrop-blur px-3 py-1 text-slate-700">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Pill navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
        <nav className="mx-auto max-w-6xl px-4 sm:px-10 overflow-x-auto">
          <ul className="flex gap-2 py-3 text-xs font-medium">
            {nav.map(i => (
              <li key={i.id}>
                <a href={`#${i.id}`} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50 transition text-slate-600 hover:text-slate-900 whitespace-nowrap">{i.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="mx-auto max-w-6xl px-6 sm:px-10 pb-32">
        {/* Mission + Problem Duo */}
        <section id="mission" className="scroll-mt-28 pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Mission</h2>
              <p className="text-slate-700 leading-relaxed">Compress weeks of fragmented social video research into minutes and turn unstructured multi‑platform media into reusable strategic building blocks. Equip lean teams with leverage previously locked inside large media orgs.</p>
            </div>
            <div id="approach">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Approach</h2>
              <ol className="list-decimal ml-5 space-y-2 text-slate-700 text-sm">
                <li>Deterministic ingestion & stable IDs.</li>
                <li>Layered enrichment (transcript → segments → hooks → embeddings).</li>
                <li>Composable derivative assets for repurposing.</li>
                <li>Human‑feedback loops to tune extraction precision.</li>
              </ol>
            </div>
          </div>
        </section>
        {/* Core Pillars */}
        <section id="pillars" className="scroll-mt-28 mt-28">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-8">Four Core Pillars</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t:'Normalization', d:'Consistent schema across platforms unlocks cross‑surface pattern comparison.' },
              { t:'Structure Preservation', d:'We retain timing, segmentation & contextual adjacency— not just text.' },
              { t:'Pattern Extraction', d:'Hook archetypes, pacing signals, narrative shape embeddings.' },
              { t:'Repurposing Bridge', d:'Immediate scaffolds for variant scripts & short‑form adaptation.' }
            ].map(c => (
              <div key={c.t} className="relative rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-5">
                <h3 className="font-semibold text-sm text-slate-900 mb-1">{c.t}</h3>
                <p className="text-[13px] leading-relaxed text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Operator Loop */}
        <section id="loop" className="scroll-mt-28 mt-28">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">Operator Feedback Loop</h2>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur p-6">
            <ol className="md:grid md:grid-cols-5 md:gap-4 space-y-4 md:space-y-0 text-[13px] text-slate-700 font-medium">
              {[
                'Bulk ingest & dedupe',
                'Semantic + structural enrichment',
                'Pattern surfacing & clustering',
                'Human validation / adjustment',
                'Repurpose & test hypotheses'
              ].map((step,i)=>(
                <li key={step} className="relative pl-5">
                  <span className="absolute left-0 top-0 w-4 h-4 rounded-full bg-indigo-600 text-[10px] flex items-center justify-center text-white font-semibold">{i+1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>
        {/* Architecture Diagram */}
        <section id="architecture" className="scroll-mt-28 mt-28">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Architecture (Simplified)</h2>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-[11px] font-mono leading-relaxed overflow-auto">
{`[Sources]
  → Fetch & Hash Layer (dedupe / idempotency)
    → Transcript Extraction
      → Structural Segmentation (beats / hooks / pacing)
        → Enrichment (hook candidates, embeddings, pattern scores)
          → Aggregates & Insight Surfaces
            → Repurposing Script Scaffolds / Export APIs`}
          </div>
          <p className="mt-3 text-slate-600 text-sm">Stages write immutable artifacts keyed by content hash + version enabling selective recompute.</p>
        </section>
        {/* Trust */}
        <section id="trust" className="scroll-mt-28 mt-28">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Trust & Data Stewardship</h2>
          <div className="grid md:grid-cols-3 gap-6 text-[13px]">
            {[
              { h:'Purpose Limited', b:'Research acceleration only—no resale of transcripts or behavioral exhaust.' },
              { h:'Access Minimized', b:'Role + time scoped access with audit logging at sensitive boundaries.' },
              { h:'User Control', b:'Export / delete pathways honored via verified email request.' }
            ].map(card => (
              <div key={card.h} className="rounded-lg border border-slate-200 bg-white/70 backdrop-blur p-4">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{card.h}</h3>
                <p className="text-slate-600 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Full detail: <a href="/privacy" className="underline">Privacy Policy</a>.</p>
        </section>
        {/* Roadmap */}
        <section id="roadmap" className="scroll-mt-28 mt-28">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Roadmap Themes</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-[13px]">
            {[
              { h:'Adaptive Hook Index', b:'Continuously refreshed archetype taxonomy with drift detection.' },
              { h:'Cross-Platform Diffs', b:'Compare structure vs. retention & engagement curves.' },
              { h:'Repurposing Automation', b:'AI assisted script variants aligned to pacing heuristics.' },
              { h:'Collaboration Layer', b:'Shared libraries, annotations, pattern watchlists.' }
            ].map(t => (
              <div key={t.h} className="rounded-lg border border-slate-200 bg-white/70 backdrop-blur p-4">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{t.h}</h3>
                <p className="text-slate-600 leading-relaxed">{t.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Live signal: <a href="/roadmap" className="underline">/roadmap</a></p>
        </section>
        {/* Early Access CTA */}
        <section id="access" className="scroll-mt-28 mt-32">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white/80 via-white to-indigo-50/70 backdrop-blur p-8">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">Help Shape the Enrichment Layer</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">Join early access to influence extraction depth, pattern surfacing UX, and repurposing scaffold formats. We prioritize feedback with clear operator outcomes.</p>
              <div className="max-w-md not-prose"><InlineHeroLeadCapture /></div>
            </div>
          </div>
        </section>
        {/* Footer Contact */}
        <section id="contact" className="scroll-mt-28 mt-32">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-3">Contact</h2>
            <p className="text-slate-700 text-sm">Partnerships, feedback, or a deep-dive: <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a></p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <a href="/roadmap" className="underline">Roadmap</a>
              <a href="/compare" className="underline">Compare</a>
              <a href="/bulk-social-video-transcription" className="underline">Bulk Hub</a>
              <a href="/privacy" className="underline">Privacy</a>
              <a href="/terms" className="underline">Terms</a>
            </div>
            <div className="mt-10 border-t pt-6 text-[11px] text-slate-500">© {new Date().getFullYear()} Scriptlyfy. All rights reserved.</div>
          </div>
        </section>
      </main>
    </>
  );
}
