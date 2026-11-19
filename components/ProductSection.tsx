"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import Reveal from "./Reveal";
import SwipeGallery from "./SwipeGallery";

export default function ProductSection({ product }: { product: Product }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <article
      id={product.slug}
      className="scroll-mt-16 border-t border-silver-300 py-16 md:py-24"
      aria-labelledby={`${product.slug}-title`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div>
              <p className="label">
                {product.number} · {product.category}
              </p>
              <h3 id={`${product.slug}-title`} className="display mt-4 text-5xl md:text-7xl">
                {product.name}
              </h3>
              <p className="mt-6 max-w-md text-lg text-silver-500">{product.tagline}</p>
              {product.link && (
                <a
                  href={product.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label mt-6 inline-block hover:text-maroon"
                >
                  {product.link.label} ↗
                </a>
              )}
              {product.stats && (
                <dl className="mt-10 grid max-w-md grid-cols-2 gap-6">
                  {product.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="display text-5xl text-maroon">{s.value}</dt>
                      <dd className="label mt-1">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <ul className="self-end divide-y divide-silver-300 border-y border-silver-300">
              {product.details.map((d, i) => {
                const open = openIdx === i;
                return (
                  <li key={d.label}>
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between py-4 text-left"
                    >
                      <span className="label !text-ink">{d.label}</span>
                      <span aria-hidden className="text-xl text-maroon">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                    {open && <p className="pb-5 text-silver-500">{d.body}</p>}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <div className="mt-12 space-y-10 md:mt-16">
          <SwipeGallery images={product.kv} label={`${product.name} campaign visuals`} />
          {product.pack.length > 0 && (
            <SwipeGallery images={product.pack} label={`${product.name} packshots`} fit="contain" />
          )}
        </div>
      </div>
    </article>
  );
}
