"use client";

import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";
import { useApp } from "./AppProvider";
import { PhotoFrame } from "./PhotoFrame";
import { SectionHeading } from "./SectionHeading";

/** Acordeón con <details> nativo: funciona sin JS (el CTA sí usa el modal). */
export function FirstTimeFAQ() {
  const { openVisit } = useApp();

  return (
    <section
      id="primera-vez"
      aria-labelledby="primera-vez-title"
      data-tone="dark"
      className="section-y bg-navy text-cream"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="primera-vez-title"
            tone="dark"
            title="¿Es tu primera vez?"
            lead="Lo que necesitas saber antes de venir. Sin presión: ven como estás."
          />
          <PhotoFrame
            photo="auditorio"
            label="Nuestras reuniones"
            aspect="aspect-[4/3]"
            tone="dark"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="mt-10 hidden sm:block"
          />
          <button
            type="button"
            onClick={() => openVisit()}
            className="btn btn-green mt-8"
          >
            Planear mi visita
          </button>
        </div>

        <div className="divide-y divide-cream/20 border-y border-cream/20 lg:col-span-7 lg:self-start">
          {faqItems.map((f, i) => (
            <details key={f.id} className="group" open={i === 0}>
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl sm:text-2xl [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown
                  className="size-5 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-6 text-lg text-on-navy">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
