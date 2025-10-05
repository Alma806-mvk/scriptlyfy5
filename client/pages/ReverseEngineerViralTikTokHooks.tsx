import React from 'react';
import SEO from '@/components/SEO';
import InlineHeroLeadCapture from '@/components/landing/InlineHeroLeadCapture';
import { LastUpdated } from '@/lib/contentMeta.tsx';

const canonical = 'https://scriptlyfy.com/reverse-engineer-viral-tiktok-hooks';

const faqs = [
  { q: 'Why analyze TikTok hooks systematically?', a: 'Hooks drive retention of first 1–3 seconds. Systematic extraction reveals repeatable framing instead of relying on intuition.' },
  { q: 'Isn\'t watching manually enough?', a: 'Manual viewing is slow and biased. Bulk transcripts + clustering expose hidden repetition across dozens or hundreds of posts.' },
  { q: 'What patterns should I look for?', a: 'Frame types like contradiction, open loops, direct outcomes, status reversal, data shock, and empathetic pain calls often recur.' },
  { q: 'How does Scriptlyfy help?', a: 'It ingests profile content, transcribes, isolates opening lines, and groups similar variants so you can model them quickly.' }
];

// Expanded pattern gallery for visual scanning
const patternGallery = [
  { label: 'Contradiction', example: 'Everyone says do X — here\'s why that silently kills growth.' },
  { label: 'Outcome Fast-Forward', example: 'Went from 0 → 18,400 views in 12 days doing this.' },
  { label: 'Status Reversal', example: 'Agencies ignored me — now they pitch retainers first call.' },
  { label: 'Open Loop', example: 'You\'re formatting this totally wrong & it\'s throttling reach…' },
  { label: 'Emotional Mirror', example: 'If you\'ve posted daily & still feel invisible — watch.' },
  { label: 'Numbered Curiosity', example: '3 hooks that doubled my watch‑through last week.' },
  { label: 'Data Shock', example: 'This 4 second tweak cut swipe‑aways by 37%.' },
  { label: 'Negative Space', example: 'Nobody is talking about this retention breaker.' }
];

const workflowSteps = [
  { step: 1, title: 'Ingest Profiles', desc: 'Pull recent videos + transcripts for target creators or competitors.' },
  { step: 2, title: 'Isolate Openers', desc: 'Extract just first sentence / 3s boundary; normalize casing & punctuation.' },
  { step: 3, title: 'Cluster Variants', desc: 'Group lexical / semantic siblings to expose repeated framing.' },
  { step: 4, title: 'Frequency + Novelty', desc: 'Rank by repetition & surface gaps for strategic differentiation.' },
  { step: 5, title: 'Generate Drafts', desc: 'Apply substitution matrix to spin 10–20 controlled pattern variants.' }
];

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scriptlyfy.com/' },
    { '@type': 'ListItem', position: 2, name: 'Bulk Social Video Transcription', item: 'https://scriptlyfy.com/bulk-social-video-transcription' },
    { '@type': 'ListItem', position: 3, name: 'Reverse Engineer Viral TikTok Hooks', item: canonical }
  ] },
  { '@context': 'https://schema.org', '@type': 'HowTo',
    name: 'Reverse Engineer Viral TikTok Hooks',
    description: 'Repeatable workflow to extract, cluster and adapt high-performing TikTok hook patterns.',
    step: workflowSteps.map(s => ({ '@type': 'HowToStep', position: s.step, name: s.title, text: s.desc }))
  },
  { '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Reverse Engineer Viral TikTok Hooks',
    description: 'Step-by-step guide to extracting and clustering viral TikTok hook lines using transcript intelligence.',
    url: canonical,
    mainEntityOfPage: canonical,
    articleSection: 'Growth',
    about: ['TikTok hooks','Content research','Short-form video'],
    author: { '@type': 'Organization', name: 'Scriptlyfy' },
    publisher: { '@type': 'Organization', name: 'Scriptlyfy', logo: { '@type': 'ImageObject', url: 'https://scriptlyfy.com/logo-scriptlyfy.png' } }
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
];

