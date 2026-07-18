/* ================= STATE ================= */
let ME = null;                 // { id, username, name, role }
let currentDocType = 'Quotation';
let editingId = null;
let itemRowId = 0;
let PROJECTS = [];             // cached projects (with rollups) for selectors / lists
let OWNERS = [];               // cached business owners
let listFilter = '';           // '', 'Quotation', 'Invoice'
let projEditingId = null;
let userEditingId = null;
let ownerEditingId = null;
let projPage = 1, docPage = 1;
const PROJ_PER = 9, DOC_PER = 12;
let docOwnerFilterVal = '';

const $ = (id) => document.getElementById(id);
function isOwner(){ return ME && ME.role === 'owner'; }

/* ================= MONEY / DATES ================= */
function fmtMoney(n, currency){
  const v = Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  if(currency === 'USD') return '$' + v.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  return 'PKR ' + v.toLocaleString('en-PK', {minimumFractionDigits:2, maximumFractionDigits:2});
}
function fmtShort(n, currency){
  const v = Number(n)||0; const sym = currency==='USD'?'$':'PKR ';
  if(v>=1e6) return sym+(v/1e6).toFixed(1).replace(/\.0$/,'')+'M';
  if(v>=1e3) return sym+(v/1e3).toFixed(1).replace(/\.0$/,'')+'k';
  return sym+v.toLocaleString();
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
function ownerById(id){ return OWNERS.find(o=>o.id===id); }
function ownerBadgeHtml(id){
  const o = ownerById(id);
  if(!o) return '<span class="muted">—</span>';
  return `<span class="owner-badge" style="--oc:${o.color}"><span class="owner-dot"></span>${escapeHtml(o.name)}</span>`;
}
function miniDot(color){ return color?`<span class="mini-dot" style="background:${color}"></span>`:''; }

/* ================= API ================= */
async function api(path, opts) {
  const res = await fetch(path, Object.assign({ headers: { 'Content-Type': 'application/json' } }, opts));
  if (res.status === 401) { window.location.href = '/portal/login'; throw new Error('Not logged in'); }
  if (res.status === 403) { let m='Read-only account'; try{ m=(await res.json()).error||m; }catch(e){} throw new Error(m); }
  if (!res.ok) { let msg='Request failed'; try{ msg=(await res.json()).error||msg; }catch(e){} throw new Error(msg); }
  if (res.status === 204) return null;
  return res.json();
}

/* ================= SEARCHABLE COMBOBOX ================= */
function makeCombo(mountId, opts){
  opts = opts || {};
  const placeholder = opts.placeholder || 'Select…';
  const allowEmpty = opts.allowEmpty !== false;
  const emptyLabel = opts.emptyLabel || '— None —';
  const onChange = opts.onChange || null;
  const mount = $(mountId);
  if(!mount) return null;
  mount.classList.add('combo');
  mount.innerHTML = `
    <button type="button" class="combo-toggle"><span class="combo-val muted">${escapeHtml(placeholder)}</span><span class="combo-caret">▾</span></button>
    <div class="combo-pop"><input type="text" class="combo-search" placeholder="Search…"><div class="combo-list"></div></div>`;
  const toggle = mount.querySelector('.combo-toggle');
  const valEl = mount.querySelector('.combo-val');
  const searchEl = mount.querySelector('.combo-search');
  const listEl = mount.querySelector('.combo-list');
  let options = [], value = '';
  function dot(c){ return c?`<span class="combo-dot" style="background:${c}"></span>`:''; }
  function selected(){ return options.find(o=>o.value===value); }
  function paint(){
    const o = selected();
    if(o){ valEl.className='combo-val'; valEl.innerHTML = dot(o.color)+escapeHtml(o.label); }
    else { valEl.className='combo-val muted'; valEl.textContent = placeholder; }
  }
  function renderList(){
    const q = (searchEl.value||'').toLowerCase().trim();
    let html='';
    if(allowEmpty) html += `<div class="combo-item${value===''?' sel':''}" data-v="">${escapeHtml(emptyLabel)}</div>`;
    const groups = {};
    options.filter(o=>o.label.toLowerCase().includes(q)).forEach(o=>{ (groups[o.group||'']=groups[o.group||'']||[]).push(o); });
    Object.keys(groups).forEach(g=>{
      if(g) html += `<div class="combo-group">${escapeHtml(g)}</div>`;
      groups[g].forEach(o=>{ html += `<div class="combo-item${o.value===value?' sel':''}" data-v="${escapeHtml(o.value)}">${dot(o.color)}<span>${escapeHtml(o.label)}</span>${o.badge?`<em>${escapeHtml(o.badge)}</em>`:''}</div>`; });
    });
    listEl.innerHTML = html || '<div class="combo-empty">No matches</div>';
    listEl.querySelectorAll('.combo-item').forEach(it=>it.addEventListener('click', ()=>{ set(it.dataset.v, true); close(); }));
  }
  function open(){ mount.classList.add('open'); searchEl.value=''; renderList(); setTimeout(()=>searchEl.focus(),0); }
  function close(){ mount.classList.remove('open'); }
  function set(v, fire){ value = v||''; paint(); if(fire && onChange) onChange(value); }
  toggle.addEventListener('click', (e)=>{ e.stopPropagation(); mount.classList.contains('open')?close():open(); });
  searchEl.addEventListener('input', renderList);
  searchEl.addEventListener('click', e=>e.stopPropagation());
  document.addEventListener('click', (e)=>{ if(!mount.contains(e.target)) close(); });
  paint();
  return {
    setOptions(opts2, keep){ options = opts2||[]; if(!keep && !selected()) value=''; paint(); },
    getValue(){ return value; },
    setValue(v){ set(v, false); },
  };
}
let docOwnerCombo, pfOwnerCombo, projOwnerFilter, docOwnerFilter;

function ownerOptions(includeId){
  return OWNERS.filter(o=>o.active || o.id===includeId).map(o=>({value:o.id, label:o.name, color:o.color, group:o.category}));
}
function updateOwnerCombos(){
  if(docOwnerCombo) docOwnerCombo.setOptions(ownerOptions(docOwnerCombo.getValue()), true);
  if(pfOwnerCombo) pfOwnerCombo.setOptions(ownerOptions(pfOwnerCombo.getValue()), true);
  const filterOpts = OWNERS.map(o=>({value:o.id, label:o.name, color:o.color, group:o.category}));
  if(projOwnerFilter) projOwnerFilter.setOptions(filterOpts, true);
  if(docOwnerFilter) docOwnerFilter.setOptions(filterOpts, true);
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
  await refreshOwnersCache();
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
    if(tab === 'reports') renderReports();
    if(tab === 'projects') renderProjects();
    if(tab === 'list') renderList();
    if(tab === 'owners') renderOwners();
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
    { label:'Business Units', value: OWNERS.length, sub: OWNERS.filter(o=>o.active).length+' active' },
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

/* ================= REPORTS ================= */
let REPORTS = null, repCurrency = 'PKR';
async function renderReports(){
  try{ REPORTS = await api('/api/portal/reports'); }catch(e){ showToast(e.message); return; }
  const curs = (REPORTS.currencies && REPORTS.currencies.length) ? REPORTS.currencies : ['PKR'];
  if(!curs.includes(repCurrency)) repCurrency = curs.includes('PKR') ? 'PKR' : curs[0];
  $('repCurrency').innerHTML = curs.map(c=>`<button class="cur-btn${c===repCurrency?' active':''}" data-c="${c}">${c}</button>`).join('');
  $('repCurrency').querySelectorAll('.cur-btn').forEach(b=>b.addEventListener('click', ()=>{ repCurrency=b.dataset.c; renderReports(); }));
  paintReports();
}
function moneyOf(bucket, c){ return (bucket && bucket[c]) ? bucket[c] : {invoiced:0,paid:0,outstanding:0,quoted:0}; }
function paintReports(){
  const c = repCurrency;
  const academy = REPORTS.byOwner.filter(o=>o.category==='Academy')
    .map(o=>({label:o.name, value:moneyOf(o.byCurrency,c).invoiced, color:o.color})).sort((a,b)=>b.value-a.value);
  renderHBars($('chartAcademy'), academy, c);
  const services = REPORTS.byOwner.filter(o=>o.category==='Services')
    .map(o=>({label:o.name, value:moneyOf(o.byCurrency,c).invoiced, color:o.color})).sort((a,b)=>b.value-a.value);
  renderHBars($('chartServices'), services, c);
  const outstanding = REPORTS.byOwner
    .map(o=>({label:o.name, value:moneyOf(o.byCurrency,c).outstanding, color:o.color}))
    .filter(r=>r.value>0).sort((a,b)=>b.value-a.value).slice(0,10);
  renderHBars($('chartOutstanding'), outstanding, c, 'var(--amber)');
  const projects = REPORTS.byProject
    .map(p=>({label:p.name, value:moneyOf(p.byCurrency,c).invoiced, color:p.ownerColor}))
    .filter(r=>r.value>0).sort((a,b)=>b.value-a.value).slice(0,10);
  renderHBars($('chartProjects'), projects, c);
  const monthly = REPORTS.monthly.slice(-12).map(m=>({label:monthLabel(m.period), invoiced:moneyOf(m.byCurrency,c).invoiced, paid:moneyOf(m.byCurrency,c).paid}));
  renderGroupedBars($('chartMonthly'), monthly, c);
  const yearly = REPORTS.yearly.map(y=>({label:y.period, invoiced:moneyOf(y.byCurrency,c).invoiced, paid:moneyOf(y.byCurrency,c).paid}));
  renderGroupedBars($('chartYearly'), yearly, c);
}
function renderHBars(el, rows, currency, forceColor){
  if(!rows.length){ el.innerHTML='<div class="chart-empty">No data yet for '+currency+'.</div>'; return; }
  const max = Math.max.apply(null, rows.map(r=>r.value).concat([1]));
  el.innerHTML = rows.map(r=>`
    <div class="hbar-row">
      <div class="hbar-label">${miniDot(r.color)}<span>${escapeHtml(r.label)}</span></div>
      <div class="hbar-track"><div class="hbar-fill" style="width:${r.value>0?Math.max(r.value/max*100,3):0}%; background:${forceColor||r.color||'var(--teal-700)'}"></div></div>
      <div class="hbar-val">${fmtMoney(r.value,currency)}</div>
    </div>`).join('');
}
function renderGroupedBars(el, series, currency){
  const has = series.some(s=>s.invoiced>0 || s.paid>0);
  if(!series.length || !has){ el.innerHTML='<div class="chart-empty">No invoices yet for '+currency+'.</div>'; return; }
  const max = Math.max.apply(null, series.flatMap(s=>[s.invoiced,s.paid]).concat([1]));
  el.innerHTML = `<div class="vbars">`+ series.map(s=>`
    <div class="vbar-group" title="${escapeHtml(s.label)} · invoiced ${fmtMoney(s.invoiced,currency)} · paid ${fmtMoney(s.paid,currency)}">
      <div class="vbar-cols">
        <div class="vbar inv" style="height:${Math.max(s.invoiced/max*100,s.invoiced>0?2:0)}%"></div>
        <div class="vbar paid" style="height:${Math.max(s.paid/max*100,s.paid>0?2:0)}%"></div>
      </div>
      <div class="vbar-x">${escapeHtml(s.label)}</div>
    </div>`).join('') + `</div>
    <div class="chart-legend"><span><i class="lg inv"></i>Invoiced</span><span><i class="lg paid"></i>Paid</span></div>`;
}
function monthLabel(ym){ const p=String(ym).split('-'); if(p.length<2) return ym; const d=new Date(Number(p[0]),Number(p[1])-1,1); return d.toLocaleDateString('en-GB',{month:'short'})+" '"+String(p[0]).slice(2); }

/* ================= PROJECTS ================= */
async function refreshProjectsCache(){
  try{ PROJECTS = await api('/api/portal/projects'); }catch(e){ PROJECTS = []; }
  const sel = $('projectSelect');
  const cur = sel.value;
  sel.innerHTML = '<option value="">— No project —</option>' +
    PROJECTS.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}${p.code?' ('+escapeHtml(p.code)+')':''}</option>`).join('');
  sel.value = cur;
}

function filteredProjects(){
  const q = ($('projSearch').value||'').toLowerCase().trim();
  const ownerF = projOwnerFilter ? projOwnerFilter.getValue() : '';
  const statusF = $('projStatusFilter').value;
  const showArchived = $('projShowArchived').checked;
  const sort = $('projSort').value;
  let list = PROJECTS.slice();
  if(!showArchived) list = list.filter(p=>!p.archived);
  if(q) list = list.filter(p => (p.name+' '+(p.code||'')+' '+(p.client||'')).toLowerCase().includes(q));
  if(ownerF) list = list.filter(p=>p.ownerId===ownerF);
  if(statusF) list = list.filter(p=>p.status===statusF);
  if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sort==='budget') list.sort((a,b)=>(b.budget||0)-(a.budget||0));
  else if(sort==='outstanding') list.sort((a,b)=>(b.outstanding||0)-(a.outstanding||0));
  // 'newest' keeps server order (createdAt desc)
  return list;
}
async function renderProjects(){
  await refreshProjectsCache();
  const list = filteredProjects();
  const grid = $('projectGrid');
  $('projEmpty').style.display = list.length ? 'none' : 'block';
  const pages = Math.max(1, Math.ceil(list.length/PROJ_PER));
  if(projPage>pages) projPage=pages;
  const slice = list.slice((projPage-1)*PROJ_PER, projPage*PROJ_PER);
  grid.innerHTML = slice.map(p=>{
    const pct = p.invoiced>0 ? Math.round(p.paid/p.invoiced*100) : 0;
    return `<div class="project-card${p.archived?' archived':''}" data-id="${p.id}">
      <div class="pc-top">
        <div>
          <div class="pc-name">${escapeHtml(p.name)}${p.code?` <span class="pc-code">${escapeHtml(p.code)}</span>`:''}</div>
          <div class="pc-client">${escapeHtml(p.client||'—')}</div>
        </div>
        <span class="status-badge s-${p.status.replace(/\s/g,'')}">${p.status}</span>
      </div>
      <div class="pc-owner">${ownerBadgeHtml(p.ownerId)}${p.archived?'<span class="arch-tag">Archived</span>':''}</div>
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
  renderPager($('projPager'), list.length, projPage, PROJ_PER, (p)=>{ projPage=p; renderProjects(); });
}
['projSearch'].forEach(id=>$(id).addEventListener('input', ()=>{ projPage=1; renderProjects(); }));
['projStatusFilter','projSort'].forEach(id=>$(id).addEventListener('change', ()=>{ projPage=1; renderProjects(); }));
$('projShowArchived').addEventListener('change', ()=>{ projPage=1; renderProjects(); });

async function openProjectDetail(id){
  let data;
  try{ data = await api('/api/portal/projects/'+id); }catch(e){ showToast(e.message); return; }
  const p = data.project;
  $('pd-name').textContent = p.name;
  const bits = [p.client||'', p.status];
  if(p.code) bits.push(p.code);
  if(p.value) bits.push('Budget ' + fmtMoney(p.value, p.currency));
  $('pd-client').innerHTML = escapeHtml(bits.filter(Boolean).join('  ·  ')) + (p.ownerId?'   '+ownerBadgeHtml(p.ownerId):'');
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
  $('pf-code').value = p ? (p.code||'') : '';
  $('pf-client').value = p ? (p.client||'') : '';
  $('pf-desc').value = p ? (p.description||p.notes||'') : '';
  $('pf-currency').value = p ? p.currency : 'PKR';
  $('pf-value').value = p ? (p.budget!=null?p.budget:(p.value||0)) : 0;
  $('pf-status').value = p ? p.status : 'Active';
  $('pf-start').value = p ? (p.startDate||'') : '';
  $('pf-end').value = p ? (p.endDate||'') : '';
  $('pf-archived').checked = p ? !!p.archived : false;
  pfOwnerCombo.setOptions(ownerOptions(p ? p.ownerId : ''), true);
  pfOwnerCombo.setValue(p ? (p.ownerId||'') : '');
  $('projectFormOverlay').classList.add('active');
}
$('newProjectBtn').addEventListener('click', ()=>openProjectForm(null));
$('pfClose').addEventListener('click', ()=>$('projectFormOverlay').classList.remove('active'));
$('pfCancel').addEventListener('click', ()=>$('projectFormOverlay').classList.remove('active'));
$('pfSave').addEventListener('click', async ()=>{
  const body = {
    name: $('pf-name').value.trim(), code: $('pf-code').value.trim(), client: $('pf-client').value.trim(),
    ownerId: pfOwnerCombo.getValue(), description: $('pf-desc').value,
    currency: $('pf-currency').value, budget: parseFloat($('pf-value').value)||0,
    status: $('pf-status').value, startDate: $('pf-start').value, endDate: $('pf-end').value,
    archived: $('pf-archived').checked
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

/* ================= OWNERS ================= */
async function refreshOwnersCache(){
  try{ OWNERS = await api('/api/portal/owners'); }catch(e){ OWNERS = []; }
  updateOwnerCombos();
}
async function renderOwners(){
  await refreshOwnersCache();
  await refreshProjectsCache();
  const counts = {}; PROJECTS.forEach(p=>{ if(p.ownerId) counts[p.ownerId]=(counts[p.ownerId]||0)+1; });
  const cats = ['Academy','Services','Other'];
  const wrap = $('ownerCatWrap');
  wrap.innerHTML = cats.map(cat=>{
    const list = OWNERS.filter(o=>o.category===cat);
    if(!list.length) return '';
    return `<div class="owner-cat">
      <div class="owner-cat-h">${cat} <span class="oc-count">${list.length}</span></div>
      <div class="card" style="overflow:hidden;">
        <table class="doc-list">
          <thead><tr><th>Unit</th><th>Status</th><th style="text-align:center;">Projects</th><th style="text-align:center;">Actions</th></tr></thead>
          <tbody>${list.map(o=>`
            <tr>
              <td>${ownerBadgeHtml(o.id)}</td>
              <td><label class="switch"><input type="checkbox" data-act="toggle" data-id="${o.id}" ${o.active?'checked':''}><span class="sw-track"></span></label> <span class="muted sw-label">${o.active?'Active':'Inactive'}</span></td>
              <td style="text-align:center;">${counts[o.id]||0}</td>
              <td style="text-align:center;"><div class="row-actions" style="justify-content:center;">
                <button class="icon-btn" data-act="edit" data-id="${o.id}" title="Edit">✎</button>
                <button class="icon-btn del" data-act="del" data-id="${o.id}" title="Delete">🗑</button>
              </div></td>
            </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>`;
  }).join('');
  wrap.querySelectorAll('[data-act]').forEach(el=>{
    const o = ownerById(el.dataset.id);
    if(el.dataset.act==='toggle') el.addEventListener('change', ()=>toggleOwner(o, el.checked));
    if(el.dataset.act==='edit') el.addEventListener('click', ()=>openOwnerForm(o));
    if(el.dataset.act==='del') el.addEventListener('click', ()=>askConfirm(`Delete business unit “${o.name}”?`, ()=>deleteOwner(o.id)));
  });
}
async function toggleOwner(o, active){
  try{ await api('/api/portal/owners/'+o.id, {method:'PUT', body:JSON.stringify({active})}); showToast(active?'Owner activated.':'Owner deactivated.'); await refreshOwnersCache(); renderOwners(); }
  catch(e){ showToast(e.message); renderOwners(); }
}
function openOwnerForm(o){
  ownerEditingId = o ? o.id : null;
  $('of-title').textContent = o ? 'Edit Owner' : 'Add Owner';
  $('of-name').value = o ? o.name : '';
  $('of-category').value = o ? o.category : 'Services';
  $('of-color').value = o ? o.color : '#2563eb';
  $('of-active').checked = o ? !!o.active : true;
  $('ownerFormOverlay').classList.add('active');
}
$('newOwnerBtn').addEventListener('click', ()=>openOwnerForm(null));
$('ofClose').addEventListener('click', ()=>$('ownerFormOverlay').classList.remove('active'));
$('ofCancel').addEventListener('click', ()=>$('ownerFormOverlay').classList.remove('active'));
$('ofSave').addEventListener('click', async ()=>{
  const body = { name:$('of-name').value.trim(), category:$('of-category').value, color:$('of-color').value, active:$('of-active').checked };
  if(!body.name){ showToast('Owner name is required.'); return; }
  try{
    if(ownerEditingId) await api('/api/portal/owners/'+ownerEditingId, {method:'PUT', body:JSON.stringify(body)});
    else await api('/api/portal/owners', {method:'POST', body:JSON.stringify(body)});
    $('ownerFormOverlay').classList.remove('active'); showToast('Owner saved.');
    await refreshOwnersCache(); renderOwners();
  }catch(e){ showToast(e.message); }
});
async function deleteOwner(id){
  try{ await api('/api/portal/owners/'+id, {method:'DELETE'}); showToast('Owner deleted.'); await refreshOwnersCache(); renderOwners(); }
  catch(e){ showToast(e.message); }
}

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

/* ---- owner inheritance on the document form ---- */
$('projectSelect').addEventListener('change', ()=>{
  const p = PROJECTS.find(x=>x.id===$('projectSelect').value);
  if(p && p.ownerId) docOwnerCombo.setValue(p.ownerId);
  updateDocOwnerHint();
});
function updateDocOwnerHint(){
  const oid = docOwnerCombo.getValue();
  const p = PROJECTS.find(x=>x.id===$('projectSelect').value);
  let msg;
  if(!oid) msg = 'Select a business unit for this document.';
  else if(p && p.ownerId===oid) msg = 'Inherited from project “'+p.name+'”. Change to override.';
  else if(p && p.ownerId) msg = 'Manual override — differs from the project’s owner.';
  else msg = 'Assigned business unit for this document.';
  $('docOwnerHint').textContent = msg;
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
  if(docOwnerCombo) docOwnerCombo.setValue('');
  updateDocOwnerHint();
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
  if(docOwnerCombo){ docOwnerCombo.setOptions(ownerOptions(doc.ownerId||''), true); docOwnerCombo.setValue(doc.ownerId||''); }
  updateDocOwnerHint();
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
  const ownerId = docOwnerCombo.getValue();
  if(!ownerId){ showToast('Please select a business unit / owner.'); return; }
  const items = getItemsFromForm().filter(i=>i.desc.trim()||i.qty||i.price);
  const payload = {
    type: currentDocType, ref: $('refNo').value.trim(), date: $('docDate').value,
    projectId: $('projectSelect').value, ownerId,
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
  const oid = docOwnerCombo ? docOwnerCombo.getValue() : '';
  const ow = ownerById(oid);
  const owWrap = $('pv-owner-wrap');
  if(ow){ owWrap.style.display='flex'; const b=$('pv-owner'); b.style.setProperty('--oc', ow.color); b.innerHTML = `<span class="owner-dot"></span>${escapeHtml(ow.name)}`; }
  else owWrap.style.display='none';
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
  c.classList.add('active'); listFilter = c.dataset.filter; docPage=1; renderList();
}));
async function renderList(){
  const q = $('searchInput').value.trim();
  const params = new URLSearchParams();
  if(q) params.set('q', q);
  if(listFilter) params.set('type', listFilter);
  let docs = [];
  try{ docs = await api('/api/portal/documents' + (params.toString()?'?'+params.toString():'')); }
  catch(err){ showToast('Could not load documents: ' + err.message); }
  if(docOwnerFilterVal) docs = docs.filter(d=>d.ownerId===docOwnerFilterVal);
  const tbody = $('docListBody'); tbody.innerHTML='';
  $('emptyState').style.display = docs.length ? 'none' : 'block';
  const pages = Math.max(1, Math.ceil(docs.length/DOC_PER));
  if(docPage>pages) docPage=pages;
  const slice = docs.slice((docPage-1)*DOC_PER, docPage*DOC_PER);
  slice.forEach(d=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(d.ref||'')}</td>
      <td><span class="badge ${d.type==='Invoice'?'invoice':'quotation'}">${d.type}</span></td>
      <td>${escapeHtml(d.clientName||'')}</td>
      <td>${ownerBadgeHtml(d.ownerId)}</td>
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
  renderPager($('docPager'), docs.length, docPage, DOC_PER, (p)=>{ docPage=p; renderList(); });
}
$('searchInput').addEventListener('input', ()=>{ docPage=1; renderList(); });

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

/* ================= PAGINATION ================= */
function renderPager(el, total, page, per, go){
  const pages = Math.max(1, Math.ceil(total/per));
  if(pages<=1){ el.innerHTML=''; return; }
  let html = `<button class="pg-btn" ${page<=1?'disabled':''} data-p="${page-1}">‹ Prev</button>`;
  for(let i=1;i<=pages;i++){
    if(i===1 || i===pages || Math.abs(i-page)<=1){ html += `<button class="pg-btn${i===page?' active':''}" data-p="${i}">${i}</button>`; }
    else if(Math.abs(i-page)===2){ html += `<span class="pg-dots">…</span>`; }
  }
  html += `<button class="pg-btn" ${page>=pages?'disabled':''} data-p="${page+1}">Next ›</button>`;
  el.innerHTML = html;
  el.querySelectorAll('.pg-btn[data-p]').forEach(b=>{ if(!b.disabled) b.addEventListener('click', ()=>go(parseInt(b.dataset.p,10))); });
}

/* ================= CONFIRM / TOAST ================= */
let confirmCb=null;
function askConfirm(text, cb){ $('confirmText').textContent=text; confirmCb=cb; $('confirmOverlay').classList.add('active'); }
$('confirmCancel').addEventListener('click', ()=>{ $('confirmOverlay').classList.remove('active'); confirmCb=null; });
$('confirmOk').addEventListener('click', ()=>{ if(confirmCb) confirmCb(); $('confirmOverlay').classList.remove('active'); confirmCb=null; });
let toastTimer=null;
function showToast(msg){ const t=$('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2800); }

/* ================= INIT ================= */
docOwnerCombo = makeCombo('docOwnerCombo', { placeholder:'Select business unit…', allowEmpty:true, emptyLabel:'— None —', onChange: updateDocOwnerHint });
pfOwnerCombo  = makeCombo('pf-owner-combo', { placeholder:'Select business unit…', allowEmpty:true, emptyLabel:'— None —' });
projOwnerFilter = makeCombo('projOwnerFilter', { placeholder:'All owners', allowEmpty:true, emptyLabel:'All owners', onChange: ()=>{ projPage=1; renderProjects(); } });
docOwnerFilter  = makeCombo('docOwnerFilter', { placeholder:'All owners', allowEmpty:true, emptyLabel:'All owners', onChange: (v)=>{ docOwnerFilterVal=v; docPage=1; renderList(); } });
clearForm();
bootstrap();
