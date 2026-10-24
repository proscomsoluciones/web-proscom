import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F3F6FA] py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#071A35] text-[#19C6E6] font-black text-2xl">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
            Página no encontrada
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            La ruta o contenido que buscas no existe o ha sido reubicada dentro del portal de Proscom.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Ir al inicio
          </Button>
          <Button
            href="/servicios"
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Ver servicios
          </Button>
        </div>
      </div>
    </div>
  );
}
