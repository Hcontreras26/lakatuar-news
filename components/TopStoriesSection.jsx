// Sección de periodismo escrito con un estilo clásico de portada.
// Combina una historia principal y una sidebar de noticias secundarias.
const sidebarStories = [
  {
    id: 1,
    title: "Gobernanza local y la presión de la ciudadanía en la mesa de decisiones",
    date: "18 Ago",
  },
  {
    id: 2,
    title: "El mercado laboral redefine perfiles y exigencias para la nueva generación",
    date: "16 Ago",
  },
  {
    id: 3,
    title: "Un puente entre comunidad, arte y memoria fortalece la identidad urbana",
    date: "15 Ago",
  },
  {
    id: 4,
    title: "Campañas de prevención ganan terreno entre jóvenes y familias",
    date: "12 Ago",
  },
];

export default function TopStoriesSection() {
  return (
    <section className="bg-[#170707] py-12 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-red-400">
              Periodismo escrito
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              Top stories
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <article className="overflow-hidden rounded-2xl border border-red-900/70 bg-[#1b0707]">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Personas reunidas en un evento periodístico"
              className="h-72 w-full object-cover"
            />

            <div className="p-6">
              <div className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-300">
                <span className="rounded-full bg-red-600 px-2.5 py-1 text-red-50">Destacado</span>
                <span>18 Ago 2026</span>
              </div>

              <h3 className="text-2xl font-black leading-tight text-white sm:text-4xl">
                La nueva agenda de inversión redefine la mirada de la región y sus comunidades
              </h3>

              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                Con foco en infraestructura, innovación y cohesión social, los actores locales
                buscan transformar desafíos en oportunidades reales para la ciudadanía y el
                desarrollo sostenible.
              </p>
            </div>
          </article>

          <aside className="space-y-4 rounded-2xl border border-red-900/70 bg-[#1b0707] p-4">
            {sidebarStories.map((story) => (
              <div key={story.id} className="border-b border-red-900/60 pb-4 last:border-b-0 last:pb-0">
                <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                  <span>Nota</span>
                  <span>{story.date}</span>
                </div>

                <h4 className="text-base font-semibold leading-6 text-zinc-100">
                  {story.title}
                </h4>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
