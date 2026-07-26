"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";

const Navbar = dynamic(() => import("@/components/navbar").then((m) => ({ default: m.Navbar })));
const Hero = dynamic(() => import("@/components/hero").then((m) => ({ default: m.Hero })));
const About = dynamic(() => import("@/components/about").then((m) => ({ default: m.About })));
const Footer = dynamic(() => import("@/components/footer").then((m) => ({ default: m.Footer })));
const InkMotes = dynamic(() => import("@/components/ink-motes").then((m) => ({ default: m.InkMotes })), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then((m) => ({ default: m.ScrollProgress })), { ssr: false });

const highlights = [
  { label: "Works", href: "/works", chapter: "Chapter II", title: "The Library", desc: "One book, 93 articles — the complete works." },
  { label: "Craft", href: "/craft", chapter: "Chapter III", title: "Of the Craft", desc: "What the work is made of, and what the work is made for." },
  { label: "Press", href: "/press", chapter: "Chapter IV", title: "Of the Reception", desc: "What the readers and well-wishers have said." },
  { label: "Contact", href: "/letters", chapter: "Chapter V", title: "Contact", desc: "Write to Darshan Pathak." },
];

export default function Prologue() {
  return (
    <>
      <ScrollProgress />
      <InkMotes count={20} />
      <Navbar />
      <main className="relative z-10">
        <About />

        {/* Chapters overview */}
        <section className="relative py-section px-6 lg:px-12 overflow-hidden bg-parchment-2">
          <div className="paper-grain absolute inset-0 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center">
              <span className="font-caps text-[0.72rem] tracking-[0.4em] uppercase text-ink-soft">The Chapters</span>
              <h2 className="mt-3 font-serif text-5xl sm:text-6xl lg:text-7xl text-ink">Explore the <em className="text-oxblood">portfolio</em></h2>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={h.href}
                    className="block bg-parchment-2 p-8 lg:p-10 h-full group hover:bg-vellum transition-colors duration-500 relative overflow-hidden"
                  >
                    <motion.span
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-y-0 w-1/2 pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
                    />
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-display text-5xl text-oxblood leading-none">{String(i + 2).padStart(2, "0")}</span>
                      <span className="fleuron text-gold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">❦</span>
                    </div>
                    <div className="font-caps text-[0.65rem] tracking-[0.4em] uppercase text-ink-soft mb-3">{h.chapter}</div>
                    <h3 className="font-serif text-3xl text-ink group-hover:text-oxblood transition-colors duration-500">{h.title}</h3>
                    <p className="mt-3 font-serif text-base text-ink-soft">{h.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-link font-caps text-[0.7rem] tracking-[0.35em] uppercase group-hover:gap-4 transition-all duration-500">
                      <span>Explore</span>
                      <span className="font-display text-sm">→</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
