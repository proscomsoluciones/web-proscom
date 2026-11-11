import React from "react";
import { BusinessHero } from "@/components/home/business/BusinessHero";
import {
  TrustedBy,
  PainPoints,
  NeedsGrid,
  Stories,
  HowWeWork,
  HomeFaq,
  FinalCta,
} from "@/components/home/business/BusinessSections";

export default function HomePage() {
  return (
    <>
      {/* 1. Mensaje principal: resultados para el negocio */}
      <BusinessHero />

      {/* 2. Clientes que confían en nosotros */}
      <TrustedBy />

      {/* 3. Problemas cotidianos con los que se identifica el cliente */}
      <PainPoints />

      {/* 4. Servicios agrupados por necesidad */}
      <NeedsGrid />

      {/* 5. Casos reales contados como antes / ahora */}
      <Stories />

      {/* 6. Cómo trabajamos y por qué elegirnos */}
      <HowWeWork />

      {/* 7. Preguntas frecuentes en lenguaje simple */}
      <HomeFaq />

      {/* 8. Llamado final a conversar */}
      <FinalCta />
    </>
  );
}
