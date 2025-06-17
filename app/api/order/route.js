import { NextResponse } from 'next/server';
import GlobalApi from '@/utils/GlobalApi';

// POST /api/order (สร้างออเดอร์ใหม่)
export async function POST(req) {
  try {
    const body = await req.json();
    const data = await GlobalApi.CreateNewOrder(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

// PATCH /api/order (เพิ่ม order item และลบ cart หลังจ่ายเงิน)
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { name, price, id, email } = body;
    if (!name || !price || !id || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const data = await GlobalApi.UpdateOrderToAddOrderItems(name, price, id, email);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

// DELETE /api/order?email=xxx (ลบ cart หลังจ่ายเงิน)
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }
  try {
    const data = await GlobalApi.DeleteCartAfterPayment(email);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete cart after payment' }, { status: 500 });
  }
}

// GET /api/order?email=xxx (ดึงออเดอร์ของ user)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }
  try {
    const data = await GlobalApi.GetUserOrders(email);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user orders' }, { status: 500 });
  }
}