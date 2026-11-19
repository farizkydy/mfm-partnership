import manifest from "./manifest.json";

export type Img = { src: string; w: number; h: number; alt: string };

export type Product = {
  slug: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  /** Source: "Product Knowledge_Updated June 2026" deck (Sashfir is not in the deck: placeholder). */
  details: { label: string; body: string }[];
  kv: Img[];
  pack: Img[];
  featuredPack?: string;
};

type Raw = { file: string; w: number; h: number }[];
const m = manifest as Record<string, { kv: Raw; pack: Raw }>;

const toImgs = (slug: string, kind: "kv" | "pack", name: string): Img[] =>
  m[slug][kind].map((f, i) => ({
    src: `/products/${slug}/${kind}/${f.file}`,
    w: f.w,
    h: f.h,
    alt: `${name} ${kind === "kv" ? "campaign visual" : "packshot"} ${i + 1}`,
  }));

const defs: Omit<Product, "kv" | "pack">[] = [
  {
    slug: "pearlfit-cushion",
    number: "01",
    name: "Pearlfect Skin-Fit Cushion",
    category: "Face",
    tagline: "Hi-cover cushion for combination skin, with a dual-sided puff.",
    featuredPack: "cushion-front.webp",
    details: [
      { label: "Price · Size", body: "IDR 189.000 · 13 gr" },
      {
        label: "Why it works",
        body: "A lightweight texture that blurs imperfections and evens out skin tone. Metagram Tech combines oil control with water infusion. #PearlfectCoverage",
      },
      {
        label: "5 shades",
        body: "N1 light, neutral · N1.5 light to medium, neutral · W1 light to medium, warm · N2 medium, neutral · W2 medium to tan, warm.",
      },
    ],
  },
  {
    slug: "silk-fit-concealer",
    number: "02",
    name: "Pearlfect Cover Silk-Fit Concealer",
    category: "Face",
    tagline: "The first high-cover concealer with a pearl finish that fights acne bacteria.",
    featuredPack: "pearlfect-cover-silk-fit-concealer-n1.webp",
    details: [
      { label: "Price · Size", body: "IDR 159.000 · 6.8 gr" },
      {
        label: "Why it works",
        body: "High cover with a pearl finish that fights acne-causing bacteria, made for combination skin. #PearlfectCoverage",
      },
      {
        label: "5 shades",
        body: "N1 light, neutral · N1.5 light to medium, neutral · N2 medium, neutral · N2.3 medium to tan, neutral olive · W1 light to medium, warm.",
      },
    ],
  },
  {
    slug: "skintint",
    number: "03",
    name: "Pearl-Fect Cover Skintint",
    category: "Face",
    tagline: "8-hour pearlfect cover tint meets oil control.",
    featuredPack: "skin-tint.webp",
    details: [
      { label: "Price · Size", body: "IDR 189.000 · 23 ml" },
      {
        label: "Why it works",
        body: "Minimal oxidation and UV protection. Enriched with Centella Asiatica, Squalane and Ceramide to support the skin barrier. Suitable for all skin types.",
      },
      {
        label: "12 shades",
        body: "Cool: C1, C2, C3 · Neutral: N1, N1.5, N2, N2.3, N3 · Warm: W0.5, W1, W2, W3. From very light to tan.",
      },
    ],
  },
  {
    slug: "glass-blush",
    number: "04",
    name: "Long Lasting Glass Blush",
    category: "Cheek",
    tagline: "A glow-glass finish blush with primer-like tech that lasts.",
    featuredPack: "glass-blush-packshot.webp",
    details: [
      { label: "Price · Size", body: "IDR 159.000 · 5 ml" },
      {
        label: "Why it works",
        body: "Adds a natural flush to cheeks or anywhere you want to highlight, with a luminous glass finish. Dermatology tested.",
      },
      {
        label: "5 shades",
        body: "Rose Quartz (neutral) · Pink Amethyst (neutral) · Moon Rose (cool) · Red Jasper (warm) · Coco Quartz (warm).",
      },
    ],
  },
  {
    slug: "glass-oil",
    number: "05",
    name: "Tinted Glass H2Oil",
    category: "Lips",
    tagline: "The first lip oil to cover dark and chapped lips with a glossy finish.",
    featuredPack: "glass-oil-v2-transparent-rr.webp",
    details: [
      { label: "Price · Size", body: "IDR 149.000 · 3.4 ml" },
      {
        label: "Why it works",
        body: "Non-sticky, weightless lip oil that hydrates and heals, with a luminous glass finish. Made with Vitamin E, Vitamin C, Ceramide, Shea Butter and Cocoa Butter.",
      },
      {
        label: "5 shades",
        body: "Spring Fling (dark mauve) · Pink Plastic (mauve pink) · Rally Rose (rosy coral) · Cherry Smash (vibrant cherry red) · Wife Me Up (wine).",
      },
    ],
  },
  {
    slug: "glasstick",
    number: "06",
    name: "Ink Like Air Glasstick",
    category: "Lips",
    tagline: "A glassy gloss balm with a 6-hour soft stain and Cera-shine Tech.",
    featuredPack: "glasstick-marry-me.webp",
    details: [
      { label: "Price · Size", body: "IDR 139.000 · 4 gr" },
      {
        label: "Why it works",
        body: "Cera-shine Tech traps pigment and moisture under a glassy top layer for non-sticky, soft-pigmented lips. Enriched with 3x Ceramide, Shea Butter and Jojoba for up to 6 hours of nourishment.",
      },
      {
        label: "8 shades",
        body: "Spring Fling · The One · Marry Me · Pink Plastic · Salty in Law · Cherry Wine · Trophy Wife · Wife Me Up. From nude rose to burnt terracotta and wine.",
      },
    ],
  },
  {
    slug: "sashfir",
    number: "07",
    name: "Sashfir",
    category: "Collaboration",
    tagline: "Mad For Makeup × Sashfir: a collaboration campaign.",
    details: [
      // PLACEHOLDER: Sashfir is not covered in the Product Knowledge deck.
      { label: "What it is", body: "A co-branded campaign with a full set of key visuals." },
      { label: "Collab angle", body: "Reference case for brand partnerships." },
    ],
  },
];

export const products: Product[] = defs.map((d) => ({
  ...d,
  kv: toImgs(d.slug, "kv", d.name),
  pack: toImgs(d.slug, "pack", d.name),
}));

export const HERO_IMAGE = products.find((p) => p.slug === "glasstick")!.kv.find((i) => i.src.includes("bride-moge-kv-1-img-9904")) ?? products[0].kv[0];
export const EMAIL = "im@madformakeup.co";
export const INSTAGRAM = "https://instagram.com/madformakeup.co";
