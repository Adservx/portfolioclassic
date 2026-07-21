"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Checkout } from "@/components/bookstore/checkout";
import { InkMotes } from "@/components/ink-motes";

interface Book {
id: number;
title: string;
author: string;
category: string;
year: string;
cover: string;
excerpt: string;
binding: string;
price: string;
pdfUrl?: string;
isbn?: string;
publisher?: string;
email?: string;
phone?: string;
dedication?: string;
preface?: string;
toc?: { title: string; page: string }[];
}

const book: Book = {
id: 1,
title: "White Words",
author: "Darshan Pathak",
category: "Poetry & Essays",
year: "2023",
cover: "/bookstore/white-words-cover.webp",
excerpt:
"A collection of 93 articles on love, spirit, science and the quiet architecture of the mind — written to cure and prevent the chronic ache the world faces.",
binding: "First Edition · 312 pp.",
price: "$3.00",
pdfUrl: "/bookstore/white-words.pdf",
isbn: "978-9937-1-3757-7",
publisher: "Darshan Pathak",
email: "darshanpathak1992@gmail.com",
phone: "+977 9741766064",
dedication:
"Dedicated to my wife — B.S.C. Nurse (SGT University, India). “The book WHITE WORDS made me proud and challenge to my soul with no proof of love existence with the character of this book's words, the potential energy from imagination and thoughts to cure and prevention the chronic that the whole world is facing out.” — The wife.",
preface:
"“This book may be useful for all. In this book the key feature is the series of 93 Articles, containing positive status, a glossary of literary terms, and motivates to writing literary essays and documenting them in correct format. In this book the article 'Dark' guides to find the natural light in our life. The author has tries to avoid the bad habits of people.” — Amrit Aryal, Editor, Waling, March 16, 2023.",
toc: [
{ title: "Can it be possible to feel it non-living", page: "3" },
{ title: "Daily day dream", page: "5" },
{ title: "Do not tell lie", page: "6" },
{ title: "Words!!!", page: "7" },
{ title: "Wishing from Her", page: "9" },
{ title: "Why the crow is Crowing!", page: "11" },
{ title: "We pronounced them the “Mad”", page: "12" },
{ title: "To her!", page: "16" },
{ title: "The sky above space", page: "19" },
{ title: "The path of mind", page: "20" },
{ title: "Temple is heart", page: "21" },
{ title: "Spiritual symptoms", page: "22" },
{ title: "Soul", page: "29" },
{ title: "Show what you know", page: "30" },
{ title: "Scientific letter of love", page: "31" },
{ title: "Physical Punishment", page: "34" },
{ title: "No one like you", page: "36" },
{ title: "No competition at night", page: "38" },
{ title: "Nervous!", page: "39" },
{ title: "Mucosa Nebula", page: "41" },
{ title: "Micro organisms", page: "45" },
{ title: "Melodious music", page: "45" },
{ title: "Kitchen", page: "46" },
{ title: "I don't think so!", page: "47" },
{ title: "Flowers", page: "49" },
{ title: "Fish", page: "50" },
{ title: "Yes!", page: "51" },
{ title: "Evolution of Age!", page: "52" },
{ title: "Don't put your hand on head and sex organs by yourself", page: "54" },
{ title: "Moving Man", page: "59" },
{ title: "Through the window", page: "60" },
{ title: "Ey", page: "62" },
{ title: "Apocryphal God", page: "63" },
{ title: "Movement of Mind", page: "64" },
{ title: "Stars are starring you!", page: "65" },
{ title: "Wrong Answer", page: "66" },
{ title: "The last Time", page: "68" },
{ title: "Mr. Nobody", page: "69" },
{ title: "No one can Construct and Destruct me", page: "70" },
{ title: "Why are you able to give Suggestion to me", page: "71" },
{ title: "The last Night", page: "72" },
{ title: "Pain Cares The Body", page: "73" },
{ title: "My life is Stealing", page: "74" },
{ title: "Cap a Pie Euphony", page: "75" },
{ title: "Birds", page: "76" },
{ title: "Alphabet of alphabets", page: "77" },
{ title: "Sand in sands", page: "78" },
{ title: "Dust", page: "79" },
{ title: "River", page: "80" },
{ title: "Respect", page: "82" },
{ title: "Regeneration Power", page: "83" },
{ title: "Dormancy", page: "84" },
{ title: "Girle", page: "86" },
{ title: "Deception", page: "88" },
{ title: "Heavenly hell habits!", page: "89" },
{ title: "The Word “Peace”", page: "91" },
{ title: "Crops life", page: "92" },
{ title: "Steam and Smoke", page: "93" },
{ title: "Fruits", page: "94" },
{ title: "What makes wobble and warm in wet winter!", page: "95" },
{ title: "Pen", page: "97" },
{ title: "God", page: "98" },
{ title: "Everything is Hole!", page: "100" },
{ title: "Bookworm", page: "101" },
{ title: "Returns in Return", page: "102" },
{ title: "Why air is colourless!", page: "103" },
{ title: "Earthquake", page: "105" },
{ title: "Dark", page: "107" },
{ title: "Shoe", page: "108" },
{ title: "Think, listen, see and speak in English", page: "110" },
{ title: "I love facebook status", page: "111" },
{ title: "Experienced and Empirical", page: "114" },
{ title: "Place to place", page: "129" },
{ title: "My Wishes", page: "130" },
{ title: "Hello Happy", page: "131" },
{ title: "Sex and Aids", page: "132" },
{ title: "They don't give you sufficient Salary.", page: "133" },
{ title: "I want to be Defeated.", page: "134" },
{ title: "Dear Students,", page: "135" },
{ title: "Gossip and Gossiper", page: "136" },
{ title: "Lion Skin but Fox Heart", page: "137" },
{ title: "Shadow", page: "138" },
{ title: "Watch and Clock", page: "139" },
{ title: "Road", page: "140" },
{ title: "Rest and Religion", page: "141" },
{ title: "Love and war", page: "142" },
{ title: "Distance", page: "143" },
{ title: "Food", page: "144" },
{ title: "Zero Hour", page: "145" },
{ title: "Emptiness", page: "146" },
],
};

