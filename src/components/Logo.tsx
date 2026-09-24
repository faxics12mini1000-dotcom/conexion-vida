import { cn } from "@/lib/utils";

/** Isotipo: dos anillos entrelazados (conexión) sobre un cuadrado redondeado. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Isotipo de Conexión Vida"
    >
      <defs>
        <linearGradient id="cv-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#cv-logo-grad)" />
      <circle
        cx="15.5"
        cy="20"
        r="7"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
      />
      <circle
        cx="24.5"
        cy="20"
        r="7"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.75"
        strokeWidth="2.6"
      />
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "text-lg leading-none font-semibold tracking-tight",
          tone === "light" ? "text-white" : "text-cv-navy",
        )}
      >
        Conexión <span className="font-bold">Vida</span>
      </span>
    </span>
  );
}
