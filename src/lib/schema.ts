import { siteConfig } from "@/config/site";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logotipo.png`,
    image: `${siteConfig.url}/images/hero/header-hero.png`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.4018,
      longitude: -70.5756,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Región Metropolitana",
      },
      {
        "@type": "AdministrativeArea",
        name: "Región de Valparaíso",
      },
      {
        "@type": "Country",
        name: "Chile",
      },
    ],
    priceRange: "$$",
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
    knowsAbout: [
      "Desarrollo de software a medida",
      "Aplicaciones web",
      "Aplicaciones móviles",
      "Sistemas de gestión empresarial",
      "Punto de Venta POS",
      "Integración de APIs",
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function getFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getServiceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    description: service.description,
    areaServed: {
      "@type": "Country",
      name: "Chile",
    },
    url: `${siteConfig.url}/servicios/${service.slug}`,
  };
}
