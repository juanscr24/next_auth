import { PrismaClient } from "../generated/prisma/client";

export const prismaClientSingleton = () => {
    return new PrismaClient();
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };

