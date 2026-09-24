"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { currentSeries, latestMessages, topicStyles } from "@/data/messages";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function SeriesPlayer() {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, image, title } = currentSeries;

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-cv-navy shadow-2xl shadow-black/40">
      {playing && youtubeId ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={`Reproductor: ${title}`}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-cv-navy/30" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={`Reproducir ${title}`}
            aria-pressed={playing}
            className="group absolute inset-0 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset focus-visible:outline-none"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-cv-brand shadow-xl transition group-hover:scale-110">
              <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
            </span>
          </button>
          <AnimatePresence>
            {playing && !youtubeId && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                className="absolute inset-x-4 bottom-4 rounded-2xl bg-cv-navy/90 px-4 py-3 text-center text-sm text-white backdrop-blur"
              >
                Pronto publicaremos aquí el mensaje de esta serie.
              </motion.p>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export function MessagesSection() {
  const { weeks, currentWeek } = currentSeries;

  return (
    <section id="mensajes" className="bg-cv-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Mensajes"
            title="Palabras que conectan con tu vida diaria"
            description="Vuelve a escuchar lo que se compartió el domingo o ponte al día con nuestra serie actual."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 grid items-center gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:p-6 lg:grid-cols-12 lg:gap-10 lg:p-8">
            <div className="lg:col-span-7">
              <SeriesPlayer />
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">
                {currentSeries.subtitle}
              </p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                {currentSeries.title}
              </h3>
              <p className="mt-4 leading-relaxed text-slate-300">
                {currentSeries.description}
              </p>

              <div className="mt-6">
                <p className="text-sm text-slate-400">
                  Semana {currentWeek} de {weeks}
                </p>
                <div
                  className="mt-2 flex gap-1.5"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={weeks}
                  aria-valuenow={currentWeek}
                  aria-label="Progreso de la serie"
                >
                  {Array.from({ length: weeks }, (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full",
                        i < currentWeek ? "bg-gradient-to-r from-cv-brand to-cv-celaya" : "bg-white/15",
                      )}
                    />
                  ))}
                </div>
              </div>

              {currentSeries.channelUrl && (
                <a
                  href={currentSeries.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-cv-navy transition hover:bg-sky-50"
                >
                  Ver todos los mensajes
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <h3 className="mt-14 text-xl font-semibold text-white">
          Últimas predicaciones
        </h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {latestMessages.map((m, i) => (
            <li key={m.id} className="list-none">
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={m.image.src}
                      alt={m.image.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-cv-navy/70 to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur",
                        topicStyles[m.topic],
                        "bg-white/90",
                      )}
                    >
                      {m.topic}
                    </span>
                    <span
                      className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-cv-brand opacity-0 transition group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold">{m.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {m.summary}
                    </p>
                    <p className="mt-4 text-xs text-slate-400">
                      {m.speaker} · {m.date}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
