import type { IconKey } from "./types";

export interface NextStep {
  id: string;
  title: string;
  short: string;
  description: string;
  cta: string;
  href: string;
  icon: IconKey;
}

export const nextSteps: NextStep[] = [
  {
    id: "explorando",
    title: "Explorando la fe",
    short: "Explorar",
    description:
      "Estás en el lugar correcto para tener preguntas. Ven a un servicio, escucha sin presión y date el tiempo de conocer de qué se trata.",
    cta: "Planear mi primera visita",
    href: "#primera-vez",
    icon: "compass",
  },
  {
    id: "jesus",
    title: "Conocer a Jesús",
    short: "Conocer a Jesús",
    description:
      "Descubre quién es Jesús y qué significa seguirlo. Platica con alguien de nuestro equipo y da tu primer paso de fe a tu ritmo.",
    cta: "Escuchar los mensajes",
    href: "#mensajes",
    icon: "flame",
  },
  {
    id: "comunidad",
    title: "Conectar en comunidad",
    short: "Comunidad",
    description:
      "La fe se vive mejor acompañado. Únete a un grupo pequeño cerca de ti y construye amistades reales entre semana.",
    cta: "Buscar un grupo",
    href: "#grupos",
    icon: "users",
  },
  {
    id: "bautismo",
    title: "Bautismo",
    short: "Bautismo",
    description:
      "Un paso público que celebra tu decisión de seguir a Jesús. Te acompañamos en la preparación y en el gran día.",
    cta: "Quiero bautizarme",
    href: "#contacto",
    icon: "droplets",
  },
  {
    id: "servir",
    title: "Servir con propósito",
    short: "Servir",
    description:
      "Todos tenemos algo que aportar. Sirve en bienvenida, música, niños o producción y descubre cómo Dios te usa.",
    cta: "Quiero servir",
    href: "#contacto",
    icon: "hand-heart",
  },
  {
    id: "liderar",
    title: "Liderar",
    short: "Liderar",
    description:
      "Da el siguiente nivel: guía a otros, abre un grupo en tu casa y ayuda a que más personas vivan una vida conectada.",
    cta: "Quiero liderar",
    href: "#contacto",
    icon: "sprout",
  },
];
