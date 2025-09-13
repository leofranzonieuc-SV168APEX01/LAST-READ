import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireRole } from '@/lib/auth';

export async function GET() {
  const sess = requireRole(['admin']);
  if (!sess) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = db.prepare(`
    SELECT r.id, r.created_at, e.title AS event_title, u.email AS user_email
    FROM registrations r
    JOIN events e ON e.id = r.event_id
    JOIN users u ON u.id = r.user_id
    ORDER BY r.created_at DESC
  `).all();
  const header = 'id,created_at,event_title,user_email\n';
  const csv = header + rows.map(r => [r.id, r.created_at, r.event_title, r.user_email].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="registrations.csv"' } });
}