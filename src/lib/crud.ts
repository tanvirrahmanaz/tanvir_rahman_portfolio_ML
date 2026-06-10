/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guard";

/**
 * Minimal shape of a Prisma model delegate. `any` is intentional here so a
 * single factory can serve every model — handlers themselves stay type-safe.
 */
type Delegate = {
  findMany: (args?: any) => Promise<any>;
  findUnique: (args: any) => Promise<any>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
};

/** Standard collection handlers — GET list is public, POST is admin-only. */
export function collectionHandlers(model: Delegate, orderBy: Record<string, "asc" | "desc">[] = [{ order: "asc" }]) {
  return {
    async GET() {
      const items = await model.findMany({ orderBy });
      return NextResponse.json(items);
    },
    async POST(req: Request) {
      const guard = await requireAdmin();
      if (guard) return guard;
      const data = await req.json();
      delete data.id;
      const item = await model.create({ data });
      return NextResponse.json(item, { status: 201 });
    },
  };
}

/** Standard item handlers — GET public, PUT/DELETE admin-only. */
export function itemHandlers(model: Delegate) {
  return {
    async GET(_req: Request, { params }: { params: { id: string } }) {
      const item = await model.findUnique({ where: { id: params.id } });
      if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(item);
    },
    async PUT(req: Request, { params }: { params: { id: string } }) {
      const guard = await requireAdmin();
      if (guard) return guard;
      const data = await req.json();
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      const item = await model.update({ where: { id: params.id }, data });
      return NextResponse.json(item);
    },
    async DELETE(_req: Request, { params }: { params: { id: string } }) {
      const guard = await requireAdmin();
      if (guard) return guard;
      await model.delete({ where: { id: params.id } });
      return NextResponse.json({ ok: true });
    },
  };
}
