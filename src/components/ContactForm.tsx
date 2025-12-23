"use client";

import { Button } from "./ui/Button";

export default function ContactForm() {
  return (
    <section id="contacto" className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Conversemos
          </h2>
          <p className="text-gray-400">
            Déjanos tus datos y evaluemos cómo una solución de gestión puede mejorar tu operación.
          </p>
        </div>

        <form className="space-y-6 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">Nombre</label>
              <input 
                id="name" 
                type="text" 
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="org" className="text-sm font-medium text-gray-300">Organización</label>
              <input 
                id="org" 
                type="text" 
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Nombre de la empresa"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
              <input 
                id="email" 
                type="email" 
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="tucorreo@empresa.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sector" className="text-sm font-medium text-gray-300">Sector</label>
              <select 
                id="sector" 
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                defaultValue=""
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="social">Organización Social</option>
                <option value="deportivo">Deportes</option>
                <option value="educacion">Educación</option>
                <option value="productivo">Sector Productivo</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-gray-300">Asunto</label>
            <select 
              id="subject" 
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
              defaultValue="demo"
            >
              <option value="demo">Solicitar Demo</option>
              <option value="ventas">Contacto Comercial</option>
              <option value="soporte">Soporte Técnico</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-300">Mensaje</label>
            <textarea 
              id="message" 
              rows={4} 
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="¿Qué problema necesitas resolver?"
            />
          </div>

          <div className="pt-4">
             <Button variant="solid" className="w-full py-4 text-lg">
                Solicitar Contacto
             </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
