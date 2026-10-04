"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { campuses } from "@/data/campuses";
import { navLinks } from "@/data/site";
import type { CampusId } from "@/data/types";
import { useApp } from "./AppProvider";
import { Wordmark } from "./Wordmark";

const selectClass =
  "min-h-11 w-full rounded-ui border border-cream/30 bg-navy px-3 text-base text-cream xl:w-auto";

function CampusSelect({ id }: { id: string }) {
  const { campus, setCampus } = useApp();
  return (
    <>
      <label htmlFor={id} className="sr-only">
        Campus
      </label>
      <select
        id={id}
        value={campus}
        onChange={(e) => setCampus(e.target.value as CampusId)}
        className={selectClass}
      >
        {campuses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.shortName}
          </option>
        ))}
      </select>
    </>
  );
}

export function Navbar() {
  const { openVisit } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Resalta el enlace de la sección que está en pantalla.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      data-tone="dark"
      className="sticky top-0 z-50 -mb-16 border-b border-cream/15 bg-navy text-cream"
    >
      <nav
        className="wrap flex h-16 items-center justify-between gap-4"
        aria-label="Principal"
      >
        <a href="#inicio" aria-label="Conexión Vida, ir al inicio" className="whitespace-nowrap">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "location" : undefined}
                className={`inline-flex min-h-11 items-center border-b-2 px-2 text-[0.95rem] whitespace-nowrap hover:text-cream ${
                  active === l.href
                    ? "border-green text-cream"
                    : "border-transparent text-cream/85"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 xl:flex">
          <CampusSelect id="nav-campus" />
          <button type="button" onClick={() => openVisit()} className="btn btn-green whitespace-nowrap">
            Planear mi visita
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex size-11 items-center justify-center rounded-ui hover:bg-cream/10 xl:hidden"
        >
          {menuOpen ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </nav>
      <div
        aria-hidden="true"
        className="read-progress absolute inset-x-0 bottom-0 h-0.5 bg-green"
      />

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-cream/15 xl:hidden">
          <div className="wrap max-h-[calc(100svh-4rem)] overflow-y-auto py-4">
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-12 items-center text-lg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3">
              <CampusSelect id="nav-campus-mobile" />
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openVisit();
                }}
                className="btn btn-green"
              >
                Planear mi visita
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
