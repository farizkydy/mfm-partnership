import partnershipTypes from "./partnership-types.json";

/**
 * Editable site content. To update the site, change the arrays below
 * (and lib/products.ts for products and campaigns). No component changes needed.
 */

export const EMAIL = "mad.natasya@gmail.com";
export const OFFICIAL_SITE = "https://madformakeup.co";

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/madformakeup.co" },
  { label: "X", href: "https://x.com/madformakeup_co" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/madverse" },
];

export const PARTNERSHIP_TYPES: string[] = partnershipTypes;

export const nav = [
  { href: "#top", label: "Home" },
  { href: "#collaborations", label: "Collaborations" },
  { href: "#about", label: "About Mad" },
  { href: "#products", label: "Products" },
  { href: "#opportunities", label: "Partnership Opportunities" },
  { href: "#collab", label: "Contact" },
];

export const hero = {
  headline: "Made in Indonesia.",
  accent: "Ready to Connect with the World.",
  copy: "An Indonesian beauty brand driven by creativity, innovation and a community-first mindset, always open to building something exciting with people who share the same energy.",
};

export const about = {
  quote: "Everyone gets",
  quoteAccent: "acne.",
  quoteSub: "We believe everyone deserves to feel confident in their own skin.",
  paragraphs: [
    "Mad For Makeup is an Indonesian makeup brand built on the belief that makeup should never come with rules or limitations. We create innovative, high-performance, acne-safe makeup designed for real skin, real people, and real life.",
    "We're here to challenge beauty norms, make makeup more inclusive, and encourage everyone to express themselves unapologetically.",
  ],
};

// Qualitative only. Add verified achievements from the official proposal here as `stat`.
export const whyPartner: { label: string; body: string; stat?: string }[] = [
  { label: "Market Insight", body: "A strong understanding of the Indonesian beauty market." },
  { label: "Community", body: "A brand with an active, engaged audience." },
  { label: "Creative Campaigns", body: "A creative approach that goes beyond the ordinary." },
  {
    label: "Collaboration",
    body: "Experience working with creators and building campaigns that go beyond product promotion.",
  },
];

export const opportunities: { title: string; body: string; type: string }[] = [
  {
    title: "Brand & Product Collaboration",
    body: "Co-create exclusive products, collections, campaigns, or creative projects with other brands.",
    type: "Brand Collaboration",
  },
  {
    title: "Influencer / Creator Partnership",
    body: "Product seeding, PR packages, sponsored content, and long-term partnerships with international creators.",
    type: "Influencer / Creator Partnership",
  },
  {
    title: "Marketing & Campaign Collaboration",
    body: "Creative campaigns, social media activations, content projects, and other marketing initiatives.",
    type: "Marketing / Campaign Collaboration",
  },
  {
    title: "Distribution & Business Opportunities",
    body: "Distributors, retailers, and other strategic partners in international markets.",
    type: "Distribution / Business Opportunity",
  },
];

export const steps = [
  { title: "Reach Out", body: "Tell us about yourself, your brand, or your collaboration idea." },
  { title: "Share Your Proposal", body: "Send us your concept, objectives, and relevant details." },
  { title: "Let's Discuss", body: "Our team will review your proposal and discuss potential opportunities." },
  { title: "Make It Happen", body: "If there is a mutual fit, we'll explore the next steps together." },
];

export const contact = {
  headline: "Have something in mind?",
  accent: "Let's make it happen.",
};

export const footer = {
  // Constant on purpose: Next's prerender rejects new Date(). Update each year.
  year: 2026,
  description:
    "An Indonesian beauty brand creating acne-safe makeup for real skin, real people, and real life.",
};
