const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const type = str("type");

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

  // TODO: deliver via an email service (Resend/Formspree). Until then the form
  // shows the mailto fallback and the inquiry is logged server-side only.
  console.log("[inquiry]", { type, name, company, email, messageLength: message.length });

  return Response.json({ ok: true });
}
