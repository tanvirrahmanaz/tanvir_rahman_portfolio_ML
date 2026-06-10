import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { read } = await req.json();
  const message = await prisma.message.update({ where: { id: params.id }, data: { read: Boolean(read) } });
  return NextResponse.json(message);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (guard) return guard;
  await prisma.message.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
