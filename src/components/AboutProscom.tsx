export default function AboutProscom() {
  return (
    <section className="py-24 bg-[#0F0F0F] border-y border-white/5">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="text-sm text-blue-400 font-medium">Sobre Proscom</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Socio tecnológico para el orden y la eficiencia
            </h2>
          </div>
          <div className="text-gray-400 text-lg leading-relaxed space-y-6">
            <p>
              Proscom nace con el objetivo de convertirse en un socio tecnológico para organizaciones que necesitan orden, control y eficiencia.
            </p>
            <p>
              Trabajamos bajo una lógica producto–negocio, donde la tecnología es un medio para generar valor, crecimiento y sostenibilidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
