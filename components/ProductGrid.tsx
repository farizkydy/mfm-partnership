import Image from "next/image";
import { products, type Product } from "@/lib/products";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Desktop placement for the supporting products (cycled if more are added).
 * Mixed spans, aspect ratios and vertical offsets give the spread a magazine rhythm.
 */
const pattern = [
  { cls: "md:col-span-4", ar: "aspect-[4/5]" },
  { cls: "md:col-span-5 md:col-start-6 md:mt-28", ar: "aspect-square" },
  { cls: "md:col-span-3 md:col-start-11 md:mt-10", ar: "aspect-[3/4]" },
  { cls: "md:col-span-5 md:col-start-2", ar: "aspect-[4/3]" },
  { cls: "md:col-span-4 md:col-start-8 md:mt-20", ar: "aspect-[4/5]" },
];

function Caption({ p, n, large = false }: { p: Product; n: number; large?: boolean }) {
  return (
    <figcaption className="mt-4">
      <p className="label">
        {pad(n)} · {p.category}
      </p>
      <h3 className={`display mt-1 ${large ? "display-lg" : "display-md"}`}>{p.name}</h3>
      <p className={`mt-2 max-w-sm text-mute ${large ? "text-base md:text-lg" : "text-sm md:text-base"}`}>{p.description}</p>
      {p.href && (
        <a href={p.href} target="_blank" rel="noopener noreferrer" className="link-line mt-3">
          Learn more ↗
        </a>
      )}
    </figcaption>
  );
}

export default function ProductGrid() {
  const [feature, ...rest] = products;
  if (!feature) return null;

  return (
    <div className="mt-16 md:mt-24">
      {/* Feature spread: one large visual, one smaller offset visual, big title */}
      <Reveal>
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <figure className="md:col-span-7">
            <div className="crop relative aspect-[4/5] bg-sand">
              <div className={`zoom relative h-full w-full overflow-hidden ${feature.mono ? "mono-img" : ""}`}>
                <Image
                  src={feature.cover.src}
                  alt={feature.cover.alt}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </figure>
          <figure className="flex flex-col justify-between md:col-span-5 md:pl-6">
            <Caption p={feature} n={1} large />
            {feature.cover2 && (
              <div className="zoom relative mt-10 aspect-[3/4] w-3/4 self-end overflow-hidden bg-sand md:mt-16">
                <Image
                  src={feature.cover2.src}
                  alt={feature.cover2.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 75vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </figure>
        </div>
      </Reveal>

      {/* Supporting spread */}
      <ul className="mt-24 grid gap-y-16 md:mt-32 md:grid-cols-12 md:gap-x-6 md:gap-y-24">
        {rest.map((p, i) => {
          const slot = pattern[i % pattern.length];
          return (
            <li key={p.slug} className={`${slot.cls} ${i % 2 ? "max-md:ml-auto max-md:w-[84%]" : ""}`}>
              <Reveal delay={(i % 3) * 0.06}>
                <figure>
                  <div className={`zoom relative overflow-hidden bg-sand ${slot.ar} ${p.mono ? "mono-img" : ""}`}>
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      sizes="(min-width: 768px) 40vw, 84vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <Caption p={p} n={i + 2} />
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
