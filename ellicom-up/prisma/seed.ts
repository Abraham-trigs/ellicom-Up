// prisma/seed.ts
import { PrismaClient, Role, JobStatus, JobType, InvoiceStatus } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding DB...");

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@ellicom.com" },
    update: {},
    create: {
      name: "Admin CEO",
      email: "admin@ellicom.com",
      password: "hashedpassword", // hash in real life
      phone: "0550001111",
      role: Role.ADMIN,
      avatarUrl: "https://ui-avatars.com/api/?name=Admin+CEO",
    },
  });

  // Create Client
  const client = await prisma.user.create({
    data: {
      name: "Kwame Client",
      email: "client@ellicom.com",
      password: "hashedpassword",
      role: Role.CLIENT,
      phone: "0552223333",
    },
  });

  // Create Jobs
  const job1 = await prisma.job.create({
    data: {
      title: "Print business cards",
      description: "300 GSM matte finish, double-sided",
      type: JobType.PRINTING,
      status: JobStatus.IN_PROGRESS,
      submittedBy: client.id,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: "Photocopy 200 pages",
      type: JobType.PHOTOCOPY,
      status: JobStatus.PENDING,
      submittedBy: client.id,
    },
  });

  // Create Invoices
  await prisma.invoice.createMany({
    data: [
      {
        jobId: job1.id,
        userId: client.id,
        amount: 120.5,
        status: InvoiceStatus.UNPAID,
      },
      {
        jobId: job2.id,
        userId: client.id,
        amount: 45.0,
        status: InvoiceStatus.PAID,
      },
    ],
  });

  console.log("✅ Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
