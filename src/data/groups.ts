import type { CampusId } from "./types";

export type GroupType = "Jóvenes" | "Matrimonios" | "Mixtos";

export interface SmallGroup {
  id: string;
  name: string;
  campus: CampusId;
  zone: string;
  type: GroupType;
  schedule: string;
}

export const groupTypes: GroupType[] = ["Jóvenes", "Matrimonios", "Mixtos"];

/** EDITAR: grupos de ejemplo. Reemplazar por los grupos reales de cada campus. */
export const smallGroups: SmallGroup[] = [
  { id: "q1", name: "Raíces", campus: "queretaro", zone: "Juriquilla", type: "Jóvenes", schedule: "Miércoles · 8:00 PM" },
  { id: "q2", name: "Camino Juntos", campus: "queretaro", zone: "Centro Sur", type: "Matrimonios", schedule: "Jueves · 7:30 PM" },
  { id: "q3", name: "Casa Abierta", campus: "queretaro", zone: "El Marqués", type: "Mixtos", schedule: "Martes · 8:00 PM" },
  { id: "q4", name: "Conecta Sur", campus: "queretaro", zone: "Centro Sur", type: "Jóvenes", schedule: "Viernes · 7:00 PM" },
  { id: "c1", name: "Hogar en Común", campus: "celaya", zone: "Centro", type: "Mixtos", schedule: "Miércoles · 7:30 PM" },
  { id: "c2", name: "Nueva Generación", campus: "celaya", zone: "Norte", type: "Jóvenes", schedule: "Jueves · 8:00 PM" },
  { id: "c3", name: "Pacto de Dos", campus: "celaya", zone: "Sur", type: "Matrimonios", schedule: "Sábado · 6:00 PM" },
];
