import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DenunciasBanner from "@/components/ui/DenunciasBanner";
import { getLatestArticles } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Lo Último | Noticias de Actualidad y Minuto a Minuto - LA KATUAR NEWS",
  description:
    "Edición continua de noticias, reportajes exclusivos, política, economía y sucesos de última hora en Venezuela y el mundo.",
};

interface NewsArticle {
  id: string;
  category: string;
  categoryColor?: string;
  title: string;
  summary?: string;
  caption?: string;
  sourceOrAuthor: string;
  image?: string;
  date?: string;
  url?: string;
}

const MAIN_ARTICLE: NewsArticle = {
  id: "donald-trump-acuerdo-petrolero-venezuela",
  category: "ESTADOS UNIDOS",
  categoryColor: "bg-red-600",
  title: 'Donald Trump anunció "el mayor acuerdo petrolero de la historia" con Venezuela',
  summary:
    '"Estados Unidos se aseguró un control mayoritario de más de 65.000 millones de barriles de las reservas venezolanas", afirmó el mandatario republicano.',
  image:
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
  caption: "El presidente de Estados Unidos, Donald Trump. (AP Foto/Mark Schiefelbein)",
  sourceOrAuthor: "Redacción Lakatuar News",
  date: "Hace 1 hora",
  url: "/noticias/donald-trump-acuerdo-petrolero-venezuela",
};

const CENTER_STORIES: NewsArticle[] = [
  {
    id: "sin-mordaza-informe",
    category: "VENEZUELA",
    categoryColor: "bg-red-600",
    title: "Un Mundo Sin Mordaza: Venezuela enfrenta un primer semestre marcado por protestas, inflación y persecución política",
    summary:
      "La ONG documentó un incremento sostenido de vulneraciones a los derechos fundamentales, precariedad en servicios públicos y criminalización de la disidencia durante la primera mitad del año.",
    sourceOrAuthor: "El Nacional",
    date: "Hace 2 horas",
    url: "/noticias/sin-mordaza-informe",
  },
  {
    id: "ice-deportacion-gnb",
    category: "POLÍTICA",
    categoryColor: "bg-red-600",
    title: "EE UU deportó a Venezuela a excomandante de la GNB señalado por abusos y torturas durante las protestas de 2013 y 2014",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    caption:
      "El pasado 19 de agosto, el Servicio de Inmigración y Control de Aduanas (ICE) deportó a Venezuela a Rafael José Quero Silva, excomandante de la Guardia Nacional Bolivariana, tras una orden emitida por un juez de inmigración. Foto: Archivo.",
    sourceOrAuthor: "El Nacional",
    date: "Hace 3 horas",
    url: "/noticias/ice-deportacion-gnb",
  },
];

const RIGHT_STORIES: NewsArticle[] = [
  {
    id: "economia-la-guaira",
    category: "ECONOMÍA",
    categoryColor: "bg-red-600",
    title: "La economía de La Guaira se hunde tras la parálisis del sector comercial",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    caption:
      "Fernando Magis, pescador local desde hace 40 años, baja todos los días a su puesto, así no venda nada. Porque no ir, dice, le duele más | Foto Ezequiel Carías",
    sourceOrAuthor: "Karem González",
    date: "Hace 4 horas",
    url: "/noticias/economia-la-guaira",
  },
  {
    id: "temblor-colombia",
    category: "COLOMBIA",
    categoryColor: "bg-red-600",
    title: "Temblor de magnitud 5,1 sacudió a Colombia dos semanas después del terremoto de 7,4",
    summary:
      "El Servicio Geológico Colombiano reportó que el movimiento telúrico se sintió en Bogotá, Medellín y Santander, sin que se hayan registrado daños estructurales graves ni víctimas.",
    sourceOrAuthor: "El Nacional",
    date: "Hace 5 horas",
    url: "/noticias/temblor-colombia",
  },
];

const BREAKING_TICKER = [
  "URGENTE: Nuevas sanciones del Departamento del Tesoro a figuras del régimen",
  "OEA convoca a sesión extraordinaria para abordar la crisis institucional venezolana",
  "Reportan fallas masivas en el suministro eléctrico en 7 estados del país",
  "Comunidad internacional exige liberación inmediata de periodistas y presos políticos",
];

