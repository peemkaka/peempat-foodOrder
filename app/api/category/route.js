import { NextResponse } from 'next/server';
import GlobalApi from '@/utils/GlobalApi';

export async function GET() {
  const data = await GlobalApi.GetCategory();
  return NextResponse.json(data);
}