import { NextResponse } from 'next/server';
import * as store from '@/lib/portal/store';
import { getUser, unauthorized } from '@/lib/portal/auth';
import { generateInvoicePdfBuffer } from '@/lib/portal/pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getUser())) return unauthorized();
  const { id } = await params;
  const doc = await store.getDoc(id);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const buf = await generateInvoicePdfBuffer(doc);
  const filename = `${doc.type}-${String(doc.ref || doc.id).replace(/[\/\\]/g, '-')}.pdf`;
  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`
    }
  });
}
