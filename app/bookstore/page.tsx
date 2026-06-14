"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Checkout } from "@/components/bookstore/checkout";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  year: string;
  price: string;
  cover: string;
  excerpt: string;
  binding: string;
}

interface PurchaseItem {
  id: number;
  title: string;
  price: string;
  cover: string;
  binding: string;
  quantity: number;
}

const books: Book[] = [
  {
    id: 1,
    title: "A House of Salt",
    author: "Rajaram Pandit",
    category: "Novel",
    year: "1961",
    price: "£18",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80&auto=format&fit=crop",
    excerpt: "Three sisters inherit, after their mother's death, not the house they grew up in but a debt — and a salt-mine on the edge of a drying sea.",
    binding: "Clothbound, 312 pp.",
  },
  {
    id: 2,
    title: "The River Remembers",
    author: "Rajaram Pandit",
    category: "Novel",
    year: "1971",
    price: "£20",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80&auto=format&fit=crop",
    excerpt: "A boatman on the Ganges recounts, in a single night, the lives of the fifty passengers he has carried in forty years.",
    binding: "Clothbound, 288 pp.",
  },
  {
    id: 3,
    title: "Varanasi Cantos",
    author: "Rajaram Pandit",
    category: "Poetry",
    year: "1978",
    price: "£14",
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80&auto=format&fit=crop",
    excerpt: "Eighty-four sonnets in a voice older than the city itself — and a city older, perhaps, than the voice.",
    binding: "Sewn pamphlet, 96 pp.",
  },
  {
    id: 4,
    title: "On Quiet Things",
    author: "Rajaram Pandit",
    category: "Essays",
    year: "1984",
    price: "£16",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80&auto=format&fit=crop",
    excerpt: "Twenty essays on the small unphotographed lives of things — a kettle, a hand, a window in winter, the moment before sleep.",
    binding: "Clothbound, 224 pp.",
  },
  {
    id: 5,
    title: "Letters to a Young Poet",
    author: "Rajaram Pandit",
    category: "Letters",
    year: "1992",
    price: "£22",
    cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&auto=format&fit=crop",
    excerpt: "Forty-six letters written over fifteen years to a young man who would, in time, become a poet in his own right.",
    binding: "Clothbound, 368 pp.",
  },
  {
    id: 6,
    title: "The Cartographer of Grief",
    author: "Rajaram Pandit",
    category: "Novel",
    year: "2002",
    price: "£20",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80&auto=format&fit=crop",
    excerpt: "A retired surveyor, called to map a village that has vanished from every map, finds that the village is not so much lost as unfinished.",
    binding: "Clothbound, 336 pp.",
  },
  {
    id: 7,
    title: "The Hour Before Dawn",
    author: "Rajaram Pandit",
    category: "Poetry",
    year: "2011",
    price: "£15",
    cover: "https://images.unsplash.com/photo-1530538987395-032d1800fdd4?w=600&q=80&auto=format&fit=crop",
    excerpt: "A late, spare book — fifty-two short poems, each one set in the hour between four and five in the morning.",
    binding: "Sewn pamphlet, 80 pp.",
  },
  {
    id: 8,
    title: "Patiently, Against the Dark",
    author: "Rajaram Pandit",
    category: "Essays",
    year: "2018",
    price: "£25",
    cover: "https://images.unsplash.com/photo-1502810190503-8303352d0dd1?w=600&q=80&auto=format&fit=crop",
    excerpt: "A lifetime of essays gathered into a single volume, with a new preface written at ninety-two.",
    binding: "Clothbound, 512 pp.",
  },
  {
    id: 9,
    title: "The Pandit Papers",
    author: "Rajaram Pandit",
    category: "Collected Works",
    year: "2027",
    price: "£45",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80&auto=format&fit=crop",
    excerpt: "The complete critical writings, with previously unpublished material from the author's archives.",
    binding: "Quarter-bound leather, 720 pp.",
  },
];

