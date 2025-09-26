import { useState } from "react";
import { Button } from "@/components/ui/button";

const referralSources = [
  "Social media (Twitter, LinkedIn, etc.)",
  "Search engine (Google, Bing, etc.)",
  "Word of mouth / Referral",
  "Content creator / Influencer",
  "Online community / Forum",
  "Newsletter / Blog",
  "Advertisement",
  "Other",
];

interface SuccessScreenProps {
  email: string;
}

export default function SuccessScreen({ email }: SuccessScreenProps) {
  const [referralSource, setReferralSource] = useState(referralSources[0]);
  const [referralSourceOther, setReferralSourceOther] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitReferralSource = async () => {
    setLoading(true);
    const resolvedReferralSource = referralSource === "Other" ? referralSourceOther.trim() : referralSource;
    
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          referralSource: resolvedReferralSource, 
          type: "referral_update",
          meta: {
            referralSourceSelection: referralSource,
            referralSourceOther,
          }
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit referral source:", err);
      setSubmitted(true); // Still mark as submitted to avoid retry loops
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mt-4 text-slate-700 mb-6">
        <div className="text-lg font-semibold text-green-700 mb-2">🎉 All set! You're on the waitlist.</div>
        <div>We'll email you when it's ready.</div>
      </div>
      
      {!submitted ? (
        <div className="border-t border-slate-200 pt-6">
          <div>
            <label htmlFor="success-referral-select" className="block text-sm font-medium text-slate-700 mb-2">
              Just curious, how did you hear about us? 🤔
            </label>
            <p className="text-xs text-slate-500 mb-3">This helps us understand how people discover Scriptlyfy (optional)</p>
            <select
              id="success-referral-select"
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
              className="w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
            >
              {referralSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            {referralSource === "Other" && (
              <input
                value={referralSourceOther}
                onChange={(e) => setReferralSourceOther(e.target.value)}
                className="mt-3 w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                placeholder="Please specify..."
              />
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setSubmitted(true)}
              className="text-slate-600"
            >
              Skip
            </Button>
            <Button 
              onClick={submitReferralSource} 
              disabled={loading || (referralSource === "Other" && !referralSourceOther.trim())} 
              className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
            >
              {loading ? "Submitting…" : "Submit"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-t border-slate-200 pt-6">
          <div className="text-sm text-slate-600">
            ✅ Thanks for the feedback! It really helps us improve.
          </div>
        </div>
      )}
    </div>
  );
}