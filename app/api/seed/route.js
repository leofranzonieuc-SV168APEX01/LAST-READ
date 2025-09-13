import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST() {
  const count = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  if (count > 0) return NextResponse.json({ ok: false, message: 'Déjà initialisé.' }, { status: 400 });
  const email = process.env.ADMIN_EMAIL || 'admin@local.test';
  const pass = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const hash = await bcrypt.hash(pass, 12);
  db.prepare('INSERT INTO users (email, name, passwordHash, role, isAdherent) VALUES (?, ?, ?, ?, ?)').run(email, 'Admin', hash, 'admin', 1);
  return NextResponse.json({ ok: true, admin: { email } });
}
