import { Helmet } from 'react-helmet-async';
import InlineHeroLeadCapture from '@/components/landing/InlineHeroLeadCapture';

const canonical = 'https://scriptlyfy.com/about';

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Scriptlyfy',
  url: 'https://scriptlyfy.com/',
  logo: 'https://scriptlyfy.com/logo-scriptlyfy.png',
  sameAs: [
    'https://www.linkedin.com/', // placeholder
  ]
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'About' }
  ]
};

export default function About() {
  const title = 'About Scriptlyfy – Why We Are Building Unified Social Video Intelligence';
  const description = 'Learn why Scriptlyfy exists: eliminating fragmented scraping workflows and turning multi-platform video libraries into actionable creative intelligence.';

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="About Scriptlyfy" />
        <meta property="og:description" content="Why we are building unified multi-platform transcription & hook intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="/logo-scriptlyfy.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Scriptlyfy" />
        <meta name="twitter:description" content="Mission: compress weeks of social video research into minutes." />
        <meta name="twitter:image" content="/logo-scriptlyfy.png" />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">About Scriptlyfy</h1>
        <p className="text-lg text-slate-600 max-w-2xl">We are building a unified layer for bulk ingest, transcription, and strategic transformation of short & long-form social video so teams can iterate content systems faster.</p>
      </header>

      <section className="space-y-8 mb-16">
        <div>
          <h2 className="text-xl font-semibold mb-2">Why this matters now</h2>
          <p className="text-slate-700 leading-relaxed">Creative research has fractured across platforms—TikTok hook archetypes, Reels pacing, Shorts retention curves, YouTube narrative segmentation. Teams copy/paste into spreadsheets, lose structural context, and repeat manual parsing. Scriptlyfy compresses that into minutes: ingest → normalize → enrich → repurpose.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">What we believe</h2>
          <ul className="list-disc ml-5 space-y-2 text-slate-700">
            <li>Speed to structured insight beats raw model power for operators.</li>
            <li>Multi-platform context produces stronger creative hypotheses than silo views.</li>
            <li>Small strategy teams should wield bulk intelligence previously gated to large media orgs.</li>
            <li>Tooling should amplify human editorial judgment—not replace it.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Principles</h2>
          <ul className="list-disc ml-5 space-y-2 text-slate-700">
            <li><span className="font-medium">Clarity over flash:</span> output must be directly actionable.</li>
            <li><span className="font-medium">Determinism first:</span> stable IDs & deduplication avoid reprocessing cost.</li>
            <li><span className="font-medium">Layered enrichment:</span> start with transcripts → add hooks → structure patterns → strategic diffs.</li>
            <li><span className="font-medium">Respect creator ecosystems:</span> enable research, not gray-area redistribution.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Current focus</h2>
          <p className="text-slate-700 leading-relaxed">We are iterating on scalable ingestion reliability, enrichment quality (hook extraction + repurposing script scaffolds), and transparent roadmap signaling. Early adopters help shape feature depth and prioritization.</p>
        </div>
      </section>

      <section className="mb-16">
        <div className="rounded-lg border p-6 bg-slate-50">
          <h2 className="text-lg font-semibold mb-2">Early Access</h2>
          <p className="text-slate-600 mb-4">Join the early access list to influence direction and get faster research cycles ahead of competitors.</p>
          <div className="max-w-md"><InlineHeroLeadCapture /></div>
        </div>
      </section>

      <section className="mb-20 space-y-6">
        <h2 className="text-xl font-semibold">Contact & Transparency</h2>
        <p className="text-slate-700">Have a question or want to collaborate on a data deep-dive? Reach out at <a href="mailto:creategenstudio@gmail.com" className="underline">creategenstudio@gmail.com</a>.</p>
        <p className="text-slate-600 text-sm">Social + founder identity disclosures will be added as public launch approaches.</p>
      </section>

      <nav className="text-sm flex flex-wrap gap-4">
        <a href="/roadmap" className="underline">Roadmap</a>
        <a href="/compare" className="underline">Compare</a>
        <a href="/bulk-social-video-transcription" className="underline">Bulk Hub</a>
      </nav>
    </div>
  );
}
