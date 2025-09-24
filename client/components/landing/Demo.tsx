import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Search, PlayCircle } from "lucide-react";

// Firestore-style types
type Platform = "YouTube" | "Instagram" | "TikTok" | "Unknown";

type TranscriptChunk = {
  ts: number; // seconds from start
  text: string;
  highlights?: string[];
};

type VideoDoc = {
  id: string; // stable id (videoId)
  title: string;
  durationSec: number;
  publishedAt: string; // ISO
  stats: { views?: number; likes?: number };
  transcript: TranscriptChunk[];
};

type ChannelDoc = {
  handle: string; // @vercel
  platform: Platform;
  title: string;
  stats: { followers?: number; videos: number };
  videos: Record<string, VideoDoc>; // Subcollection map by id
  videoOrder: string[]; // Sorted newest -> oldest
  updatedAt: number; // epoch ms
};

type MockFirestore = {
  channels: Record<string, ChannelDoc>; // collection "channels"
};

// Utilities
function secsToHMS(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const mm = h ? m : String(Math.floor((s % 3600) / 60));
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${m}:${ss}` : `${mm}:${ss}`;
}

const SAMPLE_URLS = [
  { label: "YouTube @vercel", url: "https://www.youtube.com/@vercel" },
  { label: "Instagram @natgeo", url: "https://www.instagram.com/natgeo/" },
  { label: "TikTok @cristiano", url: "https://www.tiktok.com/@cristiano" },
];

// Firestore-like mock database
const MOCK_DB: MockFirestore = {
  channels: {
    "@vercel": {
      handle: "@vercel",
      platform: "YouTube",
      title: "Vercel",
      stats: { videos: 2, followers: 1000000 },
      updatedAt: Date.now(),
      videoOrder: ["vercel-ship-faster", "vercel-edge-functions"],
      videos: {
        "vercel-ship-faster": {
          id: "vercel-ship-faster",
          title: "Ship Faster with Vercel + Next.js",
          durationSec: 8 * 60 + 41,
          publishedAt: "2024-06-11T12:00:00.000Z",
          stats: { views: 120345, likes: 3800 },
          transcript: [
            {
              ts: 0,
              text: "Welcome back! Today we test three hooks for a quick tutorial.",
              highlights: ["three hooks", "tutorial"],
            },
            {
              ts: 7,
              text: "Chapters: Hook, Setup, Demo, CTA.",
              highlights: ["Chapters", "CTA"],
            },
            {
              ts: 28,
              text: "We fix the retention dip at 28 seconds using a mid-roll pattern.",
              highlights: ["retention dip", "28 seconds"],
            },
          ],
        },
        "vercel-edge-functions": {
          id: "vercel-edge-functions",
          title: "Edge Functions in Production (Guide)",
          durationSec: 12 * 60 + 3,
          publishedAt: "2024-02-02T12:00:00.000Z",
          stats: { views: 80321, likes: 2400 },
          transcript: [
            {
              ts: 0,
              text: "Edge vs serverless: choose the right runtime.",
              highlights: ["Edge", "serverless"],
            },
            {
              ts: 40,
              text: "Stream HTML while fetching to improve TTFB.",
              highlights: ["Stream HTML", "TTFB"],
            },
          ],
        },
      },
    },
    "@natgeo": {
      handle: "@natgeo",
      platform: "Instagram",
      title: "National Geographic",
      stats: { videos: 1, followers: 280000000 },
      updatedAt: Date.now(),
      videoOrder: ["natgeo-serengeti-lion-patrol"],
      videos: {
        "natgeo-serengeti-lion-patrol": {
          id: "natgeo-serengeti-lion-patrol",
          title: "Inside the Serengeti: Lion Patrol",
          durationSec: 59,
          publishedAt: "2024-05-10T12:00:00.000Z",
          stats: { views: 934000, likes: 210000 },
          transcript: [
            {
              ts: 2,
              text: "Carousel breakdown: 7 slides, 2 hooks, last slide CTA.",
              highlights: ["7 slides", "CTA"],
            },
          ],
        },
      },
    },
    "@cristiano": {
      handle: "@cristiano",
      platform: "TikTok",
      title: "Cristiano Ronaldo",
      stats: { videos: 1, followers: 170000000 },
      updatedAt: Date.now(),
      videoOrder: ["cr7-training-day"],
      videos: {
        "cr7-training-day": {
          id: "cr7-training-day",
          title: "Training Day Routine",
          durationSec: 30,
          publishedAt: "2024-03-20T12:00:00.000Z",
          stats: { views: 4200000, likes: 900000 },
          transcript: [
            {
              ts: 0,
              text: "Loop your last two seconds to improve completion rate.",
              highlights: ["Loop", "completion rate"],
            },
          ],
        },
      },
    },
  },
};

// Minimal query helpers to mimic Firestore reads
const db = {
  getChannel(handle: string): ChannelDoc | null {
    return MOCK_DB.channels[handle] || null;
  },
  listVideos(handle: string): VideoDoc[] {
    const c = this.getChannel(handle);
    if (!c) return [];
    return c.videoOrder.map((id) => c.videos[id]).filter(Boolean);
  },
  getVideo(handle: string, id: string): VideoDoc | null {
    return this.getChannel(handle)?.videos[id] || null;
  },
};

function detectPlatform(input: string): Platform {
  if (/youtube\.com|youtu\.be/i.test(input)) return "YouTube";
  if (/instagram\.com/i.test(input)) return "Instagram";
  if (/tiktok\.com/i.test(input)) return "TikTok";
  return "Unknown";
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
  const [handle, setHandle] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isValid = /^(https?:\/\/).+\..+/.test(url);
  const platform = useMemo(() => detectPlatform(url), [url]);
  const parsedHandle = useMemo(() => parseHandle(url), [url]);

  const channel = useMemo(() => (handle ? db.getChannel(handle) : null), [handle]);
  const videos = useMemo(() => (handle ? db.listVideos(handle) : []), [handle]);
  const selectedVideo = useMemo(
    () => (handle && selectedId ? db.getVideo(handle, selectedId) : null),
    [handle, selectedId],
  );

  const handleTry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSelectedId(null);
    setTimeout(() => {
      setHandle(parsedHandle);
      setLoading(false);
    }, 500);
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
            <Badge className="bg-slate-900 text-white">Firestore-style</Badge>
          </div>
          <p className="mt-3 text-slate-600">
            Simulated Firestore schema: channels/{"{"}handle{"}"}/videos/{"{"}videoId{"}"} with transcripts.
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
                <Loader2 className="h-4 w-4 animate-spin" /> Querying channels...
              </div>
            ) : channel ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 text-sm text-slate-600">
                    {channel.title} • {channel.platform} • Videos ({videos.length})
                  </div>
                  <ul className="space-y-2">
                    {videos.map((v) => (
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
                            <span className="ml-auto text-xs text-slate-500">{secsToHMS(v.durationSec)}</span>
                          </div>
                          <div className="mt-0.5 text-xs text-slate-500">
                            {new Date(v.publishedAt).toLocaleDateString()} • {v.stats.views?.toLocaleString()} views
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-h-[240px]">
                  {selectedVideo ? (
                    <div className="space-y-3">
                      {selectedVideo.transcript.map((c, i) => (
                        <div key={i} className="rounded-lg border border-slate-200 p-3">
                          <div className="text-xs text-slate-500">{secsToHMS(c.ts)}</div>
                          <p className="mt-1 text-slate-800">
                            {c.text
                              .split(new RegExp(`(${(c.highlights || []).map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "i"))
                              .map((chunk, j) => (
                                <span
                                  key={j}
                                  className={(c.highlights || []).some((h) => new RegExp(h, "i").test(chunk)) ? "bg-yellow-200/60 rounded px-1" : ""}
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
          <p className="mt-2 text-xs text-slate-500">Read-only demo. Schema mirrors Firestore structure.</p>
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
            <div>These results are simulated with a Firestore-like schema.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
