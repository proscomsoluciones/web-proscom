"use client";

import React from 'react';
import NewHero from "@/components/NewHero";
import Internacional from "@/components/Internacional";
import NewServices from "@/components/NewServices";
import AboutMe from "@/components/AboutMe";
import NewContact from "@/components/NewContact";

/**
 * Proscom Main Landing Page
 * Redesigned with "Tech Premium" aesthetic and Latam-focused strategy.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-blue-500/30 scroll-smooth">
      <NewHero />
      <Internacional />
      <NewServices />
      <AboutMe />
      <NewContact />
    </div>
  );
}
