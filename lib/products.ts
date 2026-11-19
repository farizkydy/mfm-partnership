import manifest from "./manifest.json";

export type Img = { src: string; w: number; h: number; alt: string };

type Raw = { file: string; w: number; h: number }[];
const m = manifest as Record<string, { kv: Raw; pack: Raw }>;

/** Image by position in the converted KV folder (see lib/manifest.json). Throws at build if missing. */
function kv(slug: string, index: number, alt: string): Img {
  const f = m[slug].kv[index];
  if (!f) throw new Error(`Missing KV image ${slug}[${index}]`);
  return { src: `/products/${slug}/kv/${f.file}`, w: f.w, h: f.h, alt };
}

export type Product = {
  slug: string;
  name: string;
  category: "Face / Complexion" | "Lips";
  /** One short sentence. No prices, shades, sizes or ingredient lists. */
  description: string;
  cover: Img;
  /** Optional supporting visual (used by the large feature tile). */
  cover2?: Img;
  /** Render the cover in high-contrast black and white for editorial rhythm. */
  mono?: boolean;
  /** Optional link to the official product or campaign page. */
  href?: string;
};

/** The first product is shown as the large feature tile. */
export const products: Product[] = [
  {
    slug: "glasstick",
    name: "Ink Like Air Glasstick",
    category: "Lips",
    description: "A glassy gloss balm with a 6-hour soft stain and Cera-shine Tech.",
    cover: kv("glasstick", 7, "Ink Like Air Glasstick still life"),
    cover2: kv("glasstick", 3, "Ink Like Air Glasstick campaign visual"),
  },
  {
    slug: "pearlfit-cushion",
    name: "Pearlfect Skin-Fit Cushion",
    category: "Face / Complexion",
    description: "A hi-cover cushion for combination skin, with oil control and a dual-sided puff.",
    cover: kv("pearlfit-cushion", 9, "Pearlfect Skin-Fit Cushion campaign visual"),
  },
  {
    slug: "silk-fit-concealer",
    name: "Pearlfect Cover Silk-Fit Concealer",
    category: "Face / Complexion",
    description: "The first high-cover concealer with a pearl finish that fights acne bacteria.",
    cover: kv("silk-fit-concealer", 4, "Pearlfect Cover Silk-Fit Concealer campaign visual"),
    mono: true,
  },
  {
    slug: "skintint",
    name: "Pearl-Fect Cover Skintint",
    category: "Face / Complexion",
    description: "An 8-hour pearlfect cover tint that meets oil control, with skin-barrier care.",
    cover: kv("skintint", 3, "Pearl-Fect Cover Skintint campaign visual"),
  },
  {
    slug: "glass-blush",
    name: "Long Lasting Glass Blush",
    category: "Face / Complexion",
    description: "A glow-glass finish blush with primer-like tech for a natural, luminous flush.",
    cover: kv("glass-blush", 2, "Long Lasting Glass Blush campaign visual"),
  },
  {
    slug: "glass-oil",
    name: "Tinted Glass H2Oil",
    category: "Lips",
    description: "The first lip oil to cover dark and chapped lips with a glossy, non-sticky finish.",
    cover: kv("glass-oil", 2, "Tinted Glass H2Oil campaign visual"),
  },
];

export type Campaign = {
  slug: string;
  name: string;
  partner: string;
  tagline: string;
  intro: string;
  concept: string;
  featuredProducts: string[];
  /** Figures as published on the campaign's own website. */
  stats?: { value: string; label: string }[];
  href: string;
  keyVisual: Img;
  /** Portrait crop used under the sm breakpoint; falls back to keyVisual. */
  keyVisualMobile?: Img;
  gallery: Img[];
};

/** Add new collaborations to this list; the first is the takeover, the rest render as case-study tiles. */
export const campaigns: Campaign[] = [
  {
    slug: "sashfir",
    name: "A Touch of Sashfir",
    partner: "Sashfir",
    tagline: "Blood for love. Bold for confidence.",
    intro:
      "A collaboration between Mad For Makeup and Sashfir. Most collaborations borrow a name; this one took two years of Sashfir's work, from the lab to the product cap.",
    concept:
      "It began with Sashfir listening to fans: eyeliner that slides off oily lids, lip colours that dry out lips. Red was chosen as a message that we hear them. Blood & Bold.",
    // Names as listed on s.madformakeup.co (no shades).
    featuredProducts: [
      "Pearlfect Cover Skin Tint · Mini",
      "DEFINILIP Blur Cover + Lip Liner",
      "Glass Cream Glossy Lip Cream",
      "INKTense Dusk Till Dawn Eyeliner",
    ],
    stats: [
      { value: "2", label: "years from first sample to launch" },
      { value: "200", label: "people on the test panel" },
      { value: "300+", label: "packaging samples, all kept" },
      { value: "400", label: "design hours in every product" },
    ],
    href: "https://s.madformakeup.co/",
    keyVisual: kv("sashfir", 1, "A Touch of Sashfir key visual"),
    keyVisualMobile: kv("sashfir", 2, "A Touch of Sashfir key visual"),
    gallery: [0, 4, 6, 8, 10, 11, 13, 17].map((i) => kv("sashfir", i, `A Touch of Sashfir campaign visual ${i}`)),
  },
];

/** Hero collage: a colour portrait plus a smaller black-and-white crop. */
export const HERO_IMAGE = kv("glasstick", 0, "Bride with a red lip, Mad For Makeup campaign");
export const HERO_IMAGE_2 = kv("skintint", 7, "Close-up beauty portrait, Mad For Makeup campaign");
export const ABOUT_IMAGE = kv("silk-fit-concealer", 8, "Mad For Makeup campaign portrait");
