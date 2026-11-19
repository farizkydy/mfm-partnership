"use client";

import { useEffect, useState } from "react";
import { EMAIL, PARTNERSHIP_TYPES } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

export const TYPE_EVENT = "mfm:partnership-type";

const field =
  "w-full border-b border-line bg-transparent py-3 text-base md:text-lg placeholder:text-mute focus:border-red focus:outline-none";

const inputs = [
  { name: "name", label: "Full name", type: "text", auto: "name" },
  { name: "company", label: "Company / brand / creator name", type: "text", auto: "organization" },
  { name: "email", label: "Email address", type: "email", auto: "email" },
  { name: "country", label: "Country", type: "text", auto: "country-name" },
  { name: "link", label: "Website / social link (optional)", type: "text", auto: "url" },
];

export default function CollabForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [type, setType] = useState("");
  const [mailto, setMailto] = useState(`mailto:${EMAIL}?subject=${encodeURIComponent("Lets Work Together:")}`);

  // Partnership cards above the form preselect the matching type.
  useEffect(() => {
    const onType = (e: Event) => setType((e as CustomEvent<string>).detail);
    window.addEventListener(TYPE_EVENT, onType);
    return () => window.removeEventListener(TYPE_EVENT, onType);
  }, []);

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
        setType("");
      } else {
        setErrors(json.errors ?? {});
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setMailto(
      `mailto:${EMAIL}?subject=${encodeURIComponent(`Lets Work Together: ${data.type ?? ""}`)}&body=${encodeURIComponent(
        [data.message, "", data.name, data.company, data.email, data.country, data.link, data.reference]
          .filter((v) => v !== undefined)
          .join("\n"),
      )}`,
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-sm text-red">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {inputs.map((f) => (
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
          {err(f.name)}
        </div>
      ))}

      <div>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Partnership type"
          aria-invalid={!!errors.type}
          className={`${field} ${type ? "" : "text-mute"}`}
        >
          <option value="" disabled>
            Partnership type
          </option>
          {PARTNERSHIP_TYPES.map((t) => (
            <option key={t} value={t} className="text-ink">
              {t}
            </option>
          ))}
        </select>
        {err("type")}
      </div>

      <div>
        <textarea
          name="message"
          rows={4}
          placeholder="Brief description of your proposal"
          aria-label="Brief description of your proposal"
          aria-invalid={!!errors.message}
          className={field}
        />
        {err("message")}
      </div>

      <div>
        <input
          name="reference"
          type="text"
          placeholder="Portfolio / reference link (optional)"
          aria-label="Additional reference or portfolio link"
          className={field}
        />
      </div>

      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-ink disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Your Proposal"}
        </button>
        <a href={mailto} className="label underline-offset-4 hover:text-red hover:underline">
          Or email {EMAIL}
        </a>
      </div>

      <p role="status" aria-live="polite" className="text-sm">
        {status === "ok" && "Thank you. We've received your proposal and will be in touch."}
        {status === "error" && !Object.keys(errors).length && "Something went wrong. Please use the email link above."}
      </p>
    </form>
  );
}
