"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Checkout } from "./checkout";
import { InkMotes } from "@/components/ink-motes";
import { book, thesis, products, type Book } from "@/lib/book";
import { useUsdNprRate } from "@/lib/rate";

export function Store() {
const [productId, setProductId] = useState<number>(book.id);
const [mode, setMode] = useState<"home" | "detail" | "checkout">("home");
const [format, setFormat] = useState<"print" | "digital">("print");
const [quantity, setQuantity] = useState(1);
const { rate } = useUsdNprRate();

const product = products.find((p) => p.id === productId) ?? book;

const selectProduct = useCallback((id: number) => {
const p = products.find((x) => x.id === id);
if (!p) return;
setProductId(id);
setFormat(p.digitalOnly ? "digital" : "print");
setQuantity(1);
setMode("detail");
}, []);

const handlePrintPurchase = useCallback(() => {
setFormat("print");
setMode("checkout");
}, []);

const handleDigitalPurchase = useCallback(() => {
setFormat("digital");
setQuantity(1);
setMode("checkout");
}, []);

const handleBack = useCallback(() => {
setMode("detail");
}, []);

const handleComplete = useCallback(() => {
setMode("home");
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
<span className="hidden sm:inline font-caps text-[0.85rem] tracking-[0.4em] uppercase text-ink-soft">
Official Bookstore
</span>
</div>
</div>
</div>
</header>

<AnimatePresence mode="wait">
{mode === "home" && (
<CatalogHome
key="home"
products={products}
rate={rate}
onSelectProduct={selectProduct}
/>
)}
{mode === "detail" && (
<CatalogView
key={`catalog-${product.id}`}
product={product}
products={products}
productId={product.id}
quantity={quantity}
rate={rate}
onQuantityChange={setQuantity}
onSelectProduct={selectProduct}
onBackToHome={() => setMode("home")}
onPrintPurchase={handlePrintPurchase}
onDigitalPurchase={handleDigitalPurchase}
/>
)}
{mode === "checkout" && (
<CheckoutView
key={`checkout-${product.id}`}
book={product}
format={format}
quantity={quantity}
rate={rate}
onBack={handleBack}
onComplete={handleComplete}
/>
)}
</AnimatePresence>
</div>
);
}

/* =====================================================================
CATALOG HOME — cover grid
===================================================================== */

function CatalogHome({ products, rate, onSelectProduct }: { products: Book[]; rate: number; onSelectProduct: (id: number) => void }) {
return (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
className="relative z-10"
>
<section className="relative pt-14 pb-32 px-6 lg:px-12">
<div className="mx-auto max-w-7xl">
<div className="text-center mb-14">
<motion.p
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}
className="font-caps text-[0.8rem] tracking-[0.45em] uppercase text-oxblood mb-4"
>
Official Bookstore
</motion.p>
<motion.h1
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
className="font-display text-5xl md:text-7xl text-ink leading-[0.95]"
>
The Library of Darshan Pathak
</motion.h1>
<motion.p
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.3 }}
className="mt-4 font-serif text-xl text-ink-soft"
>
Two works — choose a title to view its details.
</motion.p>
</div>

<div className="grid sm:grid-cols-2 gap-8 lg:gap-14 max-w-5xl mx-auto">
{products.map((p, idx) => (
<motion.button
key={p.id}
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.35 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
onClick={() => onSelectProduct(p.id)}
className="group text-left cursor-pointer focus:outline-none"
>
<div className="relative aspect-[3/4] overflow-hidden plate shadow-paper-2 transition-transform duration-500 group-hover:scale-[1.015] group-hover:-translate-y-1">
<Image
src={p.cover}
alt={`Cover of ${p.title}`}
fill
priority={idx === 0}
sizes="(max-width: 640px) 100vw, 480px"
className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
/>
<div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 40px 4px rgba(0,0,0,0.35)" }} />
</div>
<div className="mt-5 text-center">
<h2 className="font-display text-3xl md:text-4xl text-ink group-hover:text-oxblood transition-colors duration-300">
{p.title}
</h2>
<p className="mt-2 font-display text-2xl md:text-3xl text-oxblood">
${parsePrice(p.price).toFixed(2)}/- · NPR {Math.round(parsePrice(p.price) * rate)}
</p>
<p className="mt-2 font-caps text-[0.8rem] tracking-[0.35em] uppercase text-faded">
{p.badge ?? "The Only Edition"} · {p.year}
</p>
<span className="mt-4 inline-block font-caps text-[0.85rem] tracking-[0.35em] uppercase text-link underline underline-offset-4 decoration-link/60 group-hover:decoration-link transition-colors duration-300">
View Details
</span>
</div>
</motion.button>
))}
</div>

