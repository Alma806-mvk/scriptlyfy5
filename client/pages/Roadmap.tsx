import { Helmet } from 'react-helmet-async';

const canonical = 'https://scriptlyfy.com/roadmap';

// Roadmap data structure
const ROADMAP = {
  inProgress: [
    { title: 'Viral Hook Pattern Library', desc: 'Clustering + frequency surfacing of opening line archetypes across short-form sources.' },
    { title: 'Repurposing Script Generator Enhancements', desc: 'Refining long-form → short-form segmentation & pacing scaffolds.' }
  ],
  beta: [
    { title: 'Hook Extraction (TikTok / Shorts)', desc: 'Early heuristics + ML assisted parsing producing candidate hook lines.' },
    { title: 'Repurposing Script Generator', desc: 'Draft structure generation for vertical video scripts from bulk source sets.' }
  ],
  planned: [
    { title: 'Timestamped Lines', desc: 'Enhanced granularity for deeper retention/pacing analysis.' },
    { title: 'Speaker / Segment Structure', desc: 'Segment boundaries + role labeling for long-form narrative modeling.' },
    { title: 'Cross-Platform Content Diff', desc: 'Surface overlapping vs unique thematic angles across creators or channels.' },
    { title: 'Transparent Changelog UI', desc: 'Inline surfaced recent improvements & releases site-wide.' }
  ],
  research: [
    { title: 'Competitor Content Gap Signals', desc: 'Directional indicators of underused hooks/topics relative to peers.' },
    { title: 'Automated Topic Evolution Mapping', desc: 'Temporal shifts in topic frequency & hook style adoption.' },
    { title: 'Quality Scoring Models', desc: 'Predictive heuristic layering for potential retention / reshare probability.' }
  ]
};

// Build ItemList structured data referencing all roadmap items for semantic hints
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: Object.entries(ROADMAP).flatMap(([phase, items], idxPhase) =>
    items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idxPhase * 20 + idx + 1,
      name: it.title,
      description: it.desc
    }))
  )
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Roadmap' }
  ]
};

export default function Roadmap() {
  const title = 'Scriptlyfy Roadmap – Current, Beta, Planned & Research Initiatives';
  const description = 'Explore Scriptlyfy\'s roadmap: in-progress features, active betas, planned improvements and research explorations shaping bulk social video intelligence.';

  const Section = ({ id, label, items }: { id: string; label: string; items: { title: string; desc: string }[] }) => (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-4">{label}</h2>
      <div className="space-y-4">
        {items.map(it => (
          <div key={it.title} className="rounded-md border p-4 bg-white/60">
            <h3 className="font-medium text-slate-900 mb-1">{it.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Scriptlyfy Roadmap" />
        <meta property="og:description" content="In-progress, beta, planned & research features for multi-platform content intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="/logo-scriptlyfy.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scriptlyfy Roadmap" />
        <meta name="twitter:description" content="See what we're building across ingestion, enrichment & strategy layers." />
        <meta name="twitter:image" content="/logo-scriptlyfy.png" />
        <script type="application/ld+json">{JSON.stringify(itemList)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Product Roadmap</h1>
        <p className="text-lg text-slate-600 max-w-3xl">Transparent view of what is live, what we are actively building, near-term commitments, and exploratory research areas guiding future capabilities.</p>
      </header>

      <nav className="mb-12 text-sm flex flex-wrap gap-3">
        <a href="#in-progress" className="underline">In Progress</a>
        <a href="#beta" className="underline">Beta</a>
        <a href="#planned" className="underline">Planned</a>
        <a href="#research" className="underline">Research</a>
      </nav>

      <div className="space-y-20">
        <Section id="in-progress" label="In Progress" items={ROADMAP.inProgress} />
        <Section id="beta" label="Beta" items={ROADMAP.beta} />
        <Section id="planned" label="Planned" items={ROADMAP.planned} />
        <Section id="research" label="Research" items={ROADMAP.research} />
      </div>

      <section className="mt-20">
        <div className="rounded-lg border p-6 text-center bg-slate-50">
          <h2 className="text-xl font-semibold mb-2">Want to influence prioritization?</h2>
          <p className="text-slate-600 mb-4">Join early access and tell us which intelligence layer you need most.</p>
          <a href="/" className="text-sm underline">Return home</a>
        </div>
      </section>

      <nav className="mt-16 text-sm flex flex-wrap gap-4">
        <a href="/about" className="underline">About</a>
        <a href="/compare" className="underline">Compare</a>
        <a href="/bulk-social-video-transcription" className="underline">Bulk Hub</a>
      </nav>
    </div>
  );
}
