import type { Metadata } from "next";
import { Craft } from "@/components/skills";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Of the Craft — How White Words Was Made | Darshan Pathak",
  description:
    "Inside the craft of Darshan Pathak: the disciplines of a microbiologist, a sociologist and a writer — and how the 93 articles of White Words came to be.",
  keywords: [
    "Darshan Pathak writing craft",
    "microbiologist sociologist writer",
    "how White Words was written",
    "writing essays Nepal",
  ],
  alternates: { canonical: "/craft" },
  openGraph: {
    type: "website",
    url: "/craft",
    siteName: SITE_NAME,
    title: "Of the Craft — Darshan Pathak",
    description:
      "A close look at the disciplines behind White Words and the writing life of Darshan Pathak.",
  },
};

export default function CraftPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20">
        <Craft />
      </main>
      <Footer />
    </>
  );
}
