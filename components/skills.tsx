"use client";

import { motion } from "motion/react";
import { SectionHeader } from "@/components/about";
import { Counter } from "@/components/counter";

const DESK_IMG =
"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80&auto=format&fit=crop";

const disciplines = [
{
no: "I",
title: "The Article",
description:
"Ninety-three short works — each a lens held up to a single corner of life, from love to micro-organism.",
forms: ["Personal essay", "Scientific note", "Social observation", "Philosophical fragment"],
tools: ["Notebook", "Pen", "Curiosity", "The morning hour"],
},
{
no: "II",
title: "The Lyric",
description:
"Where prose meets poetry — a sentence stretched until it hums, a thought compressed until it burns.",
forms: ["Prose poem", "Love letter", "Nature sketch", "Dream sequence"],
tools: ["Cadence", "Metaphor", "Silence", "Memory"],
},
{
no: "III",
title: "The Scientific Meditation",
description:
"A microscope aimed at the soul — photons, cells, zygotes, and the biology of love examined on the same page.",
forms: ["Microbiological metaphor", "Astronomical romance", "Anatomical reflection", "Ecological observation"],
tools: ["Microscope", "Textbook", "Imagination", "Awe"],
},
{
no: "IV",
title: "The Moral Counsel",
description:
"Instruction dressed in urgency — a voice that has seen too much and will not stay silent about what it knows.",
forms: ["Social reform", "Behavioural code", "Spiritual warning", "Cultural critique"],
tools: ["Conviction", "Experience", "Compassion", "The nerve to speak"],
},
];

const influences = [
"The Bhagavad Gita",
"Lord Shiva",
"The Buddha",
"Jesus Christ",
"Prophet Muhammad",
"Microbiology",
"Sociology",
"The Nepali Himalaya",
"Public Aawaj Weekly",
"The morning newspaper",
];

const languages = [
{ name: "Nepali", level: "Mother Tongue" },
{ name: "English", level: "Working" },
{ name: "Hindi", level: "A Little" },
];

export function Craft() {
return (
<section
id="craft"
className="relative py-section px-6 lg:px-12 overflow-hidden bg-parchment-2"
>
<div className="paper-grain absolute inset-0 pointer-events-none" />

<div className="relative mx-auto max-w-7xl">
<SectionHeader
eyebrow="Chapter III"
title="Of the Craft"
subtitle="What the work is made of, and what the work is made for."
/>

{/* ✦ Wide photographic band — the desk (ken burns) */}
<motion.figure
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
className="mt-16"
>
<div className="plate p-2 sm:p-3 lg:p-4 max-w-5xl mx-auto">
<div className="relative aspect-[4/3] sm:aspect-[16/7] overflow-hidden">
<div className="absolute inset-0 animate-ken-burns">
<img
src={DESK_IMG}
alt="The author's desk, with a typewriter and a sheaf of half-finished pages"
width={1400}
height={613}
loading="lazy"
decoding="async"
className="w-full h-full object-cover sepia-[0.45] contrast-105"
/>
</div>
<div
className="absolute inset-0 pointer-events-none"
style={{
background:
"linear-gradient(90deg, rgba(0, 0, 0,0.65) 0%, transparent 50%, rgba(0, 0, 0,0.25) 100%)",
}}
/>
<div
className="absolute inset-0 pointer-events-none"
style={{ boxShadow: "inset 0 0 80px 10px rgba(0, 0, 0,0.4)" }}
/>
<motion.div
initial={{ opacity: 0, y: -10 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.4 }}
className="absolute top-4 left-4 right-4 flex items-start justify-between text-vellum"
>
<span className="font-caps text-[0.65rem] tracking-[0.45em] uppercase">
Plate III · The Desk
</span>
<span className="font-caps text-[0.65rem] tracking-[0.45em] uppercase">
Nepal · early morning
</span>
</motion.div>
<motion.div
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.7, duration: 0.8 }}
className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-auto lg:max-w-md text-vellum"
>
<div className="font-serif text-lg lg:text-2xl leading-snug">
&ldquo;Writing is the statue, cannot be destroyed, but try to
protect and preserve it from acid rain.&rdquo;
</div>
<div className="mt-3 font-caps text-[0.65rem] tracking-[0.4em] uppercase text-vellum/80">
From <em>White Words</em> · Biology Love
</div>
</motion.div>
</div>
</div>
</motion.figure>

