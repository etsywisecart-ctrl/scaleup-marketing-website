import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';
import { computeTotals, paymentFields } from '@/lib/portal/totals';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await getUser())) return unauthorized();
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();
  const type = searchParams.get('type');
  const projectId = searchParams.get('projectId');
  let docs = await store.getAllDocs();
  if (projectId) docs = docs.filter((d) => d.projectId === projectId);
  if (type === 'Invoice' || type === 'Quotation') docs = docs.filter((d) => d.type === type);
  if (q) docs = docs.filter((d) =>
    String(d.clientName || '').toLowerCase().includes(q) ||
    String(d.ref || '').toLowerCase().includes(q) ||
    String(d.subject || '').toLowerCase().includes(q));
  docs.sort((a, b) => +new Date(String(b.savedAt)) - +new Date(String(a.savedAt)));
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const body = await req.json().catch(() => ({}));
  if (!body.clientName || !String(body.clientName).trim())
    return NextResponse.json({ error: 'clientName is required' }, { status: 400 });
  const totals = computeTotals(body);
  const type = body.type === 'Invoice' ? 'Invoice' : 'Quotation';
  const doc = {
    id: 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    type, ref: body.ref || '', date: body.date || new Date().toISOString().slice(0, 10),
    projectId: body.projectId || '',
    clientName: String(body.clientName).trim(), clientAddress: body.clientAddress || '',
    subject: body.subject || '', greeting: body.greeting || '', bodyText: body.bodyText || '', notes: body.notes || '',
    ...totals, ...paymentFields(body, type, totals.total),
    savedAt: new Date().toISOString(), createdBy: user.username
  };
  const m = /^SUM\/(QUO|INV)\/(\d{4})\/(\d+)$/.exec(doc.ref);
  if (m) await store.commitSeq(type, m[2], parseInt(m[3], 10));
  await store.upsertDoc(doc);
  return NextResponse.json(doc, { status: 201 });
}
