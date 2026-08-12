"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

async function fileToDataUrl(file: File): Promise<string> {
  const maxDim = 1000;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.75);
}

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
format?: "print" | "digital";
}

function parsePrice(price: string): number {
return parseFloat(price.replace(/[£$€]/g, ""));
}

function formatPrice(n: number): string {
return `$${n.toFixed(2)}`;
}

/* ============================================================
eSEWA QR PAYMENT
============================================================ */

function QRDisplay({
  amount,
  focused,
}: {
  amount: string;
  focused: string | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: focused === "txnId" ? -6 : 0,
        rotateX: focused === "payerPhone" ? 4 : 0,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="[perspective:1000px] w-full max-w-[340px] mx-auto"
    >
      <div className="relative w-full [transform-style:preserve-3d]">
        <div className="w-full bg-gradient-to-br from-ink-3 via-ink to-ink-2 border border-ink-2 rounded-[14px] p-6 shadow-xl">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-1"
            >
              <span className="text-vellum/60 font-caps text-[1rem] tracking-[0.2em]">
                eSEWA
              </span>
            </motion.div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="px-2 py-0.5 rounded bg-gradient-to-br from-gold/80 to-gold-2/80 text-ink font-caps text-[0.9rem] tracking-[0.15em]"
            >
              QR
            </motion.span>
          </div>

          {/* QR image */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square bg-vellum rounded-lg p-3 flex items-center justify-center shadow-inner"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/PHOTO-2026-07-25-14-04-28.jpg"
                alt="eSewa payment QR code"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Amount */}
          <div className="mt-4 text-center">
            <p className="font-caps text-[0.8rem] tracking-[0.25em] uppercase text-vellum/40 mb-1">
              Amount to pay
            </p>
            <motion.p
              key={amount}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl text-gold"
            >
              {amount}
            </motion.p>
          </div>

          <p className="mt-3 font-caps text-[0.7rem] tracking-[0.25em] text-vellum/35 text-center">
            Scan &amp; pay with eSewa · The Pathak Estate
          </p>
        </div>

        {/* Instructions */}
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 bg-parchment/60 border border-rule p-4 list-decimal list-inside space-y-1 font-serif text-text-base text-ink-soft"
        >
          <li>Scan this QR in the eSewa app.</li>
          <li>Pay the exact amount shown above.</li>
          <li>Enter the transaction details from your receipt below.</li>
        </motion.ol>
      </div>
    </motion.div>
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
<span className="font-display text-oxblood text-text-base leading-none">D · P</span>
<span className="font-caps text-oxblood/80 text-[1rem] tracking-[0.4em] mt-1">
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
className="text-text-sm"
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
<span className="font-serif text-text-base">{step}</span>
</motion.div>
))}
</div>

{currentStep >= 4 && (
<motion.p
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3 }}
className="mt-6 font-serif text-ink-soft text-text-base"
>
Your order has been recorded in the ledger.
</motion.p>
)}
</div>
);
}

/* ============================================================
THANK YOU
============================================================ */

function ThankYouScreen({
  orderNumber,
  email,
  format,
  onComplete,
}: {
  orderNumber: string;
  email: string;
  format?: "print" | "digital";
  onComplete: () => void;
}) {
  const isDigital = format === "digital";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Seal */}
      <motion.div
        initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
        animate={{ scale: 1, rotate: -8, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-28 h-28 rounded-full border-4 border-double border-gold flex items-center justify-center bg-gold/10 mb-8"
      >
        <div className="w-24 h-24 rounded-full border border-gold/60 flex flex-col items-center justify-center">
          <span className="font-display text-gold text-text-base leading-none">
            D · P
          </span>
          <span className="font-caps text-gold/80 text-[1rem] tracking-[0.4em] mt-1">
            EST. MCMLXXII
          </span>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-display text-3xl sm:text-4xl text-ink mb-3"
      >
        Thank You
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="font-caps text-[1rem] tracking-[0.4em] uppercase text-oxblood mb-6"
      >
        Order {orderNumber}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="font-serif text-text-lg text-ink-soft max-w-md mb-4"
      >
        Your order has been received. We will check your payment and send{" "}
        {isDigital
          ? "your PDF download link"
          : "your order confirmation and shipping details"}{" "}
        to{" "}
        <span className="text-ink underline decoration-link/60 underline-offset-4">
          {email}
        </span>{" "}
        by email shortly.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="font-caps text-[0.9rem] tracking-[0.3em] uppercase text-faded mb-10"
      >
        Please check your inbox — and your spam folder.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="button"
        onClick={onComplete}
        className="bg-link text-vellum hover:bg-link-hover font-caps text-[1rem] tracking-[0.35em] uppercase px-8 py-3 transition-[background-color] duration-300 cursor-pointer"
      >
        Back to the Bookstore
      </motion.button>
    </motion.div>
  );
}

