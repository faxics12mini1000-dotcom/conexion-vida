export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Respuestas entregadas por la iglesia (2026-09-25). Se quitó
 * "¿Hay estacionamiento?" porque no hay respuesta confirmada por campus.
 */
export const faqItems: FaqItem[] = [
  {
    id: "reunion",
    question: "¿Cómo es una reunión?",
    answer:
      "Hay música en vivo, un mensaje de la Biblia pensado para tu día a día y un tiempo de oración. Sin tecnicismos: no necesitas saber nada de antemano.",
  },
  {
    id: "duracion",
    question: "¿Cuánto dura?",
    answer: "Aproximadamente de 75 a 80 minutos.",
  },
  {
    id: "vestimenta",
    question: "¿Cómo debo vestir?",
    answer:
      "Con ropa casual y cotidiana: jeans, tenis, lo que uses normalmente. Ven como estás cómodo.",
  },
  {
    id: "ninos",
    question: "¿Qué pasa con los niños?",
    answer:
      "Tienen espacios dedicados y cuidados mientras tú estás en la reunión: Wuambaland para bebés y preescolar, y Up Street para primaria y jóvenes.",
  },
  {
    id: "registro",
    question: "¿Debo registrarme antes?",
    answer:
      "No. La entrada es completamente libre y no hay ningún compromiso. Llegas, te sientas y listo.",
  },
];
