// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed Clients
  const clients = await prisma.user.createMany({
    data: [
      {
        name: "Sarah Connor",
        email: "sarah@example.com",
        password: "hashed-password-1",
        phone: "0550011221",
        role: Role.CLIENT,
      },
      {
        name: "Kwame Nkrumah",
        email: "kwame@example.com",
        password: "hashed-password-2",
        phone: "0241234567",
        role: Role.CLIENT,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeded clients ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
