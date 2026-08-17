import type { Metadata } from "next";
import { Praise } from "@/components/testimonials";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Of the Reception — Praise for White Words | Darshan Pathak",
  description:
    "What readers and well-wishers have said about White Words (2023) by Darshan Pathak — reviews and praise from family, editors and readers of the 93 articles.",
  keywords: [
    "White Words reviews",
    "White Words praise",
    "Darshan Pathak testimonials",
    "White Words reception",
  ],
  alternates: { canonical: "/press" },
  openGraph: {
    type: "website",
    url: "/press",
    siteName: SITE_NAME,
    title: "Of the Reception — Praise for White Words",
    description: "Readers' and well-wishers' words on White Words by Darshan Pathak.",
    images: [{ url: `${SITE_URL}/hero-og.webp`, width: 1200, height: 630 }],
  },
};

export default function PressPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20">
        <Praise />
      </main>
      <Footer />
    </>
  );
}
