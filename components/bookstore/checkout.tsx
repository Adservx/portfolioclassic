"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CartItem {
  id: number;
  title: string;
  price: string;
  cover: string;
  binding: string;
  quantity: number;
}

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[£$€]/g, ""));
}

function formatPrice(n: number): string {
  return `£${n.toFixed(2)}`;
}

/* ============================================================
   CREDIT CARD
   ============================================================ */

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function maskCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  const last4 = digits.slice(-4);
  const masked = digits.slice(0, -4).replace(/\d/g, "•");
  const grouped = (masked + last4).replace(/(.{4})/g, "$1 ").trim();
  return grouped;
}

function CreditCardDisplay({
  number,
  name,
  expiry,
  cvv,
  flip,
}: {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  flip: boolean;
}) {
  return (
    <div className="perspective-1000 w-full max-w-[340px] mx-auto h-[200px]">
      <motion.div
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="w-full h-full bg-gradient-to-br from-ink-3 via-ink to-ink-2 border border-ink-2 rounded-[14px] p-6 flex flex-col justify-between shadow-xl">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <motion.div
                animate={{ opacity: number ? 1 : 0.4 }}
                className="flex items-center gap-1"
              >
                <span className="text-vellum/50 font-caps text-[0.45rem] tracking-[0.2em]">
                  {number.replace(/\D/g, "").startsWith("4")
                    ? "VISA"
                    : number.replace(/\D/g, "").startsWith("5")
                      ? "MASTERCARD"
                      : "CREDIT"}
                </span>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-10 h-7 rounded-md bg-gradient-to-br from-gold/80 to-gold-2/80 flex items-center justify-center"
              >
                <span className="text-ink font-caps text-[0.35rem] tracking-[0.15em]">
                  {number.replace(/\D/g, "").startsWith("4")
                    ? "VISA"
                    : number.replace(/\D/g, "").startsWith("5")
                      ? "MC"
                      : "CC"}
                </span>
              </motion.div>
            </div>

            {/* Card number */}
            <div className="mt-2">
              <motion.p
                key={number}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xl tracking-[0.2em] text-vellum/90"
              >
                {maskCardNumber(number) || (
                  <span className="text-vellum/30 text-base">•••• •••• •••• ••••</span>
                )}
              </motion.p>
            </div>

            {/* Bottom row */}
            <div className="flex items-end justify-between">
              <div>
                <p className="font-caps text-[0.4rem] tracking-[0.25em] uppercase text-vellum/40 mb-1">
                  Cardholder
                </p>
                <motion.p
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-serif text-sm tracking-wider text-vellum/80 uppercase"
                >
                  {name || "YOUR NAME"}
                </motion.p>
              </div>
              <div className="text-right">
                <p className="font-caps text-[0.4rem] tracking-[0.25em] uppercase text-vellum/40 mb-1">
                  Expires
                </p>
                <motion.p
                  key={expiry}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-sm text-vellum/80"
                >
                  {expiry || "MM/YY"}
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="w-full h-full bg-gradient-to-br from-ink-3 via-ink to-ink-2 border border-ink-2 rounded-[14px] overflow-hidden shadow-xl">
            {/* Magnetic stripe */}
            <div className="mt-6 h-10 bg-ink-3/80" />
            {/* Signature strip */}
            <div className="mx-6 mt-4 h-8 bg-parchment/20 rounded flex items-center justify-end px-3">
              {cvv && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-sm text-ink italic tracking-widest"
                >
                  {cvv}
                </motion.span>
              )}
            </div>
            <p className="mx-6 mt-3 font-caps text-[0.35rem] tracking-[0.2em] text-vellum/30">
              This card is issued by The Pandit Estate Bank. Authorised signature
              required.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   PROCESSING
   ============================================================ */

const steps = [
  "Verifying payment details",
  "Authorising transaction",
  "Printing receipt",
  "Applying wax seal",
  "Order confirmed",
];

function ProcessingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setCurrentStep((s) => s + 1),
      700 + Math.random() * 500
    );
    return () => clearTimeout(t);
  }, [currentStep, onComplete]);

  const progress = Math.min((currentStep / steps.length) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Seal animation */}
      <motion.div
        initial={{ scale: 4, rotate: -25, opacity: 0 }}
        animate={{
          scale: currentStep >= 4 ? 1 : 0.6,
          rotate: currentStep >= 4 ? -8 : 0,
          opacity: currentStep >= 4 ? 1 : 0.3,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: currentStep >= 4 ? 0 : 0,
        }}
        className="w-28 h-28 rounded-full border-4 border-double border-oxblood flex items-center justify-center bg-oxblood/10 mb-8"
      >
        <motion.div
          animate={
            currentStep >= 4
              ? { scale: 1 }
              : {
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0],
                }
          }
          transition={
            currentStep >= 4
              ? { duration: 0.5 }
              : { duration: 2, repeat: Infinity }
          }
          className="w-24 h-24 rounded-full border border-oxblood/60 flex flex-col items-center justify-center"
        >
          <span className="font-display text-oxblood text-sm leading-none">R · P</span>
          <span className="font-caps text-oxblood/80 text-[0.45rem] tracking-[0.4em] mt-1">
            EST. MCMLXXII
          </span>
        </motion.div>
      </motion.div>

      {/* Progress */}
      <div className="w-full max-w-sm mb-8">
        <div className="h-px bg-rule relative overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-oxblood"
          />
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{
                scale: i < currentStep ? 1 : 0,
                opacity: i < currentStep ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="w-2 h-2 rounded-full bg-oxblood"
            />
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="w-full max-w-sm space-y-4">
        {steps.slice(0, -1).map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex items-center gap-3 ${
              i < currentStep
                ? "text-ink"
                : i === currentStep
                  ? "text-oxblood"
                  : "text-faded"
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: i < currentStep ? 1 : i === currentStep ? [1, 1.2, 1] : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                i < currentStep
                  ? "bg-oxblood border-oxblood text-vellum"
                  : i === currentStep
                    ? "border-oxblood text-oxblood"
                    : "border-rule"
              }`}
            >
              {i < currentStep ? (
                <motion.span
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs"
                >
                  ✓
                </motion.span>
              ) : i === currentStep ? (
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-oxblood"
                />
              ) : null}
            </motion.div>
            <span className="font-serif italic text-sm">{step}</span>
          </motion.div>
        ))}
      </div>

      {currentStep >= 4 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 font-serif italic text-ink-soft text-sm"
        >
          Your order has been recorded in the ledger.
        </motion.p>
      )}
    </div>
  );
}

/* ============================================================
   SUCCESS
   ============================================================ */

function SuccessScreen({
  orderNumber,
  onReturn,
}: {
  orderNumber: string;
  onReturn: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Wax seal stamp */}
      <motion.div
        initial={{ scale: 5, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: -8, opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 120,
        }}
        className="w-32 h-32 rounded-full border-4 border-double border-oxblood flex items-center justify-center bg-oxblood/10 mb-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-[104px] h-[104px] rounded-full border border-oxblood/60 flex flex-col items-center justify-center"
        >
          <motion.span
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-display text-oxblood text-lg leading-none"
          >
            R · P
          </motion.span>
          <motion.span
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-caps text-oxblood/80 text-[0.45rem] tracking-[0.4em] mt-1"
          >
            CONFIRMED
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Confetti particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.cos((i / 12) * Math.PI * 2) * (80 + Math.random() * 60),
            y: Math.sin((i / 12) * Math.PI * 2) * (80 + Math.random() * 60) - 40,
          }}
          transition={{
            duration: 1.5,
            delay: 0.3 + i * 0.05,
            ease: "easeOut",
          }}
          className="absolute w-2 h-2"
          style={{
            background: i % 3 === 0 ? "#A37E2C" : i % 3 === 1 ? "#6B1F1A" : "#1A140E",
            clipPath: `polygon(${50 + 50 * Math.cos((i * 60 * Math.PI) / 180)}% ${50 + 50 * Math.sin((i * 60 * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((i * 60 + 120) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((i * 60 + 120) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((i * 60 + 240) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((i * 60 + 240) * Math.PI) / 180)}%)`,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center relative"
      >
        <div className="rule-ornate text-ink-soft/50 max-w-xs mx-auto mb-6">
          <span>Order</span>
          <span className="fleuron text-gold">❦</span>
          <span>Confirmed</span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.9] mb-4">
          Thank You
        </h2>
        <p className="font-serif italic text-lg text-ink-soft max-w-md mx-auto">
          Your order has been received and will be dispatched from the author&rsquo;s
          study within 2–4 weeks.
        </p>

        {/* Order number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="mt-8 inline-flex items-center gap-3 border border-rule bg-parchment px-6 py-3"
        >
          <span className="font-caps text-[0.55rem] tracking-[0.4em] uppercase text-ink-soft">
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
            className="bg-ink text-vellum hover:bg-ink-2 font-caps text-[0.6rem] tracking-[0.35em] uppercase px-8 py-3 transition-all duration-300 cursor-pointer"
          >
            Return to Bookstore
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   SHIPPING FORM
   ============================================================ */

interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
}

function ShippingForm({
  data,
  onChange,
  onNext,
}: {
  data: ShippingInfo;
  onChange: (d: ShippingInfo) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const validate = () => {
    const e: Partial<Record<keyof ShippingInfo, string>> = {};
    if (!data.name.trim()) e.name = "Required";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Valid email required";
    if (!data.address.trim()) e.address = "Required";
    if (!data.city.trim()) e.city = "Required";
    if (!data.postal.trim()) e.postal = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  const field = (
    label: string,
    key: keyof ShippingInfo,
    placeholder: string,
    opts?: { type?: string }
  ) => (
    <div>
      <label className="block font-caps text-[0.5rem] tracking-[0.4em] uppercase text-ink-soft mb-1.5">
        {label}
      </label>
      <input
        ref={key === "name" ? nameRef : undefined}
        type={opts?.type || "text"}
        value={data[key]}
        onChange={(e) => onChange({ ...data, [key]: e.target.value })}
        placeholder={placeholder}
        className={`w-full bg-transparent border px-3 py-2.5 font-serif text-base text-ink placeholder:text-faded/50 outline-none transition-colors duration-200 ${
          errors[key]
            ? "border-oxblood"
            : "border-rule hover:border-ink/40 focus:border-ink"
        }`}
      />
      {errors[key] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-caps text-[0.5rem] tracking-[0.2em] text-oxblood mt-1"
        >
          {errors[key]}
        </motion.p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="font-display text-2xl text-ink mb-1">Shipping</h3>
        <p className="font-serif italic text-sm text-ink-soft">
          Where should we send your books?
        </p>
      </div>
      <div className="h-px bg-rule" />
      {field("Full Name", "name", "Rajaram Pandit")}
      {field("Email", "email", "reader@example.com", { type: "email" })}
      {field("Street Address", "address", "42 Parchment Lane")}
      <div className="grid grid-cols-2 gap-4">
        {field("City", "city", "London")}
        {field("Postal Code", "postal", "WC1A 1AA")}
      </div>
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full bg-ink text-vellum hover:bg-ink-2 font-caps text-[0.6rem] tracking-[0.35em] uppercase px-6 py-3 transition-all duration-300 cursor-pointer"
        >
          Continue to Payment
        </motion.button>
      </div>
    </form>
  );
}

/* ============================================================
   PAYMENT FORM
   ============================================================ */

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

function PaymentForm({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: PaymentInfo;
  onChange: (d: PaymentInfo) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentInfo, string>>>({});
  const numRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    numRef.current?.focus();
  }, []);

  const validate = () => {
    const e: Partial<Record<keyof PaymentInfo, string>> = {};
    const digits = data.cardNumber.replace(/\D/g, "");
    if (digits.length < 13) e.cardNumber = "Invalid card number";
    if (!data.cardName.trim()) e.cardName = "Required";
    if (!/^\d{2}\/\d{2}$/.test(data.expiry)) e.expiry = "MM/YY required";
    if (!/^\d{3,4}$/.test(data.cvv)) e.cvv = "Invalid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  const handleCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    onChange({ ...data, cardNumber: digits });
  };

  const handleExpiry = (value: string) => {
    let digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) digits = digits.slice(0, 2) + "/" + digits.slice(2);
    onChange({ ...data, expiry: digits });
  };

  const handleCvv = (value: string) => {
    onChange({ ...data, cvv: value.replace(/\D/g, "").slice(0, 4) });
  };

  return (
    <div>
      {/* Animated card */}
      <div className="mb-8">
        <CreditCardDisplay
          number={data.cardNumber}
          name={data.cardName}
          expiry={data.expiry}
          cvv={data.cvv}
          flip={focused === "cvv"}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl text-ink mb-1">Payment</h3>
            <p className="font-serif italic text-sm text-ink-soft">
              Secure checkout — your details are encrypted.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 text-faded"
          >
            <span className="font-caps text-[0.4rem] tracking-[0.15em] border border-rule px-1.5 py-0.5">
              SSL
            </span>
            <span className="text-base">🔒</span>
          </motion.div>
        </div>
        <div className="h-px bg-rule" />

        <div>
          <label className="block font-caps text-[0.5rem] tracking-[0.4em] uppercase text-ink-soft mb-1.5">
            Card Number
          </label>
          <input
            ref={numRef}
            type="text"
            inputMode="numeric"
            value={formatCardNumber(data.cardNumber)}
            onChange={(e) => handleCardNumber(e.target.value)}
            onFocus={() => setFocused("number")}
            onBlur={() => setFocused(null)}
            placeholder="1234 5678 9012 3456"
            className={`w-full bg-transparent border px-3 py-2.5 font-mono text-base text-ink placeholder:text-faded/50 outline-none transition-colors duration-200 ${
              errors.cardNumber
                ? "border-oxblood"
                : "border-rule hover:border-ink/40 focus:border-ink"
            }`}
          />
          {errors.cardNumber && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-caps text-[0.5rem] tracking-[0.2em] text-oxblood mt-1"
            >
              {errors.cardNumber}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block font-caps text-[0.5rem] tracking-[0.4em] uppercase text-ink-soft mb-1.5">
            Cardholder Name
          </label>
          <input
            type="text"
            value={data.cardName}
            onChange={(e) => onChange({ ...data, cardName: e.target.value })}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            placeholder="Rajaram Pandit"
            className={`w-full bg-transparent border px-3 py-2.5 font-serif text-base text-ink placeholder:text-faded/50 outline-none transition-colors duration-200 ${
              errors.cardName
                ? "border-oxblood"
                : "border-rule hover:border-ink/40 focus:border-ink"
            }`}
          />
          {errors.cardName && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-caps text-[0.5rem] tracking-[0.2em] text-oxblood mt-1"
            >
              {errors.cardName}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-caps text-[0.5rem] tracking-[0.4em] uppercase text-ink-soft mb-1.5">
              Expiry
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={data.expiry}
              onChange={(e) => handleExpiry(e.target.value)}
              onFocus={() => setFocused("expiry")}
              onBlur={() => setFocused(null)}
              placeholder="MM/YY"
              className={`w-full bg-transparent border px-3 py-2.5 font-mono text-base text-ink placeholder:text-faded/50 outline-none transition-colors duration-200 ${
                errors.expiry
                  ? "border-oxblood"
                  : "border-rule hover:border-ink/40 focus:border-ink"
              }`}
            />
            {errors.expiry && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-caps text-[0.5rem] tracking-[0.2em] text-oxblood mt-1"
              >
                {errors.expiry}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block font-caps text-[0.5rem] tracking-[0.4em] uppercase text-ink-soft mb-1.5">
              CVV
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={data.cvv}
              onChange={(e) => handleCvv(e.target.value)}
              onFocus={() => setFocused("cvv")}
              onBlur={() => setFocused(null)}
              placeholder="123"
              className={`w-full bg-transparent border px-3 py-2.5 font-mono text-base text-ink placeholder:text-faded/50 outline-none transition-colors duration-200 ${
                errors.cvv
                  ? "border-oxblood"
                  : "border-rule hover:border-ink/40 focus:border-ink"
              }`}
            />
            {errors.cvv && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-caps text-[0.5rem] tracking-[0.2em] text-oxblood mt-1"
              >
                {errors.cvv}
              </motion.p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-rule text-ink-soft hover:text-ink hover:border-ink/40 font-caps text-[0.6rem] tracking-[0.35em] uppercase px-4 py-3 transition-all duration-300 cursor-pointer"
          >
            Back
          </button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="flex-1 bg-ink text-vellum hover:bg-ink-2 font-caps text-[0.6rem] tracking-[0.35em] uppercase px-4 py-3 transition-all duration-300 cursor-pointer"
          >
            Review Order
          </motion.button>
        </div>
      </form>
    </div>
  );
}

/* ============================================================
   REVIEW
   ============================================================ */

function ReviewOrder({
  items,
  shipping,
  payment,
  onBack,
  onPlaceOrder,
}: {
  items: CartItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  onBack: () => void;
  onPlaceOrder: () => void;
}) {
  const total = items.reduce(
    (s, i) => s + parsePrice(i.price) * i.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl text-ink mb-1">Review Order</h3>
        <p className="font-serif italic text-sm text-ink-soft">
          Please confirm your details before placing the order.
        </p>
      </div>
      <div className="h-px bg-rule" />

      {/* Items summary */}
      <div className="space-y-2">
        <p className="font-caps text-[0.5rem] tracking-[0.4em] uppercase text-ink-soft">
          Items ({items.length})
        </p>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 border-b border-rule"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-10 overflow-hidden plate-thin">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-sm text-ink">{item.title}</p>
                <p className="font-caps text-[0.45rem] tracking-[0.3em] text-ink-soft">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
            <span className="font-display text-base text-oxblood">
              {formatPrice(parsePrice(item.price) * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Shipping */}
      <div>
        <p className="font-caps text-[0.5rem] tracking-[0.4em] uppercase text-ink-soft mb-2">
          Shipping To
        </p>
        <div className="bg-parchment/60 border border-rule p-4 font-serif text-sm text-ink space-y-0.5">
          <p>{shipping.name}</p>
          <p>{shipping.address}</p>
          <p>
            {shipping.city} {shipping.postal}
          </p>
          <p className="text-ink-soft">{shipping.email}</p>
        </div>
      </div>

      {/* Payment */}
      <div>
        <p className="font-caps text-[0.5rem] tracking-[0.4em] uppercase text-ink-soft mb-2">
          Payment
        </p>
        <div className="bg-parchment/60 border border-rule p-4 font-mono text-sm text-ink flex items-center gap-3">
          <span className="text-faded">•••• •••• ••••</span>
          <span>{payment.cardNumber.slice(-4)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-3 border-t border-ink">
        <span className="font-caps text-[0.6rem] tracking-[0.35em] uppercase text-ink">
          Total
        </span>
        <span className="font-display text-3xl text-ink">
          {formatPrice(total)}
        </span>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 border border-rule text-ink-soft hover:text-ink hover:border-ink/40 font-caps text-[0.6rem] tracking-[0.35em] uppercase px-4 py-3 transition-all duration-300 cursor-pointer"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onPlaceOrder}
          className="flex-1 bg-oxblood text-vellum hover:bg-oxblood-2 font-caps text-[0.6rem] tracking-[0.35em] uppercase px-4 py-3 transition-all duration-300 cursor-pointer"
        >
          Place Order
        </motion.button>
      </div>
    </div>
  );
}

/* ============================================================
   CHECKOUT — orchestrator
   ============================================================ */

export function Checkout({ items, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });
  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [orderNumber, setOrderNumber] = useState("");

  const placeOrder = useCallback(() => {
    const num = `RP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
    setOrderNumber(num);
    setStep(3);
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {["Shipping", "Payment", "Review", "Confirm"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <motion.div
              animate={{
                backgroundColor:
                  i <= step ? "var(--color-oxblood)" : "transparent",
                borderColor:
                  i <= step
                    ? "var(--color-oxblood)"
                    : "var(--color-rule-strong)",
                color:
                  i <= step
                    ? "var(--color-vellum)"
                    : "var(--color-ink-soft)",
              }}
              className="w-6 h-6 rounded-full border flex items-center justify-center"
            >
              <span className="font-caps text-[0.45rem] tracking-[0.1em]">
                {i < step ? "✓" : i + 1}
              </span>
            </motion.div>
            <span
              className={`font-caps text-[0.45rem] tracking-[0.25em] uppercase hidden sm:inline ${
                i <= step ? "text-ink" : "text-faded"
              }`}
            >
              {label}
            </span>
            {i < 3 && <span className="w-4 h-px bg-rule hidden sm:block" />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <ShippingForm
              data={shipping}
              onChange={setShipping}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <PaymentForm
              data={payment}
              onChange={setPayment}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <ReviewOrder
              items={items}
              shipping={shipping}
              payment={payment}
              onBack={() => setStep(1)}
              onPlaceOrder={placeOrder}
            />
          )}
          {step === 3 && <ProcessingScreen onComplete={() => setStep(4)} />}
          {step === 4 && (
            <SuccessScreen orderNumber={orderNumber} onReturn={onComplete} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
