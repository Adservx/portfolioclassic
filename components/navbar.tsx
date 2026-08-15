"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Prologue", href: "/prologue" },
  { label: "Works", href: "/works" },
  { label: "Craft", href: "/craft" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/letters" },
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

export function Navbar() {
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();
  const scrolledRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 40;
          if (isScrolled !== scrolledRef.current) {
            scrolledRef.current = isScrolled;
            setScrolled(isScrolled);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background transition-colors duration-300 ${
        scrolled ? "border-b border-rule/50 md:backdrop-blur-sm" : ""
      }`}
      style={{
        // Promote once; avoid will-change thrash. Padding for notches.
        paddingTop: "env(safe-area-inset-top, 0px)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Soft glow wash — desktop only (large blur layers re-composite every scroll on mobile) */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{
          opacity: scrolled ? 1 : 0,
          y: scrolled ? 0 : -8,
        }}
        transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 top-0 bottom-0 -z-10 pointer-events-none hidden md:block"
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
      <div className="mx-auto max-w-7xl px-6 lg:px-12" style={{ paddingLeft: "calc(1.5rem + env(safe-area-inset-left, 0px))", paddingRight: "calc(1.5rem + env(safe-area-inset-right, 0px))" }}>
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="group flex items-center gap-3 cursor-pointer"
          >
            <motion.span
              whileHover={prefersReduced ? {} : { rotate: 360 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 border border-ink rounded-full overflow-hidden"
            >
              <Image
                src="/darshan-256.webp"
                alt="Darshan Pathak"
                width={48}
                height={48}
                priority
                className="w-full h-full object-cover scale-125"
              />
            </motion.span>
            <span className="hidden sm:flex flex-col items-start leading-none">
              <span className="font-caps text-[1rem] tracking-[0.1em] text-ink font-bold transition-colors duration-500">
                DARSHAN PATHAK
              </span>
              <span className="font-caps text-[0.9rem] tracking-[0.2em] text-ink/60 mt-0.5 transition-colors duration-500 group-hover:text-link">
                Author, Microbiologist, Sociologist &amp; Teacher
              </span>
            </span>
            <span className="sm:hidden font-display text-lg font-semibold text-ink group-hover:text-link transition-colors">Darshan Pathak</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 group/nav relative">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative font-nav font-bold text-[1rem] tracking-[0.35em] uppercase transition-colors duration-300 ${
                  isActive(item.href) ? "text-link" : "text-link hover:text-link/70"
                }`}
              >
                <span className="relative">
                  {item.label}
                </span>
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-link transition-[width] duration-500 ${
                    isActive(item.href) ? "w-5" : "w-0 group-hover:w-3"
                  }`}
                />
              </Link>
            ))}
            <span className="w-px h-5 bg-ink/15" />
            <Link
              href="/bookstore"
              className="group relative font-nav font-bold text-[1rem] tracking-[0.35em] uppercase transition-colors duration-300 text-link hover:text-link-hover"
            >
              <span className="relative">
                Bookstore
              </span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-link transition-[width] duration-500 w-0 group-hover:w-4" />
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex items-center justify-center w-12 h-12 cursor-pointer z-50 -mr-2 active:scale-90 transition-transform duration-200"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="flex flex-col gap-[5px] w-5 items-center">
              <span
                className={`block w-5 h-px bg-ink transition-[transform] duration-300 origin-center ${
                  open ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-ink transition-[transform,opacity] duration-200 ${
                  open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                }`}
              />
              <span
                className={`block w-5 h-px bg-ink transition-[transform] duration-300 origin-center ${
                  open ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </span>
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
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-0 left-0 w-full h-[100dvh] z-40 bg-background/85 lg:hidden"
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 h-full w-full max-w-sm bg-background border-l border-ink/10 overflow-y-auto overscroll-contain"
                style={{
                  paddingTop: "env(safe-area-inset-top, 0px)",
                  paddingBottom: "env(safe-area-inset-bottom, 0px)",
                }}
              >
                <nav className="flex flex-col items-center justify-center min-h-full gap-6 px-6 py-24">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group relative cursor-pointer py-3.5 px-6 w-full max-w-[14rem] touch-manipulation"
                    >
                      <span className={`relative font-caps text-lg sm:text-xl font-bold tracking-[0.28em] sm:tracking-[0.35em] uppercase transition-colors duration-300 ${
                        isActive(item.href) ? "text-link" : "text-ink/80"
                      }`}>
                        {item.label}
                      </span>
                      <span
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-link transition-[width] duration-500 ${
                          isActive(item.href) ? "w-8" : "w-0"
                        }`}
                      />
                    </Link>
                  ))}
                  <div className="w-full max-w-[14rem]">
                    <Link
                      href="/bookstore"
                      onClick={() => setOpen(false)}
                      className="group relative block cursor-pointer py-3.5 px-6 touch-manipulation"
                    >
                      <span className="relative font-caps text-lg sm:text-xl font-bold tracking-[0.28em] sm:tracking-[0.3em] uppercase text-link transition-colors">
                        Bookstore
                      </span>
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-link transition-[width] duration-500 w-0" />
                    </Link>
                  </div>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