{/* ✦ Disciplines — four-up grid */}
<div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
{disciplines.map((d, i) => (
<motion.div
key={d.title}
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
whileHover={{ y: -6, scale: 1.005 }}
className="bg-parchment-2 p-8 lg:p-10 group hover:bg-vellum transition-colors duration-500 relative overflow-hidden"
>
{/* Sweep highlight on hover */}
<motion.div
initial={{ x: "-100%" }}
whileHover={{ x: "100%" }}
transition={{ duration: 0.8 }}
className="absolute inset-y-0 w-1/2 pointer-events-none"
style={{
background:
"linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
}}
/>

<div className="flex items-start justify-between mb-6">
<motion.span
whileHover={{ rotate: 360, scale: 1.1 }}
transition={{ duration: 0.8 }}
className="font-display text-6xl text-oxblood leading-none"
>
{d.no}
</motion.span>
<span className="fleuron text-gold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
❦
</span>
</div>

<h3 className="font-serif text-4xl text-ink leading-tight group-hover:text-oxblood transition-colors duration-500">
{d.title}
</h3>
<p className="mt-3 font-serif text-[1.15rem] leading-relaxed text-ink-soft">
{d.description}
</p>

<div className="mt-6 pt-4 border-t border-rule">
<div className="font-caps text-[0.65rem] tracking-[0.4em] uppercase text-ink-soft mb-2">
Forms
</div>
<div className="flex flex-wrap gap-x-3 gap-y-1 font-serif text-sm text-ink">
{d.forms.map((f, j) => (
<span key={f} className="flex items-center gap-3">
{j > 0 && <span className="text-rule">·</span>}
<span>{f}</span>
</span>
))}
</div>
</div>

<div className="mt-4 pt-4 border-t border-rule">
<div className="font-caps text-[0.65rem] tracking-[0.4em] uppercase text-ink-soft mb-2">
Tools of the Trade
</div>
<div className="flex flex-wrap gap-x-3 gap-y-1 font-serif text-sm text-ink-soft">
{d.tools.map((t, j) => (
<span key={t} className="flex items-center gap-3">
{j > 0 && <span className="text-rule">·</span>}
<span>{t}</span>
</span>
))}
</div>
</div>
</motion.div>
))}
</div>

{/* ✦ Middle band — Languages and Influences side-by-side */}
<div className="mt-20 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
{/* Languages */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
className="lg:col-span-5"
>
<div className="font-caps text-[0.72rem] tracking-[0.4em] uppercase text-ink-soft">
The Tongues I Work In
</div>
<h3 className="mt-3 font-serif text-5xl sm:text-6xl lg:text-7xl text-ink">
Languages, <em className="text-oxblood">read & written</em>
</h3>

<div className="mt-8 space-y-2">
{languages.map((l, i) => (
<motion.div
key={l.name}
initial={{ opacity: 0, x: -30 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-30px" }}
transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
className="flex items-center justify-between border-b border-rule py-3 group cursor-default relative overflow-hidden"
>
{/* Sweep fill on hover */}
<span
className="absolute inset-0 bg-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
aria-hidden
/>
<span className="relative font-serif text-2xl text-ink group-hover:text-oxblood group-hover:translate-x-2 transition-all duration-500">
{l.name}
</span>
<span className="relative font-caps text-[0.65rem] tracking-[0.4em] uppercase text-ink-soft group-hover:text-gold transition-colors duration-500">
{l.level}
</span>
</motion.div>
))}
</div>

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.6 }}
className="mt-8 flex items-center gap-3"
>
<span className="font-display text-5xl text-oxblood">
<Counter target={3} />
</span>
<span className="font-serif text-base text-ink-soft">
Tongues at my command
</span>
</motion.div>
</motion.div>

{/* Influences — typographic */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
className="lg:col-span-7"
>
<div className="font-caps text-[0.72rem] tracking-[0.4em] uppercase text-ink-soft">
Reading & Company
</div>
<h3 className="mt-3 font-serif text-5xl sm:text-6xl lg:text-7xl text-ink">
Standing on the shoulders{" "}
<em className="text-oxblood">of</em>
</h3>

<div className="mt-8 -mx-2 flex flex-wrap">
{influences.map((inf, i) => (
<motion.span
key={inf}
initial={{ opacity: 0, scale: 0.6, y: 12 }}
whileInView={{ opacity: 1, scale: 1, y: 0 }}
viewport={{ once: true, margin: "-30px" }}
transition={{
duration: 0.5,
delay: i * 0.05,
type: "spring",
stiffness: 200,
damping: 15,
}}
whileHover={{ y: -4, scale: 1.05, borderColor: "#000000" }}
className="m-2 px-3 py-2 font-serif text-lg lg:text-xl text-ink border border-rule hover:text-oxblood transition-colors duration-300 cursor-default relative overflow-hidden"
>
<motion.span
initial={{ x: "-100%" }}
whileHover={{ x: "100%" }}
transition={{ duration: 0.6 }}
className="absolute inset-0 bg-gold/10"
aria-hidden
/>
<span className="relative">{inf}</span>
</motion.span>
))}
</div>

<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.4 }}
className="mt-10 plate-thin p-4 sm:p-6 lg:p-8 relative"
>
<div className="flex items-start gap-3 sm:gap-4">
<motion.span
animate={{ rotate: [0, 5, -5, 0] }}
transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
className="fleuron text-gold text-2xl sm:text-3xl leading-none shrink-0"
>
❦
</motion.span>
<p className="font-serif text-lg sm:text-xl text-ink-2 leading-relaxed">
&ldquo;The potential energy from imagination and thoughts to
cure and prevention the chronic that the whole world is
facing out.&rdquo;
</p>
</div>
</motion.div>
</motion.div>
</div>
</div>
</section>
);
}
