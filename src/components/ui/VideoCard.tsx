import React from "react";
import Image from "next/image";
import type { VideoItem } from "@/types";

export interface VideoCardProps {
  item: VideoItem;
  className?: string;
}

export default function VideoCard({ item, className = "" }: VideoCardProps): React.JSX.Element {
  const content = (
    <>
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <Image
          src={item.thumb}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradiente oscuro sobre el video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Badge superior con duración o fecha */}
        {item.duration && (
          <span className="absolute right-3 top-3 z-10 rounded bg-black/80 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm border border-red-950">
            {item.duration}
          </span>
        )}

        {/* Badge de Categoría/Programa en esquina superior izquierda */}
        {item.tag && (
          <span className="absolute left-3 top-3 z-10 rounded bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-sm">
            {item.tag}
          </span>
        )}

        {/* Botón de reproducción flotante al hacer hover */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl scale-90 transition-transform group-hover:scale-100">
            <svg className="ml-1 h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Cintillo En La Mira en la parte inferior de la imagen */}
        <div className="absolute inset-x-0 -bottom-px z-10 bg-gradient-to-r from-[#290204] via-black to-[#290204] px-3 py-1 border-t border-red-900/40">
          <div className="flex items-center gap-1.5">
            <span className="rounded bg-red-600 px-1 py-0.5 text-[7px] font-black uppercase text-white">
              EN LA
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-white">
              MIRA
            </span>
            <span className="text-[8px] font-medium text-zinc-400">
              ... con La Katuar
            </span>
          </div>
        </div>
      </div>

      {/* Título del Video */}
      <div className="relative -mt-px bg-[#150406] p-3.5">
        <h3 className="line-clamp-2 text-sm font-black uppercase leading-snug tracking-tight text-zinc-100 transition-colors group-hover:text-red-400">
          {item.title}
        </h3>
      </div>
    </>
  );

  if (item.url) {
    return (
      <article
        className={`group relative block overflow-hidden rounded-xl border border-red-900/30 bg-[#150406] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-xl ${className}`.trim()}
      >
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full w-full"
          aria-label={item.title}
        >
          {content}
        </a>
      </article>
    );
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-red-900/30 bg-[#150406] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-xl ${className}`.trim()}
    >
      {content}
    </article>
  );
}
