export interface TweetMedia {
  media_key: string;
  type: 'photo' | 'video' | 'animated_gif';
  url?: string;
  preview_image_url?: string;
}

export interface Tweet {
  id: string;
  text: string;
  created_at: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    impression_count: number;
  };
  attachments?: {
    media_keys: string[];
  };
  media?: TweetMedia[];
}

export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  verified: boolean;
}

export interface TwitterApiResponse {
  user: TwitterUser;
  tweets: Tweet[];
}
