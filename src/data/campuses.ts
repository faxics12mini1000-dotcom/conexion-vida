import { images, type SiteImage } from "./site";
import type { CampusId, IconKey } from "./types";

export interface ServiceTime {
  day: string;
  /** Texto visible, ej. "10:00 AM". */
  label: string;
  /** Hora en formato 24h, usada para generar el evento de calendario. */
  hour: number;
  minute: number;
}

export interface CampusBadge {
  label: string;
  icon: IconKey;
}

export interface Campus {
  id: CampusId;
  name: string;
  shortName: string;
  city: string;
  description: string;
  /** EDITAR: horarios de servicio. */
  services: ServiceTime[];
  /** EDITAR: dirección real del campus. */
  address: string;
  mapsUrl: string;
  instagram: { url: string; handle: string };
  badges: CampusBadge[];
  image: SiteImage;
}

/** Búsqueda en Google Maps; sustituir por el enlace exacto del lugar cuando exista. */
const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const campuses: Campus[] = [
  {
    id: "queretaro",
    name: "Campus Querétaro",
    shortName: "Querétaro",
    city: "Querétaro, Qro.",
    description:
      "Nuestra primera casa: música contemporánea, un mensaje práctico y una comunidad que te recibe con los brazos abiertos.",
    services: [
      { day: "Domingo", label: "10:00 AM", hour: 10, minute: 0 },
      { day: "Domingo", label: "12:00 PM", hour: 12, minute: 0 },
    ],
    address: "Dirección por confirmar · Querétaro, Qro.",
    mapsUrl: mapsSearch("Conexión Vida Querétaro"),
    instagram: {
      url: "https://www.instagram.com/conexionvida.queretaro",
      handle: "@conexionvida.queretaro",
    },
    badges: [
      { label: "Kids & Teens", icon: "baby" },
      { label: "Cafetería & Conexión", icon: "coffee" },
      { label: "Estacionamiento disponible", icon: "car" },
    ],
    image: images.queretaro,
  },
  {
    id: "celaya",
    name: "Campus Celaya",
    shortName: "Celaya",
    city: "Celaya, Gto.",
    description:
      "Una comunidad joven y familiar donde la fe se vive en el domingo y también en casa durante la semana.",
    services: [{ day: "Domingo", label: "11:00 AM", hour: 11, minute: 0 }],
    address: "Dirección por confirmar · Celaya, Gto.",
    mapsUrl: mapsSearch("Conexión Vida Celaya"),
    instagram: {
      url: "https://www.instagram.com/conexionvida.celaya",
      handle: "@conexionvida.celaya",
    },
    badges: [
      { label: "Wuambaland", icon: "baby" },
      { label: "Comunidad Joven", icon: "sparkles" },
      { label: "Grupos en casa", icon: "home" },
    ],
    image: images.celaya,
  },
];

export const futureCampuses = [
  { name: "Puebla", note: "Próximamente" },
  { name: "Santa María", note: "En camino" },
] as const;

export function getCampus(id: CampusId): Campus {
  const campus = campuses.find((c) => c.id === id);
  if (!campus) throw new Error(`Campus desconocido: ${id}`);
  return campus;
}
