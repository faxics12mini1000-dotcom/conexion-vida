"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, CreditCard, Landmark, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { giving, images } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Tab = "transferencia" | "online";

const tabs: { id: Tab; label: string; icon: typeof Landmark }[] = [
  { id: "transferencia", label: "Transferencia", icon: Landmark },
  { id: "online", label: "Donación online", icon: CreditCard },
];

const formatClabe = (c: string) => c.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

export function GivingSection() {
  const baseId = useId();
  const [tab, setTab] = useState<Tab>("transferencia");
  const [copied, setCopied] = useState(false);
  const { bankTransfer, online } = giving;

  async function copyClabe() {
    try {
      await navigator.clipboard.writeText(bankTransfer.clabe);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles: la CLABE sigue visible para copiar a mano.
    }
  }

  return (
    <section id="generosidad" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionHeading
              eyebrow="Generosidad"
              title="Invertimos en vidas y en nuestra ciudad"
              description="Creemos que dar es una respuesta de gratitud, nunca una obligación. Lo que se recibe se invierte en servicios, ministerio de niños y jóvenes, apoyo a familias y en llevar esperanza a nuestras ciudades."
            />
            <blockquote className="mt-8 border-l-4 border-cv-celaya pl-5 text-slate-600">
              <p className="text-lg leading-relaxed italic">
                «Cada uno dé como propuso en su corazón: no con tristeza, ni por
                necesidad, porque Dios ama al dador alegre.»
              </p>
              <footer className="mt-2 text-sm font-semibold text-cv-navy">
                2 Corintios 9:7
              </footer>
            </blockquote>
            <p className="mt-6 text-slate-600">
              Si eres visita, no esperamos nada de ti: solo que te sientas en casa.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-8 hidden aspect-[16/9] overflow-hidden rounded-[2rem] lg:block">
              <Image
                src={images.giving.src}
                alt={images.giving.alt}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-cv-navy/10">
            <div
              role="tablist"
              aria-label="Formas de dar"
              className="grid grid-cols-2 gap-1 bg-cv-mist p-1.5"
            >
              {tabs.map((t) => {
                const active = tab === t.id;
                const TabIcon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${t.id}`}
                    aria-selected={active}
                    aria-controls={`${baseId}-panel-${t.id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                        setTab(t.id === "transferencia" ? "online" : "transferencia");
                      }
                    }}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:outline-none",
                      active
                        ? "bg-white text-cv-navy shadow-sm"
                        : "text-slate-500 hover:text-cv-navy",
                    )}
                  >
                    <TabIcon className="h-4 w-4" aria-hidden="true" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  role="tabpanel"
                  id={`${baseId}-panel-${tab}`}
                  aria-labelledby={`${baseId}-tab-${tab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === "transferencia" ? (
                    <div>
                      <p className="text-slate-600">
                        Haz tu donativo desde tu banca en línea o app con estos
                        datos:
                      </p>
                      <dl className="mt-6 space-y-4">
                        <div>
                          <dt className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                            CLABE interbancaria
                          </dt>
                          <dd className="mt-1 flex items-center justify-between gap-3 rounded-2xl bg-cv-mist px-4 py-3">
                            <span className="font-mono text-lg font-semibold tracking-wide text-cv-navy sm:text-xl">
                              {formatClabe(bankTransfer.clabe)}
                            </span>
                            <button
                              type="button"
                              onClick={copyClabe}
                              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-cv-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-cv-navy/90 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none"
                            >
                              {copied ? (
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              )}
                              {copied ? "Copiada" : "Copiar"}
                            </button>
                          </dd>
                          <span role="status" className="sr-only">
                            {copied ? "CLABE copiada al portapapeles" : ""}
                          </span>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <dt className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                              Banco
                            </dt>
                            <dd className="mt-1 font-medium text-cv-navy">
                              {bankTransfer.bank}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                              Beneficiario
                            </dt>
                            <dd className="mt-1 font-medium text-cv-navy">
                              {bankTransfer.accountHolder}
                            </dd>
                          </div>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                            Concepto sugerido
                          </dt>
                          <dd className="mt-1 font-medium text-cv-navy">
                            {bankTransfer.concept}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-600">
                        Da en línea de forma rápida y segura, con tarjeta de
                        crédito o débito.
                      </p>
                      <ul className="mt-6 space-y-3 text-sm text-slate-600">
                        {[
                          "Pago cifrado a través de una " + online.provider,
                          "Puedes dar una vez o de forma recurrente",
                          "No almacenamos los datos de tu tarjeta",
                        ].map((t) => (
                          <li key={t} className="flex items-start gap-2.5">
                            <ShieldCheck
                              className="mt-0.5 h-4 w-4 shrink-0 text-cv-celaya"
                              aria-hidden="true"
                            />
                            {t}
                          </li>
                        ))}
                      </ul>
                      {online.url ? (
                        <a
                          href={online.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cv-brand px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cv-brand/25 transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-cv-brand focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          Dar ahora
                          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="mt-7 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-slate-200 px-6 py-3.5 text-base font-semibold text-slate-500"
                        >
                          Donación online próximamente
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
