"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";

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
        scrolled
          ? "bg-parchment/90 backdrop-blur-md border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => goTo("#prologue")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <motion.span
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:flex items-center justify-center w-9 h-9 border border-ink rounded-full text-ink-soft"
            >
              <span className="font-display text-base">R</span>
            </motion.span>
            <span className="hidden sm:flex flex-col items-start leading-none">
              <span className="font-caps text-[0.55rem] tracking-[0.4em] text-ink-soft">
                EST. MCMLXXII
              </span>
              <span className="font-display text-xl text-ink mt-0.5 group-hover:text-oxblood transition-colors duration-500">
                R. Pandit
              </span>
            </span>
            <span className="sm:hidden font-display text-lg text-ink">R.P.</span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => goTo(item.href)}
                className={`group relative font-caps text-[0.65rem] tracking-[0.35em] uppercase transition-colors duration-300 cursor-pointer ${
                  active === item.href ? "text-oxblood" : "text-ink-soft hover:text-ink"
                }`}
              >
                <LetterCascade text={item.label} />
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-oxblood transition-all duration-500 ${
                    active === item.href ? "w-6" : "w-0 group-hover:w-4"
                  }`}
                />
              </button>
            ))}
            <span className="w-px h-5 bg-ink/20" />
            <Link
              href="/bookstore"
              className="group relative font-caps text-[0.65rem] tracking-[0.35em] uppercase transition-colors duration-300 text-ink-soft hover:text-oxblood"
            >
              <LetterCascade text="Bookstore" />
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
            className="md:hidden pb-6 border-t border-rule pt-4 flex flex-col gap-4 overflow-hidden"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => goTo(item.href)}
                className="text-left font-caps text-xs tracking-[0.35em] uppercase text-ink-soft hover:text-oxblood transition-colors cursor-pointer"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.06 }}
            >
              <Link
                href="/bookstore"
                onClick={() => setOpen(false)}
                className="block text-left font-caps text-xs tracking-[0.35em] uppercase text-oxblood hover:text-oxblood-2 transition-colors"
              >
                ✦ Bookstore
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
