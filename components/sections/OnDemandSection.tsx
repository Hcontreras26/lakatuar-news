import React from "react";
import type { VideoItem } from "@/types";
import VideoCard from "@/components/ui/VideoCard";

export { default as VideoCard } from "@/components/ui/VideoCard";
export type { VideoCardProps } from "@/components/ui/VideoCard";

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
