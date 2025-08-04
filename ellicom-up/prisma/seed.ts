import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany(); // Optional: clear users for clean seed

  await prisma.user.createMany({
    data: [
      {
        name: "Alice Doe",
        email: "alice@example.com",
        password: "hashedpassword123",
        role: Role.CLIENT,
        phone: "0551234567",
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "hashedpassword456",
        role: Role.CLIENT,
        phone: "0249876543",
      },
    ],
  });

  console.log("✨ Clients seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
