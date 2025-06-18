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

// DELETE /api/review/[slug]?id=xxx (ลบคอมเม้นตาม id)
export async function DELETE(req, context) {
  const { searchParams } = new URL(req.url);
  const reviewId = searchParams.get("id");
  if (!reviewId) {
    return NextResponse.json({ error: 'Missing review id' }, { status: 400 });
  }
  try {
    const data = await GlobalApi.DeleteReviewById(reviewId);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}

// PATCH /api/review/[slug]?id=xxx (อัพเดต/แก้ไขคอมเม้นตาม id)
export async function PATCH(req, context) {
  const { searchParams } = new URL(req.url);
  const reviewId = searchParams.get("id");
  if (!reviewId) {
    return NextResponse.json({ error: 'Missing review id' }, { status: 400 });
  }
  try {
    const body = await req.json();
    const { reviewText, star } = body;
    const data = await GlobalApi.UpdateReviewById(reviewId, { reviewText, star });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}