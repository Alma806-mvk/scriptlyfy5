import React, { useState } from "react";
import { loadFirebase } from "@/lib/deferredFirebase";
import { loadAnalytics } from "@/lib/firebaseAnalytics";
import { getApps, getApp } from "firebase/app";
import { track } from "@/lib/events";

/**
 * New – High-conversion single-field hero capture.
 * Requirements:
 * - Bigger tap target (≥56px)
 * - Embedded submit button (desktop) / stacked on very narrow viewports
 * - Instant validation feedback
 * - ARIA live region for status
 * - Honeypot field for basic bot mitigation
 * - Deterministic lead doc id (email lowercase) – keep existing strategy
 * - Event tracking (variant: hero-inline-v2)
 */
export default function InlineHeroLeadCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "duplicate" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // if filled -> ignore
  const [lastErrorCode, setLastErrorCode] = useState<string | null>(null);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const valid = isValidEmail(email.trim());

  const submitting = status === "submitting";
  const ariaInvalidBool = status === "error" || (email.length > 3 && !valid);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!valid || submitting) return;
    if (honeypot) {
      setStatus("success");
      setMessage("You're on the waitlist!");
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log('[hero] submit start', { email, normalized: email.trim().toLowerCase() });
    }
    setStatus("submitting");
    setMessage("");
    setLastErrorCode(null);
    const normalized = email.trim().toLowerCase();
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const minDelay = sleep(500);
    try {
      const { db } = await loadFirebase();
      const { doc, setDoc, serverTimestamp, collection, addDoc } = await import(
        "firebase/firestore"
      );
      const ref = doc(db, "leads", normalized);
      try {
        if (process.env.NODE_ENV !== 'production') console.log('[hero] attempting setDoc');
        await Promise.all([
          setDoc(ref, {
            email: normalized,
            ts: serverTimestamp(),
            source: "hero-inline-v2",
            path: typeof window !== "undefined" ? window.location.pathname : "",
            ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
          }, { merge: false }),
          minDelay,
        ]);
        if (process.env.NODE_ENV !== 'production') console.log('[hero] setDoc success');
      } catch (writeErr: any) {
        const code = writeErr?.code || "";
        if (code === "permission-denied" || (""+writeErr?.message).includes("PERMISSION_DENIED")) {
          // Treat as duplicate (likely doc exists & rules disallow update)
          if (process.env.NODE_ENV !== 'production') console.warn('[hero] permission-denied -> treating as duplicate');
          await minDelay;
          try { if (typeof window !== 'undefined') window.localStorage.setItem('leadEmail', normalized); } catch {}
          track(
            "lead_form_duplicate",
            { variant: "hero-inline-v2" },
            typeof window !== "undefined" ? window.location.pathname : undefined,
          );
          // Attempt to prime details subcollection for duplicates too
          try {
            const detailsInitialRef = doc(collection(db, "leads", normalized, "details"), 'initial');
            await setDoc(detailsInitialRef, {
              stage: "duplicate_hit",
              ts: serverTimestamp(),
              source: "hero-inline-v2",
              path: typeof window !== "undefined" ? window.location.pathname : "",
              ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
              deterministic: true,
            }, { merge: false });
            if (process.env.NODE_ENV !== 'production') console.log('[hero] details initial (duplicate) setDoc success');
          } catch (dupPrimeErr) {
            if (process.env.NODE_ENV !== 'production') console.warn('[hero] duplicate details prime failed (non-fatal)', dupPrimeErr);
          }
          setStatus("success");
          setMessage("You're on the waitlist!");
          return;
        }
        if (process.env.NODE_ENV !== "production") {
          console.error("Hero lead write failed", writeErr);
        }
        setLastErrorCode(code || writeErr?.message || "unknown");
        throw writeErr;
      }

      track(
        "lead_form_submit",
        { variant: "hero-inline-v2" },
        typeof window !== "undefined" ? window.location.pathname : undefined
      );
      // Prime details subcollection with an initial document
      try {
        const detailsInitialRef = doc(collection(db, "leads", normalized, "details"), 'initial');
        await setDoc(detailsInitialRef, {
          stage: "initial_signup",
          ts: serverTimestamp(),
          source: "hero-inline-v2",
          path: typeof window !== "undefined" ? window.location.pathname : "",
          ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
          deterministic: true,
        }, { merge: false });
        if (process.env.NODE_ENV !== 'production') console.log('[hero] details initial setDoc success');
      } catch (primeErr) {
        if (process.env.NODE_ENV !== 'production') console.warn('[hero] details prime failed (non-fatal)', primeErr);
      }
      try {
        const a = getApps().length ? getApp() : undefined;
        if (a) loadAnalytics(a);
      } catch {}
      try {
        if (typeof window !== "undefined") window.localStorage.setItem("leadEmail", normalized);
      } catch {}
      setStatus("success");
      setMessage("You're on the waitlist! 🎉");
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') console.error('[hero] outer catch', err, { lastErrorCode });
      await minDelay; // keep rhythm consistent
      setStatus("error");
      setMessage("Something went wrong. Please retry.");
    }
  };

  return (
    <div className="mt-8 w-full max-w-xl" aria-live="polite">
      {/* Removed dev-only error code display per requirement */}
      {status !== "success" && status !== "duplicate" && (
        <>
          {/* Mobile large pill variant */}
          <form onSubmit={handleSubmit} className="group md:hidden" noValidate>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              placeholder="Leave blank"
            />
            <div className="relative flex flex-col gap-3">
              <label className="sr-only" htmlFor="hero-email-mobile">
                Email address
              </label>
              <div className="relative flex-1">
                <input
                  id="hero-email-mobile"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  enterKeyHint="go"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  onFocus={() => {
                    loadFirebase();
                  }}
                  className="peer w-full h-14 rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-sm px-5 pr-[10.5rem] text-base text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand))]/30 focus:border-[hsl(var(--brand))] transition-all"
                />
                <div className="absolute inset-y-1 right-1 flex">
                  <button
                    type="submit"
                    disabled={!valid || submitting}
                    className="h-full px-6 rounded-xl bg-[hsl(var(--brand))] text-white text-sm font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand))]/40 transition-colors hover:bg-[hsl(var(--brand))]/90"
                  >
                    {submitting ? "Joining…" : "Get Early Access"}
                  </button>
                </div>
              </div>
              <div className="mt-1 min-h-[1.25rem] text-xs font-medium">
                {email && !valid && (
                  <span className="text-amber-600">Enter a valid email.</span>
                )}
                {status === "error" && (
                  <span className="text-red-600" role="alert">
                    {message}
                  </span>
                )}
              </div>
            </div>
          </form>
          {/* Desktop original simple variant */}
          <form onSubmit={handleSubmit} className="hidden md:block" noValidate>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              placeholder="Leave blank"
            />
            <div className="flex items-stretch gap-3">
              <label className="sr-only" htmlFor="hero-email-desktop">
                Email address
              </label>
              <input
                id="hero-email-desktop"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                enterKeyHint="go"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                onFocus={() => {
                  loadFirebase();
                }}
                className="h-12 w-full md:w-[17rem] rounded-md border border-slate-300 px-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))] focus:border-[hsl(var(--brand))] transition"
              />
              <button
                type="submit"
                disabled={!valid || submitting}
                className="h-12 px-6 rounded-md bg-[hsl(var(--brand))] text-white text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90 transition-colors"
              >
                {submitting ? "Joining…" : "Get Early Access"}
              </button>
            </div>
            <div className="mt-2 min-h-[1.25rem] text-[13px] font-medium">
              {email && !valid && (
                <span className="text-amber-600">Enter a valid email.</span>
              )}
              {status === "error" && (
                <span className="text-red-600" role="alert">
                  {message}
                </span>
              )}
            </div>
          </form>
        </>
      )}
      {(status === "success" || status === "duplicate") && (
        <div className="rounded-xl border border-emerald-300/60 bg-emerald-50 px-5 py-4 flex flex-col gap-4 shadow-sm">
          <div className="text-emerald-600 text-sm md:text-base font-medium">
            {message || "You're on the waitlist!"}
            <div className="mt-1 text-xs md:text-[13px] font-normal text-emerald-700/80">
              We'll email you the moment early access opens.
            </div>
          </div>
          <div>
            <a
              href={`/signup?alreadyOnList=1&e=${encodeURIComponent(email.trim().toLowerCase())}`}
              className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--brand))] px-4 py-2 text-xs md:text-sm font-medium text-white shadow hover:bg-[hsl(var(--brand))]/90 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
            >
              Until then, answer a few quick questions?
            </a>
          </div>
        </div>
      )}
      <p className="mt-3 text-[11px] md:text-xs text-slate-500">
        No spam – just launch & key product updates.
      </p>
    </div>
  );
}
