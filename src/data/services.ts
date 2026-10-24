import { Service } from "@/types";

export const servicesData: Service[] = [
  {
    id: "software-a-medida",
    slug: "software-a-medida",
    title: "Software a Medida",
    shortDescription:
      "Desarrollamos soluciones de software exclusivas, diseñadas para adaptarse exactamente a los flujos operativos y objetivos de tu empresa.",
    longDescription:
      "Cuando las soluciones genéricas del mercado limitan el crecimiento de tu empresa, el software a medida es la respuesta. En Proscom diseñamos plataformas personalizadas desde cero, garantizando que cada función, panel y reporte responda a la realidad operativa de tu organización, con código escalable y sin costos recurrentes por licencias innecesarias.",
    iconName: "Code2",
    problemsSolved: [
      "Dependencia de múltiples hojas de cálculo desconectadas propensas a errores humanos.",
      "Limitaciones y cobros excesivos por usuario de softwares comerciales enlatados.",
      "Falta de trazabilidad y control en procesos críticos del negocio.",
      "Pérdida de tiempo en tareas manuales repetitivas que podrían automatizarse.",
    ],
    benefits: [
      "100% adaptado a la forma de trabajar de tu equipo.",
      "Propiedad total de la solución sin pagos obligatorios por licencias externas.",
      "Capacidad de escalar y agregar nuevos módulos a medida que tu negocio crece.",
      "Integración nativa con tus sistemas y bases de datos actuales.",
    ],
    features: [
      "Paneles de administración y dashboards interactivos.",
      "Gestión de roles, permisos y auditoría de acciones.",
      "Generación de reportes ejecutivos en PDF y Excel en tiempo real.",
      "Arquitectura modular preparada para conectarse con APIs y servicios externos.",
    ],
    targetCompanies: [
      "Empresas medianas que buscan digitalizar su operación.",
      "Organizaciones que manejan flujos administrativos específicos.",
      "Emprendimientos y negocios en expansión con procesos únicos.",
    ],
    methodology: [
      { step: 1, title: "Levantamiento funcional", description: "Mapeamos cada proceso y definimos requerimientos clave." },
      { step: 2, title: "Arquitectura técnica", description: "Seleccionamos la mejor tecnología para asegurar velocidad y seguridad." },
      { step: 3, title: "Desarrollo iterativo", description: "Entregamos avances funcionales para revisión continua." },
      { step: 4, title: "Puesta en marcha y soporte", description: "Capacitamos a tu equipo y aseguramos una transición fluida." },
    ],
    faqs: [
      {
        question: "¿Por qué elegir software a medida en lugar de un software comercial?",
        answer:
          "El software comercial te obliga a adaptar tus procesos a su estructura y suele cobrar suscripciones mensuales por cada usuario. El desarrollo a medida se crea exactamente según tus necesidades, optimizando tus operaciones y eliminando sobrecostos a mediano plazo.",
      },
      {
        question: "¿Quién es dueño del código desarrollado?",
        answer:
          "Tu empresa es la propietaria del software y los datos generados. Entregamos soluciones llave en mano con plena transparencia.",
      },
      {
        question: "¿Cómo se coordina el mantenimiento después del lanzamiento?",
        answer:
          "Ofrecemos planes de soporte continuo, monitoreo preventivo y actualizaciones para que tu sistema se mantenga seguro y operativo 24/7.",
      },
    ],
    relatedProjectSlugs: ["wow-gas", "tesoreria-deportiva", "legalfirma", "routepay"],
    metaTitle: "Software a Medida en Chile | Desarrollo Empresarial - Proscom",
    metaDescription:
      "Desarrollo de software a medida para empresas y organizaciones en Chile. Creamos plataformas exclusivas adaptadas a tus operaciones y procesos.",
  },
  {
    id: "desarrollo-web",
    slug: "desarrollo-web",
    title: "Desarrollo de Páginas y Aplicaciones Web",
    shortDescription:
      "Creamos sitios web corporativos modernos, rápidos y orientados a la conversión, optimizados para SEO y dispositivos móviles.",
    longDescription:
      "Tu sitio web es el principal activo digital de tu empresa. En Proscom desarrollamos plataformas web corporativas con estándares de vanguardia: tiempos de carga instantáneos, diseño responsivo impecable, accesibilidad universal y arquitectura optimizada para posicionar en Google.",
    iconName: "Globe",
    problemsSolved: [
      "Sitios web lentos o desactualizados que proyectan una imagen poco profesional.",
      "Dificultades para ser encontrado en Google por potenciales clientes locales y nacionales.",
      "Páginas que no se adaptan correctamente a teléfonos inteligentes o tablets.",
      "Falta de llamadas a la acción claras para captar prospectos comerciales.",
    ],
    benefits: [
      "Tiempos de carga ultrarrápidos gracias a tecnologías modernas como Next.js.",
      "Diseño responsive pensado primero en dispositivos móviles.",
      "SEO técnico estructurado para destacar en búsquedas en Chile.",
      "Integración directa con WhatsApp y formularios para aumentar contactos.",
    ],
    features: [
      "Diseño UI/UX corporativo alineado con tu identidad de marca.",
      "Optimización Core Web Vitals y accesibilidad web WCAG.",
      "Formularios seguros con protección antispam.",
      "Botones interactivos de WhatsApp con mensajes predefinidos.",
    ],
    targetCompanies: [
      "Empresas y pymes que necesitan renovar su presencia digital corporativa.",
      "Instituciones educativas, fundaciones y gremios profesionales.",
      "Profesionales y consultoras que requieren transmitir credibilidad técnica.",
    ],
    methodology: [
      { step: 1, title: "Estrategia y contenidos", description: "Definimos la estructura de navegación y propuesta de valor." },
      { step: 2, title: "Diseño visual UI/UX", description: "Diseñamos una interfaz moderna y atractiva." },
      { step: 3, title: "Programación y optimización", description: "Implementamos con código limpio enfocado en velocidad y SEO." },
      { step: 4, title: "Lanzamiento y verificación", description: "Publicación con certificado SSL y configuración analítica." },
    ],
    faqs: [
      {
        question: "¿El sitio web estará optimizado para celulares?",
        answer:
          "Sí, todos nuestros desarrollos siguen el principio Mobile First, asegurando una experiencia perfecta en pantallas desde 360px hasta monitores 4K.",
      },
      {
        question: "¿Incluye optimización para buscadores (SEO)?",
        answer:
          "Absolutamente. Configuramos metadatos dinámicos, Open Graph, sitemaps XML y datos estructurados Schema.org para asegurar indexación rápida y profesional.",
      },
    ],
    relatedProjectSlugs: ["san-jose-de-los-andes", "fundacion-gamboa-gestion"],
    metaTitle: "Desarrollo Web Profesional en Chile | Sitios Corporativos - Proscom",
    metaDescription:
      "Páginas web corporativas y aplicaciones web modernas en Valparaíso y todo Chile. Alta velocidad, SEO técnico y diseño responsive orientado a conversión.",
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "E-Commerce y Tiendas Online",
    shortDescription:
      "Desarrollamos tiendas virtuales de alto rendimiento, escalables y optimizadas para convertir visitas en ventas y pedidos recurrentes.",
    longDescription:
      "Vende tus productos y servicios por internet sin fricciones. En Proscom creamos plataformas de comercio electrónico y tiendas virtuales a medida basadas en arquitecturas modernas y veloces: catálogo autogestionable, control de stock automatizado, carritos de compra optimizados en un solo paso y conexión con envíos a todo Chile.",
    iconName: "ShoppingCart",
    problemsSolved: [
      "Tiendas online lentas o mal estructuradas que provocan abandonos en el checkout.",
      "Dificultades para sincronizar el stock del local físico o bodega con la tienda online.",
      "Comisiones abusivas o falta de control sobre los datos y la base de clientes.",
      "Carritos de compra no optimizados para celulares ni dispositivos móviles.",
    ],
    benefits: [
      "Checkout optimizado en un solo paso para maximizar la tasa de conversión.",
      "Panel de administración intuitivo para cambiar precios, stock y promociones al instante.",
      "Sincronización directa con inventario, sistemas ERP y facturación electrónica.",
      "Velocidad de carga instantánea con principio Mobile-First y posicionamiento SEO.",
    ],
    features: [
      "Catálogo dinámico con variantes de producto (tallas, colores, atributos) y filtros avanzados.",
      "Cálculo automático de envíos por región y comuna (Chilexpress, Starken, Blue Express).",
      "Gestión de cupones de descuento, combos promocionales y ventas sugeridas (cross-selling).",
      "Notificaciones automáticas del estado de la compra por correo y WhatsApp.",
    ],
    targetCompanies: [
      "Comercios, importadoras y distribuidores que desean vender a todo Chile.",
      "Marcas y fabricantes que buscan un canal de venta directa al consumidor (D2C).",
      "Pymes y emprendimientos que necesitan profesionalizar su presencia comercial digital.",
    ],
    methodology: [
      { step: 1, title: "Estrategia comercial y catálogo", description: "Definimos categorías, variantes, medios de despacho y flujo de compra." },
      { step: 2, title: "Diseño UX/UI orientado a ventas", description: "Diseñamos una tienda moderna, visualmente atractiva y fácil de navegar." },
      { step: 3, title: "Desarrollo y sincronización", description: "Programamos catálogo, carrito, cálculo de envíos e inventario en tiempo real." },
      { step: 4, title: "Pruebas de compra y lanzamiento", description: "Simulamos pedidos reales, capacitamos a tu equipo y publicamos la tienda." },
    ],
    faqs: [
      {
        question: "¿Puedo administrar los productos y precios yo mismo sin saber programar?",
        answer:
          "Sí. Entregamos un panel de administración muy fácil e intuitivo para subir fotos, cambiar precios, actualizar stock y revisar pedidos en segundos.",
      },
      {
        question: "¿Cómo se calculan los costos de despacho para regiones de Chile?",
        answer:
          "Integramos calculadoras automáticas según peso, dimensiones y comuna de destino, o tarifas planas y despacho gratis por montos mínimos de compra.",
      },
    ],
    relatedProjectSlugs: ["wow-gas", "senderoo", "wowpos"],
    metaTitle: "E-Commerce y Tiendas Online en Chile | Desarrollo Web - Proscom",
    metaDescription:
      "Desarrollo de tiendas online y plataformas e-commerce en Chile. Catálogos autogestionables, checkout rápido, envíos y carritos optimizados para ventas 24/7.",
  },
  {
    id: "medios-de-pago",
    slug: "medios-de-pago",
    title: "Integración de Medios y Pasarelas de Pago",
    shortDescription:
      "Integramos Webpay Plus (Transbank), Mercado Pago, Flow, Stripe y links de pago con conciliación automática y alta seguridad.",
    longDescription:
      "Convierte tu sitio web, plataforma administrativa o aplicación móvil en un canal de recaudación automatizado. Integramos las pasarelas de pago más confiables de Chile y el extranjero, garantizando transacciones seguras (cifrado SSL/TLS, tokenización), confirmación inmediata por webhooks y conciliación bancaria sin intervención manual.",
    iconName: "CreditCard",
    problemsSolved: [
      "Pérdida de ventas por no ofrecer tarjetas de débito, crédito o transferencias automatizadas.",
      "Conciliación manual y lenta de comprobantes bancarios enviados por WhatsApp o correo.",
      "Fallas técnicas o caídas de pasarelas de pago que dejan órdenes en estado incierto.",
      "Riesgo de fraudes o pagos duplicados sin verificación de firma criptográfica.",
    ],
    benefits: [
      "Cobros automáticos 24/7 con confirmación inmediata al cliente y comprobante digital.",
      "Soporte completo para Webpay Plus (Transbank), Mercado Pago, Flow, Khipu y Stripe.",
      "Conciliación automática: cada pago exitoso actualiza el pedido y activa el servicio.",
      "Máxima seguridad con tokenización y cumplimiento de buenas prácticas de ciberseguridad.",
    ],
    features: [
      "Integración certificada con Webpay Plus (Débito Redcompra, Crédito, Prepago y Cuotas sin interés).",
      "Generación de links y botones de pago dinámicos para cobrar por WhatsApp o correo.",
      "Manejo robusto de webhooks con colas de reintento para confirmación garantizada.",
      "Panel de auditoría y control de transacciones con filtros por fecha, estado y medio de pago.",
    ],
    targetCompanies: [
      "Tiendas online y comercios que necesitan recibir pagos con tarjetas chilenas e internacionales.",
      "Empresas de servicios, funerarias, gestorías y notarías con cobranza en cuotas.",
      "Colegios, academias e instituciones que recaudan matrículas o mensualidades periódicas.",
      "Asociaciones deportivas y gremiales que cobran cuotas sociales o inscripciones.",
    ],
    methodology: [
      { step: 1, title: "Asesoría y selección de pasarela", description: "Evaluamos comisiones, plazos de liquidación y tecnología según tu modelo de negocio." },
      { step: 2, title: "Integración en ambiente Sandbox", description: "Configuramos llaves API de prueba y simulamos todos los estados de transacción." },
      { step: 3, title: "Validación de webhooks y seguridad", description: "Verificamos firmas digitales, idempotencia y actualización instantánea en base de datos." },
      { step: 4, title: "Pase a producción y verificación", description: "Habilitamos cobros reales con monitoreo activo y soporte continuo." },
    ],
    faqs: [
      {
        question: "¿Qué pasarelas de pago recomiendan para operar en Chile?",
        answer:
          "Webpay Plus de Transbank es el estándar para débito y crédito nacional en cuotas. Mercado Pago y Flow ofrecen enrolamiento ágil y variedad de métodos (incluyendo Servipag y transferencias). Te asesoramos para elegir la mejor opción según tu volumen.",
      },
      {
        question: "¿El dinero de las ventas va directamente a mi cuenta bancaria?",
        answer:
          "Sí. Todas las pasarelas depositan el dinero directamente en la cuenta bancaria de tu empresa según los plazos establecidos por cada operador (generalmente 24 a 48 horas hábiles).",
      },
    ],
    relatedProjectSlugs: ["routepay", "senderoo", "wow-ticket", "tesoreria-deportiva"],
    metaTitle: "Integración de Medios de Pago en Chile | Webpay, Mercado Pago, Flow - Proscom",
    metaDescription:
      "Integración de pasarelas de pago en Chile: Webpay Plus (Transbank), Mercado Pago, Flow y Stripe. Cobros automatizados, seguros y con conciliación bancaria.",
  },
  {
    id: "aplicaciones-moviles",
    slug: "aplicaciones-moviles",
    title: "Aplicaciones Móviles",
    shortDescription:
      "Desarrollamos aplicaciones móviles intuitivas para Android e iOS, conectadas en tiempo real con tus sistemas de gestión.",
    longDescription:
      "Lleva la operatividad de tu empresa al bolsillo de tus colaboradores y clientes. Creamos aplicaciones móviles híbridas y multiplataforma robustas, optimizadas para rendimiento, sincronización sin conexión y facilidad de uso.",
    iconName: "Smartphone",
    problemsSolved: [
      "Equipos en terreno desconectados de la base de datos central.",
      "Procesos de recolección de datos lentos en papel o planillas manuales.",
      "Falta de un canal directo de atención o pedidos para tus clientes.",
    ],
    benefits: [
      "Operación en terreno con soporte para trabajo offline y sincronización posterior.",
      "Interfaz amigable que reduce la curva de aprendizaje de los operarios.",
      "Notificaciones automáticas y alertas operativas al instante.",
    ],
    features: [
      "Compatibilidad multiplataforma para Android e iOS.",
      "Integración con cámara, lectura de códigos de barra y geolocalización.",
      "Autenticación segura y roles de usuario.",
      "Conexión con APIs empresariales existentes.",
    ],
    targetCompanies: [
      "Empresas de distribución, logística y transporte.",
      "Comercios con equipos de venta en terreno o puntos móviles.",
      "Organizaciones que requieren control de asistencia o accesos móviles.",
    ],
    methodology: [
      { step: 1, title: "Diseño de flujos móviles", description: "Priorizamos la velocidad de uso con pantallas simples." },
      { step: 2, title: "Desarrollo de API y app", description: "Conexión en tiempo real con bases de datos seguras." },
      { step: 3, title: "Pruebas en dispositivos", description: "Validamos en múltiples marcas y tamaños de pantalla." },
      { step: 4, title: "Despliegue operativo", description: "Instalación y configuración en los terminales de tu equipo." },
    ],
    faqs: [
      {
        question: "¿Las aplicaciones funcionan en cualquier teléfono?",
        answer:
          "Diseñamos para las versiones estándar y actuales de Android e iOS, asegurando alta compatibilidad y bajo consumo de batería.",
      },
      {
        question: "¿Se pueden conectar con el sistema que ya utilizamos?",
        answer:
          "Sí, desarrollamos endpoints e integraciones API para que la app lea y escriba directamente en tu base de datos actual.",
      },
    ],
    relatedProjectSlugs: ["routepay", "wow-ticket"],
    metaTitle: "Desarrollo de Aplicaciones Móviles en Chile - Proscom",
    metaDescription:
      "Aplicaciones móviles para empresas en Chile. Conectividad en terreno, sincronización en tiempo real y alta usabilidad para Android e iOS.",
  },
  {
    id: "sistemas-de-gestion",
    slug: "sistemas-de-gestion",
    title: "Sistemas de Gestión y Control",
    shortDescription:
      "Plataformas administrativas diseñadas para centralizar inventarios, ventas, finanzas y control operativo de organizaciones.",
    longDescription:
      "El control es la base del crecimiento empresarial. Diseñamos sistemas de gestión ERP y plataformas administrativas que centralizan todas las áreas de tu negocio en una interfaz limpia, segura y accesible desde cualquier navegador.",
    iconName: "LayoutDashboard",
    problemsSolved: [
      "Dispersión de información contable, de ventas y de stock.",
      "Dificultad para saber en tiempo real el estado financiero y operativo.",
      "Fugas de inventario o falta de control en cajas y transacciones.",
      "Auditorías lentas y complejas por falta de registros históricos claros.",
    ],
    benefits: [
      "Visibilidad 360° del estado de tu negocio en un solo panel.",
      "Reportes automáticos que aceleran la toma de decisiones estratégicas.",
      "Control estricto de accesos y trazabilidad de cada movimiento.",
      "Accesible de forma segura desde la oficina, sucursal o domicilio.",
    ],
    features: [
      "Módulos de inventario, ventas, clientes y proveedores.",
      "Cierres de caja diarios y arqueos detallados.",
      "Gestión de cuotas, cobranzas y estados de cuenta.",
      "Alertas de stock mínimo y vencimientos.",
    ],
    targetCompanies: [
      "Comercios, tiendas y cadenas de locales.",
      "Organizaciones sociales, gremios y juntas vecinales.",
      "Empresas de servicios que necesitan emitir presupuestos y cobros.",
    ],
    methodology: [
      { step: 1, title: "Diagnóstico operativo", description: "Analizamos cómo se mueve tu inventario y flujo de caja." },
      { step: 2, title: "Parametrización del sistema", description: "Configuramos tablas, listas de precios y perfiles de usuario." },
      { step: 3, title: "Migración de datos", description: "Importamos tus clientes, productos o socios históricos." },
      { step: 4, title: "Capacitación práctica", description: "Entrenamos a los administradores y operadores." },
    ],
    faqs: [
      {
        question: "¿Puedo acceder al sistema desde fuera de mi oficina?",
        answer:
          "Sí, nuestras plataformas web de gestión son accesibles desde cualquier navegador moderno con conexión a internet segura mediante HTTPS.",
      },
      {
        question: "¿Se pueden exportar los datos a Excel para el contador?",
        answer:
          "Por supuesto. Todos los módulos cuentan con exportación inmediata a formatos abiertos como Excel y PDF.",
      },
    ],
    relatedProjectSlugs: ["wow-gas", "fundacion-gamboa-gestion", "tesoreria-deportiva", "wowpos"],
    metaTitle: "Sistemas de Gestión Empresarial en Chile | ERP y Control - Proscom",
    metaDescription:
      "Sistemas de gestión administrativa, control de inventario y plataformas operativas en Chile. Centraliza tu negocio con tecnología moderna.",
  },
  {
    id: "integraciones",
    slug: "integraciones",
    title: "Integraciones con APIs y Automatización",
    shortDescription:
      "Conectamos tus plataformas existentes con servicios externos, pasarelas de pago, facturación electrónica y APIs de terceros.",
    longDescription:
      "Evita el traspaso manual de datos entre plataformas. Conectamos tus sistemas internos con pasarelas de pago, servicios de mensajería (WhatsApp, correo), APIs gubernamentales, facturación electrónica y CRMs.",
    iconName: "Network",
    problemsSolved: [
      "Copia manual de datos entre el sitio web, el sistema contable y las planillas.",
      "Notificaciones a clientes que no se envían a tiempo o se olvidan.",
      "Falta de sincronización automática de cobros y facturas.",
    ],
    benefits: [
      "Ahorro de horas hombre semanales en tareas administrativas.",
      "Eliminación de inconsistencias en registros duplicados.",
      "Comunicación inmediata con clientes tras cada compra o solicitud.",
    ],
    features: [
      "Desarrollo y consumo de APIs RESTful seguras.",
      "Webhooks para sincronización en tiempo real de eventos.",
      "Automatización de comprobantes, alertas por email y WhatsApp.",
      "Monitoreo de disponibilidad y registro de transacciones.",
    ],
    targetCompanies: [
      "Empresas de e-commerce y servicios con alto volumen de transacciones.",
      "Organizaciones que utilizan software contable y necesitan automatizar cargas.",
      "Empresas de cobranza y logística.",
    ],
    methodology: [
      { step: 1, title: "Auditoría de endpoints", description: "Revisamos la documentación y factibilidad técnica de las APIs." },
      { step: 2, title: "Entorno de pruebas (Sandbox)", description: "Desarrollamos y testeamos sin afectar operaciones activas." },
      { step: 3, title: "Mapeo de datos y validaciones", description: "Garantizamos coherencia en cada campo sincronizado." },
      { step: 4, title: "Paso a producción con monitoreo", description: "Supervisamos la estabilidad del flujo automático." },
    ],
    faqs: [
      {
        question: "¿Qué tipo de pasarelas de pago se pueden integrar?",
        answer:
          "Integramos Webpay Plus (Transbank), Mercado Pago, Flow y otros procesadores habilitados en Chile.",
      },
      {
        question: "¿Qué pasa si la API externa sufre una caída temporal?",
        answer:
          "Implementamos colas de reintento automático y registro de logs para que ninguna transacción se pierda.",
      },
    ],
    relatedProjectSlugs: ["routepay", "wow-ticket"],
    metaTitle: "Integraciones de APIs y Automatización de Procesos en Chile - Proscom",
    metaDescription:
      "Conectamos tus sistemas con pasarelas de pago, facturación electrónica, WhatsApp y servicios en la nube en Chile.",
  },
  {
    id: "soporte-tecnologico",
    slug: "soporte-tecnologico",
    title: "Soporte, Asesoría y Mantenimiento",
    shortDescription:
      "Acompañamiento tecnológico continuo, administración de servidores, resolución de incidentes y consultoría para tu negocio.",
    longDescription:
      "Tu infraestructura digital necesita estabilidad continua. Ofrecemos asesoría técnica cercana, mantenimiento preventivo de software, optimización de servidores y soporte experto para resolver contingencias con rapidez.",
    iconName: "Headphones",
    problemsSolved: [
      "Falta de un responsable técnico de confianza cuando los sistemas fallan.",
      "Servidores sin respaldos periódicos ni parches de seguridad al día.",
      "Incertidumbre sobre qué tecnología adquirir o implementar en la empresa.",
    ],
    benefits: [
      "Respuesta rápida ante incidentes con contacto directo vía WhatsApp y teléfono.",
      "Tranquilidad de contar con respaldos automáticos y servidores monitoreados.",
      "Asesoría profesional para no gastar de más en servicios innecesarios.",
    ],
    features: [
      "Monitoreo de uptime y tiempos de respuesta 24/7.",
      "Copias de seguridad programadas y pruebas de restauración.",
      "Aplicación de actualizaciones de seguridad y certificados SSL.",
      "Consultoría estratégica para futuros proyectos de digitalización.",
    ],
    targetCompanies: [
      "Empresas que no cuentan con un departamento de TI interno.",
      "Negocios con plataformas críticas que no pueden permitirse caídas.",
      "Instituciones que necesitan auditar o migrar sus servidores.",
    ],
    methodology: [
      { step: 1, title: "Diagnóstico inicial", description: "Auditamos el estado de tus plataformas y servidores." },
      { step: 2, title: "Protocolo de contingencia", description: "Establecemos políticas de copias de seguridad y seguridad." },
      { step: 3, title: "Monitoreo continuo", description: "Supervisamos métricas clave de salud del sistema." },
      { step: 4, title: "Mesa de ayuda directa", description: "Canal prioritario para resolver dudas o incidencias." },
    ],
    faqs: [
      {
        question: "¿Cómo se comunican los incidentes urgentes?",
        answer:
          "Disponemos de canal directo por WhatsApp y teléfono exclusivo para clientes con contrato de soporte activo.",
      },
      {
        question: "¿Pueden encargarse de servidores en la nube (AWS, DigitalOcean, VPS)?",
        answer:
          "Sí, configuramos y mantenemos servidores Linux (Ubuntu, Debian), Nginx, Apache, PHP, Node.js y bases de datos MySQL/PostgreSQL.",
      },
    ],
    relatedProjectSlugs: ["asociacion-futbol-catemu", "legalfirma"],
    metaTitle: "Soporte Tecnológico y Asesoría TI en Chile | Mantenimiento - Proscom",
    metaDescription:
      "Servicio de soporte tecnológico, mantenimiento de software, servidores y asesoría TI para empresas en la Región de Valparaíso y Chile.",
  },
];
