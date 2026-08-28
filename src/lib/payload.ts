import { getPayload, type Where } from 'payload';
import configPromise from '@payload-config';
import type { Article, Category, SiteSetting } from '@/payload-types';

/**
 * Obtiene la instancia del cliente local de Payload para consultas directas desde Server Components
 */
export const getPayloadClient = async () => {
  return await getPayload({
    config: configPromise,
  });
};

/**
 * Obtiene las configuraciones globales del sitio (Live Stream, Redes, Avisos)
 */
export async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    });
    return settings;
  } catch (error) {
    console.error('Error al obtener site-settings de Payload:', error);
    return null;
  }
}

/**
 * Obtiene todas las categorías activas
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'categories',
      limit: 100,
      sort: 'name',
    });
    return result.docs;
  } catch (error) {
    console.error('Error al obtener categorías de Payload:', error);
    return [];
  }
}

/**
 * Obtiene la noticia principal para la sección Top Stories
 */
export async function getTopStoriesData() {
  try {
    const payload = await getPayloadClient();

    // 1. Noticia principal de Top Stories
    const mainStoryRes = await payload.find({
      collection: 'articles',
      where: {
        and: [
          { status: { equals: 'published' } },
          { 'placement.isTopStory': { equals: true } },
        ],
      },
      limit: 1,
      sort: '-publishedAt',
      depth: 2,
    });

    // 2. Noticias para la columna lateral de Top Stories
    const sidebarStoriesRes = await payload.find({
      collection: 'articles',
      where: {
        and: [
          { status: { equals: 'published' } },
          { 'placement.isSidebarStory': { equals: true } },
        ],
      },
      limit: 6,
      sort: '-publishedAt',
      depth: 2,
    });

    // 3. Fallback: Si no hay noticias marcadas como top story, traer las más recientes
    let mainStory = mainStoryRes.docs[0] || null;
    let sidebarStories = sidebarStoriesRes.docs;

    if (!mainStory && sidebarStories.length === 0) {
      const latest = await payload.find({
        collection: 'articles',
        where: {
          status: { equals: 'published' },
        },
        limit: 7,
        sort: '-publishedAt',
        depth: 2,
      });

      if (latest.docs.length > 0) {
        mainStory = latest.docs[0];
        sidebarStories = latest.docs.slice(1);
      }
    }

    return {
      mainStory,
      sidebarStories,
    };
  } catch (error) {
    console.error('Error al obtener Top Stories de Payload:', error);
    return {
      mainStory: null,
      sidebarStories: [],
    };
  }
}

/**
 * Obtiene artículos paginados para la página "Lo Último"
 */
export async function getLatestArticles(options?: {
  page?: number;
  limit?: number;
  categorySlug?: string;
}) {
  try {
    const payload = await getPayloadClient();
    const page = options?.page || 1;
    const limit = options?.limit || 12;

    const andConditions: Where[] = [
      { status: { equals: 'published' } },
    ];

    if (options?.categorySlug) {
      // Buscar ID de categoría por slug
      const categoryRes = await payload.find({
        collection: 'categories',
        where: {
          slug: { equals: options.categorySlug },
        },
        limit: 1,
      });

      if (categoryRes.docs.length > 0) {
        andConditions.push({ category: { equals: categoryRes.docs[0].id } });
      }
    }

    const whereClause: Where = {
      and: andConditions,
    };

    const result = await payload.find({
      collection: 'articles',
      where: whereClause,
      limit,
      page,
      sort: '-publishedAt',
      depth: 2,
    });

    return result;
  } catch (error) {
    console.error('Error al obtener artículos recientes de Payload:', error);
    return {
      docs: [],
      totalDocs: 0,
      limit: 12,
      totalPages: 0,
      page: 1,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }
}

/**
 * Obtiene un artículo específico por su slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'articles',
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
        ],
      },
      limit: 1,
      depth: 2,
    });

    return result.docs[0] || null;
  } catch (error) {
    console.error(`Error al buscar artículo con slug "${slug}":`, error);
    return null;
  }
}