export default function Bookstore() {
  const [purchasing, setPurchasing] = useState<PurchaseItem | null>(null);

  const handlePurchase = (book: Book) => {
    setPurchasing({
      id: book.id,
      title: book.title,
      price: book.price,
      cover: book.cover,
      binding: book.binding,
      quantity: 1,
    });
  };

  const handleComplete = () => setPurchasing(null);

  const handleBack = () => setPurchasing(null);

  return (
    <div className="relative min-h-screen">
      <div className="paper-fibers" />

      {/* ✦ Header */}
      <header className="relative z-10 border-b border-rule bg-parchment/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {purchasing ? (
              <button
                onClick={handleBack}
                className="group inline-flex items-center gap-2 font-caps text-[0.6rem] tracking-[0.35em] uppercase text-ink-soft hover:text-oxblood transition-colors duration-300 cursor-pointer"
              >
                <motion.span
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-lg text-oxblood"
                >
                  ←
                </motion.span>
                Back to Catalog
              </button>
            ) : (
              <Link
                href="/"
                className="group inline-flex items-center gap-2 font-caps text-[0.6rem] tracking-[0.35em] uppercase text-ink-soft hover:text-oxblood transition-colors duration-300"
              >
                <motion.span
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-lg text-oxblood"
                >
                  ←
                </motion.span>
                Return to Portfolio
              </Link>
            )}
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="fleuron text-gold text-base"
              >
                ❦
              </motion.span>
              <span className="font-caps text-[0.55rem] tracking-[0.4em] uppercase text-ink-soft">
                Official Bookstore
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ✦ Checkout view */}
      {purchasing ? (
        <main className="relative z-10 py-20 px-6 lg:px-12">
          <Checkout
            items={[purchasing]}
            onBack={handleBack}
            onComplete={handleComplete}
          />
        </main>
      ) : (
        <>
          {/* ✦ Hero */}
          <section className="relative z-10 pt-20 pb-16 px-6 lg:px-12 overflow-hidden">
            <div className="mx-auto max-w-7xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block font-caps text-[0.6rem] tracking-[0.45em] uppercase text-oxblood mb-6 border border-oxblood/40 px-4 py-1.5">
                  The Authorised Edition
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl md:text-7xl lg:text-8xl text-ink leading-[0.9]"
              >
                Bookstore
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 font-serif italic text-lg text-ink-soft max-w-2xl mx-auto"
              >
                First editions, clothbound reissues, and signed copies — each volume
                bound with the care it deserves.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 rule-ornate text-ink-soft/50 text-sm max-w-md mx-auto"
              >
                <span>First folio</span>
                <span className="fleuron text-gold">❦</span>
                <span>Limited printing</span>
                <span className="fleuron text-gold">❦</span>
                <span>Hand-bound</span>
              </motion.div>
            </div>
          </section>

          {/* ✦ Catalog */}
          <main className="relative z-10 pb-32 px-6 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {books.map((book, i) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    index={i}
                    onPurchase={handlePurchase}
                  />
                ))}
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
                  <div className="font-serif italic text-sm text-ink-soft">
                    All orders dispatched from the author&rsquo;s own study. Allow 2–4
                    weeks for delivery.
                  </div>
                  <Link
                    href="/"
                    className="group inline-flex items-center gap-3 font-caps text-[0.6rem] tracking-[0.35em] uppercase text-ink-soft hover:text-oxblood transition-colors duration-300"
                  >
                    <motion.span
                      whileHover={{ x: -4 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-lg text-oxblood"
                    >
                      ←
                    </motion.span>
                    Return to Portfolio
                    <span className="h-px w-8 bg-ink-soft/40 group-hover:w-12 group-hover:bg-oxblood transition-all duration-500" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

function BookCard({
  book,
  index,
  onPurchase,
}: {
  book: Book;
  index: number;
  onPurchase: (book: Book) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative bg-vellum border border-rule hover:border-ink/40 transition-colors duration-500"
    >
      {/* Corner ornaments */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-ink/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-ink/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-ink/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-ink/20 pointer-events-none" />

      <div className="p-6 lg:p-8">
        {/* Cover image */}
        <div className="relative aspect-[3/4] mb-6 overflow-hidden plate-thin">
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            width={300}
            height={400}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover sepia-[0.4] contrast-110 group-hover:sepia-[0.1] group-hover:saturate-100 transition-all duration-700"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,20,14,0.25) 0%, transparent 40%, rgba(26,20,14,0.45) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 25px 3px rgba(26,20,14,0.3)" }}
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-vellum/90 border border-rule px-2.5 py-1">
            <span className="font-caps text-[0.5rem] tracking-[0.35em] uppercase text-ink-soft">
              {book.category}
            </span>
          </div>
        </div>

        {/* Book details */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-xl lg:text-2xl text-ink group-hover:text-oxblood transition-colors duration-500">
              {book.title}
            </h2>
            <span className="font-display text-2xl text-oxblood shrink-0">
              {book.price}
            </span>
          </div>

          <p className="font-serif italic text-sm leading-relaxed text-ink-soft line-clamp-2">
            {book.excerpt}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-rule">
            <div className="space-y-0.5">
              <div className="font-caps text-[0.55rem] tracking-[0.35em] uppercase text-ink-soft">
                {book.binding}
              </div>
              <div className="font-serif italic text-xs text-faded">
                {book.year} · {book.author}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onPurchase(book)}
              className="group/btn relative overflow-hidden border border-ink px-5 py-2 transition-all duration-300 hover:bg-ink cursor-pointer"
            >
              <span className="relative z-10 font-caps text-[0.55rem] tracking-[0.35em] uppercase text-ink group-hover/btn:text-vellum transition-colors duration-300">
                Purchase
              </span>
              <span className="absolute inset-0 bg-ink translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
