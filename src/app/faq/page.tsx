export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Preguntas Frecuentes
        </h1>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Aquí puedes agregar las preguntas y respuestas */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">
              ¿Qué servicios ofrecen?
            </h2>
            <p className="text-gray-400">
              Ofrecemos soluciones integrales de gestión y tecnología para
              organizaciones.
            </p>
          </div>
          {/* Agrega más preguntas aquí */}
        </div>
      </div>
    </main>
  );
}
