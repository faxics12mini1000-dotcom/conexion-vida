/**
 * OCULTO (FirstTimeFAQ). Preguntas tomadas del esquema de la iglesia
 * (Propuesta página web.pdf); las RESPUESTAS son de ejemplo, no confirmadas.
 * TODO(PENDIENTES §3): reemplazar con respuestas reales antes de mostrar.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "servicio",
    question: "¿Cómo es un servicio?",
    answer: "EDITAR: descripción real.",
  },
  {
    id: "duracion",
    question: "¿Cuánto dura?",
    answer: "EDITAR: duración real.",
  },
  {
    id: "vestimenta",
    question: "¿Cómo debo vestirme?",
    answer: "EDITAR: respuesta real.",
  },
  {
    id: "estacionamiento",
    question: "¿Hay estacionamiento?",
    answer: "EDITAR: respuesta real por campus.",
  },
  {
    id: "hijos",
    question: "¿Qué pasa con los niños?",
    answer: "EDITAR: respuesta real.",
  },
  {
    id: "requisitos",
    question: "¿Tengo que ser cristiano o registrarme?",
    answer: "EDITAR: respuesta real.",
  },
];
