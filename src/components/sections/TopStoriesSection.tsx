import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { MainStory, SidebarStory } from "@/types";
import SidebarStoryRow from "@/components/ui/SidebarStoryRow";
import DenunciasBanner from "@/components/ui/DenunciasBanner";

export { default as SidebarStoryRow } from "@/components/ui/SidebarStoryRow";
export type { SidebarStoryRowProps } from "@/components/ui/SidebarStoryRow";
export { default as DenunciasBanner } from "@/components/ui/DenunciasBanner";
export type { DenunciasBannerProps } from "@/components/ui/DenunciasBanner";
export const DenunciasPromoBanner = DenunciasBanner;

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
            {mainStory.url ? (
              <Link href={mainStory.url} className="block group">
                <article className="cursor-pointer">
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
              </Link>
            ) : (
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
            )}

            {/* Banner de Denuncias y Emisión con QR */}
            <DenunciasBanner />
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
