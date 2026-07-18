import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';
import { computeTotals, paymentFields } from '@/lib/portal/totals';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getUser())) return unauthorized();
  const { id } = await params;
  const doc = await store.getDoc(id);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  const existing = await store.getDoc(id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  if (!body.clientName || !String(body.clientName).trim())
    return NextResponse.json({ error: 'clientName is required' }, { status: 400 });
  const totals = computeTotals(body);
  const type = body.type === 'Invoice' ? 'Invoice' : 'Quotation';
  const projectId = body.projectId != null ? body.projectId : (existing.projectId || '');
  const ownerId = await store.resolveOwnerId(body.ownerId, projectId);
  const doc = {
    ...existing, type, ref: body.ref || existing.ref, date: body.date || existing.date,
    projectId, ownerId,
    clientName: String(body.clientName).trim(), clientAddress: body.clientAddress || '',
    subject: body.subject || '', greeting: body.greeting || '', bodyText: body.bodyText || '', notes: body.notes || '',
    ...totals, ...paymentFields(body, type, totals.total),
    updatedAt: new Date().toISOString()
  };
  const m = /^SUM\/(QUO|INV)\/(\d{4})\/(\d+)$/.exec(String(doc.ref));
  if (m) await store.commitSeq(type, m[2], parseInt(m[3], 10));
  await store.upsertDoc(doc);
  return NextResponse.json(doc);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  await store.deleteDoc(id);
  return new NextResponse(null, { status: 204 });
}
