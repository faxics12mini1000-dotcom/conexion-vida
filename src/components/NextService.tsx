"use client";

import { useEffect, useState } from "react";
import { campuses } from "@/data/campuses";
import { nextOccurrence } from "@/lib/calendar";
import { useApp } from "./AppProvider";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
  };
}

/**
 * Cuenta regresiva a la próxima reunión de cada campus. Se calcula en el
 * cliente (hora local del visitante) para no desfasarse con el HTML estático.
 */
export function NextService() {
  const { openVisit } = useApp();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid gap-px overflow-hidden rounded-ui border border-cream/20 bg-cream/20 sm:grid-cols-2">
      {campuses.map((c) => {
        const s = c.services[0];
        const t = now === null ? null : parts(nextOccurrence(s, new Date(now)).getTime() - now);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => openVisit(c.id)}
            className="group flex flex-col gap-3 bg-navy p-5 text-left transition-colors hover:bg-cream/5 sm:p-6"
          >
            <span className="text-sm font-semibold text-green">Este domingo</span>
            <span className="font-serif text-2xl text-cream sm:text-3xl">
              {c.shortName} · {s.label}
            </span>
            <span
              className="flex gap-5 font-serif text-cream tabular-nums"
              aria-label={
                t ? `Faltan ${t.d} días, ${t.h} horas y ${t.m} minutos` : undefined
              }
            >
              {(["d", "h", "m"] as const).map((k) => (
                <span key={k} className="flex items-baseline gap-1.5" aria-hidden="true">
                  <span className="text-3xl">{t ? String(t[k]).padStart(2, "0") : "--"}</span>
                  <span className="font-sans text-sm text-on-navy">
                    {k === "d" ? "días" : k === "h" ? "hrs" : "min"}
                  </span>
                </span>
              ))}
            </span>
            <span className="text-sm text-on-navy underline-offset-4 group-hover:text-cream group-hover:underline">
              Planear mi visita →
            </span>
          </button>
        );
      })}
    </div>
  );
}
