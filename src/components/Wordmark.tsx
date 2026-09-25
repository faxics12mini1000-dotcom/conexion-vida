import { cn } from "@/lib/utils";

/**
 * Wordmark tipográfico para header y footer sobre navy.
 * Los logos oficiales de cada campus se muestran en su tarjeta de campus.
 * TODO(PENDIENTES §1): confirmar si existe un logo general de la iglesia.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-serif text-xl leading-none font-semibold tracking-tight text-cream",
        className,
      )}
    >
      Conexión <span className="text-green">Vida</span>
    </span>
  );
}
