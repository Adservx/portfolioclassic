import type { Metadata } from "next";
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
  weight: ["300", "400", "500", "600", "700"],
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

export const metadata: Metadata = {
  title: "Rajaram Pandit — Nobel Laureate in Literature",
  description:
    "The official portfolio of Rajaram Pandit, Nobel Laureate in Literature. Essays, poetry, novels, and the long arc of a singular literary voice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${cormorant.variable} ${ebGaramond.variable} ${cormorantSC.variable} ${jetbrains.variable}`}
    >
      <body className="relative min-h-screen">
        <div className="paper-fibers" />
        {children}
      </body>
    </html>
  );
}
