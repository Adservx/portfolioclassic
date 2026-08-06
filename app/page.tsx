import type { Metadata } from "next";
import { Home } from "@/components/home";
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_URL,
  AUTHOR,
  BOOK,
} from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: AUTHOR.name,
        givenName: AUTHOR.givenName,
        familyName: AUTHOR.familyName,
        email: AUTHOR.email,
        telephone: AUTHOR.phone,
        jobTitle: AUTHOR.jobTitle,
        nationality: AUTHOR.nationality,
        url: AUTHOR.url,
        image: AUTHOR.image,
        description:
          "Nepali microbiologist, sociologist and author of White Words (2023), a collection of 93 articles.",
        knowsAbout: [
          "Microbiology",
          "Sociology",
          "Poetry",
          "Essays",
          "Creative writing",
        ],
        subjectOf: {
          "@type": "Book",
          "@id": `${SITE_URL}/bookstore/#book`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        primaryImageOfPage: AUTHOR.image,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}