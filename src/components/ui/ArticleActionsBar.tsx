"use client";

import React, { useState } from "react";

export interface ArticleActionsBarProps {
  title: string;
  url?: string;
  summary?: string;
  points?: string[];
}

export default function ArticleActionsBar({
  title,
  url,
  summary,
  points = [
    "Acuerdo energético de gran envergadura entre EE. UU. y el gobierno interino.",
    "Control mayoritario de más de 65.000 millones de barriles de reservas probadas.",
    "Alianza estratégica con el sector privado y supervisión internacional.",
    "Impacto geopolítico directo en el mercado de hidrocarburos de la región.",
  ],
}: ArticleActionsBarProps): React.JSX.Element {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeModal, setActiveModal] = useState<"points" | "summary" | null>(null);
  const [copied, setCopied] = useState(false);

  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "https://lakatuar.com");

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const toggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  return (
    <>
      {/* Botones de Acción Editorial (Escuchar, Puntos clave, Resumen) estilo Contacto */}
      <div className="flex flex-wrap items-center gap-2 py-3 border-y border-zinc-800 bg-zinc-950/60 px-3 rounded-lg">
        {/* Botón Escuchar */}
        <button
          type="button"
          onClick={toggleAudio}
          className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
            isPlayingAudio
              ? "bg-red-600 text-white shadow-lg shadow-red-600/30 animate-pulse"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
          aria-label={isPlayingAudio ? "Pausar audio de la nota" : "Escuchar nota"}
        >
          {isPlayingAudio ? (
            <>
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <span>Reproduciendo audio...</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              <span>Escuchar nota</span>
            </>
          )}
        </button>

        {/* Botón Puntos clave */}
        <button
          type="button"
          onClick={() => setActiveModal(activeModal === "points" ? null : "points")}
          className="inline-flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
        >
          <span className="text-yellow-500">⚡</span>
          <span>Puntos clave</span>
        </button>

        {/* Botón Resumen */}
        <button
          type="button"
          onClick={() => setActiveModal(activeModal === "summary" ? null : "summary")}
          className="inline-flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
        >
          <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Resumen</span>
        </button>
      </div>

      {/* Acordeón / Desplegable de Puntos Clave */}
      {activeModal === "points" && (
        <div className="mt-3 rounded-lg border border-zinc-700 bg-zinc-950 p-4 text-zinc-200 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
                ⚡
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Puntos Clave del Reporte
              </h4>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="text-xs text-zinc-400 hover:text-white px-1"
            >
              ✕
            </button>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
            {points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Acordeón / Desplegable de Resumen */}
      {activeModal === "summary" && (
        <div className="mt-3 rounded-lg border border-zinc-700 bg-zinc-950 p-4 text-zinc-200 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600/20 text-red-400 text-xs font-bold">
                📝
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Resumen Ejecutivo
              </h4>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="text-xs text-zinc-400 hover:text-white px-1"
            >
              ✕
            </button>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
            {summary ||
              "Análisis exhaustivo sobre los acontecimientos más recientes y su impacto estratégico en el panorama político y económico internacional."}
          </p>
        </div>
      )}

      {/* Barra de Compartir con Redes Sociales y Copiar Enlace estilo Contacto */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-400">Compartir:</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${currentUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en WhatsApp"
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M19.1 4.9A9.8 9.8 0 0 0 12 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.8 5-1.3A9.9 9.9 0 1 0 19.1 4.9Zm-5.5 14.1c-1.3 0-2.6-.4-3.8-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.4-6.1c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1-.1.2-.5.6-.6.7-.1.1-.3.1-.5 0s-1-.4-2-1.2c-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.2-.2.3-.4.1-.1.1-.3 0-.4-.1-.1-.5-1.2-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.1 0-.3.1-.5.2s-.6.6-.6 1.5c0 .8.7 1.7.8 1.8.1.1 1.5 2.3 3.6 3.2.5.2.9.3 1.2.4.5.1.9.1 1.2.1.4 0 1.1-.4 1.3-.9.2-.5.2-.9.1-1Z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en Facebook"
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-blue-500 hover:bg-blue-600 hover:text-white"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M13.5 22v-8h2.6l.4-3h-3V7.2c0-.9.3-1.6 1.7-1.6H17V2.8c-.3 0-1.4-.1-2.6-.1-2.5 0-4.2 1.5-4.2 4.4V11H8v3h2.2v8h3.3Z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en X"
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-blue-400 hover:bg-blue-700 hover:text-white"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en Telegram"
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-sky-400 hover:bg-sky-600 hover:text-white"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.937z" />
            </svg>
          </a>

          {/* Copiar enlace */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copiar enlace"
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            {copied ? (
              <span className="text-emerald-400 text-xs font-bold">✓</span>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Toast flotante cuando se copia */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-2xl animate-bounce">
          ✓ Enlace copiado al portapapeles
        </div>
      )}
    </>
  );
}
