"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { giving } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

const formatClabe = (c: string) => c.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

/**
 * OCULTA en page.tsx. Los datos de `giving` son de ejemplo, no reales.
 * Mostrar solo si la iglesia lo confirma (PENDIENTES §8).
 */
export function GivingSection() {
  const [copied, setCopied] = useState(false);
  const { bankTransfer, online } = giving;

  async function copyClabe() {
    try {
      await navigator.clipboard.writeText(bankTransfer.clabe);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles: la CLABE sigue visible para copiar a mano.
    }
  }

  return (
    <section id="generosidad" className="section-y bg-cream">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading title="Generosidad" lead="Diezmar, ofrendar, donar." />
        </div>

        <div className="lg:col-span-7">
          <dl className="space-y-5">
            <div>
              <dt className="text-sm font-semibold text-muted">CLABE interbancaria</dt>
              <dd className="mt-1 flex flex-wrap items-center justify-between gap-3 rounded-ui border border-line bg-paper p-4">
                <span className="text-xl font-semibold tabular-nums">
                  {formatClabe(bankTransfer.clabe)}
                </span>
                <button type="button" onClick={copyClabe} className="btn btn-navy">
                  {copied ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                  {copied ? "Copiada" : "Copiar"}
                </button>
              </dd>
              <span role="status" className="sr-only">
                {copied ? "CLABE copiada al portapapeles" : ""}
              </span>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Banco</dt>
              <dd className="mt-1">{bankTransfer.bank}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Beneficiario</dt>
              <dd className="mt-1">{bankTransfer.accountHolder}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Concepto</dt>
              <dd className="mt-1">{bankTransfer.concept}</dd>
            </div>
          </dl>

          {online.url && (
            <a
              href={online.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-navy mt-8"
            >
              Dar en línea
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
