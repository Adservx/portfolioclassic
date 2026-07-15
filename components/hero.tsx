"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const PORTRAIT =
  "/bookstore/messenger-creation.webp";
const BURST_PORTRAIT =
  "/bookstore/burst-portrait.webp";

const NAME_FIRST = "Darshan";
const NAME_LAST = "Pathak";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="prologue"
      ref={ref}
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
    >


      {/* ✦ Burst portrait — aesthetic filtered overlay with fire-burnt frame */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ scale: 2.4, rotate: -12, opacity: 0, filter: "blur(20px) brightness(1.8)" }}
        animate={{ scale: 1, rotate: 0, opacity: 0.4, filter: "blur(0px) brightness(0.7)" }}
        transition={{ duration: 2.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0">
          <img
            src={BURST_PORTRAIT}
            alt=""
            loading="eager"
            className="w-full h-full object-cover scale-125"
            style={{
              filter:
                "grayscale(0.6) sepia(0.5) brightness(0.8) contrast(1.4) saturate(0.7) hue-rotate(340deg)",
            }}
          />
          {/* Fire-burnt frame overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow:
                "inset 0 0 60px 20px rgba(255, 120, 20, 0.25), inset 0 0 120px 40px rgba(200, 60, 10, 0.15), inset 0 0 200px 60px rgba(100, 20, 0, 0.3), 0 0 80px 20px rgba(255, 100, 10, 0.1)",
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(180, 60, 10, 0.12) 75%, rgba(80, 20, 0, 0.25) 90%, rgba(30, 10, 0, 0.5) 100%)",
            }}
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Charred edge ring */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: "6px solid rgba(40, 15, 5, 0.5)",
              borderRadius: "2px",
              boxShadow:
                "inset 0 0 30px 8px rgba(255, 140, 30, 0.2), 0 0 20px 4px rgba(255, 100, 10, 0.08)",
              clipPath: "inset(0)",
            }}
          />
        </div>
        {/* Ink-bleed vignette over burst */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(26,20,14,0.85) 100%)",
          }}
        />
      </motion.div>

      {/* ✦ Floating ambient orbs (subtle) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-drift-1"
          style={{ background: "radial-gradient(circle, rgba(163,126,44,0.08), transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl animate-drift-2"
          style={{ background: "radial-gradient(circle, rgba(107,31,26,0.06), transparent 70%)" }}
        />
      </div>

      <div className="paper-grain absolute inset-0 pointer-events-none" />

      {/* Decorative corner medallions — slow rotate on hover */}
      <div className="absolute top-20 left-6 lg:left-12 hidden md:block z-10">
        <Medallion label="Vol." value="I" />
      </div>
      <div className="absolute top-20 right-6 lg:right-12 hidden md:block z-10">
        <Medallion label="Folio" value="01" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-7xl w-full px-6 lg:px-12 z-10"
      >
        {/* ✦ Top register — masthead */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-2 sm:gap-3 text-ink-soft">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-px w-8 sm:w-12 bg-rule-strong origin-left"
            />
            <span className="font-caps text-[0.6rem] sm:text-[0.72rem] tracking-[0.45em] uppercase">
              The Complete Works & Life
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-px w-8 sm:w-12 bg-rule-strong origin-right"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-3 font-serif italic text-sm text-ink-soft"
          >
            A portfolio in five movements
          </motion.p>
        </motion.div>

        {/* ✦ MASTHEAD — name with letter cascade */}
        <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col items-center">
          <h1 className="font-display text-[clamp(3.5rem,14vw,12rem)] leading-[0.85] tracking-[-0.02em] text-ink text-center">
            <span className="letter-cascade inline-block">
              {NAME_FIRST.split("").map((ch, i) => (
                <span
                  key={`a-${i}`}
                  style={{ animationDelay: `${700 + i * 50}ms` }}
                  className="inline-block"
                >
                  {ch}
                </span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block text-oxblood italic font-serif text-[0.52em] -mt-2 tracking-[0.04em] font-light"
            >
              <span className="letter-cascade inline-block">
                {NAME_LAST.split("").map((ch, i) => (
                  <span
                    key={`b-${i}`}
                    style={{ animationDelay: `${1500 + i * 50}ms` }}
                    className="inline-block"
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="origin-center mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-ink"
          >
            <span className="hidden sm:block h-px w-16 bg-ink" />
            <span className="font-caps text-[0.65rem] sm:text-[0.75rem] tracking-[0.35em] sm:tracking-[0.5em] uppercase text-center sm:text-left">
              Microbiologist · Sociologist · Author of <em>White Words</em>
            </span>
            <span className="hidden sm:block h-px w-16 bg-ink" />
          </motion.div>
        </div>

        {/* ✦ Two-column body — epigraph & portrait */}
        <div className="mt-10 sm:mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Epigraph with drop cap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:pr-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 mb-4 sm:mb-6"
            >
              <span className="fleuron">❦</span>
<span className="font-caps text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft">
              Epigraph · From <em>White Words</em>
            </span>
            </motion.div>

            <p className="font-serif text-[1.2rem] sm:text-[1.4rem] lg:text-[1.7rem] leading-[1.45] text-ink-2">
              <span className="drop-cap animate-splotch-pop">T</span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 1.2 }}
              >
                he potential energy from imagination and thoughts to cure
                and prevention the chronic that the whole world is facing out.
              </motion.span>
              <motion.em
                initial={{ opacity: 0, color: "rgba(107,31,26,0)" }}
                whileInView={{ opacity: 1, color: "var(--color-oxblood)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 2.4 }}
                className="text-oxblood"
              >
                {" "}How shall I live?
              </motion.em>
            </p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 3 }}
              className="mt-4 sm:mt-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-rule-strong" />
              <span className="font-serif italic text-sm sm:text-base text-ink-soft">
                — D. Pathak, Nepal, March 2023
              </span>
            </motion.div>
          </motion.div>

          {/* Right: portrait plate with splotch reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: portraitY }}
            className="lg:col-span-5"
          >
            <div className="plate p-3 sm:p-5 lg:p-6 max-w-[260px] sm:max-w-sm lg:max-w-md mx-auto group cursor-pointer">
              <div className="relative aspect-[4/5] bg-ink overflow-hidden splotch-reveal">
                <img
                  src={PORTRAIT}
                  alt="Darshan Pathak — author of White Words"
                  width={800}
                  height={1000}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover contrast-110 saturate-125 scale-130 transition-transform duration-1000 group-hover:scale-140"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(26,20,14,0.2) 0%, transparent 30%, transparent 60%, rgba(26,20,14,0.55) 100%)",
                  }}
                />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-vellum mix-blend-difference">
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="font-caps text-[0.6rem] tracking-[0.4em] uppercase"
                  >
                    Plate I
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.1 }}
                    className="font-caps text-[0.6rem] tracking-[0.4em] uppercase"
                  >
                    aet. LXXII
                  </motion.span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-vellum font-serif italic text-xs">
                  Darshan Pathak · Microbiologist & Sociologist · Nepal
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 80px 20px rgba(26,20,14,0.55)",
                  }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="mt-2 sm:mt-4 flex items-center justify-between text-ink-soft"
              >
                <span className="font-caps text-[0.5rem] sm:text-[0.65rem] tracking-[0.4em] uppercase">
                  Engraved by hand
                </span>
                <Seal />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ✦ Marquee — works in scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="mt-12 sm:mt-16 lg:mt-24 border-y border-ink/30 py-4 overflow-hidden"
        >
          <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap font-serif italic text-ink-soft text-xs sm:text-sm animate-marquee">
            {Array.from({ length: 2 }).flatMap((_, i) =>
              [
                "White Words",
                "Dark",
                "Can it be possible to feel it non-living",
                "Daily day dream",
                "Do not tell lie",
                "Words!!!",
                "Wishing from Her",
                "Why the crow is Crowing!",
                "We pronounced them the Mad",
                "To her!",
                "The sky above space",
                "The path of mind",
                "Temple is heart",
                "Soul",
                "Show what you know",
                "Scientific letter of love",
                "Physical Punishment",
                "No one like you",
                "Nervous!",
                "Mucosa Nebula",
                "Evolution of Age!",
                "Moving Man",
                "Through the window",
                "Apocryphal God",
                "Movement of Mind",
                "Stars are starring you!",
                "Wrong Answer",
                "The last Time",
                "Mr. Nobody",
                "No one can Construct and Destruct me",
                "Why are you able to give Suggestion to me",
                "The last Night",
                "Pain Cares The Body",
                "My life is Stealing",
                "Cap a Pie Euphony",
                "Birds",
                "Alphabet of alphabets",
                "Sand in sands",
                "Dust",
                "River",
                "Respect",
                "Regeneration Power",
                "Dormancy",
                "Deception",
                "Heavenly hell habits!",
                "The Word Peace",
                "Crops life",
                "Steam and Smoke",
                "Fruits",
                "What makes wobble and warm in wet winter!",
                "Pen",
                "God",
                "Everything is Hole!",
                "Bookworm",
                "Returns in Return",
                "Why air is colourless!",
                "Earthquake",
                "Shoe",
                "Think, listen, see and speak in English",
                "I love facebook status",
                "Experienced and Empirical",
                "Place to place",
                "My Wishes",
                "Hello Happy",
                "Sex and Aids",
                "They dont give you sufficient Salary",
                "I want to be Defeated",
                "Dear Students",
                "Gossip and Gossiper",
                "Lion Skin but Fox Heart",
                "Shadow",
                "Watch and Clock",
                "Road",
                "Rest and Religion",
                "Love and war",
                "Distance",
                "Food",
                "Zero Hour",
                "Emptiness",
              ].map((t) => (
                <span key={`${i}-${t}`} className="flex items-center gap-8 sm:gap-12">
                  <span className="fleuron text-gold">✦</span>
                  <span>{t}</span>
                </span>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Medallion({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-ink-soft"
    >
      <span className="font-caps text-[0.65rem] tracking-[0.4em] uppercase">
        {label}
      </span>
      <span className="font-display text-3xl text-ink mt-1 leading-none">
        {value}
      </span>
    </motion.div>
  );
}

function Seal() {
  return (
    <motion.div
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-oxblood flex items-center justify-center animate-seal"
      style={{ animationDelay: "2.5s" }}
    >
      <span className="absolute inset-0.5 sm:inset-1 rounded-full border border-oxblood/60" />
      <span className="font-display text-oxblood text-[0.5rem] sm:text-[0.7rem] leading-none text-center">
        D<br />P
      </span>
      {/* Wax drip */}
      <span
        className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 w-0.5 sm:w-1 -translate-x-1/2 bg-oxblood rounded-b-full animate-wax-drip"
        style={{ animationDelay: "3.5s" }}
      />
    </motion.div>
  );
}
