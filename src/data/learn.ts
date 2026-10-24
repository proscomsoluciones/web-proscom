import type { QuizQuestion } from "@/components/learn/lab-ui";

export type LearnLabId =
  | "api"
  | "web"
  | "domain"
  | "cloud"
  | "security"
  | "cost"
  | "email"
  | "payment"
  | "password"
  | "website-type"
  | "cms"
  | "web-scope"
  | "website-wizard"
  | "seo"
  | "responsive"
  | "app-vs-web"
  | "website-checklist";

export const LEARN_CATEGORIES = ["Primeros pasos", "Fundamentos de internet", "Para tu negocio", "Seguridad e infraestructura"] as const;
export type LearnCategory = (typeof LEARN_CATEGORIES)[number];

export interface LearnTopic {
  slug: string;
  lab: LearnLabId;
  number: string;
  title: string;
  question: string;
  shortDescription: string;
  category: LearnCategory;
  iconName:
    | "Network"
    | "Globe"
    | "Link2"
    | "Cloud"
    | "ShieldCheck"
    | "Calculator"
    | "Mail"
    | "CreditCard"
    | "KeyRound"
    | "LayoutTemplate"
    | "LayoutDashboard"
    | "PanelsTopLeft"
    | "HelpCircle"
    | "Search"
    | "Smartphone"
    | "AppWindow"
    | "ListChecks";
  level: "Básico" | "Intermedio";
  minutes: number;
  accent: string;
  intro: string;
  keyPoints: string[];
  glossary: { term: string; def: string }[];
  quiz: QuizQuestion[];
  related: { href: string; label: string; text: string };
  metaTitle: string;
  metaDescription: string;
}

