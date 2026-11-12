import { Service } from "@/types";

// Textos de servicios: escritos para dueños de negocios, sin términos técnicos.
export const servicesData: Service[] = [
  {
    id: "software-a-medida",
    slug: "software-a-medida",
    title: "Sistema a la medida de tu negocio",
    shortDescription:
      "Creamos un sistema que funciona exactamente como trabaja tu negocio, para que dejes las planillas y los cuadernos.",
    longDescription:
      "Hay negocios que no calzan con los programas que venden hechos. Para ellos creamos un sistema propio: con las pantallas, los informes y los pasos que tu equipo ya usa. Es tuyo, crece contigo y no pagas licencias por cada persona que lo usa.",
    iconName: "Code2",
    problemsSolved: [
      "Información repartida en muchas planillas que nadie sabe cuál es la última.",
      "Programas comprados que te obligan a trabajar como ellos quieren y cobran por cada usuario.",
      "No saber quién hizo qué, ni cuándo, en las tareas importantes.",
      "Horas perdidas en tareas repetitivas que se podrían hacer solas.",
    ],
    benefits: [
      "Funciona como trabaja tu equipo, no al revés.",
      "El sistema es tuyo: sin pagos obligatorios por licencias.",
      "Puedes agregarle partes nuevas a medida que tu negocio crece.",
      "Se puede conectar con lo que ya usas hoy.",
    ],
    features: [
      "Pantalla de inicio con los números clave de tu negocio.",
      "Cada persona ve solo lo que le corresponde, y queda registro de cada cambio.",
      "Informes en PDF y Excel con un clic.",
      "Preparado para conectarse con otros servicios cuando lo necesites.",
    ],
    targetCompanies: [
      "Empresas que quieren dejar el papel y las planillas.",
      "Organizaciones con una forma de trabajar muy propia.",
      "Negocios que están creciendo y necesitan orden.",
    ],
    methodology: [
      { step: 1, title: "Entendemos tu negocio", description: "Conversamos con tu equipo y anotamos cómo trabajan hoy." },
      { step: 2, title: "Te proponemos", description: "Te mostramos qué tendrá el sistema, cuánto cuesta y cuánto demora." },
      { step: 3, title: "Avances para que opines", description: "Te mostramos partes funcionando para que pidas cambios a tiempo." },
      { step: 4, title: "Puesta en marcha", description: "Capacitamos a tu equipo y te acompañamos en los primeros días." },
    ],
    faqs: [
      {
        question: "¿Por qué un sistema a medida y no uno de los que venden hechos?",
        answer:
          "Los programas hechos te obligan a cambiar tu forma de trabajar y suelen cobrar una mensualidad por cada usuario. Uno a medida se adapta a tu negocio y, en el tiempo, puede salirte más barato.",
      },
      {
        question: "¿De quién es el sistema?",
        answer: "Tuyo. El sistema y toda la información que guardes en él son de tu negocio.",
      },
      {
        question: "¿Qué pasa después de que lo entregan?",
        answer:
          "Ofrecemos planes de soporte para mantenerlo funcionando, hacer mejoras y resolver tus dudas por WhatsApp o teléfono.",
      },
    ],
    relatedProjectSlugs: ["wow-gas", "tesoreria-deportiva", "legalfirma", "routepay"],
    guides: [{ slug: "software-a-medida-o-comprado", label: "¿Sistema a medida o uno ya hecho?" }],
    metaTitle: "Sistema a la medida para tu negocio en Chile | Proscom",
    metaDescription:
      "Creamos sistemas a la medida para negocios y organizaciones en Chile. Deja las planillas y ordena tu negocio con un sistema propio.",
  },
  {
    id: "desarrollo-web",
    slug: "desarrollo-web",
    title: "Página web profesional",
    shortDescription:
      "Una página web que da confianza, se ve bien en el celular y hace que los clientes te escriban.",
    longDescription:
      "Hoy tus clientes te buscan en internet antes de llamarte. Hacemos páginas web rápidas, claras y bonitas, que explican lo que vendes, aparecen en Google y llevan al visitante a escribirte por WhatsApp o dejar sus datos.",
    iconName: "Globe",
    problemsSolved: [
      "Una página lenta o antigua que da mala impresión.",
      "Clientes que te buscan en Google y no te encuentran.",
      "Una página que se ve mal en el celular.",
      "Visitas que entran, miran y se van sin contactarte.",
    ],
    benefits: [
      "Carga rápido, incluso con mala señal.",
      "Se ve perfecta en celulares, tablets y computadores.",
      "Preparada para que Google te muestre en las búsquedas.",
      "Botones de WhatsApp y formularios para que te escriban fácil.",
    ],
    features: [
      "Diseño con los colores y el logo de tu marca.",
      "Fácil de leer para todas las personas.",
      "Formulario de contacto protegido contra mensajes basura.",
      "Botón de WhatsApp con un mensaje ya escrito.",
    ],
    targetCompanies: [
      "Negocios y pymes que quieren verse más profesionales.",
      "Colegios, fundaciones y gremios.",
      "Profesionales y consultoras que necesitan transmitir confianza.",
    ],
    methodology: [
      { step: 1, title: "Qué quieres contar", description: "Definimos qué secciones tendrá y qué debe ver primero tu cliente." },
      { step: 2, title: "Diseño", description: "Te mostramos cómo se verá para que lo apruebes." },
      { step: 3, title: "La construimos", description: "Armamos la página para que sea rápida y aparezca en Google." },
      { step: 4, title: "La publicamos", description: "La dejamos en internet, segura y lista para recibir clientes." },
    ],
    faqs: [
      {
        question: "¿Se va a ver bien en el celular?",
        answer: "Sí. La diseñamos pensando primero en el celular, que es donde la mayoría de tus clientes la va a ver.",
      },
      {
        question: "¿Me van a encontrar en Google?",
        answer:
          "Dejamos la página preparada para que Google la entienda y la muestre. Aparecer primero también depende de la competencia y del tiempo, y te explicamos qué más puedes hacer.",
      },
      {
        question: "No sé qué es un dominio ni un hosting, ¿es un problema?",
        answer:
          "Para nada. El dominio es el nombre de tu página (por ejemplo, tunegocio.cl) y el hosting es el lugar donde queda guardada en internet. Te lo explicamos en simple y te guiamos para dejar todo listo.",
      },
      {
        question: "¿Voy a poder cambiar textos y fotos yo mismo?",
        answer:
          "Depende de lo que prefieras: una página que tú actualizas desde un panel simple, o una que actualizamos nosotros cuando nos avisas. Te explicamos cuál te conviene según tu negocio.",
      },
      {
        question: "¿Qué tengo que tener listo antes de pedir mi página?",
        answer:
          "Solo ganas de conversar. Si tienes logo, fotos o textos, nos sirven, pero si no los tienes te orientamos para prepararlos.",
      },
      {
        question: "¿Cuánto se demora?",
        answer: "Depende de cuántas secciones tenga. Antes de partir te damos una fecha estimada en la propuesta.",
      },
    ],
    relatedProjectSlugs: ["san-jose-de-los-andes", "fundacion-gamboa-gestion"],
    guides: [
      { slug: "que-necesito-antes-de-pedir-mi-web", label: "Qué necesito antes de pedir mi página" },
      { slug: "que-tipo-de-web-necesito", label: "¿Qué tipo de página necesito?" },
      { slug: "dominio-hosting-y-web", label: "Dominio y hosting, explicado fácil" },
      { slug: "correo-del-dominio", label: "Correo con el nombre de tu negocio" },
    ],
    metaTitle: "Página web profesional para tu negocio en Chile | Proscom",
    metaDescription:
      "Páginas web para negocios en Chile: rápidas, que se ven bien en el celular, aparecen en Google y hacen que tus clientes te escriban.",
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "Tienda online",
    shortDescription:
      "Vende por internet a todo Chile, las 24 horas, con pago y despacho incluidos.",
    longDescription:
      "Una tienda online propia donde tus clientes eligen, pagan con tarjeta y reciben en su casa. Tú cambias precios, fotos y stock desde un panel muy simple, y recibes cada pedido al instante.",
    iconName: "ShoppingCart",
    problemsSolved: [
      "Clientes que quieren comprarte y abandonan porque comprar es difícil.",
      "El stock de la tienda online no coincide con el del local o la bodega.",
      "Plataformas que cobran comisiones altas y se quedan con tus clientes.",
      "Una tienda que no funciona bien en el celular.",
    ],
    benefits: [
      "Comprar es simple y rápido, para que no se pierdan ventas.",
      "Cambias precios, stock y ofertas tú mismo, al instante.",
      "El stock se mantiene al día con tu local o tu sistema de ventas.",
      "Funciona perfecto en el celular y aparece en Google.",
    ],
    features: [
      "Productos con tallas, colores y filtros para encontrarlos fácil.",
      "Costo de despacho calculado solo, por comuna (Chilexpress, Starken, Blue Express).",
      "Cupones de descuento, packs y productos sugeridos.",
      "Avisos automáticos al cliente por correo y WhatsApp sobre su pedido.",
    ],
    targetCompanies: [
      "Comercios, importadoras y distribuidoras que quieren vender a todo Chile.",
      "Marcas que quieren venderle directo a sus clientes.",
      "Pymes y emprendimientos que quieren dar el salto a internet.",
    ],
    methodology: [
      { step: 1, title: "Tu catálogo y despachos", description: "Definimos qué vendes, cómo lo despachas y cómo te pagan." },
      { step: 2, title: "Diseño de la tienda", description: "Una tienda atractiva y fácil de recorrer, que apruebas antes de seguir." },
      { step: 3, title: "La armamos", description: "Cargamos productos, pagos y despachos, y la conectamos con tu stock." },
      { step: 4, title: "Pruebas y lanzamiento", description: "Hacemos compras de prueba, te enseñamos a usarla y la publicamos." },
    ],
    faqs: [
      {
        question: "¿Puedo cambiar productos y precios yo mismo?",
        answer:
          "Sí. Te entregamos un panel muy simple para subir fotos, cambiar precios, actualizar el stock y revisar pedidos, sin saber de computación.",
      },
      {
        question: "¿Cómo se cobra el despacho a regiones?",
        answer:
          "Puede calcularse solo según el peso y la comuna, o puedes usar una tarifa fija o despacho gratis sobre cierto monto. Tú eliges.",
      },
      {
        question: "¿Necesito tener un local para vender por internet?",
        answer: "No. Puedes vender solo por internet, o sumar la tienda online a tu local para vender por los dos lados.",
      },
      {
        question: "¿Cómo me llega el dinero de las ventas?",
        answer:
          "Tus clientes pagan con tarjeta o transferencia y el dinero se deposita en la cuenta de tu negocio, en los plazos de la empresa de pagos que elijas (Webpay, Mercado Pago, Flow u otra).",
      },
      {
        question: "¿Puedo partir con pocos productos?",
        answer: "Sí. Puedes empezar con pocos y agregar más tú mismo cuando quieras.",
      },
    ],
    relatedProjectSlugs: [],
    guides: [
      { slug: "que-necesito-antes-de-pedir-mi-web", label: "Qué necesito antes de empezar" },
      { slug: "pasarela-de-pago", label: "Cómo funcionan los pagos con tarjeta" },
      { slug: "dominio-hosting-y-web", label: "Dominio y hosting, explicado fácil" },
      { slug: "seo-como-me-encuentran-en-google", label: "Cómo me encuentran en Google" },
    ],
    metaTitle: "Tienda online para tu negocio en Chile | Proscom",
    metaDescription:
      "Creamos tu tienda online en Chile: pagos con tarjeta, despacho a todo el país y un panel simple para manejar productos y stock.",
  },
  {
    id: "medios-de-pago",
    slug: "medios-de-pago",
    title: "Cobros con tarjeta y link de pago",
    shortDescription:
      "Recibe pagos con débito, crédito y transferencia en tu página, tu sistema o por WhatsApp.",
    longDescription:
      "Deja de revisar comprobantes de transferencia uno por uno. Conectamos tu página, tu tienda o tu sistema con Webpay (Transbank), Mercado Pago, Flow y otros, para que tus clientes paguen en segundos y tú veas cada pago confirmado al instante.",
    iconName: "CreditCard",
    problemsSolved: [
      "Ventas perdidas por no aceptar tarjetas.",
      "Revisar a mano comprobantes que llegan por WhatsApp o correo.",
      "Pedidos que quedan en duda: ¿pagó o no pagó?",
      "Miedo a pagos falsos o cobros duplicados.",
    ],
    benefits: [
      "Cobras a cualquier hora y el cliente recibe su comprobante al tiro.",
      "Funciona con Webpay (Transbank), Mercado Pago, Flow, Khipu y Stripe.",
      "Cada pago aprobado actualiza el pedido solo, sin que tengas que revisarlo.",
      "Pagos seguros: los datos de la tarjeta nunca pasan por tus manos.",
    ],
    features: [
      "Pago con débito, crédito, prepago y cuotas sin interés.",
      "Links de pago para cobrar por WhatsApp o correo.",
      "Si un pago se demora en confirmarse, el sistema lo vuelve a revisar solo.",
      "Listado de todos los pagos, con filtros por fecha y estado.",
    ],
    targetCompanies: [
      "Tiendas y comercios que quieren recibir tarjetas chilenas y extranjeras.",
      "Empresas de servicios, gestorías y notarías que cobran en cuotas.",
      "Colegios y academias que cobran matrículas o mensualidades.",
      "Clubes y asociaciones que cobran cuotas sociales o inscripciones.",
    ],
    methodology: [
      { step: 1, title: "Elegimos contigo", description: "Comparamos comisiones y plazos de pago para ver qué te conviene." },
      { step: 2, title: "Lo conectamos", description: "Dejamos los pagos funcionando en tu página o sistema." },
      { step: 3, title: "Pruebas", description: "Hacemos pagos de prueba para asegurarnos de que todo cuadre." },
      { step: 4, title: "A cobrar", description: "Activamos los cobros reales y quedamos atentos a cualquier duda." },
    ],
    faqs: [
      {
        question: "¿Qué medio de pago me conviene en Chile?",
        answer:
          "Webpay de Transbank es el más usado para débito y crédito en cuotas. Mercado Pago y Flow se activan más rápido y suman otras formas de pago. Te ayudamos a elegir según cuánto vendes.",
      },
      {
        question: "¿El dinero llega directo a mi cuenta?",
        answer:
          "Sí. El dinero se deposita en la cuenta de tu negocio en los plazos de cada empresa de pagos, normalmente entre 1 y 2 días hábiles.",
      },
    ],
    relatedProjectSlugs: ["routepay", "senderoo", "wow-ticket", "tesoreria-deportiva"],
    guides: [{ slug: "pasarela-de-pago", label: "Cómo funcionan los pagos con tarjeta" }],
    metaTitle: "Cobros con tarjeta y link de pago para tu negocio en Chile | Proscom",
    metaDescription:
      "Recibe pagos con Webpay, Mercado Pago o Flow en tu página, tu sistema o por WhatsApp. Cada pago confirmado al instante.",
  },
  {
    id: "aplicaciones-moviles",
    slug: "aplicaciones-moviles",
    title: "App para tu equipo o tus clientes",
    shortDescription:
      "Una app en el celular para que tu equipo trabaje en terreno o tus clientes te pidan directo.",
    longDescription:
      "Lleva tu negocio al celular. Creamos apps simples para choferes, vendedores o técnicos que trabajan fuera de la oficina, y apps para que tus clientes compren, reserven o te contacten. Funcionan en Android y iPhone.",
    iconName: "Smartphone",
    problemsSolved: [
      "Equipos en terreno que no saben qué pasa en la oficina, y al revés.",
      "Datos que se anotan en papel y después hay que pasarlos a mano.",
      "Clientes que no tienen una forma fácil de pedirte o reservar.",
    ],
    benefits: [
      "Sigue funcionando aunque no haya señal, y se pone al día después.",
      "Pantallas tan simples que tu equipo aprende a usarla en minutos.",
      "Avisos al instante para tu equipo o tus clientes.",
    ],
    features: [
      "Funciona en Android y iPhone.",
      "Puede usar la cámara, leer códigos de barra y registrar la ubicación.",
      "Cada persona entra con su propia clave.",
      "Se conecta con el sistema que ya usas.",
    ],
    targetCompanies: [
      "Distribuidoras, transporte y logística.",
      "Comercios con vendedores en terreno.",
      "Organizaciones que controlan asistencia o accesos.",
    ],
    methodology: [
      { step: 1, title: "Cómo la usarán", description: "Vemos qué necesita hacer cada persona desde su celular." },
      { step: 2, title: "La construimos", description: "Pantallas simples, conectadas con tu sistema." },
      { step: 3, title: "Pruebas reales", description: "La probamos en distintos celulares antes de entregarla." },
      { step: 4, title: "En manos de tu equipo", description: "La instalamos y enseñamos a usarla." },
    ],
    faqs: [
      {
        question: "¿Funciona en cualquier celular?",
        answer: "Funciona en los celulares Android y iPhone actuales, y la hacemos liviana para que no gaste batería.",
      },
      {
        question: "¿Se puede conectar con el sistema que ya usamos?",
        answer: "Sí. Revisamos tu sistema actual y hacemos que la app lea y guarde la información ahí mismo.",
      },
    ],
    relatedProjectSlugs: ["routepay", "wow-ticket"],
    guides: [{ slug: "app-nativa-o-web", label: "¿App para descargar o página web?" }],
    metaTitle: "App para tu negocio en Chile | Android y iPhone - Proscom",
    metaDescription:
      "Apps para tu equipo en terreno o para tus clientes, en Android y iPhone. Simples, conectadas con tu negocio y fáciles de usar.",
  },
  {
    id: "sistemas-de-gestion",
    slug: "sistemas-de-gestion",
    title: "Sistema de ventas, stock y caja",
    shortDescription:
      "Controla ventas, inventario, caja y cobranzas en un solo lugar, desde el computador o el celular.",
    longDescription:
      "Sabe en todo momento cuánto vendiste, qué te queda en bodega y si la caja cuadra. Un sistema simple que reúne todo tu negocio en una sola pantalla y que puedes revisar desde la oficina, el local o tu casa.",
    iconName: "LayoutDashboard",
    problemsSolved: [
      "Ventas, stock y cuentas repartidas en cuadernos y planillas.",
      "No saber cómo va el negocio hasta fin de mes.",
      "Productos que desaparecen o cajas que no cuadran.",
      "Perder horas buscando papeles cuando el contador los pide.",
    ],
    benefits: [
      "Ves cómo va tu negocio en una sola pantalla.",
      "Informes listos para decidir rápido.",
      "Cada persona tiene su clave y queda registro de cada movimiento.",
      "Lo revisas desde donde estés, con seguridad.",
    ],
    features: [
      "Inventario, ventas, clientes y proveedores.",
      "Cierre y cuadratura de caja diaria.",
      "Cuotas, cobranzas y estados de cuenta.",
      "Avisos cuando un producto se está acabando o algo está por vencer.",
    ],
    targetCompanies: [
      "Comercios, tiendas y cadenas de locales.",
      "Organizaciones sociales, gremios y juntas de vecinos.",
      "Empresas de servicios que hacen presupuestos y cobros.",
    ],
    methodology: [
      { step: 1, title: "Vemos cómo trabajas", description: "Revisamos cómo manejas hoy tus ventas, tu stock y tu caja." },
      { step: 2, title: "Lo configuramos", description: "Cargamos tus precios, productos y las personas que lo usarán." },
      { step: 3, title: "Traemos tu información", description: "Pasamos al sistema tus clientes, productos o socios." },
      { step: 4, title: "Te enseñamos", description: "Capacitamos a quienes lo van a usar todos los días." },
    ],
    faqs: [
      {
        question: "¿Puedo revisarlo fuera de la oficina?",
        answer: "Sí. Entras desde cualquier computador o celular con internet, de forma segura.",
      },
      {
        question: "¿Puedo sacar la información en Excel para el contador?",
        answer: "Sí. Todo se puede descargar en Excel o PDF cuando lo necesites.",
      },
    ],
    relatedProjectSlugs: ["wow-gas", "fundacion-gamboa-gestion", "tesoreria-deportiva", "wowpos"],
    metaTitle: "Sistema de ventas, stock y caja para tu negocio en Chile | Proscom",
    metaDescription:
      "Controla ventas, inventario, caja y cobranzas en un solo lugar. Sistemas de gestión simples para negocios y organizaciones en Chile.",
  },
  {
    id: "integraciones",
    slug: "integraciones",
    title: "Conectar tus sistemas y automatizar tareas",
    shortDescription:
      "Hacemos que tus programas se hablen entre sí, para no copiar datos a mano ni olvidar avisos.",
    longDescription:
      "Si hoy copias información de un lugar a otro, eso se puede hacer solo. Conectamos tu página, tu sistema, tus pagos, la facturación electrónica, el correo y WhatsApp para que la información viaje sola y tus clientes reciban sus avisos a tiempo.",
    iconName: "Network",
    problemsSolved: [
      "Copiar a mano datos entre la página, el sistema contable y las planillas.",
      "Avisos a clientes que se olvidan o llegan tarde.",
      "Pagos y facturas que no calzan entre un sistema y otro.",
    ],
    benefits: [
      "Ahorras horas de trabajo administrativo cada semana.",
      "Se acaban los datos duplicados o con errores.",
      "Tus clientes reciben avisos apenas compran o hacen una solicitud.",
    ],
    features: [
      "Conexión entre tus programas para que compartan información.",
      "La información se actualiza sola en cuanto algo cambia.",
      "Comprobantes y avisos automáticos por correo y WhatsApp.",
      "Registro de todo lo que se envió, para revisar cuando quieras.",
    ],
    targetCompanies: [
      "Tiendas online y empresas con muchas ventas o pedidos al día.",
      "Negocios que usan un programa contable y quieren dejar de digitar.",
      "Empresas de cobranza y logística.",
    ],
    methodology: [
      { step: 1, title: "Revisamos qué usas", description: "Vemos qué programas tienes y qué se puede conectar." },
      { step: 2, title: "Pruebas sin riesgo", description: "Probamos la conexión sin tocar tu operación del día a día." },
      { step: 3, title: "Revisamos cada dato", description: "Nos aseguramos de que la información llegue completa y correcta." },
      { step: 4, title: "Lo activamos", description: "La conexión queda funcionando y la vigilamos los primeros días." },
    ],
    faqs: [
      {
        question: "¿Con qué medios de pago se puede conectar?",
        answer: "Con Webpay (Transbank), Mercado Pago, Flow y otros medios de pago que funcionan en Chile.",
      },
      {
        question: "¿Qué pasa si el otro servicio falla un rato?",
        answer: "El sistema lo vuelve a intentar solo y deja registro, para que no se pierda ninguna venta ni aviso.",
      },
    ],
    relatedProjectSlugs: ["routepay", "wow-ticket"],
    metaTitle: "Conecta tus sistemas y automatiza tareas en Chile | Proscom",
    metaDescription:
      "Conectamos tu página, tu sistema, tus pagos, la facturación electrónica y WhatsApp para que dejes de copiar datos a mano.",
  },
  {
    id: "soporte-tecnologico",
    slug: "soporte-tecnologico",
    title: "Soporte y mantenimiento",
    shortDescription:
      "Alguien de confianza a quien llamar cuando algo falla, y que cuida que tu página y tus sistemas sigan funcionando.",
    longDescription:
      "No necesitas un informático en tu empresa. Nos encargamos de que tu página y tus sistemas funcionen, estén respaldados y seguros, y te ayudamos con las dudas del día a día y antes de comprar cualquier tecnología.",
    iconName: "Headphones",
    problemsSolved: [
      "No tener a quién llamar cuando algo deja de funcionar.",
      "No saber si tu información está respaldada o segura.",
      "Dudas sobre qué comprar o contratar sin gastar de más.",
    ],
    benefits: [
      "Te respondemos directo por WhatsApp y teléfono.",
      "Tu información respaldada y tus sistemas vigilados.",
      "Te aconsejamos para que no pagues por cosas que no necesitas.",
    ],
    features: [
      "Revisamos que tu página y tus sistemas estén siempre en línea.",
      "Respaldos periódicos de tu información, y pruebas de que se pueden recuperar.",
      "Actualizaciones de seguridad al día.",
      "Asesoría para tus próximos pasos en digitalización.",
    ],
    targetCompanies: [
      "Empresas que no tienen un área de informática.",
      "Negocios que no se pueden dar el lujo de que su sistema se caiga.",
      "Instituciones que necesitan revisar o cambiar dónde están alojados sus sistemas.",
    ],
    methodology: [
      { step: 1, title: "Revisión inicial", description: "Vemos en qué estado están tu página y tus sistemas." },
      { step: 2, title: "Plan de respaldo", description: "Dejamos programados los respaldos y las medidas de seguridad." },
      { step: 3, title: "Vigilancia continua", description: "Revisamos que todo funcione antes de que tú notes un problema." },
      { step: 4, title: "Ayuda directa", description: "Un canal directo para tus dudas o cualquier falla." },
    ],
    faqs: [
      {
        question: "¿Cómo les aviso si algo urgente falla?",
        answer: "Los clientes con plan de soporte tienen un canal directo por WhatsApp y teléfono.",
      },
      {
        question: "¿Pueden hacerse cargo de dónde está alojada mi página o sistema?",
        answer:
          "Sí. Nos encargamos del servicio donde están alojados tu página y tus sistemas, para que tú no tengas que preocuparte de eso.",
      },
    ],
    relatedProjectSlugs: ["asociacion-futbol-catemu", "legalfirma"],
    guides: [
      { slug: "seguridad-de-contrasenas", label: "Cómo tener contraseñas seguras" },
      { slug: "seguridad-https", label: "Por qué tu página debe tener candado" },
    ],
    metaTitle: "Soporte y mantenimiento para tu negocio en Chile | Proscom",
    metaDescription:
      "Soporte y mantenimiento de páginas web y sistemas para negocios en Chile. Respaldos, seguridad y ayuda directa por WhatsApp.",
  },
];
