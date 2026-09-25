import { PhotoFrame } from "./PhotoFrame";
import { SectionHeading } from "./SectionHeading";

/**
 * Lista textual de "lo que puedes esperar", tomada del esquema de la propia
 * iglesia (Propuesta página web.pdf). Sin descripciones inventadas.
 */
const expect = [
  "Una iglesia actual",
  "Personas reales",
  "Enseñanza basada en la Biblia",
  "Música contemporánea",
  "Comunidad",
  "Espacio para preguntas y dudas",
  "Un lugar para servir",
];

export function AboutSection() {
  return (
    <section
      id="quienes-somos"
      aria-labelledby="quienes-somos-title"
      className="section-y bg-paper"
    >
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="quienes-somos-title" title="Quiénes somos" />
            <p className="mt-8 max-w-2xl font-serif text-3xl leading-tight text-navy sm:text-4xl">
              Existimos para conectar a las personas con Jesús.
            </p>
            <p className="mt-6 text-lg text-muted">
              Somos una iglesia con campus en Querétaro y Celaya. Queremos que
              cualquier persona, sin importar qué tanto sepa de la fe, tenga un
              lugar donde escuchar la Biblia, hacer preguntas y conocer a Jesús
              acompañada.
            </p>
            {/* TODO(PENDIENTES §1, §4): historia, pastores y lo que creemos. */}
          </div>

          <div className="lg:col-span-5 lg:mt-14">
            <PhotoFrame
              photo="comunidad"
              label="Nuestra comunidad"
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>

        <div className="mt-16 border-t border-navy pt-10 lg:mt-20">
          <h3 className="text-2xl sm:text-3xl">Lo que puedes esperar de nosotros</h3>
          <ul className="mt-8 grid gap-x-12 sm:grid-cols-2">
            {expect.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-line py-4 font-serif text-xl sm:text-2xl"
              >
                <span
                  aria-hidden="true"
                  className="w-8 shrink-0 font-sans text-base font-semibold text-green-deep"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
