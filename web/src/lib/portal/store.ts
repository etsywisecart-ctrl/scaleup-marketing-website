/* Portal data store. Uses Vercel Postgres in production (when POSTGRES_URL
   is set) and a local JSON-file fallback for development/testing, behind a
   single async interface. Documents & projects are stored as JSON blobs to
   mirror the original file-based model; users get real columns so usernames
   stay unique. */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const USE_PG = !!process.env.POSTGRES_URL;

export type Role = 'owner' | 'viewer';
export type User = { id: string; username: string; name: string; role: Role; password: string; createdAt: string };
export type PublicUser = Omit<User, 'password'>;

/* A business unit an invoice/project belongs to (an Academy track, a service
   line, or "Other"). Fully data-driven — admins add/edit/remove/toggle owners
   from the UI, no code change needed to introduce new tracks or services. */
export type OwnerCategory = 'Academy' | 'Services' | 'Other';
export type BusinessOwner = {
  id: string; name: string; category: OwnerCategory; color: string;
  active: boolean; createdAt: string; updatedAt?: string;
};
export const OWNER_CATEGORIES: OwnerCategory[] = ['Academy', 'Services', 'Other'];

export type Project = {
  id: string; ownerId: string; name: string; code: string; client: string;
  description: string; currency: 'PKR' | 'USD'; budget: number; value: number;
  status: string; startDate: string; endDate: string; archived: boolean;
  notes: string; createdAt: string; updatedAt?: string;
};
export type Doc = Record<string, unknown> & { id: string; savedAt: string };

export const PROJECT_STATUSES = ['Active', 'On Hold', 'Completed', 'Cancelled'];

/* Seeded once on first run. Colours give each unit a distinct badge. */
const DEFAULT_OWNERS: Array<{ name: string; category: OwnerCategory; color: string }> = [
  { name: 'Track 1', category: 'Academy', color: '#0ea5e9' },
  { name: 'Track 2', category: 'Academy', color: '#6366f1' },
  { name: 'Track 3', category: 'Academy', color: '#8b5cf6' },
  { name: 'Track 4', category: 'Academy', color: '#ec4899' },
  { name: 'Track 5', category: 'Academy', color: '#14b8a6' },
  { name: 'Web Development', category: 'Services', color: '#2563eb' },
  { name: 'Mobile App Development', category: 'Services', color: '#7c3aed' },
  { name: 'UI/UX Design', category: 'Services', color: '#db2777' },
  { name: 'Digital Marketing', category: 'Services', color: '#ea580c' },
  { name: 'SEO', category: 'Services', color: '#16a34a' },
  { name: 'Branding', category: 'Services', color: '#d97706' },
  { name: 'AI Automation', category: 'Services', color: '#0891b2' },
  { name: 'SaaS Development', category: 'Services', color: '#4f46e5' },
  { name: 'Consulting', category: 'Services', color: '#0d9488' },
  { name: 'Other Projects', category: 'Other', color: '#64748b' },
];

