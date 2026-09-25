import { campuses } from "@/data/campuses";
import { navLinks } from "@/data/site";
import { InstagramIcon } from "./icons";
import { Wordmark } from "./Wordmark";

const linkClass = "inline-flex min-h-11 items-center gap-2 underline underline-offset-4";

/**
 * TODO(PENDIENTES §9): WhatsApp (wa.me), correo real y aviso de privacidad.
 * El formulario por mailto: se ocultó: enviaba a un correo que no existe.
 */
export function Footer() {
  return (
    <footer id="contacto" data-tone="dark" className="bg-navy text-cream">
      <div className="wrap section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark className="text-2xl" />
          <h2 className="mt-8 text-3xl">Contacto</h2>
          <p className="mt-3 text-on-navy">
            Por ahora, escríbenos por mensaje directo en las redes de tu campus.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center text-cream/85 hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
          {campuses.map((c) => (
            <div key={c.id}>
              <h3 className="text-2xl">{c.name}</h3>
              <p className="mt-1 text-on-navy">{c.city}</p>
              <p className="mt-4 text-sm font-semibold text-green">Reuniones</p>
              <ul className="mt-1 text-on-navy">
                {c.services.map((s) => (
                  <li key={s.day + s.label}>
                    {s.day} · {s.label}
                  </li>
                ))}
              </ul>
              <ul className="mt-3">
                <li>
                  <a
                    href={c.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <InstagramIcon className="size-4" />
                    {c.instagram.handle}
                  </a>
                </li>
                {c.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-cream/15">
        <p className="wrap py-6 text-sm text-on-navy">
          © {new Date().getFullYear()} Conexión Vida. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
