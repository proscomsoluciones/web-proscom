import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import NewFooter from "@/components/NewFooter";
import NewNav from "@/components/NewNav";
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
  title: "Proscom | Software Regional con Impacto en Latam",
  description:
    "Desarrollo de software en la Quinta Región con experiencia en Colombia, México, Argentina y Perú. Sistemas a medida desde el Aconcagua hasta Valparaíso.",
  keywords: [
    "software internacional chile",
    "sistemas gestion quinta region",
    "desarrollador san felipe",
    "tecnologia viña del mar",
    "consultoria software mexico colombia argentina peru",
    "Proscom",
  ],
  authors: [{ name: "Proscom" }],
  openGraph: {
    title: "Proscom | Software Regional con Impacto en Latam",
    description:
      "Desarrollo de software en la Quinta Región con experiencia en Colombia, México, Argentina y Perú.",
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
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#020202] text-white selection:bg-blue-500/30`}
      >
        <ModalProvider>
          {/* Header global renovado */}
          <NewNav />
          
          {/* Contenido principal */}
          <main className="overflow-hidden">{children}</main>

          {/* Footer global renovado */}
          <NewFooter />

          {/* Global Modal para Demos */}
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
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
