import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth"; // si absent, remplace par un stub (voir note plus bas)

// GET: liste séparée futur/passé
export async function GET() {
  const rows = await prisma.event.findMany({ orderBy: { date: "asc" } });
  const now = new Date();
  const future = rows.filter(r => new Date(r.date) >= now);
  const past = rows.filter(r => new Date(r.date) < now);
  return NextResponse.json({ future, past });
}

// POST: création (admin)
export async function POST(req) {
  const sess = typeof requireRole === "function" ? requireRole(["admin"]) : true;
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const event = await prisma.event.create({
    data: {
      title: body.title,
      date: new Date(body.date),
      location: body.location || "",
      notes: body.notes || "",
      image: body.image || "",
      distance: body.distance || "",
      discipline: body.discipline || "",
    },
  });
  return NextResponse.json({ ok: true, event });
}

// PUT: modification (admin)
export async function PUT(req) {
  const sess = typeof requireRole === "function" ? requireRole(["admin"]) : true;
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Missing event id" }, { status: 400 });

  const event = await prisma.event.update({
    where: { id: body.id },
    data: {
      title: body.title,
      date: new Date(body.date),
      location: body.location || "",
      notes: body.notes || "",
      image: body.image || "",
      distance: body.distance || "",
      discipline: body.discipline || "",
    },
  });
  return NextResponse.json({ ok: true, event });
}

// DELETE: suppression (admin)
export async function DELETE(req) {
  const sess = typeof requireRole === "function" ? requireRole(["admin"]) : true;
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Missing event id" }, { status: 400 });

  await prisma.event.delete({ where: { id: body.id } });
  return NextResponse.json({ ok: true });
}
