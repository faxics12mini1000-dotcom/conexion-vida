"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { getPhoto } from "@/data/site";
import { useApp } from "./AppProvider";
import { NextService } from "./NextService";

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
      className="relative isolate flex min-h-svh overflow-hidden flex-col bg-navy pt-16 text-cream"
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

      {/* Anillos de "conexión": solo líneas, sin degradados */}
      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute -top-32 -right-48 -z-10 size-[44rem] rounded-full text-cream/10 lg:-right-24 lg:size-[56rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[8%] -z-10 hidden size-3 rounded-full bg-green lg:block"
      />

      <div className="wrap flex flex-1 flex-col justify-center py-16">
        <div className="hero-enter max-w-4xl">
          <p className="inline-flex items-center gap-3 font-semibold text-green">
            <span aria-hidden="true" className="h-px w-10 bg-green" />
            Querétaro y Celaya
          </p>
          <h1 id="hero-title" className="mt-5 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            Una iglesia actual. <span className="text-green">Personas reales.</span>
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

      <div className="hero-enter wrap pb-8 [animation-delay:250ms]">
        <NextService />
        <a
          href="#campus"
          aria-label="Bajar a campus y horarios"
          className="mx-auto mt-6 hidden w-fit items-center gap-2 text-sm text-on-navy hover:text-cream sm:flex"
        >
          <ChevronDown className="size-5 motion-safe:animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
