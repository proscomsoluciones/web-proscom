# Nueva Web Corporativa - Proscom.cl

Sitio web corporativo oficial de **PROSCOM SPA** ([https://www.proscom.cl](https://www.proscom.cl)), empresa chilena especializada en desarrollo de software a medida, aplicaciones móviles, plataformas de gestión y soluciones tecnológicas con sede en Av. Presidente Kennedy N° 5.600, Of. 507, Vitacura, Región Metropolitana, y cobertura en todo Chile.

---

## 1. Identidad Corporativa y Veracidad de la Información

- **Eslogan:** Soluciones de control y gestión.
- **Mensaje Principal:** "Transformamos ideas en soluciones tecnológicas".
- **Trayectoria:** Más de 15 años de experiencia técnica de su fundador en análisis, programación y desarrollo web. *(No afirmar constitución formal de 15 años ni inventar datos ficticios)*.
- **Separación de Portafolio:**
  - **Soluciones Propias:** Proscom Org, Carta Digital, QueBuenDato.
  - **Proyectos a Medida para Terceros:** LegalFirma, WOWPOS, WOW Ticket, Asociación de Fútbol de Catemu, Fundación Miguel Ángel Gamboa, San José de los Andes, RoutePay (identificados explícitamente como *"Proyecto desarrollado a medida para cliente"*).
- **Logotipo:** Se utiliza el archivo original corporativo oficial en `public/brand/logotipo.png` (fondos claros) y `public/brand/logotipo-light.png` (fondos oscuros), respetando proporciones, formas y tipografía original.

---

## 2. Stack Tecnológico

- **Framework:** Next.js 16 (App Router con Turbopack)
- **Lenguaje:** TypeScript 5 (tipado estricto)
- **Librería UI:** React 19
- **Estilos:** Tailwind CSS v4 con variables corporativas en `@theme`
- **Iconografía:** Lucide React (SVGs optimizados)
- **Formularios & Validación:** React Hook Form + Zod
- **Tipografías:** Montserrat (títulos) e Inter (cuerpo) vía `next/font/google`
- **SEO & Rendimiento:** Metadata API, JSON-LD Schema.org, sitemap dinámico (`/sitemap.xml`), `robots.txt`, y headers de seguridad HTTP.

---

## 3. Estructura del Proyecto

```
proscom-web/
├── public/
│   ├── brand/                     # Logotipos originales de Proscom
│   └── images/                    # Capturas y composiciones gráficas reales
│       ├── hero/                  # header-hero.png
│       └── projects/              # legalfirma.jpg, invpos.jpg, sanjose.jpg, fichalo.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root Layout (Header sticky, Footer, Fuentes, Metadatos)
│   │   ├── page.tsx               # Página principal (Home de alta conversión)
│   │   ├── not-found.tsx          # 404 corporativo accesible
│   │   ├── error.tsx              # Boundary de error
│   │   ├── robots.ts              # Generador dinámico robots.txt
│   │   ├── sitemap.ts             # Generador dinámico sitemap.xml
│   │   ├── api/contact/route.ts   # Endpoint POST con Zod, honeypot y webhook
│   │   ├── servicios/             # Catálogo y subpáginas de los 6 servicios
│   │   ├── soluciones/            # Productos propios (Proscom Org, Carta Digital, etc.)
│   │   ├── proyectos/             # Portafolio y casos reales de clientes
│   │   ├── nosotros/              # Historia, 15+ años experiencia y metodología
│   │   ├── contacto/              # Formulario funcional y canales directos
│   │   ├── politica-de-privacidad/# Borrador legal
│   │   └── terminos-y-condiciones/# Borrador legal
│   ├── components/
│   │   ├── layout/                # Header y Footer responsivos
│   │   ├── ui/                    # Button, Badge, FaqAccordion, WhatsAppButton, CurrentYear
│   │   ├── home/                  # Secciones modulares de la página de inicio
│   │   ├── contact/               # ContactForm con React Hook Form y Zod
│   │   └── projects/              # ProjectsGallery con filtros por categoría
│   ├── config/
│   │   └── site.ts                # Configuración de contacto, WhatsApp y cobertura
│   ├── data/
│   │   ├── services.ts            # Datos tipados de servicios
│   │   ├── solutions.ts           # Datos tipados de soluciones propias
│   │   ├── projects.ts            # Casos reales con flag isClientProject y isAuthorized
│   │   └── methodology.ts         # Las 6 etapas de trabajo
│   ├── lib/
│   │   ├── schema.ts              # Generadores de Schema.org JSON-LD
│   │   └── validation.ts          # Esquemas Zod para formularios
│   └── types/                     # Interfaces TypeScript
├── next.config.ts                 # Cabeceras de seguridad e imágenes
└── package.json
```

---

## 4. Instalación y Ejecución Local

### Prerrequisitos
- Node.js 20+ o superior (probado en Node.js v25)
- npm 10+ o superior

### Instalación de dependencias
```bash
npm install
```

### Configuración de variables de entorno
```bash
cp .env.example .env.local
```

### Servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Verificación de código y linter
```bash
npm run lint
```

### Compilación para producción
```bash
npm run build
```

---

## 5. Despliegue en Vercel

1. Vincular el repositorio Git a una cuenta de Vercel.
2. Seleccionar el framework preestablecido: **Next.js**.
3. Configurar las variables de entorno en el panel de Vercel:
   - `NEXT_PUBLIC_SITE_URL`: `https://www.proscom.cl`
   - `NEXT_PUBLIC_WHATSAPP_PHONE`: `56975610245`
   - `CONTACT_WEBHOOK_URL`: (Opcional, endpoint seguro de notificaciones o API externa)
4. Ejecutar el despliegue automático con cada push a la rama `main`.
5. Apuntar el dominio `proscom.cl` a los DNS/CNAME de Vercel según la documentación del proveedor de dominio.

---

## 6. Checklist de Puesta en Producción

- [x] **Identidad visual:** Logotipo corporativo original integrado sin distorsión.
- [x] **Navegación:** Enlaces internos, Header sticky con efecto cristal y menú móvil accesible.
- [x] **Formularios:** Validación en cliente y servidor con Zod y trampa honeypot antispam.
- [x] **WhatsApp:** Botón flotante accesible con mensaje predefinido y medición de clics.
- [x] **SEO Técnico:** Metadatos completos, OpenGraph, Canonical URLs, Sitemap XML dinámico y JSON-LD Organization.
- [x] **Rendimiento:** Compilación estática Next.js 16 Turbopack (33 rutas prerenderizadas).
- [x] **Seguridad:** Headers HTTP (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- [x] **Textos legales:** Borradores claramente advertidos para revisión jurídica antes de publicación.
