import { Solution } from "@/types";

// Sistemas listos para usar: escritos para directivas y dueños de negocios, sin términos técnicos.
export const solutionsData: Solution[] = [
  {
    id: "proscom-org",
    slug: "proscom-org",
    name: "Proscom Org",
    tagline: "El sistema para ordenar tu junta de vecinos u organización social",
    shortDescription:
      "Socios, cuotas, certificados de residencia y cuentas claras, todo en un solo lugar y sin cuadernos.",
    detailedDescription:
      "Proscom Org está hecho para juntas de vecinos, comités de vivienda, clubes deportivos y organizaciones sociales de Chile. La directiva mantiene el listado de socios al día, registra el pago de cuotas con su comprobante, entrega certificados de residencia en minutos (con un código QR para comprobar que son verdaderos) y presenta las cuentas a la comunidad de forma clara.",
    targetAudience: [
      "Juntas de vecinos urbanas y rurales.",
      "Comités de vivienda y mejoramiento vecinal.",
      "Clubes deportivos y agrupaciones comunitarias.",
      "Uniones comunales y corporaciones sociales.",
    ],
    problemsSolved: [
      "Información que se pierde en libros de actas o cuadernos.",
      "Certificados de residencia que tardan días en entregarse.",
      "Vecinos que desconfían de las cuentas porque no ven en qué se gasta.",
      "Directivas que pierden horas en trámites que se repiten.",
    ],
    confirmedFeatures: [
      "Listado de socios con su historial y grupo familiar.",
      "Control de cuotas normales y extraordinarias, con recibo para cada pago.",
      "Certificados de residencia y de socio con código QR para comprobarlos.",
      "Tesorería: ingresos, gastos y rendición de cuentas en PDF.",
      "Pantallas simples que funcionan en computador y tablet.",
    ],
    benefits: [
      "Cuentas claras frente a los vecinos en cada asamblea.",
      "Horas ahorradas en trámites y firma de certificados.",
      "La información queda guardada en internet: no se pierde ni se moja.",
      "Fácil de usar, no necesitas saber de computación.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Lo dejamos funcionando y pagas un plan mensual o anual, según lo que le acomode a tu organización.",
    faqs: [
      {
        question: "¿Cómo se comprueba que un certificado de residencia es verdadero?",
        answer:
          "Cada certificado trae un código QR. Cualquier persona o institución lo escanea con el celular y ve que es auténtico y cuándo se emitió.",
      },
      {
        question: "¿Qué pasa con los registros de socios que tenemos en papel?",
        answer:
          "Te ayudamos a pasar al sistema las listas que ya tienen, para que la organización empiece a usarlo de inmediato.",
      },
      {
        question: "¿Hay que instalar algún programa?",
        answer:
          "No. Se usa por internet, entrando desde el computador, la tablet o el celular, con la clave de cada miembro de la directiva.",
      },
    ],
    image: "/images/solutions/proscom-org.png",
    metaTitle: "Proscom Org | Sistema para Juntas de Vecinos y Organizaciones Sociales",
    metaDescription:
      "Sistema para juntas de vecinos y organizaciones sociales en Chile: socios, cuotas, certificados de residencia con QR y cuentas claras.",
  },
  {
    id: "tesoreria-deportiva",
    slug: "tesoreria-deportiva",
    name: "Tesorería Deportiva",
    tagline: "Cuentas claras para asociaciones de fútbol y ligas deportivas",
    shortDescription:
      "Controla lo que paga cada club, pases, inscripciones y gastos con foto de la boleta, con los saldos de caja y banco siempre al día.",
    detailedDescription:
      "Tesorería Deportiva ordena el dinero de asociaciones y ligas deportivas de Chile. Cada ingreso y gasto queda registrado con su número, la foto del comprobante y si fue en efectivo o en el banco. Calcula solo los montos de pases e inscripciones y entrega informes, balances y certificados en PDF con un clic.",
    targetAudience: [
      "Asociaciones de fútbol amateur urbanas y rurales.",
      "Ligas deportivas comunales y provinciales.",
      "Clubes deportivos con varias series y categorías.",
      "Federaciones y comités deportivos regionales.",
    ],
    problemsSolved: [
      "Dinero anotado en cuadernos y planillas sueltas, con pérdidas y desorden.",
      "No saber cuánto hay realmente en caja y cuánto en el banco.",
      "No saber qué clubes están al día y cuáles deben.",
      "Discusiones en las asambleas por gastos sin respaldo.",
    ],
    confirmedFeatures: [
      "Pantalla de inicio con los saldos de caja y banco al día.",
      "Ficha de cada club con su historial de pagos y si está al día o con deuda.",
      "Ingresos numerados en orden: cuotas, pases, inscripciones, multas y apelaciones.",
      "Cada gasto con la foto de su boleta o comprobante.",
      "Informes en PDF: libro de respaldos, balance anual, rendición y certificados de club al día.",
      "Descarga de toda la información en Excel para el contador.",
    ],
    benefits: [
      "Cuentas claras frente a los delegados y directivas de los clubes.",
      "Sabes exactamente cuánto hay en efectivo y cuánto en el banco.",
      "Los balances para la asamblea salen en minutos, no en días.",
      "Ningún comprobante se pierde: todos quedan con foto.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Lo dejamos funcionando, capacitamos a la directiva y pagas un plan anual que incluye soporte.",
    faqs: [
      {
        question: "¿Sirve para rendir cuentas ante la asamblea?",
        answer:
          "Sí. El sistema calcula lo que corresponde a pases e inscripciones y arma los libros y balances en PDF con un clic.",
      },
      {
        question: "¿Qué pasa si alguien se equivoca al registrar un pago?",
        answer:
          "Se puede corregir, pero queda registro de quién hizo cada cambio. Además, cada persona tiene su rol: administrador, tesorero o solo consulta.",
      },
      {
        question: "¿Funciona en el celular?",
        answer: "Sí. El tesorero puede registrar pagos o ver los saldos desde el celular, la tablet o el computador.",
      },
    ],
    image: "/images/projects/tesoreria-deportiva.jpg",
    metaTitle: "Tesorería Deportiva | Sistema de Cuentas para Asociaciones de Fútbol - Proscom",
    metaDescription:
      "Sistema para asociaciones deportivas en Chile: caja y banco al día, pagos por club, pases calculados solos y balances en PDF.",
  },
  {
    id: "asistencia-escolar",
    slug: "asistencia-escolar",
    name: "Sistema de Asistencia Escolar",
    tagline: "El apoderado sabe al instante que su hijo llegó al colegio",
    shortDescription:
      "Los alumnos marcan su llegada con una credencial y la familia recibe un aviso en el celular en ese mismo momento.",
    detailedDescription:
      "Pensado para colegios de Chile. Cada alumno pasa su credencial (con código QR o tarjeta con chip) al entrar, y el sistema registra la hora, detecta atrasos y avisa al apoderado por Telegram al instante. Funciona con un lector simple o con la cámara de una tablet o celular, y cuida los datos de los alumnos según las leyes chilenas de protección de datos (Ley 19.628 y 21.719).",
    targetAudience: [
      "Colegios de educación básica y media, particulares subvencionados y privados.",
      "Escuelas municipales y corporaciones de educación.",
      "Institutos y centros educativos con jornada completa.",
      "Equipos de inspectoría y convivencia escolar.",
    ],
    problemsSolved: [
      "Filas lentas en la entrada y asistencia anotada a mano.",
      "Apoderados que se enteran tarde de un atraso o una falta.",
      "Retiros o salidas que la familia no sabe a tiempo.",
      "Informes de asistencia por curso que toman horas de trabajo.",
    ],
    confirmedFeatures: [
      "Registro de entrada muy rápido con credencial QR o tarjeta con chip.",
      "6 avisos automáticos al apoderado por Telegram: llegada, atraso, salida, retiro, reingreso e inasistencia.",
      "Credenciales con foto y código QR, que se imprimen todas de una vez.",
      "Cierre del día con aviso de inasistencias y registro de justificaciones.",
      "Datos de los alumnos protegidos: fotos privadas y cada profesor ve solo sus cursos.",
      "Carga de alumnos desde Excel e informes descargables.",
    ],
    benefits: [
      "Apoderados tranquilos, con el aviso en su celular apenas llega su hijo.",
      "Entrada despejada incluso en la hora de más movimiento.",
      "Menos llamados y consultas a secretaría.",
      "Informes de asistencia listos para inspectoría.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Lo dejamos funcionando con las credenciales del colegio y pagas un plan por año escolar.",
    faqs: [
      {
        question: "¿El colegio tiene que comprar equipos caros?",
        answer:
          "No. Funciona con cualquier lector de códigos común o directamente con la cámara de una tablet, computador o celular.",
      },
      {
        question: "¿El apoderado paga por recibir los avisos?",
        answer:
          "No. Los avisos llegan por Telegram, que es gratis. El apoderado se conecta escaneando un código QR una sola vez.",
      },
      {
        question: "¿Cómo se cuidan los datos de los alumnos?",
        answer:
          "Cumple las leyes 19.628 y 21.719: las fotos se guardan de forma privada, cada profesor ve solo sus cursos y queda registro de cada acceso.",
      },
    ],
    image: "/images/projects/asistencia-escolar.png",
    metaTitle: "Sistema de Asistencia Escolar con QR y avisos a apoderados | Proscom",
    metaDescription:
      "Sistema de asistencia para colegios en Chile: credenciales QR, aviso inmediato al apoderado por Telegram e informes por curso.",
  },
  {
    id: "pitazo-final",
    slug: "pitazo-final",
    name: "Pitazo Final",
    tagline: "Sanciones, tribunal de disciplina y documentos oficiales de tu asociación, en orden",
    shortDescription:
      "Para asociaciones deportivas: control de castigos por fecha, comité de ética, fondo solidario y oficios en PDF.",
    detailedDescription:
      "Pitazo Final ordena la parte deportiva, administrativa y disciplinaria de asociaciones y ligas de fútbol amateur. Lleva clubes, jugadores y campeonatos por fechas, y descuenta solo las fechas de castigo que ya cumplió cada jugador. También lleva los casos del comité de ética, la ayuda del fondo solidario a jugadores lesionados y prepara actas y oficios en PDF con el logo y las firmas de la asociación.",
    targetAudience: [
      "Asociaciones de fútbol amateur y federaciones regionales.",
      "Tribunales de disciplina y comisiones de árbitros.",
      "Comités de ética deportiva y corporaciones de deportes.",
      "Ligas independientes y torneos entre comunas.",
    ],
    problemsSolved: [
      "No saber qué jugadores siguen castigados ni cuántas fechas les quedan.",
      "Escribir a mano, una y otra vez, oficios, actas y resoluciones.",
      "Casos de ética y ayudas del fondo solidario sin registro.",
      "No saber quién aplicó o cambió una sanción.",
    ],
    confirmedFeatures: [
      "Tribunal de disciplina: castigos por partidos o por tiempo, que se descuentan solos según el calendario.",
      "Oficios y actas en PDF con el logo y las firmas de la asociación.",
      "Comité de ética: cada caso con su número y su estado (investigación, citación, sanción y resolución).",
      "Fondo solidario: jugadores lesionados, diagnóstico y estado de la ayuda.",
      "Campeonatos con fases, series y fechas.",
      "Pantalla de resumen con castigos vigentes, ranking de clubes y registro de cambios.",
    ],
    benefits: [
      "Se acaban los jugadores castigados que juegan por error.",
      "Documentos oficiales listos en segundos.",
      "Información clara para las directivas de los clubes en cada fecha.",
      "Queda registro de cada fallo o resolución.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Pagas por temporada, con el logo, el membrete y el reglamento de tu asociación ya configurados.",
    faqs: [
      {
        question: "¿Cómo sabe el sistema que un jugador ya cumplió su castigo?",
        answer:
          "Descuenta solo los partidos que jugó su club según el calendario, y lo marca como habilitado apenas termina la sanción.",
      },
      {
        question: "¿Los oficios salen con el formato de nuestra asociación?",
        answer:
          "Sí. Cada documento sale con el logo, el membrete, los datos del jugador o club y las firmas del presidente y del secretario.",
      },
    ],
    image: "/images/projects/pitazo-final.png",
    metaTitle: "Pitazo Final | Sistema para Asociaciones Deportivas y Tribunal de Disciplina - Proscom",
    metaDescription:
      "Sistema para ligas de fútbol: control de castigos, tribunal de disciplina, comité de ética, fondo solidario y actas en PDF.",
  },
  {
    id: "routepay",
    slug: "routepay",
    name: "RoutePay",
    tagline: "Despachos, entregas y pago a choferes bajo control",
    shortDescription:
      "Sabe dónde está cada pedido, quién lo entregó y cuánto hay que pagarle a cada chofer, sin planillas.",
    detailedDescription:
      "RoutePay ordena el trabajo de empresas de transporte, reparto y distribución. Asigna los pedidos a cada chofer, muestra en qué estado va cada entrega, guarda el comprobante de entrega y calcula solo cuánto le corresponde a cada chofer. Se acaban las planillas y la incertidumbre sobre los envíos.",
    targetAudience: [
      "Empresas de transporte, carga y reparto a domicilio.",
      "Distribuidoras con camiones propios o choferes externos.",
      "Bodegas que despachan a sus clientes.",
      "Tiendas online y distribuidoras que venden a otras empresas.",
    ],
    problemsSolved: [
      "Guías de despacho en papel y planillas por todos lados.",
      "Semanas para calcular cuánto pagarle a cada chofer.",
      "No saber en qué va cada entrega.",
      "Reclamos por comprobantes de entrega que se pierden.",
    ],
    confirmedFeatures: [
      "Asignación de pedidos y despachos a cada chofer.",
      "Estado de cada entrega: en bodega, en reparto, entregado o con problema.",
      "Cálculo automático del pago a choferes según tarifas y rutas.",
      "Comprobante y firma de entrega guardados en el sistema.",
      "Informes de operación y de pagos listos para descargar.",
    ],
    benefits: [
      "El pago a choferes se calcula en minutos, no en semanas.",
      "Tu equipo sabe en todo momento en qué va cada pedido.",
      "Cada entrega queda respaldada, sin papeles.",
      "Rutas más puntuales y ordenadas.",
    ],
    commercialStatus: "Disponible",
    commercialModel: "Lo adaptamos a tu operación y pagas un plan mensual según la cantidad de despachos.",
    faqs: [
      {
        question: "¿Cómo se calcula el pago a los choferes?",
        answer:
          "Configuras tus tarifas por ruta, peso, volumen o entrega, y el sistema arma solo el detalle de lo que se le paga a cada uno.",
      },
      {
        question: "¿Se puede conectar con mi sistema de facturación o mi tienda online?",
        answer:
          "Sí. RoutePay se puede conectar con tu sistema contable, de facturación o tu tienda online para que la información pase sola de uno a otro.",
      },
    ],
    image: "/images/projects/routepay.png",
    metaTitle: "RoutePay | Sistema de Despachos y Control de Entregas - Proscom",
    metaDescription:
      "Sistema de despachos para transporte y distribución en Chile: estado de cada entrega, comprobantes y pago automático a choferes.",
  },
  {
    id: "quebuendato",
    slug: "quebuendato",
    name: "QueBuenDato",
    tagline: "La vitrina en internet de los negocios de tu barrio",
    shortDescription:
      "Un directorio para que los vecinos encuentren comercios y servicios cerca de su casa.",
    detailedDescription:
      "QueBuenDato ayuda a los pequeños negocios a hacerse conocidos en su comuna. Cada negocio tiene su página con ubicación, horarios, WhatsApp y productos, y los vecinos encuentran rápido lo que necesitan cerca de su casa.",
    targetAudience: [
      "Almacenes, tiendas de barrio y comercios locales.",
      "Técnicos, profesionales independientes y prestadores de servicios.",
      "Emprendedores que quieren darse a conocer en su comuna o provincia.",
    ],
    problemsSolved: [
      "Pequeños comercios que no pueden pagar una página web propia.",
      "Vecinos que no saben dónde encontrar servicios de confianza.",
      "Negocios de comunas pequeñas que no aparecen en Google.",
    ],
    confirmedFeatures: [
      "Página de cada negocio con fotos, descripción y horarios.",
      "Botón directo para escribir por WhatsApp o llamar.",
      "Búsqueda por rubro o por cercanía.",
      "El comerciante actualiza sus novedades él mismo.",
    ],
    benefits: [
      "Presencia en internet sin complicaciones.",
      "Más clientes de tu propia comuna.",
      "Te escriben directo a WhatsApp para comprar.",
    ],
    commercialStatus: "En lanzamiento",
    commercialModel: "Membresía para negocios locales y convenios con organizaciones de la comuna.",
    faqs: [
      {
        question: "¿Qué gana un negocio al aparecer en QueBuenDato?",
        answer:
          "Una vitrina en internet con su WhatsApp, su ubicación en el mapa y presencia para que los vecinos lo encuentren cuando buscan lo que vende.",
      },
      {
        question: "¿Necesito saber de computación para mantener mi página?",
        answer: "No. Se configura de forma muy sencilla y el equipo de Proscom te ayuda si lo necesitas.",
      },
    ],
    image: "/images/solutions/quebuendato.png",
    metaTitle: "QueBuenDato | Directorio de Negocios Locales - Proscom",
    metaDescription:
      "Directorio de negocios y servicios de tu comuna. Cada negocio con su página, WhatsApp directo y ubicación en el mapa.",
  },
];
