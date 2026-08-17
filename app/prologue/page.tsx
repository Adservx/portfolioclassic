import type { Metadata } from "next";
import { Prologue } from "@/components/prologue";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, AUTHOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prologue — About Darshan Pathak | Author of White Words",
  description:
    "An introduction to Darshan Pathak — Nepali microbiologist, sociologist and author of White Words (2023), a first edition collecting 93 articles on love, spirit, science and the quiet architecture of the mind.",
  keywords: [
    "Darshan Pathak biography",
    "about Darshan Pathak",
    "White Words author",
    "Nepali microbiologist writer",
    "sociologist author",
    "White Words prologue",
  ],
  alternates: { canonical: "/prologue" },
  openGraph: {
    type: "profile",
    url: "/prologue",
    siteName: SITE_NAME,
    title: "About Darshan Pathak — Author of White Words",
    description: SITE_DESCRIPTION,
    images: [{ url: `${SITE_URL}/hero-og.webp`, width: 1200, height: 630 }],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/prologue/#webpage`,
    url: `${SITE_URL}/prologue`,
    name: "About Darshan Pathak",
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    about: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR.name,
      email: AUTHOR.email,
      telephone: AUTHOR.phone,
      jobTitle: AUTHOR.jobTitle,
      url: `${SITE_URL}/`,
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Prologue />
    </>
  );
}