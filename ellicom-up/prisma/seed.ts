import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "superadmin@example.com";
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log("SuperAdmin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("SuperSecretPassword123!", 10);

  const user = await prisma.user.create({
    data: {
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "SUPERADMIN",
      phone: "+00000000000",
    },
  });

  console.log("Created SuperAdmin user:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


  