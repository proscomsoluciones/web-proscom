"use client";

import React from 'react';
import Link from 'next/link';

const ModernNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tighter text-black">
              Proscom<span className="text-[#002B5B]">.</span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-10 items-center">
            <Link href="/#servicios" className="text-sm font-semibold text-gray-700 hover:text-brand-navy transition-colors">
              Servicios
            </Link>
            <Link href="/#casos" className="text-sm font-semibold text-gray-700 hover:text-brand-navy transition-colors">
              Casos de Éxito
            </Link>
            <Link href="/#noticias" className="text-sm font-semibold text-gray-700 hover:text-brand-navy transition-colors">
              Noticias
            </Link>
            <Link href="/nosotros" className="text-sm font-semibold text-gray-700 hover:text-brand-navy transition-colors">
              Nosotros
            </Link>
            <Link href="/#contacto" className="text-sm font-semibold text-gray-700 hover:text-brand-navy transition-colors">
              Contacto
            </Link>
            <div className="flex items-center gap-6 ml-4">
              <Link 
                href="/#contacto"
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-[#002B5B] hover:bg-black transition-all duration-300"
              >
                Agendar Consultoría Gratuita
              </Link>
              
              <div className="flex items-center gap-4 border-l border-gray-200 pl-6 h-8">
                <a 
                  href="https://www.instagram.com/proscom.cl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#002B5B] hover:text-black transition-all hover:scale-110"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.475 1.382.897.422.422.68.822.897 1.382.164.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.475.96-.897 1.382-.422.422-.822.68-1.382.897-.422.164-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.475-1.382-.897-.422-.422-.68-.822-.897-1.382-.164-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.475-.96.897-1.382.422-.422.822.68 1.382-.897.422-.164 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.152.26-2.917.557-.791.307-1.463.718-2.131 1.385-.668.667-1.079 1.34-1.385 2.131-.297.765-.499 1.637-.557 2.917-.058 1.28-.072 1.688-.072 4.947s.014 3.668.072 4.947c.058 1.28.26 2.152.557 2.917.307.791.718 1.463 1.385 2.131.667.668 1.34 1.079 2.131 1.385.765.297 1.637.499 2.917.557 1.28.058 1.688.072 4.947.072s3.668-.014 4.947-.072c1.28-.058 2.152-.26 2.917-.557.791-.307 1.463-.718 2.131-1.385.668-.667 1.079-1.34 1.385-2.131.297-.765.499-1.637.557-2.917.058-1.28.072-1.688.072-4.947s-.014-3.668-.072-4.947c-.058-1.28-.26-2.152-.557-2.917-.307-.791-.718-1.463-1.385-2.131-.667-.668-1.34-1.079-2.131-1.385-.765-.297-1.637-.499-2.917-.557-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/people/Proscomcl/61583471728854/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#002B5B] hover:text-black transition-all hover:scale-110"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-navy p-2 outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-6 pt-2 pb-8 space-y-4">
            <Link href="/#servicios" className="block text-lg font-bold text-gray-800" onClick={() => setIsOpen(false)}>Servicios</Link>
            <Link href="/#casos" className="block text-lg font-bold text-gray-800" onClick={() => setIsOpen(false)}>Casos de Éxito</Link>
            <Link href="/#noticias" className="block text-lg font-bold text-gray-800" onClick={() => setIsOpen(false)}>Noticias</Link>
            <Link href="/nosotros" className="block text-lg font-bold text-gray-800" onClick={() => setIsOpen(false)}>Nosotros</Link>
            <Link href="/#contacto" className="block text-lg font-bold text-gray-800" onClick={() => setIsOpen(false)}>Contacto</Link>
            <Link 
              href="/#contacto"
              className="block w-full text-center py-4 bg-[#002B5B] text-white font-bold rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              Agendar Consultoría Gratuita
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ModernNav;
