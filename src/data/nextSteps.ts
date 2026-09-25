export interface NextStep {
  id: string;
  title: string;
  description: string;
  cta: string;
  /** "visit" abre el modal de visita; si no, es un ancla. */
  href: string;
}

/**
 * Los títulos corresponden al camino que plantea la propia iglesia
 * (Propuesta página web.pdf: explorando la fe, conocer a Jesús, conectar,
 * bautizarme, servir, liderar; falta "formar a otros").
 * TODO(PENDIENTES §5): confirmar que este es el proceso real y sus descripciones.
 * TODO(Fase 3): los CTA apuntan a #contacto porque Grupos y Mensajes están ocultos.
 */
export const nextSteps: NextStep[] = [
  {
    id: "explorando",
    title: "Estoy explorando la fe",
    description:
      "Puedes venir a una reunión, escuchar y hacer preguntas. No necesitas saber nada de antemano.",
    cta: "Planear mi visita",
    href: "visit",
  },
  {
    id: "jesus",
    title: "Quiero conocer más de Jesús",
    description:
      "Escríbenos y conversa con alguien de la iglesia sobre quién es Jesús y qué significa seguirlo.",
    cta: "Escribirnos",
    href: "#contacto",
  },
  {
    id: "comunidad",
    title: "Quiero conectar",
    description:
      "La fe se vive mejor acompañado. Pregunta por un grupo pequeño cerca de ti.",
    cta: "Preguntar por un grupo",
    href: "#contacto",
  },
  {
    id: "bautismo",
    title: "Quiero bautizarme",
    description:
      "Un paso público que celebra la decisión de seguir a Jesús. Escríbenos para saber cómo prepararte.",
    cta: "Quiero bautizarme",
    href: "#contacto",
  },
  {
    id: "servir",
    title: "Quiero servir",
    description:
      "Todos tenemos algo que aportar. Escríbenos y te decimos dónde hace falta ayuda.",
    cta: "Quiero servir",
    href: "#contacto",
  },
  {
    id: "liderar",
    title: "Quiero liderar",
    description:
      "Si ya llevas tiempo en la iglesia y quieres guiar a otros, escríbenos.",
    cta: "Quiero liderar",
    href: "#contacto",
  },
];
