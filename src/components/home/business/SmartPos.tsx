import React from "react";
import { CircleCheck, Printer } from "lucide-react";

/** Ilustración de una máquina Smart POS cobrando e imprimiendo la boleta */
export const SmartPos: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div aria-hidden="true" className={className}>
    <div className="relative">
      {/* Boleta saliendo por la impresora */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-[52px] w-[74%] h-[72px] bg-white rounded-t-sm border border-slate-200 shadow-md px-2 pt-1.5 font-mono text-[7px] leading-[1.35] text-slate-600">
        <p className="text-center font-bold text-slate-800">BOLETA</p>
        <p className="flex justify-between"><span>Productos</span><span>$35.990</span></p>
        <p className="flex justify-between"><span>Tarjeta</span><span>OK</span></p>
        <p className="mt-0.5 border-t border-dashed border-slate-300 pt-0.5 flex justify-between font-bold text-slate-800">
          <span>TOTAL</span><span>$35.990</span>
        </p>
      </div>

      {/* Cuerpo del equipo */}
      <div className="relative rounded-[26px] bg-gradient-to-b from-[#2E3746] to-[#121821] p-2 pt-5 shadow-[0_30px_60px_-15px_rgba(7,26,53,0.55)] ring-1 ring-white/10">
        {/* Ranura de la impresora */}
        <span className="absolute top-2 left-1/2 -translate-x-1/2 w-[70%] h-1.5 rounded-full bg-black/70" />

        {/* Pantalla */}
        <div className="rounded-[18px] bg-white overflow-hidden">
          <div className="bg-[#1373C9] px-3 py-2 text-[10px] font-semibold text-white flex items-center justify-between">
            <span>Cobrar</span>
            <span className="opacity-80">12:45</span>
          </div>
          <div className="px-3 pt-3 pb-3 text-center">
            <p className="text-[9px] text-slate-500">Total a pagar</p>
            <p className="text-lg font-extrabold text-[#071A35] leading-tight">$35.990</p>
            <div className="mt-2.5 mx-auto w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
              <CircleCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="mt-1.5 text-[10px] font-bold text-emerald-600">Pago aprobado</p>
            <div className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-[#071A35] py-1.5 text-[9px] font-semibold text-white">
              <Printer className="w-3 h-3" /> Imprimiendo boleta
            </div>
          </div>
        </div>

        {/* Botón inferior */}
        <span className="mt-2 mb-0.5 mx-auto block w-8 h-1 rounded-full bg-white/25" />
      </div>
    </div>
  </div>
);
