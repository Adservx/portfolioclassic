"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
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
        <filter id="brushBlur">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="brushTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
        <filter id="brushEdge">
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
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((i) => i.href.slice(1));
    let ticking = false;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(`#${e.target.id}`);
          });
          ticking = false;
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-ink rounded-full overflow-hidden"
            >
              <Image
                src="/Messenger_creation_5BFE9F8A-3F7A-44DC-8F5B-166C92150325.jpg"
                alt="Darshan Pathak"
                width={48}
                height={48}
                className="w-full h-full object-cover scale-125"
              />
            </motion.span>
            <span className="hidden sm:flex flex-col items-start leading-none">
              <span className="font-caps text-[0.75rem] tracking-[0.35em] text-ink/50 font-semibold transition-colors duration-500 group-hover:text-ink/70">
                DARSHAN PATHAK
              </span>
              <span className="font-display text-3xl font-normal text-ink mt-0.5 group-hover:text-link transition-colors duration-500">
                D. Pathak
              </span>
            </span>
            <span className="sm:hidden font-display text-lg font-medium text-ink group-hover:text-link transition-colors">Darshan Pathak</span>
          </button>

          <nav className="hidden md:flex items-center gap-8 group/nav relative">
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <BrushStroke style={{ transform: 'scale(1.2) scaleY(2.3)' }} />
            </div>
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => goTo(item.href)}
                className={`group relative font-caps text-[0.9rem] font-medium tracking-[0.35em] uppercase transition-colors duration-300 cursor-pointer ${
                  active === item.href ? "text-link" : "text-ink/70 hover:text-link"
                }`}
              >
                <span className="relative">
                  {item.label}
                </span>
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-link transition-all duration-500 ${
                    active === item.href ? "w-5" : "w-0 group-hover:w-3"
                  }`}
                />
              </button>
            ))}
            <span className="w-px h-5 bg-ink/15" />
            <Link
              href="/bookstore"
              className="group relative font-caps text-[0.95rem] font-medium tracking-[0.3em] uppercase transition-colors duration-300 text-link hover:text-link-hover"
            >
              <span className="relative">
                Bookstore
              </span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-link transition-all duration-500 w-0 group-hover:w-4" />
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] w-7 h-7 items-center justify-center cursor-pointer z-50"
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

        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 left-0 w-full h-full z-40 bg-background/98 backdrop-blur-sm md:hidden"
            >
              <nav className="flex flex-col items-center justify-center h-full gap-8 px-6">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => goTo(item.href)}
                    className="group relative cursor-pointer"
                  >
                    <span className={`relative font-caps text-xl font-medium tracking-[0.35em] uppercase transition-colors duration-300 ${
                      active === item.href ? "text-link" : "text-ink/80 hover:text-link"
                    }`}>
                      {item.label}
                    </span>
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-link transition-all duration-500 ${
                        active === item.href ? "w-8" : "w-0 group-hover:w-6"
                      }`}
                    />
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                >
                  <Link
                    href="/bookstore"
                    onClick={() => setOpen(false)}
                    className="group relative block cursor-pointer"
                  >
                    <span className="relative font-caps text-xl font-medium tracking-[0.3em] uppercase text-link group-hover:text-link-hover transition-colors">
                      Bookstore
                    </span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-link transition-all duration-500 w-0 group-hover:w-8" />
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
