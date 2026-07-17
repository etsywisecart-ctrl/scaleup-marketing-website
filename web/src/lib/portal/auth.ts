/* Signed httpOnly cookie sessions for the portal. HMAC-SHA256 over a small
   JSON payload {uid, exp}. Node runtime (uses crypto). Middleware verifies
   the same token shape with Web Crypto for edge gating. */

import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import * as store from './store';
import type { User } from './store';

export const SESSION_COOKIE = 'portal_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function secret() {
  return process.env.PORTAL_SESSION_SECRET || 'dev-portal-secret-change-me';
}
const b64url = (b: Buffer) => b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s: string) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

export function signSession(uid: string) {
  const payload = { uid, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(crypto.createHmac('sha256', secret()).update(body).digest());
  return `${body}.${sig}`;
}
export function verifySession(token: string | undefined): { uid: string } | null {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = b64url(crypto.createHmac('sha256', secret()).update(body).digest());
  const a = Buffer.from(sig); const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(fromB64url(body).toString('utf8'));
    if (!payload.uid || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return { uid: payload.uid };
  } catch { return null; }
}

/** Read + validate the session, returning the full user (or null). */
export async function getUser(): Promise<User | null> {
  await store.ensureSeed();
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const s = verifySession(token);
  if (!s) return null;
  return store.findById(s.uid);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE
  };
}

export function unauthorized() {
  return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
}
export function forbidden() {
  return NextResponse.json({ error: 'Read-only: this action requires an Owner account.' }, { status: 403 });
}
