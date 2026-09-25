import { images, type SiteImage } from "./site";

export interface Message {
  id: string;
  title: string;
  speaker: string;
  date: string;
  image: SiteImage;
  /** ID de YouTube (opcional). Si existe, se puede reproducir en el sitio. */
  youtubeId?: string;
}

export interface Series {
  title: string;
  subtitle: string;
  image: SiteImage;
  /** TODO(PENDIENTES §6): ID del video de YouTube de la serie actual. */
  youtubeId?: string;
  /** Canal público de Celaya; TODO(PENDIENTES §6): confirmar el canal oficial. */
  channelUrl?: string;
}

/**
 * OCULTO (MessagesSection). El nombre de la serie viene del esquema de la
 * iglesia ("lo que nuestro mundo necesita ya"). Las predicaciones que había
 * (Fe en medio de lo incierto, etc.) eran inventadas y se eliminaron.
 * TODO(PENDIENTES §6): cargar videos reales.
 */
export const currentSeries: Series = {
  title: "Lo que nuestro mundo necesita ya",
  subtitle: "Serie actual",
  image: images.seriesHero,
  channelUrl: "https://www.youtube.com/c/conexionvidacelaya",
};

export const latestMessages: Message[] = [];
