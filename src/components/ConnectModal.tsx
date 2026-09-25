"use client";

import { CalendarPlus, MapPin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { campuses, getCampus } from "@/data/campuses";
import { buildServiceIcs, formatNextLabel } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { InstagramIcon } from "./icons";

/**
 * Modal "Planea tu visita" con <dialog> nativo: el navegador se encarga del
 * foco, del Escape y de bloquear la interacción con el resto de la página.
 */
export function ConnectModal() {
  const { visitOpen, closeVisit, campus: campusId, setCampus } = useApp();
  const [serviceIdx, setServiceIdx] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const campus = getCampus(campusId);
  const service = campus.services[serviceIdx] ?? campus.services[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (visitOpen && !dialog.open) dialog.showModal();
    if (!visitOpen && dialog.open) dialog.close();
  }, [visitOpen]);

  useEffect(() => {
    if (!visitOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [visitOpen]);

  function downloadIcs() {
    const blob = new Blob([buildServiceIcs(campus, service)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `conexion-vida-${campus.id}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="visit-title"
      onClose={closeVisit}
      onClick={(e) => {
        // Un clic sobre el fondo (::backdrop) llega con el <dialog> como destino.
        if (e.target === e.currentTarget) closeVisit();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-ui border border-line bg-paper p-0 text-ink backdrop:bg-navy/70"
    >
      <div data-campus={campus.id} className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={closeVisit}
          aria-label="Cerrar"
          className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-ui hover:bg-cream"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <h2 id="visit-title" className="pr-12 text-3xl">
          Planea tu visita
        </h2>
        <p className="mt-2 text-muted">Elige tu campus. Nos reunimos los domingos.</p>

        <div role="group" aria-label="Campus" className="mt-6 grid grid-cols-2 gap-3">
          {campuses.map((c) => {
            const active = c.id === campus.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setCampus(c.id);
                  setServiceIdx(0);
                }}
                className={cn(
                  "min-h-11 rounded-ui border p-3 text-left",
                  active ? "border-campus bg-campus text-cream" : "border-line hover:border-muted",
                )}
              >
                <span className="block font-semibold">{c.shortName}</span>
                <span className={cn("block text-sm", active ? "text-cream" : "text-muted")}>
                  {c.city}
                </span>
              </button>
            );
          })}
        </div>

        {/* Con una sola reunión por campus no hay nada que elegir: va directo al resumen. */}
        {campus.services.length > 1 && (
          <>
            <p className="mt-6 text-sm font-semibold text-muted">Horario</p>
            <div role="group" aria-label="Horario" className="mt-2 flex flex-wrap gap-2">
              {campus.services.map((s, i) => {
                const active = i === serviceIdx;
                return (
                  <button
                    key={s.day + s.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setServiceIdx(i)}
                    className={cn(
                      "min-h-11 rounded-ui border px-4 font-semibold",
                      active ? "border-campus bg-campus text-cream" : "border-line hover:border-muted",
                    )}
                  >
                    {s.day} · {s.label}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-6 rounded-ui bg-campus-soft p-4">
          <p className="font-semibold">
            Tu próxima visita: {formatNextLabel(service)}, {service.label}
          </p>
          <p className="mt-1 text-muted">{campus.address}</p>
        </div>

        {/* TODO(PENDIENTES §2): enlace de Maps exacto cuando exista la dirección. */}
        <button type="button" onClick={downloadIcs} className="btn btn-navy mt-6 w-full">
          <CalendarPlus className="size-4" aria-hidden="true" />
          Agregar al calendario
        </button>

        <a
          href={campus.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-line mt-3 w-full text-navy"
        >
          <MapPin className="size-4" aria-hidden="true" />
          Cómo llegar
          <span className="sr-only"> (se abre en otra pestaña)</span>
        </a>

        <a
          href={campus.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex min-h-11 items-center justify-center gap-2 text-muted underline underline-offset-4"
        >
          <InstagramIcon className="size-4" />
          {campus.instagram.handle}
        </a>
      </div>
    </dialog>
  );
}
