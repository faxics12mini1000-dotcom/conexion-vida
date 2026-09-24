"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { kidsPillars, kidsPrograms } from "@/data/kids";
import { cn } from "@/lib/utils";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function KidsSection() {
  return (
    <section id="kids" className="bg-cv-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Niños y jóvenes"
            title="Un lugar seguro para que tus hijos amen venir"
            description="Mientras tú disfrutas el servicio, ellos viven una experiencia pensada para su edad."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {kidsPrograms.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <article className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] text-white">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  className={cn("absolute inset-0 bg-gradient-to-t via-cv-navy/40 to-transparent", "from-cv-navy/95")}
                  aria-hidden="true"
                />
                <div className="relative p-7 sm:p-9">
                  <span
                    className={cn(
                      "inline-block rounded-full bg-gradient-to-r px-4 py-1.5 text-xs font-semibold tracking-wide uppercase",
                      p.gradient,
                    )}
                  >
                    {p.ages}
                  </span>
                  <h3 className="mt-3 text-4xl font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-slate-200">
                    {p.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-slate-100">
                        <Check className="h-4 w-4 text-teal-300" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {kidsPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-[2rem] border border-slate-200 bg-white p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cv-celaya/10 text-cv-celaya">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-cv-navy">
                  {p.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
