import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const c = cookies().get('auth');
  if (!c) return NextResponse.json({ user: null });
  try {
    const payload = await verifyToken(c.value);
    const row = db.prepare('SELECT id, email, name, role, isAdherent FROM users WHERE id = ?').get(payload.uid);
    return NextResponse.json({ user: row || null });
  } catch {
    return NextResponse.json({ user: null });
  }
}
