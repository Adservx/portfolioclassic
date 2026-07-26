import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-caps uppercase tracking-[0.32em] text-[0.72rem] px-3 py-1 transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-ink/60 text-ink bg-transparent",
        gold:
          "border border-gold/70 text-gold bg-transparent",
        oxblood:
          "bg-oxblood text-vellum border border-oxblood",
        solid:
          "bg-ink text-vellum border border-ink",
        ghost:
          "text-ink-soft border-b border-ink/40 rounded-none px-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
