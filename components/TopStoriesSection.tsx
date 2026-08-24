import React from "react";
import Image from "next/image";
import type { MainStory, SidebarStory } from "@/types";

export interface TopStoriesSectionProps {
  mainStory?: MainStory;
  sidebarStories?: SidebarStory[];
  title?: string;
  moreUrl?: string;
  className?: string;
}

const defaultMainStory: MainStory = {
  title: "The battle over Stars and Stripes",
  date: "JUL 5",
  image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
  summary:
    "The newspaper for the American military has long taken pride in its editorial independence. But under the Trump administration, restrictions have been...",
};

const defaultSidebarStories: SidebarStory[] = [
  {
    id: 1,
    title: "Reclaiming the lost art of listening to music",
    date: "JUL 5",
    thumbnail: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    title: "J.K. Simmons: A real character",
    date: "JUL 5",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    title: "Fire up the grill for a yearly ritual: Communing over BBQ skills (or lack thereof)",
    date: "JUL 5",
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    title: "The 'Sunday Morning' Essential American Songbook: Defining America through its music",
    date: "JUN 28",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    title: "Douglas Brinkley on America at 250: History tells us hoping for unity is not futile",
    date: "JUN 28",
    thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 6,
    title: "The Equal Rights Amendment: A promise unfulfilled",
    date: "JUN 28",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80",
  },
];

export function SidebarStoryRow({ story }: { story: SidebarStory }): React.JSX.Element {
  return (
    <article className="flex items-start justify-between gap-4 border-b border-zinc-200 py-3 last:border-b-0 hover:opacity-80 transition cursor-pointer">
      <div className="flex-1 pr-2">
        <h4 className="font-serif text-sm font-bold leading-snug text-zinc-900 sm:text-[15px]">
          {story.title}
        </h4>
        <span className="mt-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
          {story.date}
        </span>
      </div>

      {story.thumbnail && (
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-zinc-100 sm:h-18 sm:w-18">
          <Image
            src={story.thumbnail}
            alt={story.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      )}
    </article>
  );
}

export function DenunciasPromoBanner(): React.JSX.Element {
  return (
    <div className="relative mt-8 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-xl bg-gradient-to-r from-black via-[#1c0205] to-black p-4 text-white shadow-xl sm:flex-row sm:p-5 border border-red-900/60">
      {/* Lado Izquierdo: QR Code */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center justify-center rounded-lg bg-white p-2 text-black shadow-md">
          {/* Código QR Ilustrativo */}
          <div className="h-14 w-14 sm:h-16 sm:w-16">
            <svg className="h-full w-full fill-black" viewBox="0 0 24 24">
              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm4-4h4v-4h-4v4zm-4-4h4v4h-4v-4z" />
            </svg>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <span className="block text-[11px] font-black uppercase tracking-wider text-red-500">
            ESCÁNEA PARA
          </span>
          <span className="block text-xs font-black uppercase tracking-widest text-white sm:text-sm">
            DENUNCIAS
          </span>
        </div>
      </div>

      {/* Centro: Badge Circular Rojo y Horario */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-full bg-red-600 p-1 text-center shadow-lg">
          <span className="text-[8px] font-black leading-tight tracking-tighter text-white uppercase">
            LA KATUAR
          </span>
          <span className="text-[7px] font-bold leading-tight text-white/90 uppercase">
            NEWS
          </span>
        </div>

        <div className="text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
            LUNES A VIERNES
          </p>
          <p className="text-xs font-black uppercase tracking-wider text-red-400 sm:text-sm">
            DESDE LA 1:15 PM
          </p>
        </div>
      </div>

      {/* Lado Derecho: Logo En La Mira */}
      <div className="text-center sm:text-right">
        <div className="flex items-baseline justify-center sm:justify-end gap-1.5">
          <span className="rounded bg-red-600 px-1 py-0.5 text-[9px] font-black uppercase text-white">
            EN LA
          </span>
          <span className="text-lg font-black uppercase tracking-tight text-white sm:text-xl">
            MIRA
          </span>
        </div>
        <p className="text-[11px] font-medium text-zinc-400">
          con <span className="font-bold text-white">La Katuar</span>
        </p>
        <p className="text-[9px] uppercase tracking-widest text-zinc-500">
          JESSICA VALLENILLA
        </p>
      </div>
    </div>
  );
}

export default function TopStoriesSection({
  mainStory = defaultMainStory,
  sidebarStories = defaultSidebarStories,
  title = "Top Stories",
  moreUrl = "#",
  className = "",
}: TopStoriesSectionProps): React.JSX.Element {
  return (
    <section
      aria-label="Top Stories"
      className={`bg-white py-10 text-zinc-900 sm:py-14 border-t border-zinc-200 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la Sección */}
        <div className="mb-6 flex items-baseline justify-between border-b-2 border-zinc-900 pb-3">
          <h2 className="font-serif text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
            {title}
          </h2>
          <a
            href={moreUrl}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-700 transition hover:text-red-600 sm:text-sm"
          >
            More <span aria-hidden="true">›</span>
          </a>
        </div>

        {/* Grilla Principal: Noticia Destacada + Lista Lateral */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Columna Izquierda: Noticia Principal Stars and Stripes + Banner Promo */}
          <div className="lg:col-span-7">
            <article className="group cursor-pointer">
              {/* Imagen / Cabecera de Stars and Stripes */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-100 shadow-sm">
                <Image
                  src={mainStory.image}
                  alt={mainStory.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Banner superior simulado del periódico Stars and Stripes */}
                <div className="absolute top-0 inset-x-0 bg-white/95 px-4 py-2 border-b border-zinc-300 flex items-center justify-between backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
                      EDITION
                    </span>
                    <span className="font-serif text-sm font-black uppercase tracking-tighter text-zinc-900 sm:text-lg">
                      STARS <span className="text-red-600">AND</span> STRIPES
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold text-zinc-500 uppercase">
                    FRIDAY, JUNE 26, 2026
                  </span>
                </div>
              </div>

              {/* Título y Resumen */}
              <div className="mt-4">
                <h3 className="font-serif text-2xl font-black leading-tight text-zinc-950 transition group-hover:text-red-600 sm:text-3xl">
                  {mainStory.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {mainStory.summary}
                </p>
                <span className="mt-2 inline-block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  {mainStory.date}
                </span>
              </div>
            </article>

            {/* Banner de Denuncias y Emisión con QR */}
            <DenunciasPromoBanner />
          </div>

          {/* Columna Derecha: 6 Noticias Compactas con Miniatura */}
          <aside className="divide-y divide-zinc-200 lg:col-span-5">
            {sidebarStories.map((story) => (
              <SidebarStoryRow key={story.id} story={story} />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
