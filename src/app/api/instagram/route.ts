import { NextResponse } from "next/server";
import { getInstagramFeed } from "@/services/instagram.service";
import type { InstagramFeedResponse } from "@/types/instagram";

export async function GET(request: Request): Promise<NextResponse<InstagramFeedResponse>> {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 8;

  const feed = await getInstagramFeed(isNaN(limit) ? 8 : limit);

  return NextResponse.json<InstagramFeedResponse>(feed, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
