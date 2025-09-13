import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Petite aide: récupérer body soit JSON soit FormData
async function getBody(req) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await req.json();
  const fd = await req.formData();
  const obj = {};
  for (const [k, v] of fd.entries()) obj[k] = v;
  return obj;
}

// GET: un admin voit tout, sinon l'utilisateur voit ses inscriptions
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const isAdmin = session.user.role === "ADMIN";
  const where = isAdmin ? {} : { userId: session.user.id };

  const regs = await prisma.registration.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      event: true,
      user: isAdmin, // n'inclut l'user que si admin
    },
  });

  return NextResponse.json(regs);
}

// POST: créer une inscription (doit être connecté ET adhérent)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.user.isAdherent) return NextResponse.json({ error: "Adherent required" }, { status: 403 });

  const body = await getBody(req);
  const eventId = Number(body.eventId || body.eventID || body.event_id);
  if (!eventId) return NextResponse.json({ error: "Missing eventId" }, { status: 400 });

  const ev = await prisma.event.findUnique({ where: { id: eventId } });
  if (!ev) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  // éviter les doublons
  const existing = await prisma.registration.findFirst({
    where: { userId: session.user.id, eventId },
  });
  if (existing) {
    // Si ça vient d'un formulaire, on peut rediriger silencieusement
    if (req.headers.get("content-type")?.includes("application/x-www-form-urlencoded")) {
      return NextResponse.redirect(new URL("/events?already=1", req.url));
    }
    return NextResponse.json({ ok: true, already: true, id: existing.id });
  }

  const reg = await prisma.registration.create({
    data: { userId: session.user.id, eventId },
  });

  // Si c'est un <form> natif, on redirige vers /events
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return NextResponse.redirect(new URL("/events?registered=1", req.url));
  }

  return NextResponse.json({ ok: true, id: reg.id });
}

// DELETE: annuler son inscription
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await getBody(req);
  const eventId = Number(body.eventId || body.eventID || body.event_id);
  if (!eventId) return NextResponse.json({ error: "Missing eventId" }, { status: 400 });

  const reg = await prisma.registration.findFirst({
    where: { userId: session.user.id, eventId },
  });
  if (!reg) return NextResponse.json({ error: "Registration not found" }, { status: 404 });

  await prisma.registration.delete({ where: { id: reg.id } });
  return NextResponse.json({ ok: true });
}
