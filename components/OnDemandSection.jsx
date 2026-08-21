// Sección de videos bajo demanda (VOD).
// Mock data y componente de presentación.
const vodItems = [
  {
    id: 1,
    title: 'Entrevista con líderes locales: retos y soluciones',
    duration: '23:10',
    thumb: 'https://images.unsplash.com/photo-1587825140708-3c5d7f1f5c9b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Reporte especial: economía en transición',
    duration: '18:45',
    thumb: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Cobertura: cultura y jóvenes creadores',
    duration: '12:33',
    thumb: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Análisis: sistema de transporte y ciudadanía',
    duration: '29:02',
    thumb: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Especial: ciencia local y proyectos comunitarios',
    duration: '9:50',
    thumb: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80',
  },
];

function VideoCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-red-900/70 bg-[#170707] transition-transform hover:scale-[1.01]">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <img src={item.thumb} alt={item.title} className="h-full w-full object-cover" />

        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-semibold uppercase text-white">
          {item.duration}
        </span>

        <div className="absolute inset-0 flex items-end justify-start p-3">
          <div className="rounded bg-black/40 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">Ver ahora</div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold leading-6 text-zinc-100">{item.title}</h3>
      </div>
    </article>
  );
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
  );
}


