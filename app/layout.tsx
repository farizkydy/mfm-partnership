import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mad For Makeup: Partnerships",
  description:
    "Collaborate with Mad For Makeup. Explore the brand, the product lineup and how brands and creators can partner with us.",
  openGraph: {
    title: "Mad For Makeup: Partnerships",
    description: "Brand and influencer collaborations with Mad For Makeup.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${serif.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
