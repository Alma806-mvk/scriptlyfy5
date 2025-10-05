import { Button } from "@/components/ui/button";
import { Shield, Zap } from "lucide-react";
import InlineHeroLeadCapture from "@/components/landing/InlineHeroLeadCapture";

// Helper function for smooth scrolling and clean URLs
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    window.history.pushState({}, "", `/${sectionId}`);
  }
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_0%,rgba(59,130,246,0.15),transparent),radial-gradient(40%_40%_at_20%_100%,rgba(15,23,42,0.08),transparent)]" />
      <div className="px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-8 pb-8 lg:pt-14 lg:pb-12 grid lg:grid-cols-2 gap-8 md:gap-12 xl:gap-20 2xl:gap-24 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--brand))]"></span>
            Premium Coming Soon
          </div>
          <h1 className="mt-4 text-balance text-[clamp(1.75rem,6vw,3rem)] lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
            Stop Watching. Start Knowing. Bulk-Transcribe Competitor Content
            Instantly.
          </h1>
          <p className="mt-4 text-pretty text-[clamp(0.95rem,2.5vw,1.125rem)] text-slate-600 max-w-2xl">
            Scriptlyfy bulk-extracts and transcribes Instagram Reels, TikToks,
            and YouTube videos from any profile URL. Turn months of content into
            searchable competitive intelligence in minutes.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("signup");
              }}
              aria-label="Join the waitlist"
              className="inline-flex w-full sm:w-auto items-center justify-center h-12 px-6 rounded-md bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90 text-white text-sm font-medium"
            >
              Join the Waitlist
            </a>
            <a
              href="/demo"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("demo");
              }}
              aria-label="See 3-minute demo"
              className="inline-flex w-full sm:w-auto items-center justify-center h-12 px-6 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              See 3-Minute Demo
            </a>
          </div>
          <InlineHeroLeadCapture />
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />{" "}
              <span>Enterprise-grade security. Your data never shared.</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />{" "}
              <span>40x faster than manual research</span>
            </div>
          </div>
        </div>
        <div className="relative">
          {/* Desktop full comparison */}
          <div className="hidden md:block relative mx-auto max-w-lg">
            <div className="rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
              <div className="grid grid-cols-2 gap-0">
                <div className="p-5 bg-slate-50 border-r border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">
                    Before
                  </div>
                  <div className="mt-3">
                    <ol className="space-y-4">
                      {[
                        {
                          title: "Copy Reel URL from Instagram/TikTok/YouTube",
                          chips: ["IG", "TikTok", "YouTube"],
                        },
                        {
                          title: "Open a third-party downloader and paste URL",
                        },
                        { title: "Download MP4 to your device" },
                        { title: "Upload video into a transcription tool" },
                        { title: "Copy results into your notes or sheet" },
                        { title: "Repeat for every video" },
                      ].map((s, i, arr) => (
                        <li
                          key={i}
                          className={`relative pl-7 pb-4 ${i !== arr.length - 1 ? "border-l border-dashed border-slate-300" : ""}`}
                        >
                          <span className="absolute -left-2.5 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-700">
                            {i + 1}
                          </span>
                          <div className="text-sm text-slate-700">
                            {s.title}
                          </div>
                          {"chips" in s && Array.isArray((s as any).chips) ? (
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {(s as any).chips.map((c: string) => (
                                <span
                                  key={c}
                                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-600"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          {i !== arr.length - 1 ? (
                            <span className="pointer-events-none absolute left-0 bottom-[-4px] -translate-x-[57%] rotate-45 w-1.5 h-1.5 border-r border-b border-slate-300"></span>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[11px] font-medium">
                        ~5–8 min/video
                      </span>
                      <span className="inline-flex items-center rounded-full bg-rose-100 text-rose-800 px-2 py-0.5 text-[11px] font-medium">
                        Repeat ×100
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold text-slate-500">
                    After
                  </div>
                  <div className="mt-3">
                    <ol className="space-y-4">
                      {[
                        {
                          title: "Enter @handle or channel URL",
                          chips: ["IG", "TikTok", "YouTube"],
                        },
                        {
                          title:
                            "Scriptlyfy crawls and auto-transcribes latest videos",
                        },
                        {
                          title:
                            "Get 100 ready-to-use scripts + insights instantly",
                        },
                      ].map((s, i, arr) => (
                        <li
                          key={i}
                          className={`relative pl-7 pb-4 ${i !== arr.length - 1 ? "border-l border-dashed border-[hsl(var(--brand))]/60" : ""}`}
                        >
                          <span className="absolute -left-2.5 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--brand))] text-[10px] font-semibold text-white">
                            {i + 1}
                          </span>
                          <div className="text-sm font-medium text-slate-800">
                            {s.title}
                          </div>
                          {"chips" in s && Array.isArray((s as any).chips) ? (
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {(s as any).chips.map((c: string) => (
                                <span
                                  key={c}
                                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-600"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          {i !== arr.length - 1 ? (
                            <span className="pointer-events-none absolute left-0 bottom-[-4px] -translate-x-[57%] rotate-45 w-1.5 h-1.5 border-r border-b border-[hsl(var(--brand))]/60"></span>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[11px] font-medium">
                        &lt;1 min total
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[11px] font-medium">
                        100 scripts
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[11px] font-medium">
                        Export CSV/PDF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute -right-8 -bottom-6 rotate-3 rounded-lg bg-white border border-slate-200 shadow-md shadow-slate-900/5 p-3 text-xs w-[220px]">
              <div className="font-semibold text-slate-700">
                Auto-detected Insights
              </div>
              <ul className="mt-2 list-disc pl-4 text-slate-600 space-y-1">
                <li>Viral hooks</li>
                <li>CTA patterns</li>
                <li>Posting cadence</li>
              </ul>
            </div>
          </div>
          {/* Mobile condensed summary card */}
          <div className="md:hidden mx-auto max-w-sm w-full mt-4">
            <div className="rounded-xl border border-slate-200 bg-white shadow-md shadow-slate-900/5 p-4 flex flex-col gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Manual Workflow</div>
                <p className="mt-1 text-[13px] leading-snug text-slate-600">Copy links, download each file, upload, transcribe, paste results & repeat.</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-medium">5–8 min/video</span>
                  <span className="inline-flex items-center rounded-full bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-medium">×100 videos</span>
                </div>
              </div>
              <div className="h-px bg-slate-200" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">With Scriptlyfy</div>
                <p className="mt-1 text-[13px] leading-snug text-slate-700">Paste @handle or URL → bulk auto‑transcribe & extract hook + script insights.</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-medium">&lt;1 min total</span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-medium">100 scripts</span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-medium">Export CSV/PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
