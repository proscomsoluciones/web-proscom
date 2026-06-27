import React from 'react';
import ModernHero from "@/components/ModernHero";
import ModernSolutions from "@/components/ModernSolutions";
import ModernCybersecurity from "@/components/ModernCybersecurity";
import ModernSuccessCases from "@/components/ModernSuccessCases";
import ModernNews from "@/components/ModernNews";
import ModernAbout from "@/components/ModernAbout";
import ModernContactFooter from "@/components/ModernContactFooter";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <ModernHero />
        <ModernSolutions />
        <ModernCybersecurity />
        <ModernSuccessCases />
        <ModernNews />
        <ModernAbout />
        <ModernContactFooter />
      </main>
    </div>
  );
}
