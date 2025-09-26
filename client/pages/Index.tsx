import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import SocialProof from "@/components/landing/SocialProof";
import Features from "@/components/landing/Features";
import Demo from "@/components/landing/Demo";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Urgency from "@/components/landing/Urgency";
import LeadForm from "@/components/landing/LeadForm";
import SEO from "@/components/SEO";
import { Testimonials } from "@/components/landing/social/Testimonials";

export default function Index() {
  return (
    <>
      <SEO
        title="Scriptlyfy – Bulk Short-Form Video Transcription & Hook Intelligence"
        description="Bulk transcribe TikTok, Reels, Shorts & YouTube videos. Extract winning hook patterns, compare creators and turn long-form into viral short scripts."
        canonical="https://scriptlyfy.com/"
        ogTitle="Scriptlyfy – Bulk Transcription & Viral Hook Intelligence"
        ogDescription="Analyze TikTok, Reels, Shorts & YouTube at scale. Extract hooks that drive retention and accelerate your content strategy."
        twitterTitle="Scriptlyfy: Bulk Short-Form Video Transcription"
        twitterDescription="Transcribe and analyze short-form video hooks at scale. Find patterns. Ship winning scripts faster."
      />
    <div>
      <Hero />
  <TrustBar />
  <SocialProof />
      <Demo />
      <Features />
  {/* Testimonials for narrative credibility */}
  <div className="container mx-auto px-4 mt-16" data-observe="reveal"><Testimonials /></div>
      {/* Internal SEO link to new landing page */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-slate-200 p-4 bg-white/60 text-sm text-slate-600">
          Looking to <a href="/bulk-transcribe-instagram-reels" className="text-[hsl(var(--brand))] underline">bulk transcribe Instagram Reels</a>? Also try our pages for <a href="/bulk-transcribe-tiktok-videos" className="underline">TikTok</a>, <a href="/bulk-transcribe-youtube-shorts" className="underline">YouTube Shorts</a>, <a href="/bulk-transcribe-youtube-videos" className="underline">YouTube videos</a>, and <a href="/bulk-transcribe-instagram-posts" className="underline">Instagram posts</a>.
        </div>
      </div>
      <Pricing />
      <Urgency />
      <FAQ />
      <LeadForm />
    </div>
    </>
  );
}
