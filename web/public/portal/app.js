/* ================= STATE ================= */
let ME = null;                 // { id, username, name, role }
let currentDocType = 'Quotation';
let editingId = null;
let itemRowId = 0;
let PROJECTS = [];             // cached projects for selectors / name lookup
let listFilter = '';           // '', 'Quotation', 'Invoice'
let projEditingId = null;
let userEditingId = null;

const $ = (id) => document.getElementById(id);
function isOwner(){ return ME && ME.role === 'owner'; }

/* ================= MONEY / DATES ================= */
function fmtMoney(n, currency){
  const v = Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  if(currency === 'USD') return '$' + v.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  return 'PKR ' + v.toLocaleString('en-PK', {minimumFractionDigits:2, maximumFractionDigits:2});
}
function currentCurrency(){ return $('currencySelect').value || 'PKR'; }
function formatDisplayDate(iso){
  if(!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if(isNaN(d)) return iso;
  return d.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'});
}
function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function projName(id){ const p = PROJECTS.find(x=>x.id===id); return p ? p.name : ''; }

/* ================= API ================= */
async function api(path, opts) {
  const res = await fetch(path, Object.assign({ headers: { 'Content-Type': 'application/json' } }, opts));
  if (res.status === 401) { window.location.href = '/portal/login'; throw new Error('Not logged in'); }
  if (res.status === 403) { let m='Read-only account'; try{ m=(await res.json()).error||m; }catch(e){} throw new Error(m); }
  if (!res.ok) { let msg='Request failed'; try{ msg=(await res.json()).error||msg; }catch(e){} throw new Error(msg); }
  if (res.status === 204) return null;
  return res.json();
}

/* ================= SESSION / ROLE ================= */
async function bootstrap(){
  let session;
  try { session = await api('/api/portal/session'); } catch(e){ window.location.href='/portal/login'; return; }
  if(!session.loggedIn){ window.location.href='/portal/login'; return; }
  ME = session.user;
  $('ucName').textContent = ME.name || ME.username;
  const rb = $('ucRole'); rb.textContent = ME.role; rb.className = 'role-badge ' + ME.role;
  document.body.classList.add(isOwner() ? 'role-owner' : 'role-viewer');
  await refreshProjectsCache();
  renderDashboard();
}

$('logoutBtn').addEventListener('click', async ()=>{
  try{ await api('/api/portal/logout', { method:'POST' }); }catch(e){}
  window.location.href = '/portal/login';
});

/* ================= TABS ================= */
document.querySelectorAll('.tab-btn[data-tab]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    $('view-'+tab).classList.add('active');
    if(tab === 'dashboard') renderDashboard();
    if(tab === 'projects') renderProjects();
    if(tab === 'list') renderList();
    if(tab === 'users') renderUsers();
  });
});
function goTab(tab){ document.querySelector(`.tab-btn[data-tab="${tab}"]`).click(); }

/* ================= DASHBOARD ================= */
async function renderDashboard(){
  let stats={}, docs=[];
  try{ stats = await api('/api/portal/stats'); }catch(e){}
  try{ docs = await api('/api/portal/documents'); }catch(e){}
  const cards = [
    { label:'Projects', value: stats.projects||0, sub:(stats.activeProjects||0)+' active' },
    { label:'Quotations', value: stats.quotations||0 },
    { label:'Invoices', value: stats.invoices||0, sub:(stats.unpaidInvoices||0)+' unpaid' },
    { label:'Documents', value: stats.count||0 },
  ];
  $('dashCards').innerHTML = cards.map(c=>`
    <div class="dash-stat"><div class="ds-value">${c.value}</div><div class="ds-label">${c.label}</div>${c.sub?`<div class="ds-sub">${c.sub}</div>`:''}</div>`).join('');

  const byC = stats.byCurrency || {};
  const rows = Object.keys(byC).map(c=>{
    const v = byC[c];
    return `<div class="money-row">
      <span class="mr-cur">${c}</span>
      <span class="mr-cell"><b>${fmtMoney(v.invoiced,c)}</b><em>invoiced</em></span>
      <span class="mr-cell"><b style="color:var(--green-500)">${fmtMoney(v.paid,c)}</b><em>paid</em></span>
      <span class="mr-cell"><b style="color:var(--amber)">${fmtMoney(v.outstanding,c)}</b><em>outstanding</em></span>
    </div>`;
  }).join('');
  $('dashOutstanding').innerHTML = rows || '<div class="muted-note">No invoices yet.</div>';

  $('dashRecent').innerHTML = docs.slice(0,6).map(d=>`
    <div class="mini-row" data-id="${d.id}">
      <span class="badge ${d.type==='Invoice'?'invoice':'quotation'}">${d.type}</span>
      <span class="mr-ref">${escapeHtml(d.ref||'')}</span>
      <span class="mr-client">${escapeHtml(d.clientName||'')}</span>
      <span class="mr-total">${fmtMoney(d.total||0, d.currency)}</span>
    </div>`).join('') || '<div class="muted-note">No documents yet.</div>';
  $('dashRecent').querySelectorAll('.mini-row').forEach(r=>r.addEventListener('click', ()=>{
    const d = docs.find(x=>x.id===r.dataset.id); if(d) viewDoc(d);
  }));
}

