import type { CampusId } from "./types";

export interface ServiceTime {
  day: string;
  /** 0 = domingo … 6 = sábado. Sirve para calcular la próxima fecha. */
  weekday: number;
  /** Texto visible, ej. "12:30 PM". */
  label: string;
  /** Hora en formato 24h, usada para generar el evento de calendario. */
  hour: number;
  minute: number;
}

export interface Campus {
  id: CampusId;
  name: string;
  shortName: string;
  city: string;
  /** Ubicación general. TODO(PENDIENTES §2): sustituir por dirección exacta. */
  address: string;
  services: ServiceTime[];
  instagram: { url: string; handle: string };
  /** Redes públicas adicionales encontradas (Facebook, YouTube). */
  links: { label: string; url: string }[];
  /** Logo oficial del campus (fuente: archivos enviados por la iglesia). */
  logo: { src: string; alt: string };
}

/**
 * Datos tomados de las biografías públicas de Instagram/Facebook de cada
 * campus (consultadas el 2026-09-24). No están confirmados por la iglesia:
 * TODO(PENDIENTES §2): verificar horarios y qué tipo de reunión es cada uno.
 */
export const campuses: Campus[] = [
  {
    id: "queretaro",
    name: "Campus Querétaro",
    shortName: "Querétaro",
    city: "Juriquilla, Querétaro",
    address: "Juriquilla, Querétaro",
    services: [
      { day: "Viernes", weekday: 5, label: "7:30 PM", hour: 19, minute: 30 },
      { day: "Domingo", weekday: 0, label: "12:30 PM", hour: 12, minute: 30 },
    ],
    instagram: {
      url: "https://www.instagram.com/conexionvida.queretaro",
      handle: "@conexionvida.queretaro",
    },
    links: [
      { label: "Facebook", url: "https://www.facebook.com/ConexionVidaQueretaro/" },
    ],
    logo: {
      src: "/brand/logo-queretaro.jpg",
      alt: "Logo de Conexión Vida Querétaro",
    },
  },
  {
    id: "celaya",
    name: "Campus Celaya",
    shortName: "Celaya",
    city: "Celaya, Guanajuato",
    address: "Celaya, Guanajuato",
    services: [
      { day: "Miércoles", weekday: 3, label: "7:30 PM", hour: 19, minute: 30 },
      { day: "Domingo", weekday: 0, label: "10:00 AM", hour: 10, minute: 0 },
    ],
    instagram: {
      url: "https://www.instagram.com/conexionvida.celaya",
      handle: "@conexionvida.celaya",
    },
    links: [{ label: "YouTube", url: "https://www.youtube.com/c/conexionvidacelaya" }],
    logo: {
      src: "/brand/logo-celaya.jpg",
      alt: "Logo de Conexión Vida Celaya",
    },
  },
];

/**
 * Campus que aparecen en el esquema de la iglesia (Propuesta página web.pdf)
 * pero de los que no tenemos ningún dato ni logo. Solo nombre.
 * TODO(PENDIENTES §2): confirmar que existen y conseguir datos y logo.
 */
export const otherCampuses = [{ name: "Puebla" }, { name: "Santa María" }] as const;

export function getCampus(id: CampusId): Campus {
  const campus = campuses.find((c) => c.id === id);
  if (!campus) throw new Error(`Campus desconocido: ${id}`);
  return campus;
}

/*
 * OCULTO. Datos que estaban en el proyecto y no tienen fuente. No mostrar
 * hasta que la iglesia los confirme (ver PENDIENTES.md):
 *
 * - Descripciones: "Nuestra primera casa: música contemporánea…" (Querétaro),
 *   "Una comunidad joven y familiar…" (Celaya).
 * - Badges Querétaro: Kids & Teens, Cafetería & Conexión, Estacionamiento disponible.
 * - Badges Celaya: Wuambaland, Comunidad Joven, Grupos en casa.
 * - Horarios de ejemplo: Dom 10:00 y 12:00 (Qro), Dom 11:00 (Celaya).
 * - mapsUrl: búsqueda genérica de Google Maps. TODO: enlace exacto del lugar.
 * - "Próximamente" / "En camino" en Puebla y Santa María.
 */
