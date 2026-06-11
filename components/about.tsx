"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Counter } from "@/components/counter";

const VARANASI_IMG =
  "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1400&q=80&auto=format&fit=crop";

const stats = [
  { target: 50, suffix: "+", label: "Years Writing" },
  { target: 47, suffix: "", label: "Books Published" },
  { target: 31, suffix: "", label: "Languages" },
  { target: 12, suffix: "", label: "Honorary Doctorates" },
];

const biography = [
  {
    period: "1926",
    title: "Born in Varanasi",
    text: "Son of a Sanskrit scholar and a weaver. Learns to read the Ramayana before he can walk.",
  },
  {
    period: "1948",
    title: "First collection of poems",
    text: "Sita's Forest, published privately in a print run of 200. All but 12 copies are lost to a monsoon.",
  },
  {
    period: "1961",
    title: "The novel that changed everything",
    text: "A House of Salt becomes a quiet sensation in South Asia, then the world. Translated into 31 languages.",
  },
  {
    period: "1998",
    title: "The Nobel Prize in Literature",
    text: "Awarded \"for a body of work in which the salt, the silence, and the sorrow of ordinary life are made holy.\"",
  },
  {
    period: "Today",
    title: "Still at the desk",
    text: "Lives in Varanasi, in the same house for sixty-one years. Rises at four. Writes by hand until noon.",
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
          title="Of the Man"
          subtitle="A life, set in five dates and one long letter to you."
        />

        {/* ✦ Asymmetric two-column */}
        <div className="mt-16 lg:mt-24 grid lg:grid-cols-12 gap-10 lg:gap-20">
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
              className="font-caps text-[0.62rem] tracking-[0.4em] uppercase text-ink-soft mb-6 flex items-center gap-3"
            >
              <span className="fleuron text-gold">❦</span>
              From a letter, dated 14 February 1989
            </motion.div>

            <div className="font-serif text-[1.18rem] leading-[1.75] text-ink-2 space-y-5">
              <p>
                <span className="drop-cap animate-splotch-pop">I</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  {" "}was born in a house where the river could be heard through
                  every wall. My father taught grammar to boys who would never
                  read a newspaper; my mother wove cloth so fine it was used to
                  wrap the small gods in the temple by our lane. From them I
                  learned that a sentence, like a thread, must be drawn from
                  somewhere real, and pulled taut, and made to bear weight.
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
              className="mt-10 flex items-center gap-4 text-ink-soft"
            >
              <span className="h-px flex-1 bg-rule" />
              <span className="font-serif italic text-base">
                — Rajaram Pandit, in confidence
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
              className="plate p-8 lg:p-10 max-w-md mx-auto hover:shadow-[0_30px_60px_rgba(26,20,14,0.15)] transition-shadow duration-700"
            >
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, letterSpacing: "0.1em" }}
                  whileInView={{ opacity: 1, letterSpacing: "0.45em" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="font-caps text-[0.6rem] uppercase text-ink-soft"
                >
                  Arms of the Author
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
                  Pandit
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-1 font-serif italic text-sm text-ink-soft"
                >
                  &ldquo;to draw water from a deep well&rdquo;
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-6 grid grid-cols-2 gap-px bg-rule"
                >
                  <div className="bg-parchment-2 p-3">
                    <div className="font-caps text-[0.55rem] tracking-[0.35em] uppercase text-ink-soft">
                      Field
                    </div>
                    <div className="font-serif italic text-base text-ink mt-1">
                      Vellum, a river argent
                    </div>
                  </div>
                  <div className="bg-parchment-2 p-3">
                    <div className="font-caps text-[0.55rem] tracking-[0.35em] uppercase text-ink-soft">
                      Crest
                    </div>
                    <div className="font-serif italic text-base text-ink mt-1">
                      A quill & a lamp
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  style={{ y: y2 }}
                  className="mt-8 pt-6 border-t border-rule"
                >
                  <div className="font-caps text-[0.55rem] tracking-[0.4em] uppercase text-ink-soft">
                    Motto
                  </div>
                  <div className="font-serif italic text-lg text-ink mt-1">
                    &ldquo;Patiently, against the dark.&rdquo;
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
          <div className="plate p-3 lg:p-4 max-w-5xl mx-auto">
            <div className="relative aspect-[16/7] overflow-hidden">
              <div className="absolute inset-0 animate-ken-burns">
                <img
                  src={VARANASI_IMG}
                  alt="The ghats of Varanasi at first light, where the river meets the city"
                  width={1400}
                  height={613}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover sepia-[0.35] contrast-105"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,20,14,0.15) 0%, transparent 35%, transparent 60%, rgba(26,20,14,0.6) 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 80px 10px rgba(26,20,14,0.4)" }}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute top-4 left-4 right-4 flex items-start justify-between text-vellum"
              >
                <span className="font-caps text-[0.55rem] tracking-[0.45em] uppercase">
                  Plate II · The City
                </span>
                <span className="font-caps text-[0.55rem] tracking-[0.45em] uppercase">
                  Kashi · circa MMXXV
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
                  &ldquo;The river is older than the gods, and gentler than
                  any of them.&rdquo;
                </div>
                <div className="mt-2 font-caps text-[0.55rem] tracking-[0.4em] uppercase text-vellum/80">
                  From <em>The River Remembers</em> · 1971
                </div>
              </motion.div>
            </div>
          </div>
          <motion.figcaption
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-3 text-center font-serif italic text-sm text-ink-soft"
          >
            Varanasi, the city the author has refused to leave for
            sixty-one years.
          </motion.figcaption>
        </motion.figure>

        {/* ✦ Stats row — with counters */}
        <div className="mt-24 lg:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, backgroundColor: "rgba(251, 245, 229, 1)" }}
              className="bg-vellum p-6 lg:p-8 text-center group cursor-default transition-colors duration-500"
            >
              <div className="font-display text-5xl lg:text-6xl text-ink leading-none">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div className="mt-3 font-caps text-[0.6rem] tracking-[0.4em] uppercase text-ink-soft group-hover:text-oxblood transition-colors duration-500">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✦ Timeline */}
        <div className="mt-24 lg:mt-32">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-caps text-[0.62rem] tracking-[0.4em] uppercase text-ink-soft">
                Chronology
              </div>
              <h3 className="font-serif text-4xl lg:text-5xl text-ink mt-2">
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
                className="group relative grid grid-cols-12 gap-6 py-8 border-t border-rule last:border-b last:border-b-rule hover:bg-vellum/30 transition-colors duration-500"
              >
                <div className="col-span-3 lg:col-span-2">
                  <div className="font-display text-4xl lg:text-5xl text-oxblood leading-none group-hover:scale-110 transition-transform duration-500 origin-left">
                    {b.period}
                  </div>
                </div>
                <div className="col-span-9 lg:col-span-10">
                  <h4 className="font-serif text-2xl text-ink group-hover:text-oxblood transition-colors duration-500">
                    {b.title}
                  </h4>
                  <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-ink-soft max-w-2xl">
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
  subtitle: string;
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
        <span className="font-caps text-[0.62rem] tracking-[0.45em] uppercase text-ink-soft">
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
        className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05]"
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
        className="mt-6 font-serif italic text-lg text-ink-soft"
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
      {/* Shield outline draws first */}
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
      {/* Chief */}
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
      {/* River */}
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
      {/* Quill */}
      <motion.g
        initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.4, type: "spring" }}
        style={{ transformOrigin: "100px 75px" }}
      >
        <g transform="translate(95 55) rotate(-25)">
          <path d="M0 0 L8 -40 L12 -42 L4 0 Z" fill="currentColor" />
          <line x1="2" y1="-2" x2="2" y2="-38" stroke="#F2EAD3" strokeWidth="0.4" />
          <path d="M0 0 L-6 6 L-3 4 L-2 8 Z" fill="currentColor" />
        </g>
      </motion.g>
      {/* Lamp */}
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
      {/* Mantling */}
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
