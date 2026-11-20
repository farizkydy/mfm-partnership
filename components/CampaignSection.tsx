import Image from "next/image";
import type { Campaign } from "@/lib/products";
import CampaignReel from "./CampaignReel";
import ParallaxImage from "./ParallaxImage";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/** The campaign takeover: poster-scale type over a full-bleed key visual, a red stats spread, then a film strip. */
export default function CampaignSection({ campaign: c, index = 0 }: { campaign: Campaign; index?: number }) {
  // "A Touch of Sashfir" -> small lead-in "A Touch of" + poster word "Sashfir".
  const lead = c.name.replace(c.partner, "").trim();
  const [s0, s1, s2, s3] = c.stats ?? [];

  return (
    <article id={c.slug} aria-labelledby={`${c.slug}-title`}>
      {/* 1. Full-bleed key visual with poster type */}
      <div className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
        {c.keyVisualMobile && (
          <div className="absolute inset-0 sm:hidden">
            <ParallaxImage img={c.keyVisualMobile} priority />
          </div>
        )}
        <div className={`absolute inset-0 ${c.keyVisualMobile ? "hidden sm:block" : ""}`}>
          <ParallaxImage img={c.keyVisual} className="object-[50%_35%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b040b]/95 via-[#3a0610]/15 to-black/35" aria-hidden />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between px-5 pt-24 text-white md:px-10">
          <p className="label !text-white/85">Featured collaboration · with {c.partner}</p>
          <p className="num text-5xl md:text-7xl" aria-hidden>
            {pad(index + 1)}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-white md:px-10 md:pb-12">
          <h2 id={`${c.slug}-title`} className="display">
            <span className="mb-1 block text-[clamp(2rem,6.5vw,6.5rem)] font-normal italic uppercase leading-none tracking-normal">{lead}</span>
            {/* Bleeds slightly past the gutter on purpose. */}
            <span className="display-2xl chrome-text -ml-[0.04em] block !text-[clamp(4.5rem,26vw,9rem)] md:!text-[clamp(8rem,22vw,26rem)]">
              {c.partner}
            </span>
          </h2>
          <div className="chrome-line mt-6" aria-hidden />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <p className="display text-[clamp(1.4rem,3vw,2.6rem)] italic">{c.tagline}</p>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn btn-white">
              Explore Campaign ↗
            </a>
          </div>
        </div>
      </div>

      {/* 2. Story: a big statement, offset list and an overlapping still */}
      <div className="field-maroon-deep chrome relative px-5 py-24 text-white md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[110rem] gap-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <p className="label !text-white/70">The collaboration</p>
            <p className="display mt-6 text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.02]">{c.intro}</p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:mt-40">
            <p className="label !text-white/70">The concept</p>
            <p className="mt-3 text-lg text-white/75">{c.concept}</p>
            <p className="label mt-10 !text-white/70">Featured products</p>
            <ol className="mt-3 divide-y divide-white/20 border-y border-white/20">
              {c.featuredProducts.map((p, i) => (
                <li key={p} className="flex items-baseline gap-4 py-3">
                  <span className="label w-6 !text-white/60">{pad(i + 1)}</span>
                  <span className="display text-xl md:text-2xl">{p}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      {/* 3. Stats as editorial graphics: huge numerals, mixed solid and outline, overlapping a still */}
      {s0 && s1 && s2 && s3 && (
        <div className="field-maroon relative overflow-hidden px-5 py-20 text-white md:px-10 md:py-32">
          <div className="chrome-ring pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] opacity-40" aria-hidden />
          <div className="chrome-orb pointer-events-none absolute bottom-16 left-[46%] hidden h-20 w-20 md:block" aria-hidden />
          <p className="label !text-white/80">By the numbers</p>
          <dl className="mx-auto mt-10 grid max-w-[110rem] gap-y-14 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
            <Stat s={s0} className="md:col-span-6" />

            {c.gallery[3] && (
              <div className="hidden md:col-span-4 md:col-start-9 md:row-span-2 md:block">
                <div className="crop-white relative aspect-[3/4] w-full">
                  <Image
                    src={c.gallery[3].src}
                    alt={c.gallery[3].alt}
                    fill
                    sizes="30vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            <Stat s={s1} flip className="md:col-span-8 md:col-start-5 md:-mt-52" />
            <Stat s={s2} outline className="md:col-span-6 md:mt-20" />
            <Stat s={s3} className="md:col-span-5 md:col-start-8 md:mt-24" />
          </dl>
        </div>
      )}

      {/* 4. Film strip */}
      <div className="bg-[#16050a] py-20 text-white md:py-28">
        <div className="mx-auto mb-10 flex max-w-[110rem] flex-wrap items-end justify-between gap-4 px-5 md:mb-14 md:px-10">
          <h3 className="display display-lg chrome">
            Blood &amp; Bold, <em>frame by frame.</em>
          </h3>
          <p className="label !text-white/60">Drag, scroll or use the arrows</p>
        </div>
        <CampaignReel images={c.gallery} label={`${c.name} campaign visuals`} />
      </div>
    </article>
  );
}

function Stat({
  s,
  outline = false,
  flip = false,
  className = "",
}: {
  s: { value: string; label: string };
  outline?: boolean;
  /** Label on the left of the numeral (used where the numeral overlaps a photo). */
  flip?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`relative z-10 min-w-0 ${className}`}>
      <div className={`flex items-end gap-5 md:gap-8 ${flip ? "md:flex-row-reverse md:justify-end" : ""}`}>
        <dt
          className={`num whitespace-nowrap text-[clamp(7rem,30vw,10rem)] md:text-[clamp(9rem,19vw,21rem)] ${
            outline ? "num-outline-white" : "chrome-text"
          }`}
        >
          {s.value}
        </dt>
        <dd className="label mb-3 max-w-[16ch] border-t border-white/50 pt-3 !text-white md:mb-8">{s.label}</dd>
      </div>
    </Reveal>
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
