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

function formatSecondsToDuration(totalSeconds: number): string {
  if (!totalSeconds || isNaN(totalSeconds) || totalSeconds <= 0) return "";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const paddedSeconds = seconds.toString().padStart(2, "0");
  if (hours > 0) {
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
}

function parseIsoDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i);
  if (!match) return "";
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const paddedSeconds = seconds.toString().padStart(2, "0");
  if (hours > 0) {
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
}

async function fetchVideoDuration(videoId: string): Promise<string> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return "";

    const html = await res.text();
    const lengthMatch = html.match(/"lengthSeconds":"(\d+)"/);
    if (lengthMatch && lengthMatch[1]) {
      const sec = parseInt(lengthMatch[1], 10);
      if (sec > 0) return formatSecondsToDuration(sec);
    }

    const isoMatch = html.match(/itemprop="duration" content="([^"]+)"/);
    if (isoMatch && isoMatch[1]) {
      return parseIsoDuration(isoMatch[1]);
    }

    return "";
  } catch {
    return "";
  }
}

async function fetchDurationsWithApiKey(
  videoIds: string[],
  apiKey: string
): Promise<Record<string, string>> {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(",")}&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return {};

    const data = await res.json();
    const map: Record<string, string> = {};

    if (Array.isArray(data.items)) {
      for (const item of data.items) {
        if (item?.id && item?.contentDetails?.duration) {
          map[item.id] = parseIsoDuration(item.contentDetails.duration);
        }
      }
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * Obtiene los ultimos videos de un canal de YouTube usando su RSS Feed publico
 * y resuelve la duracion exacta en formato HH:MM:SS / MM:SS.
 *
 * @param channelId ID del canal. Si no se envia, busca en process.env.YOUTUBE_CHANNEL_ID
 * @param limit Cantidad maxima de videos a retornar (default: 6)
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
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      console.error(`Error al obtener RSS de YouTube (${res.status}): ${res.statusText}`);
      return [];
    }

    const xmlText = await res.text();
    const entryMatches = xmlText.match(/<entry[\s\S]*?<\/entry>/gi) || [];

    const parsedEntries = entryMatches.slice(0, limit).map((entryXml, index) => {
      const videoIdMatch = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i);
      const titleMatch = entryXml.match(/<title[^>]*>([^<]+)<\/title>/i);
      const publishedMatch = entryXml.match(/<published>([^<]+)<\/published>/i);
      const thumbnailMatch = entryXml.match(/<media:thumbnail\s+url="([^"]+)"/i);

      const videoId = videoIdMatch ? videoIdMatch[1].trim() : `yt-${index}`;
      const rawTitle = titleMatch ? titleMatch[1].trim() : "Video sin título";
      const title = decodeXmlEntities(rawTitle);
      const published = publishedMatch ? publishedMatch[1].trim() : "";

      const rawThumb = thumbnailMatch
        ? thumbnailMatch[1]
        : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const thumb = rawThumb.replace(/^https?:\/\/i\d\.ytimg\.com\//i, "https://i.ytimg.com/");

      return {
        id: videoId,
        title,
        thumb,
        published,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        tag: "EN LA MIRA",
      };
    });

    const apiKey = process.env.YOUTUBE_API_KEY;
    const videoIds = parsedEntries.map((v) => v.id).filter(Boolean);

    let apiKeyDurationMap: Record<string, string> = {};
    if (apiKey && videoIds.length > 0) {
      apiKeyDurationMap = await fetchDurationsWithApiKey(videoIds, apiKey);
    }

    const videos: VideoItem[] = await Promise.all(
      parsedEntries.map(async (v) => {
        let duration = apiKeyDurationMap[v.id] || "";
        if (!duration && v.id) {
          duration = await fetchVideoDuration(v.id);
        }

        return {
          id: v.id,
          title: v.title,
          duration: duration || "EN VIVO",
          thumb: v.thumb,
          url: v.url,
          tag: v.tag,
          publishedAt: v.published,
        };
      })
    );

    return videos;
  } catch (error) {
    console.error("Error al procesar el RSS Feed de YouTube:", error);
    return [];
  }
}
