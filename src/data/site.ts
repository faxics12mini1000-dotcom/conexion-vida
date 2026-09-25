/**
 * Configuración global del sitio.
 * Regla del proyecto: nada inventado. Lo que falta va como TODO(PENDIENTES §n).
 */

export const siteConfig = {
  name: "Conexión Vida",
  /** Frases de la propia iglesia (Propuesta página web.pdf). */
  tagline: "Una iglesia actual. Personas reales.",
  /** Basado en la biografía pública de Instagram: "Conectando a las personas con Jesús". */
  description:
    "Conexión Vida: conectando a las personas con Jesús. Campus en Querétaro y Celaya.",
  /** TODO(PENDIENTES §1): dominio final. Se usa en metadataBase, sitemap y robots. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, ""),
  /**
   * TODO(PENDIENTES §9): correo real. Sin valor por defecto a propósito:
   * el formulario de contacto está oculto hasta que exista.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
} as const;

/**
 * WhatsApp: https://wa.me/<número con lada de país, ej. 52...>.
 * Si la variable no existe, `null` y la interfaz muestra un mensaje amigable
 * en lugar de un enlace roto. TODO(PENDIENTES §9): número real.
 */
const whatsappDigits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
export const whatsappUrl: string | null = whatsappDigits
  ? `https://wa.me/${whatsappDigits}`
  : null;

/** Solo secciones visibles, en el orden de la página. */
export const navLinks = [
  { label: "Campus", href: "#campus" },
  { label: "Primera vez", href: "#primera-vez" },
  { label: "Quiénes somos", href: "#quienes-somos" },
  { label: "Ministerios", href: "#ministerios" },
  { label: "Mensajes", href: "#mensajes" },
  { label: "Próximos pasos", href: "#proximos-pasos" },
] as const;

export interface SiteImage {
  src: string;
  alt: string;
}

/**
 * Fotos de la iglesia, centralizadas. Solo fotos reales, guardadas en
 * /public/photos (JPG, horizontales; el hero mínimo 2400 px de ancho).
 * `null` = el componente <PhotoFrame> muestra un contenedor de marca en su lugar.
 *
 * Para asignar una foto:
 *   hero: { src: "/photos/hero.jpg", alt: "Descripción real de la foto" },
 * Sin stock ni dominios externos (PENDIENTES §10).
 */
export const churchPhotos = {
  /** Fondo del hero, overlay sólido navy/80. Sin foto, el hero es navy sólido. */
  hero: null,
  /** Interior del auditorio o alabanza (sección "¿Es tu primera vez?"). */
  auditorio: null,
  /** Personas conviviendo (sección "Quiénes somos"). */
  comunidad: null,
  /** Wuambaland: sin rostros reconocibles o con autorización de los padres. */
  wuambaland: null,
  /** Up Street. */
  upStreet: null,
  /** Portada de la serie actual (sección "Mensajes"). */
  serie: null,
} satisfies Record<string, SiteImage | null>;

export type PhotoKey = keyof typeof churchPhotos;

/** Foto asignada a una clave (o null). Tipada como SiteImage | null. */
export function getPhoto(key: PhotoKey): SiteImage | null {
  return churchPhotos[key] as SiteImage | null;
}

/**
 * Generosidad. Estructura lista: los datos reales se llenan cuando la iglesia
 * entregue la CLABE oficial. Mientras un campo sea `null`, la interfaz muestra
 * "Por confirmar" y deshabilita el botón de copiar.
 * TODO(PENDIENTES §8): beneficiario, banco, CLABE y concepto reales.
 */
export const giving: {
  bankTransfer: {
    accountHolder: string | null;
    bank: string | null;
    clabe: string | null;
    concept: string | null;
  };
  online: { url: string };
} = {
  bankTransfer: {
    accountHolder: null,
    bank: null,
    clabe: null,
    concept: null,
  },
  online: { url: "" },
};
