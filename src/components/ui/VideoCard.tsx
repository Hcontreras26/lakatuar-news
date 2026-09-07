import React from "react";
import Image from "next/image";
import type { VideoItem } from "@/types";

export interface VideoCardProps {
  item: VideoItem;
  className?: string;
}

export default function VideoCard({ item, className = "" }: VideoCardProps): React.JSX.Element {
  const cardContent = (
    <article
      className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border border-red-950/40 bg-zinc-950 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-600/40 hover:shadow-2xl hover:shadow-red-950/20 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 ${className}`.trim()}
    >
      {/* Contenedor Multimedia con hardware-clipping unificado */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 [transform:translateZ(0)]">
        <Image
          src={item.thumb}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
        />

        {/* Gradiente de integración */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75"
          aria-hidden="true"
        />

        {/* Botón de reproducción: visible únicamente al hacer hover */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/95 text-white shadow-2xl shadow-red-950/70 backdrop-blur-md transition-all duration-300 ease-out scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:bg-red-600 group-hover:shadow-red-600/40 group-hover:ring-white/40">
            <svg
              className="ml-0.5 h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 24 24"
            >
              <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          </div>
        </div>

        {/* Barra inferior sobre el video: Cintillo a la izquierda y Duración a la derecha */}
        <div className="pointer-events-none absolute inset-x-3 bottom-2.5 z-10 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-black/60 px-1 py-0.5 backdrop-blur-md">
            <span className="rounded bg-red-600 px-1 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
              {item.tag || "EN LA MIRA"}
            </span>
            <span className="text-[12px] font-medium text-zinc-200">
              con La Katuar
            </span>
          </div>

          {item.duration && (
            <span className="inline-flex shrink-0 items-center rounded-md border border-white/10 bg-black/70 px-2 py-0.5 text-[11px] font-semibold tabular-nums tracking-wide text-zinc-200 backdrop-blur-md">
              {item.duration}
            </span>
          )}
        </div>
      </div>

      {/* Bloque de Información: 'relative z-10' garantiza que el fondo tape la fisura física */}
      <div className="relative z-10 -mt-px flex flex-1 flex-col justify-between bg-zinc-950 p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-zinc-100 transition-colors duration-200 group-hover:text-red-400">
          {item.title}
        </h3>
      </div>

      {/* Anillo perimetral global */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl ring-1 ring-inset ring-white/[0.05]"
        aria-hidden="true"
      />
    </article>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block cursor-pointer focus:outline-none"
        aria-label={item.title}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}