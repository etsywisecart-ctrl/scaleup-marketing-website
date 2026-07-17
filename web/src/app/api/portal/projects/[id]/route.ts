import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';
import { projectRollup } from '@/lib/portal/logic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getUser())) return unauthorized();
  const { id } = await params;
  const p = await store.getProject(id);
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const docs = await store.getAllDocs();
  const documents = docs.filter((d) => d.projectId === id)
    .sort((a, b) => +new Date(String(b.savedAt)) - +new Date(String(a.savedAt)));
  return NextResponse.json({ project: projectRollup(p, docs), documents });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  try {
    return NextResponse.json(await store.updateProject(id, await req.json().catch(() => ({}))));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  await store.removeProject(id);
  return new NextResponse(null, { status: 204 });
}
