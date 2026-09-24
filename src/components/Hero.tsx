"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { campuses } from "@/data/campuses";
import { images } from "@/data/site";
import { accent } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const { campus: selected, setCampus, openVisit } = useApp();

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-cv-navy pt-24 pb-16"
    >
      <Image
        src={images.hero.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-50"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-cv-navy via-cv-navy/85 to-cv-brand/40"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 -bottom-32 -z-10 h-[32rem] w-[32rem] rounded-full bg-cv-celaya/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-sky-100 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cv-celaya opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cv-celaya" />
            </span>
            Querétaro y Celaya · Domingos
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
          >
            Una iglesia actual.{" "}
            <span className="text-sky-200">Personas reales.</span>{" "}
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-teal-300 bg-clip-text text-transparent">
              Una vida conectada con Dios.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-300 sm:text-xl"
          >
            Una puerta de entrada para conocer la fe y una comunidad donde
            pertenecer. Ven tal como eres, hay un lugar para ti.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#campus"
              className="group inline-flex items-center gap-2 rounded-full bg-cv-brand px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-cv-brand/30 transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-cv-navy focus-visible:outline-none"
            >
              Encuentra tu Campus
              <ArrowRight
                className="h-5 w-5 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#primera-vez"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              ¿Es tu primera vez?
            </a>
          </motion.div>
        </motion.div>

        {/* Selector visual de sede */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            <p className="px-2 pb-3 text-sm font-medium text-slate-200">
              Elige tu sede · horarios de domingo
            </p>
            <div
              role="radiogroup"
              aria-label="Elige tu campus"
              className="space-y-3"
            >
              {campuses.map((c, i) => {
                const active = c.id === selected;
                const a = accent[c.id];
                return (
                  <motion.button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setCampus(c.id)}
                    animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
                    transition={{
                      duration: 6 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full rounded-2xl border p-4 text-left transition focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none",
                      active
                        ? "border-white bg-white text-cv-navy shadow-xl"
                        : "border-white/15 bg-white/5 text-white hover:bg-white/10",
                    )}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 font-semibold">
                        <MapPin
                          className={cn("h-5 w-5", active ? a.text : "text-sky-200")}
                          aria-hidden="true"
                        />
                        {c.name}
                      </span>
                      <span
                        className={cn(
                          "h-5 w-5 rounded-full border-2 transition",
                          active
                            ? cn(a.bg, "border-transparent")
                            : "border-white/40",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={cn(
                        "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm",
                        active ? "text-slate-600" : "text-slate-300",
                      )}
                    >
                      {c.services.map((s) => (
                        <span key={s.label} className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {s.day} {s.label}
                        </span>
                      ))}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => openVisit(selected)}
              className="mt-4 w-full rounded-full bg-white px-6 py-3.5 text-base font-semibold text-cv-navy transition hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              Planear mi visita
            </button>
          </div>
        </motion.div>
      </div>

      <a
        href="#quienes-somos"
        aria-label="Bajar a la siguiente sección"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-white/60 transition hover:text-white lg:block"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
