"use client";

import { ArrowUpRight, Clock, MapPin, Radio, Sparkles } from "lucide-react";
import Image from "next/image";
import { campuses, futureCampuses, type Campus } from "@/data/campuses";
import { accent } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { Icon, InstagramIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function CampusCard({ campus, className }: { campus: Campus; className?: string }) {
  const { campus: selected, openVisit } = useApp();
  const a = accent[campus.id];
  const active = selected === campus.id;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white transition duration-300",
        active
          ? "border-slate-300 shadow-2xl shadow-cv-navy/10"
          : "border-slate-200 shadow-sm",
        className,
      )}
    >
      <div className="relative h-56 shrink-0 overflow-hidden sm:h-64">
        <Image
          src={campus.image.src}
          alt={campus.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div
          className={cn("absolute inset-0 bg-gradient-to-t to-transparent opacity-90", "from-cv-navy/85 via-cv-navy/20")}
          aria-hidden="true"
        />
        <div className="absolute right-6 bottom-5 left-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/80">{campus.city}</p>
            <h3 className="text-3xl font-semibold tracking-tight text-white">
              {campus.name}
            </h3>
          </div>
          <span
            className={cn(
              "hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white sm:inline-flex",
              a.bg,
            )}
            aria-hidden="true"
          >
            <MapPin className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="leading-relaxed text-slate-600">{campus.description}</p>

        {/* Horarios */}
        <div className={cn("mt-5 rounded-2xl p-4", a.bgSoft)}>
          <p className={cn("flex items-center gap-2 text-sm font-semibold", a.text)}>
            <Clock className="h-4 w-4" aria-hidden="true" />
            Horarios de servicio
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {campus.services.map((s) => (
              <li
                key={s.label}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-cv-navy shadow-sm"
              >
                {s.day} · {s.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Badges */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {campus.badges.map((b) => (
            <li
              key={b.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              <Icon name={b.icon} className={cn("h-3.5 w-3.5", a.text)} />
              {b.label}
            </li>
          ))}
        </ul>

        <p className="mt-5 flex items-start gap-2 text-sm text-slate-500">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {campus.address}
        </p>

        <div className="mt-auto grid gap-2.5 pt-6 sm:grid-cols-2">
          <a
            href={campus.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none",
              a.bg,
            )}
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Ver en Google Maps
          </a>
          <a
            href={campus.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-cv-navy transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </a>
        </div>
        <button
          type="button"
          onClick={() => openVisit(campus.id)}
          className={cn(
            "mt-3 inline-flex items-center justify-center gap-1.5 text-sm font-semibold transition hover:gap-2.5",
            a.text,
          )}
        >
          Planear mi visita a {campus.shortName}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function CampusSection() {
  const [queretaro, celaya] = campuses;

  return (
    <section id="campus" className="bg-cv-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestros campus"
            title="Encuentra el lugar donde perteneces"
            description="Dos casas, una misma familia. Elige tu campus y planea tu primera visita."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <CampusCard campus={queretaro} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <CampusCard campus={celaya} />
          </Reveal>

          {/* Futuras sedes */}
          <Reveal delay={0.05} className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-cv-navy p-7 text-white sm:p-9">
              <div
                className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cv-brand/40 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-sky-300 uppercase">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Lo que viene
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Seguimos creciendo, seguimos conectando
                </h3>
                <p className="mt-3 max-w-lg text-slate-300">
                  Estamos soñando con nuevas extensiones para llevar esta
                  comunidad a más ciudades.
                </p>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {futureCampuses.map((f) => (
                    <li
                      key={f.name}
                      className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur"
                    >
                      <span className="block text-lg font-semibold">{f.name}</span>
                      <span className="text-sm text-sky-200">{f.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-7 sm:p-9">
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cv-brand/10 text-cv-brand">
                  <Radio className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-cv-navy">
                  ¿Estás lejos?
                </h3>
                <p className="mt-2 text-slate-600">
                  Conéctate con nuestros mensajes desde cualquier lugar y da el
                  primer paso desde donde estés.
                </p>
              </div>
              <a
                href="#mensajes"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cv-brand transition hover:gap-2.5"
              >
                Ver mensajes
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
