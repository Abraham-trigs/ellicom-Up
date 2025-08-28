import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---------------------
  // Seed Users (20)
  // ---------------------
  const roles = ["SUPERADMIN", "ADMIN", "SECRETARY", "STAFF", "CLIENT"];
  const users = [];

  for (let i = 1; i <= 20; i++) {
    const role = roles[i % roles.length] as any;
    const hashedPassword = await bcrypt.hash(`password${i}`, 10);

    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      password: hashedPassword,
      phone: `+2332000${(1000 + i).toString().padStart(4, "0")}`,
      role,
    });
  }

  const createdUsers = await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Users seeded!");

  // ---------------------
  // Seed JobPricing (20)
  // ---------------------
  const jobTypes = ["Printing", "Photocopy", "Scanning", "Designing", "Binding"];
  const variables = ["A4", "A3", "Letter", "Glossy", "Matte", "Standard"];
  const materialTypes = ["Paper", "Cardstock", "Vinyl"];
  const modifiersList = [["Urgent"], ["Express"], ["Bulk"], []];
  const usedCombinations = new Set<string>();

  const jobPricings = [];

  for (let i = 0; i < 20; i++) {
    let jobType = jobTypes[i % jobTypes.length];
    let variable = variables[i % variables.length];

    let key = `${jobType}_${variable}`;
    while (usedCombinations.has(key)) {
      variable = variables[Math.floor(Math.random() * variables.length)];
      key = `${jobType}_${variable}`;
    }
    usedCombinations.add(key);

    jobPricings.push({
      jobType,
      materialType: materialTypes[i % materialTypes.length],
      variable,
      unitPrice: 5 + Math.floor(Math.random() * 50),
      modifiers: modifiersList[i % modifiersList.length],
      notes: `Pricing note ${i + 1}`,
    });
  }

  const createdJobPricings = await prisma.jobPricing.createMany({
    data: jobPricings,
    skipDuplicates: true,
  });

  console.log("JobPricings seeded!");

  // ---------------------
  // Seed Jobs (20)
  // ---------------------
  const jobStatuses = ["DRAFT", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
  const allUsers = await prisma.user.findMany();
  const allPricings = await prisma.jobPricing.findMany();


  const jobs = [];

  for (let i = 0; i < 20; i++) {
    const createdBy = allUsers[i % allUsers.length];
    const handledBy = allUsers[(i + 1) % allUsers.length];
    const pricing = allPricings[i % allPricings.length];

    jobs.push({
      jobType: pricing.jobType,
      details: `Job details ${i + 1}`,
      status: jobStatuses[i % jobStatuses.length] as any,
      createdById: createdBy.id,
      handledById: handledBy.id,
      jobPricingId: pricing.id,
    });
  }

  await prisma.job.createMany({ data: jobs });

  console.log("Jobs seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
