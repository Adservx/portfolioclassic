import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_NAME, SITE_URL, AUTHOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Write to Darshan Pathak",
  description:
    "Write to author Darshan Pathak — enquiries about White Words, speaking, interviews and collaborations. Email & phone contact for readers worldwide.",
  keywords: [
    "contact Darshan Pathak",
    "Darshan Pathak email",
    "White Words author contact",
    "Darshan Pathak interview",
    "write to Darshan Pathak",
  ],
  alternates: { canonical: "/letters" },
  openGraph: {
    type: "website",
    url: "/letters",
    siteName: SITE_NAME,
    title: "Contact — Write to Darshan Pathak",
    description: `Contact details for Darshan Pathak — author of White Words (2023). Email: ${AUTHOR.email}.`,
    images: [{ url: `${SITE_URL}/hero-og.webp`, width: 1200, height: 630 }],
  },
};

export default function LettersPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
