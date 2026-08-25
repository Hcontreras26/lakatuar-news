import React from "react";

export interface DenunciasBannerProps {
  className?: string;
  scheduleText?: string;
  timeText?: string;
}

export default function DenunciasBanner({
  className = "",
  scheduleText = "LUNES A VIERNES",
  timeText = "DESDE LA 1:15 PM",
}: DenunciasBannerProps): React.JSX.Element {
  return (
    <div
      className={`relative mt-8 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-xl bg-gradient-to-r from-black via-[#1c0205] to-black p-4 text-white shadow-xl sm:flex-row sm:p-5 border border-red-900/60 ${className}`.trim()}
    >
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
            {scheduleText}
          </p>
          <p className="text-xs font-black uppercase tracking-wider text-red-400 sm:text-sm">
            {timeText}
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
