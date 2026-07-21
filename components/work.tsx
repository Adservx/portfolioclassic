"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/about";

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
title: "White Words",
category: "Poetry & Essays",
year: "2023",
publisher: "Darshan Pathak, Nepal",
edition: "First Edition · 312 pp. · ISBN 978-9937-1-3757-7",
excerpt:
"A collection of 93 articles on love, spirit, science and the quiet architecture of the mind — written to cure and prevent the chronic ache the world faces.",
cover: "/bookstore/white-words-cover.webp",
featured: true,
},
];

export function Works() {
const [hovered, setHovered] = useState<string | null>(null);

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
subtitle="One book, 93 articles — the complete works."
/>

{/* ✦ Count — single volume */}
<div className="mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-ink/30 pb-4">
<motion.div
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="font-caps text-[0.72rem] tracking-[0.4em] uppercase text-ink-soft"
>
<motion.span
key={works.length}
initial={{ scale: 0.5, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
className="inline-block text-ink font-display text-3xl mr-3"
>
{works.length}
</motion.span>
volume — the complete works
</motion.div>
</div>

{/* ✦ Catalog — vintage index style with 3D cover tilt */}
<div className="mt-12">
<motion.div layout className="space-y-0">
{works.map((w, i) => (
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
</div>

{/* ✦ Colophon-style footnote */}
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-ink/40"
>
<div className="font-serif text-sm text-ink-soft">
<em className="text-ink">White Words</em> (2023) — the author&rsquo;s
only published work. Download the complete PDF from the{" "}
<Link href="/bookstore" className="text-link underline underline-offset-4 decoration-link transition-colors">
Bookstore
</Link>.
</div>
<div className="flex items-center gap-3">
<motion.span
animate={{ rotate: [0, 10, -10, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
className="fleuron text-gold text-base"
>
❦
</motion.span>
<span className="font-caps text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft">
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
const router = useRouter();
const [isTouch] = useState(() => typeof window !== "undefined" && "ontouchstart" in window);
const mouseX = useMotionValue(0.5);
const mouseY = useMotionValue(0.5);
const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });
const rotateY = useTransform(springX, [0, 1], [-8, 8]);
const rotateX = useTransform(springY, [0, 1], [8, -8]);

const handleMove = (e: MouseEvent<HTMLDivElement>) => {
if (!ref.current || isTouch) return;
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
onClick={() => router.push("/bookstore")}
ref={ref}
className={`group relative grid grid-cols-12 gap-3 sm:gap-4 lg:gap-8 py-6 lg:py-8 border-b border-rule transition-colors duration-500 cursor-pointer ${
w.featured ? "bg-vellum/40 -mx-3 px-3 lg:-mx-6 lg:px-6" : ""
} hover:bg-vellum/60`}
>
{/* Cover with 3D tilt */}
<div className="col-span-3 sm:col-span-2 lg:col-span-2 perspective-1000">
          <motion.div
              style={!isTouch ? { rotateY, rotateX, transformStyle: "preserve-3d" } : undefined}
className="relative aspect-[3/4] max-w-[100px] sm:max-w-[120px] lg:max-w-[140px] overflow-hidden plate-thin mx-auto"
>
            <Image
              src={w.cover}
              alt={`Cover of ${w.title}`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 140px"
              className="object-cover sepia-[0.5] contrast-110 group-hover:sepia-[0.2] group-hover:saturate-100 transition-all duration-700"
            />
<div
className="absolute inset-0 pointer-events-none"
style={{
background:
"linear-gradient(180deg, rgba(0, 0, 0,0.2) 0%, transparent 40%, rgba(0, 0, 0,0.5) 100%)",
}}
/>
<div
className="absolute inset-0 pointer-events-none"
style={{ boxShadow: "inset 0 0 30px 5px rgba(0, 0, 0,0.35)" }}
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
className="absolute bottom-1.5 left-1.5 right-1.5 text-vellum font-caps text-[0.55rem] tracking-[0.3em] uppercase text-center"
>
{w.no}
</motion.div>
</motion.div>
</div>

{/* No. — Roman numeral */}
<div className="hidden lg:flex col-span-1 items-start">
<motion.div
whileHover={{ rotate: 360 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
className="font-display text-3xl lg:text-4xl text-oxblood leading-none"
>
{w.no}
</motion.div>
</div>

{/* Year */}
<div className="col-span-3 sm:col-span-2 lg:col-span-1">
<motion.div
whileHover={{ x: 4, color: "#000000" }}
className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink-soft leading-none"
>
{w.year}
</motion.div>
</div>

{/* Title & excerpt */}
<div className="col-span-6 sm:col-span-8 lg:col-span-5">
<div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
<h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink group-hover:text-oxblood transition-colors duration-500 link-underline inline-block cursor-pointer">
{w.title}
</h3>
{w.featured && (
<motion.span
initial={{ scale: 0, rotate: -20 }}
whileInView={{ scale: 1, rotate: -3 }}
viewport={{ once: true }}
transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
className="font-caps text-[0.65rem] tracking-[0.4em] uppercase text-gold border border-gold/60 px-2 py-0.5"
>
Notable
</motion.span>
)}
</div>
<p className="mt-2 font-serif text-[1.1rem] sm:text-[1.2rem] leading-relaxed text-ink-soft max-w-2xl">
{w.excerpt}
</p>
</div>

{/* Publisher & category */}
<div className="col-span-12 sm:col-span-12 lg:col-span-3 lg:text-right mt-3 sm:mt-2 lg:mt-0">
<div className="font-caps text-[0.7rem] tracking-[0.35em] uppercase text-oxblood">
{w.category}
</div>
<div className="mt-1 font-serif text-sm sm:text-base text-ink">
{w.publisher}
</div>
<div className="mt-0.5 font-serif text-xs sm:text-sm text-ink-soft">
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