/* ============================================================
SHIPPING FORM
============================================================ */

interface ShippingInfo {
name: string;
email: string;
phone: string;
address: string;
city: string;
municipality: string;
ward: string;
province: string;
postal: string;
}

function ShippingForm({
data,
onChange,
onNext,
format,
}: {
data: ShippingInfo;
onChange: (d: ShippingInfo) => void;
onNext: () => void;
format?: "print" | "digital";
}) {
const isDigital = format === "digital";
const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});
const nameRef = useRef<HTMLInputElement>(null);

useEffect(() => {
nameRef.current?.focus();
}, []);

const validate = () => {
const errs: Partial<Record<keyof ShippingInfo, string>> = {};
if (!data.name.trim()) errs.name = "Required";
if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
errs.email = "Valid email required";
if (!isDigital) {
if (!data.phone.trim()) errs.phone = "Required";
if (!data.address.trim()) errs.address = "Required";
if (!data.city.trim()) errs.city = "Required";
if (!data.municipality.trim()) errs.municipality = "Required";
if (!data.ward.trim()) errs.ward = "Required";
if (!data.province.trim()) errs.province = "Required";
}
setErrors(errs);
return Object.keys(errs).length === 0;
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
<label className="block font-caps text-[0.9rem] tracking-[0.4em] uppercase text-ink-soft mb-1.5">
{label}
</label>
<input
ref={key === "name" ? nameRef : undefined}
type={opts?.type || "text"}
value={data[key]}
onChange={(e) => onChange({ ...data, [key]: e.target.value })}
placeholder={placeholder}
className={`w-full bg-transparent border px-3 py-2.5 font-serif text-text-lg text-ink placeholder:text-faded/50 outline-none transition-colors duration-200 ${
errors[key]
? "border-oxblood"
: "border-rule hover:border-ink/40 focus:border-ink"
}`}
/>
{errors[key] && (
<motion.p
initial={{ opacity: 0, y: -5 }}
animate={{ opacity: 1, y: 0 }}
className="font-caps text-[0.9rem] tracking-[0.2em] text-oxblood mt-1"
>
{errors[key]}
</motion.p>
)}
</div>
);

return (
<form onSubmit={handleSubmit} className="space-y-5">
<div>
<h3 className="font-display text-2xl text-ink mb-1">{isDigital ? "Your Details" : "Shipping"}</h3>
<p className="font-serif text-text-lg text-ink-soft">
{isDigital ? "Where should we send your download link?" : "Where should we send your books?"}
</p>
</div>
<div className="h-px bg-rule" />
{field("Full Name", "name", "Darshan Pathak")}
{field("Email", "email", "reader@example.com", { type: "email" })}
{!isDigital && field("Phone Number", "phone", "+977 9741766064")}
{!isDigital && field("Address", "address", "Triyashi")}
{!isDigital && field("City", "city", "London")}
{!isDigital && field("Municipality", "municipality", "Waling")}
{!isDigital && field("Ward No.", "ward", "8")}
{!isDigital && field("Province", "province", "Lumbini")}
{!isDigital && field("Postal Code", "postal", "33801")}
<div className="pt-4">
<motion.button
whileHover={{ scale: 1.01 }}
whileTap={{ scale: 0.99 }}
type="submit"
className="w-full bg-link text-vellum hover:bg-link-hover font-caps text-[1rem] tracking-[0.35em] uppercase px-6 py-3 transition-[background-color] duration-300 cursor-pointer"
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
txnId: string;
payerName: string;
payerPhone: string;
screenshotUrl: string;
screenshotStatus: "idle" | "uploading" | "done" | "error";
}

