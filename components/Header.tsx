"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

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
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-4 py-4 text-white mix-blend-difference md:px-10">
        <a href="#top" aria-label="Mad For Makeup, back to top" className="shrink-0">
          {/* White logo + mix-blend-difference keeps it visible on any background. */}
          <Image src="/logo.png" alt="Mad For Makeup" width={1400} height={105} priority className="h-3 w-auto sm:h-4 lg:h-5" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {nav.slice(1).map((l) => (
            <a key={l.href} href={l.href} className="label !text-white hover:underline">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="#collab" className="label border border-white px-3 py-2 !text-white hover:bg-white hover:!text-black">
            Let&apos;s Collaborate
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-overlay"
            className="label !text-white lg:hidden"
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
            className="fixed inset-0 z-30 flex flex-col justify-center bg-ink px-5 text-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block text-4xl hover:italic sm:text-5xl"
                  >
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
