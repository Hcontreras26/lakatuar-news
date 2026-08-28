import React from "react";
import Image from "next/image";
import type { NormalizedInstagramPost, InstagramPost } from "@/types";

export interface InstagramCardProps {
  post: NormalizedInstagramPost | InstagramPost;
  className?: string;
}

export default function InstagramCard({
  post,
  className = "",
}: InstagramCardProps): React.JSX.Element {
  const isCarousel =
    post.isCarousel || post.mediaType === "CAROUSEL_ALBUM";
  const isVideo = post.mediaType === "VIDEO";
  const postUrl = post.permalink || post.postUrl || "https://instagram.com/la_katuar";
  const imageSource =
    post.thumbnailUrl ||
    post.mediaUrl ||
    post.imageUrl ||
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";

  return (
    <article
      className={`group relative flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0d0d0d] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] ${className}`.trim()}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950">
        {isVideo && post.mediaUrl ? (
          <div className="relative h-full w-full">
            <video
              src={post.mediaUrl}
              poster={post.thumbnailUrl || undefined}
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute right-3 top-3 z-10 rounded-md bg-black/70 p-1.5 text-white backdrop-blur-sm shadow">
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-label="Video">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ) : (
          <>
            <Image
              src={imageSource}
              alt={post.headline || "Publicación de Instagram"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
            />

            {isCarousel && (
              <div className="absolute right-3 top-3 z-10 rounded-md bg-black/70 p-1.5 text-white backdrop-blur-sm shadow">
                <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-label="Carrusel">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                </svg>
              </div>
            )}
          </>
        )}

        {/* Gradiente de fondo para contraste */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

        {/* Tag Superior */}
        <div className="absolute left-3.5 top-3.5 z-10">
          <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
            {post.tag || "#LAKATUARNEWS"}
          </span>
        </div>

        {/* Contenido Inferior de la Tarjeta */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4">
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2.5 block rounded bg-white/95 p-2.5 shadow-lg backdrop-blur-sm transition hover:bg-white"
          >
            <h3 className="line-clamp-2 text-sm font-black uppercase leading-tight tracking-tight text-zinc-950 sm:text-base">
              {post.headline}
            </h3>
          </a>

          <div className="flex items-center justify-between rounded border border-red-900/40 bg-gradient-to-r from-zinc-950 via-[#2a0407] to-zinc-950 px-2.5 py-1.5">
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-red-600 px-1 py-0.5 text-[8px] font-black uppercase text-white">
                EN LA
              </span>
              <span className="text-xs font-black uppercase tracking-wide text-white">
                MIRA
              </span>
              <span className="text-[10px] font-medium text-zinc-300">
                ... con La Katuar
              </span>
            </div>

            {Boolean(post.likes || ("likeCount" in post && post.likeCount)) && (
              <span className="text-[10px] font-semibold text-zinc-400">
                ❤️ {post.likes || ("likeCount" in post ? post.likeCount : "")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Barra Inferior del Autor */}
      <div className="flex items-center justify-between border-t border-zinc-800 bg-[#0c0c0c] px-3.5 py-2.5 text-white">
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full border border-red-500">
            <Image
              src={post.authorAvatar || "/presentadora.png"}
              alt={post.authorUsername}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-zinc-200">
              @{post.authorUsername}
            </span>
            <svg
              className="h-3 w-3 fill-sky-400"
              viewBox="0 0 24 24"
              aria-label="Verificado"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="text-[10px] text-zinc-400">· {post.timeAgo}</span>
          </div>
        </div>

        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver en Instagram"
          className="text-zinc-400 transition-colors hover:text-pink-500"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </div>
    </article>
  );
}