<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.7, delay: 0.7 }}
className="mt-20 text-center font-serif text-text-base text-faded"
>
Prices shown in Nepali Rupees update hourly with the live exchange rate.
</motion.p>
</div>
</section>
</motion.div>
);
}

/* =====================================================================
CATALOG VIEW — full book detail page
===================================================================== */

function CatalogView({ product, products, productId, quantity, rate, onQuantityChange, onSelectProduct, onBackToHome, onPrintPurchase, onDigitalPurchase }: { product: Book; products: Book[]; productId: number; quantity: number; rate: number; onQuantityChange: (q: number) => void; onSelectProduct: (id: number) => void; onBackToHome: () => void; onPrintPurchase: () => void; onDigitalPurchase: () => void }) {
return (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
className="relative z-10"
>
{/* ✦ Catalogue Switcher */}
<section className="relative z-10 pt-10 px-6 lg:px-12">
<div className="mx-auto max-w-7xl">
<div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-4">
<div className="flex gap-2 sm:gap-3">
{products.map((p) => (
<button
key={p.id}
onClick={() => onSelectProduct(p.id)}
className={`px-4 sm:px-6 py-2.5 font-caps text-[0.8rem] sm:text-[0.9rem] tracking-[0.3em] uppercase border transition-colors duration-300 cursor-pointer ${
p.id === productId
? "border-ink bg-ink text-vellum"
: "border-rule text-ink-soft hover:border-ink/40 hover:text-ink"
}`}
>
{p.shortTitle ?? p.title}
</button>
))}
</div>
<div className="flex items-center gap-6">
<button
onClick={onBackToHome}
className="group inline-flex items-center gap-2 font-caps text-[0.8rem] tracking-[0.35em] uppercase text-link underline underline-offset-4 decoration-link/60 transition-colors duration-300 cursor-pointer"
>
<motion.span whileHover={{ x: -4 }} transition={{ duration: 0.3 }} className="font-display text-lg">
←
</motion.span>
All Titles
</button>
<span className="font-caps text-[0.7rem] tracking-[0.35em] uppercase text-faded">
{product.digitalOnly ? "Digital Edition" : "First Edition"} · {product.year}
</span>
</div>
</div>
</div>
</section>

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
              src={product.cover}
              alt={`Cover of ${product.title}`}
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
{product.badge ?? "The Only Edition"}
</span>
</motion.div>

<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
className={`font-display text-ink leading-[0.95] ${product.digitalOnly ? "text-4xl md:text-5xl lg:text-6xl" : "text-6xl md:text-8xl lg:text-8xl xl:text-9xl leading-[0.9]"}`}
>
{product.title}
</motion.h1>

{product.subtitle && (
<motion.p
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
className="mt-4 font-display text-2xl md:text-3xl text-oxblood"
>
{product.subtitle}
</motion.p>
)}

<motion.p
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
className="mt-5 font-serif text-xl text-ink-soft max-w-xl leading-relaxed"
>
{product.excerpt}
</motion.p>

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.7, delay: 0.6 }}
className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-caps text-[1rem] uppercase text-gold"
>
{product.isbn && (
<>
<span>ISBN {product.isbn}</span>
<span className="text-gold/50">❦</span>
</>
)}
<span>{product.binding}</span>
<span className="text-gold/50">❦</span>
<span>{product.year}</span>
{product.publisher && (
<>
<span className="text-gold/50">❦</span>
<span>{product.publisher}</span>
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
<div className="flex items-baseline gap-2 flex-wrap">
<span className="font-display text-4xl sm:text-5xl lg:text-6xl text-oxblood">${parsePrice(product.price).toFixed(2)}/- · NPR {Math.round(parsePrice(product.price) * rate)}</span>
<span className="font-serif text-text-base text-faded">incl. VAT</span>
</div>
<div className="flex flex-wrap items-center gap-6">
{!product.digitalOnly && (
<div className="flex items-center gap-1 border border-rule bg-vellum/50">
<button
onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
className="w-12 h-12 flex items-center justify-center text-ink hover:bg-rule transition-colors duration-200 cursor-pointer font-serif text-xl leading-none"
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
className="w-14 h-12 flex items-center justify-center font-serif text-lg text-ink border-x border-rule bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
/>
<button
onClick={() => onQuantityChange(Math.min(10000, quantity + 1))}
className="w-12 h-12 flex items-center justify-center text-ink hover:bg-rule transition-colors duration-200 cursor-pointer font-serif text-xl leading-none"
>
+
</button>
</div>
)}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
{!product.digitalOnly && (
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={onPrintPurchase}
className="relative rounded-[16px] bg-gradient-to-b from-[#222222] to-[#000000] text-[#FAFAFA] px-6 sm:px-10 lg:px-14 py-4 sm:py-6 lg:py-7 transition-all duration-200 hover:brightness-110 shadow-[0_10px_0_#222222,0_16px_32px_-8px_rgba(0,0,0,0.4)] active:shadow-[0_3px_0_#222222] active:translate-y-[7px] cursor-pointer text-center flex-1 sm:flex-none"
>
<span className="relative z-10 block font-caps font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-link">🛒 Buy</span>
<span className="relative z-10 block font-caps font-bold text-base sm:text-lg lg:text-xl tracking-[0.1em] text-[#888888] mt-1">Hardcopy (Physical)</span>
</motion.button>
)}
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={onDigitalPurchase}
className={`relative rounded-[16px] bg-gradient-to-b from-[#333333] to-[#000000] text-[#FAFAFA] px-6 sm:px-10 lg:px-14 py-4 sm:py-6 lg:py-7 transition-all duration-200 hover:brightness-125 shadow-[0_10px_0_#111111,0_16px_32px_-8px_rgba(0,0,0,0.4)] active:shadow-[0_3px_0_#111111] active:translate-y-[7px] cursor-pointer text-center flex-1 sm:flex-none ${product.digitalOnly ? "bg-gradient-to-b from-[#222222] to-[#000000] shadow-[0_10px_0_#222222,0_16px_32px_-8px_rgba(0,0,0,0.4)] active:shadow-[0_3px_0_#222222]" : ""}`}
>
<span className="relative z-10 block font-caps font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-link">🛒 Buy</span>
<span className="relative z-10 block font-caps font-bold text-base sm:text-lg lg:text-xl tracking-[0.1em] text-[#888888] mt-1">Softcopy (PDF)</span>
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
<p className="font-serif text-2xl text-ink">{product.author}</p>
</div>

{/* Dedication */}
{product.dedication && (
<div>
<h3 className="font-caps text-[1rem] uppercase text-oxblood mb-3">
Dedication
</h3>
<div className="flex items-start gap-4">
<div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden plate shrink-0">
<Image
src="/wifey.jpg"
alt="Binita Bhandari Pathak"
fill
loading="lazy"
sizes="64px"
className="object-cover sepia-[0.3] contrast-105"
/>
</div>
<blockquote className="font-serif text-text-lg text-ink-soft leading-relaxed border-l border-oxblood/30 pl-4">
“{product.dedication}”
</blockquote>
</div>
</div>
)}

{/* Preface */}
{product.preface && (
<div>
<h3 className="font-caps text-[1rem] uppercase text-oxblood mb-3">
{product.digitalOnly ? "About the Thesis" : "Preface"}
</h3>
<blockquote className="font-serif text-text-lg text-ink-soft leading-relaxed border-l border-oxblood/30 pl-4">
“{product.preface}”
</blockquote>
</div>
)}

{/* Thesis research details */}
{product.details && (
<div>
<h3 className="font-caps text-[1rem] uppercase text-oxblood mb-3">
Research
</h3>
<div className="border border-rule bg-parchment/40 p-5 space-y-3">
{product.details.map((d) => (
<div key={d.label}>
<p className="font-caps text-[0.8rem] tracking-[0.3em] uppercase text-faded mb-0.5">
{d.label}
</p>
<p className="font-serif text-text-lg text-ink-soft leading-relaxed">
{d.value}
</p>
</div>
))}
</div>
</div>
)}

{/* Contact */}
<div>
<h3 className="font-caps text-[1rem] uppercase text-oxblood mb-3">
Inquiries
</h3>
<div className="font-serif text-text-lg text-ink-soft space-y-1">
{product.email && <p>{product.email}</p>}
{product.phone && <p>{product.phone}</p>}
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
{product.toc && (
<div className="bg-vellum border border-rule p-6 lg:p-8">
<div className="flex items-center justify-between mb-5">
<h3 className="font-caps text-[0.8rem] tracking-[0.4em] uppercase text-oxblood">
Table of {product.tocLabel ?? "Contents"}
</h3>
<span className="font-caps text-[0.7rem] tracking-[0.3em] uppercase text-faded">
{product.toc.length} {product.tocLabel ?? "articles"}
</span>
</div>
<div className="h-px bg-rule mb-5" />
<ul className="space-y-1.5 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
{product.toc.map((entry, idx) => (
<li
key={idx}
className="flex items-baseline justify-between gap-3 py-1.5 border-b border-rule group"
>
<span className="font-serif text-text-base text-ink-soft group-hover:text-ink transition-colors duration-300 leading-snug">
{entry.title}
</span>
{entry.page && (
<span className="shrink-0 font-caps text-[0.7rem] tracking-widest text-faded">
p.{entry.page}
</span>
)}
</li>
))}
</ul>
</div>
)}
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
{product.title} ({product.year}) by {product.author} — {product.digitalOnly ? "digital edition · PDF delivered by email after purchase." : "the author&rsquo;s only published work. Free PDF download for readers."}
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
rate,
onBack,
onComplete,
}: {
book: Book;
format: "print" | "digital";
quantity: number;
rate: number;
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
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="min-w-0">
            <p className="font-serif text-text-lg text-ink truncate">{book.title}</p>
            <p className="font-caps text-[0.85rem] tracking-[0.3em] uppercase text-ink-soft mt-0.5">
              {format === "print" ? `Physical Copy · Qty: ${quantity}` : "Digital PDF"}
            </p>
            <p className="font-serif text-[0.95rem] text-faded mt-0.5">
              {format === "print"
                ? "Dispatch in 2–4 weeks"
                : "Delivered via email after purchase"}
            </p>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="font-display text-lg text-oxblood block">${parsePrice(book.price).toFixed(2)}/- · NPR {Math.round(parsePrice(book.price) * rate)}</span>
            {quantity > 1 && (
              <span className="font-caps text-[0.75rem] tracking-[0.2em] text-faded">
                × {quantity} = $
                {(parsePrice(book.price) * quantity).toFixed(2)} · NPR{" "}
                {Math.round(parsePrice(book.price) * rate * quantity)}
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
                quantity: format === "digital" ? 1 : quantity,
              },
            ]}
            onBack={onBack}
            onComplete={onComplete}
            format={format}
            rate={rate}
          />
</div>
</div>
</motion.div>
);
}

