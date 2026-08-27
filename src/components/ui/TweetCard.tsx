import React from "react";
import Image from "next/image";
import type { Tweet, TwitterUser } from "@/types/twitter";

export interface TweetCardProps {
  tweet: Tweet;
  user?: TwitterUser;
  className?: string;
}

export default function TweetCard({
  tweet,
  user = {
    id: "la_katuar_id",
    name: "Jessica Vallenilla",
    username: "la_katuar",
    profile_image_url: "/presentadora.png",
    verified: true,
  },
  className = "",
}: TweetCardProps): React.JSX.Element {
  const tweetUrl = `https://x.com/${user.username}/status/${tweet.id}`;
  const firstMedia = tweet.media?.[0];

  return (
    <article
      className={`flex flex-col justify-between w-full h-full rounded-2xl border border-zinc-800/80 bg-black p-5 text-zinc-100 shadow-xl transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl ${className}`.trim()}
    >
      <div>
        {/* Cabecera del Tweet */}
        <div className="flex items-start justify-between gap-3">
          <a
            href={`https://x.com/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-700">
              <Image
                src={user.profile_image_url || "/presentadora.png"}
                alt={user.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 leading-tight">
                <span className="font-bold text-white group-hover:underline">
                  {user.name}
                </span>
                {user.verified && (
                  <svg className="h-4 w-4 fill-sky-400" viewBox="0 0 24 24" aria-label="Verificado">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                <span>@{user.username}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">Reciente</span>
              </div>
            </div>
          </a>

          {/* Icono de X */}
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver en X"
            className="text-zinc-400 transition hover:text-white"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Texto del Tweet */}
        <div className="mt-3.5 text-sm leading-relaxed text-zinc-200 whitespace-pre-line sm:text-[15px]">
          {tweet.text}
        </div>

        {/* Multimedia: Foto */}
        {firstMedia && (firstMedia.type === "photo" || firstMedia.url) && (
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/media relative mt-3.5 block aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
          >
            <Image
              src={firstMedia.url || firstMedia.preview_image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80"}
              alt="Foto del tweet"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-transform duration-500 group-hover/media:scale-[1.02]"
            />
          </a>
        )}

        {/* Multimedia: Video / Animación */}
        {firstMedia && (firstMedia.type === "video" || firstMedia.type === "animated_gif") && (
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/media relative mt-3.5 block aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg"
          >
            {firstMedia.preview_image_url ? (
              <Image
                src={firstMedia.preview_image_url}
                alt="Miniatura de video"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-500 group-hover/media:scale-[1.02]"
              />
            ) : (
              <div className="h-full w-full bg-zinc-900" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Botón de Play Centrado */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-2xl transition-transform duration-300 group-hover/media:scale-110">
                <svg className="ml-1 h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        )}
      </div>

      {/* Barra Inferior de Métricas e Interacción de X */}
      <div className="mt-5 flex items-center justify-between border-t border-zinc-800/80 pt-3.5 text-xs text-zinc-400 sm:text-sm">
        {/* Respuestas */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Responder en X"
          className="flex items-center gap-1.5 transition hover:text-sky-400"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.25c-4.42 0-8-3.58-8-8.01z" />
          </svg>
          <span>{tweet.public_metrics?.reply_count ?? 0}</span>
        </a>

        {/* Reposts */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Repostear en X"
          className="flex items-center gap-1.5 transition hover:text-green-400"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.9 2 2 2H12v2H7.5c-2.21 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 20.12l-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.9-2-2-2H12V4h4.5c2.21 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14z" />
          </svg>
          <span>{tweet.public_metrics?.retweet_count ?? 0}</span>
        </a>

        {/* Likes */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Me gusta en X"
          className="flex items-center gap-1.5 transition hover:text-pink-500"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{tweet.public_metrics?.like_count ?? 0}</span>
        </a>

        {/* Vistas / Impresiones */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vistas en X"
          className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
          </svg>
          <span>{tweet.public_metrics?.impression_count ?? "—"}</span>
        </a>

        {/* Enlace directo a X */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-[11px] font-bold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          Ver en X →
        </a>
      </div>
    </article>
  );
}
