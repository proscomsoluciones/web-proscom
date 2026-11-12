export const siteConfig = {
  name: "Proscom",
  legalName: "PROSCOM SPA",
  slogan: "Soluciones de control y gestión",
  headline: "Tu negocio ordenado, vendiendo más",
  description:
    "Ayudamos a negocios y organizaciones de Chile a vender más y ordenarse: páginas web, tiendas online, cobros con tarjeta y sistemas de ventas, stock y caja. Te explicamos todo en simple.",
  url: "https://www.proscom.cl",
  founderExperienceYears: "15+",
  location: {
    address: "Av. Presidente Kennedy N° 5.600, Of. 507",
    city: "Vitacura",
    region: "Región Metropolitana",
    country: "Chile",
    full: "Av. Presidente Kennedy N° 5.600, Of. 507, Vitacura, Región Metropolitana",
    coverage: "Región Metropolitana, Región de Valparaíso y todo Chile",
  },
  contact: {
    phone: "+56 9 7561 0245",
    phoneRaw: "56975610245",
    email: "contacto@proscom.cl",
    whatsappUrl: "https://wa.me/56975610245",
    whatsappDefaultMessage:
      "Hola, vi la página de Proscom y me gustaría conversar sobre cómo pueden ayudar a mi negocio",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/proscom-cl",
    instagram: "https://www.instagram.com/proscom.cl",
    github: "https://github.com/proscom",
  },
  navigation: [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Sistemas listos", href: "/soluciones" },
    { name: "Casos de éxito", href: "/proyectos" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ],};

export type SiteConfig = typeof siteConfig;
