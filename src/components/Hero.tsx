"use client";

import { Button } from "./ui/Button";
import { useModal } from "@/context/ModalContext";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-0">
        {/* Gradient Mesh */}
        <div className="absolute top-0 px-20 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
           <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
           <div className="absolute top-[40%] right-[20%] w-96 h-96 bg-purple-600 rounded-full blur-[128px]" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
        
        {/* Badge / Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-300">Plataformas de Gestión y Control</span>
        </div>

        {/* H1 SEO CRÍTICO */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-5xl mx-auto leading-tight">
          Soluciones de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">gestión y control</span> <br className="hidden md:block" />
          para organizaciones e industrias
        </h1>

        {/* H2 Subz */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
          Facilitamos la <span className="text-gray-200">digitalización de procesos</span>, el <span className="text-gray-200">control administrativo</span> y la <span className="text-gray-200">gestión financiera</span> para entregar orden y eficiencia real.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={openModal}
            variant="solid" 
            className="w-full sm:w-auto text-lg px-8 py-6"
          >
            Solicitar demo
          </Button>
          <Button 
            href="/contacto" 
            variant="outline"
            className="w-full sm:w-auto text-lg px-8 py-6"
          >
            Hablar con Proscom
          </Button>
        </div>
      </div>
    </section>
  );
}
