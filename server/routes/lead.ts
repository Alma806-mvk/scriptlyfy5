import { RequestHandler } from "express";
import { promises as fs } from "fs";
import path from "path";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const handleLead: RequestHandler = async (req, res) => {
  const { challenge, count, email, company, role, useCase, meta: incomingMeta } = req.body ?? {};
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  try {
    // Everything that is not a known top-level field goes under meta
    const knownKeys = new Set(["challenge", "count", "email", "company", "role", "useCase", "meta"]);
    const extra: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(req.body ?? {})) {
      if (!knownKeys.has(k)) extra[k] = v as unknown;
    }
    const meta: Record<string, unknown> = {
      ...extra,
      ...(typeof incomingMeta === "object" && incomingMeta ? incomingMeta : {}),
    };

    const lead = {
      ts: new Date().toISOString(),
      role: typeof role === "string" ? role : String(role ?? ""),
      useCase: typeof useCase === "string" ? useCase : String(useCase ?? ""),
      challenge: typeof challenge === "string" ? challenge : String(challenge ?? ""),
      count: typeof count === "string" ? count : String(count ?? ""),
      email,
      company: typeof company === "string" ? company : String(company ?? ""),
      meta,
      ua: req.get("user-agent") ?? "",
      ip: req.ip ?? "",
    } as const;

    // 1) Log to console for visibility
    console.log("New lead:", JSON.stringify(lead));

    // 2) Persist to a CSV file (ephemeral in some hosts, great for dev/demo)
    const dataDir = path.join(process.cwd(), "server", "data");
    const csvPath = path.join(dataDir, "leads.csv");
    await fs.mkdir(dataDir, { recursive: true });
    const headers = "ts,role,useCase,challenge,count,email,company,meta,ua,ip\n";
    try {
      await fs.access(csvPath);
    } catch {
      await fs.writeFile(csvPath, headers, "utf8");
    }
    const toCsv = (
      [lead.ts, lead.role, lead.useCase, lead.challenge, lead.count, lead.email, lead.company, JSON.stringify(lead.meta ?? {}), lead.ua, lead.ip]
        .map((v) => `"${String(v).replaceAll('"', '""')}"`)
        .join(",") + "\n"
    );
    await fs.appendFile(csvPath, toCsv, "utf8");

    // 3) Optional webhook (Zapier/Make/etc.) via env var LEADS_WEBHOOK_URL
    const webhook = process.env.LEADS_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (err) {
        console.warn("Lead webhook failed:", err);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to save lead" });
  }
};
