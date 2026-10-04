"use client";

import { useApp } from "./AppProvider";
import { Reveal } from "./Reveal";

/** Invitación final antes del pie de página. */
export function ClosingCta() {
  const { openVisit } = useApp();

  return (
    <section
      aria-labelledby="invitacion-title"
      data-tone="dark"
      className="relative isolate overflow-hidden border-t border-cream/15 bg-navy text-cream"
    >
      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute top-1/2 -left-40 -z-10 size-[36rem] -translate-y-1/2 rounded-full text-cream/10"
      />
      <div className="wrap section-y">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="invitacion-title" className="text-4xl sm:text-5xl lg:text-6xl">
            Tu lugar está <span className="text-green">guardado</span>.
          </h2>
          <p className="mx-auto mt-5 text-lg text-on-navy sm:text-xl">
            Ven como estás. Te esperamos este domingo en Querétaro o en Celaya.
          </p>
          <button type="button" onClick={() => openVisit()} className="btn btn-green mt-9">
            Planear mi visita
          </button>
        </Reveal>
      </div>
    </section>
  );
}
