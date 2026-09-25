import { images, type SiteImage } from "./site";

export interface KidsProgram {
  id: string;
  name: string;
  ages: string;
  description: string;
  image: SiteImage;
}

/**
 * OCULTO (KidsSection). Los nombres Wuambaland, Up Street y Primeros pasos
 * vienen del esquema de la iglesia; edades y descripciones son de ejemplo.
 * TODO(PENDIENTES §5): edades, horarios, seguridad y registro reales.
 */
export const kidsPrograms: KidsProgram[] = [
  {
    id: "wuambaland",
    name: "Wuambaland",
    ages: "EDITAR: edades",
    description: "EDITAR: descripción real.",
    image: images.kidsPlay,
  },
  {
    id: "up-street",
    name: "Up Street",
    ages: "EDITAR: edades",
    description: "EDITAR: descripción real.",
    image: images.kidsCraft,
  },
];
