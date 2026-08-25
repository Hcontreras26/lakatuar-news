"use client";

import React, { useRef } from "react";
import Image from "next/image";
import type { InstagramPost } from "@/types";
import InstagramCard from "@/components/ui/InstagramCard";

export { default as InstagramCard } from "@/components/ui/InstagramCard";
export type { InstagramCardProps } from "@/components/ui/InstagramCard";

export interface InstagramSectionProps {
  posts?: InstagramPost[];
  accountName?: string;
  accountHandle?: string;
  accountAvatar?: string;
  followUrl?: string;
  className?: string;
}

const defaultInstagramPosts: InstagramPost[] = [
  {
    id: 1,
    tag: "#LAKATUARNEWS",
    headline: "¡JUSTICIA ROBOLUCIONARIA NO PIDE PERDÓN!",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "hace 7 horas",
    postUrl: "https://instagram.com/la_katuar",
  },
  {
    id: 2,
    tag: "#LAKATUARNEWS",
    headline: "APELACIÓN EN CASO DE SUPUESTO PLAN CONTRA DIOSDADO",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "hace 9 horas",
    postUrl: "https://instagram.com/la_katuar",
  },
  {
    id: 3,
    tag: "#LAKATUARNEWS",
    headline: "SE CUMPLE UNA SEMANA DE TERREMOTO EN COLOMBIA",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "hace 17 horas",
    postUrl: "https://instagram.com/la_katuar",
  },
  {
    id: 4,
    tag: "#LAKATUARNEWS",
    headline: "LA \"TRAMA DE FAVORES\" ENTRE EL RÉGIMEN Y EMPRESA TURCA",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "hace 1 día",
    postUrl: "https://instagram.com/la_katuar",
  },
  {
    id: 5,
    tag: "#LAKATUARNEWS",
    headline: "VENEZOLANOS TOMAN EL RODEO I: DENUNCIAS Y CRISIS CARCELARIA",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "hace 2 días",
    postUrl: "https://instagram.com/la_katuar",
  },
];

export default function InstagramSection({
  posts = defaultInstagramPosts,
  accountName = "Jessica Vallenilla",
  accountHandle = "la_katuar",
  accountAvatar = "/presentadora.png",
  followUrl = "https://instagram.com/la_katuar",
  className = "",
}: InstagramSectionProps): React.JSX.Element {
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
    <section
      aria-label="Publicaciones de Instagram"
      className={`relative bg-white py-10 text-zinc-900 sm:py-14 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Barra Superior con Identidad de la Cuenta y Botón Seguir */}
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

        {/* Carrusel con Botones de Navegación */}
        <div className="relative">
          {/* Botón Izquierdo */}
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Deslizar a la izquierda"
            className="absolute -left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 p-2.5 text-zinc-700 shadow-lg transition hover:bg-white hover:text-black md:flex"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          {/* Contenedor Deslizable */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post) => (
              <InstagramCard key={post.id} post={post} />
            ))}
          </div>

          {/* Botón Derecho */}
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Deslizar a la derecha"
            className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 p-2.5 text-zinc-700 shadow-lg transition hover:bg-white hover:text-black md:flex"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
