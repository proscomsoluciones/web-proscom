// Textos de la portada: escritos para dueños de negocios, sin términos técnicos.

/** Qué hacemos: tres áreas fáciles de entender, cada una con sus servicios */
export const homePillars = [
  {
    icon: "ShoppingBag",
    title: "Te ayudamos a vender más",
    question: "¿Tus clientes no te encuentran o no pueden comprarte por internet?",
    services: [
      { label: "Página web profesional", href: "/servicios/desarrollo-web" },
      { label: "Tienda online con despacho", href: "/servicios/ecommerce" },
      { label: "Pagos con tarjeta y link de pago", href: "/servicios/medios-de-pago" },
    ],
  },
  {
    icon: "ClipboardCheck",
    title: "Ordenamos tu negocio",
    question: "¿Ventas en cuaderno, stock a ojo y una caja que no cuadra?",
    services: [
      { label: "Sistema de ventas, stock y caja", href: "/servicios/sistemas-de-gestion" },
      { label: "Sistema hecho a tu medida", href: "/servicios/software-a-medida" },
      { label: "App para tu equipo o tus clientes", href: "/servicios/aplicaciones-moviles" },
    ],
  },
  {
    icon: "HeartHandshake",
    title: "Te acompañamos siempre",
    question: "¿No tienes a quién llamar cuando algo falla o tienes una duda?",
    services: [
      { label: "Soporte y mantenimiento", href: "/servicios/soporte-tecnologico" },
      { label: "Asesoría para elegir bien", href: "/contacto" },
      { label: "Capacitación para tu equipo", href: "/contacto" },
    ],
  },
];

/** Cómo trabajamos: cada paso dice qué recibe el cliente */
export const homeSteps = [
  {
    title: "Conversamos",
    description: "Nos cuentas cómo funciona tu negocio y qué te complica. En palabras simples.",
    result: "Entiendes qué te conviene y qué no",
  },
  {
    title: "Te proponemos",
    description: "Te explicamos qué haríamos, cuánto cuesta y cuánto demora.",
    result: "Propuesta por escrito con precio y plazos",
  },
  {
    title: "Lo construimos contigo",
    description: "Te mostramos avances para que opines antes de que esté listo.",
    result: "Revisas y apruebas cada etapa",
  },
  {
    title: "Lo ponemos en marcha",
    description: "Capacitamos a tu equipo y seguimos contigo después de lanzar.",
    result: "Tu equipo usándolo desde el primer día",
  },
];

export const homeStories = [
  {
    slug: "san-jose-de-los-andes",
    icon: "Globe",
    sector: "Página web",
    title: "Una página web para que las familias estén siempre informadas",
    before: "Los avisos importantes llegaban tarde y por muchos grupos de mensajería distintos, sin un lugar oficial donde encontrarlos.",
    after: "Las familias entran a la página del colegio y encuentran noticias, calendario, circulares y a quién contactar, incluso con mala señal.",
    highlights: ["Noticias y calendario siempre al día", "Circulares y reglamentos para descargar", "Rápida incluso con mala señal en el celular"],
    image: "/images/projects/san-jose.jpg",
  },
  {
    slug: "wow-gas",
    icon: "Flame",
    sector: "Distribuidora de gas",
    title: "Del cuaderno de pedidos a cuadrar los camiones en minutos",
    before: "Los pedidos se anotaban a mano y cuadrar lo que traía cada chofer terminaba en descuadres.",
    after: "Cada chofer cobra e imprime la boleta desde el camión, y al cierre el sistema cuadra cilindros y dinero solo.",
    highlights: ["Pedidos y despachos en un solo lugar", "Cobro y boleta en ruta", "Cuadratura automática al cierre"],
    image: "/images/projects/wow-gas.png",
  },
  {
    slug: "tesoreria-deportiva",
    icon: "Trophy",
    sector: "Asociaciones de fútbol",
    title: "Cuentas claras frente a todos los clubes",
    before: "El dinero se anotaba en cuadernos sueltos y no se sabía qué clubes estaban al día.",
    after: "Caja y banco siempre al día, cada gasto con foto de la boleta y el balance para la asamblea con un clic.",
    highlights: ["Saldos de caja y banco al día", "Gastos respaldados con foto", "Balance en PDF con un clic"],
    image: "/images/projects/tesoreria-deportiva.jpg",
  },
  {
    slug: "asistencia-escolar",
    icon: "GraduationCap",
    sector: "Colegios",
    title: "Los apoderados saben al instante que su hijo llegó",
    before: "La asistencia se anotaba en libros y las familias se enteraban tarde de atrasos o faltas.",
    after: "El alumno pasa su credencial en la entrada y el apoderado recibe un aviso en su celular en ese momento.",
    highlights: ["Aviso inmediato al apoderado", "Credenciales con código QR", "Informes por curso sin trabajo manual"],
    image: "/images/projects/asistencia-escolar.png",
  },
  {
    slug: "legalfirma",
    icon: "FileSignature",
    sector: "Gestoría vehicular",
    title: "Contratos listos en segundos, no en horas",
    before: "Cada compraventa exigía llenar contratos a mano y hacer los trámites uno por uno en el Registro Civil.",
    after: "Los contratos y mandatos salen listos en PDF al instante y las transferencias se hacen en línea.",
    highlights: ["Contratos en PDF al instante", "Transferencias en línea", "Cobros y balance en el mismo sistema"],
    image: "/images/projects/legalfirma.png",
  },
];

