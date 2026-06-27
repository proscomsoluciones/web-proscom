"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileWarning, ArrowRight, Shield } from 'lucide-react';

const ModernCybersecurity = () => {
  return (
    <section id="ciberseguridad" className="py-24 bg-gray-50 relative border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#002B5B] mb-8 leading-tight">
              Ciberseguridad y <br /> Protección de Datos
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Preparamos a su empresa para el cumplimiento de las normativas vigentes en Chile (Ley N° 21.719 Marco sobre Ciberseguridad y protección de datos). Aseguramos la confidencialidad, integridad y disponibilidad de su información crítica corporativa.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  icon: <ShieldCheck className="w-8 h-8 text-[#002B5B]" />,
                  title: "Auditoría de Cumplimiento",
                  desc: "Evaluación de brechas (Gap Analysis) frente a la Ley Marco de Ciberseguridad en Chile."
                },
                {
                  icon: <Lock className="w-8 h-8 text-[#002B5B]" />,
                  title: "Arquitectura Segura",
                  desc: "Implementación de cifrado end-to-end y protocolos de seguridad en la capa de software."
                },
                {
                  icon: <FileWarning className="w-8 h-8 text-[#002B5B]" />,
                  title: "Prevención de Fugas (DLP)",
                  desc: "Monitoreo y políticas restrictivas para evitar la exposición de datos sensibles."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#002B5B] mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <button className="px-8 py-4 bg-[#002B5B] text-white text-sm font-bold tracking-wide rounded-full shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-3">
                Agendar Consultoría de Seguridad <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-square bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl flex items-center justify-center">
                 {/* Decorative background pattern */}
                 <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #002B5B 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
                 
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   className="relative w-64 h-64 md:w-80 md:h-80 border border-gray-200 rounded-full flex items-center justify-center border-dashed z-10"
                 >
                   <motion.div 
                     animate={{ rotate: -360 }}
                     transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                     className="w-48 h-48 md:w-60 md:h-60 border border-blue-100 rounded-full flex items-center justify-center bg-blue-50/30"
                   >
                      <motion.div 
                         animate={{ scale: [1, 1.05, 1] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                         className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-md z-10"
                      >
                         <Shield className="w-10 h-10 text-[#002B5B]" />
                      </motion.div>
                   </motion.div>
                 </motion.div>
                 
                 {/* Floating Badges */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-1/4 right-[10%] px-4 py-2 bg-white border border-gray-100 rounded-full shadow-md z-20 flex items-center gap-2"
                 >
                   <div className="w-2 h-2 rounded-full bg-green-500" />
                   <span className="text-xs font-bold text-gray-800">Encrypted 256-bit</span>
                 </motion.div>
                 
                 <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-1/4 left-[10%] px-4 py-2 bg-[#002B5B] border border-[#002B5B] rounded-full shadow-lg z-20"
                 >
                   <span className="text-xs font-bold text-white">Ley N° 21.719</span>
                 </motion.div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ModernCybersecurity;

