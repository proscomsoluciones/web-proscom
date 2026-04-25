"use client";

import React from 'react';
import { ShoppingCart, Smartphone, Cpu, Globe, Rocket, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Solutions = () => {
  const solutions = [
    {
      title: 'E-commerce',
      description: 'Plataformas de venta escalables con integración de pagos regionales.',
      icon: <ShoppingCart className="w-8 h-8" />,
    },
    {
      title: 'Apps',
      description: 'Experiencias móviles nativas y multiplataforma centradas en el usuario.',
      icon: <Smartphone className="w-8 h-8" />,
    },
    {
      title: 'Sistemas Industriales',
      description: 'Automatización y control de procesos para la industria moderna.',
      icon: <Cpu className="w-8 h-8" />,
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#002B5B] mb-8 leading-tight">
              Nuestras Soluciones <br /> de Software
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Asesoría experta con trayectoria en Colombia, México, Argentina y Perú. Traigo estándares internacionales al desarrollo de sistemas en el Aconcagua y la costa chilena.
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#002B5B] mb-8">Software a Medida</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'E-commerce', icon: <ShoppingCart className="w-8 h-8" /> },
                { title: 'Apps', icon: <Smartphone className="w-8 h-8" /> },
                { title: 'Web', icon: <Globe className="w-8 h-8" /> },
                { title: 'SEO', icon: <Rocket className="w-8 h-8" /> },
                { title: 'Sistemas de Gestión', icon: <Cpu className="w-8 h-8" /> },
                { title: 'Asesorías', icon: <Lightbulb className="w-8 h-8" /> }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm text-center group hover:bg-gray-50 transition-colors">
                  <div className="text-[#002B5B] mb-4 transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-800 tracking-tight leading-tight">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
