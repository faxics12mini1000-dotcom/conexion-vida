import { Reveal } from "./Reveal";

/**
 * Banda de misión, con las palabras de la propia iglesia ("Conectando a las
 * personas con Jesús"). Separa visualmente las secciones largas.
 */
export function MissionBand() {
  return (
    <section aria-label="Nuestra misión" className="relative isolate overflow-hidden bg-green text-navy">
      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute -top-40 -right-40 -z-10 size-[34rem] rounded-full text-navy/15"
      />
      <div className="wrap py-16 sm:py-24">
        <Reveal>
          <p className="text-sm font-semibold">Nuestra misión</p>
          <p className="mt-4 max-w-4xl font-serif text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl">
            Conectando a las personas con Jesús.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
