"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Works } from "@/components/work";
import { Craft } from "@/components/skills";
import { Praise } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { InkMotes } from "@/components/ink-motes";
import { ScrollProgress } from "@/components/scroll-progress";

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
