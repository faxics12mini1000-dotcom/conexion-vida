import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  lead,
  tone = "light",
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
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
