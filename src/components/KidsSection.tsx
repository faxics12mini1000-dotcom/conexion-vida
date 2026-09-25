import Image from "next/image";
import { kidsPrograms } from "@/data/kids";
import { SectionHeading } from "./SectionHeading";

/**
 * OCULTA en page.tsx hasta tener datos reales (PENDIENTES §5).
 * Fase 3 la convierte en "Ministerios" con layout editorial y fotos reales.
 */
export function KidsSection() {
  return (
    <section id="kids" className="section-y bg-cream">
      <div className="wrap">
        <SectionHeading title="Niños y jóvenes" />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {kidsPrograms.map((p) => (
            <article key={p.id}>
              <div className="relative aspect-[4/3] bg-line">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-green-deep">{p.ages}</p>
              <h3 className="mt-1 text-3xl">{p.name}</h3>
              <p className="mt-3 text-muted">{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
