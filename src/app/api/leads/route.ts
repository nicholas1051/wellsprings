import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some fields are invalid. Please review and try again.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead = parsed.data;
  const leadId = crypto.randomUUID();

  const subject =
    lead.leadType === "viewing"
      ? `New viewing request — ${lead.unit} — ${lead.date} ${lead.time}`
      : lead.leadType === "callback"
        ? `New callback request — ${lead.name}`
        : `New enquiry — ${lead.unit} — ${lead.intent}`;

  const lines = [
    `Lead type: ${lead.leadType}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
  ];
  if (lead.leadType === "callback") {
    lines.push(`Phone 2: ${lead.phone2 || "(not provided)"}`);
    lines.push(`Email: ${lead.email || "(not provided)"}`);
    if (lead.bestTime) {
      lines.push(`Best time to call: ${lead.bestTime}`);
    }
  } else {
    lines.push(`Unit: ${lead.unit}`);
    lines.push(`Email: ${lead.email || "(not provided)"}`);
    if (lead.leadType === "viewing") {
      lines.push(`Preferred: ${lead.date} at ${lead.time}`);
    } else {
      lines.push(`Intent: ${lead.intent}`);
      if (lead.message) {
        lines.push(`Message: ${lead.message}`);
      }
    }
  }

  if (process.env.RESEND_API_KEY && process.env.LEADS_TO_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Website Leads <${process.env.LEADS_FROM_EMAIL ?? "leads@example.com"}>`,
        to: process.env.LEADS_TO_EMAIL,
        subject,
        text: lines.join("\n"),
      }),
    });
  }

  console.info(`[lead:${leadId}]`, lines.join("\n"));

  return NextResponse.json({ ok: true, id: leadId }, { status: 201 });
}