function PaymentForm({
  items,
  data,
  onChange,
  onNext,
  onBack,
  submitError,
}: {
  items: CartItem[];
  data: PaymentInfo;
  onChange: (d: PaymentInfo) => void;
  onNext: () => void;
  onBack: () => void;
  submitError: string;
}) {
const [focused, setFocused] = useState<string | null>(null);
const [errors, setErrors] = useState<Partial<Record<keyof PaymentInfo, string>>>({});
const txnRef = useRef<HTMLInputElement>(null);
const fileRef = useRef<HTMLInputElement>(null);

const total = items.reduce(
  (s, i) => s + parsePrice(i.price) * i.quantity,
  0
);

useEffect(() => {
  txnRef.current?.focus();
}, []);

const handleScreenshot = async (file: File | undefined) => {
  if (!file) return;
  onChange({ ...data, screenshotUrl: "", screenshotStatus: "uploading" });
  try {
    const dataUrl = await fileToDataUrl(file);
    onChange({ ...data, screenshotUrl: dataUrl, screenshotStatus: "done" });
  } catch {
    onChange({ ...data, screenshotUrl: "", screenshotStatus: "error" });
  }
};

const validate = () => {
  const errs: Partial<Record<keyof PaymentInfo, string>> = {};
  if (!data.txnId.trim()) errs.txnId = "Required";
  if (!data.payerName.trim()) errs.payerName = "Required";
  if (data.payerPhone.replace(/\D/g, "").length < 10)
    errs.payerPhone = "Valid mobile number required";
  setErrors(errs);
  return Object.keys(errs).length === 0;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) onNext();
};

const field = (
  label: string,
  key: keyof PaymentInfo,
  placeholder: string,
  opts?: { type?: string }
) => (
  <div>
    <label className="block font-caps text-[0.9rem] tracking-[0.4em] uppercase text-ink-soft mb-1.5">
      {label}
    </label>
    <input
      ref={key === "txnId" ? txnRef : undefined}
      type={opts?.type || "text"}
      value={data[key]}
      onChange={(e) => onChange({ ...data, [key]: e.target.value })}
      onFocus={() => setFocused(key)}
      onBlur={() => setFocused(null)}
      placeholder={placeholder}
      className={`w-full bg-transparent border px-3 py-2.5 font-serif text-text-lg text-ink placeholder:text-faded/50 outline-none transition-colors duration-200 ${
        errors[key]
          ? "border-oxblood"
          : "border-rule hover:border-ink/40 focus:border-ink"
      }`}
    />
    {errors[key] && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-caps text-[0.9rem] tracking-[0.2em] text-oxblood mt-1"
      >
        {errors[key]}
      </motion.p>
    )}
  </div>
);

