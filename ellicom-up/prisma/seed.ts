// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const roles = ['SUPERADMIN', 'ADMIN', 'SECRETARY', 'STAFF', 'CLIENT'] as const;

async function main() {
  console.log('🌱 Seeding users...');
  const passwordHash = await bcrypt.hash('password123', 10);

  for (const role of roles) {
    for (let i = 1; i <= 5; i++) {
      await prisma.user.create({
        data: {
          name: `${role}_${i}`,
          email: `${role.toLowerCase()}${i}@ellicom.com`,
          password: passwordHash,
          phone: `+233555000${i}`,
          role,
        },
      });
    }
  }

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
