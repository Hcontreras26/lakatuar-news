// HeroSection — layout refinado según la maqueta (imagen 4).
const programInfo = {
  title: "EN LA MIRA",
  schedule: "Lunes a viernes 1:15pm en YouTube",
};

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#120404] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:py-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8">
          {/* Columna izquierda: logo y caja "En la mira" */}
          <div className="lg:col-span-6">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight">
                <span className="block text-white">LAKATUAR</span>
                <span className="block text-red-500">NEWS</span>
              </h1>
              <p className="mt-2 text-sm text-zinc-400 uppercase tracking-[0.25em]">Portal de noticias</p>
            </div>

            <div className="mt-8 max-w-md">
              <div className="rounded-2xl border px-6 py-5" style={{ background: '#1A0808', borderColor: '#5C1A1A' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">Programa</span>
                  <span className="text-xs font-bold text-red-500 uppercase">{programInfo.title}</span>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-red-500">{programInfo.title}</h2>
                <p className="mt-2 text-sm text-zinc-300">{programInfo.schedule}</p>
              </div>
            </div>
          </div>

          {/* Columna derecha: imagen circular superpuesta + reproductor */}
          <div className="lg:col-span-6 relative flex items-start justify-end">
            {/* Imagen de la presentadora — posicionada para sobresalir del borde superior */}
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
              alt="Presentadora"
              className="hidden sm:block absolute right-6 -top-16 h-40 w-40 rounded-full object-cover ring-4 ring-[#120404] shadow-lg"
              style={{ border: '4px solid rgba(18,4,4,0.0)' }}
            />

            {/* Reproductor de video — integrado en el fondo oscuro */}
            <div className="w-full max-w-2xl">
              <div className="relative overflow-hidden rounded-2xl border border-red-900/70 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="aspect-video w-full bg-black">
                  {/* Simulación de miniatura en el reproductor */}
                  <img
                    src="https://images.unsplash.com/photo-1496425742553-6e0d7f9c7aeb?auto=format&fit=crop&w=1200&q=80"
                    alt="Reproductor principal"
                    className="h-full w-full object-cover opacity-90"
                  />
                </div>

                {/* Controles superpuestos */}
                <div className="absolute left-4 bottom-4 flex items-center gap-3">
                  <button className="flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500">
                    ▶ Reproducir
                  </button>
                  <span className="text-sm text-zinc-300">Duración 1:02:34</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
