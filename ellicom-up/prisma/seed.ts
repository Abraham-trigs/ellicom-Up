import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SuperAdmin' },
    update: {},
    create: { name: 'SuperAdmin' },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' },
  });

  const secretaryRole = await prisma.role.upsert({
    where: { name: 'Secretary' },
    update: {},
    create: { name: 'Secretary' },
  });

  const staffRole = await prisma.role.upsert({
    where: { name: 'Staff' },
    update: {},
    create: { name: 'Staff' },
  });

  // Create users
  await prisma.user.upsert({
    where: { email: 'super@ellicom.com' },
    update: {},
    create: {
      name: 'Super Abraham',
      email: 'super@ellicom.com',
      roleId: superAdminRole.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'ceo@ellicom.com' },
    update: {},
    create: {
      name: 'The CEO',
      email: 'ceo@ellicom.com',
      roleId: adminRole.id,
    },
  });

  console.log('✅ Seed data added successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
