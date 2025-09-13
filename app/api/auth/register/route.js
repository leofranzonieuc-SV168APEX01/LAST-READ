import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req) {
  const { email, password, name } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "email et password requis" }, { status: 400 });
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
  }
  const passwordHash = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, name: name || null },
  });
  return NextResponse.json({ ok: true, id: user.id });
}
