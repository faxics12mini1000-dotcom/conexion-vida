"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Check, MapPin, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { campuses, getCampus } from "@/data/campuses";
import { accent } from "@/lib/accent";
import { buildServiceIcs, formatSundayLabel } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { Icon, InstagramIcon } from "./icons";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ConnectModal() {
  const { visitOpen, closeVisit, campus: campusId, setCampus } = useApp();
  const [serviceIdx, setServiceIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const campus = getCampus(campusId);
  const service = campus.services[serviceIdx] ?? campus.services[0];
  const a = accent[campus.id];

  // Foco, scroll lock y restauración de foco
  useEffect(() => {
    if (!visitOpen) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [visitOpen]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        closeVisit();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [closeVisit],
  );

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
    <AnimatePresence>
      {visitOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onKeyDown={onKeyDown}
        >
          <div
            className="absolute inset-0 bg-cv-navy/70 backdrop-blur-sm"
            onClick={closeVisit}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="visit-title"
            className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={closeVisit}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-cv-navy focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <h2
              id="visit-title"
              className="pr-10 text-2xl font-semibold tracking-tight text-cv-navy"
            >
              Planea tu visita
            </h2>
            <p className="mt-1 text-slate-600">
              Elige tu campus y horario. Te esperamos con un café y una sonrisa.
            </p>

            {/* Selector de campus */}
            <div
              role="radiogroup"
              aria-label="Campus"
              className="mt-6 grid grid-cols-2 gap-3"
            >
              {campuses.map((c) => {
                const active = c.id === campus.id;
                const ca = accent[c.id];
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setCampus(c.id);
                      setServiceIdx(0);
                    }}
                    className={cn(
                      "rounded-2xl border-2 p-4 text-left transition focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none",
                      active
                        ? cn(ca.border, ca.bgSoft, "border-current", ca.text)
                        : "border-slate-200 text-cv-navy hover:border-slate-300",
                    )}
                  >
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                    <span className="mt-2 block font-semibold">
                      {c.shortName}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {c.city}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Horarios */}
            <p className="mt-6 text-sm font-medium text-slate-500">Horario</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {campus.services.map((s, i) => {
                const active = i === serviceIdx;
                return (
                  <button
                    key={s.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setServiceIdx(i)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none",
                      active
                        ? cn(a.bg, "text-white")
                        : "bg-slate-100 text-cv-navy hover:bg-slate-200",
                    )}
                  >
                    {s.day} · {s.label}
                  </button>
                );
              })}
            </div>

            <div className={cn("mt-6 rounded-2xl p-4", a.bgSoft)}>
              <p className="flex items-center gap-2 text-sm font-semibold text-cv-navy">
                <Check className={cn("h-4 w-4", a.text)} aria-hidden="true" />
                Tu próxima visita: {formatSundayLabel(service)}, {service.label}
              </p>
              <p className="mt-1 pl-6 text-sm text-slate-600">
                {campus.address}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={campus.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cv-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-cv-navy/90 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Cómo llegar
              </a>
              <button
                type="button"
                onClick={downloadIcs}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-cv-navy transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Agregar al calendario
              </button>
            </div>

            <a
              href={campus.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 transition hover:text-cv-navy"
            >
              <InstagramIcon className="h-4 w-4" />
              Síguenos {campus.instagram.handle}
            </a>

            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {campus.badges.map((b) => (
                <li
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  <Icon name={b.icon} className="h-3.5 w-3.5" />
                  {b.label}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
