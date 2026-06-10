export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { collectionHandlers } from "@/lib/crud";

const handlers = collectionHandlers(prisma.socialLink, [{ order: "asc" }]);
export const GET = handlers.GET;
export const POST = handlers.POST;
