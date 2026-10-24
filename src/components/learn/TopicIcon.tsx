import React from "react";
import {
  Network,
  Globe,
  Link2,
  Cloud,
  ShieldCheck,
  Calculator,
  Mail,
  CreditCard,
  KeyRound,
  LayoutTemplate,
  LayoutDashboard,
  PanelsTopLeft,
  HelpCircle,
  Search,
  Smartphone,
  AppWindow,
  ListChecks,
} from "lucide-react";
import type { LearnTopic } from "@/data/learn";

const ICONS = {
  Network,
  Globe,
  Link2,
  Cloud,
  ShieldCheck,
  Calculator,
  Mail,
  CreditCard,
  KeyRound,
  LayoutTemplate,
  LayoutDashboard,
  PanelsTopLeft,
  HelpCircle,
  Search,
  Smartphone,
  AppWindow,
  ListChecks,
};

/** Ícono del tema en un bloque con volumen y brillo del color del tema. */
export const TopicIcon: React.FC<{ name: LearnTopic["iconName"]; accent: string; size?: "md" | "lg" }> = ({ name, accent, size = "md" }) => {
  const Icon = ICONS[name];
  const box = size === "lg" ? "w-36 h-36 rounded-[2rem]" : "w-16 h-16 rounded-2xl";
  const icon = size === "lg" ? "w-16 h-16" : "w-8 h-8";
  return (
    <div className="relative" style={{ perspective: 600 }}>
      <div
        className={`${box} grid place-items-center border border-white/20`}
        style={{
          background: `linear-gradient(145deg, ${accent}, #071A35 120%)`,
          boxShadow: `0 18px 40px -12px ${accent}99, inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -10px 20px rgba(0,0,0,0.25)`,
          transform: "rotateX(14deg) rotateY(-18deg)",
        }}
      >
        <Icon className={`${icon} text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]`} />
      </div>
    </div>
  );
};
