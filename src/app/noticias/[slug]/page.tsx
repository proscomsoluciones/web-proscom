"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import { newsData } from '@/data/news';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug;
  const [mounted, setMounted] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState('');

  React.useEffect(() => {
    setMounted(true);
    setCurrentUrl(window.location.href);
  }, []);

  const article = newsData.find(item => item.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Noticia no encontrada</h1>
          <Link href="/" className="text-blue-600 font-bold hover:underline">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header / Hero of the Article */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href="/#noticias"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 group transition-colors"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Volver a Noticias
              </Link>
              
              <span className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                {article.category}
              </span>
              
              <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={18} /> {article.date}
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} /> {article.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} /> 4 min de lectura
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 -mt-12 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Article Content */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-grow bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-gray-200/50"
          >
            <div 
              className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            >
            </div>

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
               <p className="font-bold text-[#002B5B]">¿Te gustó este artículo? Compártelo:</p>
               <div className="flex gap-4">
                  {/* WhatsApp */}
                  <a 
                    href={`https://wa.me/?text=Mira esta noticia de Proscom: ${article.title} - ${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm hover:shadow-md"
                    title="Compartir en WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>

                  {/* Facebook */}
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md"
                    title="Compartir en Facebook"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  </a>

                  {/* Native Share / Copy Link */}
                  <button 
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: article.title,
                                text: article.excerpt,
                                url: currentUrl,
                            }).catch((error) => {
                                if (error.name !== 'AbortError') {
                                    console.error('Error al compartir:', error);
                                }
                            });
                        } else {
                            navigator.clipboard.writeText(currentUrl);
                            alert('¡Enlace copiado al portapapeles!');
                        }
                    }}
                    className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#002B5B] hover:text-white transition-all shadow-sm hover:shadow-md"
                    title="Compartir o Copiar Enlace"
                  >
                     <Share2 size={20} />
                  </button>
               </div>
            </div>
          </motion.article>

          {/* Sidebar / Sidebar Info */}
          <aside className="lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
               <h4 className="text-[#002B5B] font-black mb-4">¿Necesitas asesoría?</h4>
               <p className="text-gray-600 text-sm mb-6 leading-relaxed"> Digitaliza tu negocio con expertos en el Valle del Aconcagua.</p>
               <Link 
                  href="/#contacto"
                  className="block w-full text-center py-4 bg-[#002B5B] text-white font-bold rounded-xl hover:bg-black transition-all"
               >
                  Contactar ahora
               </Link>
            </div>

            <div className="p-8">
               <h4 className="text-[#002B5B] font-black mb-6">Otras Noticias</h4>
               <div className="space-y-6">
                  {newsData.filter(item => item.slug !== slug).map(item => (
                    <Link key={item.id} href={`/noticias/${item.slug}`} className="group block">
                       <p className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">{item.category}</p>
                       <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                          {item.title}
                       </p>
                    </Link>
                  ))}
               </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
