"use client";

import { motion } from "motion/react";
import { SectionHeader } from "@/components/about";

const press = [
  {
    publication: "The New York Review of Books",
    author: "Hermione Lee",
    year: "2018",
    quote:
      "Pandit writes as if the page were a window — and what comes through it is the weather, the season, the unedited breath of a long life.",
  },
  {
    publication: "Le Monde des Livres",
    author: "Pierre Michon",
    year: "2014",
    quote:
      "Aucun écrivain de notre temps n'a prêté une attention plus tranquille, plus intraitable, à la simple présence des choses.",
  },
  {
    publication: "The Hindu",
    author: "Aravind Adiga",
    year: "2011",
    quote:
      "He has made of Indian English — and of Indian Hindi, and of silence itself — a register that no one had thought to use before him.",
  },
  {
    publication: "The Guardian",
    author: "James Wood",
    year: "2009",
    quote:
      "Pandit's sentences arrive like someone you have known a long time, sitting down across from you, and beginning, at last, to speak.",
  },
  {
    publication: "Nobel Committee",
    author: "Swedish Academy",
    year: "1998",
    quote:
      "For a body of work in which the salt, the silence, and the sorrow of ordinary life are made holy; and for a prose that knows how to wait.",
  },
  {
    publication: "Granta",
    author: "Ian Hamilton",
    year: "1996",
    quote:
      "He is the least hurried of writers. In a century that ran, Pandit sat, and the world, in his pages, learned to sit with him.",
  },
];

export function Praise() {
  return (
    <section
      id="press"
      className="relative py-section px-6 lg:px-12 overflow-hidden"
    >
      <div className="paper-grain absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Chapter IV"
          title="Of the Reception"
          subtitle="What the critics and the readers have said, in five continents and forty years."
        />

        {/* ✦ Compact press photograph band — ken burns */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-7 lg:col-span-5">
              <div className="relative aspect-[4/3] plate p-2 overflow-hidden">
                <div className="absolute inset-2 animate-ken-burns">
                  <img
                    src="https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&q=80&auto=format&fit=crop"
                    alt="A press archive — bound reviews and clippings in a wooden drawer"
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover sepia-[0.4] contrast-105"
                  />
                </div>
                <div
                  className="absolute inset-2 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 40px 8px rgba(26,20,14,0.4)" }}
                />
              </div>
            </div>
            <div className="col-span-5 lg:col-span-7 pb-4">
              <div className="font-caps text-[0.55rem] tracking-[0.4em] uppercase text-ink-soft">
                A short archive
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-3 font-serif text-xl lg:text-2xl text-ink leading-snug"
              >
                Forty years of reviews, in twelve languages, kept in a
                single drawer. &ldquo;He reads each one,&rdquo; his
                publisher says, &ldquo;and then puts it back, and never
                mentions it again.&rdquo;
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-3 font-caps text-[0.55rem] tracking-[0.4em] uppercase text-faded"
              >
                From the publisher&rsquo;s memoir · 2019
              </motion.div>
            </div>
          </div>
        </motion.figure>

        {/* ✦ Asymmetric masonry-ish grid */}
        <div className="mt-20 grid lg:grid-cols-12 gap-6 lg:gap-10">
          {press.map((p, i) => {
            const isFeature = i === 0 || i === 4;
            const isOffset = i === 1 || i === 3;
            return (
              <motion.figure
                key={p.quote.slice(0, 20)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative ${
                  isFeature ? "lg:col-span-7" : "lg:col-span-5"
                } ${isOffset ? "lg:translate-y-12" : ""}`}
              >
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 30px 60px rgba(26,20,14,0.12)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="plate-thin p-8 lg:p-10 h-full relative overflow-hidden"
                >
                  {/* Sweep on hover */}
                  <motion.span
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-y-0 w-1/3 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(163,126,44,0.1), transparent)",
                    }}
                  />

                  <div className="flex items-center justify-between border-b border-ink/40 pb-3 mb-6 relative">
                    <span className="font-display text-xl lg:text-2xl text-ink leading-none">
                      {p.publication}
                    </span>
                    <span className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-ink-soft">
                      {p.year}
                    </span>
                  </div>

                  {/* Big quote mark — pulls in */}
                  <motion.div
                    initial={{ opacity: 0, scale: 3, x: 30, y: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.08, type: "spring", stiffness: 150 }}
                    className="font-display text-7xl lg:text-8xl text-oxblood/30 leading-none -mb-6 -ml-1 select-none"
                  >
                    &ldquo;
                  </motion.div>

                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                    className={`font-serif italic text-ink-2 leading-relaxed relative ${
                      isFeature ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
                    }`}
                  >
                    {p.quote}
                  </motion.blockquote>

                  <motion.figcaption
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                    className="mt-6 pt-4 border-t border-rule flex items-center gap-3 relative"
                  >
                    <span className="h-px w-8 bg-ink" />
                    <div>
                      <div className="font-serif text-base text-ink">
                        {p.author}
                      </div>
                      <div className="font-caps text-[0.55rem] tracking-[0.4em] uppercase text-ink-soft">
                        For {p.publication}
                      </div>
                    </div>
                  </motion.figcaption>
                </motion.div>

                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-oxblood"
                />
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                  className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-oxblood"
                />
              </motion.figure>
            );
          })}
        </div>

        {/* ✦ Press list — at the bottom */}
        <div className="mt-32 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule">
          {[
            "Time · 100 Most Influential",
            "The Paris Review · Art of Fiction No. 173",
            "Sahitya Akademi · Fellowship",
            "Commonwealth Poetry Prize · 1978",
            "Danish Academy · Grand Prize",
            "Ordre des Arts et des Lettres · Commandeur",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ backgroundColor: "rgba(251,245,229,1)" }}
              className="bg-vellum p-4 font-serif text-base text-ink-2 text-center cursor-default transition-colors duration-300"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
