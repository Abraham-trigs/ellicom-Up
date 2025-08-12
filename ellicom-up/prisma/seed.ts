import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // SuperAdmin data
  const superAdminEmail = "superadmin@example.com";
  const existingSuperAdmin = await prisma.user.findUnique({ where: { email: superAdminEmail } });

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
    console.log("Created SuperAdmin user:", superAdmin.email);
  } else {
    console.log("SuperAdmin user already exists.");
  }

  // Admin data
  const adminEmail = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

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
    console.log("Created Admin user:", admin.email);
  } else {
    console.log("Admin user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
