import React, { useState, useMemo } from "react";
import { loadFirebase } from "@/lib/deferredFirebase";
import { loadAnalytics } from "@/lib/firebaseAnalytics";
import { getApps, getApp } from "firebase/app";
import { track } from "@/lib/events";

/**
 * Lightweight inline email capture for hero section.
 * Purpose: Reduce friction vs multi-step form; attribute source = hero-inline.
 */
export default function InlineHeroLeadCapture() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [showReferral, setShowReferral] = useState(false);
  const [referralSaved, setReferralSaved] = useState(false);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const valid = useMemo(() => isValidEmail(email), [email]);

  const submit = async () => {
    if (!valid) return;
    setError("");
    setSubmitting(true);
    const normalized = email.trim().toLowerCase();
    const { db } = await loadFirebase();
    const { doc, getDoc, setDoc, serverTimestamp } = await import(
      "firebase/firestore"
    );
    const ref = doc(db, "leads", normalized);
    try {
      const existing = await getDoc(ref);
      if (existing.exists()) {
        setSubmitting(false);
        setError("Already joined.");
        setDone(true);
        setShowReferral(true);
        track(
          "lead_form_duplicate",
          { variant: "hero-inline" },
          typeof window !== "undefined" ? window.location.pathname : undefined,
        );
        return;
      }
    } catch {}

    try {
      await setDoc(ref, {
        ts: serverTimestamp(),
        email: normalized,
        source: "hero-inline",
        path: typeof window !== "undefined" ? window.location.pathname : "",
        ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      });
      track(
        "lead_form_submit",
        { variant: "hero-inline" },
        typeof window !== "undefined" ? window.location.pathname : undefined,
      );
      // Fire-and-forget analytics load after a successful conversion
      try {
        const a = getApps().length ? getApp() : undefined;
        if (a) loadAnalytics(a);
      } catch {}
      try {
        if (typeof window !== "undefined")
          window.localStorage.setItem("leadEmail", normalized);
      } catch {}
      setDone(true);
      setShowReferral(true);
    } catch (e) {
      setError("Failed. Please retry.");
    }
    setSubmitting(false);
  };

  const submitReferral = async () => {
    const normalized =
      (email || "").trim().toLowerCase() ||
      (typeof window !== "undefined"
        ? window.localStorage.getItem("leadEmail") || ""
        : "");
    if (!normalized) {
      setShowReferral(false);
      return;
    }
    try {
      const { db } = await loadFirebase();
      const { collection, addDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      const sub = collection(db, "leads", normalized, "referrals");
      await addDoc(sub, {
        referralSource: referralSource || "unspecified",
        updatedAt: serverTimestamp(),
        from: "hero-inline",
      });
      track(
        "referral_submit",
        { source: referralSource || "unspecified", variant: "hero-inline" },
        typeof window !== "undefined" ? window.location.pathname : undefined,
      );
      setReferralSaved(true);
    } catch {}
    setShowReferral(false);
  };

  // Track skip of referral
  const skipReferral = () => {
    track(
      "referral_skip",
      { variant: "hero-inline" },
      typeof window !== "undefined" ? window.location.pathname : undefined,
    );
    setShowReferral(false);
  };

  return (
    <div className="mt-6 w-full max-w-md">
      {!done && (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            enterKeyHint="go"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 h-12 rounded-md border border-slate-300 px-3 text-base focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
            aria-label="Email address"
            onFocus={() => {
              loadFirebase();
            }}
          />
          <button
            onClick={submit}
            disabled={!valid || submitting}
            className="h-12 px-6 rounded-md bg-[hsl(var(--brand))] text-white text-sm font-medium disabled:opacity-50"
          >
            {submitting ? "Joining…" : "Get Early Access"}
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      {done && (
        <div className="text-sm mt-2 text-emerald-700 font-medium">
          You're on the waitlist. Thanks!
        </div>
      )}
      {showReferral && !referralSaved && (
        <div className="mt-4 border border-slate-200 rounded-lg p-3 bg-white/70">
          <label className="block text-xs font-medium text-slate-700 mb-1">
            How did you hear about us?{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <select
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value)}
            className="w-full h-10 rounded-md border border-slate-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))] mb-2"
            aria-label="Referral source"
          >
            <option value="">Select an option</option>
            <option value="social">Social media</option>
            <option value="search">Search</option>
            <option value="referral">Referral</option>
            <option value="newsletter">Newsletter / Blog</option>
            <option value="community">Community / Forum</option>
            <option value="ad">Ad</option>
            <option value="other">Other</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={submitReferral}
              className="h-9 px-4 rounded-md bg-[hsl(var(--brand))] text-white text-xs font-medium"
            >
              Submit
            </button>
            <button
              onClick={skipReferral}
              className="h-9 px-4 rounded-md border border-slate-300 text-xs text-slate-600"
            >
              Skip
            </button>
          </div>
        </div>
      )}
      {referralSaved && (
        <div className="mt-2 text-xs text-slate-500">
          Thanks for the context!
        </div>
      )}
      <p className="mt-3 text-[11px] text-slate-500">
        No spam. Launch + key product updates only.
      </p>
    </div>
  );
}
