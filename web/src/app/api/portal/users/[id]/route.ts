import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  try {
    return NextResponse.json(await store.updateUser(id, await req.json().catch(() => ({}))));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const { id } = await params;
  if (id === user.id) return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 });
  try {
    await store.deleteUser(id);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
