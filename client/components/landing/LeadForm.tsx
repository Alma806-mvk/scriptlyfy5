import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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

export default function LeadForm() {
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

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validEmail = useMemo(() => isValidEmail(email), [email]);

  const countLabel = useMemo(() => {
    if (role === "Business/Brand") return "Company size";
    return "Audience size";
  }, [role]);

  const toggleContent = (c: string) => {
    setContentTypes((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const onSubmit = async () => {
    if (!validEmail) return;
    setLoading(true);
    const resolvedRole = role === "Other" ? roleOther.trim() : role;
    const resolvedUseCase = useCase === "Other" ? useCaseOther.trim() : useCase;
    const resolvedChallenge = challenge === "Other" ? challengeOther.trim() : challenge;
    const resolvedCount = count === "Other" ? countOther.trim() : count;

    const meta = {
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
    };
    try {
      await addDoc(collection(db, "leads"), {
        ts: serverTimestamp(),
        role: resolvedRole,
        useCase: resolvedUseCase,
        challenge: resolvedChallenge,
        count: resolvedCount,
        email,
        company,
        meta,
        ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      });
      // Also post to server-side endpoint as a backup / for CSV
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: resolvedRole, useCase: resolvedUseCase, challenge: resolvedChallenge, count: resolvedCount, email, company, meta }),
      }).catch(() => {});
      setDone(true);
    } catch (err) {
      // Log the Firestore error to help debugging (security rules, network, project config)
      // eslint-disable-next-line no-console
      console.error("Firestore addDoc failed:", err);
      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: resolvedRole, useCase: resolvedUseCase, challenge: resolvedChallenge, count: resolvedCount, email, company, meta }),
        });
        setDone(true);
      } finally {
        setLoading(false);
      }
      return;
    }
    setLoading(false);
  };

  return (
    <section className="container mx-auto px-4 py-16" id="signup">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-700">Waitlist</div>
          <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Join the waitlist — get notified when it’s ready
          </h3>
                    {!done ? (
            <div className="mt-6 space-y-6">
              {step === 1 && (
                <div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Who are you?</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      >
                        {[...roles, "Other"].map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      {role === "Other" && (
                        <input
                          className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                          placeholder="Tell us your role"
                          value={roleOther}
                          onChange={(e) => setRoleOther(e.target.value)}
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Primary goal</label>
                      <select
                        value={useCase}
                        onChange={(e) => setUseCase(e.target.value)}
                        className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      >
                        {[...goals, "Other"].map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                      {useCase === "Other" && (
                        <input
                          className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                          placeholder="What’s your goal?"
                          value={useCaseOther}
                          onChange={(e) => setUseCaseOther(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => setStep(2)} className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90">Next</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm font-medium text-slate-700">What content types?</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {contentOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleContent(opt)}
                        className={`h-10 rounded-md border px-3 text-sm text-left ${contentTypes.includes(opt) ? "border-[hsl(var(--brand))] bg-[hsl(var(--brand))]/10" : "border-slate-300"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700">What's your biggest content challenge?</label>
                    <select
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                    >
                      {[...challenges, "Other"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {challenge === "Other" && (
                      <input
                        className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                        placeholder="Describe your challenge"
                        value={challengeOther}
                        onChange={(e) => setChallengeOther(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button onClick={() => setStep(3)} className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90">Next</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-sm font-medium text-slate-700">{countLabel}</label>
                  <select
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                  >
                    {[...sizeBuckets, "Other"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {count === "Other" && (
                    <input
                      className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      placeholder="Enter a size or number"
                      value={countOther}
                      onChange={(e) => setCountOther(e.target.value)}
                    />
                  )}

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700">{role === "Business/Brand" ? "Website" : "Primary handle"}</label>
                    <input
                      value={handleOrWebsite}
                      onChange={(e) => setHandleOrWebsite(e.target.value)}
                      className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      placeholder={role === "Business/Brand" ? "https://acme.com" : "@yourhandle"}
                    />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                    <Button onClick={() => setStep(4)} className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90">Next</Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Email</label>
                      <input
                        type="email"
                        required
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        aria-invalid={!!email && !validEmail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                        placeholder="you@company.com"
                      />
                      {email && !validEmail && (
                        <p className="mt-1 text-xs text-red-600">Enter a valid email address</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Company (optional)</label>
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-2 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                        placeholder="Acme Inc"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                    <Button onClick={onSubmit} disabled={loading || !validEmail} className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90">
                      {loading ? "Submitting…" : "Join Waitlist"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 text-slate-700">All set! You’re on the waitlist. We’ll email you when it’s ready.</div>
          )}
          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-slate-600">
            <div className="rounded-lg border border-slate-200 p-3 text-left">Minutes not hours</div>
            <div className="rounded-lg border border-slate-200 p-3 text-left">40x faster</div>
            <div className="rounded-lg border border-slate-200 p-3 text-left">No spam. Just the launch.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
