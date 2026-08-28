export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export interface InstagramMediaChildItem {
  id: string;
  media_type: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
}

export interface InstagramMediaChildrenResponse {
  data: InstagramMediaChildItem[];
}

export interface InstagramMediaItem {
  id: string;
  caption?: string;
  media_type: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  children?: InstagramMediaChildrenResponse;
}

export interface InstagramPagingCursors {
  before?: string;
  after?: string;
}

export interface InstagramPaging {
  cursors?: InstagramPagingCursors;
  next?: string;
  previous?: string;
}

export interface InstagramGraphApiResponse {
  data: InstagramMediaItem[];
  paging?: InstagramPaging;
}

export interface InstagramApiErrorData {
  message: string;
  type: string;
  code: number;
  error_subcode?: number;
  fbtrace_id?: string;
}

export interface InstagramGraphApiErrorResponse {
  error: InstagramApiErrorData;
}

export interface NormalizedInstagramMediaChild {
  id: string;
  mediaType: InstagramMediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink?: string;
}

export interface NormalizedInstagramPost {
  id: string;
  caption: string;
  headline: string;
  tag: string;
  mediaType: InstagramMediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  permalink: string;
  postUrl?: string;
  timestamp: string;
  timeAgo: string;
  likeCount?: number;
  likes?: string | number;
  commentsCount?: number;
  comments?: string | number;
  isCarousel: boolean;
  children?: NormalizedInstagramMediaChild[];
  authorUsername: string;
  authorAvatar?: string;
}

export interface InstagramFeedResponse {
  posts: NormalizedInstagramPost[];
  isFallback: boolean;
  error?: string;
}

export interface InstagramServiceConfig {
  accountId: string;
  accessToken: string;
  apiVersion: string;
  baseUrl: string;
  revalidateSeconds: number;
  username: string;
}
