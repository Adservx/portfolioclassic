"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { SectionHeader } from "@/components/about";

const categories = ["All", "Novels", "Poetry", "Essays", "Letters"];

interface Work {
  no: string;
  title: string;
  category: string;
  year: string;
  publisher: string;
  edition: string;
  excerpt: string;
  cover: string;
  featured?: boolean;
}

const works: Work[] = [
  {
    no: "I",
    title: "A House of Salt",
    category: "Novels",
    year: "1961",
    publisher: "Chatto & Windus, London",
    edition: "Reissued by Penguin Modern Classics, 2014",
    excerpt:
      "Three sisters inherit, after their mother's death, not the house they grew up in but a debt — and a salt-mine on the edge of a drying sea.",
    cover:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    no: "II",
    title: "The River Remembers",
    category: "Novels",
    year: "1971",
    publisher: "Farrar, Straus and Giroux",
    edition: "Translated by the author from the original Hindi",
    excerpt:
      "A boatman on the Ganges recounts, in a single night, the lives of the fifty passengers he has carried in forty years.",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80&auto=format&fit=crop",
  },
  {
    no: "III",
    title: "Varanasi Cantos",
    category: "Poetry",
    year: "1978",
    publisher: "New Directions, New York",
    edition: "Winner, Commonwealth Poetry Prize",
    excerpt:
      "Eighty-four sonnets in a voice older than the city itself — and a city older, perhaps, than the voice.",
    cover:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    no: "IV",
    title: "On Quiet Things",
    category: "Essays",
    year: "1984",
    publisher: "Secker & Warburg",
    edition: "Reissued by NYRB Classics, 2009",
    excerpt:
      "Twenty essays on the small unphotographed lives of things — a kettle, a hand, a window in winter, the moment before sleep.",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80&auto=format&fit=crop",
  },
  {
    no: "V",
    title: "Letters to a Young Poet",
    category: "Letters",
    year: "1992",
    publisher: "Harvard University Press",
    edition: "A correspondence with a young admirer, edited by the author",
    excerpt:
      "Forty-six letters written over fifteen years to a young man who would, in time, become a poet in his own right.",
    cover:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&auto=format&fit=crop",
  },
  {
    no: "VI",
    title: "The Cartographer of Grief",
    category: "Novels",
    year: "2002",
    publisher: "Hamish Hamilton",
    edition: "Post-Nobel work; first printing 120,000",
    excerpt:
      "A retired surveyor, called to map a village that has vanished from every map, finds that the village is not so much lost as unfinished.",
    cover:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80&auto=format&fit=crop",
  },
  {
    no: "VII",
    title: "The Hour Before Dawn",
    category: "Poetry",
    year: "2011",
    publisher: "Bloodaxe Books",
    edition: "Bilingual edition, Hindi & English",
    excerpt:
      "A late, spare book — fifty-two short poems, each one set in the hour between four and five in the morning.",
    cover:
      "https://images.unsplash.com/photo-1530538987395-032d1800fdd4?w=600&q=80&auto=format&fit=crop",
  },
  {
    no: "VIII",
    title: "Patiently, Against the Dark",
    category: "Essays",
    year: "2018",
    publisher: "Farrar, Straus and Giroux",
    edition: "Selected essays, 1962–2018",
    excerpt:
      "A lifetime of essays gathered into a single volume, with a new preface written at ninety-two.",
    cover:
      "https://images.unsplash.com/photo-1502810190503-8303352d0dd1?w=600&q=80&auto=format&fit=crop",
  },
];