export const learnTopics: LearnTopic[] = [
  {
    slug: "como-funciona-una-api",
    category: "Fundamentos de internet",
    lab: "api",
    number: "01",
    title: "Cómo funciona una API",
    question: "¿Cómo conversa una app con un servidor?",
    shortDescription: "Sigue en 3D el viaje de una solicitud: de la app a la API, a la base de datos y de vuelta. Con cuatro escenarios y un modo «restaurante» sin tecnicismos.",
    iconName: "Network",
    level: "Básico",
    minutes: 5,
    accent: "#19C6E6",
    intro:
      "Cada vez que una app muestra tus pedidos, el clima o tu saldo, detrás hay una API: un intermediario que recibe solicitudes, verifica que estén permitidas, busca la información y responde en un formato ordenado. En este laboratorio verás ese viaje paso a paso.",
    keyPoints: [
      "Una API es un intermediario: la app nunca habla directamente con la base de datos.",
      "Cada solicitud indica qué se quiere hacer (GET para leer, POST para crear) y sobre qué recurso.",
      "La API valida la identidad (token) y los datos antes de tocar la información.",
      "Las respuestas traen un código de estado: 2xx éxito, 4xx error de quien pide, 5xx error del servidor.",
      "Una misma API puede servir a la app móvil, al sitio web y a otros sistemas a la vez.",
    ],
    glossary: [
      { term: "API", def: "Interfaz de Programación de Aplicaciones. Un conjunto de reglas que permite que dos sistemas se comuniquen de forma ordenada y segura." },
      { term: "Endpoint", def: "La «dirección» específica de un recurso dentro de la API, por ejemplo /api/productos o /api/pedidos." },
      { term: "Método HTTP", def: "El verbo de la solicitud: GET (leer), POST (crear), PUT/PATCH (modificar) y DELETE (eliminar)." },
      { term: "JSON", def: "Formato de texto liviano y legible para intercambiar datos. Usa llaves, nombres y valores: { \"nombre\": \"Ana\" }." },
      { term: "Token", def: "Una llave digital temporal que demuestra quién eres. Se envía en cada solicitud para que la API sepa si tienes permiso." },
      { term: "Código de estado", def: "Número que resume el resultado: 200 OK, 201 Creado, 401 No autorizado, 404 No encontrado, 500 Error del servidor." },
    ],
    quiz: [
      {
        q: "¿Qué hace la API cuando recibe una solicitud sin token válido?",
        options: ["La envía igual a la base de datos", "La rechaza con un código 401", "Reinicia el servidor"],
        answer: 1,
        why: "La API funciona como guardia: si no hay una llave válida, responde 401 y la base de datos nunca recibe la solicitud.",
      },
      {
        q: "¿Qué significa el código de estado 404?",
        options: ["Que todo salió bien", "Que el recurso no existe", "Que el servidor está apagado"],
        answer: 1,
        why: "404 = «no encontrado». Es el mismo error que ves cuando una página web no existe.",
      },
      {
        q: "En la analogía del restaurante, ¿quién representa a la API?",
        options: ["El cliente", "El mesero", "La cocina"],
        answer: 1,
        why: "El mesero recibe tu pedido, lo lleva a la cocina (base de datos) y te trae la respuesta.",
      },
    ],
    related: {
      href: "/servicios/integraciones",
      label: "Integraciones con APIs",
      text: "Conectamos tus sistemas, pasarelas de pago y facturación mediante APIs seguras.",
    },
    metaTitle: "¿Cómo funciona una API? Explicación interactiva en 3D | Proscom",
    metaDescription: "Aprende qué es una API y cómo una app se comunica con un servidor y una base de datos, con un laboratorio interactivo en 3D, ejemplos reales y un mini quiz.",
  },
  {
    slug: "como-viaja-una-pagina-web",
    category: "Fundamentos de internet",
    lab: "web",
    number: "02",
    title: "Cómo viaja una página web",
    question: "¿Qué pasa cuando escribes una dirección en el navegador?",
    shortDescription: "DNS, dirección IP, conexión segura y descarga de archivos: todo lo que ocurre en menos de un segundo al abrir un sitio.",
    iconName: "Globe",
    level: "Básico",
    minutes: 4,
    accent: "#8B5CF6",
    intro:
      "Escribir una dirección y ver una página parece instantáneo, pero en ese segundo ocurren varias conversaciones: el navegador averigua dónde está el sitio, abre una conexión segura y descarga cada pieza de la página. Entender este viaje explica por qué algunos sitios cargan rápido y otros no.",
    keyPoints: [
      "El DNS traduce el nombre del sitio (dominio) a una dirección IP, como una guía telefónica.",
      "Antes de intercambiar datos, navegador y servidor establecen una conexión cifrada (TLS).",
      "El servidor primero envía el HTML; luego el navegador pide estilos, scripts e imágenes.",
      "La caché evita repetir trabajo: una segunda visita puede ser mucho más rápida.",
      "Cada paso optimizado mejora la velocidad, la experiencia y el posicionamiento en Google.",
    ],
    glossary: [
      { term: "Dominio", def: "El nombre fácil de recordar de un sitio, como tuempresa.cl." },
      { term: "Dirección IP", def: "El número que identifica a un servidor en internet, como 203.0.113.10." },
      { term: "DNS", def: "Sistema de Nombres de Dominio: el directorio que traduce dominios a direcciones IP." },
      { term: "HTTP / HTTPS", def: "El protocolo con el que el navegador pide páginas al servidor. HTTPS es su versión cifrada." },
      { term: "HTML, CSS y JS", def: "HTML es la estructura y el contenido, CSS el diseño visual y JavaScript la interactividad." },
      { term: "Caché", def: "Copias guardadas temporalmente para no volver a descargar lo que no ha cambiado." },
    ],
    quiz: [
      {
        q: "¿Para qué sirve el DNS?",
        options: ["Para diseñar la página", "Para traducir el dominio a una dirección IP", "Para guardar contraseñas"],
        answer: 1,
        why: "El DNS es la guía telefónica de internet: convierte nombres en direcciones IP.",
      },
      {
        q: "¿Qué llega primero desde el servidor al abrir una página?",
        options: ["Las imágenes", "El HTML", "El certificado de la base de datos"],
        answer: 1,
        why: "El HTML es el esqueleto: le dice al navegador qué otros archivos necesita descargar.",
      },
      {
        q: "¿Por qué una segunda visita suele ser más rápida?",
        options: ["Por la caché", "Porque el sitio se vuelve más liviano", "Porque internet está más libre"],
        answer: 0,
        why: "El navegador reutiliza la IP y los archivos que ya guardó, evitando viajes innecesarios.",
      },
    ],
    related: {
      href: "/servicios/desarrollo-web",
      label: "Desarrollo web profesional",
      text: "Sitios rápidos, optimizados para Google y con excelente puntaje en Core Web Vitals.",
    },
    metaTitle: "¿Cómo viaja una página web? DNS, IP y HTTP explicados | Proscom",
    metaDescription: "Descubre qué ocurre al escribir una dirección web: DNS, dirección IP, HTTPS y descarga de archivos, explicado en un laboratorio interactivo en 3D.",
  },
  {
    slug: "dominio-hosting-y-web",
    category: "Fundamentos de internet",
    lab: "domain",
    number: "03",
    title: "Dominio, hosting y web",
    question: "¿Cómo se conecta un dominio con el hosting y la web?",
    shortDescription: "Completa una misión en 7 pasos: registra el dominio, contrata el hosting, configura el DNS tú mismo, sube la web y activa el candado.",
    iconName: "Link2",
    level: "Básico",
    minutes: 6,
    accent: "#F59E0B",
    intro:
      "Dominio, hosting, DNS, SSL… Son piezas distintas que deben encajar para que un sitio funcione. Un buen ejemplo: el dominio es tu dirección postal, el hosting es la casa y el DNS es el registro que dice qué dirección corresponde a qué casa. En esta misión las conectarás una por una.",
    keyPoints: [
      "El dominio se arrienda por año en un registrador (NIC Chile para los .cl). Debe estar a nombre de tu empresa.",
      "El hosting es el servidor donde vive tu web; al contratarlo recibes una dirección IP.",
      "En la zona DNS, un registro A conecta el dominio con la IP del hosting; un CNAME crea alias como www.",
      "Los cambios de DNS tardan en propagarse por el mundo: de minutos hasta 48 horas.",
      "El certificado SSL activa HTTPS (el candado). Hoy se puede obtener gratis y renovar solo.",
    ],
    glossary: [
      { term: "Registrador", def: "Empresa u organismo autorizado para registrar dominios. Para los .cl es NIC Chile." },
      { term: "Hosting", def: "Servicio de alojamiento: un servidor encendido 24/7 que guarda tu sitio y lo entrega a cada visitante." },
      { term: "Registro A", def: "Indica a qué dirección IP apunta un dominio. Es el que conecta tu nombre con tu hosting." },
      { term: "CNAME", def: "Un alias: hace que un nombre (como www.tuempresa.cl) apunte a otro (tuempresa.cl)." },
      { term: "Registro MX", def: "Indica a qué servidor deben llegar los correos electrónicos de tu dominio." },
      { term: "TTL y propagación", def: "El TTL es el tiempo que los servidores recuerdan una respuesta DNS; por eso los cambios tardan en verse en todo el mundo." },
      { term: "Certificado SSL", def: "Archivo digital que acredita la identidad del sitio y permite cifrar la conexión (HTTPS)." },
    ],
    quiz: [
      {
        q: "¿Qué registro DNS conecta tu dominio con la IP del hosting?",
        options: ["Registro MX", "Registro A", "Registro TXT"],
        answer: 1,
        why: "El registro A apunta el dominio a una dirección IP. El MX es para correo y el TXT para verificaciones.",
      },
      {
        q: "Cambiaste el DNS y aún no ves tu sitio nuevo. ¿Qué es lo más probable?",
        options: ["Se perdió el dominio", "Los cambios se están propagando", "El hosting borró la web"],
        answer: 1,
        why: "Los servidores DNS del mundo actualizan su información de forma gradual, según el TTL.",
      },
      {
        q: "¿A nombre de quién conviene registrar el dominio?",
        options: ["Del desarrollador", "De tu empresa", "Del hosting"],
        answer: 1,
        why: "El dominio es un activo de tu marca: si está a tu nombre, siempre podrás cambiar de proveedor.",
      },
    ],
    related: {
      href: "/servicios/desarrollo-web",
      label: "Desarrollo y publicación de sitios web",
      text: "Nos encargamos del dominio, el hosting, el DNS y el certificado SSL de principio a fin.",
    },
    metaTitle: "¿Cómo conectar un dominio con el hosting? Guía interactiva | Proscom",
    metaDescription: "Aprende cómo se conectan dominio, DNS, hosting y certificado SSL para publicar un sitio web, con una misión interactiva en 3D paso a paso.",
  },
  {
    slug: "que-es-la-nube",
    category: "Seguridad e infraestructura",
    lab: "cloud",
    number: "01",
    title: "Qué es la nube",
    question: "¿Qué significa tener tu sistema «en la nube»?",
    shortDescription: "Simula miles de visitantes, apaga servidores y crea respaldos para entender la escalabilidad y la alta disponibilidad.",
    iconName: "Cloud",
    level: "Intermedio",
    minutes: 5,
    accent: "#0EA5E9",
    intro:
      "«La nube» no es algo etéreo: son centros de datos con miles de servidores que se arriendan por uso. Su gran ventaja es la flexibilidad: puedes sumar capacidad en minutos cuando llega una campaña, resistir fallas sin que tus clientes lo noten y guardar respaldos en otro lugar del mundo.",
    keyPoints: [
      "En la nube pagas por la capacidad que usas, en vez de comprar servidores propios.",
      "El escalado automático agrega servidores cuando sube el tráfico y los quita cuando baja.",
      "Un balanceador de carga reparte las visitas entre varios servidores.",
      "Con varios servidores, la falla de uno no deja el sitio fuera de línea (alta disponibilidad).",
      "Los respaldos en otra región permiten recuperarse incluso de un desastre en un centro de datos.",
    ],
    glossary: [
      { term: "Nube", def: "Servidores y servicios informáticos que se arriendan por internet según el uso, en vez de tenerlos físicamente." },
      { term: "Balanceador de carga", def: "Componente que recibe las visitas y las reparte entre varios servidores para que ninguno se sature." },
      { term: "Escalabilidad", def: "Capacidad de crecer (o reducirse) para atender más o menos usuarios sin perder rendimiento." },
      { term: "Alta disponibilidad", def: "Diseño con redundancia para que el servicio siga funcionando aunque falle alguna pieza." },
      { term: "Respaldo", def: "Copia de seguridad de los datos, guardada en otro lugar para poder restaurarla ante cualquier problema." },
      { term: "Uptime", def: "Porcentaje del tiempo en que un servicio está disponible. 99,9% equivale a menos de 9 horas de caída al año." },
    ],
    quiz: [
      {
        q: "¿Qué hace un balanceador de carga?",
        options: ["Guarda los respaldos", "Reparte las visitas entre servidores", "Diseña la página"],
        answer: 1,
        why: "Distribuye el tráfico para que ningún servidor se sature y, si uno falla, deja de enviarle visitas.",
      },
      {
        q: "Llega un Cyber Day y el tráfico se multiplica. ¿Qué ayuda más?",
        options: ["El escalado automático", "Un dominio más corto", "Cambiar los colores del sitio"],
        answer: 0,
        why: "El escalado automático suma servidores mientras dure el peak y los quita después.",
      },
      {
        q: "¿Por qué guardar respaldos en otra región?",
        options: ["Porque es más barato", "Para recuperarse si falla todo un centro de datos", "Para que el sitio cargue más rápido"],
        answer: 1,
        why: "Si el respaldo está en el mismo lugar que el original, un mismo desastre podría afectar a ambos.",
      },
    ],
    related: {
      href: "/servicios/soporte-tecnologico",
      label: "Soporte, servidores y monitoreo",
      text: "Administramos tu infraestructura en la nube con monitoreo 24/7 y respaldos automáticos.",
    },
    metaTitle: "¿Qué es la nube? Escalabilidad y alta disponibilidad explicadas | Proscom",
    metaDescription: "Entiende qué es la nube, el balanceo de carga, el escalado automático y los respaldos con un simulador interactivo en 3D.",
  },
  {
    slug: "seguridad-https",
    category: "Seguridad e infraestructura",
    lab: "security",
    number: "02",
    title: "Seguridad y HTTPS",
    question: "¿Qué protege realmente el candado 🔒 del navegador?",
    shortDescription: "Envía una contraseña desde un Wi-Fi público y mira qué ve un espía con HTTP y con HTTPS.",
    iconName: "ShieldCheck",
    level: "Básico",
    minutes: 4,
    accent: "#34D399",
    intro:
      "El candado junto a la dirección del sitio indica que la conexión está cifrada con HTTPS. Sin él, cualquier persona en la misma red podría leer lo que envías. Con él, solo tu navegador y el servidor pueden entender los datos. En este laboratorio lo comprobarás con tus propios ojos.",
    keyPoints: [
      "Con HTTP los datos viajan en texto plano: cualquiera en la red puede leerlos.",
      "HTTPS cifra la conexión entre tu navegador y el servidor.",
      "El certificado digital confirma que estás hablando con el sitio correcto y no con un impostor.",
      "La llave secreta se acuerda sin enviarse completa por la red.",
      "HTTPS es obligatorio hoy: protege a tus clientes, evita el aviso «No seguro» y mejora tu posicionamiento.",
    ],
    glossary: [
      { term: "HTTPS", def: "Versión segura de HTTP: la información viaja cifrada entre el navegador y el servidor." },
      { term: "Cifrado", def: "Transformar datos en un código ilegible que solo puede revertir quien tiene la llave correcta." },
      { term: "Certificado digital", def: "Documento electrónico emitido por una autoridad confiable que acredita la identidad de un sitio." },
      { term: "TLS", def: "El protocolo que establece la conexión cifrada (el «saludo» antes de enviar datos)." },
      { term: "Ataque de intermediario", def: "Cuando alguien se ubica entre tú y el sitio para espiar o alterar la comunicación." },
    ],
    quiz: [
      {
        q: "En un Wi-Fi público, ¿qué ve un espía si el sitio usa HTTPS?",
        options: ["Tu contraseña completa", "Datos cifrados e ilegibles", "Nada, ni siquiera que hay tráfico"],
        answer: 1,
        why: "Puede ver que hay tráfico, pero el contenido está cifrado y no puede leerlo.",
      },
      {
        q: "¿Para qué sirve el certificado del sitio?",
        options: ["Para demostrar su identidad", "Para hacerlo más rápido", "Para guardar cookies"],
        answer: 0,
        why: "El navegador lo verifica para asegurarse de que habla con el sitio real.",
      },
      {
        q: "¿Qué muestra el navegador en un sitio sin HTTPS?",
        options: ["Un candado verde", "La advertencia «No seguro»", "Un sello de calidad"],
        answer: 1,
        why: "Los navegadores advierten a los usuarios cuando la conexión no está cifrada.",
      },
    ],
    related: {
      href: "/servicios/soporte-tecnologico",
      label: "Seguridad y mantenimiento",
      text: "Certificados SSL, actualizaciones y buenas prácticas de seguridad para tu sitio o sistema.",
    },
    metaTitle: "¿Qué es HTTPS y por qué importa el candado? Demo interactiva | Proscom",
    metaDescription: "Comprueba con un laboratorio 3D qué puede ver un espía en un Wi-Fi público con HTTP y con HTTPS, y cómo funcionan los certificados y el cifrado.",
  },
  {
    slug: "software-a-medida-o-comprado",
    category: "Para tu negocio",
    lab: "cost",
    number: "01",
    title: "Software a medida o comprado",
    question: "¿Me conviene un software a medida o pagar licencias?",
    shortDescription: "Un simulador con tus números: usuarios, licencias y años. Mira en un gráfico 3D cuándo se cruzan los costos y cuánto ahorras.",
    iconName: "Calculator",
    level: "Básico",
    minutes: 4,
    accent: "#F97316",
    intro:
      "Un software «enlatado» parece barato al principio, pero se paga cada mes por cada usuario, para siempre. Un desarrollo a medida cuesta más al inicio, pero luego es tuyo. ¿Cuál conviene? Depende de tus números. Mueve los controles y descúbrelo.",
    keyPoints: [
      "Las licencias se pagan por usuario y por mes: el costo crece con tu equipo y nunca termina.",
      "El desarrollo a medida tiene un costo inicial mayor y luego solo una mantención.",
      "El punto de equilibrio indica en cuántos meses el desarrollo propio se paga solo.",
      "Con pocos usuarios o necesidades estándar, un software comprado suele convenir.",
      "Más allá del dinero: a medida se adapta a tus procesos y el sistema es de tu empresa.",
    ],
    glossary: [
      { term: "Licencia (SaaS)", def: "Derecho de uso de un software que se paga periódicamente, normalmente por usuario y por mes." },
      { term: "Desarrollo a medida", def: "Software creado específicamente para los procesos de tu empresa. El código y los datos te pertenecen." },
      { term: "Costo total (TCO)", def: "Todo lo que cuesta un sistema durante su vida útil: compra o desarrollo, licencias, mantención, capacitación y migraciones." },
      { term: "Punto de equilibrio", def: "Momento en que el costo acumulado de dos alternativas se iguala. Desde ahí, la más barata a largo plazo empieza a ahorrar." },
      { term: "Mantención", def: "Soporte, correcciones, actualizaciones de seguridad y pequeñas mejoras que mantienen el sistema funcionando." },
    ],
    quiz: [
      {
        q: "¿Qué hace crecer más el costo de un software por licencias?",
        options: ["La cantidad de usuarios y el tiempo", "El color de la interfaz", "La velocidad de internet"],
        answer: 0,
        why: "Las licencias se cobran por usuario y por mes: más personas y más años significan más costo.",
      },
      {
        q: "¿Qué indica el punto de equilibrio?",
        options: ["Cuándo se termina el proyecto", "Cuándo el desarrollo propio se paga solo", "Cuándo vence la licencia"],
        answer: 1,
        why: "Es el mes en que lo pagado en licencias iguala lo invertido en el desarrollo a medida.",
      },
      {
        q: "¿En qué caso suele convenir un software comprado?",
        options: ["Procesos únicos y muchos usuarios", "Procesos estándar y pocos usuarios", "Cuando necesitas integrarlo todo"],
        answer: 1,
        why: "Para necesidades comunes (contabilidad, correo) y equipos pequeños, una solución estándar es práctica y económica.",
      },
    ],
    related: {
      href: "/servicios/software-a-medida",
      label: "Software a medida",
      text: "Te ayudamos a evaluar con tus números reales y desarrollamos el sistema que tu operación necesita.",
    },
    metaTitle: "¿Software a medida o licencias? Simulador de costos | Proscom",
    metaDescription: "Compara el costo de pagar licencias por usuario versus desarrollar un software a medida con un simulador interactivo en 3D y calcula tu punto de equilibrio.",
  },
  {
    slug: "correo-del-dominio",
    category: "Fundamentos de internet",
    lab: "email",
    number: "04",
    title: "El correo de tu dominio",
    question: "¿Cómo funciona el correo de mi empresa y por qué llega a spam?",
    shortDescription: "Registros MX, SPF, DKIM y DMARC explicados como un viaje en 3D: recibir correos, enviarlos bien, evitar el spam y bloquear a los estafadores.",
    iconName: "Mail",
    level: "Intermedio",
    minutes: 5,
    accent: "#EC4899",
    intro:
      "Tener ventas@tuempresa.cl da confianza, pero detrás hay varias piezas: un registro que dice dónde recibir los correos y tres «sellos» que prueban que tus mensajes son auténticos. Si faltan, tus correos terminan en spam o, peor, alguien puede enviar correos haciéndose pasar por tu empresa.",
    keyPoints: [
      "El registro MX le indica al mundo qué servidor recibe los correos de tu dominio.",
      "SPF es la lista de servidores autorizados a enviar correos en nombre de tu dominio.",
      "DKIM es una firma digital que prueba que el correo salió de tu dominio y no fue modificado.",
      "DMARC le dice a Gmail, Outlook y otros qué hacer con los correos que no pasan las verificaciones.",
      "Con los tres bien configurados, tus correos llegan a la bandeja de entrada y se bloquea la suplantación.",
    ],
    glossary: [
      { term: "Registro MX", def: "Registro DNS que indica qué servidores reciben el correo de un dominio, con un orden de prioridad." },
      { term: "SMTP", def: "El protocolo con el que los servidores se entregan correos entre sí." },
      { term: "SPF", def: "Registro TXT con la lista de servidores autorizados a enviar correos usando tu dominio." },
      { term: "DKIM", def: "Firma criptográfica que tu servidor agrega a cada correo; el destinatario la valida con una llave publicada en tu DNS." },
      { term: "DMARC", def: "Política que indica qué hacer con los correos que fallan SPF o DKIM: nada, enviarlos a spam o rechazarlos." },
      { term: "Suplantación (spoofing)", def: "Enviar correos con un remitente falso para hacerse pasar por otra persona o empresa." },
    ],
    quiz: [
      {
        q: "¿Qué registro indica dónde se reciben los correos de tu dominio?",
        options: ["Registro A", "Registro MX", "Registro DKIM"],
        answer: 1,
        why: "El MX (Mail eXchanger) apunta al servidor que recibe el correo.",
      },
      {
        q: "Tus correos llegan a spam. ¿Qué revisarías primero?",
        options: ["El logo del correo", "SPF, DKIM y DMARC", "La velocidad del computador"],
        answer: 1,
        why: "Sin estos registros, los proveedores no pueden comprobar que tus correos son auténticos.",
      },
      {
        q: "¿Qué hace DMARC con un correo que suplanta a tu empresa?",
        options: ["Lo marca como importante", "Aplica tu política, por ejemplo, rechazarlo", "Lo reenvía a tu jefe"],
        answer: 1,
        why: "DMARC indica a los receptores qué hacer con correos que fallan las verificaciones.",
      },
    ],
    related: {
      href: "/servicios/soporte-tecnologico",
      label: "Configuración de correo y dominio",
      text: "Configuramos correctamente MX, SPF, DKIM y DMARC para que tus correos lleguen y nadie suplante a tu empresa.",
    },
    metaTitle: "¿Por qué mis correos llegan a spam? MX, SPF, DKIM y DMARC | Proscom",
    metaDescription: "Aprende cómo funciona el correo de tu dominio y cómo evitar el spam y la suplantación con MX, SPF, DKIM y DMARC, en un laboratorio interactivo 3D.",
  },
  {
    slug: "pasarela-de-pago",
    category: "Para tu negocio",
    lab: "payment",
    number: "02",
    title: "Cómo funciona una pasarela de pago",
    question: "¿Qué pasa cuando pagas con tarjeta en una tienda online?",
    shortDescription: "Cliente, tienda, pasarela y banco conversando en 3D: pago aprobado, rechazado y con verificación de tu banco.",
    iconName: "CreditCard",
    level: "Básico",
    minutes: 4,
    accent: "#22C55E",
    intro:
      "Cuando pagas en una tienda online, tus datos de tarjeta nunca pasan por la tienda: viajan a una pasarela de pago especializada que conversa con tu banco y luego le confirma a la tienda si el pago fue aprobado. Así se protege al cliente y se simplifica la vida del comercio.",
    keyPoints: [
      "La tienda crea un cobro en la pasarela, pero nunca ve ni guarda los datos de la tarjeta.",
      "El cliente ingresa su tarjeta en el sitio seguro de la pasarela.",
      "La pasarela pide autorización al banco emisor de la tarjeta, que aprueba o rechaza.",
      "Muchos bancos piden un segundo paso (clave dinámica o app) para confirmar que eres tú.",
      "La tienda confirma el pedido solo cuando recibe el aviso de la pasarela (webhook), no antes.",
    ],
    glossary: [
      { term: "Pasarela de pago", def: "Servicio que procesa pagos con tarjeta de forma segura y se conecta con los bancos (por ejemplo, Webpay, Mercado Pago o Flow)." },
      { term: "Banco emisor", def: "El banco que entregó la tarjeta al cliente. Es quien aprueba o rechaza cada compra." },
      { term: "Autorización", def: "Respuesta del banco que confirma que la tarjeta es válida y tiene cupo para el monto." },
      { term: "3-D Secure", def: "Verificación adicional en compras online: el banco pide una clave dinámica o una aprobación en su app." },
      { term: "Webhook", def: "Aviso automático que un sistema envía a otro cuando ocurre algo, como «el pago fue aprobado»." },
      { term: "PCI DSS", def: "Normas de seguridad para manejar datos de tarjetas. Usar una pasarela evita que tu tienda tenga que almacenarlos." },
    ],
    quiz: [
      {
        q: "¿Quién ve los datos completos de la tarjeta?",
        options: ["La tienda", "La pasarela de pago", "Cualquier vendedor"],
        answer: 1,
        why: "El cliente ingresa la tarjeta en el sitio de la pasarela; la tienda nunca la recibe.",
      },
      {
        q: "¿Quién decide si un pago se aprueba?",
        options: ["El banco emisor", "La tienda", "El cliente"],
        answer: 0,
        why: "El banco revisa la tarjeta y el cupo, y autoriza o rechaza el cargo.",
      },
      {
        q: "¿Cuándo debe confirmar la tienda el pedido?",
        options: ["Al presionar «Pagar»", "Cuando la pasarela avisa que el pago fue aprobado", "Al día siguiente"],
        answer: 1,
        why: "La confirmación de servidor a servidor (webhook) es la fuente confiable del resultado del pago.",
      },
    ],
    related: {
      href: "/servicios/integraciones",
      label: "Integración de pagos",
      text: "Integramos Webpay, Mercado Pago y otras pasarelas a tu tienda o sistema, con boletas y stock sincronizados.",
    },
    metaTitle: "¿Cómo funciona una pasarela de pago? Explicación interactiva | Proscom",
    metaDescription: "Descubre qué ocurre al pagar con tarjeta en una tienda online: tienda, pasarela de pago, banco y verificación, en un laboratorio interactivo en 3D.",
  },
  {
    slug: "seguridad-de-contrasenas",
    category: "Seguridad e infraestructura",
    lab: "password",
    number: "03",
    title: "Contraseñas seguras",
    question: "¿Cuánto tardarían en adivinar tu contraseña?",
    shortDescription: "Prueba contraseñas y mira en 3D cuántas barreras levantan contra un ataque, activa el doble factor y juega a detectar enlaces falsos.",
    iconName: "KeyRound",
    level: "Básico",
    minutes: 4,
    accent: "#A855F7",
    intro:
      "La mayoría de los accesos indebidos no ocurren por ataques sofisticados, sino por contraseñas débiles, repetidas o entregadas en páginas falsas. Aquí puedes probar contraseñas de ejemplo, ver cuánto resistirían a un programa de ataque y aprender a reconocer un enlace engañoso.",
    keyPoints: [
      "El largo es lo que más protege: 12 caracteres o más, idealmente una frase.",
      "Las palabras comunes con números al final (chile123) se adivinan en segundos.",
      "Usa una contraseña distinta para cada servicio; un gestor de contraseñas ayuda a recordarlas.",
      "El doble factor (2FA) protege tu cuenta incluso si tu contraseña se filtra.",
      "Antes de escribir tu clave, revisa el dominio real en la barra de direcciones.",
    ],
    glossary: [
      { term: "Ataque de fuerza bruta", def: "Probar automáticamente miles de millones de combinaciones hasta encontrar la contraseña." },
      { term: "Ataque de diccionario", def: "Probar primero palabras comunes, nombres y contraseñas filtradas, con variaciones típicas." },
      { term: "Doble factor (2FA)", def: "Pedir algo más que la contraseña, como un código en el celular, para iniciar sesión." },
      { term: "Phishing", def: "Engaño que imita a una empresa o banco para que entregues tus datos en una página falsa." },
      { term: "Gestor de contraseñas", def: "Aplicación que crea y guarda contraseñas únicas y robustas para cada servicio." },
    ],
    quiz: [
      {
        q: "¿Qué hace más segura a una contraseña?",
        options: ["Que sea larga", "Que tenga tu fecha de nacimiento", "Que sea igual en todos lados"],
        answer: 0,
        why: "Cada carácter extra multiplica las combinaciones posibles que un atacante debe probar.",
      },
      {
        q: "Si tu contraseña se filtra, ¿qué te sigue protegiendo?",
        options: ["El doble factor", "El antivirus del computador", "Nada"],
        answer: 0,
        why: "Con 2FA, el atacante también necesitaría el código que llega a tu celular.",
      },
      {
        q: "En «bancoejemplo.cl.verificar.com/login», ¿cuál es el dominio real?",
        options: ["bancoejemplo.cl", "verificar.com", "login"],
        answer: 1,
        why: "El dominio es lo que está justo antes de la primera «/». Lo de adelante puede ser cualquier texto.",
      },
    ],
    related: {
      href: "/servicios/soporte-tecnologico",
      label: "Seguridad para tu empresa",
      text: "Implementamos doble factor, políticas de contraseñas y buenas prácticas de seguridad en tus sistemas.",
    },
    metaTitle: "¿Qué tan segura es tu contraseña? Prueba interactiva | Proscom",
    metaDescription: "Prueba contraseñas de ejemplo, descubre cuánto tardarían en descifrarlas, activa el doble factor y aprende a detectar enlaces falsos en un laboratorio 3D.",
  },
  {
    slug: "web-informativa-o-autoadministrable",
    category: "Primeros pasos",
    lab: "website-type",
    number: "01",
    title: "Web informativa o autoadministrable",
    question: "¿Quién va a poder editar tu sitio después de publicado?",
    shortDescription: "Compara una web informativa fija con una autoadministrable (CMS) y prueba en vivo qué pasa cuando intentas editar un texto en cada una.",
    iconName: "LayoutTemplate",
    level: "Básico",
    minutes: 3,
    accent: "#19C6E6",
    intro:
      "No todas las webs funcionan igual por dentro. Algunas se entregan «cerradas», listas para mostrar información, y cualquier cambio requiere pedírselo a quien la desarrolló. Otras incluyen un panel de administración para que tú mismo edites textos, fotos y precios cuando quieras. Elegir bien evita sorpresas y costos innecesarios.",
    keyPoints: [
      "Informativa: más económica y rápida de lanzar, ideal si el contenido casi no cambia.",
      "Autoadministrable: incluye un panel (CMS) para editar textos e imágenes sin saber programar.",
      "Cada cambio en una web informativa implica contactar al desarrollador y esperar.",
      "Un CMS bien pensado no es más lento ni menos profesional que una web fija.",
      "La elección correcta depende de qué tan seguido necesitas actualizar el contenido.",
    ],
    glossary: [
      { term: "Web informativa", def: "Sitio cuyo contenido se programa directamente en el código; cambiarlo requiere trabajo de desarrollo." },
      { term: "Web autoadministrable", def: "Sitio con un panel de administración donde el propio cliente edita contenido sin tocar código." },
      { term: "CMS", def: "Sistema de Gestión de Contenidos: el panel que permite editar un sitio autoadministrable." },
      { term: "Panel de administración", def: "Área privada, con usuario y contraseña, desde donde se edita el contenido del sitio." },
    ],
    quiz: [
      {
        q: "Si cambias tus precios cada semana, ¿qué tipo de web te conviene más?",
        options: ["Informativa", "Autoadministrable", "Da igual"],
        answer: 1,
        why: "Con un panel autoadministrable editas tú mismo sin esperar ni pagar por cada cambio.",
      },
      {
        q: "¿Qué necesita una web informativa para actualizar un texto?",
        options: ["Solo iniciar sesión", "Pedirlo al desarrollador", "Nada, se actualiza sola"],
        answer: 1,
        why: "Al no tener panel, cualquier cambio de contenido implica modificar el código.",
      },
    ],
    related: {
      href: "/servicios/desarrollo-web",
      label: "Páginas web a tu medida",
      text: "Desarrollamos sitios informativos y autoadministrables, según lo que tu negocio realmente necesita.",
    },
    metaTitle: "Web informativa o autoadministrable: ¿cuál elegir? | Proscom",
    metaDescription: "Descubre la diferencia entre una web informativa y una autoadministrable (CMS) con un laboratorio interactivo, y cuál conviene según tu negocio.",
  },
  {
    slug: "que-es-un-cms",
    category: "Primeros pasos",
    lab: "cms",
    number: "02",
    title: "¿Qué es un CMS?",
    question: "¿Cómo se actualiza una web autoadministrable por dentro?",
    shortDescription: "Sigue paso a paso cómo un cambio escrito en el panel de administración llega a verse en la web en vivo, sin tocar código.",
    iconName: "LayoutDashboard",
    level: "Básico",
    minutes: 3,
    accent: "#1479D4",
    intro:
      "CMS significa «Sistema de Gestión de Contenidos»: un panel privado donde se escribe y organiza el contenido de un sitio, separado del diseño. Al guardar, ese contenido se publica automáticamente en la web pública. Así es como un administrador sin conocimientos técnicos mantiene el sitio al día.",
    keyPoints: [
      "El CMS separa el contenido (textos, fotos) del diseño del sitio.",
      "Editar y publicar no requiere escribir código ni subir archivos por FTP.",
      "Los cambios pueden guardarse como borrador antes de publicarse.",
      "Cada usuario del panel puede tener permisos distintos (editor, administrador).",
      "Un buen CMS a medida muestra justo los campos que tu equipo necesita, sin complicarlo.",
    ],
    glossary: [
      { term: "CMS", def: "Sistema de Gestión de Contenidos: panel para crear y editar el contenido de un sitio." },
      { term: "Borrador", def: "Una versión guardada de un contenido que todavía no se publica en la web pública." },
      { term: "Publicar", def: "Hacer visible un contenido editado para todas las personas que visiten el sitio." },
      { term: "Rol de usuario", def: "Nivel de permisos de una cuenta dentro del panel: qué puede ver, editar o publicar." },
    ],
    quiz: [
      {
        q: "¿Qué separa un CMS del diseño del sitio?",
        options: ["El contenido", "El dominio", "El hosting"],
        answer: 0,
        why: "El CMS guarda el contenido aparte, así puedes editarlo sin tocar el diseño ni el código.",
      },
      {
        q: "¿Qué permite hacer un borrador en un CMS?",
        options: ["Publicar sin revisar", "Guardar cambios sin que se vean aún", "Eliminar el sitio"],
        answer: 1,
        why: "El borrador se revisa con calma y se publica solo cuando está listo.",
      },
    ],
    related: {
      href: "/servicios/desarrollo-web",
      label: "Sitios con panel de administración",
      text: "Construimos paneles CMS a medida, con exactamente los campos que tu equipo necesita editar.",
    },
    metaTitle: "¿Qué es un CMS y cómo funciona? Explicación interactiva | Proscom",
    metaDescription: "Aprende cómo un panel de administración (CMS) permite editar una web sin programar, con un laboratorio paso a paso.",
  },
  {
    slug: "web-completa-o-landing-page",
    category: "Primeros pasos",
    lab: "web-scope",
    number: "03",
    title: "Web completa o landing page",
    question: "¿Necesitas un sitio con varias secciones o una sola página enfocada?",
    shortDescription: "Compara el mapa de un sitio completo contra una landing page de una sola página y descubre cuándo conviene cada uno.",
    iconName: "PanelsTopLeft",
    level: "Básico",
    minutes: 3,
    accent: "#8B5CF6",
    intro:
      "«Landing page» y «web completa» no son solo tamaños distintos: cumplen objetivos distintos. Una landing concentra toda la atención en una sola acción (dejar tus datos, comprar, reservar), mientras que una web completa organiza mucha información en varias secciones y páginas para quien quiere explorar.",
    keyPoints: [
      "Landing page: una sola página, un solo objetivo, ideal para campañas y lanzamientos.",
      "Web completa: varias páginas (inicio, servicios, nosotros, contacto…) para negocios con más que contar.",
      "Una landing suele convertir mejor cuando hay un objetivo específico y tráfico pagado.",
      "Una web completa ayuda más al SEO, porque Google puede indexar varias páginas de contenido.",
      "Nada impide partir con una landing y crecer después hacia una web completa.",
    ],
    glossary: [
      { term: "Landing page", def: "Página única enfocada en lograr una sola acción del visitante, sin menú de navegación extenso." },
      { term: "Web completa (multipágina)", def: "Sitio con varias páginas enlazadas entre sí: inicio, servicios, nosotros, contacto, etc." },
      { term: "Conversión", def: "Cuando un visitante realiza la acción que buscabas: dejar sus datos, comprar o contactarte." },
      { term: "Mapa del sitio (sitemap)", def: "Esquema que muestra todas las páginas de un sitio y cómo se conectan entre sí." },
    ],
    quiz: [
      {
        q: "¿Qué tipo de sitio conviene más para una campaña de un solo producto?",
        options: ["Landing page", "Web completa", "Ninguno funciona"],
        answer: 0,
        why: "La landing concentra toda la atención en una sola acción, sin distraer con otras secciones.",
      },
      {
        q: "¿Qué ventaja tiene una web completa frente a una landing?",
        options: ["Es siempre más barata", "Ayuda más al SEO por tener más páginas", "No necesita dominio"],
        answer: 1,
        why: "Más páginas de contenido relevante le dan a Google más oportunidades de mostrarte en resultados distintos.",
      },
    ],
    related: {
      href: "/servicios/desarrollo-web",
      label: "Landing pages y sitios completos",
      text: "Diseñamos tanto landing pages orientadas a conversión como sitios completos para negocios en crecimiento.",
    },
    metaTitle: "Web completa o landing page: ¿cuál elegir? | Proscom",
    metaDescription: "Compara una landing page con una web completa de varias secciones y descubre cuál conviene según tu objetivo.",
  },
  {
    slug: "que-tipo-de-web-necesito",
    category: "Primeros pasos",
    lab: "website-wizard",
    number: "04",
    title: "¿Qué tipo de web necesito?",
    question: "Responde 3 preguntas y descubre qué tipo de sitio te conviene",
    shortDescription: "Un cuestionario rápido que, según tus respuestas, te recomienda landing page, web informativa, web autoadministrable o tienda online.",
    iconName: "HelpCircle",
    level: "Básico",
    minutes: 2,
    accent: "#19C6E6",
    intro:
      "Antes de pedir una cotización, conviene tener clara una cosa: qué tipo de sitio necesitas. Este cuestionario resume en pocas preguntas las decisiones que normalmente tomamos junto a un cliente en la primera reunión, y te entrega una recomendación inicial orientativa.",
    keyPoints: [
      "El objetivo del sitio (vender, informar, generar contactos) es la primera pregunta a responder.",
      "La frecuencia con la que cambiará el contenido determina si necesitas un panel de administración.",
      "Vender productos en línea agrega requisitos: catálogo, carrito y pasarela de pago.",
      "La cantidad de secciones que necesitas contar define si te conviene una landing o un sitio completo.",
      "Esta recomendación es un punto de partida; la propuesta final se ajusta en una conversación con nuestro equipo.",
    ],
    glossary: [
      { term: "Landing page", def: "Página única enfocada en una sola acción del visitante." },
      { term: "Web informativa", def: "Sitio de contenido fijo, sin panel de edición propio." },
      { term: "Web autoadministrable", def: "Sitio con panel (CMS) para que tú mismo edites el contenido." },
      { term: "Tienda online", def: "Sitio con catálogo, carrito de compras y pago en línea." },
    ],
    quiz: [
      {
        q: "Si vas a vender productos directamente en tu sitio, ¿qué necesitas sí o sí?",
        options: ["Una landing page simple", "Catálogo, carrito y pasarela de pago", "Solo un formulario de contacto"],
        answer: 1,
        why: "Vender en línea requiere mostrar productos, permitir agregarlos a un carrito y procesar el pago de forma segura.",
      },
      {
        q: "¿Qué pregunta ayuda a decidir si necesitas un CMS?",
        options: ["Cuántas visitas esperas", "Qué tan seguido cambiará el contenido", "Qué colores prefieres"],
        answer: 1,
        why: "Si el contenido cambia seguido, un panel de administración te ahorra tiempo y dinero a largo plazo.",
      },
    ],
    related: {
      href: "/contacto",
      label: "Cotiza tu proyecto",
      text: "Cuéntanos el resultado de tu cuestionario y afinemos juntos la propuesta exacta para tu negocio.",
    },
    metaTitle: "¿Qué tipo de web necesito? Cuestionario interactivo | Proscom",
    metaDescription: "Responde un cuestionario rápido y descubre si necesitas una landing page, una web informativa, una autoadministrable o una tienda online.",
  },
  {
    slug: "seo-como-me-encuentran-en-google",
    category: "Primeros pasos",
    lab: "seo",
    number: "05",
    title: "SEO: cómo me encuentran en Google",
    question: "¿Por qué una web nueva no aparece de inmediato en Google?",
    shortDescription: "Activa y desactiva factores de SEO (velocidad, títulos, contenido, enlaces) y mira en vivo cómo sube o baja tu posición simulada en el buscador.",
    iconName: "Search",
    level: "Básico",
    minutes: 4,
    accent: "#10B981",
    intro:
      "SEO (optimización para buscadores) es el conjunto de prácticas que ayudan a que Google entienda de qué trata tu sitio y lo muestre a las personas correctas. No es magia ni algo instantáneo: una web nueva primero debe ser encontrada, analizada y, recién después, posicionada. Aquí puedes ver qué factores mueven realmente la aguja.",
    keyPoints: [
      "Una web nueva no aparece de inmediato: Google primero necesita encontrarla e indexarla.",
      "La velocidad de carga y la versión móvil influyen directamente en el posicionamiento.",
      "Títulos y descripciones claros ayudan a Google (y a las personas) a entender cada página.",
      "Contenido útil y original posiciona mejor que contenido copiado o muy genérico.",
      "Los enlaces desde otros sitios confiables funcionan como «votos de confianza» para Google.",
    ],
    glossary: [
      { term: "SEO", def: "Optimización para motores de búsqueda: técnicas para que un sitio aparezca mejor posicionado en buscadores como Google." },
      { term: "Indexar", def: "Cuando Google guarda una página en su base de datos para poder mostrarla en resultados." },
      { term: "Meta título y descripción", def: "El texto y el resumen que aparecen en el resultado de búsqueda, antes de entrar al sitio." },
      { term: "Core Web Vitals", def: "Métricas de Google sobre velocidad y estabilidad visual de una página." },
      { term: "Enlace entrante (backlink)", def: "Un enlace desde otro sitio web hacia el tuyo, que suma confianza frente a Google." },
    ],
    quiz: [
      {
        q: "¿Por qué una web recién publicada no aparece de inmediato en Google?",
        options: ["Porque Google cobra por aparecer", "Porque primero debe encontrarla e indexarla", "Porque los sitios nuevos están prohibidos"],
        answer: 1,
        why: "Indexar toma tiempo: Google debe rastrear el sitio, entenderlo y decidir dónde ubicarlo.",
      },
      {
        q: "¿Qué factor de SEO depende directamente de la velocidad del sitio?",
        options: ["Core Web Vitals", "El nombre del dominio", "El color del logo"],
        answer: 0,
        why: "Core Web Vitals mide, entre otras cosas, cuánto tarda en cargar y estabilizarse visualmente una página.",
      },
    ],
    related: {
      href: "/servicios/desarrollo-web",
      label: "Webs con SEO técnico incluido",
      text: "Construimos sitios rápidos, bien estructurados y pensados para posicionar desde el primer día.",
    },
    metaTitle: "SEO: ¿cómo me encuentran en Google? Laboratorio interactivo | Proscom",
    metaDescription: "Activa y desactiva factores de SEO y observa cómo cambia tu posición simulada en Google, en un laboratorio interactivo.",
  },
  {
    slug: "que-es-una-web-responsive",
    category: "Primeros pasos",
    lab: "responsive",
    number: "06",
    title: "Qué es una web responsive",
    question: "¿Cómo se ve tu web en el celular, la tablet y el computador?",
    shortDescription: "Arrastra el ancho de la pantalla y mira en vivo cómo un mismo sitio responsive reorganiza su menú, columnas y botones.",
    iconName: "Smartphone",
    level: "Básico",
    minutes: 3,
    accent: "#F59E0B",
    intro:
      "Una web «responsive» no es una web distinta para cada dispositivo, sino un mismo diseño flexible que se reorganiza según el ancho de pantalla disponible. El menú se convierte en un botón, las columnas se apilan y el texto se ajusta, todo con el mismo código.",
    keyPoints: [
      "La mayoría del tráfico hoy llega desde celulares: una web no responsive pierde clientes.",
      "El diseño no se achica proporcionalmente: los elementos se reorganizan según el espacio.",
      "Google prioriza en sus resultados las webs que funcionan bien en móvil («mobile first»).",
      "Probar en varios anchos durante el desarrollo evita textos cortados o botones inalcanzables.",
      "Responsive no es solo «que se vea bien»: también afecta qué tan fácil es usar el sitio con el dedo.",
    ],
    glossary: [
      { term: "Responsive", def: "Diseño web que se adapta automáticamente al ancho de pantalla del dispositivo." },
      { term: "Breakpoint", def: "Ancho de pantalla en el que el diseño cambia de disposición (por ejemplo, de 3 columnas a 1)." },
      { term: "Mobile first", def: "Estrategia de diseñar primero para celular y luego ampliar para pantallas más grandes." },
      { term: "Viewport", def: "El área visible de la página dentro del navegador o pantalla del dispositivo." },
    ],
    quiz: [
      {
        q: "¿Qué hace una web responsive cuando la pantalla se achica?",
        options: ["Oculta la mitad del contenido sin avisar", "Reorganiza el diseño para que siga siendo usable", "Deja de funcionar"],
        answer: 1,
        why: "El contenido se reorganiza (columnas que se apilan, menú que se colapsa) en vez de simplemente achicarse.",
      },
      {
        q: "¿Qué es un breakpoint?",
        options: ["Un error de programación", "El ancho donde el diseño cambia de disposición", "El nombre del dominio"],
        answer: 1,
        why: "En cada breakpoint el diseño «rompe» a una disposición distinta, pensada para ese rango de pantallas.",
      },
    ],
    related: {
      href: "/servicios/desarrollo-web",
      label: "Webs responsive desde el diseño",
      text: "Diseñamos cada sitio probado en celular, tablet y computador antes de entregarlo.",
    },
    metaTitle: "¿Qué es una web responsive? Demostración interactiva | Proscom",
    metaDescription: "Arrastra el ancho de pantalla y mira en vivo cómo una web responsive reorganiza su menú y contenido, con ejemplos interactivos.",
  },
  {
    slug: "app-nativa-o-web",
    category: "Primeros pasos",
    lab: "app-vs-web",
    number: "07",
    title: "App nativa, web app o PWA",
    question: "¿Necesitas una app de verdad o una web que se comporta como una?",
    shortDescription: "Compara app nativa, web app y PWA lado a lado: costo, tiempo, tiendas de apps, funcionamiento sin conexión y actualizaciones.",
    iconName: "AppWindow",
    level: "Básico",
    minutes: 3,
    accent: "#EC4899",
    intro:
      "«Necesito una app» es una de las frases más comunes y, muchas veces, no es lo que realmente se necesita. Existen tres caminos distintos —app nativa, web app (sitio responsive) y PWA— con costos y capacidades muy distintas. Elegir bien ahorra tiempo y dinero.",
    keyPoints: [
      "App nativa: la más capaz y costosa, se descarga desde App Store o Google Play.",
      "Web app: tu sitio funciona también perfecto desde el celular, sin instalar nada.",
      "PWA: una web app que se puede «instalar» en la pantalla de inicio y funciona algo offline.",
      "No todo negocio necesita estar en las tiendas de apps para tener presencia móvil.",
      "La necesidad real (cámara, notificaciones push, uso sin internet) determina qué camino conviene.",
    ],
    glossary: [
      { term: "App nativa", def: "Aplicación creada específicamente para iOS o Android, descargada desde una tienda de apps." },
      { term: "Web app", def: "Sitio web diseñado para usarse perfectamente desde el navegador del celular, sin instalación." },
      { term: "PWA", def: "Progressive Web App: una web app que puede instalarse en la pantalla de inicio y funcionar parcialmente sin internet." },
      { term: "Notificación push", def: "Aviso que llega al dispositivo aunque la app no esté abierta en ese momento." },
    ],
    quiz: [
      {
        q: "¿Qué opción no requiere pasar por una tienda de aplicaciones?",
        options: ["App nativa", "Web app o PWA", "Ninguna"],
        answer: 1,
        why: "Las web apps y PWA se acceden directamente desde el navegador o un acceso directo, sin tienda de apps.",
      },
      {
        q: "¿Qué puede ofrecer una PWA que una web app normal no?",
        options: ["Funcionar algo sin conexión e instalarse en la pantalla de inicio", "Ser gratis siempre", "No necesitar dominio"],
        answer: 0,
        why: "La PWA agrega capacidades como un ícono instalable y cierto funcionamiento offline, sin ser una app nativa completa.",
      },
    ],
    related: {
      href: "/servicios/aplicaciones-moviles",
      label: "Apps móviles a medida",
      text: "Te ayudamos a elegir el camino correcto entre app nativa, web app o PWA según tu caso real.",
    },
    metaTitle: "App nativa, web app o PWA: ¿cuál necesitas? | Proscom",
    metaDescription: "Compara app nativa, web app y PWA en costo, tiempo y capacidades, con un laboratorio interactivo, y descubre qué camino te conviene.",
  },
  {
    slug: "que-necesito-antes-de-pedir-mi-web",
    category: "Primeros pasos",
    lab: "website-checklist",
    number: "08",
    title: "Qué necesito antes de pedir mi web",
    question: "¿Qué debo tener listo antes de contactar a un desarrollador?",
    shortDescription: "Marca una checklist interactiva con lo esencial —logo, textos, fotos, dominio y objetivos— y mira tu nivel de preparación en vivo.",
    iconName: "ListChecks",
    level: "Básico",
    minutes: 2,
    accent: "#19C6E6",
    intro:
      "Llegar preparado a la primera conversación con tu desarrollador acelera todo el proyecto: menos idas y vueltas, cotizaciones más precisas y un sitio que refleja mejor tu negocio desde el primer borrador. Esta checklist resume lo que normalmente pedimos antes de empezar.",
    keyPoints: [
      "No necesitas tenerlo todo perfecto, pero sí tener claridad sobre tu negocio y objetivos.",
      "El dominio (nombre de tu sitio) conviene reservarlo apenas lo decidas, antes que alguien más lo use.",
      "Textos y fotos propias, aunque sean simples, valen más que contenido genérico de relleno.",
      "Definir el objetivo principal del sitio (vender, informar, generar contactos) guía todo el diseño.",
      "Mientras más preparación llegues, más preciso será el tiempo y costo de tu cotización.",
    ],
    glossary: [
      { term: "Dominio", def: "El nombre de tu sitio en internet, como tuempresa.cl, que debe registrarse y renovarse." },
      { term: "Briefing", def: "La información inicial que entrega un cliente para que el equipo de desarrollo entienda el proyecto." },
      { term: "Identidad visual", def: "Logo, colores y tipografía que representan visualmente a una marca." },
      { term: "Objetivo del sitio", def: "La acción principal que se espera que haga un visitante al llegar a la web." },
    ],
    quiz: [
      {
        q: "¿Qué conviene reservar lo antes posible al definir tu proyecto?",
        options: ["El dominio", "El hosting final", "El contrato de mantención"],
        answer: 0,
        why: "El nombre de dominio puede ser registrado por otra persona si se demora en reservarlo.",
      },
      {
        q: "¿Por qué conviene definir el objetivo principal del sitio antes de diseñarlo?",
        options: ["Porque lo exige la ley", "Porque guía las decisiones de diseño y contenido", "No tiene ninguna relación"],
        answer: 1,
        why: "Un sitio pensado para vender se diseña distinto a uno pensado solo para informar o generar contactos.",
      },
    ],
    related: {
      href: "/contacto",
      label: "Cotiza tu proyecto",
      text: "Cuéntanos en qué vas de tu checklist y te ayudamos a completar lo que falte.",
    },
    metaTitle: "Qué necesito antes de pedir mi web: checklist interactiva | Proscom",
    metaDescription: "Marca una checklist interactiva con lo esencial antes de pedir tu web: logo, textos, fotos, dominio y objetivos.",
  },
];

export const getLearnTopic = (slug: string) => learnTopics.find((t) => t.slug === slug);
