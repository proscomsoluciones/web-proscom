import React from "react";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ValuePropSection } from "@/components/home/ValuePropSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { MotionVideoSection } from "@/components/home/MotionVideoSection";
import { MotionArchitecture } from "@/components/ui/MotionArchitecture";
import { CtaSection } from "@/components/home/CtaSection";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { LearnTeaser } from "@/components/home/LearnTeaser";
import { reveal } from "@/components/motion/reveal";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with Real Composition, Blueprint Grid & Floating HUD */}
      <Hero />

      {/* 1b. Cinta animada de clientes */}
      <ClientsMarquee />

      {/* 2. 6 Core Services with Engineering Grid & Spec Badges */}
      <ServicesSection />

      {/* 3. Real-Time Architecture Motion Graphic Interactive Simulation */}
      <section className="py-20 bg-[#071A35] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div {...reveal("up")}>
            <MotionArchitecture />
          </div>
        </div>
      </section>

      {/* 4. Value Proposition / Founder Experience with Tech Meters */}
      <ValuePropSection />

      {/* 5. Motion Graphic Video Reel Section (Reel Oficial Proscom) */}
      <MotionVideoSection />

      {/* 6. Engineering Pipeline Methodology (6 Stages) */}
      <MethodologySection />

      {/* 7. Proprietary Solutions Dark-Tech Cockpit (Proscom Org, QueBuenDato) */}
      <SolutionsSection />

      {/* 8. Real Client Projects (LegalFirma, WOWPOS, WOW Ticket, AFC, San José) */}
      <ProjectsSection />

      {/* 8b. Centro de aprendizaje: laboratorio 3D de APIs */}
      <LearnTeaser />

      {/* 9. Final High-Conversion Command Center CTA */}
      <CtaSection />
    </>
  );
}
