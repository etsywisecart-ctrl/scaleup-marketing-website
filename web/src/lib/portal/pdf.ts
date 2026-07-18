/* PDF generator — ported from the standalone app's pdf/generate.js.
   Renders the Scale Up letterhead and returns a Buffer. */

import PDFDocument from 'pdfkit';
import path from 'path';

const ASSET_DIR = path.join(process.cwd(), 'public', 'portal', 'assets');
const LOGO_PATH = path.join(ASSET_DIR, 'logo.png');
const FONT_PATH = path.join(ASSET_DIR, 'fonts', 'Body.ttf');
const FONT_BOLD_PATH = path.join(ASSET_DIR, 'fonts', 'Body-Bold.ttf');
// Registered font aliases. We embed real TTFs (Liberation Sans, metric-compatible
// with Helvetica) instead of relying on PDFKit's built-in AFM fonts, whose data
// files are not resolvable once the code is bundled by Next.js / on Vercel.
const F = 'Body', FB = 'Body-Bold';

const COLORS = {
  teal900: '#08424b', teal800: '#0b4f57', teal700: '#0f5f68',
  green500: '#2fb08f', ink: '#1c2f2f', inkSoft: '#5c706e',
  line: '#dfe8e6', lineSoft: '#eef3f2'
};
const PAGE_W = 595.28, PAGE_H = 841.89, MARGIN = 50, CONTENT_W = PAGE_W - MARGIN * 2;

function money(n: number, currency: string) {
  const v = Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  if (currency === 'USD') return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return 'PKR ' + v.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function formatDisplayDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(+d)) return iso;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
/* eslint-disable @typescript-eslint/no-explicit-any */
function drawGradientBar(doc: any, x: number, y: number, w: number, h: number) {
  const grad = doc.linearGradient(x, y, x + w, y);
  grad.stop(0, COLORS.teal800).stop(1, COLORS.green500);
  doc.rect(x, y, w, h).fill(grad);
}
function drawHeader(doc: any) {
  let y = MARGIN;
  try { doc.image(LOGO_PATH, MARGIN, y, { height: 34 }); }
  catch { doc.font(FB).fontSize(16).fillColor(COLORS.teal800).text('SCALE UP MARKETING', MARGIN, y); }
  doc.font(FB).fontSize(9.5).fillColor(COLORS.teal800);
  ['+92 328 0814301', 'hello@wescaleupmarketing.com', 'www.wescaleupmarketing.com'].forEach((line, i) => {
    doc.text(line, MARGIN, y + 2 + i * 14.5, { width: CONTENT_W, align: 'right' });
  });
  y += 46;
  drawGradientBar(doc, MARGIN, y, CONTENT_W, 4);
  return y + 22;
}
function drawFooter(doc: any) {
  const h = 46, y = PAGE_H - h;
  doc.rect(0, y, PAGE_W, h).fill(COLORS.teal900);
  doc.font(F).fontSize(8.5).fillColor('#dff2ee')
    .text('+92 328 0814301   |   hello@wescaleupmarketing.com   |   Al Latif Center, Gulberg III, Lahore', MARGIN, y + 17, { width: 330, align: 'left' });
  doc.font(FB).fontSize(8.5).fillColor('#dff2ee')
    .text('L E A R N .  L A U N C H .  S C A L E', MARGIN, y + 17, { width: CONTENT_W, align: 'right' });
}
function ensureSpace(doc: any, needed: number, cursorY: number) {
  if (cursorY + needed > PAGE_H - 60) { doc.addPage({ size: 'A4', margin: 0 }); return drawHeader(doc); }
  return cursorY;
}

