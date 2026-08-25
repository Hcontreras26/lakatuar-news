import React from "react";
import Link from "next/link";

export interface LegalSectionItem {
  id: string;
  title: string;
}

export interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  badge?: string;
  lastUpdated?: string;
  sections?: LegalSectionItem[];
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  badge = "DOCUMENTO LEGAL OFICIAL",
  lastUpdated = "Febrero 2026",
  sections = [],
  children,
}: LegalPageLayoutProps): React.JSX.Element {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="transition hover:text-red-400">
          Inicio
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-500">Legal</span>
        <span className="text-zinc-600">/</span>
        <span className="font-semibold text-red-400">{title}</span>
      </nav>

      {/* Hero Header del Documento */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-red-900/40 bg-gradient-to-r from-black via-[#1c0406] to-black p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-48 w-48 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
              {badge}
            </span>
            <span className="rounded border border-red-900/60 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
              Última actualización: {lastUpdated}
            </span>
            <span className="rounded border border-zinc-800 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-zinc-400">
              La Katuar, LLC
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Grid: Índice Lateral (si aplica) + Contenido */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Tabla de Contenidos / Navegación Rápida */}
        {sections.length > 0 && (
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-red-950 bg-[#160404]/70 p-5 backdrop-blur-sm">
              <h2 className="text-xs font-black uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Índice del Documento
              </h2>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {sections.map((sec, idx) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="group flex items-start gap-2 rounded px-2 py-1.5 transition hover:bg-red-950/60 hover:text-white"
                    >
                      <span className="font-mono text-[10px] text-red-500 font-bold">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span className="transition group-hover:underline">{sec.title}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-red-900/30 pt-4 text-xs text-zinc-400">
                <p className="font-semibold text-zinc-200">¿Dudas o consultas legales?</p>
                <p className="mt-1 text-[11px]">Escríbenos a nuestro canal directo:</p>
                <Link
                  href="/contacto"
                  className="mt-2 inline-flex items-center gap-1.5 font-bold text-red-400 transition hover:text-red-300 hover:underline"
                >
                  Canal de Contacto y Legal →
                </Link>
              </div>
            </div>
          </aside>
        )}

        {/* Contenido Legal Principal */}
        <div className={sections.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
          <div className="space-y-8 rounded-2xl border border-zinc-900 bg-[#140404]/60 p-6 sm:p-10 text-zinc-300 shadow-xl leading-relaxed text-sm">
            {children}
          </div>

          {/* Footer de navegación interna */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900 pt-6 text-xs text-zinc-400">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-red-900/60 bg-[#1b0606] px-4 py-2 font-bold text-zinc-200 transition hover:border-red-500 hover:text-white"
            >
              ← Volver al Portal de Noticias
            </Link>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-700 shadow-md shadow-red-950"
            >
              Contactar al Equipo Legal y Editorial →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
