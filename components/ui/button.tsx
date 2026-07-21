import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
{
variants: {
variant: {
primary:
"bg-ink text-vellum hover:bg-ink-2 border border-ink font-caps uppercase tracking-[0.3em] text-[0.75rem] px-6 py-3",
gold:
"bg-gold text-ink hover:bg-gold-2 border border-gold font-caps uppercase tracking-[0.3em] text-[0.75rem] px-6 py-3",
oxblood:
"bg-oxblood text-vellum hover:bg-oxblood-2 border border-oxblood font-caps uppercase tracking-[0.3em] text-[0.75rem] px-6 py-3",
outline:
"bg-transparent text-ink border border-ink hover:bg-ink hover:text-vellum font-caps uppercase tracking-[0.3em] text-[0.75rem] px-6 py-3",
ghost:
"bg-transparent text-ink hover:text-oxblood font-serif text-base px-2 py-1",
link:
"text-link underline underline-offset-[6px] decoration-1 decoration-link hover:decoration-link-hover hover:text-link-hover bg-transparent px-0 py-0 font-serif text-base",
},
size: {
default: "h-auto",
sm: "text-xs px-4 py-2",
lg: "text-sm px-8 py-4",
},
},
defaultVariants: {
variant: "primary",
size: "default",
},
}
);

export interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> {
asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
({ className, variant, size, asChild = false, ...props }, ref) => {
const Comp = asChild ? Slot : "button";
return (
<Comp
className={cn(buttonVariants({ variant, size, className }))}
ref={ref}
{...props}
/>
);
}
);
Button.displayName = "Button";

export { Button, buttonVariants };
