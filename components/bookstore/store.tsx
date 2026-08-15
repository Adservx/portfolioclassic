"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Checkout } from "./checkout";
import { InkMotes } from "@/components/ink-motes";
import { book, type Book } from "@/lib/book";

export function Store() {
const [mode, setMode] = useState<"catalog" | "checkout">("catalog");
const [format, setFormat] = useState<"print" | "digital">("print");
const [quantity, setQuantity] = useState(1);

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
setMode("catalog");
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
<span className="font-caps text-[0.85rem] tracking-[0.35em] uppercase">
Portfolio
</span>
</Link>
<div className="flex items-center gap-3">
<motion.span
animate={{ rotate: [0, 10, -10, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
className="fleuron text-gold text-text-lg"
>
❦
</motion.span>
<span className="font-caps text-[0.85rem] tracking-[0.4em] uppercase text-ink-soft">
Official Bookstore
</span>
</div>
</div>
</div>
</header>

<AnimatePresence mode="wait">
{mode === "catalog" && (
<CatalogView
key="catalog"
book={book}
quantity={quantity}
onQuantityChange={setQuantity}
onPrintPurchase={handlePrintPurchase}
onDigitalPurchase={handleDigitalPurchase}
/>
)}
{mode === "checkout" && (
<CheckoutView
key="checkout"
book={book}
format={format}
quantity={quantity}
onBack={handleBack}
onComplete={handleComplete}
/>
)}
</AnimatePresence>
</div>
);
}

/* =====================================================================
CATALOG VIEW — full book detail page
===================================================================== */

function CatalogView({ book, quantity, onQuantityChange, onPrintPurchase, onDigitalPurchase }: { book: Book; quantity: number; onQuantityChange: (q: number) => void; onPrintPurchase: () => void; onDigitalPurchase: () => void }) {
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
<span className="inline-block font-caps text-[0.75rem] tracking-[0.45em] uppercase text-oxblood mb-4 border border-oxblood/40 px-3 py-1">
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
className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-caps text-[1rem] uppercase text-gold"
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
<span className="font-serif text-text-base text-faded">incl. VAT</span>
</div>
<div className="flex flex-wrap items-center gap-6">
<div className="flex items-center gap-1 border border-rule bg-vellum/50">
<button
onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
className="w-10 h-10 flex items-center justify-center text-ink hover:bg-rule transition-colors duration-200 cursor-pointer font-serif text-xl leading-none"
>
−
</button>
<input
type="number"
value={quantity}
onChange={(e) => {
const val = parseInt(e.target.value, 10);
if (!isNaN(val) && val >= 1 && val <= 10000) onQuantityChange(val);
}}
onBlur={(e) => {
if (!e.target.value || parseInt(e.target.value, 10) < 1) onQuantityChange(1);
}}
className="w-14 h-10 flex items-center justify-center font-serif text-lg text-ink border-x border-rule bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
/>
<button
onClick={() => onQuantityChange(Math.min(10000, quantity + 1))}
className="w-10 h-10 flex items-center justify-center text-ink hover:bg-rule transition-colors duration-200 cursor-pointer font-serif text-xl leading-none"
>
+
</button>
</div>
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={onPrintPurchase}
className="relative rounded-[16px] bg-gradient-to-b from-[#222222] to-[#000000] text-[#FAFAFA] px-14 py-7 transition-all duration-200 hover:brightness-110 shadow-[0_10px_0_#222222,0_16px_32px_-8px_rgba(0,0,0,0.4)] active:shadow-[0_3px_0_#222222] active:translate-y-[7px] cursor-pointer text-center"
>
<span className="relative z-10 block font-caps font-bold text-4xl leading-tight text-link">🛒 Buy</span>
<span className="relative z-10 block font-caps font-bold text-xl tracking-[0.1em] text-[#888888] mt-1">Hardcopy (Physical)</span>
</motion.button>
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={onDigitalPurchase}
className="relative rounded-[16px] bg-gradient-to-b from-[#333333] to-[#000000] text-[#FAFAFA] px-14 py-7 transition-all duration-200 hover:brightness-125 shadow-[0_10px_0_#111111,0_16px_32px_-8px_rgba(0,0,0,0.4)] active:shadow-[0_3px_0_#111111] active:translate-y-[7px] cursor-pointer text-center"
>
<span className="relative z-10 block font-caps font-bold text-4xl leading-tight text-link">🛒 Buy</span>
<span className="relative z-10 block font-caps font-bold text-xl tracking-[0.1em] text-[#888888] mt-1">Softcopy (PDF)</span>
</motion.button>
</div>
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
<h3 className="font-caps text-[1rem] uppercase text-oxblood mb-3">
Author
</h3>
<p className="font-serif text-2xl text-ink">{book.author}</p>
</div>

{/* Dedication */}
{book.dedication && (
<div>
<h3 className="font-caps text-[1rem] uppercase text-oxblood mb-3">
Dedication
</h3>
<div className="flex items-start gap-4">
<div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden plate shrink-0">
<Image
src="/wifey.jpg"
alt="The Wife"
fill
loading="lazy"
sizes="64px"
className="object-cover sepia-[0.3] contrast-105"
/>
</div>
<blockquote className="font-serif text-text-lg text-ink-soft leading-relaxed border-l border-oxblood/30 pl-4">
“{book.dedication}”
</blockquote>
</div>
</div>
)}

{/* Preface */}
{book.preface && (
<div>
<h3 className="font-caps text-[1rem] uppercase text-oxblood mb-3">
Preface
</h3>
<blockquote className="font-serif text-text-lg text-ink-soft leading-relaxed border-l border-oxblood/30 pl-4">
“{book.preface}”
</blockquote>
</div>
)}

{/* Contact */}
<div>
<h3 className="font-caps text-[1rem] uppercase text-oxblood mb-3">
Inquiries
</h3>
<div className="font-serif text-text-lg text-ink-soft space-y-1">
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
<h3 className="font-caps text-[0.8rem] tracking-[0.4em] uppercase text-oxblood">
Table of Contents
</h3>
<span className="font-caps text-[0.7rem] tracking-[0.3em] uppercase text-faded">
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
<span className="font-serif text-text-base text-ink-soft group-hover:text-ink transition-colors duration-300 leading-snug">
{entry.title}
</span>
<span className="shrink-0 font-caps text-[0.7rem] tracking-widest text-faded">
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
<div className="font-serif text-text-base text-faded">
White Words (2023) by Darshan Pathak — the author&rsquo;s only
published work. Free PDF download for readers.
</div>
<Link
href="/"
className="group inline-flex items-center gap-3 font-caps text-[0.8rem] tracking-[0.35em] uppercase text-link underline underline-offset-4 decoration-link/60 transition-colors duration-300"
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

function parsePrice(price: string): number {
return parseFloat(price.replace(/[£$€]/g, ""));
}

function CheckoutView({
book,
format,
quantity,
onBack,
onComplete,
}: {
book: Book;
format: "print" | "digital";
quantity: number;
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
<motion.span whileHover={{ x: -4 }} transition={{ duration: 0.3 }} className="font-display text-text-lg text-gold">
←
</motion.span>
<span className="font-caps text-[0.75rem] tracking-[0.35em] uppercase">
Back to Bookstore
</span>
</button>

{/* Mini cart summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 p-4 bg-parchment border border-rule">
        <div className="relative w-12 h-16 overflow-hidden plate-thin shrink-0">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="min-w-0">
            <p className="font-serif text-text-lg text-ink truncate">{book.title}</p>
            <p className="font-caps text-[0.85rem] tracking-[0.3em] uppercase text-ink-soft mt-0.5">
              {format === "print" ? "Physical Copy" : "Digital PDF"} · Qty: {quantity}
            </p>
            <p className="font-serif text-[0.95rem] text-faded mt-0.5">
              {format === "print"
                ? "Dispatch in 2–4 weeks"
                : "Delivered via email after purchase"}
            </p>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="font-display text-lg text-oxblood block">{book.price}</span>
            {quantity > 1 && (
              <span className="font-caps text-[0.75rem] tracking-[0.2em] text-faded">
                × {quantity} = $
                {(parsePrice(book.price) * quantity).toFixed(2)} · NPR{" "}
                {Math.round(parsePrice(book.price) * (460 / 3) * quantity)}
              </span>
            )}
          </div>
        </div>
      </div>

          <Checkout
            items={[
              {
                id: book.id,
                title: book.title,
                price: book.price,
                cover: book.cover,
                binding: book.binding,
                quantity,
              },
            ]}
            onBack={onBack}
            onComplete={onComplete}
            format={format}
          />
</div>
</div>
</motion.div>
);
}

