export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  problemsSolved: string[];
  benefits: string[];
  features: string[];
  targetCompanies: string[];
  methodology: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedProjectSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Solution {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  detailedDescription: string;
  targetAudience: string[];
  problemsSolved: string[];
  confirmedFeatures: string[];
  benefits: string[];
  commercialStatus: "Disponible" | "En lanzamiento" | "Cotización directa";
  commercialModel: string;
  faqs: { question: string; answer: string }[];
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: "Software a medida" | "Sistemas de Gestión" | "Desarrollo web" | "Punto de Venta" | "Gestión Deportiva" | "Gestión Documental" | "Logística";
  clientOrSector: string;
  isClientProject: boolean;
  shortDescription: string;
  detailedDescription: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  image: string;
  publicUrl?: string;
  status: "Completado" | "En producción y soporte" | "En desarrollo";
  isAuthorized: boolean;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
}

export interface MethodologyStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
}
