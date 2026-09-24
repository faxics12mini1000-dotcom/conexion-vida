"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { nextSteps } from "@/data/nextSteps";
import { cn } from "@/lib/utils";
import { useApp, type ContactTopic } from "./AppProvider";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Pasos cuyo CTA lleva al formulario de contacto con el tema preseleccionado. */
const topicByStep: Record<string, ContactTopic> = {
  bautismo: "bautismo",
  servir: "servir",
  liderar: "servir",
};

export function NextSteps() {
  const { setContactTopic } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const step = nextSteps[activeIdx];
  const progress = (activeIdx / (nextSteps.length - 1)) * 100;

  return (
    <section id="proximos-pasos" className="bg-cv-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Próximos pasos"
            title="Tu camino de fe, a tu ritmo"
            description="No importa dónde estés hoy: siempre hay un siguiente paso. Toca cada etapa para conocerla."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14">
            {/* Stepper */}
            <ol className="relative flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
              {/* Línea base + progreso (horizontal en md+) */}
              <div
                className="absolute top-6 right-[8.33%] left-[8.33%] hidden h-1 rounded-full bg-slate-200 md:block"
                aria-hidden="true"
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cv-brand to-cv-celaya"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {nextSteps.map((s, i) => {
                const done = i < activeIdx;
                const active = i === activeIdx;
                return (
                  <li key={s.id} className="relative md:flex-1">
                    <button
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      aria-current={active ? "step" : undefined}
                      className="group flex w-full items-center gap-4 rounded-2xl p-2 text-left focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none md:flex-col md:gap-3 md:text-center"
                    >
                      <span
                        className={cn(
                          "relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-cv-mist text-base font-bold transition-all duration-300",
                          active &&
                            "scale-110 bg-cv-brand text-white shadow-lg shadow-cv-brand/40",
                          done && "bg-cv-celaya text-white",
                          !active &&
                            !done &&
                            "bg-white text-slate-500 group-hover:text-cv-brand",
                        )}
                      >
                        {done ? <Check className="h-5 w-5" aria-hidden="true" /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold transition md:max-w-[8rem]",
                          active ? "text-cv-navy" : "text-slate-500 group-hover:text-cv-navy",
                        )}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Detalle */}
            <div className="mt-10 min-h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-cv-navy/5 sm:p-10"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-5">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cv-brand to-cv-celaya text-white">
                      <Icon name={step.icon} className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-cv-brand">
                        Paso {activeIdx + 1} de {nextSteps.length}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-cv-navy sm:text-3xl">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href={step.href}
                      onClick={() => {
                        const t = topicByStep[step.id];
                        if (t) setContactTopic(t);
                      }}
                      className="group inline-flex items-center gap-2 rounded-full bg-cv-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-cv-navy/90 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {step.cta}
                      <ArrowRight
                        className="h-4 w-4 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                    {activeIdx < nextSteps.length - 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveIdx(activeIdx + 1)}
                        className="rounded-full px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-cv-navy"
                      >
                        Siguiente paso
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
