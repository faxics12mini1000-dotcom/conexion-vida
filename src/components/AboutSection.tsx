"use client";

import Image from "next/image";
import { images } from "@/data/site";
import type { IconKey } from "@/data/types";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const values: { title: string; text: string; icon: IconKey }[] = [
  {
    title: "Una iglesia actual",
    text: "Música contemporánea, mensajes prácticos y un ambiente que habla tu idioma.",
    icon: "music",
  },
  {
    title: "Personas reales",
    text: "Sin máscaras ni apariencias. Aquí puedes tener preguntas, dudas y una historia.",
    icon: "users",
  },
  {
    title: "Vida conectada",
    text: "Conectados con Dios, con otros y con el propósito para el que fuimos creados.",
    icon: "heart",
  },
  {
    title: "Para nuestra ciudad",
    text: "Servimos a Querétaro y Celaya, y soñamos con llegar a más ciudades.",
    icon: "map-pin",
  },
];

export function AboutSection() {
  return (
    <section id="quienes-somos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Quiénes somos"
            title="Una comunidad que te espera, tal como eres"
            description="Somos una iglesia que cree que la fe debe ser cercana, relevante y compartida. Nuestro sueño es que cada persona viva una vida conectada con Dios y con otros."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="relative min-h-72 overflow-hidden rounded-[2rem] lg:col-span-5 lg:min-h-full">
            <Image
              src={images.community.src}
              alt={images.community.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-cv-navy/70 via-transparent"
              aria-hidden="true"
            />
            <p className="absolute right-6 bottom-6 left-6 text-lg font-medium text-white">
              «La fe se vive mejor en comunidad.»
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="group h-full rounded-[2rem] border border-slate-200 bg-cv-mist/60 p-7 transition hover:-translate-y-1 hover:border-cv-brand/30 hover:bg-white hover:shadow-xl hover:shadow-cv-brand/5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cv-brand/10 text-cv-brand transition group-hover:bg-cv-brand group-hover:text-white">
                    <Icon name={v.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-cv-navy">
                    {v.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
