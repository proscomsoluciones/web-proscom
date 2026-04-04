import React, { ElementType } from 'react';

interface BentoCardProps {
  icon: ElementType;
  title: string;
  desc: string;
  highlight?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ icon: Icon, title, desc, highlight }) => {
  return (
    <div className={`p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
      highlight 
        ? 'bg-blue-600/10 border-blue-500/30 md:col-span-2 shadow-[0_0_30px_rgba(37,99,235,0.15)]' 
        : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
    }`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 ${
        highlight ? 'bg-blue-500 text-white' : 'bg-white/5 text-blue-500'
      }`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
};

export default BentoCard;
