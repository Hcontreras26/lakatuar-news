"use client";

import React, { useRef } from "react";
import Image from "next/image";
import type { NewsItem } from "@/types";

export interface NewsCardProps {
  item: NewsItem;
  className?: string;
}

export interface NewsSliderSectionProps {
  items?: NewsItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultNewsItems: NewsItem[] = [
  {
    id: 1,
    tag: "Política",
    title: "La agenda nacional toma fuerza con nuevas alianzas regionales",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    date: "18 AGO 2026",
  },
  {
    id: 2,
    tag: "Economía",
    title: "Nuevas inversiones impulsan el crecimiento en el centro del país",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80",
    date: "17 AGO 2026",
  },
  {
    id: 3,
    tag: "Seguridad",
    title: "Comités vecinales exigen respuesta inmediata a la crisis vial",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    date: "16 AGO 2026",
  },
  {
    id: 4,
    tag: "Cultura",
    title: "El arte local gana protagonismo con nuevos espacios creativos",
    image:
      "https://images.unsplash.com/photo-1517486800579-88f1b064f0d7?auto=format&fit=crop&w=900&q=80",
    date: "15 AGO 2026",
  },
];

export function NewsCard({ item, className = "" }: NewsCardProps): React.JSX.Element {
  return (
    <article
      className={`min-w-[285px] flex-1 overflow-hidden rounded-2xl border border-red-900/70 bg-[#170707] sm:min-w-[320px] md:min-w-[340px] ${className}`.trim()}
    >
      <div className="relative h-52 overflow-hidden bg-black">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 285px, (max-width: 768px) 320px, 340px"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          {item.tag}
        </span>
      </div>

      <div className="p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-400">
          {item.date}
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-7 text-zinc-100">
          {item.title}
        </h3>
      </div>
    </article>
  );
}

export default function NewsSliderSection({
  items = defaultNewsItems,
  title = "Noticias destacadas",
  subtitle = "Portada del día",
  className = "",
}: NewsSliderSectionProps): React.JSX.Element {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (): void => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = (): void => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section id="noticias" className={`bg-[#0f0202] py-12 text-white sm:py-16 ${className}`.trim()}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-red-400">
              {subtitle}
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Deslizar a la izquierda"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-red-700/80 bg-[#1b0707] text-xl text-red-200 transition hover:border-red-500 hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Deslizar a la derecha"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-red-700/80 bg-[#1b0707] text-xl text-red-200 transition hover:border-red-500 hover:text-white"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