return (
<div>
  {/* Animated QR payment */}
  <div className="mb-8">
    <QRDisplay amount={formatPrice(total)} focused={focused} />
  </div>

  <form onSubmit={handleSubmit} className="space-y-5">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-display text-2xl text-ink mb-1">Payment</h3>
        <p className="font-serif text-text-lg text-ink-soft">
          Pay by scanning the eSewa QR, then confirm your transaction below.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1 text-faded"
      >
        <span className="font-caps text-[0.8rem] tracking-[0.15em] border border-rule px-1.5 py-0.5">
          eSewa
        </span>
      </motion.div>
    </div>
    <div className="h-px bg-rule" />

    {field("eSewa Transaction ID", "txnId", "Transaction ID from your eSewa receipt")}
    {field("Payer Name", "payerName", "Darshan Pathak")}
    {field("eSewa Mobile Number", "payerPhone", "98XXXXXXXX", { type: "tel" })}

    {/* Payment screenshot */}
    <div>
      <label className="block font-caps text-[0.9rem] tracking-[0.4em] uppercase text-ink-soft mb-1.5">
        Payment Screenshot (optional)
      </label>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleScreenshot(e.target.files?.[0])}
        className="hidden"
      />
      {data.screenshotUrl ? (
        <div className="relative aspect-video max-w-xs overflow-hidden border border-rule bg-parchment">
          <Image
            src={data.screenshotUrl}
            alt="Payment screenshot"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={data.screenshotStatus === "uploading"}
        className="w-full border border-rule px-3 py-2.5 font-caps text-[0.9rem] tracking-[0.25em] text-ink-soft hover:text-ink hover:border-ink/40 transition-[color,border-color] duration-200 cursor-pointer disabled:opacity-50"
      >
        {data.screenshotStatus === "uploading"
          ? "Uploading…"
          : data.screenshotStatus === "done"
            ? "Change screenshot"
            : data.screenshotStatus === "error"
              ? "Upload failed — tap to retry"
              : "Upload payment screenshot"}
      </button>
    </div>

    {submitError && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-caps text-[0.9rem] tracking-[0.2em] text-oxblood"
      >
        {submitError}
      </motion.p>
    )}

    <div className="flex gap-3 pt-4">
      <button
        type="button"
        onClick={onBack}
        className="flex-1 border border-rule text-ink-soft hover:text-ink hover:border-ink/40 font-caps text-[1rem] tracking-[0.35em] uppercase px-4 py-3 transition-[color,border-color] duration-300 cursor-pointer"
      >
        Back
      </button>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="flex-1 bg-link text-vellum hover:bg-link-hover font-caps text-[1rem] tracking-[0.35em] uppercase px-4 py-3 transition-[background-color] duration-300 cursor-pointer"
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
submitting,
format,
}: {
items: CartItem[];
shipping: ShippingInfo;
payment: PaymentInfo;
onBack: () => void;
onPlaceOrder: () => void;
submitting: boolean;
format?: "print" | "digital";
}) {
const total = items.reduce(
(s, i) => s + parsePrice(i.price) * i.quantity,
0
);

return (
<div className="space-y-6">
<div>
<h3 className="font-display text-2xl text-ink mb-1">Review Order</h3>
<p className="font-serif text-text-lg text-ink-soft">
Please confirm your details before placing the order.
</p>
</div>
<div className="h-px bg-rule" />

{/* Items summary */}
<div className="space-y-2">
<p className="font-caps text-[0.9rem] tracking-[0.4em] uppercase text-ink-soft">
Items ({items.length})
</p>
{items.map((item) => (
<div
key={item.id}
className="flex items-center justify-between py-2 border-b border-rule"
>
<div className="flex items-center gap-3">
<div className="w-8 h-10 overflow-hidden plate-thin relative">
<Image
  src={item.cover}
  alt={item.title}
  fill
  className="object-cover"
/>
</div>
<div>
<p className="font-serif text-text-base text-ink">{item.title}</p>
<p className="font-caps text-[1rem] tracking-[0.3em] text-ink-soft">
Qty: {item.quantity}
</p>
</div>
</div>
<span className="font-display text-text-lg text-oxblood">
{formatPrice(parsePrice(item.price) * item.quantity)}
</span>
</div>
))}
</div>

{/* Shipping */}
<div>
<p className="font-caps text-[0.9rem] tracking-[0.4em] uppercase text-ink-soft mb-2">
{format === "digital" ? "Contact" : "Shipping To"}
</p>
<div className="bg-parchment/60 border border-rule p-4 font-serif text-text-base text-ink space-y-0.5">
<p>{shipping.name}</p>
<p>{shipping.email}</p>
{format !== "digital" && (
<>
<p>{shipping.phone}</p>
<p>{shipping.address}</p>
<p>{shipping.municipality}</p>
<p>
{shipping.city}{shipping.ward ? `, Ward ${shipping.ward}` : ""}{shipping.province ? `, ${shipping.province}` : ""}{shipping.postal ? `, ${shipping.postal}` : ""}
</p>
</>
)}
</div>
</div>

{/* Payment */}
<div>
<p className="font-caps text-[0.9rem] tracking-[0.4em] uppercase text-ink-soft mb-2">
Payment
</p>
<div className="bg-parchment/60 border border-rule p-4 space-y-1.5">
  <p className="font-caps text-[0.9rem] tracking-[0.4em] uppercase text-faded">
    Paid via eSewa QR
  </p>
  <p className="font-mono text-text-base text-ink">
    Txn: {payment.txnId}
  </p>
  <p className="font-serif text-base text-ink-soft">
    {payment.payerName} · {payment.payerPhone}
  </p>
  {payment.screenshotUrl ? (
    <div className="relative w-full aspect-video overflow-hidden border border-rule bg-parchment mt-2 max-w-sm">
      <Image
        src={payment.screenshotUrl}
        alt="Payment screenshot"
        fill
        className="object-contain"
        unoptimized
      />
    </div>
  ) : (
    <p className="font-caps text-[0.9rem] tracking-[0.2em] text-faded">
      No screenshot uploaded
    </p>
  )}
</div>
</div>

{/* Total */}
<div className="flex items-center justify-between py-3 border-t border-ink">
<span className="font-caps text-[1rem] tracking-[0.35em] uppercase text-ink">
Total
</span>
<span className="font-display text-3xl text-ink">
{formatPrice(total)}
</span>
</div>

<div className="flex gap-3 pt-2">
<button
type="button"
onClick={onBack}
className="flex-1 border border-rule text-ink-soft hover:text-ink hover:border-ink/40 font-caps text-[1rem] tracking-[0.35em] uppercase px-4 py-3 transition-[color,border-color] duration-300 cursor-pointer"
>
Back
</button>
<motion.button
type="button"
whileHover={{ scale: 1.01 }}
whileTap={{ scale: 0.99 }}
onClick={onPlaceOrder}
disabled={submitting}
className="flex-1 bg-oxblood text-vellum hover:bg-oxblood-2 font-caps text-[1rem] tracking-[0.35em] uppercase px-4 py-3 transition-[background-color] duration-300 cursor-pointer disabled:opacity-50"
>
{submitting ? "Placing…" : "Place Order"}
</motion.button>
</div>
</div>
);
}

