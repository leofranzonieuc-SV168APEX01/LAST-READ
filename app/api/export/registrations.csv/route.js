import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const rows = db.prepare(`
    SELECT r.id, u.email as userEmail, u.name as userName, e.title as eventTitle, e.date as eventDate, r.createdAt as registeredAt
    FROM registrations r
    JOIN users u ON u.id = r.userId
    JOIN events e ON e.id = r.eventId
    ORDER BY e.date DESC, r.createdAt DESC
  `).all();
  const header = 'id,userEmail,userName,eventTitle,eventDate,registeredAt';
  const body = rows.map(r => [r.id, r.userEmail, r.userName||'', r.eventTitle, r.eventDate, r.registeredAt].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const csv = header + '\n' + body + '\n';
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="registrations.csv"'
    }
  });
}
