"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar").then((m) => ({ default: m.Navbar })));
const Hero = dynamic(() => import("@/components/hero").then((m) => ({ default: m.Hero })));
const Footer = dynamic(() => import("@/components/footer").then((m) => ({ default: m.Footer })));
const InkMotes = dynamic(() => import("@/components/ink-motes").then((m) => ({ default: m.InkMotes })), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then((m) => ({ default: m.ScrollProgress })), { ssr: false });

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
