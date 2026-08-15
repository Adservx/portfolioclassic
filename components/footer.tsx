"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useCanParallax } from "@/lib/use-is-mobile";

const colophon = [
["First Edition", "A.D. 2023"],
["Publisher", "Darshan Pathak, Nepal"],
["Printer", "New Baba Chhapakhana, Butwal-8, Rupandehi"],
["Contact", "darshanpathak2082@gmail.com"],
];

const links = [
  { label: "Prologue", href: "/prologue" },
  { label: "The Library", href: "/works" },
  { label: "Of the Craft", href: "/craft" },
  { label: "Of the Reception", href: "/press" },
  { label: "Contact", href: "/letters" },
  { label: "Bookstore", href: "/bookstore" },
];

export function Footer() {
  const prefersReduced = useReducedMotion();
  const canParallax = useCanParallax();
  const ref = useRef<HTMLElement>(null);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} className="relative bg-ink text-vellum">
      <div className="paper-grain absolute inset-0 pointer-events-none opacity-30 hidden md:block" />

      {/* ✦ Slow rotating seal in background — desktop only (infinite spin = mobile jank) */}
      {canParallax && !prefersReduced && (
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            className="w-[140%] aspect-square border border-vellum/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            className="absolute w-[120%] aspect-square border border-vellum/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 280, repeat: Infinity, ease: "linear" }}
            className="absolute w-[100%] aspect-square border border-vellum/5 rounded-full"
          />
        </div>
      )}

<div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-16 sm:py-20">
{/* ✦ Huge name, like a book's final page */}
<div className="text-center">
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.8 }}
className="flex items-center justify-center gap-2 sm:gap-3 text-vellum/60"
>
<motion.span
initial={{ scaleX: 0 }}
whileInView={{ scaleX: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.8, delay: 0.2 }}
className="h-px w-6 sm:w-10 bg-vellum/40 origin-right"
/>
<span className="font-caps text-[0.75rem] sm:text-[0.85rem] tracking-[0.45em] uppercase">
Finish · The End
</span>
<motion.span
initial={{ scaleX: 0 }}
whileInView={{ scaleX: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.8, delay: 0.2 }}
className="h-px w-6 sm:w-10 bg-vellum/40 origin-left"
/>
</motion.div>

<h2 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-vellum leading-[0.9]">
<span className="letter-cascade inline-block">
{"Darshan".split("").map((ch, i) => (
<span
key={i}
style={{ animationDelay: `${400 + i * 50}ms` }}
className="inline-block"
>
{ch}
</span>
))}
</span>
<motion.span
initial={{ opacity: 0, y: -10 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
className="block font-serif text-[0.52em] text-gold-soft font-light -mt-2"
>
<span className="letter-cascade inline-block">
{"pathak".split("").map((ch, i) => (
<span
key={i}
style={{ animationDelay: `${1200 + i * 50}ms` }}
className="inline-block"
>
{ch}
</span>
))}
</span>
</motion.span>
</h2>

<motion.p
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.8, delay: 0.4 }}
className="mt-6 font-serif text-vellum/70 text-lg max-w-xl mx-auto"
>
&ldquo;Dark guides to find the natural light in our life.&rdquo;
</motion.p>

{/* ✦ Big wax seal */}
<motion.div
initial={{ opacity: 0, scale: 4, rotate: -25 }}
whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
viewport={{ once: true }}
transition={{ delay: 0.5, duration: 0.9, type: "spring", stiffness: 150 }}
className="mt-10 mx-auto w-28 h-28 rounded-full border-4 border-double border-oxblood flex items-center justify-center bg-oxblood/10"
>
<div className="w-24 h-24 rounded-full border border-oxblood/60 flex flex-col items-center justify-center">
<span className="font-display text-oxblood text-text-base leading-none">
D · P
</span>
<span className="font-caps text-oxblood/80 text-[0.7rem] tracking-[0.4em] mt-1">
MMXXIII
</span>
</div>
</motion.div>
</div>

{/* ✦ Navigation + colophon */}
<div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 pt-8 sm:pt-10 border-t border-vellum/15">
{/* Navigation */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.2 }}
className="lg:col-span-3"
>
<div className="font-caps text-[0.85rem] tracking-[0.4em] uppercase text-vellum/50 mb-4">
The Chapters
</div>
<ul className="space-y-2">
{links.map((l, i) => (
<motion.li
key={l.href}
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
>
              <Link
                  href={l.href}
                  className="group inline-flex items-center gap-2 font-serif text-link underline underline-offset-4 decoration-link/60 transition-colors duration-300"
                >
                  <span className="font-display text-gold-soft text-text-base group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  {l.label}
                </Link>
</motion.li>
))}
</ul>
</motion.div>

