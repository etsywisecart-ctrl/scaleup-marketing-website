import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';
import { investmentRollup } from '@/lib/portal/logic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  const investor = await store.getInvestor(id);
  if (!investor) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [investments, projects, docs] = await Promise.all([
    store.listInvestments(id), store.listProjects(), store.getAllDocs(),
  ]);
  const projById = new Map(projects.map((p) => [p.id, p]));
  const rolled = investments.map((iv) => investmentRollup(iv, projById, docs));
  return NextResponse.json({ investor, investments: rolled });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  try {
    return NextResponse.json(await store.updateInvestor(id, await req.json().catch(() => ({}))));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  await store.removeInvestor(id);
  return new NextResponse(null, { status: 204 });
}
