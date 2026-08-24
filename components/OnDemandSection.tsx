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
  subtitle?: string;
  className?: string;
}

const defaultVodItems: VideoItem[] = [
  {
    id: 1,
    title: "Entrevista con líderes locales: retos y soluciones",
    duration: "23:10",
    thumb: "https://images.unsplash.com/photo-1587825140708-3c5d7f1f5c9b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Reporte especial: economía en transición",
    duration: "18:45",
    thumb: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Cobertura: cultura y jóvenes creadores",
    duration: "12:33",
    thumb: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Análisis: sistema de transporte y ciudadanía",
    duration: "29:02",
    thumb: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Especial: ciencia local y proyectos comunitarios",
    duration: "9:50",
    thumb: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80",
  },
];

export function VideoCard({ item, className = "" }: VideoCardProps): React.JSX.Element {
  return (
    <article className={`group overflow-hidden rounded-xl border border-red-900/70 bg-[#170707] transition-transform hover:scale-[1.01] ${className}`.trim()}>
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <Image
          src={item.thumb}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover"
        />

        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-semibold uppercase text-white shadow-md">
          {item.duration}
        </span>

        <div className="absolute inset-0 z-10 flex items-end justify-start p-3">
          <div className="rounded bg-black/50 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
            Ver ahora
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold leading-6 text-zinc-100">{item.title}</h3>
      </div>
    </article>
  );
}

export default function OnDemandSection({
  items = defaultVodItems,
  title = "Videos bajo demanda",
  subtitle = "En demanda",
  className = "",
}: OnDemandSectionProps): React.JSX.Element {
  return (
    <section
      id="vod"
      aria-label="Videos bajo demanda"
      className={`relative overflow-hidden bg-gradient-to-b from-[#340104] via-[#1e0204] to-[#120404] py-12 text-white sm:py-16 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-red-400">
              {subtitle}
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