export function Works() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered =
    active === "All" ? works : works.filter((w) => w.category === active);

  return (
    <section
      id="works"
      className="relative py-section px-6 lg:px-12 overflow-hidden"
    >
      <div className="paper-grain absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Chapter II"
          title="The Library"
          subtitle="Forty-seven books, in five forms, across sixty-three years."
        />

        {/* ✦ Filter */}
        <div className="mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-ink/30 pb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-caps text-[0.62rem] tracking-[0.4em] uppercase text-ink-soft"
          >
            <motion.span
              key={works.length}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block text-ink font-display text-2xl mr-3"
            >
              {works.length}
            </motion.span>
            volumes, indexed by hand
          </motion.div>
          <div className="flex flex-wrap items-center gap-1 relative">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative font-caps text-[0.6rem] tracking-[0.32em] uppercase px-3 py-2 transition-colors duration-300 cursor-pointer ${
                  active === c
                    ? "text-oxblood"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {c}
                {active === c && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute -bottom-[18px] left-0 right-0 h-px bg-oxblood"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="absolute -bottom-[18px] left-0 right-0 h-px bg-ink/30 opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        {/* ✦ Catalog — vintage index style with 3D cover tilt */}
        <div className="mt-12">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="space-y-0">
              {filtered.map((w, i) => (
                <WorkRow
                  key={w.title}
                  w={w}
                  i={i}
                  hovered={hovered === w.no}
                  onEnter={() => setHovered(w.no)}
                  onLeave={() => setHovered(null)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ✦ Colophon-style footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-ink/40"
        >
          <div className="font-serif italic text-sm text-ink-soft">
            A complete bibliography is forthcoming in{" "}
            <em className="text-ink">The Pandit Papers</em> (Oxford, 2027).
          </div>
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="fleuron text-gold text-base"
            >
              ❦
            </motion.span>
            <span className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-ink-soft">
              End of Index
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WorkRow({
  w,
  i,
  hovered,
  onEnter,
  onLeave,
}: {
  w: Work;
  i: number;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const rotateX = useTransform(springY, [0, 1], [8, -8]);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={handleMove}
      ref={ref}
      className={`group relative grid grid-cols-12 gap-4 lg:gap-8 py-6 lg:py-8 border-b border-rule transition-colors duration-500 ${
        w.featured ? "bg-vellum/40 -mx-3 px-3 lg:-mx-6 lg:px-6" : ""
      } hover:bg-vellum/60`}
    >
      {/* Cover with 3D tilt */}
      <div className="col-span-3 lg:col-span-2 perspective-1000">
        <motion.div
          style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
          className="relative aspect-[3/4] max-w-[120px] lg:max-w-[140px] overflow-hidden plate-thin mx-auto"
        >
          <img
            src={w.cover}
            alt={`Cover of ${w.title}`}
            width={300}
            height={400}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover sepia-[0.5] contrast-110 group-hover:sepia-[0.2] group-hover:saturate-100 transition-all duration-700"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,20,14,0.2) 0%, transparent 40%, rgba(26,20,14,0.5) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 30px 5px rgba(26,20,14,0.35)" }}
          />
          {/* Spine highlight on tilt */}
          <motion.div
            animate={{ opacity: hovered ? 0.5 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="absolute bottom-1.5 left-1.5 right-1.5 text-vellum font-caps text-[0.45rem] tracking-[0.3em] uppercase text-center"
          >
            {w.no}
          </motion.div>
        </motion.div>
      </div>

      {/* No. — Roman numeral */}
      <div className="col-span-2 lg:col-span-1 hidden lg:flex items-start">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl lg:text-4xl text-oxblood leading-none"
        >
          {w.no}
        </motion.div>
      </div>

      {/* Year */}
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          whileHover={{ x: 4, color: "#6B1F1A" }}
          className="font-serif italic text-2xl lg:text-3xl text-ink-soft leading-none"
        >
          {w.year}
        </motion.div>
      </div>

      {/* Title & excerpt */}
      <div className="col-span-7 lg:col-span-5">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="font-serif text-2xl lg:text-3xl text-ink group-hover:text-oxblood transition-colors duration-500 link-underline inline-block cursor-pointer">
            {w.title}
          </h3>
          {w.featured && (
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className="font-caps text-[0.55rem] tracking-[0.4em] uppercase text-gold border border-gold/60 px-2 py-0.5"
            >
              Notable
            </motion.span>
          )}
        </div>
        <p className="mt-2 font-serif italic text-[1.02rem] leading-relaxed text-ink-soft max-w-2xl">
          {w.excerpt}
        </p>
      </div>

      {/* Publisher & category */}
      <div className="col-span-12 lg:col-span-3 lg:text-right">
        <div className="font-caps text-[0.6rem] tracking-[0.35em] uppercase text-oxblood">
          {w.category}
        </div>
        <div className="mt-1 font-serif text-base text-ink">
          {w.publisher}
        </div>
        <div className="mt-0.5 font-serif italic text-sm text-ink-soft">
          {w.edition}
        </div>
      </div>

      {/* Corner ornaments — draw in on hover */}
      <motion.div
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 right-0 w-4 h-4 border-t border-r border-oxblood"
      />
      <motion.div
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-oxblood"
      />
    </motion.article>
  );
}
