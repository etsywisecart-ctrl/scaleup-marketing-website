import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';
import { paymentFields } from '@/lib/portal/totals';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  const doc = await store.getDoc(id);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (doc.type !== 'Invoice') return NextResponse.json({ error: 'Only invoices track payments' }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  const pf = paymentFields({ amountPaid: body.amountPaid }, 'Invoice', Number(doc.total) || 0);
  const updated = { ...doc, ...pf, updatedAt: new Date().toISOString() };
  await store.upsertDoc(updated);
  return NextResponse.json(updated);
}
