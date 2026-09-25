"use client";

import Image from "next/image";
import { campuses } from "@/data/campuses";
import { getPhoto } from "@/data/site";
import { useApp } from "./AppProvider";

/**
 * Hero a pantalla completa (100svh). El header es sticky con margen inferior
 * negativo, así que el hero empieza en el borde superior y compensa con pt-16.
 * Sin foto real (PENDIENTES §10) el fondo es navy sólido; con foto, overlay sólido.
 */
export function Hero() {
  const { openVisit } = useApp();
  const heroPhoto = getPhoto("hero");

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      data-tone="dark"
      className="relative isolate flex min-h-svh flex-col bg-navy pt-16 text-cream"
    >
      {heroPhoto && (
        <>
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-navy/80" aria-hidden="true" />
        </>
      )}

      <div className="wrap flex flex-1 flex-col justify-center py-16">
        <div className="hero-enter max-w-4xl">
          <p className="font-semibold text-green">Querétaro y Celaya</p>
          <h1 id="hero-title" className="mt-5 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            Una iglesia actual. Personas reales.
          </h1>
          <p className="mt-6 text-lg text-on-navy sm:text-xl">
            Conectando a las personas con Jesús.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={() => openVisit()} className="btn btn-green">
              Planear mi visita
            </button>
            <a href="#campus" className="btn btn-line">
              Ver horarios
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/20">
        <div className="wrap grid gap-x-10 gap-y-4 py-6 sm:grid-cols-[auto_1fr_1fr] sm:items-baseline">
          <p className="text-sm font-semibold text-green">Reuniones dominicales</p>
          {campuses.map((c) => (
            <p key={c.id} className="text-on-navy">
              <span className="font-serif text-lg font-semibold text-cream">
                {c.shortName}
              </span>
              <br />
              {c.services.map((s) => `${s.day} ${s.label}`).join(" · ")}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
