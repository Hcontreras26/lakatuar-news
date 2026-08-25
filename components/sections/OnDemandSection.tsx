import React from "react";
import Image from "next/image";
import type { VideoItem } from "@/types";

export interface VideoCardProps {
  item: VideoItem;
  className?: string;
}

export interface OnDemandSectionProps {
  items?: VideoItem[];
  title?: string;
  className?: string;
}

const defaultVodItems: VideoItem[] = [
  {
    id: 1,
    title: "ALCALDESA DE MORÓN CÓMPLICE",
    duration: "23:10",
    thumb: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
    tag: "EN LA MIRA",
  },
  {
    id: 2,
    title: "CENA SECRETA EN CARACAS",
    duration: "28:40",
    thumb: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    tag: "EN LA MIRA",
  },
  {
    id: 3,
    title: "LO QUE COMPRÓ CON DINERO DE PDVSA",
    duration: "15:04",
    thumb: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    tag: "EN LA MIRA",
  },
  {
    id: 4,
    title: "PODER, CORRUPCIÓN Y JUSTICIA",
    duration: "42:15",
    thumb: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    tag: "SIN MÁSCARAS",
  },
  {
    id: 5,
    title: "UNA EXPLOSIÓN DE VERDADES",
    duration: "38:40",
    thumb: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    tag: "SIN MÁSCARAS",
  },
  {
    id: 6,
    title: "CENSURA, EXILIO Y MIEDO",
    duration: "50:10",
    thumb: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=800&q=80",
    tag: "SIN MÁSCARAS",
  },
];

export function VideoCard({ item, className = "" }: VideoCardProps): React.JSX.Element {
  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-red-900/60 bg-[#150406] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-xl ${className}`.trim()}
    >
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

        {/* Badge superior con duración */}
        <span className="absolute right-3 top-3 z-10 rounded bg-black/80 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm border border-red-950">
          {item.duration}
        </span>

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
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-r from-[#290204] via-black to-[#290204] px-3 py-1 border-t border-red-900/40">
          <div className="flex items-center gap-1.5">
            <span className="rounded bg-red-600 px-1 py-0.2 text-[7px] font-black uppercase text-white">
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
      <div className="p-3.5">
        <h3 className="text-sm font-black uppercase leading-snug tracking-tight text-zinc-100 group-hover:text-red-400 transition-colors">
          {item.title}
        </h3>
      </div>
    </article>
  );
}

export default function OnDemandSection({
  items = defaultVodItems,
  title = "ON Demand",
  className = "",
}: OnDemandSectionProps): React.JSX.Element {
  return (
    <section
      id="vod"
      aria-label="Videos bajo demanda"
      className={`relative overflow-hidden bg-gradient-to-b from-[#340104] via-[#1e0204] to-[#120404] py-10 text-white sm:py-14 border-t border-red-950 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
