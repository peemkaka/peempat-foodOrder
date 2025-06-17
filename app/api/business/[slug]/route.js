import { NextResponse } from 'next/server';
import GlobalApi from '@/utils/GlobalApi';

export async function GET(req, context) {
  const slug = context.params.slug; // ✅ ต้องเข้าถึง params แบบนี้
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }
  try {
    const data = await GlobalApi.GetBusinessDetail(slug);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch business detail' }, { status: 500 });
  }
}