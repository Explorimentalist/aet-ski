// src/app/api/testimonials/route.ts
import { NextResponse } from 'next/server';
import { fetchTestimonials } from '@/lib/sanity';

export async function GET() {
  try {
    const testimonials = await fetchTestimonials();
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}


