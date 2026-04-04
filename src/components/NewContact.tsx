import React from 'react';
import { MessageSquare } from 'lucide-react';

const NewContact = () => {
  const whatsappNumber = "56975610245"; // Updated as requested
  const message = encodeURIComponent('Hola! Me interesa conversar sobre un proyecto de software para la Quinta Región.');
  
  return (
    <section id="contacto" className="py-20 md:py-40 px-6 relative bg-[#020202] text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10 text-center" />
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/[0.03] border border-white/10 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl backdrop-blur-xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter italic uppercase">¿Tu proyecto es <br />el próximo?</h2>
          <p className="text-gray-400 mb-12 italic text-lg">Hablemos de cómo digitalizar tu gestión con estándares internacionales.</p>
          
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-green-500/10 transform hover:scale-[1.02]"
          >
            <MessageSquare size={28} />
            WhatsApp Directo
          </a>
          <p className="mt-8 text-gray-600 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            Soporte regional prioritario
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewContact;
