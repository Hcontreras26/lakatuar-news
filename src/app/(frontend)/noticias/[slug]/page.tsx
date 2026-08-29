import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DenunciasBanner from "@/components/ui/DenunciasBanner";
import ArticleActionsBar from "@/components/ui/ArticleActionsBar";
import { getArticleBySlug, getLatestArticles } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Artículo de referencia de alta calidad como fallback si la base de datos no tiene la nota creada
const DEMO_ARTICLE = {
  title: 'Donald Trump anunció "el mayor acuerdo petrolero de la historia" con Venezuela',
  summary:
    '"Estados Unidos se aseguró un control mayoritario de más de 65.000 millones de barriles de las reservas venezolanas", afirmó el mandatario republicano.',
  categoryName: "ESTADOS UNIDOS",
  publishedAt: "2026-08-28T19:09:00.000Z",
  author: "Redacción Lakatuar News",
  caption: "El presidente de Estados Unidos, Donald Trump. (AP Foto/Mark Schiefelbein)",
  coverImageUrl:
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
  paragraphs: [
    "El presidente de Estados Unidos, **Donald Trump**, anunció un histórico acuerdo petrolero con Venezuela para asegurar que Washington, que supervisa las exportaciones de crudo de Caracas, acceda por un largo plazo a una parte estratégica de las reservas del país sudamericano.",
    'En una publicación de Truth Social, Trump calificó el pacto como **"el mayor acuerdo petrolero de la historia mundial"** y dijo que duplicará con creces las reservas energéticas de Estados Unidos.',
    '"Bajo mi dirección, el secretario de Estado, Marco Rubio, y el secretario de Guerra, Pete Hegseth, en estrecha colaboración con la muy respetada presidenta interina de Venezuela, Delcy Rodríguez, y a través de una alianza con el sector privado, han conseguido que Estados Unidos obtenga el control mayoritario de más de **65.000 millones de barriles** de reservas probadas de petróleo en Venezuela, sin coste alguno para el contribuyente estadounidense", escribió Trump.',
    "El anuncio se produce en un momento de reconfiguración geopolítica en el hemisferio occidental, donde la estabilidad de los suministros energéticos globales y la reconstrucción económica de Venezuela forman el eje central de las negociaciones de alto nivel.",
  ],
  points: [
    "Control mayoritario de más de 65.000 millones de barriles de reservas probadas.",
    "Alianza estratégica con el sector privado sin costo para el contribuyente estadounidense.",
    "Supervisión directa del Departamento de Estado y la administración interina.",
    "Reconfiguración del mercado de hidrocarburos en todo el continente americano.",
  ],
  tags: ["EstadosUnidos", "Venezuela", "Petróleo", "Economía", "Geopolítica"],
};

