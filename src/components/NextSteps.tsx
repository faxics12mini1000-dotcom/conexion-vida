"use client";

import { nextSteps } from "@/data/nextSteps";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { SectionHeading } from "./SectionHeading";

/** Stepper editorial: todos los pasos visibles, unidos por una línea vertical. */
export function NextSteps() {
  const { openVisit } = useApp();

  return (
    <section
      id="proximos-pasos"
      aria-labelledby="proximos-pasos-title"
      className="section-y bg-paper"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              id="proximos-pasos-title"
              title="¿Dónde estás en tu camino?"
              lead="Cada quien va a su ritmo. Elige el paso que te toca hoy."
            />
          </div>
        </div>

        <ol className="lg:col-span-8">
          {nextSteps.map((s, i) => {
            const last = i === nextSteps.length - 1;
            return (
              <li key={s.id} className={cn("relative flex gap-5 sm:gap-8", !last && "pb-12")}>
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute top-14 bottom-2 left-6 w-px bg-line"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="relative flex size-12 shrink-0 items-center justify-center rounded-ui border border-navy bg-paper font-serif text-xl text-navy"
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-2xl sm:text-3xl">{s.title}</h3>
                  <p className="mt-2 text-lg text-muted">{s.description}</p>
                  {s.href === "visit" ? (
                    <button
                      type="button"
                      onClick={() => openVisit()}
                      className="btn btn-line mt-4 text-navy"
                    >
                      {s.cta}
                    </button>
                  ) : (
                    <a href={s.href} className="btn btn-line mt-4 text-navy">
                      {s.cta}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
