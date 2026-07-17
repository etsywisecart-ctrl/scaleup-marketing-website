import { NextRequest, NextResponse } from 'next/server';

/* Gate the hidden /portal area at the edge: no valid session cookie ->
   bounce to the login page. Also mark every portal response noindex so it
   can never surface in search. The public marketing site is untouched. */

const SESSION_COOKIE = 'portal_session';

function b64urlToBytes(s: string): Uint8Array {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function bytesToB64url(bytes: Uint8Array): string {
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function validSession(token: string | undefined): Promise<boolean> {
  if (!token || !token.includes('.')) return false;
  const [body, sig] = token.split('.');
  try {
    const secret = process.env.PORTAL_SESSION_SECRET || 'dev-portal-secret-change-me';
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
    const expected = bytesToB64url(new Uint8Array(sigBuf));
    if (expected !== sig) return false;
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(body)));
    return !!payload.uid && payload.exp >= Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

const PUBLIC_PREFIXES = ['/portal/login', '/portal/app.js', '/portal/styles.css', '/portal/assets'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const noindex = (res: NextResponse) => {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  };

  // Assets & the login page are always reachable
  if (PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/') || pathname === p + '.html')) {
    return noindex(NextResponse.next());
  }

  // Protected portal pages require a valid session
  const ok = await validSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = '/portal/login';
    url.search = '';
    return noindex(NextResponse.redirect(url));
  }
  return noindex(NextResponse.next());
}

export const config = {
  matcher: ['/portal', '/portal/', '/portal/index.html'],
};
