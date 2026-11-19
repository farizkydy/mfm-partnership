import Image from "next/image";
import CampaignSection from "@/components/CampaignSection";
import CollabForm from "@/components/CollabForm";
import Header from "@/components/Header";
import OpportunityCards from "@/components/OpportunityCards";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { campaigns, HERO_IMAGE } from "@/lib/products";
import { about, EMAIL, footer, hero, OFFICIAL_SITE, SOCIALS, steps, whyPartner } from "@/lib/site";

const wrap = "mx-auto max-w-7xl px-5 md:px-10";
const h2 = "display text-5xl md:text-7xl";
const button =
  "inline-block px-8 py-4 text-sm uppercase tracking-[0.18em] transition";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        {/* Hero */}
        <section className="relative grid min-h-screen md:grid-cols-2">
          <div className="flex flex-col justify-end px-5 pb-16 pt-32 md:px-10">
            <h1 className="display text-5xl md:text-7xl">
              {hero.headline} <em>{hero.accent}</em>
            </h1>
            <p className="mt-8 max-w-lg text-lg text-silver-500">{hero.copy}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#collaborations" className={`${button} border border-ink hover:bg-ink hover:text-white`}>
                Explore Mad
              </a>
              <a href="#collab" className={`${button} bg-maroon text-white hover:bg-ink`}>
                Let&apos;s Collaborate
              </a>
            </div>
          </div>
          <div className="relative min-h-[60vh] bg-silver-100">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Collaborations */}
        <section id="collaborations" aria-label="Featured collaboration">
          {campaigns.map((c) => (
            <CampaignSection key={c.slug} campaign={c} />
          ))}
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-16 bg-silver-50 py-24 md:py-32">
          <div className={`${wrap} grid gap-12 md:grid-cols-[1fr_1.4fr]`}>
            <Reveal>
              <h2 className={h2}>
                {about.title} <em>{about.accent}</em> {about.titleEnd}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="max-w-xl space-y-6 text-lg text-silver-500">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why partner */}
        <section id="why" className="scroll-mt-16 py-24 md:py-32">
          <div className={wrap}>
            <Reveal>
              <h2 className={h2}>
                Why partner <em>with Mad?</em>
              </h2>
            </Reveal>
            <ul className="mt-16 grid gap-px bg-silver-300 sm:grid-cols-2 lg:grid-cols-3">
              {whyPartner.map((w, i) => (
                <li key={w.title} className="bg-paper p-8">
                  <Reveal delay={(i % 3) * 0.08}>
                    {w.stat && <p className="display text-5xl text-maroon">{w.stat}</p>}
                    <h3 className="display text-2xl md:text-3xl">{w.title}</h3>
                    <p className="mt-3 text-silver-500">{w.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="scroll-mt-16 bg-silver-50 py-24 md:py-32">
          <div className={wrap}>
            <Reveal>
              <h2 className={h2}>
                What Mad <em>creates.</em>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-silver-500">
                An overview of our range. For full product details, visit our official website.
              </p>
            </Reveal>
            <ProductGrid />
          </div>
        </section>

        {/* Partnership opportunities */}
        <section id="opportunities" className="scroll-mt-16 py-24 md:py-32">
          <div className={wrap}>
            <Reveal>
              <h2 className={h2}>
                Partnership <em>opportunities.</em>
              </h2>
            </Reveal>
            <OpportunityCards />
          </div>
        </section>

        {/* How to collaborate */}
        <section id="how" className="scroll-mt-16 bg-ink py-24 text-white md:py-32">
          <div className={wrap}>
            <Reveal>
              <h2 className={h2}>
                How to <em className="!text-silver-300">collaborate.</em>
              </h2>
            </Reveal>
            <ol className="mt-16 grid gap-10 md:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 0.08}>
                    <p className="display text-5xl text-silver-500">{i + 1}</p>
                    <h3 className="display mt-4 text-2xl md:text-3xl">{s.title}</h3>
                    <p className="mt-3 text-silver-300">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Inquiry form */}
        <section id="collab" className="scroll-mt-16 py-24 md:py-32">
          <div className={`${wrap} grid gap-16 md:grid-cols-[1fr_1.1fr]`}>
            <Reveal>
              <h2 className={h2}>
                Let&apos;s work <em>together.</em>
              </h2>
              <p className="mt-6 max-w-md text-lg text-silver-500">
                Tell us about your brand and your idea. You can also write to{" "}
                <a className="text-ink underline underline-offset-4 hover:text-maroon" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <CollabForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-silver-300 px-5 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            {/* Logo asset is white: brightness-0 turns it black on the light footer. */}
            <Image src="/logo.png" alt="Mad For Makeup" width={1400} height={105} className="h-4 w-auto brightness-0 md:h-5" />
            <p className="mt-5 max-w-xs text-silver-500">{footer.description}</p>
          </div>
          <nav aria-label="Social and website" className="flex flex-col gap-3">
            <a href={OFFICIAL_SITE} target="_blank" rel="noopener noreferrer" className="label hover:text-maroon">
              Official website
            </a>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="label hover:text-maroon">
                {s.label}
              </a>
            ))}
          </nav>
          <div>
            <p className="label">Partnership contact</p>
            <a href={`mailto:${EMAIL}`} className="mt-3 block hover:text-maroon">
              {EMAIL}
            </a>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-7xl text-sm text-silver-500">
          © {footer.year} Mad For Makeup. All rights reserved.
        </p>
      </footer>
    </>
  );
}
