"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "@/components/about";

const channels = [
{ label: "Email", value: "darshanpathak1992@gmail.com", icon: "✎" },
{ label: "Phone", value: "+977 9741766064", icon: "☏" },
{ label: "Author", value: "Darshan Pathak · Nepal", icon: "⌂" },
{ label: "Book", value: "White Words (First Edition, 2023) · ISBN 978-9937-1-3757-7", icon: "☰" },
];

export function Contact() {
const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });
const [state, setState] = useState<"idle" | "sealing" | "sent">("idle");
const formRef = useRef<HTMLFormElement>(null);

const submit = (e: React.FormEvent) => {
e.preventDefault();
setState("sealing");
setTimeout(() => {
setState("sent");
setForm({ name: "", email: "", subject: "", body: "" });
setTimeout(() => setState("idle"), 4500);
}, 1500);
};

return (
<section
id="letters"
className="relative py-section px-6 lg:px-12 overflow-hidden bg-parchment-2"
>
<div className="paper-grain absolute inset-0 pointer-events-none" />

<div className="relative mx-auto max-w-7xl">
<SectionHeader
eyebrow="Chapter V"
title="Letters"
subtitle="To write to Darshan Pathak, please use the form below, or email directly."
/>

<div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
{/* ✦ Left — address & details */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
className="lg:col-span-5"
>
<div className="font-caps text-[0.72rem] tracking-[0.4em] uppercase text-ink-soft">
Where to find him
</div>
<h3 className="mt-3 font-serif text-5xl sm:text-6xl lg:text-7xl text-ink">
The old <em className="text-oxblood">addresses</em>
</h3>

<motion.p
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.3 }}
className="mt-6 font-serif text-base sm:text-lg text-ink-soft leading-relaxed max-w-md"
>
Mr. Pathak reads every letter. He answers, in his own hand, those
that ask a real question. He does not answer fan mail, requests
for blurbs, or invitations to speak in cities he has already
visited.
</motion.p>

<div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
{channels.map((c, i) => (
<motion.div
key={c.label}
initial={{ opacity: 0, x: -30 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
className="flex items-start gap-4 group cursor-default"
>
<motion.span
whileHover={{ rotate: 15, scale: 1.15 }}
transition={{ type: "spring", stiffness: 300 }}
className="font-display text-2xl text-gold leading-none mt-1 w-8"
>
{c.icon}
</motion.span>
<div className="flex-1 border-b border-rule pb-3 group-hover:border-oxblood transition-colors duration-500 relative overflow-hidden">
<span
className="absolute inset-x-0 bottom-0 h-px bg-oxblood origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
aria-hidden
/>
<div className="font-caps text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft mb-1">
{c.label}
</div>
<div className="font-serif text-base text-ink-2 leading-snug group-hover:text-oxblood group-hover:translate-x-1 transition-all duration-500">
{c.value}
</div>
</div>
</motion.div>
))}
</div>

<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.6 }}
className="mt-8 sm:mt-10 plate-thin p-4 sm:p-6 relative"
>
<div className="flex items-center gap-3 mb-3">
<motion.span
animate={{ rotate: [0, 8, -8, 0] }}
transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
className="fleuron text-gold text-xl sm:text-2xl"
>
❦
</motion.span>
<span className="font-caps text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft">
For the Press
</span>
</div>
<p className="font-serif text-sm sm:text-base text-ink-2 leading-relaxed">
Press inquiries to <em>darshanpathak1992@gmail.com</em>. The author
does not give interviews by telephone, but answers written
questions, in writing, on Thursdays.
</p>
</motion.div>
</motion.div>

