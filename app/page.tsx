import Image from "next/image";
import CampaignSection, { CampaignTile } from "@/components/CampaignSection";
import CollabForm from "@/components/CollabForm";
import Header from "@/components/Header";
import OpportunityCards from "@/components/OpportunityCards";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { ABOUT_IMAGE, campaigns, HERO_IMAGE, HERO_IMAGE_2 } from "@/lib/products";
import { about, contact, EMAIL, footer, hero, OFFICIAL_SITE, SOCIALS, steps, whyPartner } from "@/lib/site";

const wrap = "mx-auto max-w-7xl px-5 md:px-10";
const pad = (n: number) => String(n).padStart(2, "0");

// Staggered, asymmetric placement for the four "why partner" themes (desktop).
const whySlots = [
  "md:col-span-5",
  "md:col-span-5 md:col-start-8 md:mt-28",
  "md:col-span-5 md:col-start-2",
  "md:col-span-5 md:col-start-8 md:mt-28",
];

export default function Home() {
  const [primary, ...others] = campaigns;

  return (
    <>
      <Header />
      <main id="top">
        {/* Hero: oversized wordmark + offset photo collage */}
        <section id="hero" className="relative px-5 pb-20 pt-24 md:px-10 md:pb-28 md:pt-28">
          <div className="mx-auto max-w-[110rem]">
            {/* Logo asset is white: brightness-0 turns it black on the light page. */}
            <Image
              src="/logo.png"
              alt="Mad For Makeup"
              width={1400}
              height={105}
              priority
              className="h-auto w-full brightness-0"
            />

            <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
              <div className="flex flex-col justify-between gap-10 md:col-span-6">
                <h1 className="display display-lg">
                  {hero.headline} <em>{hero.accent}</em>
                </h1>
                <div>
                  <p className="max-w-md text-lg text-mute">{hero.copy}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <a href="#collab" className="btn btn-red">
                      Let&apos;s Collaborate
                    </a>
                    <a href="#collaborations" className="link-line">
                      Explore Mad ↓
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[5/6] md:col-span-6 md:aspect-auto md:h-[clamp(440px,58vh,640px)]">
                {/* Outer box carries the crop marks (must not clip); inner box clips the photo. */}
                <div className="crop absolute left-0 top-0 aspect-[4/5] w-[70%] bg-sand md:h-[88%] md:w-auto">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={HERO_IMAGE.src}
                      alt={HERO_IMAGE.alt}
                      fill
                      priority
                      sizes="(min-width: 768px) 30vw, 70vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 aspect-[3/4] w-[44%] overflow-hidden border-[6px] border-paper bg-sand md:h-[64%] md:w-auto md:border-8">
                  <Image
                    src={HERO_IMAGE_2.src}
                    alt={HERO_IMAGE_2.alt}
                    fill
                    priority
                    sizes="(min-width: 768px) 20vw, 44vw"
                    className="mono-img object-cover"
                  />
                </div>
                <p className="num absolute right-0 top-0 text-5xl text-red md:text-7xl" aria-hidden>
                  01
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sashfir takeover: first major visual after the hero */}
        <section id="collaborations" aria-label="Featured collaboration">
          <CampaignSection campaign={primary} index={0} />
          {others.length > 0 && (
            <div className={`${wrap} pb-24`}>
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

        {/* About: editorial spread with pull quote */}
        <section id="about" className="scroll-mt-16 py-24 md:py-32">
          <div className={`${wrap} grid gap-14 md:grid-cols-12`}>
            <Reveal className="md:col-span-7">
              <h2 className="display display-xl">
                {about.quote} <em>{about.quoteAccent}</em>
              </h2>
              <p className="display display-md mt-8 max-w-xl">{about.quoteSub}</p>
              <div className="mt-12 max-w-md space-y-5 text-mute">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:mt-32">
              <div className="crop relative aspect-[3/4] bg-sand">
                <div className="zoom relative h-full w-full overflow-hidden">
                  <Image
                    src={ABOUT_IMAGE.src}
                    alt={ABOUT_IMAGE.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why partner: big numerals, staggered layout */}
        <section id="why" className="scroll-mt-16 bg-sand py-24 md:py-28">
          <div className={wrap}>
            <Reveal>
              <h2 className="display display-lg">
                Why partner <em>with Mad?</em>
              </h2>
            </Reveal>
            <ul className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-x-6 md:gap-y-12">
              {whyPartner.map((w, i) => (
                <li key={w.label} className={whySlots[i % whySlots.length]}>
                  <Reveal delay={(i % 2) * 0.08}>
                    <div className="border-t border-ink pt-5">
                      <p className="num text-[clamp(4.5rem,9vw,7.5rem)] text-red">{w.stat ?? pad(i + 1)}</p>
                      <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.18em]">{w.label}</h3>
                      <p className="mt-3 max-w-sm text-lg text-mute">{w.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Products: editorial spread */}
        <section id="products" className="scroll-mt-16 py-24 md:py-32">
          <div className={wrap}>
            <Reveal>
              <h2 className="display display-lg">
                What Mad <em>creates.</em>
              </h2>
              <p className="mt-6 max-w-md text-lg text-mute">
                An overview of our range. For full product details, visit our official website.
              </p>
            </Reveal>
            <ProductGrid />
          </div>
        </section>

        {/* Partnership opportunities: typographic list */}
        <section id="opportunities" className="scroll-mt-16 bg-ink py-24 text-white md:py-28">
          <div className={wrap}>
            <Reveal>
              <h2 className="display display-lg">
                Partnership <em>opportunities.</em>
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
        <section id="collab" className="scroll-mt-16 bg-red py-12 text-white md:py-14">
          <div className={`${wrap} grid gap-14 md:grid-cols-12 md:gap-8`}>
            <Reveal className="md:col-span-6">
              <h2 className="display display-lg [&_em]:!text-white">
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

      <footer className="bg-ink px-5 py-16 text-white md:px-10">
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
            <a href={`mailto:${EMAIL}`} className="mt-3 block hover:text-red">
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
