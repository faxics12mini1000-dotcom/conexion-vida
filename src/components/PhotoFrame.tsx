import Image from "next/image";
import { getPhoto, type PhotoKey } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Marco de fotografía. Lee la foto de `churchPhotos` (src/data/site.ts).
 * Sin foto asignada muestra un contenedor de marca con el nombre del espacio,
 * sin romper el layout ni usar imágenes externas.
 */
export function PhotoFrame({
  photo,
  label,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  tone = "light",
  className,
}: {
  photo: PhotoKey;
  /** Nombre visible en el estado de espera (y texto alternativo por defecto). */
  label: string;
  aspect?: string;
  sizes?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const image = getPhoto(photo);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-ui border",
        aspect,
        tone === "dark" ? "border-cream/25 bg-cream/10" : "border-line bg-navy-soft",
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-1 overflow-hidden p-4 text-center",
            tone === "dark" ? "bg-navy text-on-navy" : "text-navy",
          )}
        >
          <div
            className={cn(
              "rings absolute top-1/2 left-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full",
              tone === "dark" ? "text-cream/10" : "text-navy/10",
            )}
          />
          <span className="relative size-2.5 rounded-full bg-green" />
          <span className="relative mt-2 font-serif text-xl sm:text-2xl">{label}</span>
          <span className="relative text-sm tracking-wide opacity-80">Conexión Vida</span>
        </div>
      )}
    </div>
  );
}
