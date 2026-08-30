import React from 'react';
import ModernHero from "@/components/ModernHero";
import ModernTrustPillars from "@/components/ModernTrustPillars";
import ModernSolutions from "@/components/ModernSolutions";
import ModernCybersecurity from "@/components/ModernCybersecurity";
import ModernLatamPresence from "@/components/ModernLatamPresence";
import ModernSuccessCases from "@/components/ModernSuccessCases";
import ModernAbout from "@/components/ModernAbout";
import ModernContactFooter from "@/components/ModernContactFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 1. Hero Principal Corporativo */}
        <ModernHero />

        {/* 2. Pilares de Confianza Empresarial */}
        <ModernTrustPillars />

        {/* 3. Soluciones de Software Enterprise */}
        <ModernSolutions />

        {/* 4. Ciberseguridad & Ley N° 21.719 */}
        <ModernCybersecurity />

        {/* 5. Cobertura & Experiencia en Latam (Chile, Colombia, México, Argentina, Perú) */}
        <ModernLatamPresence />

        {/* 6. Casos de Éxito y Confianza */}
        <ModernSuccessCases />

        {/* 7. Liderazgo Corporativo & Dirección */}
        <ModernAbout />

        {/* 8. Contacto Corporativo & Sede Vitacura */}
        <ModernContactFooter />
      </main>
    </div>
  );
}
