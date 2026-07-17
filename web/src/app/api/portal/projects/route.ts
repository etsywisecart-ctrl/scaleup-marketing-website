import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';
import { projectRollup } from '@/lib/portal/logic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await getUser())) return unauthorized();
  const [projects, docs] = await Promise.all([store.listProjects(), store.getAllDocs()]);
  return NextResponse.json(projects.map((p) => projectRollup(p, docs)));
}

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  try {
    const project = await store.createProject(await req.json().catch(() => ({})));
    return NextResponse.json(project, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
