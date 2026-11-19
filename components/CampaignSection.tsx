import Image from "next/image";
import type { Campaign } from "@/lib/products";
import ParallaxImage from "./ParallaxImage";
import Reveal from "./Reveal";
import SwipeGallery from "./SwipeGallery";

const pad = (n: number) => String(n).padStart(2, "0");

// Asymmetric mosaic (desktop). Auto-placement fills a 12-col grid of mixed spans.
const mosaic = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-4",
  "md:col-span-4 md:row-span-2",
  "md:col-span-4",
  "md:col-span-6",
  "md:col-span-6",
];

/** The campaign takeover: first major visual after the hero. */
export default function CampaignSection({ campaign: c, index = 0 }: { campaign: Campaign; index?: number }) {
  return (
    <article id={c.slug} aria-labelledby={`${c.slug}-title`}>
      {/* Full-bleed key visual */}
      <div className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-sand">
        {c.keyVisualMobile && (
          <div className="absolute inset-0 sm:hidden">
            <ParallaxImage img={c.keyVisualMobile} priority />
          </div>
        )}
        <div className={`absolute inset-0 ${c.keyVisualMobile ? "hidden sm:block" : ""}`}>
          <ParallaxImage img={c.keyVisual} className="object-[50%_35%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/25" aria-hidden />

        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-[110rem] items-start justify-between px-5 pt-24 text-white md:px-10">
          <p className="label !text-white/85">Featured collaboration</p>
          <p className="num text-5xl md:text-7xl">{pad(index + 1)}</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[110rem] px-5 pb-10 text-white md:px-10 md:pb-14">
          <p className="label !text-white/85">In collaboration with {c.partner}</p>
          <h2 id={`${c.slug}-title`} className="display display-xl mt-3">
            {c.name}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            <p className="display display-md">
              <em className="!text-white">{c.tagline}</em>
            </p>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn btn-white">
              Explore Campaign ↗
            </a>
          </div>
        </div>
      </div>

      {/* Story + numbers */}
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="text-lg">{c.intro}</p>
            <p className="label mt-10">The concept</p>
            <p className="mt-3 text-lg text-mute">{c.concept}</p>

            <p className="label mt-10">Featured products</p>
            <ol className="mt-3 divide-y divide-line border-y border-line">
              {c.featuredProducts.map((p, i) => (
                <li key={p} className="flex items-baseline gap-4 py-3">
                  <span className="label w-6">{pad(i + 1)}</span>
                  <span className="display text-xl md:text-2xl">{p}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          {c.stats && (
            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-12">
                {c.stats.map((s) => (
                  <div key={s.label} className="border-t border-ink pt-4">
                    <dt className="num text-[clamp(4rem,11vw,9rem)] text-red">{s.value}</dt>
                    <dd className="label mt-3 max-w-[14ch] !text-ink">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        {/* Gallery: mosaic on desktop, swipe strip on mobile */}
        <div className="mt-20 md:hidden">
          <SwipeGallery images={c.gallery} label={`${c.name} campaign visuals`} />
        </div>
        <ul className="mt-20 hidden gap-3 md:grid md:auto-rows-[20vw] md:grid-cols-12 xl:auto-rows-[15.5rem]">
          {c.gallery.slice(0, mosaic.length).map((img, i) => (
            <li key={img.src} className={`zoom relative overflow-hidden bg-sand ${mosaic[i]}`}>
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1280px) 33vw, 33vw" className="object-cover" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Additional campaigns render as compact case-study tiles under the takeover. */
export function CampaignTile({ campaign: c, index }: { campaign: Campaign; index: number }) {
  return (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="zoom relative aspect-[4/5] overflow-hidden bg-sand">
        <Image src={c.keyVisualMobile?.src ?? c.keyVisual.src} alt={c.keyVisual.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" loading="lazy" />
      </div>
      <p className="label mt-4">
        {pad(index + 1)} · with {c.partner}
      </p>
      <h3 className="display display-md mt-1 group-hover:text-red">{c.name}</h3>
      <p className="mt-2 text-mute">{c.tagline}</p>
    </a>
  );
}
