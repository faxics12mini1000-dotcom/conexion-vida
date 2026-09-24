"use client";

import { Check, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { campuses } from "@/data/campuses";
import { navLinks, siteConfig } from "@/data/site";
import { accent } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { useApp, type ContactTopic } from "./AppProvider";
import { InstagramIcon } from "./icons";
import { Logo } from "./Logo";

const topics: { id: ContactTopic; label: string; subject: string }[] = [
  { id: "oracion", label: "Petición de oración", subject: "Petición de oración" },
  { id: "grupo", label: "Quiero unirme a un grupo", subject: "Quiero unirme a un grupo" },
  { id: "bautismo", label: "Quiero bautizarme", subject: "Quiero bautizarme" },
  { id: "servir", label: "Quiero servir / liderar", subject: "Quiero servir o liderar" },
  { id: "info", label: "Recibir novedades", subject: "Suscripción a novedades" },
];

const fieldClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/40 focus:outline-none";

function ContactForm() {
  const { contactTopic, setContactTopic } = useApp();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const topic = topics.find((t) => t.id === contactTopic) ?? topics[0];
    const body = [
      `Nombre: ${name}`,
      `Contacto: ${contact}`,
      "",
      message,
    ].join("\n");
    // MVP sin backend: abre el correo del visitante con el mensaje prellenado.
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
      `${topic.subject} — ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center rounded-3xl border border-white/15 bg-white/5 p-8"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cv-celaya text-white">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="mt-4 text-xl font-semibold text-white">¡Gracias, {name.split(" ")[0]}!</p>
        <p className="mt-1 text-slate-300">
          Se abrió tu correo con el mensaje listo. Envíalo y nuestro equipo te
          responderá pronto.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-sky-300 hover:text-sky-200"
        >
          Escribir otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label htmlFor="contact-topic" className="sr-only">
          Tema
        </label>
        <select
          id="contact-topic"
          value={contactTopic}
          onChange={(e) => setContactTopic(e.target.value as ContactTopic)}
          className={cn(fieldClass, "appearance-none")}
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id} className="text-cv-navy">
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Nombre
          </label>
          <input
            id="contact-name"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-info" className="sr-only">
            Correo o teléfono
          </label>
          <input
            id="contact-info"
            required
            autoComplete="email"
            placeholder="Correo o WhatsApp"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Cuéntanos cómo podemos orar por ti o en qué te ayudamos…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(fieldClass, "resize-none")}
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cv-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-cv-navy focus-visible:outline-none"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Enviar
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="bg-cv-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              ¿Necesitas oración? Escríbenos
            </h2>
            <p className="mt-2 max-w-md text-slate-400">
              Estamos para acompañarte. También puedes usar este formulario para
              unirte a un grupo o recibir novedades.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:pl-8">
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-white uppercase">
                Nuestras sedes
              </h3>
              <ul className="mt-5 space-y-6">
                {campuses.map((c) => (
                  <li key={c.id}>
                    <p className="flex items-center gap-2 font-semibold text-white">
                      <span
                        className={cn("h-2 w-2 rounded-full", accent[c.id].dot)}
                        aria-hidden="true"
                      />
                      {c.name}
                    </p>
                    <p className="mt-1 text-sm">
                      {c.services.map((s) => `${s.day} ${s.label}`).join(" · ")}
                    </p>
                    <a
                      href={c.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                    >
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      Cómo llegar
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-widest text-white uppercase">
                Accesos rápidos
              </h3>
              <ul className="mt-5 space-y-2.5 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#generosidad" className="transition hover:text-white">
                    Generosidad
                  </a>
                </li>
                <li>
                  <a href="#grupos" className="transition hover:text-white">
                    Grupos pequeños
                  </a>
                </li>
              </ul>

              <h3 className="mt-8 text-sm font-semibold tracking-widest text-white uppercase">
                Síguenos
              </h3>
              <ul className="mt-4 space-y-2.5">
                {campuses.map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm transition hover:text-white"
                    >
                      <InstagramIcon className="h-4 w-4" />
                      {c.instagram.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <Logo tone="light" />
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <Mail className="h-4 w-4" aria-hidden="true" />© {new Date().getFullYear()}{" "}
            Conexión Vida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