/* ============================================================
CHECKOUT — orchestrator
============================================================ */

export function Checkout({ items, onBack, onComplete, format }: CheckoutProps) {
const [step, setStep] = useState(0);
const [shipping, setShipping] = useState<ShippingInfo>({
name: "",
email: "",
phone: "",
address: "",
city: "",
municipality: "",
ward: "",
province: "",
postal: "",
});
const [payment, setPayment] = useState<PaymentInfo>({
  txnId: "",
  payerName: "",
  payerPhone: "",
  screenshotUrl: "",
  screenshotStatus: "idle",
});
const [orderNumber, setOrderNumber] = useState("");
const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");

const placeOrder = useCallback(async () => {
  setSubmitting(true);
  setSubmitError("");
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipping,
        payment,
        items: items.map(({ id, title, price, quantity }) => ({
          id,
          title,
          price,
          quantity,
        })),
        format: format ?? "digital",
        total: formatPrice(items.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0)),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Order could not be placed");
    setOrderNumber(data.orderNumber);
    setStep(3);
  } catch (err) {
    setSubmitError(err instanceof Error ? err.message : "Order could not be placed");
    setStep(2);
  } finally {
    setSubmitting(false);
  }
}, [items, shipping, payment, format]);

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
<span className="font-caps text-[1rem] tracking-[0.1em]">
{i < step ? "✓" : i + 1}
</span>
</motion.div>
<span
className={`font-caps text-[1rem] tracking-[0.25em] uppercase hidden sm:inline ${
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
format={format}
/>
)}
{step === 1 && (
<PaymentForm
        items={items}
        data={payment}
        onChange={setPayment}
        onNext={() => setStep(2)}
        onBack={() => setStep(0)}
        submitError={submitError}
      />
)}
{step === 2 && (
<div className="space-y-4">
  {submitError && (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-caps text-[0.9rem] tracking-[0.2em] text-oxblood border border-oxblood/40 px-3 py-2"
    >
      {submitError} — please go back and retry.
    </motion.p>
  )}
  <ReviewOrder
    items={items}
    shipping={shipping}
    payment={payment}
    onBack={() => setStep(1)}
    onPlaceOrder={placeOrder}
    submitting={submitting}
    format={format}
  />
</div>
)}
{step === 3 && <ProcessingScreen onComplete={() => setStep(4)} />}
{step === 4 && (
<ThankYouScreen
orderNumber={orderNumber}
email={shipping.email}
format={format}
onComplete={onComplete}
/>
)}
</motion.div>
</AnimatePresence>
</div>
);
}
