import type { CampusId } from "@/data/types";

/**
 * Clases de Tailwind por campus. Deben ser strings estáticos completos
 * para que Tailwind los detecte en el build.
 */
export const accent: Record<
  CampusId,
  {
    text: string;
    bg: string;
    bgSoft: string;
    border: string;
    ring: string;
    gradient: string;
    dot: string;
  }
> = {
  queretaro: {
    text: "text-cv-queretaro",
    bg: "bg-cv-queretaro",
    bgSoft: "bg-cv-queretaro/10",
    border: "border-cv-queretaro/30",
    ring: "ring-cv-queretaro",
    gradient: "from-cv-queretaro to-cv-brand",
    dot: "bg-cv-queretaro",
  },
  celaya: {
    text: "text-cv-celaya",
    bg: "bg-cv-celaya",
    bgSoft: "bg-cv-celaya/10",
    border: "border-cv-celaya/30",
    ring: "ring-cv-celaya",
    gradient: "from-cv-celaya to-cv-queretaro",
    dot: "bg-cv-celaya",
  },
};
