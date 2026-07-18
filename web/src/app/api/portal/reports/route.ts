import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized } from '@/lib/portal/auth';
import { buildReports } from '@/lib/portal/logic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await getUser())) return unauthorized();
  const [docs, projects, owners] = await Promise.all([
    store.getAllDocs(), store.listProjects(), store.listOwners(),
  ]);
  return NextResponse.json(buildReports(docs, projects, owners));
}
