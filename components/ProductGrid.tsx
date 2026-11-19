import Image from "next/image";
import { productCategories, products } from "@/lib/products";
import Reveal from "./Reveal";

export default function ProductGrid() {
  return (
    <div className="mt-16 space-y-20">
      {productCategories.map((category) => {
        const items = products.filter((p) => p.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category}>
            <h3 className="display border-b border-silver-300 pb-4 text-3xl md:text-4xl">{category}</h3>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
              {items.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={(i % 3) * 0.08}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-silver-100">
                      <Image
                        src={p.cover.src}
                        alt={p.cover.alt}
                        fill
                        sizes="(min-width: 768px) 30vw, 46vw"
                        className="object-cover"
                      />
                    </div>
                    <h4 className="display mt-5 text-2xl md:text-3xl">{p.name}</h4>
                    <p className="mt-2 text-sm text-silver-500 md:text-base">{p.description}</p>
                    {p.href && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label mt-3 inline-block hover:text-maroon"
                      >
                        Learn more ↗
                      </a>
                    )}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
