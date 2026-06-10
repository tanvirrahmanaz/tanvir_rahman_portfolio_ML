import { prisma } from "@/lib/prisma";
import { itemHandlers } from "@/lib/crud";

const handlers = itemHandlers(prisma.education);
export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
