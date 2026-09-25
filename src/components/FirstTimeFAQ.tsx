import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";
import { SectionHeading } from "./SectionHeading";

/**
 * OCULTA en page.tsx hasta tener respuestas reales (PENDIENTES §3).
 * Acordeón con <details> nativo: sin JS.
 */
export function FirstTimeFAQ() {
  return (
    <section id="primera-vez" className="section-y bg-paper">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            title="¿Es tu primera vez?"
            lead="Qué esperar cuando nos visites."
          />
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-7">
          {faqItems.map((f) => (
            <details key={f.id} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown
                  className="size-5 shrink-0 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-5 text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
