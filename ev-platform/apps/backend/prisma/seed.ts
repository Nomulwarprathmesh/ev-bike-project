import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password@123", 12);

  await prisma.user.upsert({
    where: { email: "admin@evplatform.local" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@evplatform.local",
      passwordHash,
      role: "super_admin"
    }
  });

  console.log("Seed complete");
}

main()
  .finally(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
