import Image from "next/image";
import type { ReactNode } from "react";
import { products, type Img, type Product } from "@/lib/products";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

function Photo({
  img,
  mono = false,
  className = "",
  sizes = "(min-width: 768px) 45vw, 90vw",
  fit = "object-cover",
}: {
  img: Img;
  mono?: boolean;
  className?: string;
  sizes?: string;
  fit?: string;
}) {
  return (
    <div className={`zoom relative overflow-hidden bg-sand ${mono ? "mono-img" : ""} ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className={fit} loading="lazy" />
    </div>
  );
}

function Num({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`num block leading-[0.8] ${className}`} aria-hidden>
      {pad(n)}
    </span>
  );
}

function Meta({ p, light = false, className = "" }: { p: Product; light?: boolean; className?: string }) {
  return (
    <div className={className}>
      <p className={`label ${light ? "!text-white/80" : ""}`}>{p.category}</p>
      <p className={`mt-3 max-w-sm text-base md:text-lg ${light ? "text-white/90" : "text-mute"}`}>{p.description}</p>
      {p.href && (
        <a href={p.href} target="_blank" rel="noopener noreferrer" className={`link-line mt-5 ${light ? "!text-white" : ""}`}>
          Learn more ↗
        </a>
      )}
    </div>
  );
}

/** Six spreads, six compositions. Index picks the layout (wraps if more products are added). */
const spreads: ((p: Product, n: number) => ReactNode)[] = [
  // 01: one big plate, a smaller still overlapping its corner, numeral + title in the margin.
  (p, n) => (
    <div className="grid gap-8 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-7">
        <div className="crop">
          <Photo img={p.cover} mono={p.mono} className="aspect-[4/5]" sizes="(min-width: 768px) 55vw, 100vw" />
        </div>
      </div>
      <div className="relative md:col-span-5 md:flex md:flex-col md:justify-between md:pl-6">
        <div>
          <Num n={n} className="text-[clamp(7rem,15vw,15rem)] text-red" />
          <h3 className="display display-lg mt-6">{p.name}</h3>
          <Meta p={p} className="mt-6" />
        </div>
        {p.cover2 && (
          <div className="mt-10 w-3/4 self-end max-md:ml-auto md:relative md:z-10 md:-ml-40 md:mt-16 md:w-[78%]">
            <Photo img={p.cover2} className="aspect-[3/4] border-[8px] border-paper" sizes="(min-width: 768px) 30vw, 70vw" />
          </div>
        )}
      </div>
    </div>
  ),

  // 02: a full-bleed band with the name at poster scale, a portrait hanging off its lower edge.
  (p, n) => (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="relative h-[78svh] min-h-[520px] overflow-hidden bg-sand">
        <Image src={p.cover.src} alt={p.cover.alt} fill sizes="100vw" className="object-cover object-[50%_32%]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" aria-hidden />
        <Num n={n} className="absolute right-5 top-6 text-6xl text-white md:right-10 md:text-8xl" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-white md:px-10 md:pb-12">
          <h3 className="display display-xl max-w-[16ch] !text-[clamp(2.6rem,9vw,9rem)]">{p.name}</h3>
          <Meta p={p} light className="mt-6" />
        </div>
      </div>
      {p.cover2 && (
        <div className="absolute -bottom-14 right-5 hidden w-[19%] md:right-[9%] md:block">
          <Photo img={p.cover2} className="aspect-[3/4] border-[8px] border-paper" sizes="20vw" />
        </div>
      )}
    </div>
  ),

  // 03: typography-led. A slim plate beside a very large name.
  (p, n) => (
    <div className="grid items-end gap-8 md:grid-cols-12 md:gap-6">
      <div className="max-md:w-3/5 md:col-span-3 md:col-start-1">
        <Photo img={p.cover} mono={p.mono} className="aspect-[3/5]" sizes="(min-width: 768px) 25vw, 60vw" />
      </div>
      <div className="md:col-span-9 md:pl-10">
        <Num n={n} className="num-outline text-[clamp(7rem,16vw,16rem)]" />
        <h3 className="display display-xl mt-4 !text-[clamp(3rem,9.5vw,10rem)]">{p.name}</h3>
        <Meta p={p} className="mt-8 md:ml-[30%]" />
      </div>
    </div>
  ),

  // 04: two plates at different heights, a paper caption card bridging them.
  (p, n) => (
    <div className="relative grid gap-6 md:grid-cols-12">
      <div className="max-md:w-[88%] md:col-span-5">
        <Photo img={p.cover} className="aspect-[3/4]" sizes="(min-width: 768px) 42vw, 90vw" />
      </div>
      {p.cover2 && (
        <div className="max-md:ml-auto max-md:w-[72%] md:col-span-5 md:col-start-8 md:mt-40">
          <Photo img={p.cover2} className="aspect-[4/5]" sizes="(min-width: 768px) 40vw, 75vw" />
        </div>
      )}
      <div className="bg-paper md:absolute md:left-[26%] md:top-[44%] md:z-10 md:w-[44%] md:p-8">
        <div className="flex items-start gap-5">
          <Num n={n} className="text-[clamp(4rem,7vw,7rem)] text-red" />
          <h3 className="display display-md">{p.name}</h3>
        </div>
        <Meta p={p} className="mt-5" />
      </div>
    </div>
  ),

  // 05: a large square plate with a smaller portrait overlapping it from the left.
  (p, n) => (
    <div className="grid gap-8 md:grid-cols-12 md:gap-6">
      <div className="order-2 md:order-1 md:col-span-4 md:pt-10">
        <Num n={n} className="text-[clamp(6rem,12vw,12rem)] text-red" />
        <h3 className="display display-lg mt-6 md:relative md:z-10 md:-mr-40">{p.name}</h3>
        <Meta p={p} className="mt-6" />
      </div>
      <div className="relative order-1 md:order-2 md:col-span-8">
        <Photo img={p.cover} className="aspect-square" sizes="(min-width: 768px) 62vw, 100vw" />
        {p.cover2 && (
          <div className="absolute -bottom-10 left-[-6%] w-[38%] md:-bottom-16 md:left-[-14%]">
            <Photo img={p.cover2} className="aspect-[3/4] border-[8px] border-paper" sizes="25vw" />
          </div>
        )}
      </div>
    </div>
  ),

  // 06: tall plate and a still-life, name set in the gap between them.
  (p, n) => (
    <div className="grid gap-8 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-5">
        <div className="crop">
          <Photo img={p.cover} className="aspect-[3/4] md:aspect-[2/3]" sizes="(min-width: 768px) 42vw, 100vw" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-10 md:col-span-7 md:pl-8">
        {p.cover2 && (
          <div className="w-4/5 self-end">
            <Photo img={p.cover2} className="aspect-[4/5]" sizes="(min-width: 768px) 35vw, 80vw" />
          </div>
        )}
        <div className="md:-ml-40">
          <Num n={n} className="num-outline text-[clamp(6rem,11vw,11rem)]" />
          <h3 className="display display-lg mt-4">{p.name}</h3>
          <Meta p={p} className="mt-6" />
        </div>
      </div>
    </div>
  ),
];

export default function ProductGrid() {
  if (products.length === 0) return null;
  return (
    <ol className="mt-16 space-y-28 md:mt-28 md:space-y-48">
      {products.map((p, i) => (
        <li key={p.slug} className={i === 1 ? "pb-16 md:pb-24" : i === 4 ? "pb-10 md:pb-20" : ""}>
          <Reveal>{spreads[i % spreads.length](p, i + 1)}</Reveal>
        </li>
      ))}
    </ol>
  );
}
