import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ModernNav from "@/components/ModernNav";
import Script from "next/script";
import { ModalProvider } from "@/context/ModalContext";
import DemoModal from "@/components/DemoModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PROSCOM SpA | Soluciones Tecnológicas Corporativas & Software Enterprise",
  description:
    "PROSCOM SpA. Soluciones tecnológicas corporativas, ingeniería de software a medida, ciberseguridad avanzada y transformación digital para grandes empresas en Chile y Latam.",
  keywords: [
    "PROSCOM SPA",
    "proscom chile",
    "software corporativo chile",
    "desarrollo de software enterprise",
    "ciberseguridad empresas chile",
    "desarrollo web corporativo",
    "consultoria tecnologica vitacura",
    "software vitacura santiago",
    "Proscom Juan Ramon Cornejo",
  ],
  authors: [{ name: "PROSCOM SPA" }],
  publisher: "PROSCOM SPA",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.proscom.cl",
  },
  openGraph: {
    title: "PROSCOM SpA | Soluciones Tecnológicas Corporativas & Software Enterprise",
    description:
      "Digitalizamos y potenciamos grandes empresas con ingeniería de software de clase mundial, ciberseguridad y arquitectura cloud escalable.",
    url: "https://www.proscom.cl",
    siteName: "PROSCOM SpA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PROSCOM SpA — Soluciones Tecnológicas Corporativas",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PROSCOM SpA | Soluciones Tecnológicas Corporativas",
    description: "Ingeniería de software, ciberseguridad empresarial y transformación digital de alto impacto.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-white text-brand-navy selection:bg-brand-navy/10`}
      >
        <ModalProvider>
          <ModernNav />
          
          {/* Contenido principal */}
          <main className="overflow-hidden">{children}</main>

          {/* Global Modal para Demos */}
          <DemoModal />
        </ModalProvider>

        {/* JSON-LD Schema para Google */}
        <Script id="proscom-jsonld" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Corporation",
              "name": "PROSCOM SpA",
              "legalName": "PROSCOM SPA",
              "vatID": "78497846-K",
              "taxID": "78.497.846-K",
              "url": "https://www.proscom.cl",
              "logo": "https://www.proscom.cl/og-image.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Avenida Presidente Kennedy 5600, Of. 507",
                "addressLocality": "Vitacura",
                "addressRegion": "Región Metropolitana",
                "postalCode": "7630000",
                "addressCountry": "CL"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+56975610245",
                "contactType": "customer service",
                "areaServed": "CL",
                "availableLanguage": ["Spanish", "English"]
              },
              "description": "Compañía de soluciones tecnológicas corporativas, ingeniería de software a medida, ciberseguridad y transformación digital."
            }
          `}
        </Script>
      </body>
    </html>
  );
}
