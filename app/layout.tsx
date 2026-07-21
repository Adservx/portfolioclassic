import type { Metadata, Viewport } from "next";
import { Italiana, Cormorant_Garamond, EB_Garamond, Cormorant_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display-var",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif-var",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body-var",
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-caps-var",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-var",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f4efe6",
};

export const metadata: Metadata = {
  title: "Darshan Pathak — Author of White Words",
  description:
    "The official portfolio of Darshan Pathak, author of White Words (2023). Microbiologist, sociologist, and writer of 93 articles on love, spirit, science, and the quiet architecture of the mind.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${italiana.variable} ${cormorant.variable} ${ebGaramond.variable} ${cormorantSC.variable} ${jetbrains.variable}`}
    >
      <body className="relative min-h-screen">
        <div className="paper-fibers" />
        {children}
      </body>
    </html>
  );
}
