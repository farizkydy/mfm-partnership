"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "The brand" },
  { href: "#products", label: "Products" },
  { href: "#engagement", label: "Engagement" },
  { href: "#collab", label: "Let's collaborate" },
];

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
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 mix-blend-difference text-white md:px-10">
        <a href="#top" aria-label="Mad For Makeup, back to top">
          {/* White logo + the header's mix-blend-difference keeps it visible on any background. */}
          <Image src="/logo.png" alt="Mad For Makeup" width={1400} height={105} priority className="h-4 w-auto md:h-5" />
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu-overlay"
          className="label !text-white"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-overlay"
            aria-label="Sections"
            className="fixed inset-0 z-30 flex flex-col justify-center bg-ink px-5 text-white md:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline gap-4 text-5xl hover:italic md:text-7xl"
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