export default function ReverseEngineerViralTikTokHooksPage() {
  return (
    <>
      <SEO
        title="Reverse Engineer Viral TikTok Hooks | Scriptlyfy"
        description="Framework for extracting, clustering, and reusing high-performing TikTok hook structures using transcript intelligence."
        canonical={canonical}
        jsonLd={jsonLd}
        ogTitle="Reverse Engineer Viral TikTok Hooks"
        ogDescription="Data-backed workflow to mine, cluster & reuse viral TikTok opening lines."
        twitterTitle="TikTok Hook Pattern Analysis"
        twitterDescription="Systematically extract & repurpose viral TikTok hook structures."
      />
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_70%_5%,rgba(16,185,129,0.18),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-10 pt-20 pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Reverse Engineer Viral TikTok Hooks</h1>
            <div className="mt-3 text-sm text-slate-500"><LastUpdated slug="reverse-engineer-viral-tiktok-hooks" /></div>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">Extract, cluster and adapt proven opening line patterns so you stop guessing in the first 3 seconds and start shipping systematically testable hook variants.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-medium">
              {['Pattern Intelligence','Retention Optimization','Creative Research'].map(t => (
                <span key={t} className="inline-flex items-center rounded-full border border-emerald-200 bg-white/70 backdrop-blur px-3 py-1 text-emerald-700">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-5xl px-6 sm:px-10 pb-32">
        {/* WORKFLOW OVERVIEW */}
        <section className="pt-10">
          <h2 className="text-sm font-semibold tracking-wide text-emerald-600 mb-3">Structured Workflow</h2>
          <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6 md:p-8">
            <ol className="space-y-5">
              {workflowSteps.map(s => (
                <li key={s.step} className="flex gap-4">
                  <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center shadow">{s.step}</span>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{s.title}</div>
                    <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        {/* PATTERN GALLERY */}
        <section className="mt-20">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Hook Pattern Gallery</h2>
          <p className="text-slate-600 text-sm max-w-2xl mb-6">A living catalog of opening line archetypes you can adapt. Start by mapping which your niche overuses, then lean into underrepresented angles for novelty without randomness.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {patternGallery.map(p => (
              <div key={p.label} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-4 hover:shadow-sm transition">
                <div className="text-[11px] uppercase tracking-wide font-semibold text-emerald-600 mb-1">{p.label}</div>
                <p className="text-slate-700 text-sm leading-relaxed">{p.example}</p>
              </div>
            ))}
          </div>
        </section>
        {/* MANUAL VS ACCELERATED */}
        <section className="mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Manual vs Automated</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white/60 backdrop-blur p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">Manual Baseline</div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                <li>Collect opener lines into a sheet</li>
                <li>Hand label pattern categories</li>
                <li>Count repetition manually</li>
                <li>Risk of bias & small sample size</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">~2–3 hours for 5 creators / 120 clips.</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 backdrop-blur p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 mb-2">Accelerated (Scriptlyfy)</div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Automated ingestion & transcription</li>
                <li>Opener isolation & duplicate grouping</li>
                <li>Semantic + lexical clustering</li>
                <li>Frequency + gap surfacing</li>
                <li>Export & adaptation workspace</li>
              </ul>
              <p className="mt-3 text-xs text-emerald-700">Minutes instead of hours. Larger unbiased sample.</p>
            </div>
          </div>
        </section>
        {/* PATTERN SUBSTITUTION MATRIX */}
        <section className="mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Turning Patterns Into Testable Hooks</h2>
          <p className="text-slate-600 text-sm max-w-2xl">Use a substitution matrix to multiply structured variation without diluting clarity. Combine: <code className="px-1.5 py-0.5 rounded bg-slate-100 text-[11px]">{`{pattern}`}</code> + <code className="px-1.5 py-0.5 rounded bg-slate-100 text-[11px]">{`{topic}`}</code> + <code className="px-1.5 py-0.5 rounded bg-slate-100 text-[11px]">{`{proof}`}</code>. Draft 10–20 then shortlist 3 for live testing.</p>
        </section>
        {/* CROSS PLATFORM */}
        <section className="mt-20">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Cross-Platform Leverage</h2>
          <p className="text-slate-600 text-sm max-w-2xl">Most TikTok hook archetypes port to <a href="/bulk-transcribe-instagram-reels" className="underline">Reels</a> & <a href="/bulk-transcribe-youtube-shorts" className="underline">Shorts</a>. Run the same clustering across surfaces to confirm if a framing is universal or platform‑skewed—then prioritize universal first for compounding effect.</p>
        </section>
        {/* FAQ */}
        <section className="mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">FAQ</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map(f => (
              <div key={f.q} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-5">
                <h3 className="font-semibold text-slate-800 text-sm mb-2">{f.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
        {/* CTA */}
        <section className="mt-28">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white/80 via-white to-emerald-50/60 backdrop-blur p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1 max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">Automate Hook Mining</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Join early access and get first access to automated TikTok hook intelligence, clustering & pattern export.</p>
              <InlineHeroLeadCapture />
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] w-full lg:w-auto lg:max-w-xs">
              {[['Speed','Minutes not hours'],['Depth','Larger unbiased set'],['Clarity','Quantified repetition'],['Leverage','Cross-platform reuse']].map(([k,v]) => (
                <div key={k} className="rounded-lg border border-slate-200 bg-white/70 backdrop-blur p-3">
                  <div className="font-semibold text-slate-900 text-xs">{k}</div>
                  <div className="text-slate-600">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-xs text-slate-500">Also explore: <a href="/bulk-social-video-transcription" className="underline">Multi-platform hub</a> · <a href="/bulk-transcribe-tiktok-videos" className="underline">TikTok transcription</a></p>
        </section>
      </main>
    </>
  );
}
