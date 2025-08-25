// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Super Admin",
        email: "superadmin@example.com",
        password, // always hashed
        role: "SUPERADMIN",
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password,
        role: "ADMIN",
      },
      {
        name: "Secretary User",
        email: "secretary@example.com",
        password,
        role: "SECRETARY",
      },
      {
        name: "Staff User",
        email: "staff@example.com",
        password,
        role: "STAFF",
      },
      {
        name: "Client User",
        email: "client@example.com",
        password,
        role: "CLIENT",
      },
    ],
  });

  console.log("✅ Seeded users with hashed passwords");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
