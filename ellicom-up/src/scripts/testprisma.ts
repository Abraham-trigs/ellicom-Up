// scripts/testPrisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log("All users:", allUsers);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
