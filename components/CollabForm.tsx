"use client";

import { useState } from "react";
import { EMAIL } from "@/lib/products";

type Status = "idle" | "sending" | "ok" | "error";

const field =
  "w-full border-b border-silver-300 bg-transparent py-3 text-lg placeholder:text-silver-500 focus:border-maroon focus:outline-none";

export default function CollabForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailto, setMailto] = useState(`mailto:${EMAIL}?subject=${encodeURIComponent("Lets Work Together:")}`);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setErrors(json.errors ?? {});
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setMailto(
      `mailto:${EMAIL}?subject=${encodeURIComponent(`Lets Work Together: ${data.type ?? ""}`)}&body=${encodeURIComponent(
        `${data.message ?? ""}\n\n${data.name ?? ""}\n${data.company ?? ""}\n${data.email ?? ""}`,
      )}`,
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <fieldset>
        <legend className="label mb-3">I&apos;m reaching out as</legend>
        <div className="flex gap-6">
          {["Brand", "Influencer / Agency"].map((t, i) => (
            <label key={t} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="type" value={t} defaultChecked={i === 0} className="accent-[var(--maroon)]" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      {[
        { name: "name", label: "Your name", type: "text", auto: "name" },
        { name: "company", label: "Brand / handle", type: "text", auto: "organization" },
        { name: "email", label: "Email", type: "email", auto: "email" },
      ].map((f) => (
        <div key={f.name}>
          <input
            name={f.name}
            type={f.type}
            autoComplete={f.auto}
            placeholder={f.label}
            aria-label={f.label}
            aria-invalid={!!errors[f.name]}
            className={field}
          />
          {errors[f.name] && <p className="mt-1 text-sm text-maroon">{errors[f.name]}</p>}
        </div>
      ))}

      <div>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about the collaboration you have in mind"
          aria-label="Message"
          aria-invalid={!!errors.message}
          className={field}
        />
        {errors.message && <p className="mt-1 text-sm text-maroon">{errors.message}</p>}
      </div>

      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-maroon px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-ink disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <a href={mailto} className="label underline-offset-4 hover:text-maroon hover:underline">
          Or email {EMAIL}
        </a>
      </div>

      <p role="status" aria-live="polite" className="text-sm">
        {status === "ok" && "Thank you. We've received your inquiry and will be in touch."}
        {status === "error" && !Object.keys(errors).length && "Something went wrong. Please use the email link above."}
      </p>
    </form>
  );
}