export default function Bookstore() {
const [mode, setMode] = useState<"catalog" | "checkout" | "complete">("catalog");
const [format, setFormat] = useState<"print" | "digital">("print");

const handlePrintPurchase = useCallback(() => {
setFormat("print");
setMode("checkout");
}, []);

const handleDigitalPurchase = useCallback(() => {
setFormat("digital");
setMode("checkout");
}, []);

const handleBack = useCallback(() => {
setMode("catalog");
}, []);

const handleComplete = useCallback(() => {
setMode("complete");
}, []);

return (
<div className="relative min-h-screen bg-background"
>
<InkMotes count={16} />
<div className="paper-fibers" />

{/* ✦ Header */}
<header className="relative z-20 border-b border-rule bg-background/90 backdrop-blur-md">
<div className="mx-auto max-w-7xl px-6 lg:px-12 py-4">
<div className="flex items-center justify-between">
<Link
href="/"
className="group inline-flex items-center gap-2 text-link underline underline-offset-4 decoration-link/60 transition-colors duration-300"
>
<motion.span whileHover={{ x: -4 }} transition={{ duration: 0.3 }} className="font-display text-lg">
←
</motion.span>
<span className="font-caps text-[0.7rem] tracking-[0.35em] uppercase">
Portfolio
</span>
</Link>
<div className="flex items-center gap-3">
<motion.span
animate={{ rotate: [0, 10, -10, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
className="fleuron text-gold text-base"
>
❦
</motion.span>
<span className="font-caps text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft">
Official Bookstore
</span>
</div>
</div>
</div>
</header>

<AnimatePresence mode="wait">
{mode === "catalog" && (
<CatalogView key="catalog" book={book} onPrintPurchase={handlePrintPurchase} onDigitalPurchase={handleDigitalPurchase} />
)}
{mode === "checkout" && (
<CheckoutView
key="checkout"
book={book}
format={format}
onBack={handleBack}
onComplete={handleComplete}
/>
)}
{mode === "complete" && (
<CompleteView key="complete" format={format} book={book} onReturn={handleBack} />
)}
</AnimatePresence>
</div>
);
}

/* =====================================================================
CATALOG VIEW — full book detail page
===================================================================== */

function CatalogView({ book, onPrintPurchase, onDigitalPurchase }: { book: Book; onPrintPurchase: () => void; onDigitalPurchase: () => void }) {
return (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
className="relative z-10"
>
{/* ✦ Hero — Split Layout */}
<section className="relative pt-12 pb-20 px-6 lg:px-12 overflow-hidden">
<div className="mx-auto max-w-7xl">
<div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">

{/* Cover — left 2 cols */}
<motion.div
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
className="lg:col-span-2 relative"
>
<div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden plate shadow-paper-2">
<Image
              src={book.cover}
              alt={`Cover of ${book.title}`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-cover"
            />
<div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 40px 4px rgba(0,0,0,0.35)" }} />
</div>
</motion.div>

{/* Details — right 3 cols */}
<motion.div
initial={{ opacity: 0, x: 40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
className="lg:col-span-3"
>
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.35 }}
>
<span className="inline-block font-caps text-[0.6rem] tracking-[0.45em] uppercase text-oxblood mb-4 border border-oxblood/40 px-3 py-1">
The Only Edition
</span>
</motion.div>

<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
className="font-display text-6xl md:text-8xl lg:text-9xl text-ink leading-[0.9]"
>
{book.title}
</motion.h1>

<motion.p
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
className="mt-5 font-serif text-xl text-ink-soft max-w-xl leading-relaxed"
>
{book.excerpt}
</motion.p>

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.7, delay: 0.6 }}
className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-caps text-[0.6rem] tracking-[0.35em] uppercase text-gold"
>
<span>ISBN {book.isbn}</span>
<span className="text-gold/50">❦</span>
<span>{book.binding}</span>
<span className="text-gold/50">❦</span>
<span>{book.year}</span>
{book.publisher && (
<>
<span className="text-gold/50">❦</span>
<span>{book.publisher}</span>
</>
)}
</motion.div>

{/* Price + CTA */}
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.7 }}
className="mt-10 flex flex-wrap items-center gap-6"
>
<div className="flex items-baseline gap-2">
<span className="font-display text-6xl text-oxblood">{book.price}</span>
<span className="font-serif text-sm text-faded">incl. VAT</span>
</div>
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={onPrintPurchase}
className="relative rounded-[16px] bg-gradient-to-b from-[#222222] to-[#000000] text-[#FAFAFA] px-14 py-7 transition-all duration-200 hover:brightness-110 shadow-[0_10px_0_#222222,0_16px_32px_-8px_rgba(0,0,0,0.4)] active:shadow-[0_3px_0_#222222] active:translate-y-[7px] cursor-pointer text-center"
>
<span className="relative z-10 block font-caps font-bold text-xl leading-tight">🛒 Buy</span>
<span className="relative z-10 block font-caps font-bold text-4xl tracking-[0.1em] uppercase text-[#888888] mt-1">Hardcopy (Physical)</span>
</motion.button>
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={onDigitalPurchase}
className="relative rounded-[16px] bg-gradient-to-b from-[#333333] to-[#000000] text-[#FAFAFA] px-14 py-7 transition-all duration-200 hover:brightness-125 shadow-[0_10px_0_#111111,0_16px_32px_-8px_rgba(0,0,0,0.4)] active:shadow-[0_3px_0_#111111] active:translate-y-[7px] cursor-pointer text-center"
>
<span className="relative z-10 block font-caps font-bold text-xl leading-tight">🛒 Buy</span>
<span className="relative z-10 block font-caps font-bold text-4xl tracking-[0.1em] uppercase text-[#888888] mt-1">Softcopy (PDF)</span>
</motion.button>
</div>
</motion.div>
</motion.div>
</div>
</div>
</section>

{/* ✦ Product Details Section */}
<section className="relative z-10 pb-32 px-6 lg:px-12">
<div className="mx-auto max-w-7xl">
<div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

{/* Left column — Dedication, Preface, Metadata */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
className="space-y-10"
>
{/* Author */}
<div>
<h3 className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-oxblood mb-3">
Author
</h3>
<p className="font-serif text-xl text-ink">{book.author}</p>
</div>

{/* Dedication */}
{book.dedication && (
<div>
<h3 className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-oxblood mb-3">
Dedication
</h3>
<blockquote className="font-serif text-sm text-ink-soft leading-relaxed border-l border-oxblood/30 pl-4">
“{book.dedication}”
</blockquote>
</div>
)}

{/* Preface */}
{book.preface && (
<div>
<h3 className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-oxblood mb-3">
Preface
</h3>
<blockquote className="font-serif text-sm text-ink-soft leading-relaxed border-l border-oxblood/30 pl-4">
“{book.preface}”
</blockquote>
</div>
)}

{/* Contact */}
<div>
<h3 className="font-caps text-[0.6rem] tracking-[0.4em] uppercase text-oxblood mb-3">
Inquiries
</h3>
<div className="font-serif text-sm text-ink-soft space-y-1">
{book.email && <p>{book.email}</p>}
{book.phone && <p>{book.phone}</p>}
</div>
</div>
</motion.div>

{/* Right column — TOC */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
>
<div className="bg-vellum border border-rule p-6 lg:p-8">
<div className="flex items-center justify-between mb-5">
<h3 className="font-caps text-[0.65rem] tracking-[0.4em] uppercase text-oxblood">
Table of Contents
</h3>
<span className="font-caps text-[0.55rem] tracking-[0.3em] uppercase text-faded">
{book.toc?.length || 0} articles
</span>
</div>
<div className="h-px bg-rule mb-5" />
<ul className="space-y-1.5 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
{book.toc?.map((entry, idx) => (
<li
key={idx}
className="flex items-baseline justify-between gap-3 py-1.5 border-b border-rule group"
>
<span className="font-serif text-sm text-ink-soft group-hover:text-ink transition-colors duration-300 leading-snug">
{entry.title}
</span>
<span className="shrink-0 font-caps text-[0.55rem] tracking-widest text-faded">
p.{entry.page}
</span>
</li>
))}
</ul>
</div>
</motion.div>
</div>

{/* ✦ Colophon */}
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="mt-20 pt-10 border-t border-rule"
>
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
<div className="font-serif text-sm text-faded">
White Words (2023) by Darshan Pathak — the author&rsquo;s only
published work. Free PDF download for readers.
</div>
<Link
href="/"
className="group inline-flex items-center gap-3 font-caps text-[0.65rem] tracking-[0.35em] uppercase text-link underline underline-offset-4 decoration-link/60 transition-colors duration-300"
>
<motion.span whileHover={{ x: -4 }} transition={{ duration: 0.3 }} className="font-display text-lg">
←
</motion.span>
Return to Portfolio
<span className="h-px w-8 bg-ink/20 group-hover:w-12 group-hover:bg-ink/40 transition-all duration-500" />
</Link>
</div>
</motion.div>
</div>
</section>
</motion.div>
);
}

/* =====================================================================
CHECKOUT VIEW
===================================================================== */

function CheckoutView({
book,
format,
onBack,
onComplete,
}: {
book: Book;
format: "print" | "digital";
onBack: () => void;
onComplete: () => void;
}) {
return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
className="relative z-10 pt-12 pb-32 px-6 lg:px-12"
>
<div className="mx-auto max-w-2xl">
<div className="bg-vellum border border-rule p-6 lg:p-8 shadow-paper-2">
{/* Back link */}
<button
onClick={onBack}
className="group inline-flex items-center gap-2 text-ink-soft hover:text-ink transition-colors duration-300 mb-6 cursor-pointer"
>
<motion.span whileHover={{ x: -4 }} transition={{ duration: 0.3 }} className="font-display text-base text-gold">
←
</motion.span>
<span className="font-caps text-[0.6rem] tracking-[0.35em] uppercase">
Back to Bookstore
</span>
</button>

{/* Mini cart summary */}
<div className="flex items-center gap-4 mb-6 p-4 bg-parchment border border-rule">
<div className="relative w-12 h-16 overflow-hidden plate-thin shrink-0">
          <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
            />
</div>
<div className="flex-1 min-w-0">
<p className="font-serif text-sm text-ink truncate">{book.title}</p>
<p className="font-caps text-[0.55rem] tracking-[0.3em] uppercase text-ink-soft mt-0.5">
{format === "print" ? "Physical Copy" : "Digital PDF"} · Qty: 1
</p>
<p className="font-serif text-[0.65rem] text-faded mt-0.5">
{format === "print"
? "Dispatch in 2–4 weeks"
: "Delivered via email after purchase"}
</p>
</div>
<span className="font-display text-lg text-oxblood shrink-0">{book.price}</span>
</div>

<Checkout
items={[
{
id: book.id,
title: book.title,
price: book.price,
cover: book.cover,
binding: book.binding,
quantity: 1,
},
]}
onBack={onBack}
onComplete={onComplete}
/>
</div>
</div>
</motion.div>
);
}

/* =====================================================================
COMPLETE VIEW — post-purchase
===================================================================== */

function CompleteView({ onReturn, format, book }: { onReturn: () => void; format: "print" | "digital"; book: Book }) {
const orderNumber = `DP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;

return (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.4 }}
className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6"
>
{/* Wax seal */}
<motion.div
initial={{ scale: 5, rotate: -30, opacity: 0 }}
animate={{ scale: 1, rotate: -8, opacity: 1 }}
transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], type: "spring", stiffness: 120 }}
className="w-32 h-32 rounded-full border-4 border-double border-oxblood flex items-center justify-center bg-oxblood/5 mb-8"
>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.4 }}
className="w-[104px] h-[104px] rounded-full border border-oxblood/40 flex flex-col items-center justify-center"
>
<motion.span
initial={{ y: -10, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.6 }}
className="font-display text-oxblood text-lg leading-none"
>
D · P
</motion.span>
<motion.span
initial={{ y: 10, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.7 }}
className="font-caps text-oxblood/60 text-[0.55rem] tracking-[0.4em] mt-1"
>
CONFIRMED
</motion.span>
</motion.div>
</motion.div>

{/* Confetti */}
{[...Array(12)].map((_, i) => (
<motion.div
key={i}
initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
animate={{
opacity: [0, 1, 0],
scale: [0, 1, 0],
x: Math.cos((i / 12) * Math.PI * 2) * (80 + Math.random() * 60),
y: Math.sin((i / 12) * Math.PI * 2) * (80 + Math.random() * 60) - 40,
}}
transition={{ duration: 1.5, delay: 0.3 + i * 0.05, ease: "easeOut" }}
className="absolute w-2 h-2"
style={{
background: i % 3 === 0 ? "#444444" : i % 3 === 1 ? "#000000" : "#000000",
clipPath: `polygon(${50 + 50 * Math.cos((i * 60 * Math.PI) / 180)}% ${50 + 50 * Math.sin((i * 60 * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((i * 60 + 120) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((i * 60 + 120) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((i * 60 + 240) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((i * 60 + 240) * Math.PI) / 180)}%)`,
}}
/>
))}

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.5 }}
className="text-center relative"
>
<div className="rule-ornate text-faded max-w-xs mx-auto mb-6">
<span>Order</span>
<span className="fleuron text-gold">❦</span>
<span>Confirmed</span>
</div>

<h2 className="font-display text-5xl md:text-6xl text-ink leading-[0.9] mb-4">
Thank You
</h2>
<p className="font-serif text-lg text-ink-soft max-w-md mx-auto">
{format === "print"
? "Your order has been received and will be dispatched from the author&rsquo;s study within 2–4 weeks."
: "Your digital copy is ready. Download it below — a receipt has been sent to your email."}
</p>

{format === "digital" && book.pdfUrl && (
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.6 }}
className="mt-6"
>
<a
href={book.pdfUrl}
download
className="inline-flex items-center gap-2 bg-ink text-vellum hover:bg-ink-2 font-caps text-[0.7rem] tracking-[0.35em] uppercase px-8 py-3.5 transition-all duration-300"
>
<span>Download PDF</span>
<span className="text-base">↓</span>
</a>
</motion.div>
)}

<motion.div
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
className="mt-8 inline-flex items-center gap-3 border border-rule bg-vellum px-6 py-3"
>
<span className="font-caps text-[0.65rem] tracking-[0.4em] uppercase text-ink-soft">
Order No.
</span>
<span className="font-mono text-lg text-oxblood">{orderNumber}</span>
</motion.div>

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 1.2 }}
className="mt-10"
>
<motion.button
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
onClick={onReturn}
className="bg-ink text-vellum hover:bg-ink-2 font-caps text-[0.7rem] tracking-[0.35em] uppercase px-8 py-3 transition-all duration-300 cursor-pointer"
>
Continue Browsing
</motion.button>
</motion.div>
</motion.div>
</motion.div>
);
}
