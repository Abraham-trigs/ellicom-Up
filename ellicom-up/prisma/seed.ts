import { PrismaClient, JobStatus, JobType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Ellicom Hub...');

  // Delete old data
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();
  await prisma.client.deleteMany();
  await prisma.role.deleteMany();

  // Roles
  await prisma.role.createMany({
    data: [
      { name: 'SuperAdmin' },
      { name: 'Admin' },
      { name: 'Secretary' },
      { name: 'Staff' },
    ],
  });

  const superAdminRole = await prisma.role.findUnique({ where: { name: 'SuperAdmin' } });
  const staffRole = await prisma.role.findUnique({ where: { name: 'Staff' } });

  // Users
  const [superAdmin, staff1] = await prisma.$transaction([
    prisma.user.create({
      data: {
        name: 'Abraham Ellicom',
        email: 'abraham@ellicom.com',
        password: 'hashed-superadmin-pw',
        roleId: superAdminRole!.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Sandra Mensah',
        email: 'sandra@ellicom.com',
        password: 'hashed-staff-pw',
        roleId: staffRole!.id,
      },
    }),
  ]);

  // Clients
  const client = await prisma.client.create({
    data: {
      name: 'Kwame Nyarko',
      email: 'kwame@gmail.com',
      phone: '+233555123456',
      company: 'Kwame Ventures',
      address: 'Accra, Ghana',
    },
  });

  // Jobs (20 total)
  await prisma.job.createMany({
    data: [
      { title: 'Photocopy 200 pages', description: 'Law school coursework', type: JobType.PHOTOCOPY, status: JobStatus.COMPLETED, userId: staff1.id },
      { title: 'Design + Print Flyers', description: 'Streetwear promo flyers', type: JobType.PRINTING, status: JobStatus.IN_PROGRESS, clientId: client.id },
      { title: 'Large Format Poster', description: 'A1 posters for conference', type: JobType.LARGE_FORMAT, status: JobStatus.PENDING, clientId: client.id },
      { title: 'Thesis Printing', description: 'Final year thesis print', type: JobType.PRINTING, status: JobStatus.COMPLETED, userId: staff1.id },
      { title: 'Scan Old Photos', description: 'High-res scan of vintage images', type: JobType.SCANNING, status: JobStatus.CANCELLED, clientId: client.id },
      { title: 'Photocopy Booklet', description: 'Church program booklet', type: JobType.PHOTOCOPY, status: JobStatus.COMPLETED, clientId: client.id },
      { title: 'Print Business Cards', description: 'Cards for new employees', type: JobType.PRINTING, status: JobStatus.IN_PROGRESS, userId: staff1.id },
      { title: 'Scan Legal Docs', description: 'Contracts and affidavits', type: JobType.SCANNING, status: JobStatus.PENDING, userId: staff1.id },
      { title: 'Wide Format Banner', description: 'Outdoor banner 5ft x 2ft', type: JobType.LARGE_FORMAT, status: JobStatus.COMPLETED, clientId: client.id },
      { title: 'Flyer Design Only', description: 'Digital marketing use', type: JobType.PRINTING, status: JobStatus.CANCELLED, clientId: client.id },
      { title: 'ID Card Printing', description: 'For school event', type: JobType.PRINTING, status: JobStatus.IN_PROGRESS, userId: staff1.id },
      { title: 'Scan Architecture Drawings', description: 'Blueprint digitization', type: JobType.SCANNING, status: JobStatus.COMPLETED, userId: staff1.id },
      { title: 'Mass Photocopy', description: '1000-page NGO report', type: JobType.PHOTOCOPY, status: JobStatus.PENDING, clientId: client.id },
      { title: 'Large Format Backdrop', description: 'Stage background', type: JobType.LARGE_FORMAT, status: JobStatus.COMPLETED, userId: staff1.id },
      { title: 'Print Stickers', description: 'Product packaging labels', type: JobType.PRINTING, status: JobStatus.PENDING, clientId: client.id },
      { title: 'Scan Receipts', description: 'For tax filing', type: JobType.SCANNING, status: JobStatus.COMPLETED, clientId: client.id },
      { title: 'Photocopy Exam Sheets', description: 'Mock exams for SHS', type: JobType.PHOTOCOPY, status: JobStatus.IN_PROGRESS, userId: staff1.id },
      { title: 'Roll-up Banner', description: 'Trade show material', type: JobType.LARGE_FORMAT, status: JobStatus.CANCELLED, clientId: client.id },
      { title: 'Print Annual Reports', description: 'End-of-year company reports', type: JobType.PRINTING, status: JobStatus.COMPLETED, clientId: client.id },
      { title: 'Scan Student Forms', description: 'Admission documents', type: JobType.SCANNING, status: JobStatus.IN_PROGRESS, userId: staff1.id },
    ],
  });

  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