{/* Colophon */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.3 }}
className="lg:col-span-5"
>
<div className="font-caps text-[0.85rem] tracking-[0.4em] uppercase text-vellum/50 mb-4">
Colophon
</div>
<dl className="space-y-3">
{colophon.map(([term, def], i) => (
<motion.div
key={term}
initial={{ opacity: 0, y: 10 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
className="grid grid-cols-4 sm:grid-cols-12 gap-2 sm:gap-4 border-b border-vellum/10 pb-3"
>
<dt className="col-span-4 sm:col-span-3 font-caps text-[0.8rem] sm:text-[0.85rem] tracking-[0.3em] uppercase text-vellum/50">
{term}
</dt>
<dd className="col-span-8 sm:col-span-9 font-serif text-vellum/85 text-text-base sm:text-text-lg">
{def}
</dd>
</motion.div>
))}
</dl>
</motion.div>

{/* Follow */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.35 }}
className="lg:col-span-2"
>
<div className="font-caps text-[0.85rem] tracking-[0.4em] uppercase text-vellum/50 mb-4">
Follow
</div>
<ul className="space-y-2">
<li>
<a
href="https://www.facebook.com/durrsuunn.pathak"
target="_blank"
rel="noopener noreferrer"
className="group inline-flex items-center gap-2 font-serif text-link underline underline-offset-4 decoration-link/60 transition-colors duration-300"
>
<span className="font-display text-gold-soft text-text-base group-hover:translate-x-1 transition-transform duration-300">
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
<path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.235 2.686.235v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
</svg>
</span>
Facebook
</a>
</li>
<li>
<a
href="https://wa.me/qr/22ZL74QMTDNVK1"
target="_blank"
rel="noopener noreferrer"
className="group inline-flex items-center gap-2 font-serif text-link underline underline-offset-4 decoration-link/60 transition-colors duration-300"
>
<span className="font-display text-gold-soft text-text-base group-hover:translate-x-1 transition-transform duration-300">
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>
</span>
WhatsApp
</a>
</li>
<li>
<a
href="https://x.com/author_darshan"
target="_blank"
rel="noopener noreferrer"
className="group inline-flex items-center gap-2 font-serif text-link underline underline-offset-4 decoration-link/60 transition-colors duration-300"
>
<span className="font-display text-gold-soft text-text-base group-hover:translate-x-1 transition-transform duration-300">
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
</svg>
</span>
X (Twitter)
</a>
</li>
</ul>
</motion.div>

{/* Return to top */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.4 }}
className="lg:col-span-2 flex flex-col items-start lg:items-end"
>
<div className="font-caps text-[0.85rem] tracking-[0.4em] uppercase text-vellum/50 mb-4">
Back to the top
</div>
<button
onClick={goTop}
className="group flex items-center gap-3 cursor-pointer"
>
<span className="font-serif text-link group-hover:text-link-hover transition-colors duration-300">
Return
</span>
<motion.span
whileHover={{ rotate: 360 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
className="w-12 h-12 border border-link/40 rounded-full flex items-center justify-center group-hover:border-link-hover group-hover:bg-link/10 transition-[border-color,background-color] duration-500"
>
                <span className="font-display text-lg sm:text-xl text-link group-hover:text-link-hover animate-arrow-nudge-y">
                    ↑
                  </span>
</motion.span>
</button>
<div className="mt-4 sm:mt-6 font-serif text-vellum/40 text-text-sm sm:text-text-base">
ISBN 978-9937-1-3757-7
</div>
</motion.div>
</div>

{/* ✦ Final mark */}
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.8, delay: 0.6 }}
className="mt-16 pt-6 pb-0 sm:pb-8 border-t border-vellum/15 flex flex-col sm:flex-row items-center justify-between gap-4 relative"
>
<p className="font-caps text-[0.8rem] tracking-[0.4em] uppercase text-vellum/40">
© 2023 · Darshan Pathak · All rights reserved
</p>
<div className="flex items-center gap-3">
              <span className="fleuron text-gold-soft text-text-lg animate-fleuron-spin">
                ❦
              </span>
              <span className="font-serif text-vellum/50 text-text-base">
                White Words · First Edition
              </span>
              <span className="fleuron text-gold-soft text-text-lg animate-fleuron-spin" style={{ animationDelay: "-3s" }}>
                ❦
              </span>
</div>
<div className="mt-4 sm:mt-0 sm:absolute sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 text-center">
<a
href="https://prajkit.com.np"
target="_blank"
rel="noopener noreferrer"
className="group inline-flex items-center gap-2 font-caps text-[0.75rem] tracking-[0.35em] uppercase text-vellum/40 transition-colors duration-300 hover:text-vellum/70 cursor-pointer"
>
<span className="relative w-6 h-6 rounded-full overflow-hidden border border-vellum/30 group-hover:border-gold-soft transition-colors duration-300">
<Image
src="/prajkit.jpeg"
alt="PrajKit Company"
fill
loading="lazy"
sizes="24px"
className="object-cover"
/>
</span>
Crafted by <span className="text-gold-soft group-hover:text-gold-soft/80">PrajKit Company</span> ↗
</a>
</div>
</motion.div>
</div>
</footer>
);
}
