export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guard";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { name, email, subject, body } = await req.json();
  if (!name || !email || !body) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  const message = await prisma.message.create({
    data: { name: String(name).slice(0, 200), email: String(email).slice(0, 200), subject: String(subject ?? "").slice(0, 300), body: String(body).slice(0, 5000) },
  });
  return NextResponse.json(message, { status: 201 });
}
