export type SocialIconType = "facebook" | "x" | "youtube" | "tiktok" | "whatsapp" | "instagram";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: SocialIconType;
}

export interface ProgramInfo {
  title: string;
  schedule: string;
  description?: string;
  badge?: string;
  category?: string;
  liveUrl?: string;
  imageUrl?: string;
  presenterImageUrl?: string;
  isLive?: boolean;
  videoId?: string;
  videoUrl?: string;
}

export interface VideoItem {
  id: number | string;
  title: string;
  duration: string;
  thumb: string;
  url?: string;
  category?: string;
  tag?: string;
}

export interface NewsItem {
  id: number | string;
  tag: string;
  title: string;
  image: string;
  date: string;
  summary?: string;
  url?: string;
}

export * from "./instagram";
import type { NormalizedInstagramPost } from "./instagram";

export type InstagramPost = NormalizedInstagramPost;

export interface TweetQuote {
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  isVerified?: boolean;
  translatedText?: string;
  text: string;
  courtDetails?: string;
  timestamp: string;
}

export interface TweetMedia {
  type: "video" | "image";
  thumbnailUrl?: string;
  imageUrl?: string;
  duration?: string;
  guestName?: string;
  guestTitle?: string;
  presenterName?: string;
  showTitle?: string;
  hasQrCode?: boolean;
}

export interface TweetPost {
  id: number | string;
  url?: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  isVerified?: boolean;
  timeAgo: string;
  text: string;
  paragraphs?: string[];
  hashtags?: string[];
  quote?: TweetQuote;
  media?: TweetMedia;
  stats: {
    replies: string | number;
    reposts: string | number;
    likes: string | number;
    views: string | number;
  };
}

export interface TopStoryArticle {
  id: number | string;
  title: string;
  date: string;
  thumbnail: string;
  url?: string;
}

export interface MainStory {
  title: string;
  date: string;
  image: string;
  summary: string;
  badge?: string;
  category?: string;
  url?: string;
}

export interface SidebarStory {
  id: number | string;
  title: string;
  date: string;
  category?: string;
  thumbnail?: string;
  url?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContactInfo {
  email: string;
  phone: string;
  location: string;
}
