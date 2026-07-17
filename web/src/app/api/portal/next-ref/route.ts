import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized } from '@/lib/portal/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await getUser())) return unauthorized();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') === 'Invoice' ? 'Invoice' : 'Quotation';
  const year = searchParams.get('year') || String(new Date().getFullYear());
  const n = await store.peekNextSeq(type, year);
  const prefix = type === 'Invoice' ? 'INV' : 'QUO';
  return NextResponse.json({ ref: `SUM/${prefix}/${year}/${String(n).padStart(3, '0')}`, n, year, type });
}