// Noticias recomendadas para el sidebar tipo ranking numerado (1 al 5)
const RECOMMENDED_STORIES = [
  {
    rank: 1,
    title: '"Voy a llevar el avión y después necesito ir al hospital": un vuelo de Delta aterrizó de emergencia',
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80",
    url: "/noticias/vuelo-delta-emergencia",
  },
  {
    rank: 2,
    title: "En medio de la fuerte tensión diplomática, Estados Unidos y Brasil se enfrentan por designación en la OEA",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=300&q=80",
    url: "/noticias/tension-eeuu-brasil-oea",
  },
  {
    rank: 3,
    title: "Cinco personas se declararon culpables de importar cargamento en barcos de pesca internacional",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80",
    url: "/noticias/operativo-maritimo-pesca",
  },
  {
    rank: 4,
    title: "Crisis inmobiliaria en California: miles de viviendas nuevas desocupadas por altos costos",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
    url: "/noticias/california-crisis-inmobiliaria",
  },
  {
    rank: 5,
    title: "Reunión en Moscú: el director de inteligencia emite advertencia sobre seguridad en Europa",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=300&q=80",
    url: "/noticias/seguridad-moscu-otan",
  },
];

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  const title = article?.title || DEMO_ARTICLE.title;
  const description = article?.summary || DEMO_ARTICLE.summary;
  const coverUrl =
    typeof article?.coverImage === "object" && article.coverImage?.url
      ? article.coverImage.url
      : DEMO_ARTICLE.coverImageUrl;

  return {
    title: `${title} | LA KATUAR NEWS`,
    description,
    openGraph: {
      title,
      description,
      images: coverUrl ? [{ url: coverUrl }] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  const recentNewsRes = await getLatestArticles({ limit: 6 });
  const relatedArticles = recentNewsRes.docs.filter(
    (doc) => !article || doc.id !== article.id
  );

  // Mapeo dinámico con fallback robusto
  const categoryName =
    typeof article?.category === "object"
      ? article.category.name
      : DEMO_ARTICLE.categoryName;

  const title = article?.title || DEMO_ARTICLE.title;
  const summary = article?.summary || DEMO_ARTICLE.summary;
  const caption = article?.caption || DEMO_ARTICLE.caption;
  const author = article?.sourceOrAuthor || DEMO_ARTICLE.author;

  const coverUrl =
    typeof article?.coverImage === "object" && article.coverImage?.url
      ? article.coverImage.url
      : DEMO_ARTICLE.coverImageUrl;

  const publishedDate = article?.publishedAt
    ? new Date(article.publishedAt)
    : new Date(DEMO_ARTICLE.publishedAt);

  const formattedDate = publishedDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = publishedDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const tags =
    article?.tags && article.tags.length > 0
      ? article.tags.map((t) => t.tag)
      : DEMO_ARTICLE.tags;

  return (
    <div className="flex min-h-screen flex-col bg-[#120404] text-white antialiased">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {/* Breadcrumb de Categoría estilo Diario Profesional */}
          <nav aria-label="Ruta de categoría" className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-500">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Inicio
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/lo-ultimo" className="text-zinc-400 hover:text-white transition-colors">
              Noticias
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-red-500">{categoryName}</span>
          </nav>

          {/* Grid Principal: Contenido de la Nota a la izquierda (8 cols), Barras laterales a la derecha (4 cols) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            
            {/* ========================================================= */}
            {/* COLUMNA PRINCIPAL DEL ARTÍCULO (8 Columnas) */}
            {/* ========================================================= */}
            <article className="lg:col-span-8">
              
              {/* Tarjeta de Contenedor estilo Contacto (Dark Glassmorphism Elevado) */}
              <div className="rounded-2xl border border-red-950/70 bg-[#180506]/95 p-5 shadow-2xl backdrop-blur-md sm:p-8 lg:p-9">
                
                {/* 1. Titular Principal */}
                <h1 className="font-serif text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {title}
                </h1>

                {/* 2. Epígrafe / Bajada Descriptiva */}
                {summary && (
                  <p className="mt-3.5 border-l-2 border-red-600 pl-4 text-sm leading-relaxed text-zinc-300 sm:text-base font-normal italic">
                    {summary}
                  </p>
                )}

                {/* 3. Barra de Acciones Inteligentes (Escuchar, Puntos Clave, Resumen, Redes) */}
                <div className="mt-6">
                  <ArticleActionsBar
                    title={title}
                    summary={summary}
                    points={DEMO_ARTICLE.points}
                  />
                </div>

                {/* 4. Fotografía Principal de la Noticia */}
                {coverUrl && (
                  <figure className="my-6">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-red-950/60 bg-black/40 shadow-xl">
                      <Image
                        src={coverUrl}
                        alt={title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                      />
                    </div>
                    {caption && (
                      <figcaption className="mt-2 text-right text-[11px] font-normal italic text-zinc-400">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* 5. Fecha, Hora y Autoría */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-red-950/60 pb-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{author}</span>
                    <span>•</span>
                    <span>
                      {formattedDate} {formattedTime} EST
                    </span>
                  </div>
                  <span className="rounded bg-red-950/80 border border-red-800/60 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-400">
                    VERIFICADO
                  </span>
                </div>

                {/* 6. Cuerpo del Artículo */}
                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-200">
                  {article?.content ? (
                    <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-p:leading-relaxed prose-p:text-zinc-200 prose-a:text-red-400 prose-strong:text-white prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:bg-red-950/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic">
                      <RichText data={article.content} />
                    </div>
                  ) : (
                    DEMO_ARTICLE.paragraphs.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? "text-base sm:text-lg font-medium text-zinc-100 leading-relaxed"
                            : "leading-relaxed text-zinc-300"
                        }
                        dangerouslySetInnerHTML={{
                          __html: paragraph.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-white font-bold">$1</strong>'
                          ),
                        }}
                      />
                    ))
                  )}
                </div>

                {/* 7. Bloque de Etiquetas */}
                {tags && tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-red-950/60 pt-5">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                      Temas:
                    </span>
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-red-950/80 bg-[#1e0608] px-2.5 py-1 text-xs font-semibold text-red-300 hover:border-red-700 hover:text-white transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

              </div>

              {/* Banner de Denuncias / Contacto al pie de la nota */}
              <div className="mt-8">
                <DenunciasBanner />
              </div>

            </article>

            {/* ========================================================= */}
            {/* BARRA LATERAL DERECHA (4 Columnas) */}
            {/* ========================================================= */}
            <aside className="space-y-8 lg:col-span-4">
              
              {/* Widget 1: Lo Último */}
              <div className="rounded-2xl border border-red-950/70 bg-[#180506]/95 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-red-950/70 pb-3">
                  <h3 className="font-serif text-base font-black uppercase tracking-tight text-white">
                    Lo Último <span className="text-red-500">|</span> {categoryName}
                  </h3>
                  <Link
                    href="/lo-ultimo"
                    className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:underline"
                  >
                    Ver todo →
                  </Link>
                </div>

                <div className="mt-4 divide-y divide-red-950/50">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.slice(0, 5).map((rel) => {
                      const relCover =
                        typeof rel.coverImage === "object" ? rel.coverImage : null;
                      return (
                        <Link
                          key={rel.id}
                          href={`/noticias/${rel.slug}`}
                          className="group flex gap-3 py-3.5 first:pt-1 last:pb-0 transition-opacity hover:opacity-90"
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-2 text-xs font-bold leading-snug text-zinc-200 group-hover:text-red-400 transition-colors">
                              {rel.title}
                            </h4>
                            <span className="mt-1 block text-[10px] font-medium text-zinc-500">
                              {rel.publishedAt
                                ? new Date(rel.publishedAt).toLocaleDateString("es-ES", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "RECIENTE"}
                            </span>
                          </div>
                          {relCover?.url && (
                            <div className="relative h-14 w-18 flex-shrink-0 overflow-hidden rounded-lg border border-red-950/60 bg-black/40">
                              <Image
                                src={relCover.url}
                                alt={rel.title}
                                fill
                                sizes="80px"
                                className="object-cover transition group-hover:scale-105"
                              />
                            </div>
                          )}
                        </Link>
                      );
                    })
                  ) : (
                    RECOMMENDED_STORIES.slice(0, 4).map((item) => (
                      <Link
                        key={item.rank}
                        href={item.url}
                        className="group flex gap-3 py-3.5 first:pt-1 last:pb-0 transition-opacity hover:opacity-90"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="line-clamp-2 text-xs font-bold leading-snug text-zinc-200 group-hover:text-red-400 transition-colors">
                            {item.title}
                          </h4>
                          <span className="mt-1 block text-[10px] font-medium text-zinc-500">
                            HACE 2 HORAS
                          </span>
                        </div>
                        <div className="relative h-14 w-18 flex-shrink-0 overflow-hidden rounded-lg border border-red-950/60 bg-black/40">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="80px"
                            className="object-cover transition group-hover:scale-105"
                          />
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Widget 2: Te Recomendamos / Ranking 1 al 5 */}
              <div className="rounded-2xl border border-red-950/70 bg-[#180506]/95 p-5 shadow-xl backdrop-blur-md">
                <div className="border-b border-red-950/70 pb-3">
                  <h3 className="font-serif text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <span className="text-red-500">★</span> Te Recomendamos
                  </h3>
                </div>

                <ol className="mt-4 divide-y divide-red-950/50">
                  {RECOMMENDED_STORIES.map((item) => (
                    <li key={item.rank}>
                      <Link
                        href={item.url}
                        className="group flex items-start gap-3 py-3.5 first:pt-1 last:pb-0 transition-opacity hover:opacity-90"
                      >
                        {/* Número Circular */}
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-red-800/60 bg-red-950/80 text-xs font-black text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                          {item.rank}
                        </span>

                        {/* Título */}
                        <div className="min-w-0 flex-1">
                          <h4 className="line-clamp-2 text-xs font-bold leading-snug text-zinc-200 group-hover:text-red-400 transition-colors">
                            {item.title}
                          </h4>
                        </div>

                        {/* Miniatura */}
                        <div className="relative h-12 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-red-950/60 bg-black/40">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="60px"
                            className="object-cover transition group-hover:scale-105"
                          />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
