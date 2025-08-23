// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Starting database seeding...");

    // --- Seed Users ---
    const users = [
      {
        name: "Super Admin",
        email: "superadmin@ellicom.com",
        phone: "+233201234567",
        role: "SUPERADMIN",
      },
      {
        name: "Admin",
        email: "admin@ellicom.com",
        phone: "+233209876543",
        role: "ADMIN",
      },
      {
        name: "Secretary",
        email: "secretary@ellicom.com",
        phone: "+233209111111",
        role: "SECRETARY",
      },
      {
        name: "Staff Designer",
        email: "staff@ellicom.com",
        phone: "+233209222222",
        role: "STAFF",
      },
      {
        name: "Client John",
        email: "client@ellicom.com",
        phone: "+233209333333",
        role: "CLIENT",
      },
    ];

for (const user of users) {
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      totalRevenue: user.totalRevenue ?? 0,
      totalJobs: user.totalJobs ?? 0,
    },
  });
}

    // --- Seed Jobs ---
    const jobClient = await prisma.user.findUnique({ where: { email: "client@ellicom.com" } });
    const jobHandler = await prisma.user.findUnique({ where: { email: "staff@ellicom.com" } });

    if (!jobClient) throw new Error("❌ Cannot seed jobs: Client user not found");
    if (!jobHandler) throw new Error("❌ Cannot seed jobs: Staff handler not found");

    const jobs = [
      {
        title: "Photocopy Project",
        description: "100-page photocopy job",
        jobType: "PHOTOCOPY",
        price: 50,
        clientId: jobClient.id,
        handlerId: jobHandler.id,
      },
      {
        title: "Design Project",
        description: "Logo design",
        jobType: "DESIGNING",
        price: 200,
        clientId: jobClient.id,
        handlerId: jobHandler.id,
      },
    ];

    for (const job of jobs) {
      if (!job.clientId) throw new Error(`❌ Missing clientId for job: ${job.title}`);
      if (!job.handlerId) throw new Error(`❌ Missing handlerId for job: ${job.title}`);
      if (!job.price || job.price <= 0) throw new Error(`❌ Invalid price for job: ${job.title}`);

      try {
        await prisma.job.create({ data: job });
      } catch (err: any) {
        if (err.code === "P2002") {
          console.error(`❌ Duplicate job field: ${err.meta?.target?.join(", ")}`);
        } else {
          console.error(`❌ Failed to create job ${job.title}:`, err.message);
        }
      }
    }

    // --- Seed Pricing (example) ---
    const pricing = [
      { jobType: "PHOTOCOPY", basePrice: 0.5, unit: "page" },
      { jobType: "PRINTING", basePrice: 1, unit: "page" },
      { jobType: "DESIGNING", basePrice: 100, unit: "project" },
    ];

    for (const price of pricing) {
      if (!price.jobType) throw new Error("❌ Missing jobType in pricing");
      if (!price.basePrice || price.basePrice <= 0) {
        throw new Error(`❌ Invalid basePrice for pricing: ${price.jobType}`);
      }

      try {
        await prisma.jobPricing.create({ data: price });
      } catch (err: any) {
        if (err.code === "P2002") {
          console.error(`❌ Duplicate pricing entry: ${err.meta?.target?.join(", ")}`);
        } else {
          console.error(`❌ Failed to create pricing for ${price.jobType}:`, err.message);
        }
      }
    }

    console.log("✅ Database seeding completed.");
  } catch (error: any) {
    console.error("❌ Fatal seeding error:", error.message || error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
