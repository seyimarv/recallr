"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const animatedButtonVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        outline: "",
        secondary: "",
        ghost: "",
        link: "",
        // Custom variants for consistent branding
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl font-semibold",
        primaryLarge: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl font-semibold px-8 py-4 text-lg",
      },
      animation: {
        none: "",
        hover: "",
        bounce: "",
        slide: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "hover",
    },
  }
);

interface AnimatedButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant">,
    VariantProps<typeof animatedButtonVariants> {
  animation?: "none" | "hover" | "bounce" | "slide";
  children: React.ReactNode;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, animation = "hover", children, ...props }, ref) => {
    const slideAnimation = animation === "slide";
    
    // Handle custom variants
    const isCustomVariant = variant === "primary" || variant === "primaryLarge";
    const buttonVariant = isCustomVariant ? "default" : variant;
    const customClasses = isCustomVariant ? animatedButtonVariants({ variant, animation: "none" }) : "";

    if (slideAnimation) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Button
            ref={ref}
            variant={buttonVariant}
            className={cn(customClasses, className)}
            size={size}
            {...props}
          >
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {children}
            </motion.div>
          </Button>
        </motion.div>
      );
    }

    return (
      <motion.div
        whileHover={{ 
          scale: animation === "bounce" ? 1.05 : animation === "hover" ? 1.02 : 1 
        }}
        whileTap={{ 
          scale: animation === "bounce" ? 0.95 : animation === "hover" ? 0.98 : 1 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="inline-block"
      >
        <Button
          ref={ref}
          variant={buttonVariant}
          className={cn(customClasses, className)}
          size={size}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, animatedButtonVariants };
export type { AnimatedButtonProps }; 