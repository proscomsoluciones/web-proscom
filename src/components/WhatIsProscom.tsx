

export default function WhatIsProscom() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            Qué es Proscom
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed">
            <p>
              Proscom desarrolla <strong>soluciones de gestión y control</strong> orientadas a organizaciones e industrias productivas, permitiendo mejorar la <strong>gestión administrativa y financiera</strong> mediante plataformas digitales fáciles de usar.
            </p>
            <p>
              No somos una agencia web tradicional. Nos especializamos en <strong>sistemas de gestión</strong> que resuelven problemas reales de <strong>control, trazabilidad y operación</strong>.
            </p>
            <div className="p-6 mt-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                <p className="font-medium text-white">
                  No vendemos páginas web ni software genérico. Diseñamos soluciones enfocadas en resolver problemas reales de gestión.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
