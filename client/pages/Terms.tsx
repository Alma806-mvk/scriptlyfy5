import SEO from "@/components/SEO";
import React from "react";

// Support email constant for easy future updates
const SUPPORT_EMAIL = "emma@scriptlyfy.com";
const CANONICAL = "https://scriptlyfy.com/terms";
const UPDATED = new Date().toISOString().slice(0, 10);

// Structured data (LegalService / WebPage with breadcrumb)
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://scriptlyfy.com/" },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: CANONICAL }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service | Scriptlyfy",
    url: CANONICAL,
    dateModified: UPDATED,
    description: "Scriptlyfy Terms of Service – usage guidelines, acceptable use, rights and limitations.",
    inLanguage: "en"
  }
];

interface SectionDef { id: string; title: string; }
const sections: SectionDef[] = [
  { id: "agreement", title: "Agreement" },
  { id: "definitions", title: "Definitions" },
  { id: "eligibility", title: "Eligibility" },
  { id: "accounts", title: "Access & Accounts" },
  { id: "service", title: "Service Availability" },
  { id: "beta", title: "Beta & Experimental Features" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "prohibited", title: "Prohibited Activities" },
  { id: "subscriptions", title: "Plans & Subscriptions" },
  { id: "ip", title: "Intellectual Property" },
  { id: "confidentiality", title: "Confidentiality" },
  { id: "feedback", title: "Feedback" },
  { id: "privacy", title: "Privacy" },
  { id: "compliance", title: "Export & Compliance" },
  { id: "indemnification", title: "Indemnification" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "termination", title: "Termination" },
  { id: "law", title: "Governing Law" },
  { id: "severability", title: "Severability" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" }
];

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service | Scriptlyfy"
        description="Scriptlyfy Terms of Service – usage guidelines, acceptable use, rights and limitations."
        canonical={CANONICAL}
        noIndex
        jsonLd={jsonLd}
        ogTitle="Scriptlyfy Terms of Service"
        ogDescription="Read the full Scriptlyfy Terms: acceptable use, account expectations, liability limits."
        twitterTitle="Scriptlyfy Terms of Service"
        twitterDescription="Usage terms, acceptable use and policies governing Scriptlyfy."
      />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_65%_at_70%_5%,rgba(59,130,246,0.18),transparent),radial-gradient(45%_55%_at_10%_85%,rgba(15,23,42,0.08),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pt-14 pb-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Terms of Service</h1>
            <p className="mt-4 text-slate-600 max-w-2xl text-base leading-relaxed">These Terms govern your access to and use of Scriptlyfy. Please read them carefully. By accessing the platform you agree to be bound by them.</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-3 py-1 border border-slate-200">Last updated: {UPDATED}</span>
              <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-3 py-1 border border-slate-200">Jurisdiction: Pending Disclosure</span>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* TOC */}
            <aside className="lg:col-span-3 order-last lg:order-first lg:sticky lg:top-28 h-max">
              <nav aria-label="Sections" className="rounded-xl border border-slate-200 bg-white/60 backdrop-blur p-4 shadow-sm">
                <div className="text-xs font-semibold tracking-wide text-slate-500 mb-3">ON THIS PAGE</div>
                <ol className="space-y-1 text-sm">
                  {sections.map(s => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="block rounded-md px-2 py-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-[13px] transition">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] leading-relaxed text-slate-500">
                  Need help? <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a>
                </div>
              </nav>
            </aside>
          {/* CONTENT */}
          <article className="lg:col-span-9 prose prose-slate max-w-none">
            <section id="agreement" className="scroll-mt-28">
              <h2>Agreement</h2>
              <p>By accessing or using Scriptlyfy you agree to these Terms. If you are using the service on behalf of an organization, you represent you have authority to bind that organization.</p>
            </section>
              <section id="definitions" className="scroll-mt-28">
                <h2>Definitions</h2>
                <ul>
                  <li><strong>"Platform" / "Service"</strong> refers to Scriptlyfy's software, API endpoints, interfaces, documentation, enrichment logic, and related infrastructure.</li>
                  <li><strong>"You" / "Customer"</strong> means the individual or entity accessing the Service.</li>
                  <li><strong>"Content"</strong> means any data, profile references, transcripts, hooks, structural metadata, or derivative intelligence processed or produced by the platform.</li>
                  <li><strong>"Beta Feature"</strong> means a feature marked alpha, beta, preview, experimental, or similar.</li>
                </ul>
              </section>
              <section id="eligibility" className="scroll-mt-28">
                <h2>Eligibility</h2>
                <p>You must be at least 18 years old or the age of majority in your jurisdiction. If you access on behalf of an entity, you represent you have full authority to bind it to these Terms.</p>
              </section>
            <section id="accounts" className="scroll-mt-28">
              <h2>Access & Accounts</h2>
              <p>You must provide accurate information and keep your account secure. You are responsible for activity under your account. We may suspend or terminate accounts that violate these Terms or pose risk to the service.</p>
            </section>
              <section id="service" className="scroll-mt-28">
                <h2>Service Availability</h2>
                <p>We aim for high availability but do not guarantee uninterrupted operation. Planned maintenance or emergency interventions may limit access. Certain regions or network environments may be restricted to preserve platform integrity.</p>
              </section>
              <section id="beta" className="scroll-mt-28">
                <h2>Beta & Experimental Features</h2>
                <p>Beta Features are provided for evaluation and may change, degrade, or be removed without notice. They may not receive the same support, security hardening, or data durability guarantees as generally available functionality.</p>
              </section>
            <section id="acceptable-use" className="scroll-mt-28">
              <h2>Acceptable Use</h2>
              <ul>
                <li>Do not misuse the service or interfere with operation or security.</li>
                <li>Only analyze content you have a right to access (e.g. public profiles).</li>
                <li>Do not attempt to reverse engineer or circumvent safeguards.</li>
                <li>No automated scraping beyond provided platform workflows.</li>
              </ul>
            </section>
              <section id="prohibited" className="scroll-mt-28">
                <h2>Prohibited Activities</h2>
                <ul>
                  <li>Mass parallelization to evade rate shaping.</li>
                  <li>Uploading or attempting to process unlawful, defamatory, or unauthorized copyrighted material.</li>
                  <li>Generating derivative datasets for competing ingestion platforms.</li>
                  <li>Reselling raw transcript output without added value or rights.</li>
                  <li>Security probing, injection, or traffic replay outside sanctioned testing.</li>
                </ul>
              </section>
              <section id="subscriptions" className="scroll-mt-28">
                <h2>Plans & Subscriptions</h2>
                <p>Pricing, usage caps, and credit consumption models will be published at public launch. Early access participants may receive provisional limits subject to adjustment. Failure to remit payment for paid tiers may result in suspension.</p>
              </section>
            <section id="ip" className="scroll-mt-28">
              <h2>Intellectual Property</h2>
              <p>We own all rights to the platform and its proprietary enrichment logic. You retain ownership of your inputs and permissible outputs. Feedback may be used to improve the service without obligation.</p>
            </section>
              <section id="confidentiality" className="scroll-mt-28">
                <h2>Confidentiality</h2>
                <p>Non-public feature concepts, performance metrics, and internal tooling surfaced during early access are considered confidential. You agree to use reasonable care to prevent unauthorized disclosure.</p>
              </section>
              <section id="feedback" className="scroll-mt-28">
                <h2>Feedback</h2>
                <p>Suggestions, enhancement requests, or error reports ("Feedback") may be implemented without attribution or compensation. You grant a perpetual, irrevocable, royalty-free license to use Feedback for improvement.</p>
              </section>
            <section id="privacy" className="scroll-mt-28">
              <h2>Privacy</h2>
              <p>See our <a href="/privacy">Privacy Policy</a> for how we collect, use, and safeguard data including transcripts, derived hooks, and structural metadata.</p>
            </section>
              <section id="compliance" className="scroll-mt-28">
                <h2>Export & Compliance</h2>
                <p>You represent you are not on any restricted party list and will not use the Service in embargoed jurisdictions or for prohibited end uses (e.g., unlawful surveillance). You are responsible for compliance with local regulations regarding data ingestion and analysis.</p>
              </section>
              <section id="indemnification" className="scroll-mt-28">
                <h2>Indemnification</h2>
                <p>You agree to indemnify and hold harmless Scriptlyfy and its affiliates from claims, losses, liabilities, damages, costs, and expenses (including reasonable legal fees) arising from: (a) misuse of the Service; (b) violation of these Terms; (c) infringement or violation of third‑party rights; or (d) content you submit or process.</p>
              </section>
            <section id="disclaimers" className="scroll-mt-28">
              <h2>Disclaimers</h2>
              <p>The service is provided "as is" without warranties. We disclaim all implied warranties including merchantability, fitness for a particular purpose, accuracy, and non-infringement.</p>
            </section>
            <section id="liability" className="scroll-mt-28">
              <h2>Limitation of Liability</h2>
              <p>To the maximum extent permitted by law we are not liable for indirect, incidental, consequential, special, exemplary or punitive damages; lost profits, revenues, goodwill, or data; or business interruption—even if advised of the possibility.</p>
            </section>
            <section id="termination" className="scroll-mt-28">
              <h2>Termination</h2>
              <p>You may stop using the service anytime. We may suspend or terminate access for violation of these Terms, legal compliance, abuse prevention, or to protect platform integrity.</p>
            </section>
            <section id="law" className="scroll-mt-28">
              <h2>Governing Law</h2>
              <p>Governing jurisdiction will be disclosed at public launch. Pending that, disputes will be handled in good faith negotiations first.</p>
            </section>
              <section id="severability" className="scroll-mt-28">
                <h2>Severability</h2>
                <p>If any provision is held unenforceable, the remaining provisions remain in effect and the unenforceable portion will be modified to the minimum extent necessary to be enforceable.</p>
              </section>
            <section id="changes" className="scroll-mt-28">
              <h2>Changes</h2>
              <p>We may update these Terms. Material changes will be communicated via the site or email with effective date indicated above.</p>
            </section>
            <section id="contact" className="scroll-mt-28">
              <h2>Contact</h2>
              <p>Questions, legal notices, or data requests: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
            </section>
            <div className="mt-12 border-t pt-6 text-xs text-slate-500">© {new Date().getFullYear()} Scriptlyfy. All rights reserved.</div>
          </article>
        </div>
      </main>
    </>
  );
}
