/**
 * Configuración global del sitio.
 * Regla del proyecto: nada inventado. Lo que falta va como TODO(PENDIENTES §n).
 */

export const siteConfig = {
  name: "Conexión Vida",
  /** Frases de la propia iglesia (Propuesta página web.pdf). Se reescribe el copy en Fase 3. */
  tagline: "Una iglesia actual. Personas reales.",
  /** Basado en la biografía pública de Instagram: "Conectando a las personas con Jesús". */
  description:
    "Conexión Vida: conectando a las personas con Jesús. Campus en Querétaro y Celaya.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * TODO(PENDIENTES §9): correo real. Sin valor por defecto a propósito:
   * el formulario de contacto está oculto hasta que exista.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
} as const;

/** Solo secciones visibles. Al reactivar una sección, agregar su enlace aquí. */
export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes somos", href: "#quienes-somos" },
  { label: "Campus", href: "#campus" },
  { label: "Próximos pasos", href: "#proximos-pasos" },
] as const;

/** Genera la URL de una foto de Unsplash con recorte y formato automático. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export interface SiteImage {
  src: string;
  alt: string;
}

/**
 * STOCK TEMPORAL. La regla del proyecto prohíbe fotos de stock: todas se
 * sustituyen por fotos reales de la iglesia en la Fase 2 (PENDIENTES §10).
 */
export const images = {
  hero: {
    src: unsplash("1516450360452-9312f5e86fc7"),
    alt: "",
  },
  // Usadas solo por secciones ocultas (Niños, Mensajes, Grupos, Generosidad).
  hands: { src: unsplash("1531206715517-5c0ba140b2b8"), alt: "" },
  kidsPlay: { src: unsplash("1503454537195-1dcabb73ffb9"), alt: "" },
  kidsCraft: { src: unsplash("1596464716127-f2a82984de30"), alt: "" },
  seriesHero: { src: unsplash("1507692049790-de58290a4334"), alt: "" },
  messageA: { src: unsplash("1478147427282-58a87a120781"), alt: "" },
  messageB: { src: unsplash("1475483768296-6163e08872a1"), alt: "" },
  messageC: { src: unsplash("1497633762265-9d179a990aa6"), alt: "" },
  giving: { src: unsplash("1544027993-37dbfe43562a"), alt: "" },
} satisfies Record<string, SiteImage>;

/**
 * OCULTO (GivingSection). Datos de ejemplo: NO son reales.
 * TODO(PENDIENTES §8): mostrar solo si la iglesia confirma y da datos reales.
 */
export const giving = {
  bankTransfer: {
    accountHolder: "EDITAR: razón social",
    bank: "EDITAR: banco",
    clabe: "000000000000000000",
    concept: "EDITAR: concepto sugerido",
  },
  online: {
    url: "",
    provider: "pasarela de pago segura",
  },
} as const;
