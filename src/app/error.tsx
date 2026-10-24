"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F3F6FA] py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-600">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#071A35]">
            Ocurrió un problema inesperado
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Hemos registrado el incidente. Puedes intentar recargar la página o volver al inicio.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => reset()}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reintentar
          </Button>
          <Button href="/" variant="outline" size="md" icon={<Home className="w-4 h-4" />}>
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
