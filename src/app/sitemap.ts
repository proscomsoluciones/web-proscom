import { MetadataRoute } from "next";
import { projects } from "@/data/proyectos";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.proscom.cl";

  // Rutas estáticas
  const staticRoutes = [
    "",
    "/nosotros",
    "/servicios",
    "/contacto",
    "/faq",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Rutas dinámicas de proyectos
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/proyectos/${project.slug}`,
    lastModified: new Date(project.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}
