"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Coffee } from "lucide-react";
import { useState } from "react";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function FirstTimeFAQ() {
  const { openVisit } = useApp();
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  return (
    <section id="primera-vez" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="¿Es tu primera vez?"
              title="Qué esperar cuando nos visites"
              description="Sabemos que llegar a un lugar nuevo puede dar nervios. Aquí resolvemos las dudas más comunes para que llegues con tranquilidad."
            />
            <div className="mt-8 rounded-[2rem] bg-gradient-to-br from-cv-brand to-cv-celaya p-7 text-white">
              <Coffee className="h-8 w-8" aria-hidden="true" />
              <p className="mt-4 text-xl font-semibold">
                Te recibimos con un café.
              </p>
              <p className="mt-1 text-white/85">
                Nuestro equipo de bienvenida estará feliz de acompañarte desde
                que llegas.
              </p>
              <button
                type="button"
                onClick={() => openVisit()}
                className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-cv-navy transition hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-cv-brand focus-visible:outline-none"
              >
                Planear mi visita
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ul className="space-y-3">
            {faqItems.map((f) => {
              const open = openId === f.id;
              return (
                <li
                  key={f.id}
                  className={cn(
                    "overflow-hidden rounded-3xl border transition-colors",
                    open
                      ? "border-cv-brand/30 bg-cv-brand/[0.04]"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : f.id)}
                      aria-expanded={open}
                      aria-controls={`faq-${f.id}`}
                      id={`faq-btn-${f.id}`}
                      className="flex w-full items-center gap-4 p-5 text-left focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-inset focus-visible:outline-none sm:p-6"
                    >
                      <span
                        className={cn(
                          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition",
                          open ? "bg-cv-brand text-white" : "bg-cv-mist text-cv-brand",
                        )}
                      >
                        <Icon name={f.icon} className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-lg font-semibold text-cv-navy">
                        {f.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300",
                          open && "rotate-180 text-cv-brand",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-${f.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${f.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 pl-[4.75rem] leading-relaxed text-slate-600 sm:px-6 sm:pb-7 sm:pl-[5.25rem]">
                          {f.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
