"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Img } from "@/lib/products";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-bleed film strip. Each frame keeps its own proportions at a shared tall height,
 * so the rhythm comes from the photographs. Scroll, drag, arrow keys or the buttons all work.
 */
export default function CampaignReel({ images, label }: { images: Img[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const go = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const next = Math.max(0, Math.min(images.length - 1, i));
      const child = el.children[next] as HTMLElement | undefined;
      el.scrollTo({ left: (child?.offsetLeft ?? 0) - el.offsetLeft, behavior: "smooth" });
    },
    [images.length],
  );

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    let nearest = 0;
    let best = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setIndex(nearest);
  };

  // Mouse drag (touch already scrolls natively).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !ref.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    ref.current.style.scrollSnapType = "none";
    ref.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    if (ref.current) ref.current.style.scrollSnapType = "";
  };

  if (images.length === 0) return null;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={ref}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory scroll-pl-5 items-end md:scroll-pl-10 gap-3 overflow-x-auto px-5 active:cursor-grabbing md:gap-5 md:px-10"
      >
        {images.map((img, i) => (
          <li
            key={img.src}
            // Alternate heights so the strip reads as a layout, not a row of identical thumbnails.
            className={`relative shrink-0 snap-start overflow-hidden bg-sand/20 ${
              i % 3 === 1 ? "h-[52svh] md:h-[58svh]" : i % 3 === 2 ? "h-[62svh] md:h-[72svh]" : "h-[72svh] md:h-[82svh]"
            }`}
            style={{ aspectRatio: `${img.w} / ${img.h}` }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 50vw, 80vw"
              draggable={false}
              className="select-none object-cover"
              loading={i < 2 ? "eager" : "lazy"}
            />
            <span className="num absolute left-3 top-3 text-xl text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] md:text-2xl" aria-hidden>
              {pad(i + 1)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 flex max-w-[110rem] items-center gap-6 px-5 md:px-10">
        <span className="label !text-white/70" aria-live="polite">
          {pad(index + 1)} / {pad(images.length)}
        </span>
        <div className="relative h-px flex-1 bg-white/25" aria-hidden>
          <div className="absolute inset-y-[-1px] left-0 h-[3px]" style={{ width: `${Math.max(6, progress * 100)}%`, background: "var(--chrome-grad)" }} />
        </div>
        <div className="flex gap-5">
          <button onClick={() => go(index - 1)} className="label !text-white hover:!text-[#c9cad1]" aria-label="Previous frame">
            ← Prev
          </button>
          <button onClick={() => go(index + 1)} className="label !text-white hover:!text-[#c9cad1]" aria-label="Next frame">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
