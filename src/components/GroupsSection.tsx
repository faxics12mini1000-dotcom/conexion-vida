"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MapPin, SearchX } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { campuses, getCampus } from "@/data/campuses";
import { groupTypes, smallGroups, type GroupType } from "@/data/groups";
import { images } from "@/data/site";
import type { CampusId } from "@/data/types";
import { accent } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { Reveal } from "./Reveal";

type CampusFilter = CampusId | "todos";
type ZoneFilter = string | "todas";
type TypeFilter = GroupType | "todos";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none",
        active
          ? "bg-cv-navy text-white"
          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-cv-navy hover:ring-slate-300",
      )}
    >
      {children}
    </button>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-16 shrink-0 text-sm font-medium text-slate-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function GroupsSection() {
  const { setContactTopic } = useApp();
  const [campus, setCampus] = useState<CampusFilter>("todos");
  const [zone, setZone] = useState<ZoneFilter>("todas");
  const [type, setType] = useState<TypeFilter>("todos");

  const zones = useMemo(() => {
    const pool = smallGroups.filter((g) => campus === "todos" || g.campus === campus);
    return Array.from(new Set(pool.map((g) => g.zone)));
  }, [campus]);

  const results = useMemo(
    () =>
      smallGroups.filter(
        (g) =>
          (campus === "todos" || g.campus === campus) &&
          (zone === "todas" || g.zone === zone) &&
          (type === "todos" || g.type === type),
      ),
    [campus, zone, type],
  );

  function joinGroup() {
    setContactTopic("grupo");
  }

  return (
    <section id="grupos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-cv-navy px-6 py-14 text-white sm:px-12 sm:py-20">
            <Image
              src={images.hands.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="-z-20 object-cover opacity-45"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-cv-navy via-cv-navy/80 to-cv-celaya/30"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">
              Grupos pequeños
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              La iglesia no termina el domingo
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-200">
              Entre semana, en casas y cafeterías, es donde nacen las amistades
              reales, se comparte la vida y se crece juntos. Encuentra un grupo
              cerca de ti.
            </p>
          </div>
        </Reveal>

        {/* Filtros */}
        <Reveal delay={0.05}>
          <div className="mt-8 space-y-4 rounded-[2rem] bg-cv-mist p-5 sm:p-7">
            <FilterRow label="Campus">
              <Chip
                active={campus === "todos"}
                onClick={() => {
                  setCampus("todos");
                  setZone("todas");
                }}
              >
                Todos
              </Chip>
              {campuses.map((c) => (
                <Chip
                  key={c.id}
                  active={campus === c.id}
                  onClick={() => {
                    setCampus(c.id);
                    setZone("todas");
                  }}
                >
                  {c.shortName}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label="Zona">
              <Chip active={zone === "todas"} onClick={() => setZone("todas")}>
                Todas
              </Chip>
              {zones.map((z) => (
                <Chip key={z} active={zone === z} onClick={() => setZone(z)}>
                  {z}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label="Tipo">
              <Chip active={type === "todos"} onClick={() => setType("todos")}>
                Todos
              </Chip>
              {groupTypes.map((t) => (
                <Chip key={t} active={type === t} onClick={() => setType(t)}>
                  {t}
                </Chip>
              ))}
            </FilterRow>
          </div>
        </Reveal>

        {/* Resultados */}
        <p className="mt-8 text-sm text-slate-500" role="status" aria-live="polite">
          {results.length} {results.length === 1 ? "grupo encontrado" : "grupos encontrados"}
        </p>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((g) => {
              const c = getCampus(g.campus);
              const a = accent[g.campus];
              return (
                <motion.li
                  key={g.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-xl hover:shadow-cv-navy/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        a.bgSoft,
                        a.text,
                      )}
                    >
                      {c.shortName}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {g.type}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-cv-navy">
                    {g.name}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
                      {g.zone}
                    </li>
                    <li className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-slate-400" aria-hidden="true" />
                      {g.schedule}
                    </li>
                  </ul>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {results.length === 0 && (
          <div className="mt-4 flex flex-col items-center rounded-[2rem] border border-dashed border-slate-300 py-14 text-center">
            <SearchX className="h-8 w-8 text-slate-400" aria-hidden="true" />
            <p className="mt-3 font-semibold text-cv-navy">
              Aún no hay grupos con esos filtros
            </p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Prueba con otra combinación o cuéntanos qué buscas y te ayudamos a
              encontrar uno.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="#contacto"
            onClick={joinGroup}
            className="inline-flex rounded-full bg-cv-brand px-8 py-4 text-base font-semibold text-white shadow-xl shadow-cv-brand/25 transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Quiero unirme a un grupo
          </a>
        </div>
      </div>
    </section>
  );
}
