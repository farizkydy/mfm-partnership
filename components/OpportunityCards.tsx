"use client";

import { opportunities } from "@/lib/site";
import { TYPE_EVENT } from "./CollabForm";
import Reveal from "./Reveal";

export default function OpportunityCards() {
  return (
    <div className="mt-16 grid gap-px bg-silver-300 md:grid-cols-2">
      {opportunities.map((o, i) => (
        <Reveal key={o.title} delay={(i % 2) * 0.08} className="flex flex-col bg-paper p-8 md:p-12">
          <h3 className="display text-3xl md:text-4xl">{o.title}</h3>
          <p className="mt-5 flex-1 text-silver-500">{o.body}</p>
          <a
            href="#collab"
            onClick={() => window.dispatchEvent(new CustomEvent(TYPE_EVENT, { detail: o.type }))}
            className="label mt-8 self-start text-maroon underline-offset-4 hover:underline"
          >
            Start this collaboration →
          </a>
        </Reveal>
      ))}
    </div>
  );
}
