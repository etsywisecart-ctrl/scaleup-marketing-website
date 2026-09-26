import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized, forbidden } from '@/lib/portal/auth';
import { buildInvestorReport } from '@/lib/portal/logic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  const [investors, investments, projects, docs] = await Promise.all([
    store.listInvestors(), store.listInvestments(), store.listProjects(), store.getAllDocs(),
  ]);
  return NextResponse.json(buildInvestorReport(investors, investments, projects, docs));
}

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return unauthorized();
  if (user.role !== 'owner') return forbidden();
  try {
    return NextResponse.json(await store.createInvestor(await req.json().catch(() => ({}))), { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
