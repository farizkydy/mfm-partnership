import Image from "next/image";
import CollabForm from "@/components/CollabForm";
import Header from "@/components/Header";
import ProductSection from "@/components/ProductSection";
import Reveal from "@/components/Reveal";
import { EMAIL, HERO_IMAGE, INSTAGRAM, products } from "@/lib/products";

const tracks = [
  {
    title: "Brand collaboration",
    points: [
      "Co-branded product and limited-edition drops",
      "Joint campaigns with shared key visuals",
      "Retail and event activations",
    ],
  },
  {
    title: "Influencer collaboration",
    points: [
      "Product seeding and honest first-look content",
      "Shade-match and tutorial features",
      "Community access through Rebel Secret Society",
    ],
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        {/* 01 Hero */}
        <section className="relative grid min-h-screen md:grid-cols-2">
          <div className="flex flex-col justify-end px-5 pb-16 pt-32 md:px-10">
            <h1 className="display text-6xl md:text-8xl">Mad for makeup.</h1>
            <a href="#about" className="label mt-10 hover:text-maroon">
              Find out more ↓
            </a>
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

        {/* 02 About */}
        <section id="about" className="scroll-mt-16 bg-silver-50 py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1fr_1.4fr] md:px-10">
            <Reveal>
              <h2 className="display text-5xl md:text-7xl">
                Bold, minimal, <em>unapologetically</em> makeup.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="max-w-xl space-y-6 text-lg text-silver-500">
                <p>
                  Mad For Makeup is an Indonesian makeup brand built on the belief that makeup should never come
                  with rules or limitations.
                </p>
                <p>
                  We create innovative, high-performance, acne-safe makeup designed for real skin, real people, and
                  real life. We believe everyone deserves to feel confident in their own skin because, well,
                  everyone gets acne.
                </p>
                <p>
                  We&apos;re here to challenge beauty norms, make makeup more inclusive, and encourage everyone to
                  express themselves unapologetically.
                </p>              </div>
            </Reveal>
          </div>
        </section>

        {/* 03 Products */}
        <section id="products" className="scroll-mt-16 pt-24 md:pt-32">
          <div className="mx-auto max-w-7xl px-5 pb-16 md:px-10">
            <Reveal>
              <h2 className="display text-5xl md:text-7xl">
                The <em>lineup.</em>
              </h2>
            </Reveal>
          </div>
          {products.map((p) => (
            <ProductSection key={p.slug} product={p} />
          ))}
        </section>

        {/* 04 Engagement */}
        <section id="engagement" className="scroll-mt-16 bg-ink py-24 text-white md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal>
              <h2 className="display text-5xl md:text-7xl">
                Ways to <em className="!text-silver-300">work together.</em>
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-px bg-white/20 md:grid-cols-2">
              {tracks.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.1} className="bg-ink p-8 md:p-12">
                  <h3 className="display text-3xl md:text-4xl">{t.title}</h3>
                  <ul className="mt-8 space-y-4 text-silver-300">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden className="text-silver-500">+</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 05 Collab */}
        <section id="collab" className="scroll-mt-16 py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-[1fr_1.1fr] md:px-10">
            <Reveal>
              <h2 className="display text-5xl md:text-7xl">
                Let&apos;s work <em>together.</em>
              </h2>
              <p className="mt-6 max-w-md text-lg text-silver-500">
                Tell us who you are and what you have in mind. You can also write to{" "}
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

      {/* 06 Footer */}
      <footer className="border-t border-silver-300 px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          {/* Logo asset is white: brightness-0 turns it black on the light footer. */}
          <Image src="/logo.png" alt="Mad For Makeup" width={1400} height={105} className="h-4 w-auto brightness-0 md:h-5" />
          <nav aria-label="Social" className="flex gap-6">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="label hover:text-maroon">
              Instagram @madformakeup.co
            </a>
            <a href="https://madformakeup.co" className="label hover:text-maroon">
              madformakeup.co
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
