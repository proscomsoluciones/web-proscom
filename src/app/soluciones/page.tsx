import ProblemsWeSolve from "@/components/ProblemsWeSolve";
import Solutions from "@/components/Solutions";
import CTAFinal from "@/components/Ctafinal";

export default function SolucionesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Soluciones Integrales
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Gestión inteligente para cada necesidad de tu organización.
        </p>
      </div>
      <ProblemsWeSolve />
      <Solutions />
      <CTAFinal />
    </main>
  );
}
