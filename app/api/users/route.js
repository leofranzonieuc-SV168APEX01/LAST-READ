import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { verifyToken } from '@/lib/auth';

function requireAdmin() {
  const c = cookies().get('auth');
  if (!c) return null;
  try { return verifyToken(c.value); } catch { return null; }
}

export async function POST(req) {
  const payload = await requireAdmin();
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  const body = await req.json();
  const { email, name, password, isAdherent = false, role = 'user' } = body;
  if (!email || !password) return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
  const passwordHash = await bcrypt.hash(password, 12);
  try {
    const info = db.prepare('INSERT INTO users (email, name, passwordHash, role, isAdherent) VALUES (?, ?, ?, ?, ?)').run(email, name || null, passwordHash, role, isAdherent ? 1 : 0);
    return NextResponse.json({ id: info.lastInsertRowid });
  } catch (e) {
    return NextResponse.json({ error: 'Impossible de créer cet utilisateur (email déjà utilisé ?)' }, { status: 400 });
  }
}

export async function PATCH(req) {
  const payload = await requireAdmin();
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  const body = await req.json();
  const { id, isAdherent, role } = body;
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!row) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
  db.prepare('UPDATE users SET isAdherent = ?, role = ? WHERE id = ?').run(isAdherent ? 1 : 0, role || row.role, id);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const payload = await requireAdmin();
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  const list = db.prepare('SELECT id, email, name, role, isAdherent, createdAt FROM users ORDER BY createdAt DESC').all();
  return NextResponse.json({ users: list });
}