/* ================= PROJECTS ================= */
async function refreshProjectsCache(){
  try{ PROJECTS = await api('/api/portal/projects'); }catch(e){ PROJECTS = []; }
  const sel = $('projectSelect');
  const cur = sel.value;
  sel.innerHTML = '<option value="">— No project —</option>' +
    PROJECTS.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('');
  sel.value = cur;
}

async function renderProjects(){
  await refreshProjectsCache();
  const q = ($('projSearch').value||'').toLowerCase().trim();
  let list = PROJECTS;
  if(q) list = list.filter(p => (p.name+' '+p.client).toLowerCase().includes(q));
  const grid = $('projectGrid');
  $('projEmpty').style.display = list.length ? 'none' : 'block';
  grid.innerHTML = list.map(p=>{
    const pct = p.invoiced>0 ? Math.round(p.paid/p.invoiced*100) : 0;
    return `<div class="project-card" data-id="${p.id}">
      <div class="pc-top">
        <div><div class="pc-name">${escapeHtml(p.name)}</div><div class="pc-client">${escapeHtml(p.client||'—')}</div></div>
        <span class="status-badge s-${p.status.replace(/\s/g,'')}">${p.status}</span>
      </div>
      <div class="pc-figures">
        <div><span>Invoiced</span><b>${fmtMoney(p.invoiced, p.currency)}</b></div>
        <div><span>Paid</span><b style="color:var(--green-500)">${fmtMoney(p.paid, p.currency)}</b></div>
        <div><span>Outstanding</span><b style="color:var(--amber)">${fmtMoney(p.outstanding, p.currency)}</b></div>
      </div>
      <div class="pc-bar"><div class="pc-bar-fill" style="width:${pct}%"></div></div>
      <div class="pc-foot"><span>${p.docCount} document${p.docCount===1?'':'s'}</span><span>${pct}% collected</span></div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.project-card').forEach(c=>c.addEventListener('click', ()=>openProjectDetail(c.dataset.id)));
}
$('projSearch').addEventListener('input', renderProjects);

async function openProjectDetail(id){
  let data;
  try{ data = await api('/api/portal/projects/'+id); }catch(e){ showToast(e.message); return; }
  const p = data.project;
  $('pd-name').textContent = p.name;
  $('pd-client').textContent = (p.client||'') + '  ·  ' + p.status + (p.value ? '  ·  Budget ' + fmtMoney(p.value, p.currency) : '');
  const stats = [
    ['Quoted', fmtMoney(p.quoted, p.currency), ''],
    ['Invoiced', fmtMoney(p.invoiced, p.currency), ''],
    ['Paid', fmtMoney(p.paid, p.currency), 'green'],
    ['Outstanding', fmtMoney(p.outstanding, p.currency), 'amber'],
  ];
  $('pd-stats').innerHTML = stats.map(s=>`<div class="pd-stat"><div class="pds-label">${s[0]}</div><div class="pds-value ${s[2]}">${s[1]}</div></div>`).join('') +
    (isOwner()?`<div class="pd-actions"><button class="btn btn-sm" id="pdEdit">Edit</button><button class="btn btn-sm btn-danger" id="pdDelete">Delete</button></div>`:'');
  const pct = p.invoiced>0 ? Math.round(p.paid/p.invoiced*100) : 0;
  $('pd-bar-fill').style.width = pct + '%';
  $('pd-bar-legend').textContent = `${pct}% collected · ${fmtMoney(p.paid,p.currency)} of ${fmtMoney(p.invoiced,p.currency)}`;

  const tbody = $('pd-docs');
  $('pd-empty').style.display = data.documents.length ? 'none' : 'block';
  tbody.innerHTML = data.documents.map(d=>`
    <tr>
      <td>${escapeHtml(d.ref||'')}</td>
      <td><span class="badge ${d.type==='Invoice'?'invoice':'quotation'}">${d.type}</span></td>
      <td>${formatDisplayDate(d.date)}</td>
      <td style="text-align:right; font-weight:600;">${fmtMoney(d.total||0, d.currency)}</td>
      <td style="text-align:center;">${paymentBadge(d)}</td>
      <td style="text-align:center;"><button class="icon-btn" data-id="${d.id}" title="View">👁</button></td>
    </tr>`).join('');
  tbody.querySelectorAll('.icon-btn').forEach(b=>b.addEventListener('click', ()=>{
    const d = data.documents.find(x=>x.id===b.dataset.id);
    $('projectDetailOverlay').classList.remove('active');
    if(d) viewDoc(d);
  }));
  if(isOwner()){
    $('pdEdit').addEventListener('click', ()=>{ $('projectDetailOverlay').classList.remove('active'); openProjectForm(p); });
    $('pdDelete').addEventListener('click', ()=>askConfirm(`Delete project “${p.name}”? Its documents are kept but unlinked.`, async ()=>{
      try{ await api('/api/portal/projects/'+id, {method:'DELETE'}); showToast('Project deleted.'); $('projectDetailOverlay').classList.remove('active'); renderProjects(); }
      catch(e){ showToast(e.message); }
    }));
  }
  $('projectDetailOverlay').classList.add('active');
}
$('pdClose').addEventListener('click', ()=>$('projectDetailOverlay').classList.remove('active'));

function paymentBadge(d){
  if(d.type !== 'Invoice') return '<span class="pay-badge na">—</span>';
  const s = d.paymentStatus || 'Unpaid';
  const cls = s==='Paid'?'paid':(s==='Partial'?'partial':'unpaid');
  return `<span class="pay-badge ${cls}">${s}</span>`;
}

/* ---- project create/edit modal ---- */
function openProjectForm(p){
  projEditingId = p ? p.id : null;
  $('pf-title').textContent = p ? 'Edit Project' : 'New Project';
  $('pf-name').value = p ? p.name : '';
  $('pf-client').value = p ? (p.client||'') : '';
  $('pf-currency').value = p ? p.currency : 'PKR';
  $('pf-value').value = p ? (p.value||0) : 0;
  $('pf-status').value = p ? p.status : 'Active';
  $('pf-notes').value = p ? (p.notes||'') : '';
  $('projectFormOverlay').classList.add('active');
}
$('newProjectBtn').addEventListener('click', ()=>openProjectForm(null));
$('pfClose').addEventListener('click', ()=>$('projectFormOverlay').classList.remove('active'));
$('pfCancel').addEventListener('click', ()=>$('projectFormOverlay').classList.remove('active'));
$('pfSave').addEventListener('click', async ()=>{
  const body = {
    name: $('pf-name').value.trim(), client: $('pf-client').value.trim(),
    currency: $('pf-currency').value, value: parseFloat($('pf-value').value)||0,
    status: $('pf-status').value, notes: $('pf-notes').value
  };
  if(!body.name){ showToast('Project name is required.'); return; }
  try{
    if(projEditingId) await api('/api/portal/projects/'+projEditingId, {method:'PUT', body:JSON.stringify(body)});
    else await api('/api/portal/projects', {method:'POST', body:JSON.stringify(body)});
    $('projectFormOverlay').classList.remove('active');
    showToast('Project saved.');
    renderProjects();
  }catch(e){ showToast(e.message); }
});

/* ================= DOC TYPE + REF ================= */
$('docTypeSwitch').addEventListener('click', (e)=>{
  const b = e.target.closest('button'); if(!b) return;
  document.querySelectorAll('#docTypeSwitch button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  currentDocType = b.dataset.type;
  document.body.classList.toggle('is-invoice', currentDocType==='Invoice');
  if(!editingId) setDefaultRef();
});
async function setDefaultRef(){
  try{ const data = await api(`/api/portal/next-ref?type=${encodeURIComponent(currentDocType)}`); $('refNo').value = data.ref; }
  catch(e){ const y=new Date().getFullYear(); $('refNo').value = `SUM/${currentDocType==='Invoice'?'INV':'QUO'}/${y}/001`; }
}

/* ================= ITEM ROWS ================= */
function addItemRow(data){
  itemRowId++;
  const tr = document.createElement('tr');
  tr.dataset.rowId = itemRowId;
  tr.innerHTML = `
    <td style="text-align:center; color:var(--ink-soft); font-size:12.5px;" class="rownum"></td>
    <td><input type="text" class="desc" placeholder="Service or item description" value="${data && data.desc ? escapeHtml(data.desc) : ''}"></td>
    <td><input type="number" class="qty num" min="0" step="1" value="${data && data.qty!=null ? data.qty : 1}"></td>
    <td><input type="number" class="price num" min="0" step="0.01" value="${data && data.price!=null ? data.price : ''}"></td>
    <td class="row-total">PKR 0</td>
    <td><button type="button" class="row-remove" title="Remove row">✕</button></td>`;
  $('itemsBody').appendChild(tr);
  renumberRows(); recalcTotals();
}
function renumberRows(){ document.querySelectorAll('#itemsBody tr').forEach((tr,i)=>tr.querySelector('.rownum').textContent=i+1); }
$('itemsBody').addEventListener('input', recalcTotals);
$('itemsBody').addEventListener('click', (e)=>{ if(e.target.classList.contains('row-remove')){ e.target.closest('tr').remove(); renumberRows(); recalcTotals(); }});
$('addRowBtn').addEventListener('click', ()=>addItemRow());
['discountInput','discountType','taxInput','currencySelect','amountPaidInput'].forEach(id=>$(id).addEventListener('input', recalcTotals));

function getItemsFromForm(){
  return Array.from(document.querySelectorAll('#itemsBody tr')).map(tr=>{
    const qty=parseFloat(tr.querySelector('.qty').value)||0, price=parseFloat(tr.querySelector('.price').value)||0;
    return { desc: tr.querySelector('.desc').value, qty, price, amount: qty*price };
  });
}
function recalcTotals(){
  const items = getItemsFromForm();
  document.querySelectorAll('#itemsBody tr').forEach((tr,i)=>tr.querySelector('.row-total').textContent=fmtMoney(items[i].amount,currentCurrency()));
  const subtotal = items.reduce((s,i)=>s+i.amount,0);
  const discVal = parseFloat($('discountInput').value)||0;
  const discType = $('discountType').value;
  const discount = discType==='pct' ? subtotal*(discVal/100) : discVal;
  const taxPct = parseFloat($('taxInput').value)||0;
  const taxable = Math.max(subtotal-discount,0);
  const tax = taxable*(taxPct/100);
  const total = taxable+tax;
  $('subtotalVal').textContent = fmtMoney(subtotal,currentCurrency());
  $('totalVal').textContent = fmtMoney(total,currentCurrency());
  return {subtotal, discount, tax, total, taxPct, discVal, discType};
}

/* ================= FORM RESET / LOAD ================= */
function clearForm(){
  editingId = null;
  $('formTitle').textContent = 'New Document';
  ['clientName','clientAddress','subject','greeting','bodyText','notes'].forEach(id=>$(id).value='');
  $('discountInput').value=0; $('discountType').value='pct'; $('taxInput').value=0;
  $('currencySelect').value='PKR'; $('projectSelect').value=''; $('amountPaidInput').value=0;
  $('itemsBody').innerHTML=''; $('docDate').valueAsDate=new Date();
  document.body.classList.toggle('is-invoice', currentDocType==='Invoice');
  addItemRow(); setDefaultRef(); recalcTotals();
}
$('clearFormBtn').addEventListener('click', ()=>askConfirm('Clear the current form? Unsaved changes will be lost.', ()=>clearForm()));

function fillForm(doc){
  currentDocType = doc.type;
  document.querySelectorAll('#docTypeSwitch button').forEach(b=>b.classList.toggle('active', b.dataset.type===doc.type));
  document.body.classList.toggle('is-invoice', doc.type==='Invoice');
  $('refNo').value=doc.ref; $('docDate').value=doc.date;
  $('clientName').value=doc.clientName; $('clientAddress').value=doc.clientAddress;
  $('subject').value=doc.subject; $('greeting').value=doc.greeting; $('bodyText').value=doc.bodyText; $('notes').value=doc.notes;
  $('discountInput').value=doc.discVal||0; $('discountType').value=doc.discType||'pct'; $('taxInput').value=doc.taxPct||0;
  $('currencySelect').value=doc.currency||'PKR'; $('projectSelect').value=doc.projectId||''; $('amountPaidInput').value=doc.amountPaid||0;
  $('itemsBody').innerHTML='';
  (doc.items||[]).forEach(it=>addItemRow(it));
  if((doc.items||[]).length===0) addItemRow();
  recalcTotals();
}
function loadDocIntoForm(doc){
  editingId = doc.id;
  $('formTitle').textContent = 'Edit Document';
  fillForm(doc);
  goTab('form');
}

/* ================= SAVE ================= */
$('saveBtn').addEventListener('click', async ()=>{
  const clientName = $('clientName').value.trim();
  if(!clientName){ showToast('Please enter a client name before saving.'); $('clientName').focus(); return; }
  const items = getItemsFromForm().filter(i=>i.desc.trim()||i.qty||i.price);
  const payload = {
    type: currentDocType, ref: $('refNo').value.trim(), date: $('docDate').value,
    projectId: $('projectSelect').value,
    clientName, clientAddress: $('clientAddress').value, subject: $('subject').value,
    greeting: $('greeting').value, bodyText: $('bodyText').value, items,
    discVal: parseFloat($('discountInput').value)||0, discType: $('discountType').value,
    taxPct: parseFloat($('taxInput').value)||0, currency: $('currencySelect').value||'PKR',
    amountPaid: parseFloat($('amountPaidInput').value)||0, notes: $('notes').value
  };
  try{
    let saved;
    if(editingId){ saved = await api(`/api/portal/documents/${editingId}`,{method:'PUT',body:JSON.stringify(payload)}); showToast('Document updated.'); }
    else { saved = await api('/api/portal/documents',{method:'POST',body:JSON.stringify(payload)}); showToast('Document saved.'); }
    editingId = saved.id; $('formTitle').textContent='Edit Document';
    refreshProjectsCache();
  }catch(err){ showToast('Could not save: ' + err.message); }
});

/* ================= PREVIEW ================= */
function buildPreview(){
  const t = recalcTotals();
  const items = getItemsFromForm().filter(i=>i.desc.trim()||i.qty||i.price);
  $('previewTitleTxt').textContent = currentDocType + ' Preview';
  $('pv-ref').textContent = $('refNo').value;
  $('pv-date').textContent = formatDisplayDate($('docDate').value);
  $('pv-clientname').innerHTML = '<b>' + escapeHtml($('clientName').value) + '</b>';
  $('pv-clientaddress').textContent = $('clientAddress').value;
  $('pv-subject').textContent = $('subject').value || currentDocType;
  $('pv-greeting').textContent = $('greeting').value;
  $('pv-bodytext').textContent = $('bodyText').value;
  const tbody = $('pv-items'); tbody.innerHTML='';
  items.forEach((it,i)=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${i+1}</td><td>${escapeHtml(it.desc)}</td><td class="num">${it.qty}</td><td class="num">${fmtMoney(it.price,currentCurrency())}</td><td class="num">${fmtMoney(it.amount,currentCurrency())}</td>`; tbody.appendChild(tr); });
  $('pv-subtotal').textContent = fmtMoney(t.subtotal,currentCurrency());
  const dr=$('pv-discount-row'); if(t.discount>0){dr.style.display='flex'; $('pv-discount').textContent='-'+fmtMoney(t.discount,currentCurrency());}else dr.style.display='none';
  const tr2=$('pv-tax-row'); if(t.tax>0){tr2.style.display='flex'; $('pv-tax').textContent=fmtMoney(t.tax,currentCurrency())+` (${t.taxPct}%)`;}else tr2.style.display='none';
  $('pv-totallabel').textContent = currentDocType==='Invoice'?'Amount Due':'Total';
  $('pv-total').textContent = fmtMoney(t.total,currentCurrency());
  const nw=$('pv-notes-wrap'); const nv=$('notes').value.trim();
  if(nv){ nw.style.display='block'; $('pv-notes').textContent=nv; } else nw.style.display='none';
}
$('previewBtn').addEventListener('click', ()=>{ buildPreview(); $('previewOverlay').classList.add('active'); });
$('closePreviewBtn').addEventListener('click', ()=>$('previewOverlay').classList.remove('active'));
$('downloadPdfBtn').addEventListener('click', async ()=>{
  try{
    if(!editingId){
      if(!isOwner()){ showToast('Saving is owner-only.'); return; }
      $('saveBtn').click(); await new Promise(r=>setTimeout(r,300));
    }
    if(!editingId){ showToast('Please save the document first.'); return; }
    window.open(`/api/portal/documents/${editingId}/pdf`, '_blank');
  }catch(err){ showToast('Could not generate PDF: ' + err.message); }
});

