import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Index from "./pages/Index";
import { useReveal } from "@/hooks/useReveal";
import NotFound from "./pages/NotFound";
import MainLayout from "@/components/layout/MainLayout";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import React, { Suspense } from 'react';
const BulkTranscribeReelsPage = React.lazy(() => import("@/pages/BulkTranscribeReels"));
const BulkTranscribeTikTokPage = React.lazy(() => import("@/pages/BulkTranscribeTikTok"));
const BulkTranscribeYouTubeShortsPage = React.lazy(() => import("@/pages/BulkTranscribeYouTubeShorts"));
const BulkTranscribeYouTubeVideosPage = React.lazy(() => import("@/pages/BulkTranscribeYouTubeVideos"));
const BulkTranscribeInstagramPostsPage = React.lazy(() => import("@/pages/BulkTranscribeInstagramPosts"));
const BulkSocialVideoTranscriptionHub = React.lazy(() => import("@/pages/BulkSocialVideoTranscription"));
const ReverseEngineerViralTikTokHooksPage = React.lazy(() => import("@/pages/ReverseEngineerViralTikTokHooks"));
const TurnYouTubeLongFormToShortScriptsPage = React.lazy(() => import("@/pages/TurnYouTubeLongFormToShortScripts"));
const ComparePage = React.lazy(() => import("@/pages/Compare"));
const AboutPage = React.lazy(() => import("@/pages/About"));
const RoadmapPage = React.lazy(() => import("@/pages/Roadmap"));
const StateOfShortFormHookPatterns2025Page = React.lazy(() => import("@/pages/StateOfShortFormHookPatterns2025"));

const queryClient = new QueryClient();

const IndexWithScroll = ({ sectionId }: { sectionId: string }) => {
  useEffect(() => {
    // Delay to ensure sections are mounted
    const id = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => clearTimeout(id);
  }, [sectionId]);
  return <Index />;
};

const AppInner = () => {
  useReveal();
  return (
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Scriptlyfy",
          "url": "https://scriptlyfy.com/",
          "logo": "https://scriptlyfy.com/logo-scriptlyfy.png",
          "sameAs": [
            "https://www.linkedin.com/", // placeholder social profiles
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Scriptlyfy",
          "url": "https://scriptlyfy.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://scriptlyfy.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Helmet>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Suspense fallback={<div className="p-8 text-sm text-slate-500">Loading…</div>}>
            <Routes>
            <Route path="/" element={<Index />} />
            {/* Clean section routes that render the landing and scroll to section */}
            <Route path="/features" element={<IndexWithScroll sectionId="features" />} />
            <Route path="/demo" element={<IndexWithScroll sectionId="demo" />} />
            <Route path="/pricing" element={<IndexWithScroll sectionId="pricing" />} />
            <Route path="/faq" element={<IndexWithScroll sectionId="faq" />} />
            <Route path="/signup" element={<IndexWithScroll sectionId="signup" />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/bulk-transcribe-instagram-reels" element={<BulkTranscribeReelsPage />} />
            <Route path="/bulk-transcribe-tiktok-videos" element={<BulkTranscribeTikTokPage />} />
            <Route path="/bulk-transcribe-youtube-shorts" element={<BulkTranscribeYouTubeShortsPage />} />
            <Route path="/bulk-transcribe-youtube-videos" element={<BulkTranscribeYouTubeVideosPage />} />
            <Route path="/bulk-transcribe-instagram-posts" element={<BulkTranscribeInstagramPostsPage />} />
            <Route path="/bulk-social-video-transcription" element={<BulkSocialVideoTranscriptionHub />} />
            <Route path="/reverse-engineer-viral-tiktok-hooks" element={<ReverseEngineerViralTikTokHooksPage />} />
            <Route path="/turn-youtube-long-form-into-short-form-scripts" element={<TurnYouTubeLongFormToShortScriptsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/state-of-short-form-hook-patterns-2025" element={<StateOfShortFormHookPatterns2025Page />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<AppInner />);