/** Testimonios de clientes, con su nombre y organización */
export const homeTestimonials = [
  {
    quote:
      "Trabajar con Proscom nos ha permitido tener una página web institucional a la altura de nuestro colegio. Y cada vez que necesitamos ayuda, ahí están con su soporte.",
    name: "Julio Herrera",
    role: "Director, Escuela San José de los Andes",
    service: "Página web y soporte",
    href: "/proyectos/san-jose-de-los-andes",
  },
  {
    quote:
      "Con el sistema Proscom Org ordenamos las finanzas de la junta de vecinos y ahora entregamos los certificados de residencia de forma rápida y profesional.",
    name: "Carolina Vázquez",
    role: "Secretaria, Junta de Vecinos",
    service: "Sistema Proscom Org",
    href: "/soluciones/proscom-org",
  },
  {
    quote:
      "Proscom ha sido nuestro aliado tecnológico. Con su plataforma de gestión creamos los contratos de compraventa de vehículos de forma ordenada y sin papeleo.",
    name: "Rut Mora",
    role: "Gerente general, LegalFirma",
    service: "Plataforma de gestión",
    href: "/proyectos/legalfirma",
  },
];

/** Quiénes somos: razones para confiar */
export const homeReasons = [
  { icon: "Users", title: "Hablas con personas", text: "Trato directo con quienes hacen tu proyecto, sin intermediarios." },
  { icon: "Smile", title: "Sin tecnicismos", text: "Te explicamos todo en simple. No necesitas saber de computación." },
  { icon: "BadgeCheck", title: "Experiencia comprobada", text: "Más de 15 años de experiencia de nuestro fundador creando sistemas." },
  { icon: "MapPin", title: "Empresa chilena", text: "Oficina en Vitacura y clientes a lo largo de todo Chile." },
];

export const homeFaqs = [
  {
    question: "No sé nada de computación, ¿igual puedo trabajar con ustedes?",
    answer:
      "Sí, y es lo más común. La mayoría de nuestros clientes son dueños de negocios, directivas y administradores, no informáticos. Tú nos cuentas cómo trabajas y nosotros nos encargamos del resto.",
  },
  {
    question: "¿Necesito una página web, una tienda online o un sistema?",
    answer:
      "Si quieres que te conozcan y te contacten, una página web. Si quieres vender y cobrar por internet, una tienda online. Si quieres ordenar ventas, stock y caja, un sistema. Si no lo tienes claro, cuéntanos tu negocio y te decimos qué te conviene.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende de lo que necesites: no es lo mismo una página web que un sistema completo. Después de conversar te enviamos una propuesta con el precio y los plazos claros, sin compromiso.",
  },
  {
    question: "¿Cuánto se demora?",
    answer:
      "Te damos una fecha estimada en la propuesta, antes de partir. Durante el trabajo te mostramos avances para que siempre sepas cómo vamos.",
  },
  {
    question: "¿Quién me ayuda si algo falla después?",
    answer:
      "Nosotros. Ofrecemos planes de soporte para mantener todo funcionando y resolver tus dudas por WhatsApp o teléfono.",
  },
  {
    question: "¿Me enseñan a usarlo?",
    answer:
      "Sí. Antes de entregar te capacitamos a ti y a tu equipo, y te dejamos todo listo para que lo uses desde el primer día.",
  },
];
