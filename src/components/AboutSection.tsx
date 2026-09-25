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
    <section id="quienes-somos" className="section-y bg-paper">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            title="Quiénes somos"
            lead="Conectando a las personas con Jesús."
          />
          {/* TODO(PENDIENTES §1, §4): misión, visión, valores, lo que creemos e historia. */}
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-2xl sm:text-3xl">
            Esto es lo que puedes esperar de nosotros
          </h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {expect.map((item) => (
              <li key={item} className="py-4 font-serif text-xl">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
