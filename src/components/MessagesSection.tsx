import { Play } from "lucide-react";
import { currentSeries, latestMessages } from "@/data/messages";
import { PhotoFrame } from "./PhotoFrame";
import { SectionHeading } from "./SectionHeading";

/**
 * Sin reproductor falso: si hay un ID de YouTube se incrusta el video
 * (youtube-nocookie); si no, banner hacia el canal oficial.
 */
export function MessagesSection() {
  const { youtubeId, title, subtitle, channelUrl, photo } = currentSeries;

  return (
    <section
      id="mensajes"
      aria-labelledby="mensajes-title"
      className="section-y bg-cream text-ink"
    >
      <div className="wrap">
        <SectionHeading
          id="mensajes-title"
          title="Mensajes"
          lead="Escucha las enseñanzas de la iglesia cuando quieras, desde donde estés."
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="font-semibold text-green-deep">{subtitle}</p>
            <h3 className="mt-3 text-4xl sm:text-5xl">{title}</h3>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-navy mt-8"
            >
              Ver predicaciones en YouTube
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </div>

          <div className="lg:col-span-7">
            {youtubeId ? (
              <div className="aspect-video overflow-hidden rounded-ui bg-navy">
                <iframe
                  className="size-full"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                  title={`Reproductor: ${title}`}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="group relative block"
              >
                <PhotoFrame
                  photo={photo}
                  label={title}
                  aspect="aspect-video"
                  tone="dark"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="border-navy bg-navy"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-16 items-center justify-center rounded-ui bg-green text-navy group-hover:opacity-90 sm:size-20">
                    <Play className="size-7 sm:size-9" fill="currentColor" aria-hidden="true" />
                  </span>
                </span>
              </a>
            )}
          </div>
        </div>

        {latestMessages.length > 0 && (
          <ul className="mt-14 divide-y divide-line border-y border-line">
            {latestMessages.map((m) => (
              <li key={m.id} className="py-4">
                <h4 className="text-xl">{m.title}</h4>
                <p className="text-sm text-muted">
                  {m.speaker} · {m.date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
