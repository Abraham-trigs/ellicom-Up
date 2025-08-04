import { PrismaClient } from "@prisma/client";

// Prevent multiple instances during dev (Next.js hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional: logs SQL in dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
