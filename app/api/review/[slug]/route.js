import { NextResponse } from 'next/server';
import GlobalApi from '@/utils/GlobalApi';

// GET /api/review/[slug] (ดึงรีวิวร้านอาหารตาม slug)
export async function GET(req, context) {
  const slug = context.params.slug;
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }
  try {
    const data = await GlobalApi.GetRestaurantReviews(slug);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST /api/review (เพิ่มรีวิวใหม่)
export async function POST(req) {
  try {
    const body = await req.json();
    const data = await GlobalApi.AddNewReview(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}