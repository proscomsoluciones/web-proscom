import { Users, Cpu, ShieldCheck, FileText, Globe, ShoppingCart, Smartphone } from 'lucide-react';
import BentoCard from './BentoCard';

const NewServices = () => (
  <section id="servicios" className="py-16 md:py-32 px-6 bg-[#020202] text-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-20 gap-8 text-left">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter italic text-blue-500 uppercase break-words">Soluciones Proyectadas al Futuro.</h2>
          <p className="text-gray-400 text-lg leading-relaxed">Infraestructura y desarrollo con estándares internacionales para la Quinta Región.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <BentoCard 
          icon={Globe}
          title="Desarrollo Web"
          desc="Sitios corporativos de alto impacto y Landing Pages optimizadas para conversión y SEO."
        />
        <BentoCard 
          icon={ShoppingCart}
          title="eCommerce"
          desc="Tiendas online robustas con integración de pasarelas de pago y gestión de inventario real."
        />
        <BentoCard 
          icon={Smartphone}
          title="Mobile Apps"
          desc="Aplicaciones móviles nativas e híbridas diseñadas para ofrecer la mejor UX del mercado."
        />
        <BentoCard 
          icon={Cpu}
          title="Software a Medida"
          desc="Desarrollo de sistemas complejos para optimizar procesos industriales y comerciales."
          highlight={true}
        />
        <BentoCard 
          icon={Users}
          title="Sistemas Vecinales"
          desc="Plataforma líder para la gestión eficiente de comunidades y organizaciones sociales."
        />
        <BentoCard 
          icon={FileText}
          title="Gestión Documental"
          desc="Soluciones de digitalización para transformar tu empresa hacia una cultura de papel cero."
        />
        <BentoCard 
          icon={ShieldCheck}
          title="Seguridad & Nube"
          desc="Infraestructura escalable con protocolos de seguridad de nivel consultoría internacional."
        />
      </div>
    </div>
  </section>
);

export default NewServices;
