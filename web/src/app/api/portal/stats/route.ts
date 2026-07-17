import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized } from '@/lib/portal/auth';
import { buildStats } from '@/lib/portal/logic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await getUser())) return unauthorized();
  const [docs, projects] = await Promise.all([store.getAllDocs(), store.listProjects()]);
  return NextResponse.json(buildStats(docs, projects));
}
