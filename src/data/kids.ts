import { images, type SiteImage } from "./site";
import type { IconKey } from "./types";

export interface KidsProgram {
  id: string;
  name: string;
  ages: string;
  description: string;
  highlights: string[];
  image: SiteImage;
  gradient: string;
}

export interface KidsPillar {
  title: string;
  description: string;
  icon: IconKey;
}

export const kidsPrograms: KidsProgram[] = [
  {
    id: "wuambaland",
    name: "Wuambaland",
    ages: "Bebés y preescolar",
    description:
      "Un mundo lleno de color, juego y cariño donde los más pequeños aprenden que Dios los ama, en un ambiente cuidado por adultos capacitados.",
    highlights: ["Cuna y área de bebés", "Historias y juego guiado", "Personal verificado"],
    image: images.kidsPlay,
    gradient: "from-cv-celaya/80 to-cv-queretaro/60",
  },
  {
    id: "up-street",
    name: "Up Street",
    ages: "Primaria y secundaria",
    description:
      "Un espacio dinámico para crecer en la fe con enseñanza a su nivel, retos, música y amigos, y descubrir que la fe también es para su generación.",
    highlights: ["Enseñanza por edades", "Dinámicas y retos", "Líderes que los conocen"],
    image: images.kidsCraft,
    gradient: "from-cv-brand/80 to-cv-queretaro/60",
  },
];

export const kidsPillars: KidsPillar[] = [
  {
    title: "Seguridad garantizada",
    description:
      "Check-in verificado a la entrada y a la salida, y equipo de voluntarios que conocemos y capacitamos.",
    icon: "shield",
  },
  {
    title: "Enseñanza a su nivel",
    description:
      "Lecciones diseñadas para cada etapa, con historias y actividades que sí entienden y recuerdan.",
    icon: "graduation",
  },
  {
    title: "Mucha diversión",
    description:
      "Juego, música y creatividad para que quieran volver cada domingo. ¡Y que tú también puedas disfrutar!",
    icon: "gamepad",
  },
];
