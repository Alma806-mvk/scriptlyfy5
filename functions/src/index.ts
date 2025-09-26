import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import crypto from "node:crypto";

initializeApp();
const db = getFirestore();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hashEmail(email: string) {
  return crypto.createHash("sha256").update(email).digest("hex");
}

export const lead = onRequest({ region: "us-central1" }, async (req, res) => {
    const ct = (req.headers?.["content-type"] as string | undefined) || undefined;
    console.log("[lead] request", { method: req.method, path: (req as any).path || req.url, contentType: ct });

    // Handle preflight just in case (even though same-origin shouldn't need CORS)
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }
    // Only allow POST
    if (req.method !== "POST") {
      res.set("Allow", "POST");
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      let body: any = req.body;
      if (typeof body === "string") {
        try { body = JSON.parse(body); } catch {}
      }
      const {
        type,
        email,
        role,
        useCase,
        challenge,
        count,
        company,
        meta,
        referralSource,
      } = (body ?? {}) as Record<string, unknown>;

  const normalizedEmail = String(email ?? "").trim().toLowerCase();
  console.log("[lead] incoming email", normalizedEmail);
      if (!isValidEmail(normalizedEmail)) {
        res.status(400).json({ error: "Valid email is required" });
        return;
      }

      // Handle referral update as fire-and-forget write
      if (type === "referral_update") {
        try {
          const docId = hashEmail(normalizedEmail);
          await db
            .collection("lead_referrals")
            .doc(docId)
            .set(
              {
                email: normalizedEmail,
                referralSource: typeof referralSource === "string" ? referralSource : String(referralSource ?? ""),
                updatedAt: Timestamp.now(),
              },
              { merge: true },
            );
        } catch (e) {
          // Non-fatal
          console.warn("referral_update write failed", e);
        }
        res.status(200).json({ ok: true });
        return;
      }

      // Enforce max two submissions per email using a transaction
      const leadsCol = db.collection("leads");
      const now = FieldValue.serverTimestamp();

      await db.runTransaction(async (tx) => {
        const q = leadsCol.where("email", "==", normalizedEmail).limit(2);
        const snap = await tx.get(q);
        if (snap.size >= 2) {
          const err: any = new Error("limit");
          err.code = 429;
          throw err;
        }

        const doc = leadsCol.doc();
        tx.set(doc, {
          ts: now,
          role: typeof role === "string" ? role : String(role ?? ""),
          useCase: typeof useCase === "string" ? useCase : String(useCase ?? ""),
          challenge: typeof challenge === "string" ? challenge : String(challenge ?? ""),
          count: typeof count === "string" ? count : String(count ?? ""),
          email: normalizedEmail,
          company: typeof company === "string" ? company : String(company ?? ""),
          meta: typeof meta === "object" && meta ? meta : {},
          ua: (req.headers?.["user-agent"] as string | undefined) || "",
          ip: req.ip ?? "",
        });
      });

      // Optional webhook (Zapier/Make/etc.)
      try {
        const webhook = process.env.LEADS_WEBHOOK_URL;
        if (webhook) {
          await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ts: new Date().toISOString(),
              role,
              useCase,
              challenge,
              count,
              email: normalizedEmail,
              company,
              meta,
            }),
          });
        }
      } catch (e) {
        console.warn("Lead webhook failed:", e);
      }

      res.status(200).json({ ok: true });
      return;
      } catch (e: any) {
        console.error("[lead] error", e?.stack || e);
      if (e && (e.code === 429 || e.message === "limit")) {
        res.status(429).json({ error: "You’ve already joined twice with this email." });
        return;
      }
      console.error("/api/lead error", e);
      res.status(500).json({ error: "Failed to save lead" });
      return;
    }
  });
