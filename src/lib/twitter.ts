import type { Tweet, TweetMedia, TwitterUser, TwitterApiResponse } from "@/types/twitter";

export const fallbackUser: TwitterUser = {
  id: "la_katuar_id",
  name: "Jessica Vallenilla",
  username: "la_katuar",
  profile_image_url: "/presentadora.png",
  verified: true,
};

export const fallbackTweets: Tweet[] = [
  {
    id: "2092738105820447142",
    text: "Observatorio Venezolano de Prisiones denuncia nueva muerte bajo custodia del Estado\n\nDesde la OVP detallaron que la muerte de Carlos Eduardo Padilla, quien estaba recluido en el Centro de Reclusión para Procesados Judiciales 26 de Julio, en el estado Guárico, se produjo en el...",
    created_at: new Date().toISOString(),
    public_metrics: {
      retweet_count: 9,
      reply_count: 2,
      like_count: 9,
      impression_count: 540,
    },
    media: [
      {
        media_key: "media_1",
        type: "photo",
        url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },
  {
    id: "2092722053111574680",
    text: "En el estado Táchira se sintió el sismo de magnitud 5,1 que se produjo durante la mañana de hoy en el municipio Los Santos, ubicado en el departamento de Santander de Colombia\n\nEl Servicio Geológico Colombiano informó que los sismos registrados este miércoles alcanzaron magnitud...",
    created_at: new Date().toISOString(),
    public_metrics: {
      retweet_count: 18,
      reply_count: 4,
      like_count: 51,
      impression_count: 1200,
    },
    media: [
      {
        media_key: "media_2",
        type: "video",
        preview_image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      },
    ],
  },
];

/**
 * Obtiene el feed estructurado de Twitter / X con usuario, tweets, multimedia y métricas.
 */
export async function getTwitterFeed(): Promise<TwitterApiResponse> {
  const token = process.env.TWITTER_BEARER_TOKEN;
  const username = process.env.TWITTER_USERNAME || "la_katuar";

  if (!token) {
    return {
      user: fallbackUser,
      tweets: fallbackTweets,
    };
  }

  try {
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url,verified`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 86400 },
      }
    );

    if (!userRes.ok) {
      return { user: fallbackUser, tweets: fallbackTweets };
    }

    const userData = await userRes.json();
    const user: TwitterUser = userData.data;

    const tweetsUrl = new URL(`https://api.twitter.com/2/users/${user.id}/tweets`);
    tweetsUrl.searchParams.set("max_results", "5");
    tweetsUrl.searchParams.set("tweet.fields", "created_at,public_metrics,attachments");
    tweetsUrl.searchParams.set("expansions", "attachments.media_keys");
    tweetsUrl.searchParams.set("media.fields", "url,preview_image_url,type");

    const tweetsRes = await fetch(tweetsUrl.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 900 },
    });

    if (!tweetsRes.ok) {
      return { user, tweets: fallbackTweets };
    }

    const tweetsData = await tweetsRes.json();
    const rawTweets: Tweet[] = tweetsData.data || [];
    const rawMedia: TweetMedia[] = tweetsData.includes?.media || [];

    const tweetsWithMedia = rawTweets.map((tweet) => {
      if (tweet.attachments?.media_keys) {
        const media = tweet.attachments.media_keys
          .map((key) => rawMedia.find((m) => m.media_key === key))
          .filter(Boolean) as TweetMedia[];
        return { ...tweet, media };
      }
      return tweet;
    });

    return {
      user,
      tweets: tweetsWithMedia.length > 0 ? tweetsWithMedia : fallbackTweets,
    };
  } catch {
    return {
      user: fallbackUser,
      tweets: fallbackTweets,
    };
  }
}
