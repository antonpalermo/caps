import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
  globalThis.prisma ||
  new PrismaClient({ log: ['info', 'error', 'query', 'warn'] })
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
