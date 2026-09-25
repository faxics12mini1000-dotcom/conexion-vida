"use client";

import { kidsPrograms, type KidsProgram } from "@/data/kids";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { PhotoFrame } from "./PhotoFrame";
import { SectionHeading } from "./SectionHeading";

/** Layout asimétrico: el segundo bloque invierte columnas, proporción y desfase. */
function Program({ program, reverse }: { program: KidsProgram; reverse: boolean }) {
  return (
    <article
      aria-labelledby={`programa-${program.id}`}
      className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12"
    >
      <PhotoFrame
        photo={program.photo}
        label={program.name}
        tone="dark"
        aspect={reverse ? "aspect-[4/3]" : "aspect-[16/10]"}
        sizes="(min-width: 1024px) 55vw, 100vw"
        className={cn(
          reverse ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-7",
        )}
      />
      <div
        className={cn(
          reverse ? "lg:order-1 lg:col-span-5 lg:col-start-1" : "lg:col-span-5",
        )}
      >
        <p className="font-semibold text-green">{program.ages}</p>
        <h3 id={`programa-${program.id}`} className="mt-2 text-4xl sm:text-5xl">
          {program.name}
        </h3>
        <p className="mt-4 text-lg text-on-navy">{program.description}</p>
      </div>
    </article>
  );
}

export function KidsSection() {
  const { openVisit } = useApp();

  return (
    <section
      id="ministerios"
      aria-labelledby="ministerios-title"
      data-tone="dark"
      className="section-y bg-navy text-cream"
    >
      <div className="wrap">
        <SectionHeading
          id="ministerios-title"
          tone="dark"
          title="Niños y jóvenes"
          lead="Espacios pensados para ellos, para que tú vivas la reunión con tranquilidad."
        />

        <div className="mt-14 space-y-16 lg:space-y-24">
          {kidsPrograms.map((p, i) => (
            <Program key={p.id} program={p} reverse={i % 2 === 1} />
          ))}
        </div>

        {/* TODO(PENDIENTES §3, §5): edades exactas, horarios y registro de entrada/salida. */}
        <div className="mt-16 flex flex-col gap-4 border-t border-cream/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-2xl">¿Vienes con niños?</p>
          <button type="button" onClick={() => openVisit()} className="btn btn-green">
            Planear mi visita
          </button>
        </div>
      </div>
    </section>
  );
}
