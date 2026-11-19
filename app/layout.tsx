import type { Metadata } from "next";
import { Anton, Geist, Instrument_Serif } from "next/font/google";
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

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mad For Makeup: International Partnership Hub",
  description:
    "Mad For Makeup, an Indonesian beauty brand open to international brand, creator, marketing and distribution partnerships.",
  openGraph: {
    title: "Mad For Makeup: International Partnership Hub",
    description: "Partner with Mad For Makeup: brands, creators, agencies and distributors.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${serif.variable} ${anton.variable} antialiased`}>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject attributes into <body>. */}
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
