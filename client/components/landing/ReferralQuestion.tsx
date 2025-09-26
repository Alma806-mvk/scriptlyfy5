import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ReferralQuestion() {
  const [referralSource, setReferralSource] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (referralSource) {
      // Send to server
      try {
        await fetch("/api/referral", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: referralSource }),
        });
      } catch (err) {
        console.log("Referral tracking failed:", err);
      }
    }
    setSubmitted(true);
  };

  const handleSkip = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center text-slate-600">
        <div className="text-sm">Thanks for your feedback! 😊</div>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-200 pt-6">
      <label htmlFor="referral-select" className="block text-sm font-medium text-slate-700 mb-2">
        Just curious, how did you hear about us? 🤔
      </label>
      <p className="text-xs text-slate-500 mb-3">This helps us understand how people discover Scriptlyfy</p>
      <select 
        id="referral-select"
        value={referralSource}
        onChange={(e) => setReferralSource(e.target.value)}
        className="w-full h-12 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))] mb-4"
      >
        <option value="">Select an option (optional)</option>
        <option value="social">Social media (Twitter, LinkedIn, etc.)</option>
        <option value="search">Search engine (Google, Bing, etc.)</option>
        <option value="referral">Word of mouth / Referral</option>
        <option value="influencer">Content creator / Influencer</option>
        <option value="community">Online community / Forum</option>
        <option value="newsletter">Newsletter / Blog</option>
        <option value="ad">Advertisement</option>
        <option value="other">Other</option>
      </select>
      <div className="flex gap-3">
        <Button variant="outline" className="text-slate-600" onClick={handleSkip}>Skip</Button>
        <Button className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}