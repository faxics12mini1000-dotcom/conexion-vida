"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { giving } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

const formatClabe = (c: string) => c.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-muted">{label}</dt>
      <dd className={value ? "mt-1" : "mt-1 text-muted"}>{value ?? "Por confirmar"}</dd>
    </div>
  );
}

/**
 * Los datos bancarios viven en `giving` (src/data/site.ts). Mientras la
 * CLABE sea `null` el botón de copiar queda deshabilitado (PENDIENTES §8).
 */
export function GivingSection() {
  const [copied, setCopied] = useState(false);
  const { bankTransfer, online } = giving;
  const { clabe } = bankTransfer;

  async function copyClabe() {
    if (!clabe) return;
    try {
      await navigator.clipboard.writeText(clabe);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles: la CLABE sigue visible para copiar a mano.
    }
  }

  return (
    <section
      id="generosidad"
      aria-labelledby="generosidad-title"
      className="section-y bg-cream"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="generosidad-title" title="Generosidad" />
          <p className="mt-6 text-lg text-muted">
            Creemos que dar es una respuesta agradecida a lo que Dios ya hizo por
            nosotros, no una obligación. La Biblia lo dice así: cada uno debe dar
            según lo que haya decidido en su corazón, no de mala gana ni por
            presión (2 Corintios 9:7, parafraseado).
          </p>
          <p className="mt-6 border-l-2 border-green-deep pl-4 text-lg font-semibold">
            Si nos visitas por primera vez, no hay ninguna expectativa económica
            para ti. Esto es solo para quien quiera hacerlo.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-ui border border-line bg-paper p-5 sm:p-8">
            <h3 className="text-2xl">Transferencia bancaria</h3>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm font-semibold text-muted">CLABE interbancaria</dt>
                <dd className="mt-1 flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={
                      clabe
                        ? "text-xl font-semibold tabular-nums"
                        : "text-xl text-muted"
                    }
                  >
                    {clabe ? formatClabe(clabe) : "Por confirmar"}
                  </span>
                  <button
                    type="button"
                    onClick={copyClabe}
                    disabled={!clabe}
                    className="btn btn-navy disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {copied ? (
                      <Check className="size-4" aria-hidden="true" />
                    ) : (
                      <Copy className="size-4" aria-hidden="true" />
                    )}
                    {copied ? "Copiada" : "Copiar CLABE"}
                  </button>
                </dd>
                <span role="status" className="sr-only">
                  {copied ? "CLABE copiada al portapapeles" : ""}
                </span>
              </div>
              <Field label="Banco" value={bankTransfer.bank} />
              <Field label="Beneficiario" value={bankTransfer.accountHolder} />
              <Field label="Concepto" value={bankTransfer.concept} />
            </dl>

            {!clabe && (
              <p className="mt-6 text-muted">
                Publicaremos aquí los datos oficiales de la cuenta de la iglesia en
                cuanto estén confirmados.
              </p>
            )}

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
      </div>
    </section>
  );
}
