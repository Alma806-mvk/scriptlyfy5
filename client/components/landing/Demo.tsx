import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Search, PlayCircle } from "lucide-react";

type DemoItem = {
  id: number;
  text: string;
  highlights: string[];
};

type DemoVideo = {
  id: string;
  title: string;
  duration: string; // mm:ss or hh:mm:ss
  transcript: DemoItem[];
};

type DemoChannel = {
  platform: "YouTube" | "Instagram" | "TikTok" | "Unknown";
  videos: DemoVideo[];
};

const SAMPLE_URLS = [
  { label: "YouTube @vercel", url: "https://www.youtube.com/@vercel" },
  { label: "Instagram @natgeo", url: "https://www.instagram.com/natgeo/" },
  { label: "TikTok @cristiano", url: "https://www.tiktok.com/@cristiano" },
];

const MOCK_DB: Record<string, DemoChannel> = {
  "@vercel": {
    platform: "YouTube",
    videos: [
      {
        id: "yt-1",
        title: "Ship Faster with Vercel + Next.js",
        duration: "08:41",
        transcript: [
          {
            id: 1,
            text:
              "Welcome back! Today we test three hooks for a 60s tutorial. The second one improves AVD by 19%.",
            highlights: ["60s tutorial", "AVD by 19%"],
          },
          {
            id: 2,
            text: "Chapters: 00:00 Hook, 00:07 Setup, 00:40 Demo, 00:55 CTA.",
            highlights: ["Chapters", "CTA"],
          },
          {
            id: 3,
            text: "Subscribe for part two where we fix the retention dip at 28 seconds.",
            highlights: ["retention dip", "28 seconds"],
          },
        ],
      },
      {
        id: "yt-2",
        title: "Edge Functions in Production (Guide)",
        duration: "12:03",
        transcript: [
          {
            id: 1,
            text: "Edge vs serverless: pick the right runtime. We cover cold starts, caching and latency.",
            highlights: ["Edge", "serverless", "caching", "latency"],
          },
          {
            id: 2,
            text: "Pro tip: stream HTML while fetching data to avoid TTFB cliffs.",
            highlights: ["stream HTML", "TTFB"],
          },
        ],
      },
    ],
  },
  "@natgeo": {
    platform: "Instagram",
    videos: [
      {
        id: "ig-1",
        title: "Inside the Serengeti: Lion Patrol",
        duration: "00:59",
        transcript: [
          {
            id: 1,
            text: "Carousel breakdown: 7 slides, 2 hooks, last slide CTA. Save this for later!",
            highlights: ["7 slides", "CTA", "Save this"],
          },
        ],
      },
    ],
  },
  "@cristiano": {
    platform: "TikTok",
    videos: [
      {
        id: "tt-1",
        title: "Training Day Routine",
        duration: "00:30",
        transcript: [
          {
            id: 1,
            text: "Loop your last two seconds to improve completion rate. Here's how...",
            highlights: ["Loop", "completion rate"],
          },
        ],
      },
    ],
  },
};

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

function detectPlatform(input: string) {
  if (/youtube\.com|youtu\.be/i.test(input)) return "YouTube" as const;
  if (/instagram\.com/i.test(input)) return "Instagram" as const;
  if (/tiktok\.com/i.test(input)) return "TikTok" as const;
  return "Unknown" as const;
}

function parseHandle(input: string): string | null {
  const m = input.match(/(?:\/|^)@([A-Za-z0-9_.-]+)/);
  if (m) return `@${m[1]}`;
  const ig = input.match(/instagram\.com\/(?!p\/)([A-Za-z0-9_.-]+)/i);
  if (ig) return `@${ig[1]}`;
  const tt = input.match(/tiktok\.com\/@([A-Za-z0-9_.-]+)/i);
  if (tt) return `@${tt[1]}`;
  return null;
}

export default function Demo() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState<DemoChannel | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const platform = useMemo(() => detectPlatform(url), [url]);
  const isValid = /^(https?:\/\/).+\..+/.test(url);
  const handle = useMemo(() => parseHandle(url), [url]);

  const selectedVideo = useMemo(() => {
    if (!channel || !selectedId) return null;
    return channel.videos.find((v) => v.id === selectedId) || null;
  }, [channel, selectedId]);

  const handleTry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSelectedId(null);

    setTimeout(() => {
      const h = handle;
      if (h && MOCK_DB[h]) {
        setChannel(MOCK_DB[h]);
      } else {
        // Fallback demo channel with generic samples
        setChannel({
          platform,
          videos: [
            {
              id: "generic-1",
              title: "Demo Sample Video",
              duration: "01:02",
              transcript: BASE_TRANSCRIPTS,
            },
          ],
        });
      }
      setLoading(false);
    }, 600);
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
            Simulated database. Paste a profile URL or try a sample.
          </p>
          <form onSubmit={handleTry} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              required
              placeholder="https://www.youtube.com/@vercel"
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

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {loading ? (
              <div className="flex items-center gap-3 text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" /> Building demo index...
              </div>
            ) : channel ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 text-sm text-slate-600">Videos ({channel.videos.length})</div>
                  <ul className="space-y-2">
                    {channel.videos.map((v) => (
                      <li key={v.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(v.id)}
                          className={`w-full text-left rounded-lg border px-3 py-2 transition-colors ${
                            selectedId === v.id ? "border-[hsl(var(--brand))] bg-[hsl(var(--brand))]/5" : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <PlayCircle className="h-4 w-4 text-slate-500" />
                            <span className="font-medium text-slate-900">{v.title}</span>
                            <span className="ml-auto text-xs text-slate-500">{v.duration}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-h-[220px]">
                  {selectedVideo ? (
                    <div className="space-y-3">
                      {selectedVideo.transcript.map((r) => (
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
                    <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                      Select a video to preview its transcript
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-500">
                <Search className="h-4 w-4" /> Paste a profile URL to preview transcripts
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-500">Read-only demo. Data is mocked; export is disabled.</p>
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
