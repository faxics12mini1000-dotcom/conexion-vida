import type { PhotoKey } from "./site";

export interface Message {
  id: string;
  title: string;
  speaker: string;
  date: string;
  /** ID de YouTube (opcional). Si existe, se puede reproducir en el sitio. */
  youtubeId?: string;
}

export interface Series {
  title: string;
  subtitle: string;
  photo: PhotoKey;
  /** TODO(PENDIENTES §6): ID del video de YouTube de la serie actual. */
  youtubeId?: string;
  /** Canal oficial de YouTube indicado por la iglesia. */
  channelUrl: string;
}

/**
 * Serie confirmada por la iglesia (2026-09-25). Las predicaciones que había
 * eran inventadas y se eliminaron.
 * TODO(PENDIENTES §6): IDs de video y quién predica cada mensaje.
 */
export const currentSeries: Series = {
  title: "Lo que nuestro mundo necesita ya",
  subtitle: "Serie actual",
  photo: "serie",
  channelUrl: "https://www.youtube.com/c/conexionvidacelaya",
};

export const latestMessages: Message[] = [];
