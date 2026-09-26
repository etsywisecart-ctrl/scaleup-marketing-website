import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { signSession, SESSION_COOKIE, sessionCookieOptions } from '@/lib/portal/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await store.ensureSeed();
    const { username, password } = await req.json().catch(() => ({}));
    const user = await store.authenticate(username, password);
    if (!user) return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
    const res = NextResponse.json({ ok: true, user: store.publicUser(user) });
    res.cookies.set(SESSION_COOKIE, signSession(user.id), sessionCookieOptions());
    return res;
  } catch (e) {
    // On serverless hosts the filesystem is read-only, so with no database
    // configured the store cannot seed or persist. Surface a clear message.
    console.error('portal login failed:', e);
    return NextResponse.json(
      { error: 'Portal storage is not configured. Connect a Postgres database (set POSTGRES_URL or DATABASE_URL) and redeploy.' },
      { status: 503 }
    );
  }
}
