import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireRole } from '@/lib/auth';

export async function PUT(req, { params }) {
  const sess = requireRole(['admin']);
  if (!sess) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = params.id;
  const body = await req.json();
  const stmt = db.prepare(`UPDATE events SET title=?, date=?, location=?, description=?, image=?, capacity=? WHERE id=?`);
  stmt.run(body.title, body.date, body.location || '', body.description || '', body.image || '', body.capacity || null, id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req, { params }) {
  const sess = requireRole(['admin']);
  if (!sess) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = params.id;
  db.prepare('DELETE FROM registrations WHERE event_id=?').run(id);
  db.prepare('DELETE FROM events WHERE id=?').run(id);
  return NextResponse.json({ ok: true });
}