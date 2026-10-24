import { Solution } from "@/types";

export const solutionsData: Solution[] = [
  {
    id: "proscom-org",
    slug: "proscom-org",
    name: "Proscom Org",
    tagline: "Plataforma integral de gestión para organizaciones comunitarias y juntas de vecinos",
    shortDescription:
      "Sistema diseñado para simplificar el registro de socios, cuotas, emisión de certificados de residencia y rendiciones de cuentas transparentes.",
    detailedDescription:
      "Proscom Org es una solución tecnológica desarrollada específicamente para la realidad de juntas de vecinos, comités de vivienda, clubes deportivos y organizaciones sociales de Chile. Permite a las directivas mantener el padrón de socios al día, registrar pagos de cuotas con comprobante automático, generar certificados de residencia verificables mediante código QR y entregar informes financieros claros a la comunidad.",
    targetAudience: [
      "Juntas de vecinos urbanas y rurales.",
      "Comités de vivienda y mejoramiento vecinal.",
      "Clubes deportivos y agrupaciones comunitarias.",
      "Uniones comunales y corporaciones sociales.",
    ],
    problemsSolved: [
      "Pérdida de información en libros de actas manuales o cuadernos.",
      "Dificultades para acreditar residencia de forma rápida y segura.",
      "Falta de transparencia o desconfianza en el balance de ingresos y egresos.",
      "Tiempo excesivo invertido por las directivas en trámites rutinarios.",
    ],
    confirmedFeatures: [
      "Padrón digital de socios con historial y ficha familiar.",
      "Control de cuotas ordinarias y extraordinarias con recibos digitales.",
      "Generador de certificados de residencia y pertenencia con validación QR.",
      "Módulo de tesorería: registro de ingresos, gastos y rendición en PDF.",
      "Panel de administración intuitivo adaptado para computadores y tablets.",
    ],
    benefits: [
      "Transparencia total frente a los vecinos en las asambleas.",
      "Ahorro de horas en trámites y firma de certificados.",
      "Datos respaldados en la nube sin riesgo de extravío físico.",
      "Fácil de usar, sin requerir conocimientos técnicos avanzados.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Implementación con plan de suscripción o pago institucional anual.",
    faqs: [
      {
        question: "¿Cómo se valida un certificado de residencia emitido por Proscom Org?",
        answer:
          "Cada certificado emitido incluye un código QR único que cualquier institución o vecino puede escanear para verificar su autenticidad y fecha de emisión en tiempo real.",
      },
      {
        question: "¿Qué pasa con los registros antiguos de socios en papel?",
        answer:
          "Durante el proceso de implementación ayudamos a digitalizar o importar las listas existentes de socios para que la organización comience a operar de inmediato.",
      },
      {
        question: "¿Es necesario instalar algún programa en el computador?",
        answer:
          "No, Proscom Org funciona en la nube a través de internet, por lo que la directiva puede acceder desde cualquier dispositivo seguro.",
      },
    ],
    image: "/images/solutions/proscom-org.png",
    metaTitle: "Proscom Org | Sistema de Gestión para Juntas de Vecinos y Organizaciones",
    metaDescription:
      "Plataforma para juntas de vecinos y organizaciones sociales en Chile. Control de socios, cuotas, certificados QR y rendiciones transparentes.",
  },
  {
    id: "tesoreria-deportiva",
    slug: "tesoreria-deportiva",
    name: "Tesorería Deportiva",
    tagline: "Plataforma de control financiero y rendición transparente para asociaciones de fútbol y ligas deportivas",
    shortDescription:
      "Sistema web para gestionar tributos de clubes, pases, inscripciones, egresos respaldados con foto de boleta y saldos en tiempo real de caja y banco.",
    detailedDescription:
      "Tesorería Deportiva es una solución creada para profesionalizar y transparentar la administración económica de asociaciones deportivas y ligas comunales de Chile. Registra cada ingreso y egreso con folio correlativo único, fotografía del comprobante, separación automática de fondos en caja (efectivo) y banco (transferencias/depósitos), cálculo de cuotas de pases e inscripciones y emisión instantánea de informes, balances y certificados en PDF.",
    targetAudience: [
      "Asociaciones de fútbol amateur urbanas y rurales.",
      "Ligas deportivas comunales y provinciales.",
      "Clubes deportivos con múltiples series y categorías.",
      "Federaciones y comités deportivos regionales.",
    ],
    problemsSolved: [
      "Desorden y pérdidas por anotar dineros en cuadernos y planillas sueltas.",
      "Falta de claridad en saldos reales entre efectivo en caja y cuentas bancarias.",
      "Dificultad para saber qué clubes están al día o morosos con sus tributos.",
      "Cuestionamientos y desconfianza en las asambleas de delegados por falta de respaldos.",
    ],
    confirmedFeatures: [
      "Panel de control financiero: saldos en tiempo real separados en caja y banco, e indicadores clave de gestión.",
      "Gestión de clubes: fichas por institución, historial de pagos y estado de cuenta al día o con deuda.",
      "Registro de ingresos con folio único correlativo (tributos, pases, inscripciones, multas y apelaciones).",
      "Egresos respaldados con fotografía adjunta del comprobante o boleta.",
      "Generador de reportes en PDF: libro de respaldos, balance anual, rendición institucional y certificados al día.",
      "Exportación completa a formato Excel/CSV para auditoría contable.",
    ],
    benefits: [
      "Transparencia absoluta ante los delegados y directivas de los clubes.",
      "Control exacto de caja chica en efectivo versus fondos bancarios.",
      "Ahorro de días de trabajo manual al preparar balances para asamblea.",
      "Cero extravío de comprobantes con respaldo digital fotográfico.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Implementación institucional con planes anuales de soporte y capacitación para directivas.",
    faqs: [
      {
        question: "¿Permite rendir cuentas de forma oficial ante la asamblea?",
        answer:
          "Sí, el sistema incluye un módulo específico que calcula la porción correspondiente a pases e inscripciones y genera los libros y balances en PDF con un clic.",
      },
      {
        question: "¿Qué pasa si se comete un error al ingresar un pago?",
        answer:
          "Cuenta con un sistema de auditoría con borrado lógico y permisos por rol (Administrador, Tesorero y Consulta), garantizando trazabilidad total.",
      },
      {
        question: "¿Funciona desde celulares o solo computadores?",
        answer:
          "Es una aplicación web 100% responsive, por lo que el tesorero puede registrar ingresos o consultar saldos desde cualquier teléfono o tablet.",
      },
    ],
    image: "/images/projects/tesoreria-deportiva.jpg",
    metaTitle: "Tesorería Deportiva | Sistema Financiero para Asociaciones de Fútbol - Proscom",
    metaDescription:
      "Software para asociaciones deportivas en Chile: control de caja y banco, tributos por club, pases con cálculo automático y balances en PDF.",
  },
  {
    id: "asistencia-escolar",
    slug: "asistencia-escolar",
    name: "Sistema de Asistencia Escolar",
    tagline: "Kiosco de asistencia con credenciales QR/NFC y notificaciones instantáneas a apoderados por Telegram",
    shortDescription:
      "Control automatizado de ingresos, atrasos y salidas escolares con credenciales inteligentes y alertas inmediatas a las familias.",
    detailedDescription:
      "Diseñado para establecimientos educacionales en Chile, el Sistema de Asistencia Escolar agiliza el flujo de entrada en portería mediante credenciales con código QR o chip NFC. Al registrarse el alumno mediante lectores USB o cámaras de dispositivos móviles, el sistema detecta atrasos, valida horarios y notifica al instante al apoderado vía Telegram, garantizando estricto apego a las leyes chilenas de protección de datos personales (Ley 19.628 y 21.719).",
    targetAudience: [
      "Colegios de educación básica y media particulares subvencionados y privados.",
      "Escuelas municipales y corporaciones de educación de Chile.",
      "Institutos y centros de formación escolar con jornada completa.",
      "Equipos de inspectoría general y convivencia escolar.",
    ],
    problemsSolved: [
      "Filas lentas y registro manual en papel o libros de portería.",
      "Falta de información inmediata a los apoderados sobre la llegada o atraso de sus hijos.",
      "Riesgo de fuga o retiros anticipados no informados a tiempo a la familia.",
      "Dificultad para generar reportes oficiales de asistencia diaria y mensual por curso.",
    ],
    confirmedFeatures: [
      "Kiosco de escaneo de alta velocidad con credenciales QR y chip NFC.",
      "6 tipos de notificaciones inmediatas por Telegram (ingreso, atraso, salida, retiro, reingreso e inasistencia).",
      "Gestión de credenciales escolares de 2 caras (foto y QR) con impresión masiva en lote.",
      "Cierre diario de jornada con alertas de inasistencia y justificaciones por categoría.",
      "Cumplimiento normativo de protección de datos personales con fotos privadas y accesos por rol.",
      "Carga masiva de alumnos desde Excel y exportación de estadísticas.",
    ],
    benefits: [
      "Tranquilidad para los apoderados con confirmación inmediata en su celular.",
      "Portería despejada y registro en milisegundos en horas punta.",
      "Disminución de llamados telefónicos y consultas repetitivas a secretaría.",
      "Reportería oficial lista para inspectoría y supervisión del establecimiento.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Implementación con credenciales institucionales y suscripción por período académico.",
    faqs: [
      {
        question: "¿El colegio necesita comprar lectores especiales costosos?",
        answer:
          "No. El sistema funciona con cualquier lector de código de barras/QR USB estándar o directamente con la cámara de una tablet, computador o celular.",
      },
      {
        question: "¿El apoderado debe pagar por recibir las notificaciones?",
        answer:
          "No, las notificaciones se envían a través de Telegram de manera 100% gratuita para los apoderados, vinculándose con solo escanear un código QR.",
      },
      {
        question: "¿Cómo protege los datos de los estudiantes menores de edad?",
        answer:
          "Cumple con las leyes 19.628 y 21.719: las fotos se almacenan en almacenamiento privado, los profesores solo ven sus cursos asignados y se registra una bitácora inmutable de auditoría.",
      },
    ],
    image: "/images/projects/asistencia-escolar.png",
    metaTitle: "Sistema de Asistencia Escolar QR y Telegram | Proscom",
    metaDescription:
      "Software de asistencia para colegios en Chile con credenciales QR/NFC, alertas automáticas por Telegram a apoderados y reportería oficial.",
  },
  {
    id: "pitazo-final",
    slug: "pitazo-final",
    name: "Pitazo Final",
    tagline: "Ecosistema integral de gestión deportiva, Tribunal de Disciplina y resoluciones oficiales",
    shortDescription:
      "Plataforma para asociaciones deportivas: control de sanciones por fechas, Comité de Ética, Fondo Solidario y oficios oficiales en PDF.",
    detailedDescription:
      "Pitazo Final centraliza la gestión deportiva, administrativa y disciplinaria de asociaciones y ligas de fútbol amateur. Administra clubes, jugadores federados y torneos por fases y fechas, calculando automáticamente el cumplimiento de sanciones aplicadas por el Tribunal de Disciplina. Incorpora seguimiento de expedientes del Comité de Ética con folio único, gestión del Fondo Solidario para deportistas lesionados y generación automática de actas y oficios oficiales en PDF con membrete institucional y firmas.",
    targetAudience: [
      "Asociaciones de fútbol amateur y federaciones regionales.",
      "Tribunales de disciplina y comisiones arbitrales.",
      "Comités de ética deportiva y corporaciones de deportes.",
      "Ligas independientes y torneos intercomunales.",
    ],
    problemsSolved: [
      "Descontrol sobre qué jugadores siguen suspendidos y cuántas fechas les restan por cumplir.",
      "Redacción manual repetitiva de oficios, actas de sanciones y resoluciones de fecha.",
      "Falta de registro sobre expedientes de ética y beneficios otorgados por fondos solidarios.",
      "Falta de auditoría sobre quién modificó o aplicó una sanción disciplinaria.",
    ],
    confirmedFeatures: [
      "Tribunal de Disciplina: sanciones por partidos o por tiempo con descuento automático por fixture.",
      "Generador de oficios y actas oficiales en PDF con membrete y firmas configuradas.",
      "Comité de Ética: expedientes con folio correlativo (investigación, citación, inhabilitación y resolución).",
      "Módulo de Fondo Solidario: registro de futbolistas lesionados, diagnóstico y estado de ayuda económica.",
      "Gestión de torneos, fixture por fases, series y fechas de juego.",
      "Dashboard analítico: indicadores de sanciones vigentes, ranking de clubes y bitácora de auditoría.",
    ],
    benefits: [
      "Cero errores de habilitación indebida de jugadores suspendidos en partidos clave.",
      "Emisión instantánea de documentación oficial con validez reglamentaria.",
      "Transparencia total frente a las directivas de los clubes en cada fecha del campeonato.",
      "Registro inmutable de auditoría para cada fallo o resolución emitida.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Suscripción por temporada deportiva con configuración de membretes, logos y reglamentos.",
    faqs: [
      {
        question: "¿Cómo sabe el sistema cuándo un jugador ya cumplió sus fechas de castigo?",
        answer:
          "El sistema descuenta automáticamente los partidos cumplidos según el fixture y las fechas disputadas por su club, marcando al jugador como habilitado en cuanto concluye la sanción.",
      },
      {
        question: "¿Los oficios generados cumplen con el formato formal de la asociación?",
        answer:
          "Sí, cada documento PDF se emite con el logo oficial, membrete de la asociación, datos del jugador/club y las firmas configuradas de presidente y secretario.",
      },
    ],
    image: "/images/projects/pitazo-final.png",
    metaTitle: "Pitazo Final | Software para Asociaciones Deportivas y Tribunal de Disciplina - Proscom",
    metaDescription:
      "Plataforma de gestión para ligas de fútbol: control de sanciones, Tribunal de Disciplina, Comité de Ética, Fondo Solidario y actas en PDF.",
  },
  {
    id: "routepay",
    slug: "routepay",
    name: "RoutePay",
    tagline: "Plataforma de gestión logística, trazabilidad de entregas y liquidación de transporte",
    shortDescription:
      "Control de despachos, seguimiento de paquetes en tiempo real y conciliación financiera de tarifas y rutas de transporte.",
    detailedDescription:
      "RoutePay es una plataforma tecnológica desarrollada para ordenar y modernizar las operaciones de transporte, logística y distribución. Centraliza la asignación de órdenes de despacho a transportistas, la trazabilidad de estados de entrega en ruta, la validación de comprobantes de entrega y el cálculo automático de tarifas y liquidaciones a choferes, eliminando las planillas manuales y la incertidumbre en los envíos.",
    targetAudience: [
      "Empresas de logística, transporte de carga y última milla.",
      "Distribuidoras con flota propia o choferes externos contratados.",
      "Centros de almacenamiento y bodegaje con despacho a clientes.",
      "Operadores de comercio electrónico y distribución B2B.",
    ],
    problemsSolved: [
      "Control disperso en guías de despacho en papel y planillas manuales.",
      "Demoras de semanas en calcular las liquidaciones y pagos a choferes.",
      "Falta de visibilidad sobre el estado de cada envío o entrega en tiempo real.",
      "Disputas con clientes o transportistas por comprobantes de entrega extraviados.",
    ],
    confirmedFeatures: [
      "Panel de control logístico: asignación de paquetes y órdenes de despacho a conductores.",
      "Trazabilidad de estados en ruta: en bodega, en reparto, entregado o con incidencia.",
      "Módulo de liquidación automática de pagos a choferes según tarifas y rutas.",
      "Validación de comprobantes de entrega y firmas digitales.",
      "Reportes consolidados operativos y contables listos para exportar.",
    ],
    benefits: [
      "Reducción drástica del tiempo de conciliación y liquidación a transportistas.",
      "Visibilidad total del estado de cada paquete para el equipo de operaciones.",
      "Eliminación de papeles y respaldo digital de cada entrega efectuada.",
      "Mayor puntualidad y eficiencia en las rutas de despacho.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Implementación a medida y planes de suscripción operativa según volumen de despachos.",
    faqs: [
      {
        question: "¿Cómo se calculan las liquidaciones a los choferes?",
        answer:
          "El sistema permite configurar tablas de tarifas por ruta, peso, volumen o entrega completada, generando el desglose de liquidación automáticamente.",
      },
      {
        question: "¿Se puede integrar con sistemas de facturación o ERP existentes?",
        answer:
          "Sí, RoutePay cuenta con arquitectura modular y APIs REST para sincronizarse con sistemas contables, ERPs y plataformas de comercio electrónico.",
      },
    ],
    image: "/images/projects/routepay.png",
    metaTitle: "RoutePay | Plataforma de Gestión Logística y Control de Entregas - Proscom",
    metaDescription:
      "Software de gestión logística y despacho para transporte y distribución en Chile. Control de entregas, liquidación a choferes y trazabilidad.",
  },
  {
    id: "quebuendato",
    slug: "quebuendato",
    name: "QueBuenDato",
    tagline: "Directorio digital de comercios, servicios y emprendimientos locales",
    shortDescription:
      "Plataforma de visibilidad comercial orientada a conectar a vecinos con negocios y prestadores de servicios de su zona.",
    detailedDescription:
      "QueBuenDato es una iniciativa digital diseñada para potenciar la economía local y la visibilidad de pequeñas y medianas empresas. Permite a los negocios contar con un perfil comercial digital completo, con ubicación, horarios, canales de WhatsApp y catálogo de productos, facilitando que los residentes encuentren soluciones cercanas rápidamente.",
    targetAudience: [
      "Comercios locales, almacenes y tiendas de barrio.",
      "Técnicos, profesionales independientes y prestadores de servicios.",
      "Emprendedores que buscan posicionar su oferta en comunas y provincias.",
    ],
    problemsSolved: [
      "Dificultad de los pequeños comercios para costear un sitio web propio.",
      "Falta de un punto centralizado donde la comunidad consulte servicios confiables.",
      "Baja visibilidad en motores de búsqueda para negocios de comunas del interior.",
    ],
    confirmedFeatures: [
      "Perfiles comerciales con galería de fotos, descripción y horarios.",
      "Botón directo de contacto a WhatsApp y llamadas telefónicas.",
      "Búsqueda geolocalizada por rubro o proximidad.",
      "Panel de autogestión para que el comerciante actualice sus novedades.",
    ],
    benefits: [
      "Presencia digital profesional sin barreras técnicas.",
      "Mayor captación de clientes de la propia localidad.",
      "Enlace directo a WhatsApp para concretar ventas rápidamente.",
    ],
    commercialStatus: "En lanzamiento",
    commercialModel: "Directorio comercial con membresías locales y convenios asociativos.",
    faqs: [
      {
        question: "¿Qué beneficios tiene un comercio al registrarse en QueBuenDato?",
        answer:
          "Obtiene una vitrina digital optimizada con enlace directo a su WhatsApp, visualización en el mapa y posicionamiento para que los vecinos de la zona lo encuentren cuando busquen sus productos.",
      },
      {
        question: "¿El comercio necesita conocimientos informáticos para mantener su perfil?",
        answer:
          "No, el perfil se configura de forma muy sencilla y cuenta con el respaldo del equipo de Proscom para su asistencia.",
      },
    ],
    image: "/images/solutions/quebuendato.png",
    metaTitle: "QueBuenDato | Directorio Digital de Negocios Locales - Proscom",
    metaDescription:
      "Directorio comercial local para conectar negocios y servicios con vecinos. Perfiles digitales con enlace directo a WhatsApp y mapa.",
  },
];
