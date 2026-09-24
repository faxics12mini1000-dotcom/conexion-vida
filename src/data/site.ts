/**
 * Configuración global del sitio.
 * Todo lo marcado como "EDITAR" son datos de ejemplo que la iglesia debe confirmar.
 */

export const siteConfig = {
  name: "Conexión Vida",
  tagline: "Una iglesia actual. Personas reales.",
  description:
    "Conexión Vida es una iglesia contemporánea en Querétaro y Celaya: una puerta de entrada para conocer la fe y una comunidad donde pertenecer.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** EDITAR: correo que recibirá peticiones de oración y solicitudes de grupo. */
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@conexionvida.example",
} as const;

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Campus", href: "#campus" },
  { label: "Primera Vez", href: "#primera-vez" },
  { label: "Mensajes", href: "#mensajes" },
  { label: "Próximos Pasos", href: "#proximos-pasos" },
] as const;

/** Genera la URL de una foto de Unsplash con recorte y formato automático. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export interface SiteImage {
  src: string;
  alt: string;
}

/**
 * Placeholders de Unsplash listos para reemplazar por fotos oficiales
 * (por ejemplo, las de los Instagrams de cada campus).
 */
export const images = {
  hero: {
    src: unsplash("1516450360452-9312f5e86fc7"),
    alt: "Congregación levantando las manos durante un tiempo de alabanza contemporánea",
  },
  worship: {
    src: unsplash("1438232992991-995b7058bbb3"),
    alt: "Persona con la mano levantada en un servicio de adoración",
  },
  queretaro: {
    src: unsplash("1523580494863-6f3031224c94"),
    alt: "Auditorio moderno con pantallas y asientos para la congregación",
  },
  celaya: {
    src: unsplash("1517457373958-b7bdd4587205"),
    alt: "Comunidad reunida bajo luces cálidas en un espacio abierto",
  },
  community: {
    src: unsplash("1543269865-cbf427effbad"),
    alt: "Grupo de jóvenes conversando alrededor de una mesa",
  },
  friends: {
    src: unsplash("1529156069898-49953e39b3ac"),
    alt: "Jóvenes sentados juntos, abrazados, mirando el horizonte",
  },
  women: {
    src: unsplash("1491438590914-bc09fcaaf77a"),
    alt: "Amigas sonriendo y conversando",
  },
  hands: {
    src: unsplash("1531206715517-5c0ba140b2b8"),
    alt: "Manos de un grupo unidas en el centro",
  },
  kidsPlay: {
    src: unsplash("1503454537195-1dcabb73ffb9"),
    alt: "Niña sonriendo con pintura en la cara",
  },
  kidsCraft: {
    src: unsplash("1596464716127-f2a82984de30"),
    alt: "Actividad de manualidades con marcadores y pinturas",
  },
  kidsBook: {
    src: unsplash("1485546246426-74dc88dec4d9"),
    alt: "Niño sorprendido sosteniendo un libro",
  },
  seriesHero: {
    src: unsplash("1507692049790-de58290a4334"),
    alt: "Tiempo de alabanza con luces azules y la palabra Jesús",
  },
  messageA: {
    src: unsplash("1478147427282-58a87a120781"),
    alt: "Manos levantadas en la penumbra durante un servicio",
  },
  messageB: {
    src: unsplash("1475483768296-6163e08872a1"),
    alt: "Amigos reunidos alrededor de una fogata de noche",
  },
  messageC: {
    src: unsplash("1497633762265-9d179a990aa6"),
    alt: "Pila de libros de colores",
  },
  giving: {
    src: unsplash("1544027993-37dbfe43562a"),
    alt: "Dos manos que se extienden para ayudarse",
  },
  church: {
    src: unsplash("1519491050282-cf00c82424b4"),
    alt: "Interior de una iglesia con bancas de madera",
  },
} satisfies Record<string, SiteImage>;

/** Datos de generosidad. EDITAR: reemplazar con los datos bancarios reales. */
export const giving = {
  bankTransfer: {
    accountHolder: "Conexión Vida (EDITAR: razón social)",
    bank: "EDITAR: banco",
    clabe: "000000000000000000",
    concept: "Donativo + tu campus (ej. Donativo Querétaro)",
  },
  online: {
    /** EDITAR: enlace de la pasarela segura (Stripe, Mercado Pago, etc.). */
    url: "",
    provider: "pasarela de pago segura",
  },
} as const;
