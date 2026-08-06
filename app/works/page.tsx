import type { Metadata } from "next";
import { Works } from "@/components/work";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Library — The Complete Works of Darshan Pathak",
  description:
    "Explore the complete works of Darshan Pathak: White Words (2023), a single book of 93 articles spanning love, spirit, science and the quiet architecture of the mind. ISBN 978-9937-1-3757-7.",
  keywords: [
    "Darshan Pathak works",
    "White Words articles",
    "93 articles",
    "Darshan Pathak library",
    "White Words book contents",
  ],
  alternates: { canonical: "/works" },
  openGraph: {
    type: "website",
    url: "/works",
    siteName: SITE_NAME,
    title: "The Library — The Complete Works of Darshan Pathak",
    description:
      "White Words (2023): the complete works of Darshan Pathak — 93 articles on love, spirit, science and the quiet architecture of the mind.",
  },
};

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20">
        <Works />
      </main>
      <Footer />
    </>
  );
}
