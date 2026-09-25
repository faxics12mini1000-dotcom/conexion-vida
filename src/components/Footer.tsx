import { campuses } from "@/data/campuses";
import { navLinks, siteConfig, whatsappUrl } from "@/data/site";
import { InstagramIcon } from "./icons";
import { Wordmark } from "./Wordmark";

const linkClass = "inline-flex min-h-11 items-center gap-2 underline underline-offset-4";

const footerLinks = [...navLinks, { label: "Generosidad", href: "#generosidad" }];

/**
 * WhatsApp sale de NEXT_PUBLIC_WHATSAPP_NUMBER; sin número muestra un aviso
 * amable en lugar de un enlace roto.
 * TODO(PENDIENTES §9): número real, correo y aviso de privacidad (solo si
 * algún día se recogen datos personales en un formulario).
 */
export function Footer() {
  return (
    <footer id="contacto" aria-labelledby="contacto-title" data-tone="dark" className="bg-navy text-cream">
      <div className="wrap section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark className="text-2xl" />
          <h2 id="contacto-title" className="mt-8 text-3xl sm:text-4xl">
            Contacto
          </h2>
          <p className="mt-3 text-lg text-on-navy">
            ¿Tienes una duda o quieres dar el siguiente paso? Escríbenos.
          </p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-green mt-6"
            >
              Escribir por WhatsApp
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          ) : (
            <p className="mt-6 border-l-2 border-green pl-4 text-on-navy">
              Muy pronto tendremos un número de WhatsApp. Mientras tanto, escríbenos
              por mensaje directo en Instagram.
            </p>
          )}

          {siteConfig.contactEmail && (
            <p className="mt-4">
              <a href={`mailto:${siteConfig.contactEmail}`} className={linkClass}>
                {siteConfig.contactEmail}
              </a>
            </p>
          )}

          <nav aria-label="Secciones del sitio" className="mt-8">
            <ul className="flex flex-wrap gap-x-4">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-cream/85 hover:text-cream"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-sm font-semibold text-green">Reuniones dominicales</h3>
          <div className="mt-4 grid gap-10 sm:grid-cols-2">
            {campuses.map((c) => (
              <div key={c.id}>
                <h4 className="text-2xl">{c.name}</h4>
                <p className="mt-1 text-on-navy">{c.city}</p>
                <ul className="mt-3 text-lg">
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
                      <span className="sr-only"> (se abre en otra pestaña)</span>
                    </a>
                  </li>
                  {c.links.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {l.label}
                        <span className="sr-only"> (se abre en otra pestaña)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="wrap flex flex-col gap-1 py-6 text-sm text-on-navy sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Conexión Vida. Todos los derechos reservados.</p>
          <p>El nombre y los logos de Conexión Vida pertenecen a la iglesia.</p>
        </div>
      </div>
    </footer>
  );
}
