import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        royal:
          "bg-primary px-6 py-3.5 text-primary-foreground shadow-royal hover:-translate-y-0.5 hover:bg-primary-glow",
        outline:
          "border border-border bg-transparent px-6 py-3.5 text-foreground hover:border-primary hover:text-primary",
        ghost: "px-4 py-2 text-muted-foreground hover:text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "royal", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

export { Button, buttonVariants };
