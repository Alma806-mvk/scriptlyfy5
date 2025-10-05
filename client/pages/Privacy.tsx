import SEO from "@/components/SEO";
import React from "react";

const SUPPORT_EMAIL = "creategenstudio@gmail.com";
const CANONICAL = "https://scriptlyfy.com/privacy";
const UPDATED = new Date().toISOString().slice(0, 10);

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://scriptlyfy.com/" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: CANONICAL }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | Scriptlyfy",
    url: CANONICAL,
    dateModified: UPDATED,
    description: "Scriptlyfy Privacy Policy – how we collect, use, store and protect your data.",
    inLanguage: "en"
  }
];

interface SectionDef { id: string; title: string; }
const sections: SectionDef[] = [
  { id: "overview", title: "Overview" },
  { id: "collection", title: "Information We Collect" },
  { id: "legal-bases", title: "Legal Bases" },
  { id: "use", title: "How We Use Data" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "minimization", title: "Data Minimization" },
  { id: "retention", title: "Data Retention" },
  { id: "security", title: "Security" },
  { id: "incident-response", title: "Incident Response" },
  { id: "international", title: "International Transfers" },
  { id: "automated", title: "Automated Decisions" },
  { id: "rights", title: "Your Rights" },
  { id: "dsar-workflow", title: "DSAR Workflow" },
  { id: "processors", title: "Processors Overview" },
  { id: "subprocessors", title: "Subprocessor Categories" },
  { id: "children", title: "Children's Data" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" },
  { id: "contact", title: "Contact" }
];

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Scriptlyfy"
        description="Scriptlyfy Privacy Policy – how we collect, use, store and protect your data."
        canonical={CANONICAL}
        noIndex
        jsonLd={jsonLd}
        ogTitle="Privacy Policy – Scriptlyfy"
        ogDescription="Understand how Scriptlyfy handles data: collection, usage, retention and your rights."
        twitterTitle="Scriptlyfy Privacy Policy"
        twitterDescription="How Scriptlyfy collects, uses and protects user data. Read the full policy."
      />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_65%_at_70%_5%,rgba(99,102,241,0.18),transparent),radial-gradient(45%_55%_at_10%_85%,rgba(15,23,42,0.08),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pt-14 pb-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Privacy Policy</h1>
            <p className="mt-4 text-slate-600 max-w-2xl text-base leading-relaxed">We are committed to protecting user data, derived intelligence, and platform integrity. This policy explains what we collect, how it is used, retention logic, and your control options.</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-3 py-1 border border-slate-200">Last updated: {UPDATED}</span>
              <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-3 py-1 border border-slate-200">Encryption: TLS + at rest</span>
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
                Data requests: <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a>
              </div>
            </nav>
          </aside>
          {/* CONTENT */}
          <article className="lg:col-span-9 prose prose-slate max-w-none">
            <section id="overview" className="scroll-mt-28">
              <h2>Overview</h2>
              <p>This Privacy Policy explains how Scriptlyfy ("we", "our", "us") collects, uses, discloses, safeguards, and enables control over information relating to an identified or identifiable person ("Personal Data"). By accessing or using the platform you acknowledge this Policy. If you do not agree, discontinue use.</p>
              <p><strong>Design Principles:</strong> (i) Purpose limitation, (ii) Data minimization, (iii) Layered access controls, (iv) Transparency & user choice, (v) Security by configuration not secrecy.</p>
              <p>This Policy is written for global relevance. Specific rights may vary depending on your jurisdiction (e.g., EEA / UK / certain U.S. states). We implement a "highest common denominator" operational baseline rather than maintaining fragmented rule sets.</p>
            </section>
            <section id="collection" className="scroll-mt-28">
              <h2>Information We Collect</h2>
              <p>We differentiate between raw ingestion materials, transformed/derived intelligence, operational telemetry, and voluntary user-supplied inputs.</p>
              <ul>
                <li><strong>Account & Contact:</strong> Email, display name (optional), organization / role labels, authentication identifiers.</li>
                <li><strong>Usage & Diagnostics:</strong> Feature invocation events, request timing, coarse region (for latency routing + abuse mitigation), error fingerprints.</li>
                <li><strong>Research Inputs:</strong> Public profile identifiers, media references, extracted transcripts, structural segmentation metadata, candidate hook snippets.</li>
                <li><strong>Derived Intelligence:</strong> Pattern embeddings, statistical frequency surfaces, anonymized topic clusters, scoring heuristics.</li>
                <li><strong>Support Communications:</strong> Messages sent to our support email; meta (timestamps, resolution state).</li>
                <li><strong>Consent & Preference Signals:</strong> Email opt-in, analytics opt-out flags, cookie preferences (where applicable).</li>
              </ul>
              <p><strong>We do not intentionally collect:</strong> government ID numbers, precise geolocation, biometric templates, or payment card PAN directly (payment processors handle sensitive financial instruments).</p>
            </section>
            <section id="legal-bases" className="scroll-mt-28">
              <h2>Legal Bases</h2>
              <p>Where data protection law (e.g. GDPR / UK GDPR) applies, our processing relies on one or more of:</p>
              <ul>
                <li><strong>Contract Necessity:</strong> To deliver core platform functionality you request.</li>
                <li><strong>Legitimate Interests:</strong> Product security, fraud detection, service improvement, aggregated analytics (balanced against user rights).</li>
                <li><strong>Consent:</strong> Optional communications (e.g., product updates) and any non-essential cookies or tracking (if/when implemented).</li>
                <li><strong>Legal Obligations:</strong> Responding to valid law enforcement or regulatory requests; maintaining audit or tax records.</li>
                <li><strong>Protection of Vital / Public Interest:</strong> Rare; only if required to prevent serious harm or comply with public interest mandates.</li>
              </ul>
            </section>
            <section id="use" className="scroll-mt-28">
              <h2>How We Use Data</h2>
              <ul>
                <li><strong>Provision of Service:</strong> Authenticate sessions, process ingestion jobs, generate enriched outputs.</li>
                <li><strong>Quality & Relevance:</strong> Tune extraction heuristics, reduce error rates, improve ranking / classification strategies.</li>
                <li><strong>Security & Abuse Mitigation:</strong> Detect anomalous request patterns, throttle abusive automations, preserve platform integrity.</li>
                <li><strong>Analytics (Aggregated):</strong> Non-identifying usage metrics to guide roadmap prioritization.</li>
                <li><strong>Communication:</strong> Transactional notices (material changes, security advisories), optional product updates (with opt-out/opt-in controls).</li>
                <li><strong>Research & Development:</strong> Evaluate anonymized pattern performance to refine models.</li>
              </ul>
              <p>We do <strong>not</strong> sell Personal Data. We do not permit third parties to use platform-level behavioral data for their independent advertising networks.</p>
            </section>
            <section id="cookies" className="scroll-mt-28">
              <h2>Cookies & Tracking Technologies</h2>
              <p>As of the latest update we operate with a minimal tracking posture. Any cookies or local storage values are restricted to strictly necessary functions (session continuity, fraud prevention, preference persistence) unless a future optional analytics module is explicitly consented to.</p>
              <ul>
                <li><strong>Essential:</strong> Maintain authenticated state, implement rate shaping, record consent preferences.</li>
                <li><strong>Performance / Diagnostics (Optional):</strong> May be introduced to understand feature latency & error ratios—disabled by default where consent is required.</li>
              </ul>
              <p>If expanded categories are added we will surface a granular consent interface prior to activation (regionally adaptive for applicable jurisdictions).</p>
            </section>
            <section id="minimization" className="scroll-mt-28">
              <h2>Data Minimization</h2>
              <p>Collection pipelines are engineered to strip non-essential tokens early, discard transient intermediary buffers after transformation, and store only artifacts required for reproducibility or iterative improvement. Internal access to raw ingestion assets is time-bound & audit logged.</p>
            </section>
            <section id="retention" className="scroll-mt-28">
              <h2>Data Retention</h2>
              <p>Retention aligns with functional necessity, user expectations, and defensible legal bases. When a retention horizon expires we either delete, aggregate, or irreversibly de-identify data.</p>
              <ul>
                <li><strong>Account Credentials / Core Profile:</strong> Stored until account deletion request or 24 months of inactivity.</li>
                <li><strong>Transcripts & Enrichment Outputs:</strong> Active while associated project remains active; purgeable upon verified request. Aggregated statistics may persist.</li>
                <li><strong>Operational Logs:</strong> 30–180 days (rotating window) except security anomaly excerpts retained longer for forensics.</li>
                <li><strong>Support Tickets:</strong> Up to 24 months for continuity & dispute mediation.</li>
                <li><strong>Backups:</strong> Encrypted backups roll on a fixed rotation; deletion requests propagate on next cycle.</li>
              </ul>
            </section>
            <section id="security" className="scroll-mt-28">
              <h2>Security</h2>
              <p>Security controls emphasize layered isolation, least privilege, and rapid patch cadence:</p>
              <ul>
                <li>Encryption in transit (TLS) & encryption at rest for primary data stores.</li>
                <li>Principle of least privilege role segmentation across service components.</li>
                <li>Access logging & anomaly detection around administrative and data export operations.</li>
                <li>Dependency surface review & automated vulnerability advisories.</li>
                <li>Segregated environments for test vs. production pipelines.</li>
              </ul>
              <p>No system can guarantee absolute security; we commit to continuous improvement and transparent notification of material incidents.</p>
            </section>
            <section id="incident-response" className="scroll-mt-28">
              <h2>Incident Response</h2>
              <p>We maintain an internal lightweight incident playbook:</p>
              <ol>
                <li><strong>Detection:</strong> Alert triggers (anomaly metrics, integrity checks, external reports).</li>
                <li><strong>Containment:</strong> Isolate affected components, revoke compromised credentials, apply compensating controls.</li>
                <li><strong>Assessment:</strong> Classify impact scope (confidentiality / integrity / availability) & affected data categories.</li>
                <li><strong>Notification:</strong> If legally required or materially impactful, we will notify affected users without undue delay while preserving investigative efficacy.</li>
                <li><strong>Remediation & Postmortem:</strong> Root cause analysis, corrective actions, control hardening, documentation.</li>
              </ol>
            </section>
            <section id="international" className="scroll-mt-28">
              <h2>International Transfers</h2>
              <p>Infrastructure may process data in jurisdictions different from the user’s location. Where transfers from the EEA / UK / Switzerland occur we rely on: (i) adequacy determinations where available, and/or (ii) Standard Contractual Clauses (SCCs) with supplemental technical & organizational safeguards (encryption, access minimization, logging). We periodically reassess risk factors (government access, legal landscape changes).</p>
            </section>
            <section id="automated" className="scroll-mt-28">
              <h2>Automated Decisions</h2>
              <p>We employ algorithmic scoring to rank pattern relevance and generate hook candidates. These processes do not produce legal or similarly significant effects on individuals. No fully automated adverse eligibility determinations are performed. Human oversight governs material platform enforcement actions.</p>
            </section>
            <section id="rights" className="scroll-mt-28">
              <h2>Your Rights</h2>
              <p>Depending on jurisdiction you may have rights to: (i) access, (ii) rectification, (iii) erasure, (iv) restriction, (v) objection to certain processing, (vi) portability, (vii) withdraw consent, (viii) lodge a complaint with a supervisory authority. We extend a baseline set of these capabilities globally where technically feasible.</p>
              <p>Submit requests via <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We will verify identity proportional to request sensitivity before fulfilling.</p>
            </section>
            <section id="dsar-workflow" className="scroll-mt-28">
              <h2>DSAR Workflow (Access / Deletion Requests)</h2>
              <ol>
                <li><strong>Initiation:</strong> User emails request specifying scope (e.g., export vs. deletion).</li>
                <li><strong>Verification:</strong> We confirm control of the account email or request additional non-sensitive correlating metadata.</li>
                <li><strong>Scoping:</strong> Identify datasets & derived artifacts; separate anonymized aggregates.</li>
                <li><strong>Fulfillment:</strong> Export provided in a machine-readable format (JSON/CSV). Deletions cascade to active stores & will roll off backups on next scheduled rotation.</li>
                <li><strong>Confirmation:</strong> User receives completion notice or explanation if an exemption applies.</li>
              </ol>
            </section>
            <section id="processors" className="scroll-mt-28">
              <h2>Processors Overview</h2>
              <p>We engage service providers ("Processors") to perform limited tasks on our behalf: infrastructure, email delivery, analytics (if enabled), error & performance monitoring. Each Processor is bound by contractual terms restricting use of Personal Data to our documented instructions.</p>
            </section>
            <section id="subprocessors" className="scroll-mt-28">
              <h2>Subprocessor Categories</h2>
              <ul>
                <li><strong>Hosting & Compute:</strong> Cloud infrastructure for storage & execution of workloads.</li>
                <li><strong>Authentication / Identity (if applicable):</strong> Managed auth or email link providers.</li>
                <li><strong>Email & Communication:</strong> Transactional email dispatch + inbound support triage.</li>
                <li><strong>Error & Performance Monitoring:</strong> Event aggregation & alerting.</li>
                <li><strong>Analytics (Optional):</strong> High-level usage metrics; excludes raw personal content.</li>
              </ul>
              <p>We will update this section upon material changes and (where required) provide advance notice for opportunity to object when mandated by regulation or contract.</p>
            </section>
            <section id="children" className="scroll-mt-28">
              <h2>Children's Data</h2>
              <p>The service is not directed to individuals under the age of 16 (or equivalent minimum age in relevant jurisdiction). We do not knowingly collect Personal Data from children. If you believe a child provided data, contact us for prompt removal.</p>
            </section>
            <section id="changes" className="scroll-mt-28">
              <h2>Changes</h2>
              <p>We may revise this Policy to reflect platform evolution, regulatory updates, or security hardening measures. Material changes will be announced via in-app banner or email (where contact permissions exist) with updated effective date posted at the top. Continued use after effective date constitutes acceptance.</p>
            </section>
            <section id="contact" className="scroll-mt-28">
              <h2>Contact</h2>
              <p>Privacy & data governance inquiries: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We aim to respond within 7 business days (expedited for security-impacting matters).</p>
            </section>
            <div className="mt-12 border-t pt-6 text-xs text-slate-500">© {new Date().getFullYear()} Scriptlyfy. All rights reserved.</div>
          </article>
        </div>
      </main>
    </>
  );
}
