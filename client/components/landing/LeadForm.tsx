import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { loadFirebase } from "@/lib/deferredFirebase";
import type { Firestore } from "firebase/firestore";
import { loadAnalytics } from "@/lib/firebaseAnalytics";
import { track } from "@/lib/events";
import { getApps, getApp } from "firebase/app";
import { useEffect } from "react";

const roles = [
  "Creator",
  "Business/Brand",
  "Aspiring creator",
  "Consumer/Researcher",
] as const;

const goals = [
  "Grow audience",
  "Generate leads/sales",
  "Learn what's trending",
  "Create content faster",
];

const challenges = [
  "Finding viral hooks that work",
  "Understanding competitor strategies",
  "Scaling content research",
  "Content performance analysis",
];

const sizeBuckets = ["1-5", "6-20", "21-50", "50+"];

const contentOptions = [
  "Short videos",
  "Long-form video",
  "Posts/threads",
  "Blogs/newsletters",
  "Podcasts",
];

export default function LeadForm({ alreadyOnList = false }: { alreadyOnList?: boolean } = {}) {
  const qp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  if (!alreadyOnList && qp?.get('alreadyOnList') === '1') {
    alreadyOnList = true;
  }

  const [step, setStep] = useState(1);

  const [role, setRole] = useState<string>(roles[0]);
  const [useCase, setUseCase] = useState(goals[0]);
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [challenge, setChallenge] = useState(challenges[0]);
  const [count, setCount] = useState(sizeBuckets[0]);
  const [handleOrWebsite, setHandleOrWebsite] = useState("");

  const [roleOther, setRoleOther] = useState("");
  const [useCaseOther, setUseCaseOther] = useState("");
  const [challengeOther, setChallengeOther] = useState("");
  const [countOther, setCountOther] = useState("");

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Referral question state
  const [referralSource, setReferralSource] = useState("");
  const [showReferral, setShowReferral] = useState(true);
  const [referralSubmitted, setReferralSubmitted] = useState(false);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validEmail = useMemo(() => isValidEmail(email), [email]);

  // Capture UTM parameters and current path for attribution
  const utm = useMemo(() => {
    if (typeof window === "undefined") return {} as Record<string, string>;
    const p = new URLSearchParams(window.location.search);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ] as const;
    const entries = keys
      .map((k) => [k, p.get(k)])
      .filter(([, v]) => v != null && v.trim() !== "");
    return Object.fromEntries(entries) as Record<string, string>;
  }, []);

  const countLabel = useMemo(() => {
    if (role === "Business/Brand") return "Company size";
    return "Audience size";
  }, [role]);

  const toggleContent = (c: string) => {
    setContentTypes((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleReferralSubmit = async () => {
    let normalizedEmail = email.trim().toLowerCase();
    // Fallback if the page was reloaded and state is empty
    if (!normalizedEmail && typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem("leadEmail");
        if (stored) normalizedEmail = stored;
      } catch {}
    }
    // Only proceed if we have an email (user just joined). Allow empty referral selection.
    if (!normalizedEmail) {
      setReferralSubmitted(true);
      setShowReferral(false);
      return;
    }
    try {
      const { db } = await loadFirebase();
      const { collection, addDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      const sub = collection(db, "leads", normalizedEmail, "referrals");
      await addDoc(sub, {
        referralSource: referralSource || "unspecified",
        updatedAt: serverTimestamp(),
      });
      // Helpful for debugging if needed
      console.log(
        "Referral saved under:",
        `leads/${normalizedEmail}/referrals`,
      );
    } catch (e) {
      // Non-fatal; we don't block the UX on referral save
      console.warn("Referral save failed", e);
    }
    track(
      "referral_submit",
      { source: referralSource || "unspecified" },
      typeof window !== "undefined" ? window.location.pathname : undefined,
    );
    setReferralSubmitted(true);
    setShowReferral(false);
  };

  const handleReferralSkip = () => {
    track(
      "referral_skip",
      undefined,
      typeof window !== "undefined" ? window.location.pathname : undefined,
    );
    setReferralSubmitted(true);
    setShowReferral(false);
  };

  // Preload email from localStorage or query param when alreadyOnList so we have it for details write
  useEffect(() => {
    if (!alreadyOnList) return;
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('leadEmail');
      const qpEmail = qp?.get('e');
      const chosen = (stored || qpEmail || '').trim().toLowerCase();
      if (chosen) {
        // Keep in state (even though we don't show the field) so we can debug easier if needed
        setEmail(chosen);
      }
    } catch {}
  }, [alreadyOnList]);

  const onSubmit = async () => {
    if (!validEmail && !alreadyOnList) return;
    setErrorMsg("");
    setLoading(true);
    const minDelay = sleep(700);
    const normalizedEmail = alreadyOnList
      ? (() => {
          if (typeof window === 'undefined') return '';
          try {
            const stored = window.localStorage.getItem('leadEmail') || '';
            const qpEmail = qp?.get('e') || '';
            return (stored || qpEmail || email || '').trim().toLowerCase();
          } catch { return (email||'').trim().toLowerCase(); }
        })()
      : email.trim().toLowerCase();
    if (!normalizedEmail) {
      setLoading(false);
      setErrorMsg("Email missing – refresh and submit the hero form first.");
      return;
    }

    const metaRawBase = {
      roleSelection: role,
      useCaseSelection: useCase,
      challengeSelection: challenge,
      countSelection: count,
      roleOther,
      useCaseOther,
      challengeOther,
      countOther,
      contentTypes,
      handleOrWebsite,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      path: typeof window !== "undefined" ? window.location.pathname : "",
    };
    // Derive resolved fields (duplicated after earlier patch to ensure scope correctness)
    const resolvedRole = role === "Other" ? roleOther.trim() : role;
    const resolvedUseCase = useCase === "Other" ? useCaseOther.trim() : useCase;
    const resolvedChallenge = challenge === "Other" ? challengeOther.trim() : challenge;
    const resolvedCount = count === "Other" ? countOther.trim() : count;
    const pruneUndefined = (obj: any): any => {
      if (obj == null || typeof obj !== "object") return obj;
      if (Array.isArray(obj)) return obj.map(pruneUndefined).filter(v => v !== undefined);
      const out: Record<string, any> = {};
      for (const [k,v] of Object.entries(obj)) {
        const pv = pruneUndefined(v);
        if (pv !== undefined) out[k] = pv;
      }
      return out;
    };
    const meta = pruneUndefined(metaRawBase);

    const { db } = await loadFirebase();
  const { doc, setDoc, serverTimestamp, collection } = await import("firebase/firestore");
    const leadRef = doc(db, "leads", normalizedEmail);

    if (process.env.NODE_ENV !== 'production') {
      console.log('[lead-form] submit start', { alreadyOnList, normalizedEmail, resolvedRole, resolvedUseCase, resolvedChallenge, resolvedCount, contentTypes });
    }
    try {

      if (!alreadyOnList) {
        // create lead normally
        await Promise.all([
          setDoc(
            leadRef,
            {
              ts: serverTimestamp(),
              role: resolvedRole,
              useCase: resolvedUseCase,
              challenge: resolvedChallenge,
              count: resolvedCount,
              email: normalizedEmail,
              company,
              meta,
              ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
            },
            { merge: false },
          ),
          minDelay,
        ]);
        // Also persist a details snapshot capturing the answers (stage: research_answers)
        try {
          const pathNow = typeof window !== 'undefined' ? window.location.pathname : '';
          const uaNow = typeof navigator !== 'undefined' ? navigator.userAgent : '';
          const payload = {
            ts: serverTimestamp(),
            updatedAt: serverTimestamp(),
            stage: "research_answers",
            role: resolvedRole,
            useCase: resolvedUseCase,
            challenge: resolvedChallenge,
            count: resolvedCount,
            contentTypes,
            handleOrWebsite,
            ...(company ? { company } : {}),
            meta,
            source: "initial-form",
            path: pathNow,
            ua: uaNow,
            answersVersion: 1,
            deterministic: true,
          };
          const detailsAnswersRef = doc(collection(db, "leads", normalizedEmail, "details"), 'answers');
          console.log('[lead-form] attempting setDoc answers (new lead)', { email: normalizedEmail });
          track('answers_attempt', { alreadyOnList: false }, pathNow);
          await setDoc(detailsAnswersRef, payload, { merge: false });
          console.log('[lead-form] details answers setDoc success (new lead)', { email: normalizedEmail, payload });
          track('answers_success', { alreadyOnList: false }, pathNow);
        } catch (e) {
          console.warn("Details save (new lead) failed", e);
          track('answers_error', { alreadyOnList: false, message: (e as any)?.message || 'unknown' }, typeof window !== 'undefined' ? window.location.pathname : undefined);
        }
      } else {
        // already on list: persist full research / enrichment answers in details subcollection
        const extraFeedback = challengeOther.trim();
        const detailsPayload: Record<string, any> = {
          ts: serverTimestamp(),
          stage: "research_answers",
          role: resolvedRole,
          useCase: resolvedUseCase,
          challenge: resolvedChallenge,
          count: resolvedCount,
          contentTypes,
          handleOrWebsite,
          ...(company ? { company } : {}),
          meta,
          source: "research-followup",
          ...(extraFeedback ? { feedback: extraFeedback } : {}),
          path: typeof window !== 'undefined' ? window.location.pathname : '',
          ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          answersVersion: 1,
        };
        try {
          const detailsAnswersRef = doc(collection(db, "leads", normalizedEmail, "details"), 'answers');
          detailsPayload.updatedAt = serverTimestamp();
          detailsPayload.deterministic = true;
          console.log('[lead-form] attempting setDoc answers (existing lead)', { email: normalizedEmail });
          track('answers_attempt', { alreadyOnList: true }, typeof window !== 'undefined' ? window.location.pathname : undefined);
          await setDoc(detailsAnswersRef, detailsPayload, { merge: false });
          console.log('[lead-form] details answers setDoc success (existing lead)', { email: normalizedEmail, detailsPayload });
          track('answers_success', { alreadyOnList: true }, typeof window !== 'undefined' ? window.location.pathname : undefined);
        } catch (e) {
          console.warn("Details save (existing lead) failed", e);
          track('answers_error', { alreadyOnList: true, message: (e as any)?.message || 'unknown' }, typeof window !== 'undefined' ? window.location.pathname : undefined);
        }
        await minDelay;
      }

      track(
        "lead_form_submit",
        {
          role: resolvedRole,
          useCase: resolvedUseCase,
          challenge: resolvedChallenge,
          count: resolvedCount,
          contentTypesLength: contentTypes.length,
          hasCompany: !!company,
          alreadyOnList,
        },
        typeof window !== "undefined" ? window.location.pathname : undefined,
      );

      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("leadEmail", normalizedEmail);
        }
      } catch {}
      setDone(true);
      try {
        const a = getApps().length ? getApp() : undefined;
        if (a) loadAnalytics(a);
      } catch {}
    } catch (err) {
      console.error("Submission failed:", err);
      await minDelay;
      setErrorMsg("Failed to submit. Please try again.");
    }
    setLoading(false);
  };

  const isMobile =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false;
  const scrollIntoViewOnMobile = (el: HTMLElement | null) => {
    if (!el || !isMobile) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {}
  };

  return (
    <section className="container mx-auto px-4 py-16" id="signup">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-700">Waitlist</div>
          <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Join the waitlist — get notified when it's ready
          </h3>
          {/* Prewarm firebase when user expresses intent (focus email field in step 1) */}
          {step === 1 && (
            <input
              className="sr-only absolute"
              tabIndex={-1}
              aria-hidden="true"
              onFocus={() => {
                loadFirebase();
              }}
            />
          )}
          {!done ? (
            <div className="mt-6 space-y-6">
              {step === 1 && (
                <div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="role-select"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Who are you?
                      </label>
                      <select
                        id="role-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        onFocus={(e) => scrollIntoViewOnMobile(e.currentTarget)}
                        className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      >
                        {[...roles, "Other"].map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      {role === "Other" && (
                        <input
                          id="role-other-input"
                          className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                          placeholder="Tell us your role"
                          value={roleOther}
                          onChange={(e) => setRoleOther(e.target.value)}
                          onFocus={(e) =>
                            scrollIntoViewOnMobile(e.currentTarget)
                          }
                          enterKeyHint="next"
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="goal-select"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Primary goal
                      </label>
                      <select
                        id="goal-select"
                        value={useCase}
                        onChange={(e) => setUseCase(e.target.value)}
                        onFocus={(e) => scrollIntoViewOnMobile(e.currentTarget)}
                        className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      >
                        {[...goals, "Other"].map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      {useCase === "Other" && (
                        <input
                          id="goal-other-input"
                          className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                          placeholder="What's your goal?"
                          value={useCaseOther}
                          onChange={(e) => setUseCaseOther(e.target.value)}
                          onFocus={(e) =>
                            scrollIntoViewOnMobile(e.currentTarget)
                          }
                          enterKeyHint="next"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    What content types?
                  </label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {contentOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleContent(opt)}
                        className={`h-11 rounded-md border px-3 text-sm text-left ${contentTypes.includes(opt) ? "border-[hsl(var(--brand))] bg-[hsl(var(--brand))]/10" : "border-slate-300"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="challenge-select"
                      className="block text-sm font-medium text-slate-700"
                    >
                      What's your biggest content challenge?
                    </label>
                    <select
                      id="challenge-select"
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      onFocus={(e) => scrollIntoViewOnMobile(e.currentTarget)}
                      className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                    >
                      {[...challenges, "Other"].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {challenge === "Other" && (
                      <input
                        id="challenge-other-input"
                        className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                        placeholder="Describe your challenge"
                        value={challengeOther}
                        onChange={(e) => setChallengeOther(e.target.value)}
                        onFocus={(e) => scrollIntoViewOnMobile(e.currentTarget)}
                        enterKeyHint="next"
                      />
                    )}
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <label
                    htmlFor="count-select"
                    className="block text-sm font-medium text-slate-700"
                  >
                    {countLabel}
                  </label>
                  <select
                    id="count-select"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    onFocus={(e) => scrollIntoViewOnMobile(e.currentTarget)}
                    className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                  >
                    {[...sizeBuckets, "Other"].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {count === "Other" && (
                    <input
                      id="count-other-input"
                      className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      placeholder="Enter a size or number"
                      value={countOther}
                      onChange={(e) => setCountOther(e.target.value)}
                    />
                  )}

                  <div className="mt-4">
                    <label
                      htmlFor="handle-or-website"
                      className="block text-sm font-medium text-slate-700"
                    >
                      {role === "Business/Brand" ? "Website" : "Primary handle"}
                    </label>
                    <input
                      id="handle-or-website"
                      name={role === "Business/Brand" ? "url" : "handle"}
                      inputMode={role === "Business/Brand" ? ("url" as const) : ("text" as const)}
                      autoComplete={role === "Business/Brand" ? "url" : "username"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      value={handleOrWebsite}
                      onChange={(e) => setHandleOrWebsite(e.target.value)}
                      onFocus={(e) => scrollIntoViewOnMobile(e.currentTarget)}
                      className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      placeholder={role === "Business/Brand" ? "https://acme.com" : "@yourhandle"}
                      enterKeyHint="next"
                    />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  {!alreadyOnList && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="email-input"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          inputMode="email"
                          autoComplete="email"
                          autoCapitalize="none"
                          autoCorrect="off"
                          required
                          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                          id="email-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={(e) => scrollIntoViewOnMobile(e.currentTarget)}
                          className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                          placeholder="you@company.com"
                          enterKeyHint="next"
                        />
                        {email && !validEmail && (
                          <p className="mt-1 text-xs text-red-600">
                            Enter a valid email address
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="company-input"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Company (optional)
                        </label>
                        <input
                          id="company-input"
                          name="organization"
                          autoComplete="organization"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          onFocus={(e) => scrollIntoViewOnMobile(e.currentTarget)}
                          className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                          placeholder="Acme Inc"
                          enterKeyHint="done"
                        />
                      </div>
                    </div>
                  )}
                  {alreadyOnList && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700" htmlFor="extra-feedback-input">Until launch, want to help us focus? (Optional feedback)</label>
                      <textarea id="extra-feedback-input" rows={4} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]" placeholder="Share a workflow pain, a must-have feature, or a competitor frustration..." value={challengeOther} onChange={(e)=> setChallengeOther(e.target.value)} />
                      <p className="mt-2 text-xs text-slate-500">You already joined via the hero form – this just gives us sharper build signals.</p>
                    </div>
                  )}
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(3)}>
                      Back
                    </Button>
                    <Button
                      onClick={onSubmit}
                      disabled={loading || (!validEmail && !alreadyOnList)}
                      className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
                    >
                      {loading ? "Submitting…" : alreadyOnList ? "Submit" : "Join Waitlist"}
                    </Button>
                  </div>
                  {errorMsg && (
                    <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <div className="text-lg font-semibold text-slate-900 mb-2">
                All set! You're on the waitlist.
              </div>
              <div className="text-slate-700 mb-6">
                We'll email you when it's ready.
              </div>

              {showReferral && !referralSubmitted && (
                <div className="border-t border-slate-200 pt-6">
                  <label
                    htmlFor="referral-source-select"
                    className="text-sm font-medium text-slate-700 mb-2 block"
                  >
                    Just curious, how did you hear about us?
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    This helps us understand how people discover Scriptlyfy
                  </p>
                  <select
                    id="referral-source-select"
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))] mb-4"
                  >
                    <option value="">Select an option (optional)</option>
                    <option value="social">
                      Social media (Twitter, LinkedIn, etc.)
                    </option>
                    <option value="search">
                      Search engine (Google, Bing, etc.)
                    </option>
                    <option value="referral">Word of mouth / Referral</option>
                    <option value="influencer">
                      Content creator / Influencer
                    </option>
                    <option value="community">Online community / Forum</option>
                    <option value="newsletter">Newsletter / Blog</option>
                    <option value="ad">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="text-slate-600"
                      onClick={handleReferralSkip}
                    >
                      Skip
                    </Button>
                    <Button
                      className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
                      onClick={handleReferralSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}

              {referralSubmitted && (
                <div
                  className="text-center text-slate-600 text-sm border-t border-slate-200 pt-6"
                  aria-live="polite"
                >
                  Thanks for your feedback!
                </div>
              )}
            </div>
          )}
          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-slate-600">
            <div className="rounded-lg border border-slate-200 p-3 text-left">
              Minutes not hours
            </div>
            <div className="rounded-lg border border-slate-200 p-3 text-left">
              40x faster
            </div>
            <div className="rounded-lg border border-slate-200 p-3 text-left">
              No spam. Just the launch.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
