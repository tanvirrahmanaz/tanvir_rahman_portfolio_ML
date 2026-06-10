export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

export async function GET() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  return NextResponse.json(profile);
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const data = await req.json();
  const { id: _id, ...fields } = data;
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: fields,
    create: { id: 1, ...fields },
  });
  return NextResponse.json(profile);
}
