import { NextResponse } from 'next/server';
import { getTwitterFeed } from '@/lib/twitter';
import type { TwitterApiResponse } from '@/types/twitter';

export async function GET(): Promise<NextResponse<TwitterApiResponse>> {
  const feed = await getTwitterFeed();
  return NextResponse.json<TwitterApiResponse>(feed);
}