/* ================= DOCUMENTS LIST ================= */
document.querySelectorAll('.filter-chip').forEach(c=>c.addEventListener('click', ()=>{
  document.querySelectorAll('.filter-chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active'); listFilter = c.dataset.filter; renderList();
}));
async function renderList(){
  const q = $('searchInput').value.trim();
  const params = new URLSearchParams();
  if(q) params.set('q', q);
  if(listFilter) params.set('type', listFilter);
  let docs = [];
  try{ docs = await api('/api/portal/documents' + (params.toString()?'?'+params.toString():'')); }
  catch(err){ showToast('Could not load documents: ' + err.message); }
  const tbody = $('docListBody'); tbody.innerHTML='';
  $('emptyState').style.display = docs.length ? 'none' : 'block';
  docs.forEach(d=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(d.ref||'')}</td>
      <td><span class="badge ${d.type==='Invoice'?'invoice':'quotation'}">${d.type}</span></td>
      <td>${escapeHtml(d.clientName||'')}</td>
      <td>${escapeHtml(projName(d.projectId))||'<span class="muted">—</span>'}</td>
      <td>${formatDisplayDate(d.date)}</td>
      <td style="text-align:right; font-weight:600;">${fmtMoney(d.total||0, d.currency||'PKR')}</td>
      <td style="text-align:center;">${paymentBadge(d)}</td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" data-act="view" title="View / PDF">👁</button>
          <button class="icon-btn" data-act="pdf" title="Download PDF">⬇</button>
          <button class="icon-btn owner-only" data-act="edit" title="Edit">✎</button>
          <button class="icon-btn owner-only" data-act="dup" title="Duplicate">⧉</button>
          <button class="icon-btn del owner-only" data-act="del" title="Delete">🗑</button>
        </div>
      </td>`;
    tr.querySelectorAll('[data-act]').forEach(btn=>btn.addEventListener('click', ()=>{
      const act = btn.dataset.act;
      if(act==='view') viewDoc(d);
      if(act==='pdf') window.open(`/api/portal/documents/${d.id}/pdf`,'_blank');
      if(act==='edit') loadDocIntoForm(d);
      if(act==='dup') duplicateDoc(d);
      if(act==='del') askConfirm(`Delete ${d.type.toLowerCase()} ${d.ref}? This can't be undone.`, ()=>deleteDoc(d.id));
    }));
    tbody.appendChild(tr);
  });
}
$('searchInput').addEventListener('input', renderList);

