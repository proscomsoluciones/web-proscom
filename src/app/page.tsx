import Hero from "@/components/Hero";
import WhatIsProscom from "@/components/WhatIsProscom";
import Sectors from "@/components/Sectors";
import CTAFinal from "@/components/Ctafinal";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <WhatIsProscom />
      <Sectors />
      <CTAFinal />
    </main>
  );
}
