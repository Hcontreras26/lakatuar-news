import React from "react";
import Image from "next/image";
import type { ProgramInfo } from "@/types";

export interface HeroSectionProps {
  programInfo?: ProgramInfo;
  brandName?: string;
  brandSubname?: string;
  className?: string;
}

const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_PRESENTER_IMAGE = "/presentadora.png";

const defaultProgramInfo: ProgramInfo = {
  title: "EN LA MIRA",
  schedule: "Lunes a viernes 1:15pm Vzla/Miami en YouTube",
  description:
    "Lunes a viernes 1:15pm Vzla/Miami en YouTube | Aquí se habla sin miedo, se denuncia sin censura y se escucha a quienes no tienen micrófono en los grandes medios.",
  badge: "Programa",
  category: "En vivo",
  imageUrl: DEFAULT_FALLBACK_IMAGE,
  presenterImageUrl: DEFAULT_PRESENTER_IMAGE,
  isLive: true,
};

export default function HeroSection({
  programInfo = defaultProgramInfo,
  brandName = "LAKATUAR",
  brandSubname = "NEWS",
  className = "",
}: HeroSectionProps): React.JSX.Element {
  const presenterImage =
    programInfo.presenterImageUrl ?? DEFAULT_PRESENTER_IMAGE;
  const thumbnailImage = programInfo.imageUrl ?? DEFAULT_FALLBACK_IMAGE;
  const programDescription =
    programInfo.description ?? programInfo.schedule;

  return (
    <section
      aria-label="Hero Principal"
      className={`relative overflow-hidden bg-gradient-to-b from-[#85020b] via-[#630108] to-[#340104] text-white ${className}`.trim()}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14 lg:px-8 lg:pt-16 lg:pb-16">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-6">

          {/* Bloque Informativo */}
          <div className="z-10 flex flex-col items-start lg:col-span-5">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight leading-[0.95] text-white sm:text-5xl lg:text-6xl">
                {brandName}
              </h1>
              <span className="mt-1 block text-3xl font-light uppercase tracking-widest leading-[0.95] text-white sm:text-4xl lg:text-5xl">
                {brandSubname}
              </span>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-16">
              <h2 className="text-xl font-bold uppercase tracking-thin text-white sm:text-2xl lg:text-3xl">
                {programInfo.title}
              </h2>
              <p className="mt-8 max-w-md text-xs font-normal leading-relaxed text-zinc-100-95 sm:text-[18px]">
                {programDescription}
              </p>
            </div>
          </div>

          {/* Bloque Multimedia */}
          <div className="relative flex flex-col justify-start lg:col-span-7">

            {/* Imagen de la presentadora*/}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-2 z-0 flex justify-end sm:-top-24 sm:-right-6 md:-right-10 lg:-top-32 lg:-right-20 xl:-top-36 xl:-right-28 2xl:-right-36"
            >
              <Image
                src={presenterImage}
                alt={`Presentadora ${brandName} ${brandSubname}`}
                width={800}
                height={1000}
                priority
                className="mask-gradient-b h-[440px] w-auto max-w-none select-none object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] sm:h-[520px] lg:h-[580px] xl:h-[640px]"
              />
            </div>

            {/* Miniatura del en vivo */}
            <div className="relative z-10 mt-10 w-full max-w-md overflow-hidden rounded-sm bg-black/90 shadow-2xl lg:mt-[175px] lg:max-w-[85%]">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={thumbnailImage}
                  alt={programInfo.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 600px"
                  className="object-cover"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3.5 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105 sm:h-11 sm:w-11"
                    >
                      <svg
                        className="ml-0.5 h-4 w-4 fill-current sm:h-5 sm:w-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>

                    <div>
                      <span className="text-sm font-bold uppercase tracking-widest text-red-300 sm:text-xs">
                        {programInfo.category ?? "En vivo"}
                      </span>
                      <p className="text-xs font-bold leading-tight text-white sm:text-lg">
                        {programInfo.title}
                      </p>
                    </div>
                  </div>

                  {programInfo.isLive && (
                    <span
                      className="flex items-center gap-1.5 rounded-full border border-red-500/80 bg-red-950/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-red-100 shadow-md sm:px-3 sm:text-[10px]"
                      role="status"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse sm:h-2 sm:w-2"
                      />
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}