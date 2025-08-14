// src/app/api/links/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchLinksByCategory } from '@/lib/sanity';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Missing required query param: category' },
        { status: 400 }
      );
    }

    const links = await fetchLinksByCategory(category);
    return NextResponse.json({ success: true, data: links });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}


