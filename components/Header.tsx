"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  // The hero carries a giant wordmark, so the header logo only appears once it has scrolled away,
  // but the bar gets its background as soon as the page leaves the very top.
  const [pastHero, setPastHero] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const top = sentinel.current;
    if (!hero || !top) return;
    const heroIO = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    const topIO = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    heroIO.observe(hero);
    topIO.observe(top);
    return () => {
      heroIO.disconnect();
      topIO.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Sits at the very top of the document; leaving the viewport means the page has scrolled. */}
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-px" />
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-4 py-3 transition-colors duration-300 md:px-10 ${
          scrolled ? "border-b border-line bg-paper/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          aria-label="Mad For Makeup, back to top"
          className={`shrink-0 transition-opacity duration-300 ${pastHero ? "opacity-100" : "pointer-events-none opacity-0"}`}
          tabIndex={pastHero ? 0 : -1}
        >
          {/* Logo asset is white: brightness-0 turns it black on the light header. */}
          <Image src="/logo.png" alt="Mad For Makeup" width={1400} height={105} className="h-3 w-auto brightness-0 sm:h-4 lg:h-5" />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-6 lg:flex">
          {nav.slice(1).map((l) => (
            <a key={l.href} href={l.href} className={`label ${scrolled ? "!text-ink hover:!text-maroon-mid" : "!text-white hover:!text-ink"}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#collab"
            className={`btn ${scrolled ? "btn-red" : "btn-white"} whitespace-nowrap !px-3 !py-2.5 !text-[0.6rem] !tracking-[0.1em] sm:!px-4 sm:!text-[0.68rem] sm:!tracking-[0.18em]`}
          >
            Let&apos;s Collaborate
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-overlay"
            className={`label relative z-50 lg:hidden ${open || !scrolled ? "!text-white" : "!text-ink"}`}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-overlay"
            aria-label="Sections"
            className="fixed inset-0 z-30 flex flex-col justify-center field-maroon-deep px-5 text-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="display block text-4xl hover:italic sm:text-5xl">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
