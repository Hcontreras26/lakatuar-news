export type SocialIconType = "facebook" | "x" | "youtube" | "tiktok" | "whatsapp";

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
  badge?: string;
  category?: string;
  liveUrl?: string;
  imageUrl?: string;
  isLive?: boolean;
}

export interface VideoItem {
  id: number | string;
  title: string;
  duration: string;
  thumb: string;
  url?: string;
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

export interface SidebarStory {
  id: number | string;
  title: string;
  date: string;
  category?: string;
  url?: string;
}

export interface MainStory {
  title: string;
  date: string;
  image: string;
  summary: string;
  badge?: string;
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
