import type { IconKey } from "./types";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: IconKey;
}

export const faqItems: FaqItem[] = [
  {
    id: "servicio",
    question: "¿Cómo es un servicio?",
    answer:
      "Empezamos con música contemporánea en vivo, seguimos con un mensaje práctico y aplicable a la vida diaria, y terminamos con un momento para orar. Sin presión, sin tecnicismos: solo ven, escucha y siéntete en casa.",
    icon: "music",
  },
  {
    id: "duracion",
    question: "¿Cuánto dura?",
    answer:
      "Aproximadamente entre 75 y 85 minutos. Puedes llegar unos minutos antes para tomar un café y conocer a alguien del equipo de bienvenida.",
    icon: "clock",
  },
  {
    id: "vestimenta",
    question: "¿Cómo debo vestirme?",
    answer:
      "Ven tal como eres. Lo más común es ropa casual y cómoda: jeans, tenis, lo que te haga sentir tú. Lo importante eres tú, no lo que traes puesto.",
    icon: "shirt",
  },
  {
    id: "requisitos",
    question: "¿Tengo que ser cristiano o registrarme antes?",
    answer:
      "No. Eres bienvenido sin importar tu trasfondo, tus dudas o tu historia. No necesitas registrarte: solo llega, y si quieres que alguien te acompañe, con gusto lo hacemos.",
    icon: "heart",
  },
  {
    id: "hijos",
    question: "¿Qué pasa con mis hijos?",
    answer:
      "Tenemos espacios seguros y divertidos por edades, con registro y verificación de entrada y salida. Ellos aprenden a su nivel mientras tú disfrutas el servicio con tranquilidad.",
    icon: "baby",
  },
];