/* ---------------- password hashing (scrypt) ---------------- */
export function hashPassword(password: string, salt?: string) {
  salt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
export function verifyPassword(password: string, stored: string) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  const check = crypto.scryptSync(String(password), salt, 64).toString('hex');
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(check, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export function publicUser(u: User | null): PublicUser | null {
  if (!u) return null;
  return { id: u.id, username: u.username, name: u.name || '', role: u.role, createdAt: u.createdAt };
}
const uid = (p = 'u') => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ================= FILE BACKEND (dev) ================= */
const FILE_DIR = path.join(process.cwd(), '.portal-data');
function fpath(name: string) { return path.join(FILE_DIR, name + '.json'); }
function fread<T>(name: string, fallback: T): T {
  try {
    const f = fpath(name);
    if (!fs.existsSync(f)) return fallback;
    const raw = fs.readFileSync(f, 'utf8').trim();
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function fwrite(name: string, data: unknown) {
  fs.mkdirSync(FILE_DIR, { recursive: true });
  const f = fpath(name);
  fs.writeFileSync(f + '.tmp', JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(f + '.tmp', f);
}

/* ================= PG BACKEND ================= */
let pgReady = false;
async function pg() {
  const mod = await import('@vercel/postgres');
  const sql = mod.sql;
  if (!pgReady) {
    await sql`CREATE TABLE IF NOT EXISTS portal_users (
      id text PRIMARY KEY, username text UNIQUE NOT NULL, name text, role text NOT NULL,
      password text NOT NULL, created_at timestamptz NOT NULL DEFAULT now())`;
    await sql`CREATE TABLE IF NOT EXISTS portal_owners (id text PRIMARY KEY, data jsonb NOT NULL)`;
    await sql`CREATE TABLE IF NOT EXISTS portal_projects (id text PRIMARY KEY, data jsonb NOT NULL)`;
    await sql`CREATE TABLE IF NOT EXISTS portal_documents (id text PRIMARY KEY, data jsonb NOT NULL)`;
    await sql`CREATE TABLE IF NOT EXISTS portal_sequences (key text PRIMARY KEY, n int NOT NULL)`;
    pgReady = true;
  }
  return sql;
}

/* ================= SEED ================= */
export async function ensureSeed() {
  await seedOwnerUser();
  await seedBusinessOwners();
}
async function seedOwnerUser() {
  const list = await listUsersRaw();
  if (list.length > 0) return;
  const username = process.env.PORTAL_OWNER_USERNAME || 'owner';
  const password = process.env.PORTAL_OWNER_PASSWORD || 'changeme';
  const owner: User = {
    id: uid(), username, name: 'Owner', role: 'owner',
    password: hashPassword(password), createdAt: new Date().toISOString()
  };
  if (USE_PG) {
    const sql = await pg();
    await sql`INSERT INTO portal_users (id, username, name, role, password, created_at)
              VALUES (${owner.id}, ${owner.username}, ${owner.name}, ${owner.role}, ${owner.password}, ${owner.createdAt})`;
  } else {
    fwrite('users', [owner]);
  }
}
async function seedBusinessOwners() {
  const existing = await listOwnersRaw();
  if (existing.length > 0) return;
  const now = Date.now();
  const owners: BusinessOwner[] = DEFAULT_OWNERS.map((o, i) => ({
    id: 'o' + (now + i).toString(36),
    name: o.name, category: o.category, color: o.color,
    active: true, createdAt: new Date().toISOString(),
  }));
  if (USE_PG) {
    const sql = await pg();
    for (const o of owners) {
      await sql`INSERT INTO portal_owners (id, data) VALUES (${o.id}, ${JSON.stringify(o)}::jsonb)
                ON CONFLICT (id) DO NOTHING`;
    }
  } else {
    fwrite('owners', owners);
  }
}

/* ================= USERS ================= */
async function listUsersRaw(): Promise<User[]> {
  if (USE_PG) {
    const sql = await pg();
    const { rows } = await sql`SELECT id, username, name, role, password, created_at FROM portal_users ORDER BY created_at ASC`;
    return rows.map((r) => ({ id: r.id, username: r.username, name: r.name || '', role: r.role, password: r.password, createdAt: new Date(r.created_at).toISOString() }));
  }
  return fread<User[]>('users', []);
}
export async function listUsers(): Promise<PublicUser[]> {
  return (await listUsersRaw()).map((u) => publicUser(u)!);
}
export async function findById(id: string): Promise<User | null> {
  return (await listUsersRaw()).find((u) => u.id === id) || null;
}
export async function findByUsername(username: string): Promise<User | null> {
  const u = String(username || '').toLowerCase();
  return (await listUsersRaw()).find((x) => x.username.toLowerCase() === u) || null;
}
export async function authenticate(username: string, password: string): Promise<User | null> {
  const user = await findByUsername(username);
  if (!user || !verifyPassword(password, user.password)) return null;
  return user;
}
export async function createUser(input: { username: string; name?: string; role?: string; password: string }): Promise<PublicUser> {
  const username = String(input.username || '').trim();
  if (!username) throw new Error('Username is required');
  if (await findByUsername(username)) throw new Error('That username already exists');
  if (!input.password || String(input.password).length < 4) throw new Error('Password must be at least 4 characters');
  const user: User = {
    id: uid(), username, name: String(input.name || '').trim(),
    role: input.role === 'owner' ? 'owner' : 'viewer',
    password: hashPassword(input.password), createdAt: new Date().toISOString()
  };
  if (USE_PG) {
    const sql = await pg();
    await sql`INSERT INTO portal_users (id, username, name, role, password, created_at)
              VALUES (${user.id}, ${user.username}, ${user.name}, ${user.role}, ${user.password}, ${user.createdAt})`;
  } else {
    const users = await listUsersRaw(); users.push(user); fwrite('users', users);
  }
  return publicUser(user)!;
}
export async function updateUser(id: string, input: { name?: string; role?: string; password?: string }): Promise<PublicUser> {
  const users = await listUsersRaw();
  const u = users.find((x) => x.id === id);
  if (!u) throw new Error('User not found');
  if (input.name != null) u.name = String(input.name).trim();
  if (input.role != null) {
    const nextRole: Role = input.role === 'owner' ? 'owner' : 'viewer';
    if (u.role === 'owner' && nextRole !== 'owner' && users.filter((x) => x.role === 'owner').length <= 1)
      throw new Error('Cannot demote the only owner');
    u.role = nextRole;
  }
  if (input.password) {
    if (String(input.password).length < 4) throw new Error('Password must be at least 4 characters');
    u.password = hashPassword(input.password);
  }
  if (USE_PG) {
    const sql = await pg();
    await sql`UPDATE portal_users SET name=${u.name}, role=${u.role}, password=${u.password} WHERE id=${u.id}`;
  } else {
    fwrite('users', users);
  }
  return publicUser(u)!;
}
export async function deleteUser(id: string) {
  const users = await listUsersRaw();
  const target = users.find((u) => u.id === id);
  if (!target) return;
  if (target.role === 'owner' && users.filter((u) => u.role === 'owner').length <= 1)
    throw new Error('Cannot delete the only owner');
  if (USE_PG) { const sql = await pg(); await sql`DELETE FROM portal_users WHERE id=${id}`; }
  else fwrite('users', users.filter((u) => u.id !== id));
}

/* ================= BUSINESS OWNERS ================= */
async function listOwnersRaw(): Promise<BusinessOwner[]> {
  if (USE_PG) {
    const sql = await pg();
    const { rows } = await sql`SELECT data FROM portal_owners`;
    return rows.map((r) => r.data as BusinessOwner);
  }
  return fread<BusinessOwner[]>('owners', []);
}
function sortOwners(list: BusinessOwner[]): BusinessOwner[] {
  const order: Record<string, number> = { Academy: 0, Services: 1, Other: 2 };
  return list.slice().sort((a, b) =>
    (order[a.category] ?? 9) - (order[b.category] ?? 9) || a.name.localeCompare(b.name));
}
export async function listOwners(): Promise<BusinessOwner[]> {
  return sortOwners(await listOwnersRaw());
}
export async function getOwner(id: string): Promise<BusinessOwner | null> {
  return (await listOwnersRaw()).find((o) => o.id === id) || null;
}
async function saveOwner(o: BusinessOwner) {
  if (USE_PG) {
    const sql = await pg();
    await sql`INSERT INTO portal_owners (id, data) VALUES (${o.id}, ${JSON.stringify(o)}::jsonb)
              ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`;
  } else {
    const list = await listOwnersRaw();
    const i = list.findIndex((x) => x.id === o.id);
    if (i >= 0) list[i] = o; else list.push(o);
    fwrite('owners', list);
  }
}
function normalizeOwnerInput(body: Record<string, unknown>): { name: string; category: OwnerCategory; color: string; active: boolean } {
  const name = String(body.name || '').trim();
  const category = (OWNER_CATEGORIES.includes(body.category as OwnerCategory) ? body.category : 'Other') as OwnerCategory;
  const color = /^#[0-9a-fA-F]{6}$/.test(String(body.color)) ? String(body.color) : '#64748b';
  const active = body.active === undefined ? true : !!body.active;
  return { name, category, color, active };
}
export async function createOwner(body: Record<string, unknown>): Promise<BusinessOwner> {
  const n = normalizeOwnerInput(body);
  if (!n.name) throw new Error('Owner name is required');
  const list = await listOwnersRaw();
  if (list.some((o) => o.name.toLowerCase() === n.name.toLowerCase())) throw new Error('An owner with that name already exists');
  const owner: BusinessOwner = { id: uid('o'), ...n, createdAt: new Date().toISOString() };
  await saveOwner(owner);
  return owner;
}
export async function updateOwner(id: string, body: Record<string, unknown>): Promise<BusinessOwner> {
  const existing = await getOwner(id);
  if (!existing) throw new Error('Owner not found');
  const list = await listOwnersRaw();
  const patch: Partial<BusinessOwner> = {};
  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) throw new Error('Owner name is required');
    if (list.some((o) => o.id !== id && o.name.toLowerCase() === name.toLowerCase())) throw new Error('An owner with that name already exists');
    patch.name = name;
  }
  if (body.category !== undefined) patch.category = (OWNER_CATEGORIES.includes(body.category as OwnerCategory) ? body.category : existing.category) as OwnerCategory;
  if (body.color !== undefined && /^#[0-9a-fA-F]{6}$/.test(String(body.color))) patch.color = String(body.color);
  if (body.active !== undefined) patch.active = !!body.active;
  const owner: BusinessOwner = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  await saveOwner(owner);
  return owner;
}
export async function removeOwner(id: string) {
  const projects = await listProjects();
  const inUse = projects.filter((p) => p.ownerId === id).length;
  if (inUse > 0) throw new Error(`This owner is linked to ${inUse} project${inUse === 1 ? '' : 's'}. Reassign or deactivate it instead of deleting.`);
  if (USE_PG) { const sql = await pg(); await sql`DELETE FROM portal_owners WHERE id=${id}`; }
  else fwrite('owners', (await listOwnersRaw()).filter((o) => o.id !== id));
}

/* ================= PROJECTS ================= */
function normalizeProject(body: Record<string, unknown>, existing?: Project) {
  const status = PROJECT_STATUSES.includes(String(body.status)) ? String(body.status) : (existing ? existing.status : 'Active');
  const budget = body.budget !== undefined ? Number(body.budget) || 0 : (body.value !== undefined ? Number(body.value) || 0 : (existing ? existing.budget : 0));
  return {
    ownerId: body.ownerId !== undefined ? String(body.ownerId || '') : (existing ? existing.ownerId : ''),
    name: String(body.name || '').trim(),
    code: String(body.code || '').trim(),
    client: String(body.client || '').trim(),
    description: String(body.description ?? body.notes ?? '').trim(),
    currency: (body.currency === 'USD' ? 'USD' : 'PKR') as 'PKR' | 'USD',
    budget,
    value: budget,
    status,
    startDate: String(body.startDate || '').slice(0, 10),
    endDate: String(body.endDate || '').slice(0, 10),
    archived: body.archived !== undefined ? !!body.archived : (existing ? existing.archived : false),
    notes: String(body.notes ?? body.description ?? '')
  };
}
/* Back-fill defaults for projects saved before the schema grew. */
function migrateProject(p: Partial<Project> & { id: string }): Project {
  const budget = p.budget ?? p.value ?? 0;
  return {
    id: p.id, ownerId: p.ownerId || '', name: p.name || '', code: p.code || '',
    client: p.client || '', description: p.description ?? p.notes ?? '',
    currency: p.currency === 'USD' ? 'USD' : 'PKR', budget, value: budget,
    status: p.status || 'Active', startDate: p.startDate || '', endDate: p.endDate || '',
    archived: !!p.archived, notes: p.notes ?? p.description ?? '',
    createdAt: p.createdAt || new Date().toISOString(), updatedAt: p.updatedAt,
  };
}
export async function listProjects(): Promise<Project[]> {
  let rows: Array<Partial<Project> & { id: string }>;
  if (USE_PG) {
    const sql = await pg();
    const res = await sql`SELECT data FROM portal_projects`;
    rows = res.rows.map((r) => r.data as Project);
  } else {
    rows = fread<Project[]>('projects', []);
  }
  return rows.map(migrateProject).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}
export async function getProject(id: string): Promise<Project | null> {
  return (await listProjects()).find((p) => p.id === id) || null;
}
async function saveProject(p: Project) {
  if (USE_PG) {
    const sql = await pg();
    await sql`INSERT INTO portal_projects (id, data) VALUES (${p.id}, ${JSON.stringify(p)}::jsonb)
              ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`;
  } else {
    const list = fread<Project[]>('projects', []);
    const i = list.findIndex((x) => x.id === p.id);
    if (i >= 0) list[i] = p; else list.push(p);
    fwrite('projects', list);
  }
}
export async function createProject(body: Record<string, unknown>): Promise<Project> {
  const n = normalizeProject(body);
  if (!n.name) throw new Error('Project name is required');
  const project: Project = { id: uid('p'), ...n, createdAt: new Date().toISOString() };
  await saveProject(project);
  return project;
}
export async function updateProject(id: string, body: Record<string, unknown>): Promise<Project> {
  const existing = await getProject(id);
  if (!existing) throw new Error('Project not found');
  const n = normalizeProject(body, existing);
  if (!n.name) throw new Error('Project name is required');
  const project: Project = { ...existing, ...n, updatedAt: new Date().toISOString() };
  await saveProject(project);
  return project;
}
export async function removeProject(id: string) {
  // unlink documents first
  const docs = await getAllDocs();
  for (const d of docs) if (d.projectId === id) await upsertDoc({ ...d, projectId: '' });
  if (USE_PG) { const sql = await pg(); await sql`DELETE FROM portal_projects WHERE id=${id}`; }
  else fwrite('projects', fread<Project[]>('projects', []).filter((p) => p.id !== id));
}

/* ================= DOCUMENTS ================= */
/* Owner of a document: an explicit override wins, otherwise it is inherited
   from the linked project's owner. */
export async function resolveOwnerId(overrideOwnerId: unknown, projectId: unknown): Promise<string> {
  const override = String(overrideOwnerId || '').trim();
  if (override) return override;
  const pid = String(projectId || '').trim();
  if (!pid) return '';
  const p = await getProject(pid);
  return p ? p.ownerId || '' : '';
}
export async function getAllDocs(): Promise<Doc[]> {
  if (USE_PG) {
    const sql = await pg();
    const { rows } = await sql`SELECT data FROM portal_documents`;
    return rows.map((r) => r.data as Doc);
  }
  return fread<Doc[]>('documents', []);
}
export async function getDoc(id: string): Promise<Doc | null> {
  return (await getAllDocs()).find((d) => d.id === id) || null;
}
export async function upsertDoc(doc: Doc) {
  if (USE_PG) {
    const sql = await pg();
    await sql`INSERT INTO portal_documents (id, data) VALUES (${doc.id}, ${JSON.stringify(doc)}::jsonb)
              ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`;
  } else {
    const docs = fread<Doc[]>('documents', []);
    const i = docs.findIndex((d) => d.id === doc.id);
    if (i >= 0) docs[i] = doc; else docs.push(doc);
    fwrite('documents', docs);
  }
  return doc;
}
export async function deleteDoc(id: string) {
  if (USE_PG) { const sql = await pg(); await sql`DELETE FROM portal_documents WHERE id=${id}`; }
  else fwrite('documents', fread<Doc[]>('documents', []).filter((d) => d.id !== id));
}

/* ================= SEQUENCES ================= */
async function readSeq(): Promise<Record<string, number>> {
  if (USE_PG) {
    const sql = await pg();
    const { rows } = await sql`SELECT key, n FROM portal_sequences`;
    const o: Record<string, number> = {};
    rows.forEach((r) => (o[r.key] = r.n));
    return o;
  }
  return fread<Record<string, number>>('sequences', {});
}
export async function peekNextSeq(type: string, year: number | string) {
  const seq = await readSeq();
  return (seq[`${type}-${year}`] || 0) + 1;
}
export async function commitSeq(type: string, year: number | string, n: number) {
  const key = `${type}-${year}`;
  if (USE_PG) {
    const sql = await pg();
    await sql`INSERT INTO portal_sequences (key, n) VALUES (${key}, ${n})
              ON CONFLICT (key) DO UPDATE SET n = GREATEST(portal_sequences.n, EXCLUDED.n)`;
  } else {
    const seq = fread<Record<string, number>>('sequences', {});
    seq[key] = Math.max(seq[key] || 0, n);
    fwrite('sequences', seq);
  }
}
