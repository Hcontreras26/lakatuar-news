import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DenunciasBanner from "@/components/ui/DenunciasBanner";

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
  id: "sip-informe-persecucion",
  category: "POLÍTICA",
  categoryColor: "bg-blue-600",
  title: "Miguel Henrique Otero entregó a Dinorah Figuera informe de la SIP sobre persecución a medios en Venezuela",
  summary:
    "El presidente editor de El Nacional consignó en Madrid ante la jefa negociadora opositora un expediente que documenta el cierre de 297 emisoras, la desaparición de más de 100 periódicos y el bloqueo de 62 portales digitales durante casi tres décadas.",
  image:
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
  caption: "Miguel Henrique Otero y Dinorah Figuera",
  sourceOrAuthor: "El Nacional",
  date: "Hace 1 hora",
};

const CENTER_STORIES: NewsArticle[] = [
  {
    id: "sin-mordaza-informe",
    category: "VENEZUELA",
    categoryColor: "bg-blue-500",
    title: "Un Mundo Sin Mordaza: Venezuela enfrenta un primer semestre marcado por protestas, inflación y persecución política",
    summary:
      "La ONG documentó un incremento sostenido de vulneraciones a los derechos fundamentales, precariedad en servicios públicos y criminalización de la disidencia durante la primera mitad del año.",
    sourceOrAuthor: "El Nacional",
    date: "Hace 2 horas",
  },
  {
    id: "ice-deportacion-gnb",
    category: "POLÍTICA",
    categoryColor: "bg-blue-600",
    title: "EE UU deportó a Venezuela a excomandante de la GNB señalado por abusos y torturas durante las protestas de 2013 y 2014",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    caption:
      "El pasado 19 de agosto, el Servicio de Inmigración y Control de Aduanas (ICE) deportó a Venezuela a Rafael José Quero Silva, excomandante de la Guardia Nacional Bolivariana, tras una orden emitida por un juez de inmigración. Foto: Archivo.",
    sourceOrAuthor: "El Nacional",
    date: "Hace 3 horas",
  },
];

const RIGHT_STORIES: NewsArticle[] = [
  {
    id: "economia-la-guaira",
    category: "ECONOMÍA",
    categoryColor: "bg-blue-600",
    title: "La economía de La Guaira se hunde tras la parálisis del sector comercial",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    caption:
      "Fernando Magis, pescador local desde hace 40 años, baja todos los días a su puesto, así no venda nada. Porque no ir, dice, le duele más | Foto Ezequiel Carías",
    sourceOrAuthor: "Karem González",
    date: "Hace 4 horas",
  },
  {
    id: "temblor-colombia",
    category: "COLOMBIA",
    categoryColor: "bg-blue-600",
    title: "Temblor de magnitud 5,1 sacudió a Colombia dos semanas después del terremoto de 7,4",
    summary:
      "El Servicio Geológico Colombiano reportó que el movimiento telúrico se sintió en Bogotá, Medellín y Santander, sin que se hayan registrado daños estructurales graves ni víctimas.",
    sourceOrAuthor: "El Nacional",
    date: "Hace 5 horas",
  },
];

const BREAKING_TICKER = [
  "URGENTE: Nuevas sanciones del Departamento del Tesoro a figuras del régimen",
  "OEA convoca a sesión extraordinaria para abordar la crisis institucional venezolana",
  "Reportan fallas masivas en el suministro eléctrico en 7 estados del país",
  "Comunidad internacional exige liberación inmediata de periodistas y presos políticos",
];

