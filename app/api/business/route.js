import { NextRequest, NextResponse } from 'next/server';
import GlobalApi from '@/utils/GlobalApi';

// GET /api/business?category=xxx
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'seafood';
  try {
    const data = await GlobalApi.GetBusiness(category);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 });
  }
}