function viewDoc(d){
  editingId = d.id;
  fillForm(d);
  buildPreview();
  $('previewOverlay').classList.add('active');
}
async function duplicateDoc(d){
  try{ const copy = await api(`/api/portal/documents/${d.id}/duplicate`,{method:'POST'}); showToast('Duplicated as '+copy.ref); renderList(); }
  catch(err){ showToast('Could not duplicate: '+err.message); }
}
async function deleteDoc(id){
  try{ await api(`/api/portal/documents/${id}`,{method:'DELETE'}); showToast('Document deleted.'); if(editingId===id) editingId=null; renderList(); refreshProjectsCache(); }
  catch(err){ showToast('Could not delete: '+err.message); }
}

/* ================= USERS ================= */
async function renderUsers(){
  let list=[];
  try{ list = await api('/api/portal/users'); }catch(e){ showToast(e.message); return; }
  const tbody = $('userListBody'); tbody.innerHTML='';
  list.forEach(u=>{
    const tr = document.createElement('tr');
    const isMe = ME && u.id===ME.id;
    tr.innerHTML = `
      <td>${escapeHtml(u.username)}${isMe?' <span class="muted">(you)</span>':''}</td>
      <td>${escapeHtml(u.name||'')}</td>
      <td><span class="role-badge ${u.role}">${u.role}</span></td>
      <td>${formatDisplayDate((u.createdAt||'').slice(0,10))}</td>
      <td><div class="row-actions" style="justify-content:center;">
        <button class="icon-btn" data-act="edit" title="Edit">✎</button>
        ${isMe?'':'<button class="icon-btn del" data-act="del" title="Delete">🗑</button>'}
      </div></td>`;
    tr.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click', ()=>{
      if(b.dataset.act==='edit') openUserForm(u);
      if(b.dataset.act==='del') askConfirm(`Delete user “${u.username}”?`, ()=>deleteUser(u.id));
    }));
    tbody.appendChild(tr);
  });
}
function openUserForm(u){
  userEditingId = u ? u.id : null;
  $('uf-title').textContent = u ? 'Edit User' : 'Add User';
  $('uf-username').value = u ? u.username : '';
  $('uf-username').disabled = !!u;
  $('uf-name').value = u ? (u.name||'') : '';
  $('uf-role').value = u ? u.role : 'viewer';
  $('uf-password').value = '';
  $('uf-pwlabel').textContent = u ? 'New Password (leave blank to keep)' : 'Password';
  $('userFormOverlay').classList.add('active');
}
$('newUserBtn').addEventListener('click', ()=>openUserForm(null));
$('ufClose').addEventListener('click', ()=>$('userFormOverlay').classList.remove('active'));
$('ufCancel').addEventListener('click', ()=>$('userFormOverlay').classList.remove('active'));
$('ufSave').addEventListener('click', async ()=>{
  const body = { name:$('uf-name').value.trim(), role:$('uf-role').value, password:$('uf-password').value };
  try{
    if(userEditingId){ await api('/api/portal/users/'+userEditingId,{method:'PUT',body:JSON.stringify(body)}); }
    else { body.username=$('uf-username').value.trim(); await api('/api/portal/users',{method:'POST',body:JSON.stringify(body)}); }
    $('userFormOverlay').classList.remove('active'); showToast('User saved.'); renderUsers();
  }catch(e){ showToast(e.message); }
});
async function deleteUser(id){
  try{ await api('/api/portal/users/'+id,{method:'DELETE'}); showToast('User deleted.'); renderUsers(); }
  catch(e){ showToast(e.message); }
}

/* ================= CONFIRM / TOAST ================= */
let confirmCb=null;
function askConfirm(text, cb){ $('confirmText').textContent=text; confirmCb=cb; $('confirmOverlay').classList.add('active'); }
$('confirmCancel').addEventListener('click', ()=>{ $('confirmOverlay').classList.remove('active'); confirmCb=null; });
$('confirmOk').addEventListener('click', ()=>{ if(confirmCb) confirmCb(); $('confirmOverlay').classList.remove('active'); confirmCb=null; });
let toastTimer=null;
function showToast(msg){ const t=$('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2800); }

/* ================= INIT ================= */
clearForm();
bootstrap();
