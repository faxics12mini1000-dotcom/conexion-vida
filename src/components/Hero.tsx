"use client";

import Image from "next/image";
import { campuses } from "@/data/campuses";
import { images } from "@/data/site";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";

/**
 * TODO(Fase 2): foto real a pantalla completa (PENDIENTES §10). La foto actual
 * es stock temporal; el overlay es un color sólido con opacidad.
 */
export function Hero() {
  const { campus: selected, setCampus, openVisit } = useApp();

  return (
    <section
      id="inicio"
      data-tone="dark"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center bg-navy text-cream"
    >
      <Image
        src={images.hero.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy/75" aria-hidden="true" />

      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:items-center">
        <div className="hero-enter lg:col-span-7">
          <p className="font-semibold text-green">Querétaro y Celaya</p>
          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl">
            Una iglesia actual. Personas reales.
          </h1>
          <p className="mt-6 text-lg text-cream/90 sm:text-xl">
            Conectando a las personas con Jesús.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => openVisit()} className="btn btn-green">
              Planear mi visita
            </button>
            <a href="#campus" className="btn btn-line">
              Ver horarios
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-ui border border-cream/25 bg-navy/85 p-5 sm:p-6">
            <h2 className="text-xl">Horarios por campus</h2>
            <div role="group" aria-label="Elige tu campus" className="mt-4 grid gap-3">
              {campuses.map((c) => {
                const active = c.id === selected;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCampus(c.id)}
                    className={cn(
                      "min-h-11 w-full rounded-ui border p-4 text-left",
                      active
                        ? "border-green bg-cream text-navy"
                        : "border-cream/25 hover:border-cream/60",
                    )}
                  >
                    <span className="block font-serif text-lg font-semibold">
                      {c.name}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-sm",
                        active ? "text-muted" : "text-on-navy",
                      )}
                    >
                      {c.services.map((s) => `${s.day} ${s.label}`).join(" · ")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
