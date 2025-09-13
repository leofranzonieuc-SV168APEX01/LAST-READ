import { NextResponse } from 'next/server';
import { addRegistration, countRegistrations, listEvents } from '@/lib/db';
import { getUserFromCookie } from '@/lib/auth';

export async function POST(req, { params }) {
  const user = getUserFromCookie();
  if (!user) return NextResponse.json({ error: 'Connexion requise' }, { status: 401 });
  if (!user.member) return NextResponse.json({ error: 'Réservé aux adhérents' }, { status: 403 });
  const { id } = params;
  const evt = listEvents().find(e => e.id === id);
  if (!evt) return NextResponse.json({ error: 'Évènement introuvable' }, { status: 404 });
  const current = countRegistrations(id);
  if (evt.capacity && current >= evt.capacity) {
    return NextResponse.json({ error: 'Complet' }, { status: 409 });
  }
  addRegistration({ eventId: id, userId: user.id });
  return NextResponse.json({ ok: true });
}
