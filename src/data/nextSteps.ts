export interface NextStep {
  id: string;
  title: string;
  description: string;
  cta: string;
  /** "visit" abre el modal de visita; si no, es un ancla. */
  href: string;
}

/**
 * Los títulos son el camino de fe que plantea la propia iglesia
 * (Propuesta página web.pdf; confirmado 2026-09-25).
 * TODO(PENDIENTES §5): revisar las descripciones con la iglesia y decidir
 * si "Formar a otros" es un paso más.
 */
export const nextSteps: NextStep[] = [
  {
    id: "explorar",
    title: "Explorar la fe",
    description:
      "Ven a una reunión, escucha y pregunta lo que quieras. No necesitas saber nada de antemano.",
    cta: "Planear mi visita",
    href: "visit",
  },
  {
    id: "jesus",
    title: "Conocer más de Jesús",
    description:
      "Conversa con alguien de la iglesia sobre quién es Jesús y qué significa seguirlo.",
    cta: "Escribirnos",
    href: "#contacto",
  },
  {
    id: "comunidad",
    title: "Conectar en comunidad",
    description:
      "La fe se vive mejor acompañado. Pregunta cómo conocer a otras personas de la iglesia.",
    cta: "Preguntar cómo conectar",
    href: "#contacto",
  },
  {
    id: "bautismo",
    title: "Bautismo",
    description:
      "Un paso público que celebra la decisión de seguir a Jesús. Escríbenos y te decimos cómo prepararte.",
    cta: "Quiero bautizarme",
    href: "#contacto",
  },
  {
    id: "servir",
    title: "Servir",
    description:
      "Todos tenemos algo que aportar. Cuéntanos qué te gusta hacer y te decimos dónde hace falta ayuda.",
    cta: "Quiero servir",
    href: "#contacto",
  },
  {
    id: "liderar",
    title: "Liderar",
    description:
      "Si ya llevas tiempo en la iglesia y quieres acompañar a otros, platiquemos.",
    cta: "Quiero liderar",
    href: "#contacto",
  },
];
