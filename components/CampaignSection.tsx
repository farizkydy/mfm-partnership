import Image from "next/image";
import type { Campaign } from "@/lib/products";
import Reveal from "./Reveal";
import SwipeGallery from "./SwipeGallery";

export default function CampaignSection({ campaign: c }: { campaign: Campaign }) {
  return (
    <article className="mt-16 first:mt-0" aria-labelledby={`${c.slug}-title`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-silver-100 sm:aspect-[3/2]">
        <Image
          src={c.keyVisual.src}
          alt={c.keyVisual.alt}
          fill
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        <Reveal>
          <p className="label">In collaboration with {c.partner}</p>
          <h3 id={`${c.slug}-title`} className="display mt-4 text-5xl md:text-7xl">
            {c.name}
          </h3>
          <p className="display mt-4 text-2xl text-maroon md:text-3xl">
            <em>{c.tagline}</em>
          </p>
          <p className="mt-6 max-w-md text-lg text-silver-500">{c.intro}</p>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-maroon px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-ink"
          >
            Explore Campaign ↗
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="label">The concept</p>
          <p className="mt-3 text-lg text-silver-500">{c.concept}</p>

          <p className="label mt-10">Featured products</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.featuredProducts.map((p) => (
              <li key={p} className="border border-silver-300 px-3 py-1.5 text-sm">
                {p}
              </li>
            ))}
          </ul>

          {c.stats && (
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {c.stats.map((s) => (
                <div key={s.label}>
                  <dt className="display text-5xl text-maroon">{s.value}</dt>
                  <dd className="label mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </div>

      <div className="mt-12">
        <SwipeGallery images={c.gallery} label={`${c.name} campaign visuals`} />
      </div>
    </article>
  );
}
