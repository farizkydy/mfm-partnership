"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Img } from "@/lib/products";

const pad = (n: number) => String(n).padStart(2, "0");

export default function SwipeGallery({
  images,
  label,
  fit = "cover",
}: {
  images: Img[];
  label: string;
  fit?: "cover" | "contain";
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const next = Math.max(0, Math.min(images.length - 1, i));
    const child = el.children[next] as HTMLElement | undefined;
    el.scrollTo({ left: child?.offsetLeft ?? 0, behavior: "smooth" });
  }, [images.length]);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
    setIndex(Math.round(el.scrollLeft / (w + 16)));
  };

  if (images.length === 0) return null;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={ref}
        onScroll={onScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
      >
        {images.map((img, i) => (
          <li
            key={img.src}
            className={`relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden md:w-[38%] ${
              fit === "contain" ? "bg-silver-50" : "bg-silver-100"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 38vw, 78vw"
              className={fit === "contain" ? "object-contain p-6" : "object-cover"}
              loading={i < 2 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <span className="label" aria-live="polite">
          {pad(Math.min(index + 1, images.length))} / {pad(images.length)}
        </span>
        <div className="flex gap-4">
          <button onClick={() => go(index - 1)} className="label hover:text-maroon" aria-label="Previous">
            ← Prev
          </button>
          <button onClick={() => go(index + 1)} className="label hover:text-maroon" aria-label="Next">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
