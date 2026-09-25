"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { campuses } from "@/data/campuses";
import { navLinks } from "@/data/site";
import type { CampusId } from "@/data/types";
import { useApp } from "./AppProvider";
import { Wordmark } from "./Wordmark";

const selectClass =
  "min-h-11 w-full rounded-ui border border-cream/30 bg-navy px-3 text-base text-cream lg:w-auto";

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
        <a href="#inicio" aria-label="Conexión Vida, ir al inicio">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-11 items-center px-3 text-cream/85 hover:text-cream"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <CampusSelect id="nav-campus" />
          <button type="button" onClick={() => openVisit()} className="btn btn-green">
            Planear mi visita
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex size-11 items-center justify-center rounded-ui hover:bg-cream/10 lg:hidden"
        >
          {menuOpen ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-cream/15 lg:hidden">
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
