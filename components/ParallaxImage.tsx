"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Img } from "@/lib/products";

/** Fills its (relatively positioned) parent. Drifts slightly on scroll; static under reduced motion. */
export default function ParallaxImage({
  img,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  img: Img;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute -inset-y-[8%] inset-x-0" style={reduce ? undefined : { y }}>
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
      </motion.div>
    </div>
  );
}
