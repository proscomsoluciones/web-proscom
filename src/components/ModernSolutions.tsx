"use client";

import React from 'react';
import { ShoppingCart, Smartphone, Cpu, Globe, Rocket, Lightbulb, ArrowRight, Monitor, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Solutions = () => {
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
              Asesoría experta con trayectoria en Colombia, México, Argentina y Perú. Traigo estándares internacionales al desarrollo de sistemas en el Aconcagua y la costa chilena, enfocados en diseño web y comercio electrónico de alto rendimiento.
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#002B5B] mb-8">Servicios Core</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'Diseño Web', icon: <Monitor className="w-8 h-8" /> },
                { title: 'E-commerce', icon: <ShoppingCart className="w-8 h-8" /> },
                { title: 'Apps', icon: <Smartphone className="w-8 h-8" /> },
                { title: 'SEO', icon: <Rocket className="w-8 h-8" /> },
                { title: 'Sistemas', icon: <Cpu className="w-8 h-8" /> },
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
