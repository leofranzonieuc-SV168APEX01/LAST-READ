import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16);

export async function POST(req, { params }) {
  const sess = getSession();
  if (!sess) return NextResponse.json({ error: 'Auth required' }, { status: 401 });
  // Only adherent or admin can register
  if (!['adherent', 'admin'].includes(sess.role)) return NextResponse.json({ error: 'Adhérent requis' }, { status: 403 });
  const id = nanoid();
  try {
    db.prepare('INSERT INTO registrations (id, event_id, user_id, created_at) VALUES (?, ?, ?, ?)').run(id, params.id, sess.sub, new Date().toISOString());
  } catch (e) {
    return NextResponse.json({ error: 'Already registered or invalid' }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}