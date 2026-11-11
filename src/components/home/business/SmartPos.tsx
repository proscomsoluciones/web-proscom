import React from "react";
import Image from "next/image";
import { CircleCheck, Printer } from "lucide-react";

// Tamaño natural de la foto y transformación en perspectiva que lleva la
// interfaz (180×320) a las cuatro esquinas de la pantalla del equipo.
const PHOTO_W = 712;
const PHOTO_H = 656;
const SCREEN_MATRIX =
  "matrix3d(0.718545,-0.633956,0,0.000201,0.834787,0.952990,0,-0.000050,0,0,1,0,281,254,0,1)";

/** Foto de una máquina Smart POS (sin marcas) con la pantalla de cobro encima */
export const SmartPos: React.FC<{ width?: number; className?: string }> = ({
  width = 280,
  className = "",
}) => {
  const scale = width / PHOTO_W;
  return (
    <div aria-hidden="true" className={className} style={{ width, height: PHOTO_H * scale }}>
      <div
        className="relative origin-top-left"
        style={{ width: PHOTO_W, height: PHOTO_H, transform: `scale(${scale})` }}
      >
        <Image
          src="/images/hero/smart-pos.png"
          alt=""
          width={PHOTO_W}
          height={PHOTO_H}
          className="absolute inset-0 drop-shadow-[0_40px_40px_rgba(7,26,53,0.28)]"
        />

        {/* Interfaz de cobro proyectada sobre la pantalla */}
        <div
          className="absolute top-0 left-0 w-[180px] h-[320px] origin-top-left rounded-[10px] bg-white overflow-hidden flex flex-col"
          style={{ transform: SCREEN_MATRIX }}
        >
          <div className="bg-[#1373C9] px-4 py-3 text-[15px] font-semibold text-white flex items-center justify-between">
            <span>Cobrar</span>
            <span className="opacity-80">12:45</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
            <p className="text-[13px] text-slate-500">Total a pagar</p>
            <p className="text-[32px] font-extrabold text-[#071A35] leading-tight">$35.990</p>
            <span className="mt-4 w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <CircleCheck className="w-9 h-9 text-emerald-500" />
            </span>
            <p className="mt-2 text-[16px] font-bold text-emerald-600">Pago aprobado</p>
            <p className="mt-5 w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#071A35] py-2.5 text-[13px] font-semibold text-white">
              <Printer className="w-4 h-4" /> Imprimiendo boleta
            </p>
          </div>
          {/* Reflejo del vidrio */}
          <span className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/25 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};
