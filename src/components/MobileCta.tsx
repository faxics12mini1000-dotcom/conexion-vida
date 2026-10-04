"use client";

import { CalendarPlus, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getCampus } from "@/data/campuses";
import { useApp } from "./AppProvider";

/** Barra fija solo en móvil. Aparece al salir del hero para no tapar el inicio. */
export function MobileCta() {
  const { openVisit, campus: campusId, visitOpen } = useApp();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const campus = getCampus(campusId);
  const visible = show && !visitOpen;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-cream/20 bg-navy px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <button type="button" onClick={() => openVisit()} className="btn btn-green flex-1">
          <CalendarPlus className="size-4" aria-hidden="true" />
          Planear mi visita
        </button>
        <a
          href={campus.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-line text-cream"
        >
          <MapPin className="size-4" aria-hidden="true" />
          Cómo llegar
          <span className="sr-only"> a {campus.shortName} (se abre en otra pestaña)</span>
        </a>
      </div>
    </div>
  );
}
