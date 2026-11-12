import React from "react";
import { BusinessHero } from "@/components/home/business/BusinessHero";
import {
  TrustedBy,
  WhatWeDo,
  HowWeWork,
  Stories,
  AboutUs,
  HomeFaq,
  FinalCta,
} from "@/components/home/business/BusinessSections";
import { DataLawBanner } from "@/components/home/business/DataLawBanner";

export default function HomePage() {
  return (
    <>
      {/* 1. Mensaje principal: resultados para el negocio */}
      <BusinessHero />

      {/* 2. Clientes que confían en nosotros */}
      <TrustedBy />

      {/* 3. Qué hacemos: tres áreas con sus servicios */}
      <WhatWeDo />

      {/* 4. Cómo trabajamos: pasos y lo que recibe el cliente */}
      <HowWeWork />

      {/* 4b. Banner Ley 21.719 de Protección de Datos */}
      <DataLawBanner />

      {/* 5. Casos reales contados como antes / ahora */}
      <Stories />

      {/* 6. Quiénes somos */}
      <AboutUs />

      {/* 7. Preguntas frecuentes en lenguaje simple */}
      <HomeFaq />

      {/* 8. Llamado final a conversar */}
      <FinalCta />
    </>
  );
}
