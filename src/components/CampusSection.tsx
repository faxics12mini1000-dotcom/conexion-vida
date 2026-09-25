"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import { campuses, otherCampuses, type Campus } from "@/data/campuses";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { InstagramIcon } from "./icons";
import { SectionHeading } from "./SectionHeading";

const linkClass = "inline-flex min-h-11 items-center gap-2 underline underline-offset-4";

function CampusCard({ campus }: { campus: Campus }) {
  const { campus: selected, openVisit } = useApp();

  return (
    <article
      data-campus={campus.id}
      className={cn(
        "flex flex-col overflow-hidden rounded-ui border-2 bg-paper text-ink",
        selected === campus.id ? "border-green" : "border-paper",
      )}
    >
      <div className="flex items-center gap-4 border-b border-line p-5">
        {/* Lazy por defecto; sizes fija el tamaño real (64 px) para no bajar el JPG completo. */}
        <Image
          src={campus.logo.src}
          alt={campus.logo.alt}
          width={447}
          height={447}
          sizes="64px"
          className="size-16 shrink-0 rounded-ui"
        />
        <div>
          <p className="text-sm text-muted">{campus.city}</p>
          <h3 className="text-2xl">{campus.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-sans text-base font-semibold text-campus">Reuniones</h4>
        <ul className="mt-3 divide-y divide-line rounded-ui bg-campus-soft px-4">
          {campus.services.map((s) => (
            <li key={s.label + s.day} className="flex justify-between gap-4 py-3">
              <span>{s.day}</span>
              <span className="font-semibold">{s.label}</span>
            </li>
          ))}
        </ul>
        {/* TODO(PENDIENTES §2): confirmar horarios y qué es cada reunión. */}

        <p className="mt-5 flex items-start gap-2 text-muted">
          <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
          {campus.address}
        </p>
        {/* TODO(PENDIENTES §2): dirección exacta y botón "Cómo llegar" con mapa. */}

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
            </a>
          </li>
          {campus.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => openVisit(campus.id)}
          className="btn mt-6 self-start bg-campus text-cream hover:opacity-90"
        >
          Planear mi visita a {campus.shortName}
        </button>
      </div>
    </article>
  );
}

export function CampusSection() {
  return (
    <section id="campus" data-tone="dark" className="section-y bg-navy text-cream">
      <div className="wrap">
        <SectionHeading tone="dark" title="Campus" lead="Dónde y cuándo nos reunimos." />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {campuses.map((c) => (
            <CampusCard key={c.id} campus={c} />
          ))}
        </div>

        {/* TODO(PENDIENTES §2): datos y logo de Puebla y Santa María. Hoy solo el nombre. */}
        <div className="mt-12 border-t border-cream/20 pt-8">
          <h3 className="text-2xl">Otros campus</h3>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-2 font-serif text-2xl">
            {otherCampuses.map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