import { getLatestArticles } from "@/lib/payload";

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
        sourceOrAuthor: cmsArticles[0].sourceOrAuthor || "Redacción Lakatuar",
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
          sourceOrAuthor: cmsArticles[1].sourceOrAuthor || "Redacción Lakatuar",
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
          sourceOrAuthor: cmsArticles[2].sourceOrAuthor || "Redacción Lakatuar",
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
          sourceOrAuthor: cmsArticles[3].sourceOrAuthor || "Redacción Lakatuar",
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
          sourceOrAuthor: cmsArticles[4].sourceOrAuthor || "Redacción Lakatuar",
          url: `/noticias/${cmsArticles[4].slug}`,
        }
      : RIGHT_STORIES[1],
  ];
  return (
    <div className="flex min-h-screen flex-col bg-[#120404] text-white antialiased">
      <Header />

      <main className="flex-1">
        {/* Barra superior de última hora (Ticker) */}
        <div className="border-b border-red-950/80 bg-[#1a0406] px-4 py-2.5 text-xs shadow-inner">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <span className="flex-shrink-0 rounded bg-red-600 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md animate-pulse">
              ÚLTIMA HORA
            </span>
            <div className="overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee text-[11px] font-medium text-zinc-300">
                {BREAKING_TICKER.join("  •  ")}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Ruta de navegación" className="mb-5 flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="transition-colors hover:text-red-400">
              Inicio
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="font-semibold text-red-500">Lo Último</span>
          </nav>

          {/* Encabezado Editorial estilo Prensa Digital Premium */}
          <header className="mb-8 border-b border-red-950/70 pb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-red-600/90 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                    EDICIÓN DIGITAL
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    ACTUALIZADO AL MINUTO
                  </span>
                </div>
                <h1 className="mt-2.5 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Lo Último
                </h1>
              </div>

              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span>Información verificada · Sin censura</span>
              </div>
            </div>
          </header>

          {/* Superficie Editorial: Contenedor Dark con acentos carmesí */}
          <div className="rounded-2xl border border-red-950/70 bg-[#180507]/90 p-5 text-white shadow-2xl backdrop-blur-md sm:p-7 lg:p-9">
            
            {/* Grilla Principal de 3 Columnas */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
              
              {/* COLUMNA 1 (Izquierda): Noticia Central Destacada (5 Cols) */}
              <article className="lg:col-span-5 flex flex-col justify-between group">
                <div>
                  {/* Fotografía Principal */}
                  {mainArticle.image && (
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-red-950/60 bg-black/40 shadow-lg">
                      <Image
                        src={mainArticle.image}
                        alt={mainArticle.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 450px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Pie de foto */}
                  {mainArticle.caption && (
                    <p className="mt-2 text-right text-[10px] font-normal italic text-zinc-400">
                      {mainArticle.caption}
                    </p>
                  )}

                  {/* Categoría */}
                  <div className="mt-3.5">
                    <span className="inline-block rounded-md bg-red-950/80 border border-red-800/60 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-400">
                      {mainArticle.category}
                    </span>
                  </div>

                  {/* Titular Principal */}
                  <h2 className="mt-2.5 font-serif text-2xl font-black leading-tight tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-3xl">
                    <Link href={mainArticle.url ?? "#"}>
                      {mainArticle.title}
                    </Link>
                  </h2>

                  {/* Resumen Periodístico */}
                  <p className="mt-3 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    {mainArticle.summary}
                  </p>
                </div>

                {/* Fuente / Autor */}
                <div className="mt-5 border-t border-red-950/60 pt-3 text-xs font-semibold text-zinc-400 flex items-center justify-between">
                  <span className="text-white font-bold">{mainArticle.sourceOrAuthor}</span>
                  <span className="text-[11px] text-red-400">Leer nota completa →</span>
                </div>
              </article>

              {/* COLUMNA 2 (Centro): 2 Noticias estructuradas verticalmente (4 Cols) */}
              <section className="lg:col-span-4 lg:border-l lg:border-r lg:border-red-950/60 lg:px-6 flex flex-col justify-between space-y-6 lg:space-y-0">
                
                {/* Noticia 1 Superior */}
                <article className="pb-6 border-b border-red-950/60 group">
                  <span className="inline-block rounded-md bg-red-950/80 border border-red-800/60 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-400">
                    {centerStories[0].category}
                  </span>

                  <h3 className="mt-2 font-serif text-lg font-black leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-xl">
                    <Link href={centerStories[0].url ?? "#"}>
                      {centerStories[0].title}
                    </Link>
                  </h3>

                  {centerStories[0].summary && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-300 line-clamp-3">
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
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-red-950/60 bg-black/40 shadow-md">
                      <Image
                        src={centerStories[1].image}
                        alt={centerStories[1].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {centerStories[1].caption && (
                    <p className="mt-1.5 text-[9.5px] leading-tight text-zinc-400">
                      {centerStories[1].caption}
                    </p>
                  )}

                  <div className="mt-2.5">
                    <span className="inline-block rounded-md bg-red-950/80 border border-red-800/60 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-400">
                      {centerStories[1].category}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-base font-black leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-lg">
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
                <article className="pb-6 border-b border-red-950/60 group">
                  {rightStories[0].image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-red-950/60 bg-black/40 shadow-md">
                      <Image
                        src={rightStories[0].image}
                        alt={rightStories[0].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {rightStories[0].caption && (
                    <p className="mt-1.5 text-right text-[9.5px] leading-tight text-zinc-400">
                      {rightStories[0].caption}
                    </p>
                  )}

                  <div className="mt-2.5">
                    <span className="inline-block rounded-md bg-red-950/80 border border-red-800/60 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-400">
                      {rightStories[0].category}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-base font-black leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-lg">
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
                  <span className="inline-block rounded-md bg-red-950/80 border border-red-800/60 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-red-400">
                    {rightStories[1].category}
                  </span>

                  <h3 className="mt-2 font-serif text-base font-black leading-snug tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-lg">
                    <Link href={rightStories[1].url ?? "#"}>
                      {rightStories[1].title}
                    </Link>
                  </h3>

                  {rightStories[1].summary && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-300 line-clamp-3">
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
