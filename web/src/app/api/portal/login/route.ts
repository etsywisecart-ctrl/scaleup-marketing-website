import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { signSession, SESSION_COOKIE, sessionCookieOptions } from '@/lib/portal/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  await store.ensureSeed();
  const { username, password } = await req.json().catch(() => ({}));
  const user = await store.authenticate(username, password);
  if (!user) return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
  const res = NextResponse.json({ ok: true, user: store.publicUser(user) });
  res.cookies.set(SESSION_COOKIE, signSession(user.id), sessionCookieOptions());
  return res;
}
