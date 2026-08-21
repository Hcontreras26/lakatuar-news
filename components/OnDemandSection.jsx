// Sección de videos bajo demanda (VOD).
// Utiliza un array de mock data y .map() para renderizar tarjetas DRY.
const vodItems = [
  {
    id: 1,
    title: "Entrevista con líderes locales: retos y soluciones",
    duration: "23:10",
    thumb: "https://images.unsplash.com/photo-1587825140708-3c5d7f1f5c9b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Reporte especial: economía en transición",
    duration: "18:45",
    thumb: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Cobertura: cultura y jóvenes creadores",
    duration: "12:33",
    thumb: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Análisis: sistema de transporte y ciudadanía",
    duration: "29:02",
    thumb: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Especial: ciencia local y proyectos comunitarios",
    duration: "9:50",
    thumb: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80",
  },
]

function VideoCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-red-900/70 bg-[#170707] transition hover:scale-[1.01]">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <img src={item.thumb} alt={item.title} className="h-full w-full object-cover" />

        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-semibold uppercase text-white">
          {item.duration}
        </span>

        <div className="absolute inset-0 flex items-end justify-start p-3">
          <div className="rounded bg-black/40 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
            Ver ahora
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold leading-6 text-zinc-100">{item.title}</h3>
      </div>
    </article>
  )
}

export default function OnDemandSection() {
  return (
    <section id="vod" className="bg-[#0f0202] py-12 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-red-400">En demanda</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Videos bajo demanda</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vodItems.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
// Grid reutilizable para contenido bajo demanda.
// El array central permite repetir tarjetas sin duplicar estructura visual.
const videos = [
  {
    id: 1,
    title: "El pulso de la semana: análisis profundo y contexto",
    duration: "23:10",
    category: "Análisis",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Frente a frente: voces de la ciudad y la política",
    duration: "18:42",
    category: "Entrevista",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Reportaje audiovisual con testimonios y hechos",
    duration: "31:57",
    category: "Reportaje",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Parlamento y comunidad: seguimiento a la agenda local",
    duration: "12:19",
    category: "Actualidad",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
];

export default function OnDemandSection() {
  return (
    <section id="programas" className="bg-[#140505] py-12 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-red-400">
              Biblioteca multimedia
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              ON Demand
            </h2>
          </div>

          <button className="hidden rounded-full border border-red-700/80 bg-red-950/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-200 transition hover:border-red-500 hover:text-white sm:inline-flex">
            Ver más
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {videos.map((video) => (
            <article
              key={video.id}
              className="group overflow-hidden rounded-2xl border border-red-900/70 bg-[#1b0707] transition duration-200 hover:-translate-y-1 hover:border-red-600/80"
            >
              <div className="relative">
                <img
                  src={video.image}
                  alt={video.title}
                  className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <span className="absolute right-3 top-3 rounded-full border border-red-400/80 bg-[#120404]/80 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-red-100">
                  {video.duration}
                </span>
              </div>

              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-400">
                  {video.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-7 text-zinc-100">
                  {video.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
