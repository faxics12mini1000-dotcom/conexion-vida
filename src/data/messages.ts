import { images, type SiteImage } from "./site";

export type MessageTopic = "Fe" | "Familia" | "Propósito";

export interface Message {
  id: string;
  title: string;
  speaker: string;
  date: string;
  topic: MessageTopic;
  summary: string;
  image: SiteImage;
  /** ID de YouTube (opcional). Si existe, se puede reproducir en el sitio. */
  youtubeId?: string;
}

export interface Series {
  title: string;
  subtitle: string;
  description: string;
  weeks: number;
  currentWeek: number;
  image: SiteImage;
  /** EDITAR: pega aquí el ID del video de YouTube de la serie actual. */
  youtubeId?: string;
  channelUrl?: string;
}

/** EDITAR: contenido de ejemplo de la serie actual. */
export const currentSeries: Series = {
  title: "Conexión Real",
  subtitle: "Serie actual",
  description:
    "Cuatro semanas para redescubrir lo que significa vivir conectado con Dios y con las personas que Él puso a tu lado.",
  weeks: 4,
  currentWeek: 2,
  image: images.seriesHero,
};

/** EDITAR: últimas predicaciones (ejemplos). */
export const latestMessages: Message[] = [
  {
    id: "fe-en-lo-incierto",
    title: "Fe en medio de lo incierto",
    speaker: "Pastor invitado",
    date: "Domingo reciente",
    topic: "Fe",
    summary: "Cómo confiar cuando no tienes todas las respuestas.",
    image: images.messageA,
  },
  {
    id: "hogar-que-conecta",
    title: "Un hogar que conecta",
    speaker: "Equipo pastoral",
    date: "Hace 2 semanas",
    topic: "Familia",
    summary: "Ideas prácticas para fortalecer los lazos en casa.",
    image: images.messageB,
  },
  {
    id: "para-que-fuiste-creado",
    title: "¿Para qué fuiste creado?",
    speaker: "Equipo pastoral",
    date: "Hace 3 semanas",
    topic: "Propósito",
    summary: "Descubre el propósito que Dios tiene para tu vida.",
    image: images.messageC,
  },
];

export const topicStyles: Record<MessageTopic, string> = {
  Fe: "bg-cv-brand/10 text-cv-brand",
  Familia: "bg-cv-celaya/10 text-cv-celaya",
  Propósito: "bg-cv-queretaro/10 text-cv-queretaro",
};
