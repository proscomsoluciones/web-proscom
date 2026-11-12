import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getOrganizationSchema } from "@/lib/schema";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";
import { ConversionTracking } from "@/components/analytics/ConversionTracking";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#071A35",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Proscom | Soluciones para tu negocio: páginas web, ventas online y sistemas de gestión",
    template: "%s | Proscom",
  },
  description:
    "Ayudamos a negocios de Chile a vender por internet, cobrar fácil y ordenar ventas, stock y caja. Páginas web, tiendas online y sistemas de gestión sin tecnicismos.",
  keywords: [
    "Página web para mi negocio",
    "Tienda online Chile",
    "Sistema de ventas y stock",
    "Sistema de caja para negocio",
    "Cobros con tarjeta y link de pago",
    "Sistema para junta de vecinos",
    "Sistema a medida Chile",
    "Desarrollo web Región de Valparaíso",
    "Proscom Chile",
  ],
  authors: [{ name: "Proscom SpA", url: siteConfig.url }],
  creator: "Proscom",
  publisher: "Proscom",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Proscom | Tu negocio ordenado, vendiendo más",
    description:
      "Páginas web, tiendas online, cobros con tarjeta y sistemas de ventas, stock y caja para negocios de Chile. Te explicamos todo en simple.",
    images: [
      {
        url: "/images/hero/header-hero.png",
        width: 1200,
        height: 630,
        alt: "Proscom - Tu negocio ordenado, vendiendo más",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proscom | Tu negocio ordenado, vendiendo más",
    description:
      "Páginas web, tiendas online, cobros con tarjeta y sistemas de ventas, stock y caja para negocios de Chile.",
    images: ["/images/hero/header-hero.png"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-CL"
      className={`${montserrat.variable} ${inter.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Activa el sistema de animaciones antes del primer pintado (evita parpadeos) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#071A35] selection:bg-[#1688F5] selection:text-white">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1479D4] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Saltar al contenido principal
        </a>

        {/* Barra de progreso de lectura */}
        <ScrollProgress />

        {/* Global sticky header */}
        <Header />

        {/* Main content landmark */}
        <main id="main-content" className="flex-1 pt-[73px]">
          {children}
        </main>

        {/* Global corporate footer */}
        <Footer />

        {/* Motor global de animaciones (scroll reveal + spotlight) */}
        <MotionProvider />

        {/* Floating WhatsApp contact button */}
        <WhatsAppButton />

        {/* Vercel Analytics: visitas y páginas vistas */}
        <Analytics />

        {/* Google Analytics y medición de clics en WhatsApp, teléfono y correo */}
        <ConversionTracking />

        {/* JSON-LD Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
      </body>
    </html>
  );
}
