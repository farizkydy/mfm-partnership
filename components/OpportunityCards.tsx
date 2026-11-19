"use client";

import { opportunities } from "@/lib/site";
import { TYPE_EVENT } from "./CollabForm";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/** Typographic list (not cards). Each row jumps to the form with its partnership type preselected. */
export default function OpportunityCards() {
  return (
    <ul className="mt-16 border-b border-white/25 md:mt-24">
      {opportunities.map((o, i) => (
        <li key={o.title} className="border-t border-white/25">
          <Reveal delay={i * 0.05}>
            <a
              href="#collab"
              onClick={() => window.dispatchEvent(new CustomEvent(TYPE_EVENT, { detail: o.type }))}
              className="group -mx-5 grid items-start gap-4 px-5 py-8 transition-colors duration-300 hover:bg-red md:-mx-10 md:grid-cols-12 md:gap-6 md:px-10 md:py-12"
            >
              <span className="num text-3xl text-white/40 transition-colors group-hover:text-white md:col-span-1 md:text-4xl">
                {pad(i + 1)}
              </span>
              <h3 className="display display-md md:col-span-6">{o.title}</h3>
              <p className="max-w-sm text-white/70 transition-colors group-hover:text-white md:col-span-4">{o.body}</p>
              <span className="label !text-white md:col-span-1 md:text-right" aria-hidden>
                Start →
              </span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
