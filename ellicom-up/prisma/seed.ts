import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ⚠️ Clear all existing users
  await prisma.user.deleteMany();
  console.log("Deleted all users from User table");

  // --- SUPERADMIN ---
  const superAdminPassword = await bcrypt.hash("SuperSecretPassword123!", 10);
  const superAdmin = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "superadmin@example.com",
      password: superAdminPassword,
      role: "SUPERADMIN",
      phone: "+00000000000",
    },
  });
  console.log("Created SuperAdmin:", superAdmin.email);

  // --- ADMIN ---
  const adminPassword = await bcrypt.hash("AdminPassword123!", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
      phone: "+00000000001",
    },
  });
  console.log("Created Admin:", admin.email);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
