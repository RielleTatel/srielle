import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  // Honeypot — bots fill arbitrary fields, humans leave it empty.
  website?: unknown;
};

const isNonEmptyString = (value: unknown, max = 5000): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= max;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return Response.json({ ok: true });
  }

  const { name, email, subject, message } = body;

  if (
    !isNonEmptyString(name, 200) ||
    !isNonEmptyString(email, 200) ||
    !isNonEmptyString(message, 5000) ||
    !EMAIL_PATTERN.test(email)
  ) {
    return Response.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL ?? "tatelgabrielle19@gmail.com";
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "Srielle Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json(
      { error: "Email service is not configured. Try again later." },
      { status: 500 },
    );
  }

  const safeSubject = isNonEmptyString(subject, 200) ? subject : "New message from your portfolio";
  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:#181714;color:#f5f3ee;padding:24px;border-radius:12px;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7c9b73;">New message · srielle</p>
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;letter-spacing:-0.02em;">${escapeHtml(safeSubject)}</h1>
      <p style="margin:0 0 4px;font-size:13px;color:#a8a193;">From</p>
      <p style="margin:0 0 16px;font-size:15px;"><strong>${escapeHtml(name)}</strong> &middot; <a href="mailto:${escapeHtml(email)}" style="color:#7c9b73;">${escapeHtml(email)}</a></p>
      <p style="margin:0 0 4px;font-size:13px;color:#a8a193;">Message</p>
      <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6;">${escapeHtml(message)}</p>
    </div>
  `;

  const text = `New message from ${name} <${email}>\n\nSubject: ${safeSubject}\n\n${message}`;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    replyTo: email,
    subject: `[Portfolio] ${safeSubject}`,
    html,
    text,
  });

  if (error) {
    return Response.json(
      { error: "We couldn't send your message right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
