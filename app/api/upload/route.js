import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const sess = requireRole(['admin']);
  if (!sess) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { filename, base64 } = await req.json();
  const buf = Buffer.from(base64.split(',').pop(), 'base64');
  const destDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const filePath = path.join(destDir, filename);
  fs.writeFileSync(filePath, buf);
  return NextResponse.json({ ok: true, url: `/uploads/${filename}` });
}