export default async function LoUltimoPage(): Promise<React.JSX.Element> {
  const articlesRes = await getLatestArticles({ limit: 10 });
  const cmsArticles = articlesRes.docs;

  const mainArticle: NewsArticle = cmsArticles[0]
    ? {
        id: String(cmsArticles[0].id),
        category:
          typeof cmsArticles[0].category === "object"
            ? cmsArticles[0].category.name
            : "ACTUALIDAD",
        title: cmsArticles[0].title,
        summary: cmsArticles[0].summary,
        caption: cmsArticles[0].caption || undefined,
        sourceOrAuthor: cmsArticles[0].sourceOrAuthor || "Redacción Lakatuar News",
        image:
          typeof cmsArticles[0].coverImage === "object" &&
          cmsArticles[0].coverImage?.url
            ? cmsArticles[0].coverImage.url
            : MAIN_ARTICLE.image,
        url: `/noticias/${cmsArticles[0].slug}`,
      }
    : MAIN_ARTICLE;

  const centerStories: NewsArticle[] = [
    cmsArticles[1]
      ? {
          id: String(cmsArticles[1].id),
          category:
            typeof cmsArticles[1].category === "object"
              ? cmsArticles[1].category.name
              : "VENEZUELA",
          title: cmsArticles[1].title,
          summary: cmsArticles[1].summary,
          sourceOrAuthor: cmsArticles[1].sourceOrAuthor || "Redacción Lakatuar News",
          url: `/noticias/${cmsArticles[1].slug}`,
        }
      : CENTER_STORIES[0],
    cmsArticles[2]
      ? {
          id: String(cmsArticles[2].id),
          category:
            typeof cmsArticles[2].category === "object"
              ? cmsArticles[2].category.name
              : "POLÍTICA",
          title: cmsArticles[2].title,
          caption: cmsArticles[2].caption || undefined,
          sourceOrAuthor: cmsArticles[2].sourceOrAuthor || "Redacción Lakatuar News",
          image:
            typeof cmsArticles[2].coverImage === "object" &&
            cmsArticles[2].coverImage?.url
              ? cmsArticles[2].coverImage.url
              : CENTER_STORIES[1].image,
          url: `/noticias/${cmsArticles[2].slug}`,
        }
      : CENTER_STORIES[1],
  ];

  const rightStories: NewsArticle[] = [
    cmsArticles[3]
      ? {
          id: String(cmsArticles[3].id),
          category:
            typeof cmsArticles[3].category === "object"
              ? cmsArticles[3].category.name
              : "ECONOMÍA",
          title: cmsArticles[3].title,
          caption: cmsArticles[3].caption || undefined,
          sourceOrAuthor: cmsArticles[3].sourceOrAuthor || "Redacción Lakatuar News",
          image:
            typeof cmsArticles[3].coverImage === "object" &&
            cmsArticles[3].coverImage?.url
              ? cmsArticles[3].coverImage.url
              : RIGHT_STORIES[0].image,
          url: `/noticias/${cmsArticles[3].slug}`,
        }
      : RIGHT_STORIES[0],
    cmsArticles[4]
      ? {
          id: String(cmsArticles[4].id),
          category:
            typeof cmsArticles[4].category === "object"
              ? cmsArticles[4].category.name
              : "REGIONAL",
          title: cmsArticles[4].title,
          summary: cmsArticles[4].summary,
          sourceOrAuthor: cmsArticles[4].sourceOrAuthor || "Redacción Lakatuar News",
          url: `/noticias/${cmsArticles[4].slug}`,
        }
      : RIGHT_STORIES[1],
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 antialiased">
      <Header />

      <main className="flex-1">
        {/* Barra superior de última hora (Ticker) */}
        <div className="border-b border-zinc-800 bg-zinc-900/90 px-4 py-2 text-xs">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <span className="flex-shrink-0 bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              ÚLTIMA HORA
            </span>
            <div className="overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee text-[11px] font-medium text-zinc-300">
                {BREAKING_TICKER.join("  •  ")}
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor principal con padding idéntico al estilo de contacto */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          
          {/* Breadcrumbs editorial */}
          <nav aria-label="Ruta de navegación" className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="font-medium text-zinc-200">Lo Último</span>
          </nav>

          {/* Encabezado Editorial Idéntico a Contacto */}
          <header className="mb-6 border-b border-zinc-800 pb-5 sm:mb-8 sm:pb-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              
              {/* Bloque Izquierdo: Categoría y Título Principal */}
              <div className="max-w-2xl">
                <div className="inline-block bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  EDICIÓN DIGITAL
                </div>
                <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Lo Último
                </h1>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  Edición continua de noticias, reportajes exclusivos, política, economía y sucesos al minuto.
                </p>
              </div>

              {/* Bloque Derecho: Indicadores rápidos como en Contacto */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Actualización</span>
                    <span className="font-semibold text-zinc-200">Al Minuto</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs">
                  <svg className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Verificación</span>
                    <span className="font-semibold text-zinc-200">Fuentes Directas</span>
                  </div>
                </div>
              </div>

            </div>
          </header>

          {/* Tarjeta de Contenedor Principal: Estilo Contacto (bg-zinc-900 con border-t-2 border-t-red-600) */}
          <div className="rounded-xl border border-zinc-700/80 bg-zinc-900 p-5 shadow-2xl shadow-black/60 sm:p-7 lg:p-8 border-t-2 border-t-red-600">
            
            {/* Grilla Principal de 3 Columnas */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
              
              {/* COLUMNA 1 (Izquierda): Noticia Central Destacada (5 Cols) */}
              <article className="lg:col-span-5 flex flex-col justify-between group">
                <div>
                  {/* Fotografía Principal */}
                  {mainArticle.image && (
                    <Link
                      href={mainArticle.url ?? "#"}
                      className="block relative aspect-[16/11] w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-md"
                    >
                      <Image
                        src={mainArticle.image}
                        alt={mainArticle.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 450px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </Link>
                  )}

                  {/* Pie de foto */}
                  {mainArticle.caption && (
                    <p className="mt-2 text-right text-[10px] font-normal italic text-zinc-400">
                      {mainArticle.caption}
                    </p>
                  )}

                  {/* Categoría */}
                  <div className="mt-3.5">
                    <span className="inline-block bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {mainArticle.category}
                    </span>
                  </div>

                  {/* Titular Principal */}
                  <h2 className="mt-2.5 text-xl font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-2xl">
                    <Link href={mainArticle.url ?? "#"}>
                      {mainArticle.title}
                    </Link>
                  </h2>

                  {/* Resumen Periodístico */}
                  <p className="mt-2.5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    {mainArticle.summary}
                  </p>
                </div>

                {/* Fuente / Autor */}
                <div className="mt-5 border-t border-zinc-800 pt-3 text-xs font-semibold text-zinc-400 flex items-center justify-between">
                  <span className="text-zinc-200 font-bold">{mainArticle.sourceOrAuthor}</span>
                  <Link
                    href={mainArticle.url ?? "#"}
                    className="inline-flex items-center gap-1 text-sm font-normal text-red-500 transition-colors hover:text-red-400"
                  >
                    <span>Leer nota completa</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>

              {/* COLUMNA 2 (Centro): 2 Noticias estructuradas verticalmente (4 Cols) */}
              <section className="lg:col-span-4 lg:border-l lg:border-r lg:border-zinc-800 lg:px-6 flex flex-col justify-between space-y-6 lg:space-y-0">
                
                {/* Noticia 1 Superior */}
                <article className="pb-6 border-b border-zinc-800 group">
                  <span className="inline-block bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {centerStories[0].category}
                  </span>

                  <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-lg">
                    <Link href={centerStories[0].url ?? "#"}>
                      {centerStories[0].title}
                    </Link>
                  </h3>

                  {centerStories[0].summary && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-3">
                      {centerStories[0].summary}
                    </p>
                  )}

                  <p className="mt-3 text-xs font-semibold text-zinc-400">
                    {centerStories[0].sourceOrAuthor}
                  </p>
                </article>

                {/* Noticia 2 Inferior con Fotografía */}
                <article className="pt-2 group">
                  {centerStories[1].image && (
                    <Link
                      href={centerStories[1].url ?? "#"}
                      className="block relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-sm"
                    >
                      <Image
                        src={centerStories[1].image}
                        alt={centerStories[1].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}

                  {centerStories[1].caption && (
                    <p className="mt-1.5 text-[9.5px] leading-tight text-zinc-400">
                      {centerStories[1].caption}
                    </p>
                  )}

                  <div className="mt-2.5">
                    <span className="inline-block bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {centerStories[1].category}
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-base">
                    <Link href={centerStories[1].url ?? "#"}>
                      {centerStories[1].title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-xs font-semibold text-zinc-400">
                    {centerStories[1].sourceOrAuthor}
                  </p>
                </article>

              </section>

              {/* COLUMNA 3 (Derecha): Economía y Noticias Regionales (3 Cols) */}
              <section className="lg:col-span-3 flex flex-col justify-between space-y-6 lg:space-y-0">
                
                {/* Noticia Superior con Foto */}
                <article className="pb-6 border-b border-zinc-800 group">
                  {rightStories[0].image && (
                    <Link
                      href={rightStories[0].url ?? "#"}
                      className="block relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-sm"
                    >
                      <Image
                        src={rightStories[0].image}
                        alt={rightStories[0].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}

                  {rightStories[0].caption && (
                    <p className="mt-1.5 text-right text-[9.5px] leading-tight text-zinc-400">
                      {rightStories[0].caption}
                    </p>
                  )}

                  <div className="mt-2.5">
                    <span className="inline-block bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {rightStories[0].category}
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-base">
                    <Link href={rightStories[0].url ?? "#"}>
                      {rightStories[0].title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs font-semibold text-zinc-400">
                    {rightStories[0].sourceOrAuthor}
                  </p>
                </article>

                {/* Noticia Inferior Regional */}
                <article className="pt-2 group">
                  <span className="inline-block bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {rightStories[1].category}
                  </span>

                  <h3 className="mt-2 text-sm font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-base">
                    <Link href={rightStories[1].url ?? "#"}>
                      {rightStories[1].title}
                    </Link>
                  </h3>

                  {rightStories[1].summary && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-3">
                      {rightStories[1].summary}
                    </p>
                  )}

                  <p className="mt-2.5 text-xs font-semibold text-zinc-400">
                    {rightStories[1].sourceOrAuthor}
                  </p>
                </article>

              </section>

            </div>
          </div>

          {/* Sección de Más Noticias Recientes del CMS (Si hay más de 5 artículos publicados) */}
          {cmsArticles.length > 5 && (
            <section className="mt-10 border-t border-zinc-800 pt-8">
              <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                    Más Noticias Recientes
                  </h2>
                </div>
                <span className="text-xs text-zinc-500">
                  {cmsArticles.length} notas disponibles
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cmsArticles.slice(5).map((article) => {
                  const cover =
                    typeof article.coverImage === "object" ? article.coverImage : null;
                  const catName =
                    typeof article.category === "object"
                      ? article.category.name
                      : "ACTUALIDAD";
                  const formattedPub = article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "";

                  return (
                    <article
                      key={article.id}
                      className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-lg transition hover:border-zinc-700"
                    >
                      <div>
                        {cover?.url && (
                          <Link
                            href={`/noticias/${article.slug}`}
                            className="block relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-sm"
                          >
                            <Image
                              src={cover.url}
                              alt={article.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 360px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>
                        )}

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="inline-block bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            {catName}
                          </span>
                          {formattedPub && (
                            <span className="text-[10px] font-medium text-zinc-500">
                              {formattedPub}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-2 text-sm font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-red-400">
                          <Link href={`/noticias/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        {article.summary && (
                          <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                            {article.summary}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-2 text-[11px]">
                        <span className="font-semibold text-zinc-400">
                          {article.sourceOrAuthor || "Redacción Lakatuar News"}
                        </span>
                        <Link
                          href={`/noticias/${article.slug}`}
                          className="font-bold text-red-500 transition-colors hover:text-red-400"
                        >
                          Leer nota →
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Banner de Contacto y Denuncias */}
          <div className="mt-10">
            <DenunciasBanner />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
