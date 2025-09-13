import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import formidable from 'formidable';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function requireAdmin() {
  const c = cookies().get('auth');
  if (!c) return null;
  try { return verifyToken(c.value); } catch { return null; }
}

export async function POST(req) {
  const payload = await requireAdmin();
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });

  const form = formidable({ multiples: false, keepExtensions: true });
  const buffer = Buffer.from(await req.arrayBuffer());
  const [fields, files] = await new Promise((resolve, reject) => {
    form.parse(buffer, (err, fields, files) => err ? reject(err) : resolve([fields, files]));
  }).catch(() => [null, null]);

  if (!files || !files.file) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 });

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });
  const file = Array.isArray(files.file) ? files.file[0] : files.file;
  const fileName = Date.now() + '-' + (file.originalFilename || 'upload');
  const dest = path.join(uploadDir, fileName);
  fs.copyFileSync(file.filepath, dest);

  return NextResponse.json({ path: `/uploads/${fileName}` });
}
