import Image from "next/image";
import type { Campaign } from "@/lib/products";
import Reveal from "./Reveal";
import SwipeGallery from "./SwipeGallery";

export default function CampaignSection({ campaign: c }: { campaign: Campaign }) {
  return (
    <article id={c.slug} aria-labelledby={`${c.slug}-title`}>
      {/* Full-bleed key visual: the first thing visitors see after the hero. */}
      <div className="relative h-[85svh] min-h-[520px] w-full overflow-hidden bg-silver-100">
        {c.keyVisualMobile && (
          <Image
            src={c.keyVisualMobile.src}
            alt={c.keyVisualMobile.alt}
            fill
            sizes="100vw"
            className="object-cover sm:hidden"
          />
        )}
        <Image
          src={c.keyVisual.src}
          alt={c.keyVisual.alt}
          fill
          sizes="100vw"
          className={`object-cover object-[50%_35%] ${c.keyVisualMobile ? "hidden sm:block" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 text-white md:px-10 md:pb-16">
          <p className="label !text-white/80">In collaboration with {c.partner}</p>
          <h2 id={`${c.slug}-title`} className="display mt-3 text-5xl md:text-8xl">
            {c.name}
          </h2>
          <p className="display mt-3 text-2xl md:text-4xl">
            <em className="!text-white">{c.tagline}</em>
          </p>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-white px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition hover:bg-maroon hover:text-white"
          >
            Explore Campaign ↗
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-lg text-silver-500">{c.intro}</p>
            <p className="label mt-10">The concept</p>
            <p className="mt-3 text-lg text-silver-500">{c.concept}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="label">Featured products</p>
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

        <div className="mt-16">
          <SwipeGallery images={c.gallery} label={`${c.name} campaign visuals`} />
        </div>
      </div>
    </article>
  );
}
