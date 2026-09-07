import React from "react";
import Image from "next/image";

export interface DenunciasBannerProps {
  className?: string;
  scheduleText?: string;
  timeText?: string;
  qrCodeUrl?: string;
}

export default function DenunciasBanner({
  className = "",
  scheduleText = "LUNES A VIERNES",
  timeText = "DESDE LA 1:15 PM",
  qrCodeUrl = "/qr-denuncias.png",
}: DenunciasBannerProps): React.JSX.Element {
  return (
    <div
      className={`relative mt-8 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-black via-[#1c0205] to-black p-4 text-white shadow-2xl sm:flex-row sm:p-5 border border-red-900/60 transition hover:border-red-700/80 ${className}`.trim()}
    >
      {/* Lado Izquierdo: QR Code con Imagen Real */}
      <div className="flex items-center gap-3.5">
        <div className="group relative flex flex-shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-white/20 transition-transform duration-300 hover:scale-105">
          <Image
            src={qrCodeUrl}
            alt="Código QR para denuncias - La Katuar News"
            width={72}
            height={72}
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-lg"
            priority
          />
        </div>
        <div className="text-center sm:text-left">
          <span className="block text-[11px] font-black uppercase tracking-wider text-red-500">
            ESCÁNEA PARA
          </span>
          <span className="block text-xs font-black uppercase tracking-widest text-white sm:text-base">
            DENUNCIAS
          </span>
        </div>
      </div>

      {/* Centro: Badge Circular Rojo y Horario */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-full bg-red-600 p-1 text-center shadow-lg shadow-red-950/50">
          <span className="text-[8px] font-black leading-tight tracking-tighter text-white uppercase">
            LA KATUAR
          </span>
          <span className="text-[7px] font-bold leading-tight text-white/90 uppercase">
            NEWS
          </span>
        </div>

        <div className="text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
            {scheduleText}
          </p>
          <p className="text-xs font-black uppercase tracking-wider text-red-500 sm:text-sm">
            {timeText}
          </p>
        </div>
      </div>

      {/* Lado Derecho: Logo En La Mira */}
      <div className="text-center sm:text-right">
        <div className="flex items-baseline justify-center sm:justify-end gap-1.5">
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-black uppercase text-white shadow-sm">
            EN LA
          </span>
          <span className="text-lg font-black uppercase tracking-tight text-white sm:text-xl">
            MIRA
          </span>
        </div>
        <p className="text-[11px] font-medium text-zinc-400">
          con <span className="font-bold text-white">La Katuar</span>
        </p>
        <p className="text-[9px] font-semibold uppercase tracking-widest text-zinc-400">
          JESSICA VALLENILLA
        </p>
      </div>
    </div>
  );
}

