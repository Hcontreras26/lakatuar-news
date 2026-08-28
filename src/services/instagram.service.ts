import type {
  InstagramFeedResponse,
  InstagramGraphApiResponse,
  InstagramGraphApiErrorResponse,
  InstagramMediaItem,
  InstagramServiceConfig,
  NormalizedInstagramPost,
} from "@/types/instagram";

export class InstagramApiError extends Error {
  public readonly statusCode?: number;
  public readonly code?: number;
  public readonly subcode?: number;
  public readonly fbtraceId?: string;

  constructor(
    message: string,
    options?: {
      statusCode?: number;
      code?: number;
      subcode?: number;
      fbtraceId?: string;
    }
  ) {
    super(message);
    this.name = "InstagramApiError";
    this.statusCode = options?.statusCode;
    this.code = options?.code;
    this.subcode = options?.subcode;
    this.fbtraceId = options?.fbtraceId;
  }
}

export const fallbackInstagramPosts: NormalizedInstagramPost[] = [
  {
    id: "fb-1",
    tag: "#LAKATUARNEWS",
    headline: "¡JUSTICIA ROBOLUCIONARIA NO PIDE PERDÓN!",
    caption: "¡JUSTICIA ROBOLUCIONARIA NO PIDE PERDÓN! Análisis en profundidad de los últimos sucesos. #LAKATUARNEWS",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "HACE 7 HORAS",
    timestamp: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
    permalink: "https://instagram.com/la_katuar",
    isCarousel: false,
    likeCount: 1420,
    commentsCount: 88,
  },
  {
    id: "fb-2",
    tag: "#LAKATUARNEWS",
    headline: "APELACIÓN EN CASO DE SUPUESTO PLAN CONTRA DIOSDADO",
    caption: "APELACIÓN EN CASO DE SUPUESTO PLAN CONTRA DIOSDADO. Todos los detalles jurídicos. #LAKATUARNEWS",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "HACE 9 HORAS",
    timestamp: new Date(Date.now() - 9 * 3600 * 1000).toISOString(),
    permalink: "https://instagram.com/la_katuar",
    isCarousel: false,
    likeCount: 980,
    commentsCount: 45,
  },
  {
    id: "fb-3",
    tag: "#LAKATUARNEWS",
    headline: "SE CUMPLE UNA SEMANA DE TERREMOTO EN COLOMBIA",
    caption: "SE CUMPLE UNA SEMANA DE TERREMOTO EN COLOMBIA. Reporte especial desde la zona de impacto. #LAKATUARNEWS",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "HACE 17 HORAS",
    timestamp: new Date(Date.now() - 17 * 3600 * 1000).toISOString(),
    permalink: "https://instagram.com/la_katuar",
    isCarousel: false,
    likeCount: 2100,
    commentsCount: 132,
  },
  {
    id: "fb-4",
    tag: "#LAKATUARNEWS",
    headline: 'LA "TRAMA DE FAVORES" ENTRE EL RÉGIMEN Y EMPRESA TURCA',
    caption: 'LA "TRAMA DE FAVORES" ENTRE EL RÉGIMEN Y EMPRESA TURCA. Revelaciones exclusivas. #LAKATUARNEWS',
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "HACE 1 DÍA",
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    permalink: "https://instagram.com/la_katuar",
    isCarousel: false,
    likeCount: 3450,
    commentsCount: 210,
  },
  {
    id: "fb-5",
    tag: "#LAKATUARNEWS",
    headline: "VENEZOLANOS TOMAN EL RODEO I: DENUNCIAS Y CRISIS CARCELARIA",
    caption: "VENEZOLANOS TOMAN EL RODEO I: DENUNCIAS Y CRISIS CARCELARIA. Testimonios de familiares. #LAKATUARNEWS",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    authorUsername: "la_katuar",
    authorAvatar: "/presentadora.png",
    timeAgo: "HACE 2 DÍAS",
    timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    permalink: "https://instagram.com/la_katuar",
    isCarousel: false,
    likeCount: 4200,
    commentsCount: 390,
  },
];

export function resolveInstagramConfig(): InstagramServiceConfig {
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID?.trim();
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const apiVersion = (process.env.META_GRAPH_API_VERSION || "v26.0").trim().replace(/^v?/, "v");
  const username = process.env.INSTAGRAM_USERNAME?.trim() || "la_katuar";
  const revalidateSeconds = Number(process.env.INSTAGRAM_REVALIDATE_SECONDS) || 3600;

  if (!accountId) {
    throw new InstagramApiError(
      "Missing required environment variable: INSTAGRAM_BUSINESS_ACCOUNT_ID"
    );
  }

  if (!accessToken) {
    throw new InstagramApiError(
      "Missing required environment variable: INSTAGRAM_ACCESS_TOKEN"
    );
  }

  return {
    accountId,
    accessToken,
    apiVersion,
    baseUrl: "https://graph.facebook.com",
    revalidateSeconds,
    username,
  };
}

