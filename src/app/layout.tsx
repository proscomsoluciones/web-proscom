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
  title: "Diseño de Páginas Web en el Valle del Aconcagua | Proscom Software",
  description:
    "Desarrollo de software y páginas web de alto impacto en todo el Valle del Aconcagua. Soluciones tecnológicas corporativas desde San Felipe y Los Andes para todo Chile y Latam.",
  keywords: [
    "paginas web san felipe",
    "diseño web los andes",
    "creacion de paginas web aconcagua",
    "desarrollo de software san felipe",
    "programador de paginas web los andes",
    "agencia digital san felipe",
    "ecommerce san felipe los andes",
    "software a medida san felipe",
    "Proscom Juan  Ramon Cornejo",
  ],
  authors: [{ name: "Proscom" }],
  publisher: "Proscom",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.proscom.cl",
  },
  openGraph: {
    title: "Proscom | Software Regional con Impacto en Latam",
    description:
      "Digitalizamos tu empresa con estándares internacionales. Líderes en desarrollo de software en San Felipe, Los Andes y todo el Valle de Aconcagua.",
    url: "https://www.proscom.cl",
    siteName: "Proscom",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Proscom Software Regional & Latam",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proscom | Software Regional con Impacto en Latam",
    description: "Expertos en desarrollo de software y transformación digital en la Quinta Región.",
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
              "@type": "SoftwareApplication",
              "name": "Proscom",
              "operatingSystem": "All",
              "applicationCategory": "BusinessApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "12"
              },
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "CLP"
              },
              "author": {
                "@type": "Organization",
                "name": "Proscom",
                "url": "https://www.proscom.cl",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Catemu",
                  "addressRegion": "Valparaíso",
                  "addressCountry": "CL"
                }
              },
              "description": "Desarrollo de software a medida, e-commerce y apps en el Valle de Aconcagua."
            }
          `}
        </Script>
      </body>
    </html>
  );
}
