"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import type { NormalizedInstagramPost, InstagramPost } from "@/types";
import InstagramCard from "@/components/ui/InstagramCard";
import { fallbackInstagramPosts } from "@/services/instagram.service";

export { default as InstagramCard } from "@/components/ui/InstagramCard";
export type { InstagramCardProps } from "@/components/ui/InstagramCard";

export interface InstagramSectionProps {
  posts?: (NormalizedInstagramPost | InstagramPost)[];
  accountName?: string;
  accountHandle?: string;
  accountAvatar?: string;
  followUrl?: string;
  className?: string;
}

export default function InstagramSection({
  posts = fallbackInstagramPosts,
  accountName = "Jessica Vallenilla",
  accountHandle = "la_katuar",
  accountAvatar = "/presentadora.png",
  followUrl = "https://instagram.com/la_katuar",
  className = "",
}: InstagramSectionProps): React.JSX.Element {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getScrollDistance = (): number => {
    if (!sliderRef.current) return 320;
    const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
    return firstCard ? firstCard.offsetWidth + 20 : sliderRef.current.clientWidth;
  };

  const handleScrollUpdate = (): void => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const distance = getScrollDistance();
    const index = Math.round(scrollLeft / distance);
    setActiveIndex(Math.min(Math.max(0, index), posts.length - 1));
  };

  const handleScroll = (direction: "left" | "right"): void => {
    if (sliderRef.current) {
      const distance = getScrollDistance();
      sliderRef.current.scrollBy({
        left: direction === "left" ? -distance : distance,
        behavior: "smooth",
      });
    }
  };

  const scrollToIndex = (index: number): void => {
    if (sliderRef.current) {
      const distance = getScrollDistance();
      sliderRef.current.scrollTo({
        left: index * distance,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section
      aria-label="Publicaciones de Instagram"
      className={`relative bg-white py-10 text-zinc-900 sm:py-14 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Barra Superior */}
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-zinc-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-red-600 p-0.5">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={accountAvatar}
                  alt={accountName}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-zinc-950">
                  {accountHandle}
                </span>
                <svg
                  className="h-4 w-4 fill-sky-500"
                  viewBox="0 0 24 24"
                  aria-label="Cuenta verificada"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <p className="text-xs text-zinc-500">Publicaciones de Instagram</p>
            </div>
          </div>

          <a
            href={followUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-red-700"
          >
            Seguinos
          </a>
        </div>

        {/* Carrusel con Controles Laterales */}
        <div className="relative">
          {/* Botón Lateral Izquierdo (Desktop) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Deslizar a la izquierda"
            className="absolute -left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 p-2.5 text-zinc-700 shadow-lg backdrop-blur-sm transition hover:bg-white hover:text-black md:flex lg:-left-5"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          {/* Contenedor de Tarjetas */}
          <div
            ref={sliderRef}
            onScroll={handleScrollUpdate}
            className="flex gap-5 overflow-x-auto py-3 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post) => (
              <InstagramCard key={post.id} post={post} />
            ))}
          </div>

          {/* Botón Lateral Derecho (Desktop) */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Deslizar a la derecha"
            className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 p-2.5 text-zinc-700 shadow-lg backdrop-blur-sm transition hover:bg-white hover:text-black md:flex lg:-right-5"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>

        {/* Indicador de Puntos en Mobile */}
        <div className="mt-4 flex items-center justify-center gap-1.5 md:hidden">
          {posts.map((post, idx) => (
            <button
              key={post.id}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Ir a publicación ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 bg-red-600"
                  : "w-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}