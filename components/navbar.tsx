"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Prologue", href: "#prologue" },
  { label: "Works", href: "#works" },
  { label: "Craft", href: "#craft" },
  { label: "Press", href: "#press" },
  { label: "Letters", href: "#letters" },
];

function LetterCascade({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`letter-cascade inline-flex ${className}`}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * 30}ms` }}
          className="inline-block"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function BrushStroke({ className = "", style = {}, scale = 1, fill = "#ffffff" }: { className?: string; style?: React.CSSProperties; scale?: number; fill?: string }) {
  return (
    <svg
      className={className}
      style={{ width: "100%", height: "100%", pointerEvents: "none", transform: `scale(${scale})`, transformOrigin: "center", ...style }}
      viewBox="0 0 280 56"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="brushBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="brushTexture" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
        <filter id="brushEdge" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="edge" />
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <path
        d="M6,28 C6,10 18,2 36,4 C54,6 72,3 90,6 C108,9 126,6 144,9 C162,12 180,9 198,12 C216,15 234,12 252,15 C264,18 272,22 276,28 C278,34 270,38 256,40 C242,42 224,39 206,42 C188,45 170,42 152,45 C134,48 116,45 98,48 C80,51 62,48 44,45 C26,42 14,40 10,34 C6,28 6,28 6,28 Z"
        fill={fill}
        filter="url(#brushBlur)"
        opacity="0.75"
      />
      <path
        d="M6,28 C6,10 18,2 36,4 C54,6 72,3 90,6 C108,9 126,6 144,9 C162,12 180,9 198,12 C216,15 234,12 252,15 C264,18 272,22 276,28 C278,34 270,38 256,40 C242,42 224,39 206,42 C188,45 170,42 152,45 C134,48 116,45 98,48 C80,51 62,48 44,45 C26,42 14,40 10,34 C6,28 6,28 6,28 Z"
        fill={fill}
        filter="url(#brushTexture)"
        opacity="0.18"
      />
      <path
        d="M10,28 C10,14 22,4 42,6 C62,8 82,5 102,8 C122,11 142,8 162,11 C182,14 202,11 222,14 C242,17 260,19 268,25 C270,29 266,33 254,34 C242,35 224,33 206,35 C188,37 170,35 152,37 C134,39 116,37 98,39 C80,41 64,39 48,37 C32,35 22,34 14,30 C10,28 10,28 10,28 Z"
        fill={fill}
        opacity="0.35"
        filter="url(#brushEdge)"
      />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((i) => i.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (href: string) => {
    setOpen(false);
    const t = document.querySelector(href);
    if (t) {
      const top = t.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      {/* ✦ Professional white-ink wash — refined, subtle, no geometric border */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{
          opacity: scrolled ? 1 : 0,
          y: scrolled ? 0 : -8,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 top-0 bottom-0 -z-10 pointer-events-none"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[-8px] h-[100px] w-[92%] blur-[32px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 12%, rgba(255,255,255,0.28) 35%, rgba(255,255,255,0.38) 52%, rgba(255,255,255,0.28) 68%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)",
            borderRadius: "12px 10px 10px 12px / 10px 12px 12px 10px",
            transform: "translateX(-50%) rotate(-0.3deg)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[-4px] h-[90px] w-[85%] blur-[40px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 90% 120% at 50% 40%, rgba(255,255,255,0.18) 0%, rgba(250,247,238,0.06) 50%, transparent 85%)",
            borderRadius: "14px 12px 12px 14px / 12px 14px 14px 12px",
            transform: "translateX(-50%) rotate(0.3deg)",
          }}
        />
      </motion.div>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => goTo("#prologue")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <motion.span
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:flex items-center justify-center w-9 h-9 border border-ink rounded-full overflow-hidden"
            >
              <Image
                src="/bookstore/messenger-creation.webp"
                alt="Darshan Pathak"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </motion.span>
            <span className="hidden sm:flex flex-col items-start leading-none">
              <span className="font-caps text-[0.75rem] tracking-[0.35em] text-ink/50 font-semibold transition-colors duration-500 group-hover:text-ink/70">
                DARSHAN PATHAK
              </span>
              <span className="font-display text-2xl font-normal text-ink mt-0.5 group-hover:text-oxblood transition-colors duration-500">
                D. Pathak
              </span>
            </span>
            <span className="sm:hidden font-display text-xl font-medium text-ink group-hover:text-oxblood transition-colors">D.P.</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => goTo(item.href)}
                className={`group relative font-caps text-[0.8rem] font-medium tracking-[0.35em] uppercase transition-colors duration-300 cursor-pointer ${
                  active === item.href ? "text-oxblood" : "text-ink/70 hover:text-oxblood"
                }`}
              >
                <span className="relative z-10">
                  <LetterCascade text={item.label} />
                </span>
                <motion.div
                  initial={false}
                  whileHover={{ scaleX: [1, 1.12, 1], scaleY: [1, 1.25, 1] }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
                  style={{ transformOrigin: "center" }}
                >
<BrushStroke scale={1.1} className="transition-opacity duration-300" />
                </motion.div>
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-oxblood transition-all duration-500 ${
                    active === item.href ? "w-5" : "w-0 group-hover:w-3"
                  }`}
                />
              </button>
            ))}
            <span className="w-px h-5 bg-ink/15" />
            <Link
              href="/bookstore"
              className="group relative font-caps text-[0.85rem] font-medium tracking-[0.3em] uppercase transition-colors duration-300 text-ink/70 hover:text-oxblood"
            >
              <span className="relative z-10">
                <LetterCascade text="Bookstore" />
              </span>
              <motion.div
                initial={false}
                whileHover={{ scaleX: [1, 1.08, 1], scaleY: [1, 1.15, 1] }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
                style={{ transformOrigin: "center" }}
              >
                <BrushStroke scale={1.1} className="transition-opacity duration-300" />
              </motion.div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-oxblood transition-all duration-500 w-0 group-hover:w-4" />
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] w-7 h-7 items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 ${
                open ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden relative pb-6 border-t border-rule pt-4 flex flex-col gap-6 overflow-hidden"
          >
            {/* ✦ Tinted brush-paint wash — matches desktop nav aesthetic */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute inset-0 bg-parchment/90" />
              <BrushStroke
                fill="#ECE2C4"
                scale={1.1}
                style={{ width: "100%", height: "4rem" }}
                className="absolute inset-x-0 top-[-18px] opacity-70 mix-blend-multiply"
              />
              <BrushStroke
                fill="#FBF5E5"
                scale={1.05}
                style={{ width: "100%", height: "4rem" }}
                className="absolute inset-x-0 bottom-[-18px] opacity-60 mix-blend-screen"
              />
            </div>
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => goTo(item.href)}
                className="group relative text-center cursor-pointer"
              >
                <span className="relative z-10 font-caps text-sm font-semibold tracking-[0.35em] uppercase transition-colors duration-300 cursor-pointer group-hover:text-oxblood">
                  <LetterCascade text={item.label} />
                </span>
                <motion.div
                  initial={false}
                  whileHover={{ scaleX: [1, 1.12, 1], scaleY: [1, 1.25, 1] }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none w-full"
                  style={{ transformOrigin: "center" }}
                >
                  <BrushStroke scale={1.15} className="transition-opacity duration-300" />
                </motion.div>
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-oxblood transition-all duration-500 ${
                    active === item.href ? "w-8" : "w-0 group-hover:w-6"
                  }`}
                />
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.06 }}
            >
              <Link
                href="/bookstore"
                onClick={() => setOpen(false)}
                className="group relative block text-center cursor-pointer"
              >
                <span className="relative z-10 font-caps text-sm font-semibold tracking-[0.3em] uppercase text-oxblood hover:text-oxblood-2 transition-colors">
                  <LetterCascade text="Bookstore" />
                </span>
                <motion.div
                  initial={false}
                  whileHover={{ scaleX: [1, 1.08, 1], scaleY: [1, 1.15, 1] }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none w-full"
                  style={{ transformOrigin: "center" }}
                >
                  <BrushStroke scale={1.15} className="transition-opacity duration-300" />
                </motion.div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-oxblood transition-all duration-500 w-0 group-hover:w-8" />
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
