"use client";

import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-gray-400 py-16 border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white mb-4 block">
            Proscom
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Desarrollamos <strong>soluciones de gestión</strong> y <strong>control administrativo</strong> para transformar la operación de organizaciones e industrias.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/proscom_oficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/proscom-innovar-es-crecer"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.tiktok.com/@proscom_oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 border border-transparent hover:border-white/20"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Services */}
        {/* Soluciones */}
        <div>
          <h3 className="text-white font-semibold mb-6">Soluciones</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/soluciones" className="hover:text-blue-400 transition-colors">Gestión Organizacional</Link></li>
            <li><Link href="/soluciones" className="hover:text-blue-400 transition-colors">Gestión Documental</Link></li>
            <li><Link href="/soluciones" className="hover:text-blue-400 transition-colors">Educación</Link></li>
            <li><Link href="/soluciones" className="hover:text-blue-400 transition-colors">Sectores Productivos</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-6">Empresa</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/nosotros" className="hover:text-blue-400 transition-colors">Sobre Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-6">Contacto</h3>
          <ul className="space-y-3 text-sm">
<li className="flex items-start gap-3">
  <a href="mailto:jcornejo@proscom.cl" className="hover:text-white transition-colors flex items-center gap-2">
    <FaEnvelope className="text-blue-500" />
    <span>jcornejo@proscom.cl</span>
  </a>
</li>
<li className="flex items-start gap-3">
  <a href="tel:+56975610245" className="hover:text-white transition-colors flex items-center gap-2">
    <FaPhoneAlt className="text-blue-500" />
    <span>+56 9 7561 0245</span>
  </a>
</li>
<li className="flex items-start gap-3">
  <FaMapMarkerAlt className="text-blue-500" />
  <span>Quinta Región, Chile</span>
</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Proscom. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
