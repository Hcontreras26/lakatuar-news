// Sección principal con branding de la marca y una composición visual tipo emisión en vivo.
// Está pensada para fortalecer la identidad del portal y el contenido destacado.
const programInfo = {
  title: "En la mira",
  schedule: "Lunes a viernes 1:15pm en YouTube",
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#120404] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(179,24,24,0.2),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-red-700 bg-red-900/30 text-xs font-black tracking-[0.2em] text-red-200">
              LK
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400">
                Portal de noticias
              </p>
            </div>
          </div>

          <button className="hidden rounded-full border border-red-700/80 bg-red-950/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-200 transition hover:border-red-500 hover:text-white sm:inline-flex">
            Ver programa
          </button>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1.25fr]">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-red-400">
              Noticias y opinión
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-7xl">
              LAKATUAR
              <span className="mt-2 block text-red-500">NEWS</span>
            </h1>

            <div className="mt-7 max-w-md rounded-2xl border border-red-900/80 bg-[#1b0707]/80 p-5 shadow-[0_0_30px_rgba(127,18,18,0.2)]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-300">
                  Programa
                </span>
                <span className="rounded-full border border-red-600/80 bg-red-950/80 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-red-100">
                  En vivo
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">{programInfo.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{programInfo.schedule}</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-red-900/70 bg-red-950/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-red-900/70 bg-[#0d0202] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
                  alt="Estudio de noticias con presentadora"
                  className="h-full w-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#120404] via-[#120404]/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500 bg-red-600 text-sm font-bold text-white">
                        ▶
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-red-300">En vivo</p>
                        <p className="text-base font-semibold text-white sm:text-lg">
                          {programInfo.title}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-red-600 bg-red-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100">
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