{/* ✦ Right — letter form */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
className="lg:col-span-7"
>
{/* Postmark-style image strip above the letter */}
<motion.div
initial={{ opacity: 0, x: 20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="flex items-center gap-3 sm:gap-4 mb-6"
>
<div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 plate-thin overflow-hidden shrink-0 group">
<img
src="https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=200&q=80&auto=format&fit=crop"
alt="An old typewriter, with a letter in its carriage"
width={200}
height={200}
loading="lazy"
decoding="async"
className="absolute inset-0 w-full h-full object-cover sepia-[0.5] contrast-110 group-hover:scale-110 transition-transform duration-700"
/>
</div>
<div className="flex-1 border-t border-b border-ink/30 py-2">
<div className="font-caps text-[0.6rem] sm:text-[0.65rem] tracking-[0.4em] uppercase text-ink-soft">
By post
</div>
<div className="font-serif text-sm sm:text-base text-ink mt-1">
Mr. Pathak answers letters in the order they arrive.
</div>
</div>
</motion.div>

<motion.form
ref={formRef}
onSubmit={submit}
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.8, delay: 0.2 }}
className="relative plate p-6 sm:p-8 lg:p-12"
>
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.4 }}
className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 font-caps text-[0.6rem] sm:text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft"
>
Folio · {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
</motion.div>

<div className="font-caps text-[0.7rem] sm:text-[0.72rem] tracking-[0.4em] uppercase text-ink-soft mb-6 sm:mb-8">
To Darshan Pathak, from
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
<LetterField
label="Name"
value={form.name}
onChange={(v) => setForm({ ...form, name: v })}
/>
<LetterField
label="Email"
type="email"
value={form.email}
onChange={(v) => setForm({ ...form, email: v })}
/>
</div>

<div className="mb-4 sm:mb-6">
<LetterField
label="Subject"
value={form.subject}
onChange={(v) => setForm({ ...form, subject: v })}
/>
</div>

<div>
<div className="font-caps text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft mb-2">
Your Letter
</div>
<textarea
rows={7}
value={form.body}
onChange={(e) => setForm({ ...form, body: e.target.value })}
required
placeholder="Dear Mr. Pathak, ..."
className="w-full bg-transparent border-b border-ink/40 focus:border-link outline-none py-3 font-serif text-lg sm:text-xl text-ink placeholder:text-ink-soft/50 placeholder:italic transition-colors duration-300 resize-none"
/>
</div>

<div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.6 }}
className="font-serif text-xs sm:text-sm text-ink-soft"
>
All letters are read in the order they arrive. Patience, please.
</motion.div>
<motion.button
type="submit"
disabled={state !== "idle"}
whileHover={{ scale: 1.04, y: -2 }}
whileTap={{ scale: 0.96 }}
className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-ink text-vellum font-caps uppercase tracking-[0.35em] text-[0.8rem] sm:text-[0.85rem] hover:bg-oxblood transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
>
{/* Sweep on hover */}
<span
className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-oxblood transition-transform duration-500"
aria-hidden
/>
<span className="relative flex items-center gap-3">
<AnimatePresence mode="wait">
{state === "idle" && (
<motion.span
key="idle"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="flex items-center gap-3"
>
Seal & Send
<motion.span
animate={{ x: [0, 4, 0] }}
transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
className="font-display text-base"
>
→
</motion.span>
</motion.span>
)}
{state === "sealing" && (
<motion.span
key="sealing"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="flex items-center gap-3"
>
<motion.span
animate={{ scale: [1, 1.3, 0.9, 1.1, 1], rotate: [0, 5, -5, 0] }}
transition={{ duration: 1, repeat: Infinity }}
className="font-display text-base"
>
✻
</motion.span>
Sealing the wax
</motion.span>
)}
{state === "sent" && (
<motion.span
key="sent"
initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
animate={{ opacity: 1, scale: 1, rotate: 0 }}
exit={{ opacity: 0 }}
transition={{ type: "spring", stiffness: 400, damping: 15 }}
className="flex items-center gap-3"
>
<motion.span
animate={{ rotate: [0, 360] }}
transition={{ duration: 1 }}
className="font-display text-base"
>
✦
</motion.span>
Sent with care
</motion.span>
)}
</AnimatePresence>
</span>
</motion.button>
</div>

{/* Wax stamp impression on success */}
<AnimatePresence>
{state === "sent" && (
<motion.div
initial={{ opacity: 0, scale: 4, rotate: -25 }}
animate={{ opacity: 0.85, scale: 1, rotate: -8 }}
exit={{ opacity: 0 }}
transition={{ type: "spring", stiffness: 200, damping: 12 }}
className="pointer-events-none absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-double border-oxblood flex items-center justify-center"
>
<span className="font-display text-oxblood text-xs lg:text-sm text-center leading-none">
Sent<br />MMXXVI
</span>
</motion.div>
)}
</AnimatePresence>
</motion.form>
</motion.div>
</div>
</div>
</section>
);
}

function LetterField({
label,
type = "text",
value,
onChange,
}: {
label: string;
type?: string;
value: string;
onChange: (v: string) => void;
}) {
const [focused, setFocused] = useState(false);
return (
<div>
<div className="font-caps text-[0.7rem] tracking-[0.4em] uppercase text-ink-soft mb-2">
{label}
</div>
<div className="relative">
<input
type={type}
value={value}
onChange={(e) => onChange(e.target.value)}
onFocus={() => setFocused(true)}
onBlur={() => setFocused(false)}
required
className="w-full bg-transparent border-b border-ink/40 outline-none py-2 font-serif text-xl text-ink transition-colors duration-300 peer"
/>
{/* Animated underline */}
<motion.span
initial={{ scaleX: 0 }}
animate={{ scaleX: focused ? 1 : 0 }}
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
className="absolute bottom-0 left-0 h-px w-full bg-oxblood origin-left"
/>
</div>
</div>
);
}
