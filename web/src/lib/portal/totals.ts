// Shared money logic for portal documents (mirrors the standalone app).

export type Item = { desc: string; qty: number; price: number; amount: number };

export function computeTotals(payload: Record<string, unknown>) {
  const rawItems = (payload.items as Array<Record<string, unknown>>) || [];
  const items: Item[] = rawItems.map((it) => {
    const qty = Number(it.qty) || 0;
    const price = Number(it.price) || 0;
    return { desc: String(it.desc || ''), qty, price, amount: qty * price };
  });
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const discVal = Number(payload.discVal) || 0;
  const discType = payload.discType === 'flat' ? 'flat' : 'pct';
  const discount = discType === 'pct' ? subtotal * (discVal / 100) : discVal;
  const taxPct = Number(payload.taxPct) || 0;
  const taxable = Math.max(subtotal - discount, 0);
  const tax = taxable * (taxPct / 100);
  const total = taxable + tax;
  const currency = payload.currency === 'USD' ? 'USD' : 'PKR';
  return { items, subtotal, discVal, discType, discount, taxPct, tax, total, currency };
}

// Payment status is only meaningful for invoices; derived from amountPaid.
export function paymentFields(payload: Record<string, unknown>, type: string, total: number) {
  if (type !== 'Invoice') return { amountPaid: 0, paymentStatus: 'N/A' };
  const amountPaid = Math.max(0, Number(payload.amountPaid) || 0);
  let paymentStatus = 'Unpaid';
  if (amountPaid >= total - 0.005 && total > 0) paymentStatus = 'Paid';
  else if (amountPaid > 0) paymentStatus = 'Partial';
  return { amountPaid, paymentStatus };
}
