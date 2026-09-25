import type { PhotoKey } from "./site";

export interface KidsProgram {
  id: string;
  name: string;
  /** Etapa a la que sirve, tal como la define la iglesia. */
  ages: string;
  description: string;
  photo: PhotoKey;
}

/**
 * Nombres y etapas entregados por la iglesia (2026-09-25).
 * TODO(PENDIENTES §3, §5): edades exactas, horario, registro de entrada y
 * salida, y verificación de voluntarios.
 * Las fotos se asignan en `churchPhotos` (site.ts).
 */
export const kidsPrograms: KidsProgram[] = [
  {
    id: "wuambaland",
    name: "Wuambaland",
    ages: "Bebés y preescolar",
    description:
      "Un espacio dedicado y cuidado para los más pequeños, mientras tú estás en la reunión.",
    photo: "wuambaland",
  },
  {
    id: "up-street",
    name: "Up Street",
    ages: "Primaria y jóvenes",
    description:
      "Un espacio para que niños y jóvenes conozcan a Jesús y se sientan parte de la iglesia.",
    photo: "upStreet",
  },
];
