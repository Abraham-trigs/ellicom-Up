import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
// Designing (from image)
await prisma.jobPricing.createMany({
  data: [
    { jobType: "Designing", variable: "Logo", unitPrice: 50, modifiers: [] },
    { jobType: "Designing", variable: "Letterhead", unitPrice: 40, modifiers: [] },
    { jobType: "Designing", variable: "Call Card", unitPrice: 30, modifiers: [] },
    { jobType: "Designing", variable: "Flyer", unitPrice: 40, modifiers: [] },
    { jobType: "Designing", variable: "Poster", unitPrice: 45, modifiers: [] },
    { jobType: "Designing", variable: "Brochure", unitPrice: 60, modifiers: [] },
    { jobType: "Designing", variable: "Receipt", unitPrice: 25, modifiers: [] },
    { jobType: "Designing", variable: "Invoice", unitPrice: 25, modifiers: [] },
    { jobType: "Designing", variable: "Form", unitPrice: 20, modifiers: [] },
    { jobType: "Designing", variable: "Sign Board", unitPrice: 80, modifiers: [] },
    { jobType: "Designing", variable: "Picture Editing", unitPrice: 25, modifiers: [] },
  ],
});

  // Typing
  await prisma.jobPricing.createMany({
    data: [
      { jobType: "Typing", variable: "A4", unitPrice: 0.5, materialType: "Paper", modifiers: [] },
      { jobType: "Typing", variable: "A3", unitPrice: 1, materialType: "Paper", modifiers: [] },
      { jobType: "Typing", variable: "Thesis", unitPrice: 3, materialType: "Paper", modifiers: [] },
    ],
  });

  // Scanning
  await prisma.jobPricing.createMany({
    data: [
      { jobType: "Scanning", variable: "Single Page", unitPrice: 1, materialType: "Document", modifiers: [] },
      { jobType: "Scanning", variable: "Batch", unitPrice: 0.8, materialType: "Document", modifiers: [] },
    ],
  });

  // Lamination
  await prisma.jobPricing.createMany({
    data: [
      { jobType: "Lamination", variable: "A4", unitPrice: 2, materialType: "Lamination Sheet", modifiers: [] },
      { jobType: "Lamination", variable: "A3", unitPrice: 3.5, materialType: "Lamination Sheet", modifiers: [] },
      { jobType: "Lamination", variable: "ID Card", unitPrice: 1.5, materialType: "Lamination Sheet", modifiers: [] },
    ],
  });

  // Large Format
  await prisma.jobPricing.createMany({
    data: [
      { jobType: "Large Format", variable: "Banner", unitPrice: 12, materialType: "Flex", modifiers: [] },
      { jobType: "Large Format", variable: "Vinyl", unitPrice: 15, materialType: "Vinyl", modifiers: [] },
      { jobType: "Large Format", variable: "Canvas", unitPrice: 20, materialType: "Canvas", modifiers: [] },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🌱 Seeding complete!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
