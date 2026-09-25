"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import { campuses, otherCampuses, type Campus } from "@/data/campuses";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { InstagramIcon } from "./icons";
import { SectionHeading } from "./SectionHeading";

const linkClass =
  "inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-campus";

function CampusCard({ campus, featured }: { campus: Campus; featured: boolean }) {
  const { openVisit } = useApp();

  return (
    <article
      data-campus={campus.id}
      aria-labelledby={`campus-${campus.id}`}
      className={cn(
        "flex flex-col rounded-ui border border-line bg-paper text-ink",
        featured ? "lg:col-span-7" : "lg:col-span-5 lg:mt-16",
      )}
    >
      <div className="flex items-center gap-4 border-b border-line p-5 sm:p-6">
        {/* Lazy por defecto; sizes fija el tamaño real (80 px) para no bajar el JPG completo. */}
        <Image
          src={campus.logo.src}
          alt={campus.logo.alt}
          width={447}
          height={447}
          sizes="80px"
          className="size-20 shrink-0 rounded-ui"
        />
        <div>
          <p className="text-sm text-muted">{campus.city}</p>
          <h3 id={`campus-${campus.id}`} className="text-3xl">
            {campus.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm font-semibold text-campus">Reunión dominical</p>
        {campus.services.map((s) => (
          <p key={s.day + s.label} className="mt-1 font-serif text-3xl text-campus sm:text-4xl">
            {s.day} · {s.label}
          </p>
        ))}
        {/* TODO(PENDIENTES §2): hora a la que abren puertas. */}

        <p className="mt-5 flex items-start gap-2 text-muted">
          <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
          {campus.address}
        </p>
        {/* TODO(PENDIENTES §2): dirección exacta. */}

        <ul className="mt-4 flex flex-wrap gap-x-6">
          <li>
            <a
              href={campus.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <InstagramIcon className="size-4" />
              {campus.instagram.handle}
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </li>
          <li>
            <a
              href={campus.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <MapPin className="size-4" aria-hidden="true" />
              Cómo llegar
              <span className="sr-only"> en Google Maps (se abre en otra pestaña)</span>
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => openVisit(campus.id)}
          className="btn mt-6 self-start bg-campus text-cream hover:opacity-90"
        >
          Planear mi visita a {campus.shortName}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function CampusSection() {
  return (
    <section
      id="campus"
      aria-labelledby="campus-title"
      className="section-y bg-cream text-ink"
    >
      <div className="wrap">
        <SectionHeading
          id="campus-title"
          title="Campus y cómo llegar"
          lead="Nos reunimos los domingos en Querétaro y en Celaya."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-start">
          {campuses.map((c, i) => (
            <CampusCard key={c.id} campus={c} featured={i === 0} />
          ))}
        </div>

        {/* TODO(PENDIENTES §2): datos y logo de Puebla y Santa María. Hoy solo el nombre. */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-baseline sm:gap-10">
          <h3 className="text-2xl">Otros campus</h3>
          <ul className="flex flex-wrap gap-x-10 gap-y-2 font-serif text-2xl text-muted">
            {otherCampuses.map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
