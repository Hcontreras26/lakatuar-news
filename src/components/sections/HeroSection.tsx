"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { ProgramInfo, VideoItem } from "@/types";

export interface HeroSectionProps {
  programInfo?: ProgramInfo;
  latestVideo?: VideoItem;
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
  latestVideo,
  brandName = "LAKATUAR",
  brandSubname = "NEWS",
  className = "",
}: HeroSectionProps): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const presenterImage =
    programInfo.presenterImageUrl ?? DEFAULT_PRESENTER_IMAGE;

  const videoId = latestVideo ? String(latestVideo.id) : programInfo.videoId;
  const videoTitle = latestVideo?.title ?? programInfo.title;
  const thumbnailImage =
    latestVideo?.thumb ?? programInfo.imageUrl ?? DEFAULT_FALLBACK_IMAGE;
  const programDescription =
    programInfo.description ?? programInfo.schedule;
  const videoUrl =
    latestVideo?.url ??
    programInfo.videoUrl ??
    (videoId ? `https://www.youtube.com/watch?v=${videoId}` : "https://youtube.com");

  return (
    <section
      id="en-vivo"
      aria-label="Hero Principal y Transmisión en Vivo"
      className={`relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-[#85020b] via-[#630108] to-[#340104] text-white ${className}`.trim()}
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
              <h1 className="font-brand text-4xl font-black uppercase tracking-tight leading-none text-white sm:text-5xl lg:text-6xl">
                {brandName}
              </h1>
              <span className="font-brand mt-1 block text-3xl font-light uppercase tracking-widest leading-none text-white sm:text-4xl lg:text-5xl">
                {brandSubname}
              </span>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-16">
              <div className="mb-2 flex items-center gap-2">
                {programInfo.isLive ? (
                  <span className="flex items-center gap-1.5 rounded bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    EN VIVO AHORA
                  </span>
                ) : (
                  <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                    {programInfo.badge || "EN LA MIRA"}
                  </span>
                )}
                <span className="text-xs font-semibold uppercase tracking-wider text-red-200/90">
                  con {programInfo.presenterName || "La Katuar"}
                </span>
              </div>

              <h2 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl lg:text-3xl">
                {videoTitle}
              </h2>
              <p className="mt-4 max-w-md text-xs font-normal leading-relaxed text-zinc-100/90 sm:text-base">
                {programDescription}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {videoId && !isPlaying && (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-xl transition-all hover:scale-105 hover:bg-red-700"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Ver Transmisión en Vivo
                  </button>
                )}

                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-black/40 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-red-400 hover:bg-red-950/60"
                >
                  Abrir en YouTube →
                </a>
              </div>
            </div>
          </div>

          {/* Bloque Multimedia */}
          <div className="relative flex flex-col justify-start lg:col-span-7">

            {/* Imagen de la presentadora:
                Ajustado el despeje en mobile (-top-20 a -top-24) y escala (h-[380px] en mobile, subiendo progresivamente) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 right-0 z-0 flex justify-end 
    [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] 
    [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] 
    sm:-top-24 sm:-right-4 md:-right-8 lg:-top-32 lg:-right-20 xl:-top-36 xl:-right-28"
            >
              <Image
                src={presenterImage}
                alt={`Presentadora ${brandName} ${brandSubname}`}
                width={800}
                height={1000}
                priority
                className="h-[380px] w-auto max-w-none select-none object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] sm:h-[480px] lg:h-[580px] xl:h-[640px]"
              />
            </div>

            {/* Miniatura / Reproductor de YouTube:
                Ajustado mt-28 en mobile y sm:mt-36 para garantizar que el marco superior del reproductor no tape el rostro */}
            <div className="relative z-10 mt-28 w-full max-w-md overflow-hidden rounded-xl border border-red-900/40 bg-black/90 shadow-2xl sm:mt-36 lg:mt-[175px] lg:max-w-[85%]">
              <div className="relative aspect-video w-full overflow-hidden">
                {isPlaying && videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <>
                    <Image
                      src={thumbnailImage}
                      alt={videoTitle}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 600px"
                      className="cursor-pointer object-cover transition-transform duration-500 hover:scale-105"
                      onClick={() => (videoId ? setIsPlaying(true) : window.open(videoUrl, "_blank"))}
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3.5 sm:p-5">
                      <div
                        className="group flex cursor-pointer items-center gap-3"
                        onClick={() => (videoId ? setIsPlaying(true) : window.open(videoUrl, "_blank"))}
                      >
                        <div
                          aria-hidden="true"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110 sm:h-11 sm:w-11"
                        >
                          <svg
                            className="ml-0.5 h-4 w-4 fill-current sm:h-5 sm:w-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>

                        <div className="max-w-[260px] sm:max-w-xs">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-red-400 sm:text-xs">
                            {programInfo.category ?? "En vivo"}
                          </span>
                          <p className="line-clamp-1 text-xs font-bold leading-tight text-white sm:text-sm">
                            {videoTitle}
                          </p>
                        </div>
                      </div>

                      {programInfo.isLive && (
                        <span
                          className="flex items-center gap-1.5 rounded-full border border-red-500/80 bg-red-950/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-red-100 shadow-md sm:px-3 sm:text-[10px]"
                          role="status"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 sm:h-2 sm:w-2"
                          />
                          LIVE
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}