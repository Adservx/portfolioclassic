"use client";

import { useRef } from "react";
import { motion } from "motion/react";

const colophon = [
  ["Set in", "Italiana, Cormorant Garamond & EB Garamond"],
  ["Printed on", "Recycled parchment, FSC certified"],
  ["First folio", "A.D. MMXXVI"],
  ["Engraver", "OpenCode · Studio of Letters"],
];

const links = [
  { label: "Prologue", href: "#prologue" },
  { label: "The Library", href: "#works" },
  { label: "Of the Craft", href: "#craft" },
  { label: "Press", href: "#press" },
  { label: "Letters", href: "#letters" },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} className="relative bg-ink text-vellum">
      <div className="paper-grain absolute inset-0 pointer-events-none opacity-30" />

      {/* ✦ Slow rotating seal in background */}
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

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-20">
        {/* ✦ Huge name, like a book's final page */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-vellum/60"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px w-10 bg-vellum/40 origin-right"
            />
            <span className="font-caps text-[0.6rem] tracking-[0.45em] uppercase">
              Finis · The End
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px w-10 bg-vellum/40 origin-left"
            />
          </motion.div>

          <h2 className="mt-6 font-display text-6xl md:text-7xl lg:text-8xl text-vellum leading-[0.9]">
            <span className="letter-cascade inline-block">
              {"Rajaram".split("").map((ch, i) => (
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
              initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block italic font-serif text-[0.42em] text-gold-soft font-light -mt-2"
            >
              <span className="letter-cascade inline-block">
                {"pandit".split("").map((ch, i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${900 + i * 50}ms` }}
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
            className="mt-6 font-serif italic text-vellum/70 text-lg max-w-xl mx-auto"
          >
            &ldquo;The page refuses nothing honest.&rdquo; — A life in letters, still being
            written.
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
              <span className="font-display text-oxblood text-sm leading-none">
                R · P
              </span>
              <span className="font-caps text-oxblood/80 text-[0.45rem] tracking-[0.4em] mt-1">
                MMXXVI
              </span>
            </div>
          </motion.div>
        </div>

        {/* ✦ Navigation + colophon */}
        <div className="mt-20 grid lg:grid-cols-12 gap-10 lg:gap-16 pt-10 border-t border-vellum/15">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-vellum/50 mb-4">
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
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 font-serif text-vellum/80 hover:text-gold-soft transition-colors duration-300 link-underline"
                  >
                    <span className="font-display text-gold-soft text-sm group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                    {l.label}
                  </a>
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
            <div className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-vellum/50 mb-4">
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
                  className="grid grid-cols-12 gap-4 border-b border-vellum/10 pb-3"
                >
                  <dt className="col-span-3 font-caps text-[0.6rem] tracking-[0.3em] uppercase text-vellum/50">
                    {term}
                  </dt>
                  <dd className="col-span-9 font-serif text-vellum/85 italic">
                    {def}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          {/* Return to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 flex flex-col items-start lg:items-end"
          >
            <div className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-vellum/50 mb-4">
              Back to the top
            </div>
            <button
              onClick={goTop}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <span className="font-serif italic text-vellum/80 group-hover:text-gold-soft transition-colors duration-300">
                Return
              </span>
              <motion.span
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-12 h-12 border border-vellum/40 rounded-full flex items-center justify-center group-hover:border-gold-soft group-hover:bg-gold-soft/10 transition-all duration-500"
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="font-display text-xl text-vellum group-hover:text-gold-soft"
                >
                  ↑
                </motion.span>
              </motion.span>
            </button>
            <div className="mt-6 font-serif italic text-vellum/40 text-sm">
              No. 01 · Volume I
            </div>
          </motion.div>
        </div>

        {/* ✦ Final mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-6 border-t border-vellum/15 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-caps text-[0.55rem] tracking-[0.4em] uppercase text-vellum/40">
            © MMXXVI · The Pandit Estate · All rights reserved
          </p>
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="fleuron text-gold-soft text-base"
            >
              ❦
            </motion.span>
            <span className="font-serif italic text-vellum/50 text-sm">
              Patiently, against the dark
            </span>
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="fleuron text-gold-soft text-base"
            >
              ❦
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
