const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = ["Brand", "Influencer / Agency"];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ errors: { message: "Invalid request." } }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = str("name");
  const company = str("company");
  const email = str("email");
  const message = str("message");
  const type = TYPES.includes(str("type")) ? str("type") : "Brand";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!company) errors.company = "Please tell us your brand or handle.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "Please add a few more details.";
  if (name.length > 120 || company.length > 160 || email.length > 160 || message.length > 4000) {
    errors.message = "Input is too long.";
  }
  if (Object.keys(errors).length) {
    return Response.json({ errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[inquiry] RESEND_API_KEY is not set; inquiry was NOT delivered.");
    return Response.json({ error: "Email is not configured." }, { status: 503 });
  }

  const to = process.env.INQUIRY_TO_EMAIL || "mad.natasya@gmail.com";
  const from = process.env.INQUIRY_FROM_EMAIL || "Mad For Makeup Partnerships <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Partnership inquiry (${type}): ${company}`.slice(0, 200),
        // Plain text only, so visitor input can never be interpreted as HTML.
        text: `Type: ${type}\nName: ${name}\nBrand / handle: ${company}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[inquiry] Resend rejected the email:", res.status, await res.text());
      return Response.json({ error: "Could not send." }, { status: 502 });
    }
  } catch (err) {
    console.error("[inquiry] Resend request failed:", err);
    return Response.json({ error: "Could not send." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
