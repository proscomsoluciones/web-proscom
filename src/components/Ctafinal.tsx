"use client";

import { Button } from "./ui/Button";
import { useModal } from "@/context/ModalContext";

export default function CTAFinal() {
  const { openModal } = useModal();

  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111] border-t border-white/5">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Necesitas mejorar la gestión de tu organización?
          </h2>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Conversemos y evaluemos cómo una solución de gestión a medida puede ordenar tus procesos y potenciar tu operación.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button onClick={openModal} variant="solid" className="w-full sm:w-auto px-8 py-4 text-lg">
                Solicitar demo
             </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
