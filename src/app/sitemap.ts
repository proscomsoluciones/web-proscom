import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { solutionsData } from "@/data/solutions";
import { projectsData } from "@/data/projects";
import { learnTopics } from "@/data/learn";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soluciones`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ley-proteccion-datos-chile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/herramientas/creador-de-marcos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // Dynamic services routes
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic solutions routes
  const solutionRoutes: MetadataRoute.Sitemap = solutionsData.map((sol) => ({
    url: `${baseUrl}/soluciones/${sol.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic projects routes (authorized only)
  const projectRoutes: MetadataRoute.Sitemap = projectsData
    .filter((p) => p.isAuthorized)
    .map((proj) => ({
      url: `${baseUrl}/proyectos/${proj.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  // Centro de aprendizaje
  const learnRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/aprende`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...learnTopics.map((t) => ({
      url: `${baseUrl}/aprende/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...serviceRoutes, ...solutionRoutes, ...projectRoutes, ...learnRoutes];
}
