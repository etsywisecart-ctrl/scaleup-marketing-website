import type { Doc, Project, BusinessOwner } from './store';

export function projectRollup(project: Project, allDocs: Doc[]) {
  const docs = allDocs.filter((d) => d.projectId === project.id);
  let quoted = 0, invoiced = 0, paid = 0;
  docs.forEach((d) => {
    if (d.type === 'Quotation') quoted += Number(d.total) || 0;
    else { invoiced += Number(d.total) || 0; paid += Number(d.amountPaid) || 0; }
  });
  return {
    ...project,
    docCount: docs.length,
    invoiceCount: docs.filter((d) => d.type === 'Invoice').length,
    quotationCount: docs.filter((d) => d.type === 'Quotation').length,
    quoted, invoiced, paid, outstanding: Math.max(invoiced - paid, 0)
  };
}

export function buildStats(docs: Doc[], projects: Project[]) {
  const byCurrency: Record<string, { invoiced: number; paid: number; outstanding: number; quoted: number }> = {};
  const bump = (c: string, field: 'invoiced' | 'paid' | 'outstanding' | 'quoted', val: number) => {
    c = c === 'USD' ? 'USD' : 'PKR';
    byCurrency[c] = byCurrency[c] || { invoiced: 0, paid: 0, outstanding: 0, quoted: 0 };
    byCurrency[c][field] += val;
  };
  docs.forEach((d) => {
    const c = String(d.currency);
    if (d.type === 'Invoice') {
      bump(c, 'invoiced', Number(d.total) || 0);
      bump(c, 'paid', Number(d.amountPaid) || 0);
      bump(c, 'outstanding', Math.max((Number(d.total) || 0) - (Number(d.amountPaid) || 0), 0));
    } else bump(c, 'quoted', Number(d.total) || 0);
  });
  return {
    count: docs.length,
    quotations: docs.filter((d) => d.type === 'Quotation').length,
    invoices: docs.filter((d) => d.type === 'Invoice').length,
    projects: projects.length,
    activeProjects: projects.filter((p) => p.status === 'Active' && !p.archived).length,
    unpaidInvoices: docs.filter((d) => d.type === 'Invoice' && d.paymentStatus !== 'Paid').length,
    byCurrency
  };
}

/* ---------- Analytics / reporting ---------- */
type Money = { invoiced: number; paid: number; outstanding: number; quoted: number };
type ByCurrency = Record<string, Money>;

function emptyMoney(): Money { return { invoiced: 0, paid: 0, outstanding: 0, quoted: 0 }; }
function accumulate(bucket: ByCurrency, d: Doc) {
  const c = d.currency === 'USD' ? 'USD' : 'PKR';
  bucket[c] = bucket[c] || emptyMoney();
  const total = Number(d.total) || 0;
  if (d.type === 'Invoice') {
    bucket[c].invoiced += total;
    bucket[c].paid += Number(d.amountPaid) || 0;
    bucket[c].outstanding += Math.max(total - (Number(d.amountPaid) || 0), 0);
  } else {
    bucket[c].quoted += total;
  }
}

/* Resolve the owning business unit for a document: explicit owner on the doc,
   else inherited from its project. Returns '' when neither is set. */
function docOwnerId(d: Doc, projById: Map<string, Project>): string {
  if (d.ownerId) return String(d.ownerId);
  const p = d.projectId ? projById.get(String(d.projectId)) : undefined;
  return p ? p.ownerId || '' : '';
}

export function buildReports(docs: Doc[], projects: Project[], owners: BusinessOwner[]) {
  const projById = new Map(projects.map((p) => [p.id, p]));
  const ownerById = new Map(owners.map((o) => [o.id, o]));
  const currencies = new Set<string>();
  docs.forEach((d) => currencies.add(d.currency === 'USD' ? 'USD' : 'PKR'));

  // Revenue per business owner
  const ownerBuckets = new Map<string, ByCurrency>();
  // Revenue per category (Academy / Services / Other)
  const catBuckets: Record<string, ByCurrency> = { Academy: {}, Services: {}, Other: {} };
  // Revenue per project
  const projBuckets = new Map<string, ByCurrency>();
  // Time series
  const monthly: Record<string, Record<string, { invoiced: number; paid: number }>> = {}; // ym -> currency -> {}
  const yearly: Record<string, Record<string, { invoiced: number; paid: number }>> = {};

  docs.forEach((d) => {
    const oid = docOwnerId(d, projById);
    if (oid) {
      if (!ownerBuckets.has(oid)) ownerBuckets.set(oid, {});
      accumulate(ownerBuckets.get(oid)!, d);
      const owner = ownerById.get(oid);
      const cat = owner ? owner.category : 'Other';
      accumulate(catBuckets[cat] || (catBuckets[cat] = {}), d);
    }
    const pid = d.projectId ? String(d.projectId) : '';
    if (pid && projById.has(pid)) {
      if (!projBuckets.has(pid)) projBuckets.set(pid, {});
      accumulate(projBuckets.get(pid)!, d);
    }
    // time series (invoices only)
    if (d.type === 'Invoice') {
      const iso = String(d.date || d.savedAt || '').slice(0, 10);
      const ym = iso.slice(0, 7), yr = iso.slice(0, 4);
      const c = d.currency === 'USD' ? 'USD' : 'PKR';
      if (ym) {
        monthly[ym] = monthly[ym] || {};
        monthly[ym][c] = monthly[ym][c] || { invoiced: 0, paid: 0 };
        monthly[ym][c].invoiced += Number(d.total) || 0;
        monthly[ym][c].paid += Number(d.amountPaid) || 0;
      }
      if (yr) {
        yearly[yr] = yearly[yr] || {};
        yearly[yr][c] = yearly[yr][c] || { invoiced: 0, paid: 0 };
        yearly[yr][c].invoiced += Number(d.total) || 0;
        yearly[yr][c].paid += Number(d.amountPaid) || 0;
      }
    }
  });

  const byOwner = owners.map((o) => ({
    id: o.id, name: o.name, category: o.category, color: o.color, active: o.active,
    byCurrency: ownerBuckets.get(o.id) || {},
  }));
  const byCategory = (['Academy', 'Services', 'Other'] as const).map((cat) => ({
    category: cat, byCurrency: catBuckets[cat] || {},
  }));
  const byProject = projects.map((p) => ({
    id: p.id, name: p.name, ownerId: p.ownerId,
    ownerName: p.ownerId && ownerById.get(p.ownerId) ? ownerById.get(p.ownerId)!.name : '',
    ownerColor: p.ownerId && ownerById.get(p.ownerId) ? ownerById.get(p.ownerId)!.color : '#94a3b8',
    byCurrency: projBuckets.get(p.id) || {},
  }));

  const monthlySeries = Object.keys(monthly).sort().map((ym) => ({ period: ym, byCurrency: monthly[ym] }));
  const yearlySeries = Object.keys(yearly).sort().map((yr) => ({ period: yr, byCurrency: yearly[yr] }));

  return {
    currencies: Array.from(currencies).sort(),
    byOwner, byCategory, byProject,
    monthly: monthlySeries, yearly: yearlySeries,
  };
}
