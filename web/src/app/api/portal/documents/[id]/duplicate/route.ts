import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  const existing = await store.getDoc(id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const year = new Date().getFullYear();
  const n = await store.peekNextSeq(String(existing.type), year);
  const prefix = existing.type === 'Invoice' ? 'INV' : 'QUO';
  const ref = `SUM/${prefix}/${year}/${String(n).padStart(3, '0')}`;
  await store.commitSeq(String(existing.type), year, n);
  const copy: store.Doc = {
    ...existing,
    id: 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    ref, date: new Date().toISOString().slice(0, 10),
    amountPaid: 0, paymentStatus: existing.type === 'Invoice' ? 'Unpaid' : 'N/A',
    savedAt: new Date().toISOString()
  };
  delete (copy as Record<string, unknown>).updatedAt;
  await store.upsertDoc(copy);
  return NextResponse.json(copy, { status: 201 });
}
