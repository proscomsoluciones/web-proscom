export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    slug: "digitalizacion-valle-aconcagua",
    title: "Digitalización del Valle del Aconcagua: El Futuro es Hoy",
    excerpt: "Cómo las empresas locales están adoptando tecnologías de vanguardia para competir a nivel nacional.",
    content: `
      <p>El Valle del Aconcagua está viviendo una transformación digital sin precedentes. En los últimos dos años, hemos visto un incremento masivo en la adopción de herramientas tecnológicas por parte de pequeñas y medianas empresas en San Felipe, Los Andes y comunas aledañas.</p>
      
      <p>Desde la implementación de sistemas de inventario en la nube hasta la creación de plataformas de e-commerce personalizadas, los empresarios locales están entendiendo que digitalizarse no es un lujo, sino una necesidad de supervivencia.</p>
      
      <h3>¿Por qué digitalizarse ahora?</h3>
      <p>La competencia hoy es global. Una empresa en Catemu puede vender sus productos a todo el país si cuenta con la plataforma adecuada. En Proscom, nos hemos especializado en acortar esa brecha, entregando software de clase mundial con el conocimiento local que solo alguien del valle puede tener.</p>
      
      <p>Seguiremos trabajando para que el Valle del Aconcagua sea un polo tecnológico referente en la zona central de Chile.</p>
    `,
    date: "25 Abr, 2026",
    author: "Juan Ramón Cornejo",
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    slug: "lanzamiento-quebuendato",
    title: "Lanzamiento de QueBuenDato.cl en Catemu y Llay Llay",
    excerpt: "Nuestra nueva plataforma gratuita ya está ayudando a comerciantes locales a visibilizar sus negocios de forma digital.",
    content: `
      <p>Estamos orgullosos de presentar oficialmente <strong>QueBuenDato.cl</strong>, una plataforma nacida en el corazón del Valle del Aconcagua para apoyar al comercio local.</p>
      
      <p>El proyecto nació como una respuesta a la necesidad de digitalización de los pequeños comerciantes en zonas como Catemu, Llay Llay y Panquehue, quienes muchas veces no cuentan con las herramientas necesarias para destacar en el mundo digital.</p>
      
      <h3>Impacto en la Comunidad</h3>
      <p>La plataforma ya ha comenzado a registrar a sus primeros comercios, desde emprendimientos locales hasta servicios profesionales. Lo mejor de todo: es y seguirá siendo totalmente gratis para el comercio de nuestra zona.</p>
      
      <p>Este es el compromiso social de Proscom: usar la tecnología para fortalecer y conectar a nuestra propia comunidad del Aconcagua.</p>
    `,
    date: "18 Abr, 2026",
    author: "Equipo Proscom",
    category: "Comunidad",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    slug: "sistemas-gestion-eficiencia",
    title: "Sistemas de Gestión: Eficiencia para Pymes Regionales",
    excerpt: "Descubre cómo un software a medida puede reducir tus costos operativos hasta en un 40%.",
    content: `
      <p>La eficiencia operativa es el pilar de cualquier negocio rentable. Sin embargo, muchas Pymes en nuestra región siguen gestionando sus procesos vitales en cuadernos o planillas Excel desarticuladas.</p>
      
      <p>En este artículo, analizamos cómo la implementación de un Sistema de Gestión (ERP) simplificado y a medida puede cambiar las reglas del juego.</p>
      
      <h3>Reducción de Costos</h3>
      <p>Hemos comprobado que al automatizar tareas repetitivas como la facturación, el control de stock y el seguimiento de pedidos, las empresas reducen sus errores humanos y ahorran tiempo valioso, lo que se traduce en una reducción directa de costos operativos.</p>
      
      <p>En Proscom, no instalamos software enlatado. Creamos la herramienta que tu negocio específicamente necesita.</p>
    `,
    date: "10 Abr, 2026",
    author: "Consultoría TI",
    category: "Negocios",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  }
];
