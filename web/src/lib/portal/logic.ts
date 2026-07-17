import type { Doc, Project } from './store';

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
    activeProjects: projects.filter((p) => p.status === 'Active').length,
    unpaidInvoices: docs.filter((d) => d.type === 'Invoice' && d.paymentStatus !== 'Paid').length,
    byCurrency
  };
}
