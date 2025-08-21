import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Hash password for demo users
  const hashedPassword = await bcrypt.hash("password123", 10);

  // --- USERS ---
  const admin = await prisma.user.create({
    data: {
      name: "John Admin",
      email: "admin@ellicom.com",
      password: hashedPassword,
      role: "ADMIN", // ✅ changed from SUPERADMIN
      phone: "233201111111",
    },
  });

  const secretary = await prisma.user.create({
    data: {
      name: "Paul Secretary",
      email: "secretary@ellicom.com",
      password: hashedPassword,
      role: "SECRETARY",
      phone: "233202222222",
    },
  });

  const staff1 = await prisma.user.create({
    data: {
      name: "Lisa Designer",
      email: "lisa.staff@ellicom.com",
      password: hashedPassword,
      role: "STAFF",
      phone: "233203333333",
    },
  });

  const staff2 = await prisma.user.create({
    data: {
      name: "Michael Printer",
      email: "michael.staff@ellicom.com",
      password: hashedPassword,
      role: "STAFF",
      phone: "233204444444",
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      name: "Client User",
      email: "client@company.com",
      password: hashedPassword,
      role: "CLIENT",
      phone: "233205555555",
    },
  });

  // --- CLIENTS ---
  await prisma.client.createMany({
    data: [
      {
        name: "Alpha Ltd",
        email: "contact@alpha.com",
        phone: "233206666666",
      },
      {
        name: "Beta Solutions",
        email: "hello@beta.com",
        phone: "233207777777",
      },
      {
        name: "Gamma Ventures",
        email: "info@gamma.com",
        phone: "233208888888",
      },
    ],
  });

  // --- JOB PRICING ---
  await prisma.jobPricing.createMany({
    data: [
      {
        jobType: "Photocopy",
        materialType: "A4 Paper",
        variable: "Per Page",
        unitPrice: 0.1,
        modifiers: ["Black & White", "Double-sided"],
        notes: "Discount for bulk above 500 copies",
      },
      {
        jobType: "Printing",
        materialType: "Glossy Paper",
        variable: "Per Sheet",
        unitPrice: 1.5,
        modifiers: ["Full Color", "A3"],
        notes: "Lamination available",
      },
      {
        jobType: "Large Format",
        materialType: "Vinyl",
        variable: "Per SqFt",
        unitPrice: 5.0,
        modifiers: ["Outdoor", "UV Resistant"],
      },
      {
        jobType: "Scanning",
        variable: "Per Page",
        unitPrice: 0.5,
        modifiers: ["Color", "High-Res"],
      },
      {
        jobType: "Designing",
        variable: "Per Project",
        unitPrice: 50,
        modifiers: ["Logo Design", "Flyer Design"],
        notes: "Revisions up to 3 included",
      },
    ],
  });

  // --- JOBS ---
  await prisma.job.createMany({
    data: [
      {
        title: "Business Cards for Alpha Ltd",
        details: "Design and print 500 business cards",
        type: "Printing",
        status: "IN_PROGRESS",
        createdById: admin.id,
        handledById: staff1.id,
      },
      {
        title: "Photocopy Bulk Documents",
        details: "1000 pages double-sided for Beta Solutions",
        type: "Photocopy",
        status: "PENDING",
        createdById: secretary.id,
        handledById: staff2.id,
      },
      {
        title: "Event Banner",
        details: "10x4 ft banner for Gamma Ventures launch event",
        type: "Large Format",
        status: "COMPLETED",
        createdById: admin.id, // ✅ previously superAdmin, now admin
        handledById: staff2.id,
      },
      {
        title: "Logo Redesign",
        details: "Modernize client logo design",
        type: "Designing",
        status: "DRAFT",
        createdById: clientUser.id,
        handledById: staff1.id,
      },
    ],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
