// prisma/seed.ts
import { PrismaClient, Role, JobStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // --- USERS (20) ---
  const roles: Role[] = [Role.SUPERADMIN, Role.ADMIN, Role.SECRETARY, Role.STAFF, Role.CLIENT];
  const users = [];

  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: hashedPassword,
        phone: `+23320${String(100000 + i)}`,
        role: roles[i % roles.length],
      },
    });
    users.push(user);
  }

  console.log(`✅ ${users.length} users seeded successfully!`);

  // --- JOB PRICING (20) ---
  const jobTypes = ["Photocopy", "Printing", "Large Format", "Scanning", "Designing"];
  const materialTypes = ["A4 Paper", "Glossy Paper", "Vinyl", null];
  const variables = ["Per Page", "Per Sheet", "Per SqFt", "Per Project", "Per Unit"];

  for (let i = 0; i < 20; i++) {
    await prisma.jobPricing.create({
      data: {
        jobType: jobTypes[i % jobTypes.length],
        materialType: materialTypes[i % materialTypes.length] || null,
        variable: variables[i % variables.length],
        unitPrice: Math.floor(Math.random() * 90) + 10,
        modifiers: ["B&W", "Double-sided", "Full Color"].slice(0, (i % 3) + 1),
        notes: `Pricing notes ${i + 1}`,
      },
    });
  }

  console.log(`✅ 20 job pricing entries seeded successfully!`);

  // --- JOBS (20) ---
  const statuses: JobStatus[] = [
    JobStatus.DRAFT,
    JobStatus.PENDING,
    JobStatus.IN_PROGRESS,
    JobStatus.COMPLETED,
    JobStatus.CANCELLED,
  ];

  for (let i = 0; i < 20; i++) {
    const createdBy = users[i % users.length];
    const handledBy = users[(i + 1) % users.length];

    await prisma.job.create({
      data: {
        title: `Job ${i + 1}`,
        details: `Details of job ${i + 1}`,
        type: jobTypes[i % jobTypes.length],
        status: statuses[i % statuses.length],
        createdById: createdBy.id,
        handledById: handledBy.id,
      },
    });
  }

  console.log(`✅ 20 jobs seeded successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
