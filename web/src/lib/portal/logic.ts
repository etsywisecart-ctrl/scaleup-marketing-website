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

/* ================= INVESTOR ROLLUPS ================= */
import type { Investor, Investment } from './store';

type IMoney = { invested: number; paidOut: number; accrued: number; due: number };
function iEmptyMoney(): IMoney { return { invested: 0, paidOut: 0, accrued: 0, due: 0 }; }
function yearsBetween(a: number, b: number) { return Math.max(0, (b - a) / (365.25 * 24 * 3600 * 1000)); }

export function investmentRollup(iv: Investment, projById: Map<string, Project>, allDocs: Doc[]) {
  const paidOut = (iv.payouts || []).reduce((s, p) => s + (Number(p.amount) || 0), 0);
  const amount = Number(iv.amount) || 0;
  const start = iv.startDate ? new Date(iv.startDate + 'T00:00:00') : new Date(iv.createdAt);
  const now = new Date();
  const end = iv.endDate ? new Date(iv.endDate + 'T00:00:00') : now;
  const accrualEnd = end < now ? end : now;
  let expectedAnnual = 0, expectedAccrued = 0, profitBase = 0;
  if (iv.planType === 'fixed') {
    expectedAnnual = amount * (Number(iv.rate) || 0) / 100;
    expectedAccrued = expectedAnnual * yearsBetween(+start, +accrualEnd);
  } else {
    // profit-share: a % of the linked project's realised (paid) invoice revenue
    if (iv.projectId && projById.has(iv.projectId)) {
      profitBase = allDocs
        .filter((d) => d.projectId === iv.projectId && d.type === 'Invoice' && (d.currency === 'USD' ? 'USD' : 'PKR') === iv.currency)
        .reduce((s, d) => s + (Number(d.amountPaid) || 0), 0);
      expectedAccrued = profitBase * (Number(iv.rate) || 0) / 100;
    }
  }
  const due = Math.max(expectedAccrued - paidOut, 0);
  const project = iv.projectId ? projById.get(iv.projectId) : undefined;
  return {
    ...iv, paidOut, expectedAnnual, expectedAccrued, profitBase, due,
    roiPct: amount > 0 ? (paidOut / amount) * 100 : 0,
    projectName: project ? project.name : '',
    lastPayout: (iv.payouts || []).map((p) => p.date).sort().slice(-1)[0] || '',
  };
}

export function investorRollup(investor: Investor, rolled: ReturnType<typeof investmentRollup>[]) {
  const mine = rolled.filter((iv) => iv.investorId === investor.id);
  const byCurrency: Record<string, IMoney> = {};
  mine.forEach((iv) => {
    const c = iv.currency === 'USD' ? 'USD' : 'PKR';
    byCurrency[c] = byCurrency[c] || iEmptyMoney();
    byCurrency[c].invested += Number(iv.amount) || 0;
    byCurrency[c].paidOut += iv.paidOut;
    byCurrency[c].accrued += iv.expectedAccrued;
    byCurrency[c].due += iv.due;
  });
  return {
    ...investor,
    investmentCount: mine.length,
    activeCount: mine.filter((i) => i.status === 'Active').length,
    byCurrency,
  };
}

export function buildInvestorReport(investors: Investor[], investments: Investment[], projects: Project[], docs: Doc[]) {
  const projById = new Map(projects.map((p) => [p.id, p]));
  const rolled = investments.map((iv) => investmentRollup(iv, projById, docs));
  const investorsRolled = investors.map((inv) => investorRollup(inv, rolled));
  const byCurrency: Record<string, IMoney & { count: number }> = {};
  rolled.forEach((iv) => {
    const c = iv.currency === 'USD' ? 'USD' : 'PKR';
    byCurrency[c] = byCurrency[c] || { ...iEmptyMoney(), count: 0 };
    byCurrency[c].invested += Number(iv.amount) || 0;
    byCurrency[c].paidOut += iv.paidOut;
    byCurrency[c].accrued += iv.expectedAccrued;
    byCurrency[c].due += iv.due;
    byCurrency[c].count += 1;
  });
  return {
    investorCount: investors.length,
    investmentCount: investments.length,
    activeCount: investments.filter((i) => i.status === 'Active').length,
    currencies: Array.from(new Set(rolled.map((iv) => (iv.currency === 'USD' ? 'USD' : 'PKR')))).sort(),
    byCurrency,
    investors: investorsRolled,
    investments: rolled,
  };
}
