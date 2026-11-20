import Image from "next/image";
import CampaignSection, { CampaignTile } from "@/components/CampaignSection";
import CollabForm from "@/components/CollabForm";
import Header from "@/components/Header";
import OpportunityCards from "@/components/OpportunityCards";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { ABOUT_IMAGE, ABOUT_IMAGE_2, campaigns, HERO_IMAGE, HERO_IMAGE_2, WHY_IMAGE, WHY_IMAGE_2 } from "@/lib/products";
import { about, contact, EMAIL, footer, hero, OFFICIAL_SITE, SOCIALS, steps, whyPartner } from "@/lib/site";

const wrap = "mx-auto max-w-7xl px-5 md:px-10";
const pad = (n: number) => String(n).padStart(2, "0");

const ticker = ["Bold", "Playful", "Rebellious", "Unconventional", "Acne-safe", "Made in Indonesia"];

function Marquee() {
  const row = (
    <>
      {ticker.map((t, i) => (
        <span key={t} className="display flex shrink-0 items-center gap-8 pr-8 text-[clamp(2rem,5vw,4.5rem)] italic md:gap-14 md:pr-14">
          {t}
          <span className="not-italic text-maroon-mid" aria-hidden>
            ✺
          </span>
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee field-chrome overflow-hidden py-4 text-maroon md:py-6" role="presentation">
      <div className="marquee-track" aria-hidden>
        {row}
        {row}
      </div>
      <p className="sr-only">Bold, playful, rebellious, unconventional.</p>
    </div>
  );
}

export default function Home() {
  const [primary, ...others] = campaigns;

  return (
    <>
      <Header />
      <main id="top">
        {/* Hero: a magazine spread. Red field with poster type, tall campaign photo, a second frame overlapping the seam. */}
        <section id="hero" className="field-maroon chrome relative flex flex-col overflow-hidden text-white md:block md:min-h-[100svh]">
          {/* Liquid-metal accents behind the type */}
          <div className="chrome-ring pointer-events-none absolute left-[36%] top-[-14rem] hidden h-[34rem] w-[34rem] opacity-50 md:block" aria-hidden />
          <div className="chrome-orb pointer-events-none absolute left-[41%] top-[24svh] hidden h-16 w-16 md:block" aria-hidden />

          {/* Photo column (below the type on mobile) */}
          <div className="relative order-2 mt-10 h-[78svh] md:absolute md:inset-y-0 md:right-0 md:mt-0 md:h-auto md:w-[36%]">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="(min-width: 768px) 36vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
            <p
              className="label absolute right-4 top-1/2 hidden -translate-y-1/2 !text-white md:block [writing-mode:vertical-rl]"
              aria-hidden
            >
              Bold · Playful · Rebellious · Unconventional
            </p>

            {/* Second frame: sits on the photo on mobile, straddles the red/photo seam on desktop */}
            <div className="chrome-frame absolute bottom-6 left-5 z-20 w-[36%] -rotate-[3deg] md:bottom-auto md:left-[-27%] md:top-[26svh] md:w-[42%] md:!p-2">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand">
                <Image
                  src={HERO_IMAGE_2.src}
                  alt={HERO_IMAGE_2.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 15vw, 36vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Type column */}
          <div className="relative z-10 order-1 flex flex-col px-5 pt-24 md:min-h-[100svh] md:w-[68%] md:px-10 md:pb-12 md:pt-28">
            {/* Logo asset is white, which is what we want on the red field. */}
            <div className="flex items-center gap-5">
              <Image src="/logo.png" alt="Mad For Makeup" width={1400} height={105} priority className="h-auto w-[min(60%,22rem)]" />
              <span className="chrome-line hidden flex-1 md:block" aria-hidden />
              <span className="label hidden !text-white/70 md:block">International Partnership Hub</span>
            </div>

            <h1 className="display display-2xl mt-10 md:mt-auto md:!text-[11.4vw]">
              <span className="block">Made</span>
              <span className="chrome-text block italic md:ml-[14%]">in</span>
              <span className="block">Indonesia.</span>
            </h1>

            <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-10">
              <p className="display chrome-text text-[clamp(1.6rem,3vw,2.75rem)] italic leading-[1.05]">{hero.accent}</p>
              <div>
                <p className="max-w-md text-base text-white/90 md:max-w-[22rem] md:text-lg">{hero.copy}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a href="#collab" className="btn btn-white">
                    Let&apos;s Collaborate
                  </a>
                  <a href="#collaborations" className="link-line">
                    Explore Mad ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Marquee />

        {/* Sashfir takeover: first major visual after the hero */}
        <section id="collaborations" aria-label="Featured collaboration">
          <CampaignSection campaign={primary} index={0} />
          {others.length > 0 && (
            <div className={`${wrap} py-24`}>
              <ul className="grid gap-10 md:grid-cols-3">
                {others.map((c, i) => (
                  <li key={c.slug}>
                    <CampaignTile campaign={c} index={i + 1} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* About: a poster. Headline blends over the photographs (difference) so it stays legible on any frame. */}
        <section id="about" className="field-chrome relative scroll-mt-16 overflow-hidden py-24 md:py-40">
          <div className="mx-auto max-w-[110rem] px-5 md:px-10">
            <div className="relative md:min-h-[60vw] xl:min-h-[52rem]">
              {/* Main photo, right */}
              <div className="chrome-back relative ml-auto aspect-[4/5] w-[78%] md:absolute md:right-5 md:top-0 md:w-[44%]">
                <Image
                  src={ABOUT_IMAGE.src}
                  alt={ABOUT_IMAGE.alt}
                  fill
                  sizes="(min-width: 768px) 44vw, 78vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              {/* Second photo, low-left, overlapping */}
              <div className="chrome-frame relative -mt-24 w-[46%] md:absolute md:bottom-6 md:left-[8%] md:mt-0 md:w-[22%]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={ABOUT_IMAGE_2.src}
                    alt={ABOUT_IMAGE_2.alt}
                    fill
                    sizes="(min-width: 768px) 22vw, 46vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <h2 className="display display-2xl pointer-events-none absolute left-0 top-0 hidden !text-white mix-blend-difference md:block">
                <span className="block">Everyone</span>
                <span className="block md:ml-[8%]">gets</span>
                <span className="block italic md:ml-[24%]">acne.</span>
              </h2>
              <h2 className="display display-2xl mt-10 md:hidden">
                {about.quote} <em>{about.quoteAccent}</em>
              </h2>
            </div>

            <div className="mt-16 grid gap-12 md:-mt-6 md:grid-cols-12 md:gap-8">
              <Reveal className="md:col-span-5 md:col-start-1">
                <div className="flex items-end gap-4 border-t border-maroon pt-4">
                  <span className="num text-[clamp(8rem,18vw,16rem)] text-red">0</span>
                  <span className="label mb-6 !text-ink">Rules.<br />Zero limits.</span>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:pt-4">
                <p className="display display-md">{about.quoteSub}</p>
                <div className="mt-8 grid gap-5 text-mute md:grid-cols-2 md:gap-8">
                  {about.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Why partner: dark spread, sticky campaign photo, huge hollow numerals that fill on hover */}
        <section id="why" className="field-maroon-deep chrome scroll-mt-16 py-24 text-white md:py-36">
          <div className="mx-auto max-w-[110rem] px-5 md:px-10">
            <Reveal>
              <h2 className="display display-2xl !text-[clamp(3.4rem,13vw,13rem)]">
                Why partner <em className="block md:ml-[12%]">with Mad?</em>
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-8">
              <div className="relative md:sticky md:top-24 md:col-span-5 md:self-start">
                <div className="relative aspect-[4/5] w-[88%]">
                  <Image
                    src={WHY_IMAGE.src}
                    alt={WHY_IMAGE.alt}
                    fill
                    sizes="(min-width: 768px) 38vw, 88vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="chrome-frame relative -mt-24 ml-auto w-[48%] md:-mt-32">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={WHY_IMAGE_2.src}
                      alt={WHY_IMAGE_2.alt}
                      fill
                      sizes="(min-width: 768px) 18vw, 48vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <ul className="md:col-span-7">
                {whyPartner.map((w, i) => (
                  <li key={w.label} className={`group py-8 md:py-12 ${i % 2 ? "md:pl-[10%]" : ""}`}>
                    <div className="chrome-line mb-8 md:mb-12" aria-hidden />
                    <Reveal>
                      <div className="grid items-start gap-4 md:grid-cols-[auto_1fr] md:gap-10">
                        <p className="num chrome-text text-[clamp(6rem,11vw,10rem)] transition-transform duration-500 group-hover:-translate-y-1">
                          {w.stat ?? pad(i + 1)}
                        </p>
                        <div className="md:pt-4">
                          <h3 className="display text-[clamp(2.2rem,4.5vw,4.5rem)] italic">{w.label}</h3>
                          <p className="mt-4 max-w-md text-lg text-white/70">{w.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Products: six spreads, each composed differently */}
        <section id="products" className="field-chrome scroll-mt-16 overflow-x-clip py-24 md:py-36">
          <div className="mx-auto max-w-[96rem] px-5 md:px-10">
            <Reveal>
              <h2 className="display display-2xl !text-[clamp(3.4rem,13vw,13rem)]">
                What Mad <em className="block md:ml-[18%]">creates.</em>
              </h2>
              <p className="mt-8 max-w-md text-lg text-mute md:ml-[18%]">
                An overview of our range. For full product details, visit our official website.
              </p>
            </Reveal>
            <ProductGrid />
          </div>
        </section>

        {/* Partnership opportunities: typographic list */}
        <section id="opportunities" className="field-maroon chrome scroll-mt-16 py-24 text-white md:py-36">
          <div className="mx-auto max-w-[110rem] px-5 md:px-10">
            <Reveal>
              <h2 className="display display-2xl !text-[clamp(3.2rem,12vw,12rem)]">
                Partnership <em className="block md:ml-[14%]">opportunities.</em>
              </h2>
            </Reveal>
            <OpportunityCards />
          </div>
        </section>

        {/* How to collaborate: deliberately quieter */}
        <section id="how" className="scroll-mt-16 py-10 md:py-14">
          <div className={wrap}>
            <Reveal>
              <h2 className="display display-md">
                How to <em>collaborate.</em>
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="border-t border-ink pt-4">
                  <Reveal delay={i * 0.06}>
                    <p className="label">{pad(i + 1)}</p>
                    <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm text-mute">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact: full red band */}
        <section id="collab" className="field-maroon chrome scroll-mt-16 py-12 text-white md:py-14">
          <div className={`${wrap} grid gap-14 md:grid-cols-12 md:gap-8`}>
            <Reveal className="md:col-span-6">
              <h2 className="display display-lg">
                {contact.headline} <em>{contact.accent}</em>
              </h2>
              <p className="mt-8 max-w-md text-lg text-white/85">
                Tell us about your brand and your idea. You can also write to{" "}
                <a className="underline underline-offset-4 hover:text-ink" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
                .
              </p>

              <div className="mt-12 border-t border-white/40 pt-6">
                <p className="label !text-white">{contact.formLabel}</p>
                <p className="mt-3 max-w-md text-white/85">{contact.formIntro}</p>
                <p className="label mt-8 !text-white">{contact.includeTitle}</p>
                <ul className="mt-3 max-w-md space-y-2 text-white/85">
                  {contact.include.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-6">
              <div className="bg-paper p-6 text-ink md:p-10">
                <p className="label !text-ink">{contact.formLabel}</p>
                <p className="mt-2 text-sm text-mute">{contact.formNote}</p>
                <div className="mt-8">
                  <CollabForm />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="field-maroon-deep px-5 py-16 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image src="/logo.png" alt="Mad For Makeup" width={1400} height={105} className="h-4 w-auto md:h-5" />
            <p className="mt-5 max-w-xs text-white/70">{footer.description}</p>
          </div>
          <nav aria-label="Social and website" className="flex flex-col gap-3">
            <a href={OFFICIAL_SITE} target="_blank" rel="noopener noreferrer" className="label !text-white/70 hover:!text-white">
              Official website
            </a>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="label !text-white/70 hover:!text-white">
                {s.label}
              </a>
            ))}
          </nav>
          <div>
            <p className="label !text-white/70">Partnership contact</p>
            <a href={`mailto:${EMAIL}`} className="mt-3 block hover:text-[#c9cad1]">
              {EMAIL}
            </a>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-7xl text-sm text-white/50">
          © {footer.year} Mad For Makeup. All rights reserved.
        </p>
      </footer>
    </>
  );
}
