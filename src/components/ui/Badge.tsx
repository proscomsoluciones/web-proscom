import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "cyan" | "navy" | "outline" | "success";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "blue",
  size = "md",
  className = "",
}) => {
  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-medium tracking-wide",
    md: "text-xs px-3 py-1 font-semibold tracking-wide",
  };

  const variantStyles = {
    blue: "bg-[#1479D4]/10 text-[#1479D4] border border-[#1479D4]/20",
    cyan: "bg-[#19C6E6]/10 text-[#19C6E6] border border-[#19C6E6]/30",
    navy: "bg-[#071A35] text-white border border-white/10",
    outline: "border border-slate-300 text-slate-700 bg-white/70",
    success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
