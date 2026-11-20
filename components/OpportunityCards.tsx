"use client";

import Image from "next/image";
import { OPPORTUNITY_IMAGES } from "@/lib/products";
import { opportunities } from "@/lib/site";
import { TYPE_EVENT } from "./CollabForm";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Four categories, four different image treatments, on an asymmetric grid.
 * Each tile jumps to the form with its partnership type preselected.
 */
const tiles = [
  // Silver-framed, greyscale that warms to colour on hover.
  {
    cls: "md:col-span-7",
    frame: "chrome-back aspect-[16/10]",
    img: "grayscale transition duration-700 group-hover:grayscale-0",
  },
  // Arch crop.
  {
    cls: "md:col-span-4 md:col-start-9 md:mt-32",
    frame: "aspect-[3/4] rounded-t-[999px]",
    img: "transition duration-700 group-hover:scale-105",
  },
  // Maroon duotone: greyscale multiplied over maroon.
  {
    cls: "md:col-span-5 md:col-start-2",
    frame: "aspect-[4/5] bg-maroon-mid",
    img: "mix-blend-multiply grayscale contrast-125 transition duration-700 group-hover:mix-blend-normal group-hover:grayscale-0",
  },
  // Monochrome with fine chrome grid lines.
  {
    cls: "md:col-span-6 md:col-start-7 md:mt-24",
    frame: "aspect-[5/4]",
    img: "grayscale contrast-110 transition duration-700 group-hover:scale-105",
    grid: true,
  },
];

export default function OpportunityCards() {
  return (
    <ul className="mt-16 grid gap-x-8 gap-y-20 md:mt-28 md:grid-cols-12 md:gap-y-28">
      {opportunities.map((o, i) => {
        const t = tiles[i % tiles.length];
        const img = OPPORTUNITY_IMAGES[i % OPPORTUNITY_IMAGES.length];
        return (
          <li key={o.title} className={t.cls}>
            <Reveal delay={(i % 2) * 0.08}>
              <a
                href="#collab"
                onClick={() => window.dispatchEvent(new CustomEvent(TYPE_EVENT, { detail: o.type }))}
                className="group block"
              >
                <div className={`relative overflow-hidden ${t.frame}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`object-cover ${t.img}`}
                    loading="lazy"
                  />
                  {t.grid && (
                    <div
                      className="pointer-events-none absolute inset-0 opacity-60"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                      }}
                      aria-hidden
                    />
                  )}
                  <span className="label absolute right-3 top-3 !text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                    Start →
                  </span>
                </div>

                <div className="mt-6 flex items-start gap-5">
                  <span className="num chrome-text text-[clamp(4.5rem,8vw,7.5rem)]" aria-hidden>
                    {pad(i + 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="chrome-line mb-4" aria-hidden />
                    <h3 className="display display-md transition-transform duration-500 group-hover:translate-x-2">{o.title}</h3>
                    <p className="mt-3 max-w-sm text-white/70">{o.body}</p>
                  </div>
                </div>
              </a>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
