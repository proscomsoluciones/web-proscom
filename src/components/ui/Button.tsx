import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "solid"; // Added solid as alias to primary or separate
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading,
  icon,
  className = "",
  href,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-3xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  // Map 'solid' to 'primary' if not defined, or define it. Hero used 'solid'.
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/25 border border-transparent",
    solid: // Treating solid same as primary for now, or maybe flat blue
      "bg-blue-600 hover:bg-blue-500 text-white border border-transparent shadow-lg shadow-blue-500/20",
    secondary:
      "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20",
    outline:
      "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
  };

  const selectedVariant = variantStyles[variant as keyof typeof variantStyles] || variantStyles.primary;

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const content = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${selectedVariant} ${sizes[size]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${selectedVariant} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {content}
    </motion.button>
  );
};
