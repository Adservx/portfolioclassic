import type { Metadata } from "next";
import { Store } from "@/components/bookstore/store";
import { SITE_NAME, SITE_URL, BOOK, AUTHOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "White Words — Official Bookstore | Darshan Pathak",
  description:
    "Buy White Words (2023) by Darshan Pathak — the author's only published work: 93 articles on love, spirit, science and the quiet architecture of the mind. Hardcover or digital PDF. ISBN 978-9937-1-3757-7.",
  keywords: [
    "White Words book",
    "buy White Words",
    "White Words by Darshan Pathak",
    "Darshan Pathak bookstore",
    "White Words PDF",
    "ISBN 978-9937-1-3757-7",
    "poetry and essays book",
    "Nepali book online",
    "93 articles",
    "White Words price",
  ],
  alternates: { canonical: "/bookstore" },
  openGraph: {
    type: "book",
    url: "/bookstore",
    siteName: SITE_NAME,
    title: "White Words (2023) — Darshan Pathak · Official Bookstore",
    description: BOOK.description,
    images: [{ url: BOOK.coverImage, width: 1200, height: 630, alt: "Cover of White Words by Darshan Pathak" }],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        "@id": `${SITE_URL}/bookstore/#book`,
        name: BOOK.title,
        description: BOOK.description,
        inLanguage: "en",
        isbn: BOOK.isbn,
        bookFormat: "https://schema.org/Paperback",
        bookEdition: "First Edition",
        numberOfPages: BOOK.pageCount,
        publisher: {
          "@type": "Person",
          name: BOOK.publisher,
          url: `${SITE_URL}/`,
        },
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: AUTHOR.name,
          email: AUTHOR.email,
          url: `${SITE_URL}/`,
        },
        datePublished: "2023",
        dateCreated: "2023",
        copyrightYear: "2023",
        image: BOOK.coverImage,
        url: BOOK.url,
        offers: {
          "@type": "Offer",
          url: BOOK.url,
          price: "3.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Person",
            name: AUTHOR.name,
            email: AUTHOR.email,
          },
          areaServed: "Worldwide",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/bookstore/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Bookstore",
            item: `${SITE_URL}/bookstore`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Store />
    </>
  );
}