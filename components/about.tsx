"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Counter } from "@/components/counter";

const VARANASI_IMG = "/varanasi-author.webp";

const stats = [
  { target: 93, suffix: "", label: "Articles in White Words" },
  { target: 2023, suffix: "", label: "First Edition" },
  { target: 2, suffix: "", label: "Professions" },
  { target: 1, suffix: "", label: "Book Published" },
];

const biography = [
  {
    period: "1992",
    title: "Born in Nepal",
    text: "Darshan Pathak born in Nepal. Early interest in science and humanities.",
  },
  {
    period: "2015, 2024",
    title: "Microbiology & Sociology",
    text: "Pursued dual expertise with a B.Sc. in Microbiology and an M.Arts in Sociology, combining a strong foundation in laboratory life sciences with advanced analytical research in human social systems",
  },
  {
    period: "2023",
    title: "White Words published",
    text: "First Edition of 'White Words' released — 93 articles spanning love, spirit, science, and the quiet architecture of the mind. ISBN 978-9937-1-3757-7.",
  },
  {
    period: "Today",
    title: "Author & Researcher",
    text: "Continues writing and research. Lives in Nepal. Email: darshanpathak1992@gmail.com. Phone: +977 9741766064.",
  },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const armsY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-section px-6 lg:px-12 overflow-hidden"
    >
      <div className="paper-grain absolute inset-0 pointer-events-none" />

      {/* ✦ Floating ambient drift */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl animate-drift-1"
          style={{ background: "radial-gradient(circle, rgba(107,31,26,0.04), transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Chapter I"
          title="Of the Author"
          subtitle={
            <>
              Darshan Pathak — microbiologist, sociologist, and author of{" "}
              <cite className="not-italic font-semibold text-oxblood">White Words</cite>
            </>
          }
        />

        {/* ✦ Asymmetric two-column */}
          <div className="mt-12 sm:mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            {/* Left — letter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-caps text-[0.7rem] sm:text-[0.72rem] tracking-[0.4em] uppercase text-ink-soft mb-4 sm:mb-6 flex items-center gap-3"
              >
                <span className="fleuron text-gold">❦</span>
                From the preface to White Words, 2023
              </motion.div>

            <div className="font-serif text-[1.05rem] sm:text-[1.18rem] leading-[1.75] text-ink-2 space-y-5">
                <p>
                  <span className="drop-cap animate-splotch-pop">T</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    {" "}his book may be useful for all. In this book the key feature
                    is the series of 93 Articles, containing positive status, a
                    glossary of literary terms, and motivates to writing literary
                    essays and documenting them in correct format. In this book the
                    article "Dark" guides to find the natural light in our life.
                  </motion.span>
                </p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  I have been asked, by kind interviewers in Stockholm and
                  elsewhere, whether I consider myself a poet or a novelist. I
                  do not know what I am. I only know that I have written, every
                  day of my adult life, and that the writing has never become
                  easier. It has only become more necessary.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  What I have to offer my reader is small, and it is also
                  everything I have. It is a record of having paid attention.
                  That is all a writer can do.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 sm:mt-10 flex items-center gap-4 text-ink-soft"
              >
                <span className="h-px flex-1 bg-rule" />
                <span className="font-serif italic text-sm sm:text-base">
                  — Darshan Pathak, in confidence
                </span>
              </motion.div>
            </motion.div>

            {/* Right — coat of arms / heraldic plate */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <motion.div
                whileHover={{ rotate: 0.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="plate p-6 sm:p-8 lg:p-10 max-w-sm mx-auto hover:shadow-[0_30px_60px_rgba(26,20,14,0.15)] transition-shadow duration-700 relative overflow-hidden"
                style={{
                  backgroundImage: "url(/arms-bg.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-parchment/70" />
                <div className="text-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.1em" }}
                    whileInView={{ opacity: 1, letterSpacing: "0.45em" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="font-caps text-[0.55rem] uppercase text-ink-soft"
                  >
                    White Words &middot; First Edition
                  </motion.div>

                  <motion.div style={{ y: armsY }} className="mt-6 flex justify-center">
                    <CoatOfArms />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 font-display text-2xl text-ink"
                  >
                    Darshan Pathak
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-1 font-serif italic text-sm text-ink-soft"
                  >
                    &ldquo;The series of 93 Articles&rdquo;
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-6 grid grid-cols-2 gap-px bg-rule"
                  >
                    <div className="bg-parchment-2 p-3">
                      <div className="font-caps text-[0.45rem] tracking-[0.35em] uppercase text-ink-soft">
                        Articles
                      </div>
                      <div className="font-serif italic text-base text-ink mt-1">
                        93
                      </div>
                    </div>
                    <div className="bg-parchment-2 p-3">
                      <div className="font-caps text-[0.45rem] tracking-[0.35em] uppercase text-ink-soft">
                        Published
                      </div>
                      <div className="font-serif italic text-base text-ink mt-1">
                        2023
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    style={{ y: y2 }}
                    className="mt-8 pt-6 border-t border-rule"
                  >
                    <div className="font-caps text-[0.45rem] tracking-[0.4em] uppercase text-ink-soft">
                      Article &ldquo;Dark&rdquo;
                    </div>
                    <div className="font-serif italic text-lg text-ink mt-1">
                      &ldquo;Dark guides to find the natural light in our life&rdquo;
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        {/* ✦ Varanasi plate — ken burns */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 lg:mt-32"
        >
          <div className="plate p-2 sm:p-3 lg:p-4 max-w-5xl mx-auto">
            <div className="relative aspect-[4/3] sm:aspect-[16/7] overflow-hidden">
              <div className="absolute inset-0 animate-ken-burns">
                <img
                  src={VARANASI_IMG}
                  alt="The ghats of Varanasi at first light, where the river meets the city"
                  width={1400}
                  height={613}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top brightness-[1.08] contrast-[1.15] saturate-[1.1]"
                />
              </div>
              {/* Color grade — warm/cinematic tone */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(210,150,70,0.18) 0%, rgba(180,120,60,0.08) 40%, rgba(70,100,130,0.12) 70%, rgba(50,70,100,0.2) 100%)",
                }}
              />
              {/* Soft overlay glow */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(230,190,120,0.06) 0%, transparent 45%, transparent 65%, rgba(40,60,80,0.08) 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,20,14,0.2) 0%, transparent 35%, transparent 60%, rgba(26,20,14,0.65) 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 100px 20px rgba(26,20,14,0.5)" }}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute top-4 left-4 right-4 flex items-start justify-between text-vellum"
              >
                <span className="font-caps text-[0.65rem] tracking-[0.45em] uppercase">
                  Plate II · The Honours
                </span>
                <span className="font-caps text-[0.65rem] tracking-[0.45em] uppercase">
                  Nepal · 2023–MMXXV
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute bottom-4 left-4 right-4 text-vellum"
              >
                <div className="font-serif italic text-lg lg:text-2xl leading-snug max-w-xl">
                  &ldquo;The recognition is not mine alone — it belongs to
                  every word, every page, every sleepless hour.&rdquo;
                </div>
                <div className="mt-2 font-caps text-[0.65rem] tracking-[0.4em] uppercase text-vellum/80">
                  From the author&rsquo;s notes · 2023
                </div>
              </motion.div>
            </div>
          </div>
          <motion.figcaption
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-3 text-center font-serif italic text-xs sm:text-sm text-ink-soft px-4"
          >
            A collection of achievements recognising a lifetime devoted to
            the written word.
          </motion.figcaption>
        </motion.figure>

        {/* ✦ Stats row — with counters */}
          <div className="mt-20 sm:mt-24 lg:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, backgroundColor: "rgba(251, 245, 229, 1)" }}
                className="bg-vellum p-4 sm:p-6 lg:p-8 text-center group cursor-default transition-colors duration-500"
              >
                <div className="font-display text-3xl sm:text-5xl lg:text-6xl text-ink leading-none">
                  <Counter target={s.target} suffix={s.suffix} />
                </div>
                <div className="mt-2 sm:mt-3 font-caps text-[0.65rem] sm:text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft group-hover:text-oxblood transition-colors duration-500">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

        {/* ✦ Timeline */}
        <div className="mt-20 sm:mt-24 lg:mt-32">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="font-caps text-[0.72rem] tracking-[0.4em] uppercase text-ink-soft">
                Chronology
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mt-2">
                Five dates, <em className="text-oxblood">a life.</em>
              </h3>
            </div>
            <div className="hidden md:flex items-center gap-3 text-ink-soft">
              <span className="fleuron text-gold text-xl animate-pulse-dot">❦</span>
              <span className="font-serif italic text-sm">Anno Domini</span>
            </div>
          </div>

          <div className="space-y-0">
            {biography.map((b, i) => (
              <motion.div
                key={b.period}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-12 gap-3 sm:gap-6 py-6 sm:py-8 border-t border-rule last:border-b last:border-b-rule hover:bg-vellum/30 transition-colors duration-500"
              >
                <div className="col-span-4 sm:col-span-3 lg:col-span-2">
                  <div className="font-display text-2xl sm:text-4xl lg:text-5xl text-oxblood leading-none group-hover:scale-110 transition-transform duration-500 origin-left">
                    {b.period}
                  </div>
                </div>
                <div className="col-span-8 sm:col-span-9 lg:col-span-10">
                  <h4 className="font-serif text-xl sm:text-2xl text-ink group-hover:text-oxblood transition-colors duration-500">
                    {b.title}
                  </h4>
                  <p className="mt-2 font-serif text-[0.95rem] sm:text-[1.05rem] leading-relaxed text-ink-soft max-w-2xl">
                    {b.text}
                  </p>
                </div>
                {/* Vertical timeline rule with draw animation */}
                <div className="absolute left-[8.5rem] top-0 bottom-0 w-px bg-rule hidden lg:block">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "top" }}
                    className="w-px h-full bg-oxblood/40"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-4"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px w-12 bg-ink origin-right"
        />
        <span className="font-caps text-[0.72rem] tracking-[0.45em] uppercase text-ink-soft">
          {eyebrow}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px w-12 bg-ink origin-left"
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 sm:mt-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05]"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
        className="origin-center mt-6 flex items-center justify-center gap-3"
      >
        <span className="fleuron text-gold text-xl">❦</span>
        <span className="h-px w-8 bg-rule" />
        <span className="fleuron text-gold text-xl">❦</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-4 sm:mt-6 font-serif italic text-base sm:text-lg text-ink-soft px-4 sm:px-0"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

function CoatOfArms() {
  return (
    <motion.svg
      viewBox="0 0 200 220"
      className="w-40 h-44 text-ink"
      fill="none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.path
        d="M30 50 Q30 30 50 30 L150 30 Q170 30 170 50 L170 130 Q170 180 100 200 Q30 180 30 130 Z"
        fill="#F2EAD3"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M38 56 Q38 40 54 40 L146 40 Q162 40 162 56 L162 128 Q162 170 100 188 Q38 170 38 128 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.line
        x1="40" y1="80" x2="160" y2="80"
        stroke="currentColor" strokeWidth="0.8"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
      <motion.line
        x1="40" y1="86" x2="160" y2="86"
        stroke="currentColor" strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
      <motion.path
        d="M50 130 Q70 120 90 130 T130 130 T170 130"
        stroke="#6B1F1A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      <motion.path
        d="M50 138 Q70 128 90 138 T130 138 T170 138"
        stroke="#6B1F1A"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
      <g transform="translate(88, 42) rotate(-22 0 29)">
        <rect x="-4" y="-30" width="8" height="40" rx="4" fill="currentColor" opacity="0.08" transform="translate(1.5, 1.5)" />
        <rect x="-5" y="-30" width="10" height="38" rx="4" fill="currentColor" opacity="0.88" />
        <rect x="-3" y="-28" width="2.5" height="34" rx="1.5" fill="#F2EAD3" opacity="0.06" />
        <rect x="-5.5" y="6" width="11" height="2.5" rx="1" fill="#A37E2C" opacity="0.7" />
        <path d="M -5 8.5 L 5 8.5 L 3.5 15 L -3.5 15 Z" fill="currentColor" opacity="0.95" />
        <line x1="-3.5" y1="10" x2="3.5" y2="10" stroke="#F2EAD3" strokeWidth="0.2" opacity="0.1" />
        <line x1="-3.5" y1="11.5" x2="3.5" y2="11.5" stroke="#F2EAD3" strokeWidth="0.2" opacity="0.1" />
        <line x1="-3.5" y1="13" x2="3.5" y2="13" stroke="#F2EAD3" strokeWidth="0.2" opacity="0.1" />
        <path d="M -3.5 15 L 3.5 15 L 2.5 23 L 0 28 L -2.5 23 Z" fill="#3D2E1E" />
        <path d="M -2.5 16 L 2.5 16 L 1.8 22 L 0 26 L -1.8 22 Z" fill="#2A1F14" />
        <path d="M -1 16 L 1 16 L 0.8 20 L 0 23 L -0.8 20 Z" fill="#5C4A33" opacity="0.3" />
        <line x1="0" y1="15" x2="0" y2="27" stroke="#1A140E" strokeWidth="0.5" />
        <circle cx="0" cy="16.5" r="0.6" fill="#1A140E" />
        <ellipse cx="0" cy="29" rx="1.5" ry="0.8" fill="#1A140E" opacity="0">
          <animate attributeName="opacity" values="0;0;0.85;0.85;0;0" dur="7s" begin="2s" repeatCount="indefinite" />
        </ellipse>
      </g>
      <g transform="translate(88 195)">
        <ellipse cx="0" cy="17" rx="14" ry="4" fill="rgba(26,20,14,0.06)" />
        <path d="M -12 6 Q -14 0 -11 -5 L -8 -10 Q -8 -14 -5 -16 L 5 -16 Q 8 -14 8 -10 L 11 -5 Q 14 0 12 6 Q 10 14 0 15 Q -10 14 -12 6 Z" fill="currentColor" opacity="0.88" />
        <ellipse cx="0" cy="-16" rx="6" ry="2" fill="#3D2E1E" />
        <ellipse cx="0" cy="-16.5" rx="5" ry="1.6" fill="#2A1F14" />
        <ellipse cx="0" cy="-16" rx="4" ry="1.2" fill="#0D0A06" opacity="0.95" />
        <path d="M -11 3 Q 0 5 11 3 L 11 10 Q 0 12 -11 10 Z" fill="#0D0A06" opacity="0.3" />
        <path d="M -11 3 Q 0 5 11 3" stroke="#1A140E" strokeWidth="0.3" fill="none" opacity="0.25" />
        <path d="M -10 4 Q -12 -1 -9 -4" stroke="#F2EAD3" strokeWidth="0.5" fill="none" opacity="0.1" />
        <ellipse cx="0" cy="-16" rx="4.5" ry="1.3" fill="none" stroke="#1A140E" strokeWidth="0.2" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.2;0.4" dur="3s" repeatCount="indefinite" />
        </ellipse>
      </g>
      {[
        { cx: 88, delay: "2.0s", dur: "1.1s", sp: "3.01s" },
        { cx: 86, delay: "2.8s", dur: "1.3s", sp: "4.00s" },
        { cx: 90, delay: "3.7s", dur: "1.0s", sp: "4.62s" },
        { cx: 87, delay: "4.5s", dur: "1.2s", sp: "5.60s" },
        { cx: 89, delay: "5.3s", dur: "1.4s", sp: "6.59s" },
      ].map((d, i) => (
        <g key={i}>
          <ellipse cx={d.cx} cy={73} rx="1.2" ry="1.2" fill="#1A140E" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0.5;0" dur={d.dur} begin={d.delay} repeatCount="indefinite" />
            <animate attributeName="cy" values="73;86;110;145;179" dur={d.dur} begin={d.delay} repeatCount="indefinite" />
            <animate attributeName="rx" values="1.2;0.8;0.6;1;3.5" dur={d.dur} begin={d.delay} repeatCount="indefinite" />
            <animate attributeName="ry" values="1.2;1.8;3;2.5;0.4" dur={d.dur} begin={d.delay} repeatCount="indefinite" />
          </ellipse>
          <ellipse cx={d.cx} cy={73} rx="0.8" ry="0.4" fill="#1A140E" opacity="0">
            <animate attributeName="opacity" values="0;0;0.7;0.4;0" dur={d.dur} begin={d.delay} repeatCount="indefinite" />
            <animate attributeName="cy" values="73;73;90;140;178" dur={d.dur} begin={d.delay} repeatCount="indefinite" />
            <animate attributeName="rx" values="0.8;0.6;0.4;0.3;1.5" dur={d.dur} begin={d.delay} repeatCount="indefinite" />
            <animate attributeName="ry" values="0.4;0.2;1.5;3;0.2" dur={d.dur} begin={d.delay} repeatCount="indefinite" />
          </ellipse>
          <circle cx={d.cx} cy={179} r="0.8" fill="#1A140E" opacity="0">
            <animate attributeName="opacity" values="0;0;0.9;0.4;0" dur="0.6s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="cx" values={`${d.cx};${d.cx - 2};${d.cx - 6};${d.cx - 9}`} dur="0.6s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="cy" values="179;176;171;168" dur="0.6s" begin={d.sp} repeatCount="indefinite" />
          </circle>
          <circle cx={d.cx} cy={179} r="0.6" fill="#1A140E" opacity="0">
            <animate attributeName="opacity" values="0;0;0.8;0.3;0" dur="0.55s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="cx" values={`${d.cx};${d.cx + 2};${d.cx + 5};${d.cx + 8}`} dur="0.55s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="cy" values="179;177;172;170" dur="0.55s" begin={d.sp} repeatCount="indefinite" />
          </circle>
          <circle cx={d.cx} cy={179} r="0.5" fill="#1A140E" opacity="0">
            <animate attributeName="opacity" values="0;0;0.7;0.3;0" dur="0.5s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="cx" values={`${d.cx};${d.cx - 1};${d.cx - 4};${d.cx - 6}`} dur="0.5s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="cy" values="179;177;174;172" dur="0.5s" begin={d.sp} repeatCount="indefinite" />
          </circle>
          <circle cx={d.cx} cy={179} r="0.4" fill="#1A140E" opacity="0">
            <animate attributeName="opacity" values="0;0;0.65;0.25;0" dur="0.45s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="cx" values={`${d.cx};${d.cx + 1};${d.cx + 3};${d.cx + 5}`} dur="0.45s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="cy" values="179;178;175;173" dur="0.45s" begin={d.sp} repeatCount="indefinite" />
          </circle>
          <ellipse cx={d.cx} cy={179} rx="1" ry="0.3" fill="none" stroke="#1A140E" strokeWidth="0.6" opacity="0">
            <animate attributeName="opacity" values="0;0;0.7;0.25;0" dur="0.9s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="rx" values="1;1;12;18" dur="0.9s" begin={d.sp} repeatCount="indefinite" />
            <animate attributeName="ry" values="0.3;0.3;3;4.5" dur="0.9s" begin={d.sp} repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.6, type: "spring" }}
        style={{ transformOrigin: "100px 155px" }}
      >
        <g transform="translate(100 155)">
          <ellipse cx="0" cy="0" rx="14" ry="3" fill="currentColor" opacity="0.3" />
          <path d="M-8 0 L-6 -16 L6 -16 L8 0 Z" fill="currentColor" />
          <line x1="0" y1="-16" x2="0" y2="-22" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="0" cy="-24" r="2" fill="#A37E2C">
            <animate attributeName="r" values="2;2.4;1.8;2.2;2" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <path d="M-1 -24 Q0 -28 1 -24" stroke="#A37E2C" strokeWidth="1" fill="none">
            <animate attributeName="opacity" values="0.6;1;0.7;1;0.6" dur="1.8s" repeatCount="indefinite" />
          </path>
        </g>
      </motion.g>
      <motion.g
        stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1.8 }}
      >
        <path d="M28 60 Q15 70 18 90 Q22 80 30 78" />
        <path d="M28 100 Q12 110 18 130" />
        <path d="M172 60 Q185 70 182 90 Q178 80 170 78" />
        <path d="M172 100 Q188 110 182 130" />
      </motion.g>
    </motion.svg>
  );
}


