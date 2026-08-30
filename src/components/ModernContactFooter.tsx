"use client";

import React from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { sendEmail } from '@/app/actions/sendEmail';
import ProscomLogo from './ProscomLogo';

const ContactFooter = () => {
  const [isSending, setIsSending] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);
    
    setIsSending(false);
    if (result.success) {
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      alert("Error al enviar el mensaje. Intente de nuevo.");
    }
  };
  return (
    <footer id="contacto" className="pt-24 pb-12 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Header section in footer */}
        <div className="mb-12 text-center lg:text-left max-w-3xl">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">Contacto Corporativo</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#002B5B]">Hablemos de su Próximo Proyecto Enterprise</h2>
        </div>

        {/* Main Blue Box */}
        <div className="bg-[#002B5B] rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-black">
            
            {/* Form Section */}
            <div className="lg:col-span-7">
              {isSuccess ? (
                <div className="bg-green-500/10 border border-green-500 rounded-2xl p-10 text-center text-white h-full flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-bold mb-4">¡Solicitud Enviada con Éxito!</h3>
                  <p className="text-gray-200">Un consultor de PROSCOM SpA se pondrá en contacto a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="firstName" type="text" placeholder="Nombre *" required className="bg-white rounded-lg px-6 py-4 outline-none border-none shadow-sm text-sm" />
                  <input name="lastName" type="text" placeholder="Apellido *" required className="bg-white rounded-lg px-6 py-4 outline-none border-none shadow-sm text-sm" />
                  <input name="email" type="email" placeholder="Email Corporativo *" required className="bg-white rounded-lg px-6 py-4 outline-none border-none shadow-sm text-sm" />
                  <input name="phone" type="tel" placeholder="Teléfono *" required className="bg-white rounded-lg px-6 py-4 outline-none border-none shadow-sm text-sm" />
                  <textarea name="message" placeholder="Describa los requerimientos de su empresa u organización *" required className="md:col-span-2 bg-white rounded-lg px-6 py-4 outline-none border-none shadow-sm h-32 resize-none text-sm"></textarea>
                  <button 
                    disabled={isSending}
                    type="submit" 
                    className="md:col-span-2 bg-[#001D3D] text-white font-bold py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg text-sm"
                  >
                    {isSending ? "Enviando Solicitud..." : "Enviar Solicitud Corporativa"}
                  </button>
                </form>
              )}
            </div>

            {/* Corporate Info & Map Section */}
            <div className="lg:col-span-5 flex flex-col gap-6">
               {/* Corporate Card Details */}
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-white space-y-4">
                  <div className="pb-2 border-b border-white/10">
                     <ProscomLogo variant="light" showTagline={true} showSpABadge={true} />
                  </div>
                  <div className="flex items-center gap-3">
                     <Building2 className="w-5 h-5 text-blue-300 shrink-0" />
                     <div>
                        <p className="font-bold text-base text-white">PROSCOM SPA</p>
                        <p className="text-xs text-blue-200">Soluciones Tecnológicas Corporativas</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3 border-t border-white/10 pt-3">
                     <MapPin className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-xs font-semibold">Casa Matriz:</p>
                        <p className="text-xs text-gray-200 leading-snug">
                           Av. Presidente Kennedy N° 5.600, Of. 507<br />
                           Vitacura, Región Metropolitana, Chile
                        </p>
                     </div>
                  </div>
               </div>

               {/* Interactive Google Map of Vitacura */}
               <div className="bg-white rounded-2xl overflow-hidden h-full min-h-[220px] border border-gray-200 shadow-lg relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.6868516766487!2d-70.57321492348557!3d-33.40532299516641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c93540a927a3%3A0xb30e71cbcfdfb78e!2sAv.%20Pres.%20Kennedy%205600%2C%20Vitacura%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl" 
                    className="w-full h-full grayscale opacity-90 border-0"
                    loading="lazy" 
                  ></iframe>
                  <div className="absolute top-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-gray-100 flex justify-between items-center">
                     <div>
                        <p className="text-xs font-bold text-gray-900">Oficinas Vitacura</p>
                        <p className="text-[10px] text-gray-500">Av. Pres. Kennedy 5600, Of. 507</p>
                     </div>
                     <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">PROSCOM SpA</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Socials & Links - Centered */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center text-center gap-6">
           <div className="text-xs font-bold text-gray-500 uppercase tracking-widest max-w-2xl">
              © {new Date().getFullYear()} PROSCOM SPA — Av. Presidente Kennedy N° 5.600, Of. 507, Vitacura, Región Metropolitana. Todos los derechos reservados.
           </div>
           
           <div className="flex gap-8 items-center">
              {[
                { 
                  name: 'Instagram', 
                  url: 'https://www.instagram.com/proscom.cl/', 
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.475 1.382.897.422.422.68.822.897 1.382.164.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.475.96-.897 1.382-.422.422-.822.68-1.382.897-.422.164-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.475-1.382-.897-.422-.422-.68-.822-.897-1.382-.164-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.475-.96.897-1.382.422-.422.822.68 1.382-.897.422-.164 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.152.26-2.917.557-.791.307-1.463.718-2.131 1.385-.668.667-1.079 1.34-1.385 2.131-.297.765-.499 1.637-.557 2.917-.058 1.28-.072 1.688-.072 4.947s.014 3.668.072 4.947c.058 1.28.26 2.152.557 2.917.307.791.718 1.463 1.385 2.131.667.668 1.34 1.079 2.131 1.385.765.297 1.637.499 2.917.557 1.28.058 1.688.072 4.947.072s3.668-.014 4.947-.072c1.28-.058 2.152-.26 2.917-.557.791-.307 1.463-.718 2.131-1.385.668-.667 1.079-1.34 1.385-2.131.297-.765.499-1.637.557-2.917.058-1.28.072-1.688.072-4.947s-.014-3.668-.072-4.947c-.058-1.28-.26-2.152-.557-2.917-.307-.791-.718-1.463-1.385-2.131-.667-.668-1.34-1.079-2.131-1.385-.765-.297-1.637-.499-2.917-.557-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )
                },
                { 
                  name: 'Facebook', 
                  url: 'https://www.facebook.com/people/Proscomcl/61583471728854/', 
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  )
                }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#002B5B] hover:text-[#00529B] transition-all hover:scale-110 active:scale-95"
                >
                  {social.icon}
                </a>
              ))}
           </div>
        </div>
      </div>

      {/* WhatsApp Floating Button - Corrected Design */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 group">
         {/* Label */}
         <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 translate-x-4 lg:group-hover:translate-x-0 pointer-events-none">
            <p className="text-[#002B5B] text-sm font-bold whitespace-nowrap">¡Hola! ¿Conversamos?</p>
         </div>
         
         <a 
            href="https://wa.me/56975610245" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative block"
         >
            {/* Pulse Effect */}
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
            
            {/* Button Container */}
            <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.4)] cursor-pointer hover:scale-110 transition-transform active:scale-95 overflow-hidden">
               {/* Icon SVG - Simple and scalable */}
               <svg 
                  className="w-10 h-10 text-white" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
               >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
               </svg>
            </div>
         </a>
      </div>
    </footer>
  );
};

export default ContactFooter;
