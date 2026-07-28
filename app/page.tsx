"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

// Non-critical overlays only — keep Navbar/Hero/Footer static to avoid chunk pop-in
const InkMotes = dynamic(
  () => import("@/components/ink-motes").then((m) => ({ default: m.InkMotes })),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () =>
    import("@/components/scroll-progress").then((m) => ({
      default: m.ScrollProgress,
    })),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <InkMotes count={20} />
      <Navbar />
      <main className="relative z-10">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
