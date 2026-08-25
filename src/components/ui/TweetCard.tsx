import React from "react";
import Image from "next/image";
import type { TweetPost } from "@/types";

export interface TweetCardProps {
  tweet: TweetPost;
  className?: string;
}

export default function TweetCard({ tweet, className = "" }: TweetCardProps): React.JSX.Element {
  return (
    <article
      className={`flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#09090b] p-4 text-zinc-100 shadow-md transition hover:border-zinc-700 sm:p-5 ${className}`.trim()}
    >
      <div>
        {/* Cabecera del Tweet */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-700">
              <Image
                src={tweet.authorAvatar ?? "/presentadora.png"}
                alt={tweet.authorName}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 leading-tight">
                <span className="font-bold text-white hover:underline">
                  {tweet.authorName}
                </span>
                {tweet.isVerified && (
                  <svg className="h-4 w-4 fill-sky-400" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
                <span className="text-sm text-zinc-400">@{tweet.authorHandle}</span>
                <span className="text-sm text-zinc-500">· {tweet.timeAgo}</span>
              </div>
            </div>
          </div>

          {/* Icono de X */}
          <div className="text-zinc-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        </div>

        {/* Texto del Tweet */}
        <div className="mt-3 text-sm leading-relaxed text-zinc-200 whitespace-pre-line sm:text-[15px]">
          {tweet.text}
        </div>

        {/* Hashtags */}
        {tweet.hashtags && tweet.hashtags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 text-sm font-medium text-sky-400">
            {tweet.hashtags.map((tag) => (
              <span key={tag} className="hover:underline cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Tweet Citado (Nested Quoted Tweet) */}
        {tweet.quote && (
          <div className="mt-3.5 overflow-hidden rounded-xl border border-zinc-800 bg-[#121215] p-3.5 transition hover:bg-[#16161a]">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-[10px] font-black text-white">
                AP
              </div>
              <span className="text-sm font-bold text-white">
                {tweet.quote.authorName}
              </span>
              <svg className="h-3.5 w-3.5 fill-sky-400" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-xs text-zinc-400">
                @{tweet.quote.authorHandle}
              </span>
            </div>

            {tweet.quote.translatedText && (
              <p className="mt-1 text-[11px] text-zinc-400">
                {tweet.quote.translatedText}
              </p>
            )}

            <p className="mt-2 text-xs leading-relaxed text-zinc-300 whitespace-pre-line sm:text-sm">
              {tweet.quote.text}
            </p>

            {tweet.quote.courtDetails && (
              <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-2">
                <span>{tweet.quote.courtDetails}</span>
                <span>{tweet.quote.timestamp}</span>
              </div>
            )}
          </div>
        )}

        {/* Video / Multimedia Embebida de Transmisión Split-Screen */}
        {tweet.media && tweet.media.type === "video" && (
          <div className="relative mt-3.5 overflow-hidden rounded-xl border border-zinc-800 bg-black aspect-[16/9] shadow-lg">
            {/* Split Screen Video Layout */}
            <div className="grid h-full w-full grid-cols-2">
              {/* Lado Izquierdo: Presentadora Jessica Vallenilla */}
              <div className="relative h-full w-full bg-[#180407] border-r border-red-900/60 overflow-hidden">
                <Image
                  src="/presentadora.png"
                  alt="Jessica Vallenilla"
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
                  className="object-cover object-top scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-0.5 border border-red-800/60">
                  <p className="text-[9px] font-black uppercase text-white">
                    {tweet.media.presenterName ?? "JESSICA VALLENILLA"}
                  </p>
                  <p className="text-[7px] font-medium uppercase text-red-400">
                    EN LA MIRA
                  </p>
                </div>
              </div>

              {/* Lado Derecho: Entrevistado / Familiar */}
              <div className="relative h-full w-full bg-[#0d0d12] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                  alt="Invitada Entrevista"
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 border border-zinc-700 text-right">
                  <p className="text-[9px] font-black uppercase text-white">
                    {tweet.media.guestName ?? "EILYN RIVERO"}
                  </p>
                  <p className="text-[7px] font-medium uppercase text-zinc-300">
                    {tweet.media.guestTitle ?? "FAMILIAR PRESO POLÍTICO"}
                  </p>
                </div>
              </div>
            </div>

            {/* Código QR y Logo en Esquina Superior Derecha */}
            {tweet.media.hasQrCode && (
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/80 p-1 border border-zinc-700/80">
                <div className="h-6 w-6 rounded bg-white p-0.5">
                  {/* Patrón SVG simulado de QR */}
                  <svg className="h-full w-full fill-black" viewBox="0 0 24 24">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm4-4h4v-4h-4v4zm-4-4h4v4h-4v-4z" />
                  </svg>
                </div>
                <div className="flex flex-col text-[7px] font-bold leading-tight text-white pr-1">
                  <span className="text-red-500">LA KATUAR</span>
                  <span>ESCÁNEA</span>
                </div>
              </div>
            )}

            {/* Cintillo Central / Lower Third */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-red-950 via-red-900 to-black px-3 py-1 flex items-center justify-between border-t border-red-700/60">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black tracking-wide text-white uppercase">
                  EN LA MIRA ... con La Katuar
                </span>
              </div>
            </div>

            {/* Duración del Video */}
            {tweet.media.duration && (
              <div className="absolute bottom-6 left-2 flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                <svg className="h-2.5 w-2.5 fill-white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {tweet.media.duration}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Barra Inferior de Métricas e Interacción de X */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3 text-xs text-zinc-400 sm:text-sm">
        {/* Respuestas */}
        <button
          type="button"
          aria-label="Responder"
          className="flex items-center gap-1.5 transition hover:text-sky-400"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.25c-4.42 0-8-3.58-8-8.01z" />
          </svg>
          <span>{tweet.stats.replies}</span>
        </button>

        {/* Reposts */}
        <button
          type="button"
          aria-label="Repostear"
          className="flex items-center gap-1.5 transition hover:text-green-400"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.9 2 2 2H12v2H7.5c-2.21 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 20.12l-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.9-2-2-2H12V4h4.5c2.21 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14z" />
          </svg>
          <span>{tweet.stats.reposts}</span>
        </button>

        {/* Likes */}
        <button
          type="button"
          aria-label="Me gusta"
          className="flex items-center gap-1.5 transition hover:text-pink-500"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{tweet.stats.likes}</span>
        </button>

        {/* Vistas */}
        <div className="flex items-center gap-1.5 text-zinc-500">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
          </svg>
          <span>{tweet.stats.views}</span>
        </div>

        {/* Marcador y Compartir */}
        <div className="flex items-center gap-3 text-zinc-400">
          <button
            type="button"
            aria-label="Guardar"
            className="transition hover:text-sky-400"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v17.26l-8-4.78-8 4.78V4.5z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Compartir"
            className="transition hover:text-sky-400"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21.01 3 19.9 3 18.51V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5V15h2.02z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
