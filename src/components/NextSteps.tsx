"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { nextSteps } from "@/data/nextSteps";
import { cn } from "@/lib/utils";
import { useApp } from "./AppProvider";
import { SectionHeading } from "./SectionHeading";

export function NextSteps() {
  const { openVisit } = useApp();
  const [openId, setOpenId] = useState<string | null>(nextSteps[0].id);

  return (
    <section id="proximos-pasos" className="section-y bg-paper">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading title="¿Dónde estás en tu camino?" />
        </div>

        <ol className="divide-y divide-line border-y border-line lg:col-span-8">
          {nextSteps.map((s, i) => {
            const open = openId === s.id;
            return (
              <li key={s.id}>
                <h3 className="text-xl sm:text-2xl">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : s.id)}
                    aria-expanded={open}
                    aria-controls={`step-${s.id}`}
                    className="flex min-h-14 w-full items-center gap-4 py-4 text-left"
                  >
                    <span className="w-8 shrink-0 font-sans text-base font-semibold text-green-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{s.title}</span>
                    <ChevronDown
                      className={cn("size-5 shrink-0", open && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {open && (
                  <div id={`step-${s.id}`} className="pb-6 pl-12">
                    <p className="text-muted">{s.description}</p>
                    {s.href === "visit" ? (
                      <button
                        type="button"
                        onClick={() => openVisit()}
                        className="btn btn-navy mt-4"
                      >
                        {s.cta}
                      </button>
                    ) : (
                      <a href={s.href} className="btn btn-navy mt-4">
                        {s.cta}
                      </a>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
