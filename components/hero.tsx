"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

const PORTRAIT =
"/bookstore/messenger-creation.webp";
const BURST_PORTRAIT =
"/hero.webp";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const canParallax = !prefersReduced;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Always call transforms (hooks rules); only apply on desktop
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);
  const portraitYRaw = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const scrollStyle = canParallax ? { y: yRaw, opacity: opacityRaw } : undefined;
  const portraitStyle = canParallax ? { y: portraitYRaw } : undefined;

return (
<section
id="prologue"
ref={ref}
className="relative min-h-[170svh] sm:min-h-[130vh] flex flex-col pt-20 sm:pt-24 pb-8 overflow-hidden"
style={{
backgroundColor: "var(--color-background)"
}}
>


 {/* ✦ Burst portrait — full-bleed backdrop, face pinned to the top strip */}
<motion.div
aria-hidden
className="absolute inset-0 pointer-events-none overflow-hidden"
initial={prefersReduced ? false : { opacity: 0 }}
animate={{ opacity: 0.98 }}
transition={{ duration: prefersReduced ? 0 : 1.2, delay: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
>
<div className="absolute inset-0">
<Image
src={BURST_PORTRAIT}
alt=""
fill
priority
quality={90}
sizes="100vw"
className="object-cover hero-burst-img"
style={{
              objectPosition: "50% 48%",
            }}
/>
{/* Soft vignette — depth at top/sides, white dissolve at the very bottom */}
<div
className="absolute inset-0 pointer-events-none hero-burn-frame"
style={{
background:
"radial-gradient(ellipse at 50% 20%, transparent 60%, rgba(0,0,0,0.06) 85%, rgba(0,0,0,0.16) 100%), linear-gradient(to bottom, transparent 72%, rgba(255,255,255,0.95) 100%)",
}}
/>
{/* Gentle edge ring — sits on the band's outer edges, no hard line mid-screen */}
<div
className="absolute inset-0 pointer-events-none hidden md:block"
style={{
boxShadow: "inset 0 0 18px 5px rgba(0,0,0,0.05)",
clipPath: "inset(0)",
}}
/>
</div>
{/* Localised light behind the masthead only — keeps the name readable without washing the face */}
<div
className="absolute inset-0"
style={{
background:
"radial-gradient(ellipse 72% 48% at 50% 55%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.18) 55%, transparent 85%)",
}}
/>
</motion.div>

 {/* ✦ Floating ambient orbs — desktop only (blur + continuous anim = mobile jank) */}
<div aria-hidden className="absolute inset-0 pointer-events-none hidden md:block">
<div
className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-drift-1"
style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }}
/>
<div
className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl animate-drift-2"
style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)" }}
/>
</div>

<div className="paper-grain absolute inset-0 pointer-events-none hidden md:block" />

{/* Decorative corner medallions — slow rotate on hover */}
<div className="absolute bottom-24 left-6 lg:left-12 hidden md:block z-10">
<Medallion label="Vol." value="I" />
</div>
<div className="absolute bottom-24 right-6 lg:right-12 hidden md:block z-10">
<Medallion label="Folio" value="01" />
</div>

<motion.div
style={scrollStyle}
className="relative mx-auto max-w-7xl w-full px-6 lg:px-12 z-10 flex-1 flex flex-col"
>
{/* ✦ Two-column body — epigraph & portrait */}
<div className="mt-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
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
className="flex items-center gap-3 mb-3 sm:mb-4"
>
<span className="fleuron">❦</span>
<span className="font-caps text-[1rem] text-ink-soft">
Epigraph · From "White Words"
</span>
</motion.div>

<p className="font-serif text-[1.4rem] sm:text-[1.5rem] lg:text-[1.6rem] leading-[1.35] text-ink-2">
<span className="drop-cap animate-splotch-pop -mt-1 !text-[2.8em] sm:!text-[3.5em] !font-normal">T</span>
<motion.span
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 1.2, delay: 1.2 }}
>
he potential energy from imagination and thoughts to cure
and prevention the chronic that the whole world is — <span className="whitespace-nowrap">facing out.</span>
</motion.span>

</p>

<motion.div
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 3 }}
className="mt-3 sm:mt-4 flex items-center gap-3"
>
<span className="h-px w-10 bg-rule-strong" />
<span className="font-serif text-text-base sm:text-text-lg text-ink-soft">
— Darshan Pathak, Nepal, March 2023
</span>
</motion.div>
</motion.div>

{/* Right: portrait plate with splotch reveal */}
<motion.div
initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
viewport={{ once: true }}
transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
style={portraitStyle}
className="lg:col-span-5"
>
<div className="plate p-3 sm:p-4 lg:p-5 max-w-[200px] sm:max-w-[240px] lg:max-w-[260px] mx-auto group cursor-pointer">
<div className="relative aspect-[4/5] bg-ink overflow-hidden splotch-reveal">
<Image
src={PORTRAIT}
alt="Darshan Pathak — author of White Words"
fill
priority
sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 260px"
className="object-cover md:contrast-110 md:saturate-125 contrast-100 scale-[1.3] transition-transform duration-1000 group-hover:scale-[1.4]"
/>
<div
className="absolute inset-0 pointer-events-none"
style={{
background:
"linear-gradient(180deg, rgba(0, 0, 0,0.2) 0%, transparent 30%, transparent 60%, rgba(0, 0, 0,0.55) 100%)",
}}
/>
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-vellum md:mix-blend-difference">
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="font-caps text-[0.75rem] tracking-[0.4em] uppercase"
              >
                Plate I
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 }}
                className="font-caps text-[0.75rem] tracking-[0.4em] uppercase"
              >
                aet. LXXII
              </motion.span>
            </div>
<div className="absolute bottom-3 left-3 right-3 text-vellum font-serif text-text-sm">
Darshan Pathak · Microbiologist, Sociologist & Teacher · Nepal
</div>
<div
className="absolute inset-0 pointer-events-none"
style={{
boxShadow: "inset 0 0 80px 20px rgba(0, 0, 0,0.55)",
}}
/>
</div>
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 2.5, duration: 0.8 }}
className="mt-2 sm:mt-3 flex items-center justify-between text-ink-soft"
>
<span className="font-caps text-[0.65rem] sm:text-[0.8rem] tracking-[0.4em] uppercase">
Engraved by hand
</span>
<Seal />
</motion.div>
</div>
</motion.div>
</div>

{/* ✦ Marquee — works in scroll, closing strip of the hero */}
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1.5, delay: 2.5 }}
className="mt-6 lg:mt-8 border-y-2 border-ink/20 bg-background py-3 shadow-[0_-12px_32px_rgba(0,0,0,0.05)] overflow-hidden"
>
<div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap font-serif text-ink-soft text-text-sm sm:text-text-base animate-marquee">
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
<span className="font-caps text-[0.8rem] tracking-[0.4em] uppercase">
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
<span className="font-display text-oxblood text-[0.65rem] sm:text-[0.85rem] leading-none text-center">
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
