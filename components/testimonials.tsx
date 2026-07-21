"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionHeader } from "@/components/about";

const press = [
{
publication: "Public Aawaj Weekly",
author: "Amrit Aryal, Editor",
year: "2023",
quote:
"This book may be useful for all. The key feature is the series of 93 Articles, containing positive status, a glossary of literary terms, and motivates to writing literary essays.",
},
{
publication: "Readers' Perspectives",
author: "Indra Prasad Pathak & Hari kala Pathak",
year: "2023",
quote:
"My dear son, make us proud by showing your minds words in written form that is legal and valid throughout the globe rather than in oral form.",
},
{
publication: "Readers' Perspectives",
author: "Youbraj Bhandari & Ishwari Bhandari",
year: "2023",
quote:
"At the time of engagement of marriage, we observed and interviewed him and found that he is independent and create something new that will be beneficial for green world.",
},
{
publication: "Readers' Perspectives",
author: "Geeta Pathak",
year: "2023",
quote:
"The book 'WHITE WORDS' improves English and literature to each and every individual as universal language art and skills — biotic and abiotic, molecular and atomic.",
},
{
publication: "Readers' Perspectives",
author: "Yadav Bhandari",
year: "2023",
quote:
"Darshan Pathak, who is microbiologist and sociologist, has eternal power to select best words to explain the matter that is happening around us in a systematic and scientific source.",
},
{
publication: "Wife's Words",
author: "The Wife",
year: "2023",
quote:
"The book 'WHITE WORDS' made me proud and challenge to my soul with no proof of love existence with the character of this book's words — the potential energy from imagination and thoughts to cure and prevention the chronic that the whole world is facing.",
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
subtitle="What the readers and the well-wishers have said of White Words, First Edition."
/>

{/* ✦ Compact press photograph band — ken burns */}
<motion.figure
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
className="mt-16 max-w-4xl mx-auto"
>
<div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-6 items-end">
<div className="sm:col-span-5 w-full">
<div className="relative aspect-[4/3] plate p-2 overflow-hidden">
<div className="absolute inset-2 animate-ken-burns">
            <Image
              src="https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&q=80&auto=format&fit=crop"
              alt="A press archive — bound reviews and clippings in a wooden drawer"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-cover sepia-[0.4] contrast-105"
            />
</div>
<div
className="absolute inset-2 pointer-events-none"
style={{ boxShadow: "inset 0 0 40px 8px rgba(0, 0, 0,0.4)" }}
/>
</div>
</div>
<div className="sm:col-span-7 pb-2 sm:pb-4">
<div className="font-caps text-[0.65rem] tracking-[0.4em] uppercase text-ink-soft">
From the Preface
</div>
<motion.p
initial={{ opacity: 0, y: 10 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.4 }}
className="mt-2 sm:mt-3 font-serif text-lg sm:text-xl lg:text-2xl text-ink leading-snug"
>
The first edition of author tries to include the social,
cultural and intellectual context of his time. It throws
new light on the theoretical and imaginative structures
of Pope&rsquo;s poetry.
</motion.p>
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.6 }}
className="mt-2 sm:mt-3 font-caps text-[0.65rem] tracking-[0.4em] uppercase text-faded"
>
Amrit Aryal, Editor · Public Aawaj Weekly, 2023
</motion.div>
</div>
</div>
</motion.figure>

{/* ✦ Asymmetric masonry-ish grid */}
<div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-10">
{press.map((p, i) => {
const isFeature = i === 0 || i === 4;
const isOffset = i === 1 || i === 3;
return (
<motion.figure
key={`${p.author}-${p.quote.slice(0, 20)}`}
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
className={`group relative ${
isFeature ? "lg:col-span-7" : "lg:col-span-5"
} ${isOffset ? "lg:translate-y-12" : ""}`}
>
<motion.div
whileHover={{ y: -6, boxShadow: "0 30px 60px rgba(0, 0, 0,0.12)" }}
transition={{ type: "spring", stiffness: 200, damping: 20 }}
className="plate-thin p-6 sm:p-8 lg:p-10 h-full relative overflow-hidden"
>
{/* Sweep on hover */}
<motion.span
initial={{ x: "-100%" }}
whileHover={{ x: "100%" }}
transition={{ duration: 0.8 }}
className="absolute inset-y-0 w-1/3 pointer-events-none"
style={{
background:
"linear-gradient(90deg, transparent, rgba(68, 68, 68,0.1), transparent)",
}}
/>

<div className="flex items-center justify-between border-b border-ink/40 pb-3 mb-6 relative gap-3">
<span className="font-display text-lg sm:text-xl lg:text-2xl text-ink leading-none">
{p.publication}
</span>
<span className="font-caps text-[0.65rem] sm:text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft shrink-0">
{p.year}
</span>
</div>

{/* Big quote mark — pulls in */}
<motion.div
initial={{ opacity: 0, scale: 3, x: 30, y: -20 }}
whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.9, delay: 0.2 + i * 0.08, type: "spring", stiffness: 150 }}
className="font-display text-6xl sm:text-8xl lg:text-9xl text-oxblood/30 leading-none -mb-5 sm:-mb-6 -ml-1 select-none"
>
&ldquo;
</motion.div>

<motion.blockquote
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
className={`font-serif text-ink-2 leading-relaxed relative ${
isFeature ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl lg:text-3xl"
}`}
>
{p.quote}
</motion.blockquote>

<motion.figcaption
initial={{ opacity: 0, x: -10 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-rule flex items-center gap-3 relative"
>
<span className="h-px w-6 sm:w-8 bg-ink" />
<div>
<div className="font-serif text-sm sm:text-base text-ink">
{p.author}
</div>
<div className="font-caps text-[0.6rem] sm:text-[0.65rem] tracking-[0.4em] uppercase text-ink-soft">
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
className="absolute -top-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 border-t border-r border-oxblood"
/>
<motion.div
initial={{ pathLength: 0, opacity: 0 }}
whileInView={{ pathLength: 1, opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
className="absolute -bottom-1 -left-1 w-3 sm:w-4 h-3 sm:h-4 border-b border-l border-oxblood"
/>
</motion.figure>
);
})}
</div>

{/* ✦ Press list — at the bottom */}
<div className="mt-32 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule">
{[
"White Words · First Edition, 2023",
"93 Articles · ISBN 978-9937-1-3757-7",
"Published by Darshan Pathak, Nepal",
"Printed at New Baba Chhapakhana, Butwal",
"Distributed by the Author",
"Price · $3",
].map((item, i) => (
<motion.div
key={item}
initial={{ opacity: 0, scale: 0.9 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.4, delay: i * 0.06 }}
whileHover={{ backgroundColor: "rgba(250, 250, 250,1)" }}
className="bg-vellum p-4 font-serif text-lg text-ink-2 text-center cursor-default transition-colors duration-300"
>
{item}
</motion.div>
))}
</div>
</div>
</section>
);
}
