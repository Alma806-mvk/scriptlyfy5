import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";

type DemoItem = {
  id: number;
  text: string;
  highlights: string[];
};

const SAMPLE_URLS = [
  { label: "YouTube Channel", url: "https://www.youtube.com/@vercel" },
  { label: "Instagram Profile", url: "https://www.instagram.com/natgeo/" },
  { label: "TikTok Profile", url: "https://www.tiktok.com/@cristiano" },
];

const BASE_TRANSCRIPTS: DemoItem[] = [
  {
    id: 1,
    text:
      "Okay, here's the hook formula we used to 10x our reels. Keep watching for the template...",
    highlights: ["hook formula", "10x our reels", "template"],
  },
  {
    id: 2,
    text:
      "Comment 'HOOKS' and we'll send you the exact opener lines that boosted retention.",
    highlights: ["Comment 'HOOKS'", "opener lines", "retention"],
  },
  {
    id: 3,
    text:
      "We post 3 times a day, and here's why cadence + consistent CTAs matter.",
    highlights: ["3 times a day", "cadence", "CTAs"],
  },
];

const YT_TRANSCRIPTS: DemoItem[] = [
  {
    id: 1,
    text:
      "Today we're testing 3 hooks for a 60s tutorial. The second one improves AVD by 19%.",
    highlights: ["3 hooks", "60s tutorial", "AVD by 19%"],
  },
  {
    id: 2,
    text:
      "Chapters: 00:00 Hook, 00:07 Setup, 00:40 Demo, 00:55 CTA. Pin your best comment.",
    highlights: ["Chapters", "CTA", "Pin your best comment"],
  },
  {
    id: 3,
    text:
      "Subscribe for part 2 where we fix the retention dip at 28 seconds.",
    highlights: ["Subscribe", "retention dip", "28 seconds"],
  },
];

const IG_TRANSCRIPTS: DemoItem[] = [
  {
    id: 1,
    text:
      "Carousel post breakdown: 7 slides, 2 hooks, last slide CTA. Save this for later!",
    highlights: ["Carousel", "7 slides", "Save this"],
  },
  {
    id: 2,
    text:
      "POV: You run out of ideas. Here are 5 evergreen formats that always work.",
    highlights: ["POV", "evergreen formats", "always work"],
  },
  {
    id: 3,
    text: "Comment 'TEMPLATE' and we'll DM you the caption framework.",
    highlights: ["Comment 'TEMPLATE'", "caption framework"],
  },
];

const TT_TRANSCRIPTS: DemoItem[] = [
  {
    id: 1,
    text:
      "I built an AI that reviews your profile in 30 seconds. Watch this...",
    highlights: ["AI", "30 seconds", "Watch this"],
  },
  {
    id: 2,
    text:
      "Loop your last 2 seconds to improve completion rate. Here's how...",
    highlights: ["Loop", "completion rate"],
  },
  {
    id: 3,
    text: "Follow for part 2 where we test different opening sounds.",
    highlights: ["part 2", "opening sounds"],
  },
];

function detectPlatform(input: string) {
  if (/youtube\.com|youtu\.be/i.test(input)) return "YouTube" as const;
  if (/instagram\.com/i.test(input)) return "Instagram" as const;
  if (/tiktok\.com/i.test(input)) return "TikTok" as const;
  return "Unknown" as const;
}

export default function Demo() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DemoItem[]>([]);

  const platform = useMemo(() => detectPlatform(url), [url]);
  const isValid = /^(https?:\/\/).+\..+/.test(url);

  const getSampleByPlatform = () => {
    switch (platform) {
      case "YouTube":
        return YT_TRANSCRIPTS;
      case "Instagram":
        return IG_TRANSCRIPTS;
      case "TikTok":
        return TT_TRANSCRIPTS;
      default:
        return BASE_TRANSCRIPTS;
    }
  };

  const handleTry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setTimeout(() => {
      setResults(getSampleByPlatform());
      setLoading(false);
    }, 800);
  };

  return (
    <section className="container mx-auto px-4 py-16" id="demo">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Interactive Product Preview
            </h2>
            <Badge variant="secondary">Demo mode</Badge>
          </div>
          <p className="mt-3 text-slate-600">
            Simulated results. No keys required. Paste any Instagram/TikTok/YouTube URL
            or try a sample below.
          </p>
          <form onSubmit={handleTry} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              required
              placeholder="https://www.instagram.com/username/"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-12 rounded-md border border-slate-300 px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
              aria-label="Profile URL"
            />
            <Button
              type="submit"
              className="h-12 px-6 bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
              disabled={!isValid || loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Processing</span>
              ) : (
                "Extract"
              )}
            </Button>
          </form>

          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="text-slate-500">Try sample:</span>
            {SAMPLE_URLS.map((s) => (
              <button
                key={s.url}
                onClick={() => setUrl(s.url)}
                className="rounded-full border border-slate-300 px-2.5 py-0.5 hover:bg-slate-50"
                type="button"
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm min-h-[220px]">
            {loading ? (
              <div className="flex items-center gap-3 text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" /> Generating demo transcript...
              </div>
            ) : results.length ? (
              <div className="space-y-3">
                {results.map((r) => (
                  <div key={r.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="text-xs text-slate-500">Transcript</div>
                    <p className="mt-1 text-slate-800">
                      {r.text
                        .split(new RegExp(`(${r.highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "i"))
                        .map((chunk, i) => (
                          <span
                            key={i}
                            className={r.highlights.some((h) => new RegExp(h, "i").test(chunk)) ? "bg-yellow-200/60 rounded px-1" : ""}
                          >
                            {chunk}
                          </span>
                        ))}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-500">
                <Search className="h-4 w-4" /> Paste a profile URL to preview transcripts
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-500">Export disabled in Demo mode.</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Why teams love Scriptlyfy</h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-slate-700">
            <li className="rounded-lg border border-slate-200 p-3">
              <span className="font-semibold">Bulk Magic</span>
              <br />
              Extract 1,000+ videos in one click
            </li>
            <li className="rounded-lg border border-slate-200 p-3">
              <span className="font-semibold">Cross-Platform</span>
              <br />
              Instagram + TikTok + YouTube in one place
            </li>
            <li className="rounded-lg border border-slate-200 p-3">
              <span className="font-semibold">AI Insights</span>
              <br />
              Auto-detect viral hooks, CTAs, and patterns
            </li>
            <li className="rounded-lg border border-slate-200 p-3">
              <span className="font-semibold">Export Everything</span>
              <br />
              CSV, PDF, or API access to all data
            </li>
          </ul>
          <div className="mt-4 text-xs text-slate-500">
            <div>Mode: <span className="font-medium">{platform}</span></div>
            <div>These results are simulated for demo purposes.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
