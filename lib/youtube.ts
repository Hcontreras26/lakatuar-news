import type { VideoItem } from "@/types";

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function formatRelativeDate(isoDateString?: string): string {
  if (!isoDateString) return "NUEVO";
  try {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      return `HACE ${months} ${months === 1 ? "MES" : "MESES"}`;
    }
    if (diffDays > 0) {
      return `HACE ${diffDays} ${diffDays === 1 ? "DÍA" : "DÍAS"}`;
    }
    if (diffHours > 0) {
      return `HACE ${diffHours} ${diffHours === 1 ? "H" : "HS"}`;
    }
    return "RECIENTE";
  } catch {
    return "NUEVO";
  }
}

/**
 * Obtiene los últimos videos de un canal de YouTube usando su RSS Feed público.
 * No requiere API Key.
 *
 * @param channelId ID del canal (ej. "UC_x5XG1OV2P6uZZ5FSM9Ttw"). Si no se envía, busca en process.env.YOUTUBE_CHANNEL_ID
 * @param limit Cantidad máxima de videos a retornar (default: 6)
 */
export async function getLatestYouTubeVideosFromRSS(
  channelId?: string,
  limit: number = 6
): Promise<VideoItem[]> {
  const targetChannelId =
    channelId ||
    process.env.YOUTUBE_CHANNEL_ID ||
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

  if (!targetChannelId) {
    return [];
  }

  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${targetChannelId}`;
    const res = await fetch(feedUrl, {
      // Revalida la respuesta cada 15 minutos (900 segundos) en Next.js
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      console.error(`Error al obtener RSS de YouTube (${res.status}): ${res.statusText}`);
      return [];
    }

    const xmlText = await res.text();
    const entryMatches = xmlText.match(/<entry[\s\S]*?<\/entry>/gi) || [];

    const videos: VideoItem[] = entryMatches.slice(0, limit).map((entryXml, index) => {
      const videoIdMatch = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i);
      const titleMatch = entryXml.match(/<title[^>]*>([^<]+)<\/title>/i);
      const publishedMatch = entryXml.match(/<published>([^<]+)<\/published>/i);
      const thumbnailMatch = entryXml.match(/<media:thumbnail\s+url="([^"]+)"/i);

      const videoId = videoIdMatch ? videoIdMatch[1].trim() : `yt-${index}`;
      const rawTitle = titleMatch ? titleMatch[1].trim() : "Video sin título";
      const title = decodeXmlEntities(rawTitle);
      const published = publishedMatch ? publishedMatch[1].trim() : "";
      
      const rawThumb = thumbnailMatch ? thumbnailMatch[1] : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const thumb = rawThumb.replace(/^https?:\/\/i\d\.ytimg\.com\//i, "https://i.ytimg.com/");

      return {
        id: videoId,
        title,
        duration: formatRelativeDate(published),
        thumb,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        tag: "EN LA MIRA",
      };
    });

    return videos;
  } catch (error) {
    console.error("Error al procesar el RSS Feed de YouTube:", error);
    return [];
  }
}
