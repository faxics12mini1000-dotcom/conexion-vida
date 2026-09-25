import { currentSeries, latestMessages } from "@/data/messages";
import { SectionHeading } from "./SectionHeading";

/**
 * OCULTA en page.tsx hasta tener videos reales (PENDIENTES §6).
 * Sin reproductor falso: solo se muestra el video si hay un ID real.
 */
export function MessagesSection() {
  const { youtubeId, title, subtitle, channelUrl } = currentSeries;

  return (
    <section id="mensajes" data-tone="dark" className="section-y bg-navy text-cream">
      <div className="wrap">
        <SectionHeading tone="dark" title="Mensajes" />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {youtubeId ? (
              <div className="aspect-video">
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
              <div className="flex aspect-video items-center justify-center bg-cream/10 text-on-navy">
                {/* TODO(PENDIENTES §6): ID de YouTube del mensaje más reciente. */}
                Video por publicar
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <p className="font-semibold text-green">{subtitle}</p>
            <h3 className="mt-2 text-3xl sm:text-4xl">{title}</h3>
            {channelUrl && (
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green mt-6"
              >
                Ver todos los mensajes
              </a>
            )}
          </div>
        </div>

        {latestMessages.length > 0 && (
          <ul className="mt-14 divide-y divide-cream/20 border-y border-cream/20">
            {latestMessages.map((m) => (
              <li key={m.id} className="py-4">
                <h4 className="text-xl">{m.title}</h4>
                <p className="text-sm text-on-navy">
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
