import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DenunciasBanner from '@/components/ui/DenunciasBanner';
import { getArticleBySlug, getLatestArticles } from '@/lib/payload';
import { RichText } from '@payloadcms/richtext-lexical/react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Noticia no encontrada | LA KATUAR NEWS',
    };
  }

  const coverUrl =
    typeof article.coverImage === 'object' && article.coverImage?.url
      ? article.coverImage.url
      : undefined;

  return {
    title: `${article.title} | LA KATUAR NEWS`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: coverUrl ? [{ url: coverUrl }] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const recentNewsRes = await getLatestArticles({ limit: 5 });
  const relatedArticles = recentNewsRes.docs.filter((doc) => doc.id !== article.id);

  const category = typeof article.category === 'object' ? article.category : null;
  const coverImage = typeof article.coverImage === 'object' ? article.coverImage : null;

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main className="min-h-screen bg-[#120404] text-white">
      <Header />

      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Categoría y Fecha */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {category && (
            <span className="inline-block rounded bg-red-600 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white">
              {category.name}
            </span>
          )}
          {formattedDate && (
            <span className="text-xs font-medium text-zinc-400 capitalize">
              {formattedDate}
            </span>
          )}
        </div>

        {/* Titular Principal */}
        <h1 className="font-serif text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        {/* Resumen / Bajada */}
        {article.summary && (
          <p className="mt-4 text-base font-normal leading-relaxed text-zinc-300 sm:text-lg">
            {article.summary}
          </p>
        )}

        {/* Autor y Créditos */}
        <div className="mt-6 flex items-center justify-between border-y border-zinc-800 py-3 text-xs text-zinc-400">
          <div>
            <span className="font-semibold text-zinc-200">
              Por: {article.sourceOrAuthor || 'Redacción Lakatuar'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Compartir:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                article.title
              )}&url=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.href : ''
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-zinc-800 px-2 py-1 text-zinc-300 hover:bg-red-600 hover:text-white"
            >
              X
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `${article.title} - `
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-zinc-800 px-2 py-1 text-zinc-300 hover:bg-emerald-600 hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Imagen de Portada */}
        {coverImage?.url && (
          <figure className="my-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-900 shadow-xl">
              <Image
                src={coverImage.url}
                alt={coverImage.alt || article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
            {article.caption && (
              <figcaption className="mt-2 text-center text-xs italic text-zinc-400">
                {article.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Contenido Completo del Artículo */}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {article.content ? (
              <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-red-400 prose-p:leading-relaxed prose-p:text-zinc-200">
                <RichText data={article.content} />
              </div>
            ) : (
              <p className="text-zinc-400">{article.summary}</p>
            )}

            {/* Etiquetas */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-zinc-800 pt-4">
                <span className="text-xs font-semibold text-zinc-400">Etiquetas:</span>
                {article.tags.map((item, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 border border-zinc-800"
                  >
                    #{item.tag}
                  </span>
                ))}
              </div>
            )}

            {/* Banner de Denuncias */}
            <div className="mt-10">
              <DenunciasBanner />
            </div>
          </div>

          {/* Barra Lateral: Otras Noticias */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <h3 className="border-b border-zinc-800 pb-2 font-serif text-lg font-bold text-white">
                Otras Noticias
              </h3>
              <div className="mt-4 divide-y divide-zinc-800/60">
                {relatedArticles.map((rel) => {
                  const relCover =
                    typeof rel.coverImage === 'object' ? rel.coverImage : null;
                  return (
                    <Link
                      key={rel.id}
                      href={`/noticias/${rel.slug}`}
                      className="group block py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex gap-3">
                        {relCover?.url && (
                          <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded bg-zinc-900">
                            <Image
                              src={relCover.url}
                              alt={rel.title}
                              fill
                              sizes="80px"
                              className="object-cover transition group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="line-clamp-2 text-xs font-bold text-zinc-200 transition group-hover:text-red-400">
                            {rel.title}
                          </h4>
                          <span className="mt-1 block text-[10px] text-zinc-500">
                            {rel.publishedAt
                              ? new Date(rel.publishedAt).toLocaleDateString('es-ES', {
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : ''}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  );
}
