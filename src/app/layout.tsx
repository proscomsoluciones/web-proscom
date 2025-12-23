import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

// 🔹 Metadata SEO profesional optimizada para la Quinta Región
export const metadata: Metadata = {
  title: "Proscom | Soluciones de gestión y control para organizaciones",
  description:
    "Plataformas digitales de gestión administrativa, financiera y documental para organizaciones e industrias productivas. Conoce Proscom.",
  keywords: [
    // Core
    "soluciones de gestión",
    "control y gestión",
    "plataformas de gestión",
    "sistemas de gestión",
    "gestión administrativa",
    "gestión financiera",
    "control administrativo",
    "digitalización de procesos",
    // Secondary
    "gestión organizacional",
    "control de procesos",
    "automatización administrativa",
    "software de gestión",
    "plataformas digitales de gestión",
    "Proscom",
  ],
  authors: [{ name: "Proscom" }],
  openGraph: {
    title: "Proscom | Soluciones de gestión y control para organizaciones",
    description:
      "Plataformas digitales de gestión administrativa, financiera y documental para organizaciones e industrias productivas. Conoce Proscom.",
    url: "https://www.proscom.cl",
    siteName: "Proscom",
    images: [
      {
        url: "https://www.proscom.cl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Proscom Soluciones de Gestión",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proscom | Soluciones de gestión y control para organizaciones",
    description:
      "Plataformas digitales de gestión administrativa, financiera y documental para organizaciones e industrias productivas.",
    images: ["https://www.proscom.cl/og-image.jpg"],
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
    <html lang="es">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#0a0a0a] text-white selection:bg-blue-500/30`}
      >
        <ModalProvider>
          {/* Header global */}
          <Header />
          
          {/* Contenido principal */}
          <main>{children}</main>

          {/* Footer global */}
          <Footer />

          {/* Global Modal */}
          <DemoModal />
        </ModalProvider>

        {/* JSON-LD Schema para Google */}
        <Script id="proscom-jsonld" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Proscom",
              "image": "https://www.proscom.cl/og-image.jpg",
              "@id": "https://www.proscom.cl",
              "url": "https://www.proscom.cl",
              "telephone": "+56 9 75610245",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ignacio Carrera Pinto",
                "addressLocality": "Catemu",
                "addressRegion": "Valparaíso",
                "postalCode": "0000000",
                "addressCountry": "CL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -32.876125,
                "longitude": -70.660629
              },
              "openingHoursSpecification": {
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": [
    "https://schema.org/Lunes",
    "https://schema.org/Martes",
    "https://schema.org/Miércoles",
    "https://schema.org/Jueves",
    "https://schema.org/Viernes"
  ],
  "opens": "09:00",
  "closes": "18:00"
},
              "sameAs": [
                "https://www.instagram.com/proscom_oficia",
                "https://www.linkedin.com/company/proscom"
              ]
            }
          `}
        </Script>
      </body>
    </html>
  );
}
