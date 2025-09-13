import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { signToken, cookieOptions } from '@/lib/auth';

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
  }
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!row) return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
  const ok = await bcrypt.compare(password, row.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });

  const token = await signToken({ uid: row.id, role: row.role, isAdherent: !!row.isAdherent, email: row.email, name: row.name });
  const res = NextResponse.json({ ok: true, user: { id: row.id, email: row.email, role: row.role, isAdherent: !!row.isAdherent, name: row.name } });
  res.cookies.set('auth', token, cookieOptions());
  return res;
}