export function generateInvoicePdfBuffer(docData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const pdf = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false, bufferPages: true });
    pdf.registerFont(F, FONT_PATH);
    pdf.registerFont(FB, FONT_BOLD_PATH);
    const chunks: Buffer[] = [];
    pdf.on('data', (c: Buffer) => chunks.push(c));
    pdf.on('end', () => resolve(Buffer.concat(chunks)));
    pdf.on('error', reject);

    pdf.addPage({ size: 'A4', margin: 0 });
    let y = drawHeader(pdf);

    pdf.font(FB).fontSize(10).fillColor(COLORS.teal800)
      .text('REF ', MARGIN, y, { continued: true }).font(F).fillColor(COLORS.ink).text(docData.ref || '');
    pdf.font(FB).fillColor(COLORS.teal800)
      .text('DATE ', MARGIN + 280, y, { continued: true }).font(F).fillColor(COLORS.ink).text(formatDisplayDate(docData.date));
    y += 26;

    if (docData.ownerName) {
      const label = 'BUSINESS UNIT';
      pdf.font(FB).fontSize(9).fillColor(COLORS.teal800).text(label, MARGIN, y, { characterSpacing: 1, lineBreak: false });
      const lw = pdf.widthOfString(label, { characterSpacing: 1 });
      const dotX = MARGIN + lw + 14;
      if (/^#[0-9a-fA-F]{6}$/.test(String(docData.ownerColor || ''))) pdf.circle(dotX, y + 4.5, 3.2).fill(docData.ownerColor);
      pdf.font(FB).fontSize(10).fillColor(COLORS.ink).text(docData.ownerName, dotX + 9, y, { lineBreak: false });
      y += 22;
    }

    pdf.font(FB).fontSize(10.5).fillColor(COLORS.ink).text('To,', MARGIN, y); y += 15;
    pdf.font(FB).fontSize(10.5).fillColor(COLORS.ink).text(docData.clientName || '', MARGIN, y, { width: CONTENT_W });
    y = pdf.y + 2;
    if (docData.clientAddress) {
      pdf.font(F).fontSize(10).fillColor(COLORS.inkSoft).text(docData.clientAddress, MARGIN, y, { width: CONTENT_W, lineGap: 3 });
      y = pdf.y;
    }
    y += 14;

    pdf.font(FB).fontSize(9).fillColor(COLORS.teal800).text('SUBJECT', MARGIN, y, { characterSpacing: 1, lineBreak: false });
    const subjLabelW = pdf.widthOfString('SUBJECT', { characterSpacing: 1 });
    pdf.font(FB).fontSize(10).fillColor(COLORS.ink).text(docData.subject || docData.type, MARGIN + subjLabelW + 14, y, { lineBreak: false });
    pdf.moveTo(MARGIN, y + 16).lineTo(PAGE_W - MARGIN, y + 16).lineWidth(0.75).strokeColor(COLORS.line).stroke();
    y += 28;

    if (docData.greeting) { pdf.font(F).fontSize(10).fillColor(COLORS.ink).text(docData.greeting, MARGIN, y, { width: CONTENT_W }); y = pdf.y + 10; }
    if (docData.bodyText) { pdf.font(F).fontSize(10).fillColor(COLORS.ink).text(docData.bodyText, MARGIN, y, { width: CONTENT_W, lineGap: 4 }); y = pdf.y + 14; }

    const items = docData.items || [];
    const cols = [
      { label: '#', w: 26, align: 'left' as const },
      { label: 'Description', w: CONTENT_W - 26 - 50 - 90 - 100, align: 'left' as const },
      { label: 'Qty', w: 50, align: 'right' as const },
      { label: 'Unit Price', w: 90, align: 'right' as const },
      { label: 'Amount', w: 100, align: 'right' as const }
    ];
    const colX = (i: number) => { let x = MARGIN; for (let j = 0; j < i; j++) x += cols[j].w; return x; };
    const drawTableHeader = (yy: number) => {
      pdf.rect(MARGIN, yy, CONTENT_W, 22).fill(COLORS.teal800);
      pdf.font(FB).fontSize(8.5).fillColor('#ffffff');
      cols.forEach((c, i) => pdf.text(c.label.toUpperCase(), colX(i) + 8, yy + 7, { width: c.w - 12, align: c.align }));
      return yy + 22;
    };

    y = ensureSpace(pdf, 60, y); y = drawTableHeader(y);
    pdf.font(F).fontSize(9.5);
    items.forEach((it: any, idx: number) => {
      const descHeight = pdf.heightOfString(it.desc || '', { width: cols[1].w - 16 });
      const rowH = Math.max(22, descHeight + 12);
      y = ensureSpace(pdf, rowH + 30, y);
      pdf.fillColor(COLORS.ink);
      pdf.text(String(idx + 1), colX(0) + 8, y + 6, { width: cols[0].w - 12 });
      pdf.text(it.desc || '', colX(1) + 8, y + 6, { width: cols[1].w - 16 });
      pdf.text(String(it.qty), colX(2) + 8, y + 6, { width: cols[2].w - 12, align: 'right' });
      pdf.text(money(it.price, docData.currency), colX(3) + 8, y + 6, { width: cols[3].w - 12, align: 'right' });
      pdf.text(money(it.amount, docData.currency), colX(4) + 8, y + 6, { width: cols[4].w - 12, align: 'right' });
      pdf.moveTo(MARGIN, y + rowH).lineTo(PAGE_W - MARGIN, y + rowH).lineWidth(0.5).strokeColor(COLORS.lineSoft).stroke();
      y += rowH;
    });

    y += 14; y = ensureSpace(pdf, 120, y);
    const totalsW = 230, totalsX = PAGE_W - MARGIN - totalsW;
    const totalsRow = (label: string, value: string, bold = false) => {
      pdf.font(bold ? FB : F).fontSize(bold ? 12 : 10).fillColor(bold ? COLORS.teal900 : COLORS.ink);
      pdf.text(label, totalsX, y, { width: totalsW * 0.55 });
      pdf.text(value, totalsX + totalsW * 0.5, y, { width: totalsW * 0.5, align: 'right' });
      y += bold ? 20 : 16;
    };
    totalsRow('Subtotal', money(docData.subtotal, docData.currency));
    if (docData.discount > 0) totalsRow('Discount', '-' + money(docData.discount, docData.currency));
    if (docData.tax > 0) totalsRow(`Tax (${docData.taxPct}%)`, money(docData.tax, docData.currency));
    pdf.moveTo(totalsX, y + 2).lineTo(PAGE_W - MARGIN, y + 2).lineWidth(1.2).strokeColor(COLORS.teal800).stroke();
    y += 10;
    totalsRow(docData.type === 'Invoice' ? 'Amount Due' : 'Total', money(docData.total, docData.currency), true);
    y += 14;

    if (docData.notes) {
      y = ensureSpace(pdf, 60, y);
      pdf.font(FB).fontSize(9).fillColor(COLORS.ink).text('Notes:', MARGIN, y); y = pdf.y + 2;
      pdf.font(F).fontSize(9).fillColor(COLORS.inkSoft).text(docData.notes, MARGIN, y, { width: CONTENT_W, lineGap: 3 });
      y = pdf.y + 16;
    }

    y = ensureSpace(pdf, 60, y);
    pdf.font(F).fontSize(10).fillColor(COLORS.ink).text('Warm regards,', MARGIN, y); y = pdf.y + 8;
    pdf.moveTo(MARGIN, y).lineTo(MARGIN + 130, y).lineWidth(2.5).strokeColor(COLORS.green500).stroke(); y += 6;
    pdf.font(FB).fontSize(10.5).fillColor(COLORS.teal900).text('Scale Up Marketing', MARGIN, y);

    const range = pdf.bufferedPageRange();
    for (let i = 0; i < range.count; i++) { pdf.switchToPage(range.start + i); drawFooter(pdf); }
    pdf.end();
  });
}
