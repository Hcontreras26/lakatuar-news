"use client";

import React, { useRef } from "react";
import Image from "next/image";
import type { InstagramPost } from "@/types";

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

export function InstagramCard({ post }: { post: InstagramPost }): React.JSX.Element {
  return (
    <article className="group relative flex min-w-[280px] max-w-[340px] flex-1 flex-col overflow-hidden rounded-2xl border border-zinc-300/80 bg-black shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[320px]">
      {/* Contenedor de la Imagen con Arte Gráfico de Noticia */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950">
        <Image
          src={post.imageUrl}
          alt={post.headline}
          fill
          sizes="(max-width: 640px) 280px, 340px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradientes de superposición */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

        {/* Icono de post múltiple / carrusel en esquina superior derecha */}
        <div className="absolute top-3 right-3 z-10 rounded-md bg-black/60 p-1.5 text-white backdrop-blur-sm">
          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
          </svg>
        </div>

        {/* Badge #LAKATUARNEWS */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-sm">
            {post.tag ?? "#LAKATUARNEWS"}
          </span>
        </div>

        {/* Contenido Editorial de la Imagen (Titular y Lower Third) */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4">
          {/* Titular en caja blanca con texto negro / impacto */}
          <div className="mb-2.5 rounded bg-white/95 p-2.5 shadow-lg backdrop-blur-sm">
            <h3 className="text-sm font-black uppercase leading-tight tracking-tight text-zinc-950 sm:text-base">
              {post.headline}
            </h3>
          </div>

          {/* Cintillo En La Mira */}
          <div className="flex items-center justify-between rounded bg-gradient-to-r from-zinc-950 via-[#2a0407] to-zinc-950 px-2.5 py-1.5 border border-red-900/40">
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-red-600 px-1 py-0.2 text-[8px] font-black uppercase text-white">
                EN LA
              </span>
              <span className="text-xs font-black tracking-wide text-white uppercase">
                MIRA
              </span>
              <span className="text-[10px] font-medium text-zinc-300">
                ... con La Katuar
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer del Post de Instagram */}
      <div className="flex items-center justify-between border-t border-zinc-800 bg-[#0c0c0c] px-3.5 py-2.5 text-white">
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full border border-red-500">
            <Image
              src={post.authorAvatar ?? "/presentadora.png"}
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

        {/* Icono oficial de Instagram */}
        <a
          href={post.postUrl ?? "https://instagram.com/la_katuar"}
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
