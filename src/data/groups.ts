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

/**
 * OCULTO (GroupsSection). Lista vacía a propósito: los 7 grupos que había
 * (Raíces, Camino Juntos, Casa Abierta, etc.) eran inventados.
 * TODO(PENDIENTES §5): cargar los grupos reales de cada campus.
 */
export const smallGroups: SmallGroup[] = [];