export function formatInstagramRelativeTime(isoTimestamp: string): string {
  try {
    const date = new Date(isoTimestamp);
    if (isNaN(date.getTime())) return "RECIENTE";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      return `HACE ${months} ${months === 1 ? "MES" : "MESES"}`;
    }
    if (diffDays > 0) {
      return `HACE ${diffDays} ${diffDays === 1 ? "DÍA" : "DÍAS"}`;
    }
    if (diffHours > 0) {
      return `HACE ${diffHours} ${diffHours === 1 ? "HORA" : "HORAS"}`;
    }
    if (diffMinutes > 0) {
      return `HACE ${diffMinutes} MIN`;
    }
    return "HACE UN MOMENTO";
  } catch {
    return "RECIENTE";
  }
}

function parseCaption(caption?: string): { headline: string; tag: string } {
  if (!caption || !caption.trim()) {
    return { headline: "PUBLICACIÓN DE INSTAGRAM", tag: "#LAKATUARNEWS" };
  }

  const lines = caption
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine = lines[0] || "PUBLICACIÓN DE INSTAGRAM";
  const hashtagMatch = caption.match(/#[A-Za-z0-9_]+/);
  const tag = hashtagMatch ? hashtagMatch[0].toUpperCase() : "#LAKATUARNEWS";

  const cleanHeadline = firstLine
    .replace(/#[A-Za-z0-9_]+/g, "")
    .replace(/^["'«“]+|["'»”]+$/g, "")
    .trim();

  return {
    headline: cleanHeadline || firstLine,
    tag,
  };
}

export function normalizeInstagramItem(
  item: InstagramMediaItem,
  username: string
): NormalizedInstagramPost {
  const { headline, tag } = parseCaption(item.caption);
  const isCarousel = item.media_type === "CAROUSEL_ALBUM";
  
  const firstChild = item.children?.data?.[0];
  const mediaUrl =
    item.media_url ||
    item.thumbnail_url ||
    firstChild?.media_url ||
    firstChild?.thumbnail_url ||
    "";

  const thumbnailUrl =
    item.thumbnail_url ||
    (item.media_type === "IMAGE" ? item.media_url : undefined) ||
    firstChild?.thumbnail_url ||
    firstChild?.media_url;

  const children = item.children?.data?.map((child) => ({
    id: child.id,
    mediaType: child.media_type,
    mediaUrl: child.media_url || child.thumbnail_url || "",
    thumbnailUrl: child.thumbnail_url || child.media_url,
    permalink: child.permalink,
  }));

  return {
    id: item.id,
    caption: item.caption || "",
    headline,
    tag,
    mediaType: item.media_type,
    mediaUrl,
    thumbnailUrl,
    permalink: item.permalink,
    timestamp: item.timestamp,
    timeAgo: formatInstagramRelativeTime(item.timestamp),
    likeCount: item.like_count,
    commentsCount: item.comments_count,
    isCarousel,
    children,
    authorUsername: username,
    authorAvatar: "/presentadora.png",
  };
}

export async function fetchInstagramMedia(
  limit: number = 8
): Promise<NormalizedInstagramPost[]> {
  const config = resolveInstagramConfig();

  const endpoint = new URL(
    `${config.baseUrl}/${config.apiVersion}/${config.accountId}/media`
  );

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "like_count",
    "comments_count",
    "children{id,media_type,media_url,thumbnail_url,permalink,timestamp}",
  ].join(",");

  endpoint.searchParams.set("fields", fields);
  endpoint.searchParams.set("limit", Math.min(Math.max(limit, 1), 25).toString());
  endpoint.searchParams.set("access_token", config.accessToken);

  const response = await fetch(endpoint.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: config.revalidateSeconds,
      tags: ["instagram-feed"],
    },
  });

  if (!response.ok) {
    let errorData: InstagramGraphApiErrorResponse | null = null;
    let rawText = "";

    try {
      rawText = await response.text();
      errorData = JSON.parse(rawText) as InstagramGraphApiErrorResponse;
    } catch {
      // Ignorar error de parseo si la respuesta no es JSON
    }

    const message =
      errorData?.error?.message ||
      `Instagram Graph API error (${response.status}): ${response.statusText}`;

    throw new InstagramApiError(message, {
      statusCode: response.status,
      code: errorData?.error?.code,
      subcode: errorData?.error?.error_subcode,
      fbtraceId: errorData?.error?.fbtrace_id,
    });
  }

  const payload = (await response.json()) as InstagramGraphApiResponse;
  const items = payload.data || [];

  return items.map((item) => normalizeInstagramItem(item, config.username));
}

export async function getInstagramFeed(limit: number = 8): Promise<InstagramFeedResponse> {
  try {
    const posts = await fetchInstagramMedia(limit);
    return {
      posts: posts.length > 0 ? posts : fallbackInstagramPosts,
      isFallback: posts.length === 0,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido en Instagram API";

    if (process.env.NODE_ENV === "development") {
      console.warn(`[Instagram API Service] Error fetching feed: ${errorMessage}`);
    }

    return {
      posts: fallbackInstagramPosts,
      isFallback: true,
      error: errorMessage,
    };
  }
}
