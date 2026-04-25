"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { newsData } from '@/data/news';

const ModernNews = () => {
  return (
    <section id="noticias" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-[#002B5B] mb-6">
              Actualidad & Noticias
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Compartimos conocimientos, avances tecnológicos y el impacto de nuestros proyectos en el Valle del Aconcagua.
            </p>
          </div>
          <Link href="/noticias" className="hidden md:flex items-center gap-2 text-[#00529B] font-bold hover:gap-4 transition-all duration-300">
            Ver todas las noticias <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#002B5B] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {item.date}</span>
                  <span className="flex items-center gap-1.5"><User size={14} /> {item.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-[#002B5B] mb-4 group-hover:text-[#00529B] transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.excerpt}
                </p>

                <div className="pt-6 border-t border-gray-50">
                  <Link 
                    href={`/noticias/${item.slug}`}
                    className="flex items-center gap-2 text-sm font-bold text-[#002B5B] group-hover:gap-4 transition-all duration-300"
                  >
                    Leer más <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 md:hidden">
          <Link href="/noticias" className="w-full flex justify-center items-center gap-2 text-[#00529B] font-bold">
            Ver todas las noticias <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModernNews;
