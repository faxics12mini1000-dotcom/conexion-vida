import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = "light",
  className,
}: {
  /** id del <h2>, para aria-labelledby de la sección. */
  id?: string;
  /** Etiqueta corta sobre el título (ej. "Campus"). */
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-sm font-semibold",
            tone === "dark" ? "text-green" : "text-green-deep",
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {lead && (
        <p
          className={cn(
            "mt-4 text-lg",
            tone === "dark" ? "text-on-navy" : "text-muted",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
