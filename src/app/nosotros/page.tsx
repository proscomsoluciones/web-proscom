"use client";

import React from "react";
import AboutProscom from "@/components/AboutProscom";
import HowWeWork from "@/components/HowWeWork";
import CTAFinal from "@/components/Ctafinal";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
       <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Nuestra Esencia
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Más que tecnología, somos orden y eficiencia para tu organización.
        </p>
      </div>
      <AboutProscom />
      <HowWeWork />
      <CTAFinal />
    </main>
  );
}
