import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "wow-gas",
    slug: "wow-gas",
    name: "WOW Gas · Gestión de Distribución",
    category: "Sistemas de Gestión",
    clientOrSector: "Distribuidoras de gas licuado / Flota de camiones y choferes",
    isClientProject: true,
    shortDescription:
      "Plataforma integral para distribuidoras de gas: panel de pedidos y despacho, app móvil en terminales POS con impresora y cuadratura automática de cilindros.",
    detailedDescription:
      "WOW Gas centraliza todo el ciclo operativo de una distribuidora de gas licuado en tres componentes integrados: un panel web administrativo de oficina para venta express, despacho y reportes; una app móvil para choferes en terminales POS Sunmi con impresora térmica para cobro y emisión de ticket en ruta; y un backend multiempresa sincronizado en tiempo real. Cada camión parte con una carga inicial registrada y, al finalizar la jornada, el sistema cruza automáticamente los cilindros llenos y vacíos devueltos contra el efectivo recaudado, eliminando cualquier descuadre.",
    problem:
      "Los pedidos llegaban por teléfono y WhatsApp y se anotaban a mano en cuadernos. No existía forma clara de controlar qué cilindros llevaba cada camión, cuántos envases vacíos retornaban ni cuánto dinero debía rendir cada chofer al cierre del turno. La cuadratura se hacía manualmente en planillas con constantes descuadres, el stock entre sucursales se movía sin trazabilidad y no se conocía la ubicación de los repartidores en tiempo real.",
    solution:
      "Construimos una plataforma integral con panel de despacho para oficina, una aplicación móvil para choferes en terminales POS con impresora integrada para cobro y emisión de tickets en el acto, y un backend central multiempresa. Cada camión registra su carga inicial y el sistema compara automáticamente cilindros llenos, vacíos y recaudación contra las ventas del día, con seguimiento de flota en mapa.",
    features: [
      "Venta express en mesón y pedidos a domicilio con asignación y notificación push a choferes.",
      "Seguimiento de flota en mapa interactivo con visualización en tiempo real de camiones repartidores.",
      "Cuadratura automática de chofer: cruce exacto de carga inicial, ventas, envases vacíos y dinero rendido.",
      "Control de stock de cilindros (5, 11, 15 y 45 kg), ingresos de proveedores, recargas y traspasos entre bases.",
      "App móvil en terminales POS Sunmi con cobro con tarjeta, efectivo e impresión térmica de tickets en ruta.",
      "Arquitectura multiempresa con roles (Administradores, Cajeros y Choferes) y acceso por PIN de seguridad.",
      "Historial de ventas, cartera de clientes y reportes consolidados exportables a Excel.",
    ],
    technologies: ["Laravel 12", "PHP 8.2", "React 19", "React Native", "TypeScript", "Tailwind CSS", "MySQL", "Leaflet"],
    image: "/images/projects/wow-gas.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "WOW Gas | Sistema de Gestión y Despacho para Distribuidoras de Gas - Proscom",
    metaDescription:
      "Caso de estudio: plataforma para distribuidoras de gas con pedidos, app móvil POS para choferes, inventario de cilindros y cuadratura automática.",
  },
  {
    id: "tesoreria-deportiva",
    slug: "tesoreria-deportiva",
    name: "Tesorería Deportiva",
    category: "Gestión Deportiva",
    clientOrSector: "Asociaciones y ligas de fútbol amateur",
    isClientProject: true,
    shortDescription:
      "Control financiero integral para asociaciones deportivas: tributos de clubes, pases e inscripciones con cálculo automático, egresos respaldados y saldos en caja y banco en tiempo real.",
    detailedDescription:
      "Tesorería Deportiva es una aplicación web integral desarrollada para centralizar todo el movimiento financiero de las asociaciones y ligas de fútbol amateur. Cada ingreso o egreso queda registrado con un folio correlativo (FOL-00001), categoría, club asociado, medio de pago y fotografía del comprobante adjunto. El sistema separa automáticamente los fondos en caja (efectivo) de los fondos bancarios (transferencias, cheques y depósitos), calcula la porción correspondiente a pases e inscripciones y emite reportes oficiales en PDF con un solo clic. El acceso se gestiona mediante control estricto de roles (Administrador, Tesorero y Solo lectura) y conserva registros con borrado lógico para auditoría transparente.",
    problem:
      "Las asociaciones de fútbol amateur manejan altos volúmenes de dinero en efectivo y transferencias (tributos mensuales de clubes, inscripciones de jugadores, pases, multas y apelaciones) registrados habitualmente en cuadernos o planillas sueltas. Esto genera falta de saldos confiables entre caja y banco, dificultad para conocer qué clubes están al día o con deudas, gastos sin boleta o comprobante de respaldo y una rendición de cuentas ante asambleas compleja y propensa a errores.",
    solution:
      "Desarrollamos Tesorería Deportiva, una plataforma web centralizada con folios correlativos por operación, separación automática de saldos de caja y banco en tiempo real, cálculo automatizado de tasas para pases e inscripciones, generación instantánea de balances y libros en PDF, exportación a CSV/Excel y sistema de auditoría con borrado lógico y permisos por rol.",
    features: [
      "Panel de control financiero: ingresos, egresos y saldos en tiempo real separados en caja y banco, más indicadores clave de gestión.",
      "Gestión de clubes: ficha por club con sus series o categorías, historial de pagos y estado de cuenta al día o moroso.",
      "Registro de movimientos con folio único (FOL-00001): tributos, fondos solidarios, inscripciones, pases, multas y apelaciones.",
      "Egresos con categorías configurables y fotografía del comprobante o boleta adjunta.",
      "Generación de reportes oficiales en PDF: libro de respaldos, informe mensual, balance anual y rendiciones institucionales.",
      "Emisión de certificados de club al día e informes financieros de selecciones comunales (Adulta y Sub).",
      "Exportación de datos a formato CSV/Excel para auditoría y conciliación contable.",
      "Seguridad por roles (Administrador, Tesorero y Consulta) con auditoría inmutable y borrado lógico.",
    ],
    technologies: ["PHP 8.3", "Laravel 13", "React 18", "Inertia.js", "TypeScript", "Tailwind CSS", "MySQL", "DomPDF"],
    image: "/images/projects/tesoreria-deportiva.jpg",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "Tesorería Deportiva | Sistema Financiero para Asociaciones de Fútbol - Proscom",
    metaDescription:
      "Caso de desarrollo: plataforma web de tesorería para asociaciones de fútbol amateur con control de caja y banco, rendiciones institucionales y reportes en PDF.",
  },
  {
    id: "fundacion-gamboa-gestion",
    slug: "fundacion-gamboa-gestion",
    name: "Fundación Miguel Ángel Gamboa",
    category: "Sistemas de Gestión",
    clientOrSector: "Fundación sin fines de lucro / Ayudas Técnicas en Comodato",
    isClientProject: true,
    shortDescription:
      "Plataforma integral para fundación: comodatos de ayudas técnicas con contrato en PDF y QR/NFC, inventario multisede y sitio público administrable.",
    detailedDescription:
      "Construimos una plataforma integral en dos componentes para la Fundación Miguel Ángel Gamboa: un sitio web público autoadministrable (historia, noticias, voluntariado, donaciones y transparencia) y un sistema interno de gestión operativa multisede. El sistema gestiona el inventario de ayudas técnicas (camas clínicas, sillas de ruedas, andadores) mediante códigos QR/NFC, emite contratos de comodato en PDF listos para firmar, administra fichas de beneficiarios, traslados entre sedes y proporciona un panel ejecutivo con métricas de stock y gráficos de actividad en tiempo real.",
    problem:
      "Las ayudas técnicas se prestaban sin un sistema central. Era difícil saber qué equipos existían en cada sede, cuáles estaban prestados, a quién y desde cuándo, y cuándo debían volver. Los contratos de comodato se redactaban a mano y los traslados entre sedes no quedaban registrados. Además, la fundación no tenía una presencia web propia donde mostrar su trabajo, recibir donaciones, sumar voluntarios y publicar sus documentos de transparencia.",
    solution:
      "Construimos una plataforma dual con sitio web público autoadministrable para la comunidad y un sistema interno de gestión multisede. Cada equipo queda identificado con su código QR/NFC: al entregarlo en comodato el stock se descuenta automáticamente y genera el contrato en PDF para firma inmediata, mientras que al recibir la devolución el inventario se repone automáticamente con trazabilidad completa.",
    features: [
      "Comodatos con contrato en PDF: emisión en pocos clics, asignación por escáner QR/NFC y control de devoluciones con reposición automática.",
      "Inventario multisede: control de stock por sucursal con número de serie, estado, traslados entre sedes e impresión de etiquetas QR.",
      "Gestión de beneficiarios: expediente digital con documentos (cédula) e historial completo de préstamos exportable a PDF.",
      "Finanzas, reportes y documentos: registro de ingresos y egresos por categoría, panel con gráficos y repositorio documental.",
      "Sitio público administrable: noticias, avisos, calendario, voluntarios con WhatsApp directo, donaciones y transparencia.",
      "Roles y permisos: niveles Superadministrador, Administrador y Operaciones con permisos específicos por módulo.",
    ],
    technologies: ["Laravel (PHP 8.3)", "React", "Inertia.js", "Filament", "Tailwind CSS", "MySQL", "Chart.js", "DomPDF"],
    image: "/images/projects/fundacion-gamboa-gestion.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "Fundación Miguel Ángel Gamboa | Sistema de Gestión y Sitio Web - Proscom",
    metaDescription:
      "Caso de estudio: plataforma para la Fundación Miguel Ángel Gamboa con gestión de comodatos QR, inventario multisede y portal público.",
  },
  {
    id: "legalfirma",
    slug: "legalfirma",
    name: "Legal Firma · Transferencias Vehiculares",
    category: "Gestión Documental",
    clientOrSector: "Sector Legal y Notarial / Carvacal SpA",
    isClientProject: true,
    shortDescription:
      "Plataforma integral de gestión de transferencias vehiculares, compraventas, mandatos notariales e integración directa con el Registro Civil (STEV).",
    detailedDescription:
      "Legal Firma es una plataforma web desarrollada a medida para modernizar la tramitación notarial y vehicular de Carvacal SpA. Centraliza cerca de 1.000 clientes, 650 vehículos y 680 contratos, automatizando la emisión de contratos de compraventa y mandatos en PDF, la conexión electrónica firmada digitalmente con los 7 servicios del Registro Civil (STEV) para transferencias en línea, y el cobro digital con pasarela SumUp mediante enlaces de pago por WhatsApp y correo.",
    problem:
      "Cada compraventa exigía llenar a mano contratos y mandatos notariales, duplicando datos una y otra vez. Las transferencias se tramitaban manualmente una a una en el sitio del Registro Civil sin trazabilidad del estado ni control del cobro, y la plataforma previa estaba dividida en frontend y API desvinculados que volvían lento y costoso cualquier mantenimiento.",
    solution:
      "Construimos una aplicación web unificada de alta velocidad que cubre el flujo completo: registro estructurado de partes (personas naturales, representadas y empresas), generación inmediata de contratos y mandatos en PDF, integración SOAP con WS-Security para transferir en línea ante el Registro Civil con reintentos automáticos, cobro con SumUp y panel financiero con balance en PDF y Excel.",
    features: [
      "Contratos y mandatos notariales en PDF listos para firmar con datos autocompletados.",
      "Integración directa STEV con el Registro Civil: consulta de vigencia, envío de solicitud, seguimiento y comprobante oficial.",
      "Módulo de limitaciones al dominio: registro y consulta de estado ante el Registro Civil.",
      "Cobro digital con SumUp: generación de link público de pago para envío rápido a compradores vía WhatsApp.",
      "Panel financiero: recaudación, ganancias y reportes de cobros con exportación en PDF y Excel.",
      "Dashboard analítico: clientes por personería, flota vehicular con/sin contrato y trámites ante el Registro Civil.",
      "Seguridad y permisos: roles Super Admin, Admin y Ejecutivos con control granular por acción sobre cada módulo.",
    ],
    technologies: ["Laravel 13", "PHP 8.3", "React 19", "Inertia.js 3", "Tailwind CSS 4", "SOAP WS-Security", "SumUp", "MySQL", "DomPDF"],
    image: "/images/projects/legalfirma.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "Legal Firma | Gestión de Transferencias Vehiculares y STEV - Proscom",
    metaDescription:
      "Caso de estudio: plataforma notarial con integración directa al Registro Civil (STEV), contratos en PDF y cobros SumUp desarrollada para Carvacal SpA.",
  },
  {
    id: "asistencia-escolar",
    slug: "asistencia-escolar",
    name: "Sistema de Asistencia Escolar",
    category: "Sistemas de Gestión",
    clientOrSector: "Colegios de educación básica / Escuela San José",
    isClientProject: true,
    shortDescription:
      "Kiosco escolar de asistencia con credenciales QR/NFC, alertas inmediatas por Telegram a apoderados y cumplimiento de la Ley de Protección de Datos Personales.",
    detailedDescription:
      "Desarrollado para colegios de educación básica en Chile, el Sistema de Asistencia Escolar automatiza el control de ingresos y salidas mediante un kiosco interactivo compatible con lectores USB o cámaras de tablets y computadores. Al escanear la credencial QR o chip NFC del alumno, el sistema registra ingresos, atrasos, retiros y salidas, notificando al instante al apoderado vía bot de Telegram. Cumple estrictamente con la normativa chilena de protección de datos personales (Ley 19.628 y Ley 21.719), manteniendo el almacenamiento privado de fotografías y auditoría de accesos.",
    problem:
      "La asistencia diaria se registraba en libros físicos de forma dispersa, impidiendo saber al instante qué alumnos habían ingresado, quiénes venían con retraso o se habían retirado antes de tiempo. Los apoderados se enteraban tarde de las inasistencias y la elaboración de informes por curso requería horas de trabajo manual, con el desafío adicional de proteger los datos de menores según la normativa legal.",
    solution:
      "Diseñamos una solución web con kiosco de escaneo de alta velocidad (QR y NFC) y panel administrativo para inspectoría y docentes. Cada evento de portería envía una notificación instantánea y personalizada a los apoderados por Telegram, con gestión masiva de alumnos desde Excel, impresión de credenciales en lote y estrictos controles de privacidad.",
    features: [
      "Kiosco de asistencia QR/NFC: lectura por escáner USB o cámara, detección automática de atrasos y bloqueo de credenciales revocadas.",
      "Notificaciones automáticas por Telegram: 6 tipos de avisos (ingreso, atraso, salida, retiro, reingreso e inasistencia) con vinculación QR.",
      "Gestión de credenciales escolares de 2 caras (anverso con foto / reverso con QR y NFC) e impresión masiva en lote.",
      "Control de asistencia diaria: cierre de jornada con alertas de inasistencia y justificaciones por categoría.",
      "Protección de datos (Ley 19.628 / 21.719): fotos privadas, permisos docentes limitados a sus cursos y registro inmutable de auditoría.",
      "Importación masiva desde Excel y reportes estadísticos por curso o alumno listos para imprimir.",
      "Roles diferenciados: Inspectoría (Administrador), Docentes y Operadores de Kiosco.",
    ],
    technologies: ["Laravel 13", "PHP 8.3", "React 19", "Inertia.js 3", "Tailwind CSS 4", "Telegram Bot API", "MySQL", "html5-qrcode"],
    image: "/images/projects/asistencia-escolar.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "Sistema de Asistencia Escolar QR y Telegram | Proscom",
    metaDescription:
      "Caso de estudio: kiosco de asistencia escolar con credenciales QR/NFC, notificaciones en tiempo real por Telegram y cumplimiento Ley 19.628 / 21.719.",
  },
  {
    id: "pitazo-final",
    slug: "pitazo-final",
    name: "Pitazo Final · Gestión Deportiva y Tribunal de Disciplina",
    category: "Gestión Deportiva",
    clientOrSector: "Asociaciones de fútbol amateur / Asociación de Fútbol de Catemu",
    isClientProject: true,
    shortDescription:
      "Plataforma para asociaciones deportivas: control de sanciones y cumplimiento, expedientes de Comité de Ética, Fondo Solidario y oficios oficiales en PDF.",
    detailedDescription:
      "Pitazo Final reúne en un único ecosistema la gestión administrativa, deportiva y judicial de las asociaciones de fútbol amateur. Administra clubes, jugadores, torneos por fases y fechas, controlando de manera automatizada las sanciones impuestas por el Tribunal de Disciplina (por partidos o por tiempo). Integra el seguimiento de expedientes del Comité de Ética, solicitudes del Fondo Solidario para deportistas lesionados y genera actas y oficios oficiales en PDF con membrete y firmas configuradas.",
    problem:
      "Las sanciones, los fallos disciplinarios y las ayudas solidarias se llevaban en planillas y documentos físicos dispersos. Resultaba complejo saber qué jugadores seguían suspendidos, cuántos partidos les faltaban por cumplir o cuándo concluía una inhabilitación por tiempo. Las actas y oficios se redactaban manualmente sin respaldo inmutable de auditoría.",
    solution:
      "Desarrollamos una plataforma centralizada que descuenta automáticamente las fechas de castigo según el fixture de cada club, controla casos de ética con folio correlativo, tramita fondos solidarios y emite resoluciones formales en PDF con trazabilidad completa de cada modificación.",
    features: [
      "Tribunal de Disciplina: sanciones por partidos o por tiempo con cálculo automático de cumplimiento y rehabilitación al expirar.",
      "Generación de oficios y actas en PDF: documentos oficiales de sanción, habilitación y actas de fecha con membrete y firmas digitales.",
      "Comité de Ética: expedientes con folio único (investigación, citación, inhabilitación y resolución).",
      "Fondo Solidario: registro de jugadores lesionados, diagnóstico médico, montos de cobertura asignados y estado del trámite.",
      "Gestión de torneos y fixture: configuración de campeonatos por fases, series y fechas de juego.",
      "Dashboard analítico: indicadores de sanciones vigentes/cumplidas, ranking de clubes y gráficos con Recharts.",
      "Auditoría inmutable: bitácora de cada creación, edición o baja con registro de usuario, rol, IP y fecha.",
    ],
    technologies: ["Laravel 13", "PHP 8.3", "React 18", "Inertia.js 2", "Tailwind CSS", "Recharts", "DomPDF", "MySQL"],
    image: "/images/projects/pitazo-final.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "Pitazo Final | Sistema de Gestión Deportiva y Tribunal de Disciplina - Proscom",
    metaDescription:
      "Caso de estudio: plataforma para asociaciones de fútbol con control de sanciones, Comité de Ética, Fondo Solidario y oficios oficiales en PDF.",
  },
  {
    id: "senderoo",
    slug: "senderoo",
    name: "Senderoo · Gestión de Contratos y Cobranza",
    category: "Sistemas de Gestión",
    clientOrSector: "Sendero Otoñal / Servicios Funerarios y Previsión",
    isClientProject: true,
    shortDescription:
      "Sistema de gestión de contratos en cuotas, recaudación multicanal en caja y banco, emisión de comprobantes oficiales y migración de datos legacy.",
    detailedDescription:
      "Senderoo es la plataforma central de operaciones comerciales y cobranza desarrollada para la empresa chilena Sendero Otoñal. Centraliza la cartera de clientes, vendedores y contratos de previsión y servicios funerarios integrales, generando planes de cuotas automáticos con protección de pagos históricos. Ofrece un módulo de recaudación desglosado por medio de pago (efectivo, tarjeta, cheque y transferencias), emisión de contratos y comprobantes con membrete en PDF, y un potente motor de importación que migró miles de registros legacy con trazabilidad de origen.",
    problem:
      "La información de clientes, contratos y pagos se encontraba fragmentada en múltiples planillas con miles de registros históricos sin normalizar. No existía forma centralizada de identificar cuotas vencidas, conciliar la recaudación de caja por rango de fechas ni generar contratos y comprobantes de ingreso de manera uniforme y segura.",
    solution:
      "Construimos una plataforma web empresarial que calcula y gestiona planes de cuotas automáticos, registra pagos multicanal con arqueo de caja en tiempo real, genera contratos y recibos con membrete oficial en PDF, e incorporó comandos de migración masiva que preservaron los identificadores legacy_id originales con autenticación de dos factores (2FA y passkeys).",
    features: [
      "Contratos con plan de cuotas automático: cálculo inteligente según pie y cuotas sin alterar pagos históricos.",
      "Documentos oficiales en PDF con membrete: contratos de servicios integrales y comprobantes de ingreso con líneas de firma.",
      "Reportes de caja consolidados: filtros por fecha y desglose de recaudación (efectivo en oficina vs transferencias y PAC).",
      "Selector ultra liviano de contratos por RUT/nombre para cobro rápido sobre miles de registros.",
      "Panel de control ejecutivo: KPIs de contratos vigentes, recaudación mensual, cuotas pendientes y tasa de cumplimiento.",
      "Seguridad de nivel bancario: autenticación con Laravel Fortify, verificación en dos pasos (2FA) y soporte para passkeys.",
      "Importador masivo de datos históricos: migración íntegra de clientes, contratos y pagos conservando el legacy_id.",
    ],
    technologies: ["Laravel 13", "PHP 8.3", "React 19", "Inertia.js 2", "Tailwind CSS 4", "Radix UI", "DomPDF", "Laravel Fortify"],
    image: "/images/projects/senderoo.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "Senderoo | Sistema de Contratos y Cobranza para Previsión - Proscom",
    metaDescription:
      "Caso de estudio: plataforma para Sendero Otoñal con contratos en cuotas, recaudación en caja y banco, comprobantes en PDF y 2FA con passkeys.",
  },
  {
    id: "wowpos",
    slug: "wowpos",
    name: "WOWPOS",
    category: "Punto de Venta",
    clientOrSector: "Comercio Minorista y Puntos de Venta",
    isClientProject: true,
    shortDescription:
      "Sistema de punto de venta e inventario ágil para múltiples cajas, emisión de tickets y control de stock en tiempo real.",
    detailedDescription:
      "WOWPOS fue desarrollado como una solución a medida para resolver la lentitud en la atención de cajas y el descontrol de inventario en salas de venta comerciales. Cuenta con una interfaz optimizada para pantallas táctiles y teclado numérico rápido, permitiendo procesar compras en segundos y registrar cada movimiento de stock de manera automática.",
    problem:
      "Los sistemas comerciales evaluados por el cliente eran excesivamente complejos para los cajeros, presentaban cobros recurrentes elevados y no ofrecían flexibilidad para conectar con sus impresoras térmicas existentes.",
    solution:
      "Diseñamos un sistema POS liviano, veloz y robusto, con sincronización centralizada en la nube, módulo de apertura y cierre de caja ciego para evitar discrepancias y reportes automáticos al cierre de jornada.",
    features: [
      "Venta rápida con lector de código de barras o búsqueda táctil.",
      "Compatibilidad con impresoras térmicas de tickets y boletas.",
      "Control de stock en tiempo real con alertas de reposición.",
      "Gestión de turnos de cajeros y arqueos de caja detallados.",
      "Panel gerencial con métricas de ventas por hora y por producto.",
    ],
    technologies: ["PHP", "MySQL", "Vue.js", "WebSockets", "CSS Moderno"],
    image: "/images/projects/wowpos.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "WOWPOS | Sistema de Punto de Venta a Medida - Proscom",
    metaDescription:
      "Caso de estudio: Desarrollo de sistema punto de venta (POS) para control de inventario y atención de cajas comerciales.",
  },
  {
    id: "wow-ticket",
    slug: "wow-ticket",
    name: "WOW Ticket",
    category: "Software a medida",
    clientOrSector: "Eventos, Espectáculos y Control de Acceso",
    isClientProject: true,
    shortDescription:
      "Plataforma de venta de entradas digitales, validación de accesos con código QR y control de aforo para eventos masivos.",
    detailedDescription:
      "WOW Ticket es una plataforma integral desarrollada para resolver la logística de venta de entradas y acreditación en eventos presenciales. Combina una pasarela de compra rápida para los asistentes con una herramienta móvil de escaneo de entradas que opera en milisegundos en los accesos del recinto.",
    problem:
      "Filas prolongadas en los accesos, riesgo de falsificación o duplicación de entradas físicas y falta de control del aforo en tiempo real durante los eventos.",
    solution:
      "Implementamos un sistema de tickets digitales con identificadores criptográficos únicos en código QR, sincronizados con validadores móviles que alertan al instante sobre tickets ya utilizados o no válidos.",
    features: [
      "Venta online de tickets con confirmación inmediata.",
      "Generación de ticket en PDF y almacenamiento en el smartphone.",
      "App de validación por QR con alta velocidad de respuesta.",
      "Monitoreo de aforo ingresado versus entradas emitidas.",
      "Prevención antifraude con códigos dinámicos.",
    ],
    technologies: ["Node.js", "TypeScript", "React", "PostgreSQL", "PWA"],
    image: "/images/projects/wow-ticket.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "WOW Ticket | Plataforma de Ticketing y Acceso - Proscom",
    metaDescription:
      "Desarrollo de plataforma de venta de tickets y control de acceso con código QR para eventos y espectáculos.",
  },
  {
    id: "asociacion-futbol-catemu",
    slug: "asociacion-futbol-catemu",
    name: "Asociación de Fútbol de Catemu",
    category: "Gestión Deportiva",
    clientOrSector: "Entidades Deportivas Comunitarias",
    isClientProject: true,
    shortDescription:
      "Plataforma digital para la administración de torneos locales, fichaje oficial de jugadores, planillas de partidos y tablas de posiciones.",
    detailedDescription:
      "Desarrollada para profesionalizar la gestión del fútbol amateur y comunitario, la plataforma de la Asociación de Fútbol de Catemu centraliza los expedientes de cientos de deportistas, el control de pases entre clubes, las sanciones arbitrales y la publicación transparente de programaciones y resultados de cada fecha.",
    problem:
      "El manejo en planillas físicas provocaba extravío de fichas de jugadores, dobles inscripciones irregulares y reclamos frecuentes en las asambleas semanales de delegados.",
    solution:
      "Construimos un sistema web accesible para la directiva y los clubes afiliados, con carnet digital de jugador, control de habilitaciones en tiempo real y generación automática de tablas de posiciones.",
    features: [
      "Fichaje digital de jugadores con fotografía y datos validados.",
      "Control de pases y transferencias entre clubes con historial de clubes.",
      "Generación de planillas de partido con firma de capitanes y árbitros.",
      "Cálculo automático de puntos, diferencia de goles y sanciones por tarjetas.",
      "Portal público para consulta de programaciones y resultados por parte de los hinchas.",
    ],
    technologies: ["PHP / Laravel", "MySQL", "JavaScript", "Bootstrap", "Apache"],
    image: "/images/projects/catemu.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "Asociación de Fútbol Catemu | Gestión Deportiva Digital - Proscom",
    metaDescription:
      "Plataforma de gestión para torneos, fichajes y resultados deportivos. Caso real desarrollado para la Asociación de Fútbol de Catemu.",
  },
  {
    id: "san-jose-de-los-andes",
    slug: "san-jose-de-los-andes",
    name: "Escuela San José de los Andes",
    category: "Desarrollo web",
    clientOrSector: "Sector Educacional",
    isClientProject: true,
    shortDescription:
      "Portal web educacional y canal de comunicación institucional para la comunidad escolar, apoderados y docentes.",
    detailedDescription:
      "Diseño e implementación de la web oficial del establecimiento educacional, orientada a mantener informadas a las familias sobre calendarios académicos, circulares informativas, proyectos pedagógicos y protocolos institucionales.",
    problem:
      "Dificultades para hacer llegar información oficial urgente a los apoderados, con alta dispersión de canales no oficiales de mensajería.",
    solution:
      "Desarrollamos una web escolar clara, liviana y estructurada, con descarga directa de documentos oficiales, noticias por ciclo educativo y canales de contacto directo.",
    features: [
      "Repositorio de circulares y reglamentos descargables en PDF.",
      "Noticias y calendario escolar actualizado.",
      "Directorio de contactos por departamento y secretaría.",
      "Alta velocidad de carga en zonas con conectividad móvil variable.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP"],
    image: "/images/projects/san-jose.jpg",
    status: "Completado",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "Escuela San José de los Andes | Web Educacional - Proscom",
    metaDescription:
      "Sitio web educacional e institucional para comunidad escolar. Caso de desarrollo implementado para la Escuela San José de los Andes.",
  },
  {
    id: "routepay",
    slug: "routepay",
    name: "RoutePay",
    category: "Logística",
    clientOrSector: "Logística, Transporte y Flujos Operativos",
    isClientProject: true,
    shortDescription:
      "Plataforma de gestión logística, trazabilidad de despachos y liquidación de servicios de transporte.",
    detailedDescription:
      "RoutePay es una plataforma desarrollada para resolver la complejidad en el control de rutas, liquidaciones a transportistas y seguimiento de entregas en el sector logístico. Centraliza la emisión de órdenes de traslado y agiliza la conciliación financiera de las operaciones.",
    problem:
      "Control disperso en guías en papel y planillas manuales, demoras de semanas en las liquidaciones a transportistas y falta de visibilidad del estado de cada despacho.",
    solution:
      "Construimos una plataforma web operativa con registro de viajes, validación de comprobantes de entrega y cálculo automático de tarifas según ruta y volumen.",
    features: [
      "Registro y asignación de órdenes de despacho a transportistas.",
      "Trazabilidad de estados de entrega en ruta.",
      "Módulo de liquidación y conciliación de pagos a choferes.",
      "Exportación de reportes operativos y contables.",
    ],
    technologies: ["PHP / Laravel", "PostgreSQL", "Vue.js", "Docker"],
    image: "/images/projects/routepay.png",
    status: "En producción y soporte",
    isAuthorized: true,
    isFeatured: true,
    metaTitle: "RoutePay | Plataforma Logística y Control de Transporte - Proscom",
    metaDescription:
      "Caso de desarrollo: Plataforma de gestión logística y control de liquidaciones de transporte desarrollada a medida.",
  },
];
