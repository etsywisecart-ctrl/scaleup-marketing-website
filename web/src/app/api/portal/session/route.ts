import { NextResponse } from 'next/server';
import { getUser } from '@/lib/portal/auth';
import { publicUser } from '@/lib/portal/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ loggedIn: false });
  return NextResponse.json({ loggedIn: true, user: publicUser(user) });
}
