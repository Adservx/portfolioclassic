"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const Navbar = dynamic(() => import("@/components/navbar").then((m) => ({ default: m.Navbar })));
const Hero = dynamic(() => import("@/components/hero").then((m) => ({ default: m.Hero })));
const About = dynamic(() => import("@/components/about").then((m) => ({ default: m.About })));
const Works = dynamic(() => import("@/components/work").then((m) => ({ default: m.Works })));
const Craft = dynamic(() => import("@/components/skills").then((m) => ({ default: m.Craft })));
const Praise = dynamic(() => import("@/components/testimonials").then((m) => ({ default: m.Praise })));
const Contact = dynamic(() => import("@/components/contact").then((m) => ({ default: m.Contact })));
const Footer = dynamic(() => import("@/components/footer").then((m) => ({ default: m.Footer })));
const InkMotes = dynamic(() => import("@/components/ink-motes").then((m) => ({ default: m.InkMotes })), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then((m) => ({ default: m.ScrollProgress })), { ssr: false });

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <InkMotes count={20} />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Works />
        <Craft />
        <Praise />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
