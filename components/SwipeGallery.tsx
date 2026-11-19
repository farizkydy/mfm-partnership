"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Img } from "@/lib/products";

const pad = (n: number) => String(n).padStart(2, "0");

export default function SwipeGallery({ images, label }: { images: Img[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const next = Math.max(0, Math.min(images.length - 1, i));
      const child = el.children[next] as HTMLElement | undefined;
      el.scrollTo({ left: child?.offsetLeft ?? 0, behavior: "smooth" });
    },
    [images.length],
  );

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
    setIndex(Math.round(el.scrollLeft / (w + 12)));
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
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto"
      >
        {images.map((img, i) => (
          <li key={img.src} className="relative aspect-[3/4] w-[82%] shrink-0 snap-start overflow-hidden bg-sand">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="82vw"
              className="object-cover"
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
          <button onClick={() => go(index - 1)} className="label hover:!text-red" aria-label="Previous">
            ← Prev
          </button>
          <button onClick={() => go(index + 1)} className="label hover:!text-red" aria-label="Next">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
