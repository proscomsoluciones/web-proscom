import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/politica-de-privacidad", "/terminos-y-condiciones"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
