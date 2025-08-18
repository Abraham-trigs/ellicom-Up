import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- SUPERADMIN ---
  const superAdminEmail = "superadmin@example.com";
  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingSuperAdmin) {
    const hashedPassword = await bcrypt.hash("SuperSecretPassword123!", 10);
    const superAdmin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: superAdminEmail,
        password: hashedPassword,
        role: "SUPERADMIN",
        phone: "+00000000000",
      },
    });
    console.log("Created SuperAdmin:", superAdmin.email);
  } else {
    console.log("SuperAdmin already exists.");
  }

  // --- ADMIN ---
  const adminEmail = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        phone: "+00000000001",
      },
    });
    console.log("Created Admin:", admin.email);
  } else {
    console.log("Admin already exists.");
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
