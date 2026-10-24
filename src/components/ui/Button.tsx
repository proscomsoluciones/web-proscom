import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  external,
  icon,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-[#1373C9] hover:bg-[#1688F5] text-white shadow-md shadow-[#1479D4]/20 hover:shadow-lg hover:shadow-[#1688F5]/30 focus-visible:outline-[#1688F5]",
    secondary:
      "bg-[#071A35] hover:bg-[#0C284E] text-white border border-white/10 hover:border-white/20 focus-visible:outline-white",
    outline:
      "border border-[#1479D4] text-[#1479D4] hover:bg-[#1479D4]/10 focus-visible:outline-[#1479D4]",
    whatsapp:
      "bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/35 focus-visible:outline-[#25D366]",
    ghost:
      "text-slate-600 hover:text-[#071A35] hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
