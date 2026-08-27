import type {
  Tweet,
  TweetMedia,
  TwitterApiResponse,
  TwitterUser,
} from "@/types/twitter";

interface XApiConfig {
  bearerToken: string;
  username: string;
  baseUrl: string;
  revalidateSeconds: number;
}

function resolveConfig(): XApiConfig | null {
  const rawToken =
    process.env.X_API_BEARER_TOKEN ||
    process.env.X_BEARER_TOKEN ||
    process.env.TWITTER_BEARER_TOKEN;
  const username = process.env.X_USERNAME || process.env.TWITTER_USERNAME || "la_katuar";
  const baseUrl = process.env.X_API_BASE_URL || "https://api.x.com/2";
  const revalidateSeconds = Number(process.env.X_FEED_REVALIDATE_SECONDS) || 900;

  if (!rawToken) {
    return null;
  }

  const bearerToken = rawToken.includes("%") ? decodeURIComponent(rawToken) : rawToken;

  return {
    bearerToken,
    username,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    revalidateSeconds,
  };
}

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

export async function fetchUserByUsername(
  username: string,
  config: XApiConfig
): Promise<TwitterUser | null> {
  const url = new URL(`${config.baseUrl}/users/by/username/${username}`);
  url.searchParams.set("user.fields", "profile_image_url,verified");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${config.bearerToken}`,
    },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === "development") {
      const errorBody = await response.text();
      console.warn(`[X API] Error fetching user ${username} (${response.status}): ${errorBody}`);
    }
    return null;
  }

  const payload = await response.json();
  return payload?.data || null;
}

export async function fetchUserTweets(
  userId: string,
  config: XApiConfig,
  limit: number = 5
): Promise<Tweet[]> {
  const url = new URL(`${config.baseUrl}/users/${userId}/tweets`);
  url.searchParams.set("max_results", limit.toString());
  url.searchParams.set("tweet.fields", "created_at,public_metrics,attachments");
  url.searchParams.set("expansions", "attachments.media_keys");
  url.searchParams.set("media.fields", "url,preview_image_url,type");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${config.bearerToken}`,
    },
    next: { revalidate: config.revalidateSeconds },
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === "development") {
      const errorBody = await response.text();
      console.warn(`[X API] Error fetching tweets for user ${userId} (${response.status}): ${errorBody}`);
    }
    return [];
  }

  const payload = await response.json();
  const rawTweets: Tweet[] = payload.data || [];
  const rawMedia: TweetMedia[] = payload.includes?.media || [];

  return rawTweets.map((tweet) => {
    if (tweet.attachments?.media_keys?.length) {
      const media = tweet.attachments.media_keys
        .map((key) => rawMedia.find((m) => m.media_key === key))
        .filter((item): item is TweetMedia => Boolean(item));
      return { ...tweet, media };
    }
    return tweet;
  });
}

export async function getTwitterFeed(): Promise<TwitterApiResponse> {
  const config = resolveConfig();

  if (!config) {
    return {
      user: fallbackUser,
      tweets: fallbackTweets,
    };
  }

  try {
    const user = await fetchUserByUsername(config.username, config);

    if (!user) {
      return {
        user: fallbackUser,
        tweets: fallbackTweets,
      };
    }

    const tweets = await fetchUserTweets(user.id, config, 5);

    return {
      user,
      tweets: tweets.length > 0 ? tweets : fallbackTweets,
    };
  } catch {
    return {
      user: fallbackUser,
      tweets: fallbackTweets,
    };
  }
}
