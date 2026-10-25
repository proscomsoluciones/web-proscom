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
    default: "Proscom | Soluciones de Control, Gestión y Desarrollo de Software",
    template: "%s | Proscom",
  },
  description:
    "Desarrollamos software a medida, aplicaciones móviles, sitios web y plataformas de gestión que ayudan a empresas y organizaciones a optimizar sus procesos y crecer en toda la Región de Valparaíso y Chile.",
  keywords: [
    "Desarrollo de software a medida Chile",
    "Desarrollo web Región de Valparaíso",
    "Empresas de desarrollo de software Chile",
    "Sistemas de gestión para empresas",
    "Desarrollo de aplicaciones móviles Chile",
    "Desarrollo de software Valparaíso",
    "Desarrollo de sistemas empresariales",
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
    title: "Proscom | Soluciones de Control y Gestión",
    description:
      "Transformamos ideas en soluciones tecnológicas. Software a medida, plataformas de gestión y desarrollo web profesional en Chile.",
    images: [
      {
        url: "/images/hero/header-hero.png",
        width: 1200,
        height: 630,
        alt: "Proscom - Transformamos ideas en soluciones tecnológicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proscom | Soluciones de Control y Gestión",
    description:
      "Desarrollo de software a medida, aplicaciones móviles y sistemas de gestión para empresas en Chile.",
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
